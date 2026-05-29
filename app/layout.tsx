import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import CursorGlow from '@/components/CursorGlow'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Mago Martín Delgado',
  description: 'Mago profesional en España. Espectáculos únicos para bodas, comuniones y eventos de empresa.',
  url: 'https://www.magomartindelgado.com',
  telephone: '+34648146024',
  email: 'martindelgadosalud@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Granada',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.195478672137135,
    longitude: -3.6141040229303822,
  },
  image: 'https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg',
  priceRange: '€€€',
  serviceType: ['Bodas', 'Comuniones', 'Eventos de empresa', 'Eventos privados'],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.magomartindelgado.com'),
  title: 'Martín Delgado — Mago Profesional | Bodas, Comuniones y Empresas en Granada',
  description: 'Mago profesional en Granada y toda España. Espectáculos únicos e irrepetibles para bodas, comuniones y eventos de empresa. Solicita presupuesto sin compromiso.',
  keywords: ['mago profesional', 'mago bodas Granada', 'mago comuniones Granada', 'mago eventos empresa', 'espectáculo magia Granada', 'contratar mago España'],
  alternates: {
    canonical: 'https://www.magomartindelgado.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.magomartindelgado.com',
    locale: 'es_ES',
    siteName: 'Mago Martín Delgado',
    title: 'Martín Delgado — Mago Profesional | Granada',
    description: 'Mago profesional en Granada y toda España. Bodas, comuniones y eventos de empresa. Solicita presupuesto sin compromiso.',
    images: [
      {
        url: 'https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg',
        width: 1200,
        height: 630,
        alt: 'Mago Martín Delgado — Espectáculos de Magia Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martín Delgado — Mago Profesional | Granada',
    description: 'Mago profesional en Granada y toda España. Bodas, comuniones y eventos de empresa.',
    images: ['https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CursorGlow />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
