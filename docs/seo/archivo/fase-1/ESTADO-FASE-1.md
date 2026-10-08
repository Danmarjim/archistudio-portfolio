# SEO — stato dell'implementazione (branch `feat/seo-improvements`)

Riferimenti: `docs/seo/archivo/fase-1/SEO-AUDIT-REPORT.md` (audit), `docs/seo/archivo/fase-1/PLAN-FASE-1.md` (piano).

## Azioni manuali

- [x] Eliminati `src/app/layout.tsx` e `src/app/favicon.ico.ico` (il root layout è `src/app/[locale]/layout.tsx`).
- [x] Dominio canonico confermato: `https://mparchistudio.com` (`siteConfig.url` e `public/llms.txt`).
- [ ] Dopo il deploy: inviare `sitemap.xml` in Search Console e richiedere l'indicizzazione della home.

## Fatto

| Piano | Cosa |
|---|---|
| F1-1 | `siteConfig.url` = dominio reale (era `https://example.com`) |
| F1-2 | `src/lib/seo.ts`: canonical autoreferenziale, hreflang (it/es/en + x-default), Open Graph e Twitter per ogni pagina. Rimossi gli `alternates` statici del layout |
| F1-3 | `dynamicParams = false` su locale e slug, `src/app/not-found.tsx` globale, catch-all `[locale]/[...rest]` e 404 localizzata. `/favicon.ico`, `/llms.txt`, `/proyectos/cucina-mite` non danno più 500 |
| F1-4 | Sitemap: senza `/it`, con news e `/tappeti`, hreflang per voce, `lastModified` dalle news |
| F1-5 | Modulo di contatto mobile: la riga delle icone social non andava a capo (8 × 40 px) e allargava la griglia |
| F2-1 | `<html lang={locale}>` |
| F2-2 | Metadata localizzati per progetti, news, chi sono, servizi, contatti, tappeti, privacy (`Metadata.pages.*` in `messages/*.json`). Marchio non più duplicato, via "Madrid", `authors` = Martina Pozzi |
| F2-3 | Titolo e description della home con marchio e città |
| F2-4 | JSON-LD: `ProfessionalService` + `Person` + `WebSite` (globale), `BreadcrumbList` ovunque, `Article` (news), `CreativeWork` (progetti) |
| F2-5 | LCP: `template.tsx` rendeva TUTTE le pagine con `opacity:0` nell'HTML; ora il primo caricamento è visibile. Hero senza animazioni di opacità (Server Component), `priority` e `sizes` sulle prime card, carosello home visibile da subito |
| F2-6 | NAP coerente (`Via Bologna 2, 24128 Bergamo`) e telefono nel footer |
| F3-2 | Categoria del progetto tradotta nella scheda es/en |
| F3-3 | Fascia "Pubblicato su" in home (`PressBand`), derivata dalle news con `source` |
| F3-4 | `**grassetto**` reso correttamente nelle news (niente asterischi visibili) |
| F3-5 | `public/llms.txt`; `og:image` per pagina (cover del progetto/news, altrimenti cover del primo progetto in evidenza) |
| F3-7 | `alt` descrittivo nel carosello della home |
| F4-1 | Header di sicurezza e `poweredByHeader: false` (senza CSP: va provata con Analytics/Calendly) |
| F4-3 | Touch target ≥ 44 px (filtri progetti, icone social) |
| extra | Link interni che non rispettavano la lingua (`next/link` → `Link` di next-intl): da `/es` portavano alle pagine italiane |

## Da fare (richiede dati o decisioni di Martina)

> **Aggiornamento 8 ott 2026:** la fase 2 continua in `docs/seo/PLAN.md` (piano, brief in `docs/seo/briefs/`, elenco unico dei dati da chiedere a Martina). Le voci segnate ✅ sono già state fatte; le altre sono riprese lì.

- **Iscrizione all'Ordine** (Bergamo o Monza e Brianza + numero) → aggiungere `hasCredential` in `buildSiteGraph` e mostrarla in "Chi sono".
- ✅ **Anni di esperienza**: "più di 10" (meta, `AboutPage.intro`) vs "oltre 15" nel testo. Scegliere una cifra e allineare `messages/*.json`. *(fatto 8 ott: rimossa `AboutPage.intro`, resta solo "oltre 15")*
- **Email sul dominio** al posto dell'hotmail (`siteConfig.email`).
- **H1 della home**: "Ristruttura senza pensieri" non contiene la città (solo l'overline). Decisione di copy.
- **Pagina ArchiAdvice / consulenza all'acquisto** con prezzo, cosa si riceve e prenotazione: servono prezzi e testi reali.
- ✅ **Pagine progetto più ricche** (incarico, soluzioni, materiali, tempi, budget, citazione del cliente) e **titoli tradotti** in es/en. *(titoli tradotti 8 ott (G1); pagine più ricche ancora da fare (C15))*
- **Guida alla progettazione del bagno** (news) a partire dai tre progetti di bagni, con link interni.
- **Testimonianze** (es. Spazi Belli 5,0★, 7 recensioni).
- ✅ **Orari** in `ProfessionalService` (`openingHoursSpecification`) quando sono confermati. *(fatto 8 ott con gli orari già pubblicati (lun–ven 9–18))*
- **Siviglia**: pagine/servizio dedicati solo se si vuole posizionare il mercato spagnolo.
- **Google Business Profile**, citazioni (Archilovers, Linktree, PagineGialle), nome commerciale identico ovunque.
- ✅ **File**: rinominare `public/images/about/placeholder.jpg` e `MP_ARCHISTUDIO LOGO S.png`. *(fatto 8 ott (B3))*
- ✅ **Slug `cucina-MITE`** ha maiuscole (`content/projects/*/cucina-MITE.mdx` e immagini `cucina-MITE-*.jpg`): rinominare in minuscolo con un redirect 301 dal vecchio URL. Per questo NON è stato aggiunto il redirect globale a minuscolo (F4-2). *(fatto 8 ott: `cucina-mite` + redirect da maiuscole a minuscole nel middleware)*
- ✅ Titolo della news Archiboost contiene già "| MP_Archistudio": rimuoverlo dal frontmatter per evitare il marchio doppio nel `<title>`. *(fatto 8 ott)*
- ✅ Slug italiani (`/progetti`, `/chi-sono`…) con 301: solo dopo che canonical e hreflang si sono stabilizzati. *(fatto 8 ott (A1))*
- ✅ Search Console + chiave API Google (CrUX) per dati di campo; rilanciare l'audit dopo il deploy. *(fatto 8 ott: proprietà verificata, API collegata, audit ripetuto (49 → 80))*

## Verifiche eseguite

`tsc --noEmit` pulito; `next build` riuscito (55 pagine statiche, home e liste restano SSG); server di produzione in locale con contenuti di prova:
`/`, `/es`, `/en/proyectos`, `/proyectos/cucina-MITE` → 200; `/proyectos/cucina-mite`, `/index.md`, `/xyz`, `/es/xyz` → 404; `/favicon.ico`, `/llms.txt` → 200.
Verificati nell'HTML: `lang`, canonical, hreflang, Open Graph, JSON-LD, nessun `example.com`, link interni con prefisso lingua e nessun `opacity:0` above the fold.
Non verificato: Lighthouse reale su mobile, rendering visivo del modulo di contatto a 375 px (la correzione è sul CSS ma non l'ho vista in un browser) e contenuti reali (la build di prova usava contenuti ridotti).
