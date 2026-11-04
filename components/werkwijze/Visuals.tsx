// Beelden van /werkwijze die niet op de andere productpagina's staan. Ze gebruiken de bouwstenen en
// stijlen van components/product (werkwijze.css) en dezelfde fictieve case Lindeman Warmte.
import { Chip, Icon, Knop, Logo, Mono } from '@/components/product/ui'

/** Stap 1: een bedrijf toevoegen met alleen een naam en een website. */
export function NieuwBedrijf() {
  return (
    <div className="fv-surface wv-form">
      <div className="fv-q-head"><span>Nieuw bedrijf</span></div>
      <span className="wv-veld"><Mono>Naam</Mono><span className="wv-input">Lindeman Warmte</span></span>
      <span className="wv-veld"><Mono>Website</Mono><span className="wv-input" data-focus>lindeman-warmte.example<i className="wv-caret" /></span></span>
      <div className="fv-row"><Knop primair>Bedrijf toevoegen</Knop></div>
    </div>
  )
}

/** Stap 1: het onderzoek dat daarna vanzelf loopt en het merkdossier vult. */
export function Merkdossier() {
  const rijen = [
    ['Website gelezen', "64 pagina's", 'klaar'],
    ['Aanbod in kaart gebracht', '9 diensten', 'klaar'],
    ['Concurrenten gevonden', '5 bedrijven', 'klaar'],
    ['Getest wat AI al weet', '3 assistenten', 'bezig'],
    ['Merkdossier', '', 'open'],
  ] as const
  return (
    <div className="fv-surface fv-setup wv-dossier">
      <div className="fv-q-head"><span>Onderzoek Lindeman Warmte</span><span className="fv-muted">3 van 5</span></div>
      <div className="fv-progress"><i style={{ width: '64%' }} /></div>
      {rijen.map(([t, w, stand]) => (
        <div key={t} className="fv-q wv-rij" data-done={stand === 'klaar' || undefined}>
          {stand === 'klaar' ? <Icon naam="check" size={13} /> : <span className="wv-stip" data-stand={stand} />}
          <span className="wv-rij-t">{t}</span>
          {w && <em>{w}</em>}
        </div>
      ))}
    </div>
  )
}

/** Stap 2: één kennisbank per klant, elk feit met zijn bron. */
export function Kennisbank() {
  const feiten = [
    ['Installatie in één werkdag', 'Klant', 'lime'],
    ['Hybride warmtepomp vanaf € 4.500', 'Prijslijst', 'blauw'],
    ['Eigen monteurs, geen onderaannemers', 'Website', 'grijs'],
    ['Erkend door InstallQ', 'Brochure', 'blauw'],
  ] as const
  return (
    <div className="fv-surface fv-facts wv-kennis">
      <div className="fv-q-head wv-kennis-head"><span>Kennisbank</span><span className="fv-pill"><Icon naam="pdf" size={12} />Document toevoegen</span></div>
      {feiten.map(([t, bron, tone]) => (
        <div key={t} className="fv-fact">
          <span className="fv-fact-check"><Icon naam="check" size={12} /></span>
          <span className="fv-fact-t">{t}</span>
          <Chip tone={tone}>{bron}</Chip>
        </div>
      ))}
    </div>
  )
}

/** Stap 5: de briefing van één pagina, opgebouwd uit de kennisbank en bronnen van internet. */
export function Briefing() {
  return (
    <div className="fv-surface wv-brief">
      <div className="fv-q-head"><span>Briefing</span><Chip tone="lime" dot>Klaar</Chip></div>
      <span className="wv-brief-t">Hybride warmtepomp laten installeren in Utrecht</span>
      <div className="wv-bronnen">
        <span><Icon naam="boek" size={13} />Kennisbank<em>14 feiten</em></span>
        <span><Icon naam="wereld" size={13} />Internet<em>6 bronnen</em></span>
      </div>
      <Mono>Moet erop</Mono>
      <div className="fv-q" data-done><Icon naam="check" size={13} />Wat de installatie kost, opgebouwd</div>
      <div className="fv-q" data-done><Icon naam="check" size={13} />Hoe lang het plaatsen duurt</div>
      <div className="fv-q" data-done><Icon naam="check" size={13} />Welke subsidie er geldt</div>
    </div>
  )
}

/** Stap 5: wat Orbit niet weet, wordt een vraag aan de klant in plaats van een gok. */
export function NietVerzinnen() {
  const rijen = [
    ['Prijs', 'Wat kost een hybride warmtepomp bij jullie, met montage?'],
    ['Garantie', 'Hoeveel jaar garantie geven jullie op het werk?'],
    ['Ervaring', 'Welk project in Utrecht laat het beste zien wat jullie doen?'],
  ] as const
  return (
    <div className="fv-surface wv-onbekend">
      <div className="fv-q-head"><span>Niet bekend, dus gevraagd</span><span className="fv-muted">3 vragen</span></div>
      {rijen.map(([k, v]) => (
        <div key={k} className="wv-vraag">
          <Chip tone="oranje">{k}</Chip>
          <span>{v}</span>
        </div>
      ))}
    </div>
  )
}

/** Stap 6: de vragen per pagina, met een deadline en een link om door te sturen. */
export function VragenMetDeadline() {
  const paginas = [
    ['Hybride warmtepomp in Utrecht', '3 vragen', '1 van 3'],
    ['Warmtepomp in een jaren-30-woning', '2 vragen', '2 van 2'],
    ['Wat kost een warmtepomp met installatie?', '2 vragen', '0 van 2'],
  ] as const
  return (
    <div className="fv-surface wv-deadline">
      <div className="fv-q-head">
        <span className="wv-deadline-brand"><Logo size={18} />Vragen voor Lindeman Warmte</span>
      </div>
      <div className="fv-row"><Chip tone="oranje" dot>Graag vóór 18 oktober</Chip><span className="fv-pill"><Icon naam="link" size={12} />Kopieer de link</span></div>
      {paginas.map(([t, n, stand]) => (
        <div key={t} className="wv-pagina">
          <span className="wv-pagina-t"><strong>{t}</strong><em>{n}</em></span>
          <span className="fv-muted fv-small">{stand}</span>
        </div>
      ))}
    </div>
  )
}
