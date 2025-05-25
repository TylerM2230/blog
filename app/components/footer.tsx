'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  if (isHomePage) {
    return null
  }

  return (
    <footer className="mt-16 mb-8">
      <Link 
        href="/"
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        ← Return to home
      </Link>
    </footer>
  )
} 