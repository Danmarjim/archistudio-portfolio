import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tappeti — Collezione Sevilla | MP_archistudio',
  description: 'Sevilla, una collezione di tappeti firmati MP_archistudio by Martina Pozzi. Ispirata alle Feste di Primavera di Siviglia, prodotta da Panizza Studio con lana e viscosa.',
}

export default function TappetiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
