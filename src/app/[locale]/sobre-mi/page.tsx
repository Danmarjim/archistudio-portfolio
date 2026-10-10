import SobreMiContent, { type ProfileLink } from './SobreMiContent'
import { sameAsProfiles } from '@/lib/constants'
import { getAllNews } from '@/lib/news'
import { getProjectBySlug } from '@/lib/projects'
import { getPublishedServiceBySlug } from '@/lib/services'
import type { Project } from '@/types'

interface SobreMiPageProps {
  params: Promise<{ locale: string }>
}

const ABOUT_PROJECTS = ['appartamento-lovingcolors', 'casa-archi-colori', 'restyling-casa-peonia']

// Nome visibile dei profili esterni (stessi URL del `sameAs` nei dati strutturati)
const PROFILE_LABELS: Record<string, string> = {
  'instagram.com': 'Instagram',
  'linkedin.com': 'LinkedIn',
  'pinterest.com': 'Pinterest',
  'houzz.it': 'Houzz',
  'archilovers.com': 'Archilovers',
  'homify.it': 'Homify',
  'spazibelli.com': 'Spazi Belli',
}

function profileLabel(url: string): string {
  const host = new URL(url).hostname.replace(/^(www|es)\./, '')
  return PROFILE_LABELS[host] ?? host
}

export default async function SobreMiPage({ params }: SobreMiPageProps) {
  const { locale } = await params

  const pressItems = getAllNews(locale)
    .filter((post) => Boolean(post.source))
    .map((post) => ({ slug: post.slug, source: post.source as string, title: post.title }))

  const projects = ABOUT_PROJECTS.map((slug) => getProjectBySlug(slug, locale)).filter(
    (project): project is Project => Boolean(project)
  )

  const profiles: ProfileLink[] = sameAsProfiles.map((url) => ({ label: profileLabel(url), url }))

  return (
    <SobreMiContent
      pressItems={pressItems}
      projects={projects}
      profiles={profiles}
      archiAdviceSlug={getPublishedServiceBySlug('consulenza-architetto-online', locale)?.slug}
    />
  )
}
