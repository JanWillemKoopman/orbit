import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { afsluiter, hero, meta, stappen } from '@/content/werkwijze'
import { Cyclus } from '@/components/werkwijze2/Cyclus'
import '../pagina.css'
import '../werkwijze/werkwijze.css'
import './werkwijze2.css'

// Alternatief ontwerp voor /werkwijze, met precies dezelfde teksten (content/werkwijze.ts). Een
// testpagina: niet in de zoekmachine en de canonieke pagina blijft /werkwijze.
export const metadata: Metadata = {
  title: `${meta.title} 2`,
  description: meta.description,
  alternates: { canonical: '/werkwijze' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Opbouw naar linear.app, zonder schermbeelden: een typografische hero op een fijn raster, daarna de
// tien stappen als cyclus (een wijzerplaat die meeloopt en een tijdlijn) en de afsluiter.
export default function Werkwijze2Page() {
  return (
    <div className="home lp w2">
      <section className="w2-hero" aria-labelledby="w2-titel">
        <div className="w2-hero-raster" aria-hidden="true" />
        <div className="container w2-hero-inner">
          <p className="lp-eyebrow">{hero.eyebrow}</p>
          <h1 id="w2-titel" className="lp-title w2-hero-titel">{hero.title}</h1>
        </div>
      </section>

      <div className="container">
        <Cyclus stappen={stappen} />
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
