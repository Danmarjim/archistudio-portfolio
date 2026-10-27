# SEO — Estado

Última actualización: 27 oct 2026. **Este es el punto de entrada**: en qué fase estamos, qué está hecho y qué viene ahora. Los códigos (A1, C4, F3…) remiten al detalle de [`planes/fase-2.md`](planes/fase-2.md); los de la fase 3 (A5, B3…), a [`planes/fase-3.md`](planes/fase-3.md).

| Documento | Para qué |
|---|---|
| [`PENDIENTE-MARTINA.md`](PENDIENTE-MARTINA.md) | Todo lo que hay que pedirle a Martina, en una sola lista y sin repeticiones |
| [`planes/`](planes/) | Un plan por fase: [1](planes/fase-1.md) y [2](planes/fase-2.md) cerradas, [3](planes/fase-3.md) en curso, [Martina](planes/fase-martina.md) (visto bueno, datos y día de publicar) |
| [`revisiones/`](revisiones/README.md) | Un documento por rama: qué se hizo y qué validar |
| [`briefs/`](briefs/) | El guion de cada página (estructura, keywords, competidores, meta tags) |
| [`auditorias/`](auditorias/) | Resultados de audits y clusters por fecha, y el [registro de comandos `/seo`](auditorias/REGISTRO-COMANDOS.md) |
| [`CONTEXTO-COWORK.md`](../martina/CONTEXTO-COWORK.md) | Datos del negocio para pegar en Cowork/Claude antes de cualquier tarea de SEO |
| [`FICHA-GOOGLE.md`](../martina/FICHA-GOOGLE.md) | Ficha de Google: estado, categorías y atributos frente a los competidores, mensajes para pedir reseñas |
| [`POST-GOOGLE.md`](../martina/POST-GOOGLE.md) | 8 publicaciones para la ficha de Google (4 semanas), listas para pegar |

**Score:** 49/100 (7 oct, antes de la fase 1) → 80/100 (7 oct, re-auditoría en producción) → **84/100 (10 oct, preview completa de la fase 2, en local)**: [informe](auditorias/2026-10-10-preview/FULL-AUDIT-REPORT.md) y [plan de acción](auditorias/2026-10-10-preview/ACTION-PLAN.md). Después se hicieron los puntos 1–4 del plan de acción (`llms.txt` dinámico, títulos y descripciones, imagen social por servicio): 0 títulos > 60 y 0 descripciones > 160 en las 87 páginas.

---

## ✅ Hecho

| Fecha | Qué | Dónde |
|---|---|---|
| 7 oct | **Fase 1**: dominio real en canonical/hreflang/sitemap (antes `example.com`), sin errores 500, `<html lang>`, metadatos por idioma, JSON-LD, LCP del hero, NAP coherente, cabeceras de seguridad | `main` · [`planes/fase-1`](planes/fase-1.md) |
| 8 oct | Search Console verificado (DNS en Vercel) y API conectada (Search Console, PageSpeed, CrUX); sitemap enviado | — |
| 8 oct | **PR 1** — A1 (slugs en italiano + 301) y B1–B11 (JSON-LD ampliado, LCP, `sizes`, assets renombrados, descripciones de proyecto, `llms.txt`, formulario, sitemap, CSP en observación) | `main` (merge `e104ad3`) |
| 8 oct | **Briefs** de A3 (home), C1 (chi sono), C2, C3, C4, C6 (servicios) y C7–C14 (guías) | [`briefs/`](briefs/) |
| 8 oct | **PR 2** — C-pre (Markdown en noticias, `seoTitle`, `updated`), C5b (prensa de Homeadore), F1 paso 1, F2–F6 (vídeo 13,9 → 2,8 MB; imágenes 322 → 127 MB; AVIF; prioridades; nombres), G1, G2, meta de la home y estructura de A2 | rama `feat/seo-fase-2-pr2` (**sin merge**) |
| 9 oct | Análisis de categorías y atributos de los competidores en Google Maps | [`FICHA-GOOGLE.md`](../martina/FICHA-GOOGLE.md) |
| 9–10 oct | **Páginas de servicio** C2, C3, C4 y C6; **home** (A3), **chi sono** (C1), **enlazado interno** (A4); textos de la ficha de Google | una rama cada una · [`revisiones/`](revisiones/README.md) |
| 10 oct | **Fase 3, bloque A1–A4**: revisión de contenido (74/100) y GEO (76/100); `llms.txt` dinámico; títulos y descripciones; imagen social por servicio; autora visible en los artículos; contraste AA; páginas más ligeras (−15/−24 % de HTML) | una rama cada una |
| 10 oct | **Speed Insights** en producción | `main` (`5243492`) |
| 10 oct | **Guías C7–C14** en it/es/en y enlaces cruzados entre guías, servicios, fichas de proyecto y chi sono (4–10 enlaces entrantes por guía) | una rama cada una |
| 10 oct | **A7, simulacro de merge** sobre una copia de `main`: 0 conflictos (también rama a rama), build, 12 redirecciones, sitemap y enlaces en modo producción. Arreglado un enlace roto en chi sono; C10 no se mergea con marcadores (borraría un artículo publicado). `main` mergeado en la preview | [informe](auditorias/2026-10-10-simulacro-merge/README.md) |
| 10 oct | **A5, A6 y B3**: Lighthouse en las 102 páginas (accesibilidad 100 en todas tras arreglar la galería y el orden de encabezados); agentes de IA 3/3 en Lighthouse Agentic Browsing y el firewall deja pasar a los agentes; intención de búsqueda en Google Italia desde Bergamo: 14 de 15 páginas encajan, restyling reorientado a "restyling casa Bergamo"; `robots.txt` con `Content-Signal: ai-train=no` (no al entrenamiento de modelos) | [Lighthouse](auditorias/2026-10-10-lighthouse/README.md) · [agentes](auditorias/2026-10-10-agentes/README.md) · [intención](auditorias/2026-10-10-intencion/README.md) |
| 12 oct | **D0, reindexación**: 48 de 63 URLs indexadas. Las 4 "duplicadas" del email de Search Console son `/progetti`, `/servizi`, `/contatti` y `/chi-sono`: Google aún prefiere la URL antigua porque no la ha vuelto a rastrear desde el cambio. La web está bien (308, canónicas, `hreflang`); pedida la indexación de las 8 URLs (antiguas y nuevas) y validación iniciada el 12 oct | [informe](auditorias/2026-10-12-indexacion/README.md) |
| 12 oct | **Preview desplegada** (`e6a6cdc`) con todo lo de la fase 3: `robots.txt` con Content-Signal, restyling con Bergamo, galería accesible, encabezados de `/servizi`, enlace de chi sono. La rama antigua `seo/preview-completa` está borrada. URL fija de la rama: `portfolio-mparchistudio-git-pre-8a9f45-danmarjim-3740s-projects.vercel.app` (protegida con login de Vercel) | `vercel.json` |
| 12–15 oct | **D0, reindexación completada**: segunda inspección el 14 oct, con 48 de 63 indexadas (7 más) y las 4 duplicadas aún a la espera de que Google rastree las URLs antiguas. Pedida la indexación de las 15 restantes: las 63 URLs del sitemap están indexadas o solicitadas. Las 21 en italiano ya estaban en el índice | [informe](auditorias/2026-10-14-indexacion/README.md) |
| 15 oct | **D0b, CSP obligatoria**: una semana en observación sin violaciones en producción; con la CSP aplicada, 0 violaciones en las 39 páginas de la preview. La barra de Vercel solo se permite en las previews. **En producción** (cherry-pick a `main`, `dc2b813`): consola limpia en vivo | `main` · [revisión](revisiones/d0b-csp.md) |
| 27 oct | **Aviso de Search Console "Página alternativa con etiqueta canónica adecuada"** (1 URL, detectada el 24 oct): es la home con los parámetros del enlace de la bio de Instagram (`?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=…`). Declara como canónica `https://mparchistudio.com` y Google la respeta. Es lo correcto: no hay nada que arreglar ni validar. Informe de páginas: 78 indexadas; la validación de las duplicadas, superada (0) | — |
| 26 oct | **Rendimiento tras la reindexación**: mismo volumen (~1 clic y ~9 impresiones al día, casi todo de marca), pero 35 páginas con impresiones frente a 20. Sin búsquedas de servicio hasta publicar la PR 2. `www` redirigía con 307 (temporal): **arreglado**, ahora 308, con `www` añadido al proyecto en Vercel | [informe](auditorias/2026-10-26-rendimiento/README.md) |
| 20 oct | **Preview desplegada** (`4057c19`) con la CSP y la barra de Vercel permitida solo ahí. Arreglada la regla de Vercel que salta los despliegues de solo documentación: si el último despliegue correcto de la rama ya no existe (retención), compila en vez de comparar solo con el commit anterior. Antes, un push que acababa en un commit de docs se cancelaba aunque trajera código | `vercel.json` (base) |
| 20 oct | **Control de estado**: 61 de 63 URLs indexadas y las 4 duplicadas resueltas. Backlinks (D3): 40 enlaces de 21 dominios, todos a la home, casi todos Homify; Homeadore cita a Martina sin enlazar. Búsqueda: 15 clics y 106 impresiones en 4 semanas, casi todo de marca. Móvil 97/100/100/100 | [informe](auditorias/2026-10-20-estado/README.md) |
| 10 oct | **B4 y B5**: sección de testimonios lista y oculta (sale sola con 2 testimonios con permiso; home y servicios); 8 publicaciones para la ficha de Google a partir de los proyectos | [`seo/b4-testimonios`](revisiones/b4-testimonios.md) · [`POST-GOOGLE.md`](../martina/POST-GOOGLE.md) |
| 10 oct | Vercel: solo despliega `preview/seo-completa` (antes `seo/preview-completa`); las ramas `seo/*` y la base no crean despliegues (`git.deploymentEnabled`: subir 24 ramas agotó el límite diario); nada cuando solo cambia documentación; retención de deployments activada | `vercel.json` |

<details><summary>Detalle de PR 1</summary>

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

</details>

---

## Fases

| Fase | Estado | Qué queda | Plan |
|---|---|---|---|
| **1** — base técnica | ✅ Cerrada (10 oct) | — | [`fase-1`](planes/fase-1.md) · [estado](planes/fase-1-estado.md) |
| **2** — estructura, servicios y contenido | ✅ Cerrada (10 oct) | — (validación y publicación → fase Martina) | [`fase-2`](planes/fase-2.md) |
| **3** — calidad, preparación y seguimiento | 🔄 En curso: A1–A7, B3–B5, D0, D0b y D3 hechos | Solo el seguimiento (D, por fechas) | [`fase-3`](planes/fase-3.md) |
| **Martina** — visto bueno, datos y publicación | ⏳ Esperando a Martina | Validar ramas, datos, ficha de Google, día de publicar | [`fase-martina`](planes/fase-martina.md) · [lista para ella](PENDIENTE-MARTINA.md) |

Decisiones del 10 oct: B12 (animaciones bajo el pliegue) se mantienen; F8 (créditos IPTC) descartado; G3 (slugs italianos en news para es/en) no se hace.

## Ramas

Cada tarea en su rama con su documento de revisión: [`revisiones/`](revisiones/README.md). `preview/seo-completa` las junta todas y es la única que despliega preview (las ramas `seo/*` y la base no crean despliegues). `main` solo recibe lo que Martina aprueba (excepciones: Speed Insights el 10 oct y la CSP obligatoria el 15 oct). `main` sí se mergea en la preview, para que refleje lo que habrá en producción.

## Próximos pasos

1. ~~**Fase 2**~~: cerrada el 10 oct (guías C8–C14 y enlaces entre guías, servicios y proyectos).
2. **Fase 3:** ~~A7~~ → ~~A5 + A6 + B3~~ → ~~B4~~ → ~~B5~~. Queda el seguimiento por fechas.
3. **Por fecha:** ~~D0 reindexación~~ (12–15 oct); ~~D0b CSP obligatoria~~ (15 oct, en producción); ~~D3 backlinks~~ y tercera inspección (20 oct). Pedida el 20 oct la indexación de las 2 que faltaban (`/en/services` y la entrevista de Archiboost en español). Siguiente: ~8 nov D2, informe mensual.
