import type { Metadata } from 'next'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { Intro, PaginaHero, Raster, RasterCel, Sectie } from '@/components/product/Blokken'
import { Icon } from '@/components/product/ui'
import { AlleKlanten, GripOpKosten, Huisstijlen, HuisstijlVertaald, KijkerInHuisstijl, KlantDoetMee } from '@/components/agencies/Visuals'
import { DemoLink } from '@/components/agencies/DemoLink'
import { CitaatScroll } from '@/components/home/CitaatScroll'
import { afsluiter, hero, meta, overzicht, secties, statement, usp, verder, whitelabel } from '@/content/agencies'
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

const Vink = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>
)

// Opbouw naar linear.app. Het verhaal: je klanten vragen al naar AI-zichtbaarheid, maak er een vaste dienst
// van onder je eigen naam. Daarna één sectie per reden waarom Orbit voor een bureau is gemaakt: white label
// (groot beeld en twee cellen), al je klanten in één overzicht (groot scherm), een tussenzin, je klant doet
// mee en je marge (illustratie en tekst naast elkaar), een raster met wat er verder geregeld is en de
// afsluiter. Hoe een maand verloopt, staat op /werkwijze en wordt hier niet herhaald.
export default function AgenciesPage() {
  return (
    <div className="home lp a2 a3">
      <PaginaHero eyebrow={hero.eyebrow} titel={hero.title} video="hero-agencies" vierkantMobiel />

      <div className="container">
        {/* De kern van het aanbod: kop, alinea met een link naar de demo en vier voordelen */}
        <section className="feature process usp a2-usp" aria-labelledby="a3-usp-titel">
          <div className="feature-header">
            <h2 id="a3-usp-titel" className="feature-title">{usp.titel}</h2>
            <div className="feature-description">
              <p>{usp.tekst}</p>
              <DemoLink label={usp.demo} />
            </div>
          </div>
          <ul className="process-steps usp-steps">
            {usp.punten.map((punt) => (
              <li className="process-step" key={punt.titel}>
                <span className="process-number usp-vink" aria-hidden="true"><Vink /></span>
                <h3 className="process-title">
                  <span className="usp-kort">{punt.kort}</span>
                  <span className="usp-lang">{punt.titel}</span>
                </h3>
                <p className="process-description usp-uitleg">{punt.uitleg}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* White label: het grote beeld met drie huisstijlen, daaronder hoe het tot stand komt en wat de klant ziet */}
        <Sectie id={whitelabel.id}>
          <Intro id={whitelabel.id} titel={whitelabel.titel} tekst={whitelabel.tekst} label={whitelabel.label} />
          <figure className="lp-beeld lp-beeld-scherm a3-wl">
            <div className="a3-wl-stage" role="img" aria-label={whitelabel.beeld.alt}>
              <div className="a3-wl-frame" aria-hidden="true"><Huisstijlen /></div>
            </div>
            <figcaption className="lp-caption">
              <h3>{whitelabel.beeld.titel}</h3>
              <p>{whitelabel.beeld.tekst}</p>
            </figcaption>
          </figure>
          <Raster>
            {whitelabel.cellen.map((cel, i) => (
              <RasterCel key={cel.titel} b={cel} alt={cel.alt}>
                {i === 0 ? <HuisstijlVertaald /> : <KijkerInHuisstijl />}
              </RasterCel>
            ))}
          </Raster>
        </Sectie>

        {/* Al je klanten in één overzicht: het scherm houdt op elke breedte zijn opbouw en wordt als geheel verkleind */}
        <Sectie id={overzicht.id}>
          <Intro id={overzicht.id} titel={overzicht.titel} tekst={overzicht.tekst} link={overzicht.link} label={overzicht.label} />
          <figure className="lp-beeld lp-beeld-scherm a2-scherm">
            <div className="a2-scherm-stage" role="img" aria-label={overzicht.beeld.alt}>
              <div className="a2-scherm-frame" aria-hidden="true"><AlleKlanten /></div>
            </div>
            <figcaption className="lp-caption">
              <h3>{overzicht.beeld.titel}</h3>
              <p>{overzicht.beeld.tekst}</p>
            </figcaption>
          </figure>
        </Sectie>

        {/* Tussenzin zoals op de homepage */}
        <div className="home-statement a2-statement">
          <CitaatScroll strong={statement.strong} rest={statement.rest} />
        </div>

        {/* Twee secties: illustratie en tekst naast elkaar, de tweede gespiegeld */}
        {secties.map((sec, i) => (
          <section key={sec.id} id={sec.id} className="a2-split" data-spiegel={i === 1 || undefined} aria-labelledby={`${sec.id}-titel`}>
            <div className="a2-split-beeld" role="img" aria-label={sec.alt}>
              <div className={`a2-split-inner a2-split-inner-${sec.id}`} aria-hidden="true">
                {i === 0 ? <KlantDoetMee /> : <GripOpKosten />}
              </div>
            </div>
            <div className="a2-split-tekst">
              <p className="a2-split-label">{sec.label}</p>
              <h2 id={`${sec.id}-titel`} className="a2-split-titel">{sec.titel}</h2>
              <p className="a2-split-p">{sec.tekst}</p>
              <ul className="a2-split-punten">
                {sec.punten.map((pt) => (
                  <li key={pt}>
                    <span className="usp-vink" aria-hidden="true"><Vink /></span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* Wat er verder voor een bureau geregeld is: zes korte punten in een raster */}
        <Sectie id={verder.id}>
          <Intro id={verder.id} titel={verder.titel} tekst={verder.tekst} />
          <ul className="a3-grid">
            {verder.punten.map((punt) => (
              <li key={punt.titel}>
                <span className="a3-grid-icoon" aria-hidden="true"><Icon naam={punt.icoon} size={16} /></span>
                <h3>{punt.titel}</h3>
                <p>{punt.tekst}</p>
              </li>
            ))}
          </ul>
        </Sectie>
      </div>

      {/* Afsluiter */}
      <section className="home-prefooter container pd-afsluiter" aria-labelledby="a3-afsluiter">
        <CtaAchtergrond />
        <h2 id="a3-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}
