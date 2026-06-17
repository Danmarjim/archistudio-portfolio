'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/sections'
import { projectCategories } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredProjects = activeFilter
    ? projects.filter((project) => project.category === activeFilter)
    : projects

  return (
    <>
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 flex flex-wrap justify-center gap-3"
      >
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            'rounded-full px-5 py-2 text-sm font-medium transition-colors',
            activeFilter === null
              ? 'bg-foreground text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          )}
        >
          Tutti
        </button>
        {projectCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors',
              activeFilter === category
                ? 'bg-foreground text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid — ordine riga per riga, altezza naturale per ogni card */}
      <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-neutral-600">Nessun progetto in questa categoria.</p>
        </div>
      )}
    </>
  )
}
