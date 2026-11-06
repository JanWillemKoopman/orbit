import type { Metadata } from 'next'
import { AiLogos } from '@/components/home/AiLogos'
import { uspIntro, usps } from '@/content/home'
import './usp-varianten.css'

export const metadata: Metadata = {
  title: 'Voorbeelden: vier voordelen voor bureaus',
  robots: { index: false, follow: false },
}

// Vier alternatieven voor het blok 'Gebouwd voor marketingbureaus' op de homepage, onder elkaar om te
// vergelijken. Alleen een voorbeeldpagina: de homepage zelf is niet aangepast.

// Korte titels (variant B) en een korte uitleg per voordeel (B, C en D). Voorlopige tekst, ter illustratie.
const kort = ['Een vaste dienst', 'Zichtbare vooruitgang', 'Tijd voor strategie', 'Alle klanten op één plek']
const uitleg = [
  'Meten, schrijven en hermeten als maandelijkse ronde die je per klant aanbiedt.',
  'Elke hermeting laat je klant zien hoe vaak AI hem noemt en wat er veranderd is.',
  'Orbit doet het uitzoek- en schrijfwerk. Je specialisten sturen bij en adviseren.',
  'Merken, metingen en content van al je klanten in één overzicht.',
]

function Vink() {
  return (
    <span className="process-number usp-vink" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>
    </span>
  )
}

function Label({ letter, naam }: { letter: string; naam: string }) {
  return <p className="uv-label"><span>Variant {letter}</span> {naam}</p>
}

function Kop({ id, children }: { id: string; children?: React.ReactNode }) {
  return (
    <div className="feature-header">
      <h2 id={id} className="feature-title">{uspIntro.title}</h2>
      <div className="feature-description">
        <p>{uspIntro.description}</p>
        {children}
      </div>
    </div>
  )
}

export default function UspVariantenPage() {
  return (
    <div className="home uv">
      <div className="container">
        <nav className="uv-nav" aria-label="Varianten">
          <a href="#a">A · Lijst onder de uitleg</a>
          <a href="#b">B · Korte titels met uitleg</a>
          <a href="#c">C · Vier kaarten</a>
          <a href="#d">D · Rijen op het raster</a>
        </nav>

        <AiLogos />

        {/* A: de voordelen als compacte checklist in de rechterkolom, onder de uitleg. Eén regel per voordeel. */}
        <section id="a" className="feature process usp uv-sectie" aria-labelledby="uv-a">
          <div className="keyline" />
          <Label letter="A" naam="Lijst onder de uitleg" />
          <Kop id="uv-a">
            <ul className="uv-lijst">
              {usps.map((usp) => (
                <li key={usp}><Vink />{usp}</li>
              ))}
            </ul>
          </Kop>
        </section>

        {/* B: vier kolommen zoals nu, maar met korte titels die op één regel passen en een regel uitleg eronder. */}
        <section id="b" className="feature process usp uv-sectie" aria-labelledby="uv-b">
          <div className="keyline" />
          <Label letter="B" naam="Korte titels met uitleg" />
          <Kop id="uv-b" />
          <ul className="process-steps usp-steps uv-kolommen">
            {kort.map((titel, i) => (
              <li className="process-step" key={titel}>
                <Vink />
                <h3 className="process-title">{titel}</h3>
                <p className="process-description">{uitleg[i]}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* C: twee bij twee kaarten met een vinkje, titel en uitleg. Breed genoeg om elke titel op één regel te houden. */}
        <section id="c" className="feature process usp uv-sectie" aria-labelledby="uv-c">
          <div className="keyline" />
          <Label letter="C" naam="Vier kaarten" />
          <Kop id="uv-c" />
          <ul className="uv-kaarten">
            {usps.map((usp, i) => (
              <li className="uv-kaart" key={usp}>
                <Vink />
                <h3>{usp}</h3>
                <p>{uitleg[i]}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* D: rijen over de volle breedte, op hetzelfde raster als de kop: titel links, uitleg rechts. */}
        <section id="d" className="feature process usp uv-sectie" aria-labelledby="uv-d">
          <div className="keyline" />
          <Label letter="D" naam="Rijen op het raster" />
          <Kop id="uv-d" />
          <ol className="uv-rijen">
            {usps.map((usp, i) => (
              <li className="uv-rij" key={usp}>
                <h3><span className="uv-nummer">{String(i + 1).padStart(2, '0')}</span>{usp}</h3>
                <p>{uitleg[i]}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
