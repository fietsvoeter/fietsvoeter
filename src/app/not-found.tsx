import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display font-black text-8xl text-brand-red mb-4">404</h1>
      <h2 className="font-display font-bold text-2xl mb-4">Pagina niet gevonden</h2>
      <p className="text-gray-500 mb-8">Deze pagina bestaat niet meer of de URL is onjuist.</p>
      <Link href="/" className="bg-brand-red text-white font-semibold px-6 py-3 rounded no-underline hover:opacity-90">Naar homepage</Link>
    </div>
  )
}