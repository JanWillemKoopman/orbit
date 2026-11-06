import type { Metadata } from 'next'
import Link from 'next/link'
import { Faq } from '@/components/home/Faq'
import { Plannen } from '@/components/prijzen/Plannen'
import { afsluiter, faq, hero, inbegrepen, plannen } from '@/content/prijzen'
import '../home.css'
import './prijzen.css'

export const metadata: Metadata = {
  title: 'Prijzen',
  description: hero.description,
  alternates: { canonical: '/prijzen' },
}

// Opbouw naar linear.app/pricing: titel en de plannen naast elkaar, met daarboven een klantenkiezer
// zodat een bureau direct ziet welk plan past. Daarna wat bij elk plan inbegrepen is, de veelgestelde vragen en de afsluiter.

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

        {/* Dezelfde FAQ als op de homepage: drie vragen links, drie rechts (op mobiel onder elkaar) */}
        <section className="container pr-faq" aria-labelledby="pr-faq-titel">
          <h2 id="pr-faq-titel" className="pr-faq-titel">{faq.title}</h2>
          <Faq items={faq.items} />
        </section>
      </div>
      {/* Afsluiter zonder bewegende achtergrond: gewoon zwart, met één knop naar contact */}
      <section className="prefooter container pr-afsluiter" aria-labelledby="pr-afsluiter-titel">
        <h2 id="pr-afsluiter-titel">{afsluiter.titel}</h2>
        <div className="prefooter-actions">
          <Link href="/contact" className="btn btn-lg btn-invert">
            {afsluiter.knop}
            <svg className="pijl" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
