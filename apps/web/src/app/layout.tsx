import type { Metadata } from 'next'
import '@/styles/globals.css'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatBox from '@/components/ChatBox'

import GoogleAnalytics from '@/components/analytics/googleanalytics'
import GoogleTagManager from '@/components/analytics/googletagmanager'
import GTMNoScript from '@/components/analytics/GTMNoScript'

const siteUrl = 'https://goaisprint.com'
const imageUrl = 'https://goaisprint.com/metatag.png'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'AiSprint — Become the Top 1% AI Experts',
    template: '%s | AiSprint',
  },

  description:
    'Fast paced, career-focused AI education with 1:1 live mentorship and placement support. Master AI, ML, and prompt engineering with personalized guidance.',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'AiSprint',
    title: 'AiSprint — Become the Top 1% AI Experts',
    description:
      'Fast paced, career-focused AI education with 1:1 live mentorship and placement support.',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'AiSprint — Become the Top 1% AI Experts',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AiSprint — Become the Top 1% AI Experts',
    description:
      'Personalized 1:1 live mentorship in AI/ML. Global placement support.',
    images: [imageUrl],
  },

  icons: {
    icon: '/logo3.png',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* FORCE OG TAGS FOR WHATSAPP RELIABILITY */}
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:image" content={imageUrl} />

        <meta property="fb:app_id" content="1234567890" />

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