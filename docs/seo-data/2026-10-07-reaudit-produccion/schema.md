# Schema.org Re-Audit — mparchistudio.com (v2, post-implementation)

Audited (live, server-rendered, `--mode auto`, `is_spa: false` everywhere, `--json-ld-output`
artifacts used, no unbounded markup pasted into context): `/`, `/es`, `/proyectos/casa-archi-colori`,
`/en/proyectos/cucina-MITE`, `/news/archiadvice-lancio`, `/sobre-mi`, `/contacto`.

## Schema Score: 74 / 100 (baseline was 8 / 100)

Structured data is now live sitewide and is syntactically valid JSON-LD everywhere it appears
(7/7 blocks parsed `valid: true`). The core entity graph (ProfessionalService + Person + WebSite),
BreadcrumbList on every inner page, Article on news, and CreativeWork on projects are all present,
use `https://schema.org`, absolute `https://mparchistudio.com` URLs, ISO 8601 dates, and no
deprecated types. The score is held back from "Good"/90+ by one functional defect that risks
Article rich-result eligibility (author/publisher name resolution, finding #1), a missing
`logo` property (finding #2), and a real (not cosmetic) locale-translation bug in the
ProfessionalService description (finding #5).

## 1. Detection Results (per page, live)

| Page | Blocks | Types found | Valid |
|---|---|---|---|
| `/` | 1 | ProfessionalService, Person, WebSite | ✅ |
| `/es` | 1 | ProfessionalService, Person, WebSite | ✅ |
| `/proyectos/casa-archi-colori` | 2 | CreativeWork, BreadcrumbList (+sitewide graph) | ✅ |
| `/en/proyectos/cucina-MITE` | 2 | CreativeWork, BreadcrumbList (+sitewide graph) | ✅ |
| `/news/archiadvice-lancio` | 2 | Article, BreadcrumbList (+sitewide graph) | ✅ |
| `/sobre-mi` | 2 | BreadcrumbList (+sitewide graph) | ✅ |
| `/contacto` | 2 | BreadcrumbList (+sitewide graph) | ✅ |

No FAQPage, no HowTo, no other deprecated types (SpecialAnnouncement, CourseInfo,
EstimatedSalary, LearningVideo) found anywhere — compliant with policy.

## 2. Resolved since baseline (confirmed live)

- **Critical `siteConfig.url` bug is fixed.** `<link rel="canonical" href="https://mparchistudio.com/proyectos/casa-archi-colori"/>` and all `hreflang` alternates now point to the real domain (verified in raw HTML of the project page). All JSON-LD `url`/`item`/`image` values use `https://mparchistudio.com`, not `example.com`.
- `vatID: "IT07788400963"` added to `ProfessionalService` — resolves the baseline's "no business identifier found" note.
- `areaServed` upgraded to typed `City`/`AdministrativeArea` objects (Bergamo / Lombardia) instead of a flat ISO-country array.
- All dates ISO 8601 (`2026-03-01`, `dateCreated: "2025"`/`"2026"` partial dates — valid).
- EN/ES project pages correctly localize `name`, `description`, `keywords`, `locationCreated.name` ("Milano"→"Milan"), `inLanguage`, and breadcrumb `name` strings — good i18n discipline on the page-specific blocks.

## 3. Findings (this audit)

### Finding 1 — HIGH: Article `author`/`publisher` only resolve via cross-`<script>` `@id`, with no inline fallback

On `/news/archiadvice-lancio`, the `Article` node (script block 1) references:
```json
"author": { "@id": "https://mparchistudio.com/#martina-pozzi" },
"publisher": { "@id": "https://mparchistudio.com/#business" }
```
but the `Person`/`ProfessionalService` nodes that actually carry `name` (and would carry `logo`)
live in a **separate** `<script type="application/ld+json">` block (the sitewide graph, block 2).
Google's structured-data parser generally evaluates each `<script>` block independently for rich
result eligibility and does not reliably merge bare `@id` references across separate script
elements on the same page (this is why schema plugins like Yoast emit one single `@graph` per
page rather than splitting entities across scripts). As shipped, `author` and `publisher` resolve
to bare `{"@id": "..."}` with no inline `name` — if cross-script resolution doesn't happen, Google
sees this as missing `author.name` (required) and `publisher.name`+`publisher.logo` (required for
the Article rich result), which can silently disqualify the page from Article rich results even
though the markup is "valid JSON-LD".

**Fix (pick one):**
- **(a) Preferred** — merge the page-specific block and the sitewide graph into **one** `<script type="application/ld+json">` with a single top-level `@graph` array per page, so every `@id` reference resolves within the same JSON-LD document. This also fixes finding #4 below for free.
- **(b)** Keep two scripts, but duplicate minimal inline properties alongside each `@id`:
```json
"author": { "@id": "https://mparchistudio.com/#martina-pozzi", "name": "Martina Chiara Maria Pozzi" },
"publisher": {
  "@id": "https://mparchistudio.com/#business",
  "name": "MP_archistudio",
  "logo": { "@type": "ImageObject", "url": "https://mparchistudio.com/images/about/MP_ARCHISTUDIO%20LOGO%20S.png" }
}
```
This is valid JSON-LD (a node can carry `@id` plus other properties) and is a safe hedge either way.

### Finding 2 — HIGH: `ProfessionalService` has no `logo` property anywhere; `image` is a project photo, not the brand logo

Across all 7 pages, the sitewide graph's `image` is hardcoded to
`https://mparchistudio.com/images/projects/casa-archi-colori-01.jpg` (an interior-design photo) —
there is no `logo` property at all. This blocks:
- the Article `publisher.logo` requirement in Finding #1,
- Organization logo eligibility for Google Knowledge Panel (which expects an actual square-ish
  brand mark, not an arbitrary content photo).

**Fix:** add a dedicated `logo` property distinct from `image`, e.g.:
```json
"logo": "https://mparchistudio.com/images/about/MP_ARCHISTUDIO%20LOGO%20S.png"
```
(URL-encode the space in the filename, or rename the asset — same note as baseline.)

### Finding 3 — MEDIUM: BreadcrumbList position-2 `name` values are full SEO titles, not nav labels

Google renders the breadcrumb `name` values verbatim in the SERP breadcrumb trail. Currently:
- Projects: `"Progetti di ristrutturazione e interior design a Bergamo"`
- About: `"Chi sono – Martina Pozzi, architetta"`
- Contact: `"Contatti – Architetto a Bergamo"`
- News: `"News e pubblicazioni"` (borderline acceptable, shorter)

These look like reused `<title>`/H1 strings rather than short nav labels, producing an unnaturally
long, keyword-stuffed breadcrumb trail (e.g. `MP_archistudio › Progetti di ristrutturazione e
interior design a Bergamo › Casa Archi & Colori`), which can get truncated in SERPs and read as
spammy. **Fix:** use the same short labels as the actual site navigation (`Progetti`, `Chi sono`,
`Contatti`, `News`) for breadcrumb position 2, keep the long/keyword string only in `<title>`/`og:title`.

### Finding 4 — MEDIUM: cross-locale inconsistency in `ProfessionalService.url` / `Person.url`

The same `@id` (`https://mparchistudio.com/#business`, `#martina-pozzi`) carries a different `url`
depending on which locale page renders it: `https://mparchistudio.com` on IT pages,
`https://mparchistudio.com/es` on `/es`, `https://mparchistudio.com/en` on EN pages. Since `@id` is
meant to be a stable identifier for one real-world entity, its declared `url` should also be
stable. **Fix:** set `url` to a single constant canonical value (e.g. always
`https://mparchistudio.com/`, the default-locale homepage) across every locale's copy of the
sitewide graph; let `inLanguage`/`hreflang` carry the localization instead.

### Finding 5 — MEDIUM: `ProfessionalService.description` is hardcoded in Italian on `/es` and `/en` pages

Confirmed identical Italian string present verbatim in the sitewide graph on `/es` and
`/en/proyectos/cucina-MITE`:
`"Martina Pozzi, architetta a Bergamo: ristrutturazioni chiavi in mano, interior design su misura e consulenza all'acquisto casa."`
This contradicts the project's own i18n rule (`CLAUDE.md`: "textos del cuerpo... se traducen en
cada locale") — unlike the page-specific CreativeWork/Article/Breadcrumb blocks, which *are*
correctly localized. **Fix:** source `ProfessionalService.description` (and optionally
`Person.jobTitle`, currently always `"Architetta"`) from `messages/{locale}.json` instead of a
single hardcoded IT literal, same pattern already used for the project/news page-level schema.

### Finding 6 — LOW / INFO: page-specific blocks are a bare top-level array, not `@graph`

`CreativeWork`+`BreadcrumbList` and `Article`+`BreadcrumbList` are each emitted as a JSON array of
two full node objects (each repeating its own `@context`), rather than
`{"@context":"...","@graph":[...]}`. This is valid JSON-LD (arrays of node objects are permitted at
the top level) and most tooling parses it fine, but wrapping in a single `@graph` is the more
conventional/robust pattern — and, combined with Finding #1(a), would let you fold in the sitewide
graph too, solving the cross-script reference risk in one move.

### Finding 7 — INFO: `CreativeWork` has no `@id` / `mainEntityOfPage` / `publisher`

Not required — there is still no dedicated Google rich result for portfolio/case-study pages, so
this doesn't block anything. Adding `@id` and linking `publisher` to `#business` would just
improve internal graph consistency and give AI/GEO crawlers a cleaner entity link. Low priority.

### Confirmed still-pending (expected, not a new defect)

- `hasCredential` (Ordine degli Architetti registration number) — absent, awaiting client data as previously agreed.
- `openingHoursSpecification` — absent, awaiting client data as previously agreed.

### Confirmed compliant with policy

- No `FAQPage` anywhere on the site — correctly not added (no Google SERP benefit since the May 7,
  2026 retirement).
- No `HowTo`, `SpecialAnnouncement`, or other retired/deprecated types present or recommended.

## 4. Validation Checklist (applied to all 7 live blocks)

1. ✅ `@context` is `https://schema.org` everywhere (not `http`)
2. ✅ All `@type`s valid, none deprecated
3. ✅ Required properties present for `BreadcrumbList` (position/name/item) on every inner page
4. ⚠️ Required/recommended properties for `Article` rich results are present **in source data**
   (`headline`, `image`, `datePublished`, `dateModified`, `mainEntityOfPage` ✅) but `author.name`
   and `publisher.name`/`publisher.logo` are not resolvable without cross-script `@id` merging —
   see Finding #1
5. ✅ No placeholder text found (no `[Business Name]`-style strings)
6. ✅ URLs absolute, correct domain (`https://mparchistudio.com`) — baseline's canonical/hreflang
   `example.com` bug is confirmed fixed in live HTML
7. ✅ Dates ISO 8601
8. ❌ `logo` missing on `ProfessionalService` (Finding #2)
9. ❌ Locale consistency: `description` not translated on `/es`/`/en` (Finding #5); `url` not
   stable across locales for the same `@id` (Finding #4)

## 5. Priority Summary

| # | Severity | Finding | Fix effort |
|---|---|---|---|
| 1 | High | Article author/publisher only resolve via cross-script `@id`, no inline name/logo | Low — merge scripts into one `@graph`, or add inline `name`/`logo` alongside each `@id` |
| 2 | High | No `logo` property on `ProfessionalService`; `image` is a project photo | Low — add one `logo` string field |
| 3 | Medium | Breadcrumb position-2 names are full SEO titles, not nav labels | Low — swap to existing nav message keys |
| 4 | Medium | `ProfessionalService`/`Person` `url` varies by locale for the same `@id` | Low — hardcode canonical root URL |
| 5 | Medium | `ProfessionalService.description` hardcoded in Italian on ES/EN pages | Low–Medium — wire through `messages/{locale}.json` |
| 6 | Low/Info | Page-specific blocks use bare array instead of `@graph` | Cosmetic, folds into fix for #1 |
| 7 | Info | `CreativeWork` missing `@id`/`mainEntityOfPage`/`publisher` | Optional polish |
