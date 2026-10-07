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
} from '@/components/sections'
import PressBand from '@/components/sections/PressBand'
import { isVerticalImage } from '@/lib/imageOrientation'
import { getAllNews } from '@/lib/news'
import { buildMetadata } from '@/lib/seo'

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
      <ServicesPreview />
      <CallToAction />
      <div className="bg-background py-1" />
      <NavBand />
    </>
  )
}
