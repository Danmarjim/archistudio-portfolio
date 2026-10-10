import ClientMessages from '@/components/i18n/ClientMessages'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientMessages namespaces={['NewsPage']}>{children}</ClientMessages>
}
