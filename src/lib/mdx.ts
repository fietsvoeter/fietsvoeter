import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { Category, ContentType, CATEGORIES } from './categories'

export type { Category, ContentType }
export { CATEGORIES, PARTNER_ID, SITE_URL, SITE_NAME, YEAR, bolLink } from './categories'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface AffiliateProduct {
  product:   string
  bolSearch: string
  label:     string
}

export interface PostMeta {
  title:           string
  slug:            string
  date:            string
  lastmod:         string
  category:        Category
  contentType:     ContentType
  keywords:        string[]
  metaTitle:       string
  metaDescription: string
  featuredImage:   string
  imageAlt:        string
  excerpt:         string
  affiliate:       AffiliateProduct[]
  schema:          string
  rating?:         number
  readingTime:     string
  published:       boolean
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw  = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = matter(raw)
      const rt = readingTime(raw)
      return {
        title:           data.title           || '',
        slug,
        date:            data.date            || '',
        lastmod:         data.lastmod         || data.date || '',
        category:        data.category        || 'wielrennen',
        contentType:     data.contentType     || 'guide',
        keywords:        data.keywords        || [],
        metaTitle:       data.metaTitle       || data.title || '',
        metaDescription: data.metaDescription || '',
        featuredImage:   data.featuredImage   || '',
        imageAlt:        data.imageAlt        || '',
        excerpt:         data.excerpt         || '',
        affiliate:       data.affiliate       || [],
        schema:          data.schema          || 'article',
        rating:          data.rating,
        readingTime:     `${Math.ceil(rt.minutes)} min lezen`,
        published:       data.published !== false,
      } as PostMeta
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
  return {
    title:           data.title           || '',
    slug,
    date:            data.date            || '',
    lastmod:         data.lastmod         || data.date || '',
    category:        data.category        || 'wielrennen',
    contentType:     data.contentType     || 'guide',
    keywords:        data.keywords        || [],
    metaTitle:       data.metaTitle       || data.title || '',
    metaDescription: data.metaDescription || '',
    featuredImage:   data.featuredImage   || '',
    imageAlt:        data.imageAlt        || '',
    excerpt:         data.excerpt         || '',
    affiliate:       data.affiliate       || [],
    schema:          data.schema          || 'article',
    rating:          data.rating,
    readingTime:     `${Math.ceil(rt.minutes)} min lezen`,
    published:       data.published !== false,
    content,
  } as Post
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter(p => p.category === category)
}

export function getRelatedPosts(slug: string, category: Category, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter(p => p.slug !== slug && p.category === category)
    .slice(0, limit)
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}