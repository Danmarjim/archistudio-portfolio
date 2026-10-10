# CLAUDE.md — Contexto del Proyecto

Este archivo proporciona contexto para el desarrollo del portfolio de arquitectura MP_archistudio.

## Resumen

Portfolio web profesional para una arquitecta independiente (Martina Pozzi). Sitio minimalista que prioriza la presentación visual de proyectos, con soporte completo de internacionalización en **italiano** (predeterminado), **español** e **inglés**.

## Stack Tecnológico

- **Next.js 16.1** — App Router, generateStaticParams, Server/Client Components
- **React 19** — UI
- **TypeScript 5** — tipado estricto
- **Tailwind CSS 4** — `@theme inline`, sin `tailwind.config.ts`
- **Framer Motion 12** — animaciones (solo en Client Components)
- **next-intl 4.7** — i18n, locales: `it` (default), `es`, `en`
- **gray-matter 4** — parsing frontmatter MDX en `lib/projects.ts` y `lib/news.ts`

## SEO

Estado y pendientes en `docs/seo/ESTADO.md` (punto de entrada); detalle en `docs/seo/PLAN.md`; comandos `/seo` ya ejecutados en `docs/seo/REGISTRO-COMANDOS.md`. Mantener `ESTADO.md` al día al cerrar cada tarea.

## Comandos Frecuentes

```bash
npm run dev        # Desarrollo en localhost:3000
npm run build      # Build producción (verificar antes de push)
npm run lint       # ESLint
git add -A && git commit -m "..." && git push   # Deploy (Vercel auto-deploy)
```

## Estructura de Contenido

```
content/
├── projects/
│   ├── it/      # Italiano — fuente canónica y fallback
│   ├── es/      # Español
│   └── en/      # Inglés
└── news/
    ├── it/      # Italiano — fuente canónica y fallback
    ├── es/      # Español
    └── en/      # Inglés

messages/
├── it.json      # Textos UI en italiano
├── es.json      # Textos UI en español
└── en.json      # Textos UI en inglés
```

### Proyectos actuales (slugs)

- `casa-archi-colori`
- `appartamento-lovingcolors`
- `restyling-casa-peonia`
- `bagno-italian-summer`
- `bagno-casa-peonia`
- `bagno-casa-archi-colori`
- `cucina-parigina`
- `cucina-mite`

### Noticias actuales (slugs)

- `il-colore-nell-architettura`
- `archiadvice-lancio`
- `cose-di-casa-ottobre-2022`

## Internacionalización (i18n)

### Reglas fundamentales

- Los valores internos de `category`, `status`, `client` en MDX **siempre en italiano** (son claves de lookup)
- Los textos del cuerpo, `title`, `excerpt`, `tags` se traducen en cada locale MDX
- UI strings en `messages/{locale}.json`

### Patrón en Server Components (páginas)

```typescript
import { getTranslations } from 'next-intl/server'

const t = await getTranslations({ locale, namespace: 'NewsPage' })
```

### Patrón en Client Components

```typescript
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

const t = useTranslations('ProjectCategories')
const locale = useLocale()
```

### Traducción de categorías con fallback seguro

```typescript
const tCat = useTranslations('ProjectCategories')
// Si la clave no existe, muestra el valor original
tCat(project.category, { defaultValue: project.category })
```

### Fechas locale-aware

```typescript
const localeStr = locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-GB' : 'it-IT'
new Date(dateStr).toLocaleDateString(localeStr, { day: 'numeric', month: 'long', year: 'numeric' })
```

### Secciones en messages/*.json

| Namespace | Uso |
|-----------|-----|
| `Hero` | Sección hero homepage |
| `AboutPreview` | Preview about en homepage |
| `ServicesPreview` | Preview servicios en homepage |
| `FeaturedProjects` | Proyectos destacados en homepage |
| `ProjectsPage` | Página /proyectos |
| `ProjectDetail` | Página /proyectos/[slug] |
| `ProjectCategories` | Labels de categorías (Cucine, Bagni...) |
| `ProjectStatus` | Labels de estado (Realizzato, Privato...) |
| `NewsPage` | Páginas /news y /news/[slug] |
| `ServicesData` | Títulos de servicios (para Header dropdown) |
| `ServiciosPage` | Página /servicios |
| `AboutPage` | Página /sobre-mi |
| `ContactPage` | Formulario /contacto |
| `Footer` | Footer |
| `Navigation` | Header + navegación |
| `Metadata` | SEO metadata |

## Carga de Proyectos (`lib/projects.ts`)

- Lee archivos MDX de `content/projects/{locale}/`
- Fallback automático a `it` si el locale no existe
- **Auto-descubre imágenes** escaneando `public/images/projects/` por prefijo slug
- Analiza dimensiones JPEG/PNG con lectura binaria (sin librerías externas)
- Deduplica imágenes por hash MD5 (evita duplicados con contenido idéntico)
- Ordena: Ristrutturazione integrale > Restyling > resto, luego por año desc

```typescript
// Siempre usar getProjectBySlug con locale
const project = getProjectBySlug(slug, locale)
```

## Convenciones de Código

### Componentes

- PascalCase para nombres de archivos y componentes
- Un componente por archivo
- Props tipadas con `interface`
- `export default` siempre
- `'use client'` solo cuando se usan hooks o eventos del browser

### Imports

```typescript
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
```

### Estilos

- Tailwind CSS exclusivamente (sin CSS modules, sin estilos inline)
- `cn()` de `lib/utils` para clases condicionales
- Mobile-first responsive

### Imágenes

```typescript
import Image from 'next/image'
// NUNCA usar <img> nativo
<Image src={src} alt={alt} fill className="object-cover" sizes="..." />
```

### Animaciones (Framer Motion)

```typescript
// Solo en componentes con 'use client'
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>
```

## Frontmatter MDX — Proyectos

```yaml
title: "Nombre del Proyecto"
category: "Cucine"            # EN ITALIANO — clave de lookup
location: "Bergamo"
year: 2022
client: "Privato"             # EN ITALIANO — clave de lookup
surface: "8.20 m²"
status: "Realizzato"          # EN ITALIANO — clave de lookup
featured: false
coverImage: "/images/projects/slug-01.jpg"
images:                       # Opcional — si vacío, auto-descubre por prefijo slug
  - "/images/projects/slug-01.jpg"
excerpt: "Descripción breve..."     # También se muestra bajo el H1
description: "Meta description SEO"   # Opcional: tipo de obra, ciudad, m², año (≤160 car.). Si falta, se usa excerpt
updated: "2026-10-08"                 # Opcional: última modificación relevante → lastmod del sitemap
tags:
  - tag1
  - tag2
```

## Páginas de servicio (`content/services/{locale}/{slug}.mdx`)

Una página por servicio (`/servizi/consulenza-architetto-online`, `…/consulenza-acquisto-casa`, `…/restyling-casa`, `…/ristrutturazione-appartamento-bergamo`). Solo existen las que tienen `published: true` en el MDX **italiano**: hasta entonces no se generan, no van al sitemap y el hub `/servizi` no las enlaza. El texto se completa siguiendo el brief indicado en cada archivo (`docs/seo/briefs/`).

```yaml
title: "H1 de la página"
seoTitle: "Title ≤ 43 car."          # el código añade " | MP_archistudio"
description: "Meta description ≤ 150 car."
serviceKey: "restyling"              # clave en ServicesData / hub /servizi
serviceType: "Restyling d'interni"   # schema.org Service
published: false
cta: "contact"                       # "calendly" | "contact"
contactProjectType: "restyling"      # preselección del formulario (?tipo=)
relatedProjects: [restyling-casa-peonia]
price: 100                           # opcional: precio cerrado ("Prezzo") → Offer en el JSON-LD
priceFrom: 120                       # opcional → Offer en el JSON-LD ("A partire da")
```

## Frontmatter MDX — Noticias

```yaml
title: "Título del artículo"
date: "2026-04-18"
category: "riflessioni"       # EN ITALIANO: pubblicazioni | riflessioni | annunci | interviste
coverImage: "/images/news/cover.jpg"
imagePosition: "center 32%"   # Opcional
imageAspect: "portrait"       # Opcional
excerpt: "Resumen..."
source: "Nombre publicación"  # Opcional
sourceUrl: "https://..."      # Opcional
images:                       # Opcional — galería adicional
  - "/images/news/pagina-1.jpg"
seoTitle: "Title ≤ 43 car."   # Opcional — si el título del artículo es largo
updated: "2026-10-08"         # Opcional — dateModified y lastmod del sitemap
```

El cuerpo de las noticias es **Markdown completo** (`##`, listas, tablas, citas, enlaces; los enlaces internos con ruta interna, p. ej. `/proyectos/slug`).

## Configuración Vercel (`next.config.ts`)

```typescript
// CRÍTICO: sin esto, public/images/ se incluye en cada Lambda → 250 MB+
outputFileTracingExcludes: {
  '*': ['public/**'],
}
```

`lib/projects.ts` escanea `public/images/projects/` con `fs.readdirSync`. El file tracer de Next.js incluiría todas las fotos en cada serverless function sin esta exclusión.

## Páginas y Rutas

Las carpetas de `app/[locale]` usan el slug interno (español); la URL pública se traduce por idioma con `pathnames` en `src/i18n/routing.ts`. Italiano sin prefijo.

| Ruta interna | IT | ES | EN | Archivo |
|---|---|---|---|---|
| `/` | `/` | `/es` | `/en` | `app/[locale]/page.tsx` |
| `/proyectos` | `/progetti` | `/es/proyectos` | `/en/projects` | `app/[locale]/proyectos/page.tsx` |
| `/proyectos/[slug]` | `/progetti/[slug]` | `/es/proyectos/[slug]` | `/en/projects/[slug]` | `app/[locale]/proyectos/[slug]/page.tsx` |
| `/servicios` | `/servizi` | `/es/servicios` | `/en/services` | `app/[locale]/servicios/page.tsx` (server) + `ServiciosContent.tsx` (client) |
| `/servicios/[slug]` | `/servizi/[slug]` | `/es/servicios/[slug]` | `/en/services/[slug]` | `app/[locale]/servicios/[slug]/page.tsx` |
| `/sobre-mi` | `/chi-sono` | `/es/sobre-mi` | `/en/about` | `app/[locale]/sobre-mi/page.tsx` |
| `/contacto` (Client) | `/contatti` | `/es/contacto` | `/en/contact` | `app/[locale]/contacto/page.tsx` |
| `/news`, `/news/[slug]`, `/tappeti`, `/privacy` | igual en los tres idiomas | | | `app/[locale]/…` |

- Enlaces internos: siempre `Link` de `@/i18n/navigation` con la ruta **interna** (`href="/contacto"`). Rutas dinámicas con los helpers de `@/lib/routes` (`projectHref`, `newsHref`, `serviceHref`).
- Sin redirección por idioma del navegador (`localeDetection: false`): cada URL muestra siempre su idioma.
- SEO (`buildMetadata`, `buildBreadcrumb`, sitemap) recibe también la ruta interna; `src/lib/seo.ts` la traduce.
- Las URLs antiguas (`/proyectos`, `/servicios`… en IT y EN) tienen redirect permanente en `next.config.ts`. **No quitarlos.** Las mayúsculas se redirigen a minúsculas en `src/middleware.ts`.

## NO hacer

- `<img>` nativo → siempre `next/image`
- CSS custom o estilos inline → solo Tailwind
- Textos hardcodeados en componentes → usar `useTranslations()` / `getTranslations()`
- `useTranslations()` en Server Components → usar `getTranslations()`
- Ignorar TypeScript errors
- Cambiar los valores internos de `category`/`status` en MDX (rompe los filtros y traducciones)
- Eliminar `outputFileTracingExcludes` de `next.config.ts` (rompería el deploy en Vercel)

## SEO

- URL canonico in `siteConfig.url` (`src/lib/constants.ts`).
- `src/lib/seo.ts`: `buildMetadata()` (title, canonical, hreflang, OG, Twitter) da usare in **ogni** `generateMetadata`; `buildBreadcrumb()` e `buildSiteGraph()` per il JSON-LD (`components/seo/JsonLd.tsx`).
- Il root layout è `src/app/[locale]/layout.tsx` (contiene `<html lang>`); non esiste `src/app/layout.tsx`.
- Link interni: sempre `Link` da `@/i18n/navigation` (mai `next/link`), altrimenti si perde il prefisso lingua.
- Contenuto above-the-fold: niente `opacity: 0` iniziale nell'HTML (LCP).
- Stato e attività pendenti: `docs/seo/archivo/fase-1/ESTADO-FASE-1.md`.

