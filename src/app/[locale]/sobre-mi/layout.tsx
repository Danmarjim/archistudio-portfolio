import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Mí',
  description: 'Arquitecta con más de 10 años de experiencia en diseño de viviendas, reformas e interiorismo. Conozca mi trayectoria y filosofía de trabajo.',
}

export default function SobreMiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
