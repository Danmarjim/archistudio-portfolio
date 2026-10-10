# SEO — Estado

Última actualización: 10 oct 2026. **Este es el punto de entrada**: qué está hecho, qué está en curso y qué queda. El detalle de cada tarea (archivos, cómo verificar) está en [`planes/fase-2.md`](planes/fase-2.md); los códigos (A1, C4, F3…) remiten a ese documento.

| Documento | Para qué |
|---|---|
| [`planes/fase-3.md`](planes/fase-3.md) | Plan mientras Martina valida: calidad, contenido, día de publicar y seguimiento, con los comandos `/seo` de cada paso |
| [`CONTEXTO-COWORK.md`](../martina/CONTEXTO-COWORK.md) | Datos del negocio para pegar en Cowork/Claude antes de cualquier tarea de SEO, y qué prompts usar |
| [`planes/fase-2.md`](planes/fase-2.md) | Detalle de cada tarea, decisiones y benchmark frente a la competencia |
| [`FICHA-GOOGLE.md`](../martina/FICHA-GOOGLE.md) | Ficha de Google: estado actual, categorías y atributos frente a los competidores, mensajes para pedir reseñas |
| [`PENDIENTE-MARTINA.md`](PENDIENTE-MARTINA.md) | Todo lo que hay que pedirle a Martina, en una sola lista |
| [`auditorias/REGISTRO-COMANDOS.md`](auditorias/REGISTRO-COMANDOS.md) | Comandos `/seo` ya ejecutados y cuándo merece la pena repetirlos |
| [`briefs/`](briefs/) | Un brief por página: estructura, keywords, competidores, meta tags |
| [`auditorias/`](auditorias/) | Resultados de los audits y clusters por fecha (7 oct inicial y producción, 8 oct cluster, 10 oct preview) |

**Ramas:** cada tarea en su rama, con un documento de revisión en [`revisiones/`](revisiones/); `seo/preview-completa` las junta todas.

**Score:** 49/100 (7 oct, antes de la fase 1) → 80/100 (7 oct, re-auditoría en producción) → **84/100 (10 oct, preview completa de la fase 2, en local)**: [informe](auditorias/2026-10-10-preview/FULL-AUDIT-REPORT.md) y [plan de acción](auditorias/2026-10-10-preview/ACTION-PLAN.md). Hechos los puntos 1–4 (`llms.txt` dinámico, títulos y descripciones, imagen social por servicio): 0 títulos > 60 y 0 descripciones > 160 en las 87 páginas.

---

## ✅ Hecho

| Fecha | Qué | Dónde |
|---|---|---|
| 7 oct | **Fase 1**: dominio real en canonical/hreflang/sitemap (antes `example.com`), sin errores 500, `<html lang>`, metadatos por idioma, JSON-LD, LCP del hero, NAP coherente, cabeceras de seguridad | `main` · [`planes/fase-1`](planes/fase-1.md) |
| 8 oct | Search Console verificado (DNS en Vercel) y API conectada (Search Console, PageSpeed, CrUX); sitemap enviado | — |
| 8 oct | **PR 1** — A1 (slugs en italiano + 301) y B1–B11 (JSON-LD ampliado, LCP, `sizes`, assets renombrados, descripciones de proyecto, `llms.txt`, formulario, sitemap, CSP en observación) | `main` (merge `e104ad3`) |
| 8 oct | **Briefs** de A3 (home), C1 (chi sono), C2, C3, C4, C6 (servicios) y C7–C14 (guías) | [`briefs/`](briefs/) |
| 9 oct | Análisis de categorías y atributos de los competidores en Google Maps (prompts 1 y 2 de `CONTEXTO-COWORK.md`) | [`FICHA-GOOGLE.md`](../martina/FICHA-GOOGLE.md) |
| 8 oct | **PR 2** — C-pre (Markdown en noticias, `seoTitle`, `updated`), C5b (prensa de Homeadore), F1 paso 1, F2–F6 (vídeo 13,9 → 2,8 MB; imágenes 322 → 127 MB; AVIF; prioridades; nombres), G1, G2, meta de la home y estructura de A2 | rama `feat/seo-fase-2-pr2` (**sin merge**) |

<details><summary>Detalle de PR 1</summary>

- **A1** `pathnames` en `src/i18n/routing.ts`; helpers `src/lib/routes.ts`; `seo.ts` traduce rutas internas a slugs por idioma; 12 redirects permanentes en `next.config.ts`; mayúsculas → minúsculas en `src/middleware.ts`; `cucina-MITE` → `cucina-mite` (MDX + 17 imágenes); selector de idioma con `params` en rutas dinámicas.
- **B1** `fetchPriority="high"` en el avatar del hero; `placeholder.jpg` → `martina-pozzi.jpg`.
- **B2** `sizes` ajustados en la ficha de proyecto (portada y galería).
- **B3** Assets renombrados: `mparchistudio-logo.png`, `martina-pozzi-ritratto.jpg`, `martina-pozzi-studio.jpg`, `martina-pozzi-archiadvice.jpg`.
- **B4** `ProfessionalService` con `logo`, `image` (retrato), `geo`, horario, `areaServed` (+ Milano, Monza e Brianza, Sevilla), `description` traducida, `url` estable; `Person` con `url` → `/chi-sono`, `image`, `knowsAbout`, `knowsLanguage`; `Article.author`/`publisher` y `CreativeWork.creator` con nombre y logo en línea; breadcrumbs con etiquetas cortas. Pendiente de Martina: `award` (D4), `hasCredential` (D3).
- **B5** `description` en los 6 proyectos que solo tenían eslogan (it/es/en).
- **B6** Ciudad "Milano" en todos los idiomas.
- **B7** Eliminada `AboutPage.intro` ("oltre 10 anni").
- **B8** `llms.txt` con proyectos, prensa, perfiles = `sameAs`, páginas es/en y slugs nuevos.
- **B9** Formulario: ArchiAdvice, Consulenza acquisto, Restyling, Ristrutturazione integrale, Catalogo tappeti, Altro; el email recibe la etiqueta legible.
- **B10** Sitemap sin `priority`/`changefreq`; `lastmod` real (news por fecha, proyectos por campo `updated`).
- **B11** `Content-Security-Policy-Report-Only` (0 violaciones en 6 páginas probadas).
- **A4 (parcial)** Noticias de Cose di Casa y HOME enlazan a su proyecto.

Verificación: `tsc` limpio; build sin errores ni `MISSING_MESSAGE`; lint sin problemas nuevos (16 preexistentes, antes 17); 18 URLs nuevas → 200; 12 URLs antiguas → 308; mayúsculas → 301; 0 enlaces internos a slugs antiguos; sitemap 63 URLs con 42 `lastmod`; selector de idioma correcto en home, servicios, proyecto y noticia.

Dato a confirmar con Martina: `bagno-casa-archi-colori` figura en Bergamo y `casa-archi-colori` en Milano.

</details>

---

## Fases

| Fase | Estado | Qué queda | Plan |
|---|---|---|---|
| **1** — base técnica | ✅ Cerrada (10 oct) | — | [`fase-1`](planes/fase-1.md) · [estado](planes/fase-1-estado.md) |
| **2** — estructura, servicios y contenido | ✅ Cerrada (10 oct) | — (validación y publicación → fase Martina) | [`fase-2`](planes/fase-2.md) |
| **3** — calidad, preparación y seguimiento | 🔄 Siguiente (A1–A4 ya hechos) | A5–A7, B3–B5 y el seguimiento | [`fase-3`](planes/fase-3.md) |
| **Martina** — visto bueno, datos y publicación | ⏳ Esperando a Martina | Validar ramas, datos, ficha de Google, día de publicar | [`fase-martina`](planes/fase-martina.md) · [lista para ella](PENDIENTE-MARTINA.md) |

Decisiones del 10 oct: B12 (animaciones bajo el pliegue) se mantienen; F8 (créditos IPTC) descartado; G3 (slugs italianos en news para es/en) no se hace.

## Ramas

Cada tarea en su rama con su documento de revisión: [`revisiones/`](revisiones/README.md). `seo/preview-completa` las junta todas y es la única que despliega preview. `main` solo recibe lo que Martina aprueba (excepción: Speed Insights, mergeado el 10 oct).

## Próximos pasos

1. ~~**Fase 2**~~: cerrada el 10 oct (guías C8–C14 y enlaces entre guías, servicios y proyectos).
2. **Fase 3:** A7 (simulacro de merge) → A5 + A6 + B3 → B4 → B5.
3. **Por fecha:** ~11 oct inspección de la reindexación; ~15 oct CSP obligatoria.
