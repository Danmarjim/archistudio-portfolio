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
excerpt: "Descripción breve..."
tags:
  - tag1
  - tag2
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
```

## Configuración Vercel (`next.config.ts`)

```typescript
// CRÍTICO: sin esto, public/images/ se incluye en cada Lambda → 250 MB+
outputFileTracingExcludes: {
  '*': ['public/**'],
}
```

`lib/projects.ts` escanea `public/images/projects/` con `fs.readdirSync`. El file tracer de Next.js incluiría todas las fotos en cada serverless function sin esta exclusión.

## Páginas y Rutas

| Ruta | Tipo | Archivo |
|------|------|---------|
| `/{locale}` | Server | `app/[locale]/page.tsx` |
| `/{locale}/proyectos` | Server | `app/[locale]/proyectos/page.tsx` |
| `/{locale}/proyectos/[slug]` | Server | `app/[locale]/proyectos/[slug]/page.tsx` |
| `/{locale}/news` | Server | `app/[locale]/news/page.tsx` |
| `/{locale}/news/[slug]` | Server | `app/[locale]/news/[slug]/page.tsx` |
| `/{locale}/sobre-mi` | Server | `app/[locale]/sobre-mi/page.tsx` |
| `/{locale}/servicios` | Server | `app/[locale]/servicios/page.tsx` |
| `/{locale}/contacto` | Client | `app/[locale]/contacto/page.tsx` |

## NO hacer

- `<img>` nativo → siempre `next/image`
- CSS custom o estilos inline → solo Tailwind
- Textos hardcodeados en componentes → usar `useTranslations()` / `getTranslations()`
- `useTranslations()` en Server Components → usar `getTranslations()`
- Ignorar TypeScript errors
- Cambiar los valores internos de `category`/`status` en MDX (rompe los filtros y traducciones)
- Eliminar `outputFileTracingExcludes` de `next.config.ts` (rompería el deploy en Vercel)
