# Revisión — `seo/llms-dinamico`

`llms.txt` (el resumen del sitio para buscadores con IA) pasa de archivo estático a generarse en el build desde el contenido. Hallazgo 1 del [audit del 10 oct](../archivo/datos/2026-10-10-audit-preview/FULL-AUDIT-REPORT.md).

## Qué se ha hecho

- `public/llms.txt` → `src/app/llms.txt/route.ts` (`force-static`: se genera una vez en el build, igual de rápido que un archivo).
- **Se genera desde el contenido:**
  - Servicios: solo los publicados, con título y descripción.
  - Proyectos: todos, con tipo, ciudad, m² y año.
  - Prensa: noticias con `source`, enlazadas al artículo original.
  - Guías y artículos: el resto de noticias.
  - En es/en, los enlaces a los servicios publicados.
- Las páginas con `[DA CONFERMARE]` no salen en producción, así que `llms.txt` **nunca apunta a una página inexistente**. Ya no hay que acordarse de actualizarlo a mano al publicar algo.
- Zona de trabajo actualizada: Lombardía y recepción con cita.

## Cómo verlo

`/llms.txt` en la preview o en local. En esta rama sola no hay servicios publicados (solo el enlace al hub); en `seo/preview-completa` salen los 4 servicios y las 2 guías.

## Qué validar

**Daniel**
- [ ] `/llms.txt` responde 200 con `text/plain`.
- [ ] Verificado en local el 10 oct: build y `tsc` sin errores; la ruta se genera como estática.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Independiente del resto.
