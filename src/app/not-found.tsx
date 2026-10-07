import Link from 'next/link'

// Pagina 404 per URL che non corrispondono a nessuna lingua (es. /favicon.ico, /llms.txt
// inesistenti). Il root layout vive in `[locale]/layout.tsx`, quindi qui servono <html> e <body>.
export const metadata = {
  title: 'Pagina non trovata | MP_archistudio',
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div>
          <p style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B5C2A' }}>
            Errore 404
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 500, fontSize: 36, margin: '16px 0' }}>
            Pagina non trovata
          </h1>
          <p style={{ color: '#555', marginBottom: 24 }}>
            La pagina che cerchi non esiste o è stata spostata.
          </p>
          <Link href="/" style={{ color: '#8B5C2A', fontWeight: 600 }}>
            Torna alla home
          </Link>
        </div>
      </body>
    </html>
  )
}
