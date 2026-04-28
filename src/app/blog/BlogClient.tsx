'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BLOGS_PER_PAGINA = 50

const CATEGORIE_LABELS: Record<string, string> = {
  wielrennen: 'Wielrennen',
  mtb: 'MTB',
  gravel: 'Gravel',
  'e-bike': 'E-bike',
  training: 'Training',
  kleding: 'Kleding',
  voeding: 'Voeding',
}

function getVal(post: any, key: string): any {
  return post?.[key] ?? post?.frontmatter?.[key] ?? ''
}

export default function BlogClient({ posts }: { posts: any[] }) {
  const [zoekterm, setZoekterm] = useState('')
  const [actieveCategorie, setActieveCategorie] = useState('alle')
  const [huidigePagina, setHuidigePagina] = useState(1)

  const gefilterd = useMemo(() => {
    let r = posts
    if (actieveCategorie !== 'alle') {
      r = r.filter((p) => getVal(p, 'category') === actieveCategorie)
    }
    if (zoekterm.trim()) {
      const z = zoekterm.toLowerCase()
      r = r.filter((p) => {
        const zoekVelden = [
          getVal(p, 'title'),
          getVal(p, 'excerpt'),
          getVal(p, 'category'),
          ...(Array.isArray(getVal(p, 'keywords')) ? getVal(p, 'keywords') : []),
        ].join(' ').toLowerCase()
        return zoekVelden.includes(z)
      })
    }
    return r
  }, [posts, zoekterm, actieveCategorie])

  const totaalPaginas = Math.max(1, Math.ceil(gefilterd.length / BLOGS_PER_PAGINA))
  const pagVeilig = Math.min(huidigePagina, totaalPaginas)
  const startIdx = (pagVeilig - 1) * BLOGS_PER_PAGINA
  const zichtbaar = gefilterd.slice(startIdx, startIdx + BLOGS_PER_PAGINA)

  function handleZoek(e: React.ChangeEvent<HTMLInputElement>) {
    setZoekterm(e.target.value)
    setHuidigePagina(1)
  }

  function handleCategorie(cat: string) {
    setActieveCategorie(cat)
    setHuidigePagina(1)
    setZoekterm('')
  }

  function naarPagina(p: number) {
    setHuidigePagina(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const catTelling = useMemo(() => {
    const tel: Record<string, number> = {}
    posts.forEach((p) => {
      const c = getVal(p, 'category')
      if (c) tel[c] = (tel[c] || 0) + 1
    })
    return tel
  }, [posts])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Alle fietsreviews &amp; koopgidsen 2026
        </h1>
        <p className="text-gray-500 text-sm">
          {posts.length} artikelen — onafhankelijk getest op eigen ritten.
        </p>
      </div>

      {/* Zoekbalk */}
      <div className="mb-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={zoekterm}
            onChange={handleZoek}
            placeholder="Zoek op onderwerp — bijv. tubeless, gravel, e-bike accu..."
            className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white shadow-sm"
          />
          {zoekterm && (
            <button
              onClick={() => { setZoekterm(''); setHuidigePagina(1) }}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {zoekterm && (
          <p className="mt-1.5 text-xs text-gray-500">
            {gefilterd.length} {gefilterd.length === 1 ? 'resultaat' : 'resultaten'} voor &ldquo;{zoekterm}&rdquo;
          </p>
        )}
      </div>

      {/* Categorie filter */}
      <div className="flex flex-wrap gap-2 mb-7">
        <button
          onClick={() => handleCategorie('alle')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            actieveCategorie === 'alle' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Alle ({posts.length})
        </button>
        {Object.entries(CATEGORIE_LABELS).map(([cat, label]) => (
          <button
            key={cat}
            onClick={() => handleCategorie(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              actieveCategorie === cat ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label} ({catTelling[cat] || 0})
          </button>
        ))}
      </div>

      {/* Paginering info */}
      {totaalPaginas > 1 && !zoekterm && (
        <p className="text-xs text-gray-400 mb-4">
          Pagina {pagVeilig} van {totaalPaginas} &mdash; {gefilterd.length} artikelen
        </p>
      )}

      {/* Leeg resultaat */}
      {zichtbaar.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <svg className="h-10 w-10 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-medium">Geen artikelen gevonden</p>
          <p className="text-sm mt-1">Probeer een andere zoekterm of categorie</p>
        </div>
      )}

      {/* Blog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {zichtbaar.map((post) => {
          const slug = getVal(post, 'slug')
          const title = getVal(post, 'title')
          const excerpt = getVal(post, 'excerpt')
          const cat = getVal(post, 'category')
          const img = getVal(post, 'featuredImage')
          const rating = getVal(post, 'rating')

          return (
            <Link key={slug} href={`/blog/${slug}/`}
              className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              {img && (
                <div className="aspect-[1200/630] overflow-hidden bg-gray-50">
                  <Image src={img} alt={title} width={1200} height={630}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-medium text-red-600 uppercase tracking-wide">
                    {CATEGORIE_LABELS[cat] || cat}
                  </span>
                  {rating && (
                    <span className="ml-auto text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                      {rating}/10
                    </span>
                  )}
                </div>
                <h2 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                  {title}
                </h2>
                {excerpt && (
                  <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{excerpt}</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Paginering */}
      {totaalPaginas > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <button
            onClick={() => naarPagina(Math.max(1, pagVeilig - 1))}
            disabled={pagVeilig === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Vorige
          </button>
          {Array.from({ length: totaalPaginas }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => naarPagina(p)}
              className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                p === pagVeilig ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => naarPagina(Math.min(totaalPaginas, pagVeilig + 1))}
            disabled={pagVeilig === totaalPaginas}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Volgende →
          </button>
        </div>
      )}

    </main>
  )
}
