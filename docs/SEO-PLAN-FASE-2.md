# Plan SEO fase 2 — mparchistudio

Continúa `docs/SEO-IMPLEMENTATION-PLAN.md` (fase 1, cerrada: score 49 → 80). Fuentes:

- Re-auditoría de producción del 7 oct 2026 (10 subagentes, comparativa hallazgo por hallazgo).
- Plan de clusters `/seo cluster architetto Bergamo` (8 oct 2026): 14 páginas en 4 clusters, 52 keywords, evidencia SERP.
- Pendientes de `docs/SEO-IMPLEMENTATION-STATUS.md`.
- Search Console (API conectada el 8 oct): la home y las páginas principales están indexadas con canonical correcto; 0 impresiones en 90 días; sin datos CrUX (poco tráfico).

**Diagnóstico:** el sitio ya no tiene problemas de indexación. Que no aparezca por "studio architettura Bergamo" es falta de relevancia y autoridad local: una sola página de servicios, sin ficha de Google Business Profile, sin reseñas visibles y sin contenido que responda a las búsquedas reales (precios, reforma en Bergamo, guías).

> Igual que en fase 1: antes de cada tarea, comprobar en el código que el problema sigue ahí.

## Decisiones previas (bloquean tareas)

| # | Decisión | Bloquea | Propuesta |
|---|---|---|---|
| D1 | Slugs en italiano (`/servizi`, `/progetti`, `/chi-sono`, `/contatti`) | A1, A2 | ✅ **Decidido (8 oct): sí, ahora.** Hecho en PR 1 |
| D2 | Precio de ArchiAdvice y de la consulenza acquisto | C2, C3 | Pedir a Martina. La SERP muestra 80–150 € por 60 min; sin precio la página compite peor |
| D3 | Nº de colegiación (el albo público indica Ordine di Monza e Brianza, 2012) | B4 `hasCredential`, C1 | Pedir a Martina |
| D4 | Premio Piranesi Prix de Rome 2009: ¿se menciona? | B4 `award`, C1 | Confirmar con Martina |
| D5 | H1 de la home con Bergamo | A3 | ⏳ **Decide Martina.** Propuesta: mantener "Ristruttura senza pensieri" como claim y añadir un H1 descriptivo ("Architetto a Bergamo: ristrutturazioni e interni su misura"), o al revés. Decisión de copy |
| D6 | Sevilla: ¿zona de servicio real? | B4 `areaServed` | ✅ **Sí** (8 oct): añadida al `areaServed`. |
| D7 | Tipos del formulario de contacto | B9 | ✅ **Los 4 servicios + Catálogo tappeti + Altro** (8 oct). |
| D8 | Email de dominio (`info@mparchistudio.com`) y horarios | B4, C1 | Martina; el email se puede crear en el proveedor del dominio |
| D9 | `opacity:0` bajo el pliegue (10 elementos en la home) | B12 | Propuesta: mantener las animaciones; no afectan a SEO ni LCP |

## Estado

**PR 1 (rama `feat/seo-fase-2`, 8 oct):** A1, B1–B11 hechos y verificados en build local (ver detalle al final). Pendiente: B12 (decisión D9), A2–A4 y bloques C–D.

**Briefs (8 oct):** completos para A3 (home), C1 (chi sono), C2, C3, C4, C6 (servicios) y C7–C14 (guías) en `docs/seo-briefs/`. Cada brief termina con la checklist de datos de Martina. Antes de publicar cualquier guía: C-pre (render Markdown completo + `seoTitle` en noticias).

## Registro de comandos ejecutados

Antes de lanzar un comando del plugin `claude-seo`, mirar aquí si ya está hecho. Los resultados completos están en `docs/seo-data/` y `docs/seo-briefs/`; no hace falta repetirlos salvo en los casos de la última columna.

| Fecha | Comando | Alcance | Resultado / dónde está | Cuándo repetirlo |
|---|---|---|---|---|
| 7 oct | `/seo setup` | Entorno Python 3.12 + Chromium del plugin | Instalado (`CLAUDE_SEO_PYTHON` en `~/.zshrc`) | Solo si `/seo doctor` falla |
| 7 oct | `/seo audit https://mparchistudio.com` | Auditoría completa, 11 subagentes (técnico, contenido, schema, sitemap, rendimiento, visual, GEO, agentes, local, SXO, backlinks) | Score 49/100. `docs/SEO-AUDIT-REPORT.md` (IT) y `docs/seo-data/2026-10-07-audit-inicial/` | — (superado por la re-auditoría) |
| 7 oct | `/seo audit` (re-auditoría tras fase 1) | Los mismos 10 subagentes, comparando hallazgo por hallazgo (sin backlinks: nada cambió fuera de la web) | Score 80/100. `docs/seo-data/2026-10-07-reaudit-produccion/` | Tras publicar las páginas de A2/C, o cada 2–3 meses |
| 7 oct | `/seo drift baseline https://mparchistudio.com/` | Foto de la home (title, meta, canonical, schema, OG…) | Guardada en la base local del plugin | Nunca; tras cada deploy usar `/seo drift compare` |
| 8 oct | `/seo google setup` + `inspect-batch`, `sitemaps`, `gsc`, `crux`, `pagespeed` | API de Search Console, PageSpeed y CrUX (nivel 1) | Credenciales en `~/.config/claude-seo/`. Indexación correcta; 0 impresiones; sin datos CrUX (poco tráfico) | `inspect`/`gsc` cuando haga falta: son consultas, no análisis |
| 8 oct | `/seo cluster architetto Bergamo` | 52 keywords, 46 SERP, 4 clusters, 14 páginas | `docs/seo-data/2026-10-08-cluster-architetto-bergamo/` (plan, JSON y mapa HTML) | Solo con datos de volumen (Keyword Planner/DataForSEO) o tras 6–12 meses |
| 8 oct | `/seo hreflang https://mparchistudio.com` | 63 URLs × hreflang, canonical, `lang`, paridad de contenido | 0 errores técnicos; 2 mejoras → bloque G | Si cambian idiomas o rutas |
| 8 oct | `/seo images https://mparchistudio.com` | 11 páginas, 230 imágenes + 176 archivos del repo | 8 mejoras → bloque F | Tras aplicar el bloque F |
| 8 oct | `/seo content-brief consulenza architetto online` | 5 competidores, estructura, meta tags | `docs/seo-briefs/C2-consulenza-architetto-online.md` | No; el brief vale hasta que se escriba la página |
| 8 oct | `/seo content-brief ristrutturazione appartamento Bergamo` | 5 competidores, estructura, meta tags | `docs/seo-briefs/C4-ristrutturazione-appartamento-bergamo.md` | No |
| 8 oct | `/seo content-brief consulenza acquisto casa` | 5 competidores, precios de mercado, estructura, meta tags | `docs/seo-briefs/C3-consulenza-acquisto-casa.md` | No |
| 8 oct | `/seo content-brief restyling casa` | 5 competidores, precios de mercado, estructura, meta tags | `docs/seo-briefs/C6-restyling-casa.md` | No |
| 8 oct | `/seo drift compare https://mparchistudio.com/` | Home frente a la foto del 7 oct (14 reglas) | Sin regresiones; solo cambios intencionados (JSON-LD ampliado, HTML del hero) | Tras cada deploy |
| 8 oct | `/seo content-brief https://mparchistudio.com/` (modo mejora) | Home como pilar "architetto Bergamo": qué conservar, qué añadir, 3 competidores + directorios | `docs/seo-briefs/A3-home.md` | No |
| 8 oct | `/seo content-brief https://mparchistudio.com/chi-sono` (modo mejora) | Página de marca: qué ve Google con su nombre, credenciales, prensa | `docs/seo-briefs/C1-chi-sono.md` | No |
| 8 oct | `/seo content-brief quanto costa un architetto per ristrutturare casa` | 5 competidores, cifras de mercado, estructura | `docs/seo-briefs/C7-quanto-costa-un-architetto.md` | No |
| 8 oct | `/seo content-brief conformità urbanistica e catastale` | 5 competidores, estructura, requisitos normativos | `docs/seo-briefs/C8-conformita-urbanistica-catastale.md` | No (revisar la guía publicada cada 6–12 meses) |
| 8 oct | `/seo content-brief progettazione bagno architetto` | 5 competidores, medidas de referencia, estructura | `docs/seo-briefs/C9-progettare-il-bagno.md` | No |
| 8 oct | `/seo content-brief colore nell'architettura d'interni` (modo mejora) | Artículo existente de 143 palabras frente a 5 competidores | `docs/seo-briefs/C10-colore-architettura.md` | No |
| 8 oct | `/seo content-brief costo ristrutturazione appartamento Bergamo` | 5 competidores, cifras de mercado 2026, estructura | `docs/seo-briefs/C11-costo-ristrutturazione-bergamo.md` | No (actualizar cifras de la guía cada año) |
| 8 oct | `/seo content-brief come scegliere un architetto per ristrutturare casa` | 5 competidores, estructura | `docs/seo-briefs/C12-come-scegliere-architetto.md` | No |
| 8 oct | `/seo content-brief progettazione cucina architetto` | 5 competidores, medidas de referencia, estructura | `docs/seo-briefs/C13-progettare-la-cucina.md` | No |
| 8 oct | `/seo content-brief colori pareti casa consigli architetto` | 5 competidores, criterios, estructura | `docs/seo-briefs/C14-colori-pareti-casa.md` | No |
| 8 oct | Benchmark manual (misma rúbrica que los briefs) | Nuestras páginas frente a los competidores de C2 y C4 | Sección "Benchmark" de este documento | Tras publicar C2/C4 |

**No hace falta lanzar por separado** lo que ya cubre `/seo audit`: `/seo technical`, `/seo content`, `/seo schema`, `/seo sitemap`, `/seo geo`, `/seo agentic`, `/seo local`, `/seo sxo` y `/seo backlinks` son exactamente los subagentes de la auditoría. Tiene sentido lanzarlos sueltos solo para revisar un área concreta después de cambiarla.

**Pendientes, no ejecutados todavía:** ningún brief de contenido (C1–C14 y A3 hechos); brief del hub `/servizi` (A2) cuando se aborde; `/seo backlinks` con API key de Moz (sin ella da lo mismo que el 7 oct).

## Benchmark frente a la competencia (8 oct 2026)

Misma rúbrica que los briefs: profundidad + formato + SEO + experiencia de uso (1–10 cada uno, total /40). Mide solo la página; en la búsqueda local también pesan Google Business Profile, reseñas y antigüedad del dominio, donde los competidores llevan ventaja.

| Búsqueda | Mejor competidor | Nosotros hoy | Objetivo con el brief | Brief |
|---|---|---|---|---|
| ristrutturazione appartamento Bergamo | Atrio 33/40 | ~20/40 | 34–36/40 | `docs/seo-briefs/C4-ristrutturazione-appartamento-bergamo.md` |
| consulenza architetto online | Risorse per progettare 30/40 | ~15/40 | 33–35/40 | `docs/seo-briefs/C2-consulenza-architetto-online.md` |
| consulenza acquisto casa | ConsulenzaCasa360 / Erica Benini 27/40 | ~14/40 | 32–34/40 | `docs/seo-briefs/C3-consulenza-acquisto-casa.md` |
| restyling casa | Caterina Fini 31/40 | ~14/40 | 32–34/40 | `docs/seo-briefs/C6-restyling-casa.md` |
| architetto Bergamo (home) | Atrio 32/40 (y directorios) | ~23/40 | 33–35/40 | `docs/seo-briefs/A3-home.md` |
| Martina Pozzi architetto (marca, `/chi-sono`) | LinkedIn / Homeadore / albo del Ordine | ~22/40 | 33–35/40 | `docs/seo-briefs/C1-chi-sono.md` |
| colore nell'architettura d'interni | Archiformazione 31/40 | ~17/40 | 32–34/40 | `docs/seo-briefs/C10-colore-architettura.md` |

**ristrutturazione appartamento Bergamo** — competidores: Atrio 33, ARB Geom 24, Carzaniga 21, Zambelli 20, RistrutturaSMART 20.
- `/servizi` ~20/40 (profundidad 6 · formato 7 · SEO 2 · experiencia 5): el texto no menciona "ristrutturazione" ni "Bergamo" (0 veces; solo el `<title>`), H1 "I miei servizi", URL genérica, 4 servicios mezclados, sin caso en Bergamo, costes ni plazos. Punto fuerte: el proceso en 5 pasos es más completo que el de casi todos los competidores.
- `/progetti/appartamento-lovingcolors` ~20/40 (4 · 7 · 4 · 5): único caso real en Bergamo, 15 fotos, pero 313 palabras de proyecto, no una página de servicio.

**consulenza architetto online** — competidores: Risorse per progettare 30, Architettura a Domicilio 27, Viù 26, Valentina Falvo 26, Michele Scarpellini 21.
- Sección ArchiAdvice en `/servizi` ~14/40 (2 · 5 · 1 · 6): "consulenza architetto online" y "online" aparecen 0 veces; 4 viñetas y un botón; sin precio (la SERP lo exige), sin cómo funciona ni qué se recibe. Punto fuerte: reserva directa en Calendly.
- `/news/archiadvice-lancio` ~15/40 (3 · 5 · 3 · 4).

**Conclusión:** la distancia no es de calidad del trabajo sino de que estas búsquedas no tienen una página que les responda. Con los briefs aplicados (A2 + C2 + C4) pasaríamos por delante en contenido, con lo que nadie más tiene: caso real, proceso con entregables, color y consulta en tres idiomas. Repetir esta medición tras publicar las páginas.

## Bloque A — Estructura y URLs (código, depende de D1/D5)

**A1. Slugs en italiano con `pathnames`** · `src/i18n/routing.ts`, `src/app/[locale]/*`, `next.config.ts`
- Definir `pathnames` en next-intl: it `/servizi`, `/progetti`, `/progetti/[slug]`, `/chi-sono`, `/contatti`, `/news`, `/tappeti`, `/privacy`; es `/servicios`, `/proyectos`, `/sobre-mi`, `/contacto`; en `/services`, `/projects`, `/about`, `/contact`.
- Redirecciones **301 permanentes** de todas las URLs antiguas italianas (`/servicios` → `/servizi`, `/proyectos/*` → `/progetti/*`, etc.) y de las inglesas.
- Sitemap, hreflang, breadcrumbs, `llms.txt`, enlaces internos y `Link` de navegación con las rutas nuevas.
- Aprovechar para pasar `cucina-MITE` a `cucina-mite` (contenido + imágenes) con 301.
- Verificar: `curl -I` de cada URL antigua → 301 a la nueva; sitemap sin URLs antiguas; 0 enlaces internos a rutas antiguas.

**A2. Servicios en páginas propias** · nuevo `src/app/[locale]/servizi/[slug]/`, `messages/*.json`
- `/servizi` pasa a hub: resumen de 80–120 palabras por servicio + enlace (sin repetir el contenido).
- Páginas nuevas, con el contenido que hoy está en anclas de `/servicios`, ampliado:
  - `/servizi/consulenza-architetto-online` (ArchiAdvice)
  - `/servizi/consulenza-acquisto-casa`
  - `/servizi/ristrutturazione-appartamento-bergamo`
  - `/servizi/restyling-casa`
- Cada una con: H1 con keyword, qué incluye, para quién, proceso, precio (D2) o "da X €", proyectos relacionados, CTA a Calendly/contacto, JSON-LD `Service` con `provider` → `#business` (y `Offer` cuando haya precio).
- `/news/archiadvice-lancio` se queda como anuncio y enlaza visiblemente a la página del servicio.

**A3. Home como página pilar** · `src/app/[locale]/page.tsx`, `Hero.tsx`, `messages/*.json` · **Brief:** `docs/seo-briefs/A3-home.md`
- H1/intro con Bergamo (D5) y un párrafo de entidad de 40–60 palabras (quién, qué, dónde, credenciales).
- Bloque "Servizi" enlazando a las 4 páginas de A2; bloque "Zona" (Bergamo, Milano, Brianza) sin crear páginas de ciudad.
- Objetivo ~1.300 palabras visibles (la SERP son homes de estudios y directorios, no guías largas).

**A4. Enlazado interno** · según `cluster-plan.json` (matriz de 68 enlaces)
- Noticias de prensa → proyecto que mencionan (Cose di Casa → appartamento-lovingcolors; HOME n.36 → casa-archi-colori).
- Cada proyecto → servicio correspondiente + contacto.
- Cada servicio → 2–3 proyectos relacionados.
- Verificar: ninguna página con < 3 enlaces internos entrantes.

## Bloque B — Correcciones técnicas de la re-auditoría (código, sin dependencias salvo las marcadas)

**B1. LCP móvil de la home** · `src/components/sections/Hero.tsx`
- El avatar (176×176) es el elemento LCP en móvil y no tiene `fetchPriority="high"`. Añadirlo y renombrar `public/images/about/placeholder.jpg` → `martina-pozzi.jpg`.
- Verificar: Lighthouse móvil de `/` con LCP < 2,5 s (3 ejecuciones, mediana).

**B2. `sizes` de imágenes** · `ProjectCard.tsx`, `ProjectDetail.tsx` (galería), `ProjectsStrip.tsx`
- 79–103 KiB desperdiciados en móvil: ajustar `sizes` al ancho real del contenedor.

**B3. Renombrar assets** · `public/images/about/`
- `MP_ARCHISTUDIO LOGO S.png` → `mparchistudio-logo.png` (sin espacios); `_K7A93xx.jpg` → nombres descriptivos. Actualizar referencias.

**B4. JSON-LD** · `src/lib/seo.ts` (`buildSiteGraph`), `news/[slug]/page.tsx`, `proyectos/[slug]/page.tsx`
- `ProfessionalService`: `logo` (B3), `image` = logo o foto de Martina (no foto de proyecto), `geo` (lat/long de Via Bologna 2), `description` traducida por locale, `url`/`@id` coherentes, `areaServed` + Milano y Monza e Brianza (+ Sevilla según D6), `openingHoursSpecification` (D8).
- `Person`: `url` → `/chi-sono`, `image`, `knowsAbout`, `knowsLanguage` (it, es, en), `award` (D4), `hasCredential` (D3).
- `Article`: `author` y `publisher` con `name` (+ `logo`) en línea junto al `@id`, o un único `@graph` por página.
- `BreadcrumbList`: etiquetas cortas de navegación ("Progetti", "Chi sono"), no el título SEO.
- `Service` en las páginas de A2.
- Verificar: Rich Results Test sin errores en home, un proyecto, una noticia y un servicio.

**B5. Meta descriptions de proyectos** · `content/projects/{it,es,en}/*.mdx`
- 6 de 8 proyectos tienen un eslogan como descripción. Rellenar el campo `description` (ya existe) con tipo de obra, ciudad, m² y año, en los tres idiomas.

**B6. Coherencia de títulos de proyecto** · MDX es/en
- Ciudad localizada de forma consistente (hoy "Milán" en uno y "Milano" en otro). Propuesta: nombre local en todos los idiomas.

**B7. Limpieza de mensajes** · `messages/*.json`
- Eliminar `AboutPage.intro` ("oltre 10 anni"), que ya no se usa pero viaja en el payload de cada página.

**B8. `llms.txt`** · `public/llms.txt`
- Añadir los 8 proyectos con un dato por línea (lugar, m², año, tipo), sección de prensa con enlaces externos, perfiles sincronizados con `sameAs` y las páginas principales en es/en. Actualizar con las rutas de A1/A2.

**B9. Formulario de contacto** · `src/app/[locale]/contacto/page.tsx`, `messages/*.json` (D7)
- Tipos de proyecto = servicios reales. Texto de la página con zona de servicio y tiempo de respuesta.

**B10. Sitemap** · `src/app/sitemap.ts`
- `lastModified` real para proyectos y páginas fijas (campo `updated` en frontmatter, o fecha del último commit del archivo). Quitar `priority`/`changefreq`.

**B11. CSP** · `next.config.ts`
- Añadir `Content-Security-Policy` probada con Vercel Analytics, Calendly y los JSON-LD inline. Empezar en `Report-Only` una semana.

**B12. Animaciones bajo el pliegue** (D9) — solo si se decide quitarlas.

## Bloque C — Contenido nuevo (requiere textos o datos de Martina)

Preparar antes cada brief con `/seo content-brief <keyword>` (estructura, secciones, palabras, competidores, enlaces). Los briefs se guardan en `docs/seo-briefs/` con el código de la tarea (`C2-…md`).

**Ola 1** (junto con A2/A3):
- C1. Señales E-E-A-T en `/chi-sono`: colegiación (D3), premio (D4), una cifra de experiencia, foto, email de dominio (D8). **Brief:** `docs/seo-briefs/C1-chi-sono.md`.
- C2. Texto de ArchiAdvice con precio (D2). **Brief:** `docs/seo-briefs/C2-consulenza-architetto-online.md`.
- C3. Texto de consulenza acquisto casa (qué se revisa: agibilità, catasto, conformità; precio D2). **Brief:** `docs/seo-briefs/C3-consulenza-acquisto-casa.md`.
- C4. Texto de ristrutturazione appartamento Bergamo (proceso, plazos, casos reales en Bergamo; las tablas de coste por m² van en C11, no aquí). **Brief:** `docs/seo-briefs/C4-ristrutturazione-appartamento-bergamo.md`.
- C5. Testimonios (Spazi Belli 5,0★ / 7 reseñas) en home y servicios.
- C5b. Prensa no recogida: dos artículos de **Homeadore** (Lovingcolors, 25 jun 2026; Casa ARCHI & COLORI, 5 ago 2026) → noticias + franja "Pubblicato su" + `llms.txt` + `subjectOf` (ver brief C1).

**Ola 2:**
- C6. `/servizi/restyling-casa` (texto). **Brief:** `docs/seo-briefs/C6-restyling-casa.md`.
- C7. `/news/quanto-costa-un-architetto-ristrutturazione` (honorarios; comparte SERP con "parcella architetto"). **Brief:** `docs/seo-briefs/C7-quanto-costa-un-architetto.md`.
- C8. `/news/conformita-urbanistica-catastale-prima-di-comprare-casa`. **Brief:** `docs/seo-briefs/C8-conformita-urbanistica-catastale.md`.
- C9. `/news/progettare-il-bagno-consigli-architetto`, a partir de los 3 proyectos de baño. **Brief:** `docs/seo-briefs/C9-progettare-il-bagno.md`.
- C10. Ampliar `/news/il-colore-nell-architettura` (hoy 185 palabras). **Brief:** `docs/seo-briefs/C10-colore-architettura.md`.

**Ola 3:**
- C11. `/news/costo-ristrutturazione-appartamento-bergamo`. **Brief:** `docs/seo-briefs/C11-costo-ristrutturazione-bergamo.md`.
- C12. `/news/come-scegliere-architetto-ristrutturazione`. **Brief:** `docs/seo-briefs/C12-come-scegliere-architetto.md`.
- C13. `/news/progettare-la-cucina-consigli-architetto`. **Brief:** `docs/seo-briefs/C13-progettare-la-cucina.md`.
- C14. `/news/come-scegliere-colore-pareti-casa`. **Brief:** `docs/seo-briefs/C14-colori-pareti-casa.md`.
- C-pre. **Requisito técnico para las guías (C7–C14):** el detalle de noticias (`src/app/[locale]/news/[slug]/page.tsx`) solo renderiza párrafos y negritas; las guías necesitan tablas, listas y H2/H3 (Markdown completo). Añadir también un campo opcional `seoTitle` en el frontmatter de news para títulos de guía largos. Hacerlo antes de publicar la primera guía.
- C15. Proyectos más ricos (encargo, soluciones, materiales, plazos, rango de presupuesto, cita del cliente) y autor visible en las noticias.

Fuera de alcance (decidido en el cluster): páginas por ciudad (Milano, Monza), páginas propias de reforma de baño/cocina "Bergamo" (son secciones de C4), FAQPage, HowTo.

## Datos pendientes de Martina (todas las checklists de los briefs)

Una sola lista para pedirle todo de una vez. Muchos datos se repiten entre briefs (colegiación, precios, testimonios): basta con darlos una vez. Detalle y contexto en cada brief de `docs/seo-briefs/`.

**Datos transversales (desbloquean varias páginas):**
- [ ] Nº de colegiación (Ordine di Monza e Brianza) y si quiere mostrarlo → A3, C1, C2, C3, C4, C7, C12
- [ ] Premio Piranesi Prix de Rome 2009: texto exacto → C1
- [ ] Precios u honorarios (ArchiAdvice, consulenza acquisto, restyling, reforma) o rangos → C2, C3, C4, C6, C7
- [ ] 2–3 testimonios con permiso → A3, C2, C3, C4, C6
- [ ] Fotos del "antes" de los proyectos (LOVINGCOLORS, CASA PEONIA, cocinas, baños) → C4, C6, C9, C13
- [ ] Email de dominio, horarios definitivos, Google Business Profile → D8, D-1
- [ ] H1 de la home (opción A o B) → A3 (D5)
- [ ] Ubicación de Bagno CASA ARCHI & COLORI (¿Bergamo o Milano?) y fotos de `bagno-italian-summer` que se llaman `restyling-casa-peonia-*` → C9, F7

**Por brief:**

<details><summary>Brief A3 — Home (página pilar "architetto Bergamo") (5)</summary>

- [ ] Decisión del H1 (opción A o B) — D5
- [ ] Nº de colegiación — D3
- [ ] 2–3 testimonios con permiso — C5
- [ ] Frase de una línea de resultado para cada proyecto destacado (o validar las que proponga)
- [ ] Tiempo de respuesta que quiere prometer (24 h, 48 h)

</details>

<details><summary>Brief C1 — Chi sono (6)</summary>

- [ ] Nº de colegiación (Ordine di Monza e Brianza) y si quiere mostrarlo
- [ ] Texto exacto del premio Piranesi Prix de Rome 2009 (categoría, proyecto, si fue en equipo)
- [ ] Fechas de la línea temporal (premio 2009, laurea 2011, colegiación 2012)
- [ ] ¿Quiere añadir las publicaciones de Homeadore como noticias?
- [ ] Una segunda foto (en obra, con muestras de color o en el estudio)
- [ ] ¿Algún otro reconocimiento, docencia, charla o publicación?

</details>

<details><summary>Brief C2 — Consulenza architetto online (ArchiAdvice) (8)</summary>

- [ ] Precio de la consulta (y si hay variantes: 30/60/90 min)
- [ ] Plataforma de la videollamada (Meet, Zoom, WhatsApp) y si existe la opción en persona en Bergamo
- [ ] Qué recibe el cliente después (resumen escrito, paleta, enlaces…)
- [ ] ¿Se descuenta el precio de un proyecto posterior?
- [ ] Con cuánta antelación hay que enviar fotos y medidas
- [ ] Nº de colegiación (Ordine di Monza e Brianza)
- [ ] 1–2 ejemplos reales de consultas (problema → solución)
- [ ] 1–2 testimonios con permiso para publicarlos

</details>

<details><summary>Brief C3 — Consulenza acquisto casa (9)</summary>

- [ ] Precio o rango (¿precio fijo, por m², sopralluogo aparte?) y si se descuenta de una reforma posterior
- [ ] Qué documentos revisa exactamente y si hace el accesso agli atti en el ayuntamiento (y quién paga las tasas)
- [ ] ¿Revisa certificaciones de instalaciones / APE?
- [ ] Qué entrega al final (informe escrito, llamada, estimación por partidas) y en cuántos días
- [ ] ¿El sopralluogo es con el cliente, con la agencia, o solo ella?
- [ ] Cómo calcula la estimación orientativa del coste de reforma (rango €/m², por partidas…)
- [ ] Zonas donde hace sopralluoghi
- [ ] 1–2 casos reales anonimizados (problema encontrado → qué hizo el cliente) y un testimonio
- [ ] Nº de colegiación (Ordine di Monza e Brianza)

</details>

<details><summary>Brief C4 — Ristrutturazione appartamento Bergamo (8)</summary>

- [ ] ¿El sopralluogo es gratuito o de pago? ¿Precio?
- [ ] Cómo se calcula el honorario (porcentaje, fases, a forfait) y si se puede dar un rango orientativo
- [ ] Plazos típicos de un piso de 70–90 m² (proyecto + obra)
- [ ] LOVINGCOLORS: fotos del antes, plazo real, rango de presupuesto (si el cliente lo permite)
- [ ] ¿Trabaja con empresas de confianza, deja elegir al cliente, o ambas?
- [ ] Zonas donde trabaja de verdad (¿toda la provincia de Bergamo? ¿Milano ciudad?)
- [ ] Nº de colegiación (Ordine di Monza e Brianza)
- [ ] 1–2 testimonios de clientes de reformas, con permiso para publicarlos

</details>

<details><summary>Brief C6 — Restyling casa (7)</summary>

- [ ] Qué incluye exactamente el servicio (¿solo proyecto?, ¿también coordinación de pintores, carpinteros y montaje?)
- [ ] Cómo se calcula el honorario y si se puede dar un rango
- [ ] Qué intervenciones considera restyling (¿suelos sobrepuestos?, ¿revestimientos?) y cuándo avisa de que hace falta un trámite
- [ ] CASA PEONIA: fotos del antes, plazo y rango de presupuesto (si el cliente lo permite)
- [ ] ¿Trabaja a distancia para restyling (fuera de Lombardía)?
- [ ] Un testimonio de cliente de restyling
- [ ] ¿Las alfombras Sevilla se pueden incluir en un proyecto de restyling? (para el enlace a `/tappeti`)

</details>

<details><summary>Brief C7 — Quanto costa un architetto per ristrutturare casa (5)</summary>

- [ ] ¿Publica su método de cálculo? (porcentaje, forfait por fases, mixto) y un rango orientativo
- [ ] Peso aproximado de cada fase en el total (o confirmar el de mercado)
- [ ] ¿El primer encuentro / sopralluogo es gratuito?
- [ ] LOVINGCOLORS: importe de obra y honorario (o permiso para un ejemplo tipo basado en él)
- [ ] Gastos que suelen ir aparte (tasas municipales, catastro, seguros)

</details>

<details><summary>Brief C8 — Conformità urbanistica e catastale prima di comprare casa (5)</summary>

- [ ] Revisión técnica completa del texto antes de publicar (normativa vigente, Lombardía/Bergamo)
- [ ] Plazos reales del accesso agli atti en los ayuntamientos donde trabaja (Bergamo, Milano, Monza)
- [ ] Las 3–4 difformità que más se encuentra en su experiencia (anonimizadas)
- [ ] Si quiere citar un rango de precio de la verificación (o enlazar solo a C3)
- [ ] Qué documentos pide ella al cliente o a la agencia para empezar

</details>

<details><summary>Brief C9 — Progettare il bagno: i consigli dell'architetta (5)</summary>

- [ ] Estado de partida de cada baño (qué había antes, qué problema resolvía) y fotos del antes si existen
- [ ] Sus medidas de referencia (las que usa ella) y si quiere citar mínimos normativos de Lombardía
- [ ] Rango de coste de un baño reformado (o usar el de mercado con fuente)
- [ ] Plazo típico de obra de un baño
- [ ] Confirmar la ubicación de Bagno CASA ARCHI & COLORI (la ficha dice Bergamo; Casa Archi & Colori está en Milano)

</details>

<details><summary>Brief C10 — Il colore nell'architettura d'interni (ampliación) (4)</summary>

- [ ] Paleta (nombres o códigos de color) de cada uno de los 4 proyectos, si quiere publicarla
- [ ] Fotos del moodboard / LOOKS & FEELS de algún proyecto (con permiso del cliente)
- [ ] Una anécdota de cómo convenció a un cliente de usar color
- [ ] Revisar y ampliar el texto (es su voz)

</details>

<details><summary>Brief C11 — Costo ristrutturazione appartamento Bergamo (5)</summary>

- [ ] Rangos €/m² que ve ella en Bergamo por nivel (o validar los de mercado)
- [ ] Un ejemplo real por partidas (LOVINGCOLORS u otro) con permiso, o un ejemplo tipo
- [ ] Plazos orientativos para 70–90 m²
- [ ] Imprevistos más frecuentes en pisos de los 60-70 en Bergamo
- [ ] ¿Quiere comprometerse a actualizar las cifras cada año?

</details>

<details><summary>Brief C12 — Come scegliere un architetto per ristrutturare casa (4)</summary>

- [ ] Las preguntas que más le hacen los clientes en el primer encuentro
- [ ] Qué incluye siempre por escrito en su encargo (para la sección de contrato)
- [ ] ¿El primer encuentro es gratuito?
- [ ] Revisión del tono de la tabla comparativa (geometra, empresa, interiorista)

</details>

<details><summary>Brief C13 — Progettare la cucina: i consigli dell'architetta (4)</summary>

- [ ] Fotos del antes de Cucina MITE y Cucina PARIGINA
- [ ] Sus medidas de referencia preferidas (y si las adapta a la altura del cliente)
- [ ] ¿Trabaja con carpinteros para cocinas a medida o con tiendas de cocinas? (para la sección de cocina a medida)
- [ ] Plazo típico de un restyling de cocina

</details>

<details><summary>Brief C14 — Colori pareti casa: come sceglierli (4)</summary>

- [ ] Paleta real (nombres o códigos) de 2–3 proyectos, si quiere publicarla
- [ ] Su método para probar muestras (tamaño, marcas o tipos de pintura que prefiere, si quiere citarlos)
- [ ] Una idea por estancia basada en sus proyectos
- [ ] Fotos de muestras de color en obra

</details>

## Bloque D — Fuera de la web (Martina)

- D-1. **Google Business Profile**: categoría *Architetto*, nombre `MP_archistudio`, web, teléfono, dirección o zona de servicio, fotos, horario. Es lo único que la saca en el mapa. Cuando exista: enlace en `sameAs` y botón "Recensioni / Come arrivare" en contacto.
- D-2. Pedir reseñas en Google (primero a los clientes de Spazi Belli).
- D-3. Nombre comercial idéntico en Houzz, Homify, Spazi Belli, Archilovers.
- D-4. Web en Archilovers y en Linktree; alta en PagineGialle. Perfiles en los directorios que encabezan "architetto Bergamo": **Archisio**, **Edilportale** y **Divisare** (detectado en el brief A3).

## Bloque E — Seguimiento

- Tras cada deploy con URLs nuevas: reenviar sitemap y solicitar indexación de las 5 URLs principales en Search Console.
- `/seo drift compare https://mparchistudio.com` tras cada release (baseline del 7 oct).
- Inspección por API (`/seo google inspect-batch`) de las URLs nuevas a los 3–7 días.
- Search Console → Rendimiento: primeras impresiones de marca y de "architetto Bergamo".

## Bloque F — Imágenes (auditoría `/seo images`, 8 oct 2026) · pendiente

Diagnóstico: lo que se sirve está bien optimizado (WebP de 19–44 KB, `srcset`, dimensiones, lazy bajo el pliegue, `fetchpriority` en el LCP). Los problemas están en los textos alternativos, los nombres de archivo y los originales.

**F1. Alt de las galerías de proyecto** · Alta · `src/components/sections/ProjectDetail.tsx:199`, `content/projects/*/*.mdx`, `messages/*.json`
- Hoy: 176 de 230 imágenes con `alt="<Proyecto> - Immagine N"`, en italiano también en `/es` y `/en` (texto hardcodeado).
- Paso 1 (código): traducir el patrón con `useTranslations` (`ProjectDetail.galleryImageAlt` → "Foto {n}" / "Photo {n}") e incluir tipo de obra y ciudad: "Casa Archi & Colori, Milano — foto 12".
- Paso 2 (contenido, Martina): campo opcional `captions` en el frontmatter (una descripción corta por imagen y por idioma, p. ej. "Soggiorno con parete libreria verde e panca") que se usa como alt; si falta, cae al patrón del paso 1.
- Verificar: 0 alts con "Immagine" en páginas `/es` y `/en`; alt de galería distinto por imagen donde haya caption.

**F2. Vídeo de `/tappeti`** · Media · `public/images/tappeti/tappeti-01.mp4` (13 MB), `src/app/[locale]/tappeti/page.tsx`
- Reencodar a ~720p H.264 (objetivo 1,5–3 MB), añadir `poster` (primer fotograma en WebP) y `preload="metadata"`.
- Verificar: peso del vídeo < 3 MB; Lighthouse móvil de `/tappeti` sin el vídeo en "Avoid enormous network payloads".

**F3. Originales pesados** · Media · `public/images/**` (322 MB, 63 archivos > 2 MB; el mayor 11 MB)
- Redimensionar a máx. 2560 px de ancho, JPEG calidad ~85 (objetivo 300–800 KB por foto). No cambia nada visible: `next/image` ya sirve tamaños reducidos, pero mejora el primer render de cada tamaño (LCP en frío), la cuota de optimización de Vercel y el peso del repo.
- Herramienta: `sips` (macOS) o ImageMagick; conservar los originales fuera del repo.
- Verificar: `find public/images -size +2M` vacío salvo el vídeo; comparación visual de 3–4 fotos antes/después.

**F4. Prioridades de carga** · Media
- `src/components/sections/ProjectCard.tsx:18`: `aboveFold = index < 3` → solo la primera card con `priority` (en móvil solo se ve una).
- `src/components/sections/ProjectsStrip.tsx:73`: quitar `fetchPriority="high"` (y valorar `priority`) del carrusel de la home; compite con el avatar, que es el LCP en móvil.
- `src/components/sections/NewsGallery.tsx:73` y `:172`: quitar `priority` de la galería de páginas del artículo (está bajo el texto).
- Verificar: PSI móvil de `/` con LCP < 2,5 s (mediana de 3); una sola imagen `fetchpriority=high` por página.

**F5. AVIF** · Baja · `next.config.ts`
- `images: { formats: ['image/avif', 'image/webp'] }` → ~20–30 % menos por imagen. Coste: primera transformación más lenta y más cuota de Vercel. Hacer después de F3.

**F6. Nombres de archivo** · Baja · 21 archivos
- `tappeti-0X - copia.jpg` (×3), `Articolo HOME n36 aprile 2026 - cover.jpg`, `Articolo Cose diCasa N.10 ottobre 2022_Pagina_N.jpg` (×5), `.JPG` en mayúsculas (`cucina-parigina-02.JPG`, `intervista-archiboost-0N.JPG`, `cose-di-casa-ottobre-2022-cover.JPG`).
- Renombrar a minúsculas con guiones y descriptivos (`home-n36-aprile-2026-cover.jpg`, `cose-di-casa-ottobre-2022-pagina-1.jpg`…) con `git mv` en dos pasos (macOS no distingue mayúsculas) y actualizar referencias en MDX y código.
- Verificar: `find public/images | grep -E ' |[A-Z]|copia'` vacío; build sin imágenes rotas.

**F7. Imágenes compartidas entre proyectos** · Baja · confirmar con Martina
- La galería de `bagno-italian-summer` usa `restyling-casa-peonia-29…`. Si es la misma casa, renombrar las del baño (`bagno-italian-summer-NN.jpg`) para que Google Images las asocie al proyecto correcto.

**F8. Créditos IPTC** · Baja, opcional
- Inyectar Creator/Credit/Copyright (fotógrafa Marta D'Avenia donde aplique, MP_archistudio en el resto) con `exiftool`. Google Images lo muestra; no es factor de ranking. Hacer junto con F3.

## Bloque G — Internacionalización (auditoría `/seo hreflang`, 8 oct 2026) · pendiente

Diagnóstico: hreflang técnicamente perfecto (63/63 URLs: autorreferencia, retorno, x-default, canonical, `lang`, sitemap = HTML). Paridad de contenido correcta (±15 % de palabras, misma estructura).

**G1. Títulos de proyecto sin traducir** · Media · `content/projects/{es,en}/*.mdx`
- Los 8 proyectos tienen el mismo `title` en los tres idiomas ("Bagno ITALIAN SUMMER", "Cucina PARIGINA", "Appartamento LOVINGCOLORS"). Mantener el nombre propio y traducir el tipo: es "Baño ITALIAN SUMMER", "Cocina PARIGINA", "Piso LOVINGCOLORS"; en "ITALIAN SUMMER bathroom", "PARIGINA kitchen", "LOVINGCOLORS apartment". Lo exige además la regla de CLAUDE.md (`title` se traduce por locale).
- Verificar: ningún `<title>` de proyecto idéntico entre idiomas.

**G2. Redirección automática por idioma del navegador** · Media · `src/i18n/routing.ts`
- Hoy `/` y `/progetti` redirigen (307) a `/es` o `/en` según `Accept-Language`, y la cookie `NEXT_LOCALE` fija el idioma en visitas posteriores. Googlebot (sin cabecera) ve el italiano, así que no bloquea la indexación, pero Google desaconseja redirigir automáticamente: un visitante con navegador en español no puede abrir la versión italiana desde un resultado o un enlace.
- Cambio: `localeDetection: false`. Cada URL muestra siempre su idioma; el visitante cambia con el selector.
- Verificar: `curl -H "Accept-Language: es" https://mparchistudio.com/progetti` → 200 (sin redirect).

**G3. Slugs italianos en news y tappeti para es/en** · Info
- `/en/news/il-colore-nell-architettura`. Aceptable con tan pocas páginas; revisar solo si las noticias pasan a ser contenido estratégico en es/en.

## Orden de ejecución propuesto

| PR | Contenido | Depende de |
|---|---|---|
| PR 1 | A1 (slugs + 301) + B1–B11 (correcciones técnicas) | D1, D6, D7 (B9) |
| PR 2 | A2 + A3 + A4 con el contenido actual de `/servicios` ampliado | D5; precios (D2) si ya están |
| PR 3 | C1–C5 (ola 1 de contenido) | textos/datos de Martina |
| PR 4+ | C6–C15 (olas 2 y 3) | briefs + textos |
| PR imágenes/i18n | F1 (paso 1), F2–F6, G1, G2 | — (F1 paso 2 y F7: Martina) |

D (Martina) en paralelo desde ya; E después de cada PR.

## Verificación de cada PR

- `npx tsc --noEmit` limpio, `npm run build` sin errores ni `MISSING_MESSAGE`, lint sin problemas nuevos.
- Build de producción en local: códigos de estado (incluidas las 301), canonical/hreflang, JSON-LD válido, ningún H1 en `opacity:0`.
- Lighthouse móvil (mediana de 3) en `/`, `/progetti`, un proyecto y un servicio.
- Tras el deploy: `/seo drift compare` y re-auditoría parcial de lo tocado.

## Registro PR 1 (8 oct 2026)

- **A1** `pathnames` en `src/i18n/routing.ts`; helpers `src/lib/routes.ts`; `seo.ts` traduce rutas internas a slugs por idioma; 12 redirects permanentes en `next.config.ts`; mayúsculas → minúsculas en `src/middleware.ts`; `cucina-MITE` → `cucina-mite` (MDX + 17 imágenes); selector de idioma con `params` en rutas dinámicas.
- **B1** `fetchPriority="high"` en el avatar del hero; `placeholder.jpg` → `martina-pozzi.jpg`.
- **B2** `sizes` ajustados en la ficha de proyecto (portada y galería).
- **B3** Assets renombrados: `mparchistudio-logo.png`, `martina-pozzi-ritratto.jpg`, `martina-pozzi-studio.jpg`, `martina-pozzi-archiadvice.jpg`.
- **B4** `ProfessionalService` con `logo`, `image` (retrato), `geo`, horario, `areaServed` (+ Milano, Monza e Brianza, Sevilla), `description` traducida, `url` estable; `Person` con `url` → `/chi-sono`, `image`, `knowsAbout`, `knowsLanguage`; `Article.author`/`publisher` y `CreativeWork.creator` con nombre y logo en línea; breadcrumbs con etiquetas cortas. Pendiente de Martina: `award` (D4), `hasCredential` (D3).
- **B5** `description` en los 6 proyectos que solo tenían eslogan (it/es/en).
- **B6** Ciudad "Milano" en todos los idiomas.
- **B7** Eliminada `AboutPage.intro` ("oltre 10 anni").
- **B8** `llms.txt` con proyectos, prensa, perfiles = `sameAs`, páginas es/en y slugs nuevos.
- **B9** Formulario: ArchiAdvice, Consulenza acquisto, Restyling, Ristrutturazione integrale, Catalogo tappeti, Altro; el email recibe la etiqueta legible.
- **B10** Sitemap sin `priority`/`changefreq`; `lastmod` real (news por fecha, proyectos por campo `updated`).
- **B11** `Content-Security-Policy-Report-Only` (0 violaciones en 6 páginas probadas).
- **A4 (parcial)** Noticias de Cose di Casa y HOME enlazan a su proyecto.

Verificación: `tsc` limpio; build sin errores ni `MISSING_MESSAGE`; lint sin problemas nuevos (16 preexistentes, antes 17); 18 URLs nuevas → 200; 12 URLs antiguas → 308; mayúsculas → 301; 0 enlaces internos a slugs antiguos; sitemap 63 URLs con 42 `lastmod`; selector de idioma correcto en home, servicios, proyecto y noticia.

Dato a confirmar con Martina: `bagno-casa-archi-colori` figura en Bergamo y `casa-archi-colori` en Milano.
