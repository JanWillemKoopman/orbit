// De beelden van de testhomepage (/homepage1). Elk beeld is nieuw nagebouwd in HTML en SVG en maakt één punt,
// met alleen wat daarvoor nodig is. Alle namen en getallen zijn voorbeelddata van verzonnen bedrijven.
import { LogoMark } from '@/components/Logo'

export function Vink() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  )
}

/** Een kaart in de vormgeving van de app, met een smalle titelbalk. */
function Kaart({ titel, children, className = '' }: { titel: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`hp1-kaart ${className}`}>
      <div className="hp1-kaart-balk"><LogoMark size={12} /><span>{titel}</span></div>
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

/* ── Wat AI nu zegt ───────────────────────────────────────────────────────── */

const EIGEN = 'Hofstede Zonnepanelen'

const ANTWOORDEN = [
  { merk: 'chatgpt' as const, naam: 'ChatGPT', namen: ['ZonVast', 'Eemland Solar', 'Helder Energie'] },
  { merk: 'gemini' as const, naam: 'Gemini', namen: ['Eemland Solar', EIGEN, 'ZonVast'] },
  { merk: 'google' as const, naam: 'AI-overzicht van Google', namen: ['ZonVast', 'Helder Energie'] },
]

/** Eén vraag, drie antwoorden: je klant staat er één keer tussen. */
export function DrieAntwoorden() {
  return (
    <div className="hp1-antwoorden">
      <p className="hp1-vraag">Welk bedrijf in Amersfoort installeert betrouwbaar zonnepanelen?</p>
      <div className="hp1-antwoorden-rij">
        {ANTWOORDEN.map((a) => {
          const genoemd = a.namen.includes(EIGEN)
          return (
            <div className="hp1-antwoord" key={a.naam}>
              <span className="hp1-antwoord-merk"><MerkIcoon merk={a.merk} />{a.naam}</span>
              <ol className="hp1-namen">
                {a.namen.map((n) => <li key={n} data-eigen={n === EIGEN || undefined}>{n}</li>)}
              </ol>
              {!genoemd && <span className="hp1-mist">{EIGEN} niet genoemd</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── De kringloop ─────────────────────────────────────────────────────────── */

export function Kringloop({ stappen }: { stappen: { titel: string; tekst: string }[] }) {
  return (
    <ol className="hp1-kring">
      {stappen.map((s, i) => (
        <li key={s.titel}>
          <span className="hp1-kring-nr">{i + 1}</span>
          <h3>{s.titel}</h3>
          <p>{s.tekst}</p>
        </li>
      ))}
    </ol>
  )
}

/* ── Meten: een cijfer met marge ──────────────────────────────────────────── */

// Zes maandmetingen met hun marge in procentpunt; de marge wordt kleiner naarmate maanden samengevoegd worden.
const MAANDEN = [
  { m: 'mei', v: 16, marge: 11 },
  { m: 'jun', v: 19, marge: 10 },
  { m: 'jul', v: 18, marge: 9 },
  { m: 'aug', v: 24, marge: 8 },
  { m: 'sep', v: 29, marge: 7 },
  { m: 'okt', v: 34, marge: 6 },
]

export function Meting() {
  const w = 440
  const h = 150
  const max = 50
  const x = (i: number) => 8 + (i * (w - 16)) / (MAANDEN.length - 1)
  const y = (v: number) => h - (v / max) * h
  const lijn = MAANDEN.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p.v)}`).join(' ')
  const boven = MAANDEN.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p.v + p.marge)}`).join(' ')
  const onder = [...MAANDEN].reverse().map((p, j) => `L${x(MAANDEN.length - 1 - j)} ${y(p.v - p.marge)}`).join(' ')
  return (
    <Kaart titel={`${EIGEN} · Zichtbaarheid in AI`}>
      <div className="hp1-meting">
        <span className="hp1-klein">Oktober, 30 vragen</span>
        <strong className="hp1-cijfer">34%<em>± 6</em></strong>
        <svg className="hp1-grafiek" viewBox={`0 0 ${w} ${h + 24}`} aria-hidden="true">
          <path d={`${boven} ${onder} Z`} fill="rgba(188,255,47,0.08)" />
          <path d={lijn} fill="none" stroke="#bcff2f" strokeWidth="1.75" strokeLinejoin="round" />
          <circle cx={x(MAANDEN.length - 1)} cy={y(34)} r="3.5" fill="#bcff2f" />
          {MAANDEN.map((p, i) => (
            <text key={p.m} x={x(i)} y={h + 20} textAnchor="middle" fill="#62666d" fontSize="11" fontFamily="inherit">{p.m}</text>
          ))}
        </svg>
        <span className="hp1-klein">Gestegen sinds juli, groter dan de marge.</span>
      </div>
    </Kaart>
  )
}

/* ── Schrijven: de gele zin ───────────────────────────────────────────────── */

export function Vangnet() {
  return (
    <div className="hp1-vangnet">
      <Kaart titel="Thuisbatterij bij zonnepanelen">
        <div className="hp1-tekst">
          <p>
            Met een thuisbatterij gebruik je de stroom van je eigen dak ook &apos;s avonds. Een installatie begint vanaf € 3.950,
            inclusief montage. <mark>Op elke batterij krijg je tien jaar garantie.</mark>
          </p>
        </div>
      </Kaart>
      <div className="hp1-gele-zin">
        <span className="hp1-gele-kop">Geen bron voor deze garantie</span>
        <p>Op de website staat vijf jaar. Bevestig de zin of vraag het bedrijf.</p>
        <div className="hp1-knoppen">
          <span className="hp1-knop">Pas aan</span>
          <span className="hp1-knop hp1-knop-primair">Vraag het bedrijf</span>
        </div>
      </div>
    </div>
  )
}

/* ── Bewijzen: hermeten na publicatie ─────────────────────────────────────── */

export function Effect() {
  const rijen = [['Vóór publicatie', 1], ['Na 14 dagen', 3], ['Na 28 dagen', 5]] as const
  return (
    <Kaart titel="Effect van de pagina Thuisbatterij">
      <div className="hp1-effect">
        <span className="hp1-klein">Genoemd bij de 8 vragen waarvoor de pagina geschreven is</span>
        {rijen.map(([l, n]) => (
          <div className="hp1-herm-rij" key={l}>
            <span>{l}</span>
            <span className="hp1-stippen">{Array.from({ length: 8 }, (_, i) => <i key={i} data-aan={i < n || undefined} />)}</span>
            <strong>{n}/8</strong>
          </div>
        ))}
        <span className="hp1-oordeel"><Vink /> Gestegen, buiten de marge</span>
      </div>
    </Kaart>
  )
}

/* ── Werkoverzicht ────────────────────────────────────────────────────────── */

const KLANTEN = [
  { n: 'Hofstede Zonnepanelen', z: 34, d: '+5', wacht: '2 vragen bij de klant, 3 dagen' },
  { n: 'Advocatenkantoor Brink', z: 21, d: '+2', wacht: '1 tekst om na te kijken' },
  { n: 'Kookwinkel De Pan', z: 47, d: '+9', wacht: 'Klaar om te plaatsen', klaar: true },
  { n: 'Fysiotherapie Zuid', z: 12, d: '0', wacht: 'Niets' },
]

export function Werkoverzicht() {
  return (
    <Kaart titel="Bureau Meridiaan · Werkoverzicht" className="hp1-werk">
      <div className="hp1-tabel">
        <div className="hp1-tr hp1-th"><span>Klant</span><span>Zichtbaarheid</span><span>Wacht op</span></div>
        {KLANTEN.map((r) => (
          <div className="hp1-tr" key={r.n}>
            <span className="hp1-td-naam">{r.n}</span>
            <span className="hp1-td-z">{r.z}%<em data-op={r.d.startsWith('+') || undefined}>{r.d}</em></span>
            <span className="hp1-td-wacht" data-klaar={r.klaar || undefined}>{r.wacht}</span>
          </div>
        ))}
      </div>
    </Kaart>
  )
}
