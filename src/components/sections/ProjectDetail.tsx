'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Ruler, User, CheckCircle, Expand } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button, Badge, Lightbox } from '@/components/ui'
import { useLightbox } from '@/lib/hooks'
import type { Project } from '@/types'

interface ProjectDetailProps {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

export default function ProjectDetail({ project, prevProject, nextProject }: ProjectDetailProps) {
  const details = [
    { icon: MapPin, label: 'Ubicación', value: project.location },
    { icon: Calendar, label: 'Año', value: project.year.toString() },
    { icon: Ruler, label: 'Superficie', value: project.surface },
    { icon: User, label: 'Cliente', value: project.client },
    { icon: CheckCircle, label: 'Estado', value: project.status },
  ]

  const lightbox = useLightbox(project.images.length)

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

        {/* Image Gallery */}
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
                <button
                  key={index}
                  onClick={() => lightbox.open(index)}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-neutral-100 transition-transform hover:scale-[1.02]"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Imagen ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                    <Expand className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </button>
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

      {/* Lightbox */}
      <Lightbox
        images={project.images}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        onPrev={lightbox.prev}
        onNext={lightbox.next}
        alt={project.title}
      />
    </main>
  )
}
