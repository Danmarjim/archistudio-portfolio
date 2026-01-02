'use client'

import { PageTransition } from '@/components/shared'

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
