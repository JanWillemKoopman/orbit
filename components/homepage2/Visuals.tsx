// De beelden van de tweede testhomepage (/homepage2). Elk beeld is nieuw nagebouwd in HTML en SVG en maakt
// één punt. Alle namen en getallen zijn voorbeelddata van verzonnen bedrijven.
import { LogoMark } from '@/components/Logo'
import { MerkIcoon } from '@/components/homepage1/Visuals'

const KLANT = 'Dakwerken Molenaar'
const VRAAG = 'Welke dakdekker in Zwolle is betrouwbaar voor een lekkend plat dak?'

function Venster({ titel, children, className = '' }: { titel: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`hp2-venster ${className}`}>
      <div className="hp2-venster-balk"><LogoMark size={12} /><span>{titel}</span></div>
      {children}
    </div>
  )
}

/* ── Aandacht: drie keer dezelfde vraag ───────────────────────────────────── */

const POGINGEN = [
  { tijd: '09:12', namen: ['DakPro Zwolle', 'Van Dijk Dak & Gevel', KLANT, 'Dakcomfort'] },
  { tijd: '09:14', namen: ['Van Dijk Dak & Gevel', 'DakPro Zwolle', 'Dakcomfort'] },
  { tijd: '09:15', namen: ['DakPro Zwolle', KLANT, 'Van Dijk Dak & Gevel'] },
]

export function DrieKeer() {
  return (
    <div className="hp2-driekeer">
      {POGINGEN.map((p, i) => {
        const plek = p.namen.indexOf(KLANT) + 1
        return (
          <div className="hp2-poging" key={p.tijd}>
            <div className="hp2-poging-kop">
              <span className="hp2-merk"><MerkIcoon merk="chatgpt" size={14} />Poging {i + 1}</span>
              <span className="hp2-zacht">{p.tijd}</span>
            </div>
            <p className="hp2-poging-vraag">{VRAAG}</p>
            <ol className="hp2-rijtje">
              {p.namen.map((n) => <li key={n} data-klant={n === KLANT || undefined}>{n}</li>)}
            </ol>
            <span className="hp2-poging-uitkomst" data-mis={!plek || undefined}>{plek ? `${KLANT} op plek ${plek}` : `${KLANT} ontbreekt`}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Interesse: bij welke vragen, wie, en waarom ──────────────────────────── */

const VRAGEN = [
  { fase: 'Oriëntatie', v: 'Hoe lang gaat een bitumen dak mee?', ja: true },
  { fase: 'Oriëntatie', v: 'Wat kost een plat dak vervangen?', ja: true },
  { fase: 'Overweging', v: 'EPDM of bitumen voor een plat dak?', ja: false },
  { fase: 'Beslissing', v: 'Dakdekker in Zwolle met spoedservice', ja: false },
  { fase: 'Beslissing', v: 'Betrouwbare dakdekker in Zwolle', ja: false },
]

export function Vragen() {
  return (
    <div className="hp2-mini">
      {VRAGEN.map((r) => (
        <div className="hp2-vraagrij" key={r.v}>
          <i data-ja={r.ja || undefined} />
          <span className="hp2-vraagrij-v">{r.v}</span>
          <span className="hp2-zacht">{r.fase}</span>
        </div>
      ))}
    </div>
  )
}

const MERKEN = [
  { n: 'DakPro Zwolle', soort: 'Concurrent', v: 63 },
  { n: 'Van Dijk Dak & Gevel', soort: 'Concurrent', v: 48 },
  { n: 'Een vergelijkingssite', soort: 'Vergelijkingssite', v: 31 },
  { n: KLANT, soort: 'Je klant', v: 22, klant: true },
]

export function Wie() {
  return (
    <div className="hp2-mini">
      {MERKEN.map((m) => (
        <div className="hp2-merkrij" key={m.n} data-klant={m.klant || undefined}>
          <span className="hp2-merkrij-n">{m.n}<em>{m.soort}</em></span>
          <span className="hp2-staaf"><i style={{ width: `${m.v}%` }} /></span>
          <span className="hp2-merkrij-v">{m.v}%</span>
        </div>
      ))}
    </div>
  )
}

export function Waarom() {
  return (
    <div className="hp2-mini hp2-waarom">
      <span className="hp2-zacht">Wat AI over DakPro Zwolle zegt</span>
      <div className="hp2-eigenschappen">
        <span>Binnen 24 uur ter plaatse</span>
        <span>Gespecialiseerd in platte daken</span>
        <span>Veel beoordelingen</span>
      </div>
      <span className="hp2-zacht">Waar AI dat vandaan haalt</span>
      <div className="hp2-bronnen">
        <span><b>Eigen website DakPro</b><em>4 antwoorden</em></span>
        <span><b>Een vergelijkingssite</b><em>3 antwoorden</em></span>
      </div>
    </div>
  )
}

/* ── Interesse: van gemiste vraag naar pagina-idee ───────────────────────── */

export function VanVraagNaarIdee() {
  return (
    <div className="hp2-idee">
      <div className="hp2-idee-kaart hp2-idee-vraag">
        <span className="hp2-zacht">Gemiste vraag</span>
        <strong>Dakdekker in Zwolle met spoedservice</strong>
        <span className="hp2-idee-feit">{KLANT} in 0 van 10 antwoorden</span>
        <span className="hp2-idee-feit">DakPro Zwolle in 7 van 10</span>
      </div>
      <span className="hp2-pijl" aria-hidden="true">
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h37M32 1.5 37 6l-5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <Venster titel={`${KLANT} · Pagina-idee`} className="hp2-idee-pagina">
        <div className="hp2-idee-body">
          <span className="hp2-zacht">Nieuwe dienstpagina</span>
          <strong>Spoedreparatie van een plat dak in Zwolle</strong>
          <p>Wat er gebeurt na je melding, hoe snel we er zijn en wat een noodreparatie kost.</p>
          <div className="hp2-knoppen">
            <span className="hp2-knop">Later</span>
            <span className="hp2-knop hp2-knop-primair">Plan in november</span>
          </div>
        </div>
      </Venster>
    </div>
  )
}

/* ── Verlangen: een maand op een tijdlijn ────────────────────────────────── */

export function Maand({ momenten }: { momenten: { dag: string; titel: string; tekst: string }[] }) {
  return (
    <ol className="hp2-maand">
      {momenten.map((m, i) => (
        <li key={m.titel} data-laatste={i === momenten.length - 1 || undefined}>
          <span className="hp2-maand-dag">{m.dag.startsWith('+') ? m.dag : `Dag ${m.dag}`}</span>
          <span className="hp2-maand-punt" aria-hidden="true" />
          <h3>{m.titel}</h3>
          <p>{m.tekst}</p>
        </li>
      ))}
    </ol>
  )
}

/* ── Verlangen: de vraag op de telefoon van de klant ─────────────────────── */

export function Telefoon() {
  return (
    <div className="hp2-telefoon">
      <div className="hp2-telefoon-scherm">
        <div className="hp2-telefoon-top"><span>9:41</span><span className="hp2-telefoon-eiland" /></div>
        <div className="hp2-telefoon-kop">
          <span className="hp2-telefoon-logo">L</span>
          <span><b>Bureau Lumen</b><em>vraagt via Orbit</em></span>
        </div>
        <span className="hp2-zacht">Vraag 2 van 4 · voor de pagina over spoedreparaties</span>
        <p className="hp2-telefoon-vraag">Hoe snel zijn jullie ter plaatse bij een lekkage, en kost dat extra in het weekend?</p>
        <div className="hp2-telefoon-veld">Meestal dezelfde dag. In het weekend rekenen we een toeslag van<i /></div>
        <span className="hp2-telefoon-knop">Antwoord versturen</span>
        <span className="hp2-telefoon-voet">Geen account nodig</span>
      </div>
    </div>
  )
}
