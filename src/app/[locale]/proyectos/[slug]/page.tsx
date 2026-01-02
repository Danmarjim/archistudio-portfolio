import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetail from '@/components/sections/ProjectDetail'
import { getProjectBySlug, getAdjacentProjects, getAllProjectSlugs } from '@/lib/projects'

interface ProjectPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const project = getProjectBySlug(slug, locale)

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    }
  }

  return {
    title: `${project.title} | María García Arquitectura`,
    description: project.excerpt,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = await params
  const project = getProjectBySlug(slug, locale)

  if (!project) {
    notFound()
  }

  const { prev, next } = getAdjacentProjects(slug, locale)

  return <ProjectDetail project={project} prevProject={prev} nextProject={next} />
}
