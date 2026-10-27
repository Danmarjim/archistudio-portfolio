import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { GLOBAL_CLIENT_NAMESPACES, pickMessages } from '@/lib/clientMessages'

interface ClientMessagesProps {
  /** Namespace (o `Namespace.chiave`) usati dai componenti client di questa sezione */
  namespaces: string[]
  children: React.ReactNode
}

/** Aggiunge ai testi globali quelli di una sezione, solo per i componenti client al suo interno. */
export default async function ClientMessages({ namespaces, children }: ClientMessagesProps) {
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={pickMessages(messages, [...GLOBAL_CLIENT_NAMESPACES, ...namespaces])}>
      {children}
    </NextIntlClientProvider>
  )
}
