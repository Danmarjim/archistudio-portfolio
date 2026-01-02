'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

interface LightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onSetIndex?: (index: number) => void
  alt?: string
}

// Threshold para detectar swipe
const SWIPE_THRESHOLD = 50
const SWIPE_VELOCITY_THRESHOLD = 500

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  onSetIndex,
  alt = 'Imagen del proyecto',
}: LightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Reset zoom cuando cambia la imagen o se cierra
  useEffect(() => {
    setIsZoomed(false)
  }, [currentIndex, isOpen])

  // Manejar teclas de navegacion
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          if (isZoomed) {
            setIsZoomed(false)
          } else {
            onClose()
          }
          break
        case 'ArrowLeft':
          if (!isZoomed) {
            setDirection(-1)
            onPrev()
          }
          break
        case 'ArrowRight':
          if (!isZoomed) {
            setDirection(1)
            onNext()
          }
          break
      }
    },
    [isOpen, isZoomed, onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevenir scroll del body cuando el lightbox esta abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Manejar swipe
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (isZoomed) return

      const { offset, velocity } = info
      const swipedRight = offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD
      const swipedLeft = offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD

      if (swipedRight && currentIndex > 0) {
        setDirection(-1)
        onPrev()
      } else if (swipedLeft && currentIndex < images.length - 1) {
        setDirection(1)
        onNext()
      }
    },
    [isZoomed, currentIndex, images.length, onPrev, onNext]
  )

  // Toggle zoom con doble click/tap
  const handleDoubleClick = useCallback(() => {
    setIsZoomed((prev) => !prev)
  }, [])

  // Ir a indice especifico
  const goToIndex = useCallback(
    (index: number) => {
      if (onSetIndex) {
        setDirection(index > currentIndex ? 1 : -1)
        onSetIndex(index)
      }
    },
    [currentIndex, onSetIndex]
  )

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1

  // Variantes para animacion direccional
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={() => !isZoomed && onClose()}
          ref={constraintsRef}
        >
          {/* Controles superiores */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4">
            {/* Contador de imagenes */}
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Botones de accion */}
            <div className="flex items-center gap-2">
              {/* Toggle zoom */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsZoomed((prev) => !prev)
                }}
                className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label={isZoomed ? 'Alejar' : 'Acercar'}
              >
                {isZoomed ? (
                  <ZoomOut className="h-5 w-5" />
                ) : (
                  <ZoomIn className="h-5 w-5" />
                )}
              </button>

              {/* Boton cerrar */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Boton anterior */}
          {hasPrev && !isZoomed && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation()
                setDirection(-1)
                onPrev()
              }}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
          )}

          {/* Boton siguiente */}
          {hasNext && !isZoomed && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation()
                setDirection(1)
                onNext()
              }}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          )}

          {/* Contenedor de imagen con swipe */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
                scale: { duration: 0.2 },
              }}
              drag={isZoomed ? 'x' : 'x'}
              dragConstraints={isZoomed ? constraintsRef : { left: 0, right: 0 }}
              dragElastic={isZoomed ? 0.1 : 0.2}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handleDoubleClick}
              className={`relative cursor-grab active:cursor-grabbing ${
                isZoomed
                  ? 'h-[95vh] w-[95vw]'
                  : 'h-[80vh] w-[90vw] max-w-6xl'
              }`}
              style={{
                touchAction: 'none',
              }}
            >
              <motion.div
                animate={{
                  scale: isZoomed ? 1.5 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                className="relative h-full w-full"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${alt} - ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="95vw"
                  priority
                  draggable={false}
                />
              </motion.div>

              {/* Indicador de swipe en movil */}
              {!isZoomed && images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/50 sm:hidden">
                  Desliza para navegar
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Thumbnails mejorados */}
          {images.length > 1 && !isZoomed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 px-4 py-3 backdrop-blur-sm"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToIndex(index)
                  }}
                  className="group relative"
                  aria-label={`Ir a imagen ${index + 1}`}
                >
                  <motion.div
                    className={`h-2 rounded-full transition-colors ${
                      index === currentIndex
                        ? 'bg-white'
                        : 'bg-white/40 group-hover:bg-white/70'
                    }`}
                    animate={{
                      width: index === currentIndex ? 24 : 8,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                </button>
              ))}
            </motion.div>
          )}

          {/* Instrucciones de zoom */}
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white/70 backdrop-blur-sm"
            >
              Doble click para alejar • Arrastra para mover
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
