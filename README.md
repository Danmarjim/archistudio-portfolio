# Archistudio Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)

Portfolio web profesional para una arquitecta independiente. Sitio minimalista y elegante que prioriza la presentación visual de proyectos arquitectónicos.

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
| [next-intl](https://next-intl-docs.vercel.app/) | 4.7 | Internacionalización (ES/EN) |
| [MDX](https://mdxjs.com/) | - | Contenido de proyectos |
| [Lucide React](https://lucide.dev/) | - | Iconografía |

## Arquitectura

```
src/
├── app/                    # App Router (Next.js 16)
│   ├── [locale]/           # Rutas internacionalizadas
│   │   ├── page.tsx        # Homepage
│   │   ├── proyectos/      # Grid + detalle de proyectos
│   │   ├── sobre-mi/       # Página "Sobre mí"
│   │   ├── servicios/      # Lista de servicios
│   │   └── contacto/       # Formulario de contacto
│   ├── sitemap.ts          # Sitemap dinámico
│   └── robots.ts           # Robots.txt
│
├── components/
│   ├── ui/                 # Componentes atómicos (Button, Card, Badge...)
│   ├── sections/           # Secciones de página (Hero, ProjectsGrid...)
│   ├── layout/             # Header, Footer
│   └── shared/             # Componentes compartidos (Logo, Lightbox...)
│
├── lib/
│   ├── projects.ts         # Carga y parsing de proyectos MDX
│   ├── utils.ts            # Utilidades (cn, formatters...)
│   ├── constants.ts        # Configuración del sitio
│   └── hooks/              # Custom hooks
│
├── i18n/                   # Configuración next-intl
│   ├── routing.ts          # Rutas localizadas
│   ├── navigation.ts       # Links i18n
│   └── request.ts          # Middleware config
│
├── types/                  # Definiciones TypeScript
└── middleware.ts           # Middleware de localización

content/
└── projects/               # Proyectos en MDX

messages/                   # Traducciones (es.json, en.json)

public/
└── images/                 # Imágenes optimizadas
    ├── projects/           # Fotos de proyectos
    ├── hero/               # Imágenes hero
    └── about/              # Fotos perfil
```

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/archistudio-portfolio.git
cd archistudio-portfolio

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
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

## Características

- **Internacionalización** - Soporte completo ES/EN con next-intl
- **SEO optimizado** - Metadata dinámica, sitemap, robots.txt, Open Graph
- **Animaciones fluidas** - Transiciones de página y scroll con Framer Motion
- **Responsive** - Mobile-first, adaptado a todos los dispositivos
- **Performance** - Imágenes optimizadas con next/image, lazy loading
- **Accesibilidad** - HTML semántico, ARIA labels, navegación por teclado
- **Contenido MDX** - Proyectos gestionados con Markdown + componentes React

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage con hero, proyectos destacados y servicios |
| `/proyectos` | Grid de todos los proyectos con filtros |
| `/proyectos/[slug]` | Detalle de proyecto con galería |
| `/sobre-mi` | Biografía y trayectoria profesional |
| `/servicios` | Lista de servicios ofrecidos |
| `/contacto` | Formulario de contacto |

## Deploy

El proyecto está configurado para deploy en **Vercel**:

```bash
# Deploy a preview
vercel

# Deploy a producción
vercel --prod
```

## Estructura de un Proyecto (MDX)

```mdx
---
title: "Casa del Bosque"
slug: "casa-del-bosque"
category: "Vivienda unifamiliar"
location: "Sierra de Madrid"
year: 2024
surface: "280 m²"
status: "Construido"
featured: true
coverImage: "/images/projects/casa-bosque/cover.jpg"
images:
  - "/images/projects/casa-bosque/01.jpg"
  - "/images/projects/casa-bosque/02.jpg"
excerpt: "Una vivienda que dialoga con el entorno natural..."
tags:
  - sostenibilidad
  - madera
---

## El Proyecto

Descripción del proyecto...
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
