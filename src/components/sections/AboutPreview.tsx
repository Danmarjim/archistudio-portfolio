'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button, ImageWithLoader } from '@/components/ui'

interface AboutPreviewProps {
  image?: string
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaHref?: string
}

export default function AboutPreview({
  image = '/images/about/placeholder.jpg',
  title = 'Sobre mí',
  subtitle = 'Arquitectura con propósito',
  description = 'Soy una arquitecta apasionada por crear espacios que mejoran la vida de las personas. Mi enfoque combina funcionalidad, estética y sostenibilidad, buscando siempre soluciones que respeten el entorno y respondan a las necesidades reales de cada cliente. Cada proyecto es una oportunidad para explorar nuevas formas de habitar.',
  ctaText = 'Conocer más',
  ctaHref = '/sobre-mi',
}: AboutPreviewProps) {
  return (
    <section className="bg-neutral-50 py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <ImageWithLoader
                src={image}
                alt="Foto de la arquitecta"
                aspectRatio="portrait"
                className="w-full"
              />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary-100" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-600">
              {title}
            </p>

            <h2 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
              {subtitle}
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              {description}
            </p>

            <div className="mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
