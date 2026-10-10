# Revisión — `seo/geo-autoria`

Autora visible en los artículos propios (guías, reflexiones, anuncios). Parte de A2 del [plan de la fase 3](../planes/fase-3.md): para que Google y los buscadores con IA citen un contenido, cuenta quién lo firma, y las guías solo mostraban la fecha.

## Qué se ha hecho

- Bajo la entradilla de cada noticia **sin `source`** (es decir, escrita por Martina, no de prensa): "Di **Martina Pozzi**, architetta a Bergamo", con enlace a `/chi-sono`.
- Si el artículo tiene `updated` distinto de la fecha de publicación: "· Aggiornato il …".
- Las noticias de prensa (HOME, Cose di Casa, Archiboost, Homeadore) no cambian: su autor es la publicación.
- Textos en `messages/*.json` (`NewsPage.byline`, `NewsPage.updatedOn`) en it/es/en.

**Archivos:** `src/app/[locale]/news/[slug]/page.tsx`, `messages/*.json`.

## Qué validar

**Martina**
- [ ] El texto de la firma ("Di Martina Pozzi, architetta a Bergamo").

**Daniel**
- [ ] Verificado en local el 10 oct: build y `tsc` sin errores.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Independiente del resto.
