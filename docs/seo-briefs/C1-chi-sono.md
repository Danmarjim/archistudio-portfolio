# Brief C1 — Chi sono

Parte de `docs/SEO-PLAN-FASE-2.md` (bloque C, ola 1, tarea C1). Generado con `/seo content-brief https://mparchistudio.com/chi-sono` (modo mejora) el 8 oct 2026.

**Estado:** pendiente. Algunos datos los tiene que confirmar Martina (checklist al final).

**Página:** existente, `/chi-sono` (es `/es/sobre-mi`, en `/en/about`). No compite por una búsqueda genérica: es la página de **marca y confianza** de todo el sitio. Responde a "Martina Pozzi architetto", "MP_archistudio" y alimenta la autoridad (E-E-A-T) de las páginas de servicio, que enlazan aquí.

---

## 1. Qué ve Google hoy al buscar su nombre

Búsqueda "Martina Pozzi" architetto (8 oct):

1. LinkedIn (Martina Chiara Maria Pozzi — MP_archistudio)
2. [Homeadore — tag Martina Pozzi](https://homeadore.com/tag/martina-pozzi/): **dos artículos sobre sus proyectos** en un blog internacional de diseño: [Casa ARCHI & COLORI](https://homeadore.com/2026/08/05/casa-archi-colori-a-playful-milan-apartment/) (5 ago 2026) y [Lovingcolors](https://homeadore.com/2026/06/25/lovingcolors-opens-a-1960s-apartment-by-martina-pozzi/) (25 jun 2026). **La web no los menciona.**
3. Albo del [Ordine degli Architetti di Monza e Brianza](https://ordinearchitetti.mb.it/ordine/albo/ricerca-nell-albo.html?filter=P&page=20) (inscripción en marzo de 2012).
4. Linktree.

Google también asocia a su nombre el **Premio Internazionale Piranesi Prix de Rome (2009)**, por un proyecto de museo en el sitio arqueológico de Villa Adriana (Tivoli). **La web no lo menciona.**

Mientras la reindexación termina, mparchistudio.com no aparece en esa búsqueda; el objetivo es que `/chi-sono` y la home salgan primero para su nombre.

## 2. Situación actual

- ~383 palabras, 1 foto. Title: "Chi sono – Martina Pozzi, architetta | MP_archistudio" (correcto).
- **H1 "Architettura empatica"**: no contiene su nombre ni su profesión.
- Bien resuelto: la historia personal (Milano → Siviglia → Barcelona → Bergamo), la línea temporal, los 4 valores (luz, color, espacio extra, empatía), el tono cercano y el CTA final.
- Falta: colegiación, premio, prensa, proyectos enlazados, idiomas, perfiles profesionales, una foto trabajando o en obra.
- Una frase genérica que no la diferencia: "funzionalità, estetica e sostenibilità" (cualquier estudio la usa).
- "Studio con base a Bergamo e Siviglia": coherente con la decisión D6 (Sevilla sí es zona de servicio).

**Nota hoy: ~22/40** (profundidad 5 · formato 7 · SEO 4 · experiencia 6). Las páginas "chi sono" de los competidores locales son flojas (Carzaniga, Zambelli: biografía de un párrafo); el listón real lo marca la información que Google ya tiene sobre ella. **Objetivo: 33–35/40.**

## 3. Estructura propuesta (modo mejora)

- **H1:** "Martina Pozzi, architetta a Bergamo" — con "Architettura empatica" como frase destacada encima (overline) o como H2.
- **URL:** sin cambios.
- **Extensión:** ~750–900 palabras (hoy ~383). Página de perfil: más datos, no más relleno.

| # | Sección | Estado | Palabras | Notas |
|---|---|---|---|---|
| 0 | Overline "Architettura empatica" + H1 con nombre + foto | **Ajustar** | ~20 | La foto actual sirve; valorar una segunda en obra o con muestras de color 🟡 |
| 1 | Introducción: "Credo fermamente…" | **Mantener** | ~120 | Es el mejor texto de la página |
| 2 | H2 Chi è Martina C.M. Pozzi? | **Reescribir en parte** | ~150 | Mantener lo personal (sonrisa, collages @mp_collages). Sustituir "funzionalità, estetica e sostenibilità" por su especialidad real: color, piezas a medida, reformas de vivienda |
| 3 | H2 Credenziali | **Nuevo** | ~100 | Lista: Laurea in Architettura, Politecnico di Milano (2011); iscritta all'Ordine degli Architetti di Monza e Brianza dal 2012, n. 🟡; Premio Internazionale Piranesi Prix de Rome 2009 🟡 (confirmar texto); lingue: italiano, español, english; P.IVA |
| 4 | H2 Il mio percorso (línea temporal) | **Mantener y completar** | ~150 | Añadir el premio (2009) y la colegiación (2012) a la línea temporal. Revisar la coherencia de fechas 🟡 (premio 2009 anterior a la laurea 2011) |
| 5 | H2 Cosa porto nei miei progetti | **Mantener** | ~100 | Enlazar "Colore" a la guía de color (C10/C14) y "Spazio extra" a un proyecto con piezas a medida |
| 6 | H2 Dicono dei miei progetti (prensa) | **Nuevo** | ~100 | HOME n. 36 (abr 2026), Archiboost Talks (jul 2026), Cose di Casa (oct 2022), **Homeadore (jun y ago 2026)**: logo o nombre + fecha + enlace (a la noticia interna o al artículo externo) |
| 7 | H2 Alcuni progetti | **Nuevo** | ~80 | 3 tarjetas: LOVINGCOLORS, Casa Archi & Colori, Restyling CASA PEONIA |
| 8 | H2 Dove mi trovi | **Nuevo** | ~50 | Bergamo y Sevilla; enlaces visibles a Houzz, Archilovers, Spazi Belli (5,0★), LinkedIn, Instagram — los mismos del `sameAs` |
| 9 | CTA "Hai un'idea nel cassetto?" | **Mantener** | ~20 | Añadir enlace a ArchiAdvice como primer paso |

## 4. Meta tags

- **Title:** mantener `Chi sono – Martina Pozzi, architetta | MP_archistudio`.
- **Meta description:** la actual sirve; si se reescribe, incluir Politecnico, colegiación y Bergamo/Sevilla en ≤150 caracteres.

## 5. Datos estructurados

Ampliar `Person` en `src/lib/seo.ts` (`buildSiteGraph`) cuando Martina confirme:
- `hasCredential`: `EducationalOccupationalCredential` (Laurea in Architettura, Politecnico di Milano) y la inscripción en el Ordine (`credentialCategory`: "iscrizione albo professionale", `recognizedBy`: Ordine degli Architetti PPC della Provincia di Monza e della Brianza).
- `award`: "Premio Internazionale Piranesi Prix de Rome 2009".
- `subjectOf`: los artículos de prensa externos (Homeadore, Cose di Casa, Archiboost) como `CreativeWork` con `url`.
- Añadir `https://homeadore.com/tag/martina-pozzi/` no como `sameAs` (no es un perfil suyo) sino en `subjectOf`.

## 6. Enlaces internos

- Esta página es el destino de "chi sono" desde todas las páginas de servicio (bloque "Chi sono" de C2, C3, C4, C6) y desde la home (A3).
- Desde aquí: proyectos destacados, noticias de prensa, ArchiAdvice, contacto.

## 7. Otras tareas que salen de este brief

- **Noticias nuevas** (bloque C, opcional): una por cada artículo de Homeadore, igual que las de HOME y Cose di Casa, con enlace a la ficha del proyecto. Así entran también en la franja "Pubblicato su" de la home.
- **`llms.txt`**: añadir Homeadore a la sección "Stampa e interviste" y el premio a "Chi è".

## 8. Checklist de datos de Martina

- [ ] Nº de colegiación (Ordine di Monza e Brianza) y si quiere mostrarlo
- [ ] Texto exacto del premio Piranesi Prix de Rome 2009 (categoría, proyecto, si fue en equipo)
- [ ] Fechas de la línea temporal (premio 2009, laurea 2011, colegiación 2012)
- [ ] ¿Quiere añadir las publicaciones de Homeadore como noticias?
- [ ] Una segunda foto (en obra, con muestras de color o en el estudio)
- [ ] ¿Algún otro reconocimiento, docencia, charla o publicación?

## 9. Implementación

1. `src/app/[locale]/sobre-mi/page.tsx` y `messages/{it,es,en}.json` (`AboutPage`).
2. `buildSiteGraph` en `src/lib/seo.ts` (sección 5).
3. Verificar: H1 con nombre; palabras ≥ 750; Rich Results Test sin errores en `Person`.
4. Tras el deploy: solicitar indexación de `/chi-sono` y comprobar la búsqueda "Martina Pozzi architetto" en 2–3 semanas.
