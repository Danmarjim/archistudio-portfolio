# Technical SEO Audit — mparchistudio.com

Repo: /Users/danmarjim/Development/Archistudio_Portfolio/archistudio-portfolio (Next.js 16 App Router, Vercel, next-intl)
Date: 2026-10-07

## Scores
- Technical SEO: 38/100
- On-Page SEO: 55/100

## Summary of root cause
Two independent bugs compound into a site-wide indexability failure:
1. `siteConfig.url` is hardcoded to a placeholder domain.
2. The ONLY `alternates`/canonical/hreflang/og:url definition in the entire app lives in the shared `[locale]/layout.tsx` and is never overridden by any child route — so every single URL on the site (home, listing pages, every project, every news article, in all 3 locales) emits the **same wrong canonical and hreflang set**, which always points to the three locale **homepages** instead of to itself.

---

## CRITICAL

### C1. Canonical tag is wrong domain AND wrong URL on every single page (not just home)
- Evidence (curl, 2026-10-07):
  - `/` → `<link rel="canonical" href="https://example.com/it"/>`
  - `/proyectos` → same: `https://example.com/it`
  - `/es/proyectos/casa-archi-colori` → `<link rel="canonical" href="https://example.com/es"/>` (points to the ES homepage, not the project page)
  - `/en/news/archiadvice-lancio` → `<link rel="canonical" href="https://example.com/en"/>` (points to EN homepage, not the article)
- Root cause: `src/app/[locale]/layout.tsx:68-75` — `generateMetadata` for `LocaleLayout` sets
  ```ts
  alternates: {
    canonical: `${siteConfig.url}/${locale}`,
    languages: { es: `${siteConfig.url}/es`, en: `${siteConfig.url}/en`, it: `${siteConfig.url}/it` },
  }
  ```
  This is the **only** place `alternates` is set anywhere in the codebase (`grep -rn "alternates" src` → one hit). None of `proyectos/page.tsx`, `proyectos/[slug]/page.tsx`, `news/page.tsx`, `news/[slug]/page.tsx`, `servicios/page.tsx`, `sobre-mi/page.tsx`, `contacto/page.tsx` define their own `alternates`, so Next's metadata merging inherits the layout's static value verbatim on every leaf page.
  Combined with `siteConfig.url = 'https://example.com'` (`src/lib/constants.ts:7`).
- Impact: Google is told that the canonical version of literally every inner page (all project pages × 3 locales, all news × 3 locales, /servicios, /contacto, /sobre-mi × 3) is the homepage of a domain that isn't even this site. This is a textbook trigger for Google to drop all inner URLs from the index and consolidate everything to (a non-existent) example.com homepage. This is more severe than a simple domain typo — it is a structural "every page canonicalizes to itself's homepage" bug.
- Fix:
  1. Change `siteConfig.url` to `https://mparchistudio.com` in `src/lib/constants.ts:7`.
  2. Give every leaf route its own `alternates.canonical` (and `languages`) computed from its actual pathname, e.g. in `proyectos/[slug]/page.tsx` generateMetadata add `alternates: { canonical: \`${siteConfig.url}/${locale === 'it' ? '' : locale + '/'}proyectos/${slug}\`, languages: {...} }`, or better, centralize with a helper that mirrors the logic next-intl's middleware already uses to build the (correct) `Link` header, so both signals agree. Repeat for news list/detail, servicios, sobre-mi, contacto, proyectos list.
  3. Also fix `openGraph.url` (same layout.tsx:47) — currently static `siteConfig.url`, should be per-page.

### C2. Sitemap and robots.txt point to the wrong domain entirely
- Evidence: `robots.txt` → `Sitemap: https://example.com/sitemap.xml` (confirmed again: `curl https://mparchistudio.com/robots.txt`). `sitemap.xml` (served correctly at `https://mparchistudio.com/sitemap.xml`, 200, valid urlset, 39 URLs) — every one of the 39 `<loc>` entries uses `https://example.com/...`. `sitemap_discovery.py` confirms: the robots.txt-declared sitemap (`https://example.com/sitemap.xml`) resolves to a cross-host 404; only the auto-discovered `https://mparchistudio.com/sitemap.xml` common-path fallback is actually valid. **Per the task's validation rule, the robots.txt declaration does not count as a pass** — it is stale/broken, and only the fallback save this from being a total crawlability failure.
- Root cause: same `siteConfig.url` constant, consumed by `src/app/robots.ts:10` and `src/app/sitemap.ts:22,26`.
- Impact: Any tool/crawler that trusts the robots.txt Sitemap directive literally (rather than guessing common paths) will fail to discover the sitemap at all (404 on cross-host). Submitted sitemap URLs (if Search Console has the example.com sitemap on file, or if GSC was pointed at the live sitemap.xml with internal example.com locs) are non-canonical/foreign-host URLs that Google will refuse to index under this property.
- Fix: same constant fix as C1 resolves both robots.txt and sitemap.xml simultaneously (single source of truth — good architecture, bad value).

### C3. `/it`, `/it/proyectos`, etc. are submitted in the sitemap but 307-redirect away
- Evidence: `locales = ['es', 'en', 'it']` in `src/i18n/routing.ts:3`, consumed by `sitemap.ts:25` (`locales.flatMap(...)`) with no exclusion for the default locale. Live: `curl -I https://mparchistudio.com/it` → `HTTP/2 307`, `location: /`. 13 of the 39 sitemap URLs (all `/it...` paths) are redirecting URLs, violating Google's "sitemaps should list final URLs" guidance, and wasting crawl budget/equity on a temporary (307) redirect that does not pass full signal consolidation the way a 301/308 would.
- Fix: in `sitemap.ts`, special-case the default locale (`it`) to emit unprefixed URLs (`${baseUrl}/proyectos`, not `${baseUrl}/it/proyectos`), matching `localePrefix: 'as-needed'` in `routing.ts:14`.

### C4. Any unmatched "dotted" path returns HTTP 500 instead of 404 — including `/favicon.ico`
- Evidence:
  - `/llms.txt` → `500` (`x-matched-path: /500`, `x-next-error-status: 500`)
  - `/favicon.ico` → `500` (same signature)
  - `/ads.txt`, `/foo.json`, `/this-does-not-exist.xml`, `/sitemap_index.xml`, `/sitemap-index.xml`, `/wp-sitemap.xml` → all `500` (confirmed independently by `sitemap_discovery.py`'s `checked` array, which recorded `HTTP 500` for every non-existent sitemap-path probe, not `404`)
  - A real 404 (`/this-page-does-not-exist-xyz`, no dot) correctly returns `404` via `app/[locale]/not-found.tsx`.
- Root cause (chained):
  1. `src/middleware.ts:11` matcher `'/((?!api|trpc|_next|_vercel|.*\\..*).*)'` explicitly excludes any path containing a dot from next-intl's locale-routing middleware (intentional, to skip static assets).
  2. Those excluded dotted requests fall through to plain Next.js routing, which has no matching segment (the only catch-all is `[locale]`, a non-dotted segment) and no root-level `not-found.tsx`/`error.tsx` (`src/app/` only contains `layout.tsx`; the only `not-found.tsx` lives one level down, inside `src/app/[locale]/`, which never gets reached for dotted paths). The request throws unhandled → surfaces as Next's generic `__next_error__` 500 page.
  3. Additionally, `src/app/favicon.ico.ico` (note: `.ico.ico`, confirmed via `ls`) is misnamed — Next.js's special-file convention requires the literal filename `favicon.ico` to auto-serve `/favicon.ico`. As named, Next does not register a `/favicon.ico` route at all, so even without bug (2) the favicon would 404/mis-serve.
- Impact: `/favicon.ico` is requested by virtually every browser tab and by Googlebot/Bingbot as a standard well-known asset; serving a 500 there is a real, frequently-hit production error that will show up in Search Console's "Crawled — 5xx" reports and can suppress the favicon in SERPs/bookmarks. The broader pattern (every unmatched dotted path = 500, not 404) means any bot probing for common files (`ads.txt`, `security.txt`, `sitemap_index.xml`, stray `.json`/`.xml` guesses) manufactures server errors instead of clean 404s, which is exactly the kind of noisy 5xx signal that can throttle Googlebot's crawl rate for the whole site.
- Fix: (a) rename `src/app/favicon.ico.ico` → `src/app/favicon.ico`; (b) add a root-level `src/app/not-found.tsx` (and ideally `error.tsx`) so unmatched dotted paths resolve to a real 404 instead of throwing; verify the Next 15/16 "custom 404 for routes outside middleware matcher" behavior once the root not-found exists.

---

## HIGH

### H1. HTML/HTTP hreflang signals conflict with each other
- Evidence: HTTP `Link` response header (generated per-request, correctly, likely by next-intl's middleware) is **accurate**: e.g. on `/es/proyectos/casa-archi-colori` it correctly lists `https://mparchistudio.com/{es,en}/proyectos/casa-archi-colori` and `https://mparchistudio.com/proyectos/casa-archi-colori` (it/x-default) — right domain, right page. But the HTML `<link rel="alternate" hreflang>` tags in `<head>` (from the broken layout.tsx metadata, see C1) are wrong on the same page: `https://example.com/{es,en,it}` — wrong domain, always the homepage. Google's hreflang documentation states that when both HTTP header and HTML annotations are present for a URL, they must agree; Google already warned this project's home page about this (previously verified). This audit confirms the conflict exists on **every inner page type checked**: `/proyectos`, `/es/proyectos/casa-archi-colori`, `/en/news/archiadvice-lancio`, `/es/proyectos`.
- Impact: Conflicting signals are a documented cause of Google ignoring hreflang annotations for the affected URL, which defeats the entire ES/EN/IT alternates setup — worse than having no hreflang at all, because the two clusters of pages won't be reliably swapped for the right locale/region in search results.
- Fix: same as C1 — once canonical/alternates are computed per-page with the correct domain, this resolves automatically since the HTTP header is already correct and can serve as the reference implementation.

### H2. `<html>` has no `lang` attribute anywhere on the site
- Confirmed beyond the homepage: `/proyectos`, `/es/proyectos/casa-archi-colori`, `/en/news/archiadvice-lancio` all render `<html>` with zero attributes (`suppressHydrationWarning` only, no `lang`).
- Root cause: `src/app/layout.tsx:18` — `<html suppressHydrationWarning>`. This is the **root** layout (outside `[locale]`), so it does not receive the `locale` route param (Next.js only passes dynamic params down to segments at/under the matching dynamic route; `app/layout.tsx` sits above `[locale]`). `src/app/[locale]/layout.tsx` does have `locale` available but does not render an `<html>` tag at all (it renders `<NextIntlClientProvider>` directly).
- Impact: Missing `lang` fails WCAG 2.1 SC 3.1.1 (Language of Page), degrades screen-reader pronunciation/voice selection, and is a (minor but real) signal loss for language/region detection, compounding the hreflang problems above.
- Fix: the next-intl–recommended pattern — in `src/app/layout.tsx`, `import { getLocale } from 'next-intl/server'`, `const locale = await getLocale()`, then `<html lang={locale} suppressHydrationWarning>`. `getLocale()` reads the locale next-intl's middleware already resolved for the request, so no restructuring of the two-layout split is required.

### H3. Security headers are essentially absent
- Evidence: Response headers on home/project/news pages show only `strict-transport-security: max-age=63072000`. No `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, or `Permissions-Policy`. `x-powered-by: Next.js` is also leaking framework fingerprint on some responses (seen on `/Proyectos`).
- Root cause: `next.config.ts` has no `headers()` function at all — only `outputFileTracingExcludes`.
- Impact: Not a direct ranking factor, but it is routinely checked in technical SEO/security audits and by tools like Lighthouse/Security Headers; absence of `X-Content-Type-Options: nosniff` and clickjacking protection (`X-Frame-Options`/CSP `frame-ancestors`) is a real hardening gap for a site with a public contact form (`/contacto`, backed by `src/app/api/contact`).
- Fix: add a `headers()` export in `next.config.ts` setting at minimum `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN` (or CSP `frame-ancestors 'self'`), and `poweredByHeader: false` to drop `x-powered-by`.

### H4. News section (list + all articles, all locales) is entirely absent from the sitemap
- Evidence: `curl .../sitemap.xml | grep -i news` → zero matches, confirmed again in this pass. `src/app/sitemap.ts` only calls `getProjectSlugs()` (reads `content/projects/it/`) and hardcodes `proyectos`, `sobre-mi`, `servicios`, `contacto` — there is no equivalent `getNewsSlugs()`/`/news` entry anywhere in `sitemap.ts:1-71`.
- Impact: 3 published news articles × 3 locales (9 URLs) plus the 3 `/news` list pages have no sitemap discovery path at all; combined with no visible internal link audit performed here, this is a real indexation gap for a content type intended to drive topical relevance/freshness signals.
- Fix: add a `getNewsSlugs()` reader (mirroring `getProjectSlugs()`, reading `content/news/it/`) and emit `${prefix}/news` + `${prefix}/news/${slug}` entries per locale in `sitemap.ts`.

---

## MEDIUM

### M1. No structured data (JSON-LD) anywhere on the site
- Evidence: `grep -rln "ld+json|JsonLd|application/ld" src` → no matches. `curl ... | grep '"@type"'` → empty on home and on a project detail page.
- Impact: A local architecture business with a project portfolio and news/press section is a strong fit for `ProfessionalService`/`LocalBusiness` (or `Person` for the architect), `BreadcrumbList`, `CreativeWork`/`ImageObject` for project galleries, and `Article`/`NewsArticle` for `/news/*`. None of this is present, forfeiting rich-result eligibility (sitelinks search box, breadcrumbs in SERP, possible image pack enhancements).
- Fix: add JSON-LD via `<script type="application/ld+json">` in `layout.tsx` (sitewide `Organization`/`ProfessionalService` + `WebSite`) and per-page in `proyectos/[slug]/page.tsx` (`CreativeWork`/`ImageGallery`) and `news/[slug]/page.tsx` (`NewsArticle`/`Article` with `datePublished` from the existing `post.date`).

### M2. Case-insensitive duplicate URLs all return 200
- Evidence: `/Proyectos`, `/PROYECTOS`, `/PrOyEcToS/casa-archi-colori` all return `200` with full rendered content (`x-matched-path: /[locale]/proyectos`), not a redirect/404 to the canonical lowercase path. Content is byte-different per request (`x-vercel-cache: MISS`, different `content-length`/`etag` from the lowercase version), i.e., Next.js is rendering a fresh duplicate page per case variant rather than 301-ing to canonical casing.
- Impact: Infinite case-variant URL space for crawlers (low real risk since C1's broken canonical nominally still points same place, but masks the problem and wastes crawl budget on indistinguishable duplicates once canonical is fixed).
- Fix: normalize path casing in `middleware.ts` (lower-case the pathname and 308-redirect on mismatch) before handing off to `next-intl`'s middleware.

### M3. Locale-to-locale redirects use 307 instead of 308
- Evidence: `/it` → `307` to `/`; `https://mparchistudio.com` (bare domain root, no scheme) `http://` → `https://` is also `307`. By contrast the trailing-slash redirect (`/proyectos/` → `/proyectos`) is a correct `308`.
- Impact: 307 is semantically "temporary" and historically has had weaker link-equity consolidation guarantees than 301/308 in some crawler implementations; combined with C3 (these are also sitemap-listed URLs), it's a second, independent reason those entries under-perform as canonical redirect targets. This is next-intl middleware's documented default behavior (it uses 307 so it can re-decide per-request based on cookies/Accept-Language), so a full fix may require overriding next-intl's redirect or accepting the trade-off — flagging as Medium rather than Critical since it is largely out of this app's direct control without forking middleware behavior.
- Fix: acceptable to leave as-is if C3 is fixed (sitemap no longer references `/it/*`), since the 307 only matters for users/bots arriving at `/it` directly (not from the sitemap).

### M4. AI-crawler guidance absent from robots.txt
- Evidence: `robots.txt` is a single blanket `User-Agent: * / Allow: /` with no explicit tokens for `GPTBot`, `CCBot`, `Google-Extended`, `anthropic-ai`/`ClaudeBot`, etc.
- Impact: Not an error, but an unmanaged default — the business may want to explicitly decide whether portfolio content should train/be retrieved by AI crawlers, especially since the site already shipped (broken) `/llms.txt` intent (C4), showing AI-crawler accessibility was already a consideration.
- Fix: decide policy and add explicit allow/disallow rules per crawler in `src/app/robots.ts`; once `/llms.txt` is actually desired, add a real `src/app/llms.txt/route.ts` (or static file) rather than leaving it 500ing.

---

## LOW

### L1. URL structure uses Spanish path segments (`/proyectos`, `/sobre-mi`, `/servicios`, `/contacto`) for all three locales, including Italian and English
- Evidence: `src/lib/constants.ts:20-26` (`navigation`) and every route folder under `src/app/[locale]/` (`proyectos`, `sobre-mi`, `servicios`, `contacto`, `tappeti`) are Spanish/Italian-adjacent but not localized per locale (no `pathnames` map in `src/i18n/routing.ts` — `defineRouting` only sets `locales`/`defaultLocale`/`localePrefix`, no `pathnames`). So `/en/proyectos` and `/en/sobre-mi` show English content at Spanish URL slugs.
- Impact: Not a crawl/index blocker (Google does not require localized slugs), but it is a minor relevance/branding inconsistency for the `en` and `it` audiences, and a missed long-tail keyword opportunity in the URL itself (e.g. `/en/projects`, `/en/about`, `/it/progetti`, `/it/chi-sono`).
- Fix (optional/cosmetic): add a `pathnames` map to `routing.ts` if localized slugs are desired; otherwise document this as an intentional brand decision (single consistent slug vocabulary across locales).

### L2. Case-variant duplicate rendering is also a (minor) mobile/CWV non-issue but inflates crawl surface
Already covered under M2; no separate mobile impact observed.

### L3. `x-powered-by: Next.js` framework disclosure
Covered as part of H3; listed separately only because it's a trivial one-line fix (`poweredByHeader: false` in `next.config.ts`) independent of full CSP work.

---

## PASSED / Confirmed healthy

- **HTTPS + HSTS**: `strict-transport-security: max-age=63072000` present sitewide; bare-HTTP and `www` both correctly redirect to the canonical `https://mparchistudio.com` host (only the 307-vs-308 nuance noted in M3).
- **Rendering**: Pages are fully server-rendered/prerendered (`x-nextjs-prerender: 1`, full textual content present in raw `curl` output with no JS execution) — no CSR/empty-shell risk. `generateStaticParams` used for both locale layout and project/news detail pages, so this is SSG, excellent for crawlability and LCP.
- **Mobile viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present, no `maximum-scale`/`user-scalable=no` blocking pinch-zoom.
- **Localized `<title>`/`<meta description>` on the homepage**: verified distinct, correctly translated copy for `it`/`es`/`en` (not boilerplate duplicates) — good on-page signal once canonical/hreflang are fixed.
- **Trailing-slash normalization**: single-hop `308` from `/proyectos/` → `/proyectos` (correct permanent-redirect semantics, unlike the locale redirects).
- **Sitemap format**: valid `urlset` XML, reachable at the conventional `/sitemap.xml` path, 200 status, well-formed (39 `<url>` entries, `lastmod`/`changefreq`/`priority` present) — only the *values* (wrong domain, default-locale paths, missing news) are wrong, not the mechanism. `dynamic = 'force-static'` in `sitemap.ts:8` is a good performance choice.
- **robots.txt mechanics**: syntactically valid, `Allow: /` doesn't block anything; only the `Sitemap:` directive's target host is stale (C2).
- **404 handling for non-dotted paths**: `app/[locale]/not-found.tsx` correctly returns `404` (confirmed via header inspection) for ordinary missing pages — the 500 issue (C4) is specific to dotted/extension-like unmatched paths.

---

## File:line reference index
- `src/lib/constants.ts:7` — `siteConfig.url = 'https://example.com'` (root cause of C1/C2/H1)
- `src/app/[locale]/layout.tsx:47` — static `openGraph.url: siteConfig.url` (wrong on every page)
- `src/app/[locale]/layout.tsx:68-75` — sitewide static `alternates` block, never overridden per-route (C1/H1)
- `src/app/sitemap.ts:22,25-26` — `baseUrl = siteConfig.url`; `locales.flatMap` includes default locale `it` without stripping prefix (C2/C3)
- `src/app/sitemap.ts:1-71` — no news slugs/URLs emitted at all (H4)
- `src/app/robots.ts:10` — `sitemap: ${siteConfig.url}/sitemap.xml` (C2)
- `src/i18n/routing.ts:3,11,14` — `locales = ['es','en','it']`, `defaultLocale: 'it'`, `localePrefix: 'as-needed'` (context for C3)
- `src/app/layout.tsx:18` — root `<html suppressHydrationWarning>` with no `lang`, and no locale available at this layer (H2)
- `src/app/[locale]/not-found.tsx` — exists, handles non-dotted 404s correctly, but no sibling root-level `src/app/not-found.tsx`/`error.tsx` exists to catch dotted unmatched paths (C4)
- `src/middleware.ts:11` — matcher excludes any path containing a dot from next-intl handling, exposing them to the missing root-level 404 boundary (C4)
- `src/app/favicon.ico.ico` — misnamed static file, not recognized by Next's special-file convention (C4)
- `next.config.ts` — no `headers()`, no `poweredByHeader: false` (H3/L3)
- `src/app/[locale]/proyectos/page.tsx`, `proyectos/[slug]/page.tsx`, `news/[slug]/page.tsx` — `generateMetadata` only sets `title`/`description`, never `alternates` (confirms C1 propagation)
