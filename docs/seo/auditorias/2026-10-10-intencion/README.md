# Intención de búsqueda (B3) — 10 oct 2026

¿Qué tipo de página quiere Google para cada keyword del [cluster](../2026-10-08-cluster/cluster-plan.md)? Si es una página de servicio, una guía o un listado, y si la nuestra encaja. Método de `/seo sxo` (pasos 2 y 3: SERP hacia atrás y desajuste de tipo de página).

**Fuente:** Google Italia (`google.it`, `hl=it`, `gl=it`, sin personalizar) **localizado en Bergamo** (parámetro `uule`), desde Chrome, 15 búsquedas, primera página completa: resultados, mapa, "Le persone hanno chiesto anche", anuncios y búsquedas relacionadas. La búsqueda web del plugin sale de EE. UU. sin localizar y para las keywords locales devolvía ruido (arquitectos históricos, anuncios inmobiliarios), así que no se usó.

## Resultado

| Keyword | Nuestra página | Qué muestra Google | Veredicto |
|---|---|---|---|
| architetto bergamo | Home | Mapa (3 estudios) + directorios (Edilportale, Houzz, AddLance, Divisare) + homes de estudios. Anuncio de ProntoPro | ✅ Alineada. La palanca es la **ficha de Google** (mapa arriba del todo) |
| architetto d'interni bergamo | `/servizi` | 4 anuncios, mapa de **tiendas de muebles y "Designer d'interni"**, Houzz, páginas de interiorismo de tiendas y estudios, Pagine Gialle | ✅ Alineada (hub de servicios). Confirma la categoría secundaria "Designer d'interni" de la [ficha](../../../martina/FICHA-GOOGLE.md) |
| ristrutturazione appartamento bergamo | C4 | 4 anuncios de empresas, landings de **empresas "chiavi in mano"** (el primero da el precio en el snippet: 800–1.300 €/m²), directorios, Comune | ✅ Alineada. Compite con empresas, no con arquitectos: el método y el caso real son la diferencia. Las 4 preguntas de PAA son de coste → C11 |
| **restyling casa** | C6 | **Informativa**: ideas (Living Corriere, Houzz "restyling o relooking", blogs), vídeos de YouTube, Pinterest. Solo 2 anuncios | ⚠️ **Desajuste**: una página de servicio no entra en esta SERP |
| restyling casa bergamo | C6 | Local y comercial: mapa de tiendas e interioristas, páginas de interiorismo; **ya sale `mparchistudio.com/proyectos`** | ✅ Esta es la keyword alcanzable → **C6 reorientada** (abajo) |
| consulenza architetto online | C2 | **Páginas de servicio** de arquitectos con precio (Architettiamo 100/200/300 €, Restylit desde 249 €) | ✅ Alineada, con precio visible como la competencia (100 €) |
| consulenza architetto acquisto casa | C3 | **Páginas de servicio** con precio (97 €/197 €, 220 € + 4 %, 250 €) y artículos de arquitectos | ✅ Alineada. **Precio visible = norma de la SERP**: dato para Martina (C3 lo tiene pendiente) |
| conformità urbanistica e catastale | C8 | Guías técnicas (Ingenio, ACCA, abogados, portales de visuras) | ✅ Alineada (guía). Competencia de mucha autoridad; las 4 PAA (quién la emite, el notario, coste, cuándo es obligatoria) |
| quanto costa un architetto per ristrutturare casa | C7 | Guías de estudios con cifras (€/m², % de obra, CILA/SCIA) | ✅ Alineada |
| costo ristrutturazione appartamento bergamo | C11 | Guías locales con **tablas €/m² por nivel** (Edilnet, Atrio ×2, Pentaedilizia) | ✅ Alineada; C11 ya tiene tabla |
| come scegliere un architetto per ristrutturare casa | C12 | Blogs de arquitectos, vídeos cortos, foro, Houzz | ✅ Alineada. PAA "architetto o geometra": C12 lo trata |
| progettazione bagno architetto | C9 | Guías de arquitectos + página de servicio con precio ("da 725 €") + vídeos | ✅ Alineada (guía); enlaza al servicio de reforma |
| progettazione cucina architetto | C13 | Guías de revistas (AD, La Cucina Italiana) y de arquitectos | ✅ Alineada |
| colore nell'architettura d'interni | C10 | Explicaciones (psicología del color, 60-30-10), vídeos, imágenes | ✅ Alineada; C10 ya cubre la regla de los tres colores |
| colori pareti casa consigli architetto | C14 | Guías de revistas (AD, ELLE Decor) y de arquitectos, vídeos | ✅ Alineada |
| martina pozzi architetto | Chi sono | **Marca propia**: home 1.ª, Spazi Belli, Instagram, LinkedIn, Pinterest, Facebook, ProntoPro, chi sono, Archilovers | ✅ Controlada. Google aún muestra `/sobre-mi` (reindexación, D0) |

**14 de 15 alineadas.** La arquitectura del cluster era correcta: servicios donde Google quiere servicios y guías donde quiere guías.

## Cambios hechos

1. **C6 restyling** (`seo/c6-restyling`, `89e6b06`): "Bergamo" en title, H1 y descripción en it/es/en (`seoTitle` "Restyling casa a Bergamo con un'architetta") y una frase que distingue restyling y relooking, que es la primera pregunta de PAA. "restyling casa" a secas queda cubierta por las guías del color, que enlazan al servicio.

## Para Martina y la ficha de Google

- **Precio de la consulenza acquisto casa:** la competencia lo publica (97–250 €). Sin precio, la página se queda por debajo de la norma de la SERP. Ya está en [PENDIENTE-MARTINA](../../PENDIENTE-MARTINA.md).
- **Ficha de Google:** en tres de las keywords locales lo primero es el mapa. Confirma las categorías propuestas en la [ficha](../../../martina/FICHA-GOOGLE.md) (Architetto + Designer d'interni).

## Límites

- Una sola búsqueda por keyword, sin volúmenes (D4 pendiente). El orden de la SERP cambia día a día; el tipo de página dominante es lo estable.
- El mapa se muestra para Bergamo centro; desde la provincia cambia el orden.
- No se puntuaron las personas ni las 7 dimensiones del SXO: el objetivo de B3 era el tipo de página, y el contenido ya pasó por A1 (contenido) y A2 (GEO).
