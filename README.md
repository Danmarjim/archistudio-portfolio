# Archistudio Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)

Portfolio web profesional para una arquitecta independiente. Sitio minimalista y elegante que prioriza la presentación visual de proyectos arquitectónicos, con soporte completo de internacionalización en tres idiomas (IT/ES/EN).

## Demo

🌐 **Live:** [archistudio.vercel.app](https://archistudio.vercel.app)

## Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| [Next.js](https://nextjs.org/) | 16.1 | Framework React con App Router |
| [React](https://react.dev/) | 19 | Biblioteca UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos utility-first |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animaciones fluidas |
| [next-intl](https://next-intl-docs.vercel.app/) | 4.7 | Internacionalización (IT/ES/EN) |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | 4 | Parsing frontmatter MDX |
| [Lucide React](https://lucide.dev/) | - | Iconografía |

## Arquitectura

```
src/
├── app/                    # App Router (Next.js 16)
│   ├── [locale]/           # Rutas internacionalizadas (it / es / en)
│   │   ├── page.tsx        # Homepage
│   │   ├── proyectos/      # Grid + detalle de proyectos
│   │   ├── news/           # Grid + detalle de noticias
│   │   ├── sobre-mi/       # Página "Sobre mí"
│   │   ├── servicios/      # Lista de servicios
│   │   └── contacto/       # Formulario de contacto
│   ├── sitemap.ts          # Sitemap estático (force-static)
│   └── robots.ts           # Robots.txt
│
├── components/
│   ├── ui/                 # Componentes atómicos (Button, Card, Badge, Lightbox...)
│   ├── sections/           # Secciones de página (Hero, ProjectsGrid, NewsGrid...)
│   ├── layout/             # Header, Footer
│   └── shared/             # Componentes compartidos (Logo...)
│
├── lib/
│   ├── projects.ts         # Carga MDX proyectos + análisis dimensiones imágenes
│   ├── news.ts             # Carga MDX noticias
│   ├── utils.ts            # Utilidades (cn...)
│   ├── constants.ts        # Configuración del sitio + categorías
│   └── hooks/              # Custom hooks (useLightbox...)
│
├── i18n/                   # Configuración next-intl
│   ├── routing.ts          # Locales: ['it', 'es', 'en'], defaultLocale: 'it'
│   ├── navigation.ts       # Links i18n
│   └── request.ts          # Middleware config
│
├── types/                  # Definiciones TypeScript (Project, NewsPost...)
└── middleware.ts           # Middleware de localización

content/
├── projects/               # Proyectos en MDX por locale
│   ├── it/                 # Italiano (fuente canónica)
│   ├── es/                 # Español
│   └── en/                 # Inglés
└── news/                   # Noticias en MDX por locale
    ├── it/                 # Italiano (fuente canónica)
    ├── es/                 # Español
    └── en/                 # Inglés

messages/                   # Traducciones UI
├── it.json
├── es.json
└── en.json

public/
└── images/                 # Imágenes estáticas (servidas por CDN Vercel)
    ├── projects/           # Fotos de proyectos
    ├── news/               # Imágenes de noticias
    ├── hero/               # Imágenes hero
    └── about/              # Fotos perfil
```

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/Danmarjim/archistudio-portfolio.git
cd archistudio-portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Scripts

```bash
npm run dev       # Servidor de desarrollo (localhost:3000)
npm run build     # Build de producción
npm run start     # Servidor de producción local
npm run lint      # Linting con ESLint
```

## Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

## Internacionalización (i18n)

El sitio soporta tres idiomas: **Italiano** (predeterminado), **Español** e **Inglés**.

- Las URLs tienen el formato `/{locale}/ruta` (ej. `/it/proyectos`, `/es/proyectos`)
- Los textos de UI están en `messages/{locale}.json`
- El contenido de proyectos y noticias está en `content/{tipo}/{locale}/*.mdx`
- El locale `it` es la fuente canónica y fallback para ambos contenidos
- Componentes cliente usan `useTranslations()`, páginas servidor usan `getTranslations()`

### Traducción de categorías

Las categorías de proyectos (`category`) y estados (`status`) se almacenan en italiano como valor interno y se traducen en UI con `useTranslations('ProjectCategories')` y `useTranslations('ProjectStatus')`.

```typescript
// Patrón para traducir con fallback seguro
const tCat = useTranslations('ProjectCategories')
tCat(project.category, { defaultValue: project.category })
```

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage con hero, proyectos destacados y servicios |
| `/proyectos` | Grid de todos los proyectos con filtros por categoría |
| `/proyectos/[slug]` | Detalle de proyecto con galería lightbox |
| `/news` | Grid de noticias con filtros por categoría |
| `/news/[slug]` | Detalle de noticia con galería de imágenes |
| `/sobre-mi` | Biografía y trayectoria profesional |
| `/servicios` | Lista de servicios ofrecidos |
| `/contacto` | Formulario de contacto |

## Estructura de un Proyecto (MDX)

```mdx
---
title: "Cucina PARIGINA"
category: "Cucine"           # valor interno en italiano
location: "Bergamo"
year: 2022
client: "Privato"            # valor interno en italiano
surface: "8.20 m²"
status: "Realizzato"         # valor interno en italiano
featured: false
coverImage: "/images/projects/cucina-parigina-01.jpg"
images:
  - "/images/projects/cucina-parigina-01.jpg"
  - "/images/projects/cucina-parigina-02.jpg"
excerpt: "Descripción breve del proyecto..."
tags:
  - cucina
  - restyling
---

Cuerpo del artículo en el idioma del locale correspondiente.
```

## Deploy

El proyecto está configurado para deploy automático en **Vercel** al hacer push a `main`.

```bash
# Build local para verificar antes de push
npm run build
```

### Nota importante Vercel

`next.config.ts` incluye `outputFileTracingExcludes` para evitar que las imágenes de `public/` se incluyan en los bundles Lambda (causaría funciones de 250 MB+):

```typescript
outputFileTracingExcludes: {
  '*': ['public/**'],
}
```

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary | `#a07848` | Acentos, CTAs |
| Background | `#fafaf9` | Fondo principal |
| Foreground | `#1a1a1a` | Texto |

## Tipografía

- **Títulos:** Playfair Display (serif)
- **Cuerpo:** Inter (sans-serif)

## Licencia

Este proyecto es privado y su código no está disponible para uso público.

---

Desarrollado con Next.js 16 y desplegado en Vercel.
