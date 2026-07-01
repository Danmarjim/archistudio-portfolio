import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import NavBand from '@/components/sections/NavBand'
import { getAllProjects } from '@/lib/projects'
import { getTranslations } from 'next-intl/server'

interface ProyectosPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ProyectosPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ProjectsPage' })
  return {
    title: `${t('title')} | MP_archistudio`,
    description: t('description'),
  }
}

export default async function ProyectosPage({ params }: ProyectosPageProps) {
  const { locale } = await params
  const projects = getAllProjects(locale)
  const t = await getTranslations({ locale, namespace: 'ProjectsPage' })

  return (
    <div className="py-12">
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
