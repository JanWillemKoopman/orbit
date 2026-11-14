// De eigen beelden van /agencies2, naast de beelden die de pagina deelt met /agencies
// (components/agencies/Visuals.tsx): de huisstijl van een bureau zoals wij hem van de website overnemen
// (HuisstijlVertaald), het scherm van een klant die meekijkt in de huisstijl van het bureau
// (KijkerInHuisstijl) en wat een klant mag en hoe hij aanlevert (KlantDoetMee). Bureau zonnig is hetzelfde
// verzonnen bureau als in de whitelabel-illustratie. Opmaak in app/agencies2/agencies2.css.
import { Chip, Icon, Knop, Logo, Mono } from '@/components/product/ui'

/* ── White label: van je website naar je platform ─────────────────────────── */

// De kleuren van bureau zonnig, zoals in de whitelabel-illustratie (app/agencies/agencies.css)
const KLEUREN = [
  { naam: 'Marineblauw', hex: '#070733' },
  { naam: 'Geel', hex: '#fce512' },
  { naam: 'Blauw', hex: '#004fc4' },
  { naam: 'Lichtgrijs', hex: '#f2f2f5' },
]

/** Wat wij van de website van een bureau overnemen: logo, kleuren, lettertype en vormen. */
export function HuisstijlVertaald() {
  return (
    <div className="fv-surface a3-hs">
      <div className="a3-hs-kop">
        <span className="a3-hs-bron"><Icon naam="wereld" size={13} />zonnig.example</span>
        <Chip tone="lime" dot>Staat aan</Chip>
      </div>
      <div className="a3-hs-rij">
        <Mono>Logo</Mono>
        <span className="a3-hs-logo">zonnig<i /></span>
      </div>
      <div className="a3-hs-rij">
        <Mono>Kleuren</Mono>
        <span className="a3-hs-kleuren">{KLEUREN.map((k) => <i key={k.hex} style={{ background: k.hex }} />)}</span>
      </div>
      <div className="a3-hs-rij">
        <Mono>Lettertype</Mono>
        <span className="a3-hs-font"><b>Aa</b>Montserrat</span>
      </div>
      <div className="a3-hs-rij">
        <Mono>Vormen</Mono>
        <span className="a3-hs-vormen"><i data-vorm="knop">Knop</i><i data-vorm="kaart" /></span>
      </div>
      <span className="ag-lock"><Icon naam="check" size={12} />Elke tekst is op leesbaarheid nagerekend.</span>
    </div>
  )
}

const KIJKER_MENU = [
  { l: 'Openstaande taken', i: 'taken', n: '2' },
  { l: 'Contentplan', i: 'plan' },
  { l: 'Openstaande vragen', i: 'vraag' },
  { l: 'Bibliotheek', i: 'boek' },
  { l: 'Zichtbaarheid in AI', i: 'grafiek' },
  { l: 'Zoekverkeer', i: 'zoek' },
]

/** Wat een klant ziet die meekijkt: zijn eigen bedrijf, in de huisstijl van het bureau. */
export function KijkerInHuisstijl() {
  return (
    <div className="agc-wl a3-kijker" data-stijl="zonnig">
      <aside className="agc-wl-side">
        <span className="agc-wl-brand">zonnig</span>
        <span className="agc-wl-groep">Lindeman Warmte</span>
        {KIJKER_MENU.map((m, i) => (
          <span key={m.l} className="agc-wl-item" data-on={i === 0 || undefined}><Icon naam={m.i} size={13} />{m.l}{m.n && <em>{m.n}</em>}</span>
        ))}
        <span className="agc-wl-user"><i>PL</i><span>Pieter Lindeman<em>Kijker</em></span></span>
      </aside>
      <div className="agc-wl-main">
        <div className="agc-wl-top">
          <span className="agc-wl-pad">Lindeman Warmte <b>›</b> <strong>Openstaande taken</strong></span>
        </div>
        <div className="agc-wl-head">
          <span className="agc-wl-titel">Lindeman Warmte<em>Wat op jou wacht</em></span>
        </div>
        <div className="agc-wl-kpis">
          <span><em>Zichtbaarheid in AI</em><strong>47%</strong><b>+10 sinds vorige ronde</b></span>
          <span><em>Pagina&apos;s live in november</em><strong>3<small>/5</small></strong><i className="agc-wl-voortgang"><i style={{ width: '60%' }} /></i></span>
        </div>
        <div className="agc-wl-tabel a3-kijker-taken">
          <div className="agc-wl-rij">
            <span className="agc-wl-naam"><strong>2 vragen om te beantwoorden</strong><em>Over hybride warmtepompen</em></span>
            <span className="agc-wl-knop">Beantwoord</span>
          </div>
          <div className="agc-wl-rij">
            <span className="agc-wl-naam"><strong>1 tekst om goed te keuren</strong><em>Hybride warmtepomp in Houten</em></span>
            <span className="agc-wl-chip">Open</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Samenwerken met je klant ─────────────────────────────────────────────── */

// De vinkjes onder Beheer, Gebruikers, Wat mogen kijkers (lib/kijker-rechten.ts in de app): de eerste twee
// staan standaard aan, de rest zet een beheerder zelf aan.
const RECHTEN = [
  { g: 'Vragen en bedrijf', r: [['Openstaande vragen beantwoorden', true], ['Materiaal toevoegen', true]] },
  { g: "Pagina's", r: [['Gele zinnen bevestigen', true], ['Een pagina goedkeuren', true], ['Een pagina zelf bewerken', false]] },
] as const

/** Wat een klant mag (links) en hoe hij zonder account een vraag beantwoordt (de telefoon ervoor). */
export function KlantDoetMee() {
  return (
    <div className="a3-km">
      <div className="ag-window a3-km-venster">
        <div className="ag-bar">
          <span className="ag-crumbs"><Logo size={18} /><span>Bureau Noordwind</span><span className="ag-crumb-current"><span className="ag-sep">›</span>Gebruikers</span></span>
        </div>
        <div className="ag-view">
          <div className="ag-head">
            <span className="ag-title">Wat mogen kijkers</span>
            <span className="ag-sub">Geldt voor elke klant die meekijkt</span>
          </div>
          <div className="a3-km-rechten">
            {RECHTEN.map((g) => (
              <div key={g.g} className="a3-km-groep">
                <Mono>{g.g}</Mono>
                {g.r.map(([l, aan]) => (
                  <div key={l} className="fv-right"><span>{l}</span><span className="fv-toggle" data-on={aan || undefined} /></div>
                ))}
              </div>
            ))}
          </div>
          <span className="ag-lock"><Icon naam="slot" size={12} />Wat geld kost, blijft bij een beheerder.</span>
        </div>
      </div>
      <div className="fv-phone a3-km-telefoon">
        <div className="fv-phone-notch" />
        <div className="fv-phone-screen">
          <div className="fv-phone-brand"><Logo size={16} /><span>Lindeman Warmte</span></div>
          <div className="a3-km-voortgang">
            <span>Vraag 2 van 3</span>
            <div className="fv-progress"><i style={{ width: '66%' }} /></div>
          </div>
          <span className="fv-phone-h">Uit welke onderdelen bestaat jullie prijs?</span>
          <span className="fv-phone-field">Toestel, buitenunit, montage en aansluiten op de ketel. De subsidieaanvraag zit erbij in.<i /></span>
          <Knop primair>Opslaan</Knop>
          <span className="fv-phone-foot"><Icon naam="slot" size={11} />Geen account nodig</span>
        </div>
      </div>
    </div>
  )
}
