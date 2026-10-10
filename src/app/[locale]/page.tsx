import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import {
  Hero,
  ProjectsStrip,
  AboutPreview,
  ServicesPreview,
  CallToAction,
  NavBand,
  FeaturedProjects,
} from '@/components/sections'
import PressBand from '@/components/sections/PressBand'
import HowIWork from '@/components/sections/HowIWork'
import WorkArea from '@/components/sections/WorkArea'
import { isVerticalImage } from '@/lib/imageOrientation'
import { getAllNews } from '@/lib/news'
import { getProjectBySlug } from '@/lib/projects'
import { getPublishedServices } from '@/lib/services'
import { buildMetadata } from '@/lib/seo'

const HOME_FEATURED_PROJECTS = ['appartamento-lovingcolors', 'casa-archi-colori', 'restyling-casa-peonia']

interface HomeProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return buildMetadata({
    locale,
    path: '/',
    title: { absolute: t('title') },
    description: t('description'),
  })
}

export default async function Home({ params, searchParams: _searchParams }: HomeProps) {
  const { locale } = await params
  const pressItems = getAllNews(locale)
    .filter((post) => Boolean(post.source))
    .map((post) => ({ slug: post.slug, source: post.source as string, title: post.title }))

  // Pagine di servizio pubblicate (`serviceKey` → slug) per i link delle card e di "Come lavoro"
  const servicePages = Object.fromEntries(getPublishedServices('it').map((s) => [s.serviceKey, s.slug]))

  // Un progetto per tipo e città: ristrutturazione a Bergamo, a Milano e restyling in Brianza
  const featuredProjects = HOME_FEATURED_PROJECTS.map((slug) => getProjectBySlug(slug, locale)).filter(
    (project): project is NonNullable<typeof project> => Boolean(project)
  )

  const projectsDir = path.join(process.cwd(), 'public/images/projects')
  const projectFiles = fs.readdirSync(projectsDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))

  const allImages = projectFiles
    .map((f) => `/images/projects/${f}`)
    .sort(() => Math.random() - 0.5)

  const verticalImages = projectFiles
    .filter((f) => isVerticalImage(path.join(projectsDir, f)))
    .map((f) => `/images/projects/${f}`)
    .sort(() => Math.random() - 0.5)

  return (
    <>
      <Hero />
      <ProjectsStrip images={allImages} verticalImages={verticalImages} />
      <AboutPreview />
      <PressBand items={pressItems} />
      <ServicesPreview servicePages={servicePages} />
      <HowIWork locale={locale} renovationSlug={servicePages['progettazione-architettonica']} />
      <FeaturedProjects projects={featuredProjects} />
      <WorkArea locale={locale} />
      <CallToAction showPhone />
      <div className="bg-background py-1" />
      <NavBand />
    </>
  )
}
