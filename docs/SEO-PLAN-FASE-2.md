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

**A3. Home como página pilar** · `src/app/[locale]/page.tsx`, `Hero.tsx`, `messages/*.json`
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
- C1. Señales E-E-A-T en `/chi-sono`: colegiación (D3), premio (D4), una cifra de experiencia, foto, email de dominio (D8).
- C2. Texto de ArchiAdvice con precio (D2). **Brief:** `docs/seo-briefs/C2-consulenza-architetto-online.md`.
- C3. Texto de consulenza acquisto casa (qué se revisa: agibilità, catasto, conformità; precio D2).
- C4. Texto de ristrutturazione appartamento Bergamo (proceso, plazos, casos reales en Bergamo; las tablas de precio van en C7, no aquí). **Brief:** `docs/seo-briefs/C4-ristrutturazione-appartamento-bergamo.md`.
- C5. Testimonios (Spazi Belli 5,0★ / 7 reseñas) en home y servicios.

**Ola 2:**
- C6. `/servizi/restyling-casa` (texto).
- C7. `/news/quanto-costa-un-architetto-ristrutturazione` (honorarios; comparte SERP con "parcella architetto").
- C8. `/news/conformita-urbanistica-catastale-prima-di-comprare-casa`.
- C9. `/news/progettare-il-bagno-consigli-architetto`, a partir de los 3 proyectos de baño.
- C10. Ampliar `/news/il-colore-nell-architettura` (hoy 185 palabras).

**Ola 3:**
- C11. `/news/costo-ristrutturazione-appartamento-bergamo`.
- C12. `/news/come-scegliere-architetto-ristrutturazione`.
- C13. `/news/progettare-la-cucina-consigli-architetto`.
- C14. `/news/come-scegliere-colore-pareti-casa`.
- C15. Proyectos más ricos (encargo, soluciones, materiales, plazos, rango de presupuesto, cita del cliente) y autor visible en las noticias.

Fuera de alcance (decidido en el cluster): páginas por ciudad (Milano, Monza), páginas propias de reforma de baño/cocina "Bergamo" (son secciones de C4), FAQPage, HowTo.

## Bloque D — Fuera de la web (Martina)

- D-1. **Google Business Profile**: categoría *Architetto*, nombre `MP_archistudio`, web, teléfono, dirección o zona de servicio, fotos, horario. Es lo único que la saca en el mapa. Cuando exista: enlace en `sameAs` y botón "Recensioni / Come arrivare" en contacto.
- D-2. Pedir reseñas en Google (primero a los clientes de Spazi Belli).
- D-3. Nombre comercial idéntico en Houzz, Homify, Spazi Belli, Archilovers.
- D-4. Web en Archilovers y en Linktree; alta en PagineGialle.

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
