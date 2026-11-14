import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import type { Stap } from '@/content/werkwijze'
import { afsluiter, hero, intro, meta, overzicht, stappen } from '@/content/werkwijze2'
import { PaginaHero } from '@/components/product/Blokken'
import { StappenBalk } from '@/components/werkwijze/StappenBalk'
import { CitaatScroll } from '@/components/home/CitaatScroll'
import '../pagina.css'
import '../werkwijze/werkwijze.css'
import '../werkwijze/stappen.css'
import './werkwijze2.css'

// Tweede versie van /werkwijze, naast het origineel: hetzelfde ontwerp met nieuwe teksten
// (content/werkwijze2.ts) en een overzicht van de tien stappen boven de eerste stap. Zolang er twee
// versies zijn, wijst deze naar het origineel als canoniek adres en blijft hij buiten de zoekmachines.
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  robots: { index: false, follow: true },
}

const nr = (n: number) => String(n).padStart(2, '0')

function StapSectie({ s }: { s: Stap }) {
  return (
    <section id={s.id} className="ww-stap" aria-labelledby={`${s.id}-titel`}>
      <div className="ww-kop">
        <p className="ww-nr" aria-hidden="true">{nr(s.nr)}<span> / {stappen.length}</span></p>
        <h2 id={`${s.id}-titel`} className="ww-titel">
          <span className="sr-only">Stap {s.nr}: </span>{s.titel}
        </h2>
        <div className="ww-tekst">
          <p className="ww-aanloop">{s.aanloop}</p>
          <p>{s.tekst}</p>
        </div>
      </div>
    </section>
  )
}

export default function Werkwijze2Page() {
  return (
    <div className="home lp ww">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="werkwijze-achtergrond" vierkantMobiel />

      <div className="container">
        <div className="home-statement ww-intro">
          <CitaatScroll strong={intro.strong} rest={intro.rest} />
        </div>

        {/* De tien stappen in één oogopslag: elke naam springt naar zijn stap */}
        <nav className="ww2-overzicht" aria-labelledby="ww2-overzicht-titel">
          <h2 id="ww2-overzicht-titel" className="ww2-overzicht-titel">{overzicht.titel}</h2>
          <ol className="ww2-lijst">
            {stappen.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span className="ww2-lijst-nr" aria-hidden="true">{nr(s.nr)}</span>
                  <span className="ww2-lijst-titel">{s.titel}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="ww-stappen">
        <StappenBalk stappen={stappen.map(({ id, nr, titel }) => ({ id, nr, titel }))} />
        <div className="container">
          {stappen.map((s) => <StapSectie key={s.id} s={s} />)}
        </div>
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
