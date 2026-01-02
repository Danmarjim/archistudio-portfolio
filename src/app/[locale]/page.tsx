import {
  Hero,
  FeaturedProjects,
  ProjectsCarousel,
  AboutPreview,
  ServicesPreview,
  CallToAction,
} from '@/components/sections'
import { getFeaturedProjects } from '@/lib/projects'

interface HomeProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Variante por defecto: 'carousel' | 'grid'
const DEFAULT_VARIANT = 'grid'

export default async function Home({ params, searchParams }: HomeProps) {
  const { locale } = await params
  const { variant } = await searchParams
  const featuredProjects = getFeaturedProjects(locale)

  // ?variant=grid o ?variant=carousel para alternar
  const projectsVariant = (variant as string) || DEFAULT_VARIANT

  return (
    <>
      <Hero />
      {projectsVariant === 'carousel' ? (
        <ProjectsCarousel projects={featuredProjects} />
      ) : (
        <FeaturedProjects projects={featuredProjects} />
      )}
      <AboutPreview />
      <ServicesPreview />
      <CallToAction />
    </>
  )
}
