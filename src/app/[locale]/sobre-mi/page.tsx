'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sun, Palette, Maximize2, Heart, BookOpen, Briefcase } from 'lucide-react'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import NavBand from '@/components/sections/NavBand'
import { useTranslations } from 'next-intl'

export default function SobreMiPage() {
  const t = useTranslations('SobreMiPage')

  const values = [
    { icon: Sun,      title: t('v1Title'), description: t('v1Desc') },
    { icon: Palette,  title: t('v2Title'), description: t('v2Desc') },
    { icon: Maximize2,title: t('v3Title'), description: t('v3Desc') },
    { icon: Heart,    title: t('v4Title'), description: t('v4Desc') },
  ]

  const timeline = [
    { year: t('t1Year'), date: t('t1Date'), title: t('t1Title'), description: t('t1Desc'), type: 'education' },
    { year: t('t2Year'), date: t('t2Date'), title: t('t2Title'), description: t('t2Desc'), type: 'work' },
    { year: t('t3Year'), date: t('t3Date'), title: t('t3Title'), description: t('t3Desc'), type: 'work' },
    { year: t('t4Year'), date: t('t4Date'), title: t('t4Title'), description: t('t4Desc'), type: 'work' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1 pr-6 sm:pr-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src="/images/about/_K7A9382_1.jpg"
                  alt="Martina C.M. Pozzi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary-100" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-600">
                {t('overline')}
              </p>
              <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
                {t('heroTitle')}
              </h1>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-neutral-600">
                <p>{t('heroPara1')}</p>
                <p>{t('heroPara2')}</p>
                <p>{t('heroPara3')}</p>
                <p className="font-medium text-foreground">{t('heroHighlight')}</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Bio Section */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              {t('bioTitle')}
            </h2>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-neutral-600">
              <p>{t('bioPara1')}</p>
              <p>{t('bioPara2')}</p>
              <p>{t('bioPara3')}</p>
              <p>{t('bioPara4')}</p>
              <p>
                {t('bioPara5')}{' '}
                <a
                  href="https://www.instagram.com/mp_collages/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 underline underline-offset-2 hover:text-primary-700"
                >
                  @mp_collages
                </a>
                .
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              {t('timelineTitle')}
            </h2>
            <p className="mt-4 text-lg text-neutral-600">{t('timelineSubtitle')}</p>
          </motion.div>

          <div className="relative mt-16">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-neutral-200 md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary-600 md:left-1/2">
                    {item.type === 'education' ? (
                      <BookOpen className="h-3 w-3 text-white" />
                    ) : (
                      <Briefcase className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div
                    className={`ml-12 w-full md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <span className="text-sm font-medium text-primary-600">{item.year}</span>
                    <h3 className="mt-1 font-serif text-xl font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-neutral-600">{item.description}</p>
                    <p className="mt-1 text-sm text-neutral-400">{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-16 max-w-3xl rounded-2xl bg-primary-50 p-8 text-center"
          >
            <p className="text-lg leading-relaxed text-neutral-700">
              {t('timelineHighlight')}{' '}
              <span className="font-semibold text-primary-700">{t('timelineHighlightBold')}</span>.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="bg-neutral-50 py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
              {t('valuesTitle')}
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                  <value.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-medium uppercase tracking-wide text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 text-neutral-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="pt-24 pb-4">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-primary-600 px-8 py-16 text-center md:px-16"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-primary-200">
              {t('ctaOverline')}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium text-white md:text-4xl">
              {t('ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              {t('ctaSubtitle')}
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50"
                asChild
              >
                <a href="mailto:martina_pozzi_17@hotmail.com">
                  {t('ctaButton')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
      <div className="bg-background py-1" />
      <NavBand />
    </>
  )
}
