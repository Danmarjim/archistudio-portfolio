import ServiciosContent from './ServiciosContent'
import { getPublishedServices } from '@/lib/services'

interface ServiciosPageProps {
  params: Promise<{ locale: string }>
}

export default async function ServiciosPage({ params }: ServiciosPageProps) {
  const { locale } = await params
  // Collega ogni servizio alla sua pagina dedicata solo quando è pubblicata
  const servicePages = Object.fromEntries(
    getPublishedServices(locale).map((service) => [service.serviceKey, service.slug])
  )
  return <ServiciosContent servicePages={servicePages} />
}
