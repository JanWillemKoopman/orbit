// De beelden van /ai: wie wat doet, hoe een meting tot een cijfer komt, hoe een pagina ontstaat, wat
// er op de achtergrond loopt en waar AI ophoudt. Voorbeeldgegevens van het fictieve Lindeman Warmte.
import { Chip, Icon, Knop, Logo, Mono } from '@/components/product/ui'

/* ── Wie doet wat: de tabel ───────────────────────────────────────────────── */

const RIJEN = [
  ['Onderzoeken', 'Leest de website en legt aanbod, concurrenten en markt vast', 'Een feit telt alleen met een letterlijk citaat', 'Loopt het dossier na'],
  ['Vragen opstellen', 'Bedenkt dertig AI-vragen langs de klantreis', 'Ontdubbelt en houdt de vragen merkneutraal', 'Past aan, zet uit, voegt toe'],
  ['Meten', 'Stelt de vragen en beoordeelt wie er genoemd wordt', 'Rekent zichtbaarheid en marge uit', 'Kiest de kanalen'],
  ['Analyseren', 'Zoekt uit waarom concurrenten genoemd worden', 'Haalt onbewezen beweringen uit de uitslag', 'Kiest en plant'],
  ['Voorbereiden', 'Onderzoekt wat op de pagina moet en stelt hooguit acht vragen', 'Schrijft pas als alle vragen beantwoord zijn', 'Beantwoordt de vragen, of je klant doet het'],
  ['Schrijven', 'Schrijft titel, tekst en veelgestelde vragen', 'Markeert harde beweringen zonder bron geel', 'Bevestigt gele zinnen'],
  ['Eindredactie', 'Leest mee en verbetert alleen wat nodig is', 'Weigert een correctie met een nieuwe bewering', 'Keurt goed'],
  ['Publiceren', 'Doet niets', 'Controleert of de pagina echt live staat', 'Kopieert, plaatst en meldt het adres'],
  ['Nameten', 'Meet na 14 en 28 dagen opnieuw', 'Vergelijkt met de stand voor publicatie', 'Bespreekt het resultaat'],
] as const

export function WieDoetWat() {
  return (
    <div className="wd">
      <div className="wd-row wd-head">
        <span />
        <span><Chip tone="blauw">AI</Chip></span>
        <span><Chip>Code</Chip></span>
        <span><Chip tone="lime">Jij</Chip></span>
      </div>
      {RIJEN.map(([stap, ai, code, jij]) => (
        <div key={stap} className="wd-row">
          <strong>{stap}</strong>
          <span className={ai === 'Doet niets' ? 'wd-leeg' : undefined}>{ai}</span>
          <span>{code}</span>
          <span>{jij}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Raster in sectie 1 ───────────────────────────────────────────────────── */

export function WaaromConcurrentWint() {
  const rijen = [
    ['Prijs', '“Vanaf € 4.200, inclusief installatie”'],
    ['Snelheid', '“Binnen een week ingepland”'],
    ['Reputatie', '“Veel positieve reviews van klanten in Utrecht”'],
  ] as const
  return (
    <div className="fv-surface ai-comp">
      <div className="fv-q-head"><span>Waarom Installatiebedrijf Van Rijn wordt genoemd</span></div>
      {rijen.map(([e, q]) => (
        <div key={e} className="ai-comp-row">
          <Chip tone="blauw">{e}</Chip>
          <span className="ai-comp-q">{q}</span>
        </div>
      ))}
      <span className="ag-lock"><Icon naam="slot" size={12} />De naam van een concurrent komt nooit in je tekst, alleen de eigenschap.</span>
    </div>
  )
}

export function BriefVoorPagina() {
  const vragen = [
    'Wat kost een hybride warmtepomp inclusief installatie?',
    'Welke subsidies zijn er voor een hybride warmtepomp?',
    'Hoe lang duurt de installatie bij een woning uit de jaren dertig?',
  ]
  return (
    <div className="fv-surface ai-brief">
      <div className="fv-q-head"><span>Brief: hybride warmtepomp in Houten</span><Chip tone="oranje" dot>3 vragen</Chip></div>
      {vragen.map((v) => (
        <div key={v} className="ai-brief-vraag"><Icon naam="vraag" size={13} />{v}</div>
      ))}
      <span className="ag-lock"><Icon naam="check" size={12} />Hooguit acht vragen per pagina.</span>
    </div>
  )
}

/* ── Sectie 2: meten ──────────────────────────────────────────────────────── */

const STROOM = [
  { wie: 'AI', t: 'AI-vraag', s: 'Welke installateur in Utrecht raad je aan voor een hybride warmtepomp?' },
  { wie: 'AI', t: 'Antwoord met zoeken op het web', s: 'ChatGPT, en per onderwerp Gemini en Google AI Overview' },
  { wie: 'AI', t: 'Beoordeling', s: 'Wie wordt er genoemd, en in welke rol?' },
  { wie: 'Code', t: 'Rekenen', s: 'Zichtbaarheid en aandeel, met een marge' },
] as const

export function MeetStroom() {
  return (
    <div className="ms">
      <div className="ms-flow">
        {STROOM.map((n, i) => (
          <div key={n.t} className="ms-flow-stap">
            <div className="fv-surface ms-node" data-wie={n.wie}>
              <Chip tone={n.wie === 'AI' ? 'blauw' : 'grijs'}>{n.wie}</Chip>
              <strong>{n.t}</strong>
              <span>{n.s}</span>
            </div>
            <span className="ms-pijl" aria-hidden="true"><Icon naam="pijl" size={16} /></span>
            {i === STROOM.length - 1 && null}
          </div>
        ))}
        <div className="fv-surface ms-node ms-result">
          <Mono>Cijfer</Mono>
          <span className="ms-num">47%<b>± 10</b></span>
          <span>Lindeman Warmte, hybride warmtepomp</span>
        </div>
      </div>
      <div className="ms-foot">
        <span><Icon naam="check" size={12} />Antwoorden die niet te beoordelen zijn, tellen niet mee</span>
        <span><Icon naam="check" size={12} />Genoemd wint van niet genoemd</span>
      </div>
    </div>
  )
}

export function Kennistest() {
  const rijen = [
    ['Gevestigd in Eindhoven', false],
    ['Installeert hybride warmtepompen', true],
    ['Werkt alleen met eigen monteurs', true],
  ] as const
  return (
    <div className="fv-surface ai-test">
      <div className="fv-q-head"><span>Wat ChatGPT uit zichzelf weet</span><span className="fv-seg"><span data-on>Zonder zoeken</span><span>Met zoeken</span></span></div>
      {rijen.map(([t, ok]) => (
        <div key={t} className="ai-test-rij">
          <span>{t}</span>
          <Chip tone={ok ? 'lime' : 'rood'} dot>{ok ? 'Klopt' : 'Klopt niet'}</Chip>
        </div>
      ))}
      <span className="ag-lock"><Icon naam="check" size={12} />Code oordeelt, het model beoordeelt zichzelf niet.</span>
    </div>
  )
}

export function Kanalen() {
  const rijen = [
    ['ChatGPT', 'De basis van je cijfer. Staat altijd aan.', true, true],
    ['Gemini', 'Meet ook in de assistent van Google. Kost extra per vraag.', true, false],
    ['Google AI Overview', 'Het antwoord bovenaan de Google-resultaten. Kost extra per vraag.', false, false],
  ] as const
  return (
    <div className="fv-surface ai-kanalen">
      <div className="fv-q-head"><span>Meten in welke assistenten?</span></div>
      {rijen.map(([n, u, aan, vast]) => (
        <div key={n} className="ai-kanaal">
          <span className="ag-li-t"><strong>{n}</strong><em>{u}</em></span>
          <span className="fv-toggle" data-on={aan || undefined} data-vast={vast || undefined} />
        </div>
      ))}
    </div>
  )
}

/* ── Sectie 3: schrijven ──────────────────────────────────────────────────── */

const STRAAT = [
  { n: 1, t: 'Brief', s: 'Onderzoekt wat op de pagina moet', wie: 'AI' },
  { n: 2, t: 'Vragen', s: 'Hooguit acht, aan jou of je klant', wie: 'Jij' },
  { n: 3, t: 'Schrijven', s: 'Pas als alle vragen beantwoord zijn', wie: 'AI' },
  { n: 4, t: 'Eindredactie', s: 'Verbetert alleen wat nodig is', wie: 'AI' },
  { n: 5, t: 'Goedkeuren', s: 'Pas als elke gele zin is nagelopen', wie: 'Jij' },
] as const

export function Schrijfstraat() {
  return (
    <div className="ss">
      <div className="ss-rij">
        {STRAAT.map((st, i) => (
          <div key={st.t} className="ss-stap">
            <div className="fv-surface ss-kaart">
              <span className="ss-top"><span className="ss-nr">{st.n}</span><Chip tone={st.wie === 'AI' ? 'blauw' : 'lime'}>{st.wie}</Chip></span>
              <strong>{st.t}</strong>
              <span>{st.s}</span>
            </div>
            {i < STRAAT.length - 1 && <span className="ss-pijl" aria-hidden="true"><Icon naam="pijl" size={16} /></span>}
          </div>
        ))}
      </div>
      <div className="ss-regel">
        <span className="ss-code"><Chip>Code</Chip></span>
        <span>Houdt verboden woorden en concurrentnamen eruit, weigert een correctie met een nieuwe bewering en markeert harde beweringen zonder bron geel.</span>
      </div>
    </div>
  )
}

/* ── Sectie 4: het werk op de achtergrond ─────────────────────────────────── */

const WERK = [
  { n: 'Bakkerij De Korenaar', w: 'Onderzoek', s: 'Aanbod en markt in kaart', c: 'Wordt onderzocht', tone: 'blauw' },
  { n: 'Lindeman Warmte', w: 'Meting', s: 'Maandmeting van het onderwerp hybride warmtepomp', c: 'Loopt', tone: 'blauw' },
  { n: 'Verbeek Bouw & Renovatie', w: 'Pagina', s: 'Tekst wordt geschreven', c: 'Schrijft', tone: 'blauw' },
  { n: 'Tandartspraktijk Lunetten', w: 'Hermeting', s: 'Na 14 dagen, met de stand voor publicatie', c: 'Gepland', tone: 'grijs' },
  { n: 'Fysio Oudwijk', w: 'Pagina', s: 'Wacht op antwoorden van de klant', c: 'Wacht op klant', tone: 'oranje' },
] as const

export function AchtergrondWerk() {
  return (
    <div className="ag-window aw">
      <div className="ag-bar">
        <span className="ag-crumbs"><Logo size={18} /><span>Bureau Noordwind</span><span className="ag-sep">›</span><span className="ag-crumb-current">Beheer</span></span>
        <Knop klein>Ververs</Knop>
      </div>
      <div className="ag-view">
        <div className="ag-head"><span className="ag-title">Systeemstatus</span><span className="ag-sub">Wat er nu op de achtergrond loopt</span></div>
        <div className="aw-status">
          <span><i data-ok />Het achtergrondwerk is gekoppeld</span>
          <span><i data-ok />1 taak wacht, 3 bezig</span>
          <span><i data-ok />0 taken niet gelukt in de afgelopen 24 uur</span>
        </div>
        <div className="ag-table">
          {WERK.map((r) => (
            <div key={r.n} className="aw-tr">
              <strong>{r.n}</strong>
              <span className="aw-w">{r.w}</span>
              <span className="aw-s">{r.s}</span>
              <Chip tone={r.tone} dot>{r.c}</Chip>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Sectie 5: de grenzen ─────────────────────────────────────────────────── */

export function WatAiEnCodeDoen() {
  const rijen = [
    ['Onderzoeken en vragen bedenken', 'AI'],
    ['Antwoorden beoordelen', 'AI'],
    ['Een pagina schrijven en nalezen', 'AI'],
    ['Marges en aandelen uitrekenen', 'Code'],
    ['Het effect na 14 en 28 dagen vergelijken', 'Code'],
  ] as const
  return (
    <div className="fv-surface cl-lijst">
      {rijen.map(([t, wie]) => (
        <div key={t} className="cl-rij"><Chip tone={wie === 'AI' ? 'blauw' : 'grijs'}>{wie}</Chip>{t}</div>
      ))}
    </div>
  )
}

export function WatJijBeslist() {
  const punten = [
    'Of een vermoeden een feit is',
    'Of een tekst bij het merk past',
    'Wanneer een pagina live gaat',
    'Wat je je klant vertelt als een verschil binnen de marge valt',
  ]
  return (
    <div className="fv-surface cl-lijst">
      {punten.map((p) => (
        <div key={p} className="cl-rij"><span className="cl-stip" />{p}</div>
      ))}
    </div>
  )
}
