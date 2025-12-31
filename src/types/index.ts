// Tipos principales del portfolio

export interface Project {
  title: string
  slug: string
  category: string
  location: string
  year: number
  client: string
  surface: string
  status: 'Construido' | 'En construcción' | 'Proyecto'
  featured: boolean
  coverImage: string
  images: string[]
  excerpt: string
  tags: string[]
  content?: string
}

export interface Service {
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'pinterest' | 'behance'
  url: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  email: string
  phone?: string
  address?: string
  social: SocialLink[]
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  projectType: 'vivienda' | 'reforma' | 'comercial' | 'otro'
  message: string
  budget?: string
}
