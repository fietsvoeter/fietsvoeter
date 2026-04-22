'use client'
import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/mdx'

export function Header() {
  const [open, setOpen] = useState(false)
  const navItems = Object.entries(CATEGORIES).map(([slug,{label}])=>({href:`/categorie/${slug}/`,label}))
  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-display font-black text-xl tracking-tight text-gray-900 no-underline hover:no-underline">
          fiets<span className="text-brand-red">voeter</span>.nl
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({href,label})=>(
            <Link key={href} href={href} className="text-xs font-medium uppercase tracking-wide text-gray-500 px-3 py-1 rounded hover:text-gray-900 transition-colors no-underline">{label}</Link>
          ))}
        </nav>
        <Link href="/blog/" className="hidden md:block text-xs font-semibold uppercase tracking-wide bg-brand-red text-white px-4 py-2 rounded no-underline hover:opacity-90">Alle reviews</Link>
        <button className="md:hidden p-2 text-gray-600" onClick={()=>setOpen(!open)}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            {open?<path strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>:<path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-2">
          {navItems.map(({href,label})=>(
            <Link key={href} href={href} onClick={()=>setOpen(false)} className="text-sm font-medium text-gray-700 py-2 border-b border-gray-100 no-underline hover:text-brand-red">{label}</Link>
          ))}
          <Link href="/blog/" onClick={()=>setOpen(false)} className="mt-2 text-center text-sm font-semibold bg-brand-red text-white py-2 rounded no-underline">Alle reviews</Link>
        </div>
      )}
    </header>
  )
}