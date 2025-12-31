'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ImageWithLoaderProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
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
  showSkeleton = true,
  fill = true,
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

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-neutral-100',
        aspectRatio && aspectRatioClasses[aspectRatio],
        className
      )}
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
