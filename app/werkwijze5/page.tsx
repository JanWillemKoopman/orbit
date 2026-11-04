import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, stappen } from '@/content/werkwijze'
import { FIGUREN, HeroFiguur } from '@/components/werkwijze4/Figuren'
import '../pagina.css'
import '../werkwijze/werkwijze.css'
import '../werkwijze4/werkwijze4.css'
import './werkwijze5.css'

// Vijfde ontwerp voor /werkwijze: geïnspireerd op /werkwijze4, maar zonder beweging. Dezelfde teksten
// (content/werkwijze.ts) en dezelfde isometrische figuren, stilstaand, in een rustige opbouw van rijen
// gescheiden door een lijn. Een testpagina: niet in de zoekmachine, canoniek blijft /werkwijze.
export const metadata: Metadata = {
  title: `${meta.title} 5`,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const nr = (n: number) => String(n).padStart(2, '0')

export default function Werkwijze5Page() {
  return (
    <div className="home lp w5">
      <section className="w4-hero w5-hero" aria-labelledby="w5-titel">
        <div className="container w4-hero-inner">
          <div>
            <p className="lp-eyebrow">{hero.eyebrow}</p>
            <h1 id="w5-titel" className="lp-title w4-hero-titel">{hero.title}</h1>
          </div>
          <HeroFiguur statisch />
        </div>
      </section>

      <div className="container">
        <ol className="w5-lijst">
          {stappen.map((s) => {
            const Figuur = FIGUREN[s.id]
            return (
              <li key={s.id} id={s.id} className="w5-stap" aria-labelledby={`${s.id}-titel`}>
                <div className="w5-tekst">
                  <p className="w5-nr" aria-hidden="true"><span>{nr(s.nr)}</span> / {nr(stappen.length)}</p>
                  <h2 id={`${s.id}-titel`} className="w5-titel">
                    <span className="sr-only">Stap {s.nr}: </span>{s.titel}
                  </h2>
                  <p className="w5-aanloop">{s.aanloop}</p>
                  <p className="w5-lopend">{s.tekst}</p>
                </div>
                <figure className="w5-beeld">
                  <span className="w4-fig" aria-hidden="true">FIG {nr(s.nr)}</span>
                  {Figuur && <Figuur statisch />}
                </figure>
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
