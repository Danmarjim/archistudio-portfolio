# Technical SEO Re-Audit — mparchistudio.com

Repo: /Users/danmarjim/Development/Archistudio_Portfolio/archistudio-portfolio (Next.js 16 App Router, Vercel, next-intl)
Date: 2026-10-07
Baseline: /private/tmp/claude-501/-Users-danmarjim-Development-Archistudio-Portfolio-archistudio-portfolio/e544acf8-0c66-4f9e-be43-8f80f4323dea/scratchpad/mparchistudio.com-audit/findings/technical.md (Technical 38/100, On-Page 55/100)

## Scores (re-audit)
- Technical SEO: 92/100
- On-Page SEO: 90/100

## Executive summary
The deploy fixed the root cause identified in the baseline (centralized `siteConfig.url` placeholder + single sitewide `alternates` block) with a proper architectural rework: root `src/app/layout.tsx` was removed, `[locale]/layout.tsx` is now the sole layout (correct per-locale `<html lang>`), and a new `src/lib/seo.ts` (`buildMetadata`/`buildAlternates`/`localizedUrl`) is now called individually by every leaf route (`page.tsx`/`layout.tsx` under `proyectos`, `news`, `servicios`, `sobre-mi`, `tappeti`, `contacto`, `privacy`). Canonicals, hreflang, and og:url are now correct, self-referential, and per-locale on every page type checked. Sitemap and robots.txt point to the real domain, the default locale (`it`) is unprefixed in the sitemap, news is included, JSON-LD was added site-wide, security headers were added, the favicon was fixed, dotted-path/unknown-path 500s are gone, and case-variant duplicate URLs now 404. Remaining gaps are minor: no CSP header, 307 (not 308) on locale-redirect and www-redirect (next-intl/Vercel default, low impact), and no explicit AI-crawler tokens in robots.txt (policy decision, not a defect).

---

## Baseline findings — status table

| ID | Baseline issue | Status | Evidence (this pass) |
|---|---|---|---|
| C1 | Canonical wrong domain + always homepage on every page | **FIXED** | `/proyectos/casa-archi-colori` → `<link rel="canonical" href="https://mparchistudio.com/proyectos/casa-archi-colori"/>`; `/es/proyectos/casa-archi-colori` → canonical `.../es/proyectos/casa-archi-colori`; `/en/news/archiadvice-lancio` → canonical `.../en/news/archiadvice-lancio`. `openGraph.url` also now per-page (og:url matches canonical). Root cause fixed at `src/lib/seo.ts:36-44` (`buildAlternates`) called per-route (`src/app/[locale]/proyectos/[slug]/page.tsx:36`, `news/[slug]/page.tsx:29`, etc. — see grep below). |
| C2 | Sitemap/robots.txt point to `example.com` | **FIXED** | `curl robots.txt` → `Sitemap: https://mparchistudio.com/sitemap.xml`. `sitemap_discovery.py --json` confirms the robots.txt-declared sitemap resolves (200, valid urlset) — passes validation this time, not just a stale declaration. All 63 `<loc>` entries use `mparchistudio.com`, zero `example.com` references. `src/lib/constants.ts:8` now `url: 'https://mparchistudio.com'`. |
| C3 | `/it/*` URLs submitted in sitemap but 307-redirect away | **FIXED** | `grep -o 'mparchistudio.com/it[^<]*' sitemap.xml` → zero matches. `sitemap.ts:entriesFor` calls `localizedUrl(locale, pagePath)` which special-cases `routing.defaultLocale` to emit unprefixed URLs (`src/lib/seo.ts:17-23` `localizedPath`). Confirmed: `/es` sitemap entry's `it` hreflang alternate is `https://mparchistudio.com` (no `/it`), matching the unprefixed canonical. |
| C4 | Dotted/unmatched paths → 500 (incl. `/favicon.ico`) | **FIXED** | `/llms.txt` → 200 (now a real file: `public/llms.txt`, well-formed with business info + page links). `/favicon.ico` → 200 (`src/app/favicon.ico` correctly named, confirmed `ls`, 3394 bytes, no more `.ico.ico`). `/ads.txt`, `/foo.json`, `/this-does-not-exist.xml`, `/sitemap_index.xml`, `/wp-sitemap.xml`, `/security.txt` → all clean `404` (not 500). Root cause: `[locale]/layout.tsx:36` now sets `export const dynamicParams = false` with a comment explicitly calling out this exact bug ("qualsiasi altro primo segmento... risponde 404 invece di renderizzare il layout"). |
| H1 | HTML hreflang vs HTTP Link header conflict | **FIXED** | HTML `<link rel="alternate" hreflang>` tags now match the (previously-correct) HTTP behavior exactly on every page checked — same domain, same locale-specific path, same x-default. Single source of truth (`buildAlternates`) removes the possibility of drift. |
| H2 | No `<html lang>` anywhere | **FIXED** | `/` → `<html lang="it">`; `/es` → `<html lang="es">`; `/en` → `<html lang="en">`; `/es/proyectos/casa-archi-colori` → `lang="es"`; `/en/news/archiadvice-lancio` → `lang="en"`. Root cause resolved structurally: `src/app/layout.tsx` (the old locale-less root layout) was **deleted**; `src/app/[locale]/layout.tsx` is now the only layout and renders `<html lang={locale}>` directly (line ~96). |
| H3 | No security headers (CSP/X-Frame-Options/nosniff/etc.), `x-powered-by` leak | **PARTIAL** | Added in `next.config.ts:6-11,16-18`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy`. `poweredByHeader: false` added — `x-powered-by` header confirmed **gone** from live responses. HSTS still present. **Still missing: `Content-Security-Policy`** (no CSP header on any response checked). Not critical for a static/SSG marketing site without inline-script risk beyond JSON-LD (which is XSS-escaped, see M1), but still a gap vs. a full hardening baseline. |
| H4 | News section absent from sitemap | **FIXED** | `sitemap.xml` now includes `/news`, `/es/news`, `/en/news` (list) plus 6 articles × 3 locales (18 URLs) = all current `content/news/it/*.mdx` slugs present: `archiadvice-lancio`, `collezione-tappeti-sevilla`, `cose-di-casa-ottobre-2022`, `home-n36-aprile-2026`, `il-colore-nell-architettura`, `intervista-archiboost-luglio-2026`. Note: content grew from 3 to 6 articles since baseline (new ones also correctly included — `getAllNews()` is dynamic, not hardcoded). `src/app/sitemap.ts:14` imports `getAllNews` from `@/lib/news` and emits entries in the final `news.flatMap(...)` block. |
| M1 | No structured data (JSON-LD) | **FIXED** | `<script type="application/ld+json">` present on every page type: home/layout emits `ProfessionalService` + `Person` + `WebSite` (sitewide, via `buildSiteGraph`, injected in `[locale]/layout.tsx` near the end of the body); project detail pages add `CreativeWork` + `BreadcrumbList` + `Place`; news detail pages add `Article` + `BreadcrumbList`. Implementation (`src/components/seo/JsonLd.tsx`) correctly escapes `<` to prevent script-injection via `dangerouslySetInnerHTML`. |
| M2 | Case-insensitive duplicate URLs return 200 | **FIXED** | `/Proyectos`, `/PROYECTOS`, `/PrOyEcToS/casa-archi-colori` → all now `404` (verified live). Consistent with `dynamicParams = false` plus Next's case-sensitive static route matching — the broader C4 fix also eliminated this duplicate-content vector. |
| M3 | Locale redirects use 307 not 308 | **STILL OPEN (unchanged, as predicted)** | `/it` → `307` to `/`; `/it/proyectos` → `307` to `/proyectos`; bare `www.mparchistudio.com` → `307` to `https://mparchistudio.com/`. This is next-intl middleware's documented default (cookie/Accept-Language re-evaluation). Baseline correctly flagged this as acceptable-to-leave once C3 was fixed (sitemap no longer references `/it/*`) — confirmed C3 is fixed, so this residual 307 now only affects users/bots arriving directly at `/it`, not sitemap-driven crawl equity. Low real-world impact; downgrading from Medium to Low given C3's fix. The bare-domain → HTTPS redirect (`http://` → `https://`) is correctly `308`. |
| M4 | No AI-crawler-specific robots.txt tokens | **STILL OPEN** | `src/app/robots.ts` still emits a single blanket `User-Agent: * / Allow: / / Disallow: /api/` rule with no explicit `GPTBot`/`CCBot`/`Google-Extended`/`ClaudeBot` entries (confirmed via grep, no matches). Notably the team *did* ship the companion `/llms.txt` (public/llms.txt) that was flagged as broken intent in the baseline (C4) — so AI-crawler accessibility is clearly a live consideration; the robots.txt policy decision (allow/disallow per AI bot) is the one remaining piece. Not a defect — a deliberate choice is still open. |
| L1 | Spanish URL slugs for all locales | **UNCHANGED (by design)** | `/en/proyectos`, `/en/sobre-mi` still used (no localized `pathnames` map in `routing.ts`). Cosmetic/optional, as originally noted. |
| L2 | (duplicate of M2) | **FIXED** | Covered by M2 fix. |
| L3 | `x-powered-by` disclosure | **FIXED** | Confirmed absent from live headers (see H3). |

---

## NEW findings (this pass)

### MEDIUM — No Content-Security-Policy header
- Evidence: full header dump on `/`, `/proyectos`, `/es/proyectos/casa-archi-colori` shows `x-content-type-options`, `x-frame-options`, `referrer-policy`, `permissions-policy`, `strict-transport-security` all present, but no `content-security-policy` or `content-security-policy-report-only` header anywhere.
- Impact: `X-Frame-Options: SAMEORIGIN` covers basic clickjacking, but no CSP means no defense-in-depth against injected/third-party script execution (relevant given the public `/contacto` form backed by `src/app/api/contact`, and the Vercel Analytics script). Not an SEO ranking factor directly, but flagged in security-header audits (e.g., securityheaders.com) that often get bundled into technical SEO/trust scoring.
- Fix: add a `Content-Security-Policy` entry to the `securityHeaders` array in `next.config.ts:6-11`, scoped to allow Next.js inline hydration scripts, the Vercel Analytics script origin, and `'self'` for the JSON-LD inline scripts (already nonce-free, escaped output) — e.g. `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; object-src 'none'; base-uri 'self'; frame-ancestors 'self'`. Tune with `report-only` first if uncertain about breaking the font/analytics loads.

### LOW — `llms.txt` and sitemap list the `/tappeti` page but it is a single unlocalized-content page (verify intent)
- Evidence: `public/llms.txt` links `https://mparchistudio.com/tappeti` under "Pagine principali (italiano)" and `sitemap.ts` includes `/tappeti` with `priority: 0.6`. This looks intentional (a rug/product collection page), not a regression — flagging only because it's new surface area not covered by the original baseline audit; no canonical/hreflang issue found on it (checked, matches the correct per-page pattern). No action needed unless the page's content/indexing intent should be reconsidered.
- Impact: None identified — informational only.

No regressions were found: everything that passed in the baseline (HTTPS/HSTS, SSG rendering, mobile viewport, trailing-slash 308, sitemap XML validity/mechanics, robots.txt mechanics, 404 handling for non-dotted paths) still passes, and no previously-passing check broke.

---

## Spot checks performed (for completeness)

- **Titles across ~all pages**: home, `/proyectos`, `/sobre-mi`, `/servicios`, `/tappeti`, `/news`, `/contacto`, and all 7 project detail pages — every `<title>` is unique and descriptive (no boilerplate duplication). Sample: "Casa Archi & Colori – Milano", "Bagno ITALIAN SUMMER – Camparada", "Cucina PARIGINA – Monza" — all distinct, keyword-rich, locale-translated.
- **Redirects**: bare HTTP→HTTPS = 308 (correct/permanent); `www` → apex = 307 (next-intl default, same as locale redirect, low impact per M3); trailing slash `/proyectos/` → `/proyectos` = 308 (correct).
- **Unknown slugs**: `/proyectos/does-not-exist-xyz` → 404; `/this-page-does-not-exist-xyz` → 404. Both clean.
- **JS rendering**: still fully SSG/prerendered (`x-nextjs-prerender: 1`, full content in raw HTML, no CSR shell) — no change from baseline, still excellent.
- **Mobile viewport**: unchanged, still correct (`width=device-width, initial-scale=1`, no zoom-blocking).

---

## File:line reference index (this pass)
- `src/lib/constants.ts:8` — `siteConfig.url = 'https://mparchistudio.com'` (C2 fix)
- `src/lib/seo.ts:17-23` — `localizedPath()`: strips `/it` prefix for default locale (C3 fix)
- `src/lib/seo.ts:25-28` — `localizedUrl()`
- `src/lib/seo.ts:36-44` — `buildAlternates()`: single source of truth for canonical + hreflang + x-default (C1/H1 fix)
- `src/app/[locale]/layout.tsx` — root `<html lang={locale}>` now rendered here (old locale-less `src/app/layout.tsx` deleted) (H2 fix); `dynamicParams = false` with explicit comment addressing the dotted-path 500 bug (C4 fix); `JsonLd` sitewide graph injected near end of `<body>` (M1 fix)
- `src/app/[locale]/proyectos/[slug]/page.tsx:36`, `src/app/[locale]/news/[slug]/page.tsx:29`, `src/app/[locale]/proyectos/page.tsx:17`, `src/app/[locale]/news/page.tsx:17`, `src/app/[locale]/sobre-mi/layout.tsx:18`, `src/app/[locale]/servicios/layout.tsx:18`, `src/app/[locale]/tappeti/layout.tsx:18`, `src/app/[locale]/contacto/layout.tsx:18`, `src/app/[locale]/privacy/page.tsx:14` — every leaf route now calls `buildMetadata()` individually (C1 propagation fix, confirmed via grep — no route left on the old static layout-level `alternates`)
- `src/app/sitemap.ts:14` (`getAllNews` import), `:49-55` (news entries loop) — H4 fix
- `src/app/robots.ts` — correct `siteConfig.url`-based sitemap reference (C2); still blanket `allow: '/'` with no per-AI-bot tokens (M4 still open)
- `src/app/favicon.ico` — correctly named/placed (C4 fix, was `favicon.ico.ico`)
- `public/llms.txt` — new, well-formed (C4-adjacent bonus fix)
- `src/components/seo/JsonLd.tsx` — JSON-LD injector, output-escaped (M1 fix)
- `next.config.ts:6-11,16-18` — `securityHeaders` array + `poweredByHeader: false` (H3 partial fix — CSP still missing, see new Medium finding)
- `src/middleware.ts` — unchanged matcher (`.*\\..*` exclusion), no longer a problem because `dynamicParams = false` now provides the missing 404 boundary at the layout level
