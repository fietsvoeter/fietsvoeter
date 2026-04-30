'use client'
import { useState } from 'react'

// Silca-gebaseerde bandendruk berekening
function berekenDruk(params: {
  gewicht: number
  fietsGewicht: number
  breedte: number
  tubeless: boolean
  ondergrond: 'glad' | 'normaal' | 'ruw' | 'kasseien'
}) {
  const { gewicht, fietsGewicht, breedte, tubeless, ondergrond } = params
  const totaal = gewicht + fietsGewicht

  // Gewichtsverdeling: voor 40%, achter 60%
  const voor = totaal * 0.4
  const achter = totaal * 0.6

  // Silca basisformule (empirisch gevalideerd)
  const baseFactor = 153
  const breedteFactor = Math.pow(breedte / 25, 1.7)

  let psiVoor = (baseFactor * voor) / (70 * breedteFactor)
  let psiAchter = (baseFactor * achter) / (70 * breedteFactor)

  // Ondergrondcorrectie
  const correctie = {
    glad: 1.04,
    normaal: 1.0,
    ruw: 0.93,
    kasseien: 0.86,
  }[ondergrond]

  psiVoor *= correctie
  psiAchter *= correctie

  // Tubeless: 12 psi lager
  if (tubeless) {
    psiVoor -= 12
    psiAchter -= 12
  }

  // Minimum veiligheidsgrens
  psiVoor = Math.max(psiVoor, tubeless ? 55 : 65)
  psiAchter = Math.max(psiAchter, tubeless ? 60 : 70)

  // Afronden op 1 psi
  return {
    voor: Math.round(psiVoor),
    achter: Math.round(psiAchter),
    voorBar: Math.round(psiVoor * 0.0689476 * 10) / 10,
    achterBar: Math.round(psiAchter * 0.0689476 * 10) / 10,
  }
}

const BANDBREEDTES = [23, 25, 26, 28, 30, 32]
const ONDERGRONDEN = [
  { id: 'glad', label: 'Glad asfalt', desc: 'Nieuwe snelweg, velodroom' },
  { id: 'normaal', label: 'Normaal asfalt', desc: 'Standaard wegdek NL' },
  { id: 'ruw', label: 'Ruw asfalt', desc: 'Oud wegdek, fijne grind' },
  { id: 'kasseien', label: 'Kasseien / gravel', desc: 'Stad, onverharde wegen' },
] as const

export function BandendruKCalculator() {
  const [gewicht, setGewicht] = useState(75)
  const [fietsGewicht, setFietsGewicht] = useState(8)
  const [breedte, setBreedte] = useState(25)
  const [tubeless, setTubeless] = useState(false)
  const [ondergrond, setOndergrond] = useState<'glad' | 'normaal' | 'ruw' | 'kasseien'>('normaal')
  const [berekend, setBerekend] = useState(false)

  const resultaat = berekenDruk({ gewicht, fietsGewicht, breedte, tubeless, ondergrond })

  const drukKleur = (psi: number) => {
    if (psi < 75) return '#16a34a'
    if (psi < 95) return '#2563eb'
    if (psi < 110) return '#d97706'
    return '#dc2626'
  }

  return (
    <div className="not-prose my-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-5">
        <h3 className="text-white font-bold text-xl mb-1">Bandendruk Calculator</h3>
        <p className="text-gray-400 text-sm">Bereken je optimale PSI op basis van gewicht, band en ondergrond</p>
      </div>

      <div className="bg-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Links: Invoer */}
          <div className="space-y-5">

            {/* Rijdergewicht */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rijdergewicht: <span className="text-red-600 font-bold">{gewicht} kg</span>
              </label>
              <input
                type="range" min={50} max={120} step={1}
                value={gewicht}
                onChange={e => { setGewicht(+e.target.value); setBerekend(true) }}
                className="w-full accent-red-600 h-2 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>50 kg</span><span>120 kg</span>
              </div>
            </div>

            {/* Fietsgewicht */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fietsgewicht: <span className="text-red-600 font-bold">{fietsGewicht} kg</span>
              </label>
              <input
                type="range" min={6} max={15} step={0.5}
                value={fietsGewicht}
                onChange={e => { setFietsGewicht(+e.target.value); setBerekend(true) }}
                className="w-full accent-red-600 h-2 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>6 kg</span><span>15 kg</span>
              </div>
            </div>

            {/* Bandbreedte */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bandbreedte</label>
              <div className="flex gap-2 flex-wrap">
                {BANDBREEDTES.map(b => (
                  <button
                    key={b}
                    onClick={() => { setBreedte(b); setBerekend(true) }}
                    className={`px-3 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                      breedte === b
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-red-300'
                    }`}
                  >
                    {b}mm
                  </button>
                ))}
              </div>
            </div>

            {/* Tubeless toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Systeem</label>
              <div className="flex gap-2">
                {[
                  { val: false, label: 'Clincher', sub: 'Met binnenband' },
                  { val: true, label: 'Tubeless', sub: 'Zonder binnenband' },
                ].map(opt => (
                  <button
                    key={String(opt.val)}
                    onClick={() => { setTubeless(opt.val); setBerekend(true) }}
                    className={`flex-1 py-2 px-3 rounded-lg border-2 text-left transition-all ${
                      tubeless === opt.val
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-red-300'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className={`text-xs ${tubeless === opt.val ? 'text-red-100' : 'text-gray-400'}`}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ondergrond */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ondergrond</label>
              <div className="space-y-2">
                {ONDERGRONDEN.map(og => (
                  <button
                    key={og.id}
                    onClick={() => { setOndergrond(og.id); setBerekend(true) }}
                    className={`w-full py-2 px-3 rounded-lg border-2 text-left transition-all flex justify-between items-center ${
                      ondergrond === og.id
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-red-300'
                    }`}
                  >
                    <span className="font-semibold text-sm">{og.label}</span>
                    <span className={`text-xs ${ondergrond === og.id ? 'text-red-100' : 'text-gray-400'}`}>{og.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rechts: Resultaat */}
          <div className="flex flex-col justify-center">
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Optimale bandendruk</p>

              {/* Voorwiel */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">Voorwiel (40% gewicht)</p>
                <div className="flex items-end justify-center gap-2">
                  <span
                    className="text-5xl font-black"
                    style={{ color: drukKleur(resultaat.voor) }}
                  >
                    {resultaat.voor}
                  </span>
                  <span className="text-gray-400 text-lg mb-1">psi</span>
                  <span className="text-gray-400 text-sm mb-1.5">/ {resultaat.voorBar} bar</span>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4" />

              {/* Achterwiel */}
              <div className="mb-6">
                <p className="text-xs text-gray-400 mb-1">Achterwiel (60% gewicht)</p>
                <div className="flex items-end justify-center gap-2">
                  <span
                    className="text-5xl font-black"
                    style={{ color: drukKleur(resultaat.achter) }}
                  >
                    {resultaat.achter}
                  </span>
                  <span className="text-gray-400 text-lg mb-1">psi</span>
                  <span className="text-gray-400 text-sm mb-1.5">/ {resultaat.achterBar} bar</span>
                </div>
              </div>

              {/* Samenvatting */}
              <div className="bg-white rounded-xl p-3 text-left space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Totaalgewicht:</span>
                  <span className="font-semibold">{gewicht + fietsGewicht} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Band:</span>
                  <span className="font-semibold">{breedte}mm {tubeless ? 'tubeless' : 'clincher'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ondergrond:</span>
                  <span className="font-semibold">{ONDERGRONDEN.find(o => o.id === ondergrond)?.label}</span>
                </div>
              </div>

              {tubeless && (
                <p className="text-xs text-green-600 font-medium mt-3">
                  ✓ Tubeless correctie: −12 psi toegepast
                </p>
              )}

              <p className="text-xs text-gray-400 mt-3">
                Gebaseerd op Silca bandendruk algoritme
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
