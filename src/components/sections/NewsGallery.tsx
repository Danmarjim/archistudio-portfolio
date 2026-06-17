'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface NewsGalleryProps {
  images: string[]
  title?: string
}

const SWIPE_THRESHOLD = 50

export default function NewsGallery({ images, title = '' }: NewsGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    if (current < images.length - 1) goTo(current + 1)
  }, [current, images.length, goTo])

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next()
    else if (info.offset.x > SWIPE_THRESHOLD) prev()
  }, [next, prev])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  if (!images || images.length === 0) return null

  return (
    <>
      <div className="mt-10">
        {/* Carosello principale */}
        <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
          <div className="aspect-[3/2]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={images[current]}
                  alt={`${title} - ${current + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority={current === 0}
                />
                {/* Zoom hint */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition hover:bg-black/60"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  Ingrandisci
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Frecce */}
          {current > 0 && (
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {current < images.length - 1 && (
            <button
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Contatore */}
          <div className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {current + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  i === current
                    ? 'ring-2 ring-primary-600 ring-offset-1'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} - ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox fullscreen */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute left-4 top-4 z-20 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
              {current + 1} / {images.length}
            </div>

            <motion.div
              className="relative h-[90vh] w-[95vw] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <Image
                src={images[current]}
                alt={`${title} - ${current + 1}`}
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
            </motion.div>

            {current > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {current < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goTo(i) }}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
