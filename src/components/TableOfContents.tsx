'use client'
import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    // Geef alle h2/h3 een id als ze er nog geen hebben
    const headings = Array.from(document.querySelectorAll('article h2, article h3'))
    
    headings.forEach(h => {
      if (!h.id) {
        h.id = toSlug(h.textContent || '')
      }
    })

    const tocItems: TocItem[] = headings
      .filter(h => h.id && h.textContent)
      .map(h => ({
        id: h.id,
        text: h.textContent || '',
        level: parseInt(h.tagName[1])
      }))

    setItems(tocItems)

    if (tocItems.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )

    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  if (items.length < 3) return null

  return (
    <nav className="not-prose my-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Inhoud
      </p>
      <ol className="space-y-1.5 list-none m-0 p-0">
        {items.map(item => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${item.id}`}
              className={`text-sm no-underline transition-colors ${
                active === item.id
                  ? 'font-semibold text-red-600'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
