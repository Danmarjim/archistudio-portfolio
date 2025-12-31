Portfolio Web - Estudio de Arquitectura
📋 Descripción del Proyecto
Portfolio web profesional para una arquitecta independiente que busca establecer su marca personal y atraer clientes. El sitio debe transmitir profesionalismo, creatividad y atención al detalle, reflejando las cualidades de una arquitecta.
Objetivo Principal
Crear una web tipo portfolio donde la arquitecta pueda:

Presentarse profesionalmente
Mostrar sus proyectos y trabajos realizados
Ofrecer sus servicios
Facilitar el contacto con potenciales clientes

Público Objetivo

Particulares buscando arquitecto para vivienda/reforma
Empresas que necesiten servicios de arquitectura
Otros profesionales del sector (colaboraciones)


🛠️ Stack Tecnológico
Core
TecnologíaVersiónPropósitoNext.js15.xFramework React con App RouterTypeScript5.xTipado estáticoTailwind CSS4.xEstilos utility-firstFramer Motion11.xAnimaciones
Gestión de Contenido
OpciónDescripciónMDX LocalArchivos markdown en el proyecto (recomendado inicialmente)Sanity CMSPanel visual (implementar en fase posterior si se requiere)
Hosting y Deploy
ServicioPlanVercelHobby (gratuito)DominioPor definir (.es o .com)
Dependencias Adicionales
json{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "@next/mdx": "^15.0.0",
    "gray-matter": "^4.0.3",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}

📁 Estructura del Proyecto
portfolio-arquitecta/
├── src/
│   ├── app/                          # App Router (Next.js 15)
│   │   ├── layout.tsx                # Layout raíz
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Estilos globales
│   │   ├── sobre-mi/
│   │   │   └── page.tsx              # Página "Sobre mí"
│   │   ├── proyectos/
│   │   │   ├── page.tsx              # Grid de proyectos
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Página individual proyecto
│   │   ├── servicios/
│   │   │   └── page.tsx              # Página de servicios
│   │   └── contacto/
│   │       └── page.tsx              # Página de contacto
│   │
│   ├── components/
│   │   ├── ui/                       # Componentes atómicos reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Container.tsx
│   │   │   └── ImageWithLoader.tsx
│   │   ├── sections/                 # Secciones de página
│   │   │   ├── Hero.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── About.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── layout/                   # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   └── shared/                   # Componentes compartidos
│   │       ├── Logo.tsx
│   │       ├── SocialLinks.tsx
│   │       ├── ImageGallery.tsx
│   │       ├── Lightbox.tsx
│   │       └── AnimatedSection.tsx
│   │
│   ├── lib/                          # Utilidades y helpers
│   │   ├── utils.ts                  # Funciones de utilidad (cn, etc.)
│   │   ├── projects.ts               # Funciones para cargar proyectos
│   │   └── constants.ts              # Constantes del sitio
│   │
│   └── types/                        # TypeScript types
│       └── index.ts                  # Definiciones de tipos
│
├── content/                          # Contenido MDX
│   ├── projects/                     # Proyectos del portfolio
│   │   ├── proyecto-ejemplo-1.mdx
│   │   ├── proyecto-ejemplo-2.mdx
│   │   └── proyecto-ejemplo-3.mdx
│   └── pages/                        # Contenido de páginas estáticas
│       ├── about.mdx
│       └── services.mdx
│
├── public/
│   ├── images/
│   │   ├── projects/                 # Imágenes de proyectos
│   │   ├── hero/                     # Imágenes hero
│   │   └── about/                    # Foto profesional, etc.
│   ├── fonts/                        # Fuentes locales (si aplica)
│   └── favicon.ico
│
├── .env.local                        # Variables de entorno
├── next.config.ts                    # Configuración Next.js
├── tailwind.config.ts                # Configuración Tailwind
├── tsconfig.json                     # Configuración TypeScript
└── package.json

🎨 Diseño y Estilo
Paleta de Colores (sugerida - ajustar según preferencias)
typescript// tailwind.config.ts
const colors = {
  // Colores principales
  primary: {
    50: '#faf5f0',
    100: '#f0e6d8',
    200: '#e0ccb0',
    300: '#d0b088',
    400: '#c09460',
    500: '#a07848',  // Color principal - tono arquitectura/madera
    600: '#806038',
    700: '#604828',
    800: '#403018',
    900: '#201808',
  },
  // Neutros elegantes
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  // Acento
  accent: '#1a1a1a',      // Negro elegante para textos
  background: '#fafaf9',  // Fondo cálido casi blanco
  foreground: '#1a1a1a',  // Texto principal
}
Tipografía
typescript// Fuentes recomendadas (Google Fonts)
const fonts = {
  heading: 'Playfair Display',  // Elegante, serif para títulos
  body: 'Inter',                // Moderna, sans-serif para cuerpo
  accent: 'Cormorant Garamond', // Para citas o destacados
}
Principios de Diseño

Minimalismo elegante: Espacios en blanco generosos, diseño limpio
Imágenes protagonistas: Los proyectos deben destacar visualmente
Tipografía con personalidad: Combinación serif/sans-serif
Animaciones sutiles: Transiciones suaves, no intrusivas
Mobile-first: Responsive perfecto en todos los dispositivos

Referencias de Estilo

Portfolios de estudios como Norm Architects, John Pawson
Estética editorial de revistas de arquitectura
Galerías de arte contemporáneo


📄 Páginas y Secciones
1. Homepage (/)
┌─────────────────────────────────────────────────┐
│                    HEADER                        │
│  Logo                    Nav: Proyectos | Sobre  │
│                          mí | Servicios | Contacto│
├─────────────────────────────────────────────────┤
│                                                  │
│                 HERO SECTION                     │
│                                                  │
│    [Imagen arquitectónica de fondo]              │
│                                                  │
│         "Arquitectura con alma"                  │
│         [Nombre de la arquitecta]               │
│                                                  │
│         [CTA: Ver proyectos]                    │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│            PROYECTOS DESTACADOS                 │
│                                                  │
│    ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│    │Proyecto1│ │Proyecto2│ │Proyecto3│         │
│    └─────────┘ └─────────┘ └─────────┘         │
│                                                  │
│              [Ver todos los proyectos]          │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│              SOBRE MÍ (Preview)                 │
│                                                  │
│    [Foto]    Breve bio y filosofía de diseño    │
│              [Leer más]                         │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│                 SERVICIOS                        │
│                                                  │
│    ┌────────┐ ┌────────┐ ┌────────┐            │
│    │Diseño  │ │Reformas│ │Interior│            │
│    └────────┘ └────────┘ └────────┘            │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│               CALL TO ACTION                    │
│                                                  │
│    "¿Tienes un proyecto en mente?"              │
│    [Contactar]                                  │
│                                                  │
├─────────────────────────────────────────────────┤
│                    FOOTER                        │
│  © 2025 | Email | Teléfono | Redes sociales    │
└─────────────────────────────────────────────────┘
2. Proyectos (/proyectos)

Grid de proyectos con filtros (categoría, año, tipo)
Cards con imagen, título, categoría
Hover effects elegantes
Lazy loading de imágenes

3. Proyecto Individual (/proyectos/[slug])

Galería de imágenes con lightbox
Descripción del proyecto
Ficha técnica (ubicación, superficie, año, cliente)
Navegación a proyecto anterior/siguiente

4. Sobre Mí (/sobre-mi)

Foto profesional
Biografía extendida
Formación y experiencia (timeline)
Filosofía de diseño
Reconocimientos/publicaciones (si aplica)

5. Servicios (/servicios)

Lista de servicios ofrecidos
Descripción de cada servicio
Proceso de trabajo
FAQ (opcional)

6. Contacto (/contacto)

Formulario de contacto (nombre, email, mensaje, tipo de proyecto)
Información de contacto directa
Mapa de ubicación (opcional)
Redes sociales


⚡ Funcionalidades Técnicas
Animaciones (Framer Motion)
typescript// Animaciones a implementar:

// 1. Fade in al hacer scroll
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

// 2. Stagger en grids de proyectos
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// 3. Hover en cards
const cardHover = {
  scale: 1.02,
  transition: { duration: 0.3 }
}

// 4. Page transitions (opcional)
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}
Optimización de Imágenes
typescript// Usar next/image para todas las imágenes
import Image from 'next/image'

// Configuración recomendada para proyectos
<Image
  src={project.coverImage}
  alt={project.title}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL={project.blurDataURL}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
SEO
typescript// Metadata dinámica por página
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProject(params.slug)
  
  return {
    title: `${project.title} | [Nombre Arquitecta]`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [{ url: project.coverImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

// Sitemap automático
// Robots.txt
// JSON-LD structured data para proyectos
Formulario de Contacto
typescript// Opciones de implementación:
// 1. Formspree (más simple, gratuito hasta cierto límite)
// 2. Resend + React Email (más control, requiere setup)
// 3. Netlify Forms (si se despliega en Netlify)

// Campos del formulario:
interface ContactForm {
  name: string
  email: string
  phone?: string
  projectType: 'vivienda' | 'reforma' | 'comercial' | 'otro'
  message: string
  budget?: string
}

📝 Estructura de Contenido MDX
Proyecto (content/projects/[slug].mdx)
mdx---
title: "Casa del Bosque"
slug: "casa-del-bosque"
category: "Vivienda unifamiliar"
location: "Sierra de Madrid"
year: 2024
client: "Privado"
surface: "280 m²"
status: "Construido"
featured: true
coverImage: "/images/projects/casa-bosque/cover.jpg"
images:
  - "/images/projects/casa-bosque/01.jpg"
  - "/images/projects/casa-bosque/02.jpg"
  - "/images/projects/casa-bosque/03.jpg"
excerpt: "Una vivienda que dialoga con el entorno natural, integrando materiales locales y técnicas sostenibles."
tags:
  - sostenibilidad
  - madera
  - vivienda
---

## El Proyecto

Descripción extendida del proyecto...

## Concepto

Filosofía y enfoque del diseño...

## Materiales

Descripción de los materiales utilizados...

## Proceso

Cómo se desarrolló el proyecto...
Tipos TypeScript
typescript// types/index.ts

export interface Project {
  title: string
  slug: string
  category: string
  location: string
  year: number
  client: string
  surface: string
  status: 'Construido' | 'En construcción' | 'Proyecto'
  featured: boolean
  coverImage: string
  images: string[]
  excerpt: string
  tags: string[]
  content: string // MDX content
}

export interface Service {
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'pinterest' | 'behance'
  url: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  email: string
  phone?: string
  address?: string
  social: SocialLink[]
}

🚀 Fases de Desarrollo
Fase 1: Setup y Fundamentos (Día 1-2)

 Inicializar proyecto Next.js 15 con TypeScript
 Configurar Tailwind CSS con tema personalizado
 Configurar estructura de carpetas
 Crear tipos TypeScript
 Implementar layout base (Header, Footer)
 Configurar fuentes (Google Fonts)
 Crear componente Container y utilidades básicas

Fase 2: Componentes UI (Día 3-4)

 Crear componentes atómicos (Button, Card, Badge)
 Implementar Navigation con mobile menu
 Crear componente Logo
 Implementar AnimatedSection con Framer Motion
 Crear ImageWithLoader para imágenes optimizadas

Fase 3: Homepage (Día 5-6)

 Desarrollar Hero section
 Crear FeaturedProjects section
 Implementar About preview section
 Crear Services preview section
 Implementar CTA section
 Ensamblar homepage completa

Fase 4: Páginas de Contenido (Día 7-9)

 Crear página de Proyectos con grid y filtros
 Implementar página individual de proyecto
 Desarrollar galería de imágenes con lightbox
 Crear página Sobre Mí
 Implementar página de Servicios
 Crear página de Contacto con formulario

Fase 5: Contenido y MDX (Día 10-11)

 Configurar MDX en Next.js
 Crear función para cargar proyectos
 Añadir proyectos de ejemplo (3-5)
 Optimizar imágenes de ejemplo

Fase 6: Polish y Deploy (Día 12-14)

 Implementar SEO completo (metadata, sitemap, robots.txt)
 Añadir transiciones de página
 Testing responsive
 Optimización de rendimiento (Lighthouse 90+)
 Configurar Vercel
 Deploy inicial
 Configurar dominio (cuando esté disponible)


🔧 Comandos de Desarrollo
bash# Desarrollo
npm run dev           # Servidor de desarrollo (localhost:3000)

# Build
npm run build         # Build de producción
npm run start         # Servidor de producción local

# Linting
npm run lint          # Verificar código

# Deploy
vercel                # Deploy a preview
vercel --prod         # Deploy a producción

📋 Checklist Pre-Lanzamiento

 Todas las imágenes optimizadas
 Textos revisados (sin lorem ipsum)
 Formulario de contacto funcionando
 SEO configurado (title, description, OG images)
 Favicon e iconos
 404 page personalizada
 Responsive en móvil, tablet y desktop
 Lighthouse score > 90 en todas las categorías
 Links funcionando (internos y externos)
 Analytics configurado (si se desea)
 Política de privacidad / Aviso legal (RGPD)
 SSL activo (https)


📞 Información de Contacto del Proyecto
Cliente: [Nombre de la arquitecta]
Email: [Por definir]
Teléfono: [Por definir]
Ubicación: [Por definir]
Redes sociales: [Por definir]

🤖 Notas para Claude Code
Prioridades

Código limpio y tipado: Usar TypeScript estricto
Componentes reutilizables: Seguir principios DRY
Performance: Optimizar imágenes, lazy loading
Accesibilidad: Semantic HTML, ARIA labels
SEO: Metadata completa en cada página

Convenciones

Nombres de componentes en PascalCase
Nombres de archivos de utilidad en camelCase
CSS classes con Tailwind (evitar CSS custom excepto globals)
Importaciones absolutas desde @/

Cuando tengas dudas

Priorizar simplicidad sobre complejidad
Mobile-first en diseño responsive
Consultar documentación de Next.js 15 App Router
Las animaciones deben ser sutiles, no distraer


Documento creado: 31 de diciembre de 2025
Última actualización: 31 de diciembre de 2025