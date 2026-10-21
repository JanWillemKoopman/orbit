// De productbeelden van /homepagina6, gebouwd zoals linear.app zijn product laat zien:
//
// - Een groot beeld is één kader, iets breder dan de tekstkolom, met grijze lichtval van boven. Daarin
//   staat een app-venster dat onderaan uit het kader loopt en wegvaagt, en onder het venster het
//   bijschrift, in hetzelfde kader.
// - Een venster is rustig: bijna zwart, een rand van 5% wit, een glans op één hoek en tekst in grijzen.
//   Kleur zit alleen in kleine statustekens. Diepte komt van een tweede venster of een zwevende kaart
//   die over het eerste valt, niet van zware schaduwen.
//
// Alles volgt één doorlopend voorbeeld: Bureau Noordwind werkt voor Fietsen Jansen aan "bakfiets leasen
// in Utrecht". Alle namen zijn verzonnen; elk bijschrift zegt dat het een demonstratie is. Knoppen in een
// beeld zijn spans zonder aanwijzer of hover, want er valt niets te klikken. Voor hulptechnologie heeft
// elk beeld één korte samenvatting en zijn de details verborgen.
import { LogoMark } from '@/components/Logo'

const KLANT = 'Fietsen Jansen'
const BUREAU = 'Bureau Noordwind'
const ONDERWERP = 'Bakfiets leasen in Utrecht'
const VRAAG = 'Waar kan ik in Utrecht een bakfiets leasen?'
export const DEMO = 'Demonstratie · fictieve gegevens'

/* Bouwstenen ------------------------------------------------------------------------------------- */

// Het grote beeld: lichtval, het podium met de vensters en het bijschrift.
export function Figuur({ nr, titel, tekst, className = '', children }: { nr: string; titel: string; tekst?: string; className?: string; children: React.ReactNode }) {
  return (
    <figure className={`lf ${className}`}>
      <div className="lf-podium">{children}</div>
      <figcaption className="lf-bijschrift">
        <p className="lf-fig">Fig {nr} · {DEMO}</p>
        <h3>{titel}</h3>
        {tekst && <p className="lf-bijschrift-tekst">{tekst}</p>}
      </figcaption>
    </figure>
  )
}

// Een beeld voor hulptechnologie: één samenvatting, de details verborgen.
function Beeld({ samenvatting, className = '', children }: { samenvatting: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`lv-beeld ${className}`} role="img" aria-label={`${samenvatting} Demonstratie met fictieve gegevens.`}>
      <div className="lv-beeld-in" aria-hidden="true">{children}</div>
    </div>
  )
}

function Venster({ className = '', balk, children }: { className?: string; balk?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={`lv-venster ${className}`}>
      {balk && <div className="lv-balk">{balk}</div>}
      {children}
    </div>
  )
}

function Pad({ delen }: { delen: string[] }) {
  return (
    <span className="lv-pad">
      {delen.map((d, i) => <span key={d} className={i === delen.length - 1 ? 'lv-pad-nu' : undefined}>{d}</span>)}
    </span>
  )
}

const PADEN = {
  overzicht: 'M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z',
  plan: 'M2.5 3.5h11v10h-11zM2.5 6.5h11M5.5 2v3M10.5 2v3',
  vragen: 'M3 3.5h10v7H7l-3 2.5v-2.5H3z',
  bibliotheek: 'M4 2.5h6l2.5 2.5v8.5H4zM6 7.5h4.5M6 10h4.5',
  zichtbaarheid: 'M2.5 13.5V9M6.5 13.5V6M10.5 13.5V8M14 13.5V3.5',
  zoekverkeer: 'M2 11.5l3.5-3.5 3 2.5L14 4.5',
  profiel: 'M8 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 13.5c.6-2.6 2.6-4 5-4s4.4 1.4 5 4',
  bronnen: 'M6.5 9.5l3-3M5 7.5L3.5 9a2.5 2.5 0 0 0 3.5 3.5L8.5 11M11 8.5L12.5 7A2.5 2.5 0 0 0 9 3.5L7.5 5',
  feiten: 'M8 2.5l5 2v4c0 2.8-2.2 4.4-5 5-2.8-.6-5-2.2-5-5v-4zM5.8 8l1.5 1.5 3-3',
  pijl: 'M3 8h10m-4-4 4 4-4 4',
  let: 'M8 2.5l6 10.5H2zM8 7v2.5M8 11.4v.1',
  link: 'M6.5 9.5l3-3M5 7.5L3.5 9a2.5 2.5 0 0 0 3.5 3.5L8.5 11M11 8.5L12.5 7A2.5 2.5 0 0 0 9 3.5L7.5 5',
  document: 'M4 2.5h6l2.5 2.5v8.5H4zM10 2.5V5h2.5',
} as const
type IcoonNaam = keyof typeof PADEN

function Icoon({ naam }: { naam: IcoonNaam }) {
  return <svg className="lv-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={PADEN[naam]} /></svg>
}

// Statustekens zoals in Linear: een rondje dat zegt hoe ver iets is, altijd met tekst ernaast.
function Status({ soort }: { soort: 'klaar' | 'gepland' | 'wacht' | 'niet' }) {
  if (soort === 'klaar') return <svg className="lv-status lv-status-klaar" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" /><path d="M4.3 7.2l1.9 1.8 3.5-3.8" /></svg>
  if (soort === 'wacht') return <svg className="lv-status lv-status-wacht" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" /><path d="M7 1.5a5.5 5.5 0 0 1 0 11z" /></svg>
  if (soort === 'niet') return <svg className="lv-status lv-status-niet" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" /><path d="M4.5 7h5" /></svg>
  return <svg className="lv-status lv-status-gepland" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.5" /></svg>
}

const Klant = () => <span className="lv-klant"><span className="lv-avatar">FJ</span>{KLANT}</span>
const Noordwind = () => <span className="lv-nw">N</span>

function Antwoord() {
  return (
    <p className="lv-antwoord">
      Bekijk bijvoorbeeld <strong>Fietsatelier Voorbeeld</strong> en <strong>Stadsfiets Demo</strong>. Vergelijk de looptijd, onderhoudsafspraken en voorwaarden.
    </p>
  )
}

/* 1. Hero: van gemiste vraag naar werkbare kans -------------------------------------------------- */

// De zijbalk volgt de hoofdstukken van de app (lib/nav.ts in ORBIT ENGINE), ingekort tot wat in beeld past.
const MENU: { kop: string; items: [string, IcoonNaam][] }[] = [
  { kop: '', items: [['Overzicht', 'overzicht']] },
  { kop: 'Strategie', items: [['Contentplan', 'plan'], ['Openstaande vragen', 'vragen'], ['Bibliotheek', 'bibliotheek']] },
  { kop: 'Resultaten', items: [['Zichtbaarheid in AI', 'zichtbaarheid'], ['Zoekverkeer', 'zoekverkeer']] },
  { kop: 'Mijn bedrijf', items: [['Bedrijfsprofiel', 'profiel']] },
  { kop: 'Tools', items: [['Bronnen', 'bronnen'], ['Feitencontrole', 'feiten']] },
]

export function HeroKans() {
  return (
    <Beeld
      className="lv-hero"
      samenvatting={`Productvoorbeeld. Bij de vraag "${VRAAG}" noemt een gemeten antwoord Fietsatelier Voorbeeld en Stadsfiets Demo, maar niet ${KLANT}. Orbit zet daar een kans naast: maak je leaseaanbod duidelijker.`}
    >
      <Venster className="lv-app">
        <aside className="lv-zij">
          <div className="lv-werkruimte"><Noordwind />{BUREAU}</div>
          <div className="lv-merkkeuze"><Klant /></div>
          {MENU.map((g) => (
            <div key={g.kop || 'start'} className="lv-groep">
              {g.kop && <span className="lv-groep-kop">{g.kop}</span>}
              {g.items.map(([naam, icoon]) => (
                <span key={naam} className={naam === 'Zichtbaarheid in AI' ? 'lv-nav lv-nav-aan' : 'lv-nav'}><Icoon naam={icoon} />{naam}</span>
              ))}
            </div>
          ))}
        </aside>
        <div className="lv-hoofd">
          <div className="lv-balk"><Pad delen={['Zichtbaarheid in AI', ONDERWERP]} /></div>
          <div className="lv-hero-inhoud">
            <p className="lv-label">Onderzochte vraag</p>
            <p className="lv-titel">{VRAAG}</p>
            <dl className="lv-eigenschappen">
              <div><dt>Klant</dt><dd><Klant /></dd></div>
              <div><dt>Onderwerp</dt><dd>{ONDERWERP}</dd></div>
              <div><dt>Kanaal</dt><dd>ChatGPT</dd></div>
            </dl>
            <p className="lv-label lv-label-ruim">Voorbeeld van een gemeten antwoord</p>
            <div className="lv-citaat"><Antwoord /></div>
            <p className="lv-regel"><Status soort="niet" />{KLANT} niet genoemd in dit antwoord</p>
          </div>
        </div>
        <div className="lv-zwevend lv-kans">
          <div className="lv-zwevend-kop"><span className="lv-orbit"><LogoMark size={11} /></span>Geselecteerde kans</div>
          <div className="lv-zwevend-inhoud">
            <p className="lv-kans-titel">Maak je leaseaanbod duidelijker</p>
            <p className="lv-kans-tekst">Werk prijzen, voorwaarden en onderhoud uit op een eigen pagina. Controleer eerst welke informatie beschikbaar is.</p>
            <span className="lv-nepknop">Bekijk de kans <Icoon naam="pijl" /></span>
          </div>
        </div>
      </Venster>
    </Beeld>
  )
}

/* 3. Pitch in de huisstijl van het bureau, met de GEO-audit erachter ------------------------------ */

export function Pitch() {
  return (
    <Beeld
      className="lv-pitch"
      samenvatting={`Voorbeeld van een pitch van ${BUREAU} in de eigen huisstijl: AI-zichtbaarheid van ${KLANT}, met een eerste verkenning van de vraag "${VRAAG}" en een kans om te bespreken. Erachter een fragment uit de GEO-audit met drie acties: leaseaanbod verduidelijken, technische toegankelijkheid controleren en relevante bronnen beoordelen.`}
    >
      <Venster className="lv-audit" balk={<span className="lv-balk-titel"><Noordwind />GEO-audit · Actieplan</span>}>
        <ol className="lv-acties">
          <li><span className="lv-actie-nr">1</span>Leaseaanbod verduidelijken</li>
          <li><span className="lv-actie-nr">2</span>Technische toegankelijkheid controleren</li>
          <li><span className="lv-actie-nr">3</span>Relevante bronnen beoordelen</li>
        </ol>
      </Venster>
      <Venster className="lv-pitchpagina" balk={<><span className="lv-balk-titel lv-balk-nw"><Noordwind />{BUREAU}</span><span className="lv-balk-rechts">hallo@noordwind.example</span></>}>
        <div className="lv-pitch-inhoud">
          <p className="lv-pitch-titel">AI-zichtbaarheid van {KLANT}</p>
          <p className="lv-pitch-onderwerp">{ONDERWERP}</p>
          <p className="lv-label lv-label-ruim">Eerste verkenning</p>
          <p className="lv-vraag">{VRAAG}</p>
          <div className="lv-citaat"><Antwoord /></div>
          <div className="lv-pitch-kans">
            <p className="lv-label lv-label-nw">Kans om te bespreken</p>
            <p className="lv-pitch-kans-tekst">Hoe duidelijk zijn je leasevoorwaarden op je website uitgewerkt?</p>
            <span className="lv-nepknop lv-nepknop-nw">Bespreek de aanpak</span>
          </div>
        </div>
      </Venster>
    </Beeld>
  )
}

/* 4. Antwoord, bron, actie ------------------------------------------------------------------------ */

const VRAGEN = [
  VRAAG,
  'Is een elektrische bakfiets leasen voordeliger dan kopen?',
  'Welke fietsenmaker in Utrecht onderhoudt bakfietsen?',
]

export function AntwoordBron() {
  return (
    <Beeld
      className="lv-bron"
      samenvatting={`Productvoorbeeld met drie gevolgde vragen. Bij de gekozen vraag "${VRAAG}" staan apart: de waarneming (het antwoord van ChatGPT), de teruggevonden bron (leasevoorwaarden, een voorbeeldbron) en de voorgestelde actie: onderzoek of prijzen en voorwaarden duidelijk genoeg zijn uitgewerkt.`}
    >
      <Venster className="lv-split" balk={<><Klant /><Pad delen={['Gevolgde vragen']} /></>}>
        <div className="lv-split-grid">
          <ul className="lv-lijst">
            {VRAGEN.map((v, i) => (
              <li key={v} className={i === 0 ? 'lv-lijst-item lv-lijst-aan' : 'lv-lijst-item'}>
                <Status soort={i === 0 ? 'niet' : 'gepland'} />{v}
              </li>
            ))}
          </ul>
          <div className="lv-detail">
            <p className="lv-titel lv-titel-klein">{VRAAG}</p>
            <div className="lv-kanalen"><span className="lv-tab-aan">ChatGPT</span><span>Gemini</span><span>Google AI-overzicht</span></div>
            <dl className="lv-gebieden">
              <div>
                <dt>Waarneming</dt>
                <dd><Antwoord /></dd>
              </div>
              <div>
                <dt>Bron</dt>
                <dd><span className="lv-bron-titel"><Icoon naam="link" />Leasevoorwaarden — voorbeeldbron</span><span className="lv-domein">voorbeeld.example</span></dd>
              </div>
              <div>
                <dt>Voorgestelde actie</dt>
                <dd><span className="lv-advies">Onderzoek of prijzen en voorwaarden duidelijk genoeg zijn uitgewerkt</span></dd>
              </div>
            </dl>
          </div>
        </div>
      </Venster>
    </Beeld>
  )
}

/* 5. Eén claim door de controle ------------------------------------------------------------------- */

export function ClaimControle() {
  return (
    <Beeld
      className="lv-claim"
      samenvatting={`Productvoorbeeld van een tekst in het contentplan voor ${ONDERWERP}. De zin "Onderhoud is inbegrepen in het maandbedrag" is gemarkeerd: in de beschikbare klantkennis is dat niet bevestigd. Het vervolg is het bedrijf vragen; de status is wacht op bevestiging.`}
    >
      <Venster className="lv-doc" balk={<Pad delen={['Contentplan', ONDERWERP]} />}>
        <div className="lv-doc-inhoud">
          <span className="lv-doc-icoon"><Icoon naam="document" /></span>
          <p className="lv-doc-titel">Een bakfiets leasen bij {KLANT}</p>
          <p className="lv-doc-tekst">
            Bekijk welke bakfiets past bij je dagelijkse ritten. <mark className="lv-claim-zin">Onderhoud is inbegrepen in het maandbedrag.</mark> Neem contact op om de mogelijkheden en voorwaarden te bespreken.
          </p>
        </div>
        <div className="lv-zwevend lv-controle">
          <p className="lv-controle-titel"><Icoon naam="let" />Bevestiging nodig</p>
          <p className="lv-controle-reden">In de beschikbare klantkennis is niet bevestigd dat onderhoud is inbegrepen.</p>
          <div className="lv-controle-voet">
            <span className="lv-nepknop">Vraag het bedrijf</span>
            <span className="lv-statusregel lv-statusregel-wacht"><Status soort="wacht" />Wacht op bevestiging</span>
          </div>
        </div>
      </Venster>
    </Beeld>
  )
}

/* 6. Hermeting en maandverslag -------------------------------------------------------------------- */

const MOMENTEN: { naam: string; wat: string; status: 'klaar' | 'gepland' }[] = [
  { naam: 'Gepubliceerd', wat: 'Pagina live', status: 'klaar' },
  { naam: 'Dag 14', wat: 'Eerste hermeting', status: 'klaar' },
  { naam: 'Dag 28', wat: 'Tweede hermeting', status: 'gepland' },
]

const VERSLAG = [
  { kop: 'Uitgevoerd', tekst: 'Pagina over bakfietslease gepubliceerd.' },
  { kop: 'Gecontroleerd', tekst: 'Eerste hermeting uitgevoerd.' },
  { kop: 'Ontwikkeling', tekst: 'Nog onvoldoende gegevens voor een conclusie.' },
  { kop: 'Volgende stap', tekst: 'Tweede hermeting afwachten en relevante bronvermeldingen beoordelen.' },
]

export function Hermeting() {
  return (
    <Beeld
      className="lv-hermeting"
      samenvatting={`Productvoorbeeld voor ${ONDERWERP}. Tijdlijn: gepubliceerd, de eerste hermeting op dag 14 is afgerond en de tweede op dag 28 is gepland. Conclusie: nog onvoldoende metingen voor een conclusie over de ontwikkeling. Ernaast het maandverslag van ${BUREAU} met wat is uitgevoerd, gecontroleerd en wat de volgende stap is.`}
    >
      <Venster className="lv-meet" balk={<><Klant /><Pad delen={['Hermeting']} /></>}>
        <div className="lv-meet-inhoud">
          <p className="lv-titel">{ONDERWERP}</p>
          <ol className="lv-tijdlijn">
            {MOMENTEN.map((m, i) => (
              // De lijn naar het volgende moment is doorgetrokken als dat moment al is afgerond.
              <li key={m.naam} className={MOMENTEN[i + 1]?.status === 'klaar' ? 'lv-moment lv-moment-door' : 'lv-moment'}>
                <Status soort={m.status} />
                <span className="lv-moment-naam">{m.naam}</span>
                <span className="lv-moment-wat">{m.wat}</span>
                <span className="lv-moment-status">{m.status === 'klaar' ? 'Afgerond' : 'Gepland'}</span>
              </li>
            ))}
          </ol>
          <div className="lv-conclusie">
            <p className="lv-label">Conclusie</p>
            <p className="lv-conclusie-tekst">Nog onvoldoende metingen voor een conclusie over de ontwikkeling.</p>
          </div>
        </div>
      </Venster>
      <Venster className="lv-verslag" balk={<span className="lv-balk-titel lv-balk-nw"><Noordwind />{BUREAU} · Maandverslag</span>}>
        <div className="lv-verslag-inhoud">
          <p className="lv-verslag-klant">{KLANT}</p>
          <dl>
            {VERSLAG.map((r) => (
              <div key={r.kop}>
                <dt>{r.kop}</dt>
                <dd>{r.tekst}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Venster>
    </Beeld>
  )
}

/* 7. Wie is aan zet? ------------------------------------------------------------------------------ */

const RIJEN = [
  { klant: KLANT, kort: 'FJ', actie: 'Maandmeting bekijken', wie: 'Bureau' },
  { klant: 'Studio Voorbeeld', kort: 'SV', actie: 'Tekst beoordelen', wie: 'Bureau' },
  { klant: 'Bouwbedrijf Demo', kort: 'BD', actie: 'Vraag beantwoorden', wie: 'Klant' },
  { klant: 'Praktijk Voorbeeld', kort: 'PV', actie: 'Publicatie controleren', wie: 'Bureau' },
]

export function Werkoverzicht() {
  return (
    <Beeld
      className="lv-overzicht"
      samenvatting={`Productvoorbeeld van het werkoverzicht van ${BUREAU} met vier klanten. ${RIJEN.map((r) => `${r.klant}: ${r.actie.toLowerCase()}, ${r.wie.toLowerCase()} aan zet.`).join(' ')}`}
    >
      <Venster className="lv-tabelvenster" balk={<><span className="lv-balk-titel"><Noordwind />{BUREAU}</span><Pad delen={['Werkoverzicht']} /></>}>
        <div className="lv-tabel">
          <div className="lv-tabel-kop"><span>Klant</span><span>Volgende actie</span><span>Aan zet</span></div>
          {RIJEN.map((r, i) => (
            <div key={r.klant} className={i === 0 ? 'lv-tabel-rij lv-tabel-aan' : 'lv-tabel-rij'}>
              <span className="lv-tabel-klant"><span className="lv-avatar">{r.kort}</span>{r.klant}</span>
              <span className="lv-tabel-actie"><span className="lv-cel-label">Volgende actie</span>{r.actie}</span>
              <span className="lv-tabel-wie"><span className="lv-cel-label">Aan zet</span><span className={r.wie === 'Bureau' ? 'lv-wie lv-wie-bureau' : 'lv-wie lv-wie-klant'}>{r.wie}</span></span>
            </div>
          ))}
        </div>
      </Venster>
    </Beeld>
  )
}
