import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatBox from '@/components/ChatBox'

import GoogleAnalytics from '@/components/analytics/googleanalytics'
import GoogleTagManager from '@/components/analytics/googletagmanager'
import GTMNoScript from '@/components/analytics/GTMNoScript'

export const metadata: Metadata = {
  metadataBase: new URL('https://goaisprint.com'),

  title: 'AiSprint',
  description: 'AiSprint',

  alternates: {
    canonical: 'https://goaisprint.com',
  },

  openGraph: {
    type: 'website',
    url: 'https://goaisprint.com',
    siteName: 'AiSprint',
    title: 'AiSprint — Become the Top 1% AI Experts',
    description: 'Fast paced, career-focused AI education with 1:1 live mentorship and placement support.',
    images: [
      {
        url: 'https://goaisprint.com/metatag.png',
        width: 1200,
        height: 630,
        alt: 'AiSprint — AI Career Acceleration Platform',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AiSprint — Become the Top 1% AI Experts',
    description: 'Personalized 1:1 live mentorship in AI/ML. Global placement support.',
    images: ['https://goaisprint.com/metatag.png'],
  },

  icons: {
    icon: '/logo3.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body className="font-body antialiased bg-white text-neutral-950">
        <GTMNoScript />
        <GoogleAnalytics />

        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatBox />
      </body>
    </html>
  )
}