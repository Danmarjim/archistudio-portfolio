# SXO Re-audit: mparchistudio.com (2026-10-07, post-deploy)

**SXO Gap Score: 61/100** (baseline 47, +14). This is separate from the SEO Health Score.

The deploy went out minutes before this audit, so Google hasn't re-crawled yet. Every SERP observation below is the **pre-reindex baseline**. It is not a measure of whether the fixes worked.

Method: 4 IT pages rendered with `render_page.py --mode auto` (SSR, `is_spa: false`), then parsed with `parse_html.py`. Same 4 commercial queries as the baseline plus the brand query, all via WebSearch.

## 0. Blocking issue (canonical pointing to example.com): FIXED
| Check | Baseline | Now |
|---|---|---|
| Canonical | `https://example.com/it` on every page | Each page has its own canonical: `/`, `/servicios`, `/proyectos`, `/proyectos/restyling-casa-peonia` |
| hreflang | example.com | `it`, `es`, `en` and `x-default` on mparchistudio.com; IT has no prefix |
| og:url | example.com | Each page's own URL |
| `<html lang>` | missing | `lang="it"` |
| robots.txt / sitemap | example.com | `Sitemap: https://mparchistudio.com/sitemap.xml`; 63 `<loc>` entries with xhtml alternates |
| `/it` | 307, and canonical targeted it | Still 307, but nothing points to it now (harmless) |

## 1. Page-type mismatch status
| Query | SERP dominant type (unchanged) | Baseline | Now | Status |
|---|---|---|---|---|
| architetto Bergamo | Directories (Edilportale, Houzz, Divisare, Archisio, architettiedesigner) plus local firm homepages (paolocarzaniga.it) | HIGH | **MEDIUM** | **PARTIALLY FIXED.** Title is now "Architetto a Bergamo – Martina Pozzi \| MP_archistudio" and the meta is localised. ProfessionalService schema now carries NAP, `areaServed` Bergamo/Lombardia and 7 `sameAs` profiles. Still open: the H1 is still "Ristruttura senza pensieri", "Bergamo" appears once in visible body text (footer only), and there's no area-served or local-projects block |
| ristrutturazione appartamento Bergamo architetto | Local service pages (atriocasa, felicezambelli ×2), Houzz pro profiles (Custhome, Cassinelli "Ordine n°884"), geo case studies (Carzaniga "trilocale Bergamo", RistrutturaSMART) | HIGH | **HIGH** | **OPEN.** The /servicios title is now "Servizi di architettura e ristrutturazione a Bergamo" and project titles are geo-tagged ("Restyling CASA PEONIA – Camparada"). The service is still one anchor section with no dedicated landing page |
| progettazione bagno architetto | ~70% how-to guides (filippocoltro, Biblus, Houzz magazine, antoniofelicetti, brusanerini, angelopozzoli ×2) and ~25% galleries (Homify, Geberit) | CRITICAL | **CRITICAL** | **OPEN.** No guide or article page exists |
| consulenza architetto online videochiamata | ~75% priced service landing pages (paolodardi, valentinasolano, viu ×2, zeuma, archidipity, architettopalermo), "gratis" offers (visuracasa, praticamentecasa) and "come funziona e quanto costa" guides | HIGH | **HIGH** | **OPEN.** ArchiAdvice is still an anchor on /servicios. No price (no "€" anywhere on the site), no deliverables, no FAQ, no Service+Offer schema |

New SERP signals this run: viu has 2 URLs in the consultancy SERP and felicezambelli has 2 in the renovation SERP, so competitors win with dedicated, intent-specific pages. "Gratis" first-call offers are now a visible pattern. Price anchors are unchanged at 80-150 EUR for a 60' call and 150-300 EUR with a written report.

## 2. Brand query: "mparchistudio Martina Pozzi architetto" (pre-reindex baseline)
mparchistudio.com is **not in the top 10**. Current results, in order:
1. LinkedIn
2. Panizza Studio designer page
3. Linktree
4–5. Two Ordine Architetti MB albo pages
6–10. Unrelated Pozzi results (Patrizia Pozzi, Wikipedia, ZoomInfo)

This is expected because the index still holds the example.com canonical. Re-check 1-3 weeks after you submit the sitemap and request indexing for `/` in GSC. Expected outcome: the home ranks #1 with sitelinks.

The brand SERP shows that Google already associates Martina with Bergamo, Politecnico di Milano, Ordine MB (registered 2012) and the 2009 Piranesi Prix de Rome. **None of these appear in visible site copy.** The Person schema has `alumniOf` but no `award` or `hasCredential`.

## 3. User stories (re-validated: all 5 still hold)
1. **Awareness** (bathroom researcher): still blocked, no guide exists. *Signal: 7/9 results are how-to articles, including "perché farlo con un architetto?"*
2. **Consideration** (Bergamo turnkey renovator): **partially unblocked**. The SERP title and snippet now say "architetta a Bergamo… ristrutturazioni chiavi in mano". Once the visitor lands, the hero still has no local proof. *Signal: "Ristrutturazione chiavi in mano a Bergamo" (atriocasa) and "Architetto per ristrutturazione casa Bergamo" (felicezambelli) titles.*
3. **Consideration** (directory comparer): still blocked. No visible reviews, Ordine number or award. *Signal: the Houzz snippet leads with "Ordine degli Architetti di Bergamo n°884"; competitors cite "30/40 anni di esperienza".*
4. **Decision** (ArchiAdvice seeker): still blocked. No price or deliverable. *Signal: 80-150 EUR anchors and "PDF riepilogativo" in snippets.*
5. **Decision** (pre-purchase buyer): slightly improved, since the home meta now names "consulenza all'acquisto casa". There is still no page, price range or checklist.

## 4. SXO Gap Score breakdown (61/100)
| Dimension | Before | Now | Evidence |
|---|---|---|---|
| Page Type | 6 | 7 | Titles now match the intent, but no new page types: no local landing page, no /archiadvice, no guide |
| Content Depth | 7 | 7 | Word counts unchanged: home 341, /servicios 719, /proyectos 206 (still no H2), project 631 |
| UX Signals | 9 | 11 | Localised IT metas (the Spanish meta on /servicios is gone), `lang="it"`, clickable `tel:+393271267024`, no duplicate brand in titles. Still: generic H1, no price |
| Schema | 0 | 10 | ProfessionalService (NAP, VAT, areaServed, sameAs), Person (alumniOf), WebSite, BreadcrumbList, CreativeWork+Place on projects. Missing: Service+Offer, Person `award`/`hasCredential`, `geo`, `openingHours`, Article |
| Media | 12 | 12 | Unchanged; photography is still the site's strength |
| Authority | 6 | 7 | Entity linking via `sameAs` and VAT in schema. Still: no visible testimonials, Ordine number or award; hotmail email in schema and footer |
| Freshness | 7 | 7 | Unchanged |

## 5. Persona scores (weakest first)
| Persona | Before | Now (R/C/T/A) | Δ | Next fix |
|---|---|---|---|---|
| Bathroom DIY researcher | 36 | **37** (8/8/13/8) | +1 | Write the guide "Come progettare un bagno piccolo: i consigli dell'architetta" in /news, built from the 3 bathroom projects, with Article schema and an ArchiAdvice CTA |
| Directory comparison shopper | 48 | **51** (14/13/9/15) | +3 | Show the Ordine Architetti MB registration (2012), the Piranesi Prix de Rome 2009 and 3-5 Houzz review quotes on home and /servicios. Use a domain email |
| Pre-purchase home buyer | 56 | **58** (19/15/10/14) | +2 | Create a "Consulenza acquisto casa" page with a checklist (agibilità, catasto, conformità), a "da X €" price, deliverables and an FAQ |
| ArchiAdvice seeker | 60 | **60** (18/12/10/20) | 0 | Create `/archiadvice` (or `/consulenza-architetto-online`) with a visible price, what to prepare, what you get, an FAQ, Calendly above the fold and Service+Offer schema |
| Bergamo turnkey renovator | 55 | **63** (19/14/11/19) | +8 | Change the H1 or subheading to "Architetta a Bergamo: ristrutturazioni chiavi in mano". Add an "Zona servita: Bergamo, Monza Brianza, Milano" block and local projects in the hero area. Add `geo` to the schema. Set up GBP (`/seo local`) |
| Colour/style inspiration seeker | 65 | **66** (20/18/15/13) | +1 | /proyectos: add a category filter with H2s and 150-300 words of intro copy. Add "Progetti simili" links |

## 6. Remaining priority fixes
1. HIGH: dedicated ArchiAdvice page with a price, and a Consulenza acquisto page. These are the largest open mismatches on decision-stage queries.
2. HIGH: visible trust layer (Ordine MB, Piranesi award, reviews, domain email). Add `award`/`hasCredential` to the Person schema.
3. HIGH: local H1/hero copy on home, so the on-page content delivers what the new title promises.
4. MEDIUM: bathroom/kitchen guides in /news (the CRITICAL informational mismatch).
5. MEDIUM: Service+Offer schema per service (`/seo schema`). Add project meta descriptions that include location and type.
6. OPS: submit the sitemap in GSC, request indexing for `/`, `/servicios` and `/proyectos`, then re-run the brand query in 1-3 weeks.

## 7. Limitations
- Pre-reindex: SERP positions reflect the old example.com canonical, so no ranking movement can be attributed to the fixes yet.
- WebSearch shows organic results only. Local pack, PAA, ads and AI Overview weren't observable. No GSC or volume data.
- Only 4 IT URLs were rendered. ES/EN, /sobre-mi, /contacto and /news weren't re-audited (the award may appear on /sobre-mi).
- Rendering used `--mode auto` (SSR). Above-the-fold layout wasn't checked visually.
- Persona scores are analyst estimates derived from SERP signals and are not weighted by search volume.

## Structured findings (audit-data.json, category "Search Experience")
```json
[
 {"id":"sxo-canonical-example-com","severity":"critical","status":"fixed","title":"Canonical/hreflang/sitemap now point to mparchistudio.com per page"},
 {"id":"sxo-local-mismatch","severity":"medium","status":"partially_fixed","title":"Home title/meta/schema localised for 'architetto Bergamo'; H1 and visible body still lack local signals","fix":"Local H1/hero, area-served block, geo in schema, GBP"},
 {"id":"sxo-renovation-landing","severity":"high","status":"open","title":"No dedicated 'ristrutturazione appartamento Bergamo' landing page"},
 {"id":"sxo-bathroom-guide-missing","severity":"critical","status":"open","title":"No informational page for 'progettazione bagno architetto' (~70% of the SERP is guides)"},
 {"id":"sxo-archiadvice-no-page","severity":"high","status":"open","title":"Online consultancy has no dedicated page or price (SERP shows 80-150 EUR)"},
 {"id":"sxo-no-schema","severity":"high","status":"mostly_fixed","title":"ProfessionalService/Person/WebSite/BreadcrumbList/CreativeWork added; Service+Offer, award/hasCredential, geo missing"},
 {"id":"sxo-meta-language","severity":"medium","status":"fixed","title":"IT metas localised, duplicate brand removed, html lang set"},
 {"id":"sxo-trust","severity":"medium","status":"open","title":"No visible testimonials, Ordine number, award; hotmail email (tel link now present)"},
 {"id":"sxo-brand-serp","severity":"info","status":"pending_reindex","title":"Brand query: site absent from top 10 pre-reindex; LinkedIn/Panizza/Linktree/Ordine MB rank"}
]
```

Sources: linkedin.com/in/martinachiaramariapozzi, panizzastudio.com, linktr.ee/Arch.MartinaPozzi, ordinearchitetti.mb.it, edilportale.com, houzz.com, divisare.com, archisio.it, architettiedesigner.it, paolocarzaniga.it, houzz.it (Custhome, Cassinelli), ristrutturasmart.it, atriocasa.it, felicezambelli.it, homify.it, geberit.it, filippocoltro.it, biblus.acca.it, antoniofelicetti.com, brusaneriniarchitetti.it, angelopozzoliarchitetto.com, paolodardiarchitetto.it, visuracasa.it, valentinasolano.it, praticamentecasa.it, architettopalermo.it, viu-architetturaonline.it, zeumadesign.com, archidipity.com, risorseperprogettare.com
