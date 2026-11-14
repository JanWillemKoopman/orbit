import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, intro, meta, overzicht, stappen, type Stap } from '@/content/werkwijze'
import { PaginaHero } from '@/components/product/Blokken'
import { StappenBalk } from '@/components/werkwijze/StappenBalk'
import { CitaatScroll } from '@/components/home/CitaatScroll'
import '../pagina.css'
import './werkwijze.css'
import './stappen.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  openGraph: { title: `${meta.title} – Orbit`, description: meta.description, url: '/werkwijze', images: [{ url: '/images/product/og-werkwijze.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/images/product/og-werkwijze.png'] },
}

// Opbouw naar linear.app: de hero met een achtergrondvideo van grafieken, een introductie, een overzicht van de
// tien stappen en daarna de tien stappen direct onder
// elkaar, elk met een keyline, een mononummer, de titel links en de tekst rechts. De pagina draait om
// de tekst: tussen de stappen staan bewust geen schermbeelden. Een balk onder de header laat zien bij welke stap
// je bent.

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

export default function WerkwijzePage() {
  return (
    <div className="home lp ww">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="werkwijze-achtergrond" vierkantMobiel />

      <div className="container">
        {/* Introductie in de vorm van de tussenzin op de homepage */}
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
