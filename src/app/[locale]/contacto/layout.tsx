import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con el estudio de arquitectura. Cuéntanos tu proyecto y te ayudaremos a hacerlo realidad.',
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
