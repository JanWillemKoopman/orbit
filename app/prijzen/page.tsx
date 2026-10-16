import type { Metadata } from 'next'
import { Prefooter } from '@/components/Prefooter'
import { Plannen } from '@/components/prijzen/Plannen'
import { hero, inbegrepen, plannen } from '@/content/prijzen'
import '../home.css'
import './prijzen.css'

export const metadata: Metadata = {
  title: 'Prijzen',
  description: hero.description,
  alternates: { canonical: '/prijzen' },
}

// Opbouw naar linear.app/pricing: titel en de plannen naast elkaar, met daarboven een klantenkiezer
// zodat een bureau direct ziet welk plan past. Daarna wat bij elk plan inbegrepen is en de afsluiter.

export default function PrijzenPage() {
  return (
    <>
      <div className="home pr">
        <section className="container pr-hero" aria-labelledby="pr-titel">
          <p className="pr-eyebrow">{hero.eyebrow}</p>
          <h1 id="pr-titel" className="pr-title">
            {hero.title.map((regel) => <span key={regel}>{regel}</span>)}
          </h1>
          <p className="pr-description">{hero.description}</p>
        </section>

        <section className="container pr-plannen-sectie" aria-label="Plannen">
          <Plannen plannen={plannen} onboarding={inbegrepen.onboarding} />
        </section>

        <section className="container pr-inbegrepen" aria-labelledby="pr-inbegrepen-titel">
          <h2 id="pr-inbegrepen-titel" className="pr-inbegrepen-titel">Bij elk plan inbegrepen</h2>
          <ul className="pr-inbegrepen-lijst" role="list">
            {inbegrepen.punten.map((p, i) => (
              <li key={p.titel} data-eerste={i === 0 || undefined}>
                <span className="pr-inbegrepen-nr">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.titel}</h3>
                <p>{p.tekst}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Prefooter />
    </>
  )
}
