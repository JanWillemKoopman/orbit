// De tweede pagina onderaan /homepagina6: tien beelden in drie formaten. Groot (hero, de schrijver en het
// resultaat) staat breed op de pagina, middelgroot (pitch, bureauoverzicht, meting en contentplan) staat
// naast de tekst, en compact (merkdossier, kans en klantvraag) is een kleiner beeld met de tekst ernaast.
// Zo is niet elk beeld even groot en blijft de pagina afwisselend.
//
// Het voorbeeld is nieuw: Bureau Noordwind werkt voor installateur Klimaatwerk Voorbeeld in Tilburg aan het
// onderwerp hybride warmtepomp. Alle namen en cijfers zijn verzonnen. Limoengroen staat op de belangrijkste
// actie of uitkomst; geel alleen bij de garantie die nog bevestigd moet worden (beeld 8).
import { DemoKnop } from './Demo'
import { Chip, Rij, Stand, Tabel, Tabs } from './Schermen'
import { App, Beeld, BUREAU, Figuur, Icoon, Knop, Stip } from './Visuals'
import { pagina2, type Segment } from '@/content/homepagina6'

const KLANT = 'Klimaatwerk Voorbeeld'
const VRAAG = 'Welke installateur in Tilburg adviseer je voor een hybride warmtepomp?'
const PAGINA = 'Hybride warmtepomp of volledig elektrisch?'
const CONCURRENT_1 = 'Warmtepomp Demo'
const CONCURRENT_2 = 'Installatiecentrum Voorbeeld'

/* De drie formaten ---------------------------------------------------------------------------------- */

function Kop({ id, s }: { id: string; s: Segment }) {
  return (
    <>
      <p className="lf-label">{s.label}</p>
      <h2 id={id}>{s.titel}</h2>
      <p className="lf-intro-tekst">{s.intro}</p>
    </>
  )
}

function Groot({ id, nr, s, children }: { id: string; nr: string; s: Segment; children: React.ReactNode }) {
  return (
    <section id={id} className="lf-sectie p2-groot" aria-labelledby={`${id}-titel`}>
      <div className="container">
        <div className="lf-intro">
          <div><p className="lf-label">{s.label}</p><h2 id={`${id}-titel`}>{s.titel}</h2></div>
          <p className="lf-intro-tekst">{s.intro}</p>
        </div>
        <Figuur nr={nr} titel={s.beeld} tekst={s.tekst}>{children}</Figuur>
      </div>
    </section>
  )
}

function Middel({ id, nr, s, omgekeerd = false, children }: { id: string; nr: string; s: Segment; omgekeerd?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`lf-sectie lf-half${omgekeerd ? ' lf-half-omgekeerd' : ''}`} aria-labelledby={`${id}-titel`}>
      <div className="container lf-half-raster">
        <div className="lf-half-tekst"><Kop id={`${id}-titel`} s={s} /></div>
        <Figuur nr={nr} titel={s.beeld} tekst={s.tekst} className="lf-klein">{children}</Figuur>
      </div>
    </section>
  )
}

function Compact({ id, nr, s, omgekeerd = false, children }: { id: string; nr: string; s: Segment; omgekeerd?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`lf-sectie p2-compact${omgekeerd ? ' p2-compact-omgekeerd' : ''}`} aria-labelledby={`${id}-titel`}>
      <div className="container p2-compact-raster">
        <div className="lf-half-tekst"><Kop id={`${id}-titel`} s={s} /></div>
        <Figuur nr={nr} titel={s.beeld} tekst={s.tekst} className="lf-klein p2-compact-beeld">{children}</Figuur>
      </div>
    </section>
  )
}

/* 1. Hero: koopvraag, meting en vervolgactie -------------------------------------------------------- */

const GENOEMD = [
  { naam: CONCURRENT_1, n: 8, hoe: 'Eerste aanbeveling' },
  { naam: CONCURRENT_2, n: 6, hoe: 'Een van meerdere' },
  { naam: KLANT, n: 2, hoe: 'Zijdelings', jij: true },
]

function HeroCompositie() {
  return (
    <Beeld
      className="p2-hero-beeld"
      samenvatting={`Productvoorbeeld in drie delen. Links de koopvraag: "${VRAAG}" In het midden de meting van ${KLANT}: genoemd in 18 procent van de antwoorden, plus of min 7. Bij deze vraag noemt AI ${CONCURRENT_1} in 8 van de 10 antwoorden, ${CONCURRENT_2} in 6 en ${KLANT} in 2. Rechts de vervolgactie: vergelijkingspagina toevoegen aan het contentplan.`}
    >
      <div className="p2-vraagkaart">
        <p className="p2-mini-label">Koopvraag</p>
        <p className="p2-vraagkaart-tekst">{VRAAG}</p>
        <div className="p2-vraagkaart-voet"><Chip>Beslissing</Chip><span className="ls-zachter">ChatGPT · Gemini · AI-overzicht</span></div>
      </div>
      <App pad={['Resultaten', 'Zichtbaarheid in AI']} rechts="Hybride warmtepomp" className="p2-hero-app">
        <div className="lv-inhoud p2-hero-inhoud">
          <div className="p2-hero-kop">
            <div>
              <p className="lv-h1">{KLANT}</p>
              <p className="lv-sub">Hoe vaak AI-assistenten dit bedrijf noemen</p>
            </div>
            <div className="ls-kpi p2-kpi-klein"><span className="ls-kpi-label">Genoemd in antwoorden</span><span className="ls-kpi-waarde">18%<span className="ls-kpi-marge">± 7</span></span></div>
          </div>
          <div className="lv-kaart">
            <div className="lv-kaart-kop"><span>Genoemd bij deze vraag</span><span className="lv-kaart-meta">10 antwoorden</span></div>
            {GENOEMD.map((g) => (
              <div key={g.naam} className={g.jij ? 'p2-genoemd p2-genoemd-jij' : 'p2-genoemd'}>
                <span className="p2-genoemd-naam"><span className="ls-sterk">{g.naam}</span><span className="ls-zachter">{g.hoe}</span></span>
                <span className="ls-balk"><span style={{ width: `${g.n * 10}%` }} /></span>
                <span className="ls-rang-n">{g.n} van 10</span>
              </div>
            ))}
          </div>
        </div>
      </App>
      <div className="p2-actiekaart">
        <p className="p2-mini-label p2-mini-accent"><Icoon naam="vonk" />Vervolgactie</p>
        <p className="p2-actiekaart-titel">Vergelijkingspagina toevoegen aan contentplan</p>
        <p className="p2-actiekaart-tekst">{PAGINA}</p>
        <Knop primair>Zet op contentplan</Knop>
      </div>
    </Beeld>
  )
}

export function Pagina2Hero() {
  const s = pagina2.hero
  return (
    <section className="p2-hero" aria-labelledby="p2-hero-titel">
      <div className="container">
        <p className="lf-mono p2-pagina-label">Pagina 2 · Tien beelden</p>
        <p className="lf-label">{s.label}</p>
        <h2 id="p2-hero-titel" className="p2-hero-titel">{s.titel}</h2>
        <p className="hg-hero-intro">{s.intro}</p>
        <div className="hg-acties"><DemoKnop plek="hero" /></div>
      </div>
      <div className="container p2-hero-podium">
        <Figuur nr="01" titel={s.beeld}><HeroCompositie /></Figuur>
      </div>
    </section>
  )
}

/* 2. De pitch --------------------------------------------------------------------------------------- */

function PitchBeeld() {
  return (
    <Beeld className="p2-pitch" samenvatting={`Voorbeeld van een pitchpagina van ${BUREAU} voor ${KLANT}. Een AI-antwoord beveelt ${CONCURRENT_1} en ${CONCURRENT_2} aan. Ernaast: je concurrenten worden genoemd, jouw bedrijf ontbreekt in dit antwoord. Onderaan de drie grootste kansen en een knop om de aanpak te bespreken. Een kleine kaart meldt dat de pitch vandaag om 09.42 uur is geopend.`}>
      <div className="lv-venster lv-los p2-pitchpagina">
        <div className="lv-paneel">
          <div className="lv-balk"><span className="lv-balk-titel">{BUREAU}</span><span className="lv-balk-rechts">hallo@noordwind.example</span></div>
          <div className="lv-inhoud ls-inhoud">
            <p className="lv-h1 ls-h1-klein">AI-zichtbaarheid van {KLANT}</p>
            <p className="lv-sub">Eerste verkenning · hybride warmtepomp in Tilburg</p>
            <div className="p2-pitch-duo">
              <div className="lv-kaart">
                <div className="lv-kaart-kop"><span>Antwoord van ChatGPT</span></div>
                <p className="lv-vraag">{VRAAG}</p>
                <p className="lv-antwoord">In Tilburg kun je goed terecht bij <strong>{CONCURRENT_1}</strong> en <strong>{CONCURRENT_2}</strong>. Beide installeren hybride warmtepompen en geven advies aan huis.</p>
              </div>
              <div className="p2-samenvatting">
                <p className="p2-samenvatting-tekst">Je concurrenten worden genoemd. Jouw bedrijf ontbreekt in dit antwoord.</p>
              </div>
            </div>
            <p className="lv-label ls-label-ruim">Grootste kansen</p>
            <ol className="p2-kansen">
              <li><span className="lv-actie-nr">1</span>Een pagina die hybride en volledig elektrisch vergelijkt</li>
              <li><span className="lv-actie-nr">2</span>Het werkgebied rond Tilburg duidelijk noemen</li>
              <li><span className="lv-actie-nr">3</span>Vermeldingen op de sites die AI hier aanhaalt</li>
            </ol>
            <div className="ls-knoppen"><Knop primair>Bespreek de aanpak</Knop></div>
          </div>
        </div>
      </div>
      <div className="p2-geopend"><Icoon naam="bel" /><span><span className="ls-sterk">Pitch geopend</span><span className="ls-zachter">Vandaag om 09.42 · {KLANT}</span></span></div>
    </Beeld>
  )
}

/* 3. Het bureauoverzicht ---------------------------------------------------------------------------- */

const KLANTEN = [
  { naam: KLANT, waarde: '18%', marge: '± 7', ontw: 'Gestegen', actie: 'Content klaar voor beoordeling', sinds: 'sinds 2 dagen', aan: true },
  { naam: 'Fietsen Jansen', waarde: '34%', marge: '± 4', ontw: 'Gestegen', actie: 'Antwoord van klant nodig', sinds: 'sinds 5 dagen' },
  { naam: 'Studio Voorbeeld', waarde: '41%', marge: '± 6', ontw: 'Gelijk', actie: 'Hermeting afgerond', sinds: 'vandaag' },
  { naam: 'Bouwbedrijf Demo', waarde: '9%', marge: '± 5', ontw: 'Gelijk', actie: 'Nieuwe kansen beschikbaar', sinds: '4 kansen' },
]

function BureauBeeld() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van het bureauoverzicht van ${BUREAU} met vier bedrijven. ${KLANTEN.map((k) => `${k.naam}: ${k.waarde} ${k.marge}, ${k.ontw.toLowerCase()}, volgende actie ${k.actie.toLowerCase()}.`).join(' ')} De rij van ${KLANT} staat bovenaan: daar wacht content op beoordeling.`}>
      <App pad={[BUREAU, 'Bedrijven']} rechts="4 bedrijven">
        <div className="lv-inhoud ls-inhoud">
          <Tabel kol="minmax(0, 1.3fr) 112px 92px minmax(0, 1.5fr)" kop={['Bedrijf', 'Zichtbaarheid', 'Ontwikkeling', 'Volgende actie']}>
            {KLANTEN.map((k) => (
              <Rij key={k.naam} aan={k.aan}>
                <span className="ls-sterk">{k.naam}</span>
                <span><span className="ls-getal">{k.waarde}</span> <span className="ls-zachter">{k.marge}</span></span>
                <span className={k.ontw === 'Gestegen' ? 'ls-accent' : 'ls-zachter'}>{k.ontw}</span>
                <span className="p2-actie"><span className={k.aan ? 'ls-sterk' : undefined}>{k.actie}</span><span className="ls-zachter">{k.sinds}</span></span>
              </Rij>
            ))}
          </Tabel>
          <div className="ls-knoppen ls-knoppen-rechts"><Knop primair>Lees en keur goed</Knop></div>
        </div>
      </App>
    </Beeld>
  )
}

/* 4. Het merkdossier -------------------------------------------------------------------------------- */

const DOSSIER = [
  { kop: 'Diensten en producten', tekst: 'Hybride warmtepomp, volledig elektrische warmtepomp, cv-onderhoud' },
  { kop: 'Doelgroepen', tekst: 'Huiseigenaren met een woning van voor 1990' },
  { kop: 'Merkstem', tekst: 'Je-vorm, nuchter, zonder vakjargon' },
]

function MerkdossierBeeld() {
  return (
    <Beeld samenvatting={`Productvoorbeeld: met de naam ${KLANT} en een website maakt Orbit een merkdossier met diensten, doelgroepen, merkstem en gecontroleerde bedrijfsfeiten. Het werkgebied Tilburg, Goirle en Oisterwijk is uitgelicht, met als bron de pagina over-ons en het citaat: wij installeren in Tilburg, Goirle en Oisterwijk.`}>
      <App pad={['Mijn bedrijf', 'Merkdossier']}>
        <div className="lv-inhoud ls-inhoud p2-compact-inhoud">
          <div className="p2-invoer">
            <span className="ls-invoer">{KLANT}</span>
            <span className="ls-invoer ls-mono">klimaatwerk.example</span>
          </div>
          <div className="p2-dossier">
            {DOSSIER.map((d) => (
              <div key={d.kop} className="p2-dossier-rij"><span className="p2-mini-label">{d.kop}</span><span>{d.tekst}</span></div>
            ))}
            <div className="p2-dossier-rij p2-dossier-feit">
              <span className="p2-mini-label">Gecontroleerd feit · werkgebied</span>
              <span className="ls-sterk">Tilburg, Goirle en Oisterwijk</span>
              <span className="ls-citaat p2-citaat">“Wij installeren in Tilburg, Goirle en Oisterwijk.”<span>klimaatwerk.example/over-ons</span></span>
            </div>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 5. De meting -------------------------------------------------------------------------------------- */

const KOOPVRAGEN: { vraag: string; aan: boolean }[] = [
  { vraag: VRAAG, aan: false },
  { vraag: 'Wat kost een hybride warmtepomp laten installeren?', aan: true },
  { vraag: 'Is een hybride warmtepomp geschikt voor een jaren-dertigwoning?', aan: true },
  { vraag: 'Welk installatiebedrijf in Tilburg geeft advies aan huis?', aan: false },
]

function MetingBeeld() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van een meting voor ${KLANT} in ChatGPT: genoemd in 18 procent van de antwoorden, plus of min 7. Vier koopvragen met per vraag of het bedrijf genoemd werd. De vraag over advies aan huis is geselecteerd: het antwoord noemt ${KLANT} als een van drie installateurs, en haalt twee bronnen aan, waaronder de eigen website.`}>
      <App pad={['Resultaten', 'Zichtbaarheid in AI']} rechts="Laatste meting">
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-kop-rij">
            <Tabs items={['ChatGPT', 'Gemini', 'Google AI-overzicht']} actief={0} />
            <span className="p2-cijfer"><span className="ls-getal">18%</span> <span className="ls-zachter">± 7 genoemd</span></span>
          </div>
          <div className="p2-meting">
            <ul className="p2-koopvragen">
              {KOOPVRAGEN.map((k, i) => (
                <li key={k.vraag} className={i === 3 ? 'p2-koopvraag-aan' : undefined}><Stip aan={k.aan} />{k.vraag}</li>
              ))}
            </ul>
            <div className="lv-kaart p2-antwoordkaart">
              <div className="lv-kaart-kop"><span>Antwoord van ChatGPT</span></div>
              <p className="lv-antwoord">Voor advies aan huis in Tilburg kun je kijken bij {CONCURRENT_1}, <mark className="p2-merk">{KLANT}</mark> en {CONCURRENT_2}. Vraag naar een warmteverliesberekening voor je woning.<sup className="p2-ref">1</sup><sup className="p2-ref">2</sup></p>
              <div className="p2-bronnen">
                <span><sup className="p2-ref">1</sup>klimaatwerk.example/advies</span>
                <span><sup className="p2-ref">2</sup>energieloket.example</span>
              </div>
            </div>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 6. De kans ---------------------------------------------------------------------------------------- */

function KansBeeld() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van een kanskaart: nieuwe pagina, ${PAGINA} Drie bewijsregels: de vraag komt terug in de meting, concurrenten worden wel aanbevolen, en een bestaande pagina beantwoordt de vergelijking onvoldoende. Met inplannen komt de pagina in november, waar zeven van de tien plekken bezet zijn.`}>
      <App pad={['Contentplan', 'Pagina-ideeën']}>
        <div className="lv-inhoud ls-inhoud p2-compact-inhoud">
          <div className="lv-kaart p2-kans">
            <Chip toon="accent">Nieuwe pagina</Chip>
            <p className="ls-kaart-titel ls-kaart-titel-groot">{PAGINA}</p>
            <ul className="p2-bewijs">
              <li><Stand soort="klaar" />Deze vraag komt terug in de meting.</li>
              <li><Stand soort="klaar" />Concurrenten worden wel aanbevolen.</li>
              <li><Stand soort="klaar" />Een bestaande pagina beantwoordt de vergelijking onvoldoende.</li>
            </ul>
            <div className="p2-inplannen">
              <Knop primair>Inplannen</Knop>
              <div className="p2-maandje">
                <span className="p2-maandje-kop"><span className="ls-sterk">November</span><span className="ls-zachter">7 van 10</span></span>
                <span className="p2-maandje-rij">Cv-ketel vervangen of niet?</span>
                <span className="p2-maandje-rij p2-maandje-nieuw">{PAGINA}</span>
              </div>
            </div>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 7. Het contentplan -------------------------------------------------------------------------------- */

type Plan = { titel: string; soort: 'Nieuwe dienstpagina' | 'Pagina verbeteren' | 'Vergelijking'; stand?: 'Gepland' | 'In voorbereiding' | 'Ter beoordeling' }
const PLAN: { maand: string; paginas: Plan[] }[] = [
  { maand: 'Oktober', paginas: [
    { titel: 'Hybride warmtepomp laten installeren in Tilburg', soort: 'Nieuwe dienstpagina', stand: 'Ter beoordeling' },
    { titel: 'Cv-onderhoud: wat we controleren', soort: 'Pagina verbeteren', stand: 'In voorbereiding' },
  ] },
  { maand: 'November', paginas: [
    { titel: PAGINA, soort: 'Vergelijking', stand: 'Gepland' },
    { titel: 'Warmtepomp in een jaren-dertigwoning', soort: 'Nieuwe dienstpagina', stand: 'Gepland' },
  ] },
  { maand: 'December', paginas: [
    { titel: 'Subsidie op een warmtepomp aanvragen', soort: 'Pagina verbeteren' },
    { titel: 'Lucht-water of bodemwarmtepomp?', soort: 'Vergelijking' },
  ] },
]

function ContentplanBeeld() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van drie maanden contentplan voor ${KLANT}, met per pagina het soort werk en de stand. ${PLAN.map((m) => `${m.maand}: ${m.paginas.map((p) => `${p.titel} (${p.soort.toLowerCase()}${p.stand ? `, ${p.stand.toLowerCase()}` : ''})`).join(', ')}.`).join(' ')}`}>
      <App pad={['Strategie', 'Contentplan']}>
        <div className="lv-inhoud ls-inhoud p2-plan-inhoud">
          <div className="p2-plan">
            {PLAN.map((m) => (
              <div key={m.maand} className="ls-kolom">
                <div className="ls-kolom-kop"><span className="ls-sterk">{m.maand}</span></div>
                {m.paginas.map((p) => (
                  <div key={p.titel} className="ls-kaartje">
                    <span className="ls-kaartje-titel">{p.titel}</span>
                    <span className="p2-kaartje-voet">
                      <span className="ls-kaartje-soort">{p.soort}</span>
                      {p.stand && <span className={p.stand === 'Ter beoordeling' ? 'p2-stand p2-stand-accent' : 'p2-stand'}>{p.stand}</span>}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 8. De schrijver ----------------------------------------------------------------------------------- */

function SchrijverBeeld() {
  return (
    <Beeld className="p2-schrijver" samenvatting={`Productvoorbeeld van de teksteditor met het artikel ${PAGINA} De zin dat je op de installatie vijf jaar garantie krijgt is geel gemarkeerd: deze garantie is nog niet bevestigd in het merkdossier, met de keuzes vraag het bedrijf en pas de tekst aan. De zin over het werkgebied Tilburg, Goirle en Oisterwijk is bevestigd, met de website als bron.`}>
      <App pad={['Bibliotheek', PAGINA]} rechts="Versie 2">
        <div className="p2-editor">
          <article className="p2-artikel">
            <p className="p2-artikel-titel">{PAGINA}</p>
            <p className="p2-artikel-meta">Vergelijking · ongeveer 1.300 woorden · in de merkstem van {KLANT}</p>
            <p className="p2-artikel-kop">Wat is het verschil?</p>
            <p>Een hybride warmtepomp werkt samen met je cv-ketel. Op de koudste dagen springt de ketel bij, de rest van het jaar verwarmt de warmtepomp. Een volledig elektrische warmtepomp doet het hele jaar alles zelf, en vraagt meer van de isolatie van je huis.</p>
            <p className="p2-artikel-kop">Wat past bij jouw woning?</p>
            <p>
              We komen langs voor advies aan huis. <span className="p2-bevestigd">We installeren in Tilburg, Goirle en Oisterwijk.<sup className="p2-ref">1</sup></span>{' '}
              <mark className="p2-geel">Op de installatie krijg je vijf jaar garantie.</mark> Na het advies weet je welke warmtepomp bij je huis past en wat hij kost.
            </p>
          </article>
          <aside className="p2-zijpaneel">
            <div className="p2-controle">
              <p className="p2-controle-titel"><Icoon naam="let" />Bevestiging nodig</p>
              <p className="p2-controle-claim">“Op de installatie krijg je vijf jaar garantie.”</p>
              <p className="p2-controle-reden">Deze garantie is nog niet bevestigd in het merkdossier.</p>
              <div className="ls-knoppen"><Knop primair>Vraag het bedrijf</Knop><Knop>Pas de tekst aan</Knop></div>
            </div>
            <div className="p2-controle p2-controle-ok">
              <p className="p2-controle-titel p2-controle-titel-ok"><Stand soort="klaar" />Bevestigd</p>
              <p className="p2-controle-claim">“We installeren in Tilburg, Goirle en Oisterwijk.”</p>
              <p className="p2-controle-reden"><sup className="p2-ref">1</sup>klimaatwerk.example/over-ons</p>
            </div>
          </aside>
        </div>
      </App>
    </Beeld>
  )
}

/* 9. De klantvraag ---------------------------------------------------------------------------------- */

function KlantvraagBeeld() {
  return (
    <Beeld className="p2-klantvraag" samenvatting={`Productvoorbeeld: op de telefoon beantwoordt ${KLANT} de vraag wat er bij de installatie inbegrepen is, met het antwoord: het advies aan huis, het plaatsen, het inregelen en de eerste onderhoudsbeurt na een jaar. Met de knop antwoorden versturen komt het antwoord in het merkdossier, en op de achtergrond staat het al bij het artikel.`}>
      <div className="lv-venster lv-los p2-achter">
        <div className="lv-paneel">
          <div className="lv-balk"><Icoon naam="bestand" /><span className="lv-pad"><span className="lv-pad-nu">{PAGINA}</span></span></div>
          <div className="lv-inhoud p2-achter-inhoud">
            <p className="lv-label">Nieuw in het merkdossier</p>
            <div className="lv-kaart p2-achter-kaart">
              <p className="ls-sterk">Inbegrepen bij de installatie</p>
              <p className="ls-kaart-tekst">Advies aan huis, plaatsen, inregelen en de eerste onderhoudsbeurt na een jaar.</p>
              <p className="p2-mini-label p2-mini-accent">Van de klant · zojuist</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ls-telefoon p2-telefoon">
        <div className="ls-telefoon-scherm">
          <p className="ls-tel-van">Vragen van {BUREAU}</p>
          <p className="ls-tel-titel">{KLANT}</p>
          <div className="ls-voortgang"><span style={{ width: '100%' }} /></div>
          <p className="ls-tel-stand">3 van 3 beantwoord</p>
          <div className="ls-tel-kaart">
            <p className="ls-tel-pagina">{PAGINA}</p>
            <p className="ls-tel-vraag">Wat is bij jullie inbegrepen bij de installatie?</p>
            <span className="ls-tel-veld p2-tel-antwoord">Het advies aan huis, het plaatsen, het inregelen en de eerste onderhoudsbeurt na een jaar.</span>
          </div>
          <span className="lv-knop lv-knop-primair p2-tel-verstuur">Antwoorden versturen</span>
        </div>
      </div>
    </Beeld>
  )
}

/* 10. Het resultaat --------------------------------------------------------------------------------- */

// Verzonnen klikken per week, vanaf vier weken voor tot acht weken na publicatie.
const WEKEN = [2, 1, 3, 2, 4, 6, 9, 11, 12, 15, 14, 17]
const PUBLICATIEWEEK = 4

function ResultaatBeeld() {
  const max = Math.max(...WEKEN)
  return (
    <Beeld className="p2-resultaat" samenvatting={`Productvoorbeeld van het resultaat van de pagina ${PAGINA}, gepubliceerd op 2 september. Hermeting na 14 dagen: genoemd in 30 procent van de antwoorden, na 28 dagen 45 procent, tegen 20 procent voor publicatie, met een marge van plus of min 9. AI haalde de pagina aan als bron in 4 van de 12 antwoorden. Klikken uit Google per week stegen van 2 naar 17. Ernaast het maandverslag van ${BUREAU} voor september.`}>
      <App pad={['Bibliotheek', PAGINA, 'Effect']} className="p2-resultaat-app">
        <div className="lv-inhoud ls-inhoud">
          <div className="p2-tijdlijn">
            <div className="p2-moment"><span className="p2-mini-label">Gepubliceerd</span><span className="p2-moment-waarde">2 september</span><span className="ls-zachter">Live gemeld door Bureau Noordwind</span></div>
            <div className="p2-moment"><span className="p2-mini-label">Dag 14</span><span className="p2-moment-waarde">30% <span className="ls-zachter">± 9</span></span><span className="ls-zachter">Was 20% voor publicatie</span></div>
            <div className="p2-moment p2-moment-uit"><span className="p2-mini-label">Dag 28</span><span className="p2-moment-waarde">45% <span className="ls-zachter">± 9</span></span><span className="ls-accent">Gestegen</span></div>
          </div>
          <div className="p2-resultaat-duo">
            <div className="ls-kpi"><span className="ls-kpi-label">Als bron gebruikt door AI</span><span className="ls-kpi-waarde">4<span className="ls-kpi-marge">van 12 antwoorden</span></span></div>
            <div className="ls-kpi p2-klikken">
              <span className="ls-kpi-label">Klikken uit Google per week</span>
              <div className="p2-weken">
                {WEKEN.map((w, i) => <span key={i} className={i >= PUBLICATIEWEEK ? 'p2-week p2-week-na' : 'p2-week'} style={{ height: `${(w / max) * 100}%` }} />)}
                <span className="p2-week-live" style={{ left: `${(PUBLICATIEWEEK / WEKEN.length) * 100}%` }}>live</span>
              </div>
            </div>
          </div>
        </div>
      </App>
      <div className="lv-venster lv-los p2-verslag">
        <div className="lv-paneel">
          <div className="lv-balk"><span className="lv-balk-titel">{BUREAU} · Maandverslag september</span></div>
          <div className="lv-inhoud p2-verslag-inhoud">
            <p className="lv-sub">{KLANT}</p>
            <dl>
              <div><dt>Uitgevoerd</dt><dd>3 pagina&apos;s gepubliceerd, waaronder de vergelijking hybride of volledig elektrisch.</dd></div>
              <div><dt>Gemeten</dt><dd>Twee hermetingen; de pagina wordt door AI als bron gebruikt.</dd></div>
              <div><dt>Volgende stappen</dt><dd>De pagina over subsidie verbeteren en het werkgebied vaker noemen.</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </Beeld>
  )
}

/* De tweede pagina ---------------------------------------------------------------------------------- */

export function Pagina2() {
  const p = pagina2
  return (
    <div className="p2">
      <Pagina2Hero />
      <Middel id="p2-pitch" nr="02" s={p.pitch}><PitchBeeld /></Middel>
      <Middel id="p2-bureau" nr="03" s={p.bureau} omgekeerd><BureauBeeld /></Middel>
      <Compact id="p2-merkdossier" nr="04" s={p.merkdossier}><MerkdossierBeeld /></Compact>
      <Middel id="p2-meting" nr="05" s={p.meting} omgekeerd><MetingBeeld /></Middel>
      <Compact id="p2-kans" nr="06" s={p.kans} omgekeerd><KansBeeld /></Compact>
      <Middel id="p2-contentplan" nr="07" s={p.contentplan}><ContentplanBeeld /></Middel>
      <Groot id="p2-schrijver" nr="08" s={p.schrijver}><SchrijverBeeld /></Groot>
      <Compact id="p2-klantvraag" nr="09" s={p.klantvraag}><KlantvraagBeeld /></Compact>
      <Groot id="p2-resultaat" nr="10" s={p.resultaat}><ResultaatBeeld /></Groot>
    </div>
  )
}
