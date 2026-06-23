'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ProjectsStripProps {
  images: string[]
}

export default function ProjectsStrip({ images }: ProjectsStripProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [images.length])

  if (!images.length) return null

  return (
    <section
      style={{ backgroundColor: '#F0E6D8', minHeight: '70vh' }}
      className="relative flex items-center justify-center py-10"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'linear' }}
          className="overflow-hidden rounded-2xl shadow-2xl"
        >
          <Image
            src={images[current]}
            alt={`Progetto ${current + 1}`}
            width={0}
            height={0}
            sizes="(max-width: 768px) 90vw, 70vw"
            style={{ width: 'auto', height: '60vh', maxWidth: '88vw', display: 'block' }}
            priority
          />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
