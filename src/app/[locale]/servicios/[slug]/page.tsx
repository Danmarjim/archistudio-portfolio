import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'
import ProjectCard from '@/components/sections/ProjectCard'
import JsonLd from '@/components/seo/JsonLd'
import Markdown from '@/components/shared/Markdown'
import { getPublishedServiceBySlug, getPublishedServices } from '@/lib/services'
import { getProjectBySlug } from '@/lib/projects'
import { absoluteUrl, buildBreadcrumb, buildMetadata, businessSummary, localizedUrl } from '@/lib/seo'
import { CALENDLY_URL, siteConfig } from '@/lib/constants'
import type { Project } from '@/types'

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>
}

// Esistono solo le pagine con `published: true`: gli altri slug rispondono 404.
export const dynamicParams = false

export async function generateStaticParams() {
  return getPublishedServices('it').map((service) => ({ slug: service.slug }))
}

function serviceImage(relatedProjects: string[], locale: string): string | undefined {
  const [first] = relatedProjects
  return first ? getProjectBySlug(first, locale)?.coverImage : undefined
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const service = getPublishedServiceBySlug(slug, locale)
  if (!service) return {}
  return buildMetadata({
    // Immagine social: la copertina del primo progetto collegato al servizio
    image: serviceImage(service.relatedProjects, locale),
    locale,
    path: `/servicios/${slug}`,
    // Titolo assoluto: il layout di /servizi definisce un proprio title e non propaga il template
    title: { absolute: `${service.seoTitle ?? service.title} | ${siteConfig.name}` },
    description: service.description,
  })
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, locale } = await params
  const service = getPublishedServiceBySlug(slug, locale)
  if (!service) notFound()

  const t = await getTranslations({ locale, namespace: 'ServicePage' })
  const tNav = await getTranslations({ locale, namespace: 'Navigation' })

  const projects = service.relatedProjects
    .map((projectSlug) => getProjectBySlug(projectSlug, locale))
    .filter((project): project is Project => Boolean(project))

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    serviceType: service.serviceType,
    ...(projects[0] ? { image: absoluteUrl(projects[0].coverImage) } : {}),
    url: localizedUrl(locale, `/servicios/${slug}`),
    inLanguage: locale,
    provider: businessSummary,
    areaServed: ['Bergamo', 'Provincia di Bergamo', 'Milano', 'Monza e Brianza'].map((name) => ({
      '@type': 'Place',
      name,
    })),
    ...(service.priceFrom
      ? {
          offers: {
            '@type': 'Offer',
            price: service.priceFrom,
            priceCurrency: 'EUR',
            url: localizedUrl(locale, `/servicios/${slug}`),
          },
        }
      : {}),
  }

  const cta =
    service.cta === 'calendly' ? (
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
      >
        {t('bookCta')}
        <ArrowRight className="h-4 w-4" />
      </a>
    ) : (
      <Link
        href={{
          pathname: '/contacto',
          query: service.contactProjectType ? { tipo: service.contactProjectType } : undefined,
        }}
        className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
      >
        {t('contactCta')}
        <ArrowRight className="h-4 w-4" />
      </Link>
    )

  return (
    <div className="py-12">
      <JsonLd
        data={[
          serviceSchema,
          buildBreadcrumb(locale, [
            { name: tNav('services'), path: '/servicios' },
            { name: service.title, path: `/servicios/${slug}` },
          ]),
        ]}
      />
      <Container>
        <Link
          href="/servicios"
          className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToServices')}
        </Link>

        <header className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">{service.title}</h1>
          <p className="mt-5 text-lg text-neutral-600 md:text-xl">{service.description}</p>
          {service.priceFrom && (
            <p className="mt-6 inline-flex items-baseline gap-2 rounded-xl bg-primary-50 px-5 py-3 text-primary-800">
              <span className="text-sm uppercase tracking-widest">{t('priceFrom')}</span>
              <span className="font-serif text-2xl">
                {new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
                  service.priceFrom
                )}
              </span>
            </p>
          )}
          <div className="mt-8">{cta}</div>
        </header>

        <div className="mx-auto mt-12 max-w-3xl">
          <Markdown content={service.content} />
        </div>

        {projects.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-medium text-foreground md:text-3xl">{t('relatedProjects')}</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index + 3} />
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-neutral-50 p-8 text-center">
          <p className="font-serif text-2xl text-foreground">{t('finalTitle')}</p>
          <div className="mt-6 flex justify-center">{cta}</div>
        </div>
      </Container>
    </div>
  )
}
