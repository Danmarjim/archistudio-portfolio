'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
}

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
} as const

// Il primo caricamento (HTML del server + idratazione) deve essere già visibile: con
// `opacity: 0` nell'HTML la pagina intera resta invisibile fino al JavaScript, penalizzando
// LCP e utenti/crawler senza JS. L'animazione resta solo per le navigazioni successive.
// Sul server gli effect non girano mai, quindi il flag resta `true` e l'HTML è sempre visibile.
let isFirstLoad = true

export default function PageTransition({ children }: PageTransitionProps) {
  const skipInitialAnimation = isFirstLoad

  useEffect(() => {
    isFirstLoad = false
  }, [])

  return (
    <motion.div
      initial={skipInitialAnimation ? false : 'initial'}
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}
