// De figuren van /werkwijze4: dezelfde tien ideeën als de tekens op /werkwijze3, nu als isometrische
// lijntekeningen zoals de FIG-illustraties op linear.app. Dunne lijnen, donkere vlakken die wat erachter
// ligt afdekken, en het accent alleen op het ene onderdeel waar het om gaat. Ze bouwen zich één keer
// op zodra de kaart in beeld komt (`data-in`, gezet door components/werkwijze3/Beweging.tsx); de stijl
// staat in app/werkwijze4/werkwijze4.css. `--d` is de vertraging per onderdeel.
import type { CSSProperties, ReactNode } from 'react'

type P = [number, number]

const C = Math.cos(Math.PI / 6) // 0,866
const r = (n: number) => Math.round(n * 10) / 10

/** Een punt in de ruimte (x naar rechtsvoor, y naar linksvoor, z omhoog) naar het vlak. */
function iso(x: number, y: number, z: number): P {
  return [r((x - y) * C), r((x + y) * 0.5 - z)]
}
const pad = (pts: P[], dicht = true) => `M${pts.map((p) => p.join(' ')).join(' L')}${dicht ? ' Z' : ''}`
const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

/** Een blok: bovenvlak en de twee zichtbare zijvlakken. */
function Blok({ x, y, z = 0, w, l, h, accent = false, className = '', style }: {
  x: number; y: number; z?: number; w: number; l: number; h: number; accent?: boolean; className?: string; style?: CSSProperties
}) {
  const boven = pad([iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + l, z + h), iso(x, y + l, z + h)])
  const rechts = pad([iso(x + w, y, z), iso(x + w, y + l, z), iso(x + w, y + l, z + h), iso(x + w, y, z + h)])
  const links = pad([iso(x, y + l, z), iso(x + w, y + l, z), iso(x + w, y + l, z + h), iso(x, y + l, z + h)])
  return (
    <g className={`w4-blok${accent ? ' w4-blok-accent' : ''} ${className}`} style={style}>
      <path className="w4-zijde-r" d={rechts} />
      <path className="w4-zijde-l" d={links} />
      <path className="w4-boven" d={boven} />
    </g>
  )
}

/** Een lijn over het bovenvlak van een blok, evenwijdig aan de x-as. */
function Regel({ x, y, z, l, className = 'w4-regel', style }: { x: number; y: number; z: number; l: number; className?: string; style?: CSSProperties }) {
  return <path className={className} style={style} pathLength={1} d={pad([iso(x, y, z), iso(x + l, y, z)], false)} />
}

/** Een cirkel op de grond (een ellips in beeld). */
function Ring({ x = 0, y = 0, z = 0, straal, className, style, id }: { x?: number; y?: number; z?: number; straal: number; className: string; style?: CSSProperties; id?: string }) {
  const [cx, cy] = iso(x, y, z)
  const rx = r(straal * C * Math.SQRT2)
  const ry = r(straal * 0.5 * Math.SQRT2)
  return <path id={id} className={className} style={style} pathLength={1} d={`M${cx - rx} ${cy} A${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`} />
}

function Figuur({ children, y = 0 }: { children: ReactNode; y?: number }) {
  return (
    <svg className="w4-figuur" viewBox="-152 -116 304 232" aria-hidden="true">
      <g transform={`translate(0 ${y})`}>{children}</g>
    </svg>
  )
}

/**
 * Een label zoals in de schema's op linear.app: mono, hoofdletters, in een dun kader, met een
 * stippellijn naar het punt waar het bij hoort. (x, y) is de linker- of rechterkant van het kader.
 */
function Label({ x, y, tekst, naar, rechts = false, t = 1.6 }: { x: number; y: number; tekst: string; naar?: P; rechts?: boolean; t?: number }) {
  const b = r(tekst.length * 4.6 + 12)
  const x0 = rechts ? x - b : x
  const rand: P = [rechts ? x0 : x0 + b, y]
  const begin: P = naar && Math.abs(naar[0] - x0) < Math.abs(naar[0] - (x0 + b)) ? [x0, y] : rand
  return (
    <g className="w4-label w4-op" style={d(t)}>
      {naar && <path className="w4-leider" d={`M${begin[0]} ${begin[1]} L${naar[0]} ${naar[1]}`} />}
      {naar && <circle className="w4-leider-punt" cx={naar[0]} cy={naar[1]} r={1.6} />}
      <rect className="w4-label-kader" x={x0} y={y - 6.5} width={b} height={13} rx={3} />
      <text className="w4-label-tekst" x={x0 + 6} y={y + 0.5} dominantBaseline="middle">{tekst}</text>
    </g>
  )
}

/** Een los mono-label zonder kader, voor een as of een reeks. */
function As({ x, y, tekst, eind = false, t = 0.2 }: { x: number; y: number; tekst: string; eind?: boolean; t?: number }) {
  return <text className="w4-as w4-op" style={d(t)} x={x} y={y} textAnchor={eind ? 'end' : 'middle'} dominantBaseline="middle">{tekst}</text>
}

/** 1. Klant toevoegen: laag voor laag bouwt het merkdossier zich op. */
function Dossier() {
  const lagen = [0, 13, 26, 39]
  return (
    <Figuur y={34}>
      {lagen.map((z, i) => (
        <Blok key={z} className="w4-zak" style={d(0.1 + i * 0.12)} x={-50} y={-50} z={z} w={100} l={100} h={7} />
      ))}
      {/* Hulplijnen naar de bovenste laag */}
      {[[50, -50], [50, 50], [-50, 50]].map(([x, y], i) => (
        <path key={i} className="w4-hulp w4-op" style={d(0.7)} d={pad([iso(x, y, 46), iso(x, y, 66)], false)} />
      ))}
      <g className="w4-zweef">
        <Blok className="w4-zak" style={d(0.75)} x={-50} y={-50} z={66} w={100} l={100} h={7} />
        {[0, 1, 2, 3].map((i) => (
          <Regel key={i} className="w4-regel w4-trek" style={d(1.05 + i * 0.08)} x={-34} y={-30 + i * 14} z={73} l={[58, 44, 52, 30][i]} />
        ))}
        <Ring className="w4-accent-vlak w4-op" style={d(1.45)} x={34} y={30} z={73} straal={5} />
      </g>
      <Label x={-148} y={-104} tekst="Merkdossier" naar={iso(-50, 50, 73)} />
      <Label x={148} y={40} rechts tekst="Website · aanbod · AI" naar={iso(50, -50, 6)} t={1.75} />
    </Figuur>
  )
}

/** 2. Klant onboarden: documenten zakken in één kennisbank. */
function Kennisbank() {
  const vellen: [number, number, number][] = [[-78, -28, 0.2], [-24, -64, 0.35], [26, -10, 0.5]]
  return (
    <Figuur y={34}>
      <Blok className="w4-op" style={d(0)} x={-56} y={-6} z={0} w={112} l={84} h={30} />
      <path className="w4-gleuf w4-op" style={d(0.1)} d={pad([iso(-30, 18, 30), iso(30, 18, 30), iso(30, 54, 30), iso(-30, 54, 30)])} />
      {vellen.map(([x, y, t], i) => (
        <g key={i} className="w4-zweef">
          <path className="w4-hulp w4-op" style={d(t + 0.3)} d={pad([iso(x + 20, y + 26, 96), iso(x + 20, y + 26, 34)], false)} />
          <Blok className="w4-zak" style={d(t)} x={x} y={y} z={96} w={40} l={52} h={2} />
          {[0, 1, 2].map((j) => (
            <Regel key={j} className="w4-regel w4-trek" style={d(t + 0.4 + j * 0.06)} x={x + 8} y={y + 12 + j * 10} z={98} l={[24, 18, 22][j]} />
          ))}
        </g>
      ))}
      <Ring className="w4-accent-vlak w4-op" style={d(1.1)} x={40} y={66} z={30} straal={5} />
      <Label x={148} y={34} rechts tekst="Kennisbank" naar={iso(56, -6, 16)} />
      <Label x={-148} y={-122} tekst="Documenten" naar={iso(-78, 24, 97)} t={1.75} />
    </Figuur>
  )
}

/** 3. De nulmeting: dertig vragen; waar de klant genoemd wordt, staat een hogere zuil in het accent. */
function Nulmeting() {
  const genoemd = new Set([2, 7, 11, 16, 19, 23, 28])
  const stap = 22
  const blokken = Array.from({ length: 30 }, (_, i) => ({ i, kol: i % 6, rij: Math.floor(i / 6) }))
    .sort((a, b) => a.kol + a.rij - (b.kol + b.rij))
  return (
    <Figuur y={-6}>
      <path className="w4-vlak w4-op" style={d(0)} d={pad([iso(-74, -63, 0), iso(74, -63, 0), iso(74, 63, 0), iso(-74, 63, 0)])} />
      {blokken.map(({ i, kol, rij }) => {
        const aan = genoemd.has(i)
        return (
          <Blok
            key={i}
            className="w4-rijs"
            style={d(0.15 + (kol + rij) * 0.06 + (aan ? 0.25 : 0))}
            accent={aan}
            x={-66 + kol * stap + 2}
            y={-55 + rij * stap + 2}
            w={12}
            l={12}
            h={aan ? 30 : 5}
          />
        )
      })}
      <Label x={-148} y={-62} tekst="30 vragen" naar={iso(-74, 63, 0)} />
      <Label x={148} y={-92} rechts tekst="Genoemd" naar={iso(-36, -25, 30)} t={1.75} />
    </Figuur>
  )
}

/** 4. Het contentplan: vier maanden die zich vullen met pagina's. */
function Contentplan() {
  const aantal = [4, 4, 3, 2]
  const slabs = aantal.flatMap((n, k) => Array.from({ length: n }, (_, rij) => ({ k, rij }))).sort((a, b) => a.k + a.rij - (b.k + b.rij))
  return (
    <Figuur y={-4}>
      <path className="w4-vlak w4-op" style={d(0)} d={pad([iso(-80, -62, 0), iso(80, -62, 0), iso(80, 70, 0), iso(-80, 70, 0)])} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <path className="w4-hulp w4-op" style={d(0.05)} d={pad([iso(-80, -62 + k * 33, 0), iso(80, -62 + k * 33, 0)], false)} />
          <As x={iso(-86, -46 + k * 33, 0)[0]} y={iso(-86, -46 + k * 33, 0)[1]} eind tekst={['OKT', 'NOV', 'DEC', 'JAN'][k]} t={0.1 + k * 0.08} />
        </g>
      ))}
      {slabs.map(({ k, rij }) => (
        <Blok
          key={`${k}-${rij}`}
          className="w4-zak"
          style={d(0.3 + k * 0.14 + rij * 0.08)}
          accent={k === 0 && rij === 0}
          x={-44 + rij * 31}
          y={-56 + k * 33}
          w={26}
          l={22}
          h={5}
        />
      ))}
      <Label x={148} y={-96} rechts tekst="Pagina-idee" naar={iso(-31, -45, 5)} t={1.5} />
    </Figuur>
  )
}

/** 5. De voorbereiding: kennisbank en internet komen samen in één briefing; het onbekende wordt een vraag. */
function Voorbereiding() {
  const [ax, ay] = iso(-6, 70, 6)
  const [bx, by] = iso(70, -6, 6)
  const [sx, sy] = iso(16, 16, 70)
  return (
    <Figuur y={16}>
      <Blok className="w4-op" style={d(0)} x={-36} y={44} z={0} w={60} l={52} h={6} />
      <Blok className="w4-op" style={d(0.1)} x={44} y={-36} z={0} w={52} l={60} h={6} />
      {[0, 1, 2].map((j) => <Regel key={`a${j}`} className="w4-regel w4-trek" style={d(0.25 + j * 0.06)} x={-28} y={54 + j * 12} z={6} l={[36, 28, 40][j]} />)}
      {[0, 1, 2].map((j) => <Regel key={`b${j}`} className="w4-regel w4-trek" style={d(0.3 + j * 0.06)} x={52} y={-26 + j * 12} z={6} l={[30, 38, 24][j]} />)}
      <path className="w4-verbind w4-trek" style={d(0.6)} pathLength={1} d={`M${ax} ${ay} C ${ax} ${ay - 40}, ${sx - 30} ${sy + 30}, ${sx - 6} ${sy + 8}`} />
      <path className="w4-verbind w4-trek" style={d(0.7)} pathLength={1} d={`M${bx} ${by} C ${bx} ${by - 40}, ${sx + 30} ${sy + 30}, ${sx + 6} ${sy + 8}`} />
      <g className="w4-zweef">
        <Blok className="w4-zak" style={d(1.0)} x={-14} y={-14} z={70} w={60} l={60} h={4} />
        {[0, 1, 2].map((j) => <Regel key={`s${j}`} className="w4-regel-sterk w4-trek" style={d(1.25 + j * 0.07)} x={-4} y={-2 + j * 14} z={74} l={[38, 30, 34][j]} />)}
      </g>
      <g className="w4-zak" style={d(1.55)}>
        <Blok accent x={58} y={-40} z={92} w={16} l={16} h={16} />
      </g>
      <path className="w4-hulp w4-op" style={d(1.6)} d={pad([iso(66, -32, 92), iso(66, -32, 78)], false)} />
      <Label x={-148} y={74} tekst="Kennisbank" naar={iso(-36, 70, 6)} t={1.7} />
      <Label x={148} y={74} rechts tekst="Internet" naar={iso(70, -36, 6)} t={1.75} />
      <Label x={148} y={-104} rechts tekst="Vraag aan klant" naar={iso(74, -32, 100)} t={1.85} />
    </Figuur>
  )
}

/** 6. De klant vult aan: een staand scherm waarop een vraag en het antwoord verschijnen. */
function KlantVultAan() {
  const vlak = (y0: number, y1: number, z0: number, z1: number) => pad([iso(8, y0, z0), iso(8, y1, z0), iso(8, y1, z1), iso(8, y0, z1)])
  return (
    <Figuur y={70}>
      <Ring className="w4-hulp w4-op" style={d(0)} x={4} y={0} z={0} straal={70} />
      <Blok className="w4-rijs" style={d(0.1)} x={0} y={-44} z={0} w={8} l={88} h={150} />
      <path className="w4-scherm w4-op" style={d(0.3)} d={vlak(-38, 38, 10, 140)} />
      <path className="w4-bel w4-schuif-l" style={d(0.55)} d={vlak(-30, 18, 106, 126)} />
      <path className="w4-regel w4-trek" style={d(0.75)} pathLength={1} d={pad([iso(8, -24, 116), iso(8, 8, 116)], false)} />
      <g className="w4-typen" style={d(1.0)}>
        {[0, 1, 2].map((i) => {
          const [cx, cy] = iso(8, 16 + i * 8, 88)
          return <circle key={i} className="w4-typ-stip" style={d(1.0 + i * 0.12)} cx={cx} cy={cy} r={2.2} />
        })}
      </g>
      <path className="w4-bel-accent w4-schuif-r" style={d(2.0)} d={vlak(-10, 30, 40, 72)} />
      <path className="w4-regel-accent w4-trek" style={d(2.25)} pathLength={1} d={pad([iso(8, -4, 62), iso(8, 24, 62)], false)} />
      <path className="w4-regel-accent w4-trek" style={d(2.35)} pathLength={1} d={pad([iso(8, -4, 52), iso(8, 14, 52)], false)} />
      <Label x={-148} y={-176} tekst="Vraag" naar={iso(8, 18, 116)} t={0.9} />
      <Label x={148} y={-110} rechts tekst="Antwoord" naar={iso(8, -10, 56)} t={2.5} />
    </Figuur>
  )
}

/** 7. Orbit schrijft: een staande pagina die zich regel voor regel vult, met eerdere versies erachter. */
function Schrijft() {
  const vlak = (x0: number, x1: number, z0: number, z1: number, y: number) => pad([iso(x0, y, z0), iso(x1, y, z0), iso(x1, y, z1), iso(x0, y, z1)])
  const regels = [70, 82, 60, 76, 52, 68]
  return (
    <Figuur y={74}>
      <path className="w4-vlak w4-op" style={d(0)} d={pad([iso(-70, -30, 0), iso(70, -30, 0), iso(70, 40, 0), iso(-70, 40, 0)])} />
      <path className="w4-geest w4-op" style={d(0.05)} d={vlak(-36, 64, 6, 146, -26)} />
      <path className="w4-geest w4-op" style={d(0.1)} d={vlak(-42, 58, 4, 144, -12)} />
      <Blok className="w4-rijs" style={d(0.2)} x={-48} y={2} z={0} w={100} l={4} h={142} />
      <path className="w4-regel-sterk w4-trek" style={d(0.5)} pathLength={1} d={pad([iso(-38, 6, 124), iso(4, 6, 124)], false)} />
      {regels.map((l, i) => (
        <path key={i} className="w4-regel w4-trek" style={d(0.7 + i * 0.12)} pathLength={1} d={pad([iso(-38, 6, 104 - i * 13), iso(-38 + l, 6, 104 - i * 13)], false)} />
      ))}
      <path className="w4-regel-accent w4-trek" style={d(1.5)} pathLength={1} d={pad([iso(-38, 6, 89), iso(-8, 6, 89)], false)} />
      <path className="w4-regel-accent w4-trek" style={d(1.62)} pathLength={1} d={pad([iso(4, 6, 50), iso(30, 6, 50)], false)} />
      <Label x={148} y={-126} rechts tekst="Bevestigd" naar={iso(-8, 6, 89)} t={1.8} />
      <Label x={-148} y={-30} tekst="Briefing" naar={iso(-36, -26, 70)} t={1.9} />
    </Figuur>
  )
}

/** 8. Goedkeuren en live: één zin om na te lopen, een vinkje, en de pagina gaat live. */
function Goedkeuren() {
  const [kx, ky] = iso(10, 10, 96)
  return (
    <Figuur y={4}>
      <Blok className="w4-op" style={d(0)} x={-70} y={-40} z={0} w={110} l={92} h={4} />
      {[0, 1, 2, 3, 4].map((j) => (
        <Regel key={j} className="w4-regel w4-trek" style={d(0.15 + j * 0.07)} x={-58} y={-26 + j * 15} z={4} l={[78, 60, 84, 50, 70][j]} />
      ))}
      <path className="w4-markeer w4-op" style={d(0.6)} d={pad([iso(-62, -1, 4), iso(30, -1, 4), iso(30, 9, 4), iso(-62, 9, 4)])} />
      <path className="w4-hulp w4-op" style={d(1.0)} d={pad([iso(10, 10, 4), iso(10, 10, 74)], false)} />
 <g className="w4-zweef"><g className="w4-zak" style={d(1.0)}>
        <circle className="w4-badge" cx={kx} cy={ky} r={20} />
        <path className="w4-vink w4-trek" style={d(1.35)} pathLength={1} d={`M${kx - 8} ${ky} l6 6 l11 -12`} />
      </g></g>
      <Blok className="w4-op" style={d(1.6)} x={62} y={44} z={0} w={14} l={14} h={14} accent />
      <Ring className="w4-puls" style={d(1.8)} x={69} y={51} z={0} straal={12} />
      <Label x={-148} y={-60} tekst="Nalopen" naar={iso(-62, 4, 4)} t={0.9} />
      <Label x={148} y={96} rechts tekst="Live" naar={iso(76, 51, 7)} t={1.9} />
    </Figuur>
  )
}

/** 9. Effectmeting: vóór de pagina, na twee en na vier weken; de zuil van de klant groeit. */
function Effect() {
  const groepen = [{ k: 18, a: 28 }, { k: 44, a: 32 }, { k: 78, a: 34 }]
  const toppen = groepen.map((g, i) => iso(-38 + i * 34 + 8, 8 - i * 34 + 8, g.k))
  return (
    <Figuur y={40}>
      <path className="w4-vlak w4-op" style={d(0)} d={pad([iso(-70, -70, 0), iso(70, -70, 0), iso(70, 70, 0), iso(-70, 70, 0)])} />
      {groepen.map((g, i) => (
        <g key={i}>
          <Blok className="w4-groei" style={d(0.2 + i * 0.22)} x={-38 + i * 34} y={-18 - i * 34 + 8} w={16} l={16} h={g.a} />
          <Blok className="w4-groei" style={d(0.3 + i * 0.22)} accent={i === 2} x={-38 + i * 34} y={8 - i * 34} w={16} l={16} h={g.k} />
        </g>
      ))}
      <path className="w4-trend w4-trek" style={d(1.1)} pathLength={1} d={`M${toppen.map((p) => p.join(' ')).join(' L')}`} />
      {['VÓÓR', '2 WK', '4 WK'].map((t, i) => {
        const [ax, ay] = iso(-38 + i * 34 + 8, 8 - i * 34 + 30, 0)
        return <As key={t} x={ax} y={ay + 8} tekst={t} t={0.4 + i * 0.22} />
      })}
      <Label x={148} y={-150} rechts tekst="Je klant" naar={toppen[2]} t={1.5} />
    </Figuur>
  )
}

/** 10. Het maandverslag: de maanden stapelen, de lijn stijgt, en de cyclus begint opnieuw. */
function Maandverslag({ statisch = false }: { statisch?: boolean }) {
  const lijn: [number, number][] = [[0, 0], [14, 6], [28, 4], [42, 16], [56, 20], [70, 34]]
  return (
    <Figuur y={-14}>
      <Ring id="w4-cyclus" className="w4-baan w4-trek" style={d(0.9)} x={0} y={0} z={0} straal={96} />
      {[0, 1].map((i) => <Blok key={i} className="w4-zak" style={d(0.1 + i * 0.12)} x={-46 + i * 4} y={-56 + i * 4} z={i * 10} w={92} l={104} h={4} />)}
      <Blok className="w4-zak" style={d(0.34)} x={-38} y={-48} z={20} w={92} l={104} h={4} />
      <Regel className="w4-regel-sterk w4-trek" style={d(0.55)} x={-28} y={-36} z={24} l={36} />
      <Regel className="w4-regel w4-trek" style={d(0.6)} x={-28} y={-26} z={24} l={56} />
      <path className="w4-hulp w4-op" style={d(0.6)} d={pad([iso(-28, 46, 24), iso(46, 46, 24)], false)} />
      <path
        className="w4-regel-accent w4-trek"
        style={d(0.75)}
        pathLength={1}
        d={`M${lijn.map(([x, h]) => iso(-28 + x, 46 - h, 24).join(' ')).join(' L')}`}
      />
      <Label x={148} y={-70} rechts tekst="Elke maand" naar={iso(54, -48, 24)} t={1.6} />
      <Label x={-148} y={-84} tekst="Opnieuw" naar={iso(-68, -68, 0)} t={1.8} />
      {statisch ? (
        <circle className="w4-satelliet" r={3.5} cx={iso(-68, -68, 0)[0]} cy={iso(-68, -68, 0)[1]} />
      ) : (
        <circle className="w4-satelliet" r={3.5}>
          <animateMotion dur="16s" repeatCount="indefinite" begin="2s">
            <mpath href="#w4-cyclus" />
          </animateMotion>
        </circle>
      )}
    </Figuur>
  )
}

/** `statisch` geeft een figuur zonder rondlopende stip, voor /werkwijze5. */
export const FIGUREN: Record<string, (p: { statisch?: boolean }) => React.JSX.Element> = {
  'klant-toevoegen': Dossier,
  'klant-onboarden': Kennisbank,
  nulmeting: Nulmeting,
  contentplan: Contentplan,
  voorbereiding: Voorbereiding,
  'klant-vult-aan': KlantVultAan,
  'orbit-schrijft': Schrijft,
  'goedkeuren-en-live': Goedkeuren,
  'effect-meting': Effect,
  maandverslag: Maandverslag,
}

/** De hero: drie banen om een kleine stapel, met een stip die rondgaat (of stilstaat met `statisch`). */
export function HeroFiguur({ statisch = false }: { statisch?: boolean }) {
  const op = (straal: number, graden: number): P => {
    const a = (graden * Math.PI) / 180
    return iso(straal * Math.cos(a), straal * Math.sin(a), 0)
  }
  return (
    <svg className="w4-hero-figuur" viewBox="-300 -190 600 380" aria-hidden="true">
      <g transform="translate(0 30)">
        <Ring id="w4-baan-1" className="w4-baan w4-baan-in" style={d(0.3)} straal={190} />
        <Ring className="w4-baan w4-baan-midden w4-baan-in" style={d(0.45)} straal={140} />
        <Ring id="w4-baan-3" className="w4-baan w4-baan-in" style={d(0.6)} straal={92} />
        {[0, 1, 2].map((i) => (
          <Blok key={i} className="w4-hero-laag" style={d(0.5 + i * 0.12)} x={-30} y={-30} z={i * 14} w={60} l={60} h={6} />
        ))}
        {statisch ? (
          <>
            <circle className="w4-satelliet" r={4.5} cx={op(190, 120)[0]} cy={op(190, 120)[1]} />
            <circle className="w4-satelliet-grijs" r={3} cx={op(92, -30)[0]} cy={op(92, -30)[1]} />
          </>
        ) : (
          <>
            <circle className="w4-satelliet w4-hero-stip" r={4.5}>
              <animateMotion dur="24s" repeatCount="indefinite"><mpath href="#w4-baan-1" /></animateMotion>
            </circle>
            <circle className="w4-satelliet-grijs w4-hero-stip" r={3}>
              <animateMotion dur="15s" begin="-6s" repeatCount="indefinite"><mpath href="#w4-baan-3" /></animateMotion>
            </circle>
          </>
        )}
      </g>
    </svg>
  )
}
