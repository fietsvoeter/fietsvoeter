export type Category = 'wielrennen' | 'mtb' | 'gravel' | 'e-bike' | 'training' | 'kleding' | 'voeding'
export type ContentType = 'listicle' | 'comparison' | 'guide' | 'review'

export const PARTNER_ID = '1361557'
export const SITE_URL   = 'https://www.fietsvoeter.nl'
export const SITE_NAME  = 'Fietsvoeter.nl'
export const YEAR       = new Date().getFullYear()

export function bolLink(search: string, partnerId = PARTNER_ID): string {
  const productUrl = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(search)}`
  return `https://partner.bol.com/click/click?p=2&t=url&s=${partnerId}&f=TXL&url=${encodeURIComponent(productUrl)}`
}

export const CATEGORIES: Record<Category, { label: string; color: string; description: string }> = {
  wielrennen: { label: 'Wielrennen', color: '#E2001A', description: 'Reviews en koopgidsen voor wielrenners' },
  mtb:        { label: 'MTB',        color: '#2D6A2D', description: 'Mountainbike uitrusting en reviews' },
  gravel:     { label: 'Gravel',     color: '#8B4513', description: 'Gravel fietsen en accessoires' },
  'e-bike':   { label: 'E-bike',     color: '#0055A5', description: 'Elektrische fietsen en accessoires' },
  training:   { label: 'Training',   color: '#E67E22', description: 'Trainingstips en technologie' },
  kleding:    { label: 'Kleding',    color: '#8E44AD', description: 'Fietskleding en accessoires' },
  voeding:    { label: 'Voeding',    color: '#27AE60', description: 'Sportvoeding voor fietsers' },
}
