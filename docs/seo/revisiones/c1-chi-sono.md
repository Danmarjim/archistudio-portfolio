# Revisión — `seo/c1-chi-sono`

La página `/chi-sono`, para que salga primero al buscar "Martina Pozzi architetto" y para reforzar la confianza (E-E-A-T) del resto de la web. Brief: [`C1`](../briefs/C1-chi-sono.md).

## Qué se ha hecho

| Sección | Cambio |
|---|---|
| **H1** | "Architettura empatica" → **"Martina Pozzi, architetta a Bergamo"**; "Architettura empatica" pasa a la línea superior (overline) |
| Introducción ("Credo fermamente…") | Sin cambios |
| Chi è Martina | Se sustituye la frase genérica "funzionalità, estetica e sostenibilità" por su especialidad: reformas de vivienda, interiores a medida, restyling, el color y los muebles a medida |
| **Formazione e iscrizione all'albo** (nueva) | Laurea en el Politecnico di Milano (2011), inscrita en el Ordine de Monza e Brianza desde 2012, idiomas, P.IVA |
| Il mio percorso | Se añade la inscripción en el Ordine (2012) |
| Cosa porto nei miei progetti | Sin cambios |
| **Dicono dei miei progetti** (nueva) | Las 5 publicaciones (HOME, Archiboost, Cose di Casa, Homeadore ×2), cada una enlazada a su noticia |
| **Progetti in evidenza** (nueva) | LOVINGCOLORS, Casa Archi & Colori, CASA PEONIA |
| **Dove mi trovi** (nueva) | Estudio en Via Bologna 2 con cita + enlaces a Instagram, LinkedIn, Pinterest, Houzz, Archilovers, Homify y Spazi Belli (los mismos del `sameAs`) |
| Llamada final | El botón lleva al formulario de contacto, no al `mailto:` del hotmail; se añade un enlace a ArchiAdvice |

- Mismo trabajo en español ("Martina Pozzi, arquitecta en Bérgamo") y en inglés ("Martina Pozzi, architect in Bergamo").
- **Datos estructurados (`Person`):** `hasCredential` (Laurea in Architettura, Politecnico di Milano) y `memberOf` (Ordine degli Architetti PPC de Monza e Brianza).
- La página pasa a ser un componente de servidor (`page.tsx`) que carga prensa, proyectos y perfiles, y el contenido queda en `SobreMiContent.tsx`, igual que `/servizi`.

**Archivos:** `src/app/[locale]/sobre-mi/page.tsx` (nuevo, servidor), `src/app/[locale]/sobre-mi/SobreMiContent.tsx` (antes `page.tsx`), `src/lib/seo.ts`, `messages/*.json` (`SobreMiPage`).

## Cómo verlo

Preview o `npm run dev` → http://localhost:3000/chi-sono, `/es/sobre-mi` y `/en/about`.

## Qué validar

**Martina**
- [ ] El H1 con su nombre y la nueva frase sobre su especialidad.
- [ ] **Inscripción en el Ordine desde 2012**: sale del albo público (marzo de 2012). ¿Quiere mostrar el número?
- [ ] **Premio Piranesi Prix de Rome 2009**: Google ya lo asocia a su nombre, pero **no se ha añadido** hasta tener el texto exacto (categoría, proyecto, si fue en equipo). Cuando lo confirme, va en la lista de credenciales, en la línea temporal y en `Person.award`.
- [ ] **Sevilla:** la página sigue diciendo "Studio con base a Bergamo e Siviglia" (decisión D6). Ayer confirmó que trabaja en Bergamo y toda Lombardía. ¿Sigue trabajando también en Sevilla? Si no, se quita aquí y del `areaServed`.
- [ ] Los perfiles enlazados: ¿están todos activos y con el mismo nombre comercial?
- [ ] Una segunda foto (en obra, con muestras de color o en el estudio), si la tiene.

**Daniel**
- [ ] Móvil: la lista de prensa y los perfiles.
- [ ] Verificado en local el 10 oct: `tsc` y `build` sin errores; H1 nuevo en it/es/en; 8 secciones; ~630 palabras en el contenido principal (antes ~383); `Person` con `hasCredential` y `memberOf`.

## Lo que falta del brief

- Premio, número de colegiada y segunda foto (datos de Martina). Con ellos la página llega a las 750–900 palabras del brief.
- Enlazar "Colore" a la guía de color (C10/C14) cuando exista.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Independiente de las demás ramas.
