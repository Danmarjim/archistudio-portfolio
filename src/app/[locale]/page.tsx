import {
  Hero,
  FeaturedProjects,
  AboutPreview,
  ServicesPreview,
  CallToAction,
} from '@/components/sections'
import { getFeaturedProjects } from '@/lib/projects'

interface HomeProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  const featuredProjects = getFeaturedProjects(locale)

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <AboutPreview />
      <ServicesPreview />
      <CallToAction />
    </>
  )
}
