import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { PaginaHero } from '@/components/product/Blokken'
import { AlleKlanten, GripOpKosten, Huisstijlen } from '@/components/agencies/Visuals'
import { CitaatScroll } from '@/components/home/CitaatScroll'
import { afsluiter, beeld, hero, meta, secties, statement, usp } from '@/content/agencies'
import '../werkwijze/werkwijze.css'
import '../beheer/beheer.css'
import '../pagina.css'
import './agencies.css'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/agencies' },
  openGraph: { title: `${meta.title} – Orbit`, description: meta.description, url: '/agencies' },
}

// Opbouw naar linear.app, met zo min mogelijk: de hero met de achtergrondvideo, een tekstblok met vier
// voordelen zoals op de homepage, één groot beeld van het werkoverzicht met al je klanten, twee secties
// met een illustratie en tekst naast elkaar (grip op kosten en whitelabel) en de afsluiter.
export default function AgenciesPage() {
  return (
    <div className="home lp a2">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-agencies" vierkantMobiel />

      <div className="container">
        {/* Tekstblok met vier voordelen, zoals "Gebouwd voor marketingbureaus" op de homepage: desktop korte titel met uitleg, mobiel lange titel */}
        <section className="feature process usp a2-usp" aria-labelledby="a2-usp-titel">
          <div className="feature-header">
            <h2 id="a2-usp-titel" className="feature-title">{usp.titel}</h2>
            <div className="feature-description">
              <p>{usp.tekst}</p>
            </div>
          </div>
          <ul className="process-steps usp-steps">
            {usp.punten.map((punt) => (
              <li className="process-step" key={punt.titel}>
                <span className="process-number usp-vink" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>
                </span>
                <h3 className="process-title">
                  <span className="usp-kort">{punt.kort}</span>
                  <span className="usp-lang">{punt.titel}</span>
                </h3>
                <p className="process-description usp-uitleg">{punt.uitleg}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="a2-klanten" aria-label="Het werkoverzicht van je bureau">
          {/* Eigen vlak in plaats van Beeld: het scherm houdt op elke breedte zijn opbouw en wordt als geheel
              verkleind, zoals het scherm boven aan de homepage. Beeld bouwt het op een telefoon om tot een
              smalle versie. */}
          <figure className="lp-beeld lp-beeld-scherm a2-scherm">
            <div className="a2-scherm-stage" role="img" aria-label="Het scherm Alle bedrijven van een bureau: twaalf klanten onder elkaar met hun zichtbaarheid in AI, de maandmeting, wat er te starten is, wat er wacht en sinds wanneer, en de kosten van de afgelopen dertig dagen. Vier klanten zijn aangevinkt om de maand tegelijk te starten.">
              <div className="a2-scherm-frame" aria-hidden="true"><AlleKlanten /></div>
            </div>
            <figcaption className="lp-caption">
              <h3>{beeld.titel}</h3>
              <p>{beeld.tekst}</p>
            </figcaption>
          </figure>
        </section>

        {/* Tussenzin zoals op de homepage */}
        <div className="home-statement a2-statement">
          <CitaatScroll strong={statement.strong} rest={statement.rest} />
        </div>

        {/* Twee secties: illustratie en tekst naast elkaar, de tweede gespiegeld */}
        {secties.map((sec, i) => (
          <section key={sec.id} id={sec.id} className="a2-split" data-spiegel={i === 1 || undefined} aria-labelledby={`${sec.id}-titel`}>
            <div className="a2-split-beeld" role="img" aria-label={i === 0
              ? 'Het tabblad Kosten van een bureau: deze maand € 158,60 van een limiet van € 250, volgende maand ongeveer € 164, en de kosten per bedrijf, van € 24,60 voor Lindeman Warmte tot € 13,10 voor Kringloop De Ruil. Ervoor de schatting bij Start de maand: 20 pagina’s voor 4 bedrijven, ongeveer € 11,80.'
              : 'Hetzelfde werkoverzicht drie keer, in de huisstijl van drie bureaus: donker met blauw, donker met turquoise en licht met oranje.'}>
              <div className={`a2-split-inner a2-split-inner-${sec.id}`} aria-hidden="true">
                {i === 0 ? <GripOpKosten /> : <Huisstijlen />}
              </div>
            </div>
            <div className="a2-split-tekst">
              <p className="a2-split-label">{sec.label}</p>
              <h2 id={`${sec.id}-titel`} className="a2-split-titel">{sec.titel}</h2>
              <p className="a2-split-p">{sec.tekst}</p>
              <ul className="a2-split-punten">
                {sec.punten.map((pt) => (
                  <li key={pt}>
                    <span className="usp-vink" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
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
