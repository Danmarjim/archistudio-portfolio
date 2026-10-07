interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/** Inserisce dati strutturati JSON-LD. Funziona sia in Server che in Client Component. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // `<` escapato per evitare chiusure premature del tag <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
