import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fietsvoeter.nl'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacybeleid`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  // Category pages
  const categories = ['wielrennen', 'mtb', 'gravel', 'e-bike', 'training', 'kleding', 'voeding']
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categorie/${cat}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Blog posts - only include published posts WITHOUT noindex
  const blogPages: MetadataRoute.Sitemap = allPosts
    .filter((post) => {
      // Only include if published AND not noindex
      const hasNoindex = post.robots?.toLowerCase().includes('noindex')
      return post.published && !hasNoindex
    })
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  // Combine all pages
  return [...staticPages, ...categoryPages, ...blogPages]
}