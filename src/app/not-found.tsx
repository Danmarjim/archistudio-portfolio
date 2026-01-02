import Link from 'next/link'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-600">
            Error 404
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium text-foreground md:text-5xl">
            Página no encontrada
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
