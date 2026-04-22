import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import {
  getPostBySlug, getAllSlugs, getRelatedPosts,
  CATEGORIES, SITE_URL
} from '@/lib/mdx'
import { schemaArticle, schemaReview, schemaBreadcrumb, buildOpenGraph } from '@/lib/seo'
import {
  BolBtn, Disclaimer, UpdateBadge, GeoBlock,
  ExpertQuote, FAQ, CompareTable, RelatedLinks,
  PostImage, Score
} from '@/components/MDXComponents'
import { BlogCard } from '@/components/BlogCard'

const components = {
  BolBtn, Disclaimer, UpdateBadge, GeoBlock,
  ExpertQuote, FAQ, CompareTable, RelatedLinks,
  PostImage, Score,
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title:       post.metaTitle,
    description: post.metaDescription,
    keywords:    post.keywords,
    alternates:  { canonical: `${SITE_URL}/blog/${post.slug}/` },
    openGraph:   buildOpenGraph(post),
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { content } = await compileMDX({
    source: post.content,
    components,
    options: { parseFrontmatter: false },
  })

  const cat     = CATEGORIES[post.category]
  const related = getRelatedPosts(post.slug, post.category, 3)
  const schema  = post.schema === 'review' ? schemaReview(post) : schemaArticle(post)
  const breadcrumb = schemaBreadcrumb([
    { name: 'Home',      url: '/' },
    { name: cat?.label,  url: `/categorie/${post.category}/` },
    { name: post.title,  url: `/blog/${post.slug}/` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">

          {/* ── ARTIKEL ─────────────────────────────────── */}
          <article>
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-400 py-2 mb-5" aria-label="Breadcrumb">
              <a href="/" className="text-blue-600 hover:underline">Home</a>
              <span className="mx-1">›</span>
              <a href={`/categorie/${post.category}/`} className="text-blue-600 hover:underline">{cat?.label}</a>
              <span className="mx-1">›</span>
              <span>{post.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cat?.color }}>
                  {cat?.label}
                </span>
                {post.rating && <Score value={post.rating} />}
                <span className="text-xs text-gray-400">{post.readingTime}</span>
              </div>
              <h1 className="font-display font-black leading-tight mb-3">{post.title}</h1>
              <div className="text-xs text-gray-400">
                Gepubliceerd:{' '}
                {new Date(post.date).toLocaleDateString('nl-NL', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
                {post.lastmod && post.lastmod !== post.date && (
                  <span className="ml-3">
                    Bijgewerkt:{' '}
                    {new Date(post.lastmod).toLocaleDateString('nl-NL', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                )}
              </div>
            </header>

            {/* Featured image */}
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.imageAlt || post.title}
                width={1200}
                height={630}
                className="w-full h-auto rounded-md mb-6"
                loading="eager"
              />
            )}

            {/* MDX Content */}
            <div className="prose-fietsvoeter prose prose-lg max-w-none">
              {content}
            </div>

            {/* Affiliate links onderaan */}
            {post.affiliate?.length > 0 && (
              <div className="mt-8 p-5 bg-gray-50 rounded border border-gray-200">
                <h3 className="text-base font-bold mb-4 mt-0">Besproken producten op bol.com</h3>
                <div className="flex flex-col gap-2">
                  {post.affiliate.map(({ product, bolSearch, label }) => (
                    <BolBtn key={product} search={bolSearch} label={label || product} />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── SIDEBAR ─────────────────────────────────── */}
          <aside className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded p-5">
              <h4 className="font-display font-bold text-base mt-0 mb-2">Wekelijkse tips</h4>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Reviews en deals direct in je inbox.
              </p>
              <input
                type="email"
                placeholder="jouw@email.nl"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm mb-2
                           focus:outline-none focus:border-brand-red"
              />
              <button className="w-full bg-brand-red text-white font-semibold text-sm py-2
                                 rounded hover:opacity-90 transition-opacity">
                Gratis aanmelden
              </button>
            </div>

            {related.length > 0 && (
              <div className="border border-gray-200 rounded p-5">
                <h4 className="font-display font-bold text-base mt-0 mb-3">
                  Meer {cat?.label}
                </h4>
                <ul className="space-y-2">
                  {related.map(r => (
                    <li key={r.slug}>
                      <a href={`/blog/${r.slug}/`}
                         className="text-sm text-gray-600 no-underline hover:text-brand-red transition-colors">
                        → {r.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border border-gray-200 rounded p-5">
              <h4 className="font-display font-bold text-base mt-0 mb-3">Alle rubrieken</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(CATEGORIES).map(([slug, { label }]) => (
                  <a key={slug} href={`/categorie/${slug}/`} className="cat-pill text-xs">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── GERELATEERDE ARTIKELEN ───────────────────── */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="font-display font-bold text-2xl mb-6">
              Meer {cat?.label} artikelen
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
