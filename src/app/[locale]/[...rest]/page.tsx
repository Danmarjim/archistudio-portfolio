import { notFound } from 'next/navigation'

// Cattura qualsiasi percorso non previsto dentro una lingua valida (es. /es/xyz) e attiva
// la 404 localizzata di `[locale]/not-found.tsx`, con header e footer del sito.
export default function CatchAllPage() {
  notFound()
}
