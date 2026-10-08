# SXO Findings: mparchistudio.com (audit date 2026-10-07)

**SXO Gap Score: 47/100** (site-level, against the commercial queries). This is separate from the SEO Health Score.

## 0. Blocking issue that comes first: every URL tells Google the real site is example.com (CRITICAL)
The SXO fixes below won't help until this is fixed. All 4 rendered pages (home, /servicios, /proyectos, /proyectos/restyling-casa-peonia) contain:
- `<link rel="canonical" href="https://example.com/it">`, which is the same canonical on every page and points to a different domain
- `hreflang` es/en/it pointing to `https://example.com/{locale}`
- `og:url` = `https://example.com`
- robots.txt: `Sitemap: https://example.com/sitemap.xml`; sitemap.xml lists only `https://example.com/...` URLs
- `<html>` has no `lang` attribute
- Source: `src/lib/constants.ts:7` `url: 'https://example.com'` feeds `metadataBase`, canonical, hreflang and alternates in `src/app/[locale]/layout.tsx:35-73`. Child pages don't override `alternates.canonical`, so even with the right domain every page would canonicalise to the locale root.
- Evidence of impact: a brand search for "mparchistudio Martina Pozzi architetto" shows LinkedIn, Linktree and Panizza Studio, but not mparchistudio.com.
- Also: `/it` returns 307 to `/`, yet canonical/hreflang point at `/it`, which is a redirecting URL.
**Fix:** set `siteConfig.url = 'https://mparchistudio.com'`; give each page its own canonical (`/servicios`, `/proyectos/[slug]`…) that matches the URL the server actually serves (Italian has no prefix, `/es/...`, `/en/...`); set hreflang to the same URLs plus `x-default`; add `<html lang={locale}>`; regenerate the sitemap and robots.txt; resubmit in GSC.

## 1. SERP analysis and page-type mismatch

| Query | SERP dominant type (taxonomy) | Confidence | Best site page | Site page type | Mismatch |
|---|---|---|---|---|---|
| architetto Bergamo | Local / directory listings (Edilportale, Houzz, Archisio, Divisare, architettiedesigner) + local firm homepages (paolocarzaniga.it) | ~65% directory/local, ~25% firm home | `/` | Portfolio/Service hybrid, no local positioning | **HIGH** |
| ristrutturazione appartamento Bergamo architetto | Local Service pages ("Ristrutturazione chiavi in mano a Bergamo" atriocasa, "Architetto per ristrutturazione casa Bergamo" felicezambelli) + Houzz pro profiles + geo-tagged case studies (Carzaniga "trilocale Bergamo", mcarchistudio "Città Alta") | ~50% local service, ~30% profiles, ~20% case study | `/servicios#progettazione-architettonica`, project pages | Anchor section on a multi-service page; projects are not geo-titled | **HIGH** |
| progettazione bagno architetto | Blog/guide ("Come progettare il bagno: consigli dell'architetto" filippocoltro, Biblus, Houzz magazine "10 regole d'oro", antoniofelicetti, brusanerini "perché farlo con un architetto") + inspiration galleries (Homify "47 bagni piccoli", Geberit) | ~70% Blog Post, ~25% gallery | 3 bathroom project pages | Portfolio case study, no guide | **CRITICAL** (no page of the right type exists) |
| consulenza architetto online (videochiamata) | Service/Landing pages with visible pricing and packages (paolodardi, valentinasolano, viu "architetto online prezzi", zeumadesign, archidipity) + "come funziona e quanto costa" guides | ~75% service landing, ~25% guide | `/servicios#archiadvice` | Anchor section, no own URL, no price | **HIGH** |

SERP signals observed: local intent ("Bergamo, BG", NAP and phone numbers in snippets), directories with star ratings (Houzz), price anchoring for online consultancy (80-150 EUR / 60 min, "15 min gratis", "PDF riepilogativo"), and "perché con un architetto" plus how-to content for bathroom design. A local pack is likely for the geo queries but couldn't be observed (see Limitations).

On-page evidence:
- Home title "Studio di Architettura | Portfolio" has no name, no city and no service. H1 "Ristruttura senza pensieri". Meta description is generic (also mentions "progetti commerciali"). 332 words. Bergamo appears only in the footer NAP (Via Bologna, 24128 Bergamo).
- /servicios: Italian content with a **Spanish meta description** ("Servicios de arquitectura: diseño de viviendas…") and title "Servicios | MP_archistudio". 713 words, good process section ("Come lavoriamo": Rilievo > Progetto > Direzione artistica > Cantiere > Pratica). CTAs: Calendly "Prenota il tuo ArchiAdvice", "Scrivimi", "preventivo gratuito", reply within 48h.
- /proyectos: 200 words, H1 "Progetti", no H2s, title duplicates the brand ("Progetti | MP_archistudio | MP_archistudio").
- Project page: 631 words of strong descriptive copy, 38 images, details table (Camparada, 2026, 130 m²). Title duplicates the brand, no city and no "restyling casa" keyword pattern.
- No JSON-LD on any page. No testimonials/reviews, no phone, hotmail address, no Ordine degli Architetti registration number visible.
- Italian (default) URLs use Spanish slugs (`/servicios`, `/proyectos`, `/sobre-mi`), so Italian queries get no URL relevance signal.

## 2. User stories (signal-cited)
1. **Awareness**: As a homeowner thinking about redoing my bathroom, I want to understand how an architect plans one (layout, lighting, materials), because I'm afraid of an expensive mistake that's hard to undo, but I'm blocked by the site having only finished-project photos and no guidance. *Signal: 7/9 results for "progettazione bagno architetto" are how-to guides; titles such as "perché farlo con un architetto?"*
2. **Consideration**: As a Bergamo-area owner planning a full apartment renovation, I want to find a local architect who handles everything turnkey, because I don't want to coordinate contractors myself, but I'm blocked by the homepage not saying "architetto a Bergamo" or showing local projects/area served. *Signal: "Ristrutturazione chiavi in mano a Bergamo", "Architetto per ristrutturazione casa Bergamo" titles; NAP and phone numbers in snippets.*
3. **Consideration**: As someone comparing architects on Houzz/Edilportale, I want proof (reviews, credentials, years of experience) before contacting anyone, because I'm evaluating carefully, but I'm blocked by the site having no testimonials, no Ordine number and no awards shown. *Signal: directories dominate "architetto Bergamo"; competitor snippets lead with "Ordine degli Architetti di Bergamo n°884", "30 anni di esperienza".*
4. **Decision**: As a remote client wanting a quick expert opinion, I want to know the price and what I receive from a 60' video call, because I'm price-sensitive and comparing packages, but I'm blocked by ArchiAdvice having no price, no deliverable list and no dedicated page. *Signal: "consulenza architetto online" SERP shows 80/150 EUR packages, "come funziona e quanto costa", "gratis" results.*
5. **Decision**: As a buyer about to purchase a flat, I want an architect to check documents and estimate renovation costs before I sign, because the purchase is high-stakes, but I'm blocked by this service being one anchor block among four with no example or price range. *Signal: related intent around "quanto costa ristrutturare"; "Consulenza all'acquisto" is a differentiator not seen in competitor SERPs.*

## 3. SXO Gap Score breakdown (47/100)
| Dimension | Score | Evidence |
|---|---|---|
| Page Type | 6/15 | No local landing page, no dedicated ArchiAdvice page, no guide content; home is a portfolio hybrid |
| Content Depth | 7/15 | Home 332 words, /proyectos 200; /servicios 713 is good; project pages 600+ words but no geo or problem framing |
| UX Signals | 9/15 | Clear CTAs, Calendly, 48h promise; no phone/WhatsApp, no price, Spanish meta on IT page, no lang attribute |
| Schema | 0/15 | Zero JSON-LD (missing ProfessionalService/Architect, Person, Service+Offer, CreativeWork/Project, BreadcrumbList) |
| Media | 12/15 | Strong photography (38 images on a single project); strength of the site |
| Authority | 6/15 | Houzz/Homify/Archilovers/Spazibelli profiles linked; no reviews, no credentials, Piranesi Prix de Rome award not surfaced on audited pages, hotmail email |
| Freshness | 7/10 | 2025-2026 projects present; news section exists |

## 4. Persona scores (weakest first)
| Persona | Stage | Rel | Clar | Trust | Act | Total | Rating |
|---|---|---|---|---|---|---|---|
| Bathroom DIY researcher | Awareness | 8 | 8 | 12 | 8 | **36** | Critical |
| Directory comparison shopper | Consideration | 14 | 12 | 8 | 14 | **48** | Needs work |
| Bergamo turnkey renovator | Consideration/Decision | 15 | 12 | 10 | 18 | **55** | Needs work |
| Pre-purchase home buyer | Decision | 18 | 14 | 10 | 14 | **56** | Needs work |
| Online consultancy seeker (ArchiAdvice) | Decision | 18 | 12 | 10 | 20 | **60** | Good |
| Colour/style inspiration seeker | Awareness | 20 | 18 | 15 | 12 | **65** | Good |

Improvements per persona:
- **Bathroom researcher**: publish a guide in /news, "Come progettare un bagno piccolo: i consigli dell'architetta", built from the 3 bathroom projects (before/after, layout, lighting, materials, costs). Link to the bathroom projects and end with an ArchiAdvice CTA. Add Article schema.
- **Directory shopper**: add 3-5 testimonials (Houzz reviews can be quoted), Ordine Architetti MB registration number, the Piranesi Prix de Rome award, and a "dal 2012" line on home and /servicios. Use a domain email.
- **Bergamo renovator**: home title "Architetto a Bergamo | Ristrutturazioni e interni – MP_archistudio". Add a local landing page `/architetto-bergamo` (or rework the home) with the area served (Bergamo, Monza Brianza, Milano), clickable phone, map, and local projects. Geo-tag project titles/H1 ("Restyling Casa Peonia – Camparada (MB)"). Add ProfessionalService schema with NAP and geo. Claim and optimise GBP (`/seo local`).
- **Pre-purchase buyer**: own section/page for "Consulenza acquisto casa con architetto" with a checklist (agibilità, catasto, conformità), deliverable, price range or "da X EUR", and an FAQ.
- **ArchiAdvice seeker**: dedicated URL `/archiadvice` (IT slug), "Consulenza architetto online – videocall 60'", **visible price**, what to prepare (foto, planimetria, misure), what you get (PDF riepilogativo?), FAQ, Calendly embed above the fold. Add Service + Offer schema.
- **Inspiration seeker**: add a project category filter (Bagni/Cucine/Restyling) with H2s and intro copy on /proyectos (currently 200 words, no H2), plus "Progetti simili" links.

## 5. Priority fixes
1. CRITICAL: fix `siteConfig.url`, per-page canonicals, hreflang, sitemap, robots and html lang (Section 0).
2. HIGH: localise the home title/H1/meta for "architetto Bergamo"; fix the Spanish meta description on IT /servicios; remove the duplicate brand in titles.
3. HIGH: split ArchiAdvice and Consulenza acquisto into their own Italian-slug pages with pricing.
4. HIGH: add ProfessionalService + Person + Service + BreadcrumbList JSON-LD (`/seo schema`).
5. MEDIUM: geo-tag project pages; add bathroom/kitchen guides in /news for informational queries.
6. MEDIUM: trust layer (testimonials, Ordine number, award, phone, domain email). Use `/seo content` for an E-E-A-T deep dive.
7. LOW: consider Italian slugs for the default locale (`/servizi`, `/progetti`, `/chi-sono`) with 301s, but only after the canonical fix is indexed.

## 6. Limitations
- WebSearch gives organic results only: the local pack, ads, PAA, AI Overview and the actual ranking positions of mparchistudio.com weren't observable. Personas are inferred from organic titles and snippets.
- No GSC, GBP or volume data; persona weights are unweighted.
- Only 4 URLs were rendered (IT locale); ES/EN locales, /sobre-mi, /contacto and /news weren't audited. The Piranesi award may appear on /sobre-mi.
- Rendering used `--mode auto` (`is_spa: false`, SSR HTML), so above-the-fold layout wasn't visually checked.

## Structured findings (audit-data.json, category "Search Experience")
```json
[
 {"id":"sxo-canonical-example-com","severity":"critical","title":"Canonical/hreflang/sitemap point to example.com","evidence":"rel=canonical https://example.com/it on all pages; sitemap and robots reference example.com; src/lib/constants.ts:7","fix":"Set siteConfig.url to https://mparchistudio.com and give each page its own canonical"},
 {"id":"sxo-bathroom-guide-missing","severity":"critical","title":"No informational page for 'progettazione bagno architetto' (SERP ~70% guides)","fix":"Publish a bathroom design guide built from the project case studies"},
 {"id":"sxo-local-mismatch","severity":"high","title":"Home lacks local positioning for 'architetto Bergamo'","evidence":"title 'Studio di Architettura | Portfolio'; Bergamo only in footer","fix":"Localise title/H1/meta, add local landing page and ProfessionalService schema"},
 {"id":"sxo-archiadvice-no-page","severity":"high","title":"Online consultancy has no dedicated page or price","evidence":"SERP shows 80-150 EUR priced service landing pages","fix":"Create /archiadvice page with price, deliverables, FAQ, Calendly"},
 {"id":"sxo-no-schema","severity":"high","title":"Zero JSON-LD on all pages","fix":"ProfessionalService, Person, Service+Offer, BreadcrumbList"},
 {"id":"sxo-meta-language","severity":"medium","title":"Spanish meta description on Italian /servicios; duplicate brand in titles","fix":"Localise Metadata namespace and remove the duplicate title template"},
 {"id":"sxo-trust","severity":"medium","title":"No testimonials, credentials, phone; hotmail email","fix":"Add a trust layer"}
]
```

Sources: edilportale.com/tecnici/architetti/bergamo, houzz.com Bergamo architects, archisio.it/architetti/bergamo, architettiedesigner.it/architetto-bergamo, paolocarzaniga.it, atriocasa.it/ristrutturazioni-bergamo, felicezambelli.it/architetto-per-ristrutturazione-casa-bergamo, mcarchistudio.com, filippocoltro.it/come-progettare-il-bagno.htm, biblus.acca.it/progettare-un-bagno-la-guida-completa, houzz.it magazine, homify.it, brusaneriniarchitetti.it, paolodardiarchitetto.it/consulenze-online.html, valentinasolano.it/consulenza-architetto-online, viu-architetturaonline.it/architetto-online-prezzi, risorseperprogettare.com/blog/consulenza-architetto-online
