# Revisión — `seo/c11-costo-ristrutturazione`

Guía **"Costo ristrutturazione appartamento a Bergamo"** en `/news/costo-ristrutturazione-appartamento-bergamo`. Es una búsqueda informativa de alguien que está a punto de reformar y quiere presupuestar. Brief: [`C11`](../briefs/C11-costo-ristrutturazione-bergamo.md).

## Qué se ha hecho

- Guía en italiano (~1.050 palabras) en primera persona, con la estructura del brief:
  1. Respuesta directa con el rango por m².
  2. Tabla de precios por nivel (ligera, media, integral, alta gama) con qué incluye cada uno.
  3. Por qué los presupuestos son tan distintos.
  4. Qué cuesta más en los pisos de los años 60–70 (electricidad, tuberías, calefacción central, amianto antes de 1992, muros de carga, suelos originales, ventanas) con LOVINGCOLORS como ejemplo.
  5. Ejemplo de 80 m².
  6. Gastos que se olvidan.
  7. Bonus sin porcentajes.
  8. Plazos.
  9. 4 preguntas frecuentes.
  10. Llamada a la reforma (C4) o a la asesoría de compra (C3).
- Traducción al español y al inglés.
- `seoTitle` y `excerpt` (meta description) dentro de los límites.

**Archivos:** `content/news/{it,es,en}/costo-ristrutturazione-appartamento-bergamo.mdx`.

**De dónde salen las cifras:**
- Los rangos por nivel y las fuentes (Edilnet, costo-ristrutturazione-casa.it) son los recogidos en el brief en octubre de 2026, presentados como **datos de mercado** con fecha.
- El ejemplo de 80 m² es solo esa tabla multiplicada (80 × 1.200–1.800 €).
- **No se ha inventado ningún presupuesto por partidas:** el desglose está marcado como pendiente.

## Cómo verlo

Preview o `npm run dev` → http://localhost:3000/news/costo-ristrutturazione-appartamento-bergamo (y `/es/news/…`, `/en/news/…`). En producción no se publica mientras haya marcadores.

## Qué validar

**Martina: datos pendientes (4 por idioma)**
- [ ] Los rangos por m² que ve ella en Bergamo: confirmar, ajustar o sustituir los de mercado. La tabla no indica qué portal concreto da cada nivel; si los suyos son distintos, mejor usar los suyos.
- [ ] Un ejemplo por partidas (real con permiso, o tipo) para 80 m².
- [ ] Plazos orientativos para 70–90 m² (proyecto, trámites, obra).
- [ ] Rango orientativo para reformar solo un baño.

**Martina: contenido**
- [ ] La lista de lo que cuesta más en los pisos de los años 60–70, en especial el **amianto** en edificios anteriores a 1992 y la calefacción central coordinada con la comunidad.
- [ ] Que el texto sobre bonus sea suficientemente prudente.
- [ ] ¿Se compromete a actualizar las cifras cada año? (El campo `updated` refleja la fecha en el sitemap y en los datos estructurados.)

**Daniel**
- [ ] La tabla en móvil.
- [ ] Verificado en local el 10 oct: 200 en it/es/en; title correcto; 4 marcadores por idioma; una tabla; los enlaces a la guía C7 y a los servicios apuntan a `/news` y a `/servizi` mientras no estén publicados.

## Cómo mergear

Después de `feat/seo-fase-2-pr2` (necesita la protección de noticias con marcadores, `ec225b1`). Antes del merge, sustituir todos los `[DA CONFERMARE: …]`.
