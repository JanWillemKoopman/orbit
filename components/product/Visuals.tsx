// De productbeelden van /product, nagebouwd in de vormgeving van ORBIT ENGINE. Elk beeld toont één
// functie van dichtbij, met de fictieve voorbeeldcase Lindeman Warmte van Bureau Noordwind.
import { Chip, Icon, Knop, Logo, Mono, Stappen, Venster } from './ui'

/* ── 1. Hero: openstaande taken ───────────────────────────────────────────── */

const RONDE = [
  { l: 'Meten', s: '1 oktober', st: 'done' },
  { l: 'Plannen', s: "5 pagina's", st: 'done' },
  { l: 'Schrijven', s: '3 van 5 klaar', st: 'now' },
  { l: 'Publiceren', s: '2 live', st: 'todo' },
  { l: 'Hermeten', s: 'na 14 en 28 dagen', st: 'todo' },
]

const TAKEN = [
  { soort: 'Openstaande vragen', icoon: 'vraag', titel: '2 vragen over hybride warmtepompen', zin: 'Pieter beantwoordt ze via de deellink. Daarna schrijft ORBIT ENGINE de pagina.', knop: 'Bekijk de vragen', primair: true, chip: <Chip tone="oranje" dot>Wacht op klant</Chip> },
  { soort: 'Bibliotheek', icoon: 'boek', titel: 'Warmtepomp in een jaren-30-woning', zin: 'De tekst is klaar. Lees hem, loop één zin na en keur hem goed.', knop: 'Nakijken', chip: <Chip tone="geel" dot>Klaar voor akkoord</Chip> },
  { soort: 'Bibliotheek', icoon: 'boek', titel: 'Hybride warmtepomp in Houten en Nieuwegein', zin: 'Goedgekeurd. Zet hem op de site en meld het live-adres.', knop: 'Publiceren', chip: <Chip tone="lime" dot>Goedgekeurd</Chip> },
  { soort: 'Contentplan', icoon: 'plan', titel: 'November staat klaar', zin: "5 pagina's, gekozen op de grootste kansen uit de meting.", knop: 'Start de maand', chip: <Chip tone="blauw" dot>Volgende maand</Chip> },
]

export function HeroTaken() {
  return (
    <Venster pad={['Lindeman Warmte', 'Openstaande taken']} actief="Openstaande taken" rechts={<span className="fv-pill"><Icon naam="pdf" size={12} />Maandverslag</span>}>
      <div className="fv-page-head">
        <Mono>Lindeman Warmte</Mono>
        <h4 className="fv-h1">Openstaande taken</h4>
        <p className="fv-sub">Gemeten op 1 oktober. De volgende meting draait op 1 november.</p>
      </div>
      <div className="fv-card fv-ronde">
        <div className="fv-card-head">
          <span>Deze maand <em>oktober</em></span>
          <span className="fv-muted">Zichtbaarheid <strong className="fv-lime">49%</strong> <span className="fv-up">↑ 17 sinds juni</span></span>
        </div>
        <div className="fv-ronde-steps">
          {RONDE.map((r) => (
            <div key={r.l} className="fv-ronde-step" data-state={r.st}>
              <span className="fv-ronde-dot">{r.st === 'done' && <Icon naam="check" size={10} />}</span>
              <span className="fv-ronde-l">{r.l}</span>
              <span className="fv-ronde-s">{r.s}</span>
            </div>
          ))}
        </div>
        <div className="fv-ronde-bar"><i style={{ width: '52%' }} /></div>
      </div>
      <div className="fv-section-head">
        <span>Wat er op jou wacht</span>
        <Chip>4 taken</Chip>
      </div>
      <div className="fv-tasks">
        {TAKEN.map((t) => (
          <div key={t.titel} className="fv-task">
            <span className="fv-task-icon"><Icon naam={t.icoon} /></span>
            <div className="fv-task-text">
              <span className="fv-task-type">{t.soort}</span>
              <span className="fv-task-title">{t.titel}</span>
              <span className="fv-task-zin">{t.zin}</span>
            </div>
            {t.chip}
            <Knop primair={t.primair}>{t.knop}</Knop>
          </div>
        ))}
      </div>
    </Venster>
  )
}

/* ── 2. Zichtbaarheid in AI ───────────────────────────────────────────────── */

const MAANDEN = ['jun', 'jul', 'aug', 'sep', 'okt']
const REEKSEN = [
  { naam: 'Cv-ketel onderhoud', waarden: [38, 42, 46, 54, 63], kleur: '#8a8f98' },
  { naam: 'Hybride warmtepomp', waarden: [17, 23, 30, 37, 47], kleur: '#bcff2f' },
  { naam: 'Warmtepomp en subsidie', waarden: [10, 15, 20, 25, 35], kleur: '#62666d' },
]

function lijn(waarden: number[], w: number, h: number) {
  return waarden.map((v, i) => `${(i / (waarden.length - 1)) * w},${h - (v / 70) * h}`).join(' ')
}

export function ZichtbaarheidVenster() {
  const W = 620
  const H = 190
  const hybride = REEKSEN[1].waarden
  const band = [...hybride.map((v, i) => `${(i / 4) * W},${H - ((v + 4) / 70) * H}`), ...[...hybride].reverse().map((v, i) => `${((4 - i) / 4) * W},${H - ((v - 4) / 70) * H}`)].join(' ')
  return (
    <Venster pad={['Resultaten', 'Zichtbaarheid in AI']} actief="Zichtbaarheid in AI" zijbalk={false} rechts={<span className="fv-pill">Laatste 5 metingen</span>}>
      <div className="fv-page-head">
        <h4 className="fv-h1">Zichtbaarheid in AI</h4>
        <p className="fv-sub">Hoe vaak AI-assistenten Lindeman Warmte noemen, over 74 vaste vragen.</p>
      </div>
      <div className="fv-kpis">
        <div className="fv-kpi"><span>Over alle clusters</span><strong>49%</strong><em className="fv-up">↑ 17 sinds juni</em></div>
        <div className="fv-kpi"><span>Marge</span><strong>±3</strong><em>punten</em></div>
        <div className="fv-kpi"><span>Gemeten AI-vragen</span><strong>74</strong><em>elke maand</em></div>
      </div>
      <div className="fv-card fv-chart-card">
        <div className="fv-card-head">
          <span>Per cluster</span>
          <span className="fv-legend">{REEKSEN.map((r) => <span key={r.naam}><i style={{ background: r.kleur }} />{r.naam}</span>)}</span>
        </div>
        <svg viewBox={`-10 -10 ${W + 20} ${H + 34}`} className="fv-chart" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2={W} y1={(H / 3) * i} y2={(H / 3) * i} stroke="rgba(255,255,255,0.05)" />)}
          <polygon points={band} fill="rgba(188,255,47,0.08)" />
          {REEKSEN.map((r) => <polyline key={r.naam} points={lijn(r.waarden, W, H)} fill="none" stroke={r.kleur} strokeWidth={r.kleur === '#bcff2f' ? 2.2 : 1.5} strokeLinejoin="round" />)}
          {REEKSEN.map((r) => <circle key={r.naam} cx={W} cy={H - (r.waarden[4] / 70) * H} r="3.5" fill={r.kleur} />)}
          {MAANDEN.map((m, i) => <text key={m} x={(i / 4) * W} y={H + 22} fill="#62666d" fontSize="11" textAnchor="middle">{m}</text>)}
        </svg>
      </div>
      <div className="fv-table">
        <div className="fv-tr fv-th"><span>Cluster</span><span>Zichtbaarheid</span><span>Verandering</span><span>Telt mee</span></div>
        {[...REEKSEN].sort((a, b) => b.waarden[4] - a.waarden[4]).map((r) => (
          <div key={r.naam} className="fv-tr">
            <span className="fv-strong">{r.naam}</span>
            <span><strong>{r.waarden[4]}%</strong> <span className="fv-muted">±{r.naam.startsWith('Hybride') ? 3 : 4}</span></span>
            <span><Chip tone="lime">↑ {r.waarden[4] - r.waarden[3]}</Chip></span>
            <span className="fv-muted">{r.naam.startsWith('Cv') ? '24 van 24' : r.naam.startsWith('Hybride') ? '30 van 30' : '20 van 20'}</span>
          </div>
        ))}
      </div>
    </Venster>
  )
}

export function AiAntwoord() {
  return (
    <div className="fv-float fv-answer">
      <div className="fv-answer-top"><Mono>ChatGPT · gemeten 1 september</Mono><Chip tone="oranje" dot>Lindeman Warmte niet genoemd</Chip></div>
      <div className="fv-bubble">Welke installateur in Utrecht is goed in hybride warmtepompen?</div>
      <div className="fv-answer-body">
        <p>Voor een hybride warmtepomp in Utrecht worden deze installateurs vaak aanbevolen:</p>
        <ol>
          <li><mark>Warmtewerk Utrecht</mark> geeft vooraf een warmteverliesberekening.</li>
          <li><mark>Domstad Installaties</mark> regelt ook de subsidieaanvraag.</li>
          <li><mark>KlimaatPro</mark> heeft een vast team voor Midden-Nederland.</li>
        </ol>
      </div>
      <div className="fv-answer-src">
        <span className="fv-muted">Bronnen</span>
        {['warmtepompweb.example', 'vakmanvinden.example', 'energieloket-utrecht.example'].map((b) => <span key={b} className="fv-src"><Icon naam="wereld" size={11} />{b}</span>)}
      </div>
    </div>
  )
}

export function AandeelGenoemd() {
  const rijen = [
    { n: 'Warmtewerk Utrecht', v: 58 },
    { n: 'Domstad Installaties', v: 51 },
    { n: 'Lindeman Warmte', v: 47, eigen: true },
    { n: 'KlimaatPro', v: 39 },
    { n: 'Van Dijk Installatietechniek', v: 22 },
  ]
  return (
    <div className="fv-float fv-share">
      <div className="fv-float-head"><span>Wie wordt genoemd</span><Mono>Hybride warmtepomp · 30 vragen</Mono></div>
      {rijen.map((r) => (
        <div key={r.n} className="fv-share-row" data-eigen={r.eigen || undefined}>
          <span className="fv-share-name">{r.n}</span>
          <span className="fv-share-bar">
            <i style={{ width: `${r.v}%` }} />
          </span>
          <span className="fv-share-val">{r.v}%</span>
        </div>
      ))}
      <span className="fv-share-note"><span className="fv-lime">↑ 30 punten</span> sinds de nulmeting in juni</span>
    </div>
  )
}

/* ── 3. Bedrijfskennis ────────────────────────────────────────────────────── */

export function Merkdossier() {
  return (
    <div className="fv-float fv-dossier">
      <div className="fv-float-head"><span>Merkdossier</span><Chip tone="lime" dot>Compleet</Chip></div>
      <div className="fv-field">
        <span className="fv-label">Doelgroep</span>
        <p>Huiseigenaren in Utrecht met een bestaande cv-ketel die stap voor stap willen verduurzamen.</p>
      </div>
      <div className="fv-field">
        <span className="fv-label">Positionering</span>
        <p>De installateur uit de buurt, met de monteur die je al kent.</p>
      </div>
      <div className="fv-field fv-field-row">
        <span className="fv-label">Aanspreekvorm</span>
        <span className="fv-seg"><span data-on>je en jij</span><span>u en uw</span></span>
      </div>
      <div className="fv-field fv-field-row">
        <span className="fv-label">Merkstem</span>
        <span className="fv-tags">{['Nuchter', 'Vakkundig', 'Persoonlijk'].map((t) => <Chip key={t}>{t}</Chip>)}</span>
      </div>
      <div className="fv-field fv-field-row">
        <span className="fv-label">Nooit gebruiken</span>
        <span className="fv-tags">{['goedkoopste', 'revolutionair'].map((t) => <span key={t} className="fv-chip fv-strike">{t}</span>)}</span>
      </div>
    </div>
  )
}

export function FeitenKennis() {
  const rijen = [
    { t: 'Installatie van een hybride warmtepomp in één werkdag', b: 'Klant', tone: 'lime' as const },
    { t: 'Vijf jaar garantie op het installatiewerk', b: 'Klant', tone: 'lime' as const },
    { t: 'Erkend installateur met InstallQ-erkenning', b: 'Document', tone: 'blauw' as const },
    { t: 'Werkgebied: Utrecht, Nieuwegein, Houten, Zeist', b: 'Gesprek', tone: 'geel' as const },
    { t: 'Familiebedrijf, sinds 1998 actief in Utrecht', b: 'Website', tone: 'grijs' as const },
  ]
  return (
    <div className="fv-float fv-facts">
      <div className="fv-float-head"><span>Feiten en kennis</span><Mono>24 feiten · allemaal met bron</Mono></div>
      {rijen.map((r) => (
        <div key={r.t} className="fv-fact">
          <span className="fv-fact-check"><Icon naam="check" size={11} /></span>
          <span className="fv-fact-t">{r.t}</span>
          <Chip tone={r.tone}>{r.b}</Chip>
        </div>
      ))}
    </div>
  )
}

/* ── 4. Contentkansen en planning ─────────────────────────────────────────── */

export function VanVraagNaarPagina() {
  return (
    <div className="fv-flow">
      <svg className="fv-flow-lines" viewBox="0 0 600 260" aria-hidden="true">
        <path d="M200 62 C 236 62, 232 130, 262 130" stroke="rgba(255,255,255,0.2)" fill="none" />
        <path d="M200 198 C 236 198, 232 130, 262 130" stroke="rgba(255,255,255,0.2)" fill="none" />
        <path d="M382 130 L 412 130" stroke="#bcff2f" fill="none" />
        <circle cx="262" cy="130" r="3" fill="rgba(255,255,255,0.4)" />
        <circle cx="412" cy="130" r="3" fill="#bcff2f" />
      </svg>
      <div className="fv-node" style={{ left: 0, top: 4 }}>
        <Mono>AI-vraag</Mono>
        <span>Welke installateur in Utrecht is goed in hybride warmtepompen?</span>
        <Chip tone="oranje">Niet genoemd</Chip>
      </div>
      <div className="fv-node" style={{ left: 0, top: 160 }}>
        <Mono>Google</Mono>
        <span>hybride warmtepomp utrecht</span>
        <Chip>340 vertoningen, positie 31</Chip>
      </div>
      <div className="fv-node fv-node-kans" style={{ left: 262, top: 98 }}>
        <Mono>Kans</Mono>
        <span>Potentie <strong className="fv-lime">78</strong></span>
      </div>
      <div className="fv-node fv-node-page" style={{ left: 412, top: 84 }}>
        <Mono>Pagina · oktober</Mono>
        <span>Hybride warmtepomp laten installeren in Utrecht</span>
      </div>
    </div>
  )
}

export function PaginaIdee() {
  return (
    <div className="fv-float fv-idea">
      <div className="fv-idea-top">
        <div>
          <span className="fv-idea-title">Hybride warmtepomp laten installeren in Utrecht</span>
          <span className="fv-muted">Nieuwe dienstpagina · cluster Hybride warmtepomp</span>
        </div>
        <span className="fv-ring" style={{ '--p': 78 } as React.CSSProperties}><span>78</span></span>
      </div>
      <p className="fv-idea-why">ChatGPT noemt hier drie concurrenten. Lindeman Warmte levert deze dienst wel, maar heeft er nog geen pagina over.</p>
      <span className="fv-label">Doelvragen · raakt 8 van 30</span>
      <ul className="fv-goals">
        {['Welke installateur in Utrecht is goed in hybride warmtepompen?', 'Hybride warmtepomp laten plaatsen in Nieuwegein of Houten?', 'Welke installateurs geven garantie op een hybride warmtepomp?'].map((v) => (
          <li key={v}><i />{v}</li>
        ))}
      </ul>
      <div className="fv-row"><Knop primair klein>Plan in oktober</Knop><Knop klein>Andere maand</Knop></div>
    </div>
  )
}

const KOLOMMEN = [
  { maand: 'Oktober', chip: <Chip tone="lime" dot>Gestart</Chip>, kaarten: [
    ['Hybride warmtepomp laten installeren in Utrecht', 'Wacht op klant', 'oranje', '24 okt'],
    ['Warmtepomp in een jaren-30-woning', 'Klaar voor akkoord', 'geel', '15 okt'],
    ['Hybride warmtepomp in Houten en Nieuwegein', 'Goedgekeurd', 'lime', '20 okt'],
    ['Cv-ketel vervangen in Nieuwegein', 'Wordt geschreven', 'blauw', '30 okt'],
  ] },
  { maand: 'November', chip: <Chip tone="blauw" dot>Klaar om te starten</Chip>, kaarten: [
    ['ISDE of energiebespaarlening: wat past bij jou?', 'Gepland', 'grijs', '5 nov'],
    ['Waar plaats je de buitenunit van een warmtepomp?', 'Gepland', 'grijs', '12 nov'],
    ['Hybride warmtepomp laten installeren in Zeist', 'Gepland', 'grijs', '19 nov'],
  ] },
  { maand: 'December', chip: <Chip>Voorstel</Chip>, kaarten: [
    ['Warmtepomp en thuisbatterij combineren', 'Idee', 'grijs', '3 dec'],
    ['Hoeveel geluid maakt een hybride warmtepomp?', 'Idee', 'grijs', '10 dec'],
  ] },
] as const

export function ContentplanBord() {
  return (
    <Venster pad={['Strategie', 'Contentplan']} actief="Contentplan" zijbalk={false} rechts={<span className="fv-seg fv-seg-sm"><span>Overzicht</span><span data-on>Plannen</span><span>Kalender</span></span>}>
      <div className="fv-board">
        {KOLOMMEN.map((k) => (
          <div key={k.maand} className="fv-col">
            <div className="fv-col-head"><span>{k.maand} 2026</span>{k.chip}<em>{k.kaarten.length}</em></div>
            {k.kaarten.map(([t, s, tone, d]) => (
              <div key={t} className="fv-kaart">
                <span className="fv-kaart-t">{t}</span>
                <span className="fv-kaart-meta"><Chip tone={tone} dot>{s}</Chip><span className="fv-muted">{d}</span></span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Venster>
  )
}

/* ── 5. Klantinput ────────────────────────────────────────────────────────── */

export function VragenTeam() {
  return (
    <div className="fv-float fv-questions">
      <div className="fv-float-head"><span>Openstaande vragen</span><span className="fv-pill"><Icon naam="link" size={12} />Deel deze vragen</span></div>
      <span className="fv-muted fv-small">Hybride warmtepomp laten installeren in Utrecht</span>
      <div className="fv-progress"><i style={{ width: '50%' }} /></div>
      <span className="fv-small"><strong>2 van 4</strong> <span className="fv-muted">beantwoord · graag vóór 12 oktober</span></span>
      <div className="fv-q fv-q-done"><Icon naam="check" size={12} /><span>Hoe lang duurt het plaatsen, vanaf het eerste bezoek?<em>Eén werkdag, met twee eigen monteurs.</em></span></div>
      <div className="fv-q fv-q-done"><Icon naam="check" size={12} /><span>Welke garantie geven jullie op de installatie?<em>Vijf jaar op het installatiewerk.</em></span></div>
      <div className="fv-q fv-q-open"><span>Uit welke onderdelen bestaat jullie prijs?<em>Zonder prijsopbouw blijft de pagina algemeen.</em></span></div>
      <div className="fv-q fv-q-open"><span>Hoe ver vooruit kun je nu een installatie inplannen?</span></div>
    </div>
  )
}

export function VragenKlant() {
  return (
    <div className="fv-phone">
      <div className="fv-phone-notch" />
      <div className="fv-phone-screen">
        <div className="fv-phone-brand"><Logo size={16} /><span>ORBIT ENGINE</span></div>
        <span className="fv-phone-h">Vragen voor Lindeman Warmte</span>
        <span className="fv-muted fv-small">Bureau Noordwind schrijft pagina&apos;s voor jullie website. Hoe concreter je antwoord, hoe beter de pagina.</span>
        <div className="fv-phone-q">
          <span className="fv-strong">Uit welke onderdelen bestaat jullie prijs voor een hybride warmtepomp?</span>
          <span className="fv-phone-field">Toestel, buitenunit, montage en het aansluiten op de bestaande ketel. Opname en subsidieaanvraag zitten erbij in.<i /></span>
          <div className="fv-row"><Knop primair klein>Opslaan</Knop><Knop klein>Overslaan</Knop></div>
        </div>
        <div className="fv-phone-q fv-phone-q-next">
          <span className="fv-strong">Hoe ver vooruit kun je nu een installatie inplannen?</span>
        </div>
        <span className="fv-phone-foot"><Icon naam="slot" size={11} />Geen account nodig</span>
      </div>
    </div>
  )
}

/* ── 6. Schrijven en controleren ──────────────────────────────────────────── */

export function TekstEditor() {
  return (
    <Venster pad={['Bibliotheek', 'Hybride warmtepomp laten installeren in Utrecht']} actief="Bibliotheek" zijbalk={false} rechts={<span className="fv-pill"><Icon naam="sparkle" size={12} />Vraag een aanpassing</span>}>
      <div className="fv-doc-wrap">
        <div className="fv-doc">
          <Stappen nu={2} />
          <h4 className="fv-doc-h1">Hybride warmtepomp laten installeren in Utrecht</h4>
          <p>Een hybride warmtepomp verwarmt je huis grotendeels met buitenlucht en laat je cv-ketel alleen bijspringen als het echt koud is. Bij Lindeman Warmte begint dat altijd met een bezoek bij je thuis en een warmteverliesberekening.</p>
          <h5>Hoe de installatie verloopt</h5>
          <p>
            De installatie zelf duurt bij ons <span className="fv-answer-mark">één werkdag<span className="fv-tip"><Icon naam="vraag" size={11} />Antwoord van Pieter Lindeman · 8 okt</span></span>. Twee eigen monteurs plaatsen de buitenunit en sluiten de warmtepomp aan op je bestaande ketel.{' '}
            <span className="fv-yellow">Na je akkoord plannen we de installatie meestal binnen twee weken in.</span>
          </p>
          <h5>Wat er in de prijs zit</h5>
          <p>Je krijgt één prijs voor het toestel, de buitenunit, de montage en het aansluiten op je ketel. De opname en de ISDE-subsidieaanvraag zitten erbij in.</p>
        </div>
        <div className="fv-doc-side">
          <span className="fv-label">Gebouwd op</span>
          {[['Merkdossier', '6 feiten'], ['Antwoorden van de klant', '3'], ['Website', '4 pagina\'s'], ['Meting', '8 doelvragen']].map(([a, b]) => (
            <span key={a} className="fv-side-src"><Icon naam="check" size={11} />{a}<em>{b}</em></span>
          ))}
          <span className="fv-label" style={{ marginTop: 14 }}>Merkstem</span>
          <span className="fv-side-src">je en jij · nuchter</span>
        </div>
      </div>
    </Venster>
  )
}

export function ZinNalopen() {
  return (
    <div className="fv-float fv-check">
      <div className="fv-float-head"><span>Loop deze zin na</span><Chip tone="geel">1 van 1</Chip></div>
      <blockquote>Na je akkoord plannen we de installatie meestal binnen twee weken in.</blockquote>
      <span className="fv-small fv-muted">Waarom geel: een concrete termijn die nergens in het merkdossier staat.</span>
      <div className="fv-row"><Knop klein><Icon naam="check" size={12} />Klopt</Knop><Knop klein>Pas aan</Knop><Knop primair klein>Vraag het bedrijf</Knop></div>
    </div>
  )
}

export function Eindredactie() {
  const regels = [
    ['Elke bewering heeft een bron', '14 van 15', true],
    ['Merkstem: je en jij, nuchter', 'klopt', true],
    ['Geen woorden van de verboden lijst', '0 gevonden', true],
    ['Titel en omschrijving voor Google', 'klaar', true],
    ['Zin om na te lopen', '1', false],
  ] as const
  return (
    <div className="fv-float fv-review">
      <div className="fv-float-head"><span>Eindredactie</span><Mono>vóór jouw akkoord</Mono></div>
      {regels.map(([t, w, ok]) => (
        <div key={t} className="fv-review-row" data-ok={ok || undefined}>
          <span className="fv-review-dot">{ok ? <Icon naam="check" size={10} /> : '!'}</span>
          <span>{t}</span>
          <em>{w}</em>
        </div>
      ))}
    </div>
  )
}

/* ── 7. Goedkeuren en publiceren ──────────────────────────────────────────── */

export function Publiceren() {
  return (
    <div className="fv-publish">
      <div className="fv-float fv-publish-card">
        <span className="fv-idea-title">Hybride warmtepomp laten installeren in Utrecht</span>
        <Stappen nu={3} />
        <div className="fv-aanzet">
          <span className="fv-small fv-muted">Goedgekeurd door Pieter Lindeman · 10 okt</span>
          <span>Zet de tekst op de site en meld daarna het adres.</span>
          <div className="fv-url"><Icon naam="wereld" size={12} />lindemanwarmte.example/hybride-warmtepomp-utrecht</div>
          <div className="fv-row"><Knop primair klein>Meld dat hij live staat</Knop><Knop klein><Icon naam="kopie" size={12} />Kopieer tekst</Knop></div>
        </div>
      </div>
      <div className="fv-menu">
        <span className="fv-menu-kop">Kopieer voor je CMS</span>
        <span className="fv-menu-item" data-on><Icon naam="code" />Kopieer als HTML</span>
        <span className="fv-menu-item"><Icon naam="tekst" />Kopieer als Markdown</span>
        <span className="fv-menu-item"><Icon naam="tekst" />Kopieer als platte tekst</span>
        <span className="fv-menu-sep" />
        <span className="fv-menu-item"><Icon naam="download" />Download met FAQ en schema</span>
      </div>
    </div>
  )
}

/* ── 8. Opvolging ─────────────────────────────────────────────────────────── */

export function Hermeting() {
  const rijen = [
    { l: 'Vóór publicatie', d: '3 sep', n: 0 },
    { l: 'Na 14 dagen', d: '17 sep', n: 3 },
    { l: 'Na 28 dagen', d: '1 okt', n: 5 },
  ]
  return (
    <div className="fv-float fv-remeasure">
      <div className="fv-float-head"><span>Genoemd door AI</span><Chip tone="lime" dot>Gestegen</Chip></div>
      <span className="fv-muted fv-small">8 doelvragen van de pagina, opnieuw gemeten</span>
      {rijen.map((r) => (
        <div key={r.l} className="fv-re-row">
          <span className="fv-re-l">{r.l}<em>{r.d}</em></span>
          <span className="fv-dots">{Array.from({ length: 8 }, (_, i) => <i key={i} data-on={i < r.n || undefined} />)}</span>
          <strong>{r.n} van 8</strong>
        </div>
      ))}
      <span className="fv-share-note">AI citeert de nieuwe pagina nu als bron.</span>
    </div>
  )
}

export function Zoekverkeer() {
  const dagen = Array.from({ length: 38 }, (_, i) => Math.round(2 + i * 0.32 + 2.4 * Math.sin(i * 1.3) + (i > 20 ? 2 : 0)))
  const max = Math.max(...dagen)
  return (
    <div className="fv-float fv-traffic">
      <div className="fv-float-head"><span>Zoekverkeer</span><Mono>Google Search Console</Mono></div>
      <div className="fv-traffic-kpis">
        <span><strong>262</strong>klikken</span>
        <span><strong>3.940</strong>vertoningen</span>
        <span><strong>6,4</strong>gem. positie</span>
      </div>
      <div className="fv-bars">
        <span className="fv-bars-live"><Mono>Live 3 sep</Mono></span>
        {dagen.map((v, i) => <i key={i} style={{ height: `${Math.max(4, (v / max) * 100)}%` }} />)}
      </div>
      <div className="fv-bars-axis"><span>3 sep</span><span>10 okt</span></div>
    </div>
  )
}

/* ── 9. Rapportage ────────────────────────────────────────────────────────── */

export function Maandverslag() {
  return (
    <div className="fv-report">
      <div className="fv-report-head">
        <span className="fv-report-logo">N</span>
        <div>
          <span className="fv-report-by">Bureau Noordwind voor Lindeman Warmte</span>
          <h4 className="fv-doc-h1">Verslag van september 2026</h4>
        </div>
        <span className="fv-pill"><Icon naam="pdf" size={12} />Opslaan als pdf</span>
      </div>
      <div className="fv-kpis fv-kpis-report">
        <div className="fv-kpi"><span>Zichtbaarheid in AI</span><strong>39%</strong><em className="fv-up">↑ 7 punten</em></div>
        <div className="fv-kpi"><span>Pagina&apos;s live</span><strong>5</strong><em>deze maand</em></div>
        <div className="fv-kpi"><span>Klikken uit Google</span><strong>1.204</strong><em className="fv-up">↑ 68%</em></div>
      </div>
      <div className="fv-report-grid">
        <div>
          <span className="fv-label">Wat er live ging</span>
          {[['Hybride warmtepomp laten installeren in Utrecht', 'Genoemd: 0 → 5 van 8'], ['Hybride warmtepomp en zonnepanelen', 'Genoemd: 0 → 4 van 6'], ['Storing aan je warmtepomp: wat nu?', 'Genoemd: 0 → 4 van 6']].map(([t, e]) => (
            <div key={t} className="fv-report-row"><span>{t}</span><Chip tone="lime">{e}</Chip></div>
          ))}
        </div>
        <div>
          <span className="fv-label">Volgende maand</span>
          {['Warmtepomp in een jaren-30-woning', 'Hybride warmtepomp in Houten en Nieuwegein', 'Wat kost een hybride warmtepomp in 2026?', 'Cv-ketel vervangen in Nieuwegein'].map((t) => (
            <div key={t} className="fv-report-row"><span className="fv-muted">{t}</span></div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── 10. Bureauoverzicht en beheer ────────────────────────────────────────── */

const BEDRIJVEN = [
  { n: 'Lindeman Warmte', b: 'Installatietechniek', z: [17, 23, 30, 37, 47], w: <Chip tone="oranje" dot>2 vragen</Chip>, s: '2 dagen', k: '€ 16,88', sel: true },
  { n: 'Tandartspraktijk Lunetten', b: 'Mondzorg', z: [35, 40, 45, 55], w: <Chip tone="lime" dot>1 te publiceren</Chip>, s: '1 dag', k: '€ 9,78', sel: true },
  { n: 'Fysio Oudwijk', b: 'Fysiotherapie', z: [44, 50, 61], w: <Chip tone="geel" dot>1 tekst nakijken</Chip>, s: '3 dagen', k: '€ 8,43', sel: false },
  { n: 'Verbeek Bouw & Renovatie', b: 'Aannemer', z: [19, 27, 35, 42], w: <Chip tone="geel" dot>2 teksten nakijken</Chip>, s: '1 dag', k: '€ 10,52', sel: true },
  { n: 'Brink & Mulder Advocaten', b: 'Advocatuur', z: [24, 31, 38], w: <Chip tone="oranje" dot>3 vragen</Chip>, s: '4 dagen', k: '€ 12,44', sel: false },
  { n: 'Groenrijk Hoveniers', b: 'Tuinaanleg', z: [14, 23], w: <Chip tone="blauw" dot>Wordt geschreven</Chip>, s: 'vandaag', k: '€ 16,14', sel: false },
]

function Spark({ v }: { v: number[] }) {
  const pts = v.map((x, i) => `${(i / Math.max(1, v.length - 1)) * 60},${22 - (x / 70) * 22}`).join(' ')
  return <svg width="60" height="22" viewBox="-2 -2 64 26" aria-hidden="true"><polyline points={pts} fill="none" stroke="#bcff2f" strokeWidth="1.5" strokeLinejoin="round" /></svg>
}

export function Werkoverzicht() {
  return (
    <div className="fv-window fv-window-bare fv-portfolio">
      <div className="fv-main">
        <div className="fv-bar">
          <span className="fv-crumbs"><span><Logo size={16} /> Bureau Noordwind</span><span className="fv-crumb-current"><span className="fv-sep">›</span>Merken</span></span>
          <span className="fv-pill fv-pill-lime">+ Nieuw merk</span>
        </div>
        <div className="fv-body">
          <div className="fv-bulk"><span><strong>3 geselecteerd</strong></span><Knop klein>Maandmeting aan</Knop><Knop klein>Pagina&apos;s per maand: 10</Knop><Knop primair klein>Start de maand</Knop></div>
          <div className="fv-ptable">
            <div className="fv-ptr fv-th"><span /><span>Bedrijf</span><span>Zichtbaarheid</span><span>Wacht op jou</span><span>Sinds</span><span>Kosten 30 dagen</span></div>
            {BEDRIJVEN.map((b) => (
              <div key={b.n} className="fv-ptr" data-sel={b.sel || undefined}>
                <span className="fv-box">{b.sel && <Icon naam="check" size={10} />}</span>
                <span className="fv-pname"><strong>{b.n}</strong><em>{b.b}</em></span>
                <span className="fv-pvis"><Spark v={b.z} /><strong>{b.z[b.z.length - 1]}%</strong></span>
                <span>{b.w}</span>
                <span className="fv-muted">{b.s}</span>
                <span className="fv-muted">{b.k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Toegang() {
  const mensen = [
    { i: 'SV', n: 'Sanne de Vries', r: 'Beheerder', z: 'Alle bedrijven', k: '1' },
    { i: 'JB', n: 'Joris Bakker', r: 'Beheerder', z: 'Alle bedrijven', k: '2' },
    { i: 'PL', n: 'Pieter Lindeman', r: 'Kijker', z: 'Lindeman Warmte', k: '3' },
    { i: 'FJ', n: 'Femke Jansen', r: 'Kijker', z: 'Tandartspraktijk Lunetten', k: '4' },
  ]
  return (
    <div className="fv-access">
      <div className="fv-float fv-people">
        <div className="fv-float-head"><span>Wie er toegang heeft</span><span className="fv-pill">Uitnodigen</span></div>
        {mensen.map((m) => (
          <div key={m.n} className="fv-person">
            <span className="fv-avatar" data-kleur={m.k}>{m.i}</span>
            <span className="fv-person-n"><strong>{m.n}</strong><em>{m.z}</em></span>
            <Chip tone={m.r === 'Beheerder' ? 'grijs' : 'blauw'}>{m.r}</Chip>
          </div>
        ))}
      </div>
      <div className="fv-menu fv-rights">
        <span className="fv-menu-kop">Pieter mag</span>
        {['Vragen beantwoorden', 'Teksten goedkeuren', 'Melden dat iets live staat'].map((r) => <span key={r} className="fv-menu-item"><span className="fv-toggle" data-on />{r}</span>)}
        <span className="fv-menu-item fv-muted"><span className="fv-toggle" />Teksten bewerken</span>
      </div>
    </div>
  )
}

export function Kosten() {
  const per = [['Groenrijk Hoveniers', 10.93], ['Lindeman Warmte', 10.46], ['Brink & Mulder Advocaten', 7.78], ['Verbeek Bouw & Renovatie', 6.76], ['Tandartspraktijk Lunetten', 5.65]] as const
  return (
    <div className="fv-float fv-costs">
      <div className="fv-float-head"><span>Kosten</span><Mono>oktober 2026</Mono></div>
      <div className="fv-cost-top"><strong>€ 46,39</strong><span className="fv-muted">van je limiet van € 250</span></div>
      <div className="fv-progress fv-progress-lg"><i style={{ width: '19%' }} /></div>
      <span className="fv-label">Per bedrijf</span>
      {per.map(([n, v]) => (
        <div key={n} className="fv-cost-row"><span>{n}</span><span className="fv-cost-bar"><i style={{ width: `${(v / 11) * 100}%` }} /></span><em>€ {v.toFixed(2).replace('.', ',')}</em></div>
      ))}
    </div>
  )
}
