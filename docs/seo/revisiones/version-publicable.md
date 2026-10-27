# Revisión — `seo/version-publicable`

Versión de la PR 2 que se puede publicar **sin esperar los datos de Martina** (decisión del 27 oct): todo lo de `preview/seo-completa`, con los `[DA CONFERMARE]` resueltos sin inventar datos. Martina lee los textos después de publicar y sus datos se añaden en actualizaciones.

## Qué se ha hecho (`247a844`)

Marcadores quitados en it/es/en de los 4 servicios, 6 guías (costes de obra, cuánto cuesta un arquitecto, elegir arquitecto, baño, cocina, colores de las paredes) y el artículo del color. Criterios:

| Dato pendiente | Qué se ha hecho |
|---|---|
| Precios, honorarios, si la visita es gratis, reembolsos, anticipos | Fuera. En su lugar: "te lo indico en un presupuesto por escrito antes de empezar" (obligatorio por ley para los arquitectos). ArchiAdvice mantiene sus 100 € confirmados, y se dice que se descuentan del proyecto (confirmado el 10 oct) |
| Plazos propios | Rangos genéricos ("alcune settimane / alcuni mesi") y cronograma tras el rilievo. Accesso agli atti: hasta 30 días por ley |
| Tablas y ejemplos con cifras propias (LOVINGCOLORS, partidas, peso de cada fase) | Fuera. Se quedan los rangos de mercado con fuentes |
| Casos, anécdotas, "cómo era antes", frases de clientes, códigos de color | Fuera |
| Preguntas sin respuesta (presencia en la visita, ArchiAdvice en persona, primer encuentro gratis) | FAQ quitadas |
| Número de colegiada | Sin número: "iscritta all'Ordine degli Architetti di Monza e Brianza" |
| Ciudad del baño de CASA ARCHI & COLORI | No se afirma ninguna; la tabla deja solo el año |

**Fuera de esta versión:** la guía de conformidad urbanística y catastral (C8). Conserva sus marcadores, así que en producción no se publica sola. Los 4 enlaces que apuntaban a ella (asesoría de compra, reforma, guía de costes) se han quitado o redirigido a la asesoría de compra. **Cuando Martina la valide, hay que volver a ponerlos.**

**No se ha tocado:** "Studio con base a Bergamo e Siviglia" en chi sono y Sevilla en los datos estructurados ya están así en producción, con textos originales de Martina.

## Verificación (27 oct)

Simulacro de merge con `main` (script de [A7](../auditorias/2026-10-10-simulacro-merge/simulacro.sh), apuntado a esta rama), build en modo producción:
- 0 conflictos con `main`; build sin errores ni `MISSING_MESSAGE`.
- 12 redirecciones antiguas → 308/301 → 200.
- Sitemap: **99 URLs** (hoy 63), todas 200; las 63 de producción siguen respondiendo.
- Publicadas: 4 servicios, 6 guías, 2 noticias de Homeadore y el artículo del color actualizado. La guía de conformidad no sale: ni en el sitemap ni en ningún enlace.
- 0 marcadores visibles; 102 enlaces internos, todos 200.

## Salida a producción y rollback

1. Anotar el despliegue de producción actual (hoy `portfolio-mparchistudio-197iyhcsz…`, commit `dc2b813`).
2. `git switch main && git merge --no-ff seo/version-publicable && git push`.
3. Comprobar en vivo: sitemap, 4 servicios, 2 guías, home, redirecciones, consola.
4. Enviar el sitemap en Search Console y pedir la indexación de los 4 servicios y la home.

**Si algo sale mal:**
- **Inmediato (segundos, sin build):** Vercel → Deployments → el despliegue del punto 1 → *Instant Rollback*. O por CLI: `vercel rollback <url-del-despliegue-anterior>`.
- **En el código:** `git revert -m 1 <commit del merge>` en `main` y push. Así `main` vuelve a coincidir con lo que se sirve.

## Qué validar

**Martina, después de publicar** (en vez de las 47 preguntas): leer en italiano los 4 servicios, las 6 guías y chi sono, con atención a las afirmaciones técnicas y legales que lista [`PENDIENTE-MARTINA.md`](../PENDIENTE-MARTINA.md) §4. Sus datos (precios, plazos, casos, número de colegiada) se añaden después, cada uno con su `updated`.
