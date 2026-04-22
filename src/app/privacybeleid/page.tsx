import type { Metadata } from 'next'
import { YEAR, SITE_NAME } from '@/lib/mdx'
export const metadata: Metadata = { title: `Privacybeleid — ${SITE_NAME}` }
export default function PrivacybeleidPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1>Privacybeleid</h1>
      <p><em>Laatste update: januari {YEAR}</em></p>
      <p>{SITE_NAME} verwerkt persoonsgegevens conform de AVG.</p>
      <h2>Cookies</h2>
      <p>Wij gebruiken Google Analytics 4 (geanonimiseerd) en functionele cookies.</p>
      <p>Vragen: <a href="mailto:info@fietsvoeter.nl">info@fietsvoeter.nl</a></p>
    </div>
  )
}