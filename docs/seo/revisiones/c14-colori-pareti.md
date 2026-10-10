# Revisión — `seo/c14-colori-pareti`

Guía **"Colori pareti casa: come sceglierli (e abbinarli) senza sbagliare"** en `/news/come-scegliere-colore-pareti-casa`. Es la guía práctica (el **cómo**) gemela de C10 (el **porqué**). Tiene mucha demanda estacional: mudanzas y primavera. Brief: [`C14`](../briefs/C14-colori-pareti-casa.md).

## Qué se ha hecho

- Guía en italiano (~1.070 palabras) en primera persona, con la estructura del brief:
  1. Método en 5 pasos.
  2. Tabla de **orientación** (norte, sur, este, oeste) con qué funciona en cada una, más la temperatura de la luz artificial.
  3. Proporciones de la estancia, en versión práctica. La teoría está en C10 y se enlaza.
  4. **Regla 60-30-10 explicada con CASA PEONIA**: marfil 60 %, roble y marrón 30 %, amarillo oro 10 %. Incluye cuándo romperla y la diferencia entre colores análogos y complementarios.
  5. Paredes, techos y medias paredes: Cucina PARIGINA y los semicírculos de CASA PEONIA.
  6. **Cómo probar una muestra** en 5 pasos.
  7. **Tabla estancia por estancia**, con un caso de sus proyectos en cada una.
  8. **Si vives de alquiler**: art. 1590 del Código Civil, permiso y alternativas (incluidas sus alfombras de `/tappeti`).
  9. Errores más comunes.
- Sin tendencias del año, como pide el brief, para que no envejezca.
- Traducción al español y al inglés.
- Galería con 4 fotos.
- Enlaces internos:
  - a C10, C9 y C13 (si no están publicadas, van a `/news`);
  - a 6 proyectos y a `/tappeti`;
  - a los servicios C2 y C6 (si no están publicados, van a `/servizi`).

**Archivos:** `content/news/{it,es,en}/come-scegliere-colore-pareti-casa.mdx`.

**De dónde salen los datos:** los colores de cada proyecto salen de sus fichas. Las reglas (orientación, 60-30-10, muestras) son criterios generales del sector. **La lectura 60-30-10 de CASA PEONIA es mía**: la tiene que validar Martina.

## Cómo verlo

Preview de `seo/preview-completa` o `npm run dev` → http://localhost:3000/news/come-scegliere-colore-pareti-casa. En producción no se publica mientras haya marcadores.

## Qué validar

**Martina: datos pendientes (1 por idioma)**
- [ ] Cómo prueba ella las muestras y qué tipo de pintura prefiere. Es la misma pregunta que en C10.

**Martina: contenido**
- [ ] **La lectura 60-30-10 de CASA PEONIA**: ¿la reconoce como suya?
- [ ] La tabla de orientación y la de estancia por estancia.
- [ ] La sección de alquiler (art. 1590 del Código Civil).
- [ ] Traducciones.

**Daniel**
- [ ] Verificado en local el 10 oct: 200 en it/es/en; title correcto; 8 H2, 2 tablas y 1 marcador por idioma; build y `tsc` limpios.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir el `[DA CONFERMARE: …]`. Conviene publicarla junto con C10.
