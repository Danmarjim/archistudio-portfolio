import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Servicios de arquitectura: diseño de viviendas, reformas integrales e interiorismo. Proyectos personalizados adaptados a tus necesidades.',
}

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
