// De eigen beelden van /agencies. De andere beelden op de pagina komen van /beheer, /werkwijze en
// /kwaliteit. Drie fictieve bureaus (Studio Kade, Lumen en Merkwerk) laten zien hoe hetzelfde werkscherm
// in de huisstijl van een bureau staat: kleur, lettertype, hoeken, knoppen en logo verschillen, de
// opbouw en de dichtheid blijven gelijk. De merkkleuren zijn de statuskleuren van Linear (globals.css).
import { Icon, Logo, Mono } from '@/components/product/ui'

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
