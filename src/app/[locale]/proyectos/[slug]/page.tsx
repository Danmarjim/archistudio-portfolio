import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetail from '@/components/sections/ProjectDetail'
import JsonLd from '@/components/seo/JsonLd'
import { getTranslations } from 'next-intl/server'
import { absoluteUrl, buildBreadcrumb, buildMetadata, localizedUrl, personSummary } from '@/lib/seo'
import { getProjectBySlug, getAdjacentProjects, getAllProjectSlugs } from '@/lib/projects'
import { getServiceForProject } from '@/lib/services'

interface ProjectPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// Slug non elencati in generateStaticParams rispondono 404 senza renderizzare la pagina.
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const project = getProjectBySlug(slug, locale)

  if (!project) {
    return {
      title: 'Progetto non trovato',
    }
  }

  const place = project.location ? ` – ${project.location}` : ''

  return buildMetadata({
    locale,
    path: `/proyectos/${slug}`,
    title: `${project.title}${place}`,
    description: project.description ?? project.excerpt,
    image: project.coverImage,
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = await params
  const project = getProjectBySlug(slug, locale)

  if (!project) {
    notFound()
  }

  const { prev, next } = getAdjacentProjects(slug, locale)
  const service = getServiceForProject(project.category, locale)

  const tNav = await getTranslations({ locale, namespace: 'Navigation' })
  const images = (project.images?.length ? project.images : [project.coverImage]).slice(0, 8)

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description ?? project.excerpt,
    url: localizedUrl(locale, `/proyectos/${slug}`),
    image: images.filter(Boolean).map((img) => absoluteUrl(img)),
    dateCreated: String(project.year),
    locationCreated: project.location
      ? { '@type': 'Place', name: project.location }
      : undefined,
    keywords: project.tags?.length ? project.tags.join(', ') : undefined,
    inLanguage: locale,
    creator: personSummary,
  }

  return (
    <>
      <JsonLd
        data={[
          projectSchema,
          buildBreadcrumb(locale, [
            { name: tNav('projects'), path: '/proyectos' },
            { name: project.title, path: `/proyectos/${slug}` },
          ]),
        ]}
      />
      <ProjectDetail
        project={project}
        prevProject={prev}
        nextProject={next}
        service={service ? { slug: service.slug, name: service.seoTitle ?? service.title } : undefined}
      />
    </>
  )
}
