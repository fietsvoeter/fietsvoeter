import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/mdx'
export const metadata: Metadata = { title: `Contact — ${SITE_NAME}` }
export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1>Contact</h1>
      <p><strong>E-mail:</strong> <a href="mailto:info@fietsvoeter.nl">info@fietsvoeter.nl</a></p>
      <p className="text-gray-500 text-sm">Wij reageren doorgaans binnen 2 werkdagen.</p>
    </div>
  )
}