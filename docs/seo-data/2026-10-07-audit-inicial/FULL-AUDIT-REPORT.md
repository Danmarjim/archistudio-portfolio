# Auditoría SEO completa — mparchistudio.com

Fecha: 2026-10-07 · Alcance: home + ~60 URLs (it/es/en) · Datos: laboratorio (Lighthouse 13.5, Playwright, WebSearch). Sin GSC/CrUX/Moz.

## SEO Health Score: 49/100

| Categoría | Peso | Score |
|---|---|---|
| Technical SEO | 22% | 38 |
| Content Quality | 23% | 52 |
| On-Page SEO | 20% | 55 |
| Schema | 10% | 8 |
| Performance (CWV) | 10% | 90 |
| AI Search Readiness | 10% | 42 |
| Images | 5% | 68 |

Scores auxiliares: Local SEO 24, SXO 47, Agent-UX 100, Backlinks: datos insuficientes (dominio aún no en Common Crawl).

Tipo de negocio: servicio profesional local híbrido (arquitecta independiente, Bergamo + Sevilla).

## Causa raíz principal

`src/lib/constants.ts:7` → `url: 'https://example.com'`, consumido por `metadataBase`, canonical, hreflang, `og:url`, sitemap y robots. Además el canonical se define una sola vez en `src/app/[locale]/layout.tsx:68-75` y ninguna página lo sobrescribe, así que todas las URLs se canonicalizan a la home de su locale en example.com. Efecto observado: la búsqueda de marca no devuelve el sitio.

## Top 5 críticos
1. Canonical/hreflang/og:url/sitemap/robots → example.com (sitewide).
2. Todas las páginas canonicalizan a la home del locale; `/it` canonical redirige (307).
3. HTTP 500 en cualquier ruta con punto no existente (`/favicon.ico`, `/llms.txt`, `/index.md`) y en `/proyectos/cucina-mite`. Falta `src/app/not-found.tsx` raíz; favicon mal nombrado `favicon.ico.ico`.
4. Sitemap: 13/39 URLs redirigen, faltan news (21 URLs), `/tappeti`, sin hreflang.
5. Formulario `/contacto` desbordado en móvil (inputs cortados a 375 px).

## Top 5 quick wins
1. Cambiar una línea en `constants.ts` (5 min).
2. `<html lang={locale}>` vía `getLocale()` en `src/app/layout.tsx`.
3. Quitar sufijo de marca duplicado en 48/60 títulos.
4. `priority` en primeras cards de `/proyectos` (LCP 4.2 s → objetivo < 2.5 s).
5. Añadir web en Archilovers y Linktree.

## Detalle por categoría
Ver `findings/`: technical.md, content.md, schema.md (con JSON-LD listo), sitemap.md (con `sitemap.ts` corregido), performance.md, visual.md, geo.md, agentic.md, local.md, sxo.md, backlinks.md. Capturas en `screenshots/`.

## Pendiente de confirmar con la clienta
- Dirección pública: "Via Bologna 2" (contacto/privacy) vs "Via Bologna" sin número (footer). ¿Publicar número?
- Colegiación: ¿Ordine di Bergamo o di Monza e Brianza? Número.
- Años de experiencia: 10+ o 15+.
- Mercado de Sevilla: ¿se quiere posicionar activamente?
- ¿Existe ficha de Google Business Profile?

## Correcciones a los informes de subagentes
- `placeholder.jpg` NO es una imagen de stock: es una foto real de Martina; solo hay que renombrarla.
- La URL no viene de una variable de entorno de Vercel: está hardcodeada en `constants.ts`.

Plan priorizado: ACTION-PLAN.md
