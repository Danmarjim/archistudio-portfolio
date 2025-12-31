'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  alt?: string
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  alt = 'Imagen del proyecto',
}: LightboxProps) {
  // Manejar teclas de navegacion
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    },
    [isOpen, onClose, onPrev, onNext]
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

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={onClose}
        >
          {/* Boton cerrar */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Contador de imagenes */}
          <div className="absolute left-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Boton anterior */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Boton siguiente */}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Imagen */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative h-[80vh] w-[90vw] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} - ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </motion.div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    // Navegar al indice clickeado
                    const diff = index - currentIndex
                    if (diff > 0) {
                      for (let i = 0; i < diff; i++) onNext()
                    } else if (diff < 0) {
                      for (let i = 0; i < Math.abs(diff); i++) onPrev()
                    }
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-6 bg-white'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
