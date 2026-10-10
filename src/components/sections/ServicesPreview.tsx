'use client'

import { Link } from '@/i18n/navigation'
import { serviceHref } from '@/lib/routes'
import { motion } from 'framer-motion'
import { Home, Video, Key, Paintbrush, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import { services } from '@/lib/constants'
import type { Service } from '@/types'
import { useTranslations } from 'next-intl'

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  video: Video,
  key: Key,
  paintbrush: Paintbrush,
}

const serviceSlugToKey: Record<string, string> = {
  'archiadvice': 'archiadvice',
  'consulenza-acquisto': 'consulenzaAcquisto',
  'restyling': 'restyling',
  'progettazione-architettonica': 'progettazione',
}

interface ServiceCardProps {
  service: Service
  index: number
  /** Slug della pagina del servizio, se pubblicata; altrimenti il link va all'hub /servizi */
  pageSlug?: string
}

function ServiceCard({ service, index, pageSlug }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Home
  const sd = useTranslations('ServicesData')
  const t = useTranslations('ServicesPreview')
  const key = serviceSlugToKey[service.slug] ?? service.slug

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl bg-white p-8 transition-shadow hover:shadow-lg"
    >
      {/* Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
        <Icon className="h-7 w-7" />
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl font-medium text-foreground">
        {sd(`${key}.title`)}
      </h3>

      {/* Description */}
      <p className="mt-3 font-medium text-foreground">
        {sd(`${key}.question`)}
      </p>
      <p className="mt-3 leading-relaxed text-neutral-600">
        {sd(`${key}.summary`)}
      </p>

      <Link
        href={pageSlug ? serviceHref(pageSlug) : '/servicios'}
        className="mt-6 inline-flex items-center gap-2 font-medium text-primary-700 underline-offset-4 hover:underline"
      >
        {t('learnMore')}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

interface ServicesPreviewProps {
  showCta?: boolean
  /** Pagine di servizio pubblicate: `serviceKey` → slug */
  servicePages?: Record<string, string>
}

export default function ServicesPreview({
  showCta = true,
  servicePages = {},
}: ServicesPreviewProps) {
  const t = useTranslations('ServicesPreview')
  return (
    <section className="py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
              pageSlug={servicePages[service.slug]}
            />
          ))}
        </div>

        {/* CTA */}
        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button variant="outline" size="lg" trailingIcon asChild>
              <Link href="/servicios">{t('cta')}</Link>
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
