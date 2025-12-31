import type { NavItem, SiteConfig, Service } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Estudio de Arquitectura',
  title: 'Estudio de Arquitectura | Portfolio',
  description: 'Portfolio profesional de arquitectura. Diseño de viviendas, reformas y proyectos comerciales con atención al detalle y creatividad.',
  url: 'https://example.com',
  email: 'contacto@example.com',
  phone: undefined,
  address: undefined,
  social: [
    { platform: 'instagram', url: 'https://instagram.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' },
    { platform: 'pinterest', url: 'https://pinterest.com' },
  ],
}

export const navigation: NavItem[] = [
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
]

export const services: Service[] = [
  {
    title: 'Diseño arquitectónico',
    slug: 'diseno-arquitectonico',
    description: 'Diseño integral de viviendas unifamiliares y edificios, desde el concepto hasta el proyecto de ejecución.',
    icon: 'home',
    features: [
      'Anteproyecto y proyecto básico',
      'Proyecto de ejecución',
      'Dirección de obra',
      'Gestión de licencias',
    ],
  },
  {
    title: 'Reformas integrales',
    slug: 'reformas-integrales',
    description: 'Transformación de espacios existentes para adaptarlos a nuevas necesidades y estilos de vida.',
    icon: 'hammer',
    features: [
      'Estudio de viabilidad',
      'Diseño de interiores',
      'Coordinación de gremios',
      'Supervisión de obra',
    ],
  },
  {
    title: 'Interiorismo',
    slug: 'interiorismo',
    description: 'Diseño de espacios interiores que combinan funcionalidad, estética y personalidad.',
    icon: 'sofa',
    features: [
      'Distribución y diseño de espacios',
      'Selección de materiales',
      'Mobiliario a medida',
      'Iluminación y decoración',
    ],
  },
]

export const projectCategories = [
  'Vivienda unifamiliar',
  'Reforma integral',
  'Interiorismo',
  'Comercial',
  'Edificio residencial',
] as const

export type ProjectCategory = typeof projectCategories[number]
