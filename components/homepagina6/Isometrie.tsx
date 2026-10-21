// Drie isometrische lijntekeningen bij de diensten van /homepagina6, in de vormtaal van de FIG-tekeningen op
// linear.app: dunne lichte lijnen op bijna zwarte vlakken, zonder kleur. Elke tekening is één idee:
// een plaat met een doelwit (een concrete kans in de pitch), drie blokken als treden (een actieplan) en
// twaalf gelijke platen op een rij (elke maand hetzelfde werk). De platen zijn bewust even hoog: een
// stijgende reeks zou een groei beloven die de pagina niet kan waarmaken.

type P = [number, number, number]

const COS = Math.cos(Math.PI / 6)
const iso = ([x, y, z]: P): [number, number] => [120 + (x - y) * COS, 92 + (x + y) * 0.5 - z]
const pad = (punten: P[]) => punten.map((p, i) => `${i ? 'L' : 'M'}${iso(p).map((n) => n.toFixed(1)).join(' ')}`).join(' ') + ' Z'
const lijn = (a: P, b: P) => `M${iso(a).map((n) => n.toFixed(1)).join(' ')} L${iso(b).map((n) => n.toFixed(1)).join(' ')}`

// Een blok met drie zichtbare vlakken: boven, links-voor en rechts-voor.
function Blok({ x, y, z, w, d, h, zacht = false }: { x: number; y: number; z: number; w: number; d: number; h: number; zacht?: boolean }) {
  const klasse = zacht ? 'lf-iso-vlak lf-iso-zacht' : 'lf-iso-vlak'
  return (
    <g className={klasse}>
      <path d={pad([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])} />
      <path d={pad([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])} />
      <path d={pad([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])} />
    </g>
  )
}

// Een cirkel in het bovenvlak van een blok, als reeks punten.
function Ring({ cx, cy, z, r }: { cx: number; cy: number; z: number; r: number }) {
  const punten: P[] = Array.from({ length: 48 }, (_, i) => [cx + r * Math.cos((i / 48) * 2 * Math.PI), cy + r * Math.sin((i / 48) * 2 * Math.PI), z])
  return <path className="lf-iso-lijn" d={pad(punten)} />
}

function Svg({ children }: { children: React.ReactNode }) {
  return <svg className="lf-iso" viewBox="0 0 240 200" fill="none" aria-hidden="true">{children}</svg>
}

export function IsoPitch() {
  return (
    <Svg>
      {[0, 1, 2, 3].map((i) => <Blok key={i} x={-55} y={-55} z={i * 9 - 34} w={110} d={110} h={4} zacht />)}
      <path className="lf-iso-stip" d={lijn([-55, 55, -30], [-55, 55, 6]) + ' ' + lijn([55, -55, -30], [55, -55, 6]) + ' ' + lijn([55, 55, -30], [55, 55, 6])} />
      <Blok x={-55} y={-55} z={10} w={110} d={110} h={6} />
      <Ring cx={0} cy={0} z={16} r={34} />
      <Ring cx={0} cy={0} z={16} r={21} />
      <Ring cx={0} cy={0} z={16} r={8} />
    </Svg>
  )
}

export function IsoAudit() {
  return (
    <Svg>
      <Blok x={-60} y={-20} z={-40} w={40} d={60} h={26} />
      <Blok x={-15} y={-20} z={-40} w={40} d={60} h={52} />
      <Blok x={30} y={-20} z={-40} w={40} d={60} h={78} />
      {[0, 1, 2].map((i) => {
        const x = -52 + i * 45
        const z = -40 + 26 * (i + 1)
        return <path key={i} className="lf-iso-lijn" d={lijn([x, -12, z], [x + 22, -12, z]) + ' ' + lijn([x, -2, z], [x + 16, -2, z])} />
      })}
    </Svg>
  )
}

export function IsoMaanden() {
  return (
    <Svg>
      {Array.from({ length: 12 }, (_, i) => (
        <Blok key={i} x={-78 + i * 13} y={-30} z={-36} w={3} d={60} h={70} zacht={i > 8} />
      ))}
      <path className="lf-iso-stip" d={lijn([-82, 34, -36], [80, 34, -36])} />
    </Svg>
  )
}
