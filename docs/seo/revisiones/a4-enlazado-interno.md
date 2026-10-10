# Revisión — `seo/a4-enlazado-interno`

Enlaces internos hacia las páginas de servicio, para que reciban visitas y autoridad desde los proyectos y las noticias. Tarea A4 de [`PLAN.md`](../PLAN.md).

## Qué se ha hecho

- **Fichas de proyecto → su servicio.** Bajo las etiquetas de cada proyecto, un enlace "Scopri il servizio: …":
  - Reforma integral y baños → reforma de piso en Bergamo (C4).
  - Restyling y cocinas → restyling (C6), porque las fichas de las cocinas las describen como restyling.
  - **Solo aparece si el servicio está publicado**, así que nunca enlaza a una página inexistente.
  - La asignación está en `src/lib/services.ts` (`SERVICE_BY_PROJECT_CATEGORY`).
- **Noticias → servicio**, en it/es/en:
  - Cose di Casa y Homeadore (LOVINGCOLORS, Bergamo): "Vuoi ristrutturare un appartamento a Bergamo? Scopri come lavoro" → C4.
  - HOME n.36 y Homeadore (Casa Archi & Colori, Milano): "Stai pensando a una ristrutturazione completa?" → C4.
  - Lanzamiento de ArchiAdvice: "Prenota il tuo slot" → C2 (antes decía "dalla pagina Servizi", sin enlace).
- **Lombardia** añadida a `areaServed` en los datos estructurados de las páginas de servicio. La ficha del negocio ya la tenía.

Relacionado, en otras ramas:
- En la base: un enlace a un servicio todavía no publicado apunta al hub `/servizi`, así que nunca da 404.
- En cada rama de servicio: los enlaces entre servicios ya son directos (C2 ↔ C3 ↔ C4 ↔ C6).

**Archivos:** `src/lib/services.ts`, `src/app/[locale]/proyectos/[slug]/page.tsx`, `src/components/sections/ProjectDetail.tsx`, `src/app/[locale]/servicios/[slug]/page.tsx`, `messages/*.json` (`ProjectDetail.serviceLink`), `content/news/{it,es,en}/` (5 noticias).

## Cómo verlo

En la preview de `seo/preview-completa`, donde los servicios están publicados:
- `/progetti/appartamento-lovingcolors` → enlace a la reforma.
- `/progetti/cucina-mite` → enlace al restyling.
- `/news/archiadvice-lancio` → enlace a ArchiAdvice.

En esta rama sola los enlaces de proyecto no aparecen y los de las noticias van al hub, porque aún no hay servicios publicados.

## Qué validar

**Martina**
- [ ] La asignación de proyecto a servicio, sobre todo las **cocinas → restyling** y los **baños → reforma**.
- [ ] Las frases añadidas al final de las noticias de prensa.

**Daniel**
- [ ] El enlace del proyecto se ve bien en móvil y en escritorio.

## Cómo mergear

Después de `feat/seo-fase-2-pr2`. Se puede mergear antes que las páginas de servicio: mientras no estén publicadas, los enlaces no aparecen o apuntan al hub.
