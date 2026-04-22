import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type Category = 'wielrennen' | 'mtb' | 'gravel' | 'e-bike' | 'training' | 'kleding' | 'voeding'
export type ContentType = 'review' | 'comparison' | 'guide' | 'listicle' | 'free-tool'

export interface AffiliateProduct {
  product: string
  bolSearch: string
  label: string
}

export interface PostMeta {
  title: string
  slug: string
  date: string
  lastmod: string
  category: Category
  contentType: ContentType
  keywords: string[]
  metaTitle: string
  metaDescription: string
  featuredImage: string
  imageAlt: string
  excerpt: string
  affiliate: AffiliateProduct[]
  schema: string
  rating?: number
  readingTime: string
  published: boolean
}

export interface Post extends PostMeta { content: string }

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = matter(raw)
      const rt = readingTime(raw)
      return { ...data, slug, readingTime: `${Math.ceil(rt.minutes)} min lezen`, published: data.published !== false } as PostMeta
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(raw)
  return { ...data, slug, content, readingTime: `${Math.ceil(rt.minutes)} min lezen`, published: data.published !== false } as Post
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter(p => p.category === category)
}

export function getRelatedPosts(slug: string, category: Category, limit = 3): PostMeta[] {
  return getAllPosts().filter(p => p.slug !== slug && p.category === category).slice(0, limit)
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''))
}

export const CATEGORIES: Record<Category, { label: string; description: string; color: string }> = {
  wielrennen: { label: 'Wielrennen', description: 'Reviews en tips voor wegfietsers.', color: '#E2001A' },
  mtb: { label: 'MTB', description: 'Mountainbike reviews, banden en uitrusting.', color: '#2E7D32' },
  gravel: { label: 'Gravel', description: 'Gravel fietsen en avontuurlijk rijden.', color: '#795548' },
  'e-bike': { label: 'E-bike', description: 'Elektrische fietsen en speed pedelecs.', color: '#1565C0' },
  training: { label: 'Training', description: "Trainingstips en schema's.", color: '#E65100' },
  kleding: { label: 'Kleding', description: 'Wielrenkleding, helmen en schoenen.', color: '#00838F' },
  voeding: { label: 'Voeding', description: 'Sportvoeding en supplementen.', color: '#558B2F' },
}

export const PARTNER_ID = '10065bba51d681361557'
export const SITE_URL = process.env.SITE_URL || 'https://fietsvoeter.nl'
export const SITE_NAME = 'Fietsvoeter.nl'
export const YEAR = new Date().getFullYear()

export function bolLink(search: string, partnerId = PARTNER_ID): string {
  const dest = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(search)}`
  return `https://partner.bol.com/click/click?p=1&t=url&s=${partnerId}&url=${encodeURIComponent(dest)}`
}