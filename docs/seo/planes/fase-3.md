# Plan SEO — fase 3 (mientras Martina valida)

> **10 oct:** lo que depende de Martina (el día de publicar y el SEO local) pasa a la [fase Martina](fase-martina.md); las guías C12, C9 y C13 vuelven a la [fase 2](fase-2.md), donde estaban. Aquí queda solo trabajo nuestro. Se empieza cuando se cierre la fase 2.

10 oct 2026. Objetivo: subir del **84/100** del [audit de la preview](../auditorias/2026-10-10-preview/FULL-AUDIT-REPORT.md) a **~90** y llegar al día del visto bueno con todo listo para publicar e indexar. Cada tarea va en su rama `seo/*`, con su documento de revisión, y se junta en `seo/preview-completa`. `main` no se toca hasta que Martina valide.

## 0. Preparar la skill (una vez)

✅ Hecho el 10 oct (usando el Python 3.12 de `uv`: `CLAUDE_SEO_PYTHON=~/.local/bin/python3.12`). `/seo setup` → entorno Python ≥ 3.10 y Chromium aislados. El Mac tiene Python 3.9 y los scripts de la skill no arrancan. `/seo doctor` para comprobarlo. Sin esto, PageSpeed/CrUX, capturas, Lighthouse multipágina y las APIs de Google no funcionan desde la skill.

## A. Calidad y técnica (sin Martina) — de 84 a ~88

| # | Tarea | Comando | Categoría del audit | Esfuerzo |
|---|---|---|---|---|
| A1 | ✅ [hecho](../auditorias/2026-10-10-preview/findings/content.md): **Revisión de contenido de los textos nuevos** (4 servicios, 2 guías, home, chi sono): E-E-A-T, legibilidad y **limpieza de frases típicas de IA**, antes de que los lea Martina | `/seo content <url>` por página | Contenido (23 %) | 1–2 h |
| A2 | ✅ [hecho](../auditorias/2026-10-10-preview/findings/GEO-ANALYSIS.md) (76/100): **Citabilidad en buscadores con IA** (AI Overviews, ChatGPT, Perplexity): pasajes que se entienden solos, datos con fuente, entidad clara | `/seo geo <url>` en guías y servicios | Preparación IA (10 %) | 1 h |
| A3 | ✅ (`seo/mensajes-cliente`, −15/−24 % de HTML) **Páginas más ligeras:** cada página envía solo los textos que usan sus componentes de cliente | — (código) | Rendimiento (10 %) | 1–2 h |
| A4 | ✅ (`seo/contraste`, 2,42 → 4,54:1) **Contraste** del gris de fechas y etiquetas en noticias | — (código) | Accesibilidad | 15 min |
| A5 | ✅ [hecho](../auditorias/2026-10-10-lighthouse/README.md) (`seo/a5-lighthouse`): accesibilidad 100 en las 102 páginas, CLS 0, SEO 100. **Lighthouse en todas las páginas**, no solo en 3 | `/seo unlighthouse` sobre la build local | Rendimiento, accesibilidad | 30 min |
| A6 | ✅ [hecho](../auditorias/2026-10-10-agentes/README.md): Agentic Browsing 3/3, 0 P0 que fallen; `Content-Signal: ai-train=no` (`seo/a6-content-signal`). **Agentes de IA:** que un agente navegue y entienda la web (árbol de accesibilidad, `llms.txt`, robots) | `/seo agentic <url>` | Preparación IA | 30 min |
| A7 | ✅ [hecho](../auditorias/2026-10-10-simulacro-merge/README.md): **Simulacro de merge** de todas las ramas en una copia de `main`: conflictos (`package.json`, `messages`), build y redirecciones. Sin conflictos; arreglado un enlace roto en chi sono; C10 no se mergea con marcadores | [`simulacro.sh`](../auditorias/2026-10-10-simulacro-merge/simulacro.sh) | Seguridad del día del merge | 30 min |

## B. Preparación sin Martina

| # | Tarea | Comando | Por qué |
|---|---|---|---|
| ~~B1~~ | Guía C12 → [fase 2](fase-2.md) | — | — |
| ~~B2~~ | Guías C9 y C13 → [fase 2](fase-2.md) | — | — |
| B3 | ✅ [hecho](../auditorias/2026-10-10-intencion/README.md): 14 de 15 alineadas; restyling reorientado a Bergamo. **Comprobar la intención de búsqueda** de las páginas objetivo: ¿Google quiere una página de servicio, una guía o un listado para cada keyword? | `/seo sxo <url>` | Evita escribir el tipo de página equivocado |
| B4 | ✅ [hecho](../revisiones/b4-testimonios.md) (`seo/b4-testimonios`): **Sección de testimonios** lista y oculta: aparece sola cuando haya 2–3 | — | Señal de confianza en home y servicios |
| B5 | ✅ [hecho](../../martina/POST-GOOGLE.md): 8 publicaciones (2 por semana) con foto, texto y botón. **4 semanas de publicaciones** para la ficha de Google, a partir de los proyectos | — | Actividad en la ficha = mejor posición en el mapa |

## C. El día de publicar

→ Movido a la [fase Martina](fase-martina.md) §4 (depende de su visto bueno).

## D. Seguimiento (sin Martina)

| # | Tarea | Comando | Cuándo |
|---|---|---|---|
| D0 | ✅ [12 oct](../auditorias/2026-10-12-indexacion/README.md) · [14 oct](../auditorias/2026-10-14-indexacion/README.md) (63 de 63 indexadas o solicitadas): 48 de 63 indexadas; 4 duplicadas (`/progetti`, `/servizi`, `/contatti`, `/chi-sono`: Google aún prefiere la URL antigua, rastreada antes de la redirección). Solicitudes de indexación en Search Console; repetir hacia el 19 oct | `/seo google inspect-batch` | ~11 oct → 19 oct |
| D0b | ✅ [15 oct](../revisiones/d0b-csp.md) (`seo/d0b-csp`): 0 violaciones en una semana en producción y en las 39 páginas de la preview con la CSP aplicada. **CSP**: pasar de `Report-Only` a `Content-Security-Policy` si no hay violaciones (B11) | — (código) | ~15 oct, tras una semana en producción |
| D1 | SEO local → [fase Martina](fase-martina.md) §5 | — | — |
| D2 | Informe mensual: Search Console, Speed Insights, ficha | `/seo google` (informe) | Cada mes |
| D3 | Backlinks y menciones: informe **Enlaces** de Search Console (sitios que más enlazan, páginas más enlazadas, textos de enlace), leído desde Chrome. Sin Moz (decisión del 12 oct). El 12 oct el informe aún decía "Se están procesando los datos" (propiedad verificada el 8 oct) | Search Console → Enlaces | Hacia el 19 oct, con la inspección de D0 |
| D4 | Volúmenes de búsqueda de las keywords del plan | Planificador de Google Ads (Daniel) | Cuando se pueda |
| D5 | Tras cada deploy: `/seo drift compare` y PageSpeed móvil | `/seo drift compare https://mparchistudio.com/` | Cada deploy |

## Orden recomendado

~~Cerrar la fase 2~~ → ~~A7~~ → ~~A5 + A6 + B3~~ → ~~B4~~ → ~~B5~~. D según su fecha.

**Comandos que no aportan aquí:** `ecommerce`, `programmatic`, `competitor-pages`, `cluster` (ya hecho el 8 oct), `hreflang` (sin errores en el audit), `seranking`/`profound` (de pago, para cuando haya tráfico).
