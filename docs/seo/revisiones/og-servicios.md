# Revisión — `seo/og-servicios`

Imagen para redes sociales (`og:image`, la que sale al compartir el enlace en WhatsApp, Facebook o LinkedIn) propia en cada página de servicio. Hallazgo 4 del [audit del 10 oct](../archivo/datos/2026-10-10-audit-preview/FULL-AUDIT-REPORT.md): todas usaban la imagen por defecto.

## Qué se ha hecho

- Cada página de servicio usa como imagen social la **portada del primer proyecto relacionado**:
  - Reforma → LOVINGCOLORS.
  - ArchiAdvice → bagno ITALIAN SUMMER.
  - Compra de vivienda → LOVINGCOLORS.
  - Restyling → CASA PEONIA.
- La misma imagen se añade al `Service` de los datos estructurados.
- Las guías no se tocan: ya usaban su portada.

**Archivo:** `src/app/[locale]/servicios/[slug]/page.tsx`. Para cambiar la imagen de un servicio basta con cambiar el orden de `relatedProjects` en su MDX.

## Qué validar

**Martina**
- [ ] La imagen de cada servicio al compartirlo (en la preview completa).

**Daniel**
- [ ] Verificado en la integración el 10 oct: `og:image` distinta en cada servicio.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Solo se nota cuando haya servicios publicados.
