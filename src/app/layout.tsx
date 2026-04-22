import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import '../styles/globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { schemaWebSite, schemaOrganization } from '@/lib/seo'
import { SITE_URL, SITE_NAME, YEAR } from '@/lib/mdx'

const barlow = Barlow({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-barlow', display: 'swap' })
const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], weight: ['600','700','900'], variable: '--font-barlow-condensed', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Eerlijke Fietsreviews & Koopgidsen ${YEAR}`, template: `%s | ${SITE_NAME}` },
  description: `De eerlijkste fietsreviews van Nederland. Onafhankelijk getest in ${YEAR}. Wielrennen, MTB, gravel en e-bike — inclusief actuele bol.com prijzen.`,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: { type: 'website', locale: 'nl_NL', url: SITE_URL, siteName: SITE_NAME },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization()) }} />
      </head>
      <body className="bg-white text-gray-800 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}