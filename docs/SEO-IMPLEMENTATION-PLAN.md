# Plan de implementación SEO — mparchistudio

Basado en `docs/SEO-AUDIT-REPORT.md` (7 oct 2026, score 49/100). Objetivo: que el sitio se indexe bajo su dominio real, aparezca en búsquedas de marca y local, y mejore LCP móvil (< 2,5 s).

> Nota: este plan parte de lo que dice la auditoría. Antes de cada tarea, comprobar en el código que el problema sigue ahí (las referencias de línea pueden haber cambiado).

## Decisiones previas (bloquean tareas)

| # | Decisión | Bloquea | Propuesta |
|---|---|---|---|
| D1 | Dominio canónico: `mparchistudio.com` o `.it` (el ROADMAP menciona ambos) | F1-1 | Elegir uno como canónico; el otro con redirect 308 en Vercel |
| D2 | Dirección pública: ¿"Via Bologna 2" con número o sin él? | F2-5 | Un solo formato en sitio y perfiles |
| D3 | Colegio profesional (Bergamo o Monza e Brianza) y nº de colegiación | F3-3, JSON-LD `hasCredential` | Pedir a Martina |
| D4 | Años de experiencia: "más de 10" o "más de 15" | F2-3, F3-3 | Una sola cifra en todo el sitio |
| D5 | ¿Posicionar activamente el mercado de Sevilla? | páginas locales | Si sí: página/servicio ES; si no, dejarlo fuera de este plan |
| D6 | ¿Existe ya Google Business Profile? | F2-6 | Verificar en business.google.com |

## Fase 1 — Crítico (semana 1)

Orden estricto: 1 → 2 → 3 → 4. El punto 1 desbloquea todo lo demás.

**F1-1. URL real del sitio** · `src/lib/constants.ts:7`
- Sustituir `https://example.com` por el dominio de D1. Mejor: `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mparchistudio.com'` (el ROADMAP ya prevé esa variable en Vercel).
- Verificar: `grep -r example.com src/` vacío; HTML, robots.txt y sitemap sin `example.com`.

**F1-2. Canonical + hreflang por página** · `src/app/[locale]/layout.tsx:47, 68-75`
- Quitar `alternates` estáticos del layout.
- Crear helper `src/lib/seo.ts` → `buildAlternates(pathname, locale)` que devuelva `canonical`, `languages` (it sin prefijo, `/es`, `/en`) y `x-default`.
- Usarlo en el `generateMetadata` de cada página (home, proyectos, detalle, news, detalle news, sobre-mi, servicios, contacto, tappeti).
- Verificar: `/es/proyectos/casa-archi-colori` se autodeclara canonical; el HTML coincide con el header HTTP `Link`.

**F1-3. Eliminar los 500** · `src/middleware.ts:11`, falta `src/app/not-found.tsx`
- Crear `src/app/not-found.tsx` en la raíz.
- Renombrar `favicon.ico.ico` → `favicon.ico`.
- Llamar a `notFound()` para locale y slug inválidos (`/proyectos/cucina-mite`).
- Revisar el matcher del middleware para rutas con punto (`/llms.txt`, `/index.md`, `/ads.txt`).
- Verificar: `curl -I` a esas rutas devuelve 404 o 200, nunca 500.

**F1-4. Sitemap correcto** · `src/app/sitemap.ts`
- Sin `/it/...` (13 URLs redirigen), con las 21 URLs de news y `/tappeti`, `alternates.languages` por entrada y `lastModified` real desde el frontmatter MDX. De 39 a ~63 URLs.
- Verificar: 0 URLs con redirect; enviar a Search Console.

**F1-5. Formulario de contacto en móvil** · `/contacto`
- Corregir overflow horizontal a 375 px (revisar `min-w-0`, grid de 2 columnas sin breakpoint, anchos fijos).
- Verificar: captura a 375 px sin recortes.

**Hito F1:** deploy a producción y envío del sitemap en Search Console. Medir línea base.

## Fase 2 — Alto impacto (semanas 2-3)

**F2-1. `<html lang>`** · `src/app/layout.tsx:18` → `lang={await getLocale()}`.

**F2-2. Metadata localizada** · `layout.tsx` de `sobre-mi`, `servicios`, `contacto`
- Pasar de `metadata` estático (en español) a `generateMetadata` + `getTranslations({namespace:'Metadata'})`; añadir claves en `messages/{it,es,en}.json`.
- Quitar el sufijo manual de marca (48 de 60 títulos duplican `| MP_archistudio`); quitar `keywords` con "Madrid"; `authors` = Martina Pozzi.

**F2-3. Home con marca + ciudad** — título `Architetto a Bergamo – Martina Pozzi | MP_archistudio`, H1 y description coherentes (quitar "progetti commerciali"; cifra de experiencia según D4). Traducir es/en.

**F2-4. JSON-LD** · componente `src/components/seo/JsonLd.tsx`
- Global (layout): `@graph` con `ProfessionalService` (dirección según D2, teléfono, horario, P.IVA, `areaServed`) + `Person` (Martina C.M. Pozzi, Politecnico di Milano, `hasCredential` si D3) + `WebSite`, con `sameAs` (Instagram, LinkedIn, Pinterest, Houzz, Archilovers, Homify, Spazi Belli).
- `BreadcrumbList` en proyectos, news, sobre-mi, contacto; `Article` en news; `CreativeWork` en proyectos.
- `/sobre-mi` es Client Component: insertar el JSON-LD desde su `layout.tsx`.
- Verificar con Rich Results Test / validator de schema.org. No añadir FAQPage ni HowTo.

**F2-5. LCP móvil** (4,2 s en `/proyectos`, 3,1 s en `/`)
- Hero visible desde el primer render (sin `opacity:0` inicial de Framer Motion); animar solo bajo el pliegue.
- `priority` en las 2-4 primeras cards de `/proyectos` y en la imagen LCP de la home; quitar `priority` del resto (4 compiten).
- Ajustar `sizes` (~98 KiB desperdiciados).
- Verificar: Lighthouse móvil LCP < 2,5 s.

**F2-6. NAP coherente (D2)** — misma dirección en footer, contacto y privacidad; teléfono en el footer global.

**F2-7. Google Business Profile (D6)** — tarea de Martina: categoría *Architetto*, NAP idéntico.

## Fase 3 — Contenido y autoridad (mes 2)

**F3-1. Página ArchiAdvice / consulta de compra** — precio visible, qué se recibe, Calendly. Traducida.
**F3-2. Proyectos más ricos** — estructura fija (encargo, soluciones, materiales y proveedores, plazos, presupuesto, antes/después, cita del cliente); localidad en el título; títulos y categoría traducidos en es/en (hoy se ve la clave italiana "Cucine"). Meta: > 300 palabras.
**F3-3. Señales E-E-A-T** — colegiación (D3), una sola cifra de experiencia (D4), email del dominio en vez de hotmail, testimonios (Spazi Belli 5,0★), banda "Pubblicato su".
**F3-4. Guía de diseño de baño** en news, enlazando los tres proyectos de baños; enlaces internos news ↔ proyectos ↔ servicios; arreglar los `**` markdown visibles en el artículo Archiboost; añadir autor.
**F3-5. `public/llms.txt` estático** + `og:image` por página (generada con `opengraph-image` o la cover del proyecto).
**F3-6. Citaciones externas** — web en Archilovers, link en Linktree, alta en PagineGialle, mismo nombre comercial en todos los perfiles, `https://` en Homify.
**F3-7. Imágenes** — renombrar `placeholder.jpg` y `MP_ARCHISTUDIO LOGO S.png`; `alt="Progetto 1"` → nombre del proyecto.

## Fase 4 — Mantenimiento

- F4-1. Cabeceras de seguridad en `next.config.ts` (`headers()`: CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) y `poweredByHeader: false`. Probar la CSP con Vercel Analytics y Resend antes de forzarla.
- F4-2. Redirect de URLs con mayúsculas a minúsculas.
- F4-3. Touch targets ≥ 44 px (filtros de `/proyectos`, iconos sociales).
- F4-4. Search Console + CrUX para datos de campo; re-ejecutar la auditoría tras la Fase 1 y tras la Fase 3.
- F4-5 (opcional). Slugs italianos con 301, solo después de estabilizar los canonical.

## KPIs

- Páginas indexadas en Search Console: ~60 a 2-4 semanas del deploy de F1.
- Búsqueda de marca ("mparchistudio", "Martina Pozzi architetto"): top 3.
- Errores 5xx: 0. LCP móvil < 2,5 s. Score de la auditoría: de 49 a > 75.

## Orden de ejecución sugerido

1. Resolver D1 y desplegar F1-1 (5 min). 2. F1-2 a F1-5 en un PR. 3. F2-1 a F2-3 (cambios pequeños, un PR). 4. F2-4 y F2-5 por separado (más riesgo). 5. Fases 3 y 4 en iteraciones.
