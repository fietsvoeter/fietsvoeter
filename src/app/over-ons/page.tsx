import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_NAME } from '@/lib/mdx'

export const metadata: Metadata = {
  title: `Over Ons — ${SITE_NAME}`,
  description: 'Wie zit er achter Fietsvoeter.nl? Maak kennis met Olivier Kremer en Senne de Jong — de twee testers achter onze onafhankelijke fietsreviews.',
}

export default function OverOnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Over Fietsvoeter.nl</h1>

      <p className="text-gray-700 text-lg mb-6">
        Fietsvoeter.nl is begonnen met een simpele frustratie: de meeste fietsreviews online zijn
        óf geschreven door mensen die het product nooit hebben gebruikt, óf zo voorzichtig dat je
        er niets aan hebt. Wij doen dat anders.
      </p>

      <p className="text-gray-700 mb-8">
        Achter Fietsvoeter.nl zitten twee rijders die elke review beoordelen vanuit eigen
        perspectief en rijervaring. Geen gesponsorde content, geen mooie praatjes voor merken
        die advertentiebudget hebben. Wel eerlijke meningen, vergelijkingen op basis van
        technische data en praktijkervaring, en duidelijke aanbevelingen die je daadwerkelijk
        iets opleveren.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Onze testers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

        {/* Olivier */}
        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src="/images/auteurs/olivier-kremer-wielrenner.jpg"
              alt="Olivier Kremer op de racefiets — performance specialist Fietsvoeter.nl"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Olivier Kremer</h3>
            <p className="text-red-600 text-sm font-medium mb-3">Performance specialist · 8 jaar rijervaring</p>
            <p className="text-gray-600 text-sm mb-4">
              Olivier rijdt al acht jaar, van klimstages in de Spaanse bergen tot singletrack op
              de Veluwe. Zijn focus ligt op snelheid, wattages en technische uitrusting. Hij is
              moeilijk te imponeren door marketingverhalen.
            </p>
            <div className="text-xs text-gray-500 mb-1">🚴 Specialized Tarmac SL8 · Shimano Ultegra Di2</div>
            <div className="text-xs text-gray-500 mb-4">🚵 Scott Scale RC · SRAM X0 Eagle</div>
            <Link
              href="/auteur/olivier-kremer/"
              className="inline-block bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Bekijk profiel & artikelen →
            </Link>
          </div>
        </div>

        {/* Senne */}
        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src="/images/auteurs/senne-de-jong-wielrenner.jpg"
              alt="Senne de Jong met gravel fiets — allround specialist Fietsvoeter.nl"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Senne de Jong</h3>
            <p className="text-red-600 text-sm font-medium mb-3">Allround specialist · 5 jaar rijervaring</p>
            <p className="text-gray-600 text-sm mb-4">
              Senne wisselt moeiteloos tussen racefiets en mountainbike. Voor hem moet een fiets
              gewoon werken — bij een lange duurrit én op een technische afdaling op de Posbank.
              Hij test vanuit het perspectief van de rijder die wil genieten, niet optimaliseren.
            </p>
            <div className="text-xs text-gray-500 mb-1">🚴 Trek Domane SLR · Shimano 105 Di2</div>
            <div className="text-xs text-gray-500 mb-4">🚵 Orbea Oiz M-Pro · Shimano XT M8100</div>
            <Link
              href="/auteur/senne-de-jong/"
              className="inline-block bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Bekijk profiel & artikelen →
            </Link>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Hoe wij werken</h2>
        <p className="text-gray-700 mb-4">
          We beoordelen producten op basis van eigen rijervaring, technische specificaties,
          gebruikersdata uit de community en vergelijkingsdata van gespecialiseerde testbronnen.
          Als we iets zelf niet hebben gereden, zeggen we dat — en dan maken we duidelijk op
          welke basis we de beoordeling geven.
        </p>
        <Link href="/hoe-wij-testen/" className="text-red-600 font-medium hover:underline">
          Lees onze volledige testmethodologie →
        </Link>
      </div>
    </div>
  )
}
