'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sun, Palette, Maximize2, Heart, BookOpen, Briefcase, Award, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import NavBand from '@/components/sections/NavBand'
import { newsHref, serviceHref } from '@/lib/routes'
import { useTranslations } from 'next-intl'
import type { Project } from '@/types'

export interface PressItem {
  slug: string
  source: string
  title: string
}

export interface ProfileLink {
  label: string
  url: string
}

interface SobreMiContentProps {
  pressItems: PressItem[]
  projects: Project[]
  profiles: ProfileLink[]
  /** Slug della pagina ArchiAdvice, se pubblicata; altrimenti il link va all'hub /servizi */
  archiAdviceSlug?: string
}

export default function SobreMiContent({ pressItems, projects, profiles, archiAdviceSlug }: SobreMiContentProps) {
  const t = useTranslations('SobreMiPage')
  const credentials = [t('cred1'), t('cred2'), t('cred3'), t('cred4')]

  const values = [
    { icon: Sun,      title: t('v1Title'), description: t('v1Desc') },
    { icon: Palette,  title: t('v2Title'), description: t('v2Desc') },
    { icon: Maximize2,title: t('v3Title'), description: t('v3Desc') },
    { icon: Heart,    title: t('v4Title'), description: t('v4Desc') },
  ]

  const timeline = [
    { year: t('t1Year'), date: t('t1Date'), title: t('t1Title'), description: t('t1Desc'), type: 'education' },
    { year: t('tRegYear'), date: t('tRegDate'), title: t('tRegTitle'), description: t('tRegDesc'), type: 'education' },
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
            <div className="relative order-2 lg:order-1 pr-6 sm:pr-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src="/images/about/martina-pozzi-ritratto.jpg"
                  alt="Martina C.M. Pozzi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary-100" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
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
            </div>
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

      {/* Credentials Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">{t('credentialsTitle')}</h2>
            <ul className="mt-8 space-y-4">
              {credentials.map((credential) => (
                <li key={credential} className="flex items-start gap-3 text-lg text-neutral-700">
                  <Award className="mt-1 h-5 w-5 shrink-0 text-primary-600" />
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
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

      {/* Press Section */}
      {pressItems.length > 0 && (
        <section className="bg-neutral-50 py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">{t('pressTitle')}</h2>
              <p className="mt-4 text-lg text-neutral-600">{t('pressSubtitle')}</p>
              <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
                {pressItems.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={newsHref(item.slug)}
                      className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <span className="w-40 shrink-0 font-medium text-primary-700">{item.source}</span>
                      <span className="text-neutral-700 group-hover:text-foreground group-hover:underline">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <FeaturedProjects projects={projects} />

      {/* Where Section */}
      <section className="bg-neutral-50 py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-medium text-foreground md:text-4xl">{t('whereTitle')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">{t('wherePara')}</p>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {profiles.map((profile) => (
                <li key={profile.url}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-400 hover:text-primary-700"
                  >
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>
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
              <Button variant="inverse" size="lg" trailingIcon asChild>
                <Link href="/contacto">{t('ctaButton')}</Link>
              </Button>
            </div>
            <Link
              href={archiAdviceSlug ? serviceHref(archiAdviceSlug) : '/servicios'}
              className="mt-6 inline-flex items-center gap-2 text-primary-100 underline-offset-4 hover:text-white hover:underline"
            >
              {t('ctaArchiAdvice')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </Container>
      </section>
      <div className="bg-background py-1" />
      <NavBand />
    </>
  )
}
