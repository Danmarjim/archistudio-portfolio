import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import Container from '@/components/ui/Container'
import { getNewsBySlug, getAllNewsSlugs, getAdjacentNews } from '@/lib/news'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import NewsGallery from '@/components/sections/NewsGallery'
import { getTranslations } from 'next-intl/server'

interface NewsDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = getNewsBySlug(slug, locale)
  if (!post) return { title: 'News non trovata' }
  return {
    title: `${post.title} | MP_archistudio`,
    description: post.excerpt,
  }
}

const categoryToKey: Record<string, string> = {
  pubblicazioni: 'filterPubblicazioni',
  riflessioni: 'filterRiflessioni',
  annunci: 'filterAnnunci',
  interviste: 'filterInterviste',
}

const categoryColors: Record<string, string> = {
  pubblicazioni: 'bg-amber-50 text-amber-700 border-amber-200',
  riflessioni: 'bg-sky-50 text-sky-700 border-sky-200',
  annunci: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  interviste: 'bg-violet-50 text-violet-700 border-violet-200',
}

function formatDate(dateStr: string, locale: string): string {
  const localeStr = locale === 'es' ? 'es-ES' : locale === 'en' ? 'en-GB' : 'it-IT'
  return new Date(dateStr).toLocaleDateString(localeStr, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug, locale } = await params
  const post = getNewsBySlug(slug, locale)
  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'NewsPage' })
  const { prev, next } = getAdjacentNews(slug, locale)

  return (
    <div className="py-12">
      <Container>
        {/* Back link */}
        <Link
          href="/news"
          className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToNews')}
        </Link>

        {/* Header */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[post.category] ?? ''}`}
            >
              {categoryToKey[post.category] ? t(categoryToKey[post.category] as Parameters<typeof t>[0]) : post.category}
            </span>
            <span className="text-sm text-neutral-400">{formatDate(post.date, locale)}</span>
            {post.source && (
              <span className="text-sm font-medium text-primary-600">{post.source}</span>
            )}
          </div>

          <h1 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-neutral-600">{post.excerpt}</p>

          {/* Link articolo originale */}
          {post.sourceUrl && (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:underline"
            >
              {t('readOriginal')}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Cover image — object-contain per mostrare l'immagine intera */}
        {post.coverImage && (
          <div className="mx-auto mt-10 max-w-sm overflow-hidden rounded-2xl bg-neutral-50">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={600}
              height={800}
              className="h-auto w-full object-contain"
              style={{ objectPosition: post.imagePosition ?? 'center center' }}
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
        )}

        {/* Content */}
        {post.content && (
          <div className="prose prose-neutral prose-lg mx-auto mt-12 max-w-3xl">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Galleria pagine articolo — sotto il testo */}
        {post.images && post.images.length > 0 && (
          <div className="mx-auto mt-12 max-w-4xl">
            <NewsGallery images={post.images} title={post.title} />
          </div>
        )}

        {/* Navigation prev/next */}
        {(prev || next) && (
          <div className="mt-16 flex items-center justify-between border-t border-neutral-100 pt-8">
            {prev ? (
              <Link
                href={`/news/${prev.slug}`}
                className="group flex items-center gap-3 text-sm text-neutral-500 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400">{t('previous')}</div>
                  <div className="font-medium text-foreground line-clamp-1">{prev.title}</div>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/news/${next.slug}`}
                className="group flex items-center gap-3 text-right text-sm text-neutral-500 transition-colors hover:text-foreground"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-neutral-400">{t('next')}</div>
                  <div className="font-medium text-foreground line-clamp-1">{next.title}</div>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : <div />}
          </div>
        )}
      </Container>
    </div>
  )
}
