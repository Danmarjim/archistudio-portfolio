'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import NewsCard from '@/components/sections/NewsCard'
import { cn } from '@/lib/utils'
import type { NewsPost, NewsCategory } from '@/types'

interface NewsGridProps {
  posts: NewsPost[]
}

const categories: { value: NewsCategory | null; label: string }[] = [
  { value: null, label: 'Tutte' },
  { value: 'pubblicazioni', label: 'Pubblicazioni' },
  { value: 'riflessioni', label: 'Riflessioni' },
  { value: 'annunci', label: 'Annunci' },
  { value: 'interviste', label: 'Interviste' },
]

export default function NewsGrid({ posts }: NewsGridProps) {
  const [activeFilter, setActiveFilter] = useState<NewsCategory | null>(null)

  const filtered = activeFilter
    ? posts.filter((p) => p.category === activeFilter)
    : posts

  return (
    <>
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 flex flex-wrap justify-center gap-3"
      >
        {categories.map(({ value, label }) => (
          <button
            key={label}
            onClick={() => setActiveFilter(value)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors',
              activeFilter === value
                ? 'bg-foreground text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, index) => (
          <NewsCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-neutral-600">Nessun contenuto in questa categoria.</p>
        </div>
      )}
    </>
  )
}
