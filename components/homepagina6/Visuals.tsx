// De zes productbeelden van /homepagina6. Ze volgen één doorlopend voorbeeld: Bureau Noordwind werkt voor
// Fietsen Jansen aan het onderwerp "bakfiets leasen in Utrecht". Alle namen zijn verzonnen en elk beeld
// draagt zelf het label "Demonstratie · fictieve gegevens", zodat ook wie midden op de pagina binnenkomt
// weet dat het geen klantresultaat is.
//
// Alles is HTML en CSS met echte lettergroottes (minstens 14 px voor wat je moet lezen), zodat een beeld op
// mobiel herschikt in plaats van krimpt. Knoppen in een beeld zijn geen knoppen: het zijn spans zonder
// aanwijzer of hover, want er valt niets te klikken. Voor hulptechnologie heeft elk beeld één korte
// samenvatting; de details eronder zijn verborgen.

const KLANT = 'Fietsen Jansen'
const BUREAU = 'Bureau Noordwind'
const ONDERWERP = 'Bakfiets leasen in Utrecht'
const VRAAG = 'Waar kan ik in Utrecht een bakfiets leasen?'
const DEMO = 'Demonstratie · fictieve gegevens'

function Paneel({ samenvatting, className = '', children }: { samenvatting: string; className?: string; children: React.ReactNode }) {
  return (
    <figure className={`hg-paneel ${className}`} role="img" aria-label={`${samenvatting} Demonstratie met fictieve gegevens.`}>
      <div className="hg-paneel-in" aria-hidden="true">{children}</div>
    </figure>
  )
}

function Balk({ children }: { children: React.ReactNode }) {
  return (
    <div className="hg-balk">
      <div className="hg-balk-links">{children}</div>
      <span className="hg-demo">{DEMO}</span>
    </div>
  )
}

function Klant() {
  return <span className="hg-klant"><span className="hg-avatar">FJ</span>{KLANT}</span>
}

function Antwoord() {
  return (
    <p className="hg-antwoord-tekst">
      Bekijk bijvoorbeeld <strong>Fietsatelier Voorbeeld</strong> en <strong>Stadsfiets Demo</strong>. Vergelijk de looptijd, onderhoudsafspraken en voorwaarden.
    </p>
  )
}

function NoordwindLogo() {
  return <span className="hg-nw-logo">N</span>
}

const pijl = <svg className="hg-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10m-4-4 4 4-4 4" /></svg>
const vink = <svg className="hg-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
const leeg = <svg className="hg-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="8" r="5.5" /><path d="M5.5 8h5" /></svg>
const letOp = <svg className="hg-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2.5l6 10.5H2zM8 7v2.5M8 11.4v.1" /></svg>

/* 1. Hero: van gemiste vraag naar werkbare kans --------------------------------------------------- */

export function HeroKans() {
  return (
    <Paneel
      className="hg-v-hero"
      samenvatting={`Productvoorbeeld. Bij de vraag "${VRAAG}" noemt een gemeten antwoord Fietsatelier Voorbeeld en Stadsfiets Demo, maar niet ${KLANT}. Orbit zet daar een kans naast: maak je leaseaanbod duidelijker.`}
    >
      <Balk><Klant /><span className="hg-pad">{ONDERWERP}</span></Balk>
      <div className="hg-hero-grid">
        <div className="hg-vak">
          <p className="hg-kicker">Onderzochte vraag</p>
          <p className="hg-vraag">{VRAAG}</p>
          <div className="hg-antwoord">
            <p className="hg-kicker">Voorbeeld van een gemeten antwoord</p>
            <Antwoord />
          </div>
          <p className="hg-observatie">{leeg}{KLANT} niet genoemd in dit antwoord</p>
        </div>
        <div className="hg-vak hg-vak-kans">
          <div className="hg-kans">
            <p className="hg-kicker hg-kicker-accent">Geselecteerde kans</p>
            <p className="hg-kans-titel">Maak je leaseaanbod duidelijker</p>
            <p className="hg-kans-tekst">Werk prijzen, voorwaarden en onderhoud uit op een eigen pagina. Controleer eerst welke informatie beschikbaar is.</p>
            <span className="hg-nepknop">Bekijk de kans {pijl}</span>
          </div>
        </div>
      </div>
    </Paneel>
  )
}

/* 3. Pitch in de huisstijl van het bureau, met een fragment uit de GEO-audit ---------------------- */

export function Pitch() {
  return (
    <Paneel
      className="hg-v-pitch"
      samenvatting={`Voorbeeld van een pitch van ${BUREAU} in de eigen huisstijl: AI-zichtbaarheid van ${KLANT}, met een eerste verkenning van de vraag "${VRAAG}" en een kans om te bespreken. Daaronder een fragment uit de GEO-audit met drie acties.`}
    >
      <div className="hg-pitch">
        <div className="hg-pitch-kop">
          <span className="hg-pitch-bureau"><NoordwindLogo />{BUREAU}</span>
          <span className="hg-pitch-contact">hallo@noordwind.example</span>
        </div>
        <div className="hg-pitch-body">
          <span className="hg-demo">{DEMO}</span>
          <p className="hg-pitch-titel">AI-zichtbaarheid van {KLANT}</p>
          <p className="hg-pitch-onderwerp">{ONDERWERP}</p>
          <div className="hg-pitch-blok">
            <p className="hg-kicker">Eerste verkenning</p>
            <p className="hg-vraag hg-vraag-klein">{VRAAG}</p>
            <Antwoord />
          </div>
          <div className="hg-pitch-blok hg-pitch-kans">
            <p className="hg-kicker hg-kicker-nw">Kans om te bespreken</p>
            <p className="hg-pitch-kans-tekst">Hoe duidelijk zijn je leasevoorwaarden op je website uitgewerkt?</p>
            <span className="hg-nepknop hg-nepknop-nw">Bespreek de aanpak</span>
          </div>
        </div>
      </div>
      <div className="hg-audit">
        <p className="hg-audit-titel"><NoordwindLogo />GEO-audit · Actieplan</p>
        <ol>
          <li><span className="hg-audit-nr">1</span>Leaseaanbod verduidelijken</li>
          <li><span className="hg-audit-nr">2</span>Technische toegankelijkheid controleren</li>
          <li><span className="hg-audit-nr">3</span>Relevante bronnen beoordelen</li>
        </ol>
      </div>
    </Paneel>
  )
}

/* 4. Antwoord, bron, actie -------------------------------------------------------------------------- */

const VRAGEN = [
  { vraag: VRAAG, gekozen: true },
  { vraag: 'Is een elektrische bakfiets leasen voordeliger dan kopen?', gekozen: false },
  { vraag: 'Welke fietsenmaker in Utrecht onderhoudt bakfietsen?', gekozen: false },
]

export function AntwoordBron() {
  return (
    <Paneel
      className="hg-v-bron"
      samenvatting={`Productvoorbeeld met drie gevolgde vragen. Bij de gekozen vraag "${VRAAG}" staan apart: de waarneming (het antwoord van ChatGPT), de teruggevonden bron (leasevoorwaarden, een voorbeeldbron) en de voorgestelde actie: onderzoek of prijzen en voorwaarden duidelijk genoeg zijn uitgewerkt.`}
    >
      <Balk><Klant /><span className="hg-pad">Gevolgde vragen</span></Balk>
      <div className="hg-bron-grid">
        <ul className="hg-vragenlijst">
          {VRAGEN.map((v) => (
            <li key={v.vraag} className={v.gekozen ? 'hg-vraag-item hg-vraag-gekozen' : 'hg-vraag-item'}>{v.vraag}</li>
          ))}
        </ul>
        <div className="hg-bron-detail">
          <div className="hg-gebied">
            <p className="hg-kicker">Waarneming · ChatGPT</p>
            <Antwoord />
          </div>
          <div className="hg-bron-duo">
            <div className="hg-gebied">
              <p className="hg-kicker">Bron</p>
              <p className="hg-bron-titel">Leasevoorwaarden — voorbeeldbron</p>
              <p className="hg-domein">voorbeeld.example</p>
            </div>
            <div className="hg-gebied hg-gebied-advies">
              <p className="hg-kicker hg-kicker-accent">Voorgestelde actie</p>
              <p className="hg-advies-tekst">Onderzoek of prijzen en voorwaarden duidelijk genoeg zijn uitgewerkt</p>
            </div>
          </div>
        </div>
      </div>
    </Paneel>
  )
}

/* 5. Eén claim door de controle --------------------------------------------------------------------- */

export function ClaimControle() {
  return (
    <Paneel
      className="hg-v-claim"
      samenvatting={`Productvoorbeeld van een tekst in het contentplan voor ${ONDERWERP}. De zin "Onderhoud is inbegrepen in het maandbedrag" is gemarkeerd: in de beschikbare klantkennis is dat niet bevestigd. Het vervolg is het bedrijf vragen; de status is wacht op bevestiging.`}
    >
      <Balk><span className="hg-pad hg-pad-eerst">Contentplan</span>{pijl}<span className="hg-pad hg-pad-eerst">{ONDERWERP}</span></Balk>
      <div className="hg-claim-grid">
        <div className="hg-document">
          <p className="hg-document-titel">Een bakfiets leasen bij {KLANT}</p>
          <p className="hg-document-tekst">
            Bekijk welke bakfiets past bij je dagelijkse ritten. <mark className="hg-claim">Onderhoud is inbegrepen in het maandbedrag.</mark> Neem contact op om de mogelijkheden en voorwaarden te bespreken.
          </p>
        </div>
        <div className="hg-controle">
          <p className="hg-controle-titel">{letOp}Bevestiging nodig</p>
          <p className="hg-controle-reden">In de beschikbare klantkennis is niet bevestigd dat onderhoud is inbegrepen.</p>
          <div className="hg-controle-voet">
            <span className="hg-nepknop">Vraag het bedrijf</span>
            <span className="hg-status hg-status-amber"><span className="hg-stip" />Wacht op bevestiging</span>
          </div>
        </div>
      </div>
    </Paneel>
  )
}

/* 6. Hermeting en maandverslag ---------------------------------------------------------------------- */

const MOMENTEN = [
  { naam: 'Gepubliceerd', wat: 'Pagina live', status: 'Afgerond', klaar: true },
  { naam: 'Dag 14', wat: 'Eerste hermeting', status: 'Afgerond', klaar: true },
  { naam: 'Dag 28', wat: 'Tweede hermeting', status: 'Gepland', klaar: false },
]

const VERSLAG = [
  { kop: 'Uitgevoerd', tekst: 'Pagina over bakfietslease gepubliceerd.' },
  { kop: 'Gecontroleerd', tekst: 'Eerste hermeting uitgevoerd.' },
  { kop: 'Ontwikkeling', tekst: 'Nog onvoldoende gegevens voor een conclusie.' },
  { kop: 'Volgende stap', tekst: 'Tweede hermeting afwachten en relevante bronvermeldingen beoordelen.' },
]

export function Hermeting() {
  return (
    <Paneel
      className="hg-v-hermeting"
      samenvatting={`Productvoorbeeld voor ${ONDERWERP}. Tijdlijn: gepubliceerd, de eerste hermeting op dag 14 is afgerond en de tweede op dag 28 is gepland. Conclusie: nog onvoldoende metingen voor een conclusie over de ontwikkeling. Ernaast het maandverslag van ${BUREAU} met wat is uitgevoerd, gecontroleerd en wat de volgende stap is.`}
    >
      <Balk><Klant /><span className="hg-pad">Hermeting</span></Balk>
      <div className="hg-hermeting-grid">
        <div className="hg-meetverloop">
          <p className="hg-meet-titel">{ONDERWERP}</p>
          <ol className="hg-tijdlijn">
            {MOMENTEN.map((m, i) => (
              // De lijn naar het volgende moment is doorgetrokken als dat moment al is afgerond.
              <li key={m.naam} className={`hg-moment${m.klaar ? ' hg-moment-klaar' : ''}${MOMENTEN[i + 1]?.klaar ? ' hg-moment-door' : ''}`}>
                <span className="hg-moment-punt">{m.klaar ? vink : null}</span>
                <span className="hg-moment-naam">{m.naam}</span>
                <span className="hg-moment-wat">{m.wat}</span>
                <span className={m.klaar ? 'hg-status hg-status-groen' : 'hg-status'}><span className="hg-stip" />{m.status}</span>
              </li>
            ))}
          </ol>
          <div className="hg-conclusie">
            <p className="hg-kicker">Conclusie</p>
            <p className="hg-conclusie-tekst">Nog onvoldoende metingen voor een conclusie over de ontwikkeling.</p>
          </div>
        </div>
        <div className="hg-verslag">
          <p className="hg-verslag-kop"><NoordwindLogo />{BUREAU} · Maandverslag</p>
          <p className="hg-verslag-klant">{KLANT}</p>
          <dl>
            {VERSLAG.map((r) => (
              <div key={r.kop} className="hg-verslag-rij">
                <dt>{r.kop}</dt>
                <dd>{r.tekst}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Paneel>
  )
}

/* 7. Wie is aan zet? -------------------------------------------------------------------------------- */

const RIJEN = [
  { klant: KLANT, actie: 'Maandmeting bekijken', wie: 'Bureau', actief: true },
  { klant: 'Studio Voorbeeld', actie: 'Tekst beoordelen', wie: 'Bureau', actief: false },
  { klant: 'Bouwbedrijf Demo', actie: 'Vraag beantwoorden', wie: 'Klant', actief: false },
  { klant: 'Praktijk Voorbeeld', actie: 'Publicatie controleren', wie: 'Bureau', actief: false },
]

export function Werkoverzicht() {
  return (
    <Paneel
      className="hg-v-overzicht"
      samenvatting={`Productvoorbeeld van het werkoverzicht van ${BUREAU} met vier klanten. ${RIJEN.map((r) => `${r.klant}: ${r.actie.toLowerCase()}, ${r.wie.toLowerCase()} aan zet.`).join(' ')}`}
    >
      <Balk><span className="hg-klant"><NoordwindLogo />{BUREAU}</span><span className="hg-pad">Werkoverzicht</span></Balk>
      <div className="hg-tabel">
        <div className="hg-tabel-kop"><span>Klant</span><span>Volgende actie</span><span>Aan zet</span></div>
        {RIJEN.map((r) => (
          <div key={r.klant} className={r.actief ? 'hg-tabel-rij hg-tabel-rij-actief' : 'hg-tabel-rij'}>
            <span className="hg-tabel-klant">{r.klant}</span>
            <span className="hg-tabel-actie"><span className="hg-cel-label">Volgende actie</span>{r.actie}</span>
            <span className="hg-tabel-wie"><span className="hg-cel-label">Aan zet</span><span className={`hg-wie hg-wie-${r.wie.toLowerCase()}`}>{r.wie}</span></span>
          </div>
        ))}
      </div>
    </Paneel>
  )
}
