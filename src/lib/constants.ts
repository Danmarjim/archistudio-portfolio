import type { NavItem, SiteConfig, Service } from '@/types'

/** Prenotazione online di ArchiAdvice */
export const CALENDLY_URL = 'https://calendly.com/mp_archistudio'

export const siteConfig: SiteConfig = {
  name: 'MP_archistudio',
  title: 'Architetto a Bergamo – Martina Pozzi | MP_archistudio',
  description: 'Martina Pozzi, architetta a Bergamo: ristrutturazioni chiavi in mano, interior design su misura e consulenza all\'acquisto casa.',
  // URL canonico di produzione (senza slash finale). Alimenta metadataBase, canonical,
  // hreflang, og:url, sitemap e robots. Se il dominio principale cambia (es. .it), aggiornare qui.
  url: 'https://mparchistudio.com',
  email: 'martina_pozzi_17@hotmail.com',
  phone: '+39 327 126 7024',
  address: 'Via Bologna 2, 24128 Bergamo (BG), Italia',
  social: [
    { platform: 'instagram', url: 'https://www.instagram.com/mp_archistudio/' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/martinachiaramariapozzi/' },
    { platform: 'pinterest', url: 'https://es.pinterest.com/MartinaCMPozzi/' },
    { platform: 'linktree', url: 'https://linktr.ee/Arch.MartinaPozzi?utm_source=linktree_profile_share&ltsid=5ebb31cc-5a59-4cce-b0a5-d577b11e5c5a' },
  ],
}

/** Profili professionali esterni (usati come `sameAs` nei dati strutturati). */
export const sameAsProfiles: string[] = [
  'https://www.instagram.com/mp_archistudio/',
  'https://www.linkedin.com/in/martinachiaramariapozzi/',
  'https://es.pinterest.com/MartinaCMPozzi/',
  'https://www.houzz.it/pro/martina-pozzi',
  'https://www.archilovers.com/mparchistudio/',
  'https://www.homify.it/esperti/10014002/mp_archistudio-di-arch-martina-c-m-pozzi',
  'https://www.spazibelli.com/professionisti/arch-martina-pozzi-mp_archistudio',
]

export const navigation: NavItem[] = [
  { label: 'projects', href: '/proyectos' },
  { label: 'about', href: '/sobre-mi' },
  { label: 'services', href: '/servicios' },
  { label: 'tappeti', href: '/tappeti' },
  { label: 'news', href: '/news' },
  { label: 'contact', href: '/contacto' },
]

export const services: Service[] = [
  {
    title: 'ArchiAdvice — videocall di 60\'',
    slug: 'archiadvice',
    description: 'Cerchi un consiglio rapido di un esperto? Una videocall di 60 minuti per risolvere i tuoi dubbi di interior design, colori, materiali e arredi.',
    icon: 'video',
    features: [
      'Hai dei dubbi su che colori/materiali usare per ottenere lo stile dei tuoi sogni',
      'Hai delle idee ma non sai come metterle in pratica',
      'Non sai come organizzare gli arredi, cosa tenere, cosa rinnovare, come disporli, dove acquistarli',
      'Vuoi condividere i tuoi dubbi su un progetto d\'interni che non ti fa dormire',
    ],
  },
  {
    title: 'Consulenza all\'acquisto',
    slug: 'consulenza-acquisto',
    description: 'Vuoi comprare casa? Ti affianco nell\'acquisto di un immobile per fare una scelta consapevole, valutare le criticità e il potenziale di ogni spazio.',
    icon: 'key',
    features: [
      'Hai bisogno che un architetto visioni tutti i documenti per essere sicuri che tutto sia in regola (agibilità, catasto...)',
      'Vuoi fare un sopralluogo con un architetto e/o una messa in comune delle informazioni per valutare eventuali criticità, scoprirne le potenzialità e come sfruttare al meglio ogni metro',
      'Vuoi sapere quanto potrebbe costarti indicativamente ristrutturarlo',
      'Vuoi fare un acquisto consapevole',
    ],
  },
  {
    title: 'Restyling',
    slug: 'restyling',
    description: 'Aria di cambiamenti? Rinnovo l\'aspetto dei tuoi spazi senza necessariamente abbattere pareti — perfetto anche per chi è in affitto.',
    icon: 'paintbrush',
    features: [
      'Vuoi cambiare aspetto ad una o più stanze di casa senza dover per forza spostare pareti',
      'Sei in affitto e vorresti sentire più tua la casa dove vivi o il negozio/ufficio dove lavori',
      'Vuoi cambiare arredi, ottimizzare gli spazi disegnando qualche elemento su misura',
      'Cantiere finito e ora tocca decorare, dipingere, arredare...',
    ],
  },
  {
    title: 'Progettazione architettonica a 360°',
    slug: 'progettazione-architettonica',
    description: 'È un servizio chiavi in mano pensato per toglierti ogni preoccupazione. Ti accompagno passo a passo dal rilievo geometrico fino alla chiusura del cantiere.',
    icon: 'home',
    features: [
      'Rilievo geometrico e progetto su misura sulle tue esigenze',
      'Pratiche edilizie, scelta dei materiali e richiesta preventivi',
      'Gestione delle imprese, seguimento economico e cronoprogramma',
      'Direzione artistica, direzione lavori e chiusura pratica con aggiornamento catastale',
    ],
  },
]

export const projectCategories = [
  'Ristrutturazione integrale',
  'Bagni',
  'Cucine',
  'Restyling',
  'Commerciale',
] as const

export type ProjectCategory = typeof projectCategories[number]
