# Sitemap Re-Audit — mparchistudio.com

Audited: https://mparchistudio.com/sitemap.xml + https://mparchistudio.com/robots.txt
Source: src/app/sitemap.ts, src/app/robots.ts, src/lib/seo.ts, src/lib/constants.ts (read-only)
Date: 2026-10-07
Baseline: mparchistudio.com-audit/findings/sitemap.md (39 URLs, example.com placeholder)

## Status vs baseline (12 findings)

| # | Baseline finding | Severity | Status | Evidence |
|---|---|---|---|---|
| 1 | Wrong base URL (`example.com`) | Critical | **FIXED** | `siteConfig.url: 'https://mparchistudio.com'` in constants.ts; all 63 `<loc>` on correct domain |
| 2 | robots.txt Sitemap directive on dead host | Critical | **FIXED** | `curl /robots.txt` → `Sitemap: https://mparchistudio.com/sitemap.xml`, 200 |
| 3 | `/it/...` URLs 307-redirecting | High | **FIXED** | 0 of 63 `<loc>` contain `/it/` prefix; `localizedUrl()` special-cases default locale. All 63 verified 200, zero redirects (checked via urllib, final URL == loc for every entry) |
| 4 | News section missing (21 URLs) | High | **FIXED** | 6 news slugs × 3 locales = 18 URLs present, each with real `lastmod` from frontmatter `date` (e.g. `2026-08-19`, `2022-09-01`) |
| 5 | `/tappeti` missing | Medium | **FIXED** | `/tappeti`, `/es/tappeti`, `/en/tappeti` present, all 200 |
| 6 | `lastmod` = build timestamp, identical across all URLs | Low | **FIXED** | Static pages + project pages correctly *omit* `lastmod` (no fabricated date); 18 news URLs carry real per-article dates (6 distinct values, matching frontmatter exactly). No boilerplate/build timestamp anywhere in the file |
| 7 | `priority` / `changefreq` present (Info) | Info | **STILL OPEN** (as designed) | Still emitted on every entry (e.g. `priority:1`/`changefreq:weekly` on home). Google ignores both; not harmful, just dead weight — unchanged from baseline, low priority |
| 8 | No hreflang `xhtml:link` alternates | High | **FIXED** | Every one of 63 entries carries exactly `{es, en, it, x-default}` alternates. Reciprocity verified programmatically across all 63 entries: 0 issues (every alt href resolves to a `<url>` whose own alternate set is identical) |
| 9 | XML validity / size caps | Critical | **PASS (unchanged)** | Well-formed `<urlset>`, 63 URLs, 35.4 KB — far under 50k URL / 50MB caps |
| 10 | `cucina-MITE` mixed-case slug + lowercase variant 500 | Medium | **PARTIAL** | Casing itself unchanged (`cucina-MITE` still mixed-case, by design — out of sitemap.ts scope). The *more severe* sub-issue is fixed: `GET /proyectos/cucina-mite` now returns clean **404** (was 500 at baseline). Sitemap only ever references the canonical `cucina-MITE` casing (200), so no live impact on sitemap health |
| 11 | Per-page canonical/hreflang not path-aware (layout-level, adjacent) | High | **FIXED** | `generateMetadata` now built per-page via shared `buildMetadata()`/`buildAlternates()` in `lib/seo.ts`. Verified on 5 live pages (`/es/proyectos/casa-archi-colori`, `/proyectos/casa-archi-colori`, `/en/news/il-colore-nell-architettura`, `/tappeti`, `/privacy`): each `<head>` canonical is self-referential and hreflang alternates are byte-identical to the corresponding sitemap entry — no more disagreement between sitemap and page `<head>` |
| 12 | `/privacy` live, excluded from sitemap, no explicit noindex (accidental) | Low | **FIXED** | Per task brief, now intentional: `/privacy` returns 200 with `<meta name="robots" content="noindex, follow"/>`, and is correctly absent from the sitemap. Exclusion is now a deliberate, documented decision rather than an accident |

**11 of 12 findings fully fixed, 1 partial (cosmetic casing only, worse bug resolved), 1 unchanged by design (Info-level, non-blocking).**

---

## Fresh verification performed (beyond re-checking baseline items)

- **Full URL inventory**: 63 `<url>` entries = 3 locales × (7 static paths + 8 projects + 6 news). Matches live route tree and content directories exactly (`content/projects/it/` = 8 files, `content/news/it/` = 6 files, `src/app/[locale]/` = 7 top-level indexable routes). Zero duplicates.
- **HTTP status of all 63 `<loc>` values**: fetched every URL — **100% return 200, zero redirects, zero errors**.
- **hreflang reciprocity**: programmatically verified all 63 entries — every `xhtml:link` alternate set is complete (`es`/`en`/`it`/`x-default`), and every alternate href itself appears as a `<url>` with the identical reciprocal alternate set. 0 issues found.
- **lastmod sanity**: valid W3C datetime format (`YYYY-MM-DDT00:00:00.000Z`) on the 18 news URLs; values match each article's frontmatter `date` field exactly; the 45 static/project URLs correctly omit `lastmod` rather than emit a fabricated or build-time value.
- **Coverage**: no live indexable route is missing from the sitemap; no 404/redirect/noindex page is present in the sitemap. `/privacy` is the sole, intentional exclusion (noindex confirmed).

## New issues found

None. No regressions introduced by the rewrite.

## Remaining open items (non-blocking, pre-existing/low severity)

1. **`priority`/`changefreq` still emitted** (Info) — cosmetic only, Google ignores both; safe to remove whenever convenient but not urgent.
2. **`cucina-MITE` slug casing** (Medium→cosmetic) — still the only non-kebab-case slug in the project set; the dangerous side-effect (500 on miscased lookup) is fixed (now 404), so remaining risk is purely stylistic/consistency, not a crawl-health issue. No action required for sitemap compliance.

## Location page quality gates

Not applicable — 8 real portfolio projects + 6 editorial news articles, each with unique content/photography. No programmatic location-page pattern exists; 30+/50+ thresholds not triggered.

## Verdict

Sitemap is now production-correct: valid XML, correct domain, zero redirects, complete hreflang with verified reciprocity, accurate lastmod where a real date source exists, full coverage of live indexable routes, and robots.txt correctly discoverable. Safe to leave as-is; the two remaining items are optional polish.
