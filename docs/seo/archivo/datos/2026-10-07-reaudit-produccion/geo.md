# GEO / AI Search Readiness — mparchistudio.com (re-audit v2)

Re-audit date: 2026-10-07. Baseline: 42/100 (../../mparchistudio.com-audit/findings/geo.md).
Pages fetched live (UA OAI-SearchBot): /, /sobre-mi, /en/sobre-mi, /servicios, /es/servicios, /proyectos/casa-archi-colori, /news/il-colore-nell-architettura, /news/{home-n36-aprile-2026, intervista-archiboost-luglio-2026, cose-di-casa-ottobre-2022}, /contacto, /robots.txt, /sitemap.xml, /llms.txt, /llms-full.txt, /xx/foo, /foo.txt. Repo not modified.

## AI Search Readiness Score: 63 / 100 (was 42, +21)

| Dimension | Weight | Before | Now | Weighted |
|---|---|---|---|---|
| Citability | 25% | 40 | 48 | 12.0 |
| Structural Readability | 20% | 55 | 62 | 12.4 |
| Multi-Modal Content | 15% | 55 | 62 | 9.3 |
| Authority & Brand Signals | 20% | 35 | 60 | 12.0 |
| Technical Accessibility | 20% | 30 | 88 | 17.6 |
| **Total** | | **42** | | **63** |

Platform estimates: Google AIO 60 (was 30), ChatGPT Search 62 (40), Perplexity 66 (45), Bing Copilot 60 (30). The technical blockers that capped Google and Bing are gone. What holds the score back now is content: no direct-answer or FAQ passages, no prices, no Ordine credential.

## AI crawler access

robots.txt: `User-Agent: * / Allow: / / Disallow: /api/` and `Sitemap: https://mparchistudio.com/sitemap.xml` (FIXED, was example.com). The crawlers that matter for AI search citations (OAI-SearchBot, Claude-SearchBot, PerplexityBot) are allowed, and so is Googlebot, which controls AI Overviews. The training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, cohere-ai) are also allowed. That is an owner choice, and it has no effect on search citability.

## llms.txt: present (200), well formed

The file contains an H1, a blockquote summary, and these sections: Chi è, Servizi, Pagine principali (IT), Altre lingue, Profili. The entity summary is clear: who, credential (Politecnico di Milano), where (Bergamo, full address), what (4 services, one line each). There is no `/llms-full.txt` (404), which is optional. Unknown paths now return a proper 404 (`/xx/foo`, `/foo.txt`), so the earlier 500 is resolved.

Quality gaps (LOW):
- It lists no projects. Add the 7 case studies with one-line summaries (place, m², year, scope). These are the most citable facts.
- It has no "Pubblicazioni / Press" section. Add HOME n.36 (Apr 2026), Cose di Casa (Oct 2022) and Archiboost Talks (Jul 2026), with the external URLs.
- The Profili list is missing Homify, Spazi Belli and Pinterest. They are in `sameAs`, so keep the two lists in sync.
- Altre lingue links only to the ES and EN home pages. Add ES/EN service and about URLs.
- Add the VAT number and the service area (Bergamo, Milano, Lombardia) to match the JSON-LD.

## Status of baseline findings

| # | Finding | Status | Evidence |
|---|---|---|---|
| 1 | siteConfig.url = example.com | FIXED | 0 occurrences of example.com in any page. Canonical, hreflang, og:url, sitemap and robots all use mparchistudio.com |
| 2 | Subpage canonicals → locale root; /it canonical | FIXED | Each page has a self-referencing canonical. IT pages have no prefix (`/sobre-mi`), x-default points to IT, hreflang es/en/it are reciprocal |
| 3 | No JSON-LD | PARTIAL | Every page carries a `@graph`: ProfessionalService (#business) + Person (#martina-pozzi) + WebSite, with `sameAs` ×7, address, VAT and areaServed. Every subpage has a BreadcrumbList. Project pages have CreativeWork with creator→Person; news pages have Article with author and publisher. Still missing: `Service` entities and the gaps in N3 below |
| 4 | llms.txt 500 | FIXED | 200, good content (see above). Unknown locale → 404 |
| 5 | `<html lang>` missing | FIXED | `lang="it"`, `"en"`, `"es"` set per locale |
| 6 | Spanish/wrong metadata, Madrid, generic title, double brand | FIXED | Titles and descriptions are localized on all pages checked. Home: "Architetto a Bergamo – Martina Pozzi \| MP_archistudio". og:locale is it_IT / en_GB / es_ES. No duplicated brand |
| 7 | Entity gaps (Ordine, 10 vs 15 yrs, H1, email, service area) | PARTIAL | Visible text now says 15 consistently. OPEN: no Ordine registration (awaiting client), H1 is still "Ristruttura senza pensieri", email is still hotmail (also in JSON-LD), areaServed omits Milano although the flagship project is in Milano. Stale "oltre 10 anni" remains in the serialized messages payload (see N1) |
| 8 | Low passage citability (FAQ, prices, question headings) | OPEN | /servicios headings are still service names. Only "Come lavoriamo?" is a question. No € figures anywhere. Awaiting client for prices and FAQ answers |
| 9 | Press not surfaced | PARTIAL | A "Pubblicato su" band on home (Archiboost, HOME, Cose di Casa) links to the internal news posts. The Archiboost and Cose di Casa posts link out to the source, but the HOME post has no outbound link or issue reference. The band is not on /sobre-mi, and there is no schema link (N3) |
| 10 | No og:image | FIXED | og:image on every page. Project and news pages use their own cover |
| 11 | No YouTube/video | OPEN | Awaiting client |
| 12 | Sitemap lastmod = build time | FIXED | lastmod now uses the content dates (2022-09-01 … 2026-08-19). 63 URLs |

## New findings

- **N1 (LOW): a stale experience figure is still shipped in HTML.** `messages/*.json` key `AboutPage.intro` says "oltre 10 anni / más de 10 años / over 10 years". It isn't rendered, but next-intl serializes all messages into the RSC payload of every page, so non-JS crawlers that parse raw HTML still see both "10" and "15". **Fix:** update or delete the unused key in all 3 locales, and consider passing only the needed namespaces to `NextIntlClientProvider`. Effort: 10 min.
- **N2 (MEDIUM): no `Service` entities.** /servicios has only a BreadcrumbList. **Fix:** add 4 `Service` nodes (ArchiAdvice, Consulenza all'acquisto, Restyling, Progettazione 360°) with `provider: {@id #business}`, `areaServed`, `serviceType`, and later `offers.price` once the client gives prices. Alternatively, add `hasOfferCatalog` on #business. Effort: 45 min.
- **N3 (MEDIUM): the entity graph has gaps.**
  - Person `url` is the home page. Point it to `/sobre-mi` and add `image` (a portrait), `knowsAbout` (interior design, ristrutturazione, colore) and `hasCredential` / `memberOf` (Ordine degli Architetti di Bergamo, once the number is supplied).
  - ProfessionalService has no `openingHoursSpecification`, `geo`, `priceRange` or `logo`, and its `areaServed` omits Milano.
  - Press articles have no `citation` / `isBasedOn` / `sameAs` link to the external publication. Add `subjectOf` on Person or #business pointing to the 3 press pieces.
  - CreativeWork `dateCreated: "2025"` is valid, but `locationCreated` should include `addressLocality`.

  Effort: 1 h.
- **N4 (LOW): press news posts are thin** (157–236 words). Each one should open with a self-contained summary: publication, issue/date, what was featured, and a quote. The HOME n.36 post needs an issue reference or publisher link. Effort: 1 h of writing.
- **N5 (LOW): the home H1 still has no entity.** Suggestion: keep "Ristruttura senza pensieri" as the visual headline, but make the H1 (or a visually prominent intro of 40–60 words) state "Martina Pozzi, architetta a Bergamo – MP_archistudio…". Effort: 15 min plus a copy decision.

## Brand and entity presence (third-party)

No change since the baseline. Houzz, Archilovers, Homify, Spazi Belli, Instagram, LinkedIn and Pinterest are now tied to the entity through `sameAs` (improved). There is still no Wikipedia or Wikidata entity, no YouTube and no Reddit presence. Once N3 is in place, consider a Wikidata item that cites the HOME and Cose di Casa coverage.

## Top 5 next changes

1. FAQ / direct-answer blocks on /servicios: 130–170 word answers with price ranges and timelines, plus `Service` schema. (4–6 h, needs client input; biggest remaining lift for citability)
2. Ordine degli Architetti registration in the about text and in `hasCredential`, plus a domain email. (30 min after client input)
3. Fill the entity-graph gaps (N3): Person url/image/knowsAbout, Milano in areaServed, `subjectOf` press links. (1 h)
4. Expand llms.txt with projects and press, and sync the profile list. (30 min)
5. Clean up the stale "10 anni" message key (N1) and the home H1/intro entity statement (N5). (30 min)

## audit-data.json (AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 63,
  "previous_score": 42,
  "dimensions": {"citability": 48, "structural_readability": 62, "multimodal": 62, "authority_brand": 60, "technical_accessibility": 88},
  "platforms": {"google_aio": 60, "chatgpt": 62, "perplexity": 66, "bing_copilot": 60},
  "crawlers": {"OAI-SearchBot": "allowed", "GPTBot": "allowed", "Claude-SearchBot": "allowed", "ClaudeBot": "allowed", "PerplexityBot": "allowed", "Google-Extended": "allowed", "Applebot-Extended": "allowed", "CCBot": "allowed"},
  "llms_txt": "present",
  "llms_full_txt": "absent",
  "rsl": "absent",
  "rendering": "SSR/prerendered",
  "findings": [
    {"id": "geo-1", "status": "fixed", "title": "siteConfig.url example.com"},
    {"id": "geo-2", "status": "fixed", "title": "Per-page self-referencing canonicals + hreflang"},
    {"id": "geo-3", "status": "partial", "title": "JSON-LD graph present (ProfessionalService, Person, WebSite, BreadcrumbList, CreativeWork, Article); Service entities missing"},
    {"id": "geo-4", "status": "fixed", "title": "llms.txt 200; unknown locale 404"},
    {"id": "geo-5", "status": "fixed", "title": "<html lang> per locale"},
    {"id": "geo-6", "status": "fixed", "title": "Localized, entity-rich metadata"},
    {"id": "geo-7", "status": "partial", "title": "Ordine registration, H1 entity, domain email, Milano areaServed still open"},
    {"id": "geo-8", "status": "open", "title": "No FAQ/direct-answer blocks or prices (awaiting client)"},
    {"id": "geo-9", "status": "partial", "title": "Pubblicato su band on home links to internal posts; HOME post lacks source link; no schema link"},
    {"id": "geo-10", "status": "fixed", "title": "og:image on all pages"},
    {"id": "geo-11", "status": "open", "title": "No YouTube (awaiting client)"},
    {"id": "geo-12", "status": "fixed", "title": "Sitemap lastmod from content dates"},
    {"id": "geo-n1", "severity": "low", "title": "Unused AboutPage.intro 'oltre 10 anni' serialized into RSC payload on every page", "effort": "10m"},
    {"id": "geo-n2", "severity": "medium", "title": "No Service schema on /servicios", "effort": "45m"},
    {"id": "geo-n3", "severity": "medium", "title": "Entity graph gaps: Person url/image/knowsAbout/hasCredential, areaServed Milano, openingHours/geo, subjectOf press", "effort": "1h"},
    {"id": "geo-n4", "severity": "low", "title": "Press news posts thin (157-236 words); HOME post no source reference", "effort": "1h"},
    {"id": "geo-n5", "severity": "low", "title": "Home H1 still lacks who/where", "effort": "15m"},
    {"id": "geo-llms", "severity": "low", "title": "llms.txt lacks projects, press, full profile list", "effort": "30m"}
  ]
}
```
