import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, SITE_NAME } from '@/lib/mdx'

const AUTEURS: Record<string, {
  naam: string
  titel: string
  ervaring: string
  specialisatie: string
  bio: string[]
  fietsen: string[]
  foto: string
  fotoAlt: string
}> = {
  'olivier-kremer': {
    naam: 'Olivier Kremer',
    titel: 'Performance Specialist',
    ervaring: '8 jaar rijervaring',
    specialisatie: 'Snelheid, aerodynamica, technische uitrusting',
    bio: [
      'Olivier rijdt al acht jaar op de fiets, en in die tijd heeft hij weinig overgeslagen. Van klimstages in de Spaanse bergen tot singletrack in de Veluwse bossen — hij rijdt het allemaal.',
      'Wat hem drijft is niet zozeer het record of de ranking, maar het zoeken naar de juiste balans: materiaal dat werkt, niet alleen op papier maar ook als je na vier uur rijden nog twee klimmers voor de boeg hebt.',
      'Zijn achtergrond in performance-gericht rijden maakt hem de aangewezen persoon voor reviews van racefietsen, componenten en technische uitrusting. Hij weet wat hij zoekt en laat zich niet snel imponeren door marketingverhalen.',
    ],
    fietsen: [
      '🚴 Racefiets: Specialized Tarmac SL8 — Shimano Ultegra Di2',
      '🚵 Mountainbike: Scott Scale RC — SRAM X0 Eagle Transmission',
    ],
    foto: '/images/auteurs/olivier-kremer-wielrenner.jpg',
    fotoAlt: 'Olivier Kremer op de racefiets in de bergen — performance specialist Fietsvoeter.nl',
  },
  'senne-de-jong': {
    naam: 'Senne de Jong',
    titel: 'Allround Specialist',
    ervaring: '5 jaar rijervaring',
    specialisatie: 'Comfort, duurritten, veelzijdig gebruik',
    bio: [
      'Senne heeft vijf jaar geleden de fiets ontdekt en sindsdien is er geen weg terug. Hij wisselt moeiteloos tussen zijn racefiets en zijn mountainbike, en dat is ook terug te zien in hoe hij naar materiaal kijkt.',
      'Voor hem moet een fiets of accessoire gewoon werken — bij een lange duurrit over Nederlands asfalt, maar ook als hij een technische afdaling op de Posbank neerzet. Zijn veelzijdigheid zorgt ervoor dat hij in elke groep en op elk terrein zijn draai vindt.',
      'Zijn focus ligt op rijgemak en veelzijdigheid. Hij test producten vanuit het perspectief van de rijder die wil genieten van de rit, niet van degene die elke gram wegweegt.',
    ],
    fietsen: [
      '🚴 Racefiets: Trek Domane SLR — Shimano 105 Di2',
      '🚵 Mountainbike: Orbea Oiz M-Pro — Shimano XT M8100',
    ],
    foto: '/images/auteurs/senne-de-jong-wielrenner.jpg',
    fotoAlt: 'Senne de Jong met zijn gravel fiets in open landschap — allround specialist Fietsvoeter.nl',
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const auteur = AUTEURS[params.slug]
  if (!auteur) return {}
  return {
    title: `${auteur.naam} — ${auteur.titel} | ${SITE_NAME}`,
    description: `${auteur.naam} test fietsmateriaal voor Fietsvoeter.nl. ${auteur.specialisatie}.`,
  }
}

export function generateStaticParams() {
  return Object.keys(AUTEURS).map(slug => ({ slug }))
}

export default async function AuteurPage({ params }: { params: { slug: string } }) {
  const auteur = AUTEURS[params.slug]
  if (!auteur) notFound()

  const allePosts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-1">
          <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
            <Image
              src={auteur.foto}
              alt={auteur.fotoAlt}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col justify-center">
          <div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
            {auteur.titel}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{auteur.naam}</h1>
          <p className="text-gray-500 text-sm mb-4">{auteur.ervaring} · {auteur.specialisatie}</p>
          {auteur.bio.map((alinea, i) => (
            <p key={i} className="text-gray-700 mb-3 leading-relaxed">{alinea}</p>
          ))}
          <div className="mt-4 space-y-1">
            {auteur.fietsen.map((fiets, i) => (
              <p key={i} className="text-sm text-gray-500">{fiets}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Methodologie link */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-10">
        <p className="text-gray-700 text-sm">
          <strong className="text-gray-900">Hoe beoordeelt {auteur.naam.split(' ')[0]} producten?</strong>{' '}
          We werken met een vaste testmethode gebaseerd op eigen rijervaring, technische data en externe bronnen.{' '}
          <Link href="/hoe-wij-testen/" className="text-red-600 hover:underline font-medium">
            Lees onze volledige methodologie →
          </Link>
        </p>
      </div>

      {/* Alle blogs van deze site */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Alle reviews & gidsen</h2>
        <p className="text-gray-500 text-sm mb-6">
          Fietsvoeter.nl publiceert onafhankelijke fietsreviews en koopgidsen.
          Bekijk{' '}
          <Link href="/blog/" className="text-red-600 hover:underline">alle artikelen</Link>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allePosts.slice(0, 6).map((post: any) => {
            const slug = post.slug || post.frontmatter?.slug
            const title = post.title || post.frontmatter?.title
            const cat = post.category || post.frontmatter?.category
            return (
              <Link
                key={slug}
                href={'/blog/' + slug + '/'}
                className="block p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <span className="text-xs text-red-600 font-medium uppercase tracking-wide">{cat}</span>
                <h3 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2">{title}</h3>
              </Link>
            )
          })}
        </div>
        <div className="mt-6">
          <Link href="/blog/" className="text-red-600 font-medium hover:underline">
            Bekijk alle artikelen →
          </Link>
        </div>
      </div>

    </div>
  )
}
