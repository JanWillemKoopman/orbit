// Kleine, abstracte animaties bij de tien stappen van /werkwijze3: geen schermen, maar een teken dat
// het idee van de stap laat zien (dertig stippen voor dertig vragen, balkjes die groeien bij de
// effectmeting). Ze spelen één keer af zodra de kaart in beeld komt (`data-in` op .w3-kaart, gezet door
// Beweging.tsx); de stijl staat in app/werkwijze3/werkwijze3.css. `--d` is de vertraging per onderdeel.
import type { CSSProperties, ReactNode } from 'react'

const d = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

function Teken({ children }: { children: ReactNode }) {
  return (
    <svg className="w3-teken" viewBox="0 0 240 180" fill="none" aria-hidden="true">
      {children}
    </svg>
  )
}

/** 1. Een naam en een website: het veld vult zich, daarna verschijnt het dossier. */
function Toevoegen() {
  return (
    <Teken>
      <rect className="w3-lijn" x="36" y="44" width="168" height="36" rx="8" />
      <rect className="w3-groei w3-vul-zacht" style={d(0.2)} x="50" y="58" width="92" height="8" rx="4" />
      <rect className="w3-caret" style={d(1.0)} x="146" y="54" width="1.5" height="16" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className="w3-op w3-lijn" style={d(1.2 + i * 0.15)} x={36 + i * 43} y="104" width="36" height="36" rx="7" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} className="w3-op w3-vul-zacht" style={d(1.4 + i * 0.15)} x={46 + i * 43} y="118" width="16" height="8" rx="2" />
      ))}
      <circle className="w3-op w3-vul-accent" style={d(1.95)} cx="183" cy="122" r="5" />
    </Teken>
  )
}

/** 2. Documenten en antwoorden schuiven samen in één kennisbank. */
function Onboarden() {
  return (
    <Teken>
      <rect className="w3-lijn" x="72" y="96" width="96" height="56" rx="10" />
      <path className="w3-lijn" d="M72 112h96" />
      {[
        ['w3-van-links', 30, 0.2],
        ['w3-van-boven', 102, 0.45],
        ['w3-van-rechts', 174, 0.7],
      ].map(([kl, x, t]) => (
        <g key={x as number} className={`w3-schuif ${kl}`} style={d(t as number)}>
          <rect className="w3-lijn w3-vlak" x={x as number} y="28" width="36" height="46" rx="5" />
          <path className="w3-zacht" d={`M${(x as number) + 8} 42h20M${(x as number) + 8} 50h14M${(x as number) + 8} 58h18`} />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} className="w3-groei w3-vul-zacht" style={d(1.1 + i * 0.15)} x="84" y={122 + i * 9} width={[60, 44, 52][i]} height="4" rx="2" />
      ))}
      <circle className="w3-op w3-vul-accent" style={d(1.6)} cx="156" cy="104" r="3" />
    </Teken>
  )
}

/** 3. Dertig vragen: dertig stippen, en waar de klant genoemd wordt licht er een op. */
function Nulmeting() {
  const genoemd = new Set([2, 7, 11, 16, 19, 23, 28])
  return (
    <Teken>
      {Array.from({ length: 30 }, (_, i) => {
        const x = 50 + (i % 6) * 28
        const y = 34 + Math.floor(i / 6) * 28
        return (
          <circle
            key={i}
            className={`w3-op ${genoemd.has(i) ? 'w3-stip-aan' : 'w3-stip'}`}
            style={d(0.15 + i * 0.035 + (genoemd.has(i) ? 0.5 : 0))}
            cx={x}
            cy={y}
            r={genoemd.has(i) ? 5 : 4}
          />
        )
      })}
    </Teken>
  )
}

/** 4. Vier maanden die zich vullen met pagina's. */
function Contentplan() {
  const kolommen = [4, 4, 3, 2]
  return (
    <Teken>
      {kolommen.map((n, k) => (
        <g key={k}>
          <rect className="w3-vul-zacht" x={28 + k * 48} y="30" width="24" height="4" rx="2" />
          {Array.from({ length: n }, (_, r) => (
            <rect
              key={r}
              className={`w3-val ${k === 0 && r === 0 ? 'w3-vlak-accent' : 'w3-lijn w3-vlak'}`}
              style={d(0.2 + k * 0.18 + r * 0.1)}
              x={28 + k * 48}
              y={46 + r * 30}
              width="40"
              height="22"
              rx="5"
            />
          ))}
        </g>
      ))}
    </Teken>
  )
}

/** 5. Kennisbank en internet komen samen in een briefing; wat onbekend is, wordt een vraag. */
function Voorbereiding() {
  return (
    <Teken>
      {[0, 1, 2].map((i) => (
        <rect key={`l${i}`} className="w3-op w3-vul-zacht" style={d(0.1 + i * 0.08)} x="24" y={46 + i * 16} width={[44, 34, 40][i]} height="5" rx="2.5" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`r${i}`} className="w3-op w3-vul-zacht" style={d(0.2 + i * 0.08)} x={216 - [44, 30, 38][i]} y={46 + i * 16} width={[44, 30, 38][i]} height="5" rx="2.5" />
      ))}
      <path className="w3-teken-lijn w3-zacht" style={d(0.5)} pathLength={1} d="M70 62 C 96 62, 100 98, 112 108" />
      <path className="w3-teken-lijn w3-zacht" style={d(0.6)} pathLength={1} d="M170 62 C 144 62, 140 98, 128 108" />
      <rect className="w3-op w3-lijn w3-vlak" style={d(1.0)} x="84" y="108" width="72" height="48" rx="8" />
      {[0, 1].map((i) => (
        <rect key={i} className="w3-groei w3-vul-zacht" style={d(1.25 + i * 0.12)} x="96" y={122 + i * 11} width={[40, 30][i]} height="4" rx="2" />
      ))}
      <g className="w3-plop" style={d(1.7)}>
        <circle className="w3-vlak-accent" cx="168" cy="104" r="11" />
        <path className="w3-op-accent" d="M164.6 100.6a3.6 3.6 0 0 1 6.9 1.3c0 2.3-3.3 2.7-3.3 4.5M168.2 109.6v.1" />
      </g>
    </Teken>
  )
}

/** 6. Een vraag, de klant typt, het antwoord komt binnen. */
function KlantVultAan() {
  return (
    <Teken>
      <g className="w3-schuif w3-van-links" style={d(0.15)}>
        <rect className="w3-lijn w3-vlak" x="30" y="34" width="120" height="34" rx="12" />
        <rect className="w3-vul-zacht" x="44" y="48" width="78" height="6" rx="3" />
      </g>
      <g className="w3-typen" style={d(0.8)}>
        {[0, 1, 2].map((i) => <circle key={i} className="w3-typ-stip" style={d(0.8 + i * 0.15)} cx={176 + i * 10} cy="96" r="3" />)}
      </g>
      <g className="w3-schuif w3-van-rechts" style={d(1.8)}>
        <rect className="w3-vlak-accent" x="90" y="112" width="120" height="44" rx="12" />
        <rect className="w3-vul-accent-zacht" x="104" y="124" width="84" height="6" rx="3" />
        <rect className="w3-vul-accent-zacht" x="104" y="136" width="60" height="6" rx="3" />
      </g>
    </Teken>
  )
}

/** 7. De pagina schrijft zich regel voor regel; de bevestigde feiten krijgen een streep. */
function Schrijft() {
  const regels = [128, 140, 116, 132, 96]
  return (
    <Teken>
      <rect className="w3-lijn w3-vlak" x="48" y="20" width="144" height="146" rx="10" />
      <rect className="w3-groei w3-vul-tekst" style={d(0.2)} x="64" y="38" width="80" height="9" rx="3" />
      {regels.map((w, i) => (
        <rect key={i} className="w3-groei w3-vul-zacht" style={d(0.45 + i * 0.16)} x="64" y={62 + i * 16} width={w - 16} height="5" rx="2.5" />
      ))}
      <rect className="w3-groei w3-vul-accent" style={d(1.4)} x="64" y="88" width="44" height="2" rx="1" />
      <rect className="w3-groei w3-vul-accent" style={d(1.55)} x="96" y="136" width="36" height="2" rx="1" />
    </Teken>
  )
}

/** 8. Eén zin licht op om na te lopen, daarna een vinkje en de pagina staat live. */
function Goedkeuren() {
  return (
    <Teken>
      {[120, 100, 132, 88].map((w, i) => (
        <rect key={i} className="w3-op w3-vul-zacht" style={d(0.1 + i * 0.08)} x="30" y={40 + i * 18} width={w} height="6" rx="3" />
      ))}
      <rect className="w3-markeer" style={d(0.6)} x="26" y="71" width="108" height="14" rx="4" />
      <circle className="w3-teken-lijn w3-lijn-accent" style={d(1.1)} pathLength={1} cx="186" cy="70" r="26" />
      <path className="w3-teken-lijn w3-lijn-accent" style={d(1.6)} pathLength={1} d="M174 70.5l8 8 15-17" />
      <g className="w3-op" style={d(2.0)}>
        <circle className="w3-vul-accent" cx="168" cy="132" r="4" />
        <circle className="w3-puls" style={d(2.0)} cx="168" cy="132" r="4" />
        <rect className="w3-vul-zacht" x="180" y="129" width="30" height="6" rx="3" />
      </g>
    </Teken>
  )
}

/** 9. Vóór de pagina, na twee en na vier weken: de balkjes groeien. */
function Effect() {
  const groepen = [
    [18, 26],
    [44, 30],
    [76, 34],
  ]
  return (
    <Teken>
      <path className="w3-lijn" d="M28 150h184" />
      {groepen.map(([klant, ander], g) => (
        <g key={g}>
          <rect className="w3-staaf w3-vul-zacht" style={d(0.2 + g * 0.25)} x={44 + g * 60} y={150 - ander} width="16" height={ander} rx="3" />
          <rect className={`w3-staaf ${g === 2 ? 'w3-vul-accent' : 'w3-vul-tekst'}`} style={d(0.3 + g * 0.25)} x={64 + g * 60} y={150 - klant} width="16" height={klant} rx="3" />
          <rect className="w3-op w3-vul-zacht" style={d(0.2 + g * 0.25)} x={50 + g * 60} y="160" width="24" height="4" rx="2" />
        </g>
      ))}
      <path className="w3-teken-lijn w3-lijn-accent" style={d(1.2)} pathLength={1} d="M72 124 L132 98 L192 66" />
    </Teken>
  )
}

/** 10. Het verslag met een groeiende lijn, en een pijl terug naar het begin. */
function Maandverslag() {
  return (
    <Teken>
      <rect className="w3-lijn w3-vlak" x="40" y="22" width="112" height="140" rx="10" />
      <rect className="w3-op w3-vul-tekst" style={d(0.15)} x="54" y="38" width="48" height="7" rx="3" />
      <rect className="w3-op w3-vul-zacht" style={d(0.25)} x="54" y="52" width="70" height="4" rx="2" />
      <path className="w3-lijn" d="M54 130h84" />
      <path className="w3-teken-lijn w3-lijn-accent" style={d(0.5)} pathLength={1} d="M54 124 L70 118 L86 120 L102 106 L118 100 L138 84" />
      {[0, 1].map((i) => (
        <rect key={i} className="w3-op w3-vul-zacht" style={d(0.9 + i * 0.1)} x="54" y={140 + i * 9} width={[60, 44][i]} height="4" rx="2" />
      ))}
      <path className="w3-teken-lijn w3-zacht-sterk" style={d(1.3)} pathLength={1} d="M176 58 A 34 34 0 1 1 168 128" />
      <path className="w3-op w3-zacht-sterk" style={d(2.0)} d="M162 120 L168 128 L159 132" />
    </Teken>
  )
}

export const TEKENS: Record<string, () => React.JSX.Element> = {
  'klant-toevoegen': Toevoegen,
  'klant-onboarden': Onboarden,
  nulmeting: Nulmeting,
  contentplan: Contentplan,
  voorbereiding: Voorbereiding,
  'klant-vult-aan': KlantVultAan,
  'orbit-schrijft': Schrijft,
  'goedkeuren-en-live': Goedkeuren,
  'effect-meting': Effect,
  maandverslag: Maandverslag,
}
