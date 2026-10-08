import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import NavBand from '@/components/sections/NavBand'
import { getAllProjects } from '@/lib/projects'
import { getTranslations } from 'next-intl/server'
import JsonLd from '@/components/seo/JsonLd'
import { buildBreadcrumb, buildMetadata } from '@/lib/seo'

interface ProyectosPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ProyectosPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata.pages.projects' })
  return buildMetadata({
    locale,
    path: '/proyectos',
    title: t('title'),
    description: t('description'),
  })
}

export default async function ProyectosPage({ params }: ProyectosPageProps) {
  const { locale } = await params
  const projects = getAllProjects(locale)
  const t = await getTranslations({ locale, namespace: 'ProjectsPage' })

  const tNav = await getTranslations({ locale, namespace: 'Navigation' })

  return (
    <div className="py-12">
      <JsonLd data={buildBreadcrumb(locale, [{ name: tNav('projects'), path: '/proyectos' }])} />
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            {t('title')}
          </h1>
        </div>

        <ProjectsGrid projects={projects} />
      </Container>
      <div className="bg-background py-1" />
      <NavBand />
    </div>
  )
}
