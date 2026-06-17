import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('flex flex-col gap-1 transition-opacity hover:opacity-80', className)}
    >
      <div className="relative h-10 w-40">
        <Image
          src="/images/about/MP_ARCHISTUDIO LOGO S.jpg"
          alt="MP_archistudio"
          fill
          className="object-contain object-left mix-blend-multiply"
          priority
        />
      </div>
      <span className="text-[10px] font-light tracking-wide text-neutral-500">
        by Arch. Martina C.M. Pozzi
      </span>
    </Link>
  )
}
