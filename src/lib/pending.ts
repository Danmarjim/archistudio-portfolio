/**
 * Segnaposto per i dati che l'autrice deve ancora confermare: `[DA CONFERMARE: prezzo]`.
 * In locale e nelle preview di Vercel si vede evidenziato; in produzione una pagina che lo
 * contiene non viene pubblicata (vedi `getPublishedServices`).
 */
export const PENDING_MARKER = 'DA CONFERMARE'

export function hasPendingMarkers(...texts: Array<string | undefined>): boolean {
  return texts.some((text) => text?.includes(PENDING_MARKER))
}

export const isProductionDeploy = process.env.VERCEL_ENV === 'production'
