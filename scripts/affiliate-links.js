#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const PARTNER_ID    = process.env.BOL_PARTNER_ID || '1361557'
const CLIENT_ID     = process.env.BOL_CLIENT_ID
const CLIENT_SECRET = process.env.BOL_CLIENT_SECRET
const BLOG_DIR      = path.join(process.cwd(), 'content', 'blog')
const CACHE_FILE    = path.join(process.cwd(), 'scripts', 'affiliate-cache.json')
const BOL_API       = 'https://api.bol.com'

// Cache wissen zodat alle links opnieuw worden gegenereerd met correcte partner ID
let cache = {}
console.log('Cache geleegd — alle links opnieuw genereren met partner ID: ' + PARTNER_ID)

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
    if (!res.ok) { console.log(`Token fout: ${res.status}`); return null }
    const data = await res.json()
    console.log('API verbonden')
    return data.access_token
  } catch(e) { console.log(`Token error: ${e.message}`); return null }
}

async function findProduct(token, searchTerm) {
  if (cache[searchTerm]) return cache[searchTerm]
  await new Promise(r => setTimeout(r, 400))
  let productUrl = null
  if (token) {
    try {
      const res = await fetch(
        `${BOL_API}/marketing/search?q=${encodeURIComponent(searchTerm)}&limit=1&countryCode=NL`,
        { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.catalogapi.v1+json' } }
      )
      if (res.ok) {
        const data = await res.json()
        if (data.products && data.products.length > 0) {
          const p = data.products[0]
          productUrl = (p.urls && p.urls[0]) || `https://www.bol.com/nl/nl/p/-/${p.id}/`
          console.log(`  Gevonden: "${searchTerm}"`)
        }
      }
    } catch(e) { console.log(`  Fout: ${e.message}`) }
  }
  if (!productUrl) {
    productUrl = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(searchTerm)}`
    console.log(`  Fallback: "${searchTerm}"`)
  }

  // Correcte affiliate URL structuur: p=2, f=TXL, s=partner_id
  const affiliateUrl = `https://partner.bol.com/click/click?p=2&t=url&s=${PARTNER_ID}&f=TXL&url=${encodeURIComponent(productUrl)}`
  cache[searchTerm] = affiliateUrl
  return affiliateUrl
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

    // Match ALLE BolBtn — ook die al een url hebben (om oude foute links te vervangen)
    const regexWithUrl = /<BolBtn\s+search="([^"]+)"\s+label="([^"]+)"\s+url="[^"]*"\s*\/>/g
    const regexWithout = /<BolBtn\s+search="([^"]+)"\s+label="([^"]+)"\s*\/>/g

    const matchesWithUrl = [...content.matchAll(regexWithUrl)]
    const matchesWithout = [...content.matchAll(regexWithout)]
    const allMatches = [...matchesWithUrl, ...matchesWithout]

    if (!allMatches.length) continue
    console.log(`${file}: ${allMatches.length} links`)

    for (const match of allMatches) {
      const [fullMatch, searchTerm, label] = match
      const url = await findProduct(token, searchTerm)
      const replacement = `<BolBtn search="${searchTerm}" label="${label}" url="${url}" />`
      content = content.replace(fullMatch, replacement)
      updated = true; total++
    }

    if (updated) fs.writeFileSync(filepath, content)
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
  console.log(`\nKlaar: ${total} links bijgewerkt met partner ID ${PARTNER_ID}`)
}

main().catch(e => { console.error(e); process.exit(1) })
