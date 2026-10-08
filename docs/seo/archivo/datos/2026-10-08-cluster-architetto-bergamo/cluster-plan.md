# Plan de clusters SEO: "architetto Bergamo" (mparchistudio.com, mercado italiano)

Generado: 2026-10-08 · Fuente de SERP: WebSearch (sin DataForSEO) · 46 búsquedas, 52 keywords con SERP comparada · Solo planificación (pasos 1-6), no se ha escrito contenido.

Archivos: `cluster-plan.json` (datos completos, matriz SERP, enlaces), `cluster-map.html` (mapa visual), este resumen.

## 1. Metodología y calibración (importante)

- Las SERPs italianas de cola larga están **muy fragmentadas**: el solape máximo observado fue de **3 URLs compartidas** (sobre ~9 resultados). Los umbrales canónicos (4-6 = mismo cluster, 7-10 = mismo post) no se disparan nunca en este dataset.
- Reglas calibradas (documentadas en `methodology.calibrated_rules`):
  - **Misma página**: URL ≥3, o URL = 2 con ≥2 dominios compartidos dentro de la misma intención/término principal.
  - **Mismo cluster**: URL ≥1 o ≥2 dominios compartidos dentro del mismo grupo de intención.
  - **Separadas**: 0/0. Solo se fusionan como **sección** por la capacidad limitada del estudio, y quedan marcadas como `split_candidate`.
- Formato de la evidencia: `URLs/dominios compartidos`.

## 2. Arquitectura (1 pilar + 13 páginas en 4 clusters)

Pilar: **Home `/`** (EXISTENTE A MEJORAR). Keyword principal: `architetto bergamo`. Secundarias: studio di architettura Bergamo, architetto ristrutturazione Bergamo, consulenza architetto Bergamo.
- Evidencia: architetto Bergamo ↔ architetto ristrutturazione Bergamo **2/3**; ↔ consulenza architetto Bergamo **2/2**; ↔ studio di architettura Bergamo 1/1; ↔ architetto d'interni Bergamo 0/0 (por eso esa keyword va a otra página).
- La SERP la forman directorios (Edilportale, Houzz, Archisio, Divisare) y homes de estudios locales. No posiciona ninguna guía larga, así que el pilar se queda en ~1.300 palabras con una sección por cluster. Es una **desviación intencionada** de la especificación de 2.500-4.000 palabras.
- Schema: ProfessionalService/LocalBusiness + Person + WebSite.

| ID | URL propuesta | Keyword principal | Secundarias | Intención | Plantilla | Palabras | Estado | Ola | Evidencia SERP |
|---|---|---|---|---|---|---|---|---|---|
| **C0 Servicios en Bergamo** | | | | | | | | | |
| 0-0 | `/servizi` (hoy `/servicios`) | architetto d'interni bergamo | progettazione interni Bergamo, interior designer Bergamo | comercial-local | landing-page (hub de servicios) | 1.200 | EXISTENTE A MEJORAR | 1 | interior designer ↔ progettazione interni **2/4**; architetto d'interni ↔ interior designer 1/2; ↔ progettazione interni 0/2; ↔ seed 0/0 |
| 0-1 | `/servizi/ristrutturazione-appartamento-bergamo` | ristrutturazione appartamento bergamo | chiavi in mano Bergamo; secciones: cucina/bagno Bergamo, fasi | transaccional-local | landing-page | 1.500 | NUEVA | 1 | ↔ chiavi in mano BG **1/3**; ↔ ristrutturazione cucina BG **1/3**; ↔ architetto ristrutturazione BG 0/1 (se asigna al pilar) |
| 0-2 | `/servizi/restyling-casa` | restyling casa | restyling appartamento, relooking casa | comercial (mixta) | landing-page + bloque explicativo | 1.300 | NUEVA | 2 | ↔ restyling appartamento **2/2**; ↔ relooking **2/2** |
| **C1 Consultorías** | | | | | | | | | |
| 1-0 | `/servizi/consulenza-architetto-online` (ArchiAdvice) | consulenza architetto online | architetto online prezzi, quanto costa una consulenza con un architetto, consulenza prima di ristrutturare | transaccional | landing-page con precio visible | 1.200 | NUEVA | 1 | ↔ prima di ristrutturare **3/3**; ↔ prezzi **2/4**; prezzi ↔ quanto costa consulenza **3/4** |
| 1-1 | `/servizi/consulenza-acquisto-casa` | consulenza architetto acquisto casa | consulenza tecnica acquisto casa Bergamo, verifica tecnica immobile, comprare casa da ristrutturare | transaccional | landing-page | 1.300 | NUEVA | 1 | ↔ ArchiAdvice 0/0 (SERP propia, página separada); ↔ online prima di ristrutturare 1/2 (enlace cruzado) |
| 1-2 | `/news/conformita-urbanistica-catastale-prima-di-comprare-casa` | conformità urbanistica e catastale | cosa controllare prima di comprare casa, verifica prima del rogito; secciones: agibilità, difformità/sanatoria | informacional | listicle (checklist) | 1.700 | NUEVA | 2 | conformità ↔ differenza 1/1; rogito ↔ differenza 1/1; difformità ↔ rogito 0/1; genérica y agibilità 0/0 (candidatas a página propia) |
| **C2 Costes y elección del profesional** | | | | | | | | | |
| 2-0 | `/news/quanto-costa-un-architetto-ristrutturazione` | quanto costa un architetto per ristrutturare casa | parcella architetto ristrutturazione | investigación comercial | explainer | 1.600 | NUEVA | 2 | ↔ parcella **3/4**; ↔ quanto costa consulenza 1/1 (esa va a ArchiAdvice) |
| 2-1 | `/news/costo-ristrutturazione-appartamento-bergamo` | costo ristrutturazione appartamento bergamo | al mq; sección: case anni 60-70 | investigación comercial local | explainer | 1.700 | NUEVA | 3 | ↔ servicio ristrutturazione BG 1/1 (separadas); ↔ al mq 0/0; ↔ anni 60-70 0/2 |
| 2-2 | `/news/come-scegliere-architetto-ristrutturazione` | come scegliere un architetto per ristrutturare casa | architetto o impresa chiavi in mano, cosa fa un architetto d'interni | investigación comercial | comparison | 1.500 | NUEVA | 3 | ↔ cosa fa arch. d'interni 0/2; ↔ chiavi in mano 0/0 (fusión por capacidad) |
| **C3 Baño, cocina y color** | | | | | | | | | |
| 3-0 | `/news/progettare-il-bagno-consigli-architetto` | progettazione bagno architetto | bagno piccolo; secciones: coste, baño de color | informacional (cómo) | how-to | 1.700 | NUEVA | 2 | todas las secundarias 0/0-0/1 → secciones, candidatas a página propia |
| 3-1 | `/news/progettare-la-cucina-consigli-architetto` | progettazione cucina architetto | cucina colorata (sección) | informacional (cómo) | how-to | 1.400 | NUEVA | 3 | ↔ cucina colorata 0/0; ↔ colori pareti 0/2 |
| 3-2 | `/news/il-colore-nell-architettura` | colore nell'architettura d'interni | casa colorata arredamento | informacional (concepto) | explainer | 1.400 | EXISTENTE A MEJORAR (hoy 185 palabras) | 2 | ↔ colori pareti 0/0 (páginas distintas) |
| 3-3 | `/news/come-scegliere-colore-pareti-casa` | colori pareti casa consigli architetto | come abbinare i colori in casa | informacional (cómo) | how-to | 1.500 | NUEVA | 3 | ↔ abbinare 0/0; SERP con blogs de arquitectos (giuliagrilloarchitetto ×2) |

Totales: 14 páginas (11 nuevas, 3 existentes a mejorar), unas 20.300 palabras y 68 enlaces planificados.
- Las 8 fichas de proyecto, `/progetti`, `/chi-sono` y las noticias de prensa funcionan como **páginas de apoyo** que enlazan a los spokes (ver `supporting_pages`). No cuentan como spokes.
- Schema de los spokes: Service + BreadcrumbList en los servicios (ArchiAdvice y la consultoría de compra añaden Offer con precio) y Article + BreadcrumbList en las guías. **Ni FAQPage ni HowTo.**

## 3. Olas de prioridad

- **Ola 1** (dinero + base local; 2 páginas que ya existen y 3 nuevas):
  - **Home**: reforzar el pilar.
  - **/servizi**: convertirla en hub.
  - **Ristrutturazione appartamento Bergamo**: el servicio de mayor ticket. Tiene casos reales en Bergamo.
  - **ArchiAdvice**: es el grupo más compacto del dataset (3/3, 3/4) y la SERP premia páginas de servicio con precio, que es justo lo que ofrece.
  - **Consulenza acquisto casa**: SERP propia (0 solape). En la variante "Bergamo" solo compiten agencias inmobiliarias y un geometra, así que la competencia local es baja.
  - Por qué estas: separar los anchors de `/servicios` en URLs propias es el requisito estructural del que dependen todos los enlaces del plan.
- **Ola 2** (refuerzan la ola 1 y la autoridad temática):
  - Restyling (servicio).
  - Guía de conformità (alimenta la consultoría de compra).
  - Cuánto cuesta un arquitecto (la SERP la ocupan blogs de arquitectos, así que se puede ganar).
  - Progettare il bagno (aprovecha los 3 baños del portfolio).
  - Ampliar "Il colore nell'architettura" (el tema más alineado con la marca).
- **Ola 3**: coste de reforma en Bergamo, cómo elegir arquitecto, cocina y colores de las paredes.
  - Sin datos de volumen, el orden 2/3 es una estimación. Si una herramienta de volumen muestra mucha demanda, "costo ristrutturazione appartamento Bergamo" puede pasar a la ola 2.

## 4. Matriz de enlaces internos (resumen)

- **Obligatorios**: pilar → cada spoke (13) y cada spoke → pilar (13).
- **Recomendados**: todos los pares dentro de cada cluster, en ambos sentidos.
- **Opcionales entre clusters** (13):
  - ArchiAdvice ↔ cuánto cuesta un arquitecto
  - consultoría de compra → coste de reforma en BG
  - servicio de reforma ↔ coste en BG
  - servicio de reforma ↔ arquitecto o empresa
  - restyling ↔ color
  - /servizi → color
  - baño → reforma
  - colores de paredes → restyling
  - guía de conformità → ArchiAdvice
- **Páginas de apoyo**:
  - proyectos de baño → guía de baño y servicio de reforma
  - cocinas → guía de cocina
  - reformas integrales → servicio de reforma, coste en BG y color
  - restyling Casa Peonia → restyling
  - /chi-sono → home, /servizi y color
  - archiadvice-lancio → ArchiAdvice
- Validación: todos los spokes tienen ≥3 enlaces entrantes dentro del cluster (mínimo 3, máximo 6). No hay páginas huérfanas.
- Texto ancla: keyword o variante cercana. Hacia el pilar se varía entre "architetto a Bergamo" y la marca.

## 5. Canibalización

No hay keywords principales duplicadas. Riesgos frente a páginas existentes:

1. **Home vs /servizi**: los dos títulos mencionan "architetto Bergamo". La home se queda con "architetto (ristrutturazione) Bergamo" y /servizi abre con "architetto d'interni / progettazione interni Bergamo". La SERP 0/0 respalda la separación.
2. **/news/archiadvice-lancio vs la nueva página de ArchiAdvice**: renombrar la noticia como anuncio con fecha y enlazar al servicio de forma destacada. No hace falta 301 (son intenciones distintas).
3. **Servicio de reforma BG vs guía de coste BG**: solo comparten 1 URL. El servicio lleva un párrafo de costes y enlaza a la guía, que tiene las tablas.
4. **Precio de ArchiAdvice vs guía de honorarios**: el precio de la consulta va en el servicio; los honorarios de proyecto (% o tanto alzado) van en la guía.
5. **Consultoría de compra vs guía de conformità**: 0/0, intenciones distintas (contratar frente a informarse). La guía termina con una llamada a la acción hacia el servicio.
6. **Fichas de proyecto de baño vs guía de baño**: las fichas se titulan por el nombre del proyecto y la guía por la keyword. La guía incluye los proyectos.
7. **Hub /servizi vs las 4 páginas de servicio**: el hub resume cada servicio en 80-120 palabras y enlaza. No duplica contenido.

## 6. Excluidas (sin página propia)

- **architetto Milano**: SERP con Indeed, grandes estudios y directorios. Sin oficina en Milano, una página de ciudad sería un doorway.
- **architetto ristrutturazione interni Milano**: estudios con oficina en Milano. Revisar solo si hay presencia real o perfil de empresa (GBP) allí. Milano y Monza-Brianza se mencionan solo como zona de servicio (`areaServed`).
- **architetto Monza Brianza ristrutturazione**: directorios. La inscripción en el Ordine MB se usa como señal de confianza en /chi-sono.
- **bonus ristrutturazione 2026**: SERP de editoriales y fiscal, YMYL y caduca rápido. Solo un recuadro dentro de las guías de costes.
- **ristrutturazione appartamento prima e dopo**: SERP de inspiración. Lo cubre /progetti.
- **ristrutturazione bagno/cucina Bergamo**: van como secciones del servicio de reforma, no como páginas de ciudad. La SERP la dominan contratistas y showrooms, y habría riesgo de doorway.

Backlog de páginas a separar si los datos lo justifican: bagno piccolo, agibilità, "cosa controllare prima di comprare casa" (genérica), quanto costa rifare il bagno, bagno colorato, architetto vs impresa chiavi in mano.

## 7. Requisito previo de URLs

El locale italiano sirve hoy slugs en español (`/servicios`, `/proyectos`, `/sobre-mi`, `/contacto`).
- Los slugs italianos propuestos (`/servizi`, `/progetti`, `/chi-sono`, `/contatti`) requieren:
  - `pathnames` en next-intl
  - redirecciones 301
  - actualizar sitemap y hreflang
- Si se aplaza, las páginas nuevas de servicio pueden colgar temporalmente de `/servicios/...` y migrarse después en un solo lote.

## 8. Limitaciones

- **Sin datos de volumen** (todas las keywords tienen volume = 0). La elección del pilar y el orden de las olas se basan en el tipo de SERP, el encaje con el negocio y el criterio de intención, no en la demanda. Conviene validarlo con Keyword Planner, GSC o DataForSEO.
- **WebSearch no está geolocalizado en google.it** y devuelve ~9 resultados orgánicos sin local pack. El solape real en google.it desde Bergamo puede ser mayor (sobre todo en las consultas locales, donde además manda el local pack o GBP).
- Una sola captura de SERP por keyword (no hay varias ejecuciones para estabilizar los resultados).
- Las fusiones con 0/0 se hicieron por capacidad, no por evidencia. Están marcadas como candidatas a separar.
- Checklist: el pilar incumple a propósito la especificación de 2.500-4.000 palabras, y el umbral canónico de ≥4 URLs no se cumple en ningún grupo (se usan las reglas calibradas).
