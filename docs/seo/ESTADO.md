# SEO — Estado

Última actualización: 10 oct 2026. **Este es el punto de entrada**: qué está hecho, qué está en curso y qué queda. El detalle de cada tarea (archivos, cómo verificar) está en [`PLAN.md`](PLAN.md); los códigos (A1, C4, F3…) remiten a ese documento.

| Documento | Para qué |
|---|---|
| [`CONTEXTO.md`](CONTEXTO.md) | Datos del negocio para pegar en Cowork/Claude antes de cualquier tarea de SEO, y qué prompts usar |
| [`PLAN.md`](PLAN.md) | Detalle de cada tarea, decisiones y benchmark frente a la competencia |
| [`FICHA-GOOGLE.md`](FICHA-GOOGLE.md) | Ficha de Google: estado actual, categorías y atributos frente a los competidores, mensajes para pedir reseñas |
| [`DATOS-MARTINA.md`](DATOS-MARTINA.md) | Todo lo que hay que pedirle a Martina, en una sola lista |
| [`REGISTRO-COMANDOS.md`](REGISTRO-COMANDOS.md) | Comandos `/seo` ya ejecutados y cuándo merece la pena repetirlos |
| [`briefs/`](briefs/) | Un brief por página: estructura, keywords, competidores, meta tags |
| [`archivo/`](archivo/) | Fase 1 (audit inicial en italiano, plan y estado) y resultados brutos de audits y clusters |

**Ramas:** cada tarea en su rama, con un documento de revisión en [`revisiones/`](revisiones/); `seo/preview-completa` las junta todas.

**Score:** 49/100 (7 oct, antes de la fase 1) → 80/100 (7 oct, re-auditoría en producción).

---

## ✅ Hecho

| Fecha | Qué | Dónde |
|---|---|---|
| 7 oct | **Fase 1**: dominio real en canonical/hreflang/sitemap (antes `example.com`), sin errores 500, `<html lang>`, metadatos por idioma, JSON-LD, LCP del hero, NAP coherente, cabeceras de seguridad | `main` · [`archivo/fase-1/`](archivo/fase-1/) |
| 8 oct | Search Console verificado (DNS en Vercel) y API conectada (Search Console, PageSpeed, CrUX); sitemap enviado | — |
| 8 oct | **PR 1** — A1 (slugs en italiano + 301) y B1–B11 (JSON-LD ampliado, LCP, `sizes`, assets renombrados, descripciones de proyecto, `llms.txt`, formulario, sitemap, CSP en observación) | `main` (merge `e104ad3`) |
| 8 oct | **Briefs** de A3 (home), C1 (chi sono), C2, C3, C4, C6 (servicios) y C7–C14 (guías) | [`briefs/`](briefs/) |
| 9 oct | Análisis de categorías y atributos de los competidores en Google Maps (prompts 1 y 2 de `CONTEXTO.md`) | [`FICHA-GOOGLE.md`](FICHA-GOOGLE.md) |
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

## 🔄 En curso

| Qué | Estado | Siguiente paso |
|---|---|---|
| **PR 2** sin merge | Desplegado en preview de Vercel | Revisar (sobre todo las dos noticias de Homeadore) y hacer merge |
| **Reindexación de las URLs nuevas** (`/servizi`, `/progetti`…) | Sitemap reenviado el 8 oct; Google aún elige `/servicios` como canónica de `/servizi` | Comprobar por API hacia el 11 oct (`/seo google inspect-batch`) |
| **CSP** en modo `Report-Only` | 0 violaciones en local | Tras ~1 semana en producción sin violaciones, pasar a `Content-Security-Policy` (B11) |
| **A2 — páginas de servicio** | C4 (reforma Bergamo, 7 datos pendientes) y C2 (ArchiAdvice, 5 pendientes; precio 100 € ya puesto) C3 (compra de vivienda, 10 pendientes) y C6 (restyling, 7 pendientes) redactadas en it/es/en, cada una en su rama, con los datos pendientes como `[DA CONFERMARE]` | Martina valida y completa los datos: lista única en [`revisiones/PARA-MARTINA.md`](revisiones/PARA-MARTINA.md) |
| **Ficha de Google: textos** | Descripción y 5 servicios redactados (`FICHA-GOOGLE.md` §6) | Martina los valida y aplica la checklist de §6 |
| **F1 — alt de las galerías** | Paso 1 hecho (patrón traducido con ciudad) | Paso 2: descripciones por foto (Martina) |

---

## ⏳ Pendiente

### Código, sin datos de Martina
- [ ] `vercel.json` con *Ignored Build Step* para no desplegar cambios que solo tocan `docs/` o `.md` (ahorra almacenamiento en Vercel).
- [x] **A3 — home** (rama `seo/a3-home`): H1 con oficio y ciudad, "Chi sono" concreto, servicios con resumen y enlace, Come lavoro, proyectos destacados, Dove lavoro, teléfono. Falta de Martina: validar el H1 (D5), testimonios y colegiación.
- [ ] **C1 — chi sono** (parcial): prensa, proyectos, perfiles, H1 con nombre. Falta de Martina: colegiación y texto del premio.
- [x] **A4 — enlazado interno** (rama `seo/a4-enlazado-interno`): proyecto → servicio, prensa y ArchiAdvice → servicio, servicios entre sí; enlaces a servicios sin publicar apuntan al hub. La home enlaza a los servicios desde A3.
- [ ] Borradores de las guías **C12** y **C8** para que Martina las revise (C8 requiere revisión normativa).
- [ ] **B12** — decidir si se quitan las animaciones `opacity:0` bajo el pliegue (propuesta: mantener).
- [ ] **F8** — créditos IPTC en las fotos (opcional).

### Martina — datos
**Lista única y priorizada en [`revisiones/PARA-MARTINA.md`](revisiones/PARA-MARTINA.md).** Detalle por brief en [`DATOS-MARTINA.md`](DATOS-MARTINA.md). Los 8 que desbloquean más: colegiación, premio Piranesi, precios, testimonios, fotos del antes, email/horarios/Google Business Profile, H1 de la home, ubicación del baño de Casa Archi & Colori.

### Martina — contenido
- [ ] Textos de las páginas de servicio: C2 ArchiAdvice, C3 compra de vivienda, C4 reforma en Bergamo, C6 restyling.
- [ ] Guías C7–C14 (con su brief cada una).
- [ ] C15 — proyectos más completos (encargo, materiales, plazos, presupuesto, cita del cliente).
- [ ] F7 — confirmar las fotos de `bagno-italian-summer` que se llaman `restyling-casa-peonia-*`.

### Martina — fuera de la web
- [ ] **D-1 Google Business Profile**: la ficha ya existe, pero solo con categoría Studio di architettura, 0 reseñas, sin atributos y con horario 9–17 (el real es 9–18, como en la web). Confirmar que Martina tiene acceso y aplicar los cambios de [`FICHA-GOOGLE.md`](FICHA-GOOGLE.md) §3.
- [ ] D-2 reseñas en Google; D-3 mismo nombre comercial en todos los perfiles; D-4 web en Archilovers y Linktree, alta en PagineGialle, Archisio, Edilportale y Divisare.

### Tú
- [ ] Vercel: borrar deployments antiguos y activar *Deployment Retention*.
- [ ] Volúmenes de búsqueda de las keywords del plan (Planificador de palabras clave de Google Ads).
- [ ] API key gratuita de Moz (para `/seo backlinks` con datos reales).

### Seguimiento (bloque E)
- [ ] ~11 oct: inspección de URLs y primeras consultas en Search Console.
- [ ] Tras cada deploy: `/seo drift compare https://mparchistudio.com/` y PageSpeed móvil.
- [ ] Tras publicar páginas nuevas: solicitar indexación y repetir el benchmark (`PLAN.md`).
