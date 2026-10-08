# Registro de comandos SEO ejecutados

Antes de lanzar un comando del plugin `claude-seo`, mirar aquí si ya está hecho. Los resultados completos están en `docs/seo/archivo/datos/` y `docs/seo/briefs/`; no hace falta repetirlos salvo en los casos de la última columna.

| Fecha | Comando | Alcance | Resultado / dónde está | Cuándo repetirlo |
|---|---|---|---|---|
| 7 oct | `/seo setup` | Entorno Python 3.12 + Chromium del plugin | Instalado (`CLAUDE_SEO_PYTHON` en `~/.zshrc`) | Solo si `/seo doctor` falla |
| 7 oct | `/seo audit https://mparchistudio.com` | Auditoría completa, 11 subagentes (técnico, contenido, schema, sitemap, rendimiento, visual, GEO, agentes, local, SXO, backlinks) | Score 49/100. `docs/seo/archivo/fase-1/SEO-AUDIT-REPORT.md` (IT) y `docs/seo/archivo/datos/2026-10-07-audit-inicial/` | — (superado por la re-auditoría) |
| 7 oct | `/seo audit` (re-auditoría tras fase 1) | Los mismos 10 subagentes, comparando hallazgo por hallazgo (sin backlinks: nada cambió fuera de la web) | Score 80/100. `docs/seo/archivo/datos/2026-10-07-reaudit-produccion/` | Tras publicar las páginas de A2/C, o cada 2–3 meses |
| 7 oct | `/seo drift baseline https://mparchistudio.com/` | Foto de la home (title, meta, canonical, schema, OG…) | Guardada en la base local del plugin | Nunca; tras cada deploy usar `/seo drift compare` |
| 8 oct | `/seo google setup` + `inspect-batch`, `sitemaps`, `gsc`, `crux`, `pagespeed` | API de Search Console, PageSpeed y CrUX (nivel 1) | Credenciales en `~/.config/claude-seo/`. Indexación correcta; 0 impresiones; sin datos CrUX (poco tráfico) | `inspect`/`gsc` cuando haga falta: son consultas, no análisis |
| 8 oct | `/seo cluster architetto Bergamo` | 52 keywords, 46 SERP, 4 clusters, 14 páginas | `docs/seo/archivo/datos/2026-10-08-cluster-architetto-bergamo/` (plan, JSON y mapa HTML) | Solo con datos de volumen (Keyword Planner/DataForSEO) o tras 6–12 meses |
| 8 oct | `/seo hreflang https://mparchistudio.com` | 63 URLs × hreflang, canonical, `lang`, paridad de contenido | 0 errores técnicos; 2 mejoras → bloque G | Si cambian idiomas o rutas |
| 8 oct | `/seo images https://mparchistudio.com` | 11 páginas, 230 imágenes + 176 archivos del repo | 8 mejoras → bloque F | Tras aplicar el bloque F |
| 8 oct | `/seo content-brief consulenza architetto online` | 5 competidores, estructura, meta tags | `docs/seo/briefs/C2-consulenza-architetto-online.md` | No; el brief vale hasta que se escriba la página |
| 8 oct | `/seo content-brief ristrutturazione appartamento Bergamo` | 5 competidores, estructura, meta tags | `docs/seo/briefs/C4-ristrutturazione-appartamento-bergamo.md` | No |
| 8 oct | `/seo content-brief consulenza acquisto casa` | 5 competidores, precios de mercado, estructura, meta tags | `docs/seo/briefs/C3-consulenza-acquisto-casa.md` | No |
| 8 oct | `/seo content-brief restyling casa` | 5 competidores, precios de mercado, estructura, meta tags | `docs/seo/briefs/C6-restyling-casa.md` | No |
| 8 oct | `/seo drift compare https://mparchistudio.com/` | Home frente a la foto del 7 oct (14 reglas) | Sin regresiones; solo cambios intencionados (JSON-LD ampliado, HTML del hero) | Tras cada deploy |
| 8 oct | `/seo content-brief https://mparchistudio.com/` (modo mejora) | Home como pilar "architetto Bergamo": qué conservar, qué añadir, 3 competidores + directorios | `docs/seo/briefs/A3-home.md` | No |
| 8 oct | `/seo content-brief https://mparchistudio.com/chi-sono` (modo mejora) | Página de marca: qué ve Google con su nombre, credenciales, prensa | `docs/seo/briefs/C1-chi-sono.md` | No |
| 8 oct | `/seo content-brief quanto costa un architetto per ristrutturare casa` | 5 competidores, cifras de mercado, estructura | `docs/seo/briefs/C7-quanto-costa-un-architetto.md` | No |
| 8 oct | `/seo content-brief conformità urbanistica e catastale` | 5 competidores, estructura, requisitos normativos | `docs/seo/briefs/C8-conformita-urbanistica-catastale.md` | No (revisar la guía publicada cada 6–12 meses) |
| 8 oct | `/seo content-brief progettazione bagno architetto` | 5 competidores, medidas de referencia, estructura | `docs/seo/briefs/C9-progettare-il-bagno.md` | No |
| 8 oct | `/seo content-brief colore nell'architettura d'interni` (modo mejora) | Artículo existente de 143 palabras frente a 5 competidores | `docs/seo/briefs/C10-colore-architettura.md` | No |
| 8 oct | `/seo content-brief costo ristrutturazione appartamento Bergamo` | 5 competidores, cifras de mercado 2026, estructura | `docs/seo/briefs/C11-costo-ristrutturazione-bergamo.md` | No (actualizar cifras de la guía cada año) |
| 8 oct | `/seo content-brief come scegliere un architetto per ristrutturare casa` | 5 competidores, estructura | `docs/seo/briefs/C12-come-scegliere-architetto.md` | No |
| 8 oct | `/seo content-brief progettazione cucina architetto` | 5 competidores, medidas de referencia, estructura | `docs/seo/briefs/C13-progettare-la-cucina.md` | No |
| 8 oct | `/seo content-brief colori pareti casa consigli architetto` | 5 competidores, criterios, estructura | `docs/seo/briefs/C14-colori-pareti-casa.md` | No |
| 8 oct | Benchmark manual (misma rúbrica que los briefs) | Nuestras páginas frente a los competidores de C2 y C4 | Sección "Benchmark" de este documento | Tras publicar C2/C4 |

**No hace falta lanzar por separado** lo que ya cubre `/seo audit`: `/seo technical`, `/seo content`, `/seo schema`, `/seo sitemap`, `/seo geo`, `/seo agentic`, `/seo local`, `/seo sxo` y `/seo backlinks` son exactamente los subagentes de la auditoría. Tiene sentido lanzarlos sueltos solo para revisar un área concreta después de cambiarla.

**Pendientes, no ejecutados todavía:** ningún brief de contenido (C1–C14 y A3 hechos); brief del hub `/servizi` (A2) cuando se aborde; `/seo backlinks` con API key de Moz (sin ella da lo mismo que el 7 oct).
