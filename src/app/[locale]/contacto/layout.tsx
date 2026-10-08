import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import JsonLd from '@/components/seo/JsonLd'
import { buildBreadcrumb, buildMetadata } from '@/lib/seo'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata.pages.contact' })
  return buildMetadata({
    locale,
    path: '/contacto',
    title: t('title'),
    description: t('description'),
  })
}

export default async function ContactoLayout({ children, params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Navigation' })

  return (
    <>
      <JsonLd data={buildBreadcrumb(locale, [{ name: t('contact'), path: '/contacto' }])} />
      {children}
    </>
  )
}
