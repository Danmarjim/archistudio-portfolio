import {
  Hero,
  FeaturedProjects,
  AboutPreview,
  ServicesPreview,
  CallToAction,
} from '@/components/sections'
import { getFeaturedProjects } from '@/lib/projects'

export default function Home() {
  const featuredProjects = getFeaturedProjects()

  return (
    <main>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <AboutPreview />
      <ServicesPreview />
      <CallToAction />
    </main>
  )
}
