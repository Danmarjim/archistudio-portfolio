# Revisión — `seo/a5-lighthouse`

Arreglos de accesibilidad que salieron al pasar Lighthouse por las 102 páginas (A5 del [plan de la fase 3](../planes/fase-3.md)). Informe completo: [Lighthouse en todas las páginas](../auditorias/2026-10-10-lighthouse/README.md).

## Qué se ha hecho

| Dónde | Problema | Cambio |
|---|---|---|
| Galería de las noticias (`NewsGallery`) | Flechas, cierre y puntos sin nombre para lectores de pantalla y agentes; "Ingrandisci" fijo en italiano en los tres idiomas | Nombres traducidos (`NewsPage.galleryZoom`, `galleryPrevious`, `galleryNext`, `galleryClose`, `galleryGoTo`), iconos ocultos al lector y la imagen activa marcada |
| `/progetti`, `/news` | Del `h1` se saltaba al `h3` de cada tarjeta | Las tarjetas aceptan `headingLevel`: `h2` en los listados, `h3` (como antes) en la home y en las páginas de servicio |
| `/servizi` | El nombre de cada servicio era `h3` justo después del `h1` | Pasa a `h2`, con el mismo estilo |

Sin cambios visuales.

**Archivos:** `src/components/sections/{NewsGallery,NewsCard,ProjectCard,NewsGrid,ProjectsGrid}.tsx`, `src/app/[locale]/servicios/ServiciosContent.tsx`, `messages/*.json` (`NewsPage`).

**Resultado:** accesibilidad 100 en las 102 páginas (antes, 30 por debajo, mín. 94).

## Qué validar

**Daniel**
- [ ] Galería de una noticia con varias imágenes (p. ej. `/news/cose-di-casa-ottobre-2022`): flechas, ampliar, cerrar y puntos funcionan igual; en `/es` y `/en` el botón dice "Ampliar" / "Enlarge".
- [ ] `/progetti`, `/news` y `/servizi` se ven igual que antes.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Independiente de las demás ramas: añade claves en `NewsPage` en una posición que no toca ninguna otra rama.
