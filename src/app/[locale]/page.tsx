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
import { isVerticalImage } from '@/lib/imageOrientation'

interface HomeProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home({ params: _params, searchParams: _searchParams }: HomeProps) {
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
      <ServicesPreview />
      <CallToAction />
      <div className="bg-background py-1" />
      <NavBand />
    </>
  )
}
