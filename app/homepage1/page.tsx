import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { CtaAchtergrond } from '@/components/CtaAchtergrond'
import { PrefooterKnoppen } from '@/components/PrefooterKnoppen'
import { AppFrame } from '@/components/home/AppFrame'
import { Faq } from '@/components/home/Faq'
import { DemoKnop } from '@/components/homepage1/DemoKnop'
import { FotoPlek } from '@/components/homepage1/FotoPlek'
import { DienstKaart, DrieAntwoorden, Effect, Icoon, Kringloop, MerkIcoon, Meting, Pitch, Vangnet, Voorbeeld, Werkoverzicht } from '@/components/homepage1/Visuals'
import { afsluiter, bewijzen, bureau, diensten, faq, hero, kanalen, maker, meten, oplevert, pitch, probleem, schrijven, werkwijze } from '@/content/homepage1'
import './homepage1.css'

// Testpagina: niet in het menu, niet in de sitemap en niet te indexeren. noindex is geen beveiliging.
export const metadata: Metadata = {
  title: { absolute: 'Orbit – AI-zichtbaarheid als dienst voor marketingbureaus (test)' },
  description: hero.description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
}

// Opbouw: de hero van de homepage met nieuwe tekst, daarna het verhaal van probleem naar actie. Elke sectie
// beantwoordt één vraag van een bureau: wat is er aan de hand, wat verkoop ik ermee, hoe werkt het, klopt de
// meting, kan ik de teksten vertrouwen, hoe laat ik resultaat zien, wat levert het op, hoe win ik klanten,
// werkt het voor al mijn klanten en wat kost het, wie zit erachter. Daarna de bezwaren en de afsluiter.
export default function Homepage1() {
  return (
    <div className="home hp1">
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
        {/* Waar Orbit meet, en dat de schermen voorbeelden zijn */}
        <div className="hp1-kanalen">
          <span className="hp1-kanalen-label">{kanalen.label}</span>
          <ul aria-label="AI-assistenten die Orbit meet">
            <li><MerkIcoon merk="chatgpt" size={20} />ChatGPT</li>
            <li><MerkIcoon merk="gemini" size={20} />Gemini</li>
            <li><MerkIcoon merk="google" size={20} />AI-overzicht van Google</li>
          </ul>
          <p className="hp1-kanalen-noot">{kanalen.voorbeeld}</p>
        </div>

        {/* 1. Het probleem */}
        <Sectie id="probleem" label="Waarom nu" titel={probleem.titel} tekst={probleem.tekst}>
          <Podium alt="Voorbeeld: op de vraag welk bedrijf in Amersfoort betrouwbaar zonnepanelen installeert, noemen ChatGPT en het AI-overzicht van Google Hofstede Zonnepanelen niet. Gemini noemt het op plek twee.">
            <DrieAntwoorden />
          </Podium>
          <ul className="hp1-punten">
            {probleem.punten.map((p) => (
              <li key={p.titel}><h3>{p.titel}</h3><p>{p.tekst}</p></li>
            ))}
          </ul>
        </Sectie>

        {/* 2. Wat een bureau ermee verkoopt */}
        <Sectie id="diensten" label="Je dienstverlening" titel={diensten.titel} tekst={diensten.tekst}>
          <ol className="hp1-diensten">
            {diensten.lijst.map((d, i) => <DienstKaart key={d.naam} nummer={i + 1} {...d} />)}
          </ol>
        </Sectie>

        {/* 3. Hoe het werkt */}
        <Sectie id="werkwijze" label="Zo werkt het" titel={werkwijze.titel} tekst={werkwijze.tekst}>
          <Kringloop stappen={werkwijze.stappen} />
          <div className="hp1-start">
            <h3>{werkwijze.start.titel}</h3>
            <ol>
              {werkwijze.start.stappen.map((s, i) => (
                <li key={s.titel}>
                  <span className="hp1-mono">{s.tijd}</span>
                  <strong>{i + 1}. {s.titel}</strong>
                  <p>{s.tekst}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="hp1-cta">
            <p>{werkwijze.cta.titel}</p>
            <div className="hp1-cta-knoppen">
              <DemoKnop className="btn btn-invert">Plan een gratis demo</DemoKnop>
              <Link href={werkwijze.cta.link.href} className="btn btn-secondary">{werkwijze.cta.link.label}</Link>
            </div>
          </div>
        </Sectie>

        {/* 4. De meting */}
        <Sectie id="meten" label="Meten" titel={meten.titel} tekst={meten.tekst} link={meten.link}>
          <Podium bijschrift={meten.beeld} alt="Voorbeeld: de gewogen zichtbaarheid van Hofstede Zonnepanelen steeg van 16 procent in mei naar 34 procent in oktober, met een marge van 6 procentpunt. Bij oriëntatievragen wordt het bedrijf 6 van 10 keer genoemd, bij beslisvragen 1 van 10 keer.">
            <Meting />
          </Podium>
        </Sectie>

        {/* 5. Schrijven met vangnet */}
        <Sectie id="schrijven" label="Schrijven" titel={schrijven.titel} tekst={schrijven.tekst} link={schrijven.link}>
          <Podium bijschrift={schrijven.beeld} alt="Voorbeeld: een pagina over thuisbatterijen. Twee beweringen hebben een bron. De zin over tien jaar garantie is geel, omdat er geen bron voor is. Goedkeuren kan pas als die zin bevestigd is.">
            <Vangnet />
          </Podium>
        </Sectie>

        {/* 6. Bewijzen */}
        <Sectie id="bewijzen" label="Bewijzen" titel={bewijzen.titel} tekst={bewijzen.tekst}>
          <Podium bijschrift={bewijzen.beeld} alt="Voorbeeld: de pagina over thuisbatterijen werd vóór publicatie bij 1 van 8 vragen genoemd, na 28 dagen bij 5. Daarnaast het verslag van september van Bureau Meridiaan voor Hofstede Zonnepanelen.">
            <Effect />
          </Podium>
        </Sectie>

        {/* 7. Wat het oplevert, voor het bureau en voor de klant */}
        <Sectie id="oplevert" label="Wat het oplevert" titel={oplevert.titel} tekst={oplevert.tekst}>
          <div className="hp1-oplevert">
            {[oplevert.bureau, oplevert.klant].map((kant) => (
              <div className="hp1-kant" key={kant.kop}>
                <h3>{kant.kop}</h3>
                <ul>
                  {kant.punten.map((p) => (
                    <li key={p}><span className="hp1-vink"><Icoon naam="check" size={12} /></span>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
            <FotoPlek
              wat="Een accountmanager van een bureau bespreekt het maandverslag met een ondernemer"
              maat="Staand, 3:4, minimaal 900 × 1200 px. Echte mensen, rustig licht, geen stockgevoel."
              verhouding="3 / 4"
              referentie="de foto bij Know how AI talks about your brand op temso.ai"
            />
          </div>
        </Sectie>

        {/* 8. Klanten winnen */}
        <Sectie id="pitch" label="Klanten winnen" titel={pitch.titel} tekst={pitch.tekst}>
          <div className="hp1-split">
            <div className="hp1-split-tekst">
              <ul className="hp1-checks">
                {pitch.punten.map((p) => (
                  <li key={p}><span className="hp1-vink"><Icoon naam="check" size={12} /></span>{p}</li>
                ))}
              </ul>
              <p className="hp1-split-noot">{pitch.vervolg}</p>
            </div>
            <Podium alt="Voorbeeld: een pitch van Bureau Meridiaan voor Studio Lente. Bij 8 van de 10 vragen raadt ChatGPT een ander bedrijf aan, met het letterlijke antwoord en de grootste kansen. Een melding zegt dat Studio Lente de pitch zojuist opende.">
              <Pitch />
            </Podium>
          </div>
        </Sectie>

        {/* 9. Werken voor al je klanten, en de kosten */}
        <Sectie id="bureau" label="Voor je bureau" titel={bureau.titel} tekst={bureau.tekst} link={bureau.link}>
          <Podium bijschrift={bureau.beeld} alt="Voorbeeld: het werkoverzicht van Bureau Meridiaan met vijf klanten, hun zichtbaarheid, waar ze op wachten en wat ze de laatste dertig dagen kostten. Van de maandlimiet van 200 euro is 61 euro gebruikt.">
            <Werkoverzicht />
          </Podium>
          <ul className="hp1-tegels">
            {bureau.tegels.map((t) => (
              <li key={t.titel}>
                <span className="hp1-tegel-icoon"><Icoon naam={t.icoon} size={16} /></span>
                <h3>{t.titel}</h3>
                <p>{t.tekst}</p>
              </li>
            ))}
          </ul>
          <Link href={bureau.prijzen.href} className="home-link hp1-prijslink">{bureau.prijzen.label} <span className="pijl" aria-hidden="true">→</span></Link>
        </Sectie>

        {/* 10. Wie erachter zit */}
        <Sectie id="maker" label="Over Orbit" titel={maker.titel} tekst={maker.tekst} link={maker.link}>
          <div className="hp1-maker">
            <FotoPlek
              wat="Portret van Jan-Willem Koopman, de maker van Orbit"
              maat="Staand, 4:5, minimaal 1000 × 1250 px. Op de werkplek, natuurlijk licht."
              verhouding="4 / 5"
              referentie="de portretten bij What people say about Temso op temso.ai"
            />
            <div className="hp1-maker-tekst">
              <ul className="hp1-principes">
                {maker.principes.map((p) => (
                  <li key={p.titel}><h3>{p.titel}</h3><p>{p.tekst}</p></li>
                ))}
              </ul>
              <p className="hp1-eerlijk">{maker.eerlijk}</p>
            </div>
          </div>
        </Sectie>

        <section className="home-block" aria-labelledby="hp1-faq">
          <div className="keyline" />
          <h2 id="hp1-faq" className="home-block-title">{faq.title}</h2>
          <Faq items={faq.items} />
        </section>
      </div>

      <section className="home-prefooter container pd-afsluiter hp1-afsluiter" aria-labelledby="hp1-afsluiter">
        <CtaAchtergrond />
        <h2 id="hp1-afsluiter">{afsluiter.title}</h2>
        <p>{afsluiter.description}</p>
        <div className="home-prefooter-actions">
          <PrefooterKnoppen />
        </div>
      </section>
    </div>
  )
}

function Sectie({ id, label, titel, tekst, link, children }: { id: string; label: string; titel: string; tekst: string; link?: { label: string; href: string }; children: React.ReactNode }) {
  return (
    <section id={id} className="hp1-sectie" aria-labelledby={`${id}-titel`}>
      <div className="keyline" />
      <div className="feature-header hp1-intro">
        <p className="hp1-sectie-label">{label}</p>
        <h2 id={`${id}-titel`} className="feature-title">{titel}</h2>
        <div className="feature-description">
          <p>{tekst}</p>
          {link && <Link href={link.href} className="home-link">{link.label} <span className="pijl" aria-hidden="true">→</span></Link>}
        </div>
      </div>
      {children}
    </section>
  )
}

// Het vlak waarin een beeld staat: lichtval van boven, het label Voorbeeld linksboven en eventueel een bijschrift.
function Podium({ alt, bijschrift, children }: { alt: string; bijschrift?: { titel: string; tekst: string }; children: React.ReactNode }) {
  return (
    <figure className="hp1-podium">
      <Voorbeeld />
      <div className="hp1-podium-stage" role="img" aria-label={alt}>
        <div className="hp1-podium-inner" aria-hidden="true">{children}</div>
      </div>
      {bijschrift && (
        <figcaption className="hp1-podium-bijschrift">
          <h3>{bijschrift.titel}</h3>
          <p>{bijschrift.tekst}</p>
        </figcaption>
      )}
    </figure>
  )
}
