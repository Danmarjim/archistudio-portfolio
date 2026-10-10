# Revisión — `seo/c10-colore-architettura`

Ampliación de **"Il colore nell'architettura d'interni: strumento, non decorazione"** (`/news/il-colore-nell-architettura`, publicada en 2022). Pasa de 143 a ~1.100 palabras. Es la pieza más alineada con la identidad de Martina y el pilar del grupo de páginas de baño, cocina y color. Brief: [`C10`](../briefs/C10-colore-architettura.md).

**Sale de `seo/meta-titulos-descripciones`**, que ya tocaba el frontmatter de este artículo. Se mergea después de esa rama.

## Qué se ha hecho

- **Se conservan los párrafos originales de Martina**, que son su voz: "e poi per i colori vediamo alla fine", el muro azul, LOVINGCOLORS y la frase final. El H1 añade "d'interni", como pide el brief.
- Secciones nuevas:
  1. **Colore, luce e materia**: orientación, hora y acabado (con la Cucina MITE como ejemplo).
  2. **Il colore cambia le proporzioni**: claros y oscuros, cálidos y fríos, techo y pasillo. Una referencia a las paletas de Le Corbusier para Salubra (1931).
  3. **Il problema del bianco**.
  4. **Continuità tra gli ambienti**: Casa Archi & Colori (el verde y el pasillo blanco como pausa) y CASA PEONIA (el amarillo, la ciruela y el azul que unen las plantas).
  5. **Come lavoro il colore**: escucha, LOOKS & FEELS, MOODBOARD MATERIALI (como en `/servizi`) y comprobación en la estancia.
  6. **Tabla de cuatro proyectos y cuatro paletas**, con su origen, y las menciones de prensa.
- `updated: 2026-10-10`: la fecha de publicación (2022) se mantiene y el JSON-LD lleva `dateModified`. Nueva meta description del brief.
- Galería con 7 fotos de LOVINGCOLORS, Casa Archi & Colori, CASA PEONIA y un baño.
- Traducción al español y al inglés, partiendo de sus textos originales.
- Enlaces internos:
  - a 5 proyectos;
  - a los servicios C2 y C6 (si no están publicados, van a `/servizi`);
  - a las guías C9 y C13 (si no están publicadas, van a `/news`).

**Archivos:** `content/news/{it,es,en}/il-colore-nell-architettura.mdx`.

**De dónde salen los datos:** los colores y su origen salen de las fichas de los proyectos. El método sale de la descripción del servicio en `/servizi`. La teoría es general y no cita cifras.

**Pendiente para el final de la fase 2:** los enlaces **hacia** este artículo desde C6, C9, C13, C14 y `/chi-sono`, y el enlace a C14 cuando exista.

## ⚠️ Antes de mergear

Este artículo **ya está publicado en producción**. Si llega a `main` con algún `[DA CONFERMARE]`, el filtro de producción lo ocultará y la URL dejará de existir. Antes del merge hay que completar los 3 marcadores o quitar esas frases.

## Cómo verlo

Preview de `preview/seo-completa` o `npm run dev` → http://localhost:3000/news/il-colore-nell-architettura.

## Qué validar

**Martina: datos pendientes (3 por idioma)**
- [ ] Cómo comprueba los colores antes de decidir: muestras en la pared, pruebas en obra…
- [ ] Una anécdota: un cliente al que convenció de usar color, o un color nacido de un recuerdo del cliente.
- [ ] Nombres o códigos de los colores de cada proyecto, si quiere publicarlos (opcional: si no, se quita la línea).

**Martina: contenido**
- [ ] **Que siga sonando a ella**: es su texto más personal. Puede reescribir lo que quiera.
- [ ] Teoría: cálidos y fríos, techo oscuro, el blanco, la referencia a Le Corbusier.
- [ ] Origen de las paletas de la tabla.
- [ ] Traducciones.

**Daniel**
- [ ] Verificado en local el 10 oct: 200 en it/es/en; title correcto; 6 H2, 1 tabla y 3 marcadores por idioma; `dateModified` 2026-10-10; build y `tsc` limpios.

## Cómo mergear

Después de `seo/meta-titulos-descripciones`. **No mergear con marcadores** (ver arriba).
