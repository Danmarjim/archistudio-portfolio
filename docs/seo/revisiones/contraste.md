# Revisión — `seo/contraste`

Contraste del texto gris claro (A4 del [plan de la fase 3](../planes/fase-3.md), hallazgo 7 del audit). El gris `text-neutral-400` (`#a3a3a3`) da **2,42:1** sobre el fondo de la web (`#fafaf9`); WCAG AA pide 4,5:1 para texto pequeño. Lighthouse lo marcaba en la página de noticia.

## Qué se ha hecho

`text-neutral-400` → `text-neutral-500` (`#737373`, **4,54:1** sobre el fondo, 4,74:1 sobre blanco) en:

| Dónde | Texto |
|---|---|
| Noticia (`/news/[slug]`) | Fecha y etiquetas "Precedente / Successivo" |
| Tarjeta de noticia (`NewsCard`) | Fecha |
| Tarjeta de proyecto (`ProjectCard`) | Año |

La fecha de la línea temporal de chi sono se cambia en `seo/c1-chi-sono`, donde está esa página reorganizada.

No se toca el mensaje de error de `ImageWithLoader` (solo aparece si falla una imagen).

## Qué validar

**Daniel**
- [ ] Las fechas siguen viéndose discretas, pero legibles.
- [ ] Lighthouse: el aviso de contraste desaparece en la página de noticia.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Complementa el arreglo de accesibilidad que ya está en `main` (`b42add8`: botones, selector de idioma, ficha de proyecto).
