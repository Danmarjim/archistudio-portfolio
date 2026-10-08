# Schema.org Audit — mparchistudio.com

Audited: home (`/`), project (`/proyectos/casa-archi-colori`), news (`/news/archiadvice-lancio`),
about (`/sobre-mi`), contact (`/contacto`). Verified with both raw fetch and forced Playwright
render (`--mode always`) on the homepage — `is_spa: false` on every page, full server-rendered
Next.js HTML (`X-Nextjs-Prerender: 1`), identical zero-block result in both modes, so this is not
a client-injection false negative.

## Schema Score: 8 / 100

Zero structured data exists anywhere on the site. The only "SEO-adjacent" signals present are
plain `<meta>` OpenGraph/Twitter tags and `<link rel="canonical"/alternate>` — and those are
currently broken (see Critical finding below). No JSON-LD, Microdata, or RDFa of any kind was
found on any of the 5 pages tested.

## 1. Detection Results

| Page | JSON-LD blocks | Microdata/RDFa | Notes |
|---|---|---|---|
| `/` (home) | 0 | 0 | raw + forced-render both confirm 0 |
| `/proyectos/casa-archi-colori` | 0 | 0 | |
| `/news/archiadvice-lancio` | 0 | 0 | |
| `/sobre-mi` | 0 | 0 | Client Component (`'use client'`); bio/timeline content only in DOM text |
| `/contacto` | 0 | 0 | Real NAP data present in DOM (phone, address, hours) but not marked up |

No existing schema to validate — this audit is 100% "missing opportunities."

## 2. Critical cross-cutting bug (confirmed live, blocks correct schema rollout)

**`siteConfig.url` = `'https://example.com'`** (`src/lib/constants.ts:7`) is live in production and
leaks into:
- `<link rel="canonical" href="https://example.com/it"/>` on every page
- `<link rel="alternate" hreflang="es/en/it/x-default" href="https://example.com/...">`
- `og:url`, `metadataBase` (`src/app/[locale]/layout.tsx:35,47,69-74`)

Confirmed in the rendered HTML of `/proyectos/casa-archi-colori` (forced-render fetch):
`"canonical","href":"https://example.com/it"` and hreflang alternates all pointing to
`example.com`. This is **Critical, Priority 0** — fix before or together with the schema rollout,
otherwise every `url`/`sameAs`/`mainEntityOfPage` value generated from `siteConfig.url` will be
wrong in production even if the JSON-LD code is correct in the repo.

- **Fix**: change `url: 'https://example.com'` → `url: 'https://mparchistudio.com'` in
  `src/lib/constants.ts`. (Not applied — read-only audit.)
- All JSON-LD drafts below use the hardcoded literal `https://mparchistudio.com` rather than
  `siteConfig.url`, by design, until that bug is fixed.

## 3. Missing Schema Opportunities

| Priority | Type | Scope | Why |
|---|---|---|---|
| High | `ProfessionalService` (LocalBusiness subtype) + `Person` | Site-wide (ideally `[locale]/layout.tsx`) | Establishes the business/professional entity, enables Knowledge Panel eligibility, consolidates NAP + sameAs |
| High | `WebSite` | Site-wide | Baseline entity graph, ties pages to publisher |
| Medium | `BreadcrumbList` | Project, news, about, contact | Eligible Google rich result (breadcrumb trail in SERP) |
| Medium | `CreativeWork` | Project detail pages | No dedicated Google rich result for portfolio/case-study pages, but strengthens topical/entity signals for AI Overviews and Knowledge Graph (GEO) — not a SERP feature claim |
| Medium | `Article` (or `BlogPosting`) | News detail pages | Eligible for Article rich result features (requires `headline`, `image`, `datePublished`, `author`, `publisher`) |
| Info | ~~`FAQPage`~~ | n/a | Not recommended. Google retired FAQ rich results for all sites (May 7, 2026). No SERP benefit; do not add for that reason. No existing FAQPage found on this site to flag. |
| n/a | `HowTo` | n/a | Not recommended (rich results removed Sept 2023). Not present, not suggested. |

## 4. Minor data-quality notes for implementation

- Logo/profile file `public/images/about/MP_ARCHISTUDIO LOGO S.png` has spaces in the filename —
  works but requires URL-encoding (`%20`) in any absolute URL used in JSON-LD; renaming the asset
  (e.g. `mp-archistudio-logo.png`) is cleaner long-term.
- `telephone` found in DOM as `+39 327 126 7024` — valid E.164-compatible, fine to use as-is in
  `telephone`.
- Office hours (`Lunedì a Venerdì`, `9:00 - 18:00`) are real content from
  `messages/it.json` → `ContactPage.info`, not placeholders — safe to encode as
  `OpeningHoursSpecification`.
- Project frontmatter (`category`, `status`, `client`) are internal lookup keys in Italian per
  project convention (see root `CLAUDE.md`) — use the human-readable IT string from frontmatter
  directly in JSON-LD `about`/`additionalType`/`keywords`, do not translate per-locale inside the
  structured data (consistent with how the rest of the codebase treats these fields as canonical
  IT keys with UI-layer translation only).
- `sobre-mi` page is a Client Component — Person/CreativeWork JSON-LD can't be emitted from a
  `generateMetadata` export there; it would need to be injected via a small Server Component
  wrapper (the existing `sobre-mi/layout.tsx` is already a Server Component and already exports
  `metadata`, so it's the natural place to add a `<script type="application/ld+json">`) or a
  shared `<JsonLd>` client-safe component that just renders a `<script>` tag.

## 5. Generated JSON-LD

### 5a. Site-wide graph (Organization + Person + WebSite)

Recommended placement: `src/app/[locale]/layout.tsx` (emitted on every page, all locales), as a
`<script type="application/ld+json">` built from a shared constant/object — do not duplicate the
whole graph on every single page, just reference `@id`s from page-level schema (project/news/
breadcrumbs below).

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://mparchistudio.com/#organization",
      "name": "MP_archistudio",
      "legalName": "MP_archistudio di Arch. Martina C.M. Pozzi",
      "url": "https://mparchistudio.com/",
      "logo": "https://mparchistudio.com/images/about/MP_ARCHISTUDIO%20LOGO%20S.png",
      "image": "https://mparchistudio.com/images/about/MP_ARCHISTUDIO%20LOGO%20S.png",
      "email": "martina_pozzi_17@hotmail.com",
      "telephone": "+39 327 126 7024",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Bologna 2",
        "addressLocality": "Bergamo",
        "postalCode": "24128",
        "addressRegion": "BG",
        "addressCountry": "IT"
      },
      "areaServed": ["IT", "ES"],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "founder": { "@id": "https://mparchistudio.com/#person" },
      "employee": { "@id": "https://mparchistudio.com/#person" },
      "sameAs": [
        "https://www.instagram.com/mp_archistudio/",
        "https://www.linkedin.com/in/martinachiaramariapozzi/",
        "https://es.pinterest.com/MartinaCMPozzi/",
        "https://www.houzz.it/pro/martina-pozzi",
        "https://www.archilovers.com/mparchistudio/",
        "https://www.homify.it/esperti/10014002/mp_archistudio-di-arch-martina-c-m-pozzi",
        "https://www.spazibelli.com/professionisti/arch-martina-pozzi-mp_archistudio"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://mparchistudio.com/#person",
      "name": "Martina C.M. Pozzi",
      "alternateName": "Martina Chiara Maria Pozzi",
      "jobTitle": "Architetta",
      "description": "Architetta con oltre 15 anni di esperienza nella progettazione di spazi residenziali e commerciali, con base a Bergamo e Siviglia.",
      "image": "https://mparchistudio.com/images/about/_K7A9382_1.jpg",
      "url": "https://mparchistudio.com/sobre-mi",
      "worksFor": { "@id": "https://mparchistudio.com/#organization" },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Politecnico di Milano"
      },
      "sameAs": [
        "https://www.instagram.com/mp_archistudio/",
        "https://www.linkedin.com/in/martinachiaramariapozzi/",
        "https://es.pinterest.com/MartinaCMPozzi/",
        "https://www.houzz.it/pro/martina-pozzi",
        "https://www.archilovers.com/mparchistudio/",
        "https://www.homify.it/esperti/10014002/mp_archistudio-di-arch-martina-c-m-pozzi",
        "https://www.spazibelli.com/professionisti/arch-martina-pozzi-mp_archistudio"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://mparchistudio.com/#website",
      "name": "MP_archistudio",
      "url": "https://mparchistudio.com/",
      "inLanguage": ["it", "es", "en"],
      "publisher": { "@id": "https://mparchistudio.com/#organization" }
    }
  ]
}
```

Note: `legalName`/entity naming is a best-effort based on public site content (no VAT/registration
number was found in the DOM to add as an `identifier` — if one exists, add it).

### 5b. BreadcrumbList — project page (`/proyectos/casa-archi-colori`, IT locale)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mparchistudio.com/" },
    { "@type": "ListItem", "position": 2, "name": "Progetti", "item": "https://mparchistudio.com/proyectos" },
    { "@type": "ListItem", "position": 3, "name": "Casa Archi & Colori", "item": "https://mparchistudio.com/proyectos/casa-archi-colori" }
  ]
}
```
(For `/es` and `/en`, prefix all three `item` URLs with `/es` / `/en` and localize `name` for
positions 1–2 using the `Navigation` messages for that locale; position 3 stays the per-locale
MDX `title`.)

### 5c. CreativeWork — project detail (`/proyectos/casa-archi-colori`)

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": "https://mparchistudio.com/proyectos/casa-archi-colori#project",
  "name": "Casa Archi & Colori",
  "description": "Fluidità, Design Sartoriale e Coerenza Cromatica",
  "url": "https://mparchistudio.com/proyectos/casa-archi-colori",
  "mainEntityOfPage": "https://mparchistudio.com/proyectos/casa-archi-colori",
  "creator": { "@id": "https://mparchistudio.com/#person" },
  "publisher": { "@id": "https://mparchistudio.com/#organization" },
  "about": "Ristrutturazione integrale",
  "locationCreated": {
    "@type": "Place",
    "name": "Milano",
    "address": { "@type": "PostalAddress", "addressLocality": "Milano", "addressCountry": "IT" }
  },
  "dateCreated": "2025",
  "keywords": ["ristrutturazione", "colore", "interiordesign", "design sartoriale", "mobili su misura"],
  "creditText": "Marta D'Avenia",
  "image": [
    "https://mparchistudio.com/images/projects/casa-archi-colori-01.jpg",
    "https://mparchistudio.com/images/projects/casa-archi-colori-02.jpg",
    "https://mparchistudio.com/images/projects/casa-archi-colori-03.jpg",
    "https://mparchistudio.com/images/projects/casa-archi-colori-04.jpg"
  ]
}
```

Caveats:
- There is **no dedicated Google rich result for architecture/case-study portfolio pages**.
  `CreativeWork` here is for entity/topical clarity (Knowledge Graph, AI/GEO answer engines), not
  a SERP-feature claim — do not oversell this to the client as "rich snippets."
- `creditText` maps the MDX `photographer` field; use `ImageObject` with `creditText`/`creator`
  per-image instead of a flat array if per-photo photographer credit matters more than simplicity.
- `image` array shown truncated to 4 of 28 actual gallery images — use the full `images` array
  from the MDX frontmatter in the real implementation.
- `category`/`status`/`client` stay in Italian per project convention (`CLAUDE.md`) — do not
  localize these specific string values across `/es`/`/en` JSON-LD.

### 5d. BreadcrumbList — news page (`/news/archiadvice-lancio`, IT locale)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mparchistudio.com/" },
    { "@type": "ListItem", "position": 2, "name": "News", "item": "https://mparchistudio.com/news" },
    { "@type": "ListItem", "position": 3, "name": "Nuovo servizio: ArchiAdvice — la consulenza di 60 minuti", "item": "https://mparchistudio.com/news/archiadvice-lancio" }
  ]
}
```

### 5e. Article — news detail (`/news/archiadvice-lancio`)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://mparchistudio.com/news/archiadvice-lancio#article",
  "headline": "Nuovo servizio: ArchiAdvice — la consulenza di 60 minuti",
  "description": "Hai dubbi su colori, materiali o arredi ma non sai da dove iniziare? Ho creato ArchiAdvice: una videocall di 60 minuti per avere risposte concrete da un'architetta.",
  "url": "https://mparchistudio.com/news/archiadvice-lancio",
  "mainEntityOfPage": "https://mparchistudio.com/news/archiadvice-lancio",
  "image": "https://mparchistudio.com/images/about/_K7A9392.jpg",
  "datePublished": "2026-03-01",
  "dateModified": "2026-03-01",
  "articleSection": "annunci",
  "inLanguage": "it",
  "author": { "@id": "https://mparchistudio.com/#person" },
  "publisher": {
    "@id": "https://mparchistudio.com/#organization",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mparchistudio.com/images/about/MP_ARCHISTUDIO%20LOGO%20S.png"
    }
  }
}
```

Required-property check for Google's Article rich result: `headline` ✅, `image` ✅,
`datePublished` ✅, `author` (with `name` via `@id` resolution) ✅, `publisher.name`+`logo` ✅.
`dateModified` is set equal to `datePublished` because the MDX frontmatter has no `updatedAt`
field — add one if the content is ever revised, and wire it through `lib/news.ts`/`NewsPost`
type rather than faking a change date.

### 5f. BreadcrumbList — about / contact

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mparchistudio.com/" },
    { "@type": "ListItem", "position": 2, "name": "Chi sono", "item": "https://mparchistudio.com/sobre-mi" }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mparchistudio.com/" },
    { "@type": "ListItem", "position": 2, "name": "Contatto", "item": "https://mparchistudio.com/contacto" }
  ]
}
```

## 6. Validation Checklist Applied To All Drafts Above

1. ✅ `@context` is `https://schema.org`
2. ✅ `@type` valid, no deprecated types (no HowTo, no SpecialAnnouncement, no retired
   CourseInfo/EstimatedSalary/LearningVideo)
3. ✅ FAQPage not recommended anywhere (no SERP benefit as of May 2026 retirement; none exists on
   the site today to flag for removal)
4. ✅ Required properties present per type (Article checked explicitly above)
5. ✅ No placeholder text — all values sourced from live DOM content, MDX frontmatter, or
   `messages/it.json`; the one genuinely unknown field (business VAT/registration `identifier`)
   was left out rather than faked
6. ✅ URLs absolute, using `https://mparchistudio.com` (not the buggy `siteConfig.url` value, not
   relative paths)
7. ✅ Dates ISO 8601 (`2026-03-01`; `dateCreated: "2025"` is a valid partial ISO 8601 date)
