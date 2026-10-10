# Local SEO Audit — mparchistudio.com

Audited: home (`/`), `/contacto`, `/sobre-mi`, `/servicios`, `/proyectos` (raw + rendered fetch,
`is_spa: false`, fully server-rendered Next.js HTML on every page). Cross-checked NAP against
Houzz, Archilovers, Homify, Spazi Belli, PagineGialle, Ordine Architetti Bergamo (OAB). LinkedIn
profile and live Google Search/Maps could not be fetched (auth wall / consent redirect) — see
Limitations.

## Local SEO Score: 24 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 15/100 | 3.75 |
| Reviews & Reputation | 20% | 20/100 | 4.00 |
| Local On-Page SEO | 20% | 30/100 | 6.00 |
| NAP Consistency & Citations | 15% | 45/100 | 6.75 |
| Local Schema Markup | 10% | 5/100 | 0.50 |
| Local Link & Authority Signals | 10% | 40/100 | 4.00 |
| **Total** | | | **24.75 ≈ 25/100** |

(Note: Local Schema Markup aligns with the dedicated schema audit, which found 0 JSON-LD blocks
on every page tested — `schema.md`, score 8/100 overall site schema. I score the local-specific
slice at 5/100 since there is no LocalBusiness/ProfessionalService markup at all.)

## Business Type: Hybrid, leaning SAB (dual-base)

- Footer shows a visible, non-PO-box-looking address: "Via Bologna, 24128 / Bergamo (BG) Italia"
  → brick-and-mortar signal.
- Homepage hero overline: "STUDIO DI PROGETTAZIONE ARCHITETTONICA SARTORIALE D'INTERNI A BERGAMO."
  About page: "Studio con base a Bergamo 🇮🇹 e Siviglia 🇪🇸" — **two-city operation** (Bergamo,
  Italy + Seville, Spain). This is effectively two separate local markets sharing one site/brand,
  with no distinct location page or schema entity per city.
- No Maps embed, no `iframe`, no "get directions" link, no place reference anywhere on the site
  → despite having a visible address, there is zero on-page evidence the address is GBP-verified
  or publicly bookable as a physical location. Treat practically as SAB-style discovery (clients
  find her via web/socials, not walk-in).

## Industry Vertical: Architecture / Interior Design (sole practitioner)

Maps most closely to **Home Services / Professional Services**, not the built-in verticals in the
skill (closest analogue: `GeneralContractor`/`HomeAndConstructionBusiness` family) crossed with a
licensed-professional pattern similar to Legal (`Person` + credentials). Correct schema.org type
is `ProfessionalService` (or `HomeAndConstructionBusiness` if Google's local categories are the
priority) with a nested `Person` for Martina Pozzi carrying her professional credential. Signals
found: "Pratica Edilizia-Urbanistica," "Direzione Artistica," "Coordinamento Cantiere," "Rilievo,"
P.IVA in footer, "Arch." prefix used on third-party listings. No mention anywhere on-site of her
Ordine degli Architetti registration/license number.

## NAP Consistency Audit

| Source | Name | Address | Phone | Notes |
|---|---|---|---|---|
| Site footer (all pages) | "Martina Chiara Maria Pozzi" (copyright line) / "MP_archistudio" (brand) | Via Bologna, 24128 / Bergamo (BG) Italia | **None shown** | No `tel:` link in global footer |
| Site `/contacto` | — | (not repeated, only footer has it) | +39 327 126 7024 (`tel:` link present) | Correct, clickable |
| Houzz | "MP_Archistudio by Arch. Martina C.M. Pozzi" | "24128 Bergamo BG" (no street) | 327 126 7024 | Matches phone; 0 reviews |
| Archilovers | "MP_archistudio" | "Bergamo / Italy" (no street/phone) | — | Thin profile, 1 follower |
| Homify | "MP_archistudio di Arch. Martina C.M. Pozzi" | "Via Bologna 24128 Bergamo Italia" | +39-3271267024 | Matches site; website link correct |
| Spazi Belli | **"Arch. Martina Pozzi MP_archistudio"** (name order reversed) | "Bergamo (Bergamo)" | — | **5.0★ / 7 recensioni** — only place reviews exist |
| PagineGialle | **Not found** | — | — | Searched "Arch. Martina Pozzi" in Bergamo: no matching listing among 200+ results |
| Ordine Architetti Bergamo (OAB) | Not verifiable | — | — | Register exists (architettibergamo.it) but a direct member-search page could not be located/confirmed; site does not link to her OAB profile |
| LinkedIn | Not retrievable (HTTP 999 / bot-blocked) | — | — | Treat as limitation |

**Discrepancies found:**
1. **Business name format is inconsistent across every third-party citation**: "MP_Archistudio by Arch. Martina C.M. Pozzi" (Houzz) vs "MP_archistudio di Arch. Martina C.M. Pozzi" (Homify) vs "Arch. Martina Pozzi MP_archistudio" (Spazi Belli, name-first order) vs "MP_archistudio" (Archilovers, site brand). No single canonical business name string is used twice identically. Pick one canonical form and standardize all five.
2. **Phone number is missing from the global site footer** — it only appears on `/contacto`. Every other page (home, about, services, projects) has an address and email in the footer but no phone, so a user/crawler landing anywhere except the contact page sees incomplete NAP.
3. **Street address has no civic/house number anywhere** (own site, Houzz, Homify all show "Via Bologna, 24128" / "24128 Bergamo BG" with no number) — likely intentional for a home-based solo practitioner, but it weakens GBP/citation matching precision and should be a deliberate decision, not an oversight.
4. **Not listed on PagineGialle**, one of the most-used Italian local directories for professional services — a meaningful citation gap for an IT-based practice.
5. The site's own contact-form phone placeholder text `+39 333 000 0000` is **not** a real discrepancy (it's form `placeholder`/example text, not displayed NAP) — flagged during audit, then ruled out after checking surrounding markup.

## GBP Optimization Checklist

| Signal | Status |
|---|---|
| Maps embed / `iframe` | Missing |
| "View on Google Maps" / directions link | Missing |
| Google review widget or count | Missing |
| GBP posts indicator | Missing |
| Photo evidence tied to GBP (e.g., "photos from Google") | Missing |
| Primary category guessable from content | Likely `Architect` or `Interior Designer` — **cannot verify actual GBP primary category**, which Whitespark 2026 ranks as the #1 ranking factor (and wrong category as the #1 negative factor). This must be checked directly in the GBP dashboard. |
| Live Google rating/review count | Unverifiable (Google Search/Maps blocked this session by a consent redirect) |

Given zero on-page GBP integration and no verifiable public listing found via Search/PagineGialle,
there is no evidence the GBP profile is actively promoted from the website even if one exists.
**Action: confirm GBP exists and is claimed/verified, confirm primary category matches the actual
service offered (architecture/interior design, not a generic contractor category), and add a
"vedi le recensioni su Google" link + embed to the site.**

## Review Health Snapshot

- **On-site**: zero testimonials, zero star ratings, zero `aggregateRating`/`Review` schema on
  any of the 5 pages checked (home, contacto, sobre-mi, servicios, proyectos).
- **Houzz**: 0 reviews ("Potresti essere la prima persona a recensire...").
- **Archilovers**: no review mechanism surfaced, 1 follower.
- **Spazi Belli**: **5.0★ across 7 recensioni** — the only place social proof currently exists,
  and it is not referenced, embedded, or linked prominently from the site (only a small footer
  icon link).
- **Google**: unverifiable this session.
- **Velocity/response rate**: cannot be assessed — no visible timestamps or owner responses on
  any reachable platform.

This is the weakest area after schema: real 5-star social proof exists (Spazi Belli) but is
invisible to a visitor who doesn't click through the footer icon, and the two most
discovery-critical platforms for Italian clients (Google, PagineGialle-adjacent reach) show no
reviews or no listing at all.

## Local On-Page SEO

- **Home `<title>`: "Studio di Architettura | Portfolio"** — generic, no brand name, no city, no
  service keyword. Confirms the user's flagged issue; this is the single highest-leverage on-page
  fix available (title + H1 city/service pairing is free and immediate).
- **Home H1: "Ristruttura senza pensieri"** — no location, no service keyword either. "A BERGAMO"
  only appears in a small decorative overline `<p>` above the H1, not in the H1 itself, not in the
  title, not in the meta description.
- Inner-page titles are in **Spanish** ("Sobre Mí", "Servicios", "Contacto") while the rendered
  **body content is in Italian** ("Architettura empatica", "I miei servizi", "Progetti") — a
  locale-mismatch bug between metadata and content on the default route, independent of the city
  issue but compounding it: none of these Spanish titles mention Bergamo, Siviglia, or any service
  keyword either.
- `/proyectos` title is literally **"Progetti | MP_archistudio | MP_archistudio"** — duplicated
  brand suffix, a template bug.
- **No dedicated location or location+service landing pages** exist (e.g., nothing like
  "Ristrutturazione Bergamo", "Progettazione d'interni Siviglia"). Whitespark 2026 ranks dedicated
  service pages as the #1 local-organic factor and #2 AI-visibility factor — this is a structural
  gap, not just a copy tweak, and matters doubly here because the business legitimately serves two
  distinct cities in two countries that currently share undifferentiated content.
- Footer NAP (address + email) is present sitewide, which is good baseline practice; city name
  "Bergamo" does appear in the footer on every page.

## Local Schema Validation

- **Zero JSON-LD/Microdata/RDFa on any audited page** (confirmed independently; matches
  `schema.md`). No `LocalBusiness`, `ProfessionalService`, `Person`, `Organization`, or
  `BreadcrumbList` markup anywhere.
- Correct target type per the vertical reference: **`ProfessionalService`** (or
  `HomeAndConstructionBusiness` if prioritizing Google category alignment) at the site/organization
  level, with:
  - `name` matching one standardized brand string
  - `address` (PostalAddress) — note the missing street number problem above
  - `telephone`, `email`, `url` (pointing at the real production domain, not `example.com` —
    see Critical cross-cutting issue below)
  - `areaServed` with two `Place` entries (Bergamo, Seville) since this is a genuine dual-location
    SAB-style practice — `sameAs` to Wikidata entries for each city per the skill's SAB guidance
  - `sameAs` array linking Houzz, Archilovers, Homify, Spazi Belli, Instagram, LinkedIn, Pinterest
  - A nested `Person` (Martina Pozzi) with `jobTitle: "Architetto"`, `hasCredential`, and ideally
    `sameAs` to her Ordine Architetti Bergamo register entry once located
  - `geo` with 5-decimal precision once a precise point is decided on (home-based privacy
    permitting — a visible-but-approximate point, or omission with `areaServed` only, is an
    acceptable alternative per the SAB pattern)

## Critical Cross-Cutting Issue (impacts every local signal above)

**`canonical`, `hrefLang` alternates, `og:url`, `sitemap.xml`, and `robots.txt`'s `Sitemap:`
directive all resolve to `https://example.com/...` instead of `https://mparchistudio.com`** on
every page checked (confirmed directly in this audit and in `sitemap.md`). This is almost
certainly a missing production environment variable (site-URL/`metadataBase` fallback) in the
Vercel deployment. Local-SEO impact specifically:
- Google is very likely ignoring the `hrefLang` IT/ES/EN alternates entirely because they don't
  reciprocally resolve on the real domain — undermining geo/language targeting for the Bergamo
  (Italian) vs. Seville (Spanish-speaking) audiences this business actually serves.
- Any GBP "website" field or social share card pulling `og:url` will show/link `example.com`.
- The sitemap Google Search Console would ingest references the wrong host, so new/changed pages
  may not be discovered via sitemap at all right now.

This is flagged as Critical here because it is not a "nice to have" — it can suppress indexing
and locale targeting that every other recommendation in this report depends on. (Full technical
detail owned by `sitemap.md`/`schema.md`; referenced here only for local-SEO impact.)

## Citation Presence Status

| Directory | Present | Notes |
|---|---|---|
| Houzz | Yes | Linked from site; NAP matches; 0 reviews |
| Archilovers | Yes | Linked from site; thin profile |
| Homify | Yes | Linked from site; NAP matches |
| Spazi Belli | Yes | Linked from site; **best review asset (5.0★/7)**; name order inconsistent |
| LinkedIn | Yes | Linked from site; profile content unverifiable this session |
| Instagram / Pinterest / Linktree | Yes | Social, not directory citations, but present and linked |
| PagineGialle | **No** | Not found after search — add |
| Google Business Profile | Unverified | No on-page evidence of integration; existence/category/reviews need direct dashboard check |
| Ordine Architetti Bergamo (OAB register) | Unverified | Register exists at architettibergamo.it; no profile link from site; could not confirm listing this session |

## Location Page Quality

Not applicable as a multi-location doorway-page audit (single site, no `/locations/` structure),
but the business genuinely operates in two cities (Bergamo, Seville) with zero content
differentiation between them — effectively the inverse problem of doorway pages: under-
differentiation rather than duplication risk.

## Top 10 Prioritized Actions

1. **[Critical]** Fix the production site-URL configuration so `canonical`, `hrefLang`, `og:url`,
   `sitemap.xml`, and `robots.txt` all resolve to `https://mparchistudio.com` instead of
   `example.com`. *Fix:* set the missing env var (`NEXT_PUBLIC_SITE_URL`/`metadataBase` source) in
   Vercel production and redeploy; verify with a fresh raw fetch of all five tags/files.
2. **[Critical]** Confirm the Google Business Profile exists, is verified, and check/correct the
   **primary category** (Whitespark's #1 ranking factor / #1 negative factor if wrong). *Fix:*
   log into business.google.com, confirm category is `Architect` (or the closest exact match),
   add Bergamo service-area settings, and link it from the site.
3. **[Critical]** Add `ProfessionalService` + `Person` JSON-LD to every page (home at minimum, then
   `/contacto`, `/sobre-mi`), with the SAB `areaServed` pattern for Bergamo + Seville and a
   `sameAs` array to all 5+ verified citation profiles. *Fix:* use `schema_generate.py` pattern
   from the local-schema-types reference as a base.
4. **[High]** Rewrite the home `<title>` and meta description to include brand + city + service
   (e.g., "MP_archistudio | Architetto a Bergamo — Ristrutturazioni e Interior Design") and move
   "a Bergamo" from the decorative overline into the actual H1 or a subheading. *Fix:* edit
   `generateMetadata`/Hero copy; same treatment for `/sobre-mi`, `/servicios`, `/proyectos` titles
   (also fix the duplicated "MP_archistudio | MP_archistudio" bug and the IT/ES metadata-vs-content
   locale mismatch).
5. **[High]** Create dedicated location+service pages/sections for Bergamo and Seville separately
   (per Whitespark's #1 local-organic / #2 AI-visibility factor) rather than one undifferentiated
   site for two cities in two countries.
6. **[High]** Standardize the business name string to one canonical form and update Houzz,
   Archilovers, Homify, and Spazi Belli listings to match exactly (Spazi Belli currently reverses
   name order).
7. **[High]** Add a PagineGialle listing — currently absent from one of the most common Italian
   local-search directories for professional services.
8. **[Medium]** Surface the Spazi Belli 5.0★/7-review social proof directly on the site (a
   testimonials section or visible badge, not just a footer icon) and begin actively requesting
   Google reviews to build review velocity there too — right now the only visible rating asset is
   one click away from being invisible.
9. **[Medium]** Add the phone number (with `tel:` link) to the global footer on every page, not
   only `/contacto`, so NAP is complete regardless of entry page.
10. **[Low]** Link to / obtain and display an Ordine degli Architetti di Bergamo register
    reference (license/registration number) for professional E-E-A-T and as an additional
    Italian-specific citation; confirm the civic/house-number omission in the address is a
    deliberate privacy choice rather than an oversight.

## Limitations Disclaimer

- Live Google Search and Google Maps results were blocked by a consent-wall redirect this session;
  GBP existence, category, live rating/review count, and local-pack position could not be directly
  verified. Recommend checking business.google.com directly and, if available, running
  `business_data_business_listings_search` / `serp_organic_live_advanced` via DataForSEO MCP tools
  (not available in this session) for live confirmation.
- LinkedIn profile returned HTTP 999 (bot-blocked); content there is unverified.
- Ordine Architetti Bergamo register search interface was not directly reachable in this session
  (likely JS-driven search); presence/absence in the official register is unconfirmed, not denied.
- Review velocity/response-rate/cadence could not be assessed on any platform — none of the
  reachable sources expose review timestamps or owner replies in their fetched content.
- No paid citation-tracking tool (e.g., Moz Local, BrightLocal) was used; citation coverage beyond
  the five sources explicitly requested plus PagineGialle/OAB was not exhaustively checked.
