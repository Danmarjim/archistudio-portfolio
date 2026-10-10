# Revisión — `seo/c13-progettare-cucina`

Guía **"Progettare la cucina: i consigli di un'architetta (con cucine reali)"** en `/news/progettare-la-cucina-consigli-architetto`. Es la guía gemela de C9 (baño): misma estructura y mismo tono. Brief: [`C13`](../briefs/C13-progettare-la-cucina.md).

## Qué se ha hecho

- Guía en italiano (~1.210 palabras) en primera persona, con la estructura del brief:
  1. Respuesta directa: se parte de cómo se usa la cocina.
  2. Cómo la usas: quién cocina, para cuántos, qué guardar, dónde se come.
  3. Tabla de medidas de referencia, adaptadas a la persona.
  4. Qué forma elegir (lineal, en L, en U, península, isla) y el triángulo de trabajo.
  5. **Cocina pequeña o irregular**: caso de Cucina MITE (columnas a medida, lavavajillas y horno recolocados, resina sobre el suelo existente, espejos).
  6. **Renovar sin cambiarlo todo**: Cucina PARIGINA y la cocina conservada de CASA PEONIA.
  7. **Abrir la cocina al salón**: LOVINGCOLORS (puerta corredera de hierro y vidrio) y Casa Archi & Colori.
  8. El color en la cocina.
  9. Errores más comunes.
  10. 3 preguntas frecuentes.
- Traducción al español y al inglés.
- Galería con 4 fotos (MITE y PARIGINA). La portada es de Cucina MITE.
- Enlaces internos:
  - a 5 proyectos;
  - a los servicios C6, C4 y C2 (si no están publicados, van a `/servizi`);
  - a la guía C9 (si no está publicada, va a `/news`);
  - a contacto.

**Archivos:** `content/news/{it,es,en}/progettare-la-cucina-consigli-architetto.mdx`.

**De dónde salen los datos:**
- **Los casos**: de las fichas de los proyectos.
- **Las medidas**: son las de referencia habituales en las guías del sector, no de Martina.
- **Sin precios**: el brief no los pide. Los costes de obra están en C11.

**Pendiente para el final de la fase 2:**
- Los enlaces **hacia** esta guía desde las 2 fichas de cocina y desde C4.
- El enlace desde aquí a las guías de color (C10/C14), cuando existan.

## Cómo verlo

Preview de `seo/preview-completa` o `npm run dev` → http://localhost:3000/news/progettare-la-cucina-consigli-architetto. En producción no se publica mientras haya marcadores.

## Qué validar

**Martina: datos pendientes (3 por idioma)**
- [ ] Sus medidas de referencia, y si las adapta a la altura del cliente.
- [ ] ¿Trabaja con carpinteros para las cocinas a medida o con tiendas de cocinas?
- [ ] Duración típica de un restyling de cocina.
- [ ] (Opcional) Fotos del antes de Cucina MITE y Cucina PARIGINA.

**Martina: contenido**
- [ ] Descripción de los casos. El texto está en primera persona ("ho disegnato"), mientras que las fichas dicen "abbiamo".
- [ ] Afirmaciones profesionales: cambiar los muebles no requiere trámite; mover tabiques o abrir la cocina, normalmente sí; si el muro es de carga hace falta un proyecto estructural.
- [ ] Traducciones.

**Daniel**
- [ ] Verificado en local el 10 oct: 200 en it/es/en; title correcto; 9 H2, 1 tabla y 3 marcadores por idioma; build y `tsc` limpios.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir todos los `[DA CONFERMARE: …]`. Conviene publicarla junto con C9, porque se enlazan entre sí.
