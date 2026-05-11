// src/components/TopTenSection.tsx
import Link from 'next/link'

interface TopItem {
  rank: number
  slug: string
  title: string
  category: string
}

const topItems: TopItem[] = [
  {
    rank: 1,
    slug: 'wielrennen-voor-beginners',
    title: 'Wielrennen voor beginners 2026',
    category: 'Wielrennen'
  },
  {
    rank: 2,
    slug: 'beste-racefiets-onder-1000',
    title: 'Beste racefiets onder 1000 euro',
    category: 'Wielrennen'
  },
  {
    rank: 3,
    slug: 'beste-racefiets-onder-2000',
    title: 'Beste racefiets onder 2000 euro',
    category: 'Wielrennen'
  },
  {
    rank: 4,
    slug: 'gravel-fiets-kopen-gids',
    title: 'Gravel fiets kopen gids',
    category: 'Gravel'
  },
  {
    rank: 5,
    slug: 'beste-wielrenschoenen-heren',
    title: 'Beste wielrenschoenen heren',
    category: 'Kleding'
  },
  {
    rank: 6,
    slug: 'beste-fietshelm-onder-100',
    title: 'Beste fietshelm onder 100 euro',
    category: 'Wielrennen'
  },
  {
    rank: 7,
    slug: 'beste-mtb-onder-500',
    title: 'Beste mountainbike onder 500 euro',
    category: 'MTB'
  },
  {
    rank: 8,
    slug: 'wielrennen-in-de-regen',
    title: 'Wielrennen in de regen: 12 tips',
    category: 'Wielrennen'
  },
  {
    rank: 9,
    slug: 'beste-e-bike-dames',
    title: 'Beste e-bike voor dames',
    category: 'E-bike'
  },
  {
    rank: 10,
    slug: 'garmin-vs-wahoo',
    title: 'Garmin vs Wahoo fietscomputer',
    category: 'Wielrennen'
  }
]

export function TopTenSection() {
  return (
    <section className="py-16 bg-gray-50 my-16">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Meest Gelezen
          </h2>
          <p className="text-gray-600">
            De populairste artikelen op Fietsvoeter.nl
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {topItems.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="flex items-center gap-4 p-5 bg-white rounded-xl transition-all duration-200 border-2 border-transparent hover:border-[#E2001A] hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-2xl font-bold text-[#E2001A] min-w-[40px] text-center">
                #{item.rank}
              </span>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  {item.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
