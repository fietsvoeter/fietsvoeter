import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.fietsvoeter.nl'
  const currentDate = new Date().toISOString()

  // Prioriteit logica:
  // 1.0 = Homepage
  // 0.9 = Blog overzicht (dagelijks nieuwe content)
  // 0.8 = Categorie pagina's (commercieel, veel affiliate traffic)
  // 0.7 = Individuele blogs (primaire affiliate pagina's)
  // 0.4 = Over ons / Hoe wij testen (vertrouwen, niet commercieel)
  // 0.3 = Contact, Auteurs (informatief)
  // NIET in sitemap: privacybeleid, affiliate-disclosure (geen SEO waarde)

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/over-ons/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/hoe-wij-testen/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    // privacybeleid en affiliate-disclosure bewust NIET in sitemap
  ]

  // Categorie pagina's: prioriteit 0.8
  const categories = ['wielrennen', 'mtb', 'gravel', 'e-bike', 'training', 'kleding', 'voeding']
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categorie/${cat}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Auteur pagina's: prioriteit 0.3 (informatief, geen affiliate waarde)
  const authorPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/auteur/olivier-kremer/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/auteur/senne-de-jong/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  // Blog pagina's: prioriteit 0.7
  // Recent bijgewerkt (< 30 dagen): weekly
  // Ouder dan 30 dagen: monthly (realistischer voor koopgidsen)
  const allPosts = await getAllPosts()
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const blogPages: MetadataRoute.Sitemap = allPosts
    .filter((post) => {
      const robotsMeta = (post as any).robots as string | undefined
      const hasNoindex = robotsMeta?.toLowerCase().includes('noindex') ?? false
      return post.published && !hasNoindex
    })
    .map((post) => {
      const lastmod = (post as any).lastmod || post.date || currentDate
      const lastmodDate = new Date(lastmod)
      const isRecent = lastmodDate > thirtyDaysAgo

      return {
        url: `${baseUrl}/blog/${post.slug}/`,
        lastModified: lastmod,
        changeFrequency: (isRecent ? 'weekly' : 'monthly') as const,
        priority: 0.7,
      }
    })

  return [...staticPages, ...categoryPages, ...authorPages, ...blogPages]
}
