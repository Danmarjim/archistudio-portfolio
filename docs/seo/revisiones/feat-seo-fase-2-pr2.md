# Revisión — `feat/seo-fase-2-pr2`

**Base de todas las ramas de SEO.** Hay que mergearla antes que cualquier otra.

## Qué se ha hecho

| Commit | Qué | Archivos principales |
|---|---|---|
| `d7594e8` | Imágenes de 322 a 127 MB, AVIF, una sola imagen prioritaria por página, vídeo de /tappeti de 13,9 a 2,8 MB, alt de galerías con ciudad, tipo de obra traducido en títulos es/en, sin redirección por idioma del navegador, meta de la home ≤ 150 caracteres | `public/images/`, `next.config.ts`, `src/i18n/routing.ts`, `messages/*.json` |
| `c446cc9` | Noticias en Markdown completo (necesario para las guías); dos noticias nuevas sobre Homeadore en it/es/en; campos `seoTitle` y `updated` | `src/components/shared/Markdown.tsx`, `content/news/*/homeadore-*.mdx`, `src/lib/news.ts` |
| `1722869` | Estructura de páginas de servicio (`/servizi/[slug]`) con 4 borradores **sin publicar**; `/servizi` enlaza solo a las publicadas; el formulario de contacto acepta `?tipo=` | `src/app/[locale]/servicios/[slug]/`, `content/services/`, `src/lib/services.ts` |
| `5034ed6` | Marcador `[DA CONFERMARE: …]`: resaltado en previews, bloquea la publicación en producción | `src/lib/pending.ts`, `src/lib/services.ts`, `Markdown.tsx` |
| (este commit) | Enlaces seguros entre servicios: un enlace Markdown a `/servicios/<slug>` no publicado apunta al hub `/servizi` (páginas de servicio y noticias) | `src/lib/services.ts`, `src/lib/news.ts` |
| varios `docs:` | Reorganización de `docs/seo/`, 14 briefs, `CONTEXTO.md`, `FICHA-GOOGLE.md` | `docs/` |

## Cómo verlo

Preview de Vercel de la rama `feat/seo-fase-2-pr2`, o `npm run dev` en local.

## Qué validar

**Martina**
- [ ] Noticias de Homeadore: `/news/homeadore-lovingcolors-giugno-2026` y `/news/homeadore-casa-archi-colori-agosto-2026` (texto, fotos y enlaces), en los tres idiomas.
- [ ] Títulos de proyecto en español e inglés (Baño, Cocina, Piso… / Bathroom, Kitchen, Apartment…).

**Daniel**
- [ ] Home, `/progetti`, una ficha de proyecto y `/tappeti`: imágenes nítidas y sin saltos al cargar; el vídeo de /tappeti se reproduce.
- [ ] `/servizi` sigue igual (las páginas de servicio no se enlazan mientras no estén publicadas).
- [ ] `/es` y `/en` no redirigen según el idioma del navegador.
- [ ] `npm run build` sin errores.

## Cómo mergear

PR `feat/seo-fase-2-pr2` → `main`. Tras el deploy: `/seo drift compare https://mparchistudio.com/` y PageSpeed móvil.
