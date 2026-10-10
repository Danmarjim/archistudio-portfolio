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

**Archivos:** `content/services/{it,es,en}/consulenza-architetto-online.mdx`; campo `price` en `src/types/index.ts`, `src/lib/services.ts`, `src/app/[locale]/servicios/[slug]/page.tsx`, `messages/*.json` (`ServicePage.price`) y `CLAUDE.md`.

**De dónde sale el texto:** las situaciones para las que sirve, del texto actual de `/servizi` y de la noticia de lanzamiento de ArchiAdvice; los ejemplos, de las fichas de los proyectos. Los ejemplos se presentan como "el tipo de decisiones que tomamos", **sin decir que esos proyectos empezaran con un ArchiAdvice**, porque no consta.

## Cómo verlo

- Preview de Vercel de la rama: `…/servizi/consulenza-architetto-online`, `…/es/servicios/…` y `…/en/services/…`.
- En local: `npm run dev` → http://localhost:3000/servizi/consulenza-architetto-online

## Qué validar

**Confirmado por Martina (10 oct), ya en el texto**
- [x] Precio: **100 € todo incluido** (Inarcassa 4 % y marca da bollo incluidos; IVA no aplicable). Se muestra como "Prezzo · 100 €" junto al título y como `Offer` en los datos estructurados (campo nuevo `price` para precios cerrados; `priceFrom` sigue mostrando "A partire da").
- [x] Plataforma: Google Meet.
- [x] Proceso: cuestionario en Calendly al reservar, fotos y planimetría por email (las instrucciones llegan tras la reserva), pago por PayPal o transferencia hasta 3 días antes (si no, se anula la cita), factura al terminar.

**Martina: datos pendientes (6 por idioma)**
- [ ] Qué recibe el cliente después de la llamada (resumen escrito, paleta, enlaces…). Es el mayor diferenciador según el brief. Hoy el texto dice "consigli pratici e nuovi punti di vista", como la descripción de Calendly.
- [ ] ¿El precio se descuenta de un proyecto posterior?
- [ ] ¿Reembolso si se anula después de pagar?
- [ ] ¿ArchiAdvice también en persona en el estudio de Bergamo?
- [ ] 1–2 ejemplos reales de consultas (problema → solución).
- [ ] Número de colegiada.

**Nota:** en la confirmación de Calendly se pide enviar las fotos a un email personal de hotmail. En la web no se publica ese email. Cuando exista el email de dominio (D8), conviene cambiarlo también en Calendly.

**Martina: contenido**
- [ ] El texto suena a ella; la lista de "qué puedes resolver" y la checklist de preparación son correctas.
- [ ] "Emetto regolare fattura": que lo confirme.
- [ ] Traducciones.

**Daniel**
- [ ] El botón de reserva abre Calendly; se ve bien en móvil.
- [ ] Verificado en local el 10 oct: `tsc`, `lint` y `build` sin errores; 200 en it/es/en con su title; 6 marcadores resaltados por idioma; precio "Prezzo / Precio / Price · 100 €" y `Offer` con `price: 100`.

## Pendiente para otras ramas

- Los enlaces a restyling, reforma y consulenza acquisto apuntan por ahora al hub `/servizi`, porque esas páginas aún no están publicadas y enlazarlas daría 404. Se cambian en la rama A4 cuando se publiquen.
- Enlace desde la noticia `/news/archiadvice-lancio` hacia esta página → rama A4.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes del merge, sustituir todos los `[DA CONFERMARE: …]`.
