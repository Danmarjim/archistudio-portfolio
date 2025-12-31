'use client'

import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimationType = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scale'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
  as?: 'div' | 'section' | 'article' | 'header' | 'footer'
}

const animations: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
}

export default function AnimatedSection({
  children,
  className,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
  as = 'div',
}: AnimatedSectionProps) {
  const Component = motion.create(as)

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Component>
  )
}
