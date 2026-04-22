import { MetadataRoute } from 'next'
import { getAllPosts, CATEGORIES, SITE_URL } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  return [
    { url: SITE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${SITE_URL}/blog/`, lastModified: new Date(), priority: 0.9 },
    ...Object.keys(CATEGORIES).map(slug => ({ url: `${SITE_URL}/categorie/${slug}/`, lastModified: new Date(), priority: 0.8 })),
    ...posts.map(post => ({ url: `${SITE_URL}/blog/${post.slug}/`, lastModified: new Date(post.lastmod||post.date), priority: 0.9 })),
  ]
}