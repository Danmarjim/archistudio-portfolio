# Revisión — `seo/c9-progettare-bagno`

Guía **"Progettare il bagno: i consigli di un'architetta (con 3 bagni reali)"** en `/news/progettare-il-bagno-consigli-architetto`. Para quien está pensando en reformar el baño; el ~70 % de esta búsqueda son guías, no páginas de servicio. Brief: [`C9`](../briefs/C9-progettare-il-bagno.md).

## Qué se ha hecho

- Guía en italiano (~1.270 palabras) en primera persona, con la estructura del brief:
  1. Respuesta directa: medidas, desagües e instalaciones, hábitos.
  2. Por dónde empezar (qué medir y por qué mover el inodoro es lo que más cuesta).
  3. Tabla de medidas de referencia. Los mínimos legales se remiten al reglamento municipal.
  4. Baño pequeño: 5 soluciones, con el mueble a medida de CASA PEONIA como ejemplo.
  5. **El color en el baño**: el ángulo propio, con los tres baños como tres maneras de usarlo.
  6. Tabla de los **tres baños reales**: superficie, lugar y año, punto de partida, decisiones y color.
  7. Errores más comunes.
  8. Coste de mercado con fuente y fecha: 8.000–17.000 € para 4–6 m²; 2.500–5.500 € si solo es estético.
  9. 4 preguntas frecuentes.
- Traducción al español y al inglés.
- Galería con 6 fotos: 2 por baño, una de ellas el moodboard de ITALIAN SUMMER. La portada es la del Bagno ITALIAN SUMMER, como pide el brief.
- Enlaces internos:
  - a las 3 fichas de baño;
  - a la guía C11 (si no está publicada, va a `/news`);
  - a los servicios C4 y C2 (si no están publicados, van a `/servizi`);
  - a contacto.

**Archivos:** `content/news/{it,es,en}/progettare-il-bagno-consigli-architetto.mdx`.

**De dónde salen los datos:**
- **Los baños**: de las fichas de los proyectos. Lo que las fichas no dicen (cómo eran antes) está marcado.
- **Las medidas**: son las de referencia habituales en las guías del sector, no de Martina.
- **Los precios**: de [Edilizia.com](https://www.edilizia.com/guide/quanto-costa-ristrutturare-bagno-lavori-prezzi-preventivo-imprevisti/) (septiembre 2026) y [Moneyside](https://www.moneyside.app/it/learn/casa-e-mutui/ristrutturazione-bagno-guida) (abril 2026).

**Pendiente para el final de la fase 2:**
- Los enlaces **hacia** esta guía desde las 3 fichas de baño y desde C4.
- El enlace desde aquí a las guías de color (C10/C14), cuando existan.

## Cómo verlo

Preview de `seo/preview-completa` o `npm run dev` → http://localhost:3000/news/progettare-il-bagno-consigli-architetto. En producción no se publica mientras haya marcadores.

## Qué validar

**Martina: datos pendientes (6 por idioma)**
- [ ] Las medidas que usa ella como referencia, si son distintas de la tabla.
- [ ] Cómo eran antes el Bagno CASA PEONIA y el Bagno CASA ARCHI & COLORI y qué no funcionaba. Si hay fotos del antes, mejor.
- [ ] Ciudad del Bagno CASA ARCHI & COLORI: la ficha dice Bergamo, pero Casa Archi & Colori está en Milano. Es el mismo dato pendiente de siempre.
- [ ] Rango de coste de un baño en sus obras.
- [ ] Duración típica de la obra de un baño.

**Martina: contenido**
- [ ] Afirmaciones profesionales:
  - cambiar revestimientos y sanitarios sin moverlos no suele requerir trámite, pero mover tabiques o la distribución suele requerir CILA;
  - un baño sin ventana necesita extracción mecánica;
  - las superficies mínimas y el antebaño dependen del reglamento municipal.
- [ ] Descripción de cada baño (colores, materiales, decisiones).
- [ ] Traducciones.

**Daniel**
- [ ] Verificado en local el 10 oct: 200 en it/es/en; title correcto; 8 H2, 2 tablas, 6 marcadores y 6 fotos de galería por idioma; build y `tsc` limpios.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir todos los `[DA CONFERMARE: …]`.
