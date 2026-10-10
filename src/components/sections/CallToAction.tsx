'use client'

import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import { useTranslations } from 'next-intl'
import type { StaticPathname } from '@/i18n/routing'

interface CallToActionProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: StaticPathname
}

export default function CallToAction({
  title,
  subtitle,
  ctaText,
  ctaHref = '/contacto',
}: CallToActionProps) {
  const t = useTranslations('CallToAction')
  const resolvedTitle = title ?? t('title')
  const resolvedSubtitle = subtitle ?? t('subtitle')
  const resolvedCta = ctaText ?? t('cta')
  return (
    <section className="bg-primary-600 py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-serif text-4xl font-medium text-white md:text-5xl">
            {resolvedTitle}
          </h2>

          <p className="mt-6 text-lg text-primary-100">
            {resolvedSubtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <Button variant="inverse" size="lg" trailingIcon asChild>
              <Link href={ctaHref}>{resolvedCta}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
