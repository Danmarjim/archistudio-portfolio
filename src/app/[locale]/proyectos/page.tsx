import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Proyectos | Martina Pozzi Arquitectura',
  description: 'Una selección de nuestros trabajos en arquitectura, reformas e interiorismo.',
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
            Proyectos
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            Una selección de nuestros trabajos en arquitectura, reformas e interiorismo
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </Container>
    </div>
  )
}
