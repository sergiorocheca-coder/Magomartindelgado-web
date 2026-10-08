import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import CursorGlow from '@/components/CursorGlow'
import { SITE_URL } from '@/lib/site'
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
  '@type': ['EntertainmentBusiness', 'LocalBusiness'],
  '@id': `${SITE_URL}/#negocio`,
  name: 'Mago Martín Delgado',
  description: 'Mago profesional en Granada, Madrid y toda España. Espectáculos para bodas, comuniones y eventos de empresa. Participante de Got Talent España 2022.',
  url: SITE_URL,
  telephone: '+34648146024',
  email: 'magomartindelgado@gmail.com',
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo-martin-navbar.png`,
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
  areaServed: ['Granada', 'Madrid', 'Castilla y León', 'España'],
  knowsAbout: ['Magia para bodas', 'Magia para comuniones', 'Magia para eventos de empresa'],
  sameAs: [
    'https://www.instagram.com/magomartindelgado',
    'https://www.youtube.com/@magomartindelgado3671',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Mago Martín Delgado | Mago en Granada y Madrid',
  description: 'Mago profesional en Granada, Madrid y toda España. Espectáculos únicos e irrepetibles para bodas, comuniones y eventos de empresa. Solicita presupuesto sin compromiso.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    locale: 'es_ES',
    siteName: 'Mago Martín Delgado',
    title: 'Martín Delgado — Mago Profesional | Granada',
    description: 'Mago profesional en Granada y toda España. Bodas, comuniones y eventos de empresa. Solicita presupuesto sin compromiso.',
    images: [
      {
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
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
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <link rel="preload" as="image" href="/frames/frame_0001.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {GTM_ID && /^GTM-[A-Z0-9]+$/.test(GTM_ID) && (
          <Script id="gtm-base" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body>
        {GTM_ID && /^GTM-[A-Z0-9]+$/.test(GTM_ID) && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <CursorGlow />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
