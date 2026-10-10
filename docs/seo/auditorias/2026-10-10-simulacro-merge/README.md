# Simulacro de merge (A7) — 10 oct 2026

Qué pasaría el día del visto bueno al mergear a `main` la base `feat/seo-fase-2-pr2` y las 22 ramas `seo/*`. Hecho en un worktree aparte: no se tocó `main` ni se subió nada. Se repite con [`simulacro.sh`](simulacro.sh) (unos 3 minutos).

## Resultado

| Comprobación | Resultado |
|---|---|
| Conflictos `main` + `seo/preview-completa` | ✅ Ninguno (`package.json`, `package-lock.json`, `messages/*.json` y `layout.tsx` se mezclan solos) |
| Cada rama sola sobre `main` + base | ✅ 22/22 sin conflictos: Martina puede aprobar solo una parte |
| Todas, rama a rama | ✅ Mismo árbol que `seo/preview-completa`: no hay resoluciones manuales escondidas en la integración |
| Cambios de `main` que no estaban en la preview | Contraste del botón y de la sección CTA, `dl` de la ficha de proyecto, selector de idioma (`b42add8`) y Speed Insights (`5243492`). Se aplican sin choques con `seo/contraste`, que toca otros archivos. **Mergeados en la preview** para que refleje lo que habrá en producción |
| `tsc` / lint / build | ✅ Sin errores; lint con los mismos 15 avisos preexistentes; build sin `MISSING_MESSAGE` |
| 12 redirecciones antiguas | ✅ 308 al slug nuevo, destino en 200 |
| Mayúsculas | ✅ 301 a minúsculas |
| Sitemap (modo preview / modo producción) | ✅ 102 / 66 URLs, todas en 200 |
| `[DA CONFERMARE]` visibles en producción | ✅ 0 |
| `llms.txt` | ✅ Todos los enlaces en 200 |
| Enlaces internos (modo producción) | ✅ 69 destinos en 200, tras el arreglo de abajo |
| **URLs que hoy están en producción** (63) | ⚠️ 60 en 200; **`/news/il-colore-nell-architettura` (it/es/en) da 404** |

"Modo producción" = build con `VERCEL_ENV=production`: las páginas con `[DA CONFERMARE]` no se publican. Es lo que verá `main`.

## Hallazgos

1. **Arreglado — enlace roto en chi sono.** La bio enlazaba al artículo del color con una ruta fija. En producción, mientras el artículo tenga marcadores, daba 404. Ahora va a `/news` si no está publicado, como el enlace a ArchiAdvice (`seo/c1-chi-sono`, `e08ad3a`).
2. **Regla de merge — C10.** `seo/c10-colore-architettura` amplía un artículo que **ya está publicado e indexado** y le añade 3 `[DA CONFERMARE]`. Si se mergea antes de que Martina responda, el artículo desaparece de la web (404 en las tres lenguas). Ya estaba anotado en su [revisión](../../revisiones/c10-colore-architettura.md); ahora también en el día de publicar de la [fase Martina](../../planes/fase-martina.md) (P0 y P2). Las demás páginas con marcadores son nuevas: si no se publican, no se pierde nada.

## El día del merge

Repetir el simulacro justo antes (P0 de la [fase Martina](../../planes/fase-martina.md)), con las ramas ya actualizadas con los datos de Martina. Debe salir: sin conflictos, las 63 URLs de producción en 200 y 0 enlaces rotos.
