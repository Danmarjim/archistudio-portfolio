import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { siteConfig } from '@/lib/constants'
import { buildMetadata, buildSiteGraph } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import '../globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

// Solo le lingue dichiarate: qualsiasi altro primo segmento (es. /favicon.ico, /llms.txt)
// risponde 404 invece di renderizzare il layout con una lingua non valida.
export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const messages = await getMessages()
  const t = (messages as Record<string, Record<string, string>>).Metadata

  // Valori di base ereditati da tutte le pagine. Canonical, hreflang e Open Graph
  // specifici di ogni pagina vengono dichiarati nei rispettivi generateMetadata.
  const base = buildMetadata({
    locale,
    title: { absolute: t?.title || siteConfig.title },
    description: t?.description || siteConfig.description,
  })

  // Niente canonical/hreflang/og:url a livello di layout: apparterrebbero alla home e
  // verrebbero ereditati da pagine che non li ridefiniscono.
  const baseWithoutAlternates: Metadata = { ...base }
  delete baseWithoutAlternates.alternates

  return {
    ...baseWithoutAlternates,
    openGraph: { ...base.openGraph, url: undefined } as Metadata['openGraph'],
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t?.title || siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    authors: [{ name: 'Martina Pozzi' }],
    creator: 'Martina Pozzi',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)
  const tMeta = await getTranslations({ locale, namespace: 'Metadata' })

  // Load messages
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="absolute left-4 top-4 z-50 -translate-y-16 rounded-md bg-primary-600 px-4 py-2 text-white transition-transform focus:translate-y-0"
          >
            {(messages as Record<string, Record<string, string>>).Navigation?.skipToContent || 'Salta al contenuto principale'}
          </a>
          <Header />
          <main id="main-content" className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <JsonLd data={buildSiteGraph(locale, tMeta('description'))} />
        <Analytics />
      </body>
    </html>
  )
}
