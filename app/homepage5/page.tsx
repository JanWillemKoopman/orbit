import type { Metadata } from 'next'
import { DemoKnop } from '@/components/homepage1/DemoKnop'
import { beelden } from '@/components/homepage5/Visuals'
import { behoeften, gat, hero, usps, type Sectie } from '@/content/homepage5'
import '../homepage4/homepage4.css'
import './homepage5.css'

// Testpagina: niet in het menu, niet in de sitemap en niet te indexeren. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: 'Orbit – GEO als dienst voor bureaus (test 5)' },
  description: hero.tekst,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Dezelfde opbouw als /homepage4 (beeld links, tekst rechts), nu bij de grote behoeften van een bureau van
// belangrijk naar minder belangrijk, het gat dat Orbit vult en de vier USP's.
export default function Homepage5() {
  return (
    <div className="home hp4 hp5">
      <section className="container hp4-hero hp5-hero">
        <h1>{hero.titel}</h1>
        <p>{hero.tekst}</p>
      </section>

      <div className="container">
        {behoeften.map((s) => <Rij key={s.id} s={s} />)}
        <Rij s={gat} />
        {usps.map((s) => <Rij key={s.id} s={s} />)}

        <div className="hp4-slot">
          <p>Alle beelden zijn voorbeelden met verzonnen bedrijven.</p>
          <DemoKnop className="btn btn-invert">Plan een gratis demo</DemoKnop>
        </div>
      </div>
    </div>
  )
}

function Rij({ s }: { s: Sectie }) {
  const Beeld = beelden[s.id]
  return (
    <section id={s.id} className="hp4-sectie" aria-labelledby={`${s.id}-titel`}>
      <figure className="hp4-vis" role="img" aria-label={s.alt}>
        <div className="hp4-v" aria-hidden="true"><Beeld /></div>
      </figure>
      <div className="hp4-tekst">
        <p className="hp4-mono">{s.label}</p>
        <h2 id={`${s.id}-titel`}>{s.titel}</h2>
        <p>{s.tekst}</p>
      </div>
    </section>
  )
}
