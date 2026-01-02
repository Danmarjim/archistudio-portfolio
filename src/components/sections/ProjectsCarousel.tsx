'use client'

import { useState, useEffect, useCallback } from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button, Badge } from '@/components/ui'
import type { Project } from '@/types'

interface ProjectsCarouselProps {
  projects: Project[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
  autoplay?: boolean
  autoplayInterval?: number
}

export default function ProjectsCarousel({
  projects,
  title = 'Proyectos destacados',
  subtitle = 'Una selección de nuestros trabajos más recientes',
  showViewAll = true,
  autoplay = true,
  autoplayInterval = 5000,
}: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0)

  const projectsToShow = projects.slice(0, 6)
  const totalSlides = projectsToShow.length

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((prev) => {
      setDirection(index > prev ? 1 : -1)
      return index
    })
  }, [])

  const goToNext = useCallback(() => {
    if (totalSlides === 0) return
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const goToPrev = useCallback(() => {
    if (totalSlides === 0) return
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || totalSlides <= 1) return

    const interval = setInterval(goToNext, autoplayInterval)
    return () => clearInterval(interval)
  }, [autoplay, isPaused, autoplayInterval, goToNext, totalSlides])

  // Keyboard navigation
  useEffect(() => {
    if (totalSlides === 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev, totalSlides])

  // Swipe handler
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    const velocity = 500

    if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      goToNext()
    } else if (info.offset.x > threshold || info.velocity.x > velocity) {
      goToPrev()
    }
  }, [goToNext, goToPrev])

  // Early return if no projects (after all hooks)
  if (totalSlides === 0) {
    return null
  }

  const currentProject = projectsToShow[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  return (
    <section className="py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            {subtitle}
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Carousel Area */}
          <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
            <div className="aspect-[16/9] md:aspect-[21/9]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <Link href={`/proyectos/${currentProject.slug}`} className="block h-full">
                    <div className="relative h-full w-full">
                      <Image
                        src={currentProject.coverImage}
                        alt={currentProject.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={currentIndex === 0}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Badge variant="primary" className="mb-3">
                            {currentProject.category}
                          </Badge>
                          <h3 className="font-serif text-2xl font-medium text-white md:text-4xl">
                            {currentProject.title}
                          </h3>
                          <p className="mt-2 max-w-xl text-sm text-white/80 md:text-base">
                            {currentProject.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
                            <span>{currentProject.location}</span>
                            <span>•</span>
                            <span>{currentProject.year}</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              aria-label="Siguiente proyecto"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Progress Bar (for autoplay) */}
            {autoplay && !isPaused && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: autoplayInterval / 1000, ease: 'linear' }}
                  key={currentIndex}
                />
              </div>
            )}
          </div>

          {/* Dot Indicators */}
          <div className="mt-6 flex justify-center gap-2">
            {projectsToShow.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary-600'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Preview */}
          <div className="mt-8 hidden gap-4 md:flex">
            {projectsToShow.map((project, index) => (
              <button
                key={project.slug}
                onClick={() => goToSlide(index)}
                className={`relative flex-1 overflow-hidden rounded-lg transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-primary-600 ring-offset-2'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="aspect-video">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 16vw"
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2">
                  <span className="truncate text-xs font-medium text-white">
                    {project.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
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
