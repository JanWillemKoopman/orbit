// De productbeelden van /homepagina6. Het kader komt van linear.app (grijze lichtval, een venster dat
// onderaan uit beeld loopt, het bijschrift in hetzelfde kader); wat erin staat, volgt de app van Orbit:
//
// - Het hoofdpaneel van een scherm, met bovenin een kruimelpad. De zijbalk van de app laten de beelden weg.
// - Kaarten die net iets lichter zijn dan het paneel, tekst in de grijzen van de site, en per kanaal een
//   stip (genoemd) of een ring (niet genoemd).
// - Rechts het paneel Advies met kaarten en onderaan twee knoppen.
//
// Er is geen kleur behalve het limoengroen van Orbit, voor knoppen en accenten. Er staan geen logo's in
// de beelden. Alles volgt één doorlopend voorbeeld: Bureau Noordwind werkt voor Fietsen Jansen aan
// "bakfiets leasen in Utrecht". Alle namen zijn verzonnen; elk bijschrift zegt dat het een demonstratie
// is. Knoppen in een beeld zijn spans zonder aanwijzer of hover, want er valt niets te klikken. Voor
// hulptechnologie heeft elk beeld één korte samenvatting en zijn de details verborgen.

export const KLANT = 'Fietsen Jansen'
export const BUREAU = 'Bureau Noordwind'
export const ONDERWERP = 'Bakfiets leasen in Utrecht'
export const VRAAG = 'Waar kan ik in Utrecht een bakfiets leasen?'
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
export function Beeld({ samenvatting, className = '', children }: { samenvatting: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`lv-beeld ${className}`} role="img" aria-label={`${samenvatting} Demonstratie met fictieve gegevens.`}>
      <div className="lv-beeld-in" aria-hidden="true">{children}</div>
    </div>
  )
}

const PADEN = {
  taken: 'M2.5 9.5h3l1 1.5h3l1-1.5h3M2.5 9.5l1.5-6h8l1.5 6v3.5h-11z',
  zichtbaarheid: 'M3 13.5h10M4.5 11V8M7 11V5M9.5 11V7M12 11V4',
  zoek: 'M7 11.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM10.5 10.5l3 3',
  kompas: 'M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM10 6L9 9 6 10l1-3z',
  lagen: 'M8 2.5l5.5 3L8 8.5l-5.5-3zM2.5 8L8 11l5.5-3M2.5 10.5L8 13.5l5.5-3',
  document: 'M4 2.5h5.5l2.5 2.5v8.5H4zM6 8h4M6 10.5h4',
  vraag: 'M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM6.5 6.5a1.5 1.5 0 1 1 2 1.4c-.4.2-.5.5-.5.9v.4M8 11v.1',
  boek: 'M2.5 3.5h4a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 0-1.5-1.5h-4zM13.5 3.5h-4A1.5 1.5 0 0 0 8 5v8.5a1.5 1.5 0 0 1 1.5-1.5h4z',
  dossier: 'M2.5 4h11v8.5h-11zM5 7h6M5 9.5h4',
  lijst: 'M3 4.5h10M3 8h10M3 11.5h6',
  plus: 'M8 3v10M3 8h10',
  omlaag: 'M5 6.5l3 3 3-3',
  pijl: 'M3 8h10m-4-4 4 4-4 4',
  link: 'M6.5 9.5l3-3M5 7.5L3.5 9a2.5 2.5 0 0 0 3.5 3.5L8.5 11M11 8.5L12.5 7A2.5 2.5 0 0 0 9 3.5L7.5 5',
  let: 'M8 2.5l6 10.5H2zM8 7v2.5M8 11.4v.1',
  vonk: 'M8 2.5c.4 3 1.5 4.6 5.5 5.5-4 .9-5.1 2.5-5.5 5.5-.4-3-1.5-4.6-5.5-5.5 4-.9 5.1-2.5 5.5-5.5z',
  vink: 'M3.5 8.5l3 3 6-7',
  klok: 'M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM8 5v3l2 1.5',
  kopieer: 'M5.5 5.5h7v8h-7zM3.5 10.5v-8h7',
  filter: 'M2.5 4h11M4.5 8h7M6.5 12h3',
  greep: 'M6 4h.01M10 4h.01M6 8h.01M10 8h.01M6 12h.01M10 12h.01',
  bestand: 'M4 2.5h5.5l2.5 2.5v8.5H4zM9.5 2.5V5H12',
  bel: 'M4 11V7.5a4 4 0 0 1 8 0V11l1 1.5H3zM6.5 13.5a1.5 1.5 0 0 0 3 0',
  kalender: 'M2.5 3.5h11v10h-11zM2.5 6.5h11M5.5 2v3M10.5 2v3',
  meer: 'M3.5 8h.01M8 8h.01M12.5 8h.01',
} as const
export type IcoonNaam = keyof typeof PADEN

export function Icoon({ naam }: { naam: IcoonNaam }) {
  return <svg className="lv-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={PADEN[naam]} /></svg>
}

// Een stip als het merk in het antwoord stond, een ring als het er niet in stond.
export const Stip = ({ aan }: { aan: boolean }) => <span className={aan ? 'lv-stip lv-stip-aan' : 'lv-stip'} />

export function Knop({ primair = false, children }: { primair?: boolean; children: React.ReactNode }) {
  return <span className={primair ? 'lv-knop lv-knop-primair' : 'lv-knop'}>{children}</span>
}

export function Kans({ children = 'Kans gevonden' }: { children?: React.ReactNode }) {
  return <p className="lv-accentregel"><Icoon naam="vonk" />{children}</p>
}

export function Pad({ delen }: { delen: string[] }) {
  return (
    <span className="lv-pad">
      {delen.map((d, i) => <span key={d} className={i === delen.length - 1 ? 'lv-pad-nu' : undefined}>{d}</span>)}
    </span>
  )
}

// Het hoofdpaneel van de app: kruimelpad bovenin, daaronder de inhoud. De zijbalk van de app staat
// bewust niet in de beelden: die leidt af van het ene scherm waar het beeld over gaat.
export function App({ pad, rechts, className = '', children }: { pad: string[]; rechts?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <div className={`lv-venster lv-los ${className}`}>
      <div className="lv-paneel">
        <div className="lv-balk"><Pad delen={pad} />{rechts && <span className="lv-balk-rechts">{rechts}</span>}</div>
        {children}
      </div>
    </div>
  )
}

// Het paneel Advies aan de rechterkant.
export function Advies({ soort = 'Advies', voet, children }: { soort?: string; voet?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="lv-advies">
      <div className="lv-advies-kop"><span>Orbit</span><span className="lv-advies-soort">{soort}</span></div>
      <div className="lv-advies-inhoud">{children}</div>
      {voet && <div className="lv-advies-voet">{voet}</div>}
    </div>
  )
}

export function Antwoord() {
  return (
    <p className="lv-antwoord">
      Bekijk bijvoorbeeld <strong>Fietsatelier Voorbeeld</strong> en <strong>Stadsfiets Demo</strong>. Vergelijk de looptijd, onderhoudsafspraken en voorwaarden.
    </p>
  )
}

/* 1. Hero: van gemiste vraag naar werkbare kans -------------------------------------------------- */

export function HeroKans() {
  return (
    <Beeld
      className="lv-hero"
      samenvatting={`Productvoorbeeld. Bij de vraag "${VRAAG}" noemt een gemeten antwoord Fietsatelier Voorbeeld en Stadsfiets Demo, maar niet ${KLANT}. Orbit zet daar een kans naast: maak je leaseaanbod duidelijker.`}
    >
      <App pad={['Resultaten', 'Zichtbaarheid in AI']} rechts={ONDERWERP}>
        <div className="lv-werk">
          <div className="lv-inhoud">
            <p className="lv-h1">{VRAAG}</p>
            <p className="lv-sub">Onderzochte vraag voor {KLANT}</p>
            <div className="lv-kaart">
              <div className="lv-kaart-kop"><span>Voorbeeld van een gemeten antwoord</span><span className="lv-kaart-meta">ChatGPT</span></div>
              <Antwoord />
            </div>
            <p className="lv-regel"><Stip aan={false} />{KLANT} niet genoemd in dit antwoord</p>
          </div>
          <Advies voet={<Knop primair>Bekijk de kans <Icoon naam="pijl" /></Knop>}>
            <div className="lv-advies-kaart lv-kans">
              <p className="lv-advies-titel">Maak je leaseaanbod duidelijker</p>
              <Kans />
            </div>
            <p className="lv-advies-tekst">Werk prijzen, voorwaarden en onderhoud uit op een eigen pagina. Controleer eerst welke informatie beschikbaar is.</p>
          </Advies>
        </div>
      </App>
    </Beeld>
  )
}

/* 3. Pitch in de huisstijl van het bureau, met de GEO-audit erachter ------------------------------ */

export function Pitch() {
  return (
    <Beeld
      className="lv-pitch"
      samenvatting={`Voorbeeld van een pitch van ${BUREAU}: AI-zichtbaarheid van ${KLANT}, met een eerste verkenning van de vraag "${VRAAG}" en een kans om te bespreken. Erachter een fragment uit de GEO-audit met drie acties: leaseaanbod verduidelijken, technische toegankelijkheid controleren en relevante bronnen beoordelen.`}
    >
      <div className="lv-venster lv-los lv-audit">
        <div className="lv-paneel">
          <div className="lv-balk"><span className="lv-balk-titel">GEO-audit · Actieplan</span></div>
          <ol className="lv-acties">
            <li><span className="lv-actie-nr">1</span>Leaseaanbod verduidelijken</li>
            <li><span className="lv-actie-nr">2</span>Technische toegankelijkheid controleren</li>
            <li><span className="lv-actie-nr">3</span>Relevante bronnen beoordelen</li>
          </ol>
        </div>
      </div>
      <div className="lv-venster lv-los lv-pitchpagina">
        <div className="lv-paneel">
          <div className="lv-balk"><span className="lv-balk-titel">{BUREAU}</span><span className="lv-balk-rechts">hallo@noordwind.example</span></div>
          <div className="lv-inhoud">
            <p className="lv-h1">AI-zichtbaarheid van {KLANT}</p>
            <p className="lv-sub">{ONDERWERP}</p>
            <div className="lv-kaart">
              <div className="lv-kaart-kop"><span>Eerste verkenning</span></div>
              <p className="lv-vraag">{VRAAG}</p>
              <Antwoord />
            </div>
            <div className="lv-kaart">
              <div className="lv-kaart-kop"><span>Kans om te bespreken</span></div>
              <p className="lv-vraag">Hoe duidelijk zijn je leasevoorwaarden op je website uitgewerkt?</p>
              <Knop primair>Bespreek de aanpak</Knop>
            </div>
          </div>
        </div>
      </div>
    </Beeld>
  )
}

/* 4. Antwoord, bron, actie ------------------------------------------------------------------------ */

const VRAGEN: { vraag: string; kanalen: [boolean, boolean, boolean] }[] = [
  { vraag: VRAAG, kanalen: [false, false, false] },
  { vraag: 'Is een elektrische bakfiets leasen voordeliger dan kopen?', kanalen: [true, false, true] },
  { vraag: 'Welke fietsenmaker in Utrecht onderhoudt bakfietsen?', kanalen: [true, true, false] },
]

export function AntwoordBron() {
  return (
    <Beeld
      className="lv-bron"
      samenvatting={`Productvoorbeeld met drie gevolgde vragen in ChatGPT, Gemini en Google AI-overzichten. Bij de gekozen vraag "${VRAAG}" staan apart: de waarneming (het antwoord van ChatGPT), de teruggevonden bron (leasevoorwaarden, een voorbeeldbron) en de voorgestelde actie: onderzoek of prijzen en voorwaarden duidelijk genoeg zijn uitgewerkt.`}
    >
      <App pad={['Resultaten', 'Zichtbaarheid in AI']} rechts={ONDERWERP}>
        <div className="lv-werk">
          <div className="lv-inhoud">
            <div className="lv-vragen">
              <div className="lv-vragen-kop"><span>Vraag van je klant</span><span>ChatGPT</span><span>Gemini</span><span>AI-overzicht</span></div>
              {VRAGEN.map((v, i) => (
                <div key={v.vraag} className={i === 0 ? 'lv-vragen-rij lv-vragen-aan' : 'lv-vragen-rij'}>
                  <span>{v.vraag}</span>
                  {v.kanalen.map((aan, k) => <span key={k} className="lv-vragen-stip"><Stip aan={aan} /></span>)}
                </div>
              ))}
            </div>
          </div>
          <Advies soort="Vraag" voet={<><Knop>Later</Knop><Knop primair>Zet op contentplan</Knop></>}>
            <p className="lv-advies-label">Waarneming · ChatGPT</p>
            <div className="lv-advies-kaart"><Antwoord /></div>
            <p className="lv-advies-label">Bron</p>
            <div className="lv-advies-kaart">
              <p className="lv-bron-titel"><Icoon naam="link" />Leasevoorwaarden — voorbeeldbron</p>
              <p className="lv-domein">voorbeeld.example</p>
            </div>
            <p className="lv-advies-label">Voorgestelde actie</p>
            <div className="lv-advies-kaart lv-advies-voorstel">
              <p className="lv-advies-titel">Onderzoek of prijzen en voorwaarden duidelijk genoeg zijn uitgewerkt</p>
            </div>
          </Advies>
        </div>
      </App>
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
      <App pad={['Contentplan', ONDERWERP]} rechts="Concept">
        <div className="lv-werk">
          <div className="lv-inhoud">
            <p className="lv-h1">Een bakfiets leasen bij {KLANT}</p>
            <p className="lv-doc-tekst">
              Bekijk welke bakfiets past bij je dagelijkse ritten. <mark className="lv-claim-zin">Onderhoud is inbegrepen in het maandbedrag.</mark> Neem contact op om de mogelijkheden en voorwaarden te bespreken.
            </p>
          </div>
          <Advies soort="Controle" voet={<Knop primair>Vraag het bedrijf</Knop>}>
            <div className="lv-advies-kaart">
              <p className="lv-advies-titel">Bevestiging nodig</p>
              <p className="lv-accentregel"><Icoon naam="klok" />Wacht op bevestiging</p>
            </div>
            <p className="lv-advies-tekst">In de beschikbare klantkennis is niet bevestigd dat onderhoud is inbegrepen.</p>
          </Advies>
        </div>
      </App>
    </Beeld>
  )
}

/* 6. Hermeting en maandverslag -------------------------------------------------------------------- */

const MOMENTEN = [
  { naam: 'Gepubliceerd', wat: 'Pagina live', klaar: true },
  { naam: 'Dag 14', wat: 'Eerste hermeting', klaar: true },
  { naam: 'Dag 28', wat: 'Tweede hermeting', klaar: false },
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
      samenvatting={`Productvoorbeeld voor ${ONDERWERP}. Gepubliceerd, de eerste hermeting op dag 14 is afgerond en de tweede op dag 28 is gepland. Conclusie: nog onvoldoende metingen voor een conclusie over de ontwikkeling. Ernaast het maandverslag van ${BUREAU} met wat is uitgevoerd, gecontroleerd en wat de volgende stap is.`}
    >
      <App pad={['Resultaten', 'Hermeting']} className="lv-meet">
        <div className="lv-inhoud">
          <p className="lv-h1">{ONDERWERP}</p>
          <p className="lv-sub">Hermeting na publicatie</p>
          <div className="lv-momenten">
            {MOMENTEN.map((m) => (
              <div key={m.naam} className="lv-kpi">
                <span className="lv-kpi-label">{m.naam}</span>
                <span className="lv-kpi-waarde">{m.wat}</span>
                <span className={m.klaar ? 'lv-kpi-status lv-kpi-klaar' : 'lv-kpi-status'}>
                  {m.klaar ? <Icoon naam="vink" /> : <Stip aan={false} />}{m.klaar ? 'Afgerond' : 'Gepland'}
                </span>
              </div>
            ))}
          </div>
          <div className="lv-kaart">
            <div className="lv-kaart-kop"><span>Conclusie</span></div>
            <p className="lv-conclusie">Nog onvoldoende metingen voor een conclusie over de ontwikkeling.</p>
          </div>
        </div>
      </App>
      <div className="lv-venster lv-los lv-verslag">
        <div className="lv-paneel">
          <div className="lv-balk"><span className="lv-balk-titel">{BUREAU} · Maandverslag</span></div>
          <div className="lv-inhoud">
            <p className="lv-sub lv-sub-boven">{KLANT}</p>
            <dl>
              {VERSLAG.map((r) => (
                <div key={r.kop}>
                  <dt>{r.kop}</dt>
                  <dd>{r.tekst}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Beeld>
  )
}

/* 7. Wie is aan zet? ------------------------------------------------------------------------------ */

const RIJEN = [
  { klant: KLANT, actie: 'Maandmeting bekijken', wie: 'Bureau' },
  { klant: 'Studio Voorbeeld', actie: 'Tekst beoordelen', wie: 'Bureau' },
  { klant: 'Bouwbedrijf Demo', actie: 'Vraag beantwoorden', wie: 'Klant' },
  { klant: 'Praktijk Voorbeeld', actie: 'Publicatie controleren', wie: 'Bureau' },
]

export function Werkoverzicht() {
  return (
    <Beeld
      className="lv-overzicht"
      samenvatting={`Productvoorbeeld van het werkoverzicht van ${BUREAU} met vier klanten. ${RIJEN.map((r) => `${r.klant}: ${r.actie.toLowerCase()}, ${r.wie.toLowerCase()} aan zet.`).join(' ')}`}
    >
      <App pad={[BUREAU, 'Werkoverzicht']}>
        <div className="lv-inhoud">
          <p className="lv-h1">Werkoverzicht</p>
          <p className="lv-sub">Per klant wat er wacht en wie aan zet is.</p>
          <div className="lv-tabel">
            <div className="lv-tabel-kop"><span>Klant</span><span>Volgende actie</span><span>Aan zet</span></div>
            {RIJEN.map((r, i) => (
              <div key={r.klant} className={i === 0 ? 'lv-tabel-rij lv-tabel-aan' : 'lv-tabel-rij'}>
                <span className="lv-tabel-klant">{r.klant}</span>
                <span className="lv-tabel-actie"><span className="lv-cel-label">Volgende actie</span>{r.actie}</span>
                <span className="lv-tabel-wie"><span className="lv-cel-label">Aan zet</span><span className={r.wie === 'Bureau' ? 'lv-wie lv-wie-bureau' : 'lv-wie lv-wie-klant'}>{r.wie}</span></span>
              </div>
            ))}
          </div>
        </div>
      </App>
    </Beeld>
  )
}
