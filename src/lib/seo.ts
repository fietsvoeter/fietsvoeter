import { Post, SITE_URL, SITE_NAME } from './mdx'

export function schemaWebSite() {
  return {
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: SITE_NAME, url: SITE_URL,
    potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/?s={search_term_string}`, 'query-input': 'required name=search_term_string' },
  }
}

export function schemaOrganization() {
  return {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: SITE_NAME, url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/og-default.svg` },
    contactPoint: { '@type': 'ContactPoint', email: 'info@fietsvoeter.nl', contactType: 'customer service', availableLanguage: 'Dutch' },
  }
}

export function schemaBreadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `${SITE_URL}${item.url}` })),
  }
}

export function schemaArticle(post: Post) {
  return {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title, description: post.metaDescription,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    datePublished: post.date, dateModified: post.lastmod || post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}/` },
    inLanguage: 'nl-NL',
  }
}

export function schemaReview(post: Post) {
  return {
    '@context': 'https://schema.org', '@type': 'Review',
    name: post.title,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    datePublished: post.date, dateModified: post.lastmod || post.date,
    ...(post.rating && { reviewRating: { '@type': 'Rating', ratingValue: post.rating.toString(), bestRating: '10' } }),
    inLanguage: 'nl-NL',
  }
}

export function schemaFAQ(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  }
}

export function buildOpenGraph(post: Post) {
  return {
    title: post.metaTitle, description: post.metaDescription,
    url: `${SITE_URL}/blog/${post.slug}/`,
    siteName: SITE_NAME, locale: 'nl_NL', type: 'article',
    publishedTime: post.date, modifiedTime: post.lastmod || post.date,
    images: post.featuredImage ? [{ url: post.featuredImage, width: 1200, height: 630, alt: post.imageAlt }] : [{ url: `${SITE_URL}/images/og-default.svg` }],
  }
}