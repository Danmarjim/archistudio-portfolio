'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Video, Key, Paintbrush, CheckCircle2 } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import NavBand from '@/components/sections/NavBand'
import { useTranslations } from 'next-intl'

const serviceImages: Record<string, string> = {
  archiadvice: '/images/services/archiadvice.jpg',
  'consulenza-acquisto': '/images/services/consulenza-acquisto.jpg',
  restyling: '/images/services/restyling.jpg',
  'progettazione-architettonica': '/images/services/progettazione.jpg',
}

const iconMap: Record<string, React.ElementType> = {
  home: Home, video: Video, key: Key, paintbrush: Paintbrush,
}

const serviceSlugToKey: Record<string, string> = {
  archiadvice: 'archiadvice',
  'consulenza-acquisto': 'consulenzaAcquisto',
  restyling: 'restyling',
  'progettazione-architettonica': 'progettazione',
}

const serviceNumbers: Record<string, number> = {
  archiadvice: 1,
  'consulenza-acquisto': 2,
  restyling: 3,
  'progettazione-architettonica': 4,
}

const serviceIcons: Record<string, string> = {
  archiadvice: 'video',
  'consulenza-acquisto': 'key',
  restyling: 'paintbrush',
  'progettazione-architettonica': 'home',
}

const slugs = ['archiadvice', 'consulenza-acquisto', 'restyling', 'progettazione-architettonica']

export default function ServiciosPage() {
  const t = useTranslations('ServiciosPage')
  const sd = useTranslations('ServicesData')

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl">
              {t('heroSubtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services */}
      <section className="pb-24">
        <Container>
          <div className="space-y-28">
            {slugs.map((slug, index) => {
              const key = serviceSlugToKey[slug]
              const Icon = iconMap[serviceIcons[slug]] || Home
              const isReversed = index % 2 !== 0
              const number = serviceNumbers[slug]
              const features = [sd(`${key}.f1`), sd(`${key}.f2`), sd(`${key}.f3`), sd(`${key}.f4`)]

              const ctaHref = slug === 'archiadvice'
                ? 'https://calendly.com/mp_archistudio'
                : slug === 'progettazione-architettonica'
                ? '#come-lavoriamo'
                : '/contacto'

              const ctaIsExternal = slug === 'archiadvice'

              return (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  id={slug}
                  className="grid items-center gap-12 lg:grid-cols-2 scroll-mt-28"
                >
                  {/* Content */}
                  <div className={isReversed ? 'lg:order-2' : ''}>
                    <div className="mb-4 flex items-center gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
                        {number}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>

                    <h3 className="font-serif text-3xl font-medium uppercase tracking-wide text-primary-600">
                      {sd(`${key}.title`)}
                    </h3>

                    <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-primary-600">
                      {sd(`${key}.label`)}
                    </p>

                    <ul className="mt-3 space-y-3">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                          <span className="text-neutral-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {ctaIsExternal ? (
                      <a
                        href={ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                      >
                        {sd(`${key}.cta`)}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <a
                        href={ctaHref}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                      >
                        {sd(`${key}.cta`)}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Visual */}
                  <div className={`relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 ${isReversed ? 'lg:order-1' : ''}`}>
                    {serviceImages[slug] ? (
                      <Image
                        src={serviceImages[slug]}
                        alt={sd(`${key}.title`)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                        <Icon className="h-20 w-20 text-neutral-200" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Stacco grafico */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8A090]" />
              <div className="h-1 w-8 rounded-full bg-[#E8A090]" />
              <div className="h-px flex-1 bg-[#E8A090]" />
            </div>
            <p className="font-serif text-2xl font-medium uppercase leading-tight text-foreground md:text-3xl">
              {t('notSureTitle')}
            </p>
            <a
              href="mailto:martina_pozzi_17@hotmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-700"
            >
              {t('notSureCta')}
              <ArrowRight className="h-4 w-4 flex-shrink-0" />
            </a>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8A090]" />
              <div className="h-1 w-8 rounded-full bg-[#E8A090]" />
              <div className="h-px flex-1 bg-[#E8A090]" />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Come lavoriamo */}
      <section id="come-lavoriamo" className="scroll-mt-28 bg-neutral-50 py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              {t('howWeWorkTitle')}
            </h2>
            <p className="mt-2 text-lg font-semibold uppercase tracking-widest text-primary-600">
              {t('howWeWorkSubtitle')}
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-3xl space-y-0">
            {/* Step 1 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative flex gap-6 pb-12">
              <div className="absolute left-5 top-12 h-full w-px bg-primary-200" />
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">1</span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">{t('s1Title')}</h3>
                <p className="mt-3 text-neutral-600">{t('s1Desc')}</p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="relative flex gap-6 pb-12">
              <div className="absolute left-5 top-12 h-full w-px bg-primary-200" />
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">2</span>
              </div>
              <div className="pt-1 w-full">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">{t('s2Title')}</h3>
                <div className="mt-4 space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{t('s2PreliminaryLabel')}</p>
                    <p className="mt-2 text-neutral-600">{t('s2PreliminaryText')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{t('s2DefinitiveLabel')}</p>
                    <ul className="mt-2 space-y-2 text-neutral-600">
                      {['s2Def1','s2Def2','s2Def3'].map((k) => (
                        <li key={k} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
                          <span>{t(k)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">{t('s2ExecutiveLabel')}</p>
                    <ul className="mt-2 space-y-2 text-neutral-600">
                      {['s2Exec1','s2Exec2','s2Exec3'].map((k) => (
                        <li key={k} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
                          <span>{t(k)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="relative flex gap-6 pb-12">
              <div className="absolute left-5 top-12 h-full w-px bg-primary-200" />
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">3</span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">{t('s3Title')}</h3>
                <ul className="mt-3 space-y-2 text-neutral-600">
                  {['s3Item1','s3Item2','s3Item3','s3Item4','s3Item5'].map((k) => (
                    <li key={k} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
                      <span>{t(k)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="relative flex gap-6 pb-12">
              <div className="absolute left-5 top-12 h-full w-px bg-primary-200" />
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">4</span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">{t('s4Title')}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-primary-600">{t('s4Subtitle')}</p>
                <ul className="mt-2 space-y-2 text-neutral-600">
                  {['s4Item1','s4Item2','s4Item3','s4Item4'].map((k) => (
                    <li key={k} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
                      <span>{t(k)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="relative flex gap-6 pb-0">
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">5</span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-xl font-medium uppercase text-primary-600">{t('s5Title')}</h3>
                <p className="mt-3 text-neutral-600">{t('s5Desc')}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              {t('getQuoteCta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Stacco grafico bottom */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8A090]" />
              <div className="h-1 w-8 rounded-full bg-[#E8A090]" />
              <div className="h-px flex-1 bg-[#E8A090]" />
            </div>
            <div className="mb-6 inline-block rounded-full bg-[#F2B5A4] px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white">
              {t('hasHelpLabel')}
            </div>
            <p className="font-serif text-2xl font-medium italic text-primary-600 md:text-3xl">
              {t('hasHelpOttimo')}
            </p>
            <p className="mt-4 font-serif text-2xl font-medium uppercase leading-tight text-foreground md:text-3xl">
              {t('hasHelpText')}
            </p>
            <div className="mt-8 flex justify-center">
              <div className="relative h-40 w-40">
                <Image src="/images/services/icona1.png" alt="Illustrazione" fill className="object-contain" />
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#E8A090]" />
              <div className="h-1 w-8 rounded-full bg-[#E8A090]" />
              <div className="h-px flex-1 bg-[#E8A090]" />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pt-24 pb-4">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-primary-600 px-8 py-16 text-center md:px-16"
          >
            <h2 className="font-serif text-3xl font-medium text-white md:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              {t('ctaSubtitle')}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-primary-50" asChild>
                <Link href="/contacto">
                  {t('ctaButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <a
                href="https://calendly.com/mp_archistudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-primary-600"
              >
                {t('ctaBooking')}
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
      <div className="bg-background py-1" />
      <NavBand />
    </>
  )
}
