import { sameAsProfiles, siteConfig } from '@/lib/constants'
import { getAllNews } from '@/lib/news'
import { getAllProjects } from '@/lib/projects'
import { localizedUrl } from '@/lib/seo'
import { getPublishedServices } from '@/lib/services'

// Generato al build dal contenuto: elenca solo servizi e notizie pubblicati, così non punta
// mai a pagine che in produzione non esistono (es. bozze con dati da confermare).
export const dynamic = 'force-static'

// Categoria del progetto al singolare per descrivere il singolo lavoro (i valori MDX sono al plurale)
const PROJECT_KIND: Record<string, string> = { Bagni: 'bagno', Cucine: 'cucina' }

const monthYear = (date: string) =>
  new Date(date).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })

function buildLlmsTxt(): string {
  const services = getPublishedServices('it')
  const projects = getAllProjects('it')
  const news = getAllNews('it')
  const press = news.filter((post) => post.source)
  const articles = news.filter((post) => !post.source)

  const lines = [
    '# MP_archistudio — Martina Pozzi, architetta a Bergamo',
    '',
    "> MP_archistudio è lo studio di architettura e interior design di Martina Chiara Maria Pozzi (laureata in Architettura al Politecnico di Milano), con sede a Bergamo. Offre ristrutturazioni chiavi in mano, progettazione d'interni su misura, restyling e consulenza all'acquisto casa a Bergamo, Milano, Monza e Brianza e in tutta la Lombardia. Il colore è il tratto distintivo dei suoi progetti. Il sito è disponibile in italiano, spagnolo e inglese.",
    '',
    '## Chi è',
    '- Titolare: Martina Chiara Maria Pozzi, architetta (Politecnico di Milano, 2011)',
    '- Esperienza: oltre 15 anni, tra Italia e Spagna (Studio Vázquez Consuegra a Siviglia, Exe Arquitectura a Barcellona); MP_archistudio dal 2021',
    `- Sede: ${siteConfig.address} (riceve su appuntamento)`,
    '- Zona di lavoro: Bergamo e provincia, Milano, Monza e Brianza, Lombardia, Siviglia',
    `- Telefono: ${siteConfig.phone}`,
    '- Orari: lunedì–venerdì, 9:00–18:00',
    '- Lingue: italiano, spagnolo, inglese',
    '',
    '## Servizi',
    ...(services.length
      ? services.map((s) => `- [${s.seoTitle ?? s.title}](${localizedUrl('it', `/servicios/${s.slug}`)}): ${s.description}`)
      : []),
    `- Tutti i servizi: ${localizedUrl('it', '/servicios')}`,
    '',
    '## Progetti',
    ...projects.map(
      (p) =>
        `- [${p.title}](${localizedUrl('it', `/proyectos/${p.slug}`)}): ${PROJECT_KIND[p.category] ?? p.category.toLowerCase()}, ${p.location}, ${p.surface}, ${p.year}`
    ),
    '',
    '## Stampa e interviste',
    ...press.map(
      (post) =>
        `- ${post.source}, ${monthYear(post.date)} ("${post.title}"): ${post.sourceUrl ?? localizedUrl('it', `/news/${post.slug}`)}`
    ),
    '',
    ...(articles.length
      ? [
          '## Guide e articoli',
          ...articles.map((post) => `- [${post.title}](${localizedUrl('it', `/news/${post.slug}`)}): ${post.excerpt}`),
          '',
        ]
      : []),
    '## Pagine principali (italiano)',
    `- [Home](${localizedUrl('it', '/')})`,
    `- [Progetti](${localizedUrl('it', '/proyectos')})`,
    `- [Servizi](${localizedUrl('it', '/servicios')})`,
    `- [Chi sono](${localizedUrl('it', '/sobre-mi')})`,
    `- [Tappeti — Collezione Sevilla](${localizedUrl('it', '/tappeti')})`,
    `- [News e pubblicazioni](${localizedUrl('it', '/news')})`,
    `- [Contatti](${localizedUrl('it', '/contacto')})`,
    '',
    '## Español',
    `- [Inicio](${localizedUrl('es', '/')})`,
    `- [Proyectos](${localizedUrl('es', '/proyectos')})`,
    `- [Servicios](${localizedUrl('es', '/servicios')})`,
    ...getPublishedServices('es').map(
      (s) => `  - [${s.seoTitle ?? s.title}](${localizedUrl('es', `/servicios/${s.slug}`)})`
    ),
    `- [Sobre mí](${localizedUrl('es', '/sobre-mi')})`,
    `- [Contacto](${localizedUrl('es', '/contacto')})`,
    '',
    '## English',
    `- [Home](${localizedUrl('en', '/')})`,
    `- [Projects](${localizedUrl('en', '/proyectos')})`,
    `- [Services](${localizedUrl('en', '/servicios')})`,
    ...getPublishedServices('en').map(
      (s) => `  - [${s.seoTitle ?? s.title}](${localizedUrl('en', `/servicios/${s.slug}`)})`
    ),
    `- [About](${localizedUrl('en', '/sobre-mi')})`,
    `- [Contact](${localizedUrl('en', '/contacto')})`,
    '',
    '## Profili',
    ...sameAsProfiles.map((url) => `- ${url}`),
    '',
  ]
  return lines.join('\n')
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
