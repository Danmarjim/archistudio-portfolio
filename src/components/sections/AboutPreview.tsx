'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import { useTranslations } from 'next-intl'

interface AboutPreviewProps {
  image?: string
  ctaHref?: string
}

export default function AboutPreview({
  image = '/images/about/_K7A9361.jpg',
  ctaHref = '/sobre-mi',
}: AboutPreviewProps) {
  const t = useTranslations('AboutPreview')
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
            <div className="absolute -bottom-6 -right-6 h-full w-full rounded-2xl bg-primary-100" />
            <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={image}
                alt="Martina C.M. Pozzi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-600">
              {t('overline')}
            </p>

            <h2 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
              {t('title')}
            </h2>

            <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-600">
              <p>{t('description')}</p>
            </div>

            <div className="mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link href={ctaHref}>
                  {t('cta')}
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
