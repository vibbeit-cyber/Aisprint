import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatBox from '@/components/ChatBox'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),

  title: 'AiSprint',

  description:
    'Master AI, Machine Learning, and Prompt Engineering with personalized 1:1 live mentorship. Global placement support, Startup India partner, Swayam recognized. Start your AI career today.',

  keywords: [
    'AI course India',
    'machine learning course',
    'prompt engineering course',
    '1:1 live mentorship',
    'AI placement',
    'ML course online',
    'Startup India AI',
    'Swayam AI course',
    'AI career support',
    'personalized AI training',
  ],

  authors: [{ name: 'AiSprint' }],
  creator: 'AiSprint',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://AiSprint.in',
    siteName: 'AiSprint',
    title:
      'AiSprint ',
    description:
      'Master AI, Machine Learning, and Prompt Engineering with personalized 1:1 live mentorship. Startup India partner & Swayam recognized.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AiSprint — Premier AI Education Platform',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AiSprint',
    description:
      'Personalized 1:1 live mentorship in AI/ML. Global placement support. Startup India partner.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: '/logo3.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION as string,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased bg-white text-neutral-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatBox />
      </body>
    </html>
  )
}