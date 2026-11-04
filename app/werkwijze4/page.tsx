import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, stappen } from '@/content/werkwijze'
import { FIGUREN, HeroFiguur } from '@/components/werkwijze4/Figuren'
import { Beweging } from '@/components/werkwijze3/Beweging'
import '../pagina.css'
import '../werkwijze/werkwijze.css'
import './werkwijze4.css'

// Vierde ontwerp voor /werkwijze: de opzet van /werkwijze3, strakker in de stijl van linear.app, met
// precies dezelfde teksten (content/werkwijze.ts). Een testpagina: niet in de zoekmachine en de
// canonieke pagina blijft /werkwijze.
export const metadata: Metadata = {
  title: `${meta.title} 4`,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Opbouw naar linear.app, zonder schermbeelden: een hero met de titel links en een isometrische figuur
// van drie banen rechts, daarna de tien stappen als platte panelen die bij het scrollen over elkaar
// schuiven. Elk paneel heeft een FIG-figuur in lijnen, zoals de illustraties op linear.app, die zich
// één keer opbouwt.

const nr = (n: number) => String(n).padStart(2, '0')

export default function Werkwijze4Page() {
  const woorden = hero.title.split(' ')
  return (
    <div className="home lp w4">
      <Beweging prefix="w4" />

      <section className="w4-hero" aria-labelledby="w4-titel">
        <div className="container w4-hero-inner">
          <div className="w4-hero-tekst">
            <p className="lp-eyebrow w4-hero-eyebrow">{hero.eyebrow}</p>
            <h1 id="w4-titel" className="lp-title w4-hero-titel" aria-label={hero.title}>
              {woorden.map((w, i) => (
                <span key={i} className="w4-woord" style={{ '--i': i } as React.CSSProperties} aria-hidden="true">{w}{' '}</span>
              ))}
            </h1>
          </div>
          <HeroFiguur />
        </div>
      </section>

      <div className="container">
        <ol className="w4-stapel">
          {stappen.map((s, i) => {
            const Figuur = FIGUREN[s.id]
            return (
              <li key={s.id} id={s.id} className="w4-kaart" style={{ '--i': i } as React.CSSProperties} aria-labelledby={`${s.id}-titel`}>
                <div className="w4-kaart-tekst">
                  <p className="w4-nr" aria-hidden="true"><span>{nr(s.nr)}</span> / {nr(stappen.length)}</p>
                  <h2 id={`${s.id}-titel`} className="w4-titel">
                    <span className="sr-only">Stap {s.nr}: </span>{s.titel}
                  </h2>
                  <p className="w4-aanloop">{s.aanloop}</p>
                  <p className="w4-tekst">{s.tekst}</p>
                </div>
                <div className="w4-kaart-beeld">
                  <span className="w4-fig" aria-hidden="true">FIG {nr(s.nr)}</span>
                  {Figuur && <Figuur />}
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
