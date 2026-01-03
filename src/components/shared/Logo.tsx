import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'font-serif text-xl font-medium tracking-tight text-foreground transition-colors hover:text-primary-600',
        className
      )}
    >
      MP Archistudio
    </Link>
  )
}
