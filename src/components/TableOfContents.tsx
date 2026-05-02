'use client'
import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'))
      .filter(h => h.id)
      .map(h => ({
        id: h.id,
        text: h.textContent || '',
        level: parseInt(h.tagName[1])
      }))
    setItems(headings)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  if (items.length < 3) return null

  return (
    <nav className="not-prose my-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Inhoud
      </p>
      <ol className="space-y-1.5">
        {items.map(item => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${item.id}`}
              className={`text-sm transition-colors ${
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
