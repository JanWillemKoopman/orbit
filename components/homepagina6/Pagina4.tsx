// De vierde pagina onderaan /homepagina6: tien ontwerpvarianten voor één sectie die de voordelen van Orbit
// voor bureaus opsomt. Elke variant staat los, met een label erboven, zodat de eigenaar er één kan kiezen.
// Alle varianten gebruiken dezelfde voordelen (content/homepagina6.ts) in dezelfde vormgeving: grijs, wit en
// limoengroen, dunne lijnen in plaats van zware kaders.
import { DemoKnop } from './Demo'
import { Icoon, type IcoonNaam } from './Visuals'
import { VoordelenTabs } from './VoordelenTabs'
import { feiten, rollen, vergelijking, voordelen, voorNa } from '@/content/homepagina6'

const nr = (i: number) => String(i + 1).padStart(2, '0')
const Vink = () => <svg className="p4-vink" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.75 8.25l2.75 2.75 5.75-6" /></svg>

// Een variant zonder `titel` krijgt een kop voor hulptechnologie, tenzij hij zelf een kop heeft (`eigenKop`).
function Variant({ n, naam, titel, intro, eigenKop = false, className = '', children }: { n: number; naam: string; titel?: string; intro?: string; eigenKop?: boolean; className?: string; children: React.ReactNode }) {
  const id = `p4-variant-${n}`
  return (
    <section className={`lf-sectie p4-variant ${className}`} aria-labelledby={id}>
      <div className="container">
        <p className="lf-mono p4-variant-label">Variant {nr(n - 1)} · {naam}</p>
        {titel && <h2 id={id} className="p4-titel">{titel}</h2>}
        {intro && <p className="p4-intro">{intro}</p>}
        {!titel && !eigenKop && <h2 id={id} className="sr-only">{naam}</h2>}
        {children}
      </div>
    </section>
  )
}

/* 01 Raster met iconen ------------------------------------------------------------------------------ */
function RasterIconen() {
  return (
    <Variant n={1} naam="Raster met iconen" titel="Alles wat je bureau nodig heeft voor AI-zichtbaarheid." intro="Van de eerste meting tot het maandverslag, in één app voor al je klanten.">
      <ul className="p4-raster">
        {voordelen.map((v) => (
          <li key={v.titel}>
            <span className="p4-icoonvak"><Icoon naam={v.icoon as IcoonNaam} /></span>
            <h3>{v.titel}</h3>
            <p>{v.tekst}</p>
          </li>
        ))}
      </ul>
    </Variant>
  )
}

/* 02 Genummerd in twee kolommen ---------------------------------------------------------------------- */
function Genummerd() {
  return (
    <Variant n={2} naam="Genummerd in twee kolommen" titel="Waarom bureaus met Orbit werken.">
      <ol className="p4-genummerd">
        {voordelen.map((v, i) => (
          <li key={v.titel}>
            <span className="p4-groot-nr" aria-hidden="true">{nr(i)}</span>
            <div><h3>{v.titel}</h3><p>{v.tekst}</p></div>
          </li>
        ))}
      </ol>
    </Variant>
  )
}

/* 03 Eén zin in twee tinten -------------------------------------------------------------------------- */
function Statement() {
  return (
    <Variant n={3} naam="Eén zin in twee tinten" className="p4-statement-sectie">
      <p className="p4-statement">
        Met Orbit lever je <strong>content zonder risico</strong>, laat je met <strong>een meting die overeind blijft</strong> zien wat je werk oplevert, <strong>win je nieuwe klanten</strong> met een pitch in je eigen huisstijl, en houd je <strong>je marge</strong> in eigen hand. <strong>Voor al je klanten, in één app.</strong>
      </p>
      <div className="p4-statement-voet"><DemoKnop plek="hero" /><span className="lf-mono">Gebouwd voor marketingbureaus</span></div>
    </Variant>
  )
}

/* 04 Vergelijkingstabel ------------------------------------------------------------------------------ */
function Waarde({ w }: { w: string }) {
  if (w === 'ja') return <span className="p4-ja"><Vink /><span className="sr-only">Ja</span></span>
  if (w === 'nee') return <span className="p4-nee" aria-label="Nee">—</span>
  return <span className="p4-soms">{w}</span>
}

function Vergelijking() {
  return (
    <Variant n={4} naam="Vergelijkingstabel" titel="Orbit naast de alternatieven." intro="Wie monitoring, analyse en content los inkoopt, werkt met tools die niet met elkaar praten. Orbit doet het in één keten.">
      <div className="p4-tabelvak">
        <table className="p4-tabel">
          <thead>
            <tr><th scope="col"><span className="sr-only">Wat</span></th>{vergelijking.kolommen.map((k, i) => <th key={k} scope="col" className={i === 0 ? 'p4-kol-orbit' : undefined}>{k}</th>)}</tr>
          </thead>
          <tbody>
            {vergelijking.rijen.map((r) => (
              <tr key={r.wat}>
                <th scope="row">{r.wat}</th>
                {r.waarden.map((w, i) => <td key={i} data-kolom={vergelijking.kolommen[i]} className={i === 0 ? 'p4-kol-orbit' : undefined}><Waarde w={w} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="lf-mono p4-bron">Bron: de productdocumentatie van Orbit</p>
    </Variant>
  )
}

/* 05 Tabbladen ---------------------------------------------------------------------------------------- */
function Tabs() {
  return (
    <Variant n={5} naam="Tabbladen" titel="Wat Orbit je bureau oplevert.">
      <VoordelenTabs />
    </Variant>
  )
}

/* 06 Bento met getallen ------------------------------------------------------------------------------- */
function Bento() {
  return (
    <Variant n={6} naam="Bento met getallen" titel="Orbit in getallen.">
      <ul className="p4-bento">
        {feiten.map((f, i) => (
          <li key={f.eenheid + i} className={`p4-tegel p4-tegel-${i + 1}`}>
            <span className="p4-getal">{f.getal}</span>
            <span className="p4-eenheid">{f.eenheid}</span>
            <p>{f.tekst}</p>
          </li>
        ))}
      </ul>
    </Variant>
  )
}

/* 07 Compacte checklist met knop --------------------------------------------------------------------- */
function Checklist() {
  return (
    <Variant n={7} naam="Compacte checklist met knop" eigenKop>
      <div className="p4-checklist">
        <div className="p4-checklist-kop">
          <h2 id="p4-variant-7" className="p4-titel">Klaar om AI-zichtbaarheid als dienst te verkopen.</h2>
          <p className="p4-intro">Alles wat je nodig hebt om er een vaste maandelijkse dienst van te maken.</p>
          <DemoKnop plek="hero" />
        </div>
        <ul className="p4-vinklijst">
          {voordelen.map((v) => <li key={v.titel}><Vink />{v.titel}</li>)}
          <li><Vink />Nederlands van begin tot eind</li>
          <li><Vink />Niets te installeren</li>
        </ul>
      </div>
    </Variant>
  )
}

/* 08 Per rol ------------------------------------------------------------------------------------------ */
function PerRol() {
  return (
    <Variant n={8} naam="Per rol" titel="Voor iedereen in je bureau." intro="Wat Orbit oplevert, voor het bureau als geheel en voor elke rol in het team.">
      <div className="p4-rollen">
        {rollen.map((r) => (
          <div key={r.rol} className="p4-rol">
            <h3>{r.rol}</h3>
            <ul>{r.punten.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </div>
    </Variant>
  )
}

/* 09 Index met grote titels --------------------------------------------------------------------------- */
function Index() {
  return (
    <Variant n={9} naam="Index met grote titels" titel="De voordelen op een rij.">
      <ol className="p4-index">
        {voordelen.map((v, i) => (
          <li key={v.titel}>
            <span className="lf-mono" aria-hidden="true">{nr(i)}</span>
            <h3>{v.titel}</h3>
            <p>{v.tekst}</p>
          </li>
        ))}
      </ol>
    </Variant>
  )
}

/* 10 Zonder en met Orbit ------------------------------------------------------------------------------ */
function VoorNa() {
  return (
    <Variant n={10} naam="Zonder en met Orbit" titel="Van handwerk naar een vaste werkwijze.">
      <div className="p4-voorna" role="table" aria-label="Zonder Orbit en met Orbit">
        <div className="p4-voorna-kop" role="row"><span role="columnheader">Zonder Orbit</span><span aria-hidden="true" /><span role="columnheader">Met Orbit</span></div>
        {voorNa.map((r) => (
          <div key={r.met} className="p4-voorna-rij" role="row">
            <span role="cell" className="p4-zonder">{r.zonder}</span>
            <span className="p4-pijl" aria-hidden="true">→</span>
            <span role="cell" className="p4-met"><Vink />{r.met}</span>
          </div>
        ))}
      </div>
    </Variant>
  )
}

export function Pagina4() {
  return (
    <div className="p4">
      <section className="p3-start" aria-labelledby="p4-titel">
        <div className="container">
          <p className="lf-mono p2-pagina-label">Pagina 4 · Tien varianten</p>
          <h2 id="p4-titel" className="p2-hero-titel">Tien manieren om de voordelen op te sommen.</h2>
          <p className="hg-hero-intro">Dezelfde voordelen voor marketingbureaus, in tien verschillende ontwerpen. Kies de variant die het best werkt.</p>
        </div>
      </section>
      <RasterIconen />
      <Genummerd />
      <Statement />
      <Vergelijking />
      <Tabs />
      <Bento />
      <Checklist />
      <PerRol />
      <Index />
      <VoorNa />
    </div>
  )
}
