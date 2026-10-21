import type { Metadata } from 'next'
import { DemoKnop } from '@/components/homepage1/DemoKnop'
import { beelden } from '@/components/homepage6/Visuals'
import { hero, secties } from '@/content/homepage6'
import '../homepage4/homepage4.css'
import './homepage6.css'

// Testpagina: niet in het menu, niet in de sitemap en niet te indexeren. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: 'Orbit – De app in beeld (test 6)' },
  description: hero.tekst,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Dezelfde opbouw als /homepage4 en /homepage5 (beeld links, tekst rechts), nu met tien rijke beelden die
// elk een echt scherm van de app tonen, van meten tot al je klanten tegelijk.
export default function Homepage6() {
  return (
    <div className="home hp4 hp6">
      <section className="container hp4-hero hp6-hero">
        <h1>{hero.titel}</h1>
        <p>{hero.tekst}</p>
      </section>

      <div className="container">
        {secties.map((s, i) => {
          const Beeld = beelden[s.id]
          return (
            <section key={s.id} id={s.id} className="hp4-sectie" aria-labelledby={`${s.id}-titel`}>
              <figure className="hp6-vis" role="img" aria-label={s.alt}>
                <div className="hp6-v" aria-hidden="true"><Beeld /></div>
              </figure>
              <div className="hp4-tekst">
                <p className="hp4-mono">{String(i + 1).padStart(2, '0')} · {s.label}</p>
                <h2 id={`${s.id}-titel`}>{s.titel}</h2>
                <p>{s.tekst}</p>
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
