import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { CitaatScroll } from '@/components/home/CitaatScroll'
import { Beeld, PaginaHero } from '@/components/product/Blokken'
import { AlleKlanten } from '@/components/agencies/Visuals'
import { afsluiter, hero, meta, minimaal } from '@/content/agencies'
import '../werkwijze/werkwijze.css'
import '../beheer/beheer.css'
import '../pagina.css'
import './agencies2.css'

// Tweede, veel minimalistischere versie van /agencies. Een testpagina: niet in de zoekmachine en de
// canonieke pagina blijft /agencies.
export const metadata: Metadata = {
  title: `${meta.title} 2`,
  description: meta.description,
  alternates: { canonical: '/agencies' },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Opbouw naar linear.app, met zo min mogelijk: de hero met de achtergrondvideo, een tekstblok met vier
// voordelen zoals op de homepage, één groot beeld van het werkoverzicht met al je klanten, een korte tussenzin, de voordelen als
// tekst zonder beelden en de afsluiter.
export default function Agencies2Page() {
  const m = minimaal
  return (
    <div className="home lp a2">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-agencies" vierkantMobiel />

      <div className="container">
        {/* Tekstblok met vier voordelen, zoals "Gebouwd voor marketingbureaus" op de homepage */}
        <section className="feature process usp a2-usp" aria-labelledby="a2-usp-titel">
          <div className="feature-header">
            <h2 id="a2-usp-titel" className="feature-title">{m.usp.titel}</h2>
            <div className="feature-description">
              <p>{m.usp.tekst}</p>
            </div>
          </div>
          <ul className="process-steps usp-steps">
            {m.usp.punten.map((punt) => (
              <li className="process-step" key={punt}>
                <span className="process-number usp-vink" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>
                </span>
                <h3 className="process-title">{punt}</h3>
              </li>
            ))}
          </ul>
        </section>

        <section className="a2-klanten" aria-label="Het werkoverzicht van je bureau">
          <Beeld b={m.beeld} breedte={1240} hoogte={900} alt="Het scherm Alle bedrijven van een bureau: twaalf klanten onder elkaar met hun zichtbaarheid in AI, de maandmeting, wat er te starten is, wat er wacht en sinds wanneer, en de kosten van de afgelopen dertig dagen. Vier klanten zijn aangevinkt om de maand tegelijk te starten.">
            <AlleKlanten />
          </Beeld>
        </section>

        <div className="home-statement a2-statement">
          <CitaatScroll strong={m.statement.strong} rest={m.statement.rest} />
        </div>

        <section className="a2-voordelen" aria-label="Waarom bureaus voor Orbit kiezen">
          <ul className="a2-lijst">
            {m.voordelen.map((v) => (
              <li key={v.titel} className="a2-voordeel">
                <h3>{v.titel}</h3>
                <p>{v.tekst}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Afsluiter */}
      <section className="home-prefooter container pd-afsluiter" aria-labelledby="a2-afsluiter">
        <CtaAchtergrond />
        <h2 id="a2-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
