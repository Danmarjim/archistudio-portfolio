# Revisión — `seo/b4-testimonios`

Sección de testimonios **lista y oculta** (B4 del [plan de la fase 3](../planes/fase-3.md)): aparece sola cuando haya testimonios con permiso. Hoy no hay ninguno, así que **la web no cambia**.

## Qué se ha hecho

- **Dónde van los testimonios:** un archivo por testimonio en `content/testimonials/`, copiando la plantilla [`_esempio.md`](../../../content/testimonials/_esempio.md) (los archivos que empiezan por `_` no se publican). El texto original del cliente va en el cuerpo; en el frontmatter, el nombre tal como acepta aparecer, el tipo de trabajo y la ciudad en cada idioma, la página de servicio, el proyecto (opcional), dónde dejó la reseña (opcional) y la traducción para `/es` y `/en` (opcional).
- **Cuándo se ve:**
  - Solo con `consent: true` (permiso escrito) y `published: true`. En producción, nunca con `[DA CONFERMARE]`.
  - **Home:** sección "Dicono di me" entre los proyectos destacados y la zona de trabajo, **a partir de 2 testimonios**.
  - **Páginas de servicio:** los testimonios de ese servicio (campo `service`), después de los proyectos relacionados, desde 1.
  - En `/es` y `/en`, si hay traducción, se muestra con el aviso "Traducido del italiano"; si no, el original con su idioma marcado (`lang`).
- Enlace a la ficha del proyecto si el testimonio lo indica.
- **Sin datos estructurados `Review`:** Google no muestra estrellas para las reseñas que un negocio publica sobre sí mismo. Las reseñas con estrellas vienen de la ficha de Google.
- Componente de servidor: no añade JavaScript.

**Archivos:** `src/lib/testimonials.ts`, `src/components/sections/Testimonials.tsx` (nuevos), `src/app/[locale]/page.tsx`, `src/app/[locale]/servicios/[slug]/page.tsx`, `src/types/index.ts`, `messages/*.json` (`Testimonials`), `content/testimonials/_esempio.md`.

**Verificado (10 oct)** con testimonios de prueba, borrados después: la home los muestra con 2 y no con 1; cada servicio muestra solo los suyos; uno sin permiso no sale; en `/es` sale la traducción con su aviso; accesibilidad 100 en Lighthouse.

## Qué validar

**Martina**
- [ ] Los 2–3 testimonios, con **permiso escrito** para publicarlos y el nombre tal como quiere cada cliente aparecer (p. ej. "Laura B."). Ideal: uno de reforma, uno de restyling y uno de ArchiAdvice.

**Daniel**
- [ ] Al recibirlos: un archivo por testimonio desde `_esempio.md`, y comprobar la home y la página del servicio en la preview.

## Cómo mergear

Sale de `seo/a3-home` (la sección va en la home nueva): mergear **después de `seo/a3-home`**. Sin conflictos con el resto de ramas en `preview/seo-completa`.
