// De twee beelden van de sectie over resultaten op de homepage. Links de maandrapportage met de nadruk
// op wat er gepubliceerd is, rechts de resultaten: zichtbaarheid in AI en klikken uit Google. Fictieve
// case Lindeman Warmte, dezelfde als in de andere beelden. De cijfers volgen wat de app werkelijk toont:
// het verslag zet de pagina's die live gingen en de planning op een rij; de zichtbaarheid in AI heeft
// een marge, en de klikken komen uit Search Console.
import { Chip, Mono } from '@/components/product/ui'

// De eerste pagina's van de achttien; de rest valt onder de vervaging van het beeld.
const LIVE = [
  ['Hybride warmtepomp laten installeren in Utrecht', 'Live op 2 september'],
  ['Wat kost een warmtepomp in 2026?', 'Live op 4 september'],
  ['Warmtepomp in een jaren-30-woning', 'Live op 8 september'],
  ['Subsidie op een warmtepomp aanvragen', 'Live op 10 september'],
] as const

export function VerslagMaand() {
  return (
    <div className="fv-surface fv-report hr-verslag">
      <div className="hr-head">
        <span className="fv-muted">Maandrapportage</span>
        <strong>September</strong>
      </div>
      <div className="hr-hoofdcijfer">
        <span className="hr-groot">18</span>
        <span className="hr-groot-t">
          <strong>pagina&apos;s gepubliceerd</strong>
          <Chip tone="lime" dot>18 van 18 uit contentplan</Chip>
        </span>
      </div>
      <div className="fv-report-list">
        <Mono>Pagina&apos;s die live gingen</Mono>
        {LIVE.map(([t, d]) => (
          <div key={t} className="fv-report-row">
            <span className="fv-report-t"><strong>{t}</strong><em>{d}</em></span>
            <Chip tone="lime" dot>Live</Chip>
          </div>
        ))}
      </div>
      <span className="fv-muted fv-small">Volgende maand: 18 pagina&apos;s gepland, de eerste gaat op 1 oktober live.</span>
    </div>
  )
}

// Klikken uit Google per maand, van januari tot september: duidelijk omhoog van 11.740 naar 24.694, met
// de dipjes die echt zoekverkeer ook heeft, zodat de lijn niet te mooi oogt.
const KLIKKEN = [
  ['jan', 11740],
  ['feb', 13120],
  ['mrt', 12560],
  ['apr', 15380],
  ['mei', 16450],
  ['jun', 15890],
  ['jul', 19270],
  ['aug', 21340],
  ['sep', 24694],
] as const

// Het lijntje in een vlak van 400 bij 80, met wat ruimte boven en onder.
const B = 400
const H = 80
const MIN = 10000
const MAX = 26000
const punten = KLIKKEN.map(([, v], i) => [(i / (KLIKKEN.length - 1)) * B, H - ((v - MIN) / (MAX - MIN)) * H] as const)
const lijn = punten.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const vlak = `${lijn} L${B},${H} L0,${H} Z`

export function OpbrengstOpgebouwd() {
  return (
    <div className="fv-surface hr-opbrengst">
      <div className="hr-head">
        <span className="fv-muted">Resultaten</span>
        <strong>Lindeman Warmte</strong>
      </div>
      <div className="hr-op-kpis">
        <span>
          <em>Zichtbaarheid in AI</em>
          <strong>41%</strong>
          <i className="fv-up">↑ 9 sinds vorige ronde</i>
        </span>
        <span>
          <em>Klikken uit Google</em>
          <strong>24.694</strong>
          <i className="fv-up">↑ 110% sinds januari</i>
        </span>
      </div>
      <div className="hr-grafiek">
        <span className="hr-op-kop"><Mono>Klikken per maand</Mono><span className="fv-muted fv-small">van 11.740 naar 24.694</span></span>
        <svg viewBox={`-6 -10 ${B + 12} ${H + 16}`} aria-hidden="true">
          <defs>
            <linearGradient id="hr-vlak" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bcff2f" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#bcff2f" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.5, 1].map((f) => <line key={f} x1="0" x2={B} y1={H * f} y2={H * f} stroke="rgba(255,255,255,0.07)" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
          <path d={vlak} fill="url(#hr-vlak)" />
          <path d={lijn} fill="none" stroke="#bcff2f" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {punten.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === punten.length - 1 ? 4 : 2.5} fill={i === punten.length - 1 ? '#bcff2f' : '#141517'} stroke="#bcff2f" strokeWidth="1.5" />)}
        </svg>
        <span className="hr-maanden">{KLIKKEN.map(([m]) => <span key={m}>{m}</span>)}</span>
      </div>
    </div>
  )
}
