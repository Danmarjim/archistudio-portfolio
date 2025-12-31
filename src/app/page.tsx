import {
  Hero,
  FeaturedProjects,
  AboutPreview,
  ServicesPreview,
  CallToAction,
} from '@/components/sections'

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <ServicesPreview />
      <CallToAction />
    </main>
  )
}
