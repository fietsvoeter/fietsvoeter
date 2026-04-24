import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { CATEGORIES } from '@/lib/categories'

const SITE_URL = 'https://www.fietsvoeter.nl'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  // Statische pagina's
  const static_pages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/over-ons/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacybeleid/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/affiliate-disclosure/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  // Categorie pagina's
  const category_pages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map(slug => ({
    url: `${SITE_URL}/categorie/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Blog pagina's
  const blog_pages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.lastmod || post.date),
    changeFrequency: 'monthly' as const,
    priority: post.schema === 'review' ? 0.9 : 0.7,
  }))

  return [...static_pages, ...category_pages, ...blog_pages]
}
