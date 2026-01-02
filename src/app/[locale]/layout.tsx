import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { siteConfig } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

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

  const localeMap: Record<string, string> = {
    es: 'es_ES',
    en: 'en_US',
    it: 'it_IT',
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t?.title || siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: t?.description || siteConfig.description,
    keywords: ['arquitectura', 'diseño', 'interiorismo', 'reformas', 'vivienda', 'Madrid', 'arquitecta'],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: 'website',
      locale: localeMap[locale] || 'es_ES',
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: t?.title || siteConfig.title,
      description: t?.description || siteConfig.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: t?.title || siteConfig.title,
      description: t?.description || siteConfig.description,
    },
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
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        es: `${siteConfig.url}/es`,
        en: `${siteConfig.url}/en`,
        it: `${siteConfig.url}/it`,
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

  // Load messages
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-50 -translate-y-16 rounded-md bg-primary-600 px-4 py-2 text-white transition-transform focus:translate-y-0"
      >
        {(messages as Record<string, Record<string, string>>).Navigation?.skipToContent || 'Saltar al contenido principal'}
      </a>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  )
}
