import type { Metadata } from 'next'
import { getAllPosts, CATEGORIES, YEAR, SITE_NAME } from '@/lib/mdx'
import { BlogCard } from '@/components/BlogCard'

export const metadata: Metadata = {
  title: `Alle Fietsreviews & Koopgidsen ${YEAR}`,
  description: `Alle onafhankelijke fietsreviews van ${SITE_NAME}. Onafhankelijk getest in ${YEAR}.`,
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-display font-black mb-2">Alle fietsreviews & koopgidsen {YEAR}</h1>
      <p className="text-gray-500 mb-6">{posts.length} artikelen — onafhankelijk getest op eigen ritten.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="cat-pill active">Alle ({posts.length})</span>
        {Object.entries(CATEGORIES).map(([slug,{label}])=>{
          const count = posts.filter(p=>p.category===slug).length
          return count>0?<a key={slug} href={`/categorie/${slug}/`} className="cat-pill">{label} ({count})</a>:null
        })}
      </div>
      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{posts.map(post=><BlogCard key={post.slug} post={post}/>)}</div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">Nog geen artikelen.</p>
          <p className="text-sm">Voeg MDX-bestanden toe aan <code>/content/blog/</code></p>
        </div>
      )}
    </div>
  )
}