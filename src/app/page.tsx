import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, CATEGORIES, YEAR, SITE_NAME, SITE_URL } from '@/lib/mdx'
import { BlogCard } from '@/components/BlogCard'

export const metadata: Metadata = {
  title: `${SITE_NAME} — Eerlijke Fietsreviews & Koopgidsen ${YEAR}`,
  description: `De eerlijkste fietsreviews van Nederland. Onafhankelijk getest in ${YEAR}. Wielrennen, MTB, gravel en e-bike.`,
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
  const posts = getAllPosts()
  const recent = posts.slice(0, 6)
  const featured = posts[0]
  return (
    <>
      <section className="bg-gray-50 border-b border-gray-200 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-3">Wielrennen · MTB · Gravel · E-bike</p>
            <h1 className="font-display font-black leading-none mb-4">
              De eerlijkste<br/>fietsreviews<br/>van <em className="not-italic text-brand-red">Nederland</em>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6 max-w-md">
              Onafhankelijk getest op eigen ritten in {YEAR}. Eerlijk advies voor elk budget — inclusief actuele bol.com prijzen.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/blog/" className="bg-brand-red text-white font-semibold px-6 py-3 rounded no-underline hover:opacity-90 text-sm">Alle reviews</Link>
              <Link href="/categorie/training/" className="border-2 border-gray-800 text-gray-800 font-semibold px-6 py-3 rounded no-underline hover:bg-gray-100 text-sm">Trainingstips</Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
              <circle cx="60" cy="145" r="46" stroke="#E2001A" strokeWidth="3" fill="none"/>
              <circle cx="180" cy="145" r="46" stroke="#E2001A" strokeWidth="3" fill="none"/>
              <circle cx="60" cy="145" r="7" fill="#E2001A"/>
              <circle cx="180" cy="145" r="7" fill="#E2001A"/>
              <path d="M60 145L94 62L150 62L180 145" stroke="#ccc" strokeWidth="3" fill="none" strokeLinejoin="round"/>
              <path d="M94 62L132 145" stroke="#E2001A" strokeWidth="2.5"/>
              <circle cx="94" cy="56" r="9" fill="#ccc"/>
              <path d="M82 62L108 62" stroke="#ccc" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
        {[{num:'200+',label:'Productreviews'},{num:'7',label:'Categorieën'},{num:'4.8★',label:'Gemiddeld oordeel'},{num:YEAR.toString(),label:'Bijgewerkt'}].map(({num,label})=>(
          <div key={label} className="py-5 text-center border-r border-gray-200 last:border-r-0">
            <span className="font-display font-black text-3xl text-brand-red block">{num}</span>
            <span className="text-xs uppercase tracking-wide text-gray-400 mt-1 block">{label}</span>
          </div>
        ))}
      </div>
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-display font-bold text-2xl mt-0">Rubrieken</h2>
          <div className="flex-1 h-px bg-gray-200"/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {Object.entries(CATEGORIES).map(([slug,{label,color}])=>(
            <Link key={slug} href={`/categorie/${slug}/`} className="border border-gray-200 rounded p-3 text-center no-underline hover:border-brand-red transition-colors">
              <span className="text-xs font-bold uppercase tracking-wide block" style={{color}}>{label}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl mt-0">Laatste artikelen</h2>
          <Link href="/blog/" className="text-sm text-brand-red font-medium no-underline hover:underline">Alle artikelen →</Link>
        </div>
        {recent.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{recent.map(post=><BlogCard key={post.slug} post={post}/>)}</div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">Eerste artikelen komen binnenkort.</p>
            <p className="text-sm">Voeg MDX-bestanden toe aan <code>/content/blog/</code></p>
          </div>
        )}
      </section>
    </>
  )
}