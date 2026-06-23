import fs from 'fs'
import path from 'path'
import {
  Hero,
  ProjectsStrip,
  AboutPreview,
  ServicesPreview,
  CallToAction,
  NavBand,
} from '@/components/sections'

interface HomeProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ params: _params, searchParams: _searchParams }: HomeProps) {
  const projectsDir = path.join(process.cwd(), 'public/images/projects')
  const allImages = fs.readdirSync(projectsDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .map((f) => `/images/projects/${f}`)
    .sort(() => Math.random() - 0.5)

  return (
    <>
      <Hero />
      <ProjectsStrip images={allImages} />
      <AboutPreview />
      <ServicesPreview />
      <CallToAction />
      <div className="bg-background py-1" />
      <NavBand />
    </>
  )
}
