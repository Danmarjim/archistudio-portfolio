# Contexto del negocio para SEO (para Cowork / Claude)

**Cómo usarlo:** antes de pedir cualquier cosa de SEO en Cowork, pega el bloque de la sección 1 (o pide a Claude que lea este archivo). Así Claude trabaja sobre los datos reales del estudio y no hace preguntas que ya están respondidas. Los campos marcados con 🟡 faltan: complétalos cuando los tengas (ver `DATOS-MARTINA.md`).

Última actualización: 9 oct 2026.

---

## 1. Bloque para pegar al empezar

```text
Este es el contexto de mi negocio. Úsalo como base para cualquier trabajo de SEO
(auditorías, estrategia, competidores, textos). No me vuelvas a pedir estos datos.

NEGOCIO
- Nombre comercial: MP_archistudio (by Arch. Martina C.M. Pozzi)
- Titular: Martina Chiara Maria Pozzi, architetta · P.IVA IT07788400963
- Dirección: Via Bologna 2, 24128 Bergamo (BG), Italia
- Teléfono: +39 327 126 7024 · Horario: lunes a viernes, 9:00–18:00
- Web: https://mparchistudio.com (italiano; /es español; /en inglés)
- Google Business Profile: existe ("MP_archistudio Arch. Martina Pozzi", categoría Studio di architettura),
  0 reseñas, sin atributos. Pendiente de optimizar (docs/seo/FICHA-GOOGLE.md)
- Estudio desde 2021. Experiencia: más de 15 años entre Italia y España
  (Politecnico di Milano 2011; Studio Vázquez Consuegra, Sevilla, 2013;
  Exe Arquitectura, Barcelona, 2017). Colegiada en el Ordine degli Architetti
  di Monza e Brianza desde 2012, nº 🟡. Premio Piranesi Prix de Rome 2009 🟡 (confirmar texto).
- Equipo: profesional independiente.
- Idiomas de trabajo: italiano, español, inglés.

SERVICIOS
1. ArchiAdvice: consulta de 60 minutos (videollamada) sobre colores, materiales,
   muebles y distribución. Precio 🟡. Reserva por Calendly.
2. Consulenza all'acquisto: verificación técnica antes de comprar casa
   (documentos, agibilità, catastro, visita) y estimación del coste de reforma. Precio 🟡.
3. Restyling: renovar espacios sin obras estructurales (color, luz, muebles,
   piezas a medida); también para inquilinos.
4. Progettazione architettonica a 360° / ristrutturazione chiavi in mano:
   levantamiento, proyecto, dirección artística, dirección de obra y trámites.
+ Colección propia de alfombras "Sevilla" (/tappeti).
Especialidad: el color como herramienta de proyecto y los muebles a medida.

ZONA
- Bergamo y provincia, Milano, Monza e Brianza (obras presenciales); Sevilla.
- ArchiAdvice y la revisión de documentos también a distancia.
- No queremos páginas por ciudad duplicadas (doorway pages).

CLIENTE OBJETIVO
- Particulares que reforman su vivienda (pisos de 60–150 m², muchos de los años 60-70),
  personas que van a comprar casa, inquilinos que quieren mejorar su casa sin obras.
- Valor medio de un encargo: 🟡

PROYECTOS (portfolio)
- Casa Archi & Colori — reforma integral, Milano, 155 m², 2025 (publicado en HOME n.36 y Homeadore)
- Appartamento LOVINGCOLORS — reforma integral, Bergamo, 80 m², 2021 (Cose di Casa, Homeadore)
- Restyling CASA PEONIA — restyling, Camparada (MB), 130 m², 2026
- Baños: ITALIAN SUMMER (7 m²), CASA PEONIA (4,5 m²), CASA ARCHI & COLORI (5,5 m²)
- Cocinas: MITE (Milano, 11 m²), PARIGINA (Monza, 8,2 m²)

KEYWORDS OBJETIVO (italiano)
- architetto Bergamo · studio di architettura Bergamo
- ristrutturazione appartamento Bergamo · architetto ristrutturazione Bergamo
- consulenza architetto online · consulenza acquisto casa
- restyling casa · progettazione bagno architetto
Situación actual (oct 2026): web indexada correctamente, 0 impresiones todavía
en Search Console. La ficha de Google sale al buscar el nombre, pero no entre los
20 primeros del mapa en "architetto Bergamo" (categoría y reseñas).

RESEÑAS Y PERFILES
- Reseñas: Spazi Belli 5,0★ (7). Google: 0.
- Perfiles: Instagram @mp_archistudio, LinkedIn, Pinterest, Houzz, Archilovers,
  Homify, Spazi Belli, Linktree. El nombre comercial no es idéntico en todos (pendiente).

COMPETIDORES DE REFERENCIA
- Búsqueda local "architetto Bergamo": directorios (Edilportale, Houzz, Archisio,
  Divisare) y estudios locales (Arch. Paolo Carzaniga, Atrio — reformas con arquitectos).
- "ristrutturazione appartamento Bergamo": Atrio (atriocasa.it), ARB Geom, RistrutturaSMART.
- "consulenza architetto online": Viù, Architettura a Domicilio, Erica Benini.
- "consulenza acquisto casa": ConsulenzaCasa360, Dove.it, Studio Tecnico Mazzoleni (Bergamo).

LO QUE YA ESTÁ HECHO
- Auditorías SEO completas (oct 2026): score 49 → 80/100. Web técnica corregida,
  datos estructurados, hreflang, sitemap, Search Console verificado.
- Plan, briefs por página y datos pendientes en docs/seo/ del repositorio.

CÓMO QUIERO QUE TRABAJES
- Prioriza lo que más impacto tiene con menos esfuerzo; indica impacto (alto/medio/bajo)
  y cuándo se verán resultados.
- Si no estás segura de algo, dilo; no inventes datos, precios ni normativa.
- Textos en italiano natural (y es/en cuando toque), sin relleno de keywords.
- Respeta las directrices de Google: nada de páginas por ciudad duplicadas, nada de
  keywords forzadas en la ficha de Google, nada de reseñas falsas o incentivadas.
```

---

## 2. Prompts útiles para Cowork (adaptados del artículo de S. Shrivastava, mar 2026)

El artículo "How to use Claude Cowork for SEO so well it feels illegal" propone 20 prompts para negocios locales de EE. UU. Esto es lo que encaja con MP_archistudio, adaptado a búsquedas en italiano. Cowork necesita poder navegar en Chrome para los prompts que abren Google Maps.

| # | Prompt del artículo | ¿Usarlo? | Adaptación / motivo |
|---|---|---|---|
| 1 | Auditoría de categorías de la ficha de Google (competidores del mapa) | ✅ Hecho (9 oct) | Resultado en [`FICHA-GOOGLE.md`](FICHA-GOOGLE.md). Se buscó en Google Maps "architetto Bergamo", "studio di architettura Bergamo", "interior designer Bergamo" y comparar categorías principal y secundarias de los primeros resultados |
| 2 | Atributos de la ficha | ✅ Hecho (9 oct) | En [`FICHA-GOOGLE.md`](FICHA-GOOGLE.md). Mismo método (p. ej. "appuntamento online", "gestito da donne", "consulenze online") |
| 3 | Velocidad y contenido de reseñas de competidores | **Sí** | Útil para saber cuántas reseñas al mes hacen falta y qué servicios mencionan los clientes |
| 4 | Plantillas de respuesta a reseñas | **Sí** | En italiano y español; respuestas personales, sin meter keywords a la fuerza |
| 5 / 19 | Publicaciones en la ficha y patrones de publicación | Más adelante | Cuando la ficha tenga categorías y reseñas. Proyectos terminados y antes/después |
| 6 | Sección de servicios de la ficha | **Sí** | Con los 4 servicios del bloque anterior; descripciones de 40–60 palabras |
| 7 | Descripción de la ficha (750 caracteres) | Sí, con matiz | Solo la versión "confianza" o "conversión": Google prohíbe el relleno de keywords en la descripción |
| 8 | Auditoría de fotos | Sí, con matiz | Frecuencia y tipos de fotos sí; **ignorar** lo de geoetiquetar y nombres de archivo para rankear en el mapa (Google elimina esos metadatos) |
| 9, 16, 17 | Keyword gap / intención / content gap con SEMrush | No por ahora | Requieren SEMrush (de pago). El plan de contenidos de `docs/seo/` ya cubre esto con búsquedas reales |
| 10, 12 | Análisis de Search Console | Más adelante | Cuando haya datos (semanas). Se puede hacer desde Claude Code con la API ya conectada |
| 11 | Una página por "servicio + ciudad" | **No** | Son *doorway pages* que Google penaliza. Solo existe la página de reforma en Bergamo |
| 13 | Análisis del lenguaje de las reseñas | Sí | Con reseñas de estudios de Bergamo y las propias de Spazi Belli, para los textos de la web |
| 14 | Backlinks con Ahrefs | No | De pago. Mejor: perfiles en directorios y prensa (ya hay HOME, Cose di Casa, Homeadore, Archiboost) |
| 15 | Auditoría de citations (NAP) | **Sí** | Con directorios italianos: Houzz, Archilovers, Homify, Spazi Belli, PagineGialle, Archisio, Edilportale, Divisare, Bing Places, Apple Maps |
| 18 | Entidad y Knowledge Graph | Ya hecho en parte | Datos estructurados completos en la web. Wikidata solo si hay notabilidad suficiente; no forzarlo |
| 20 | Informe mensual | Más adelante | Cuando haya datos en Search Console y ficha de Google |

**Afirmaciones del artículo a no tomar al pie de la letra:** que responder reseñas mejora el ranking (Google lo recomienda, pero no lo ha confirmado como factor), que las publicaciones caducan a los 7 días (desfasado) y que geoetiquetar fotos ayuda a posicionar (mito).
