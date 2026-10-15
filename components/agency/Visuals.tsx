// De productbeelden van /agency: het account van het fictieve Bureau Noordwind. De grote panelen tonen
// een heel scherm (het werkoverzicht, Beheer), de cellen één onderdeel van dichtbij. Teksten volgen
// de schermen van ORBIT ENGINE; de bedragen tellen op tot dezelfde maand (oktober: € 46 van € 250).
import { Chip, Icon, Knop, Logo, Mono } from '@/components/product/ui'

/* ── Venster: een scherm van de app zonder zijbalk ────────────────────────── */

function Venster({ pad, rechts, children }: { pad: string[]; rechts?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="ag-window">
      <div className="ag-bar">
        <span className="ag-crumbs">
          <Logo size={18} />
          {pad.map((p, i) => (
            <span key={p} className={i === pad.length - 1 ? 'ag-crumb-current' : undefined}>
              {i > 0 && <span className="ag-sep">›</span>}
              {p}
            </span>
          ))}
        </span>
        {rechts}
      </div>
      <div className="ag-view">{children}</div>
    </div>
  )
}

const TABS = ['Gebruikers', 'Bedrijven', 'Sleutels', 'Kosten', 'Systeemstatus']

function BeheerVenster({ tab, children }: { tab: string; children: React.ReactNode }) {
  return (
    <Venster pad={['Bureau Noordwind', 'Beheer']}>
      <div className="ag-head">
        <span className="ag-title">Beheer</span>
      </div>
      <div className="ag-tabs">
        {TABS.map((t) => <span key={t} data-on={t === tab || undefined}>{t}</span>)}
      </div>
      {children}
    </Venster>
  )
}

function Vink({ aan = false }: { aan?: boolean }) {
  return <span className="ag-check" data-on={aan || undefined}>{aan && <Icon naam="check" size={10} />}</span>
}

/* ── Hero: het werkoverzicht ──────────────────────────────────────────────── */

const RIJEN = [
  { n: 'Verbeek Bouw & Renovatie', s: 42, m: 6, d: 7, mm: '3 van 4', st: "November, 5 pagina's", w: '2 nakijken', ws: '6 dagen', k: '16,80', v: true },
  { n: 'Lindeman Warmte', s: 47, m: 5, d: 10, mm: '4 van 4', st: "November, 5 pagina's", w: '2 vragen', ws: '4 dagen', k: '24,60', v: true },
  { n: 'Tandartspraktijk Lunetten', s: 55, m: 6, d: 10, mm: '2 van 3', st: '', w: '1 plaatsen', ws: '2 dagen', k: '19,30' },
  { n: 'Hoveniersbedrijf Groenrijk', s: 28, m: 6, d: 4, mm: '2 van 2', st: "November, 5 pagina's", w: '1 vraag', ws: 'vandaag', k: '7,30', v: true },
  { n: 'Fysio Oudwijk', s: 61, m: 7, d: 11, mm: '3 van 3', st: "November, 10 pagina's", w: '', ws: '', k: '9,80' },
  { n: 'Advocatenkantoor Van Dijk', s: 33, m: 5, d: -2, mm: '3 van 5', st: "November, 5 pagina's", w: '', ws: '', k: '11,20' },
  { n: 'Bakkerij De Korenaar', s: null, m: 0, d: 0, mm: '', st: '', w: '', ws: '', k: '4,30' },
] as const

function Niets({ t = 'niets' }: { t?: string }) {
  return <span className="ag-faint">{t}</span>
}

export function HeroWerkoverzicht() {
  return (
    <Venster pad={['Bureau Noordwind', 'Merken']} rechts={<Knop klein><Icon naam="merk" size={13} />Bedrijf toevoegen</Knop>}>
      <div className="ag-head">
        <span className="ag-title">Merken</span>
        <span className="ag-sub">12 bedrijven · wat het langst wacht staat bovenaan</span>
      </div>
      <div className="ag-bulk">
        <span className="ag-bulk-n">3 gekozen.</span>
        <Knop klein>Maandmeting aan</Knop>
        <span className="ag-ghost">Maandmeting uit</span>
        <span className="ag-bulk-sel"><span className="fv-muted">Pagina&apos;s per maand</span><span className="ag-select">10<svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg></span></span>
        <Knop primair klein>Start de maand</Knop>
      </div>
      <div className="ag-table">
        <div className="ag-tr ag-th">
          <Vink /><span>Bedrijf</span><span>Zichtbaarheid</span><span>Maandmeting</span><span>Te starten</span><span>Wacht op jou</span><span>Wacht sinds</span><span className="ag-r">Kosten 30 dagen</span>
        </div>
        {RIJEN.map((r) => (
          <div key={r.n} className="ag-tr" data-on={'v' in r || undefined}>
            <Vink aan={'v' in r} />
            <strong>{r.n}</strong>
            <span>
              {r.s === null ? <Niets t="nog niet gemeten" /> : <>{r.s}%<span className="ag-faint"> ±{r.m}</span> <span className={r.d > 0 ? 'fv-up' : 'ag-down'}>({r.d > 0 ? '+' : ''}{r.d})</span></>}
            </span>
            <span>{r.mm || <Niets t="geen clusters" />}</span>
            <span>{r.st || <Niets />}</span>
            <span>{r.w ? <Chip tone={r.w.includes('vra') ? 'oranje' : r.w.includes('nakijken') ? 'geel' : 'lime'} dot>{r.w}</Chip> : <Niets />}</span>
            <span>{r.ws || <Niets />}</span>
            <span className="ag-r">€ {r.k}</span>
          </div>
        ))}
      </div>
    </Venster>
  )
}

/* ── Overzicht ────────────────────────────────────────────────────────────── */

export function LangstWacht() {
  const rijen = [
    { n: 'Verbeek Bouw & Renovatie', w: '2 teksten nakijken', d: '6 dagen', tone: 'geel' },
    { n: 'Lindeman Warmte', w: '2 vragen bij de klant', d: '4 dagen', tone: 'oranje' },
    { n: 'Tandartspraktijk Lunetten', w: '1 pagina plaatsen', d: '2 dagen', tone: 'lime' },
  ] as const
  return (
    <div className="fv-surface ag-wait">
      <Mono>Wacht op jou</Mono>
      {rijen.map((r) => (
        <div key={r.n} className="ag-wait-row">
          <span className="fv-stip" data-tone={r.tone} />
          <span className="ag-wait-t"><strong>{r.n}</strong><em>{r.w}</em></span>
          <span className="ag-wait-d">{r.d}</span>
        </div>
      ))}
    </div>
  )
}

export function MaandStarten() {
  return (
    <div className="fv-surface ag-dialog">
      <strong className="ag-dialog-t">De maand starten voor 3 bedrijven</strong>
      <span className="fv-muted">Bij elk bedrijf start de maand uit de kolom Te starten, samen 15 pagina&apos;s.</span>
      <div className="ag-warn">
        <strong>Dit zet het werk in gang</strong>
        <span>Kost ongeveer € 18,00 voor 15 pagina&apos;s, gemiddeld over wat je bureau eerder betaalde. Van de maandlimiet is nog € 204,00 over.</span>
      </div>
      <div className="ag-dialog-btns"><span className="ag-ghost">Annuleer</span><Knop primair klein>Start de maand</Knop></div>
    </div>
  )
}

/* ── Klanten toevoegen ────────────────────────────────────────────────────── */

export function NieuwMerk() {
  return (
    <div className="fv-surface ag-form">
      <strong className="ag-dialog-t">Nieuw merk</strong>
      <label className="ag-field"><Mono>Bedrijfsnaam *</Mono><span className="ag-input">Bakkerij De Korenaar</span></label>
      <label className="ag-field"><Mono>Website *</Mono><span className="ag-input">https://www.dekorenaar.example<span className="ag-ok"><Icon naam="check" size={12} /></span></span></label>
      <div className="ag-form-foot">
        <Knop primair>Start het onderzoek</Knop>
        <span className="fv-small fv-muted">Kost ongeveer € 1,90 per onderzoek, gemiddeld over wat je bureau eerder betaalde.</span>
      </div>
    </div>
  )
}

export function Onderzoek() {
  const stappen = [
    ['Website gelezen', "148 pagina's", 'done'],
    ['Merk', 'Ambachtelijke bakker in Amersfoort', 'done'],
    ['Aanbod', '9 producten en diensten', 'done'],
    ['Onderwerpen', 'Wordt onderzocht', 'now'],
    ['Markt en concurrenten', '', 'todo'],
  ] as const
  return (
    <div className="fv-surface ag-steps">
      <div className="ag-steps-head"><strong>Bakkerij De Korenaar</strong><Chip tone="blauw" dot>Wordt onderzocht</Chip></div>
      {stappen.map(([l, s, st]) => (
        <div key={l} className="ag-step" data-state={st}>
          <span className="ag-step-dot">{st === 'done' && <Icon naam="check" size={10} />}</span>
          <span className="ag-step-l">{l}</span>
          <span className="ag-step-s">{s}</span>
        </div>
      ))}
    </div>
  )
}

const BEDRIJVEN = [
  { n: 'Lindeman Warmte', k: 'Pieter Lindeman', p: 5 },
  { n: 'Tandartspraktijk Lunetten', k: '', p: 10 },
  { n: 'Verbeek Bouw & Renovatie', k: '', p: 5 },
  { n: 'Fysio Oudwijk', k: '', p: 10 },
  { n: 'Bakkerij De Korenaar', k: '', p: 10, nieuw: true },
]

export function BeheerBedrijven() {
  return (
    <BeheerVenster tab="Bedrijven">
      <div className="ag-cols">
        <div className="ag-list">
          {BEDRIJVEN.map((b) => (
            <div key={b.n} className="ag-li">
              <span className="ag-li-t">
                <strong>{b.n}</strong>
                <em>{b.k ? `Kijker: ${b.k}` : 'Nog geen kijker'}</em>
              </span>
              {b.nieuw ? <Chip tone="blauw" dot>Wordt onderzocht</Chip> : <Chip tone="lime" dot>Klaar</Chip>}
              <span className="fv-muted">{b.p} per maand</span>
              <span className="ag-ghost">Archiveren</span>
            </div>
          ))}
        </div>
        <div className="fv-surface ag-std">
          <strong className="ag-dialog-t">Standaarden</strong>
          <span className="fv-muted fv-small">Voor elk nieuw bedrijf en elk nieuw cluster.</span>
          <div className="ag-std-row ag-std-stack">
            <span>Pagina&apos;s per maand</span>
            <span className="fv-seg">{[5, 10, 20, 30, 40, 50].map((n) => <span key={n} data-on={n === 10 || undefined}>{n}</span>)}</span>
          </div>
          <div className="ag-std-row"><span>Elke maand meten</span><span className="fv-toggle" data-on /></div>
        </div>
      </div>
    </BeheerVenster>
  )
}

/* ── Team ─────────────────────────────────────────────────────────────────── */

const LEDEN = [
  { i: 'SV', k: '1', n: 'Sanne de Vries', e: 'sanne@noordwind.example', r: 'Beheerder', z: 'Alle bedrijven', l: 'vandaag', jij: true },
  { i: 'DM', k: '2', n: 'Daan Mulder', e: 'daan@noordwind.example', r: 'Beheerder', z: 'Alle bedrijven', l: 'gisteren' },
  { i: 'PL', k: '3', n: 'Pieter Lindeman', e: 'pieter@lindeman-warmte.example', r: 'Kijker', z: 'Lindeman Warmte', l: '3 dagen geleden' },
]

export function Gebruikers() {
  return (
    <BeheerVenster tab="Gebruikers">
      <div className="ag-table ag-users">
        <div className="ag-tr ag-th"><span>Naam</span><span>Rol</span><span>Ziet</span><span>Laatste inlog</span></div>
        {LEDEN.map((l) => (
          <div key={l.n} className="ag-tr">
            <span className="ag-user">
              <span className="fv-avatar" data-kleur={l.k}>{l.i}</span>
              <span className="ag-li-t"><strong>{l.n}{l.jij && <span className="ag-faint"> (jij)</span>}</strong><em>{l.e}</em></span>
            </span>
            <span><Chip tone={l.r === 'Beheerder' ? 'lime' : 'blauw'}>{l.r}</Chip></span>
            <span className={l.r === 'Beheerder' ? 'ag-faint' : undefined}>{l.z}</span>
            <span className="fv-muted">{l.l}</span>
          </div>
        ))}
        <div className="ag-tr ag-invite">
          <span className="ag-user">
            <span className="fv-avatar ag-avatar-open">MV</span>
            <span className="ag-li-t"><strong>Mirjam Verbeek</strong><em>Uitgenodigd · de link werkt nog 12 dagen</em></span>
          </span>
          <span><Chip tone="blauw">Kijker</Chip></span>
          <span>Verbeek Bouw & Renovatie</span>
          <span className="ag-ghost">Intrekken</span>
        </div>
      </div>
    </BeheerVenster>
  )
}

export function Uitnodigen() {
  return (
    <div className="fv-surface ag-form">
      <strong className="ag-dialog-t">Een collega uitnodigen</strong>
      <span className="ag-input">mirjam@verbeekbouw.example</span>
      <span className="fv-seg ag-seg-wide"><span>Beheerder</span><span data-on>Kijker</span></span>
      <span className="fv-muted fv-small">Welke bedrijven mag deze kijker zien?</span>
      <div className="ag-boxes">
        <span><Vink aan />Verbeek Bouw & Renovatie</span>
        <span><Vink />Lindeman Warmte</span>
        <span><Vink />Fysio Oudwijk</span>
      </div>
      <div><Knop primair klein>Maak een uitnodiging</Knop></div>
    </div>
  )
}

export function KijkerRechten() {
  const groepen = [
    { g: 'Vragen en bedrijf', r: [['Openstaande vragen beantwoorden', true], ['Materiaal toevoegen', true]] },
    { g: "Pagina's", r: [['Een pagina goedkeuren', true], ['Een pagina zelf bewerken', false]] },
  ] as const
  return (
    <div className="fv-surface ag-rights">
      {groepen.map((g) => (
        <div key={g.g} className="ag-rights-g">
          <Mono>{g.g}</Mono>
          {g.r.map(([l, aan]) => (
            <div key={l} className="fv-right"><span>{l}</span><span className="fv-toggle" data-on={aan || undefined} /></div>
          ))}
        </div>
      ))}
      <span className="ag-lock"><Icon naam="slot" size={12} />Alles wat een meting, tekst of onderzoek start, blijft bij een beheerder.</span>
    </div>
  )
}

/* ── Kosten ───────────────────────────────────────────────────────────────── */

export function BeheerKosten() {
  return (
    <BeheerVenster tab="Kosten">
      <div className="ag-cost-grid">
        <div className="ag-card ag-limit">
          <Mono>Oktober 2026</Mono>
          <span className="ag-big">€ 46,00</span>
          <div className="fv-cost-bar"><i style={{ width: '18.4%' }} /></div>
          <span className="fv-muted fv-small">Van een limiet van € 250,00. Er is nog € 204,00 over tot 1 november.</span>
        </div>
        <div className="ag-card">
          <strong className="ag-card-t">Wat volgende maand vanzelf loopt</strong>
          <div className="ag-line"><span>14 maandmetingen</span><span>ongeveer € 9,80</span></div>
          <div className="ag-line"><span>35 geplande pagina&apos;s</span><span>ongeveer € 42,00</span></div>
          <div className="ag-line ag-line-sum"><span>Samen</span><span>ongeveer € 51,80</span></div>
        </div>
        <div className="ag-card">
          <strong className="ag-card-t">Deze maand per soort werk</strong>
          <div className="ag-line"><span>Pagina&apos;s schrijven</span><span>€ 24,10</span></div>
          <div className="ag-line"><span>Meten</span><span>€ 14,60</span></div>
          <div className="ag-line"><span>Onderzoek naar het bedrijf</span><span>€ 5,90</span></div>
          <div className="ag-line"><span>Zoekgegevens en onderwerpen</span><span>€ 1,40</span></div>
        </div>
      </div>
    </BeheerVenster>
  )
}

export function PrijsBijKnop() {
  const acties = [
    ['Bevestig en start de meting', 'ongeveer € 0,70'],
    ['Start het onderzoek', 'ongeveer € 1,90'],
    ["Start deze maand, 5 pagina's", 'ongeveer € 6,00'],
  ] as const
  return (
    <div className="fv-surface ag-price">
      <div className="ag-price-main">
        <span className="ag-li-t"><strong>Hybride warmtepomp in Houten</strong><em>Lindeman Warmte · alle vragen beantwoord</em></span>
        <Knop primair klein><Icon naam="sparkle" size={12} />Schrijf deze pagina nu</Knop>
        <span className="fv-small fv-muted">Kost ongeveer € 1,20 per pagina, gemiddeld over wat je bureau eerder betaalde. Van de maandlimiet is nog € 204,00 over.</span>
      </div>
      {acties.map(([a, p]) => (
        <div key={a} className="ag-line"><span>{a}</span><span>{p}</span></div>
      ))}
    </div>
  )
}

export function KostenPerKlant() {
  const rijen = [
    ['Lindeman Warmte', 12.4],
    ['Tandartspraktijk Lunetten', 9.6],
    ['Verbeek Bouw & Renovatie', 8.2],
    ['Fysio Oudwijk', 5.1],
    ['Bakkerij De Korenaar', 4.3],
  ] as const
  const eur = (v: number) => `€ ${v.toFixed(2).replace('.', ',')}`
  return (
    <div className="fv-surface fv-share ag-per">
      <Mono>Oktober per bedrijf</Mono>
      {rijen.map(([n, v], i) => (
        <div key={n} className="fv-share-row" data-eigen={i === 0 || undefined}>
          <span className="fv-share-name">{n}</span>
          <span className="fv-share-bar"><i style={{ width: `${(v / 12.4) * 100}%` }} /></span>
          <span className="fv-share-val">{eur(v)}</span>
        </div>
      ))}
      <div className="ag-line ag-line-sum"><span>Samen, met 2 andere bedrijven</span><span>€ 46,00</span></div>
    </div>
  )
}

/* ── Sleutels ─────────────────────────────────────────────────────────────── */

export function Sleutels() {
  const rijen = [
    { n: 'OpenAI', s: '•••• a91F', ok: true, v: 'Verplicht' },
    { n: 'Gemini', s: '•••• 7Qx2', ok: true },
    { n: 'DataForSEO', s: 'Niet ingevuld', ok: false },
  ]
  return (
    <div className="fv-surface ag-keys">
      {rijen.map((r) => (
        <div key={r.n} className="ag-key">
          <span className="ag-key-icon"><Icon naam="slot" size={14} /></span>
          <span className="ag-li-t"><strong>{r.n}{r.v && <span className="ag-faint"> · {r.v}</span>}</strong><em className={r.ok ? 'fv-mono-plain' : undefined}>{r.s}</em></span>
          {r.ok ? <Chip tone="lime" dot>Werkt</Chip> : <span />}
          <Knop klein>{r.ok ? 'Test' : 'Vul in'}</Knop>
        </div>
      ))}
      <span className="ag-lock"><Icon naam="euro" size={12} />De kosten komen rechtstreeks bij Bureau Noordwind.</span>
    </div>
  )
}

/* ── Gegevens ─────────────────────────────────────────────────────────────── */

export function Archief() {
  return (
    <div className="fv-surface ag-archive">
      <Mono>Gearchiveerd</Mono>
      {[['Kringloop Het Goede Spul', 'sinds 2 september'], ['Rijschool Vooruit', 'sinds 14 juli']].map(([n, d]) => (
        <div key={n} className="ag-key">
          <span className="ag-li-t"><strong>{n}</strong><em>{d}</em></span>
          <Knop klein>Terughalen</Knop>
        </div>
      ))}
      <span className="ag-lock"><Icon naam="check" size={12} />Er start geen betaald werk meer.</span>
    </div>
  )
}

export function Verwijderen() {
  return (
    <div className="fv-surface ag-dialog">
      <strong className="ag-dialog-t">Kringloop Het Goede Spul verwijderen</strong>
      <div className="ag-danger">
        <strong>Dit kan niet terug</strong>
        <span>3 clusters, 486 metingen, 9 geschreven pagina&apos;s en 1 toegang van een kijker gaan weg.</span>
      </div>
      <label className="ag-field"><span className="fv-muted fv-small">Typ de naam van het bedrijf over</span><span className="ag-input ag-input-on">Kringloop Het Goede Sp<i /></span></label>
      <div className="ag-dialog-btns"><span className="ag-ghost">Annuleer</span><span className="ag-btn-danger" data-uit>Verwijder definitief</span></div>
    </div>
  )
}

/* ── Nieuw voor de opbouw naar linear.app/ai ─────────────────────────────── */

/** De rondleiding voor de beheerder bij de eerste keer inloggen. */
export function ZoBeginJe() {
  return (
    <div className="fv-surface ag-tour">
      <div className="ag-tour-head"><Mono>Rondleiding</Mono><span className="fv-muted">Stap 3 van 6</span></div>
      <strong className="ag-dialog-t">Voeg een bedrijf toe</strong>
      <p className="ag-tour-text">Op Merken voeg je een bedrijf toe met alleen de naam en de website. ORBIT ENGINE onderzoekt het in ongeveer tien minuten. Daarna staat bij het bedrijf de lijst Dit bedrijf inrichten.</p>
      <div className="ag-tour-dots" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6].map((n) => <i key={n} data-state={n < 3 ? 'done' : n === 3 ? 'now' : undefined} />)}
      </div>
      <div className="ag-dialog-btns"><span className="ag-ghost">Terug</span><Knop primair klein>Volgende</Knop></div>
    </div>
  )
}

const KIJKER_MENU = [
  ['Overzicht', 'taken', ['Openstaande taken']],
  ['Strategie', 'plan', ['Contentplan', 'Openstaande vragen']],
  ['Resultaten', 'grafiek', ['Zichtbaarheid in AI', 'Zoekverkeer']],
  ['Mijn bedrijf', 'merk', ['Merkdossier', 'Feiten en kennis']],
] as const

/** Wat een kijker ziet: alleen zijn eigen bedrijf, in het menu geen Beheer. */
export function SchermVanDeKijker() {
  return (
    <div className="fv-surface ag-kv">
      <aside className="ag-kv-side">
        <div className="ag-kv-brand"><span className="fv-avatar" data-kleur="3">PL</span><span className="ag-li-t"><strong>Lindeman Warmte</strong><em>Kijker</em></span></div>
        {KIJKER_MENU.map(([kop, , items], g) => (
          <div key={kop} className="ag-kv-group">
            <span className="ag-kv-kop">{kop}</span>
            {items.map((it, i) => <span key={it} className="ag-kv-item" data-on={(g === 0 && i === 0) || undefined}>{it}</span>)}
          </div>
        ))}
      </aside>
      <div className="ag-kv-main">
        <Mono>Wat op jou wacht</Mono>
        <div className="ag-kv-task">
          <span className="ag-li-t"><strong>2 vragen om te beantwoorden</strong><em>Over hybride warmtepompen</em></span>
          <Knop primair klein>Beantwoord</Knop>
        </div>
        <div className="ag-kv-task">
          <span className="ag-li-t"><strong>1 tekst om goed te keuren</strong><em>Hybride warmtepomp in Houten</em></span>
          <Knop klein>Open</Knop>
        </div>
      </div>
    </div>
  )
}

/** Het tabblad Systeemstatus: wat er niet lukte en wat je eraan doet, in een zin. */
export function AlsErIetsMisgaat() {
  return (
    <div className="fv-surface ag-status">
      <div className="ag-status-row"><span className="ag-status-ok"><Icon naam="check" size={12} /></span>Het achtergrondwerk is gekoppeld</div>
      <div className="ag-status-row"><span className="ag-status-ok"><Icon naam="check" size={12} /></span>0 taken wachten, 2 bezig</div>
      <div className="ag-status-row"><span className="ag-status-no">!</span>1 taak niet gelukt in de afgelopen 24 uur</div>
      <div className="ag-status-fail">
        <strong>Wat er misging</strong>
        <span className="ag-status-who">Tandartspraktijk Lunetten <span className="ag-faint">· 1 taak</span></span>
        <span className="ag-status-why">Het tegoed bij OpenAI is op. Vul het tegoed aan in het account bij OpenAI en probeer het daarna opnieuw.</span>
      </div>
    </div>
  )
}

/** De melding als de maandlimiet bereikt is. */
export function MaandlimietBereikt() {
  return (
    <div className="fv-surface ag-limit-hit">
      <div className="ag-limit-top">
        <span className="fv-stip" data-tone="rood" />
        <strong>De maandlimiet van je bureau is bereikt</strong>
      </div>
      <div className="fv-cost-bar ag-bar-full"><i style={{ width: '100%' }} /></div>
      <div className="ag-line"><span>Verbruik deze maand</span><span>€ 250,00 van € 250,00</span></div>
      <div className="ag-line"><span>Nieuw werk dat geld kost</span><span>start weer op 1 november</span></div>
      <span className="ag-lock"><Icon naam="slot" size={12} />Een beheerder kan de limiet verhogen onder Beheer, Kosten.</span>
    </div>
  )
}
