import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { AppFrame } from '@/components/home/AppFrame'
import { Faq } from '@/components/home/Faq'
import { DemoKnop } from '@/components/homepage1/DemoKnop'
import { DrieKeer, Maand, Telefoon, VanVraagNaarIdee, Vragen, Waarom, Wie } from '@/components/homepage2/Visuals'
import { aandacht, actie, afsluiter, faq, hero, interesse, noot, verlangen } from '@/content/homepage2'
import './homepage2.css'

// Testpagina: niet in het menu, niet in de sitemap en niet te indexeren. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: 'Orbit – Laat zien hoe AI over je klanten praat (test 2)' },
  description: hero.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const INTERESSE_BEELDEN = [<Vragen key="v" />, <Wie key="w" />, <Waarom key="h" />]

// Opbouw volgens AIDA. Aandacht: de vraag die de klant al stelt en waarom een screenshot geen antwoord
// is. Interesse: wat Orbit laat zien en hoe dat werk wordt. Verlangen: een maand met Orbit, een klant die
// zonder moeite meedoet, en de harde feiten. Actie: drie stappen, de laatste twijfels en de afsluiter.
export default function Homepage2() {
  return (
    <div className="home hp2">
      <section className="container home-hero">
        <h1 className="home-title">
          {hero.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <>{' '}<br /></>}
              <span className="blur-in" style={{ '--i': i } as React.CSSProperties}>{line}</span>
            </Fragment>
          ))}
        </h1>
        <div className="home-hero-row">
          <p className="home-hero-description blur-in" style={{ '--i': 2 } as React.CSSProperties}>{hero.description}</p>
          <DemoKnop className="home-new-link">
            <span className="home-new blur-in" style={{ '--i': 3 } as React.CSSProperties}>
              <span className="home-new-label">{hero.link.label}</span>
              <span className="home-new-title">{hero.link.titel} <span className="pijl" aria-hidden="true">→</span></span>
            </span>
          </DemoKnop>
        </div>
      </section>

      <div className="hero-stage">
        <div className="hero-backdrop" />
        <div className="hero-frame-wrapper">
          <AppFrame />
        </div>
      </div>

      <div className="container">
        <p className="hp2-noot">{noot}</p>

        {/* Aandacht */}
        <section className="hp2-blok hp2-aandacht" aria-labelledby="aandacht-titel">
          <div className="hp2-kop hp2-kop-midden">
            <h2 id="aandacht-titel">{aandacht.titel}</h2>
            <p>{aandacht.tekst}</p>
          </div>
          <Vlak alt={`Voorbeeld: drie keer dezelfde vraag aan ChatGPT binnen drie minuten. De eerste keer staat Dakwerken Molenaar op plek drie, de tweede keer ontbreekt het, de derde keer staat het op plek twee.`}>
            <DrieKeer />
          </Vlak>
        </section>

        {/* Interesse */}
        <section className="hp2-blok" aria-labelledby="interesse-titel">
          <div className="keyline" />
          <div className="hp2-kop">
            <h2 id="interesse-titel">{interesse.titel}</h2>
            <p>{interesse.tekst}</p>
          </div>
          <ul className="hp2-drie">
            {interesse.kaarten.map((k, i) => (
              <li key={k.titel}>
                <div className="hp2-drie-beeld" role="img" aria-label={`Voorbeeld bij ${k.titel.toLowerCase()}`}>
                  <div aria-hidden="true">{INTERESSE_BEELDEN[i]}</div>
                </div>
                <h3>{k.titel}</h3>
                <p>{k.tekst}</p>
              </li>
            ))}
          </ul>

          <div className="hp2-rij">
            <div className="hp2-rij-tekst">
              <h3>{interesse.kans.titel}</h3>
              <p>{interesse.kans.tekst}</p>
            </div>
            <Vlak alt="Voorbeeld: de gemiste vraag over een dakdekker met spoedservice, waarbij Dakwerken Molenaar in 0 van 10 antwoorden staat, wordt het pagina-idee Spoedreparatie van een plat dak in Zwolle, klaar om in november in te plannen.">
              <VanVraagNaarIdee />
            </Vlak>
          </div>
        </section>

        {/* Verlangen */}
        <section className="hp2-blok" aria-labelledby="maand-titel">
          <div className="keyline" />
          <div className="hp2-kop">
            <h2 id="maand-titel">{verlangen.maand.titel}</h2>
            <p>{verlangen.maand.tekst}</p>
          </div>
          <Maand momenten={verlangen.maand.momenten} />
          <p className="hp2-voetnoot">Voorbeeld van een maand. Jij bepaalt het tempo en de data.</p>

          <div className="hp2-rij hp2-rij-klant">
            <Vlak smal alt="Voorbeeld: op een telefoon beantwoordt de ondernemer een vraag van Bureau Lumen over hoe snel ze bij een lekkage ter plaatse zijn, zonder account.">
              <Telefoon />
            </Vlak>
            <div className="hp2-rij-tekst">
              <h3>{verlangen.klant.titel}</h3>
              <p>{verlangen.klant.tekst}</p>
              <ul className="hp2-streep">
                {verlangen.klant.punten.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </div>

          <div className="hp2-feiten">
            <h3 className="hp2-feiten-titel">{verlangen.feiten.titel}</h3>
            <dl>
              {verlangen.feiten.lijst.map((f) => (
                <div key={f.label}><dt>{f.getal}</dt><dd>{f.label}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        {/* Actie */}
        <section className="hp2-blok" aria-labelledby="actie-titel">
          <div className="keyline" />
          <div className="hp2-kop">
            <h2 id="actie-titel">{actie.titel}</h2>
            <p>{actie.tekst}</p>
          </div>
          <ol className="hp2-stappen">
            {actie.stappen.map((s, i) => (
              <li key={s.titel}>
                <span className="hp2-stap-nr">{i + 1}</span>
                <h3>{s.titel}</h3>
                <p>{s.tekst}</p>
              </li>
            ))}
          </ol>
          <div className="hp2-actie-knoppen">
            <DemoKnop className="btn btn-lg btn-invert">{actie.knop}</DemoKnop>
            <Link href={actie.tweede.href} className="btn btn-lg btn-secondary">{actie.tweede.label}</Link>
          </div>
        </section>

        <section className="home-block" aria-labelledby="hp2-faq">
          <div className="keyline" />
          <h2 id="hp2-faq" className="home-block-title">{faq.title}</h2>
          <Faq items={faq.items} />
        </section>
      </div>

      <section className="home-prefooter container hp2-afsluiter" aria-labelledby="hp2-afsluiter">
        <CtaAchtergrond />
        <h2 id="hp2-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}

// Het vlak om een beeld: lichtval van boven en klein rechtsonder dat het een voorbeeld is.
function Vlak({ alt, smal = false, children }: { alt: string; smal?: boolean; children: React.ReactNode }) {
  return (
    <figure className={`hp2-vlak${smal ? ' hp2-vlak-smal' : ''}`}>
      <div className="hp2-vlak-stage" role="img" aria-label={alt}>
        <div className="hp2-vlak-inner" aria-hidden="true">{children}</div>
      </div>
      <figcaption className="hp2-vlak-noot">Voorbeeld</figcaption>
    </figure>
  )
}
