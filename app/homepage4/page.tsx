import type { Metadata } from 'next'
import { DemoKnop } from '@/components/homepage1/DemoKnop'
import { beelden } from '@/components/homepage4/Visuals'
import { hero, visualisaties } from '@/content/homepage4'
import './homepage4.css'

// Testpagina: niet in het menu, niet in de sitemap en niet te indexeren. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: 'Orbit – Twintig functies in beeld (test 4)' },
  description: hero.tekst,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Twintig secties met elk één beeld links en de titel en uitleg rechts, in de volgorde van de kringloop:
// meten, begrijpen, plannen, schrijven, bewijzen en schalen.
export default function Homepage4() {
  return (
    <div className="home hp4">
      <section className="container hp4-hero">
        <h1>{hero.titel}</h1>
        <p>{hero.tekst}</p>
      </section>

      <div className="container">
        {visualisaties.map((v, i) => {
          const Beeld = beelden[v.id]
          return (
            <section key={v.id} id={v.id} className="hp4-sectie" aria-labelledby={`${v.id}-titel`}>
              <figure className="hp4-vis" role="img" aria-label={v.alt}>
                <div className="hp4-v" aria-hidden="true"><Beeld /></div>
              </figure>
              <div className="hp4-tekst">
                <p className="hp4-mono">{String(i + 1).padStart(2, '0')} · {v.fase}</p>
                <h2 id={`${v.id}-titel`}>{v.titel}</h2>
                <p>{v.tekst}</p>
              </div>
            </section>
          )
        })}

        <div className="hp4-slot">
          <p>Alle beelden zijn voorbeelden met verzonnen bedrijven.</p>
          <DemoKnop className="btn btn-invert">Plan een gratis demo</DemoKnop>
        </div>
      </div>
    </div>
  )
}
