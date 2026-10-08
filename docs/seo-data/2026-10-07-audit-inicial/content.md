# Content Quality / E-E-A-T: mparchistudio.com

Crawl date: 2026-10-07. 60 URLs fetched (20 paths x it/es/en) plus /tappeti and /sitemap.xml, raw HTML with no JS rendering (is_spa=false). Word counts come from trafilatura `extracted_text`. Source of truth checked in `src/app/[locale]/layout.tsx`, `src/lib/constants.ts`, `messages/*.json`, and `content/`.

## Scores

| Metric | Score |
|---|---|
| **Content Quality (overall)** | **52 / 100** |
| E-E-A-T composite | 57 / 100 |
| - Experience (20%) | 70 |
| - Expertise (25%) | 55 |
| - Authoritativeness (25%) | 50 |
| - Trustworthiness (30%) | 55 |
| AI citation readiness | 28 / 100 |
| Templated metadata (metadata_template.py) | site_risk=low, templated_ratio=0.0, shared_cta_phrases={} |

The E-E-A-T weights belong to this skill's own scoring model. Google does not publish any.

## Findings

### CRITICAL

**C1. Canonical, hreflang, og:url and sitemap all point to `https://example.com`.**
- Evidence: every one of the 60 pages has `<link rel="canonical" href="https://example.com/{locale}">`. The `alternate` hreflang links go to `example.com/es|en|it`, `og:url` is `https://example.com`, and sitemap.xml `<loc>` values are `https://example.com/es...`. The source is `src/lib/constants.ts:7`, which sets `url: 'https://example.com'`.
- There is a second bug on top of the wrong domain. The canonical is set once in the layout as `${url}/${locale}`, so every subpage, including all project and news pages, canonicalises to the locale homepage. The unprefixed IT URL also canonicalises to `/it`, which returns a 307 redirect.
- Impact on content: Google is being told that no project or news page is the canonical version of itself. The whole content inventory is effectively undiscoverable or folded into the homepage, and no content work will pay off until this is fixed. (This is a technical issue, but it blocks every content finding below.)
- Fix: set `url: 'https://mparchistudio.com'`. Generate a per-page `alternates.canonical` and `languages` in each `generateMetadata`, using the real path. Use IT unprefixed, add `x-default`, and remove the canonical from the layout.

### HIGH

**H1. The homepage title and description are generic, with no name, brand or location.**
- Evidence: IT `Studio di Architettura | Portfolio`, ES `Estudio de Arquitectura | Portfolio`, EN `Architecture Studio | Portfolio`, all from `messages/*.json > Metadata`. The description talks about "progetti commerciali", but the site has no commercial project. The homepage H1 is `Ristruttura senza pensieri`, which also has no entity or location.
- Fix (IT example): title `Architetto a Bergamo – Martina Pozzi | MP_archistudio`. Description: `Arch. Martina C.M. Pozzi: ristrutturazioni, restyling e interior design su misura a Bergamo, Milano e Monza. Consulenza ArchiAdvice in videocall.` Write a native equivalent for ES and EN, and remove "commerciali" unless real commercial work exists.

**H2. The Sobre-mi, Servicios and Contacto metadata is hardcoded in Spanish on every locale.**
- Evidence: `/sobre-mi`, `/en/sobre-mi` and `/es/sobre-mi` all have title `Sobre Mí | MP_archistudio` and description `Arquitecta con más de 10 años de experiencia...`. Servicios (`Servicios | ...`) and Contacto (`Contacto | ... Contacta con el estudio...`) behave the same way. The sources are the static `metadata` objects in `src/app/[locale]/{sobre-mi,servicios,contacto}/layout.tsx`.
- Impact: the Italian and English pages show Spanish snippets, the three locales duplicate each other's metadata, and Google sees a language mismatch.
- Fix: move these to `generateMetadata` with `getTranslations`. Suggested IT titles: `Chi sono – Arch. Martina Pozzi, architetta a Bergamo`, `Servizi di architettura e interior design a Bergamo`, `Contatti – MP_archistudio Bergamo`.

**H3. Years of experience contradict each other (a trust problem).**
- Evidence: the about-page body says "oltre 15 anni di esperienza" / "over 15 years" (and the timeline starts with a 2011 degree). The about meta description says "más de 10 años".
- Fix: use one figure everywhere. Prefer a verifiable anchor such as "dal 2011" alongside the number.

**H4. No proof of professional registration (Expertise and Trust).**
- Evidence: 0 of 60 pages mention "Ordine degli Architetti", "iscritta", "Colegio" or a registration number. The footer says "by Arch. Martina C.M. Pozzi" and shows a P.IVA, but nothing on the site backs up the "Arch." title. For YMYL-adjacent work like building permits and purchase due diligence ("Consulenza all'acquisto: agibilità, catasto"), registration is the key credential.
- Fix: on /sobre-mi and in the footer, add "Iscritta all'Ordine degli Architetti P.P.C. della Provincia di [X], n. [NNNN]", plus any COA Sevilla/Spain equivalent if it applies. Link to the Ordine's albo lookup. Mirror this in `Person.hasCredential` schema.

**H5. Project pages are thin: 133 to 600 words, with a median around 185.**
- Evidence (IT): cucina-parigina 133, bagno-italian-summer 144, bagno-casa-peonia 156, bagno-casa-archi-colori 183, appartamento-lovingcolors 300, casa-archi-colori 384, cucina-MITE 388, restyling-casa-peonia 600. ES and EN are similar.
- These pages carry the strongest Experience signal on the site (real photos, location, year, m²), but the text is mostly mood copy. It does not cover the brief, constraints, decisions, materials or brands, budget range, timeline, or the before and after.
- Fix: expand each page to roughly 400–700 words using a fixed structure. Suggested sections: Brief / Criticità; Soluzioni (with specific products, finishes and dimensions); Materiali e fornitori; Tempi e budget indicativo; Prima/Dopo; a client quote. Link each project to the press coverage about it (see M3).

**H6. There is no structured data on any page.**
- Evidence: `structured_data.block_count = 0` on all 60 pages.
- Fix: add `ProfessionalService`/`LocalBusiness` (name, address Via Bologna 2 24128 Bergamo, telephone, `vatID`, `areaServed`, `sameAs` Instagram/LinkedIn/Pinterest) and `Person` (Martina Chiara Maria Pozzi, `jobTitle` Architetto, `alumniOf` Politecnico di Milano, `hasCredential`). Add `CreativeWork` per project and `Article`/`NewsArticle` per news item, with author, datePublished and dateModified. Add `BreadcrumbList`.

### MEDIUM

**M1. The title template doubles the brand.**
- Evidence: 48 of 60 titles end in `| MP_archistudio | MP_archistudio`, for example `Cucina MITE | MP_archistudio | MP_archistudio`. The cause is that the pages append `| MP_archistudio` themselves while the layout template also applies `%s | MP_archistudio`. `/tappeti` does the same thing.
- Fix: remove the manual suffix from `proyectos/page.tsx`, `proyectos/[slug]/page.tsx`, `news/page.tsx`, `news/[slug]/page.tsx` and `tappeti/layout.tsx`.

**M2. Project titles and H1s are not localised or descriptive.**
- Evidence: ES and EN keep the Italian titles (`Bagno ITALIAN SUMMER`, `Cucina PARIGINA`), so the titles are identical across 3 locales. The projects with no location in the title (all 8) also give no query match ("bathroom renovation Bergamo"). On the EN and ES detail pages the category label renders as raw Italian ("Cucine"), even though `ProjectCategories` has translations, which points to a missing `tCat()` lookup on the detail page.
- Fix: keep the project's proper name but add a localised descriptor and place. For example: EN `Italian Summer – Blue Striped Bathroom Renovation, [City]`; ES `Baño Italian Summer – reforma de baño en [ciudad]`. Translate the category label on the detail page.

**M3. Contextual internal linking is weak.**
- Evidence: apart from the nav and footer, project pages have a single "next project" link. The news article about Loving Colors in Cose di Casa (`/news/cose-di-casa-ottobre-2022`) does not link to `/proyectos/appartamento-lovingcolors`. The HOME n.36 nursery article does not link to `/proyectos/casa-archi-colori`. `il-colore-nell-architettura` mentions Loving Colors but links to a news item instead of the project. Project pages also do not link to the matching service, and there is no "Pubblicato su" block linking back to the press.
- Fix: link press items to their projects in both directions. Link projects to the matching service (Restyling / Progettazione 360°) and to /contacto.

**M4. News posts are short and mostly secondhand.**
- Evidence: 111–204 words. The Archiboost interview (120 words IT) only summarises the interview and links out. The ES `collezione-tappeti-sevilla` has 40 words of extracted body. The interview body renders literal markdown `**TALKS — Conversazioni con i protagonisti...**`, so the asterisks appear on the page.
- Fix: add 3–5 key Q&A excerpts from the interview, quoted with attribution. Extend the Sevilla rug post with materials, sizes and the design story. Fix the bold rendering in the news MDX pipeline. Put an author byline ("Arch. Martina Pozzi") and a dateModified on each article.

**M5. The global metadata has wrong-market keywords and an author that is a brand, not a person.**
- Evidence: in `layout.tsx`, `keywords: ['arquitectura','diseño','interiorismo','reformas','vivienda','Madrid','arquitecta']` is served on all 60 pages, including IT and EN. The studio is in Bergamo and Sevilla, not Madrid. `authors: [{ name: 'MP_archistudio' }]`. The `<html>` tag has no `lang` attribute (`<html>`). `og:locale` falls back to `es_ES`.
- Fix: remove `keywords`, which Google ignores and which here signals the wrong location. Set `authors` to Martina C.M. Pozzi with url `/sobre-mi`. Render `<html lang={locale}>`. Note that the Metadata `en_US` locale should arguably be `en_GB`, since the site uses British spelling.

**M6. Contact and trust details are inconsistent.**
- Evidence: the contact address is a personal `martina_pozzi_17@hotmail.com`. The copy alternates between "ti risponderemo" / "Raccontaci" (we) and the first-person voice used everywhere else. The project-type options on the contact form ("Villa unifamiliare", "Progetto commerciale") do not match the services offered. The contact page has about 30 words of extracted body copy, with no map and no service area.
- Fix: use a domain email (info@mparchistudio.com). Use one consistent voice. Align the form options with the four services. Add a service-area sentence such as "Bergamo, Milano, Monza e Brianza; consulenze online in IT/ES/EN".

**M7. There is no `og:image` on any page.**
- Evidence: `og:image` is absent on all 60 pages, while `twitter:card=summary_large_image`.
- Fix: use the project coverImage per page, plus a default studio image.

### LOW

**L1. Readability is good.** The about page averages about 12 words per sentence and Servicios about 13. `restyling-casa-peonia` averages 26 words per sentence, with 7 sentences over 30 words. Split the long sentences there.

**L2. Homepage depth.** About 270 words of extracted body in IT (500+ recommended for a homepage). There are no featured press logos ("Come visto su Cose di Casa, HOME, Archiboost") and no testimonials.

**L3. Freshness.** News runs from Oct 2022 to Aug 2026. Projects carry a year but no modified date. Add `dateModified` to the articles.

**L4. Image alt text.** All `<img>` elements have an alt, so there is no issue here.

## Duplicate content across locales

ES and EN body copy is genuinely translated, not machine-duplicated: IT, ES and EN word counts stay within ±10%, the phrasing is idiomatic, and no Italian residue turned up in the ES/EN bodies. The duplication comes from three places:
- Sobre-mi, Servicios and Contacto metadata is in Spanish on all three locales (H2).
- Project titles and H1s are identical in every locale (M2).
- The canonical points every page to the locale root (C1), which turns 60 distinct pages into near-duplicates of 3 homepages.

## E-E-A-T evidence

- **Experience (70):** 8 real projects with photo galleries, location (Monza and others), year, m², and status "Realizzato". Press coverage in Cose di Casa n.10 2022, HOME n.36 2026 and Archiboost Talks 2026. Own product line (SEVILLA rugs with Panizza Studio). Missing: client testimonials, before/after, process detail.
- **Expertise (55):** Politecnico di Milano degree, a timeline (2011 degree, Vázquez Consuegra in Sevilla, Exe Arquitectura in Barcelona, own studio from 2021), and an opinion piece on colour. Missing: Ordine registration, technical depth in the project write-ups, and bylines on articles.
- **Authoritativeness (50):** 3 press or media mentions, with an external link to cosedicasa.com, and LinkedIn/Instagram/Pinterest profiles. Missing: schema `sameAs`, links from the press pages back to the projects, awards, and a "Pubblicazioni" section on the about page.
- **Trustworthiness (55):** physical address in Bergamo, phone, P.IVA IT07788400963, privacy policy, and a full legal name in the footer. Lowered by the hotmail address, the 10-vs-15-year contradiction, wrong-language metadata, the "Madrid" keyword, and the example.com canonicals.

## AI citation readiness (28/100)

- No schema entities (Person, ProfessionalService) for an AI system to resolve "who is Martina Pozzi / MP_archistudio".
- The canonicals point to example.com, which risks the content being attributed to the wrong entity.
- There are few quotable, self-contained facts. The copy is mostly emotive ("un'oasi carta da zucchero") with few hard numbers. Exceptions: 8.20 m², 80 mq, a 60-minute consultation.
- There is no FAQ for high-intent questions: "Quanto costa una ristrutturazione a Bergamo?", "Cosa include ArchiAdvice e quanto costa?", "Cosa controlla un architetto prima dell'acquisto di casa?".
- Fix: add an entity block to /sobre-mi along the lines of "Martina C.M. Pozzi è un'architetta iscritta all'Ordine di..., fondatrice di MP_archistudio (Bergamo, 2021)". Add a services FAQ with concrete answers on prices, timelines and deliverables. Add a "Dettagli" fact list to each project.

## Structured findings (audit-data.json, category "Content Quality")

```json
[
 {"id":"C1","severity":"critical","title":"Canonical/hreflang/og:url/sitemap point to example.com; all subpages canonicalise to locale root","evidence":"src/lib/constants.ts url='https://example.com'; layout canonical `${url}/${locale}`","fix":"Real domain + per-page canonical/alternates"},
 {"id":"H1","severity":"high","title":"Generic homepage title/description with no brand/name/location","evidence":"'Studio di Architettura | Portfolio'","fix":"'Architetto a Bergamo – Martina Pozzi | MP_archistudio'"},
 {"id":"H2","severity":"high","title":"Spanish metadata hardcoded on it/en for sobre-mi, servicios, contacto","evidence":"'Sobre Mí | MP_archistudio' on /sobre-mi and /en/sobre-mi","fix":"generateMetadata + getTranslations"},
 {"id":"H3","severity":"high","title":"Contradictory years of experience (10 vs 15)","evidence":"meta 'más de 10 años' vs body 'oltre 15 anni'","fix":"Single figure"},
 {"id":"H4","severity":"high","title":"No Ordine degli Architetti registration","evidence":"0/60 pages","fix":"Add registration no. + albo link + Person.hasCredential"},
 {"id":"H5","severity":"high","title":"Thin project pages","evidence":"133-600 words, median ~185","fix":"Brief/solutions/materials/budget/timeline/testimonial structure"},
 {"id":"H6","severity":"high","title":"No structured data","evidence":"block_count=0 on 60 pages","fix":"ProfessionalService, Person, CreativeWork, Article, BreadcrumbList"},
 {"id":"M1","severity":"medium","title":"Double brand suffix in titles","evidence":"48/60 titles '| MP_archistudio | MP_archistudio'","fix":"Remove manual suffix"},
 {"id":"M2","severity":"medium","title":"Project titles not localised/descriptive; category label untranslated on detail","evidence":"EN H1 'Bagno ITALIAN SUMMER', label 'Cucine'","fix":"Localised descriptor + city; tCat()"},
 {"id":"M3","severity":"medium","title":"Weak contextual internal links (press not linked to projects)","evidence":"cose-di-casa news does not link appartamento-lovingcolors","fix":"Bidirectional press<->project<->service links"},
 {"id":"M4","severity":"medium","title":"Thin news posts; literal ** markdown in interview","evidence":"111-204 words; ES sevilla 40 words","fix":"Expand, quote interview, fix renderer, add bylines"},
 {"id":"M5","severity":"medium","title":"Global keywords include Madrid/Spanish; author is brand; html lang missing","evidence":"layout.tsx keywords; <html>","fix":"Remove keywords, Person author, lang={locale}"},
 {"id":"M6","severity":"medium","title":"Hotmail address, we/I voice mix, form options do not match services","evidence":"martina_pozzi_17@hotmail.com","fix":"Domain email, consistent voice"},
 {"id":"M7","severity":"medium","title":"No og:image","evidence":"0/60","fix":"coverImage per page"},
 {"id":"L1","severity":"low","title":"Long sentences in restyling-casa-peonia","evidence":"avg 26 words/sentence","fix":"Split"},
 {"id":"L2","severity":"low","title":"Homepage depth ~270 words; no press/testimonials strip","fix":"Add 'Come visto su' + testimonials"}
]
```
