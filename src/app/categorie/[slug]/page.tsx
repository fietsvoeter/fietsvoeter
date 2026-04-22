import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory, CATEGORIES, YEAR, SITE_URL } from '@/lib/mdx'
import { BlogCard } from '@/components/BlogCard'
import { schemaBreadcrumb } from '@/lib/seo'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES[params.slug as keyof typeof CATEGORIES]
  if (!cat) return {}
  return {
    title: `${cat.label} Reviews & Koopgidsen ${YEAR}`,
    description: `${cat.description} Onafhankelijk getest in ${YEAR}.`,
    alternates: { canonical: `${SITE_URL}/categorie/${params.slug}/` },
  }
}

export default function CategoryPage({ params }: Props) {
  const slug = params.slug as keyof typeof CATEGORIES
  const cat = CATEGORIES[slug]
  if (!cat) notFound()
  const posts = getPostsByCategory(slug)
  const breadcrumb = schemaBreadcrumb([{name:'Home',url:'/'},{name:cat.label,url:`/categorie/${slug}/`}])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
      <div className="border-b-4 py-10 px-4" style={{borderColor:cat.color,background:`${cat.color}08`}}>
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-black text-5xl mb-3" style={{color:cat.color}}>{cat.label}</h1>
          <p className="text-gray-600 max-w-2xl">{cat.description}</p>
          <p className="text-sm text-gray-400 mt-2">{posts.length} artikel{posts.length!==1?'en':''} — bijgewerkt {YEAR}</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{posts.map(post=><BlogCard key={post.slug} post={post}/>)}</div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">Nog geen {cat.label} artikelen.</p>
            <p className="text-sm">Voeg MDX-bestanden toe met <code>category: {slug}</code></p>
          </div>
        )}
      </div>
    </>
  )
}