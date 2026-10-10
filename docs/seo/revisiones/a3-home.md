# Revisión — `seo/a3-home`

La home como página principal para "architetto Bergamo". Brief: [`A3`](../briefs/A3-home.md).

## Qué se ha hecho

| Sección | Antes | Ahora |
|---|---|---|
| **H1** | "Ristruttura senza pensieri" (sin oficio ni ciudad) | **"Architetto a Bergamo: ristrutturazioni e interni su misura"** (opción A del brief); "Ristruttura senza pensieri" pasa a abrir el subtítulo |
| Subtítulo | Genérico | "Sono Martina Pozzi, architetta: ti seguo dal progetto alle pratiche fino al cantiere, con un unico referente…" |
| Chi sono | Párrafo genérico ("funzionalità, estetica e sostenibilità") | Dos párrafos concretos: nombre, MP_archistudio desde 2021 en Bergamo, Politecnico di Milano, Siviglia y Barcellona, especialidad (color y muebles a medida), prensa (HOME, Cose di Casa, Homeadore) |
| Servizi | Pregunta + 3 viñetas, sin enlace | Pregunta + resumen de ~50 palabras por servicio + **enlace a su página** (o al hub si no está publicada); cuadrícula de 2×2 |
| **Come lavoro** (nuevo) | — | 4 pasos (rilievo, progetto, imprese e preventivi, cantiere e pratiche) + enlace a la página de reforma |
| **Progetti in evidenza** (nuevo en la home) | Solo el carrusel de fotos sin texto | 3 tarjetas: LOVINGCOLORS (Bergamo), Casa Archi & Colori (Milano), CASA PEONIA (Camparada) |
| **Dove lavoro** (nuevo) | — | Estudio en Via Bologna 2 con cita; Bergamo, Milano, Monza e Brianza y Lombardía, con los proyectos de cada zona; ArchiAdvice online |
| Llamada final | Solo botón | Botón + teléfono clicable |

- Mismo trabajo en español ("Arquitecta en Bérgamo: reformas e interiores a medida") y en inglés ("Architect in Bergamo: renovations and bespoke interiors").
- "Come lavoro" y "Dove lavoro" son componentes de servidor sin animación. Las tarjetas de proyecto no piden sus imágenes con prioridad, para que el retrato siga siendo el LCP.

**Archivos:** `src/app/[locale]/page.tsx`, `src/components/sections/{HowIWork,WorkArea}.tsx` (nuevos), `ServicesPreview.tsx`, `AboutPreview.tsx`, `CallToAction.tsx`, `FeaturedProjects.tsx`, `messages/*.json` (`Hero`, `AboutPreview`, `ServicesPreview`, `ServicesData.*.summary`, `FeaturedProjects`, `CallToAction.phone`, `HowIWork` y `WorkArea` nuevos).

## Cómo verlo

Preview de la rama o `npm run dev` → http://localhost:3000/, `/es` y `/en`. En la preview de `seo/preview-completa` las tarjetas de servicio enlazan ya a sus páginas.

## Qué validar

**Martina**
- [ ] **H1 (decisión D5).** Se ha aplicado la opción A, "Architetto a Bergamo: …". En italiano dice "Architetto" porque es lo que se busca en Google; el title de la página ya lo usaba. En español e inglés va en femenino o neutro. ¿Le parece bien, o prefiere "Architetta a Bergamo" aunque pese algo menos para la búsqueda?
- [ ] El texto de "Chi sono", los resúmenes de los servicios, "Come lavoro" y "Dove lavoro".
- [ ] La tarjeta de ArchiAdvice menciona el precio (100 € y que se descuenta del proyecto).
- [ ] Los 3 proyectos destacados.

**Daniel**
- [ ] Móvil y escritorio: la cuadrícula de 2×2 de servicios y los 4 pasos.
- [ ] PageSpeed móvil de la home sin empeorar respecto a la base (LCP = retrato).
- [ ] Verificado en local el 10 oct: `tsc` y `build` sin errores; H1 nuevo en it/es/en; unas 770 palabras en total (antes, unas 325 de contenido); "Bergamo" 9 veces; solo el retrato con `fetchpriority="high"`.

## Lo que falta del brief (necesita datos de Martina)

- **Testimonios** ("Dicono di me"): no se ha creado la sección porque no hay testimonios con permiso. Es lo que más falta para llegar a las 1.100–1.300 palabras del brief.
- **Número de colegiada** en "Chi sono".
- **Plazo de respuesta** prometido en la llamada final (24 o 48 h).
- Pies de foto con proyecto y ciudad en el carrusel: el carrusel mezcla fotos al azar. Se ha sustituido en la práctica por la sección de proyectos destacados.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Funciona sola: si las páginas de servicio no están publicadas, los enlaces van al hub. Toca `messages/*.json` igual que C2 y A4, pero en claves distintas: en la integración se han mergeado sin conflictos.
