# Sitemap Audit — mparchistudio.com

Audited: https://mparchistudio.com/sitemap.xml
Source: src/app/sitemap.ts (generator), src/app/robots.ts, src/lib/constants.ts
Date: 2026-10-07

## Summary table

| # | Check | Severity | Status |
|---|-------|----------|--------|
| 1 | Wrong base URL (`example.com` instead of production domain) | Critical | FAIL |
| 2 | `robots.txt` declares a sitemap on a different, dead host | Critical | FAIL |
| 3 | `/it/...` URLs in sitemap 307-redirect to unprefixed canonical URL | High | FAIL |
| 4 | News section entirely missing from sitemap (index + 6 articles × 3 locales = 21 URLs) | High | FAIL |
| 5 | `/tappeti` page missing from sitemap (live, 200, linked in nav) | Medium | FAIL |
| 6 | `lastmod` is `new Date()` (build time) for all 39 URLs, identical per locale | Low | FAIL |
| 7 | `priority` / `changefreq` present | Info | Remove (ignored by Google) |
| 8 | No `xhtml:link` hreflang alternates in sitemap entries | High | FAIL |
| 9 | XML well-formed, `<urlset>` valid, 39 URLs, well under 50k/50MB caps | Critical | PASS |
| 10 | Slug casing: `cucina-MITE` (mixed case, only non-kebab-case slug) | Medium | WARN |
| 11 | Adjacent bug: per-locale `alternates.canonical`/`languages` in `layout.tsx` is identical for every page in a locale (not path-aware) | High | FAIL (out of sitemap.ts scope, but directly relevant to hreflang fix) |
| 12 | `/privacy` page live but intentionally/accidentally excluded from sitemap | Low | Note (likely fine to exclude; decide explicitly) |

Location-page quality gates (30+/50+ programmatic location pages): **not applicable** — this site has no location-page pattern (7 real portfolio projects + 1 new one, each with unique photography/content). No gate triggered.

---

## 1. Critical — Base URL is `https://example.com` (placeholder never replaced)

`src/lib/constants.ts`:
```ts
export const siteConfig: SiteConfig = {
  ...
  url: 'https://example.com',
  ...
}
```

Confirmed live at `https://mparchistudio.com/sitemap.xml` (HTTP 200, valid `<urlset>`) — every one of the 39 `<loc>` entries is `https://example.com/...`:

```
13 example.com/en
13 example.com/es
13 example.com/it
```

**Impact:** Google Search Console cannot associate this sitemap with the verified `mparchistudio.com` property (cross-domain `<loc>` entries in a submitted sitemap are rejected/ignored by GSC). The sitemap is currently non-functional for its actual domain. This single constant is also the root cause of findings #2 and #11 (canonical/hreflang metadata in `layout.tsx` also reads `siteConfig.url`).

**Fix:** set `url: 'https://mparchistudio.com'` (or read from `process.env.NEXT_PUBLIC_SITE_URL` with that as fallback) in `src/lib/constants.ts`. This alone fixes `robots.ts`, `sitemap.ts`, and the `generateMetadata` canonical/alternates in `layout.tsx` simultaneously, since all three derive from `siteConfig.url`.

## 2. Critical — `robots.txt` Sitemap directive points to a dead, unrelated host

```
curl https://mparchistudio.com/robots.txt  →  Sitemap: https://example.com/sitemap.xml
```
Verified via sitemap_discovery: `https://example.com/sitemap.xml` → **HTTP 404** (cross-host). The real, working sitemap only resolves at `https://mparchistudio.com/sitemap.xml` (found via common-path probing, not declared anywhere). Any crawler that discovers the sitemap exclusively through `robots.txt` (the standard discovery path) gets a 404 on a third-party domain.

**Fix:** automatic once `siteConfig.url` is corrected (see #1); `robots.ts` already interpolates `${siteConfig.url}/sitemap.xml` correctly, it just needs the right base.

## 3. High — `/it/...` sitemap URLs 307-redirect to their unprefixed canonical

`next-intl` routing (`src/i18n/routing.ts`) is configured:
```ts
export const locales = ['es', 'en', 'it'] as const
export const routing = defineRouting({
  locales,
  defaultLocale: 'it',
  localePrefix: 'as-needed',   // default locale (it) is served unprefixed
})
```
But `sitemap.ts` loops over `locales` (`['es','en','it']`) uniformly and always builds `${baseUrl}/${locale}/...`, including for `it`, producing 13 `/it/*` URLs. None of them are the actual canonical URL for Italian content.

Verified live:
```
GET /it                               -> 307 -> https://mparchistudio.com/
GET /it/proyectos/cucina-MITE         -> 307 -> https://mparchistudio.com/proyectos/cucina-MITE
```
13 of the 39 sitemap URLs (33%) are redirecting URLs — a High-severity "Redirected URLs" finding per the validation matrix. Google follows the 307 but treats the sitemap entry as non-canonical signal noise, and repeated 307s across a sitemap reduce crawl-budget trust.

**Fix:** sitemap generation must special-case the default locale to omit the prefix, matching `localePrefix: 'as-needed'` semantics exactly (see proposed `sitemap.ts` below).

## 4. High — News section (index + 6 articles) missing from sitemap entirely

`sitemap.ts` only enumerates `proyectos`, `sobre-mi`, `servicios`, `contacto`, and the locale home — there is no loop over `content/news/*` despite `src/app/[locale]/news/page.tsx` and `src/app/[locale]/news/[slug]/page.tsx` being live, indexable routes.

Live content (`src/lib/news.ts` / `content/news/it/`), 6 articles, all with valid dates:
```
archiadvice-lancio.mdx                    date: 2026-03-01
collezione-tappeti-sevilla.mdx            date: 2026-08-19
cose-di-casa-ottobre-2022.mdx             date: 2022-10-01
home-n36-aprile-2026.mdx                  date: 2026-04-01
il-colore-nell-architettura.mdx           date: 2022-09-01
intervista-archiboost-luglio-2026.mdx     date: 2026-07-14
```
Verified live: `GET /news -> 200`, `GET /news/il-colore-nell-architettura -> 200`. These are real, unique editorial content — exactly the kind of page that should be in the sitemap. Missing coverage = (1 index + 6 articles) × 3 locales = **21 indexable URLs absent** from a 39-URL sitemap (would become 60 URLs once added, plus `/tappeti` below).

**Fix:** add a news loop mirroring the projects loop, using `getAllNews(locale)` / `getAllNewsSlugs()` already exported by `src/lib/news.ts`, with `lastModified` taken from each post's real `date` frontmatter field (already valid ISO date strings, no new schema needed).

## 5. Medium — `/tappeti` missing from sitemap

Live route (`src/app/[locale]/tappeti/page.tsx`), linked in primary navigation (`src/lib/constants.ts` → `navigation`), returns `GET /tappeti -> 200`. Not present in `sitemap.ts` at all. Should be added alongside the other static top-level pages.

## 6. Low — `lastmod` is build-time `new Date()`, identical across all URLs per locale

Live sitemap shows only two distinct timestamps across all 39 URLs, each shared by 13 entries (one per locale build):
```
<lastmod>2026-10-07T12:52:36.886Z</lastmod>
<lastmod>2026-10-07T12:52:36.887Z</lastmod>
```
This is the build timestamp, not "last significant content change," for every page — homepage, listing pages, and all project detail pages alike. Google explicitly discounts `lastmod` values it judges to be inaccurate/boilerplate (identical across unrelated URLs is a classic deprioritization signal). This provides no crawl-scheduling value today.

**Root cause:** `src/types` → `Project` interface only carries `year: number` (e.g. `2026`), no granular date field in project frontmatter. `NewsPost` **does** have a proper `date: string` field already (see #4 fix — use it directly).

**Fix for projects** (pick one, in order of recommendation):
1. Add an optional `lastmod: "YYYY-MM-DD"` frontmatter field to each project `.mdx`, defaulting to the file's creation/last-edit date; use it if present, else omit `lastModified` for that URL (omitting is strictly better than a fabricated date).
2. Derive from the file's last git-commit date at build time (`git log -1 --format=%cI -- <path>`), which reflects true "last significant change" without touching content schema — slightly more fragile on shallow-clone CI checkouts (Vercel does a shallow but single-commit-aware clone; verify depth covers historical project edits, or fall back to option 1).

For static route pages (`/`, `/proyectos`, `/sobre-mi`, `/servicios`, `/contacto`, `/tappeti`) that have no content-dated source: omit `lastModified` rather than emitting the build timestamp — a missing `lastmod` is honestly neutral; a wrong one is a negative signal.

## 7. Info — `priority` / `changefreq` present

Both fields appear on every entry (`priority: 1 → 0.6`, `changefreq: weekly/monthly/yearly`). Google has stated both are ignored for ranking/crawl-scheduling purposes. Not harmful, but dead weight — drop them from the generator to simplify and match current best practice.

## 8. High — No hreflang (`xhtml:link`) alternates anywhere in the sitemap

None of the 39 `<url>` entries carry `alternates.languages`. With a 3-locale site where `it`/`es`/`en` are genuinely parallel translations of the same pages (confirmed: `content/projects/{it,es,en}/` and `content/news/{it,es,en}/` hold the same slug set in every locale), this is a missed, low-effort, high-value opportunity: Next's `MetadataRoute.Sitemap` type in this project's installed Next version explicitly supports it per-entry:
```ts
type SitemapFile = Array<{
  url: string
  lastModified?: string | Date
  alternates?: { languages?: Languages<string> }
  ...
}>
```
No code currently sets this (confirmed via source read of `sitemap.ts`), and no equivalent hreflang exists in document `<head>` either — see #11 for the related page-level canonical/hreflang gap.

**Fix:** for every logical page (home, proyectos, proyectos/[slug], sobre-mi, servicios, contacto, tappeti, news, news/[slug]), emit one sitemap entry per locale, each carrying `alternates.languages` pointing at all 3 locale variants plus `x-default` → the default-locale (unprefixed) URL. See proposed `sitemap.ts` below.

## 9. PASS — XML validity and size

`<?xml version="1.0" encoding="UTF-8"?>` + single `<urlset>`, well-formed, 39 `<url>` entries — far under both the 50,000-URL and 50MB-uncompressed caps (no sitemap index needed at current or realistically foreseeable scale for a portfolio site).

## 10. Medium — Slug casing: `cucina-MITE`

`content/projects/{it,es,en}/cucina-MITE.mdx` — the only slug in the project set that isn't lowercase kebab-case (all 7 others are: `casa-archi-colori`, `appartamento-lovingcolors`, `restyling-casa-peonia`, `bagno-italian-summer`, `bagno-casa-peonia`, `bagno-casa-archi-colori`, `cucina-parigina`). The casing is at least **internally consistent** — filename, `coverImage` path, and image-prefix (`cucina-MITE-00.jpg` … `-16.jpg`) all agree, and all three locale MDX files use identical casing, so there is no current broken-link/mismatch bug.

However, verified live:
```
GET /proyectos/cucina-MITE  -> 200
GET /proyectos/cucina-mite  -> 500   (not 404)
```
Two problems:
- Mixed-case URL segments are non-standard practice and a latent duplicate-URL risk (case-sensitive routing means `/cucina-MITE` and `/cucina-mite` are distinct URLs to a crawler; only one resolves, which is correct, but it invites miscased inbound/internal links).
- The miscased variant returns **HTTP 500** rather than a clean **404**. A 500 is reported in Search Console as a server error (crawl-health signal), not a benign not-found, and can suppress crawl budget if it recurs. This is a `lib/projects.ts` / `generateStaticParams` robustness gap (slug lookup likely throws on cache-miss path edge case rather than falling through to `notFound()`), separate from the sitemap itself but worth a quick follow-up fix.

**Recommendation:** rename the slug/files to `cucina-mite` (lowercase) for consistency across the 8-project set — low-risk since it's a recently added project (file dates `16 jul.`) with presumably low existing backlink/index equity; if renamed, 301-redirect the old casing. If keeping `cucina-MITE` as-is, at minimum fix the lowercase-variant 500 to a proper 404.

## 11. High (adjacent, outside `sitemap.ts` but same root cause) — Per-page canonical/hreflang is not path-aware

`src/app/[locale]/layout.tsx` `generateMetadata` sets, for **every** page under a given locale:
```ts
alternates: {
  canonical: `${siteConfig.url}/${locale}`,
  languages: {
    es: `${siteConfig.url}/es`,
    en: `${siteConfig.url}/en`,
    it: `${siteConfig.url}/it`,
  },
},
```
Neither `src/app/[locale]/proyectos/[slug]/page.tsx` nor `src/app/[locale]/news/[slug]/page.tsx` override `alternates` in their own `generateMetadata` (confirmed — both only return `title`/`description`). Because Next.js metadata merging only overrides fields a child segment explicitly sets, **every project page and every news article inherits the same locale-homepage canonical URL** (e.g. all `/es/proyectos/*` pages declare `<link rel="canonical" href="https://example.com/es">`, pointing at the Spanish homepage, not at themselves). This is a duplicate-canonical misconfiguration independent of, but compounding, the `example.com` bug — it would still be wrong even with the correct domain.

It also reproduces the `/it` redirect bug inside page metadata: the `it` canonical/hreflang value is always `${siteConfig.url}/it`, which itself 307-redirects (confirmed above), so even the one locale that does get a dedicated canonical/hreflang entry points at a non-canonical, redirecting URL.

**Recommendation (bundle with the sitemap fix, since both need the same per-path alternates map):** compute `alternates.canonical`/`languages` per-route in each page's own `generateMetadata` (home, proyectos listing, proyectos/[slug], sobre-mi, servicios, contacto, tappeti, news listing, news/[slug]), using the same locale-prefix helper proposed for `sitemap.ts` below, rather than relying on the blanket layout-level default. Out of strict sitemap scope, but flagging because it was already touched while investigating hreflang coverage, and fixing the sitemap's hreflang without fixing this leaves the `<head>` tags and the sitemap's `xhtml:link`s disagreeing with each other.

## 12. Low — `/privacy` live but not in sitemap

`src/app/[locale]/privacy/page.tsx` returns `200` live, no `noindex` found in the file. Currently excluded from the sitemap (by omission, not an explicit decision in code). This may be intentional (privacy pages are usually low-value, thin boilerplate) — recommend either adding it for completeness or explicitly marking it `robots: { index: false }` in its own `generateMetadata` so the exclusion is a deliberate, documented choice rather than an accident. Not blocking.

---

## Proposed corrected `src/app/sitemap.ts`

Not applied to the repo (read-only audit). For review/implementation by the team:

```ts
import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'       // url must be fixed first — see Finding #1
import { locales, routing } from '@/i18n/routing'  // defaultLocale: 'it', localePrefix: 'as-needed'
import { getAllNews } from '@/lib/news'

export const dynamic = 'force-static'

type Locale = (typeof locales)[number]

function getProjectSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content/projects/it')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
}

/** Optional per-project lastmod frontmatter (see Finding #6); falls back to undefined (omitted) */
function getProjectLastmod(slug: string): Date | undefined {
  const file = path.join(process.cwd(), 'content/projects/it', `${slug}.mdx`)
  if (!fs.existsSync(file)) return undefined
  const raw = fs.readFileSync(file, 'utf8')
  const match = raw.match(/^lastmod:\s*"?([\d-]+)"?/m)
  return match ? new Date(match[1]) : undefined
}

/** Builds the real, locale-prefix-aware URL matching next-intl's `localePrefix: 'as-needed'` */
function localizedUrl(locale: Locale, pathname: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  return `${siteConfig.url}${prefix}${pathname}`
}

/** Builds the hreflang alternates map for a given pathname, across all locales + x-default */
function buildAlternates(pathname: string): { languages: Record<string, string> } {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = localizedUrl(locale, pathname)
  }
  languages['x-default'] = localizedUrl(routing.defaultLocale, pathname)
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getProjectSlugs()
  const newsSlugs = getAllNews('it').map((p) => ({ slug: p.slug, date: p.date }))

  const staticPaths: { pathname: string; priority?: never }[] = [
    { pathname: '' },
    { pathname: '/proyectos' },
    { pathname: '/sobre-mi' },
    { pathname: '/servicios' },
    { pathname: '/contacto' },
    { pathname: '/tappeti' },
    { pathname: '/news' },
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const { pathname } of staticPaths) {
      entries.push({
        url: localizedUrl(locale, pathname),
        alternates: buildAlternates(pathname),
        // no lastModified / changeFrequency / priority for pages without a real change date
      })
    }

    for (const slug of projectSlugs) {
      const pathname = `/proyectos/${slug}`
      const lastmod = getProjectLastmod(slug)
      entries.push({
        url: localizedUrl(locale, pathname),
        ...(lastmod ? { lastModified: lastmod } : {}),
        alternates: buildAlternates(pathname),
      })
    }

    for (const { slug, date } of newsSlugs) {
      const pathname = `/news/${slug}`
      entries.push({
        url: localizedUrl(locale, pathname),
        lastModified: new Date(date), // real article date from frontmatter — already valid ISO
        alternates: buildAlternates(pathname),
      })
    }
  }

  return entries
}
```

Prerequisite for this to emit correct URLs: `siteConfig.url` in `src/lib/constants.ts` must be fixed to `https://mparchistudio.com` (Finding #1) — this proposal does not fix that constant itself, only consumes it correctly.

Expected resulting URL count: 3 locales × (7 static paths + 8 projects + 6 news) = **63 URLs** (up from 39), all canonical (no redirecting `/it/*` entries), each carrying correct hreflang alternates, zero `priority`/`changefreq`, and real `lastmod` wherever a genuine date source exists.
