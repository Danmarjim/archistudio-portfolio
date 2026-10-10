# Revisión — `seo/mensajes-cliente`

Páginas más ligeras (A3 del [plan de la fase 3](../PLAN-FASE-3.md), hallazgo 5 del audit). Cada página enviaba al navegador **todos los textos de la web** (29 grupos, en el idioma de la página), aunque la mayoría solo se usan en el servidor o en otras páginas.

## Qué se ha hecho

- El layout raíz pasa al navegador solo los textos de los componentes de cliente comunes: cabecera, pie, selector de idioma, tarjetas de proyecto y bloques de la home (`GLOBAL_CLIENT_NAMESPACES` en `src/lib/clientMessages.ts`). De `ServiciosPage` solo pasa la clave que usa el menú.
- Cada sección añade los suyos en su layout con `ClientMessages`:

| Sección | Textos añadidos |
|---|---|
| `/servizi` | ServiciosPage |
| `/chi-sono` | SobreMiPage |
| `/tappeti` | TappetiPage |
| `/contatti` | ContactPage |
| `/progetti` | ProjectsPage, ProjectDetail, ProjectStatus (layout nuevo) |
| `/news` | NewsPage (layout nuevo) |

- Fuera del navegador quedan, entre otros, `Metadata`, `Hero`, `HowIWork`, `WorkArea`, `ServicePage` y `Press`: los usan componentes de servidor.

**Archivos:** `src/lib/clientMessages.ts`, `src/components/i18n/ClientMessages.tsx` (nuevos), `src/app/[locale]/layout.tsx`, los layouts de `servicios`, `sobre-mi`, `tappeti`, `contacto` y los nuevos de `proyectos` y `news`.

**Si un componente de cliente nuevo usa otro grupo de textos**, hay que añadirlo a `GLOBAL_CLIENT_NAMESPACES` (si sale en varias páginas) o al layout de su sección. Si se olvida, el build avisa con `MISSING_MESSAGE`.

## Resultado (preview completa, local, 10 oct)

| Página | Antes (gzip) | Ahora (gzip) |
|---|---|---|
| Home | 31 KB | 25 KB |
| Reforma Bergamo | 34 KB | 29 KB |
| Guía de costes | 27 KB | 21 KB |
| Progetti | 29 KB | 22 KB |

Build sin `MISSING_MESSAGE`; comprobado en Chrome: contacto (formulario), progetti (filtros), ficha de proyecto, news (filtros), chi sono y el menú "Servizi" en español, sin textos sin traducir ni errores de consola.

## Qué validar

**Daniel**
- [ ] Navegar la preview en los tres idiomas: menú, formulario de contacto, filtros de proyectos y noticias.
- [ ] Speed Insights tras el merge: LCP de servicios y guías.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Antes de mergear, repetir el build sobre la rama que se vaya a publicar: si alguna rama añade un componente de cliente con textos nuevos, el build lo detecta.
