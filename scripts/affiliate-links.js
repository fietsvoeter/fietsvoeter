#!/usr/bin/env node
/**
 * scripts/affiliate-links.js
 * Genereert affiliate links met subId voor betere tracking in bol.com rapportage.
 * SubId = productnaam → zichtbaar als aparte kolom in bol.com dashboard.
 */

const fs = require('fs')
const path = require('path')

const PARTNER_ID    = process.env.BOL_PARTNER_ID || '1361557'
const CLIENT_ID     = process.env.BOL_CLIENT_ID
const CLIENT_SECRET = process.env.BOL_CLIENT_SECRET
const BLOG_DIR      = path.join(process.cwd(), 'content', 'blog')
const CACHE_FILE    = path.join(process.cwd(), 'scripts', 'affiliate-cache.json')
const BOL_API       = 'https://api.bol.com'

let cache = {}
if (fs.existsSync(CACHE_FILE)) {
  try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) } catch(e) {}
}
console.log(`Cache: ${Object.keys(cache).length} items | Partner ID: ${PARTNER_ID}`)

// Maak subId van label: alleen alfanumeriek en koppelteken
function makeSubId(label) {
  return label
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 40)
}

// Bouw affiliate link MET subId voor tracking
function buildAffiliateLink(searchTerm, label, productUrl = null) {
  const targetUrl = productUrl ||
    `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(searchTerm)}`
  const subId = makeSubId(label)
  return `https://partner.bol.com/click/click?p=2&t=url&s=${PARTNER_ID}&f=TXL&subId=${encodeURIComponent(subId)}&url=${encodeURIComponent(targetUrl)}`
}

async function getToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) return null
  try {
    const res = await fetch(`${BOL_API}/token?grant_type=client_credentials`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    if (!res.ok) return null
    const data = await res.json()
    console.log('Marketing API verbonden')
    return data.access_token
  } catch(e) { return null }
}

async function findProductUrl(token, searchTerm) {
  const cacheKey = `${PARTNER_ID}:${searchTerm}`
  if (cache[cacheKey]) return cache[cacheKey]

  await new Promise(r => setTimeout(r, 400))

  let productUrl = null

  if (token) {
    try {
      const res = await fetch(
        `${BOL_API}/marketing/search?q=${encodeURIComponent(searchTerm)}&limit=1&countryCode=NL`,
        { headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.catalogapi.v1+json'
        }}
      )
      if (res.ok) {
        const data = await res.json()
        if (data.products && data.products.length > 0) {
          const p = data.products[0]
          productUrl = (p.urls && p.urls[0]) ||
            `https://www.bol.com/nl/nl/p/-/${p.id}/`
          console.log(`  API hit: "${searchTerm}" → ${productUrl}`)
        }
      }
    } catch(e) {
      console.log(`  API fout: ${e.message}`)
    }
  }

  // Fallback: zoeklink (werkt altijd)
  if (!productUrl) {
    productUrl = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(searchTerm)}`
    console.log(`  Zoeklink: "${searchTerm}"`)
  }

  cache[cacheKey] = productUrl
  return productUrl
}

async function main() {
  console.log('\n=== Fietsvoeter Affiliate Processor ===\n')
  const token = await getToken()
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  console.log(`${files.length} blogs verwerken...\n`)
  let total = 0

  for (const file of files) {
    const filepath = path.join(BLOG_DIR, file)
    let content = fs.readFileSync(filepath, 'utf8')
    let updated = false

    // Match ALLE BolBtn — ook bestaande — om subId en partner ID te updaten
    const regex = /<BolBtn\s+search="([^"]+)"\s+label="([^"]+)"(?:\s+url="[^"]*")?\s*\/>/g
    const matches = [...content.matchAll(regex)]
    if (!matches.length) continue

    console.log(`${file}: ${matches.length} BolBtn`)

    for (const match of matches) {
      const [fullMatch, searchTerm, label] = match
      const productUrl = await findProductUrl(token, searchTerm)
      const affiliateUrl = buildAffiliateLink(searchTerm, label, productUrl)
      const replacement = `<BolBtn search="${searchTerm}" label="${label}" url="${affiliateUrl}" />`

      // Alleen vervangen als de url veranderd is
      if (fullMatch !== replacement) {
        content = content.replace(fullMatch, replacement)
        updated = true
        total++
      }
    }

    if (updated) {
      fs.writeFileSync(filepath, content)
      console.log(`  ✓ bijgewerkt\n`)
    }
  }

  // Cache opslaan (met partner ID in key zodat wisseling partner ID alles hergenereert)
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
  console.log(`\nKlaar: ${total} links bijgewerkt`)
  console.log(`SubId tracking actief — zichtbaar in bol.com rapportage kolom "SubId"\n`)
}

main().catch(e => { console.error(e); process.exit(1) })
