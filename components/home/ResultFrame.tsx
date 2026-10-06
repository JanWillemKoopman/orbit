// Het eindresultaat: één pagina uit de Bibliotheek van ORBIT ENGINE, nagebouwd naar het paginascherm
// in de app (strategie/bibliotheek/[paginaId]): terugknop, titel, standbalk, de kaart "Aan zet" en de
// tekst. Het is dezelfde voorbeeldpagina als in de drie schermen erboven, zodat je ziet waar het
// antwoord uit Openstaande vragen (de bedragen) op de pagina terechtkomt. Voorbeelddata.
import { LogoMark } from '@/components/Logo'
import { Icon, type IconName } from './AppFrame'

const nav: { group?: string; items: { icon: IconName; label: string; active?: boolean }[] }[] = [
  { items: [{ icon: 'inbox', label: 'Openstaande taken' }] },
  { group: 'Clusters', items: [{ icon: 'stack', label: 'Mijn clusters' }, { icon: 'compass', label: 'Clusters ontdekken' }] },
  { group: 'Strategie', items: [{ icon: 'doc', label: 'Contentplan' }, { icon: 'question', label: 'Openstaande vragen' }, { icon: 'book', label: 'Bibliotheek', active: true }] },
  { group: 'Resultaten', items: [{ icon: 'chart', label: 'Zichtbaarheid in AI' }, { icon: 'search', label: 'Zoekverkeer' }] },
  { group: 'Mijn bedrijf', items: [{ icon: 'brand', label: 'Merkdossier' }, { icon: 'facts', label: 'Feiten en kennis' }] },
]

// De standbalk uit de app: vijf stappen, deze pagina staat op Live.
const stappen = ['Vragen', 'Schrijven', 'Goedkeuren', 'Live', 'Effect']
const huidige = 3

function Check() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  )
}

export function ResultFrame() {
  return (
    <div className="rs-frame" aria-hidden="true">
      <nav className="rs-sidebar">
        <span className="rs-workspace">
          <span className="af-workspace-logo"><LogoMark size={12} /></span>
          <span>Fietsen Jansen</span>
          <Icon name="chevron" />
        </span>
        {nav.map((g, gi) => (
          <div className="rs-nav-group" key={gi}>
            {g.group && <span className="rs-nav-heading">{g.group}</span>}
            {g.items.map((it) => (
              <span key={it.label} className="rs-nav-item" data-active={it.active || undefined}>
                <Icon name={it.icon} />
                {it.label}
              </span>
            ))}
          </div>
        ))}
      </nav>

      <div className="rs-main">
        <span className="rs-back">← Bibliotheek</span>
        <span className="rs-title">Wat kost een onderhoudsbeurt voor een e-bike?</span>
        <span className="rs-meta">Artikel · E-bike onderhoud</span>

        <div className="rs-steps">
          {stappen.map((s, i) => (
            <div className="rs-step" key={s} data-state={i < huidige ? 'done' : i === huidige ? 'now' : 'todo'}>
              <span className="rs-dot">{i < huidige && <Check />}</span>
              <span className="rs-step-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="rs-aanzet">
          <span className="rs-aanzet-wie">Aan zet: jij</span>
          <span className="rs-aanzet-zin">De tekst is goedgekeurd. Plaats hem op je site en vul daarna het adres in.</span>
          <span className="rs-aanzet-knop">Meld dat hij live staat</span>
        </div>

        <div className="rs-article">
          <p>
            Een kleine onderhoudsbeurt voor je e-bike kost bij Fietsen Jansen € 69, een grote beurt € 119. Bij elke beurt
            controleren we gratis je accu, zodat je weet hoeveel capaciteit er nog over is. De prijs hoor je vooraf, niet achteraf.
          </p>
          <h4>Wat zit er in een kleine en een grote beurt?</h4>
          <p>
            Bij een kleine beurt stellen we je remmen en versnellingen af, smeren we de ketting en kijken we je banden na.
            Bij een grote beurt halen we ook de aandrijving uit elkaar, vervangen we versleten onderdelen en lezen we de motor
            uit op foutmeldingen.
          </p>
          <h4>Hoe vaak heeft een e-bike onderhoud nodig?</h4>
          <p>
            Rijd je dagelijks naar je werk, dan is een kleine beurt per half jaar verstandig en een grote beurt per jaar.
            Fiets je vooral in het weekend, dan is één beurt per jaar meestal genoeg.
          </p>
        </div>
      </div>
    </div>
  )
}
