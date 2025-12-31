'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui'
import Container from '@/components/ui/Container'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}

export default function Hero({
  title = 'Arquitectura con alma',
  subtitle = 'Diseñamos espacios que inspiran, transforman y perduran. Cada proyecto es una historia única de luz, forma y función.',
  ctaText = 'Ver proyectos',
  ctaHref = '/proyectos',
}: HeroProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-background to-background" />

      {/* Decorative elements */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary-100/30 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-primary-200/20 blur-3xl" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-sm font-medium uppercase tracking-widest text-primary-600"
          >
            Estudio de Arquitectura
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-5xl font-medium leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 md:text-xl"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg">
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contacto">Contactar</Link>
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 transition-colors hover:text-foreground"
        aria-label="Scroll hacia abajo"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  )
}
