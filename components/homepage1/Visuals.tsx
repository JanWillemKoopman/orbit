// De beelden van de testhomepage (/homepage1). Elk beeld is nieuw nagebouwd in HTML en SVG, zodat het op
// elk scherm scherp is, en toont één ding dat een bureau moet begrijpen. Alle namen en getallen zijn
// voorbeelddata van verzonnen bedrijven; elk beeld draagt daarom het label Voorbeeld.
import { LogoMark } from '@/components/Logo'

/* ── Bouwstenen ───────────────────────────────────────────────────────────── */

const PADEN: Record<string, React.ReactNode> = {
  plan: <><rect x="2.5" y="3" width="11" height="10.5" rx="2" /><path d="M2.5 6.5h11M5.5 1.5v3M10.5 1.5v3" /></>,
  mensen: <><circle cx="6" cy="6" r="2.25" /><path d="M2 13c.4-2.2 2-3.5 4-3.5s3.6 1.3 4 3.5" /><path d="M10.5 3.9a2.25 2.25 0 0 1 0 4.2M12 9.8c1 .6 1.7 1.7 2 3.2" /></>,
  link: <><path d="M6.5 9.5 9.5 6.5" /><path d="M7.5 4.5 9 3a2.5 2.5 0 0 1 3.5 3.5L11 8M8.5 11.5 7 13a2.5 2.5 0 0 1-3.5-3.5L5 8" /></>,
  ster: <path d="m8 2.5 1.7 3.5 3.8.5-2.8 2.6.7 3.8L8 11.1l-3.4 1.8.7-3.8-2.8-2.6 3.8-.5z" />,
  euro: <><path d="M11.5 4.5a4.5 4.5 0 1 0 0 7" /><path d="M3 7h6M3 9h6" /></>,
  slot: <><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></>,
  zoek: <><circle cx="7" cy="7" r="4.25" /><path d="m10.2 10.2 3.3 3.3" /></>,
  wereld: <><circle cx="8" cy="8" r="5.75" /><path d="M2.5 8h11M8 2.25c1.6 1.7 2.4 3.6 2.4 5.75S9.6 12.05 8 13.75C6.4 12.05 5.6 10.15 5.6 8S6.4 3.95 8 2.25z" /></>,
  check: <path d="m3.5 8.5 3 3 6-7" />,
  bel: <><path d="M4 11.5V7.5a4 4 0 0 1 8 0v4l1 1.5H3z" /><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" /></>,
  oog: <><path d="M1.75 8S4 3.75 8 3.75 14.25 8 14.25 8 12 12.25 8 12.25 1.75 8 1.75 8z" /><circle cx="8" cy="8" r="2" /></>,
  pijl: <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />,
  terug: <><path d="M12.5 8a4.5 4.5 0 1 1-1.3-3.2" /><path d="M12.5 2.5v2.75H9.75" /></>,
}

export function Icoon({ naam, size = 14 }: { naam: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PADEN[naam]}
    </svg>
  )
}

type Toon = 'lime' | 'oranje' | 'geel' | 'blauw' | 'grijs' | 'rood'

function Label({ toon = 'grijs', children, stip = false }: { toon?: Toon; children: React.ReactNode; stip?: boolean }) {
  return <span className="hp1-label" data-toon={toon}>{stip && <i />}{children}</span>
}

/** Het label linksboven op elk beeld: dit is een voorbeeld, geen echte klant. */
export function Voorbeeld() {
  return <span className="hp1-voorbeeld">Voorbeeld</span>
}

/** Een appvenster met een smalle titelbalk: het bedrijf of de plek in de app, en rechts een detail. */
function Venster({ pad, rechts, children, className = '' }: { pad: string[]; rechts?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`hp1-venster ${className}`}>
      <div className="hp1-venster-balk">
        <span className="hp1-venster-logo"><LogoMark size={12} /></span>
        {pad.map((p, i) => (
          <span key={p} className={i === pad.length - 1 ? 'hp1-pad-nu' : 'hp1-pad'}>{i > 0 && <em>/</em>}{p}</span>
        ))}
        {rechts && <span className="hp1-venster-rechts">{rechts}</span>}
      </div>
      {children}
    </div>
  )
}

/* ── Merken van de AI-assistenten (simple-icons, CC0; de Google-G in zijn eigen kleuren) ─────────── */

export function MerkIcoon({ merk, size = 16 }: { merk: 'chatgpt' | 'gemini' | 'google'; size?: number }) {
  if (merk === 'chatgpt') {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" /></svg>
  }
  if (merk === 'gemini') {
    // Effen in plaats van het kleurverloop: een verloop vraagt een id, en dit icoon staat meerdere keren op de pagina.
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="#8f86e6" aria-hidden="true"><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" /></svg>
  }
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#ea4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285f4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#fbbc05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34a853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

/* ── 1. Wat AI nu zegt ────────────────────────────────────────────────────── */

const EIGEN = 'Hofstede Zonnepanelen'

const ANTWOORDEN = [
  {
    merk: 'chatgpt' as const,
    naam: 'ChatGPT',
    tekst: 'In Amersfoort worden vaak genoemd:',
    namen: ['ZonVast', 'Eemland Solar', 'Helder Energie'],
    eigen: null,
  },
  {
    merk: 'gemini' as const,
    naam: 'Gemini',
    tekst: 'Goede opties in de regio zijn:',
    namen: ['Eemland Solar', EIGEN, 'ZonVast'],
    eigen: 2,
  },
  {
    merk: 'google' as const,
    naam: 'AI-overzicht van Google',
    tekst: 'Installateurs met veel ervaring:',
    namen: ['ZonVast', 'Helder Energie'],
    eigen: null,
  },
]

/** Eén vraag van een consument, drie antwoorden: zo ziet een bureau in één oogopslag het probleem van zijn klant. */
export function DrieAntwoorden() {
  return (
    <div className="hp1-antwoorden">
      <div className="hp1-vraag">
        <span className="hp1-mono">Vraag van een klant van je klant</span>
        <p>Welk bedrijf in Amersfoort installeert betrouwbaar zonnepanelen?</p>
      </div>
      <div className="hp1-antwoorden-rij">
        {ANTWOORDEN.map((a) => {
          const genoemd = a.namen.includes(EIGEN)
          return (
            <div className="hp1-antwoord" key={a.naam} data-genoemd={genoemd || undefined}>
              <div className="hp1-antwoord-kop">
                <span className="hp1-antwoord-merk"><MerkIcoon merk={a.merk} />{a.naam}</span>
              </div>
              <p className="hp1-antwoord-tekst">{a.tekst}</p>
              <ol className="hp1-namen">
                {a.namen.map((n, i) => (
                  <li key={n} data-eigen={n === EIGEN || undefined}><span>{i + 1}</span>{n}</li>
                ))}
              </ol>
              <div className="hp1-antwoord-voet">
                {genoemd ? <Label toon="lime" stip>{EIGEN}: plek {a.eigen}</Label> : <Label toon="oranje" stip>{EIGEN}: niet genoemd</Label>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── 2. De dienstenlijn ───────────────────────────────────────────────────── */

export function DienstKaart({ naam, ritme, krijgt, onderdelen, nummer }: { naam: string; ritme: string; krijgt: string; onderdelen: string[]; nummer: number }) {
  return (
    <li className="hp1-dienst">
      <div className="hp1-dienst-kop">
        <span className="hp1-mono">{String(nummer).padStart(2, '0')}</span>
        <Label toon={ritme === 'Eenmalig' ? 'blauw' : ritme === 'Elke maand' ? 'lime' : 'grijs'}>{ritme}</Label>
      </div>
      <h3>{naam}</h3>
      <p>{krijgt}</p>
      <div className="hp1-dienst-voet">
        <span className="hp1-mono">In Orbit</span>
        <span className="hp1-dienst-onderdelen">{onderdelen.map((o) => <em key={o}>{o}</em>)}</span>
      </div>
    </li>
  )
}

/* ── 3. De kringloop ──────────────────────────────────────────────────────── */

/** Vijf stappen op één lijn, met een pijl die van Hermeten terugloopt naar Meten. */
export function Kringloop({ stappen }: { stappen: { titel: string; tekst: string }[] }) {
  return (
    <div className="hp1-kring">
      <ol className="hp1-kring-stappen">
        {stappen.map((s, i) => (
          <li key={s.titel} className="hp1-kring-stap">
            <span className="hp1-kring-nr" data-laatste={i === stappen.length - 1 || undefined}>{i + 1}</span>
            <h3>{s.titel}</h3>
            <p>{s.tekst}</p>
          </li>
        ))}
      </ol>
      <div className="hp1-kring-terug" aria-hidden="true">
        <svg viewBox="0 0 1000 48" preserveAspectRatio="none">
          <path d="M980 0 V20 Q980 40 960 40 H40 Q20 40 20 20 V6" fill="none" stroke="currentColor" strokeWidth="1.25" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="hp1-kring-terug-tekst"><Icoon naam="terug" size={12} /> De uitkomst voedt de volgende maand</span>
      </div>
    </div>
  )
}

/* ── 4. Meten: een cijfer met marge ──────────────────────────────────────── */

// Zes maandmetingen met hun marge (procentpunt). De marge wordt kleiner naarmate rustige maanden samengevoegd worden.
const MAANDEN = [
  { m: 'mei', v: 16, marge: 11 },
  { m: 'jun', v: 19, marge: 10 },
  { m: 'jul', v: 18, marge: 9 },
  { m: 'aug', v: 24, marge: 8 },
  { m: 'sep', v: 29, marge: 7 },
  { m: 'okt', v: 34, marge: 6 },
]

function MargeGrafiek() {
  const w = 560
  const h = 200
  const max = 50
  const x = (i: number) => 20 + (i * (w - 40)) / (MAANDEN.length - 1)
  const y = (v: number) => h - (v / max) * h
  const lijn = MAANDEN.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p.v)}`).join(' ')
  const boven = MAANDEN.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p.v + p.marge)}`).join(' ')
  const onder = [...MAANDEN].reverse().map((p, j) => `L${x(MAANDEN.length - 1 - j)} ${y(p.v - p.marge)}`).join(' ')
  return (
    <svg className="hp1-grafiek" viewBox={`0 0 ${w} ${h + 28}`} aria-hidden="true">
      {[0, 10, 20, 30, 40, 50].map((g) => (
        <g key={g}>
          <line x1="0" x2={w} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.05)" />
        </g>
      ))}
      <path d={`${boven} ${onder} Z`} fill="rgba(188,255,47,0.09)" />
      <path d={lijn} fill="none" stroke="#bcff2f" strokeWidth="1.75" strokeLinejoin="round" />
      {MAANDEN.map((p, i) => (
        <g key={p.m}>
          <line x1={x(i)} x2={x(i)} y1={y(p.v + p.marge)} y2={y(p.v - p.marge)} stroke="rgba(188,255,47,0.35)" />
          <circle cx={x(i)} cy={y(p.v)} r={i === MAANDEN.length - 1 ? 4 : 2.5} fill="#bcff2f" />
          <text x={x(i)} y={h + 22} textAnchor="middle" fill="#62666d" fontSize="11" fontFamily="inherit">{p.m}</text>
        </g>
      ))}
    </svg>
  )
}

const FASEN = [
  { fase: 'Oriëntatie', vragen: 10, genoemd: 6, gewicht: 'laag' },
  { fase: 'Overweging', vragen: 10, genoemd: 3, gewicht: 'midden' },
  { fase: 'Beslissing', vragen: 10, genoemd: 1, gewicht: 'hoog' },
]

export function Meting() {
  return (
    <Venster pad={[EIGEN, 'Zichtbaarheid in AI']} rechts={<span className="hp1-pil">Thuisbatterij · 30 vragen</span>} className="hp1-meting">
      <div className="hp1-meting-body">
        <div className="hp1-meting-hoofd">
          <div className="hp1-cijfer">
            <span className="hp1-mono">Gewogen zichtbaarheid, oktober</span>
            <strong>34%<em>± 6</em></strong>
            <span className="hp1-cijfer-uitleg"><Label toon="lime" stip>Gestegen sinds juli</Label> Het verschil is groter dan de marge, dus geen toeval.</span>
          </div>
          <MargeGrafiek />
        </div>
        <div className="hp1-meting-zij">
          <span className="hp1-mono">Langs de klantreis</span>
          {FASEN.map((f) => (
            <div className="hp1-fase" key={f.fase}>
              <div className="hp1-fase-kop"><span>{f.fase}</span><em>weegt {f.gewicht}</em></div>
              <div className="hp1-fase-blokjes">
                {Array.from({ length: f.vragen }, (_, i) => <i key={i} data-aan={i < f.genoemd || undefined} />)}
              </div>
              <span className="hp1-fase-n">Genoemd bij {f.genoemd} van {f.vragen}</span>
            </div>
          ))}
          <div className="hp1-meting-tip">
            <Icoon naam="oog" />
            <span>Op het moment van kiezen valt je klant weg. Daar zit de grootste kans.</span>
          </div>
        </div>
      </div>
    </Venster>
  )
}

/* ── 5. Schrijven: de gele zin ───────────────────────────────────────────── */

export function Vangnet() {
  return (
    <div className="hp1-vangnet">
      <Venster pad={[EIGEN, 'Bibliotheek', 'Thuisbatterij bij zonnepanelen']} rechts={<Label toon="geel" stip>1 zin wacht</Label>} className="hp1-tekst-venster">
        <article className="hp1-tekst">
          <span className="hp1-mono">Dienstpagina · 1.180 woorden · in de stem van het merk</span>
          <h4>Een thuisbatterij bij je zonnepanelen in Amersfoort</h4>
          <p>
            Met een thuisbatterij gebruik je de stroom van je eigen dak ook &apos;s avonds. Hofstede plaatst de batterij
            <mark data-toon="groen"> in één dag<sup>1</sup></mark>, naast je omvormer of in de meterkast.
          </p>
          <p>
            Een installatie begint <mark data-toon="groen">vanaf € 3.950<sup>2</sup></mark>, inclusief montage en aanmelding bij je netbeheerder.
            <mark data-toon="geel" data-actief> Op elke batterij krijg je tien jaar garantie.</mark>
          </p>
          <p className="hp1-tekst-vaag">Of een batterij voor jou loont, hangt af van hoeveel stroom je overdag over hebt. Dat rekenen we vooraf samen uit.</p>
          <ol className="hp1-bronnen">
            <li><span>1</span>Bevestigd door het bedrijf in de klant onboarding</li>
            <li><span>2</span>Tarievenlijst 2026, geüpload als document</li>
          </ol>
        </article>
      </Venster>
      <aside className="hp1-gele-zin">
        <div className="hp1-gele-kop"><Label toon="geel" stip>Geen bron gevonden</Label></div>
        <p className="hp1-gele-citaat">&ldquo;Op elke batterij krijg je tien jaar garantie.&rdquo;</p>
        <p className="hp1-gele-reden">Een garantietermijn is een harde belofte. Op de website staat vijf jaar, in de kennis staat niets over tien jaar.</p>
        <div className="hp1-knoppen">
          <span className="hp1-knop">Pas de zin aan</span>
          <span className="hp1-knop hp1-knop-primair">Vraag het bedrijf</span>
        </div>
        <div className="hp1-goedkeuren">
          <span className="hp1-knop" data-uit>Goedkeuren</span>
          <span>Kan pas als elke gele zin bevestigd is</span>
        </div>
      </aside>
    </div>
  )
}

/* ── 6. Bewijzen: effect per pagina en het maandverslag ───────────────────── */

const LADDER = [
  { t: 'Gepubliceerd', d: 'Live gezien op 3 september', st: 'klaar' },
  { t: 'Genoemd door AI', d: 'Bij 5 van 8 doelvragen, eerst bij 1', st: 'klaar' },
  { t: 'Aangehaald door AI', d: 'De pagina zelf staat bij 3 antwoorden als bron', st: 'klaar' },
  { t: 'Zichtbaar in Google', d: '4.310 vertoningen', st: 'klaar' },
  { t: 'Verkeer', d: '186 klikken sinds publicatie', st: 'klaar' },
] as const

export function Effect() {
  return (
    <div className="hp1-effect">
      <Venster pad={[EIGEN, 'Effect per pagina']} rechts={<span className="hp1-pil">Thuisbatterij bij zonnepanelen</span>} className="hp1-ladder-venster">
        <div className="hp1-hermeting">
          {[['Vóór', 1], ['Na 14 dagen', 3], ['Na 28 dagen', 5]].map(([l, n]) => (
            <div className="hp1-herm-rij" key={l}>
              <span>{l}</span>
              <span className="hp1-herm-stippen">{Array.from({ length: 8 }, (_, i) => <i key={i} data-aan={i < (n as number) || undefined} />)}</span>
              <strong>{n}/8</strong>
            </div>
          ))}
          <Label toon="lime" stip>Gestegen, buiten de marge</Label>
        </div>
        <ol className="hp1-ladder">
          {LADDER.map((s, i) => (
            <li key={s.t}>
              <span className="hp1-ladder-nr"><Icoon naam="check" size={11} /></span>
              <span className="hp1-ladder-t"><strong>{s.t}</strong><em>{s.d}</em></span>
              <span className="hp1-mono">Trede {i + 1}</span>
            </li>
          ))}
        </ol>
      </Venster>
      <div className="hp1-verslag">
        <div className="hp1-verslag-kop">
          <span className="hp1-verslag-logo">M</span>
          <span><em>Bureau Meridiaan voor {EIGEN}</em><strong>Verslag van september</strong></span>
        </div>
        <div className="hp1-verslag-cijfers">
          <span><em>Zichtbaarheid</em><strong>29%</strong><i>± 7</i></span>
          <span><em>Pagina&apos;s live</em><strong>4</strong></span>
          <span><em>Klikken</em><strong>412</strong></span>
        </div>
        <p className="hp1-verslag-tekst">Vier nieuwe pagina&apos;s staan live. De pagina over thuisbatterijen wordt nu bij vijf van de acht vragen genoemd. In oktober volgen drie pagina&apos;s over onderhoud.</p>
        <span className="hp1-knop"><Icoon naam="pijl" size={12} /> Opslaan als pdf</span>
      </div>
    </div>
  )
}

/* ── 7. Pitch: de pagina die een prospect te zien krijgt ─────────────────── */

export function Pitch() {
  return (
    <div className="hp1-pitch">
      <div className="hp1-browser">
        <div className="hp1-browser-balk">
          <span className="hp1-browser-stippen"><i /><i /><i /></span>
          <span className="hp1-browser-adres">pitch van Bureau Meridiaan</span>
        </div>
        <div className="hp1-pitch-pagina">
          <div className="hp1-pitch-merk"><span className="hp1-verslag-logo">M</span>Bureau Meridiaan</div>
          <span className="hp1-mono">Voor Studio Lente, interieurontwerp in Haarlem</span>
          <h4>Bij 8 van de 10 vragen raadt ChatGPT iemand anders aan</h4>
          <div className="hp1-pitch-citaat">
            <span className="hp1-antwoord-merk"><MerkIcoon merk="chatgpt" size={14} />Letterlijk antwoord van ChatGPT</span>
            <p>&ldquo;Voor interieurontwerp in Haarlem kun je terecht bij <b>Atelier Spaarne</b> en <b>Binnenwerk</b>. Beide hebben veel lovende beoordelingen&hellip;&rdquo;</p>
          </div>
          <div className="hp1-pitch-kansen">
            <span className="hp1-mono">Grootste kansen</span>
            <span><Icoon naam="pijl" size={12} />Een pagina over interieuradvies voor nieuwbouw</span>
            <span><Icoon naam="pijl" size={12} />Vermelding op twee woonplatforms die AI aanhaalt</span>
          </div>
          <span className="hp1-knop hp1-knop-merk">Plan een gesprek met Bureau Meridiaan</span>
        </div>
      </div>
      <div className="hp1-melding" role="presentation">
        <span className="hp1-melding-icoon"><Icoon naam="bel" /></span>
        <span><strong>Studio Lente opende je pitch</strong><em>Zojuist</em></span>
      </div>
    </div>
  )
}

/* ── 8. Werken voor al je klanten ────────────────────────────────────────── */

const KLANTEN = [
  { n: 'Hofstede Zonnepanelen', z: 34, d: '+5', wacht: ['oranje', '2 vragen bij klant'], sinds: '3 dagen', k: '€ 18' },
  { n: 'Advocatenkantoor Brink', z: 21, d: '+2', wacht: ['geel', '1 tekst nakijken'], sinds: '1 dag', k: '€ 11' },
  { n: 'Kookwinkel De Pan', z: 47, d: '+9', wacht: ['lime', 'Klaar om te plaatsen'], sinds: 'vandaag', k: '€ 24' },
  { n: 'Fysiotherapie Zuid', z: 12, d: '0', wacht: ['grijs', 'Niets'], sinds: '', k: '€ 6' },
  { n: 'Studio Lente', z: 9, d: 'nieuw', wacht: ['blauw', 'Onderzoek loopt'], sinds: '', k: '€ 2' },
] as const

export function Werkoverzicht() {
  return (
    <Venster pad={['Bureau Meridiaan', 'Werkoverzicht']} rechts={<span className="hp1-pil">5 klanten · oktober</span>} className="hp1-werk">
      <div className="hp1-werk-top">
        <div className="hp1-werk-langst">
          <span className="hp1-mono">Wacht het langst</span>
          <strong>Hofstede Zonnepanelen: 2 vragen bij de klant, al 3 dagen</strong>
        </div>
        <span className="hp1-knop hp1-knop-primair">Start de maand voor 3 klanten</span>
      </div>
      <div className="hp1-tabel" role="presentation">
        <div className="hp1-tr hp1-th">
          <span>Klant</span><span>Zichtbaarheid</span><span>Wacht op</span><span>Sinds</span><span>Kosten 30 dagen</span>
        </div>
        {KLANTEN.map((r) => (
          <div className="hp1-tr" key={r.n}>
            <span className="hp1-td-naam">{r.n}</span>
            <span className="hp1-td-z">
              <span className="hp1-balk"><i style={{ width: `${r.z * 2}%` }} /></span>
              {r.z}% <em data-op={r.d.startsWith('+') || undefined}>{r.d}</em>
            </span>
            <span><Label toon={r.wacht[0]} stip>{r.wacht[1]}</Label></span>
            <span className="hp1-td-zacht">{r.sinds}</span>
            <span className="hp1-td-zacht">{r.k}</span>
          </div>
        ))}
      </div>
      <div className="hp1-limiet">
        <span>Maandlimiet van je bureau</span>
        <span className="hp1-limiet-balk"><i style={{ width: '30%' }} /></span>
        <span><strong>€ 61</strong> van € 200</span>
      </div>
    </Venster>
  )
}
