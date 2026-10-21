// De beelden van de derde testhomepage (/homepage3). Elk beeld is een uitsnede van een echt scherm van Orbit,
// met dezelfde labels, kolommen en standen als de app (de pitchpagina, Zichtbaarheid in AI, een pagina in de
// bibliotheek, het werkoverzicht), vereenvoudigd tot wat de boodschap draagt. Eén verhaal loopt door alle
// beelden, met cijfers die op elkaar aansluiten: Bureau Kade pitcht in mei bij Brouwer Kozijnen, meet vanaf
// juni, zet op 3 oktober de eerste pagina live en keurt in november de volgende goed. Alle namen en getallen
// zijn voorbeelddata van verzonnen bedrijven.
import { LogoMark } from '@/components/Logo'
import { MerkIcoon } from '@/components/homepage1/Visuals'

const KLANT = 'Brouwer Kozijnen'
const BUREAU = 'Bureau Kade'
const GEMIST = 'Wat kost een kunststof kozijn in Haarlem?'
const NIEUWE_PAGINA = 'Wat kosten nieuwe kozijnen?'
const LIVE_PAGINA = 'Kunststof kozijnen laten plaatsen in Haarlem'

/* ── Bouwstenen ───────────────────────────────────────────────────────────── */

const PADEN: Record<string, React.ReactNode> = {
  taken: <><path d="M2.5 9.5h3l1 2h3l1-2h3" /><path d="M3.5 4h9l1 5.5v3a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-3Z" /></>,
  grafiek: <><path d="M2.5 13.5h11" /><path d="M4.5 11V8M8 11V4.5M11.5 11V6.5" /></>,
  zoek: <><circle cx="7" cy="7" r="4" /><path d="m10 10 3.5 3.5" /></>,
  plan: <><rect x="2.5" y="3" width="11" height="10.5" rx="2" /><path d="M2.5 6.5h11M5.5 1.5v3M10.5 1.5v3" /></>,
  boek: <path d="M3 3.5h4a1 1 0 0 1 1 1v9a1 1 0 0 0-1-1H3ZM13 3.5H9a1 1 0 0 0-1 1v9a1 1 0 0 1 1-1h4Z" />,
  merk: <><rect x="2.5" y="3" width="11" height="10" rx="2" /><path d="M5 6.5h6M5 9.5h3.5" /></>,
  overzicht: <><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" /><rect x="9" y="9" width="4.5" height="4.5" rx="1" /></>,
  bel: <><path d="M4 11.5V7.5a4 4 0 0 1 8 0v4l1 1.5H3z" /><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" /></>,
  check: <path d="m3.5 8.5 3 3 6-7" />,
  pijl: <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />,
  chevron: <path d="m5.5 6.5 2.5 2.5 2.5-2.5" />,
  link: <><path d="M6.5 9.5 9.5 6.5" /><path d="M7.5 4.5 9 3a2.5 2.5 0 0 1 3.5 3.5L11 8M8.5 11.5 7 13a2.5 2.5 0 0 1-3.5-3.5L5 8" /></>,
  plus: <path d="M8 3.5v9M3.5 8h9" />,
}

export function Icoon({ naam, size = 14 }: { naam: keyof typeof PADEN; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PADEN[naam]}
    </svg>
  )
}

/** Een stand zoals in de app: een stip in de kleur van de stand, en altijd het woord erbij. */
function Stand({ toon, children }: { toon: 'wacht' | 'loopt' | 'klaar' | 'neutraal' | 'geel'; children: React.ReactNode }) {
  return <span className="hp3-stand" data-toon={toon}><i />{children}</span>
}

function Kruimel({ delen, rechts }: { delen: string[]; rechts?: React.ReactNode }) {
  return (
    <div className="hp3-kruimel">
      {delen.map((d, i) => <span key={d} data-nu={i === delen.length - 1 || undefined}>{d}</span>)}
      {rechts && <span className="hp3-kruimel-rechts">{rechts}</span>}
    </div>
  )
}

/** Stippen voor genoemd of niet, per AI-assistent. */
function Stip({ aan }: { aan: boolean }) {
  return <i className="hp3-stip" data-aan={aan || undefined} />
}

/* ── Hero: Zichtbaarheid in AI met één gemiste vraag geopend ──────────────── */

const NAV = [
  { i: 'overzicht', l: 'Werkoverzicht' },
  { i: 'bel', l: 'Meldingen', n: '2' },
] as const
const NAV_KLANT = [
  { i: 'taken', l: 'Openstaande taken', n: '1' },
  { i: 'grafiek', l: 'Zichtbaarheid in AI', actief: true },
  { i: 'zoek', l: 'Zoekverkeer' },
  { i: 'plan', l: 'Contentplan' },
  { i: 'boek', l: 'Bibliotheek' },
  { i: 'merk', l: 'Merkdossier' },
] as const

const VRAGEN = [
  { v: GEMIST, m: [false, false, false], open: true },
  { v: 'Kunststof kozijnen laten plaatsen in Haarlem', m: [true, true, false] },
  { v: 'Hout of kunststof kozijnen, wat is beter?', m: [true, false, true] },
  { v: 'Welke kozijnen isoleren het best?', m: [false, true, false] },
  { v: 'Betrouwbaar kozijnenbedrijf in Haarlem', m: [true, true, true] },
  { v: 'Hoe lang gaan kunststof kozijnen mee?', m: [true, false, false] },
]

export function HeroScherm() {
  return (
    <div className="hp3-hero-venster">
      <div className="hp3-hero-raster">
      <nav className="hp3-zij">
        <span className="hp3-werkplek"><span className="hp3-werkplek-logo">K</span>{BUREAU}<Icoon naam="chevron" /></span>
        <div className="hp3-zij-groep">
          {NAV.map((n) => <span className="hp3-zij-item" key={n.l}><Icoon naam={n.i} />{n.l}{'n' in n && <em>{n.n}</em>}</span>)}
        </div>
        <div className="hp3-zij-groep">
          <span className="hp3-zij-kop">{KLANT}</span>
          {NAV_KLANT.map((n) => (
            <span className="hp3-zij-item" key={n.l} data-actief={'actief' in n || undefined}><Icoon naam={n.i} />{n.l}{'n' in n && <em>{n.n}</em>}</span>
          ))}
        </div>
      </nav>

      <div className="hp3-hero-werk">
        <Kruimel delen={[KLANT, 'Zichtbaarheid in AI']} rechts={<span className="hp3-pil">Kunststof kozijnen · 30 vragen</span>} />
        <div className="hp3-hero-inhoud">
          <div className="hp3-hero-kop">
            <div>
              <span className="hp3-label">Gewogen zichtbaarheid, november</span>
              <strong className="hp3-groot">31%<em>± 7</em></strong>
              <span className="hp3-verschil">+5 sinds oktober</span>
            </div>
            <dl className="hp3-kanaal-cijfers">
              <div><dt><MerkIcoon merk="chatgpt" size={13} />ChatGPT</dt><dd>34%</dd></div>
              <div><dt><MerkIcoon merk="gemini" size={13} />Gemini</dt><dd>29%</dd></div>
              <div><dt><MerkIcoon merk="google" size={13} />AI-overzicht</dt><dd>24%</dd></div>
            </dl>
          </div>

          <div className="hp3-vragen" role="presentation">
            <div className="hp3-vraag-rij hp3-vraag-kop"><span>Vraag</span><span><MerkIcoon merk="chatgpt" size={12} /><b>ChatGPT</b></span><span><MerkIcoon merk="gemini" size={12} /><b>Gemini</b></span><span><MerkIcoon merk="google" size={12} /><b>AI-overzicht</b></span></div>
            {VRAGEN.map((r) => (
              <div className="hp3-vraag-rij" key={r.v} data-open={r.open || undefined}>
                <span className="hp3-vraag-v">{r.v}</span>
                {r.m.map((m, i) => <span key={i}><Stip aan={m} /></span>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="hp3-hero-paneel">
        <span className="hp3-label">Vraag</span>
        <h4>{GEMIST}</h4>
        <span className="hp3-paneel-feit">Genoemd door 0 van de 3 assistenten</span>

        <div className="hp3-paneel-blok">
          <span className="hp3-label">Wie wel</span>
          <span className="hp3-wiewel"><b>KozijnPlus</b><em>3 van 3</em></span>
          <span className="hp3-wiewel"><b>Raamwerk Haarlem</b><em>2 van 3</em></span>
        </div>

        <div className="hp3-paneel-blok">
          <span className="hp3-label">Antwoord van ChatGPT</span>
          <p className="hp3-citaat">&ldquo;Bij KozijnPlus begint een kunststof kozijn rond de € 600, inclusief montage. Raamwerk Haarlem…&rdquo;</p>
        </div>

        <div className="hp3-kans">
          <span className="hp3-kans-kop"><span className="hp3-label">Kans</span><span className="hp3-zacht">Nieuwe dienstpagina</span></span>
          <strong>{NIEUWE_PAGINA}</strong>
          <span className="hp3-zacht">KozijnPlus heeft een pagina met prijzen, {KLANT} niet.</span>
          <span className="hp3-knop hp3-knop-primair"><Icoon naam="plus" size={12} />Zet op contentplan</span>
        </div>
      </aside>
      </div>
    </div>
  )
}

/* ── Het pakket: drie kleine schermen, elk met een eigen silhouet ─────────── */

const RANGLIJST = [
  { n: 'KozijnPlus', v: 70 },
  { n: 'Raamwerk Haarlem', v: 50 },
  { n: 'Spaarne Kozijnen', v: 40 },
  { n: `${KLANT} (jij)`, v: 20, jij: true },
]

/** Scan en audit: de ranglijst uit de pitch. */
export function MiniPitch() {
  return (
    <div className="hp3-mini hp3-mini-pitch">
      <span className="hp3-mini-kop"><span className="hp3-mini-bureau">K</span>Wie ChatGPT wel aanraadt</span>
      {RANGLIJST.map((r, i) => (
        <div className="hp3-rang" key={r.n} data-jij={r.jij || undefined}>
          <span className="hp3-rang-plek">{i + 1}</span>
          <span className="hp3-rang-naam">{r.n}</span>
          <span className="hp3-rang-staaf"><i style={{ width: `${r.v}%` }} /></span>
          <span className="hp3-rang-v">{r.v}%</span>
        </div>
      ))}
    </div>
  )
}

const FASEN = ['Vragen', 'Schrijven', 'Goedkeuren', 'Live', 'Effect']

function Standbalk({ nu, compact = false }: { nu: number; compact?: boolean }) {
  return (
    <ol className={`hp3-standbalk${compact ? ' hp3-standbalk-compact' : ''}`}>
      {FASEN.map((f, i) => (
        <li key={f} data-stand={i < nu ? 'klaar' : i === nu ? 'nu' : 'later'}>
          <i>{i < nu && <Icoon naam="check" size={9} />}</i>
          <span>{f}</span>
        </li>
      ))}
    </ol>
  )
}

/** GEO-content: een pagina met de standbalk. */
export function MiniPagina() {
  return (
    <div className="hp3-mini hp3-mini-pagina">
      <Standbalk nu={2} compact />
      <strong className="hp3-mini-titel">{NIEUWE_PAGINA}</strong>
      <p>Een kunststof kozijn kost bij Brouwer vanaf € 650, inclusief inmeten en montage.</p>
      <p>Wat de prijs bepaalt: de maat, het glas en of het oude kozijn eruit moet.</p>
    </div>
  )
}

// Zes maandmetingen met hun marge in procentpunt. De marge wordt kleiner doordat rustige maanden samengevoegd
// worden. Dezelfde reeks staat in de grote grafiek bij Bewijzen.
const MAANDEN = [
  { m: 'jun', v: 12, marge: 13 },
  { m: 'jul', v: 14, marge: 11 },
  { m: 'aug', v: 17, marge: 10 },
  { m: 'sep', v: 21, marge: 9 },
  { m: 'okt', v: 26, marge: 8 },
  { m: 'nov', v: 31, marge: 7 },
]

function paden(w: number, h: number, max: number, links = 0, rechts = 0) {
  const x = (i: number) => links + (i * (w - links - rechts)) / (MAANDEN.length - 1)
  const y = (v: number) => h - (Math.max(0, v) / max) * h
  const lijn = MAANDEN.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.v).toFixed(1)}`).join(' ')
  const boven = MAANDEN.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.v + p.marge).toFixed(1)}`).join(' ')
  const onder = [...MAANDEN].reverse().map((p, j) => `L${x(MAANDEN.length - 1 - j).toFixed(1)} ${y(p.v - p.marge).toFixed(1)}`).join(' ')
  return { x, y, lijn, band: `${boven} ${onder} Z` }
}

/** Monitoring en effect: het cijfer met zijn marge door de maanden heen. */
export function MiniGrafiek() {
  const w = 240
  const h = 84
  const { x, y, lijn, band } = paden(w, h, 45, 4, 4)
  return (
    <div className="hp3-mini hp3-mini-grafiek">
      <span className="hp3-mini-cijfer">31%<em>± 7</em></span>
      <svg viewBox={`0 0 ${w} ${h + 18}`} aria-hidden="true">
        <path d={band} fill="rgba(188,255,47,0.08)" />
        <line x1={x(4) + 4} x2={x(4) + 4} y1="0" y2={h} stroke="rgba(255,255,255,0.22)" strokeDasharray="2 3" />
        <path d={lijn} fill="none" stroke="#bcff2f" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx={x(5)} cy={y(31)} r="3" fill="#bcff2f" />
        {MAANDEN.map((p, i) => <text key={p.m} x={x(i)} y={h + 15} textAnchor="middle" fill="#62666d" fontSize="10" fontFamily="inherit">{p.m}</text>)}
      </svg>
    </div>
  )
}

/* ── Verkopen: de pitch zoals de prospect hem opent ──────────────────────── */

export function PitchCompositie() {
  return (
    <div className="hp3-pitch">
      <div className="hp3-pitch-venster">
        <div className="hp3-browser"><i /><i /><i /><span>Pitch voor {KLANT} · {BUREAU}</span></div>
        <div className="hp3-pitch-doc">
          <header className="hp3-pitch-kop">
            <span className="hp3-pitch-logo"><span>K</span>{BUREAU}</span>
            <span className="hp3-pitch-voor">Pitch voor {KLANT}</span>
            <h4>Hoe AI-assistenten over kunststof kozijnen in Haarlem praten</h4>
          </header>
          <div className="hp3-pitch-body">
            <section className="hp3-pitch-rang">
              <h5>Wie ChatGPT wel aanraadt</h5>
              <p>Bij 10 vragen die klanten stellen over kunststof kozijnen: hoe vaak elk bedrijf in het antwoord voorkwam.</p>
              <ol>
                {RANGLIJST.map((r, i) => (
                  <li key={r.n} data-jij={r.jij || undefined}>
                    <span className="hp3-rang-plek">{i + 1}</span>
                    <span className="hp3-rang-naam">{r.n}</span>
                    <span className="hp3-rang-staaf"><i style={{ width: `${r.v}%` }} /></span>
                    <span className="hp3-rang-v">{r.v}%</span>
                  </li>
                ))}
              </ol>
            </section>
            <section className="hp3-pitch-bewijs">
              <h5>Zo antwoordt ChatGPT nu</h5>
              <div className="hp3-pitch-kaart">
                <span className="hp3-pitch-gevraagd">Gevraagd: &ldquo;{GEMIST}&rdquo;</span>
                <blockquote>&ldquo;Voor kunststof kozijnen in Haarlem kun je terecht bij KozijnPlus of Raamwerk Haarlem. Beide plaatsen binnen enkele weken…&rdquo;</blockquote>
                <span className="hp3-pitch-gevraagd">KozijnPlus wordt als eerste aangeraden; {KLANT} wordt niet genoemd.</span>
              </div>
              <h5 className="hp3-pitch-tweede">Waar de kansen liggen</h5>
              <span className="hp3-pitch-kans">1. Een pagina met prijzen voor kunststof kozijnen</span>
            </section>
          </div>
        </div>
      </div>
      <div className="hp3-melding" aria-hidden="true">
        <span className="hp3-melding-stip" />
        <span className="hp3-melding-tekst"><strong>De pitch voor {KLANT} is geopend</strong><em>Zojuist · {BUREAU}</em></span>
      </div>
    </div>
  )
}

/* ── Content: de pagina in de stand Lees en keur goed ──────────────────────── */

export function PaginaCompositie() {
  return (
    <div className="hp3-pagina">
      <div className="hp3-pagina-venster">
        <Kruimel delen={[KLANT, 'Bibliotheek', NIEUWE_PAGINA]} rechts={<Stand toon="wacht">Lees en keur goed</Stand>} />
        <div className="hp3-pagina-stand"><Standbalk nu={2} /></div>
        <div className="hp3-pagina-lijf">
          <article className="hp3-concept">
            <span className="hp3-label">Dienstpagina · 1.180 woorden</span>
            <h4>{NIEUWE_PAGINA}</h4>
            <p>
              Nieuwe kozijnen kies je voor lange tijd, dus je wilt vooraf weten waar je aan toe bent. <mark data-bron>Een kunststof kozijn kost bij
              Brouwer vanaf € 650, inclusief inmeten en montage.<sup>1</sup></mark> Wat je uiteindelijk betaalt, hangt af van
              drie dingen.
            </p>
            <h5>Wat zit er bij de prijs in?</h5>
            <div className="hp3-anker">
              <p>
                Het inmeten, het afvoeren van je oude kozijnen en het afkitten zitten er altijd bij. <mark data-geel>Op alle kozijnen
                krijg je vijftien jaar garantie.</mark>
              </p>
              <div className="hp3-gele-zin">
                <span className="hp3-gele-kop"><Stand toon="geel">Geen bron voor deze garantie</Stand></span>
                <p>Op de website staat vijf jaar. Goedkeuren kan pas als deze zin bevestigd is.</p>
                <span className="hp3-knoppen">
                  <span className="hp3-knop">Pas aan</span>
                  <span className="hp3-knop hp3-knop-primair">Vraag het bedrijf</span>
                </span>
              </div>
            </div>
          </article>
          <aside className="hp3-waarom">
            <span className="hp3-label">Waarom deze pagina</span>
            <p>Bij &ldquo;{GEMIST}&rdquo; noemen alle drie de assistenten KozijnPlus. {KLANT} heeft geen pagina met prijzen.</p>
            <span className="hp3-label">Bronnen</span>
            <ol className="hp3-voetnoten"><li><span>1</span>Antwoord van het bedrijf, 14 november</li></ol>
            <span className="hp3-label">Bij deze pagina</span>
            <ul>
              {['Metatitel en metabeschrijving', '4 veelgestelde vragen', 'Gestructureerde gegevens', '3 interne links'].map((r) => (
                <li key={r}><Icoon naam="check" size={12} />{r}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
}

const PLAN = [
  { t: NIEUWE_PAGINA, s: <Stand toon="wacht">Lees en keur goed</Stand>, nu: true },
  { t: 'Hout of kunststof kozijnen', s: <Stand toon="loopt">Wordt geschreven</Stand> },
  { t: 'HR++ of triple glas', s: <Stand toon="wacht">Jouw antwoorden nodig</Stand> },
  { t: 'Kozijnen vervangen in een jaren-30-woning', s: <Stand toon="neutraal">Gepland, 24 nov</Stand> },
  { t: 'Onderhoud van kunststof kozijnen', s: <Stand toon="neutraal">Gepland, 28 nov</Stand> },
]

/** Cel: het contentplan van de maand, met dezelfde pagina bovenaan. */
export function PlanCel() {
  return (
    <div className="hp3-plan">
      <div className="hp3-plan-kop"><strong>November</strong><span className="hp3-zacht">5 van 10 pagina&apos;s</span></div>
      {PLAN.map((r) => (
        <div className="hp3-plan-rij" key={r.t} data-nu={r.nu || undefined}>
          <span className="hp3-plan-t">{r.t}</span>
          {r.s}
        </div>
      ))}
    </div>
  )
}

/** Cel: de vraag aan de klant, zoals hij hem via de deellink ziet: zonder account, met de knoppen van de app. */
export function KlantCel() {
  return (
    <div className="hp3-klantvraag">
      <span className="hp3-klantvraag-logo"><LogoMark size={14} />Orbit</span>
      <strong className="hp3-klantvraag-titel">Vragen voor {KLANT}</strong>
      <span className="hp3-zacht">Vraag 1 van 3 · voor de pagina &ldquo;{NIEUWE_PAGINA}&rdquo;</span>
      <p className="hp3-klantvraag-vraag">Wat kost een kunststof kozijn gemiddeld bij jullie, inclusief montage?</p>
      <div className="hp3-veld">Vanaf € 650 per kozijn, inclusief inmeten en montage<i /></div>
      <span className="hp3-knoppen"><span className="hp3-knop hp3-knop-primair">Opslaan</span><span className="hp3-knop hp3-knop-stil">Overslaan</span></span>
    </div>
  )
}

/* ── Bewijzen: één reeks, met de dag dat de pagina live ging ────────────────── */

/** De grote grafiek. `smal` tekent hem opnieuw voor een telefoon, zodat de labels leesbaar blijven. */
export function Ontwikkeling({ smal = false }: { smal?: boolean }) {
  const w = smal ? 340 : 760
  const h = smal ? 200 : 260
  const max = 45
  const links = smal ? 36 : 40
  const { x, y, lijn, band } = paden(w, h, max, links, smal ? 14 : 24)
  // De pagina ging op 3 oktober live: net na de meting van 1 oktober.
  const live = x(4) + ((x(5) - x(4)) * 2) / 31
  const letter = smal ? 11 : 12
  return (
    <svg className={`hp3-ontwikkeling${smal ? ' hp3-ontwikkeling-smal' : ' hp3-ontwikkeling-breed'}`} viewBox={`0 0 ${w} ${h + 40}`} aria-hidden="true">
      {[0, 10, 20, 30, 40].map((g) => (
        <g key={g}>
          <line x1={links} x2={w - (smal ? 14 : 24)} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.06)" />
          <text x={links - 10} y={y(g) + 4} textAnchor="end" fill="#62666d" fontSize={smal ? 10 : 11} fontFamily="inherit">{g}%</text>
        </g>
      ))}
      <path d={band} fill="rgba(188,255,47,0.07)" />
      <line x1={live} x2={live} y1="8" y2={h} stroke="rgba(255,255,255,0.28)" strokeDasharray="3 4" />
      <text x={smal ? live - 6 : live + 8} y="20" textAnchor={smal ? 'end' : 'start'} fill="#d0d6e0" fontSize={letter} fontFamily="inherit">3 okt · pagina live</text>
      <path d={lijn} fill="none" stroke="#bcff2f" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {MAANDEN.map((p, i) => (
        <g key={p.m}>
          <circle cx={x(i)} cy={y(p.v)} r={i === MAANDEN.length - 1 ? 4.5 : 3} fill={i === MAANDEN.length - 1 ? '#bcff2f' : '#0b0c0d'} stroke="#bcff2f" strokeWidth="1.5" />
          <text x={x(i)} y={h + 26} textAnchor="middle" fill="#8a8f98" fontSize={letter} fontFamily="inherit">{p.m}</text>
        </g>
      ))}
      <text x={x(5) - 10} y={y(31) - 14} textAnchor="end" fill="#f7f8f8" fontSize={smal ? 12 : 13} fontFamily="inherit" fontWeight="510">31% ± 7</text>
    </svg>
  )
}

/** Het effect van de pagina, in de woorden die de app gebruikt (lib/impact-uitleg.ts). */
export function EffectKaart() {
  const rijen = [['Vóór publicatie', 1], ['Na 14 dagen', 3], ['Na 28 dagen', 5]] as const
  return (
    <div className="hp3-effect">
      <span className="hp3-label">Effect van de pagina</span>
      <strong className="hp3-effect-titel">{LIVE_PAGINA}</strong>
      <div className="hp3-effect-rijen">
        {rijen.map(([l, n]) => (
          <div className="hp3-effect-rij" key={l}>
            <span>{l}</span>
            <span className="hp3-stippen">{Array.from({ length: 8 }, (_, i) => <i key={i} data-aan={i < n || undefined} />)}</span>
            <b>{n} van 8</b>
          </div>
        ))}
      </div>
      <Stand toon="klaar">Vaker genoemd</Stand>
      <p>Dat is een stijging van 50 procentpunt, meer dan de 45 die bij 8 vragen door toeval kan ontstaan. Dat wijst op een effect van de pagina, al kan een algemene verschuiving in AI-antwoorden meespelen.</p>
    </div>
  )
}

/* ── Schalen: het werkoverzicht, gesorteerd op wat het langst wacht ─────────── */

const BEDRIJVEN = [
  { n: 'Fietsenmaker De Spaak', z: '44% ± 8', d: '+3', w: '3 vragen', s: '9 dagen', k: '€ 8', gekozen: true },
  { n: KLANT, z: '31% ± 7', d: '+5', w: '1 nakijken', s: '2 dagen', k: '€ 7' },
  { n: 'Hoveniersbedrijf Groen', z: '35% ± 9', d: '+1', w: '1 plaatsen', s: '1 dag', k: '€ 6' },
  { n: 'Advocatenkantoor Lindhout', z: '18% ± 9', d: '0', w: 'niets', s: 'niets', k: '€ 5' },
  { n: 'Tandartspraktijk Noord', z: '27% ± 8', d: '+2', w: 'niets', s: 'niets', k: '€ 4' },
  { n: 'Kookstudio Peper', z: 'nog niet gemeten', d: '', w: 'niets', s: 'niets', k: '€ 2' },
]

export function WerkoverzichtCompositie() {
  return (
    <div className="hp3-werk">
      <div className="hp3-werk-venster">
        <Kruimel delen={[BUREAU, 'Werkoverzicht']} rechts={<span className="hp3-zacht">6 bedrijven · maandlimiet € 61 van € 250</span>} />
        <div className="hp3-werk-tabel" role="presentation">
          <div className="hp3-werk-rij hp3-werk-kop"><span>Bedrijf</span><span>Zichtbaarheid</span><span>Wacht op jou</span><span>Wacht sinds</span><span>Kosten 30 dagen</span></div>
          {BEDRIJVEN.map((b) => (
            <div className="hp3-werk-rij" key={b.n} data-gekozen={b.gekozen || undefined} data-leeg={b.w === 'niets' || undefined}>
              <span className="hp3-werk-naam">{b.n}</span>
              <span className="hp3-werk-z">{b.z}{b.d && b.d !== '0' && <em>{b.d}</em>}</span>
              <span>{b.w}</span>
              <span>{b.s}</span>
              <span>{b.k}</span>
            </div>
          ))}
        </div>
      </div>
      <aside className="hp3-werk-paneel" aria-hidden="true">
        <span className="hp3-label">Wacht het langst</span>
        <strong className="hp3-werk-paneel-naam">Fietsenmaker De Spaak</strong>
        <span className="hp3-zacht">Zichtbaarheid 44% ± 8, +3 sinds oktober</span>
        <div className="hp3-taak">
          <Stand toon="wacht">3 vragen bij de klant, sinds 12 nov</Stand>
          <span>Voor de pagina &ldquo;E-bike onderhoud in Haarlem&rdquo;</span>
          <span className="hp3-knop"><Icoon naam="link" size={12} />Kopieer deellink</span>
        </div>
        <div className="hp3-taak">
          <Stand toon="neutraal">December te starten, 10 pagina&apos;s</Stand>
          <span>Ongeveer € 6 aan AI-kosten, vooraf geschat</span>
          <span className="hp3-knop hp3-knop-primair">Start de maand</span>
        </div>
      </aside>
    </div>
  )
}
