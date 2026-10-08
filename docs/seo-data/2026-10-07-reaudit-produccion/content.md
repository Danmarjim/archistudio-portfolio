# Content Quality / E-E-A-T re-audit: mparchistudio.com

Crawl date: 2026-10-07. All 63 sitemap URLs (21 paths x it/es/en) fetched raw (`render_page.py --mode never`, is_spa=false) plus curl HTML for head/JSON-LD. Visible-text checks were done on HTML with `<script>` removed, because the RSC payload embeds every `messages/*.json` string on every page and would produce false positives (e.g. "10 anni", "hotmail" x8). Baseline: `../mparchistudio.com-audit/findings/content.md`.

## Scores

| Metric | Baseline | Now |
|---|---|---|
| **Content Quality (overall)** | 52 | **67** |
| E-E-A-T composite | 57 | 64 |
| - Experience (20%) | 70 | 72 |
| - Expertise (25%) | 55 | 58 |
| - Authoritativeness (25%) | 50 | 62 |
| - Trustworthiness (30%) | 55 | 66 |
| AI citation readiness | 28 | 52 |
| Templated metadata | low / 0.0 / {} | site_risk=low, templated_ratio=0.0, shared_cta_phrases={} (63 pages) |

E-E-A-T weights are this skill's internal model, not Google's.

## Baseline status

| ID | Finding | Status | Production evidence |
|---|---|---|---|
| C1 | example.com canonicals; subpages canonicalise to locale root | **FIXED** | 63/63 self-referencing canonicals on `https://mparchistudio.com`, IT unprefixed; 4 hreflang incl. `x-default`; sitemap `<loc>` on real domain |
| H1 | Generic homepage title/description | **FIXED** | `Architetto a Bergamo – Martina Pozzi \| MP_archistudio`; ES/EN native equivalents; "commerciali" gone from meta |
| H2 | Spanish metadata on sobre-mi/servicios/contacto in all locales | **FIXED** | e.g. `Chi sono` IT / `About me – Martina Pozzi, architect` EN / `Contatti – Architetto a Bergamo` IT |
| H3 | 10 vs 15 years contradiction | **FIXED** | Visible text only says "oltre 15 anni / over 15 years / más de 15 años" (sobre-mi); meta no longer states a figure; consistent with 2011 degree. Optional: add "dal 2011" anchor |
| H4 | No Ordine registration | **STILL OPEN (client input)** | 0/63 pages; no `hasCredential` in Person schema |
| H5 | Thin project pages | **STILL OPEN (client input)** | IT word counts unchanged: 133 / 144 / 156 / 183 / 300 / 384 / 388 / 600 |
| H6 | No structured data | **FIXED** | ProfessionalService + Person + WebSite on all pages (vatID, address, telephone, 7 `sameAs`); BreadcrumbList on inner pages; CreativeWork (creator, locationCreated, dateCreated) on projects; Article (author @id, publisher, datePublished, isBasedOn) on news |
| M1 | Double brand suffix | **FIXED** | 0/63 titles with duplicated `\| MP_archistudio` |
| M2 | Project titles not localised; category label untranslated | **PARTIAL** | Category labels now translated on ES/EN detail (no "Cucine"/"Bagni" in EN/ES visible text); titles gained a city. Still: H1/titles keep Italian names in ES/EN (`Bagno ITALIAN SUMMER – Camparada`) with no localised descriptor; see N2 |
| M3 | Press not linked to projects | **STILL OPEN** | `/news/cose-di-casa-ottobre-2022` main links: /news, 2 other news, external cosedicasa.com, no `/proyectos/appartamento-lovingcolors`. HOME n.36 does not link `/proyectos/casa-archi-colori`. Project pages link only to /proyectos + 1-2 sibling projects; no service or /contacto link |
| M4 | Thin news, literal `**`, no bylines | **PARTIAL** | `**` no longer in visible text (FIXED); Article schema has author @id. Still: bodies 110-207 words; Archiboost has no Q&A excerpts; Sevilla post is ~20 words + gallery in all three locales (not only ES); no visible byline in the article header (only the site-wide footer "by Arch. Martina C.M. Pozzi") |
| M5 | Madrid keywords, brand author, no html lang, og:locale es_ES | **FIXED** | No `keywords` meta; `author=Martina Pozzi`; `<html lang>` = it/es/en; og:locale it_IT / es_ES / en_GB |
| M6 | Hotmail, we/I voice, form options | **STILL OPEN** (email = client input) | `martina_pozzi_17@hotmail.com` in footer of 63/63 pages and in schema `email`. IT contact still "Raccontaci la tua idea e ti risponderemo"; form options still "Villa unifamiliare / Ristrutturazione completa / Progetto commerciale" (EN "Single-family", ES "Vivienda unifamiliar"), not the 4 services; contact body ~30 words, no service-area sentence |
| M7 | No og:image | **FIXED** | og:image on 63/63 |
| L1 | Long sentences in restyling-casa-peonia | **STILL OPEN** | avg 26.1 words/sentence, 7 > 30 words (unchanged) |
| L2 | Homepage depth / press strip / testimonials | **PARTIAL** | "Pubblicato su: Archiboost, HOME, Cose di Casa" strip now on homepage linking the 3 press items. Body still ~271 words (IT); testimonials = client input |
| L3 | Freshness / dateModified | **PARTIAL** | Article `dateModified` present but equals `datePublished` on all news; projects carry `dateCreated` year only |

## New findings

**N1 (medium) - 6 of 8 project meta descriptions are still mood copy.** Only casa-archi-colori and cucina-MITE were rewritten with type + place + size. The rest carry no service, location or size, e.g. appartamento-lovingcolors `Più personalità, più spazio. Scopri la magia di una stanza che prima non c'era.`, bagno-italian-summer `Entrando si è avvolti dal blu...`. Fix: same pattern as casa-archi-colori, e.g. `Restyling di un bagno a Camparada (MB): rigato blu, forme morbide... Progetto di Arch. Martina Pozzi.`

**N2 (low) - City localisation is inconsistent in ES/EN project titles.** `Cucina MITE – Milán` (ES) / `– Milan` (EN), but `Casa Archi & Colori – Milano` stays Italian in ES and EN. Pick one rule (localise exonyms: Milán/Milan) and apply it to all projects, title and CreativeWork `locationCreated`.

**N3 (low) - BreadcrumbList item names reuse the full SEO title.** Position 2 on project pages is `"Progetti di ristrutturazione e interior design a Bergamo"` rather than `"Progetti"`; same pattern likely on news. Breadcrumb names should be the short nav label.

**N4 (low) - Person entity could be stronger for AI resolution.** `Person.url` points to the homepage instead of `/sobre-mi`; no `knowsLanguage` (it/es/en), no `hasCredential` (pending H4); `areaServed` lists Bergamo/Lombardia only while the about page says "base a Bergamo e Siviglia". Align schema with on-page claims.

**N5 (info) - `brand-suffix-in-description` on 9 hub pages** (/proyectos, /news, /tappeti x3 locales): descriptions name "MP_archistudio". Secondary heuristic only; acceptable since the brand is part of the sentence, not an appended suffix.

## E-E-A-T evidence (delta)

- **Experience 72:** unchanged real portfolio; press now surfaced on homepage. Still missing process detail, before/after, testimonials (client input).
- **Expertise 58:** Person schema with alumniOf Politecnico di Milano; experience figure now consistent. Ordine registration still absent (client input).
- **Authoritativeness 62:** 7 `sameAs` (Instagram, LinkedIn, Pinterest, Houzz, Archilovers, Homify, Spazibelli) and "Pubblicato su" strip. Press-to-project links still missing (M3).
- **Trustworthiness 66:** consistent localised metadata, real canonicals, vatID/address/phone in schema, single experience figure. Lowered by hotmail address and contact-form options that do not match services.

## AI citation readiness 52/100

Up from 28: resolvable entities (ProfessionalService/Person with @id graph, sameAs), real canonicals, entity-rich titles/descriptions, Article/CreativeWork with authorship. Remaining gaps: no FAQ with concrete answers (ArchiAdvice price, renovation cost ranges, timelines), no per-project "Dettagli" fact list beyond m²/year/location, no registration credential, few quotable hard numbers in project copy.

## Structured findings (audit-data.json, category "Content Quality")

```json
[
 {"id":"C1","severity":"critical","status":"fixed","title":"Canonical/hreflang/sitemap on real domain, per-page"},
 {"id":"H1","severity":"high","status":"fixed","title":"Homepage title/description with name, brand, location"},
 {"id":"H2","severity":"high","status":"fixed","title":"Localised metadata on sobre-mi/servicios/contacto"},
 {"id":"H3","severity":"high","status":"fixed","title":"Single experience figure (15 years)"},
 {"id":"H4","severity":"high","status":"open","blocked_by":"client_input","title":"No Ordine degli Architetti registration","evidence":"0/63 pages; no Person.hasCredential"},
 {"id":"H5","severity":"high","status":"open","blocked_by":"client_input","title":"Thin project pages","evidence":"133-600 words IT, unchanged"},
 {"id":"H6","severity":"high","status":"fixed","title":"Structured data: ProfessionalService, Person, WebSite, BreadcrumbList, CreativeWork, Article"},
 {"id":"M1","severity":"medium","status":"fixed","title":"Double brand suffix removed"},
 {"id":"M2","severity":"medium","status":"partial","title":"Category label translated; project names still Italian without localised descriptor"},
 {"id":"M3","severity":"medium","status":"open","title":"Press items not linked to projects; projects not linked to services/contact","evidence":"/news/cose-di-casa-ottobre-2022 has no link to /proyectos/appartamento-lovingcolors"},
 {"id":"M4","severity":"medium","status":"partial","title":"Markdown fixed; news still thin, no visible byline; Sevilla ~20 words in all locales"},
 {"id":"M5","severity":"medium","status":"fixed","title":"Keywords removed, Person author, html lang, og:locale"},
 {"id":"M6","severity":"medium","status":"open","blocked_by":"client_input (email only)","title":"Hotmail address; 'we' voice on IT contact; form options do not match services","evidence":"Villa unifamiliare / Progetto commerciale options"},
 {"id":"M7","severity":"medium","status":"fixed","title":"og:image on all pages"},
 {"id":"L1","severity":"low","status":"open","title":"Long sentences restyling-casa-peonia","evidence":"avg 26.1 words, 7 > 30"},
 {"id":"L2","severity":"low","status":"partial","title":"Press strip added; homepage ~271 words; no testimonials"},
 {"id":"L3","severity":"low","status":"partial","title":"dateModified equals datePublished"},
 {"id":"N1","severity":"medium","status":"new","title":"6/8 project meta descriptions are mood copy without type/location/size","evidence":"appartamento-lovingcolors 'Più personalità, più spazio...'"},
 {"id":"N2","severity":"low","status":"new","title":"Inconsistent city localisation in ES/EN project titles","evidence":"'Cucina MITE – Milán' vs 'Casa Archi & Colori – Milano' on /es"},
 {"id":"N3","severity":"low","status":"new","title":"BreadcrumbList names reuse full SEO titles","evidence":"position 2 'Progetti di ristrutturazione e interior design a Bergamo'"},
 {"id":"N4","severity":"low","status":"new","title":"Person.url = homepage; no knowsLanguage; areaServed omits Sevilla claimed on about page"},
 {"id":"N5","severity":"info","status":"new","title":"brand-suffix-in-description heuristic on 9 hub pages (acceptable)"}
]
```
