'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { ProjectCard } from '@/components/sections'
import { projectCategories } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

// Proyectos de ejemplo
const allProjects: Project[] = [
  {
    title: 'Casa del Bosque',
    slug: 'casa-del-bosque',
    category: 'Vivienda unifamiliar',
    location: 'Sierra de Madrid',
    year: 2024,
    client: 'Privado',
    surface: '280 m²',
    status: 'Construido',
    featured: true,
    coverImage: '/images/projects/placeholder-1.jpg',
    images: [],
    excerpt: 'Una vivienda que dialoga con el entorno natural, integrando materiales locales y técnicas sostenibles.',
    tags: ['sostenibilidad', 'madera', 'vivienda'],
  },
  {
    title: 'Loft Chamberí',
    slug: 'loft-chamberi',
    category: 'Reforma integral',
    location: 'Madrid',
    year: 2024,
    client: 'Privado',
    surface: '120 m²',
    status: 'Construido',
    featured: true,
    coverImage: '/images/projects/placeholder-2.jpg',
    images: [],
    excerpt: 'Transformación de un espacio industrial en un hogar contemporáneo lleno de luz y carácter.',
    tags: ['reforma', 'industrial', 'interiorismo'],
  },
  {
    title: 'Clínica Dental Sonríe',
    slug: 'clinica-dental-sonrie',
    category: 'Comercial',
    location: 'Barcelona',
    year: 2023,
    client: 'Clínica Sonríe S.L.',
    surface: '200 m²',
    status: 'Construido',
    featured: true,
    coverImage: '/images/projects/placeholder-3.jpg',
    images: [],
    excerpt: 'Un espacio que transmite calma y profesionalidad, diseñado para el bienestar del paciente.',
    tags: ['comercial', 'salud', 'minimalismo'],
  },
  {
    title: 'Villa Mediterránea',
    slug: 'villa-mediterranea',
    category: 'Vivienda unifamiliar',
    location: 'Costa Brava',
    year: 2023,
    client: 'Privado',
    surface: '350 m²',
    status: 'Construido',
    featured: false,
    coverImage: '/images/projects/placeholder-4.jpg',
    images: [],
    excerpt: 'Arquitectura que abraza el paisaje mediterráneo con terrazas escalonadas y vistas al mar.',
    tags: ['mediterraneo', 'vivienda', 'vistas'],
  },
  {
    title: 'Apartamento Malasaña',
    slug: 'apartamento-malasana',
    category: 'Interiorismo',
    location: 'Madrid',
    year: 2023,
    client: 'Privado',
    surface: '85 m²',
    status: 'Construido',
    featured: false,
    coverImage: '/images/projects/placeholder-5.jpg',
    images: [],
    excerpt: 'Diseño interior que maximiza el espacio y la luz en un apartamento del centro histórico.',
    tags: ['interiorismo', 'pequeños espacios', 'luz'],
  },
  {
    title: 'Oficinas Creativas',
    slug: 'oficinas-creativas',
    category: 'Comercial',
    location: 'Valencia',
    year: 2022,
    client: 'Startup Tech S.L.',
    surface: '400 m²',
    status: 'Construido',
    featured: false,
    coverImage: '/images/projects/placeholder-6.jpg',
    images: [],
    excerpt: 'Espacios de trabajo flexibles que fomentan la colaboración y la creatividad.',
    tags: ['oficinas', 'coworking', 'flexible'],
  },
]

export default function ProyectosPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredProjects = activeFilter
    ? allProjects.filter((project) => project.category === activeFilter)
    : allProjects

  return (
    <main className="py-12">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            Proyectos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Una selección de nuestros trabajos en arquitectura, reformas e interiorismo
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => setActiveFilter(null)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors',
              activeFilter === null
                ? 'bg-foreground text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            Todos
          </button>
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                activeFilter === category
                  ? 'bg-foreground text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-neutral-600">No hay proyectos en esta categoría.</p>
          </div>
        )}
      </Container>
    </main>
  )
}
