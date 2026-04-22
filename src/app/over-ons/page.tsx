import type { Metadata } from 'next'
import { YEAR, SITE_NAME } from '@/lib/mdx'
export const metadata: Metadata = { title: `Over ${SITE_NAME}`, description: `${SITE_NAME} is een onafhankelijk fietsadvies-platform door Nederlandse wielrenners.` }
export default function OverOnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1>Over {SITE_NAME}</h1>
      <p>{SITE_NAME} is opgericht door enthousiaste wielrenners, mountainbikers en gravel-avonturiers uit Nederland. Ons doel: <strong>eerlijke, onafhankelijke reviews op basis van echte rijervaring</strong>.</p>
      <h2>Hoe wij testen</h2>
      <p>Elk product wordt uitgebreid getest op eigen ritten — minimaal 500 km voor helmen, 80-200 km voor schoenen. Pas daarna schrijven wij onze review.</p>
      <h2>Affiliate disclosure</h2>
      <p>{SITE_NAME} neemt deel aan het bol.com partnerprogramma. Via onze links ontvangen wij een kleine commissie zonder extra kosten voor jou. Dit heeft <strong>nooit</strong> invloed op onze beoordelingen.</p>
      <p>Vragen? Mail: <a href="mailto:info@fietsvoeter.nl">info@fietsvoeter.nl</a></p>
    </div>
  )
}