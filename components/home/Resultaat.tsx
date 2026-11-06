// De twee beelden van de sectie over resultaten op de homepage. Links de maandrapportage met de nadruk
// op wat er gepubliceerd is, rechts de resultaten: zichtbaarheid in AI en klikken uit Google. Fictieve
// case Lindeman Warmte, dezelfde als in de andere beelden. De cijfers volgen wat de app werkelijk toont:
// het verslag zet de pagina's die live gingen en de planning op een rij; de zichtbaarheid in AI heeft
// een marge, en de klikken komen uit Search Console, per pagina vanaf zijn eigen publicatiedag.
import { Chip, Mono } from '@/components/product/ui'

const LIVE = [
  ['Hybride warmtepomp laten installeren in Utrecht', 'Live op 3 oktober'],
  ['Wat kost een warmtepomp in 2026?', 'Live op 10 oktober'],
  ['Warmtepomp in een jaren-30-woning', 'Live op 17 oktober'],
  ['Subsidie op een warmtepomp aanvragen', 'Live op 24 oktober'],
] as const

export function VerslagOktober() {
  return (
    <div className="fv-surface fv-report hr-verslag">
      <div className="hr-head">
        <span className="fv-muted">Maandrapportage</span>
        <strong>Verslag van oktober</strong>
      </div>
      <div className="hr-hoofdcijfer">
        <span className="hr-groot">4</span>
        <span className="hr-groot-t">
          <strong>pagina&apos;s gepubliceerd</strong>
          <Chip tone="lime" dot>4 van 4 afgesproken</Chip>
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
      <span className="fv-muted fv-small">Volgende maand: 4 pagina&apos;s gepland, de eerste gaat op 7 november live.</span>
    </div>
  )
}

// Klikken per publicatiemaand: de oudste maand levert het meest op, zo zie je dat eerder werk blijft
// meetellen. Opgeteld 2.561 klikken sinds de start.
const MAANDEN = [
  { m: 'Augustus', paginas: 4, klikken: 1384, breedte: 100 },
  { m: 'September', paginas: 4, klikken: 912, breedte: 66 },
  { m: 'Oktober', paginas: 4, klikken: 265, breedte: 19 },
] as const

export function OpbrengstOpgebouwd() {
  const totaal = MAANDEN.reduce((s, r) => s + r.klikken, 0)
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
          <em>Klikken uit Google, 28 dagen</em>
          <strong>694</strong>
          <i className="fv-up">↑ 41% tegenover ervoor</i>
        </span>
      </div>
      <div className="hr-op-list">
        <span className="hr-op-kop"><Mono>Klikken per publicatiemaand</Mono><span className="fv-muted fv-small">{totaal.toLocaleString('nl-NL')} sinds de start</span></span>
        {MAANDEN.map((r) => (
          <div key={r.m} className="hr-op-row">
            <span className="hr-op-m"><strong>{r.m}</strong><em>{r.paginas} pagina&apos;s</em></span>
            <span className="hr-op-balk" aria-hidden="true"><i style={{ width: `${r.breedte}%` }} /></span>
            <span className="hr-op-n">{r.klikken.toLocaleString('nl-NL')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
