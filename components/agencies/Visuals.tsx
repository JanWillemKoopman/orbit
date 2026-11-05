// De eigen beelden van /agencies en /agencies2. De andere beelden op /agencies komen van /beheer,
// /werkwijze en /kwaliteit; /agencies2 heeft alleen het werkoverzicht als heel scherm (AlleKlanten,
// opmaak in app/agencies2/agencies2.css). Drie fictieve bureaus (Studio Kade, Lumen en Merkwerk)
// laten zien hoe hetzelfde werkscherm in de huisstijl van een bureau staat: kleur, lettertype,
// hoeken, knoppen en logo verschillen, de opbouw en de dichtheid blijven gelijk. De merkkleuren zijn
// de statuskleuren van Linear (globals.css).
import { Chip, Icon, Knop, Logo, Mono } from '@/components/product/ui'

/* ── Whitelabel: hetzelfde scherm in drie huisstijlen ─────────────────────── */

type Stijl = 'kade' | 'lumen' | 'merkwerk'

const BUREAUS: Record<Stijl, { naam: string; merk: string }> = {
  kade: { naam: 'Studio Kade', merk: 'K' },
  lumen: { naam: 'Lumen', merk: 'L' },
  merkwerk: { naam: 'Merkwerk', merk: 'M' },
}

const MENU = ['Merken', 'Contentplan', 'Zichtbaarheid in AI', 'Bibliotheek', 'Beheer']

const KLANTEN = [
  { n: 'Lindeman Warmte', z: '47%', w: '2 vragen' },
  { n: 'Fysio Oudwijk', z: '61%', w: 'Klaar' },
  { n: 'Verbeek Bouw & Renovatie', z: '42%', w: 'Nakijken' },
  { n: 'Tandartspraktijk Lunetten', z: '55%', w: 'Klaar' },
  { n: 'Hoveniersbedrijf Groenrijk', z: '28%', w: '1 vraag' },
]

function Merkteken({ stijl }: { stijl: Stijl }) {
  return <span className="agc-merk">{BUREAUS[stijl].merk}</span>
}

function HuisstijlVenster({ stijl }: { stijl: Stijl }) {
  return (
    <div className="agc-wl" data-stijl={stijl}>
      <aside className="agc-wl-side">
        <span className="agc-wl-brand"><Merkteken stijl={stijl} />{BUREAUS[stijl].naam}</span>
        {MENU.map((m, i) => <span key={m} className="agc-wl-item" data-on={i === 0 || undefined}>{m}</span>)}
      </aside>
      <div className="agc-wl-main">
        <div className="agc-wl-head">
          <span className="agc-wl-titel">Merken<em>12 bedrijven</em></span>
          <span className="agc-wl-knop">Start de maand</span>
        </div>
        <div className="agc-wl-tabel">
          {KLANTEN.map((k) => (
            <div key={k.n} className="agc-wl-rij">
              <strong>{k.n}</strong>
              <span className="agc-wl-balk"><i style={{ width: k.z }} /></span>
              <span className="agc-wl-pct">{k.z}</span>
              <span className="agc-wl-chip" data-klaar={k.w === 'Klaar' || undefined}>{k.w}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Drie vensters over elkaar: hetzelfde werkoverzicht in de huisstijl van drie bureaus. */
export function Huisstijlen() {
  return (
    <div className="agc-wl-comp">
      <div className="agc-wl-pos agc-wl-pos-1"><HuisstijlVenster stijl="kade" /></div>
      <div className="agc-wl-pos agc-wl-pos-2"><HuisstijlVenster stijl="lumen" /></div>
      <div className="agc-wl-pos agc-wl-pos-3"><HuisstijlVenster stijl="merkwerk" /></div>
    </div>
  )
}

/** De huisstijl van één bureau, vertaald naar de app: logo, kleuren, lettertype en knoppen. */
export function HuisstijlKaart() {
  const kleuren = ['var(--blue)', 'var(--bg-primary)', 'var(--bg-level-3)', 'var(--text-primary)']
  return (
    <div className="fv-surface agc-kaart" data-stijl="kade">
      <div className="agc-kaart-kop">
        <span className="agc-wl-brand"><Merkteken stijl="kade" />Studio Kade</span>
        <Mono>Huisstijl</Mono>
      </div>
      <div className="agc-kaart-rij"><span>Logo</span><span className="agc-kaart-w">Linksboven in de zijbalk</span></div>
      <div className="agc-kaart-rij">
        <span>Kleuren</span>
        <span className="agc-kaart-w agc-kaart-kleuren">{kleuren.map((k) => <i key={k} style={{ background: k }} />)}</span>
      </div>
      <div className="agc-kaart-rij"><span>Lettertype</span><span className="agc-kaart-w"><b className="agc-kaart-mono">Mono</b> voor koppen</span></div>
      <div className="agc-kaart-rij"><span>Hoeken</span><span className="agc-kaart-w">Strak, 4 px</span></div>
      <div className="agc-kaart-rij"><span>Knoppen</span><span className="agc-kaart-w"><span className="agc-wl-knop">Start de maand</span></span></div>
    </div>
  )
}

/* ── Je team: wie doet wat ────────────────────────────────────────────────── */

const TEAM = ['Het gesprek met de klant', 'De strategie en de onderwerpen', 'Teksten goedkeuren', 'Advies en de verlenging']

const ORBIT = [
  'De website en het aanbod onderzoeken',
  'De concurrenten in kaart brengen',
  'Dertig AI-vragen per onderwerp',
  'Meten in ChatGPT, Gemini en Google',
  'Een contentplan voor twaalf maanden',
  'Een brief en vragen per pagina',
  'Schrijven en eindredactie',
  'Elk bedrag en elke garantie controleren',
  'Hermeten na 14 en 28 dagen',
  'Het maandverslag van elke klant',
]

/** Twee kolommen: wat je team doet tegenover wat Orbit doet. De verhouding is de boodschap. */
export function TaakVerdeling() {
  return (
    <div className="agc-taak">
      <div className="agc-taak-kaart">
        <div className="agc-taak-kop">
          <span className="agc-taak-ico"><Icon naam="mensen" size={15} /></span>
          <span className="ag-li-t"><strong>Jouw team</strong><em>De klant kennen en de koers bepalen</em></span>
        </div>
        <ul className="agc-taak-lijst">
          {TEAM.map((t) => <li key={t}><span className="agc-taak-stip" />{t}</li>)}
        </ul>
      </div>
      <div className="agc-taak-kaart agc-taak-orbit">
        <div className="agc-taak-kop">
          <Logo size={26} />
          <span className="ag-li-t"><strong>Orbit</strong><em>Al het uitvoerende werk, voor elke klant</em></span>
        </div>
        <ul className="agc-taak-lijst agc-taak-twee">
          {ORBIT.map((t) => <li key={t}><span className="agc-taak-vink"><Icon naam="check" size={11} /></span>{t}</li>)}
        </ul>
      </div>
    </div>
  )
}

/* ── Agencies 2: het werkoverzicht als heel scherm ────────────────────────── */

// Wat het langst wacht staat bovenaan, daarna de klanten zonder wachtend werk. De eerste zeven zijn
// dezelfde als op /beheer (components/agency/Visuals.tsx), aangevuld tot de twaalf uit de kop.
const ALLE_KLANTEN = [
  { n: 'Verbeek Bouw & Renovatie', s: 42, m: 6, d: 7, mm: '3 van 4', st: "November, 5 pagina's", w: '2 nakijken', ws: '6 dagen', k: '16,80', v: true },
  { n: 'Lindeman Warmte', s: 47, m: 10, d: 10, mm: '4 van 4', st: "November, 5 pagina's", w: '2 vragen', ws: '4 dagen', k: '24,60', v: true },
  { n: 'Autobedrijf Smits', s: 24, m: 6, d: 3, mm: '1 van 2', st: "November, 5 pagina's", w: '3 vragen', ws: '3 dagen', k: '8,90', v: true },
  { n: 'Tandartspraktijk Lunetten', s: 55, m: 6, d: 10, mm: '2 van 3', st: '', w: '1 plaatsen', ws: '2 dagen', k: '19,30' },
  { n: 'Hotel De Wijde Blik', s: 52, m: 8, d: 9, mm: '3 van 3', st: '', w: '2 plaatsen', ws: 'gisteren', k: '15,40' },
  { n: 'Hoveniersbedrijf Groenrijk', s: 28, m: 6, d: 4, mm: '2 van 2', st: "November, 5 pagina's", w: '1 vraag', ws: 'vandaag', k: '7,30', v: true },
  { n: 'Zonnepanelen Brabant', s: 44, m: 6, d: 8, mm: '4 van 4', st: "November, 20 pagina's", w: '1 nakijken', ws: 'vandaag', k: '21,70' },
  { n: 'Fysio Oudwijk', s: 61, m: 7, d: 11, mm: '3 van 3', st: "November, 10 pagina's", w: '', ws: '', k: '9,80' },
  { n: 'Kringloop De Ruil', s: 38, m: 7, d: 5, mm: '2 van 2', st: "November, 10 pagina's", w: '', ws: '', k: '13,10' },
  { n: 'Advocatenkantoor Van Dijk', s: 33, m: 5, d: -2, mm: '3 van 5', st: "November, 5 pagina's", w: '', ws: '', k: '11,20' },
  { n: 'Notariskantoor Hendriks', s: 19, m: 5, d: 2, mm: '2 van 2', st: "November, 5 pagina's", w: '', ws: '', k: '6,20' },
  { n: 'Bakkerij De Korenaar', s: null, m: 0, d: 0, mm: '', st: '', w: '', ws: '', k: '4,30' },
] as const

const toon = (w: string) => (w.includes('vra') ? 'oranje' : w.includes('nakijken') ? 'geel' : 'lime')

function Leeg({ t = 'niets' }: { t?: string }) {
  return <span className="ag-faint">{t}</span>
}

function Keuze({ aan = false }: { aan?: boolean }) {
  return <span className="ag-check" data-on={aan || undefined}>{aan && <Icon naam="check" size={10} />}</span>
}

/** Het hele scherm Alle bedrijven: zijbalk, kop, filters, de knoppen voor meerdere klanten en twaalf rijen. */
export function AlleKlanten() {
  return (
    <div className="ag-window agc-ak">
      <aside className="agc-ak-side">
        <span className="agc-ak-ws"><Logo size={20} />Bureau Noordwind</span>
        <span className="agc-ak-item" data-on><Icon naam="merk" />Alle bedrijven<em>12</em></span>
        <span className="agc-ak-item"><Icon naam="taken" />Meldingen<em>4</em></span>
        <span className="agc-ak-item"><Icon naam="mensen" />Beheer</span>
        <span className="agc-ak-kop">Bedrijven</span>
        {ALLE_KLANTEN.slice(0, 9).map((k) => (
          <span key={k.n} className="agc-ak-item agc-ak-klant"><i data-tone={k.w ? toon(k.w) : undefined} />{k.n}</span>
        ))}
        <span className="agc-ak-meer">en nog 3</span>
      </aside>
      <div className="agc-ak-main">
        <div className="ag-bar">
          <span className="ag-crumbs"><span>Bureau Noordwind</span><span className="ag-crumb-current"><span className="ag-sep">›</span>Alle bedrijven</span></span>
          <Knop klein><Icon naam="merk" size={13} />Bedrijf toevoegen</Knop>
        </div>
        <div className="ag-view">
          <div className="ag-head">
            <span className="ag-title">Alle bedrijven</span>
            <span className="ag-sub">12 bedrijven · wat het langst wacht staat bovenaan</span>
          </div>
          <div className="agc-ak-filters">
            <span data-on>Alle <em>12</em></span>
            <span>Wacht op jou <em>7</em></span>
            <span>Maandmeting aan <em>11</em></span>
            <span>Nog niet gemeten <em>1</em></span>
          </div>
          <div className="ag-bulk">
            <span className="ag-bulk-n">4 gekozen.</span>
            <Knop klein>Maandmeting aan</Knop>
            <span className="ag-ghost">Maandmeting uit</span>
            <span className="ag-bulk-sel"><span className="fv-muted">Pagina&apos;s per maand</span><span className="ag-select">10<svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg></span></span>
            <Knop primair klein>Start de maand</Knop>
          </div>
          <div className="ag-table">
            <div className="ag-tr ag-th">
              <Keuze /><span>Bedrijf</span><span>Zichtbaarheid</span><span>Maandmeting</span><span>Te starten</span><span>Wacht op jou</span><span>Wacht sinds</span><span className="ag-r">Kosten 30 dagen</span>
            </div>
            {ALLE_KLANTEN.map((r) => (
              <div key={r.n} className="ag-tr" data-on={'v' in r || undefined}>
                <Keuze aan={'v' in r} />
                <strong>{r.n}</strong>
                <span>
                  {r.s === null ? <Leeg t="nog niet gemeten" /> : <>{r.s}%<span className="ag-faint"> ±{r.m}</span> <span className={r.d > 0 ? 'fv-up' : 'ag-down'}>({r.d > 0 ? '+' : ''}{r.d})</span></>}
                </span>
                <span>{r.mm || <Leeg t="geen clusters" />}</span>
                <span>{r.st || <Leeg />}</span>
                <span>{r.w ? <Chip tone={toon(r.w)} dot>{r.w}</Chip> : <Leeg />}</span>
                <span>{r.ws || <Leeg />}</span>
                <span className="ag-r">€ {r.k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
