# Revisión — `seo/c2-consulenza-online`

Página de servicio **"Consulenza architetto online" (ArchiAdvice)**. Es el servicio que se vende en toda Italia y se reserva al momento por Calendly: el contacto más rápido de conseguir. Brief: [`C2`](../briefs/C2-consulenza-architetto-online.md).

## Qué se ha hecho

- Texto completo en italiano (~950 palabras) en primera persona, con la estructura del brief:
  1. Introducción.
  2. Qué se puede resolver en una hora.
  3. Cómo funciona (4 pasos).
  4. Cuánto cuesta.
  5. Qué recibes.
  6. Ejemplos de proyectos.
  7. Cuándo no basta una hora.
  8. Cómo prepararla.
  9. Quién soy.
  10. 5 preguntas frecuentes.
- Traducción al español ("Asesoría de arquitecta online") y al inglés ("Online architect consultation").
- `published: true` en la rama para la preview. En producción no se publica mientras queden marcadores.
- Botón de reserva a Calendly arriba y al final; proyectos relacionados: ITALIAN SUMMER, LOVINGCOLORS y CASA PEONIA.

**Archivos:** `content/services/{it,es,en}/consulenza-architetto-online.mdx`.

**De dónde sale el texto:** las situaciones para las que sirve, del texto actual de `/servizi` y de la noticia de lanzamiento de ArchiAdvice; los ejemplos, de las fichas de los proyectos. Los ejemplos se presentan como "el tipo de decisiones que tomamos", **sin decir que esos proyectos empezaran con un ArchiAdvice**, porque no consta.

## Cómo verlo

- Preview de Vercel de la rama: `…/servizi/consulenza-architetto-online`, `…/es/servicios/…` y `…/en/services/…`.
- En local: `npm run dev` → http://localhost:3000/servizi/consulenza-architetto-online

## Qué validar

**Martina: datos pendientes (9 por idioma)**
- [ ] **Precio** de la consulta, qué incluye y si se descuenta de un proyecto posterior. El precio es lo que más pesa: 3 de cada 4 resultados de esta búsqueda lo muestran. Con el precio se rellena también `priceFrom`, que lo muestra junto al título y lo añade a los datos estructurados.
- [ ] Qué recibe el cliente después: resumen escrito, paleta, enlaces… Es el mayor diferenciador según el brief.
- [ ] Con cuánta antelación y por qué medio hay que enviar fotos y medidas.
- [ ] Plataforma de la videollamada.
- [ ] 1–2 ejemplos reales de consultas (problema → solución).
- [ ] Política de cambio y cancelación de cita.
- [ ] ¿Se puede hacer en persona en Bergamo?
- [ ] Número de colegiada.

**Martina: contenido**
- [ ] El texto suena a ella; la lista de "qué puedes resolver" y la checklist de preparación son correctas.
- [ ] "Emetto regolare fattura": que lo confirme.
- [ ] Traducciones.

**Daniel**
- [ ] El botón de reserva abre Calendly; se ve bien en móvil.
- [ ] Verificado en local el 10 oct: `tsc` y `build` sin errores; 200 en it/es/en con su title; 9 marcadores resaltados por idioma; JSON-LD `Service` correcto.

## Pendiente para otras ramas

- Los enlaces a restyling, reforma y consulenza acquisto apuntan por ahora al hub `/servizi`, porque esas páginas aún no están publicadas y enlazarlas daría 404. Se cambian en la rama A4 cuando se publiquen.
- Enlace desde la noticia `/news/archiadvice-lancio` hacia esta página → rama A4.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir todos los `[DA CONFERMARE: …]` y añadir `priceFrom` en el frontmatter de los tres idiomas.
