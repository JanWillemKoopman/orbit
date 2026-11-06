import type { Metadata } from 'next'
import { DotBol } from '@/components/assistent/DotBol'
import { ALLE_BOLLEN, BOLLEN, VRIJE_BOLLEN, type BolNaam, type VrijeBolNaam } from '@/components/assistent/bollen'
import './bollen.css'

export const metadata: Metadata = { title: 'Bollen assistent', robots: { index: false, follow: false } }

function Kaart({ naam, nummer }: { naam: BolNaam | VrijeBolNaam; nummer: string }) {
  const bol = ALLE_BOLLEN[naam]
  return (
    <li className="bl-kaart">
      <div className="bl-groot"><DotBol maat={176} variant={naam} /></div>
      <div className="bl-tekst">
        <p className="bl-naam"><span>{nummer}</span>{bol.naam}</p>
        <p className="bl-uitleg">{bol.uitleg}</p>
      </div>
      <div className="bl-knop" aria-hidden="true">
        <span className="as-knop-bol"><DotBol maat={44} variant={naam} /></span>
        <span className="as-knop-tekst">
          <span className="as-knop-label">Orbit</span>
          <span className="as-knop-vraag">Vragen? Vraag het ons.</span>
        </span>
      </div>
    </li>
  )
}

// Testpagina: de huidige bol van de assistent met tien alternatieven van stippen, en tien vrijere ontwerpen.
// Elke bol staat groot en op ware grootte in de knop.
export default function BollenPage() {
  const stippen = Object.keys(BOLLEN) as BolNaam[]
  const vrij = Object.keys(VRIJE_BOLLEN) as VrijeBolNaam[]
  return (
    <div className="container bl">
      <h1>Bol van de assistent</h1>
      <p className="bl-intro">Onder elke bol staat hoe hij er op ware grootte in de knop uitziet.</p>

      <h2 className="bl-reeks">Reeks 2 · Vrije ontwerpen</h2>
      <ul className="bl-raster">
        {vrij.map((naam, i) => <Kaart key={naam} naam={naam} nummer={String(i + 11)} />)}
      </ul>

      <h2 className="bl-reeks">Reeks 1 · Stippen</h2>
      <ul className="bl-raster">
        {stippen.map((naam, i) => <Kaart key={naam} naam={naam} nummer={i === 0 ? 'Nu' : String(i).padStart(2, '0')} />)}
      </ul>
    </div>
  )
}
