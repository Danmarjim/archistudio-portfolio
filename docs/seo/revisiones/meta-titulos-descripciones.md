# Revisión — `seo/meta-titulos-descripciones`

Títulos y meta descriptions que Google recortaría. Hallazgos 2 y 3 del [audit del 10 oct](../archivo/datos/2026-10-10-audit-preview/FULL-AUDIT-REPORT.md): 19 títulos de más de 60 caracteres y 20 descripciones de más de 160.

## Qué se ha hecho

**Títulos** (el código añade " | MP_archistudio"):

| Página | Antes | Ahora |
|---|---|---|
| `/progetti` | Progetti di ristrutturazione e interior design a Bergamo | Progetti di ristrutturazione a Bergamo |
| `/servizi` | Servizi di architettura e ristrutturazione a Bergamo | Servizi di architettura a Bergamo |
| Noticia del color | Il colore nell'architettura: strumento, non decorazione | Il colore nell'architettura d'interni |
| Lanzamiento de ArchiAdvice | Nuovo servizio: ArchiAdvice — la consulenza di 60 minuti | ArchiAdvice: consulenza online di 60 minuti |
| Entrevista de Archiboost | Archiboost Talks: L'Empatia per un Approccio Sartoriale | Intervista a Martina Pozzi su Archiboost |
| Colección Sevilla | È ora disponibile la primissima collezione di tappeti… | Collezione di tappeti Sevilla |

Igual en español e inglés (y en inglés también la noticia de HOME). En las noticias se usa `seoTitle`, así que **el título visible (H1) no cambia**.

**Descripciones** (≤ 155 caracteres):
- Noticias: campo nuevo **`description`** (opcional) solo para la meta description. El resumen visible (`excerpt`) no cambia. Aplicado a 6 noticias en los tres idiomas.
- Proyectos: `cucina-mite` (it/es/en, no tenía descripción) y `casa-archi-colori` (it).
- `/tappeti`: descripción nueva en los tres idiomas.

**Código:** `description?` en `NewsPost` (`src/types/index.ts`), lectura en `src/lib/news.ts`, uso en `generateMetadata` de `/news/[slug]`. Documentado en `CLAUDE.md`.

## Qué validar

**Martina**
- [ ] Los títulos nuevos de las noticias y de `/progetti` y `/servizi`.
- [ ] Las descripciones nuevas (son resúmenes de los textos que ya había).
- [ ] La descripción de la colección Sevilla dice "Feria di Siviglia", "tuftati a mano" y "oltre 720 colori", sacado de la página `/tappeti`.

**Daniel**
- [ ] Verificado en local el 10 oct: `tsc` y build sin errores; en las 69 páginas de la base, 0 títulos > 60 y 0 descripciones > 160.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Independiente del resto.
