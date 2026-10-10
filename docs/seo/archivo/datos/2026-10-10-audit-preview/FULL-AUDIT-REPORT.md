# Audit SEO — preview completa (10 oct 2026)

**Qué se ha auditado:** build local de la rama `seo/preview-completa` (commit `8ef47c1`): todas las ramas de la fase 2 juntas. Producción (`main`) no tiene todavía estos cambios.
**Cómo:** las 87 URLs del sitemap en local (`next start`), Lighthouse móvil en 3 páginas clave y revisión manual. Ejecutado en línea con la skill `claude-seo:seo-audit`, sin subagentes.
**Límites:** sin datos de campo (CrUX, Search Console, PageSpeed sobre la URL pública) porque la preview está protegida; las cifras de rendimiento son de laboratorio. Los marcadores `[DA CONFERMARE]` son intencionados y no penalizan.

## Puntuación: 84/100

| Categoría | Peso | Nota | Comentario |
|---|---|---|---|
| Técnico | 22 % | 92 | 87/87 URLs con 200, canonical correcta, 4 hreflang (it/es/en/x-default), sitemap con `lastmod` real, robots correcto, cabeceras de seguridad |
| Contenido | 23 % | 78 | 4 páginas de servicio y 2 guías nuevas, home y chi sono reforzadas; faltan los datos de Martina (marcadores), testimonios y reseñas |
| On-page | 20 % | 80 | 1 H1 por página y enlazado interno bueno; 19 títulos y 20 descripciones demasiado largos |
| Datos estructurados | 10 % | 92 | Grafo completo sin errores: `ProfessionalService`, `Person` (con `hasCredential` y `memberOf`), `Service` + `Offer`, `Article`, `BreadcrumbList` |
| Rendimiento (laboratorio) | 10 % | 85 | Home 100 · servicio 94 · guía 88; CLS 0 y TBT 0 en las tres |
| Preparación para IA | 10 % | 78 | `llms.txt` no incluye las páginas nuevas; buenos pasajes citables (respuesta directa en la primera frase de las guías) |
| Imágenes | 5 % | 88 | Todas con `alt`, AVIF, una sola imagen prioritaria; misma imagen social en todas las páginas nuevas |

**Referencia:** 80/100 el 7 oct en producción (re-audit tras la fase 1). La comparación es orientativa: el audit anterior se hizo sobre producción con otro método. Con los datos de Martina (marcadores, testimonios, ficha de Google) el contenido subiría a ~88 y el total a ~87.

## Lo que funciona

- **Técnica limpia:** 87 URLs indexables, sin noindex, canonical autorreferente, hreflang completo con `x-default`, sitemap de 87 URLs (antes 63) con `lastmod` de frontmatter.
- **Arquitectura:** home → 4 servicios → proyectos y guías, y vuelta. La página de reforma tiene 17 enlaces internos en el contenido; los proyectos enlazan a su servicio.
- **E-E-A-T:** chi sono con nombre en el H1, formación, colegiación y prensa enlazada; bios de autora en cada servicio; `Person` con credenciales.
- **Datos estructurados:** sin errores en ninguna página; `Offer` con precio en ArchiAdvice.
- **Rendimiento:** CLS 0 y TBT 0; la home a 100 con LCP 1,7 s (el retrato).
- **Protección:** ninguna página con `[DA CONFERMARE]` se publica en producción.

## Hallazgos

### Alta
1. **`llms.txt` sin las páginas nuevas.** No lista los 4 servicios ni las 2 guías. Es estático: si se añaden a mano, apuntaría a páginas aún no publicadas. Solución: generarlo desde el contenido (solo lo publicado).
2. **Títulos demasiado largos (19 páginas, > 60 caracteres con la marca).** Google los recortará:
   - Hubs: `/servizi` 69, `/progetti` 73 (y sus versiones es/en, 63–67).
   - Noticias sin `seoTitle`: "Il colore nell'architettura" 72, lanzamiento de ArchiAdvice 73, entrevista de Archiboost 72, colección de alfombras Sevilla 102.
3. **Descripciones demasiado largas (20 páginas, > 160 caracteres).** Proyectos (`cucina-mite` 191, `casa-archi-colori` 168), `/tappeti` 168 y la mayoría de noticias de prensa (164–196), porque usan el `excerpt`.

### Media
4. **Misma imagen social (`og:image`) en todas las páginas de servicio y guías** (`casa-archi-colori-01.jpg`). Mejor la portada del primer proyecto relacionado de cada servicio y la portada de cada guía.
5. **LCP de laboratorio alto en servicio (3,1 s) y guía (4,0 s).**
   - Servicio: el LCP es un párrafo de texto con 2,7 s de *render delay*.
   - Guía: la portada vertical tarda 3,3 s en cargar.
   - Todas las páginas envían al navegador los textos de toda la web (`NextIntlClientProvider` con todos los mensajes; ~30 KB gzip de HTML). Pasar solo los textos que usan los componentes de cliente aligera cada página.
   - Confirmar con datos reales de Speed Insights (ya en producción) antes de optimizar más.
6. **Contenido escaso:** noticia de la colección Sevilla (62 palabras) y entrevista de Archiboost (~136).
7. **Contraste insuficiente** en textos `text-neutral-400` de la página de noticia (fecha, etiquetas). El arreglo de accesibilidad de `main` (`b42add8`) cubre botones, selector de idioma y ficha de proyecto, pero no este gris.

### Baja
8. **Títulos iguales en varios idiomas** para Casa Archi & Colori y Restyling CASA PEONIA (nombre propio + ciudad). Añadir el tipo de obra traducido, como en el resto de proyectos (G1).
9. **Errores de consola en local:** el script de Vercel Analytics no existe fuera de Vercel. No ocurre en producción.

### Ya resuelto en `main` (llega al mergear)
- Contraste de botones y CTA, nombre accesible del selector de idioma y lista de detalles del proyecto (`b42add8`).
- Speed Insights para tener datos reales de Core Web Vitals (`5243492`).

### Depende de Martina
- 38 marcadores `[DA CONFERMARE]` por idioma entre servicios y guías (ver `docs/seo/revisiones/PARA-MARTINA.md`).
- Testimonios (home, servicios), número de colegiada, premio Piranesi.
- Ficha de Google: categorías, atributos, reseñas (el mayor impacto en búsquedas locales, fuera de la web).

## Datos de Lighthouse (móvil, laboratorio)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 100 | 96 | 96 | 100 | 1,7 s | 0 | 0 ms |
| `/servizi/ristrutturazione-appartamento-bergamo` | 94 | 100 | 96 | 100 | 3,1 s | 0 | 0 ms |
| `/news/costo-ristrutturazione-appartamento-bergamo` | 88 | 96 | 96 | 100 | 4,0 s | 0 | 0 ms |
