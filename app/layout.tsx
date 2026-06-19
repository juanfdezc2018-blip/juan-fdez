import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundGrid from '@/components/BackgroundGrid'

export const metadata: Metadata = {
  title: 'Juan Fdez | Data & Markets',
  description: 'Building data-driven research on markets, risk and fintech.',
  keywords: [
    'Data Engineering',
    'Financial Markets',
    'Risk Analytics',
    'Fintech',
    'Python',
    'AWS',
    'Equity Research',
    'Portfolio Risk',
    'Small Caps',
    'Spain',
  ],
  authors: [{ name: 'Juan Fernández' }],
  creator: 'Juan Fernández',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://juanfdez.com',
    siteName: 'Juan Fdez Research',
    title: 'Juan Fdez | Data & Markets',
    description: 'Building data-driven research on markets, risk and fintech.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Fdez | Data & Markets',
    description: 'Building data-driven research on markets, risk and fintech.',
    creator: '@juanfdez',
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen">
        <BackgroundGrid />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
