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
  title: 'Martín Delgado — Mago Profesional | Bodas, Comuniones, Empresas',
  description: 'Mago profesional en España. Espectáculos únicos para bodas, comuniones y eventos de empresa.',
  openGraph: {
    title: 'Martín Delgado — Mago Profesional',
    description: 'Espectáculos de magia profesional para tus momentos más especiales.',
    images: ['https://assets.cdn.filesafe.space/F222CaBt1UL1aluI2C1k/media/6a04af9d06993a27a31256e6.jpeg'],
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
