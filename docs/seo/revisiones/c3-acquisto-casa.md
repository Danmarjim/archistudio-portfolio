# Revisión — `seo/c3-acquisto-casa`

Página de servicio **"Consulenza acquisto casa"**. Tiene su propia búsqueda y poca competencia local: en Bergamo solo aparecen agencias y un geometra. Brief: [`C3`](../briefs/C3-consulenza-acquisto-casa.md).

## Qué se ha hecho

- Texto completo en italiano (~925 palabras) en primera persona, con la estructura del brief:
  1. Introducción con las dos preguntas del comprador: ¿está en regla? ¿En qué se puede convertir y cuánto costará?
  2. Por qué antes de firmar (el papel del notario).
  3. Qué compruebo (documentos y visita).
  4. Potencial y coste de reforma, con el ejemplo LOVINGCOLORS.
  5. Cuándo hacerla (antes de la oferta, con la propuesta o antes de la escritura).
  6. Cómo funciona.
  7. Cuánto cuesta.
  8. Dónde.
  9. Quién soy.
  10. 6 preguntas frecuentes.
- Traducción al español ("Asesoría para comprar vivienda") y al inglés ("Home-buying consultancy").
- Ya incluye los datos confirmados: zonas (Bergamo, Milano, Monza e Brianza, Lombardía) y atención en el estudio con cita.
- El formulario se abre con "Consulenza acquisto" preseleccionado (`?tipo=home_purchase`).

**Archivos:** `content/services/{it,es,en}/consulenza-acquisto-casa.mdx`.

## Cómo verlo

- Preview de Vercel de la rama: `…/servizi/consulenza-acquisto-casa`, `…/es/servicios/…` y `…/en/services/…`.
- En local: `npm run dev` → http://localhost:3000/servizi/consulenza-acquisto-casa

## Qué validar

**Martina: datos pendientes (10 por idioma)**
- [ ] Precio o rango, qué incluye y qué no (tasas por consultar expedientes, regularizaciones) y si se descuenta de la reforma (aparece dos veces).
- [ ] ¿Hace ella el accesso agli atti en el Comune? ¿Quién paga los derechos?
- [ ] ¿Revisa certificados de instalaciones y APE?
- [ ] ¿La visita es con el cliente, con la agencia o sola? ¿El cliente tiene que estar?
- [ ] Cómo calcula la estimación del coste de reforma (rango por m², por partidas…).
- [ ] Qué entrega (informe escrito o llamada) y en cuántos días.
- [ ] Plazos habituales y cuánto los alarga el accesso agli atti.
- [ ] Número de colegiada.

**Martina: contenido**
- [ ] **El papel del notario:** el texto dice que el notario verifica la propiedad, las hipotecas y las declaraciones del vendedor, pero no comprueba en la casa que el estado real coincida con los proyectos y el catastro. Que lo confirme como profesional.
- [ ] **La condición suspensiva** en la propuesta de compra, ligada al resultado de la verificación técnica.
- [ ] Los ejemplos de irregularidades típicas (tabique sin permiso, veranda, baño, planimetría desactualizada).
- [ ] Traducciones.

**Daniel**
- [ ] Verificado en local el 10 oct: `tsc` y `build` sin errores; 200 en it/es/en con su title; 10 marcadores resaltados por idioma; el formulario se abre con `?tipo=home_purchase`.

## Pendiente para otras ramas

- Enlaces a ArchiAdvice y a la página de reforma: de momento apuntan al hub `/servizi` (para evitar 404); rama A4.
- Enlace desde la guía C8 (conformidad antes de comprar) cuando exista.
- Faltan 1–2 casos reales anonimizados y un testimonio: el brief los pide para dar confianza y no hay ningún marcador para ellos.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir todos los `[DA CONFERMARE: …]`.
