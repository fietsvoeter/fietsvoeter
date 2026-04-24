#!/usr/bin/env node
/**
 * scripts/affiliate-links.js
 * 
 * Zoekt voor elke BolBtn search="..." de beste match op via
 * de bol.com Marketing Catalog API en voegt de affiliate URL
 * toe als url="..." attribuut.
 * 
 * Werkt ook zonder API (fallback naar zoeklinks).
 * Cache voorkomt onnodige API calls bij herhaalde runs.
 */

const fs = require('fs')
const path = require('path')

// Config
const PARTNER_ID = process.env.BOL_PARTNER_ID || '10065bba51d681361557'
const CLIENT_ID  = process.env.BOL_CLIENT_ID
const CLIENT_SECRET = process.env.BOL_CLIENT_SECRET
const BLOG_DIR   = path.join(process.cwd(), 'content', 'blog')
const CACHE_FILE = path.join(process.cwd(), 'scripts', 'affiliate-cache.json')
const BOL_API    = 'https://api.bol.com'

// Cache laden
let cache = {}
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
    console.log(`Cache geladen: ${Object.keys(cache).length} producten`)
  } catch(e) {
    cache = {}
  }
}

// bol.com OAuth token ophalen
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
    if (!res.ok) {
      console.log(`Token fout: ${res.status}`)
      return null
    }
    const data = await res.json()
    console.log('Marketing API verbonden')
    return data.access_token
  } catch(e) {
    console.log(`Token error: ${e.message}`)
    return null
  }
}

// Product zoeken via Marketing Catalog API
async function findProduct(token, searchTerm) {
  // Cache check
  if (cache[searchTerm]) {
    return cache[searchTerm]
  }

  let productUrl = null

  if (token) {
    try {
      // Wacht 400ms tussen calls (rate limiting)
      await new Promise(r => setTimeout(r, 400))

      const res = await fetch(
        `${BOL_API}/marketing/search?q=${encodeURIComponent(searchTerm)}&limit=1&countryCode=NL`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.catalogapi.v1+json'
          }
        }
      )

      if (res.ok) {
        const data = await res.json()
        if (data.products && data.products.length > 0) {
          const p = data.products[0]
          // Directe bol.com product URL
          productUrl = p.urls && p.urls.length > 0
            ? p.urls[0]
            : `https://www.bol.com/nl/nl/p/-/${p.id}/`
          console.log(`  API hit: "${searchTerm}" → ${productUrl}`)
        }
      } else {
        console.log(`  API fout ${res.status} voor "${searchTerm}"`)
      }
    } catch(e) {
      console.log(`  Zoekfout: ${e.message}`)
    }
  }

  // Fallback: zoeklink (werkt altijd, ook zonder API)
  if (!productUrl) {
    productUrl = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(searchTerm)}&pgindex=1`
    console.log(`  Fallback zoeklink: "${searchTerm}"`)
  }

  // Bouw affiliate URL
  const affiliateUrl = `https://partner.bol.com/click/click?p=1&t=url&s=${PARTNER_ID}&url=${encodeURIComponent(productUrl)}`

  // Sla op in cache
  cache[searchTerm] = affiliateUrl
  return affiliateUrl
}

// Verwerk alle MDX blogs
async function main() {
  console.log('\n=== Fietsvoeter Affiliate Link Processor ===\n')

  const token = await getToken()
  if (!token) {
    console.log('Geen API token — gebruik zoeklinks als fallback\n')
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  console.log(`Verwerk ${files.length} blogs...\n`)

  let totalUpdated = 0

  for (const file of files) {
    const filepath = path.join(BLOG_DIR, file)
    let content = fs.readFileSync(filepath, 'utf8')
    let updated = false

    // Vind BolBtn zonder url attribuut
    // Match: <BolBtn search="..." label="..." />
    // Niet matchen als url="..." al aanwezig is
    const regex = /<BolBtn\s+search="([^"]+)"\s+label="([^"]+)"\s*\/>/g
    const matches = [...content.matchAll(regex)]

    if (matches.length === 0) continue

    const newMatches = matches.filter(m => !m[0].includes('url='))
    if (newMatches.length === 0) continue

    console.log(`📝 ${file} — ${newMatches.length} links verwerken`)

    for (const match of newMatches) {
      const [fullMatch, searchTerm, label] = match
      const affiliateUrl = await findProduct(token, searchTerm)

      // Vervang met url attribuut toegevoegd
      const replacement = `<BolBtn search="${searchTerm}" label="${label}" url="${affiliateUrl}" />`
      content = content.replace(fullMatch, replacement)
      updated = true
      totalUpdated++
    }

    if (updated) {
      fs.writeFileSync(filepath, content)
      console.log(`  ✓ Opgeslagen\n`)
    }
  }

  // Cache opslaan
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
  console.log(`\n=== Klaar ===`)
  console.log(`${totalUpdated} links bijgewerkt`)
  console.log(`Cache: ${Object.keys(cache).length} producten\n`)
}

main().catch(e => {
  console.error('Fatale fout:', e)
  process.exit(1)
})
