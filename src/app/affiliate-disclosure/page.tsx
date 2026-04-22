import type { Metadata } from 'next'
import { PARTNER_ID, SITE_NAME } from '@/lib/mdx'
export const metadata: Metadata = { title: `Affiliate Disclosure — ${SITE_NAME}` }
export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1>Affiliate disclosure</h1>
      <p>{SITE_NAME} neemt deel aan het bol.com partnerprogramma (Partner ID: {PARTNER_ID}). Wij ontvangen een kleine commissie bij aankoop via onze links — <strong>zonder extra kosten voor jou.</strong></p>
      <h2>Invloed op reviews</h2>
      <p>Affiliate commissies hebben <strong>geen enkele invloed</strong> op onze beoordelingen. Wij publiceren altijd onze eerlijke mening.</p>
      <p>Vragen: <a href="mailto:info@fietsvoeter.nl">info@fietsvoeter.nl</a></p>
    </div>
  )
}