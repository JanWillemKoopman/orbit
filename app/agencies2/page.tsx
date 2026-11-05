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

// Opbouw naar linear.app, met zo min mogelijk: de hero met de achtergrondvideo, een kop met één zin,
// één groot beeld van het werkoverzicht met al je klanten, een korte tussenzin, de voordelen als
// tekst zonder beelden en de afsluiter.
export default function Agencies2Page() {
  const m = minimaal
  return (
    <div className="home lp a2">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-agencies" vierkantMobiel />

      <div className="container">
        <section className="lp-sectie a2-klanten" aria-labelledby="a2-klanten-titel">
          <div className="feature-header lp-intro">
            <h2 id="a2-klanten-titel" className="feature-title">{m.intro.titel}</h2>
            <div className="feature-description"><p>{m.intro.tekst}</p></div>
          </div>
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
