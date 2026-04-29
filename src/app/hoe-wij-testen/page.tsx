import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/mdx'

export const metadata: Metadata = {
  title: `Hoe Wij Testen — ${SITE_NAME}`,
  description: 'Hoe beoordeelt Fietsvoeter.nl fietsproducten? Onze testmethode, databronnen en beoordelingscriteria uitgelegd.',
}

export default function HoeWijTestenPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Hoe wij testen</h1>
      <p className="text-gray-600 mb-8">
        Eerlijkheid over onze methode is minstens zo belangrijk als de reviews zelf.
        Hier leggen we precies uit hoe we tot onze beoordelingen komen.
      </p>

      <div className="space-y-8">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Eigen rijervaring</h2>
          <p className="text-gray-700">
            Producten die we zelf rijden krijgen altijd een hogere betrouwbaarheidsscore in onze
            reviews. Olivier en Senne rijden het hele jaar door — op de weg, op gravel en op de
            mountainbike — en verwerken hun ervaringen direct in de beoordelingen. Je ziet in
            elk artikel vermeld wie het heeft getest en in welke omstandigheden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Technische databronnen</h2>
          <p className="text-gray-700 mb-3">
            Voor producten die we niet zelf hebben getest gebruiken we externe bronnen:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Zero Friction Cycling</strong> — onafhankelijke testdata voor kettingslijtage en smeermiddelen</li>
            <li><strong>Tour Magazine en Cycling Weekly</strong> — Europese testresultaten voor fietsen en componenten</li>
            <li><strong>Fabrikantspecificaties</strong> — altijd met de kanttekening dat dit onder optimale omstandigheden is gemeten</li>
            <li><strong>Strava en community data</strong> — gebruikerservaringen op schaal als aanvulling</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Beoordelingscriteria per categorie</h2>
          <div className="space-y-3">
            {[
              ['Fietsen', 'Geometrie, gewicht, rijkarakter, prijs-kwaliteit, componentkeuze'],
              ['Banden', 'Rolweerstand, grip (droog/nat), lekbestendigheid, levensduur, montagemak'],
              ['Kleding', 'Pasvorm in fietspositie, materiaalkwaliteit, ademend vermogen, levensduur'],
              ['Voeding', 'Smakelijkheid, verteerbaarheid, koolhydraatsamenstelling, prijs per eenheid'],
              ['Trainers', 'Nauwkeurigheid vermogensmeting, geluid, app-integratie, rijgevoel'],
            ].map(([cat, crit]) => (
              <div key={cat} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <span className="font-semibold text-gray-900">{cat}: </span>
                <span className="text-gray-600 text-sm">{crit}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Wat we niet doen</h2>
          <p className="text-gray-700">
            We kopen geen reviews, accepteren geen betaalde plaatsingen en schrijven geen
            positieve reviews in ruil voor producten. Als we een product ontvangen voor test,
            vermelden we dit. Als we een product beoordelen op basis van specs en externe data,
            vermelden we dat ook. Transparantie over onze methode is niet optioneel — het is de
            basis van waarop lezers ons kunnen vertrouwen.
          </p>
        </section>

      </div>

      <div className="mt-10 border-t border-gray-200 pt-8">
        <p className="text-gray-600 text-sm">
          Vragen over onze aanpak?{' '}
          <Link href="/contact/" className="text-red-600 hover:underline">Neem contact op</Link>
          {' '}of bekijk de profielen van{' '}
          <Link href="/auteur/olivier-kremer/" className="text-red-600 hover:underline">Olivier</Link>
          {' '}en{' '}
          <Link href="/auteur/senne-de-jong/" className="text-red-600 hover:underline">Senne</Link>.
        </p>
      </div>
    </div>
  )
}
