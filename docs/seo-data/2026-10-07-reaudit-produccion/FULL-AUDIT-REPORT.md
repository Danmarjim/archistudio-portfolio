# Re-auditoría SEO — mparchistudio.com (producción, tras merge de feat/seo-improvements)

Fecha: 2026-10-07 · Deploy: 7f2f27f · Datos: laboratorio (Lighthouse 13.5 local, Playwright, WebSearch). Sin GSC/CrUX.

## SEO Health Score: 49 → 80/100

| Categoría | Peso | Antes | Ahora |
|---|---|---|---|
| Technical SEO | 22% | 38 | 92 |
| Content Quality | 23% | 52 | 67 |
| On-Page SEO | 20% | 55 | 90 |
| Schema | 10% | 8 | 74 |
| Performance (CWV) | 10% | 90 | ~88 (ruido de laboratorio) |
| AI Search Readiness | 10% | 42 | 63 |
| Images | 5% | 68 | ~72 |

Auxiliares: Local 24→42 · SXO 47→61 · Lighthouse Agentic Browsing 3/3 · Agent-UX 100 · Sitemap 11/12 resueltos.

## Pendiente — código (sin depender de la clienta)
1. Avatar de la home (`Hero.tsx`, `placeholder.jpg`) es el elemento LCP móvil y no tiene fetchPriority=high; renombrar archivo.
2. JSON-LD: logo en ProfessionalService (image = foto de proyecto); author/publisher de Article solo @id cross-script → inline name/logo o @graph único; description del negocio en italiano en es/en; Person.url → /sobre-mi; añadir geo, Siviglia/Milano en areaServed, award (Piranesi Prix de Rome 2009), Service por cada servicio.
3. Breadcrumbs con título SEO completo → etiqueta corta de navegación.
4. 6/8 meta descriptions de proyecto son eslóganes → campo `description` (ya existe).
5. Clave huérfana `AboutPage.intro` "oltre 10 anni" en messages/*.json (va en el payload).
6. Enlaces internos: news de prensa → proyecto; proyectos → servicios/contacto.
7. Formulario de contacto: tipos "Villa unifamiliare/Progetto commerciale" no casan con servicios.
8. Ciudades inconsistentes en títulos ES/EN (Milán vs Milano).
9. `sizes` de galería/cards (79–103 KiB desperdiciados en móvil).
10. llms.txt: proyectos, prensa, perfiles sincronizados con sameAs, páginas es/en.
11. CSP (probar con Analytics/Calendly). Opcional: quitar priority/changefreq; opacity:0 restante bajo el pliegue.

## Pendiente — Martina
- Nº de colegiación (Ordine Monza e Brianza según el albo público) + hasCredential.
- H1 de la home con Bergamo (decisión de copy).
- Página ArchiAdvice / Consulenza acquisto con precio.
- Proyectos más ricos, guía de baño, testimonios (Spazi Belli 5,0★).
- Email de dominio, horarios, Google Business Profile, PagineGialle, nombre comercial único en perfiles, web en Archilovers/Linktree.

## Siguiente paso operativo
Enviar sitemap en Search Console + solicitar indexación de la home. La búsqueda de marca aún no muestra el sitio (Google conserva el canonical a example.com); revisar en 1–3 semanas. Baseline de drift guardada para comparar en próximos deploys.

Detalle: findings/*.md (comparativa por hallazgo), screenshots/.
