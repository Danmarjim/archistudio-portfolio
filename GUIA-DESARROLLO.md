# Guía de Desarrollo - Portfolio Arquitectura

Guía exhaustiva para configurar, desarrollar y mantener este proyecto desde cualquier máquina.

---

## Índice

1. [Requisitos del sistema](#requisitos-del-sistema)
2. [Configuración inicial desde cero](#configuración-inicial-desde-cero)
3. [Stack tecnológico](#stack-tecnológico)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Comandos disponibles](#comandos-disponibles)
6. [Sistema de internacionalización (i18n)](#sistema-de-internacionalización-i18n)
7. [Test A/B para desarrollo](#test-ab-para-desarrollo)
8. [Gestión de proyectos MDX](#gestión-de-proyectos-mdx)
9. [Componentes principales](#componentes-principales)
10. [Estilos y tema](#estilos-y-tema)
11. [Despliegue](#despliegue)
12. [Flujo de trabajo con Git](#flujo-de-trabajo-con-git)
13. [Uso de Claude Code](#uso-de-claude-code)
14. [Solución de problemas](#solución-de-problemas)
15. [Referencias](#referencias)

---

## Requisitos del sistema

### Software necesario

| Software | Versión mínima | Verificar instalación |
|----------|---------------|----------------------|
| Node.js | 18.x o superior | `node --version` |
| npm | 9.x o superior | `npm --version` |
| Git | 2.x o superior | `git --version` |
| Vercel CLI | Última | `vercel --version` |
| Claude Code | Última | `claude --version` |

### Instalación de requisitos

#### macOS

```bash
# Instalar Homebrew (si no está instalado)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node

# Instalar Git
brew install git

# Instalar Vercel CLI globalmente
npm install -g vercel

# Instalar Claude Code
npm install -g @anthropic-ai/claude-code
```

#### Windows

```powershell
# Instalar Node.js desde https://nodejs.org/
# O usando winget:
winget install OpenJS.NodeJS

# Instalar Git desde https://git-scm.com/
# O usando winget:
winget install Git.Git

# Instalar Vercel CLI
npm install -g vercel

# Instalar Claude Code
npm install -g @anthropic-ai/claude-code
```

#### Linux (Ubuntu/Debian)

```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Git
sudo apt-get install git

# Instalar Vercel CLI
npm install -g vercel

# Instalar Claude Code
npm install -g @anthropic-ai/claude-code
```

---

## Configuración inicial desde cero

### 1. Clonar el repositorio

```bash
# Clonar el proyecto
git clone <url-del-repositorio> portfolio-mparchistudio
cd portfolio-mparchistudio
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Vercel (primera vez)

```bash
# Iniciar sesión en Vercel
vercel login

# Vincular el proyecto (si ya existe en Vercel)
vercel link

# O crear nuevo proyecto
vercel
```

### 4. Configurar Claude Code (primera vez)

```bash
# Iniciar sesión en Claude
claude login

# Verificar configuración
claude config

# El proyecto ya incluye CLAUDE.md con el contexto necesario
```

### 5. Verificar instalación

```bash
# Verificar que el build funciona
npm run build

# Iniciar servidor de desarrollo
npm run dev
```

Abrir http://localhost:3000 para verificar que todo funciona.

---

## Stack tecnológico

### Framework y lenguaje

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 16.x | Framework React con SSR/SSG |
| React | 19.x | Biblioteca UI |
| TypeScript | 5.x | Tipado estático |

### Estilos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Tailwind CSS | 4.x | Framework CSS utility-first |
| clsx + tailwind-merge | - | Utilidad para clases condicionales |

### Animaciones

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Framer Motion | 12.x | Animaciones declarativas |

### Contenido

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| MDX | - | Markdown con componentes React |
| gray-matter | - | Parseo de frontmatter YAML |

### Internacionalización

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| next-intl | 4.x | i18n para Next.js App Router |

### Iconos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Lucide React | - | Iconos SVG como componentes |

### Dependencias completas

```json
{
  "dependencies": {
    "@next/mdx": "^15.1.4",
    "clsx": "^2.1.1",
    "framer-motion": "^12.0.5",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.469.0",
    "next": "16.1.1",
    "next-intl": "^4.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4.0.0",
    "typescript": "^5"
  }
}
```

---

## Estructura del proyecto

```
portfolio-mparchistudio/
├── .claude/                    # Configuración de Claude Code
│   └── settings.local.json
├── content/
│   └── projects/
│       ├── es/                 # Proyectos en español
│       ├── en/                 # Proyectos en inglés (futuro)
│       └── it/                 # Proyectos en italiano (futuro)
├── messages/
│   ├── es.json                 # Traducciones español
│   ├── en.json                 # Traducciones inglés
│   └── it.json                 # Traducciones italiano
├── public/
│   └── images/
│       ├── projects/           # Imágenes de proyectos
│       ├── about/              # Foto arquitecta
│       └── hero/               # Imágenes hero (si aplica)
├── src/
│   ├── app/
│   │   ├── [locale]/           # Rutas localizadas
│   │   │   ├── contacto/
│   │   │   ├── proyectos/
│   │   │   │   └── [slug]/
│   │   │   ├── servicios/
│   │   │   ├── sobre-mi/
│   │   │   ├── layout.tsx      # Layout con i18n provider
│   │   │   ├── page.tsx        # Homepage
│   │   │   └── template.tsx    # Transiciones
│   │   ├── globals.css         # Estilos globales + tema Tailwind
│   │   ├── layout.tsx          # Layout raíz (fuentes)
│   │   ├── robots.ts           # robots.txt dinámico
│   │   └── sitemap.ts          # sitemap.xml dinámico
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # Componentes de secciones
│   │   ├── shared/             # Componentes compartidos
│   │   └── ui/                 # Componentes UI base
│   ├── i18n/
│   │   ├── navigation.ts       # Link, useRouter localizados
│   │   ├── request.ts          # Configuración de mensajes
│   │   └── routing.ts          # Definición de locales
│   ├── lib/
│   │   ├── constants.ts        # Configuración del sitio
│   │   ├── projects.ts         # Funciones para cargar proyectos
│   │   ├── utils.ts            # Utilidades (cn)
│   │   └── hooks/              # Custom hooks
│   ├── middleware.ts           # Middleware de rutas i18n
│   └── types/
│       └── index.ts            # Tipos TypeScript
├── BITACORA.md                 # Log de desarrollo
├── CLAUDE.md                   # Contexto para Claude Code
├── GUIA-CONTENIDO.md           # Guía para gestión de contenido
├── GUIA-DESARROLLO.md          # Esta guía
├── WORKFLOW.md                 # Flujo de trabajo Git
├── next.config.ts              # Configuración Next.js + i18n
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

---

## Comandos disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:3000
```

### Build y verificación

```bash
# Compilar para producción
npm run build

# Iniciar servidor de producción local
npm run start

# Ejecutar linting
npm run lint
```

### Despliegue

```bash
# Desplegar a producción
vercel --prod

# Desplegar preview (para pruebas)
vercel
```

### Git

```bash
# Ver estado
git status

# Ver ramas
git branch -a

# Ver historial
git log --oneline -10
```

---

## Sistema de internacionalización (i18n)

### Idiomas soportados

| Código | Idioma | Estado |
|--------|--------|--------|
| `es` | Español | Completo (default) |
| `en` | Inglés | Traducciones UI listas |
| `it` | Italiano | Traducciones UI listas |

### Estructura de URLs

```
/es                    → Homepage en español
/en                    → Homepage en inglés
/it                    → Homepage en italiano
/es/proyectos          → Proyectos en español
/en/proyectos          → Proyectos en inglés
/es/proyectos/[slug]   → Detalle proyecto
```

### Archivos de traducción

Las traducciones están en `messages/`:

```
messages/
├── es.json    # Español (fuente principal)
├── en.json    # Inglés
└── it.json    # Italiano
```

#### Estructura de un archivo de traducción

```json
{
  "Metadata": {
    "title": "Estudio de Arquitectura | Portfolio",
    "description": "..."
  },
  "Navigation": {
    "projects": "Proyectos",
    "about": "Sobre mí",
    "services": "Servicios",
    "contact": "Contacto"
  },
  "Footer": {
    "description": "Arquitectura con alma...",
    "navigation": "Navegación",
    "contact": "Contacto",
    "rights": "Todos los derechos reservados."
  },
  "LanguageSwitcher": {
    "label": "Idioma",
    "es": "Español",
    "en": "English",
    "it": "Italiano"
  }
  // ... más namespaces
}
```

### Añadir traducciones a un componente

```tsx
'use client'

import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('Navigation')

  return (
    <nav>
      <a href="/proyectos">{t('projects')}</a>
      <a href="/contacto">{t('contact')}</a>
    </nav>
  )
}
```

### Usar Link localizado

```tsx
// Importar de i18n/navigation, NO de next/link
import { Link } from '@/i18n/navigation'

// El Link añade automáticamente el prefijo de idioma
<Link href="/proyectos">Ver proyectos</Link>
// Renderiza: /es/proyectos o /en/proyectos según el idioma actual
```

### Configuración de locales

En `src/i18n/routing.ts`:

```typescript
export const locales = ['es', 'en', 'it'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'es',
  localePrefix: 'always',
})
```

### Fallback de contenido MDX

Los proyectos MDX tienen fallback a español si no existe traducción:

```
content/projects/
├── es/           # 6 proyectos (fuente principal)
├── en/           # Vacío → usa contenido de es/
└── it/           # Vacío → usa contenido de es/
```

Para añadir traducción de un proyecto:
1. Copia el archivo MDX de `es/` a `en/` o `it/`
2. Traduce el contenido

---

## Test A/B para desarrollo

Sistema simple para comparar variantes antes de decidir cuál desplegar.

### Variantes disponibles

| Variante | Descripción | URL |
|----------|-------------|-----|
| `grid` | Grid de 3 proyectos (original) | `/?variant=grid` |
| `carousel` | Carrusel horizontal | `/?variant=carousel` |

### Uso

```
# Ver variante por defecto
https://portfolio-mparchistudio.vercel.app/es

# Forzar carrusel
https://portfolio-mparchistudio.vercel.app/es?variant=carousel

# Forzar grid
https://portfolio-mparchistudio.vercel.app/es?variant=grid
```

### Cambiar variante por defecto

En `src/app/[locale]/page.tsx`:

```typescript
// Cambiar 'carousel' por 'grid' o viceversa
const DEFAULT_VARIANT = 'grid'
```

### Eliminar sistema A/B (cuando decidas)

1. Elige la variante definitiva
2. Elimina el código de `searchParams` de `page.tsx`
3. Deja solo el componente elegido
4. Elimina el componente no usado

---

## Gestión de proyectos MDX

### Estructura de un proyecto

```mdx
---
title: Casa del Bosque
category: Vivienda unifamiliar
location: Sierra de Madrid
year: 2024
client: Privado
surface: 280 m²
status: Construido
featured: true
coverImage: /images/projects/placeholder-1.jpg
images:
  - /images/projects/placeholder-1.jpg
  - /images/projects/placeholder-2.jpg
excerpt: Una vivienda que dialoga con el entorno natural.
tags:
  - sostenibilidad
  - madera
  - vivienda
---

Contenido del proyecto en Markdown...
```

### Funciones disponibles

```typescript
import {
  getAllProjects,      // Todos los proyectos
  getFeaturedProjects, // Solo featured: true
  getProjectBySlug,    // Proyecto por slug
  getAllProjectSlugs,  // Slugs para generateStaticParams
  getAdjacentProjects  // Anterior/siguiente
} from '@/lib/projects'

// Todas aceptan locale como parámetro
const projects = getAllProjects('es')
const featured = getFeaturedProjects('en')
const project = getProjectBySlug('casa-del-bosque', 'it')
```

### Categorías disponibles

Definidas en `src/lib/constants.ts`:

```typescript
export const projectCategories = [
  'Vivienda unifamiliar',
  'Reforma integral',
  'Interiorismo',
  'Comercial',
  'Edificio residencial',
] as const
```

---

## Componentes principales

### Secciones (`src/components/sections/`)

| Componente | Descripción | Uso |
|------------|-------------|-----|
| `Hero` | Banner principal | Homepage |
| `FeaturedProjects` | Grid de 3 proyectos | Homepage (variante grid) |
| `ProjectsCarousel` | Carrusel de proyectos | Homepage (variante carousel) |
| `ProjectsGrid` | Grid con filtros | Página /proyectos |
| `ProjectDetail` | Detalle de proyecto | Página /proyectos/[slug] |
| `ProjectCard` | Card individual | En grids y carrusel |
| `AboutPreview` | Preview sobre mí | Homepage |
| `ServicesPreview` | Preview servicios | Homepage |
| `CallToAction` | CTA final | Homepage, páginas |

### UI (`src/components/ui/`)

| Componente | Descripción |
|------------|-------------|
| `Button` | Botón con variantes |
| `Badge` | Etiqueta/badge |
| `Card` | Card compound component |
| `Container` | Contenedor centrado |
| `ImageWithLoader` | Imagen con loading state |
| `Lightbox` | Modal de galería |

### Shared (`src/components/shared/`)

| Componente | Descripción |
|------------|-------------|
| `Logo` | Logo del sitio |
| `LanguageSwitcher` | Selector de idioma |
| `AnimatedSection` | Wrapper con animación scroll |
| `AnimatedList` | Lista con stagger animation |
| `PageTransition` | Transición entre páginas |

---

## Estilos y tema

### Configuración del tema

En `src/app/globals.css`:

```css
@theme inline {
  /* Colores primarios (tonos tierra) */
  --color-primary-50: oklch(0.98 0.01 75);
  --color-primary-100: oklch(0.94 0.03 75);
  /* ... */
  --color-primary-600: oklch(0.55 0.12 55);  /* Principal */

  /* Colores neutros */
  --color-neutral-50: oklch(0.985 0.002 75);
  /* ... */

  /* Semánticos */
  --color-background: var(--color-neutral-50);
  --color-foreground: oklch(0.15 0.01 75);

  /* Fuentes */
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
}
```

### Paleta de colores

| Color | Uso |
|-------|-----|
| `primary-600` | Color principal (botones, acentos) |
| `primary-100` | Fondos sutiles |
| `neutral-600` | Texto secundario |
| `foreground` | Texto principal |
| `background` | Fondo del sitio |

### Fuentes

| Fuente | Uso | Variable CSS |
|--------|-----|--------------|
| Playfair Display | Títulos | `--font-serif` |
| Inter | Cuerpo | `--font-sans` |

### Utilidad `cn()`

Combina clases de Tailwind de forma segura:

```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
)} />
```

---

## Despliegue

### Vercel (producción)

```bash
# Desplegar a producción
vercel --prod

# Ver logs del último deploy
vercel logs

# Listar deployments
vercel ls
```

### URL de producción

```
https://portfolio-mparchistudio.vercel.app
```

### Variables de entorno

Actualmente no se requieren variables de entorno. Si se añaden en el futuro:

```bash
# Añadir variable en Vercel
vercel env add NOMBRE_VARIABLE

# Ver variables configuradas
vercel env ls
```

---

## Flujo de trabajo con Git

### Ramas

| Rama | Propósito |
|------|-----------|
| `main` | Producción |
| `feature/*` | Nuevas funcionalidades |
| `fix/*` | Corrección de bugs |
| `docs/*` | Documentación |

### Proceso para nueva funcionalidad

```bash
# 1. Crear rama desde main
git checkout main
git checkout -b feature/nombre-funcionalidad

# 2. Desarrollar y commitear
git add .
git commit -m "feat(scope): descripción"

# 3. Verificar build
npm run build

# 4. Mergear a main
git checkout main
git merge feature/nombre-funcionalidad

# 5. Desplegar
vercel --prod
```

### Formato de commits

```
tipo(scope): descripción breve

Descripción detallada si es necesario.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

**Tipos:**
- `feat` - Nueva funcionalidad
- `fix` - Corrección de bug
- `docs` - Documentación
- `style` - Formato (sin cambios de código)
- `refactor` - Refactorización
- `chore` - Tareas de mantenimiento

---

## Uso de Claude Code

### Iniciar sesión

```bash
claude login
```

### Iniciar Claude Code en el proyecto

```bash
cd portfolio-mparchistudio
claude
```

### Archivos de contexto

El proyecto incluye archivos que Claude Code usa automáticamente:

| Archivo | Propósito |
|---------|-----------|
| `CLAUDE.md` | Contexto del proyecto, convenciones, stack |
| `BITACORA.md` | Historial de desarrollo, estado actual |
| `WORKFLOW.md` | Flujo de trabajo estándar |

### Comandos útiles en Claude Code

```bash
# Dentro de Claude Code:

# Ver estado actual
/status

# Limpiar contexto
/clear

# Salir
/exit
```

### Buenas prácticas con Claude Code

1. **Siempre verificar build** después de cambios: `npm run build`
2. **Seguir WORKFLOW.md** para nuevas funcionalidades
3. **Actualizar BITACORA.md** al completar tareas
4. **Commitear cambios** antes de cerrar sesión

---

## Solución de problemas

### Error: "Cannot find module"

```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Error: "Build failed"

```bash
# Ver errores detallados
npm run build

# Común: Error de tipos TypeScript
# Revisar el archivo indicado en el error
```

### Error: "next-intl config not found"

Verificar que `next.config.ts` incluye:

```typescript
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
```

### Imágenes no cargan

1. Verificar que están en `public/images/`
2. La ruta en MDX debe ser `/images/...` (sin `public`)
3. Verificar nombre exacto (case-sensitive)

### Proyectos no aparecen

1. Verificar extensión `.mdx`
2. Verificar ubicación: `content/projects/es/`
3. Verificar frontmatter (entre `---`)
4. Ejecutar `npm run build` para ver errores

### Cambios no se ven en producción

```bash
# Verificar que el deploy fue exitoso
vercel ls

# Forzar nuevo deploy
vercel --prod --force
```

### Limpiar caché de Next.js

```bash
rm -rf .next
npm run build
```

---

## Referencias

### Documentación oficial

- [Next.js 16](https://nextjs.org/docs)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Lucide Icons](https://lucide.dev/)
- [MDX](https://mdxjs.com/)

### Archivos del proyecto

- `BITACORA.md` - Historial completo de desarrollo
- `CLAUDE.md` - Contexto para Claude Code
- `WORKFLOW.md` - Flujo de trabajo Git
- `GUIA-CONTENIDO.md` - Guía para gestión de contenido

### URLs importantes

| Recurso | URL |
|---------|-----|
| Producción | https://portfolio-mparchistudio.vercel.app |
| Dashboard Vercel | https://vercel.com/dashboard |
| Repositorio | (añadir URL del repo) |

---

## Changelog de esta guía

- **2 enero 2026**: Versión inicial con setup completo, i18n, A/B testing
