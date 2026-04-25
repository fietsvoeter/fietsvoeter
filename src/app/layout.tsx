import type { Metadata } from 'next'
import Script from 'next/script'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import '../styles/globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { schemaWebSite, schemaOrganization } from '@/lib/seo'
import { SITE_URL, SITE_NAME, YEAR } from '@/lib/mdx'

const GA_ID = 'G-6MTGD8V0JL'

// display: swap voorkomt FOIT (Flash of Invisible Text)
// preload: true laadt het font prioriteit — minder render blocking
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
  preload: true,
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Eerlijke Fietsreviews & Koopgidsen ${YEAR}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `De eerlijkste fietsreviews van Nederland. Onafhankelijk getest in ${YEAR}. Wielrennen, MTB, gravel en e-bike — inclusief actuele bol.com prijzen.`,
  keywords: ['fietsreviews', 'wielrennen', 'mountainbike', 'gravel fiets', 'e-bike'],
  authors: [{ name: 'Fietsvoeter.nl Redactie', url: SITE_URL }],
  creator: 'Fietsvoeter.nl',
  publisher: 'Fietsvoeter.nl',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/images/og-default.png`,
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} — Eerlijke Fietsreviews Nederland`,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/images/og-default.png`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'nl-NL': SITE_URL },
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon-32.png',
  },
  manifest: '/manifest.json',
  other: { 'theme-color': '#E2001A' },
  verification: { google: process.env.GOOGLE_VERIFICATION || '' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        {/* preconnect voor snellere font-load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://partner.bol.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="geo.region" content="NL" />
        <meta name="geo.placename" content="Nederland" />
        <meta name="language" content="nl" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization()) }}
        />
      </head>
      <body className="bg-white text-gray-800 antialiased">
        {/* GA4 — afterInteractive zorgt dat het laadt NA de pagina */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
