// Categorieën definitie — werkt zowel server-side als client-side
// Dit bestand gebruikt GEEN 'fs' of andere Node.js modules

export type Category = 'wielrennen' | 'mtb' | 'gravel' | 'e-bike' | 'training' | 'kleding' | 'voeding'
export type ContentType = 'review' | 'comparison' | 'guide' | 'listicle' | 'free-tool'

export const CATEGORIES: Record<Category, { label: string; description: string; color: string }> = {
  wielrennen: {
    label: 'Wielrennen',
    description: 'Reviews en tips voor wegfietsers.',
    color: '#E2001A',
  },
  mtb: {
    label: 'MTB',
    description: 'Mountainbike reviews, banden en uitrusting.',
    color: '#2E7D32',
  },
  gravel: {
    label: 'Gravel',
    description: 'Gravel fietsen en avontuurlijk rijden.',
    color: '#795548',
  },
  'e-bike': {
    label: 'E-bike',
    description: 'Elektrische fietsen en speed pedelecs.',
    color: '#1565C0',
  },
  training: {
    label: 'Training',
    description: "Trainingstips en schema's.",
    color: '#E65100',
  },
  kleding: {
    label: 'Kleding',
    description: 'Wielrenkleding, helmen en schoenen.',
    color: '#00838F',
  },
  voeding: {
    label: 'Voeding',
    description: 'Sportvoeding en supplementen.',
    color: '#558B2F',
  },
}

export const PARTNER_ID = '10065bba51d681361557'
export const SITE_URL   = process.env.SITE_URL || 'https://fietsvoeter.nl'
export const SITE_NAME  = 'Fietsvoeter.nl'
export const YEAR       = new Date().getFullYear()

export function bolLink(search: string, partnerId = PARTNER_ID): string {
  const dest = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(search)}`
  return `https://partner.bol.com/click/click?p=1&t=url&s=${partnerId}&url=${encodeURIComponent(dest)}`
}
