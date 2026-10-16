import type { Metadata } from 'next'
import { Prefooter } from '@/components/Prefooter'
import { Faq } from '@/components/home/Faq'
import { Plannen, Vinkje } from '@/components/prijzen/Plannen'
import { faq, hero, inbegrepen, plannen, vergelijking, type Waarde } from '@/content/prijzen'
import '../home.css'
import './prijzen.css'

export const metadata: Metadata = {
  title: 'Prijzen',
  description: hero.description,
  alternates: { canonical: '/prijzen' },
}

// Opbouw naar linear.app/pricing: titel, de plannen naast elkaar, daarna een vergelijkingstabel per
// onderwerp. Daarbovenop een klantenkiezer, zodat een bureau direct ziet welk plan past.

function Cel({ waarde, plan }: { waarde: Waarde; plan: string }) {
  if (waarde === true) return <span className="pr-cel" data-plan={plan}><Vinkje /><span className="sr-only">Inbegrepen</span></span>
  if (waarde === false) return <span className="pr-cel pr-cel-leeg" data-plan={plan}><span aria-hidden="true">–</span><span className="sr-only">Niet inbegrepen</span></span>
  return <span className="pr-cel" data-plan={plan}>{waarde}</span>
}

export default function PrijzenPage() {
  const korteNamen = plannen.map((p) => p.naam.replace(' agency', ''))
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

        <section className="container pr-vergelijking" aria-labelledby="pr-vergelijking-titel">
          <div className="pr-tabel" role="table" aria-labelledby="pr-vergelijking-titel">
            <div className="pr-tabel-kop" role="rowgroup">
              <div className="pr-rij" role="row">
                <h2 id="pr-vergelijking-titel" className="pr-tabel-titel" role="columnheader">{vergelijking.titel}</h2>
                {korteNamen.map((naam) => <span key={naam} className="pr-tabel-plan" role="columnheader">{naam}</span>)}
              </div>
            </div>
            {vergelijking.groepen.map((g) => (
              <div key={g.titel} className="pr-groep" role="rowgroup">
                <div className="pr-groep-titel" role="row"><h3 role="rowheader">{g.titel}</h3></div>
                {g.rijen.map((r) => (
                  <div key={r.label} className="pr-rij" role="row">
                    <span className="pr-rij-label" role="rowheader">{r.label}</span>
                    {r.waarden.map((w, i) => (
                      <span key={i} role="cell" className="pr-rij-waarde"><Cel waarde={w} plan={korteNamen[i]} /></span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="container pr-faq" aria-labelledby="pr-faq-titel">
          <h2 id="pr-faq-titel" className="pr-faq-titel">{faq.title}</h2>
          <Faq items={faq.items} />
        </section>
      </div>
      <Prefooter />
    </>
  )
}
