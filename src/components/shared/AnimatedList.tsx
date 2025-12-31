'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedListProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
  amount?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AnimatedList({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
}: AnimatedListProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedListItemProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedListItem({ children, className }: AnimatedListItemProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

AnimatedList.Item = AnimatedListItem
