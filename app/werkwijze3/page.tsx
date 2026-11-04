import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, stappen } from '@/content/werkwijze'
import { TEKENS } from '@/components/werkwijze3/Tekens'
import { Beweging } from '@/components/werkwijze3/Beweging'
import '../pagina.css'
import '../werkwijze/werkwijze.css'
import './werkwijze3.css'

// Derde ontwerp voor /werkwijze, met precies dezelfde teksten (content/werkwijze.ts). Een testpagina:
// niet in de zoekmachine en de canonieke pagina blijft /werkwijze.
export const metadata: Metadata = {
  title: `${meta.title} 3`,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Opbouw naar linear.app, zonder schermbeelden: een hero waarin de titel woord voor woord binnenkomt naast
// een paar banen met een stip die rondgaat (de naam Orbit), daarna de tien stappen als kaarten die bij
// het scrollen over elkaar schuiven, elk met een klein abstract teken dat één keer afspeelt.

const nr = (n: number) => String(n).padStart(2, '0')

function Banen() {
  // Drie gekantelde banen; op de middelste loopt een stip in het accent rond
  const baan = (rx: number, ry: number) => `M ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx} 0 A ${rx} ${ry} 0 1 1 ${-rx} 0`
  return (
    <svg className="w3-banen" viewBox="-300 -300 600 600" aria-hidden="true">
      <g transform="rotate(-18)">
        <path className="w3-baan" d={baan(280, 92)} pathLength={1} />
        <path className="w3-baan w3-baan-midden" d={baan(210, 70)} pathLength={1} />
        <path className="w3-baan" d={baan(140, 46)} pathLength={1} />
        <circle className="w3-kern" r="5" />
        <circle className="w3-satelliet" r="5">
          <animateMotion dur="22s" repeatCount="indefinite" path={baan(210, 70)} />
        </circle>
        <circle className="w3-satelliet-klein" r="3">
          <animateMotion dur="34s" begin="-17s" repeatCount="indefinite" path={baan(280, 92)} />
        </circle>
      </g>
    </svg>
  )
}

export default function Werkwijze3Page() {
  const woorden = hero.title.split(' ')
  return (
    <div className="home lp w3">
      <Beweging />

      <section className="w3-hero" aria-labelledby="w3-titel">
        <Banen />
        <div className="container w3-hero-inner">
          <p className="lp-eyebrow w3-hero-eyebrow">{hero.eyebrow}</p>
          <h1 id="w3-titel" className="lp-title w3-hero-titel" aria-label={hero.title}>
            {woorden.map((w, i) => (
              <span key={i} className="w3-woord" style={{ '--i': i } as React.CSSProperties} aria-hidden="true">{w}{' '}</span>
            ))}
          </h1>
        </div>
      </section>

      <div className="container">
        <ol className="w3-stapel">
          {stappen.map((s, i) => {
            const Teken = TEKENS[s.id]
            return (
              <li key={s.id} id={s.id} className="w3-kaart" style={{ '--i': i } as React.CSSProperties} aria-labelledby={`${s.id}-titel`}>
                <div className="w3-kaart-tekst">
                  <p className="w3-nr" aria-hidden="true"><span>{nr(s.nr)}</span> / {nr(stappen.length)}</p>
                  <h2 id={`${s.id}-titel`} className="w3-titel">
                    <span className="sr-only">Stap {s.nr}: </span>{s.titel}
                  </h2>
                  <p className="w3-aanloop">{s.aanloop}</p>
                  <p className="w3-tekst">{s.tekst}</p>
                </div>
                <div className="w3-kaart-beeld">
                  <span className="w3-groot-nr" aria-hidden="true">{nr(s.nr)}</span>
                  {Teken && <Teken />}
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
