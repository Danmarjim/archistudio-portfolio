'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'

interface CallToActionProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}

export default function CallToAction({
  title = '¿Tienes un proyecto en mente?',
  subtitle = 'Cuéntanos tu idea y trabajemos juntos para hacerla realidad. Cada gran proyecto comienza con una conversación.',
  ctaText = 'Contactar',
  ctaHref = '/contacto',
}: CallToActionProps) {
  return (
    <section className="bg-primary-500 py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-serif text-4xl font-medium text-white md:text-5xl">
            {title}
          </h2>

          <p className="mt-6 text-lg text-primary-100">
            {subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50"
              asChild
            >
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
