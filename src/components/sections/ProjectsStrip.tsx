'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

/** `/images/projects/casa-archi-colori-03.jpg` → "Casa Archi Colori" */
function altFromSrc(src: string): string {
  const base = src.split('/').pop()?.replace(/\.[a-z0-9]+$/i, '') ?? ''
  const name = base.replace(/-\d+$/, '').replace(/[-_]+/g, ' ').trim()
  const pretty = name.charAt(0).toUpperCase() + name.slice(1)
  return pretty ? `${pretty} — MP_archistudio` : 'MP_archistudio'
}

interface ProjectsStripProps {
  images: string[]
  /** Optional subset of `images` that are portrait/vertical. Used on mobile viewports. */
  verticalImages?: string[]
}

export default function ProjectsStrip({ images, verticalImages }: ProjectsStripProps) {
  const [activeImages, setActiveImages] = useState(images)
  const [current, setCurrent] = useState(0)

  // Switch to the vertical-only set on mobile viewports (post-mount, to avoid
  // hydration mismatches between server and client render).
  useEffect(() => {
    if (!verticalImages || verticalImages.length === 0) return

    const mql = window.matchMedia('(max-width: 767px)')
    const applyList = () => {
      setActiveImages(mql.matches ? verticalImages : images)
      setCurrent(0)
    }

    applyList()
    mql.addEventListener('change', applyList)
    return () => mql.removeEventListener('change', applyList)
  }, [images, verticalImages])

  useEffect(() => {
    if (activeImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeImages.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [activeImages.length])

  if (!activeImages.length) return null

  return (
    <section
      style={{ backgroundColor: '#F0E6D8', minHeight: '70vh' }}
      className="relative flex items-center justify-center py-10"
    >
      {/* initial={false}: la prima immagine (LCP della home) è visibile già nell'HTML */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'linear' }}
          className="overflow-hidden rounded-2xl shadow-2xl"
        >
          <Image
            src={activeImages[current]}
            alt={altFromSrc(activeImages[current])}
            width={0}
            height={0}
            sizes="(max-width: 768px) 90vw, 70vw"
            style={{ width: 'auto', height: '60vh', maxWidth: '88vw', display: 'block' }}
            // Su mobile il carosello è sotto il ritratto, che è l'LCP: caricamento immediato ma
            // senza preload ad alta priorità, per non contendergli la banda.
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
