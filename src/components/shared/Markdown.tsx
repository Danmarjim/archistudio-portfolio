import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from '@/i18n/navigation'
import { internalHref } from '@/lib/routes'
import { PENDING_MARKER } from '@/lib/pending'

// I dati da confermare (`[DA CONFERMARE: …]`, vedi `lib/pending`) diventano un link a questa
// ancora e si mostrano evidenziati
const PENDING_ANCHOR = '#da-confermare'
const PENDING_REGEX = new RegExp(`\\[(${PENDING_MARKER}[^\\]]*)\\]`, 'g')

interface MarkdownProps {
  content: string
}

/**
 * Corpo degli articoli (news e guide) scritto in Markdown nel MDX: titoli, liste, tabelle,
 * citazioni e link. Gli stili sono definiti qui perché il sito non usa il plugin typography.
 * I link interni (`/proyectos/…`, `/servicios`) passano dal `Link` localizzato di next-intl.
 */
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 font-serif text-2xl font-medium text-foreground md:text-3xl">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-serif text-xl font-medium text-foreground">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-5 text-lg leading-relaxed text-neutral-700">{children}</p>,
  ul: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-6 text-lg text-neutral-700">{children}</ul>,
  ol: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg text-neutral-700">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-primary-300 pl-5 italic text-neutral-600">{children}</blockquote>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-neutral-200">
      <table className="w-full border-collapse text-left text-base">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-neutral-50">{children}</thead>,
  th: ({ children }) => <th className="border-b border-neutral-200 px-4 py-3 font-medium text-foreground">{children}</th>,
  td: ({ children }) => <td className="border-b border-neutral-100 px-4 py-3 align-top text-neutral-700">{children}</td>,
  a: ({ href = '', children }) => {
    if (href === PENDING_ANCHOR) {
      return <mark className="rounded bg-amber-100 px-1 text-amber-900">{children}</mark>
    }
    const internal = href.startsWith('/') ? internalHref(href) : null
    if (internal) {
      return (
        <Link href={internal} className="font-medium text-primary-700 underline underline-offset-4 hover:text-primary-800">
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary-700 underline underline-offset-4 hover:text-primary-800"
      >
        {children}
      </a>
    )
  },
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content.replace(PENDING_REGEX, `[$1](${PENDING_ANCHOR})`)}
    </ReactMarkdown>
  )
}
