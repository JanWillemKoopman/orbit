import type { Metadata } from 'next'
import { DotBol } from '@/components/assistent/DotBol'
import { BOLLEN, type BolNaam } from '@/components/assistent/bollen'
import './bollen.css'

export const metadata: Metadata = { title: 'Bollen assistent', robots: { index: false, follow: false } }

// Testpagina: de huidige bol van de assistent en tien alternatieven, groot en op ware grootte in de knop.
export default function BollenPage() {
  const namen = Object.keys(BOLLEN) as BolNaam[]
  return (
    <div className="container bl">
      <h1>Bol van de assistent</h1>
      <p className="bl-intro">De huidige bol en tien alternatieven. Onder elke bol staat hoe hij er op ware grootte in de knop uitziet.</p>
      <ul className="bl-raster">
        {namen.map((naam, i) => (
          <li key={naam} className="bl-kaart">
            <div className="bl-groot"><DotBol maat={176} variant={naam} /></div>
            <div className="bl-tekst">
              <p className="bl-naam"><span>{i === 0 ? 'Nu' : String(i).padStart(2, '0')}</span>{BOLLEN[naam].naam}</p>
              <p className="bl-uitleg">{BOLLEN[naam].uitleg}</p>
            </div>
            <div className="bl-knop" aria-hidden="true">
              <span className="as-knop-bol"><DotBol maat={44} variant={naam} /></span>
              <span className="as-knop-tekst">
                <span className="as-knop-label">Orbit</span>
                <span className="as-knop-vraag">Vragen? Vraag het ons.</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
