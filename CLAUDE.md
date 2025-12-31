CLAUDE.md - Contexto del Proyecto

Este archivo proporciona contexto a Claude Code para el desarrollo del portfolio de arquitectura.

Resumen del Proyecto
Portfolio web profesional para una arquitecta independiente. Sitio minimalista y elegante que prioriza la presentación visual de proyectos.
Stack Tecnológico
Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + Framer Motion
Comandos Frecuentes
bashnpm run dev        # Desarrollo
npm run build      # Build producción
npm run lint       # Linting
vercel --prod      # Deploy
Estructura Principal
src/
├── app/           # Páginas (App Router)
├── components/    # ui/, sections/, layout/, shared/
├── lib/           # Utilidades
└── types/         # TypeScript types

content/
└── projects/      # MDX de proyectos
Convenciones de Código
Componentes

PascalCase para nombres
Un componente por archivo
Props tipadas con interface
Exportar como export default

Estilos

Tailwind CSS exclusivamente (no CSS modules)
Usar cn() de lib/utils para clases condicionales
Mobile-first responsive

Imports
typescript// Usar alias @/ para imports absolutos
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
Patrones Clave
Animaciones con Framer Motion
typescriptimport { motion } from 'framer-motion'

// Fade in al scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
Imágenes Optimizadas
typescriptimport Image from 'next/image'

<Image
  src={src}
  alt={alt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
Metadata SEO
typescriptexport const metadata: Metadata = {
  title: 'Página | Nombre Arquitecta',
  description: 'Descripción...',
}
Tipos Principales
typescriptinterface Project {
  title: string
  slug: string
  category: string
  year: number
  coverImage: string
  images: string[]
  excerpt: string
  featured: boolean
}
Páginas del Sitio
RutaDescripción/Homepage con hero, proyectos destacados, servicios/proyectosGrid de todos los proyectos con filtros/proyectos/[slug]Página individual de proyecto/sobre-miBiografía y trayectoria/serviciosLista de servicios ofrecidos/contactoFormulario de contacto
Paleta de Colores
primary: tonos cálidos/tierra (#a07848)
neutral: grises elegantes
background: #fafaf9 (casi blanco cálido)
foreground: #1a1a1a (negro elegante)
Fuentes

Títulos: Playfair Display (serif)
Cuerpo: Inter (sans-serif)

Prioridades de Desarrollo

✅ Funcionalidad antes que perfección visual
✅ Mobile-first responsive
✅ Código tipado y limpio
✅ Imágenes siempre optimizadas con next/image
✅ Animaciones sutiles, no intrusivas

NO hacer

❌ No usar <img> nativo, siempre next/image
❌ No crear CSS custom (usar Tailwind)
❌ No hardcodear textos (usar constantes o MDX)
❌ No animaciones excesivas o lentas
❌ No ignorar TypeScript errors

Recursos

Next.js 15 Docs
Tailwind CSS
Framer Motion

Estado Actual
Fase: Inicio del proyecto
Próximo paso: Inicializar proyecto con create-next-app