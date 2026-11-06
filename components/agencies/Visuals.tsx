// De eigen beelden van /agencies: het werkoverzicht als heel scherm (AlleKlanten), de kosten per klant
// (GripOpKosten) en de whitelabel-illustratie (Huisstijlen). Drie verzonnen bureaus (VONK, .atelier en
// zonnig) laten zien hoe hetzelfde werkscherm in een totaal andere huisstijl staat, met de stijl van de drie
// grootste bureaus van Nederland als inspiratie. Opmaak in app/agencies/agencies.css.
import { Chip, Icon, Knop, Logo, Mono } from '@/components/product/ui'

/* ── Whitelabel: hetzelfde scherm in drie huisstijlen ─────────────────────── */

type Stijl = 'vonk' | 'atelier' | 'zonnig'

const BUREAUS: Record<Stijl, { naam: string; merk: string }> = {
  // De drie van de whitelabel-illustratie: verzonnen bureaus, met de stijl van de drie grootste
  // bureaus van Nederland als inspiratie (kleur, lettertype, hoeken, schaduw en knoppen)
  vonk: { naam: 'VONK', merk: 'V' },
  atelier: { naam: '.atelier', merk: '' },
  zonnig: { naam: 'zonnig', merk: '' },
}

const MENU: { l: string; i: string; n?: string }[] = [
  { l: 'Merken', i: 'merk', n: '12' },
  { l: 'Contentplan', i: 'plan' },
  { l: 'Open vragen', i: 'vraag', n: '7' },
  { l: 'Zichtbaarheid in AI', i: 'grafiek' },
  { l: 'Bibliotheek', i: 'boek', n: '248' },
]

const KLANTEN = [
  { n: 'Lindeman Warmte', i: 'LW', sub: '4 clusters · elke maand', z: '47%', d: '+10', w: '2 vragen', v: [17, 23, 30, 37, 47] },
  { n: 'Fysio Oudwijk', i: 'FO', sub: '3 clusters · elke maand', z: '61%', d: '+11', w: 'Klaar', v: [44, 50, 52, 61] },
  { n: 'Verbeek Bouw & Renovatie', i: 'VB', sub: '4 clusters · elke maand', z: '42%', d: '+7', w: 'Nakijken', v: [19, 27, 35, 42] },
  { n: 'Tandartspraktijk Lunetten', i: 'TL', sub: '3 clusters · elke maand', z: '55%', d: '+10', w: 'Klaar', v: [35, 40, 45, 55] },
  { n: 'Hoveniersbedrijf Groenrijk', i: 'HG', sub: '2 clusters · elke maand', z: '28%', d: '+4', w: '1 vraag', v: [20, 22, 24, 28] },
]

function Merkteken({ stijl }: { stijl: Stijl }) {
  if (!BUREAUS[stijl].merk) return null
  return <span className="agc-merk">{BUREAUS[stijl].merk}</span>
}

function Trend({ v }: { v: readonly number[] }) {
  const pts = v.map((x, i) => `${(i / (v.length - 1)) * 52},${18 - ((x - 10) / 55) * 18}`).join(' ')
  return <svg className="agc-wl-trend" width="56" height="22" viewBox="-2 -2 56 22" aria-hidden="true"><polyline points={pts} fill="none" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" /></svg>
}

// Het aantal AI-vragen (van de 30) waarin Lindeman Warmte genoemd wordt, per maand
const ZICHTBAAR = [6, 8, 11, 15, 19]

/** Grafiek in het venster van zonnig: de toename van de AI-vragen waarin de klant zichtbaar is. */
function Zichtbaar() {
  const W = 300, H = 56
  const x = (i: number) => (i / (ZICHTBAAR.length - 1)) * W
  const y = (v: number) => H - ((v - 4) / 16) * H
  const lijn = ZICHTBAAR.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  return (
    <div className="agc-wl-grafiek">
      <div className="agc-wl-grafiek-kop">
        <span><em>AI-vragen waarin Lindeman Warmte genoemd wordt</em><strong>19<small> van 30</small></strong></span>
        <b>+13 sinds juni</b>
      </div>
      <svg viewBox={`-4 -6 ${W + 8} ${H + 22}`} preserveAspectRatio="none" aria-hidden="true">
        {[0, 1, 2].map((r) => <line key={r} x1="0" x2={W} y1={(H / 2) * r} y2={(H / 2) * r} className="agc-wl-raster" />)}
        <polygon points={`0,${H} ${lijn} ${W},${H}`} className="agc-wl-vlak" />
        <polyline points={lijn} className="agc-wl-lijn" />
        <circle cx={x(ZICHTBAAR.length - 1)} cy={y(19)} r="4" className="agc-wl-punt" />
        {['jun', 'jul', 'aug', 'sep', 'okt'].map((m, i) => (
          <text key={m} x={x(i)} y={H + 14} textAnchor={i === 0 ? 'start' : i === 4 ? 'end' : 'middle'}>{m}</text>
        ))}
      </svg>
    </div>
  )
}

/** Hetzelfde werkoverzicht, met zijbalk, bovenbalk, kerncijfers en een tabel met trend per klant. */
function HuisstijlVenster({ stijl }: { stijl: Stijl }) {
  return (
    <div className="agc-wl" data-stijl={stijl}>
      <aside className="agc-wl-side">
        <span className="agc-wl-brand"><Merkteken stijl={stijl} />{BUREAUS[stijl].naam}</span>
        <span className="agc-wl-zoek"><Icon naam="zoek" size={12} />Zoeken<kbd>⌘K</kbd></span>
        <span className="agc-wl-groep">Werk</span>
        {MENU.map((m, i) => (
          <span key={m.l} className="agc-wl-item" data-on={i === 0 || undefined}><Icon naam={m.i} size={13} />{m.l}{m.n && <em>{m.n}</em>}</span>
        ))}
        <span className="agc-wl-groep">Bureau</span>
        <span className="agc-wl-item"><Icon naam="mensen" size={13} />Team</span>
        <span className="agc-wl-item"><Icon naam="euro" size={13} />Kosten</span>
        <span className="agc-wl-user"><i>SV</i><span>Sanne de Vries<em>Beheerder</em></span></span>
      </aside>
      <div className="agc-wl-main">
        <div className="agc-wl-top">
          <span className="agc-wl-pad">Werk <b>›</b> <strong>Merken</strong></span>
          <span className="agc-wl-team"><i>SV</i><i>DM</i><i>+3</i></span>
        </div>
        <div className="agc-wl-head">
          <span className="agc-wl-titel">Merken<em>12 bedrijven</em></span>
          <span className="agc-wl-knoppen"><span className="agc-wl-knop">Start de maand</span><span className="agc-wl-pijl"><Icon naam="pijl" size={12} /></span></span>
        </div>
        <div className="agc-wl-kpis">
          <span><em>Pagina&apos;s geschreven in november</em><strong>24<small>/35</small></strong><i className="agc-wl-voortgang"><i style={{ width: '69%' }} /></i></span>
          <span><em>Openstaande vragen</em><strong>7</strong><b>bij 5 klanten</b></span>
        </div>
        {stijl === 'zonnig' && <Zichtbaar />}
        <div className="agc-wl-tabel">
          <div className="agc-wl-rij agc-wl-th"><span /><span>Bedrijf</span><span>Trend</span><span>Zichtbaar</span><span>Status</span></div>
          {KLANTEN.map((k) => (
            <div key={k.n} className="agc-wl-rij">
              <span className="agc-wl-av">{k.i}</span>
              <span className="agc-wl-naam"><strong>{k.n}</strong><em>{k.sub}</em></span>
              <Trend v={k.v} />
              <span className="agc-wl-pct">{k.z}<small>{k.d}</small></span>
              <span className="agc-wl-chip" data-klaar={k.w === 'Klaar' || undefined}>{k.w}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Drie vensters over elkaar: hetzelfde werkoverzicht in drie totaal verschillende huisstijlen. */
export function Huisstijlen() {
  return (
    <div className="agc-wl-comp">
      <div className="agc-wl-pos agc-wl-pos-1"><HuisstijlVenster stijl="atelier" /></div>
      <div className="agc-wl-pos agc-wl-pos-2"><HuisstijlVenster stijl="vonk" /></div>
      <div className="agc-wl-pos agc-wl-pos-3"><HuisstijlVenster stijl="zonnig" /></div>
    </div>
  )
}

/* ── Het werkoverzicht als heel scherm ────────────────────────────────────── */

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

/* ── Grip op kosten ───────────────────────────────────────────────────────── */

// Het tabblad Kosten van een bureau (Beheer › Kosten in de app): wat er deze maand staat tegen de
// maandlimiet, de schatting voor volgende maand en het verbruik per bedrijf. De bedragen zijn de kosten
// van de afgelopen dertig dagen uit het werkoverzicht hierboven (ALLE_KLANTEN), de zes duurste apart.
const PER_BEDRIJF = [
  { n: 'Lindeman Warmte', k: 24.6 },
  { n: 'Zonnepanelen Brabant', k: 21.7 },
  { n: 'Tandartspraktijk Lunetten', k: 19.3 },
  { n: 'Verbeek Bouw & Renovatie', k: 16.8 },
  { n: 'Hotel De Wijde Blik', k: 15.4 },
  { n: 'Kringloop De Ruil', k: 13.1 },
  { n: '6 andere bedrijven samen', k: 47.7, rest: true },
] as const

const eur = (n: number) => `€ ${n.toFixed(2).replace('.', ',')}`

/** De kosten van een maand per klant, met ervoor de schatting die bij de knop Start de maand staat. */
export function GripOpKosten() {
  return (
    <div className="a2-ko">
      <div className="ag-window a2-ko-venster">
        <div className="ag-bar">
          <span className="ag-crumbs"><Logo size={18} /><span>Bureau Noordwind</span><span className="ag-crumb-current"><span className="ag-sep">›</span>Kosten</span></span>
          <span className="ag-ghost a2-ko-export"><Icon naam="download" size={13} />Download november</span>
        </div>
        <div className="ag-view">
          <div className="a2-ko-kop">
            <div className="a2-ko-stand">
              <Mono>Deze maand, november</Mono>
              <span className="a2-ko-bedrag">€ 158,60<em>van € 250,00</em></span>
              <div className="fv-progress"><i style={{ width: '63%' }} /></div>
            </div>
            <div className="a2-ko-stand">
              <Mono>Volgende maand</Mono>
              <span className="a2-ko-bedrag a2-ko-bedrag-klein"><em>ongeveer</em>€ 164</span>
            </div>
          </div>
          <Mono>Per bedrijf</Mono>
          <div className="a2-ko-rijen">
            {PER_BEDRIJF.map((r) => (
              <div key={r.n} className="a2-ko-rij" data-rest={'rest' in r || undefined}>
                <span className="a2-ko-naam">{r.n}</span>
                <span className="a2-ko-balk"><i style={{ width: `${Math.round((r.k / 47.7) * 100)}%` }} /></span>
                <span className="a2-ko-k">{eur(r.k)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fv-surface a2-ko-vooraf">
        <Mono>Kosten vooraf</Mono>
        <p>Start de maand voor 4 bedrijven, 20 pagina&apos;s.</p>
        <span className="a2-ko-schatting"><em>ongeveer</em>€ 11,80</span>
        <div className="a2-ko-actie">
          <span className="fv-muted">Nog € 91,40 over van je limiet</span>
          <Knop primair klein>Start de maand</Knop>
        </div>
      </div>
    </div>
  )
}
