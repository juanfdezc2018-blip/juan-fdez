import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/lib/i18n'
import BackgroundGrid from '@/components/BackgroundGrid'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {}
  const dict = await getDictionary(params.locale as Locale)
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: 'Juan Fernández' }],
    openGraph: {
      type: 'website',
      title: dict.meta.title,
      description: dict.meta.description,
      locale: params.locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params
  if (!isValidLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-base text-[#F5F7FA]">
        <BackgroundGrid />
        <Navbar locale={locale as Locale} dict={dict.nav} />
        <main id="main-content">{children}</main>
        <Footer locale={locale as Locale} dict={dict.footer} navDict={dict.nav} />
      </body>
    </html>
  )
}
