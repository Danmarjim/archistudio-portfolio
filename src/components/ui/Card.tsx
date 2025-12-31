import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl bg-white',
        hover && 'transition-shadow duration-300 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardImageProps {
  children: React.ReactNode
  className?: string
  aspectRatio?: 'square' | 'video' | 'portrait'
}

const aspectRatioStyles = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
}

function CardImage({ children, className, aspectRatio = 'video' }: CardImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatioStyles[aspectRatio],
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('p-5', className)}>{children}</div>
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h2' | 'h3' | 'h4'
}

function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component
      className={cn(
        'font-serif text-lg font-medium text-foreground',
        className
      )}
    >
      {children}
    </Component>
  )
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('mt-2 text-sm text-neutral-600', className)}>{children}</p>
  )
}

Card.Image = CardImage
Card.Content = CardContent
Card.Title = CardTitle
Card.Description = CardDescription
