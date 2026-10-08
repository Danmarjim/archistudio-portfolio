# Local SEO Re-Audit — mparchistudio.com (v2)

Re-audited (on-site focus, per brief): home (`/`), `/sobre-mi`, `/servicios`, `/proyectos`,
`/contacto` (raw fetch, `is_spa: false`, fully server-rendered), plus `sitemap.xml`, `robots.txt`,
and locale variants (`/es/proyectos`, `/en/proyectos`). One off-site spot-check performed
(PagineGialle) as instructed; other citation profiles (Houzz, Archilovers, Homify, Spazi Belli,
GBP, OAB) were **not** re-crawled this round — treated as unchanged from baseline and marked OPEN
per the brief.

## Local SEO Score: 42 / 100 (was 24/100, +18)

| Dimension | Weight | Score | Weighted | Baseline |
|---|---|---|---|---|
| GBP Signals | 25% | 15/100 | 3.75 | 15/100 (unchanged) |
| Reviews & Reputation | 20% | 20/100 | 4.00 | 20/100 (unchanged) |
| Local On-Page SEO | 20% | 65/100 | 13.00 | 30/100 (+35) |
| NAP Consistency & Citations | 15% | 60/100 | 9.00 | 45/100 (+15) |
| Local Schema Markup | 10% | 75/100 | 7.50 | 5/100 (+70) |
| Local Link & Authority Signals | 10% | 45/100 | 4.50 | 40/100 (+5) |
| **Total** | | | **41.75 ≈ 42/100** | 24.75 ≈ 25/100 |

The jump is driven almost entirely by on-site fixes (schema, metadata, NAP footer, canonical/sitemap
plumbing). Off-site dimensions (GBP, reviews, third-party citation cleanup) are unchanged because
they are client-side tasks not addressed in this dev cycle — exactly as expected.

## Status Table — Baseline Top 10 Actions

| # | Baseline Action | Status | Evidence |
|---|---|---|---|
| 1 | **[Critical]** Fix `example.com` canonical/hreflang/og:url/sitemap/robots | **FIXED** | `canonical`, `og:url` → `https://mparchistudio.com` on all 5 pages checked; `hreflang` alternates (it/es/en/x-default) correctly self-referencing and reciprocal; `sitemap.xml` lists real URLs with correct `xhtml:link` hreflang sets; `robots.txt` `Sitemap:` points to `https://mparchistudio.com/sitemap.xml` |
| 2 | **[Critical]** Confirm GBP exists/verified, correct primary category | **OPEN** | Client/dashboard task — no on-page GBP evidence added (no Maps embed, no GBP link in `sameAs`, no "view on Google" CTA). Still unverifiable from the site; flag for business.google.com check |
| 3 | **[Critical]** Add `ProfessionalService` + `Person` JSON-LD | **PARTIAL (mostly fixed)** | Single JSON-LD `@graph` now present site-wide with `ProfessionalService` (`name`, `legalName`, `url`, `description`, `image`, `email`, `telephone`, `vatID`, full `PostalAddress` incl. street number, `areaServed`, `sameAs`×7) + `Person` (Martina Pozzi, `jobTitle: "Architetta"`, `alumniOf`, `worksFor`) + `WebSite`. **Still missing**: `geo` (lat/long, 5-decimal), `openingHoursSpecification`, and a second `areaServed`/`Place` entity for Siviglia/Seville (schema only lists Bergamo + Lombardia even though body copy on `/sobre-mi`, `/servicios`, `/contacto` still describes the Bergamo+Seville dual-base) |
| 4 | **[High]** Rewrite titles/meta with brand+city+service; fix locale mismatch; fix duplicated "MP_archistudio \| MP_archistudio" | **FIXED** | Home: `"Architetto a Bergamo – Martina Pozzi \| MP_archistudio"`. `/sobre-mi`: `"Chi sono – Martina Pozzi, architetta \| MP_archistudio"`. `/servicios`: `"Servizi di architettura e ristrutturazione a Bergamo \| MP_archistudio"`. `/proyectos`: `"Progetti di ristrutturazione e interior design a Bergamo \| MP_archistudio"` (duplicate suffix gone). `/contacto`: `"Contatti – Architetto a Bergamo \| MP_archistudio"`. Titles now in Italian matching body content (locale-mismatch bug resolved); `/es/proyectos` and `/en/proyectos` also verified correctly localized and non-duplicated |
| 5 | **[High]** Dedicated location+service pages for Bergamo and Seville | **OPEN** | No `/locations/` or city-specific landing pages found; still one undifferentiated site. Seville/Siviglia is still only a passing mention in prose on `/sobre-mi`/`/servicios`/`/contacto`, with zero schema or dedicated-page backing — biggest remaining structural gap (Whitespark's #1 local-organic / #2 AI-visibility factor) |
| 6 | **[High]** Standardize business name string across Houzz/Archilovers/Homify/Spazi Belli | **OPEN** | Off-site, not re-crawled this round per brief — baseline inconsistency (name order, "by"/"di Arch.") assumed unchanged. Note: the new on-site schema at least now has one unambiguous canonical pair — `name: "MP_archistudio"` / `legalName: "Martina Chiara Maria Pozzi"` — giving a clear reference string to push out to the directories |
| 7 | **[High]** Add PagineGialle listing | **OPEN (confirmed)** | Spot-checked this session: searching PagineGialle for "Martina Pozzi" architect in Bergamo (BG) returns only unrelated place-name disambiguation results ("Martina Franca," "Pozzi frazione di..."), no business listing. Still a real citation gap |
| 8 | **[Medium]** Surface Spazi Belli 5.0★/7-review proof on-site; build Google review velocity | **OPEN** | No `aggregateRating`/`Review` schema and no visible "recensioni"/testimonial text found on any of the 5 pages checked; Spazi Belli is still only reachable via a small footer icon link (link itself confirmed present on every page) |
| 9 | **[Medium]** Add phone with `tel:` link to global footer on every page | **FIXED** | Confirmed `href="tel:+393271267024"` plus visible `+39 327 126 7024` in the sitewide `<footer>`, alongside `Via Bologna 2, 24128` / `Bergamo (BG) Italia` / `P.IVA IT07788400963` — footer NAP is now complete on every page, not just `/contacto` |
| 10 | **[Low]** OAB register reference; confirm civic number is deliberate | **PARTIAL** | Civic/house number resolved: site and schema now show `"Via Bologna 2"` (previously just "Via Bologna" with no number) — NAP precision improved for GBP/citation matching. Ordine degli Architetti di Bergamo register number/link still not present anywhere on-site (checked all 5 pages — no "Ordine"/"Architetti" register mention) |

## New / Refined Findings (v2)

1. **JSON-LD now live sitewide** — one `@graph` block (`ProfessionalService` + `Person` + `WebSite`)
   renders identically on home, `/sobre-mi`, `/servicios`, `/proyectos`, `/contacto`. This is the
   single biggest structural improvement in this audit and resolves the "zero schema" finding from
   `schema.md`/baseline entirely for the local-business slice.
2. **Schema gaps remaining** (keeps this from being a 90+ on the Local Schema dimension):
   - No `geo` (`GeoCoordinates`) — recommended property, 5-decimal precision per the skill's
     guidance, not present at all.
   - No `openingHoursSpecification` — reasonable to omit/represent as "by appointment" for a
     solo home-based practice, but currently just absent rather than deliberately encoded.
   - `areaServed` lists only `City: Bergamo` + `AdministrativeArea: Lombardia` — does not reflect
     the Seville/Siviglia dual-base still claimed in on-page copy. Either add a second `Place`
     (Sevilla, Andalucía, ES) to `areaServed`, or (if Seville is being deprioritized as a market)
     remove/soften the Siviglia copy so schema and content agree.
   - `image` on the `ProfessionalService` node points to a project photo
     (`casa-archi-colori-01.jpg`) rather than a logo or professional headshot — works, but a
     dedicated `logo`/`Person.image` would be cleaner for knowledge-panel eligibility.
   - `sameAs` is strong (7 profiles: Instagram, LinkedIn, Pinterest, Houzz, Archilovers, Homify,
     Spazi Belli) but still has no Google Business Profile URL to anchor to, consistent with
     finding #2 (GBP integration still unconfirmed/unlinked).
3. **Canonical/hreflang/sitemap pipeline is now fully consistent and reciprocal** — verified
   directly: `canonical` self-references on every locale/page, the 4-way `hreflang` set
   (it/es/en/x-default) matches between page `<head>` and `sitemap.xml`'s `<xhtml:link>` entries,
   and `robots.txt` points at the correct sitemap on the real domain. This was flagged Critical in
   the baseline because it could suppress indexing/locale-targeting entirely — fully resolved.
4. **Footer NAP is now complete and consistent sitewide**: address (with civic number), phone
   (clickable `tel:`), and P.IVA all appear identically in the footer on every page checked. No
   on-site NAP discrepancy found between footer, schema, and `/contacto` page in this round.
5. **No on-page GBP, Maps, or review-widget signals were added** — this dimension (25% weight,
   the single largest) remains the main score ceiling. Confirmed again this round: no `<iframe>`,
   no `google.com/maps` reference, no review count/stars rendered anywhere in HTML.
6. **PagineGialle gap reconfirmed** via direct spot-check (not just assumed) — still no listing
   found for "Martina Pozzi" / architect in Bergamo.

## Business Type / Industry Vertical

Unchanged from baseline: **Hybrid, leaning SAB** (visible full street address now including civic
number, but still no Maps embed/directions link/GBP evidence); **Architecture / Interior Design**
vertical, correctly modeled in schema now as `ProfessionalService` + nested `Person` with
`jobTitle: "Architetta"` — matches the skill's recommended pattern for this vertical.

## Revised Top 10 Prioritized Actions

1. **[Critical]** Confirm the Google Business Profile exists, is verified, and has the correct
   primary category (Whitespark's #1 ranking factor / #1 negative factor if wrong) — unchanged
   from baseline, cannot be done from the site; requires business.google.com access.
2. **[High]** Add `geo` (5-decimal `GeoCoordinates`) and `openingHoursSpecification` (or an explicit
   "by appointment" encoding) to the existing `ProfessionalService` JSON-LD to close the remaining
   schema completeness gap.
3. **[High]** Resolve the Seville/Siviglia inconsistency: either add a second `areaServed: Place`
   (Sevilla, ES) to match the on-page dual-base claim, or scope the copy back to Bergamo-only if
   Seville is no longer an active service market — schema and content currently disagree.
4. **[High]** Build dedicated Bergamo (and, if still relevant, Seville) location/service landing
   content — still the single biggest structural on-page gap (Whitespark's #1 local-organic / #2
   AI-visibility factor), unchanged since baseline.
5. **[High]** Add a GBP link to the `sameAs` array and surface a visible "vedi le recensioni su
   Google" / Maps embed or directions CTA on the site once the GBP profile is confirmed.
6. **[Medium]** Surface the Spazi Belli 5.0★/7-review social proof directly in page content (not
   just a footer icon) — consider adding `Review`/`aggregateRating` schema once more reviews
   (ideally Google) exist to aggregate.
7. **[Medium]** Add a PagineGialle listing — reconfirmed absent this round.
8. **[Medium]** Standardize the business name string across Houzz/Archilovers/Homify/Spazi Belli
   using the now-canonical schema pair (`name: "MP_archistudio"` / `legalName: "Martina Chiara
   Maria Pozzi"`) as the reference to push to each directory.
9. **[Low]** Add an Ordine degli Architetti di Bergamo register reference (license/registration
   number) for professional E-E-A-T, ideally as `Person.hasCredential` in schema plus a visible
   on-page mention.
10. **[Low]** Point `ProfessionalService.image` at a logo or professional headshot rather than a
    project photo, for cleaner knowledge-panel/rich-result eligibility.

## Limitations Disclaimer

- Per the brief, this round focused on on-site signals; Houzz, Archilovers, Homify, Spazi Belli,
  LinkedIn, and the Ordine Architetti Bergamo register were **not** re-crawled and are assumed
  unchanged from the baseline audit (marked OPEN above without fresh verification).
- PagineGialle was spot-checked directly this session (confirmed still absent) per the brief's
  "spot-check profiles" instruction.
- Live Google Search/Maps/GBP dashboard data was not accessed this session (no DataForSEO MCP
  tools available, no authenticated access) — GBP existence, primary category, and live
  rating/review count remain unverifiable from this audit; recommend a direct
  business.google.com check.
- Review velocity/response-rate/cadence still cannot be assessed — no visible timestamps or owner
  responses found in any on-site content, and third-party profiles weren't re-fetched this round.
