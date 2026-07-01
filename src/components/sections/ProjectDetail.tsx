'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Ruler, User, CheckCircle, Expand, Camera } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button, Badge, Lightbox } from '@/components/ui'
import { useLightbox } from '@/lib/hooks'
import { useTranslations } from 'next-intl'
import type { Project } from '@/types'

interface ProjectDetailProps {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

export default function ProjectDetail({ project, prevProject, nextProject }: ProjectDetailProps) {
  const t = useTranslations('ProjectDetail')

  const details = [
    { icon: MapPin, label: t('location'), value: project.location },
    { icon: Calendar, label: t('year'), value: project.year.toString() },
    { icon: Ruler, label: t('surface'), value: project.surface },
    { icon: User, label: t('client'), value: project.client },
    { icon: CheckCircle, label: t('status'), value: project.status },
    ...(project.photographer
      ? [{ icon: Camera, label: t('photographer'), value: project.photographer }]
      : []),
  ]

  // Esclude la coverImage dalla galleria: è già mostrata come hero sopra
  const allDimensions = project.imagesDimensions ?? []
  const galleryImages = project.images.filter((img) => img !== project.coverImage)
  const galleryDimensions = allDimensions.filter(
    (_, i) => project.images[i] !== project.coverImage
  )
  const lightbox = useLightbox(galleryImages.length)

  // Raggruppa le immagini per evitare spazi vuoti nel grid 3 colonne:
  // - Landscape (col-span-3) → sempre riga intera
  // - Portrait (col-span-1) → raggruppate in terzetti
  // Quando arriva una landscape con 1-2 portrait in sospeso,
  // la landscape va prima e le portrait restano in coda per il terzetto successivo.
  const organizedItems = useMemo(() => {
    const items = galleryImages.map((img, i) => ({
      img,
      dims: galleryDimensions[i] ?? null,
      isLandscape: !!galleryDimensions[i] &&
        galleryDimensions[i]!.width > galleryDimensions[i]!.height,
      originalIndex: i, // indice originale per il lightbox
    }))

    const result: typeof items = []
    const buffer: typeof items = []  // portrait in attesa di formare un terzetto

    for (const item of items) {
      if (item.isLandscape) {
        // Svuota i terzetti completi prima di inserire la landscape
        while (buffer.length >= 3) {
          result.push(buffer.shift()!, buffer.shift()!, buffer.shift()!)
        }
        // Inserisci la landscape (le 1-2 portrait rimaste nel buffer seguiranno dopo)
        result.push(item)
      } else {
        buffer.push(item)
        if (buffer.length === 3) {
          result.push(buffer.shift()!, buffer.shift()!, buffer.shift()!)
        }
      }
    }
    // Svuota le portrait rimanenti (al massimo 2, possibile gap solo a fine galleria)
    result.push(...buffer)

    return result
  }, [galleryImages, galleryDimensions])

  return (
    <div className="py-12">
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
              {t('backToProjects')}
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
              {t('aboutProject')}
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
                {t('details')}
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
        {galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="font-serif text-2xl font-medium text-foreground">
              {t('gallery')}
            </h2>
            {/* Grid senza spazi vuoti: landscape = riga intera, portrait = terzetti */}
            <div className="mt-6 grid items-start gap-4 lg:grid-cols-3">
              {organizedItems.map((item) => (
                <button
                  key={item.originalIndex}
                  onClick={() => lightbox.open(item.originalIndex)}
                  className={[
                    'group relative block w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-100 transition-transform hover:scale-[1.02]',
                    item.isLandscape ? 'lg:col-span-3' : '',
                  ].join(' ')}
                >
                  <Image
                    src={item.img}
                    alt={`${project.title} - Immagine ${item.originalIndex + 1}`}
                    width={0}
                    height={0}
                    sizes={item.isLandscape
                      ? '100vw'
                      : '(max-width: 1024px) 100vw, 33vw'}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    className="transition-transform duration-300 group-hover:scale-105"
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
                <p className="text-sm text-neutral-500">{t('previous')}</p>
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
                <p className="text-sm text-neutral-500">{t('next')}</p>
                <p className="font-medium">{nextProject.title}</p>
              </div>
              <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </motion.div>
      </Container>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        onPrev={lightbox.prev}
        onNext={lightbox.next}
        onSetIndex={lightbox.setIndex}
        alt={project.title}
      />
    </div>
  )
}
