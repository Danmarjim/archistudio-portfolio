'use client'

import { useState, useCallback } from 'react'

interface UseLightboxReturn {
  isOpen: boolean
  currentIndex: number
  open: (index: number) => void
  close: () => void
  prev: () => void
  next: () => void
  setIndex: (index: number) => void
}

export function useLightbox(totalImages: number): UseLightboxReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const open = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((current) => (current > 0 ? current - 1 : current))
  }, [])

  const next = useCallback(() => {
    setCurrentIndex((current) =>
      current < totalImages - 1 ? current + 1 : current
    )
  }, [totalImages])

  const setIndex = useCallback((index: number) => {
    if (index >= 0 && index < totalImages) {
      setCurrentIndex(index)
    }
  }, [totalImages])

  return {
    isOpen,
    currentIndex,
    open,
    close,
    prev,
    next,
    setIndex,
  }
}
