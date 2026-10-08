# Brief A3 — Home (página pilar "architetto Bergamo")

Parte de `docs/SEO-PLAN-FASE-2.md` (bloque A, tarea A3). Generado con `/seo content-brief https://mparchistudio.com/` (modo mejora) el 8 oct 2026.

**Estado:** pendiente. Depende de D5 (copy del H1, decide Martina), de A2 (páginas de servicio a las que enlazar) y de C5 (testimonios).

**Página:** existente, `/`. Según el plan de clusters es el **pilar** del sitio: keyword principal "architetto Bergamo"; secundarias "studio di architettura Bergamo", "architetto ristrutturazione Bergamo", "consulenza architetto Bergamo" (comparten 2/2–2/3 URLs de la SERP). "Architetto d'interni Bergamo" va a `/servizi` (0/0 de solape).

**Límites de los datos:** sin volumen de búsqueda; SERP no geolocalizada y sin el bloque del mapa, que en "architetto Bergamo" pesa mucho (Google Business Profile, D-1).

---

## 1. Intención de búsqueda

- Comercial local: alguien busca un arquitecto en Bergamo para un encargo concreto (casi siempre una reforma de vivienda) y compara opciones.
- La SERP está dominada por **directorios** (Edilportale, Houzz, Archisio con 428 arquitectos, Divisare, Architetti e Designer) y por algunas **homes de estudios** (Carzaniga) y empresas de reformas con arquitectos (Atrio). Más el mapa con fichas de Google.
- Para una home, Google premia: quién eres, qué haces, dónde, pruebas (proyectos, prensa, reseñas) y contacto claro.

## 2. Competidores

| # | URL | Estructura | Palabras | Nota /40 | Qué les falta |
|---|---|---|---|---|---|
| 1 | [Atrio (home)](https://www.atriocasa.it/) | H1 "Ristrutturazioni a Bergamo, chiavi in mano", experiencia, servicios, "Stai comprando casa?", método, proyectos | ~1.550, 26 imágenes, "Bergamo" ×16 | 32 | Empresa con red de arquitectos: sin una autora ni estilo propio |
| 2 | [Architetti e Designer — Architetto Bergamo](https://architettiedesigner.it/architetto-bergamo/) | competencias, progettazione e interior, ristrutturazione, del proyecto a la obra | ~1.560, 1 imagen | 25 | Red de profesionales: texto genérico sin proyectos ni personas |
| 3 | [Arch. Paolo Carzaniga (home)](http://www.paolocarzaniga.it/) | H1 "Architetto Paolo Carzaniga - Bergamo" + galería | ~500, 12 imágenes | 22 | Apenas texto; sin servicios explicados ni contacto destacado |
| — | [Archisio — Architetti a Bergamo](https://www.archisio.it/architetti/bergamo) (directorio) | listado, qué hace un arquitecto, cómo elegirlo, cuánto cuesta | ~3.400 | — | No compite como página: es un sitio donde **conviene estar** (D-4) |
| — | [Edilportale](https://www.edilportale.com/tecnici/architetti/bergamo), [Houzz](https://www.houzz.com/professionals/architect/bergamo-09-it-probr0-bo~t_11784~r_3182164), [Divisare](https://divisare.com/designers/europe/southern-europe/italy/lombardia/bg/bergamo) | directorios | — | — | Idem: perfiles a crear o completar |

Nota = profundidad + formato + SEO + experiencia de uso (1–10 cada una).

**Nuestra home hoy: ~23/40** (profundidad 3 · formato 7 · SEO 6 · experiencia 7). Objetivo: **33–35/40**.

## 3. Qué conservar (ya funciona)

- **Title** "Architetto a Bergamo – Martina Pozzi | MP_archistudio" (54 caracteres): correcto, no tocar.
- **Overline** "Studio di progettazione architettonica sartoriale d'interni a Bergamo" y el **retrato** de Martina en el hero.
- Los tres botones del hero (Progetti, Contatto, Servizi).
- La franja **"Pubblicato su"** (Archiboost, HOME, Cose di Casa).
- Las 4 tarjetas de servicios y la llamada final "Hai un progetto in mente?".
- JSON-LD `ProfessionalService` + `Person` + `WebSite` (completo desde el 8 oct).

## 4. Qué falta

- **Texto:** ~325 palabras visibles frente a ~1.550 de los dos primeros competidores. Google no tiene casi nada que leer sobre qué hace Martina y dónde.
- **H1 sin ubicación ni oficio:** "Ristruttura senza pensieri" no dice "architetto" ni "Bergamo" (D5).
- **Bergamo aparece 1 vez** en el contenido (en la overline); Atrio, 16.
- **Las tarjetas de servicios no enlazan a páginas propias** (todavía no existen: A2) y no tienen texto, solo una pregunta.
- **No hay proyectos destacados con ubicación**: el carrusel muestra fotos sin decir qué ni dónde.
- **No hay testimonios ni reseñas**, ni zona de trabajo, ni un resumen del proceso.
- **"Chi sono"** es un párrafo genérico ("funzionalità, estetica e sostenibilità") sin credenciales.

## 5. Estructura propuesta

- **H1:** opción A (recomendada): "Architetto a Bergamo: ristrutturazioni e interni su misura", con "Ristruttura senza pensieri" como frase destacada encima o debajo; opción B: mantener el H1 actual y llevar "architetta a Bergamo" a la primera frase del subtítulo (menos peso). Decide Martina (D5).
- **URL:** `/` (sin cambios)
- **Extensión:** ~1.200–1.300 palabras visibles (hoy ~325; competidores ~1.550). No es una guía: frases cortas y bloques escaneables.

| # | Sección | Estado | Palabras | Notas | Keyword |
|---|---|---|---|---|---|
| 0 | Hero: overline + H1 + subtítulo + 3 botones + retrato | **Mantener y ajustar** | ~50 | Ajustar H1 (D5). Subtítulo: "Sono Martina Pozzi, architetta a Bergamo: progetto, pratiche e cantiere, con un unico referente." | Principal en H1 y subtítulo |
| 1 | Párrafo de entidad (debajo del hero) | **Nuevo** | ~60 | Quién, qué, dónde, credenciales: nombre completo, Politecnico di Milano, +15 años entre Italia y España, Ordine 🟡, especialidad en color y piezas a medida, zona (Bergamo, Milano, Brianza) | "studio di architettura Bergamo" |
| 2 | Carrusel de proyectos | **Mantener y mejorar** | ~40 | Pie con nombre, tipo y ciudad de cada proyecto ("Appartamento LOVINGCOLORS · ristrutturazione · Bergamo") y enlace a la ficha | — |
| 3 | H2 Servizi | **Ampliar** | ~320 | 4 bloques de ~70 palabras, cada uno con una frase de qué es, para quién y enlace a su página (A2): ristrutturazione appartamento Bergamo, consulenza acquisto casa, restyling, ArchiAdvice | "architetto ristrutturazione Bergamo" en el bloque de reforma |
| 4 | H2 Come lavoro | **Nuevo** | ~150 | 4 pasos muy resumidos (rilievo → progetto → direzione artistica → cantiere e pratiche) con enlace a la reforma | — |
| 5 | H2 Progetti in evidenza | **Nuevo** (hoy solo hay carrusel de fotos) | ~150 | 3 tarjetas: LOVINGCOLORS (Bergamo), Casa Archi & Colori (Milano), Restyling CASA PEONIA (Camparada) con una línea de resultado cada una | — |
| 6 | H2 Chi sono | **Reescribir** | ~120 | Sustituir el texto genérico por credenciales concretas, foto y enlace a `/chi-sono` (C1) | — |
| 7 | Franja Pubblicato su | **Mantener** | ~20 | Ya enlaza a las noticias de prensa | — |
| 8 | H2 Dicono di me | **Nuevo** (C5) | ~120 | 2–3 testimonios con nombre y tipo de encargo 🟡; enlace a Spazi Belli (5,0★) y, cuando exista, a la ficha de Google | — |
| 9 | H2 Dove lavoro | **Nuevo** | ~80 | Bergamo y provincia, Milano, Monza e Brianza (proyectos reales en cada zona), Sevilla. Sin listas de pueblos ni páginas por ciudad | "architetto Bergamo" 1 vez |
| 10 | Llamada final "Hai un progetto in mente?" | **Mantener** | ~40 | Añadir teléfono y la promesa de respuesta (24–48 h) | — |

## 6. Meta tags

- **Title:** mantener `Architetto a Bergamo – Martina Pozzi | MP_archistudio` (54 caracteres).
- **Meta description:** la actual tiene 154 caracteres (Google la recorta). Propuesta (137): `Martina Pozzi, architetta a Bergamo: ristrutturazioni chiavi in mano, interior design su misura e consulenza all'acquisto casa. Scrivimi.`
  - En código: `Metadata.description` de `messages/it.json`; ajustar es/en igual.

## 7. Ángulo diferencial

Frente a directorios y empresas de reformas, la home tiene que transmitir **una persona concreta con un estilo reconocible**: la arquitecta que firma cada proyecto, el color como sello, proyectos reales con ubicación y prensa nacional (HOME, Cose di Casa). Es lo que ningún directorio ni Atrio puede ofrecer.

## 8. Señales de confianza (E-E-A-T)

- Nombre completo, foto, Politecnico, nº de colegiación 🟡, años de experiencia (una sola cifra: "oltre 15 anni").
- Prensa visible (ya está) y testimonios (C5).
- Dirección y teléfono (ya en el footer), P.IVA (ya en el footer).
- Proyectos con lugar y año.
- Cuando exista la ficha de Google: enlace y, si se puede, número de reseñas.

## 9. Enlaces internos (la home es el pilar: enlaza a todo el cluster)

| Desde la home → | Ancla |
|---|---|
| `/servizi/ristrutturazione-appartamento-bergamo` (C4) | "ristrutturazione appartamento a Bergamo" |
| `/servizi/consulenza-acquisto-casa` (C3) | "consulenza all'acquisto casa" |
| `/servizi/restyling-casa` (C6) | "restyling senza opere murarie" |
| `/servizi/consulenza-architetto-online` (C2) | "ArchiAdvice, consulenza online di 60 minuti" |
| `/progetti/appartamento-lovingcolors`, `/progetti/casa-archi-colori`, `/progetti/restyling-casa-peonia` | nombre del proyecto |
| `/chi-sono` | "chi sono" / "il mio percorso" |

Todas las páginas de servicio y guías enlazan de vuelta a la home con "architetto a Bergamo".

## 10. Checklist de datos de Martina

- [ ] Decisión del H1 (opción A o B) — D5
- [ ] Nº de colegiación — D3
- [ ] 2–3 testimonios con permiso — C5
- [ ] Frase de una línea de resultado para cada proyecto destacado (o validar las que proponga)
- [ ] Tiempo de respuesta que quiere prometer (24 h, 48 h)

## 11. Implementación

1. `src/app/[locale]/page.tsx` y componentes de `src/components/sections/` (`Hero`, `AboutPreview`, `ServicesPreview`, `ProjectsStrip`, `CallToAction`); textos en `messages/{it,es,en}.json` (`Hero`, `AboutPreview`, `ServicesPreview`).
2. Nuevos bloques: entidad, "Come lavoro", proyectos destacados, testimonios, zona.
3. Hacerlo **después de A2** para que las tarjetas de servicios enlacen a sus páginas.
4. Verificar: palabras visibles ≥ 1.100; "Bergamo" en H1 o subtítulo y en 3–5 sitios naturales; LCP móvil sin empeorar (el retrato sigue siendo el LCP).
5. Tras el deploy: solicitar indexación de `/` y vigilar "architetto bergamo" y "studio di architettura bergamo" en Search Console.

Fuentes de la SERP: [Edilportale](https://www.edilportale.com/tecnici/architetti/bergamo), [Houzz](https://www.houzz.com/professionals/architect/bergamo-09-it-probr0-bo~t_11784~r_3182164), [Archisio](https://www.archisio.it/architetti/bergamo), [Divisare](https://divisare.com/designers/europe/southern-europe/italy/lombardia/bg/bergamo), [Architetti e Designer](https://architettiedesigner.it/architetto-bergamo/), [Paolo Carzaniga](http://www.paolocarzaniga.it/), [Atrio](https://www.atriocasa.it/).
