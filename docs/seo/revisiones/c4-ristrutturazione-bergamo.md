# Revisión — `seo/c4-ristrutturazione-bergamo`

Página de servicio **"Ristrutturazione appartamento a Bergamo"**, la búsqueda local con más intención de contratar y el servicio de mayor importe. Brief: [`C4`](../briefs/C4-ristrutturazione-appartamento-bergamo.md).

## Qué se ha hecho

- Texto completo en italiano (~1.270 palabras) en primera persona, siguiendo la estructura del brief:
  1. Introducción.
  2. Por qué una arquitecta y no una empresa "chiavi in mano".
  3. Proceso en 5 fases.
  4. Caso LOVINGCOLORS.
  5. Baño y cocina.
  6. Plazos, trámites y bonus.
  7. Cuánto cuesta.
  8. Dónde trabajo.
  9. Quién soy.
  10. 5 preguntas frecuentes.
  11. Contacto.
- Traducción al español ("Reforma de piso en Bérgamo") y al inglés ("Apartment renovation in Bergamo").
- `published: true` en la rama para que se vea en la preview. En producción no se publica mientras queden marcadores `[DA CONFERMARE]`.
- Enlaces internos: LOVINGCOLORS, los 3 baños, las 2 cocinas, las noticias de Cose di Casa y Homeadore, /chi-sono, /servizi y el formulario con "Ristrutturazione" preseleccionado.
- Al publicarse, `/servizi` enlaza automáticamente a la página y esta entra en el sitemap.

**Archivos:** `content/services/{it,es,en}/ristrutturazione-appartamento-bergamo.mdx`.

**De dónde sale el texto:** el proceso y los entregables vienen del texto actual de `/servizi`; el caso, de la ficha del proyecto LOVINGCOLORS; la biografía, de `CONTEXTO.md`. No se ha inventado ningún dato: lo que falta está marcado.

## Cómo verlo

- Preview de Vercel de la rama: `…/servizi/ristrutturazione-appartamento-bergamo`, `…/es/servicios/…` y `…/en/services/…`.
- En local: `npm run dev` → http://localhost:3000/servizi/ristrutturazione-appartamento-bergamo

Los datos pendientes salen **resaltados en amarillo**.

## Qué validar

**Martina: datos pendientes (7 por idioma)**
- [ ] ¿El sopralluogo es gratuito o de pago? Precio.
- [ ] LOVINGCOLORS: duración de la obra, rango de presupuesto (si el cliente lo permite) y una frase del cliente.
- [ ] Plazos típicos de un piso de 70–90 m² (proyecto y obra por separado).
- [ ] Cómo se calculan los honorarios (porcentaje, por fases o precio cerrado) y un rango orientativo.
- [x] Zonas: Bergamo y provincia, Milano, Monza e Brianza y toda Lombardía; recibe en el estudio con cita (confirmado el 10 oct).
- [ ] Número de colegiada.
- [ ] ¿Trabaja con empresas de confianza? ¿El cliente puede proponer la suya?
- [ ] Con cuánta antelación conviene contactarla.

**Martina: contenido**
- [ ] El texto suena a ella. Se ha pasado a primera persona ("io") y se han reescrito los 5 pasos que ya tenía.
- [ ] **Afirmaciones sobre normativa** (sección "Tempi, pratiche e bonus" y FAQ sobre el tabique): que mover tabiques suele requerir CILA y que la elección CILA/SCIA depende de la intervención. Que lo confirme como profesional.
- [ ] La FAQ "¿Puedo vivir en casa durante la obra?" refleja su experiencia.
- [ ] Traducciones al español e inglés.

**Daniel**
- [ ] Se ve bien en móvil y en escritorio, con los marcadores resaltados.
- [ ] El formulario se abre con "Ristrutturazione integrale" preseleccionado.
- [ ] `/servizi` enlaza a la página nueva.
- [ ] Verificado en local el 10 oct: `tsc` y `build` sin errores; 200 en it/es/en; title "Ristrutturazione appartamento a Bergamo | MP_archistudio"; 8 marcadores resaltados; con `VERCEL_ENV=production` la página no se genera.

## Pendiente para otras ramas

- Enlaces hacia esta página desde la home, la ficha de LOVINGCOLORS y la noticia de Cose di Casa → rama A4 (enlazado interno).
- Enlaces a las guías C11 (coste de la obra) y C7 (honorarios) en "Quanto costa": ya añadidos; mientras no se publiquen, apuntan a `/news`.
- Fotos del antes de LOVINGCOLORS, cuando Martina las tenga.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir todos los `[DA CONFERMARE: …]` por los datos (o quitar la frase). Si queda alguno, la página no sale en producción.
