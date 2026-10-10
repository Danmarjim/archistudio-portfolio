# Plan SEO — fase 3 (mientras Martina valida)

10 oct 2026. Objetivo: subir del **84/100** del [audit de la preview](archivo/datos/2026-10-10-audit-preview/FULL-AUDIT-REPORT.md) a **~90** y llegar al día del visto bueno con todo listo para publicar e indexar. Cada tarea va en su rama `seo/*`, con su documento de revisión, y se junta en `seo/preview-completa`. `main` no se toca hasta que Martina valide.

## 0. Preparar la skill (una vez)

✅ Hecho el 10 oct (usando el Python 3.12 de `uv`: `CLAUDE_SEO_PYTHON=~/.local/bin/python3.12`). `/seo setup` → entorno Python ≥ 3.10 y Chromium aislados. El Mac tiene Python 3.9 y los scripts de la skill no arrancan. `/seo doctor` para comprobarlo. Sin esto, PageSpeed/CrUX, capturas, Lighthouse multipágina y las APIs de Google no funcionan desde la skill.

## A. Calidad y técnica (sin Martina) — de 84 a ~88

| # | Tarea | Comando | Categoría del audit | Esfuerzo |
|---|---|---|---|---|
| A1 | ✅ [hecho](archivo/datos/2026-10-10-audit-preview/findings/content.md): **Revisión de contenido de los textos nuevos** (4 servicios, 2 guías, home, chi sono): E-E-A-T, legibilidad y **limpieza de frases típicas de IA**, antes de que los lea Martina | `/seo content <url>` por página | Contenido (23 %) | 1–2 h |
| A2 | ✅ [hecho](archivo/datos/2026-10-10-audit-preview/findings/GEO-ANALYSIS.md) (76/100): **Citabilidad en buscadores con IA** (AI Overviews, ChatGPT, Perplexity): pasajes que se entienden solos, datos con fuente, entidad clara | `/seo geo <url>` en guías y servicios | Preparación IA (10 %) | 1 h |
| A3 | ✅ (`seo/mensajes-cliente`, −15/−24 % de HTML) **Páginas más ligeras:** cada página envía solo los textos que usan sus componentes de cliente | — (código) | Rendimiento (10 %) | 1–2 h |
| A4 | ✅ (`seo/contraste`, 2,42 → 4,54:1) **Contraste** del gris de fechas y etiquetas en noticias | — (código) | Accesibilidad | 15 min |
| A5 | **Lighthouse en todas las páginas**, no solo en 3 | `/seo unlighthouse` sobre la build local | Rendimiento, accesibilidad | 30 min |
| A6 | **Agentes de IA:** que un agente navegue y entienda la web (árbol de accesibilidad, `llms.txt`, robots) | `/seo agentic <url>` | Preparación IA | 30 min |
| A7 | **Simulacro de merge** de todas las ramas en una copia de `main`: conflictos (`package.json`, `messages`), build y redirecciones | — | Seguridad del día del merge | 30 min |

## B. Contenido que no depende de ella

| # | Tarea | Comando | Por qué |
|---|---|---|---|
| B1 | **Guía C12**, "Come scegliere un architetto a Bergamo" (brief listo) | `/seo content-brief` ya hecho → redactar | La lee quien está a punto de contratar; enlaza a los 4 servicios |
| B2 | **Guías C9 (bagno) y C13 (cucina)** con sus 5 proyectos reales (briefs listos) | ídem | Búsquedas locales concretas y su especialidad |
| B3 | **Comprobar la intención de búsqueda** de las páginas objetivo: ¿Google quiere una página de servicio, una guía o un listado para cada keyword? | `/seo sxo <url>` | Evita escribir el tipo de página equivocado |
| B4 | **Sección de testimonios** lista y oculta: aparece sola cuando haya 2–3 | — | Señal de confianza en home y servicios |
| B5 | **4 semanas de publicaciones** para la ficha de Google, a partir de los proyectos | — | Actividad en la ficha = mejor posición en el mapa |

## C. El día de publicar (tras el visto bueno)

| # | Tarea | Comando |
|---|---|---|
| C1 | **Foto de producción antes del merge**, para comparar después | `/seo drift baseline https://mparchistudio.com/` |
| C2 | Merge a `main` (base → ramas aprobadas) y deploy | — |
| C3 | Comparar después del merge: títulos, canonical, hreflang, schema | `/seo drift compare https://mparchistudio.com/` |
| C4 | Reenviar `sitemap.xml` y pedir indexación de los 4 servicios, la home y las guías | `/seo google` (Search Console) |
| C5 | **Bing Webmaster + IndexNow**: Bing indexa en horas y alimenta ChatGPT Search y Copilot | `/seo bing` |
| C6 | Audit sobre producción (con PageSpeed y CrUX reales) | `/seo audit https://mparchistudio.com/` |

## D. Local y seguimiento

| # | Tarea | Comando | Cuándo |
|---|---|---|---|
| D1 | **SEO local completo**: ficha de Google, coherencia de nombre, dirección y teléfono en directorios, reseñas | `/seo local https://mparchistudio.com/` | Cuando Martina actualice la ficha |
| D2 | Informe mensual: Search Console, Speed Insights, ficha | `/seo google` (informe) | Cada mes |
| D3 | Backlinks y menciones | `/seo backlinks` | Con la API de Moz (pendiente, gratuita) |

## Orden recomendado

0 → A1 + A2 (textos mejores antes de que Martina los revise) → A4 → A3 → A7 → B1 → B2 → resto. C cuando Martina dé el visto bueno; D después.

**Comandos que no aportan aquí:** `ecommerce`, `programmatic`, `competitor-pages`, `cluster` (ya hecho el 8 oct), `hreflang` (sin errores en el audit), `seranking`/`profound` (de pago, para cuando haya tráfico).
