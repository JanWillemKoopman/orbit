// De beelden van de derde testhomepage (/homepage3), in de beeldtaal van linear.app: echte schermen op ware
// grootte, in lagen over elkaar, die over de rand van het vlak lopen. Eén verhaal loopt door alle beelden:
// Bureau Kade pitcht bij Brouwer Kozijnen, schrijft daarna zijn pagina's en laat het effect zien. Alle namen
// en getallen zijn voorbeelddata van verzonnen bedrijven.
import { LogoMark } from '@/components/Logo'
import { MerkIcoon } from '@/components/homepage1/Visuals'

const KLANT = 'Brouwer Kozijnen'
const BUREAU = 'Bureau Kade'

function Venster({ pad, rechts, className = '', children }: { pad: string[]; rechts?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <div className={`hp3-venster ${className}`}>
      <div className="hp3-balk">
        <span className="hp3-balk-logo"><LogoMark size={12} /></span>
        {pad.map((p, i) => <span key={p} className={i === pad.length - 1 ? 'hp3-pad-nu' : 'hp3-pad'}>{p}</span>)}
        {rechts && <span className="hp3-balk-rechts">{rechts}</span>}
      </div>
      {children}
    </div>
  )
}

function Vink({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
}

/* ── Isometrische lijntekeningen bij het pakket (FIG 0.1 tot 0.3) ───────────── */

// Isometrische projectie: x naar rechtsonder, y naar linksonder, z omhoog.
const iso = (x: number, y: number, z = 0): [number, number] => [(x - y) * 0.866, (x + y) * 0.5 - z]
const pt = (p: [number, number]) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`

/** Een blok: bovenvlak en de twee zichtbare zijvlakken, gevuld met de achtergrond zodat achterliggende lijnen wegvallen. */
function Blok({ x, y, z, w, d, h, accent = false }: { x: number; y: number; z: number; w: number; d: number; h: number; accent?: boolean }) {
  const top = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)]
  const rechts = [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)]
  const voor = [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)]
  const lijn = accent ? '#bcff2f' : 'rgba(255,255,255,0.32)'
  return (
    <g strokeLinejoin="round" strokeWidth="1">
      <polygon points={rechts.map(pt).join(' ')} fill="#0b0c0d" stroke={lijn} />
      <polygon points={voor.map(pt).join(' ')} fill="#0d0e0f" stroke={lijn} />
      <polygon points={top.map(pt).join(' ')} fill={accent ? 'rgba(188,255,47,0.08)' : '#111213'} stroke={lijn} />
    </g>
  )
}

/** Een cirkel op het grondvlak, als veelhoek in isometrie. */
function Ring({ cx, cy, r, z = 0, accent = false }: { cx: number; cy: number; r: number; z?: number; accent?: boolean }) {
  const punten = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2
    return pt(iso(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z))
  })
  return <polygon points={punten.join(' ')} fill="none" stroke={accent ? '#bcff2f' : 'rgba(255,255,255,0.22)'} strokeWidth="1" strokeDasharray={accent ? undefined : '3 4'} />
}

export function Figuur({ nummer }: { nummer: 0 | 1 | 2 }) {
  return (
    <svg className="hp3-fig" viewBox="-130 -70 260 190" aria-hidden="true">
      {nummer === 0 && (
        // Scan: een vlak met ringen rond één punt, het bedrijf dat je meet.
        <g>
          <Blok x={-60} y={-60} z={0} w={120} d={120} h={6} />
          <Ring cx={0} cy={0} r={52} z={6} />
          <Ring cx={0} cy={0} r={34} z={6} />
          <Ring cx={0} cy={0} r={16} z={6} accent />
          <Blok x={-5} y={-5} z={6} w={10} d={10} h={34} accent />
        </g>
      )}
      {nummer === 1 && (
        // Content: een stapel pagina's, de bovenste met regels tekst.
        <g>
          {[0, 1, 2, 3].map((i) => <Blok key={i} x={-46} y={-62} z={i * 16} w={92} d={124} h={4} accent={i === 3} />)}
          {[0, 1, 2, 3].map((r) => {
            const a = iso(-30, -44 + r * 18, 52)
            const b = iso(r === 3 ? 6 : 30, -44 + r * 18, 52)
            return <line key={r} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="rgba(188,255,47,0.55)" strokeWidth="1" />
          })}
        </g>
      )}
      {nummer === 2 && (
        // Effect: vier staven die maand na maand hoger worden.
        <g>
          <Blok x={-70} y={-24} z={0} w={140} d={48} h={4} />
          {[16, 32, 52, 80].map((h, i) => <Blok key={i} x={-62 + i * 34} y={-10} z={4} w={22} d={20} h={h} accent={i === 3} />)}
        </g>
      )}
    </svg>
  )
}

/* ── 1. Verkopen: wat ChatGPT zegt, en de pitch die de prospect te zien krijgt ─ */

export function VerkopenCompositie() {
  return (
    <div className="hp3-comp">
      <Venster pad={['ChatGPT']} className="hp3-achter hp3-chat">
        <div className="hp3-chat-body">
          <p className="hp3-bel">Welk bedrijf in Haarlem plaatst goede kunststof kozijnen?</p>
          <div className="hp3-chat-antwoord">
            <span className="hp3-chat-van"><MerkIcoon merk="chatgpt" size={14} />ChatGPT</span>
            <p>In Haarlem worden deze bedrijven vaak genoemd:</p>
            <ol>
              <li><b>KozijnPlus</b>, bekend om een korte levertijd.</li>
              <li><b>Raamwerk Haarlem</b>, met veel goede beoordelingen.</li>
              <li><b>Spaarne Kozijnen</b>, gespecialiseerd in renovatie.</li>
            </ol>
          </div>
        </div>
      </Venster>
      <div className="hp3-voor hp3-pitch">
        <div className="hp3-pitch-balk"><i /><i /><i /><span>Pitch van {BUREAU}</span></div>
        <div className="hp3-pitch-pagina">
          <div className="hp3-pitch-merk"><span>K</span>{BUREAU}</div>
          <span className="hp3-pitch-voor">Voor {KLANT}, Haarlem</span>
          <h4>Bij 7 van de 10 vragen raadt ChatGPT een ander bedrijf aan</h4>
          <div className="hp3-pitch-cijfers">
            <span><em>Genoemd</em><strong>3 van 10</strong></span>
            <span><em>Vaakst in jouw plaats</em><strong>KozijnPlus</strong></span>
            <span><em>Grootste kans</em><strong>Kozijnen vervangen</strong></span>
          </div>
          <span className="hp3-pitch-knop">Plan een gesprek met {BUREAU}</span>
        </div>
      </div>
      <div className="hp3-melding">
        <span className="hp3-melding-icoon"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11.5V7.5a4 4 0 0 1 8 0v4l1 1.5H3z" /><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" /></svg></span>
        <span><strong>De pitch voor {KLANT} is geopend</strong><em>Zojuist</em></span>
      </div>
    </div>
  )
}

/* ── 2. Content: het plan van de maand en een geschreven pagina ──────────────── */

const PLAN = [
  { t: 'Kunststof kozijnen laten plaatsen in Haarlem', s: 'Geschreven', aan: true },
  { t: 'Wat kosten nieuwe kozijnen?', s: 'Wacht op je klant' },
  { t: 'Houten of kunststof kozijnen', s: 'Wordt geschreven' },
  { t: 'Kozijnen vervangen in een jaren-30-woning', s: '18 nov' },
  { t: 'HR++ of triple glas', s: '24 nov' },
  { t: 'Onderhoud van kunststof kozijnen', s: '27 nov' },
]

export function ContentCompositie() {
  return (
    <div className="hp3-comp">
      <Venster pad={[KLANT, 'Contentplan']} rechts={<span className="hp3-pil">November · 10 pagina&apos;s</span>} className="hp3-achter hp3-plan">
        <div className="hp3-plan-lijst">
          {PLAN.map((r) => (
            <div className="hp3-plan-rij" key={r.t}>
              <i data-aan={r.aan || undefined} />
              <span className="hp3-plan-t">{r.t}</span>
              <span className="hp3-plan-s">{r.s}</span>
            </div>
          ))}
        </div>
      </Venster>
      <Venster pad={['Bibliotheek', 'Kunststof kozijnen laten plaatsen in Haarlem']} className="hp3-voor hp3-pagina">
        <div className="hp3-pagina-body">
          <article className="hp3-pagina-tekst">
            <span className="hp3-klein">Dienstpagina · 1.240 woorden</span>
            <h4>Kunststof kozijnen laten plaatsen in Haarlem</h4>
            <p>Nieuwe kozijnen maken je huis stiller, warmer en makkelijker te onderhouden. Brouwer meet in, maakt de kozijnen op maat en plaatst ze in een vaste ploeg.</p>
            <h5>Hoe gaat het plaatsen?</h5>
            <p>Na het inmeten hoor je binnen een week wanneer we komen. Op de dag zelf…</p>
            <span className="hp3-regels"><i /><i /><i style={{ width: '62%' }} /></span>
          </article>
          <aside className="hp3-pagina-zij">
            <span className="hp3-klein">Bij deze pagina</span>
            {['Metatitel', 'Metabeschrijving', '4 veelgestelde vragen', 'Gestructureerde gegevens', '3 interne links'].map((r) => (
              <span className="hp3-zij-rij" key={r}><Vink />{r}</span>
            ))}
            <span className="hp3-knoppen">
              <span className="hp3-knop">Kopieer als HTML</span>
              <span className="hp3-knop hp3-knop-primair">Goedkeuren</span>
            </span>
          </aside>
        </div>
      </Venster>
    </div>
  )
}

export function GeleZin() {
  return (
    <div className="hp3-cel-geel">
      <p>Brouwer plaatst je nieuwe kozijnen meestal in één dag. <mark>Op alle kozijnen krijg je vijftien jaar garantie.</mark></p>
      <div className="hp3-popover">
        <span className="hp3-popover-kop"><i />Geen bron voor deze garantie</span>
        <span className="hp3-knoppen">
          <span className="hp3-knop">Pas aan</span>
          <span className="hp3-knop hp3-knop-primair">Vraag het bedrijf</span>
        </span>
      </div>
    </div>
  )
}

export function Deellink() {
  const vragen = ['Wat kost een kozijn gemiddeld bij jullie?', 'Hoe lang is de levertijd na het inmeten?', 'Welk keurmerk hebben jullie kozijnen?']
  return (
    <div className="hp3-deel">
      <div className="hp3-deel-kop"><strong>Vragen voor {KLANT}</strong><span className="hp3-klein">3 open</span></div>
      {vragen.map((v) => <span className="hp3-deel-vraag" key={v}>{v}</span>)}
      <div className="hp3-deel-voet">
        <span className="hp3-knop hp3-knop-primair">Deellink kopiëren</span>
        <span className="hp3-klein">Geen account nodig</span>
      </div>
    </div>
  )
}

/* ── 3. Bewijzen: zichtbaarheid, het effect van de pagina en het verslag ───────── */

const MAANDEN = [
  { m: 'jun', v: 12, marge: 10 },
  { m: 'jul', v: 14, marge: 9 },
  { m: 'aug', v: 17, marge: 9 },
  { m: 'sep', v: 21, marge: 8 },
  { m: 'okt', v: 26, marge: 7 },
  { m: 'nov', v: 31, marge: 6 },
]

function Grafiek() {
  const w = 420
  const h = 120
  const max = 45
  const x = (i: number) => 6 + (i * (w - 12)) / (MAANDEN.length - 1)
  const y = (v: number) => h - (v / max) * h
  const lijn = MAANDEN.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p.v)}`).join(' ')
  const boven = MAANDEN.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p.v + p.marge)}`).join(' ')
  const onder = [...MAANDEN].reverse().map((p, j) => `L${x(MAANDEN.length - 1 - j)} ${y(p.v - p.marge)}`).join(' ')
  return (
    <svg className="hp3-grafiek" viewBox={`0 0 ${w} ${h + 22}`} aria-hidden="true">
      <path d={`${boven} ${onder} Z`} fill="rgba(188,255,47,0.08)" />
      <path d={lijn} fill="none" stroke="#bcff2f" strokeWidth="1.75" strokeLinejoin="round" />
      <circle cx={x(5)} cy={y(31)} r="3.5" fill="#bcff2f" />
      {MAANDEN.map((p, i) => <text key={p.m} x={x(i)} y={h + 18} textAnchor="middle" fill="#62666d" fontSize="11" fontFamily="inherit">{p.m}</text>)}
    </svg>
  )
}

// Klikken per dag uit Search Console, vanaf de publicatiedag (de streep).
const KLIKKEN = [0, 0, 0, 0, 0, 1, 2, 2, 4, 3, 5, 6, 5, 8, 7, 9, 11, 10, 12, 14, 13, 15, 17, 16]

export function BewijzenCompositie() {
  const max = Math.max(...KLIKKEN)
  return (
    <div className="hp3-comp">
      <Venster pad={[KLANT, 'Zichtbaarheid in AI']} className="hp3-achter hp3-zicht">
        <div className="hp3-zicht-body">
          <span className="hp3-klein">November, gewogen over 30 vragen</span>
          <strong className="hp3-cijfer">31%<em>± 6</em></strong>
          <Grafiek />
        </div>
      </Venster>
      <Venster pad={[KLANT, 'Effect van de pagina']} className="hp3-voor hp3-effect">
        <div className="hp3-effect-body">
          <span className="hp3-klein">Kunststof kozijnen laten plaatsen in Haarlem</span>
          {[['Vóór publicatie', 1], ['Na 14 dagen', 3], ['Na 28 dagen', 5]].map(([l, n]) => (
            <div className="hp3-effect-rij" key={l}>
              <span>{l}</span>
              <span className="hp3-segment">{Array.from({ length: 8 }, (_, i) => <i key={i} data-aan={i < (n as number) || undefined} />)}</span>
              <strong>{n}/8</strong>
            </div>
          ))}
          <span className="hp3-oordeel"><Vink /> Gestegen, buiten de marge</span>
          <div className="hp3-klikken">
            <span className="hp3-klein">Klikken uit Google</span>
            <div className="hp3-staven">
              {KLIKKEN.map((k, i) => <i key={i} style={{ height: `${Math.max(3, (k / max) * 100)}%` }} />)}
              <span className="hp3-live">Live</span>
            </div>
            <span className="hp3-klikken-n"><strong>214</strong> klikken sinds publicatie</span>
          </div>
        </div>
      </Venster>
      <div className="hp3-verslag">
        <span className="hp3-verslag-kop"><span>K</span><span><em>{BUREAU} voor {KLANT}</em><b>Verslag van november</b></span></span>
        <span className="hp3-verslag-rij"><em>Zichtbaarheid</em><b>31% ± 6</b></span>
        <span className="hp3-verslag-rij"><em>Pagina&apos;s live</em><b>4</b></span>
        <span className="hp3-verslag-knop">Opslaan als pdf</span>
      </div>
    </div>
  )
}

/* ── 4. Schalen: alle klanten en de maand in één keer starten ────────────────── */

const KLANTEN = [
  { n: KLANT, z: 31, wacht: '3 vragen bij de klant', k: '€ 7', gekozen: true },
  { n: 'Advocatenkantoor Lindhout', z: 18, wacht: 'Niets', k: '€ 5', gekozen: true },
  { n: 'Fietsenmaker De Spaak', z: 44, wacht: '2 teksten nakijken', k: '€ 8', gekozen: true },
  { n: 'Tandartspraktijk Noord', z: 27, wacht: 'Niets', k: '€ 4', gekozen: true },
  { n: 'Hoveniersbedrijf Groen', z: 35, wacht: '1 pagina plaatsen', k: '€ 6', gekozen: true },
  { n: 'Kookstudio Peper', z: 9, wacht: 'Onderzoek klaar', k: '€ 2', gekozen: true },
  { n: 'Bakkerij Van Vliet', z: 22, wacht: 'Niets', k: '€ 3' },
]

export function SchalenCompositie() {
  return (
    <div className="hp3-comp">
      <Venster pad={[BUREAU, 'Werkoverzicht']} rechts={<span className="hp3-pil">7 klanten</span>} className="hp3-achter hp3-werk">
        <div className="hp3-tabel">
          <div className="hp3-tr hp3-th"><span /><span>Klant</span><span>Zichtbaarheid</span><span>Wacht op</span><span>30 dagen</span></div>
          {KLANTEN.map((r) => (
            <div className="hp3-tr" key={r.n}>
              <span className="hp3-vakje" data-aan={r.gekozen || undefined}>{r.gekozen && <Vink size={10} />}</span>
              <span className="hp3-td-naam">{r.n}</span>
              <span>{r.z}%</span>
              <span className="hp3-td-zacht">{r.wacht}</span>
              <span className="hp3-td-zacht">{r.k}</span>
            </div>
          ))}
        </div>
      </Venster>
      <div className="hp3-voor hp3-start">
        <strong className="hp3-start-titel">Start de maand voor 6 klanten</strong>
        <div className="hp3-start-rij"><span>Pagina&apos;s</span><b>42</b></div>
        <div className="hp3-start-rij"><span>Maandmeting</span><b>Aan</b></div>
        <div className="hp3-start-rij"><span>Geschatte AI-kosten</span><b>ongeveer € 35</b></div>
        <div className="hp3-limiet">
          <span className="hp3-limiet-balk"><i style={{ width: '14%' }} /><i style={{ width: '14%' }} data-nieuw /></span>
          <span className="hp3-klein">Daarna is er € 180 van je maandlimiet van € 250 over</span>
        </div>
        <span className="hp3-knoppen hp3-start-knoppen">
          <span className="hp3-knop">Annuleren</span>
          <span className="hp3-knop hp3-knop-primair">Start de maand</span>
        </span>
      </div>
    </div>
  )
}
