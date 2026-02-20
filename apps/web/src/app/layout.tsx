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

  alternates: {
    canonical: 'https://goaisprint.com',
  },

  openGraph: {
    type: 'website',
    url: 'https://goaisprint.com',
    siteName: 'AiSprint',
    images: [
      {
        url: 'https://goaisprint.com/metatag.png',
        width: 2400,
        height: 1080,
        alt: 'AiSprint',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
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