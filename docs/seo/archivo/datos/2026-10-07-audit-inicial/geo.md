# GEO / AI Search Readiness — mparchistudio.com

Audit date: 2026-10-07. Pages fetched live (UA: OAI-SearchBot): /, /sobre-mi, /en/sobre-mi, /servicios, /proyectos, /proyectos/casa-archi-colori, /news, /news/il-colore-nell-architettura, /contacto, /robots.txt, /sitemap.xml, /llms.txt. Source verified read-only in repo (no changes made).

## AI Search Readiness Score: 42 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 40 | 10.0 |
| Structural Readability | 20% | 55 | 11.0 |
| Multi-Modal Content | 15% | 55 | 8.3 |
| Authority & Brand Signals | 20% | 35 | 7.0 |
| Technical Accessibility | 20% | 30 | 6.0 |
| **Total** | | | **42** |

Platform estimates: Google AI Overviews 30, ChatGPT Search 40, Perplexity 45, Bing Copilot 30. Google and Bing score lowest because both rely heavily on canonical and sitemap signals, and both are broken.

## AI crawler access

robots.txt is `User-Agent: * / Allow: /`. No bot-specific rules. Bot UAs get normal 200/307 responses, so no WAF or Vercel block.

| Bot | What it controls | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed |
| GPTBot | OpenAI training only | Allowed |
| Claude-SearchBot | Claude search citations | Allowed |
| ClaudeBot | Anthropic training only | Allowed |
| PerplexityBot | Perplexity index | Allowed |
| Google-Extended | Gemini/Vertex training and grounding (not AI Overviews, which follow Googlebot) | Allowed |
| Applebot-Extended | Apple Intelligence training (not Siri/Spotlight) | Allowed |
| CCBot, cohere-ai | Training | Allowed |

Problem: the `Sitemap:` line in robots.txt is `https://example.com/sitemap.xml`, so no crawler can find the sitemap through robots.txt.

## llms.txt: missing (HTTP 500)

Cause: the middleware matcher `/((?!api|trpc|_next|_vercel|.*\\..*).*)` skips paths that contain a dot. So `/llms.txt` skips next-intl and falls through to `app/[locale]` with `locale="llms.txt"`, which throws. A 5xx on the site root is also a crawl-health signal you don't want. RSL 1.0 license: not present (optional).

## SSR vs CSR

Good. Pages are prerendered by Next.js (`x-nextjs-prerender: 1`) and the full body text is in the raw HTML. AI crawlers that don't run JavaScript can read all of it.

## Findings

### CRITICAL

1. **Production URL is still the placeholder `https://example.com`** (`src/lib/constants.ts:7`, `siteConfig.url`). Because of this:
   - `<link rel="canonical">` on every page points to `https://example.com/{locale}`.
   - hreflang alternates, `og:url`, and `metadataBase` all point to example.com.
   - Every `<loc>` in sitemap.xml and the robots.txt `Sitemap:` line use example.com.
   - The language-switcher links in the rendered header/footer go to example.com/en, /es, and /it. Real users clicking them leave the site.

   Search engines may drop the pages or merge them into a domain you don't own. Bing, which grounds ChatGPT and Copilot, and Google AIO both depend on this signal.
   **Fix:** set `url: 'https://mparchistudio.com'`, ideally from `process.env.NEXT_PUBLIC_SITE_URL`. Effort: 5 min.

2. **Every subpage's canonical points to the locale root.** The layout sets `canonical: ${url}/${locale}`, and pages don't override it. So /sobre-mi, /servicios, every project and every news article say "my canonical is the homepage". Even after fix 1, that tells engines to consolidate all pages into the homepage, which hides the most citable content (project write-ups, services).
   **Fix:** generate a per-page `alternates.canonical` and `languages` in each page's `generateMetadata` using the real path. Also, with `localePrefix: 'as-needed'`, the IT canonical must be `/` or `/sobre-mi`, not `/it/...`. `/it` returns a 307 to `/`, so canonicals to /it point at a redirect. Effort: 1-2 h.

### HIGH

3. **No structured data at all** (0 JSON-LD blocks on all pages). There's no entity graph for AI engines.
   **Fix:** add these:
   - `Person` for Martina Chiara Maria Pozzi: jobTitle "Architetta", alumniOf Politecnico di Milano, worksFor, `sameAs` to LinkedIn, Instagram, Houzz, Archilovers, Homify, Spazi Belli, Pinterest.
   - `ProfessionalService`/`LocalBusiness` for MP_archistudio: address Via Bologna 2, 24128 Bergamo; telephone; vatID IT07788400963; areaServed Bergamo/Milano/Lombardia; openingHours; founder.
   - `Service` items for ArchiAdvice, Consulenza all'acquisto, Restyling, Progettazione 360°.
   - `CreativeWork`/`Article` per project and news item, with author, datePublished, image, and locationCreated.
   - `BreadcrumbList`.

   Effort: 3-4 h.
4. **llms.txt returns 500.** **Fix:** add a static `public/llms.txt`. Static files are served before the dynamic route. Or add `src/app/llms.txt/route.ts`. Contents: who (Arch. Martina C.M. Pozzi), what (sartorial interior design and renovation), where (Bergamo, Milano, Siviglia), services with one-line descriptions, and key URLs per locale. Also make sure unknown `[locale]` values call `notFound()` (404), not 500. Effort: 30 min.
5. **`<html>` has no `lang` attribute** (`src/app/layout.tsx:23`). On a trilingual site this makes language detection unreliable for AI retrieval and for hreflang matching. **Fix:** set `lang={locale}`. Effort: 15 min.
6. **Wrong-language and wrong-market metadata.**
   - IT pages /sobre-mi, /servicios and /contacto serve Spanish meta descriptions ("Arquitecta con más de 10 años…", "Servicios de arquitectura…", "Contacta con el estudio…"), and their titles stay in Spanish ("Sobre Mí", "Servicios", "Contacto"). The page H1 is Italian, and /en/sobre-mi also has the Spanish title and description.
   - Global keywords include "Madrid".
   - OG locale falls back to es_ES.
   - Homepage title "Studio di Architettura | Portfolio" has no brand, person or city.
   - Many titles repeat the brand ("… | MP_archistudio | MP_archistudio").

   **Fix:** localize every page's metadata through `getTranslations`, remove "Madrid", and use a homepage title like "MP_archistudio – Arch. Martina Pozzi | Interior design e ristrutturazioni a Bergamo". Effort: 1-2 h.

### MEDIUM

7. **Entity and credential gaps, plus inconsistencies.**
   - About text says "oltre 15 anni di esperienza", but the meta says "más de 10 años".
   - Home H1 "Ristruttura senza pensieri" doesn't name who or where. Only an eyebrow line says "…A BERGAMO".
   - The site doesn't mention registration with the Ordine degli Architetti (province and number). That's the key professional credential an AI engine can verify.
   - Contact email is a personal hotmail address.
   - Location reads as three places (Bergamo + Siviglia; the case study is in Milano) without a clear service area.

   **Fix:** state the Ordine registration, use one experience figure, add a 40-60 word entity summary on home and about ("Martina C.M. Pozzi è un'architetta iscritta all'Ordine di … che dal 2021 guida MP_archistudio a Bergamo…"), and use a domain email. Effort: 1 h plus the client's input.
8. **Low passage citability.**
   - Services are bullet lists of "Adatto se:" with no direct-answer paragraphs.
   - No prices or ranges, durations, or process timelines.
   - No question-format headings other than "Chi è Martina C.M. Pozzi?" and "Come lavoriamo?".
   - News posts are short (~300 words).
   - The Casa Archi & Colori write-up is good: concrete brands (Mutina, Quintessenza, Sant'Agostino, Ferroluce), 155 m², Milano 2025, photographer credit. Most other projects are likely thinner.

   **Fix:**
   - Add an FAQ block per service, 130-170 word self-contained answers: "Quanto costa una ristrutturazione a Bergamo?", "Cos'è ArchiAdvice e quanto costa?", "Cosa controlla un architetto prima dell'acquisto di una casa?" (agibilità, catasto, conformità urbanistica).
   - Open each project with a 2-sentence summary: what, where, m², year, scope.

   Effort: 4-8 h of writing.
9. **Press coverage isn't used as authority.** The news section lists features (HOME magazine nursery feature, Cose di Casa, Archiboost Talks), but no About/Home "Pubblicato su" block links to the external sources. **Fix:** add a press strip with outbound links and dates. Effort: 1 h.

### LOW

10. No `og:image` on the pages checked. Shared links and some AI answer cards show no thumbnail. **Fix:** give each page an og:image (project cover). Effort: 30 min.
11. No video content. YouTube mentions are the strongest brand-to-AI-citation correlation (~0.74). **Fix:** post short project walkthroughs and Archiboost talk clips to YouTube and embed them on project pages. Effort: ongoing.
12. Sitemap `lastmod` is the build timestamp for every URL, so it isn't a meaningful freshness signal. **Fix:** use the MDX `date` or file mtime. Effort: 30 min.

## Brand and entity presence (third-party)

| Platform | Status |
|---|---|
| Houzz (houzz.it/pro/martina-pozzi) | Live (200), linked from footer |
| Archilovers (/mparchistudio/) | Live (200), linked |
| Homify (esperti/10014002) | Live (200), linked |
| Spazi Belli | Live (200), linked |
| Instagram @mp_archistudio | Live, linked |
| LinkedIn /in/martinachiaramariapozzi | Linked (status 999 = LinkedIn anti-bot, expected) |
| Pinterest, Linktree | Linked |
| Wikipedia (it) | No entity (0 hits) — expected for a solo studio |
| Wikidata | No entity |
| YouTube | No channel found or linked |
| Reddit | No presence detected |

The footer links to these profiles, but no `sameAs` markup ties them to the entity, so engines can't reliably merge them. Action: add `sameAs` (finding 3), and make the name, address, phone, studio name and the canonical URL mparchistudio.com identical on every profile. Optionally create a Wikidata item for the studio once the press coverage can be cited.

## Top 5 highest-impact changes

1. Replace the example.com siteConfig.url with mparchistudio.com: fixes canonical, hreflang, sitemap, robots and the language switcher. (5 min, CRITICAL)
2. Per-page self-referencing canonicals and hreflang that match the `as-needed` prefix. (1-2 h, CRITICAL)
3. JSON-LD Person + ProfessionalService + Service + CreativeWork, with `sameAs` to all profiles. (3-4 h, HIGH)
4. Localized, entity-rich titles and descriptions; `<html lang>`; static llms.txt. (2-3 h, HIGH)
5. FAQ / direct-answer blocks on services, a credentials statement (Ordine registration), and a press strip. (5-9 h, MEDIUM)

## audit-data.json (AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 42,
  "dimensions": {"citability": 40, "structural_readability": 55, "multimodal": 55, "authority_brand": 35, "technical_accessibility": 30},
  "platforms": {"google_aio": 30, "chatgpt": 40, "perplexity": 45, "bing_copilot": 30},
  "crawlers": {"OAI-SearchBot": "allowed", "GPTBot": "allowed", "Claude-SearchBot": "allowed", "ClaudeBot": "allowed", "PerplexityBot": "allowed", "Google-Extended": "allowed", "Applebot-Extended": "allowed", "CCBot": "allowed"},
  "llms_txt": "error_500",
  "rsl": "absent",
  "rendering": "SSR/prerendered",
  "findings": [
    {"id": "geo-1", "severity": "critical", "title": "siteConfig.url is https://example.com; canonical/hreflang/og:url/sitemap/robots Sitemap/language switcher point to example.com", "file": "src/lib/constants.ts:7", "effort": "5m"},
    {"id": "geo-2", "severity": "critical", "title": "All subpages canonicalize to locale root; IT canonical uses /it which 307-redirects", "file": "src/app/[locale]/layout.tsx", "effort": "1-2h"},
    {"id": "geo-3", "severity": "high", "title": "No JSON-LD structured data (Person, ProfessionalService, Service, CreativeWork)", "effort": "3-4h"},
    {"id": "geo-4", "severity": "high", "title": "/llms.txt returns 500 (dot-path bypasses middleware, hits [locale])", "effort": "30m"},
    {"id": "geo-5", "severity": "high", "title": "<html> missing lang attribute", "file": "src/app/layout.tsx:23", "effort": "15m"},
    {"id": "geo-6", "severity": "high", "title": "Spanish titles/meta on IT and EN pages; 'Madrid' keyword; generic homepage title; duplicated brand suffix", "effort": "1-2h"},
    {"id": "geo-7", "severity": "medium", "title": "Entity gaps: no Ordine degli Architetti registration, 10 vs 15 years inconsistency, H1 lacks who/where", "effort": "1h"},
    {"id": "geo-8", "severity": "medium", "title": "Low passage citability: no FAQ/direct-answer blocks, no pricing/timelines, few question headings", "effort": "4-8h"},
    {"id": "geo-9", "severity": "medium", "title": "Press coverage not surfaced as authority block with outbound citations", "effort": "1h"},
    {"id": "geo-10", "severity": "low", "title": "No og:image", "effort": "30m"},
    {"id": "geo-11", "severity": "low", "title": "No YouTube/video presence", "effort": "ongoing"},
    {"id": "geo-12", "severity": "low", "title": "Sitemap lastmod = build time for all URLs", "effort": "30m"}
  ]
}
```
