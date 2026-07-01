'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ImageWithLoader, Badge } from '@/components/ui'
import type { Project } from '@/types'
import { useTranslations } from 'next-intl'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const tCat = useTranslations('ProjectCategories')
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/proyectos/${project.slug}`}
        className="group block overflow-hidden rounded-2xl bg-white"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <ImageWithLoader
            src={project.coverImage}
            alt={project.title}
            aspectRatio="landscape"
            className="transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Arrow icon */}
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5 text-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline">{tCat(project.category as Parameters<typeof tCat>[0], { defaultValue: project.category })}</Badge>
            <span className="text-sm text-neutral-400">{project.year}</span>
          </div>

          <h3 className="font-serif text-xl font-medium text-foreground transition-colors group-hover:text-primary-600">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
            {project.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
