'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ImageWithLoaderProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
  /** Larghezza reale dell'immagine: se fornita insieme a naturalHeight e senza aspectRatio,
   *  il contenitore assume il rapporto esatto dell'immagine (nessun ritaglio). */
  naturalWidth?: number
  naturalHeight?: number
  showSkeleton?: boolean
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

export default function ImageWithLoader({
  src,
  alt,
  className,
  aspectRatio,
  naturalWidth,
  naturalHeight,
  showSkeleton = true,
  fill = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // Se non è specificato un aspectRatio fisso ma conosciamo le dimensioni reali,
  // impostiamo il rapporto esatto via inline style così l'immagine non viene ritagliata.
  const naturalStyle =
    !aspectRatio && naturalWidth && naturalHeight
      ? { aspectRatio: `${naturalWidth} / ${naturalHeight}` }
      : undefined

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-neutral-100',
        aspectRatio && aspectRatioClasses[aspectRatio],
        // Fallback se non abbiamo né aspectRatio né dimensioni naturali
        !aspectRatio && (!naturalWidth || !naturalHeight) && 'aspect-[4/3]',
        className
      )}
      style={naturalStyle}
    >
      {/* Skeleton loader */}
      {showSkeleton && isLoading && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-neutral-200" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <span className="text-sm text-neutral-400">Error al cargar imagen</span>
        </div>
      )}

      {/* Image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          className={cn(
            'object-cover transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  )
}
