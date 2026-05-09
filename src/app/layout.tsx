import type { Metadata } from 'next'
import Script from 'next/script'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import '../styles/globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { schemaWebSite, schemaOrganization } from '@/lib/seo'
import { SITE_URL, SITE_NAME, YEAR } from '@/lib/mdx'

const GA_ID = 'G-6MTGD8V0JL'

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
    default: `${SITE_NAME} ÃÂ¢ÃÂÃÂ Eerlijke Fietsreviews & Koopgidsen ${YEAR}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Onafhankelijke fietsreviews getest op echte ritten in Nederland. Wielrennen, MTB, gravel en e-bike ÃÂ¢ÃÂÃÂ actuele koopgidsen en onderhoudstips voor ${YEAR}.`,
  keywords: ['fietsreviews nederland', 'beste fietshelm', 'beste racefiets', 'wielrennen tips', 'mtb koopgids'],
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
      alt: `${SITE_NAME} ÃÂ¢ÃÂÃÂ Eerlijke Fietsreviews Nederland`,
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
  verification: { google: "N_D_e6LAzOe2VMtZaVbu_d6B7GpKeiQuByjGOVFSLVo" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
        as="style"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://partner.bol.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* GEO meta tags ÃÂ¢ÃÂÃÂ Nederland */}
        <meta name="geo.region" content="NL" />
        <meta name="geo.placename" content="Nederland" />
        <meta name="geo.country" content="NL" />
        <meta name="language" content="nl" />
        <meta name="content-language" content="nl-NL" />
        <meta name="DC.language" content="nl" />

        {/* Snippet controle ÃÂ¢ÃÂÃÂ Google mag snippets genereren maar niet uit nosnippet elementen */}
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
