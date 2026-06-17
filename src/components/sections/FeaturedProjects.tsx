'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import ProjectCard from './ProjectCard'
import type { Project } from '@/types'

interface FeaturedProjectsProps {
  projects: Project[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
}

export default function FeaturedProjects({
  projects,
  title = 'Progetti in evidenza',
  subtitle = 'Una selezione dei nostri lavori più recenti',
  showViewAll = true,
}: FeaturedProjectsProps) {

  return (
    <section className="py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-medium text-foreground md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
            {subtitle}
          </p>
        </motion.div>

        {/* Projects Grid — ordine riga per riga, altezza naturale per ogni card */}
        <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/proyectos">
                Vedi tutti i progetti
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
