import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, stappen } from '@/content/werkwijze'
import { FIGUREN } from '@/components/werkwijze4/Figuren'
import '../pagina.css'
import '../werkwijze/werkwijze.css'
import '../werkwijze4/werkwijze4.css'
import './werkwijze6.css'

// Zesde ontwerp voor /werkwijze: de tekst staat voorop. Dezelfde teksten (content/werkwijze.ts) in een
// brede leeskolom; de figuren van /werkwijze4 staan klein, stil en gedempt naast het stapnummer. Een
// testpagina: niet in de zoekmachine, canoniek blijft /werkwijze.
export const metadata: Metadata = {
  title: `${meta.title} 6`,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const nr = (n: number) => String(n).padStart(2, '0')

export default function Werkwijze6Page() {
  return (
    <div className="home lp w6">
      <section className="container w6-hero" aria-labelledby="w6-titel">
        <p className="lp-eyebrow">{hero.eyebrow}</p>
        <h1 id="w6-titel" className="lp-title w6-hero-titel">{hero.title}</h1>
      </section>

      <div className="container">
        <ol className="w6-lijst">
          {stappen.map((s) => {
            const Figuur = FIGUREN[s.id]
            return (
              <li key={s.id} id={s.id} className="w6-stap" aria-labelledby={`${s.id}-titel`}>
                <div className="w6-zij" aria-hidden="true">
                  <p className="w6-nr"><span>{nr(s.nr)}</span> / {nr(stappen.length)}</p>
                  {Figuur && <div className="w6-beeld"><Figuur statisch /></div>}
                </div>
                <div className="w6-tekst">
                  <h2 id={`${s.id}-titel`} className="w6-titel">
                    <span className="sr-only">Stap {s.nr}: </span>{s.titel}
                  </h2>
                  <p className="w6-aanloop">{s.aanloop}</p>
                  <p className="w6-lopend">{s.tekst}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Afsluiter */}
      <section className="home-prefooter container pd-afsluiter" aria-labelledby="pd-afsluiter">
        <CtaAchtergrond />
        <h2 id="pd-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
