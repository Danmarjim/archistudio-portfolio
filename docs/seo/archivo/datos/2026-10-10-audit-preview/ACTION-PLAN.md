# Plan de acción — audit de la preview (10 oct 2026)

Detalle en [`FULL-AUDIT-REPORT.md`](FULL-AUDIT-REPORT.md). Ordenado por impacto. Lo marcado con 🟢 se puede hacer ya, sin Martina.

## Fase 1 — Alta (esta semana)

| # | Tarea | Sin Martina | Esfuerzo |
|---|---|---|---|
| 1 | ✅ (`seo/llms-dinamico`) `llms.txt` generado desde el contenido: solo servicios y noticias publicados, en los tres idiomas | 🟢 | 1 h |
| 2 | ✅ (`seo/meta-titulos-descripciones`) Títulos ≤ 60 caracteres: hubs `/servizi` y `/progetti` (it/es/en) y `seoTitle` en 4 noticias (colore, ArchiAdvice, Archiboost, alfombras Sevilla) | 🟢 | 30 min |
| 3 | ✅ (`seo/meta-titulos-descripciones`) Descripciones ≤ 160 caracteres en ~20 páginas (proyectos, `/tappeti`, noticias de prensa); en noticias, campo `description` aparte del `excerpt` | 🟢 | 1 h |

## Fase 2 — Media (próximas 2 semanas)

| # | Tarea | Sin Martina | Esfuerzo |
|---|---|---|---|
| 4 | ✅ (`seo/og-servicios`) Imagen social propia por servicio (portada del primer proyecto relacionado) y por guía | 🟢 | 30 min |
| 5 | Pasar al cliente solo los textos que usan sus componentes (`NextIntlClientProvider`) | 🟢 | 1–2 h |
| 6 | Revisar el LCP de servicios y guías con datos reales de Speed Insights (ya en producción) | 🟢 | tras 1–2 semanas de datos |
| 7 | Contraste de `text-neutral-400` en la página de noticia | 🟢 | 15 min |
| 8 | Ampliar la noticia de la colección Sevilla y la de Archiboost | Martina (datos) | — |

## Fase 3 — Contenido y autoridad (mes 2)

| # | Tarea | Sin Martina |
|---|---|---|
| 9 | Completar los marcadores `[DA CONFERMARE]` y publicar servicios y guías | Martina |
| 10 | Testimonios en home y servicios; reseñas en la ficha de Google | Martina |
| 11 | Ficha de Google: categorías, atributos, descripción, servicios | Martina |
| 12 | Guías C12 (cómo elegir arquitecto) y C8 (conformidad antes de comprar) | 🟢 borrador |

## Fase 4 — Seguimiento

- Tras cada merge a `main`: `/seo drift compare https://mparchistudio.com/` y PageSpeed móvil.
- Search Console: indexación de las páginas nuevas e impresiones por búsqueda a las 2–4 semanas de publicarlas.
- Speed Insights: LCP e INP reales en móvil por página.
- Repetir este audit sobre producción cuando estén publicados los servicios.

## Baja

- Tipo de obra traducido en los títulos de Casa Archi & Colori y Restyling CASA PEONIA.
