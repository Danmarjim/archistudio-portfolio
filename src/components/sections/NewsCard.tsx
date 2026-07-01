'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui'
import type { NewsPost } from '@/types'
import { useTranslations, useLocale } from 'next-intl'

interface NewsCardProps {
  post: NewsPost
  index?: number
}

const categoryColors: Record<string, string> = {
  pubblicazioni: 'bg-amber-50 text-amber-700 border-amber-200',
  riflessioni: 'bg-sky-50 text-sky-700 border-sky-200',
  annunci: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  interviste: 'bg-violet-50 text-violet-700 border-violet-200',
}

const categoryToKey: Record<string, string> = {
  pubblicazioni: 'filterPubblicazioni',
  riflessioni: 'filterRiflessioni',
  annunci: 'filterAnnunci',
  interviste: 'filterInterviste',
}

export default function NewsCard({ post, index = 0 }: NewsCardProps) {
  const t = useTranslations('NewsPage')
  const locale = useLocale()
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-GB' : 'it-IT', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/news/${post.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl bg-white h-full"
      >
        {/* Image */}
        <div className={`relative overflow-hidden bg-neutral-100 ${post.imageAspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-[16/9]'}`}>
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: post.imagePosition ?? 'center center' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-300">
              <span className="text-4xl">📰</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Arrow */}
          <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[post.category] ?? ''}`}
            >
              {categoryToKey[post.category] ? t(categoryToKey[post.category] as Parameters<typeof t>[0]) : post.category}
            </span>
            <span className="text-xs text-neutral-400">{formatDate(post.date)}</span>
          </div>

          {post.source && (
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary-600">
              {post.source}
            </p>
          )}

          <h3 className="font-serif text-lg font-medium text-foreground transition-colors group-hover:text-primary-600 line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm text-neutral-600 flex-1">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
