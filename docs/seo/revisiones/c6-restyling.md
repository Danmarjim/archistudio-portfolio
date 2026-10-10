# Revisión — `seo/c6-restyling`

Página de servicio **"Restyling casa"**. Brief: [`C6`](../briefs/C6-restyling-casa.md).

## Qué se ha hecho

- Texto completo en italiano (~1.150 palabras) en primera persona, con la estructura del brief:
  1. Introducción.
  2. Tabla "Restyling o ristrutturazione?".
  3. Para quién: casa que ya no te representa, alquiler, obra recién terminada, tiendas y oficinas.
  4. Las cinco palancas: color, luz, muebles, piezas a medida, textiles y alfombras.
  5. Caso CASA PEONIA.
  6. Restyling de una sola estancia, con las cocinas PARIGINA y MITE.
  7. Cómo funciona (5 pasos).
  8. Cuánto cuesta.
  9. Quién soy.
  10. 4 preguntas frecuentes.
- Traducción al español ("Restyling de casa sin obras") y al inglés ("Home restyling without building work").
- Enlace a la colección de alfombras Sevilla (`/tappeti`) como parte del restyling: es un recurso que no tiene ningún competidor.
- Ya incluye zonas (Lombardía) y atención en el estudio con cita.
- Formulario con "Restyling" preseleccionado.

**Archivos:** `content/services/{it,es,en}/restyling-casa.mdx`.

**De dónde sale el texto:** los públicos, del texto actual de `/servizi`; el caso y las cocinas, de las fichas de los proyectos; las alfombras, de `/tappeti`.

## Cómo verlo

- Preview de Vercel de la rama: `…/servizi/restyling-casa`, `…/es/servicios/…` y `…/en/services/…`.
- En local: `npm run dev` → http://localhost:3000/servizi/restyling-casa

## Qué validar

**Martina: datos pendientes (7 por idioma)**
- [ ] ¿Los suelos y revestimientos superpuestos cuentan como restyling? (está en la tabla)
- [ ] CASA PEONIA: duración, rango de presupuesto (si el cliente lo permite) y una frase del cliente.
- [ ] ¿Coordina ella pintores, carpinteros y montaje, o entrega el proyecto al cliente?
- [ ] Cómo calcula los honorarios (por estancia, por m², precio cerrado) y un rango.
- [ ] En qué casos avisa de que hace falta un trámite.
- [ ] Plazos habituales (una estancia y una casa entera).
- [ ] ¿Lleva restylings completos a distancia?

**Martina: contenido**
- [ ] La tabla restyling/reforma es correcta para ella.
- [ ] Mencionar las alfombras Sevilla dentro del restyling (y "se pueden hacer a medida y en los colores del proyecto").
- [ ] Las cocinas PARIGINA y MITE presentadas como restyling, como dicen sus fichas.
- [ ] Traducciones.

**Daniel**
- [ ] La tabla se lee bien en móvil (tiene scroll horizontal si hace falta).
- [ ] Verificado en local el 10 oct: `tsc` y `build` sin errores; 200 en it/es/en con su title; 7 marcadores resaltados por idioma; enlace a `/tappeti` localizado.

## Pendiente para otras ramas

- Enlaces a la reforma y a ArchiAdvice: de momento al hub `/servizi`; rama A4.
- Enlace desde la ficha de CASA PEONIA hacia esta página: rama A4.
- Fotos del antes de CASA PEONIA, cuando las tenga Martina.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir todos los `[DA CONFERMARE: …]`.
