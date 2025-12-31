'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import ProjectCard from './ProjectCard'
import type { Project } from '@/types'

interface FeaturedProjectsProps {
  projects?: Project[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
}

// Proyectos de ejemplo para desarrollo
const sampleProjects: Project[] = [
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
]

export default function FeaturedProjects({
  projects = sampleProjects,
  title = 'Proyectos destacados',
  subtitle = 'Una selección de nuestros trabajos más recientes',
  showViewAll = true,
}: FeaturedProjectsProps) {
  const displayProjects = projects.length > 0 ? projects : sampleProjects

  return (
    <section className="py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            {subtitle}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/proyectos">
                Ver todos los proyectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
