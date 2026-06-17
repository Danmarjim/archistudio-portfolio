import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Progetti | MP_archistudio',
  description: 'Una selezione dei nostri lavori in architettura, ristrutturazioni e interior design.',
}

interface ProyectosPageProps {
  params: Promise<{ locale: string }>
}

export default async function ProyectosPage({ params }: ProyectosPageProps) {
  const { locale } = await params
  const projects = getAllProjects(locale)

  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            Progetti
          </h1>
        </div>

        <ProjectsGrid projects={projects} />
      </Container>
    </div>
  )
}
