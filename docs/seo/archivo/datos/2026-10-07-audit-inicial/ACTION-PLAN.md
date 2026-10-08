# Plan de acción SEO — mparchistudio.com

Auditoría: 2026-10-07 · SEO Health Score: **49/100** · Tipo: servicio profesional local (arquitecta, Bergamo + Sevilla)

Cada ítem: **qué** · dónde · cómo saber que funcionó.

## Fase 1 — Crítico (esta semana)

Dependencia: 1.1 desbloquea todo lo demás. Sin él, el resto de mejoras se atribuyen a `example.com`.

1. **Dominio real en `siteConfig.url`** · `src/lib/constants.ts:7` → `https://mparchistudio.com`. Arregla canonical, hreflang HTML, `og:url`, `metadataBase`, sitemap, robots.txt y el selector de idioma (hoy manda a usuarios reales a example.com).
   Verificación: `curl -s https://mparchistudio.com/robots.txt` muestra el dominio real; ningún `example.com` en el HTML de ninguna página.
2. **Canonical + hreflang por página** · quitar `alternates` estático de `src/app/[locale]/layout.tsx:68-75` y generarlo en cada `generateMetadata` con un helper path-aware (IT sin prefijo, `/es`, `/en`, `x-default`).
   Verificación: `/es/proyectos/casa-archi-colori` declara canonical a sí misma; HTML y cabecera `Link` coinciden.
3. **500 en rutas con punto** (`/favicon.ico`, `/llms.txt`, `/index.md`, `/ads.txt`) y en `/proyectos/cucina-mite` · añadir `src/app/not-found.tsx` raíz, renombrar `src/app/favicon.ico.ico` → `favicon.ico`, validar locale/slug en `[locale]` y devolver `notFound()`.
   Verificación: esas URLs devuelven 404 (o 200 si existen), nunca 500.
4. **Sitemap corregido** · `src/app/sitemap.ts`: sin `/it` (default sin prefijo), añadir `/news` + 6 artículos, `/tappeti`, alternates hreflang, `lastmod` real desde MDX, sin priority/changefreq. 39 → ~63 URLs.
   Verificación: 0 URLs con redirect en el sitemap; enviarlo en Search Console y ver "Correcto".
5. **Formulario de contacto desbordado en móvil** · `/contacto`, los inputs se salen por la derecha a 375 px.
   Verificación: captura móvil sin recorte.

## Fase 2 — Alto impacto (semanas 2–3)

6. **`<html lang>`** · `src/app/layout.tsx:18` con `getLocale()` de next-intl.
7. **Metadatos localizados y sin duplicados** · `sobre-mi`, `servicios`, `contacto` tienen `metadata` estático en español en su `layout.tsx` → `generateMetadata` + `getTranslations`. Eliminar sufijo manual `| MP_archistudio` (48/60 títulos lo duplican). Quitar "Madrid" de keywords; `authors` = Martina Pozzi.
8. **Home con marca + ubicación** · título tipo `Architetto a Bergamo – Martina Pozzi | MP_archistudio`, H1/meta con Bergamo; quitar "progetti commerciali".
9. **JSON-LD** · `@graph` sitewide (`ProfessionalService` + `Person` + `WebSite`, `sameAs` a 7 perfiles), `BreadcrumbList`, `Article` en news, `CreativeWork` en proyectos. Borradores listos en `findings/schema.md`.
10. **LCP móvil** · hero visible desde SSR (sin `opacity:0` de Framer Motion en above-the-fold); `priority` en las 2–4 primeras cards de `/proyectos`; `priority` solo en el elemento LCP real; ajustar `sizes`.
    Verificación: Lighthouse móvil LCP < 2.5 s en `/`, `/proyectos`, un proyecto.
11. **Google Business Profile** (tarea de Martina) · verificar que existe, categoría *Architetto*, NAP idéntico al sitio.
12. **Coherencia NAP** · Footer dice "Via Bologna, 24128"; contacto/privacy "Via Bologna 2, 24128 Bergamo". Decidir y unificar. Teléfono en footer global.

## Fase 3 — Contenido y autoridad (mes 2)

13. Página propia **ArchiAdvice** (y Consulenza acquisto) con precio visible, entregables, Calendly.
14. **Proyectos más ricos**: título con ubicación, estructura fija (encargo, soluciones, materiales, plazos, rango presupuesto, antes/después, cita cliente). Traducir títulos y usar `tCat()` en detalle.
15. **Señales E-E-A-T**: nº de colegiación (Ordine degli Architetti), cifra única de experiencia (10+ vs 15+), email de dominio, testimonios (Spazi Belli 5.0★/7), franja "Pubblicato su" (HOME, Cose di Casa, Archiboost).
16. **Guía de diseño de baño** en /news (la SERP de "progettazione bagno architetto" es 70 % guías).
17. **`public/llms.txt`** estático + `og:image` por página.
18. **Citations**: web en Archilovers, tile en Linktree, alta en PagineGialle, nombre comercial idéntico en todas.

## Fase 4 — Mantenimiento

19. Cabeceras de seguridad en `next.config.ts` (`headers()`, `poweredByHeader: false`).
20. Minúsculas forzadas en URLs (`/PROYECTOS` da 200); valorar slugs italianos con 301 una vez indexado lo anterior.
21. Touch targets: filtros `/proyectos` (36 px) e iconos sociales (20 px) → 44 px.
22. `/seo drift baseline https://mparchistudio.com` tras desplegar Fase 1, y comparar en cada release.
23. Configurar Search Console + API key de Google para datos de campo (CrUX/GSC).

## Indicadores a vigilar

- Search Console → Páginas indexadas (debería subir de ~0-3 a ~60 en 2–4 semanas tras Fase 1).
- Búsqueda de marca "mparchistudio" / "Martina Pozzi architetto": el sitio debe aparecer en top 3.
- Errores 5xx en Search Console → 0.
