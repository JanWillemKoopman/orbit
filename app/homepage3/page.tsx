import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { DemoKnop } from '@/components/homepage1/DemoKnop'
import { MerkIcoon } from '@/components/homepage1/Visuals'
import { EffectKaart, HeroScherm, KlantCel, MiniGrafiek, MiniPagina, MiniPitch, Ontwikkeling, PaginaCompositie, PitchCompositie, PlanCel, WerkoverzichtCompositie } from '@/components/homepage3/Visuals'
import { afsluiter, content, contentCellen, effect, effectCijfer, hero, kanalen, kostenNoot, pakket, schalen, spelregels, verkopen, voorbeelddata, type Onderdeel, type Sectie as SectieTekst } from '@/content/homepage3'
import './homepage3.css'

// Testpagina: niet in het menu, niet in de sitemap en niet te indexeren. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: 'Orbit – Het complete GEO-pakket voor marketingbureaus (test 3)' },
  description: hero.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

const MINI = [MiniPitch, MiniPagina, MiniGrafiek]

// Opbouw: een hero met één scherm en één geopende vraag; het pakket als statement met drie kleine schermen;
// vier secties die beginnen bij wat het bureau wint, elk met een andere compositie (een uitsnede met een
// melding, een groot venster met twee cellen, een open grafiek, een tabel met een detailpaneel); de
// spelregels van het product in plaats van citaten; en een rustige afsluiter. De functies staan onder de plusjes.
export default function Homepage3() {
  return (
    <div className="home hp3">
      <section className="hp3-held" aria-labelledby="hp3-titel">
        <div className="container">
          <h1 id="hp3-titel" className="home-title hp3-held-titel">
            {hero.title.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <>{' '}<br /></>}
                <span className="blur-in" style={{ '--i': i } as React.CSSProperties}>{line}</span>
              </Fragment>
            ))}
          </h1>
          <div className="hp3-held-rij blur-in" style={{ '--i': 2 } as React.CSSProperties}>
            <p className="hp3-held-tekst">{hero.description}</p>
            <div className="hp3-held-acties">
              <DemoKnop className="btn btn-invert">{hero.knop}</DemoKnop>
              <a href={hero.link.href} className="home-link">{hero.link.label} <span className="pijl" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <div className="hp3-held-podium">
          <figure className="hp3-held-figuur">
            <div role="img" aria-label="Voorbeeld: het scherm Zichtbaarheid in AI van Brouwer Kozijnen, een klant van Bureau Kade. De gewogen zichtbaarheid is 31 procent met een marge van 7. De vraag wat een kunststof kozijn in Haarlem kost, is geopend: geen van de drie assistenten noemt Brouwer, alle drie noemen KozijnPlus. Orbit stelt een nieuwe pagina voor met prijzen, die je op het contentplan zet.">
              <div aria-hidden="true"><HeroScherm /></div>
            </div>
            <figcaption className="hp3-voorbeeld">{voorbeelddata}</figcaption>
          </figure>
        </div>
      </section>

      <div className="container">
        <div className="hp3-kanalen">
          <span className="hp3-kanalen-label">{kanalen.label}</span>
          <ul aria-label="AI-assistenten die Orbit meet">
            <li><MerkIcoon merk="chatgpt" size={18} />ChatGPT</li>
            <li><MerkIcoon merk="gemini" size={18} />Gemini</li>
            <li><MerkIcoon merk="google" size={18} />AI-overzicht van Google</li>
          </ul>
          <span className="hp3-kanalen-label">{kanalen.extra}</span>
        </div>

        <section className="hp3-pakket" aria-labelledby="hp3-pakket">
          <h2 id="hp3-pakket" className="hp3-statement"><strong>{pakket.sterk}</strong> {pakket.rest}</h2>
          <ul className="hp3-diensten">
            {pakket.diensten.map((d, i) => {
              const Mini = MINI[i]
              return (
                <li key={d.naam}>
                  <a href={d.href} className="hp3-dienst">
                    <span className="hp3-dienst-beeld" aria-hidden="true"><Mini /></span>
                    <span className="hp3-dienst-naam">{d.naam}<em>{d.ritme}</em></span>
                    <span className="hp3-dienst-tekst">{d.tekst}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>

        <Sectie s={verkopen}>
          <Podium alt="Voorbeeld: de pitch van Bureau Kade voor Brouwer Kozijnen, in de huisstijl van het bureau. Bij 10 vragen over kunststof kozijnen raadt ChatGPT KozijnPlus het vaakst aan, in 70 procent van de antwoorden. Brouwer Kozijnen staat op plek vier met 20 procent. Een melding bij het bureau zegt dat de pitch zojuist geopend is." variant="pitch">
            <PitchCompositie />
          </Podium>
        </Sectie>

        <Sectie
          s={content}
          na={
            <div className="hp3-cellen">
              <figure className="hp3-cel">
                <div className="hp3-cel-stage" role="img" aria-label="Voorbeeld: het contentplan van november met vijf van de tien pagina's en per pagina zijn stand, zoals Lees en keur goed, Wordt geschreven en Jouw antwoorden nodig."><div aria-hidden="true"><PlanCel /></div></div>
                <figcaption><h3>{contentCellen[0].titel}</h3><p>{contentCellen[0].tekst}</p></figcaption>
              </figure>
              <figure className="hp3-cel">
                <div className="hp3-cel-stage" role="img" aria-label="Voorbeeld: de ondernemer beantwoordt via een link de vraag wat een kunststof kozijn kost, inclusief montage, zonder account."><div aria-hidden="true"><KlantCel /></div></div>
                <figcaption><h3>{contentCellen[1].titel}</h3><p>{contentCellen[1].tekst}</p></figcaption>
              </figure>
            </div>
          }
        >
          <Podium alt="Voorbeeld: de pagina Wat kosten nieuwe kozijnen? in de stand Lees en keur goed. De prijs komt uit een antwoord van het bedrijf. De zin over vijftien jaar garantie is geel, omdat er geen bron voor is, en de pagina kan pas worden goedgekeurd als die zin bevestigd is. Rechts staat waarom de pagina er is." variant="pagina">
            <PaginaCompositie />
          </Podium>
        </Sectie>

        <div className="hp3-tussen">
          <p>Zie in 15 minuten hoe Orbit van meting tot geschreven pagina werkt.</p>
          <DemoKnop className="btn btn-invert">Plan een gratis demo</DemoKnop>
        </div>

        <Sectie s={effect}>
          <figure className="hp3-open">
            <div className="hp3-open-grafiek" role="img" aria-label="Voorbeeld: de zichtbaarheid van Brouwer Kozijnen in AI per maand, van 12 procent in juni naar 31 procent in november, met een marge die van 13 naar 7 procentpunt kleiner wordt. Op 3 oktober ging de pagina over kunststof kozijnen laten plaatsen live.">
              <div className="hp3-open-kop" aria-hidden="true">
                <span className="hp3-open-titel">{effectCijfer.titel}</span>
                <span className="hp3-open-sub">{effectCijfer.sub}</span>
              </div>
              <div aria-hidden="true"><Ontwikkeling /><Ontwikkeling smal /></div>
            </div>
            <div className="hp3-open-kaart" role="img" aria-label="Voorbeeld: van de 8 vragen waarvoor de pagina geschreven is, noemde AI Brouwer Kozijnen er vóór publicatie 1, na 14 dagen 3 en na 28 dagen 5. Het oordeel is Vaker genoemd: de stijging is groter dan toeval, al kan een algemene verschuiving in AI-antwoorden meespelen.">
              <div aria-hidden="true"><EffectKaart /></div>
            </div>
            <figcaption className="hp3-voorbeeld hp3-voorbeeld-open">{voorbeelddata}</figcaption>
          </figure>
        </Sectie>

        <Sectie s={schalen} noot={kostenNoot}>
          <Podium alt="Voorbeeld: het werkoverzicht van Bureau Kade met zes bedrijven, gesorteerd op wat het langst wacht. Bovenaan staat Fietsenmaker De Spaak, waar al 9 dagen 3 vragen bij de klant openstaan. Het paneel ernaast toont die vragen met de knop Kopieer deellink, en dat december klaarstaat om te starten." variant="werk">
            <WerkoverzichtCompositie />
          </Podium>
        </Sectie>

        <section className="hp3-regels" aria-labelledby="hp3-regels">
          <div className="keyline" />
          <div className="hp3-regels-raster">
            <div className="hp3-regels-intro">
              <h2 id="hp3-regels" className="feature-title">{spelregels.titel}</h2>
              <p>{spelregels.tekst}</p>
              <p className="hp3-maker">{spelregels.maker.tekst} <Link href={spelregels.maker.link.href} className="home-link">{spelregels.maker.link.label} <span className="pijl" aria-hidden="true">→</span></Link></p>
            </div>
            <dl className="hp3-regels-lijst">
              {spelregels.regels.map((r) => (
                <div key={r.naam}><dt>{r.naam}</dt><dd>{r.tekst}</dd></div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      <section className="hp3-slot" aria-labelledby="hp3-slot">
        <div className="container">
          <h2 id="hp3-slot">{afsluiter.title[0]}{' '}<br />{afsluiter.title[1]}</h2>
          <p>{afsluiter.tekst}</p>
          <div className="home-prefooter-actions">
            <PrefooterKnoppen />
          </div>
          <ul className="hp3-start-lijst">
            {afsluiter.start.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </section>
    </div>
  )
}

/** Een sectie zoals op linear.app: titel links, uitleg rechts, het beeld, en de onderdelen eronder. */
function Sectie({ s, noot, na, children }: { s: SectieTekst; noot?: string; na?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={s.id} className="hp3-sectie" aria-labelledby={`${s.id}-titel`}>
      <div className="keyline" />
      <div className="feature-header hp3-intro">
        <h2 id={`${s.id}-titel`} className="feature-title">{s.titel}</h2>
        <div className="feature-description">
          <p>{s.tekst}</p>
          {s.link && <Link href={s.link.href} className="home-link">{s.link.label} <span className="pijl" aria-hidden="true">→</span></Link>}
        </div>
      </div>
      {children}
      {na}
      <Onderdelen items={s.onderdelen} />
      {noot && <p className="hp3-sectie-noot">{noot}</p>}
    </section>
  )
}

/** Het vlak om een compositie: lichtval van boven, perifere delen vervagen onderaan. */
function Podium({ alt, variant, children }: { alt: string; variant: string; children: React.ReactNode }) {
  return (
    <figure className="hp3-podium" data-variant={variant}>
      <div className="hp3-podium-stage" role="img" aria-label={alt}>
        <div className="hp3-podium-inner" aria-hidden="true">{children}</div>
      </div>
      <figcaption className="hp3-voorbeeld">{voorbeelddata}</figcaption>
    </figure>
  )
}

/** De onderdelen onder een sectie: een naam met een plus die openklapt tot één zin uitleg. */
function Onderdelen({ items }: { items: Onderdeel[] }) {
  const helft = Math.ceil(items.length / 2)
  return (
    <div className="hp3-onderdelen">
      <p className="hp3-onderdelen-label">Zo doet Orbit het</p>
      <div className="hp3-onderdelen-kolommen">
        {[items.slice(0, helft), items.slice(helft)].map((kolom, i) => (
          <ul key={i}>
            {kolom.map((o) => (
              <li key={o.naam}>
                <details className="hp3-onderdeel">
                  <summary>{o.naam}<span className="hp3-plus" aria-hidden="true">+</span></summary>
                  <p>{o.tekst}</p>
                </details>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
