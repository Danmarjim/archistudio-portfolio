'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Video, Key, Paintbrush } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import { services } from '@/lib/constants'
import type { Service } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  video: Video,
  key: Key,
  paintbrush: Paintbrush,
}

interface ServiceCardProps {
  service: Service
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Home

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
        {service.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-neutral-600">
        {service.description}
      </p>

      {/* Features */}
      <ul className="mt-6 space-y-2">
        {service.features.slice(0, 3).map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-neutral-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

interface ServicesPreviewProps {
  title?: string
  subtitle?: string
  showCta?: boolean
}

export default function ServicesPreview({
  title = 'Servizi',
  subtitle = 'Soluzioni complete di architettura e design su misura per ogni progetto',
  showCta = true,
}: ServicesPreviewProps) {
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
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            {subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
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
            <Button variant="outline" size="lg" asChild>
              <Link href="/servicios">
                Vedi tutti i servizi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
