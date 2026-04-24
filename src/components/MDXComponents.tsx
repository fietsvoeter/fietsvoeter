'use client'
import Link from 'next/link'
import { bolLink, YEAR, PARTNER_ID } from '@/lib/categories'

export function BolBtn({ search, label, partner = PARTNER_ID }: {
  search: string
  label: string
  partner?: string
}) {
  return (
    <a
      href={bolLink(search, partner)}
      target="_blank"
      rel="noopener sponsored nofollow"
      className="bol-btn"
    >
      <span className="bol-dot">●</span>
      {label} op bol.com
    </a>
  )
}

export function Disclaimer() {
  return (
    <div className="disclaimer">
      <strong>✓ Transparantie:</strong> Wij testen producten onafhankelijk in {YEAR}.
      Via bol.com-links ontvangen wij commissie — zonder extra kosten voor jou.{' '}
      <Link href="/affiliate-disclosure/" className="text-brand-red">Meer info</Link>.
    </div>
  )
}

export function UpdateBadge({ date, changes }: { date: string; changes: string }) {
  return (
    <div className="update-badge">
      <strong>🔄 Bijgewerkt {date}:</strong> {changes}
    </div>
  )
}

export function GeoBlock({ region, text }: { region: string; text: string }) {
  return (
    <div className="geo-block">
      <strong>📍 In {region}?</strong> {text}
    </div>
  )
}

export function ExpertQuote({ quote, name, role }: {
  quote: string
  name: string
  role: string
}) {
  return (
    <blockquote className="expert-quote">
      <p>"{quote}"</p>
      <footer><strong>{name}</strong> — {role}</footer>
    </blockquote>
  )
}

export function FAQ({ items }: { items?: { question: string; answer: string }[] }) {
  if (!items || !Array.isArray(items)) return null
  return (
    <div className="my-8">
      <h2>Veelgestelde vragen</h2>
      {items.map((item, i) => (
        <div key={i} className="mb-4">
          <h3 className="mt-5 mb-2">{item.question}</h3>
          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
        </div>
      ))}
    </div>
  )
}

export function Score({ value }: { value: number }) {
  return <span className="score-badge">{value}/10</span>
}

export function CompareTable({
  headers,
  rows,
  scoreCol,
}: {
  headers?: string[]
  rows?: (string | number)[][]
  scoreCol?: number
}) {
  if (!Array.isArray(headers) || !Array.isArray(rows)) return null
  return (
    <div className="compare-table-wrap">
      <table className="compare-table">
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {Array.isArray(row) && row.map((cell, j) => (
                <td key={j} className={j === scoreCol ? 'font-bold' : ''}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function RelatedLinks({ pairs }: { pairs?: { slug: string; label: string }[] }) {
  if (!Array.isArray(pairs)) return null
  return (
    <div className="bg-gray-50 rounded p-4 text-sm my-7">
      <strong>Lees ook:</strong>{' '}
      {pairs.map(({ slug, label }, i) => (
        <span key={slug}>
          {i > 0 && ' · '}
          <Link
            href={`/blog/${slug}/`}
            className="text-brand-red font-medium no-underline hover:underline"
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  )
}

export function PostImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 630,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}) {
  if (!src) return null
  return (
    <figure className="my-7">
      <img
        src={src}
        alt={alt || ''}
        title={alt || ''}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-md"
        style={{ aspectRatio: `${width}/${height}` }}
      />
      {caption && (
        <figcaption className="text-xs text-gray-400 mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
