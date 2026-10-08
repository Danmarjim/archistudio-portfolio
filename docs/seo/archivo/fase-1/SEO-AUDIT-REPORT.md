# Audit SEO — mparchistudio.com

**Data:** 7 ottobre 2026
**Ambito:** homepage + ~60 URL (it / es / en)
**Fonti dati:** test di laboratorio (Lighthouse 13.5, Playwright, ricerche Google organiche). Non sono stati usati Search Console, CrUX (dati reali utenti) né Moz: i valori di performance vanno confermati con dati di campo.

---

## 1. Riepilogo

### SEO Health Score: **49 / 100**

Il sito è tecnicamente solido (renderizzato lato server, veloce su desktop, accessibile), ma un errore di configurazione impedisce a Google di indicizzarlo correttamente: cercando il marchio ("mparchistudio Martina Pozzi architetto") il sito **non compare** tra i risultati.

| Categoria | Peso | Punteggio |
|---|---|---|
| SEO tecnico | 22% | 38 |
| Qualità dei contenuti | 23% | 52 |
| SEO on-page | 20% | 55 |
| Dati strutturati (schema) | 10% | 8 |
| Performance (Core Web Vitals) | 10% | 90 |
| Preparazione per la ricerca AI | 10% | 42 |
| Immagini | 5% | 68 |

Punteggi complementari: **SEO locale 24**, **esperienza di ricerca (SXO) 47**, **accessibilità per agenti AI 100**. Backlink: dati insufficienti (il dominio non è ancora presente in Common Crawl, normale per un sito recente).

**Tipo di attività rilevato:** servizio professionale locale, ibrido (architetta indipendente, Bergamo + Siviglia).

### Causa principale

In `src/lib/constants.ts:7` l'URL del sito è ancora il segnaposto `https://example.com`. Questo valore alimenta `metadataBase`, canonical, hreflang, `og:url`, sitemap, robots.txt e il selettore di lingua. Inoltre il canonical è definito una sola volta in `src/app/[locale]/layout.tsx:68-75` e nessuna pagina lo sovrascrive: **ogni pagina dichiara come canonical la homepage della propria lingua su example.com**. Per Google, quindi, il sito "vero" è un altro dominio.

### 5 problemi critici

1. Canonical, hreflang, `og:url`, sitemap e robots.txt puntano a `example.com` (in tutto il sito). Il selettore di lingua porta i visitatori reali su example.com.
2. Tutte le pagine (progetti, news, chi sono…) hanno come canonical la home della lingua; il canonical italiano usa `/it`, che fa redirect 307 a `/`.
3. Errore **HTTP 500** invece di 404 su qualsiasi percorso inesistente con un punto (`/favicon.ico`, `/llms.txt`, `/index.md`, `/ads.txt`) e su `/proyectos/cucina-mite`. Manca un `src/app/not-found.tsx` alla radice e la favicon si chiama `favicon.ico.ico`.
4. Sitemap: 13 URL su 39 fanno redirect (`/it/...`), mancano tutte le news (21 URL) e `/tappeti`, nessun hreflang.
5. Modulo di contatto **tagliato su mobile**: a 375 px i campi escono dallo schermo a destra.

### 5 interventi rapidi

1. Correggere una riga in `constants.ts` (5 minuti).
2. `<html lang={locale}>` tramite `getLocale()` in `src/app/layout.tsx`.
3. Eliminare il marchio duplicato nei titoli (48 titoli su 60 terminano con `| MP_archistudio | MP_archistudio`).
4. `priority` sulle prime card di `/proyectos` (LCP mobile 4,2 s → obiettivo < 2,5 s).
5. Aggiungere il link al sito su Archilovers e Linktree.

---

## 2. SEO tecnico — 38/100

**Funziona bene:** rendering completo lato server (il contenuto è nell'HTML), HTTPS + HSTS, redirect corretti da `www` e `http`, viewport mobile corretto, 404 normali funzionanti, sitemap XML ben formata.

| Gravità | Problema | Dove | Soluzione |
|---|---|---|---|
| Critica | URL del sito = example.com | `src/lib/constants.ts:7` | `https://mparchistudio.com` |
| Critica | Canonical/hreflang non specifici per pagina | `src/app/[locale]/layout.tsx:47, 68-75` | Calcolarli in ogni `generateMetadata` (italiano senza prefisso, `/es`, `/en`, `x-default`) |
| Critica | 500 su percorsi con punto | `src/middleware.ts:11`, manca `src/app/not-found.tsx` | `not-found.tsx` alla radice, rinominare `favicon.ico.ico` → `favicon.ico`, `notFound()` per locale/slug non validi |
| Alta | hreflang HTML (example.com) in conflitto con l'header HTTP `Link` (corretto) | layout | Si risolve con i punti sopra; Google ignora hreflang in conflitto |
| Alta | `<html>` senza attributo `lang` | `src/app/layout.tsx:18` | `lang={await getLocale()}` |
| Alta | Header di sicurezza assenti (solo HSTS) | `next.config.ts` | `headers()` con CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; `poweredByHeader: false` |
| Media | URL con maiuscole restituiscono 200 (`/PROYECTOS`) | routing | Redirect a minuscolo |
| Media | Redirect di lingua 307 invece di 308 | next-intl | Comportamento predefinito; si attenua togliendo `/it` dalla sitemap |
| Bassa | Slug in spagnolo per tutte le lingue (`/proyectos`, `/sobre-mi`…) | `src/i18n/routing.ts` | Valutare `pathnames` localizzati con 301, dopo aver risolto il canonical |

## 3. Qualità dei contenuti — 52/100

E-E-A-T 57/100 · Leggibilità buona · Traduzioni es/en reali (nessun contenuto duplicato tra lingue) · Tutte le immagini hanno testo alternativo.

| Fattore | Punteggio | Note |
|---|---|---|
| Esperienza | 70 | 8 progetti reali con foto, luogo, anno e m²; stampa (Cose di Casa, HOME n.36, Archiboost); linea di tappeti propria |
| Competenza | 55 | Laurea al Politecnico di Milano; manca l'iscrizione all'Ordine |
| Autorevolezza | 50 | Stampa e profili social presenti ma non collegati (né link né schema) |
| Affidabilità | 55 | P.IVA, indirizzo, telefono, privacy; penalizzata da contraddizioni e metadati in lingua sbagliata |

**Problemi principali**

- **Alta** — Nessun numero di iscrizione all'Ordine degli Architetti, pur offrendo consulenze su agibilità e catasto.
- **Alta** — Anni di esperienza contraddittori: "più di 10" nella meta description, "oltre 15" nel testo.
- **Alta** — Pagine progetto sottili: mediana ~185 parole (cucina-parigina 133). Proposta: struttura fissa con incarico, soluzioni, materiali e fornitori, tempi, fascia di budget, prima/dopo, citazione del cliente.
- **Media** — Titoli dei progetti non tradotti in es/en e senza località; nella scheda progetto es/en la categoria mostra la chiave italiana ("Cucine") invece della traduzione.
- **Media** — Collegamenti interni deboli: gli articoli di stampa non linkano ai progetti citati, i progetti non linkano ai servizi.
- **Media** — News brevi (111–204 parole), senza autore; nell'articolo Archiboost compaiono gli asterischi markdown `**…**`.
- **Media** — Email di contatto personale (hotmail) invece di un indirizzo sul dominio; alternanza "noi"/"io" nei testi; tipologie del modulo di contatto ("Villa unifamiliare", "Progetto commerciale") non allineate ai servizi.

## 4. SEO on-page — 55/100

- **Alta** — Titolo della home generico: "Studio di Architettura | Portfolio" (né nome, né marchio, né città). La description cita "progetti commerciali" che non esistono. Proposta: `Architetto a Bergamo – Martina Pozzi | MP_archistudio`.
- **Alta** — `/sobre-mi`, `/servicios` e `/contacto` mostrano titolo e description **in spagnolo** anche in italiano e inglese: il loro `layout.tsx` esporta un `metadata` statico. Soluzione: `generateMetadata` + `getTranslations`.
- **Media** — Marchio duplicato in 48 titoli su 60 (suffisso manuale + template del layout).
- **Media** — `keywords` in spagnolo con "Madrid" su tutte le pagine; `authors` è il marchio invece di Martina Pozzi.
- **Bassa** — Nessuna `og:image` (pur avendo `summary_large_image` per Twitter).

## 5. Dati strutturati — 8/100

Nessun JSON-LD, Microdata o RDFa su nessuna pagina (verificato anche dopo il rendering JavaScript).

Da aggiungere:
- **In tutto il sito:** `@graph` con `ProfessionalService` (indirizzo, telefono, orari, P.IVA, `areaServed`) + `Person` (Martina C.M. Pozzi, Politecnico di Milano, `hasCredential` per l'Ordine) + `WebSite`, con `sameAs` verso Instagram, LinkedIn, Pinterest, Houzz, Archilovers, Homify, Spazi Belli.
- **`BreadcrumbList`** su progetti, news, chi sono, contatti (unico rich result realmente ottenibile).
- **`Article`** per le news, **`CreativeWork`** per i progetti (chiarezza dell'entità, non rich result).
- Nota: `/sobre-mi` è un Client Component, quindi il JSON-LD va inserito dal suo `layout.tsx`.

Non si raccomandano FAQPage (rich result ritirati da Google a maggio 2026) né HowTo.

## 6. Performance — 90/100

| Pagina | Mobile | LCP mobile | CLS |
|---|---|---|---|
| `/` | 94 | 3,1 s (da migliorare) | 0,002 |
| `/proyectos/casa-archi-colori` | 91 | 3,5 s (da migliorare) | 0 |
| `/proyectos` | 84 | **4,2 s (scarso)** | 0 |

Desktop: 100 (LCP 0,7 s). CLS eccellente ovunque, TBT 0–20 ms, nessuno script di terze parti, font self-hosted, AVIF/WebP automatici.

- **Alta** — Il blocco hero parte con `opacity:0` (Framer Motion) nell'HTML: su mobile ritarda l'LCP di ~1 s e, senza JavaScript, titolo e pulsanti restano invisibili. Soluzione: hero visibile dal primo render, animazioni solo sotto la piega.
- **Alta** — La prima card di `/proyectos` ha `loading="lazy"`. Soluzione: `priority` sulle prime 2–4 card. È l'intervento con il miglior rapporto costo/beneficio.
- **Media** — 4 immagini `priority` in concorrenza sulla home e nessuna con `fetchpriority="high"`. Tenere `priority` solo sull'elemento LCP.
- **Bassa** — Polyfill legacy (~14 KB) e CSS bloccante (~10 KB).

## 7. Immagini — 68/100

- Base solida: `srcset` responsive, dimensioni esplicite, compressione corretta (1,28 MB JPEG → 34,5 KB WebP).
- **Media** — ~98 KiB sprecati su mobile: valori `sizes` più grandi del riquadro reale.
- **Bassa** — Un'immagine della home ha `alt="Progetto 1"`: usare il nome del progetto.
- **Bassa** — La foto di Martina si chiama `placeholder.jpg` e il logo ha spazi nel nome (`MP_ARCHISTUDIO LOGO S.png`): rinominare.

## 8. Ricerca AI (GEO) — 42/100

- **Accesso dei crawler:** robots.txt consente tutto (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) e il contenuto è nell'HTML.
- **Alta** — `/llms.txt` restituisce 500. Soluzione: file statico `public/llms.txt` (chi, cosa, dove, servizi, URL principali per lingua).
- **Media** — Poco contenuto "citabile": servizi senza prezzi né tempi, nessuna risposta alle domande reali (costo di una ristrutturazione a Bergamo, cos'è ArchiAdvice, cosa controlla un architetto prima dell'acquisto). Eccezione positiva: il progetto Casa Archi & Colori.
- **Media** — La stampa (HOME, Cose di Casa, Archiboost) è nascosta nelle news: aggiungere una fascia "Pubblicato su".
- **Bassa** — Nessuna presenza su YouTube (forte correlazione con le citazioni AI).

## 9. SEO locale — 24/100

- **Critica** — Nessuna integrazione verificabile con Google Business Profile (mappa, recensioni, indicazioni). Verificare la scheda su business.google.com con categoria *Architetto*.
- **Alta** — Due mercati (Bergamo e Siviglia) senza pagine dedicate; "Bergamo" compare solo in un testo decorativo, mai nel titolo, nell'H1 o nella meta.
- **Alta** — Nome dell'attività scritto in modo diverso su ogni profilo (Houzz, Homify, Spazi Belli, Archilovers); assente su PagineGialle.
- **Media** — Recensioni non valorizzate: Spazi Belli ha 5,0★ con 7 recensioni, ma sul sito non ci sono testimonianze.
- **Media** — Il telefono compare solo nel footer di `/contacto`.
- **Media** — **Indirizzo incoerente sul sito:** footer "Via Bologna, 24128"; contatti e privacy "Via Bologna 2, 24128 Bergamo".

## 10. Esperienza di ricerca (SXO) — 47/100

| Ricerca | Cosa mostra Google | Pagina del sito | Gravità |
|---|---|---|---|
| architetto Bergamo | Directory e home di studi locali | Home senza Bergamo nel titolo | Alta |
| ristrutturazione appartamento Bergamo architetto | Pagine servizio locali, case study con località | Ancora dentro `/servicios` | Alta |
| progettazione bagno architetto | ~70% guide pratiche | Solo progetti di bagni | Critica |
| consulenza architetto online | ~75% pagine servizio con prezzo (80–150 €/h) | ArchiAdvice senza pagina né prezzo | Alta |

**Punti di forza:** fotografia eccellente, sezione "Come lavoriamo" chiara, prenotazione Calendly con risposta in 48 h, progetti recenti.

## 11. Accessibilità e visual — mobile

- **Alta** — Modulo `/contacto` tagliato a destra su mobile.
- **Media** — Filtri di `/proyectos` alti 36 px e icone social del footer ~20 px (minimo consigliato 44–48 px).
- **Ok** — H1 e pulsanti visibili senza scorrere su desktop e mobile; nessuna sovrapposizione; griglia progetti corretta su mobile; albero di accessibilità 100/100 (etichette, pulsanti, landmark).

## 12. Backlink

Dati insufficienti per un punteggio (il dominio non è ancora in Common Crawl).

- **Link verificati:** Spazi Belli (dofollow), Homify (nofollow, punta a `http://www.`), Houzz, Instagram.
- **Mancano:** Archilovers (campo sito vuoto), Linktree (nessun link al sito, molti link di affiliazione non pertinenti).
- **Non verificabile:** LinkedIn (richiede login).

---

## 13. Piano d'azione

Ogni voce: **cosa** · dove · come verificare.

### Fase 1 — Critico (settimana 1)

Il punto 1 sblocca tutto il resto: senza di esso, ogni miglioramento viene attribuito a example.com.

1. **Dominio reale in `siteConfig.url`** · `src/lib/constants.ts:7`. *Verifica:* nessun `example.com` nell'HTML né in robots.txt.
2. **Canonical + hreflang per pagina** · togliere `alternates` statici dal layout, helper per percorso in ogni `generateMetadata`. *Verifica:* `/es/proyectos/casa-archi-colori` dichiara sé stessa come canonical; HTML e header `Link` coincidono.
3. **Eliminare i 500** · `not-found.tsx` radice, rinominare la favicon, `notFound()` per locale/slug non validi. *Verifica:* `/favicon.ico`, `/llms.txt`, `/proyectos/cucina-mite` non restituiscono mai 500.
4. **Sitemap corretta** · senza `/it`, con news, `/tappeti`, hreflang, `lastmod` reale da MDX (39 → ~63 URL). *Verifica:* 0 URL con redirect; sitemap inviata in Search Console con stato "Riuscito".
5. **Modulo di contatto su mobile.** *Verifica:* screenshot a 375 px senza tagli.

### Fase 2 — Alto impatto (settimane 2–3)

6. `<html lang>` con `getLocale()`.
7. Metadati localizzati per `sobre-mi`, `servicios`, `contacto`; eliminare il marchio duplicato; togliere "Madrid"; `authors` = Martina Pozzi.
8. Home con marchio + località nel titolo, H1 e description.
9. JSON-LD (`ProfessionalService`, `Person`, `WebSite`, `BreadcrumbList`, `Article`, `CreativeWork`).
10. LCP mobile: hero visibile da subito, `priority` sulle prime card, `sizes` corretti. *Verifica:* Lighthouse mobile LCP < 2,5 s.
11. Google Business Profile *(a cura di Martina)*.
12. NAP coerente: stesso indirizzo ovunque, telefono nel footer globale.

### Fase 3 — Contenuti e autorevolezza (mese 2)

13. Pagina dedicata **ArchiAdvice** (e Consulenza acquisto) con prezzo visibile, cosa si riceve, Calendly.
14. Progetti più ricchi: località nel titolo, struttura fissa, titoli tradotti, categoria tradotta.
15. Segnali E-E-A-T: numero di iscrizione all'Ordine, un'unica cifra di esperienza, email sul dominio, testimonianze, fascia "Pubblicato su".
16. **Guida alla progettazione del bagno** nelle news, a partire dai tre progetti di bagni.
17. `public/llms.txt` statico + `og:image` per ogni pagina.
18. Citazioni: sito su Archilovers, link su Linktree, iscrizione a PagineGialle, nome commerciale identico ovunque.

### Fase 4 — Monitoraggio

19. Header di sicurezza in `next.config.ts`.
20. URL in minuscolo; valutare slug italiani con 301.
21. Touch target ≥ 44 px (filtri, icone social).
22. Baseline di monitoraggio SEO dopo il deploy della Fase 1, da confrontare a ogni rilascio.
23. Configurare Search Console e una chiave API Google per dati reali (CrUX, indicizzazione).

### Indicatori da seguire

- Search Console → Pagine indicizzate: dovrebbero salire a ~60 entro 2–4 settimane dalla Fase 1.
- Ricerca del marchio ("mparchistudio", "Martina Pozzi architetto"): il sito deve comparire tra i primi 3 risultati.
- Errori 5xx in Search Console: 0.

---

## 14. Da confermare con Martina

Queste risposte servono per completare parte del piano:

1. **Indirizzo pubblico:** pubblicare il numero civico (Via Bologna 2) o no? Va reso identico su sito e profili.
2. **Iscrizione all'Ordine:** Bergamo o Monza e Brianza? Numero di iscrizione.
3. **Esperienza:** più di 10 o più di 15 anni?
4. **Siviglia:** si vuole posizionare attivamente il mercato spagnolo?
5. **Google Business Profile:** esiste già una scheda?
