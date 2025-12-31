import { siteConfig } from '@/lib/constants'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground md:text-7xl">
            Arquitectura con alma
          </h1>
          <p className="mt-6 text-lg text-neutral-600 md:text-xl">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/proyectos"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary-500 px-8 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Ver proyectos
            </a>
            <a
              href="/contacto"
              className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 px-8 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
