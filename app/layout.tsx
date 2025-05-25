import './global.css'
import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from './components/footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'blog',
    template: '%s | blog',
  },
  description: 'A minimal blog built with Next.js',
  openGraph: {
    title: 'blog',
    description: 'A minimal blog built with Next.js',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const cx = (...classes: (string | undefined | null | false)[]): string => 
  classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistMono.className
      )}
      suppressHydrationWarning
    >
      <body className="antialiased max-w-3xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-4 md:px-8">
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
