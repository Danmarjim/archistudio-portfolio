'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Ruler, User, CheckCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button, Badge } from '@/components/ui'
import type { Project } from '@/types'

// Proyectos de ejemplo (mismos que en /proyectos)
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
    images: [
      '/images/projects/placeholder-1.jpg',
      '/images/projects/placeholder-2.jpg',
      '/images/projects/placeholder-3.jpg',
    ],
    excerpt: 'Una vivienda que dialoga con el entorno natural, integrando materiales locales y técnicas sostenibles.',
    tags: ['sostenibilidad', 'madera', 'vivienda'],
    content: `Este proyecto nace de la voluntad de crear un hogar que respete y dialogue con su entorno natural.

Situada en plena Sierra de Madrid, la Casa del Bosque se integra en el paisaje mediante el uso de materiales locales como la piedra y la madera, minimizando su impacto visual y ambiental.

La distribución interior prioriza la luz natural y las vistas al bosque circundante, con amplios ventanales que difuminan los límites entre interior y exterior. Los espacios fluyen de manera orgánica, adaptándose a las necesidades de sus habitantes.

El proyecto incorpora soluciones sostenibles como paneles solares, sistema de recogida de aguas pluviales y un excelente aislamiento térmico que reduce drásticamente el consumo energético.`,
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
    images: [
      '/images/projects/placeholder-2.jpg',
      '/images/projects/placeholder-1.jpg',
      '/images/projects/placeholder-4.jpg',
    ],
    excerpt: 'Transformación de un espacio industrial en un hogar contemporáneo lleno de luz y carácter.',
    tags: ['reforma', 'industrial', 'interiorismo'],
    content: `El Loft Chamberí representa la transformación de un antiguo taller industrial en un hogar contemporáneo que conserva la esencia y el carácter del espacio original.

Se han mantenido elementos característicos como los techos altos, las vigas de hierro vistas y los grandes ventanales industriales, combinándolos con acabados modernos y una paleta de materiales cálidos.

La planta abierta se organiza en torno a un núcleo central que contiene cocina y baños, liberando el perímetro para las zonas de estar y dormitorio principal. Un altillo aprovecha la doble altura para crear un espacio de trabajo con vistas al salón.`,
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
    images: [
      '/images/projects/placeholder-3.jpg',
      '/images/projects/placeholder-5.jpg',
      '/images/projects/placeholder-6.jpg',
    ],
    excerpt: 'Un espacio que transmite calma y profesionalidad, diseñado para el bienestar del paciente.',
    tags: ['comercial', 'salud', 'minimalismo'],
    content: `La Clínica Dental Sonríe fue concebida para ofrecer una experiencia diferente al paciente, alejada de los estereotipos fríos asociados a los espacios médicos.

El diseño se basa en crear ambientes acogedores mediante el uso de materiales naturales, una iluminación cuidada y una paleta cromática serena. La recepción funciona como un espacio de transición que prepara al paciente, reduciendo su ansiedad.

Los gabinetes se han diseñado priorizando tanto la funcionalidad para los profesionales como el confort del paciente, con vistas al exterior y acabados que transmiten calidez.`,
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
    images: [
      '/images/projects/placeholder-4.jpg',
      '/images/projects/placeholder-1.jpg',
      '/images/projects/placeholder-3.jpg',
    ],
    excerpt: 'Arquitectura que abraza el paisaje mediterráneo con terrazas escalonadas y vistas al mar.',
    tags: ['mediterraneo', 'vivienda', 'vistas'],
    content: `Villa Mediterránea es un homenaje a la arquitectura tradicional de la Costa Brava, reinterpretada con un lenguaje contemporáneo.

La vivienda se adapta a la topografía del terreno mediante una serie de terrazas escalonadas que maximizan las vistas al mar y crean espacios exteriores íntimos. Los muros de piedra local y las pérgolas de madera filtran la intensa luz mediterránea.

La piscina infinita se funde visualmente con el horizonte marino, mientras que los jardines de plantas autóctonas requieren mínimo mantenimiento y riego.`,
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
    images: [
      '/images/projects/placeholder-5.jpg',
      '/images/projects/placeholder-2.jpg',
      '/images/projects/placeholder-6.jpg',
    ],
    excerpt: 'Diseño interior que maximiza el espacio y la luz en un apartamento del centro histórico.',
    tags: ['interiorismo', 'pequeños espacios', 'luz'],
    content: `Este apartamento en el corazón de Malasaña presentaba el reto de maximizar un espacio reducido sin perder carácter ni funcionalidad.

La intervención se centró en eliminar tabiques innecesarios, crear almacenaje integrado y seleccionar una paleta de colores claros que amplía visualmente el espacio. El mobiliario a medida aprovecha cada rincón.

Se recuperaron elementos originales como los suelos hidráulicos y las molduras del techo, combinándolos con piezas de diseño contemporáneo que dan personalidad al espacio.`,
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
    images: [
      '/images/projects/placeholder-6.jpg',
      '/images/projects/placeholder-3.jpg',
      '/images/projects/placeholder-4.jpg',
    ],
    excerpt: 'Espacios de trabajo flexibles que fomentan la colaboración y la creatividad.',
    tags: ['oficinas', 'coworking', 'flexible'],
    content: `Las Oficinas Creativas fueron diseñadas para una startup tecnológica que necesitaba espacios que fomentaran la colaboración sin sacrificar la concentración individual.

El diseño se organiza en torno a un gran espacio central de encuentro, rodeado de zonas de trabajo más íntimas. Cabinas telefónicas, salas de reuniones de diferentes tamaños y áreas de descanso completan el programa.

La acústica fue tratada cuidadosamente mediante paneles absorbentes integrados en el diseño, y la iluminación natural se complementa con un sistema de luz artificial que se adapta al ritmo circadiano.`,
  },
]

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // Unwrap params using React.use() pattern for Next.js 15+
  const { slug } = require('react').use(params)

  const project = allProjects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  // Encontrar proyectos anterior y siguiente para navegación
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  const details = [
    { icon: MapPin, label: 'Ubicación', value: project.location },
    { icon: Calendar, label: 'Año', value: project.year.toString() },
    { icon: Ruler, label: 'Superficie', value: project.surface },
    { icon: User, label: 'Cliente', value: project.client },
    { icon: CheckCircle, label: 'Estado', value: project.status },
  ]

  return (
    <main className="py-12">
      <Container>
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" size="sm" asChild>
            <Link href="/proyectos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a proyectos
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <Badge variant="secondary" className="mb-4">
            {project.category}
          </Badge>
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600 md:text-xl">
            {project.excerpt}
          </p>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100"
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </motion.div>

        {/* Content Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h2 className="font-serif text-2xl font-medium text-foreground">
              Sobre el proyecto
            </h2>
            <div className="prose prose-neutral mt-6 max-w-none">
              {project.content?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-neutral-600">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Sidebar - Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="rounded-2xl bg-neutral-50 p-6">
              <h3 className="font-serif text-lg font-medium text-foreground">
                Detalles del proyecto
              </h3>
              <dl className="mt-6 space-y-4">
                {details.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-3">
                    <detail.icon className="mt-0.5 h-5 w-5 text-primary-600" />
                    <div>
                      <dt className="text-sm text-neutral-500">{detail.label}</dt>
                      <dd className="font-medium text-foreground">{detail.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Image Gallery Preview */}
        {project.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="font-serif text-2xl font-medium text-foreground">
              Galería
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-neutral-100 transition-transform hover:scale-[1.02]"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-8"
        >
          {prevProject ? (
            <Link
              href={`/proyectos/${prevProject.slug}`}
              className="group flex items-center gap-3 text-neutral-600 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="text-sm text-neutral-500">Anterior</p>
                <p className="font-medium">{prevProject.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextProject && (
            <Link
              href={`/proyectos/${nextProject.slug}`}
              className="group flex items-center gap-3 text-right text-neutral-600 transition-colors hover:text-foreground"
            >
              <div>
                <p className="text-sm text-neutral-500">Siguiente</p>
                <p className="font-medium">{nextProject.title}</p>
              </div>
              <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </motion.div>
      </Container>
    </main>
  )
}
