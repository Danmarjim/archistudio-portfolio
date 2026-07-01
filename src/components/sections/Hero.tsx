'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui'
import Container from '@/components/ui/Container'
import { useTranslations } from 'next-intl'

interface HeroProps {
  title?: string
  ctaHref?: string
}

export default function Hero({
  title = 'Diamo forma e colore ai tuoi sogni',
  ctaHref = '/proyectos',
}: HeroProps) {
  const t = useTranslations('Navigation')

  return (
    <section className="relative flex overflow-hidden pt-16 pb-10 justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-background to-background" />

      {/* Decorative elements */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary-100/30 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-primary-200/20 blur-3xl" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative h-44 w-44 overflow-hidden rounded-full ring-2 ring-primary-300 ring-offset-4 ring-offset-background">
              <Image
                src="/images/about/placeholder.jpg"
                alt="Martina Pozzi"
                fill
                className="object-cover"
                sizes="176px"
                priority
              />
            </div>
          </motion.div>

          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 text-sm font-medium uppercase tracking-widest text-primary-600"
          >
            Studio di Architettura ed Interior Design
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-serif text-2xl font-medium leading-tight tracking-tight text-foreground sm:whitespace-nowrap sm:text-3xl lg:text-4xl xl:text-5xl"
          >
            {title}
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button asChild size="lg">
              <Link href={ctaHref}>{t('projects')}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contacto">{t('contact')}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/servicios">{t('services')}</Link>
            </Button>
          </motion.div>
        </div>
      </Container>

    </section>
  )
}
