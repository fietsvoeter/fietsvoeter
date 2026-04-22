import Link from 'next/link'
import { CATEGORIES, YEAR, SITE_NAME } from '@/lib/mdx'
export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-500 border-t-4 border-brand-red mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display font-black text-xl text-white no-underline">fiets<span className="text-brand-red">voeter</span>.nl</Link>
            <p className="text-sm mt-3 text-gray-500 leading-relaxed">Onafhankelijke fietsreviews voor Nederland. Getest op eigen ritten in {YEAR}.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Rubrieken</h4>
            <ul className="space-y-2">
              {Object.entries(CATEGORIES).map(([slug,{label}])=>(
                <li key={slug}><Link href={`/categorie/${slug}/`} className="text-sm text-gray-500 hover:text-white no-underline transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Over ons</h4>
            <ul className="space-y-2">
              {[{href:'/over-ons/',label:'Wie zijn wij'},{href:'/contact/',label:'Contact'},{href:'/blog/',label:'Alle artikelen'}].map(({href,label})=>(
                <li key={href}><Link href={href} className="text-sm text-gray-500 hover:text-white no-underline transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Juridisch</h4>
            <ul className="space-y-2">
              {[{href:'/privacybeleid/',label:'Privacybeleid'},{href:'/affiliate-disclosure/',label:'Affiliate disclosure'}].map(({href,label})=>(
                <li key={href}><Link href={href} className="text-sm text-gray-500 hover:text-white no-underline transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-xs text-gray-600">© {YEAR} {SITE_NAME}</p>
          <p className="text-xs text-gray-600">Affiliate disclosure: commissie via bol.com partner links</p>
        </div>
        <p className="text-xs text-gray-700 mt-4 leading-relaxed border-t border-gray-800 pt-4">
          {SITE_NAME} neemt deel aan het bol.com partnerprogramma. Bij aankoop via onze links ontvangen wij een kleine commissie — zonder extra kosten voor jou.
        </p>
      </div>
    </footer>
  )
}