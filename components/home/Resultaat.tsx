// De twee beelden van de sectie over resultaten op de homepage: het maandverslag waarmee het
// klantgesprek begint, en de pagina's van eerdere maanden die blijven opleveren. Fictieve case
// Lindeman Warmte van Bureau Noordwind, dezelfde als in de andere beelden. De cijfers volgen wat
// de app werkelijk toont: het verslag heeft zichtbaarheid in AI met marge, de pagina's die live
// gingen met hun oordeel en de planning; de klikken komen uit Search Console, per pagina vanaf
// zijn eigen publicatiedag.
import { Chip, Mono } from '@/components/product/ui'

const LIVE = [
  ['Hybride warmtepomp laten installeren in Utrecht', 'Live op 3 oktober', 'lime', 'Gestegen'],
  ['Wat kost een warmtepomp in 2026?', 'Live op 10 oktober', 'lime', 'Gestegen'],
  ['Warmtepomp in een jaren-30-woning', 'Live op 17 oktober', 'grijs', 'Gelijk'],
  ['Subsidie op een warmtepomp aanvragen', 'Live op 24 oktober', 'grijs', 'Nog te vroeg'],
] as const

export function VerslagOktober() {
  return (
    <div className="fv-surface fv-report hr-verslag">
      <div className="fv-report-head">
        <span className="fv-report-logo">N</span>
        <span><span className="fv-muted">Bureau Noordwind · Lindeman Warmte</span><strong>Verslag van oktober</strong></span>
      </div>
      <div className="fv-report-kpis hr-kpis">
        <span><em>Zichtbaarheid in AI</em><strong>41%</strong><i className="fv-muted">±5 · vorige ronde 32%</i></span>
        <span><em>Pagina&apos;s live</em><strong>4</strong><i className="fv-muted">zoals afgesproken</i></span>
      </div>
      <div className="fv-report-list">
        <Mono>Pagina&apos;s die live gingen</Mono>
        {LIVE.map(([t, d, tone, oordeel]) => (
          <div key={t} className="fv-report-row">
            <span className="fv-report-t"><strong>{t}</strong><em>{d}</em></span>
            <Chip tone={tone} dot>{oordeel}</Chip>
          </div>
        ))}
      </div>
      <span className="fv-muted fv-small">Volgende maand: 4 pagina&apos;s gepland, de eerste gaat op 7 november live.</span>
    </div>
  )
}

// Per maand de pagina's die toen live gingen en hun klikken sinds publicatie. De oudste maand levert
// het meest op: zo zie je dat eerder werk blijft meetellen.
const MAANDEN = [
  { m: 'Augustus', paginas: 4, klikken: 1384, breedte: 100 },
  { m: 'September', paginas: 4, klikken: 912, breedte: 66 },
  { m: 'Oktober', paginas: 4, klikken: 265, breedte: 19 },
] as const

export function OpbrengstOpgebouwd() {
  const totaal = MAANDEN.reduce((s, r) => s + r.klikken, 0)
  return (
    <div className="fv-surface hr-opbrengst">
      <div className="hr-op-head">
        <Mono>Wat het in Google opleverde</Mono>
        <div className="hr-op-kpis">
          <span><em>Pagina&apos;s live</em><strong>12</strong></span>
          <span><em>Klikken sinds de start</em><strong>{totaal.toLocaleString('nl-NL')}</strong></span>
          <span><em>Deze 28 dagen</em><strong>694</strong><i className="fv-up">41% meer dan de 28 dagen ervoor</i></span>
        </div>
      </div>
      <div className="hr-op-list">
        <Mono>Per maand gepubliceerd</Mono>
        {MAANDEN.map((r) => (
          <div key={r.m} className="hr-op-row">
            <span className="hr-op-m"><strong>{r.m}</strong><em>{r.paginas} pagina&apos;s</em></span>
            <span className="hr-op-balk" aria-hidden="true"><i style={{ width: `${r.breedte}%` }} /></span>
            <span className="hr-op-n">{r.klikken.toLocaleString('nl-NL')}</span>
          </div>
        ))}
      </div>
      <div className="hr-ladder">
        <Mono>Wat kost een warmtepomp in 2026?</Mono>
        <div className="fv-row">
          <Chip tone="lime" dot>Gepubliceerd</Chip>
          <Chip tone="lime" dot>Zichtbaar in Google</Chip>
          <Chip tone="lime" dot>Genoemd door AI</Chip>
          <Chip tone="lime" dot>Aangehaald als bron</Chip>
          <Chip tone="lime" dot>Verkeer</Chip>
        </div>
      </div>
    </div>
  )
}
