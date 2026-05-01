import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory, CATEGORIES, YEAR, SITE_URL } from '@/lib/mdx'
import { BlogCard } from '@/components/BlogCard'
import { schemaBreadcrumb } from '@/lib/seo'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORIES[slug as keyof typeof CATEGORIES]
  if (!cat) return {}
  return {
    title: `${cat.label} Reviews & Koopgidsen ${YEAR} | Fietsvoeter`,
    description: cat.metaDesc,
    alternates: { canonical: `${SITE_URL}/categorie/${slug}/` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const cat = CATEGORIES[slug as keyof typeof CATEGORIES]
  if (!cat) notFound()

  const posts = getPostsByCategory(slug as keyof typeof CATEGORIES)
  const breadcrumb = schemaBreadcrumb([
    { name: 'Home', url: '/' },
    { name: cat.label, url: `/categorie/${slug}/` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Header banner */}
      <div className="border-b-4 py-10 px-4" style={{ borderColor: cat.color, background: `${cat.color}10` }}>
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-gray-500 mb-4">
            <a href="/" className="hover:underline">Home</a>
            <span className="mx-1">›</span>
            <span>{cat.label}</span>
          </nav>
          <h1 className="font-display font-black text-5xl mb-3" style={{ color: cat.color }}>
            {cat.label}
          </h1>
          <p className="text-gray-600 max-w-2xl text-base leading-relaxed">{cat.intro}</p>
          <p className="text-sm text-gray-400 mt-4">
            {posts.length} artikel{posts.length !== 1 ? 'en' : ''} — bijgewerkt {YEAR}
          </p>
        </div>
      </div>

      {/* Blog grid */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map(post => <BlogCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">Nog geen {cat.label} artikelen.</p>
            <p className="text-sm">Binnenkort beschikbaar — kom snel terug!</p>
          </div>
        )}
      </div>

      {/* SEO footer tekst — oriënterend, geen overlap met pillar blogs */}
      {cat.footer && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">{cat.footer}</p>
            {cat.pillars && cat.pillars.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="text-xs text-gray-400 self-center">Beginnen met:</span>
                {cat.pillars.map((slug: string) => (
                  <a
                    key={slug}
                    href={`/blog/${slug}/`}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-current hover:text-current transition-colors"
                    style={{ ['--tw-ring-color' as string]: cat.color }}
                  >
                    {slug.replace(/-/g, ' ')}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
