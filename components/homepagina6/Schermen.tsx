// Twintig schermen van de app voor de rondleiding op /homepagina6, in dezelfde vormgeving als de andere
// beelden (Visuals.tsx): het hoofdpaneel van de app zonder zijbalk, kaarten in de vlakken van de app en
// limoengroen alleen voor knoppen en wat aandacht vraagt.
//
// Alle schermen vertellen één verhaal: oktober 2026 bij Fietsen Jansen. Dezelfde pagina's komen terug
// met dezelfde data en stand: "Accu van je e-bike vervangen" staat live sinds 6 oktober,
// "Fietsverhuur in Utrecht" sinds 9 oktober, "Bakfiets leasen bij Fietsen Jansen" wacht op akkoord voor
// 13 oktober en "Lease voor ondernemers" is goedgekeurd en moet nog op de site. Alle namen en getallen
// zijn verzonnen; elk bijschrift zegt dat het een demonstratie is.
import { App, Beeld, Icoon, Kans, KLANT, Knop, VRAAG } from './Visuals'

/* Kleine bouwstenen --------------------------------------------------------------------------------- */

type Toon = 'neutraal' | 'accent' | 'live' | 'achter'

export function Chip({ toon = 'neutraal', children }: { toon?: Toon; children: React.ReactNode }) {
  return <span className={`ls-chip ls-chip-${toon}`}>{children}</span>
}

// Een stand als rondje: klaar (vinkje), bezig (half), open (ring).
export function Stand({ soort }: { soort: 'klaar' | 'bezig' | 'open' }) {
  if (soort === 'klaar') return <svg className="ls-stand ls-stand-klaar" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" /><path d="M4.8 8.3l2.1 2.1 4.2-4.6" /></svg>
  if (soort === 'bezig') return <svg className="ls-stand ls-stand-bezig" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.25" /><path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" /></svg>
  return <svg className="ls-stand ls-stand-open" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.25" /></svg>
}

const Schakelaar = ({ aan }: { aan: boolean }) => <span className={aan ? 'ls-schakelaar ls-schakelaar-aan' : 'ls-schakelaar'}><span /></span>
export const Vinkje = ({ aan }: { aan: boolean }) => <span className={aan ? 'ls-vinkje ls-vinkje-aan' : 'ls-vinkje'}>{aan && <svg viewBox="0 0 16 16"><path d="M4 8.5l2.6 2.6L12 5.5" /></svg>}</span>

export function Tabs({ items, actief }: { items: string[]; actief: number }) {
  return <span className="ls-tabs">{items.map((t, i) => <span key={t} className={i === actief ? 'ls-tab-aan' : undefined}>{t}</span>)}</span>
}

// Een tabel als raster. De kolommen staan per tabel in `kol`.
export function Tabel({ kol, kop, children, className = '' }: { kol: string; kop: string[]; children: React.ReactNode; className?: string }) {
  return (
    <div className={`ls-tabel ${className}`} style={{ '--kol': kol } as React.CSSProperties}>
      <div className="ls-tabel-kop">{kop.map((k) => <span key={k}>{k}</span>)}</div>
      {children}
    </div>
  )
}

export function Rij({ aan = false, children }: { aan?: boolean; children: React.ReactNode }) {
  return <div className={aan ? 'ls-tabel-rij ls-tabel-rij-aan' : 'ls-tabel-rij'}>{children}</div>
}

/* 1. Een nieuw bedrijf en het onderzoek ------------------------------------------------------------- */

const ONDERZOEK: { stand: 'klaar' | 'bezig' | 'open'; wat: string; uitkomst: string }[] = [
  { stand: 'klaar', wat: 'De website gelezen', uitkomst: '142 pagina\'s' },
  { stand: 'klaar', wat: 'Het aanbod gevonden', uitkomst: '9 diensten' },
  { stand: 'bezig', wat: 'Concurrenten en markt', uitkomst: 'bezig' },
  { stand: 'open', wat: 'Wat AI al over het merk weet', uitkomst: '' },
]

export function NieuwBedrijf() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van een nieuw bedrijf: de naam ${KLANT} en een website zijn ingevuld. Orbit onderzoekt het bedrijf in ongeveer tien minuten: de website is gelezen, het aanbod gevonden, concurrenten en markt zijn bezig, en daarna volgt wat AI al over het merk weet.`}>
      <App pad={['Bedrijven', 'Nieuw bedrijf']}>
        <div className="lv-inhoud ls-inhoud">
          <p className="lv-h1">Nieuw bedrijf</p>
          <p className="lv-sub">De naam en de website zijn genoeg.</p>
          <div className="ls-velden">
            <div className="ls-veld"><span className="ls-veld-label">Naam</span><span className="ls-invoer">{KLANT}</span></div>
            <div className="ls-veld"><span className="ls-veld-label">Website</span><span className="ls-invoer">fietsenjansen.example</span></div>
          </div>
          <div className="lv-kaart">
            <div className="lv-kaart-kop"><span>Orbit onderzoekt {KLANT}</span><span className="lv-kaart-meta">ongeveer 10 minuten</span></div>
            <ul className="ls-checklist">
              {ONDERZOEK.map((o) => (
                <li key={o.wat} className={o.stand === 'open' ? 'ls-zacht' : undefined}>
                  <Stand soort={o.stand} /><span>{o.wat}</span><span className="ls-checklist-uit">{o.uitkomst}</span>
                </li>
              ))}
            </ul>
            <p className="ls-noot">Je kunt dit scherm sluiten. Orbit gaat op de achtergrond door.</p>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 2. Feiten en kennis ------------------------------------------------------------------------------- */

export function FeitenKennis() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van feiten en kennis over ${KLANT}, per regel met de bron en of Orbit hem gebruikt bij het schrijven. Een regel van de website heeft een letterlijk citaat. Het vermoeden dat onderhoud inbegrepen is, wordt pas gebruikt na bevestiging.`}>
      <App pad={['Mijn bedrijf', 'Feiten en kennis']} rechts="Materiaal toevoegen">
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-kop-rij"><Tabs items={['Feiten', 'Kennis']} actief={0} /><Tabs items={['Alles', 'Gebruikt', 'Niet gebruikt', 'Afgekeurd']} actief={0} /></div>
          <Tabel kol="minmax(0, 2.1fr) minmax(0, 1.2fr) 168px" kop={['Regel', 'Bron', 'Gebruikt']}>
            <Rij aan>
              <span className="ls-sterk">Bakfiets leasen kan vanaf 12 maanden</span><span>Website</span><span className="ls-ja"><Stand soort="klaar" />Ja</span>
            </Rij>
            <div className="ls-citaat">“Lease je bakfiets al vanaf 12 maanden.”<span>fietsenjansen.example/lease</span></div>
            <Rij><span className="ls-sterk">Werkgebied: Utrecht, Nieuwegein en Zeist</span><span>Klant onboarding</span><span className="ls-ja"><Stand soort="klaar" />Ja</span></Rij>
            <Rij><span className="ls-sterk">Proefrit op afspraak in de winkel</span><span>Brochure (pdf)</span><span className="ls-ja"><Stand soort="klaar" />Ja</span></Rij>
            <Rij><span className="ls-sterk">Onderhoud inbegrepen in het maandbedrag</span><span>Vermoeden</span><span className="ls-nee"><Stand soort="open" />Na bevestiging</span></Rij>
            <Rij><span className="ls-sterk">Geen prijzen van concurrenten noemen</span><span>Bureau</span><span className="ls-ja"><Stand soort="klaar" />Ja</span></Rij>
          </Tabel>
        </div>
      </App>
    </Beeld>
  )
}

/* 3. Aanbod ----------------------------------------------------------------------------------------- */

const AANBOD: { naam: string; pagina: string; geen?: 'geen' | 'ander' }[] = [
  { naam: 'Bakfiets leasen', pagina: 'Genoemd op /fietsen', geen: 'ander' },
  { naam: 'E-bike onderhoud', pagina: '/onderhoud' },
  { naam: 'Reparatie aan huis', pagina: 'Nergens genoemd', geen: 'geen' },
  { naam: 'Accu vervangen', pagina: '/onderhoud/accu' },
  { naam: 'Fietsverhuur', pagina: '/verhuur' },
  { naam: 'Bakfiets kopen', pagina: '/bakfietsen' },
]

export function Aanbod() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van het aanbod van ${KLANT}: zes diensten met de pagina waar Orbit ze vond. Bakfiets leasen wordt alleen genoemd op een pagina over iets anders, en reparatie aan huis heeft geen eigen pagina.`}>
      <App pad={['Mijn bedrijf', 'Aanbod']}>
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-kop-rij">
            <div><p className="lv-h1">Aanbod</p><p className="lv-sub">9 diensten, 2 zonder eigen pagina</p></div>
            <span className="ls-schakel-regel"><Schakelaar aan={false} />Alleen zonder eigen pagina</span>
          </div>
          <Tabel kol="minmax(0, 1.2fr) minmax(0, 1.1fr) auto" kop={['Dienst', 'Pagina', '']}>
            {AANBOD.map((a) => (
              <Rij key={a.naam}>
                <span className="ls-sterk">{a.naam}</span>
                <span className={a.geen ? 'ls-mono ls-zachter' : 'ls-mono'}>{a.pagina}</span>
                <span>{a.geen === 'geen' && <Chip toon="accent">Geen eigen pagina</Chip>}{a.geen === 'ander' && <Chip toon="accent">Op een pagina over iets anders</Chip>}</span>
              </Rij>
            ))}
          </Tabel>
        </div>
      </App>
    </Beeld>
  )
}

/* 4. Klant onboarding ------------------------------------------------------------------------------- */

const GESPREK: { stap: string; stand: 'klaar' | 'bezig' | 'open'; open?: string }[] = [
  { stap: 'Groeidoelen', stand: 'klaar' },
  { stap: 'Belangrijkste diensten', stand: 'klaar' },
  { stap: 'Regio\'s', stand: 'bezig' },
  { stap: 'Bezwaren van klanten', stand: 'open', open: '2 open' },
  { stap: 'Verhalen uit de praktijk', stand: 'open', open: '3 open' },
  { stap: 'Afspraken en veranderingen', stand: 'open' },
  { stap: 'Afronden', stand: 'open' },
]

export function Onboarding() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van de klant onboarding van ${KLANT}: zeven stappen, waarvan groeidoelen en belangrijkste diensten klaar zijn. Bij de stap regio's staat wat Orbit op de website vond, Utrecht, Nieuwegein en Zeist, met de keuze dit klopt of aanpassen.`}>
      <App pad={[KLANT, 'Klant onboarding']} rechts="2 van 7 stappen klaar">
        <div className="ls-onboarding ls-inhoud">
          <ol className="ls-gesprek">
            {GESPREK.map((g) => (
              <li key={g.stap} className={g.stand === 'bezig' ? 'ls-gesprek-aan' : undefined}><Stand soort={g.stand} />{g.stap}{g.open && <span className="ls-gesprek-open">{g.open}</span>}</li>
            ))}
          </ol>
          <div className="ls-onboarding-stap">
            <p className="lv-label">Stap 3 · Regio&apos;s</p>
            <p className="lv-h1 ls-h1-klein">In welke plaatsen wil {KLANT} gevonden worden?</p>
            <div className="lv-kaart">
              <div className="lv-kaart-kop"><span>Gevonden op de website</span><span className="lv-kaart-meta">/contact</span></div>
              <div className="ls-tags"><span>Utrecht</span><span>Nieuwegein</span><span>Zeist</span></div>
              <div className="ls-knoppen"><Knop primair>Dit klopt</Knop><Knop>Aanpassen</Knop></div>
            </div>
            <p className="ls-uitleg-link">Waarom vraagt Orbit dit?</p>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 5. Mijn clusters ---------------------------------------------------------------------------------- */

const CLUSTERS: { naam: string; waarde?: string; marge?: string; lijn?: number[]; maand: boolean; wacht?: boolean }[] = [
  { naam: 'Bakfiets leasen', waarde: '12%', marge: '± 6', lijn: [8, 9, 7, 10, 11, 12], maand: true },
  { naam: 'E-bike onderhoud', waarde: '38%', marge: '± 7', lijn: [30, 33, 32, 35, 37, 38], maand: true },
  { naam: 'Fietsreparatie Utrecht', waarde: '51%', marge: '± 8', lijn: [49, 52, 50, 53, 50, 51], maand: true },
  { naam: 'Elektrische bakfiets kopen', maand: false, wacht: true },
]

export function Lijntje({ punten }: { punten: number[] }) {
  const max = Math.max(...punten) + 2
  const min = Math.min(...punten) - 2
  const d = punten.map((p, i) => `${(i / (punten.length - 1)) * 76 + 2},${22 - ((p - min) / (max - min)) * 18}`).join(' ')
  return <svg className="ls-lijntje" viewBox="0 0 80 24"><polyline points={d} /></svg>
}

export function Clusters() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van de clusters van ${KLANT}: bakfiets leasen 12 procent plus of min 6, e-bike onderhoud 38 procent plus of min 7, fietsreparatie Utrecht 51 procent plus of min 8, alle drie met de maandmeting aan. Het meetplan voor elektrische bakfiets kopen wacht op bevestiging.`}>
      <App pad={['Clusters', 'Mijn clusters']} rechts="Nieuw cluster">
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-melding"><Icoon naam="vonk" /><span>1 meetplan wacht op bevestiging</span><span className="ls-melding-link">Bekijk</span></div>
          <p className="ls-meta-regel">3 van 4 clusters worden elke maand gemeten</p>
          <Tabel kol="minmax(0, 1.6fr) 104px 88px 96px" kop={['Cluster', 'Zichtbaarheid', 'Verloop', 'Maandmeting']}>
            {CLUSTERS.map((c) => (
              <Rij key={c.naam}>
                <span className="ls-sterk">{c.naam}</span>
                <span>{c.waarde ? <><span className="ls-getal">{c.waarde}</span> <span className="ls-zachter">{c.marge}</span></> : <span className="ls-zachter">Meetplan wacht</span>}</span>
                <span>{c.lijn && <Lijntje punten={c.lijn} />}</span>
                <span><Schakelaar aan={c.maand} /></span>
              </Rij>
            ))}
          </Tabel>
          <p className="lv-label ls-label-ruim">Voorgesteld</p>
          <div className="ls-voorstel-rij"><span className="ls-sterk">Fietsverhuur voor toeristen</span><span className="ls-zachter">Uit het onderzoek</span><Knop>Zet aan</Knop></div>
        </div>
      </App>
    </Beeld>
  )
}

/* 6. Clusters ontdekken ----------------------------------------------------------------------------- */

const VOORSTELLEN = [
  { titel: 'Bakfiets leasen voor gezinnen', reden: 'Komt terug in de klant onboarding en in Search Console.', volume: '1.900', bewaard: true },
  { titel: 'Tweedehands bakfiets kopen', reden: 'Veel vertoningen in Search Console, nog geen pagina.', volume: '880' },
  { titel: 'Bakfiets onderhoud aan huis', reden: 'Een belangrijke dienst uit de klant onboarding.', volume: '320' },
]

export function Ontdekken() {
  return (
    <Beeld samenvatting="Productvoorbeeld van clusters ontdekken in de productgroep bakfietsen: drie voorstellen met een reden en het zoekvolume per maand. Het eerste voorstel is opgeslagen. Zoekvolume is een aanwijzing, geen meting van AI-vragen.">
      <App pad={['Clusters', 'Clusters ontdekken']} rechts="Productgroep: Bakfietsen">
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-voorstellen">
            {VOORSTELLEN.map((v) => (
              <div key={v.titel} className="lv-kaart ls-voorstel">
                <p className="ls-kaart-titel">{v.titel}</p>
                <p className="ls-kaart-tekst">{v.reden}</p>
                <div className="ls-voorstel-voet">
                  <span className="ls-zachter"><span className="ls-getal-klein">{v.volume}</span> zoekopdrachten per maand</span>
                  {v.bewaard ? <span className="lv-accentregel ls-inline"><Icoon naam="vink" />Opgeslagen</span> : <Knop>Opslaan</Knop>}
                </div>
              </div>
            ))}
          </div>
          <p className="ls-noot">Zoekvolume is een aanwijzing voor wat mensen aan een AI-assistent vragen, geen meting daarvan.</p>
        </div>
      </App>
    </Beeld>
  )
}

/* 7. Meetplan --------------------------------------------------------------------------------------- */

const FASEN = [
  { fase: 'Oriëntatie', vragen: ['Is een bakfiets leasen handig in de stad?', 'Wat kost een bakfiets leasen per maand?'] },
  { fase: 'Overweging', vragen: ['Bakfiets leasen of kopen: wat is slimmer?', 'Welke bakfietsen kun je leasen in Utrecht?'] },
  { fase: 'Beslissing', vragen: [VRAAG, 'Bij welke fietsenwinkel in Utrecht lease ik een bakfiets?'], zwaar: true },
]

export function Meetplan() {
  return (
    <Beeld samenvatting="Productvoorbeeld van een meetplan voor bakfiets leasen: dertig vragen, tien per fase van de klantreis (oriëntatie, overweging en beslissing), waarbij de beslissingsvragen zwaarder wegen. ChatGPT, Gemini en Google AI-overzichten staan aan, net als de maandmeting, en onderaan staat de knop om het meetplan te bevestigen.">
      <App pad={['Clusters', 'Bakfiets leasen', 'Meetplan']} rechts="30 vragen">
        <div className="lv-inhoud ls-inhoud">
          <p className="lv-h1">Meetplan · Bakfiets leasen</p>
          <p className="lv-sub">Loop de vragen na en bevestig. Pas dan begint de meting.</p>
          <div className="ls-fasen">
            {FASEN.map((f) => (
              <div key={f.fase} className="ls-fase">
                <div className="ls-fase-kop"><span className="ls-sterk">{f.fase}</span><span className="ls-zachter">10 vragen{f.zwaar && ' · weegt zwaarder'}</span></div>
                {f.vragen.map((v) => <p key={v} className="ls-fase-vraag"><Vinkje aan />{v}</p>)}
                <p className="ls-fase-meer">8 vragen meer</p>
              </div>
            ))}
          </div>
          <div className="ls-meetplan-voet">
            <span className="ls-kanalen"><span><Vinkje aan />ChatGPT</span><span><Vinkje aan />Gemini</span><span><Vinkje aan />Google AI-overzicht</span></span>
            <span className="ls-schakel-regel"><Schakelaar aan />Elke maand meten</span>
            <Knop primair>Bevestig het meetplan</Knop>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 8. Zichtbaarheid in AI ---------------------------------------------------------------------------- */

const MAANDEN = ['mei', 'jun', 'jul', 'aug', 'sep', 'okt']
const JIJ = [22, 24, 23, 27, 29, 34]
const ATELIER = [52, 50, 53, 51, 54, 52]
const STADSFIETS = [41, 43, 40, 42, 41, 43]

// De grafiek tekent alleen lijnen; getallen en maanden staan er als gewone tekst omheen, zodat ze op
// elke breedte even groot zijn. Lijnen houden hun dikte door vector-effect in de CSS.
function Grafiek() {
  const x = (i: number) => (i / (MAANDEN.length - 1)) * 100
  const y = (v: number) => 100 - (v / 60) * 100
  const lijn = (r: number[]) => r.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const band = [...JIJ.map((v, i) => `${x(i)},${y(v + 4)}`), ...[...JIJ].reverse().map((v, i) => `${x(JIJ.length - 1 - i)},${y(v - 4)}`)].join(' ')
  return (
    <div className="ls-grafiekvak">
      <div className="ls-y-as">{[50, 25, 0].map((g) => <span key={g} style={{ top: `${y(g)}%` }}>{g}%</span>)}</div>
      <div className="ls-tekenvlak">
        <svg className="ls-grafiek" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[0, 25, 50].map((g) => <line key={g} x1="0" x2="100" y1={y(g)} y2={y(g)} className="ls-raster" />)}
          <polyline points={lijn(ATELIER)} className="ls-lijn-ander" />
          <polyline points={lijn(STADSFIETS)} className="ls-lijn-ander ls-lijn-ander-2" />
          <polygon points={band} className="ls-band" />
          <polyline points={lijn(JIJ)} className="ls-lijn-jij" />
        </svg>
        <span className="ls-eindpunt" style={{ top: `${y(JIJ[JIJ.length - 1])}%` }} />
        <div className="ls-x-as">{MAANDEN.map((m) => <span key={m}>{m}</span>)}</div>
      </div>
    </div>
  )
}

export function Zichtbaarheid() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van zichtbaarheid in AI voor ${KLANT} over zes maanden: genoemd in 34 procent van de antwoorden, plus of min 4, gestegen van 22 procent in mei. Gemiddelde positie 2,6 en 48 bronvermeldingen. De concurrenten Fietsatelier Voorbeeld en Stadsfiets Demo staan als stippellijnen in de grafiek, met per cluster de cijfers in een tabel.`}>
      <App pad={['Resultaten', 'Zichtbaarheid in AI']} rechts="Laatste 6 maanden">
        <div className="lv-inhoud ls-inhoud">
          <p className="lv-h1">Zichtbaarheid in AI</p>
          <p className="lv-sub">Hoe vaak AI-assistenten {KLANT} noemen bij de vragen van zijn klanten.</p>
          <div className="ls-kpis">
            <div className="ls-kpi"><span className="ls-kpi-label">Genoemd in antwoorden</span><span className="ls-kpi-waarde">34%<span className="ls-kpi-marge">± 4</span><span className="ls-kpi-delta">+5</span></span></div>
            <div className="ls-kpi"><span className="ls-kpi-label">Gemiddelde positie</span><span className="ls-kpi-waarde">2,6<span className="ls-kpi-delta">+0,3</span></span></div>
            <div className="ls-kpi"><span className="ls-kpi-label">Bronvermeldingen</span><span className="ls-kpi-waarde">48<span className="ls-kpi-delta">+9</span></span></div>
          </div>
          <div className="lv-kaart ls-grafiekkaart">
            <div className="lv-kaart-kop">
              <span>Genoemd in antwoorden, per maand</span>
              <span className="ls-legenda"><span className="ls-leg-jij">{KLANT}</span><span className="ls-leg-ander">Fietsatelier Voorbeeld</span><span className="ls-leg-ander">Stadsfiets Demo</span></span>
            </div>
            <Grafiek />
          </div>
          <Tabel kol="minmax(0, 1.6fr) 120px 110px 100px" kop={['Cluster', 'Zichtbaarheid', 'Verandering', 'Telt mee']} className="ls-tabel-ruim">
            <Rij><span className="ls-sterk">Fietsreparatie Utrecht</span><span>51% <span className="ls-zachter">± 8</span></span><span className="ls-zachter">Gelijk</span><span className="ls-zachter">28 vragen</span></Rij>
            <Rij><span className="ls-sterk">E-bike onderhoud</span><span>38% <span className="ls-zachter">± 7</span></span><span className="ls-accent">Gestegen</span><span className="ls-zachter">30 vragen</span></Rij>
            <Rij><span className="ls-sterk">Bakfiets leasen</span><span>12% <span className="ls-zachter">± 6</span></span><span className="ls-zachter">Gelijk</span><span className="ls-zachter">26 vragen</span></Rij>
          </Tabel>
        </div>
      </App>
    </Beeld>
  )
}

/* 9. Concurrenten bij één vraag --------------------------------------------------------------------- */

const GENOEMD = [
  { plek: '1', naam: 'Fietsatelier Voorbeeld', hoe: 'Eerste aanbeveling', n: 9 },
  { plek: '2', naam: 'Stadsfiets Demo', hoe: 'Een van meerdere', n: 7 },
  { plek: '3', naam: 'Bakfietsplein Demo', hoe: 'Zijdelings', n: 3 },
  { plek: '–', naam: KLANT, hoe: 'Niet genoemd', n: 0, jij: true },
]

export function Concurrenten() {
  return (
    <Beeld samenvatting={`Productvoorbeeld bij de vraag "${VRAAG}" in tien antwoorden van ChatGPT: Fietsatelier Voorbeeld als eerste aanbevolen in 9 van de 10, Stadsfiets Demo in 7, Bakfietsplein Demo zijdelings in 3, en ${KLANT} in geen enkel antwoord. AI schrijft de concurrenten duidelijke leasevoorwaarden, proefrit aan huis en ruime keuze in bakfietsen toe.`}>
      <App pad={['Zichtbaarheid in AI', 'Concurrenten']} rechts="ChatGPT · 10 antwoorden">
        <div className="lv-inhoud ls-inhoud">
          <p className="lv-h1 ls-h1-klein">{VRAAG}</p>
          <div className="ls-kop-rij ls-kop-rij-ruim"><Tabs items={['Antwoorden', 'Concurrenten']} actief={1} /></div>
          <div className="ls-ranglijst">
            {GENOEMD.map((g) => (
              <div key={g.naam} className={g.jij ? 'ls-rang ls-rang-jij' : 'ls-rang'}>
                <span className="ls-rang-plek">{g.plek}</span>
                <span className="ls-rang-naam"><span className="ls-sterk">{g.naam}</span><span className="ls-zachter">{g.hoe}</span></span>
                <span className="ls-balk"><span style={{ width: `${g.n * 10}%` }} /></span>
                <span className="ls-rang-n">{g.n} van 10</span>
              </div>
            ))}
          </div>
          <div className="lv-kaart">
            <div className="lv-kaart-kop"><span>Wat AI aan de concurrenten toeschrijft</span></div>
            <div className="ls-tags"><span>Duidelijke leasevoorwaarden</span><span>Proefrit aan huis</span><span>Ruime keuze in bakfietsen</span></div>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 10. Een kans met bewijs --------------------------------------------------------------------------- */

export function KansBewijs() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van een kans: een nieuwe dienstpagina over bakfiets leasen in Utrecht. Bewijs: ${KLANT} in 0 van 10 antwoorden genoemd, concurrenten Fietsatelier Voorbeeld en Stadsfiets Demo wel, de eigen site niet als bron aangehaald, en in Search Console 1.240 vertoningen en 18 klikken in drie maanden. De pagina helpt bij zes AI-vragen.`}>
      <App pad={['Contentplan', 'Pagina-ideeën']}>
        <div className="lv-inhoud ls-inhoud">
          <div className="lv-kaart ls-kans-kaart">
            <div className="ls-tags ls-tags-klein"><span>Nieuwe pagina</span><span>Dienstpagina</span></div>
            <p className="ls-kaart-titel ls-kaart-titel-groot">Bakfiets leasen in Utrecht</p>
            <Kans />
            <dl className="ls-bewijs">
              <div><dt>Genoemd in antwoorden</dt><dd>0 van 10</dd></div>
              <div><dt>Concurrenten wel</dt><dd>Fietsatelier Voorbeeld, Stadsfiets Demo</dd></div>
              <div><dt>Eigen site als bron</dt><dd>Niet aangehaald</dd></div>
              <div><dt>Search Console</dt><dd>1.240 vertoningen, 18 klikken in 3 maanden</dd></div>
              <div><dt>Helpt bij</dt><dd>6 AI-vragen in Bakfiets leasen</dd></div>
            </dl>
            <div className="ls-knoppen ls-knoppen-rechts"><Knop>Later</Knop><Knop primair>Zet op contentplan</Knop></div>
          </div>
          <div className="lv-kaart ls-kans-kaart ls-zacht">
            <div className="ls-tags ls-tags-klein"><span>Optimalisatie</span><span>/onderhoud</span></div>
            <p className="ls-kaart-titel">E-bike onderhoud: wat kost het?</p>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 11. Contentplan ----------------------------------------------------------------------------------- */

const OKTOBER: { titel: string; dag: string; stand: string; toon: Toon }[] = [
  { titel: 'Accu van je e-bike vervangen', dag: '6 okt', stand: 'Staat live', toon: 'live' },
  { titel: 'Fietsverhuur in Utrecht', dag: '9 okt', stand: 'Staat live', toon: 'live' },
  { titel: 'Bakfiets leasen bij Fietsen Jansen', dag: '13 okt', stand: 'Tekst klaar voor akkoord', toon: 'accent' },
  { titel: 'Bakfiets of fietskar?', dag: '20 okt', stand: 'Wordt geschreven', toon: 'neutraal' },
]
const NOVEMBER = [
  { titel: 'Bakfiets leasen voor gezinnen', dag: '3 nov' },
  { titel: 'Onderhoudsabonnement e-bike', dag: '10 nov' },
  { titel: 'Veelgestelde vragen over lease', dag: '17 nov' },
  { titel: 'Tweedehands bakfiets kopen', dag: '24 nov' },
]

export function Contentplan() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van het contentplan van ${KLANT}. Bovenaan wacht november op de start: tien pagina's, ongeveer 6 euro aan AI-gebruik. Oktober is gestart: twee pagina's staan live, een tekst is klaar voor akkoord en een wordt geschreven. November heeft vier geplande pagina's in beeld.`}>
      <App pad={['Strategie', 'Contentplan']} rechts="10 pagina's per maand">
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-kop-rij"><p className="lv-h1">Contentplan</p><Tabs items={['Overzicht', 'Plannen', 'Kalender']} actief={0} /></div>
          <div className="ls-wacht">
            <div><p className="ls-wacht-label">Op jou wacht</p><p className="ls-kaart-titel">Start november</p><p className="ls-kaart-tekst">10 pagina&apos;s. Daarna zet Orbit de vragen klaar onder Openstaande vragen.</p></div>
            <div className="ls-wacht-actie"><span className="ls-zachter">ongeveer € 6 aan AI-gebruik</span><Knop primair>Start de maand</Knop></div>
          </div>
          <div className="ls-maanden">
            <div className="ls-maand">
              <div className="ls-maand-kop"><span className="ls-sterk">Oktober</span><Chip>Gestart</Chip></div>
              {OKTOBER.map((p) => (
                <div key={p.titel} className="ls-maand-rij"><span className="ls-maand-titel">{p.titel}</span><span className="ls-zachter">{p.dag}</span><Chip toon={p.toon}>{p.stand}</Chip></div>
              ))}
              <p className="ls-fase-meer">6 pagina&apos;s meer</p>
            </div>
            <div className="ls-maand">
              <div className="ls-maand-kop"><span className="ls-sterk">November</span><Chip>Wacht op de start</Chip></div>
              {NOVEMBER.map((p) => (
                <div key={p.titel} className="ls-maand-rij"><span className="ls-maand-titel">{p.titel}</span><span className="ls-zachter">{p.dag}</span><Chip>Gepland</Chip></div>
              ))}
              <p className="ls-fase-meer">6 pagina&apos;s meer</p>
            </div>
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 12. Het planbord ---------------------------------------------------------------------------------- */

function Kaartje({ titel, soort, sleept = false, schim = false }: { titel: string; soort: string; sleept?: boolean; schim?: boolean }) {
  return (
    <div className={`ls-kaartje${sleept ? ' ls-kaartje-sleept' : ''}${schim ? ' ls-kaartje-schim' : ''}`}>
      <span className="ls-kaartje-titel"><Icoon naam="greep" />{titel}</span>
      <span className="ls-kaartje-soort">{soort}</span>
    </div>
  )
}

export function Planbord() {
  return (
    <Beeld samenvatting="Productvoorbeeld van het planbord: links acht pagina-ideeën, daarnaast november met zes van tien plekken bezet en december met twee van tien. Het idee bakfiets leasen voor gezinnen wordt naar december gesleept.">
      <App pad={['Contentplan', 'Plannen']} rechts="Sleep content naar de maand">
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-bord">
            <div className="ls-kolom">
              <div className="ls-kolom-kop"><span className="ls-sterk">Pagina-ideeën</span><span className="ls-zachter">8</span></div>
              <Kaartje titel="Bakfiets leasen voor gezinnen" soort="Nieuwe pagina" schim />
              <Kaartje titel="Veelgestelde vragen over lease" soort="Veelgestelde vragen" />
              <Kaartje titel="Onderhoudsabonnement e-bike" soort="Optimalisatie" />
            </div>
            <div className="ls-kolom">
              <div className="ls-kolom-kop"><span className="ls-sterk">November</span><span className="ls-zachter">6 van 10</span></div>
              <Kaartje titel="Bakfiets of fietskar?" soort="Vergelijking" />
              <Kaartje titel="Tweedehands bakfiets kopen" soort="Gids" />
              <div className="ls-plek">4 plekken vrij</div>
            </div>
            <div className="ls-kolom">
              <div className="ls-kolom-kop"><span className="ls-sterk">December</span><span className="ls-zachter">2 van 10</span></div>
              <Kaartje titel="Accu laden in de winter" soort="Artikel" />
              <div className="ls-plek ls-plek-doel">Laat hier los</div>
            </div>
            <Kaartje titel="Bakfiets leasen voor gezinnen" soort="Nieuwe pagina" sleept />
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 13. De kalender ----------------------------------------------------------------------------------- */

// 1 oktober 2026 valt op een donderdag: in een week die op maandag begint, schuift de maand drie plekken op.
const VERSCHUIVING = 3
const VANDAAG = 21
const DAGEN: Record<number, { titel: string; toon: 'gepland' | 'wacht' | 'live' | 'achter' }> = {
  6: { titel: 'Accu van je e-bike vervangen', toon: 'live' },
  9: { titel: 'Fietsverhuur in Utrecht', toon: 'live' },
  13: { titel: 'Bakfiets leasen bij Fietsen Jansen', toon: 'wacht' },
  15: { titel: 'Lease voor ondernemers', toon: 'wacht' },
  20: { titel: 'Bakfiets of fietskar?', toon: 'achter' },
  23: { titel: 'E-bike onderhoud: wat kost het?', toon: 'gepland' },
  27: { titel: 'Fietsreparatie aan huis', toon: 'gepland' },
  30: { titel: 'Bakfiets huren of leasen?', toon: 'gepland' },
}
const JAAR = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']

export function Kalender() {
  const vakken = Array.from({ length: 35 }, (_, i) => i - VERSCHUIVING + 1)
  return (
    <Beeld samenvatting="Productvoorbeeld van de kalender van oktober 2026, per dag welke pagina live gaat: twee pagina's staan live, twee wachten op jou, een loopt achter en drie zijn gepland. Onder de maand staat de rest van het jaar.">
      <App pad={['Contentplan', 'Kalender']} rechts="Alle clusters">
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-kop-rij"><p className="lv-h1">Oktober 2026</p><Tabs items={['Overzicht', 'Plannen', 'Kalender']} actief={2} /></div>
          <div className="ls-legenda-rij">
            <span><i className="ls-dag-gepland" />Gepland of in behandeling</span>
            <span><i className="ls-dag-wacht" />Wacht op jou</span>
            <span><i className="ls-dag-live" />Staat live</span>
            <span><i className="ls-dag-achter" />Loopt achter of ging mis</span>
          </div>
          <div className="ls-kalender">
            {['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'].map((d) => <span key={d} className="ls-weekdag">{d}</span>)}
            {vakken.map((dag, i) => {
              const geldig = dag >= 1 && dag <= 31
              const item = geldig ? DAGEN[dag] : undefined
              return (
                <div key={i} className={`ls-dag${geldig ? '' : ' ls-dag-leeg'}${dag === VANDAAG ? ' ls-dag-vandaag' : ''}`}>
                  {geldig && <span className="ls-dag-nr">{dag}</span>}
                  {item && <span className={`ls-dag-item ls-dag-${item.toon}`}>{item.titel}</span>}
                </div>
              )
            })}
          </div>
          <p className="lv-label ls-label-ruim">De rest van je jaar</p>
          <div className="ls-jaar">
            {JAAR.map((m, i) => (
              <span key={m} className={i < 9 ? 'ls-jaar-maand ls-jaar-voorbij' : i === 9 ? 'ls-jaar-maand ls-jaar-nu' : 'ls-jaar-maand'}>
                {m}<span>{i < 9 ? '' : '10'}</span>
              </span>
            ))}
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 14. Openstaande vragen op de telefoon van de klant ------------------------------------------------ */

export function VragenTelefoon() {
  return (
    <Beeld className="ls-telefoonbeeld" samenvatting={`Productvoorbeeld van de deellink: op de telefoon beantwoordt ${KLANT} zonder account de vragen van het bureau, 3 van 8 zijn beantwoord. De open vraag is of onderhoud inbegrepen is in het maandbedrag. Erachter het scherm waarmee het bureau de link deelt, met een einddatum van 14 november.`}>
      <App pad={['Strategie', 'Openstaande vragen']} className="ls-deelvenster">
        <div className="lv-inhoud ls-inhoud">
          <p className="lv-h1 ls-h1-klein">Openstaande vragen</p>
          <p className="lv-sub">8 vragen voor 2 pagina&apos;s</p>
          <div className="lv-kaart">
            <div className="lv-kaart-kop"><span>Deel deze vragen</span><span className="lv-kaart-meta">werkt tot 14 november</span></div>
            <p className="ls-link-veld">orbit.example/v/k7m2q</p>
            <p className="ls-noot ls-noot-boven">Nog niet geopend</p>
            <div className="ls-knoppen"><Knop>Kopieer de link</Knop><Knop>Kopieer een herinnering</Knop></div>
          </div>
        </div>
      </App>
      <div className="ls-telefoon">
        <div className="ls-telefoon-scherm">
          <p className="ls-tel-van">Vragen van Bureau Noordwind</p>
          <p className="ls-tel-titel">{KLANT}</p>
          <div className="ls-voortgang"><span style={{ width: '37.5%' }} /></div>
          <p className="ls-tel-stand">3 van 8 beantwoord</p>
          <div className="ls-tel-kaart">
            <p className="ls-tel-pagina">Bakfiets leasen bij Fietsen Jansen</p>
            <p className="ls-tel-vraag">Is onderhoud inbegrepen in het maandbedrag?</p>
            <span className="ls-tel-veld">Typ je antwoord</span>
            <div className="ls-tel-knoppen"><Knop>Sla over</Knop><Knop primair>Bewaar</Knop></div>
          </div>
          <div className="ls-tel-kaart ls-zacht">
            <p className="ls-tel-vraag">Hoe lang loopt een leasecontract minimaal?</p>
          </div>
        </div>
      </div>
    </Beeld>
  )
}

/* 15. De content brief ------------------------------------------------------------------------------ */

const BRIEF: { kop: string; regels: string[]; accent?: boolean }[] = [
  { kop: 'Wat er op de pagina moet', regels: ['Looptijd en maandprijs', 'Wat onderhoud inhoudt', 'Proefrit en levering'] },
  { kop: 'Vragen van de lezer', regels: ['Kan ik eerst proefrijden?', 'Wat gebeurt er bij schade?'] },
  { kop: 'Wat concurrerende pagina\'s doen', regels: ['Fietsatelier Voorbeeld noemt een maandprijs per model.'] },
  { kop: 'Alleen het bedrijf weet', regels: ['3 vragen naar het bedrijf'], accent: true },
]

export function Brief() {
  return (
    <Beeld samenvatting="Productvoorbeeld van een content brief voor de dienstpagina bakfiets leasen bij Fietsen Jansen: wat er op de pagina moet, de vragen van de lezer, wat een concurrerende pagina doet, en drie vragen die alleen het bedrijf kan beantwoorden.">
      <App pad={['Bibliotheek', 'Bakfiets leasen bij Fietsen Jansen', 'Brief']}>
        <div className="lv-inhoud ls-inhoud">
          <div className="ls-tags ls-tags-klein"><span>Dienstpagina</span><span>Bakfiets leasen</span><span>Live op 13 oktober</span></div>
          <p className="lv-h1 ls-h1-klein ls-h1-ruim">Brief: Bakfiets leasen bij {KLANT}</p>
          <div className="ls-brief">
            {BRIEF.map((b) => (
              <div key={b.kop} className="ls-brief-blok">
                <p className="lv-label">{b.kop}</p>
                {b.accent
                  ? <p className="lv-accentregel ls-inline">{b.regels[0]}<Icoon naam="pijl" /></p>
                  : <ul>{b.regels.map((r) => <li key={r}>{r}</li>)}</ul>}
              </div>
            ))}
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 16. De bibliotheek -------------------------------------------------------------------------------- */

export function Bibliotheek() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van de bibliotheek van ${KLANT}. Op jou wacht: de tekst over bakfiets leasen is klaar voor akkoord, en lease voor ondernemers is goedgekeurd en moet op de site. Live staan de pagina over de accu van een e-bike sinds 6 oktober en fietsverhuur in Utrecht sinds 9 oktober.`}>
      <App pad={['Strategie', 'Bibliotheek']} rechts="Alle clusters">
        <div className="lv-inhoud ls-inhoud">
          <p className="lv-h1">Bibliotheek</p>
          <p className="lv-sub">2 pagina&apos;s wachten op antwoorden · 3 worden geschreven</p>
          <p className="lv-label ls-label-ruim">Op jou wacht</p>
          <Tabel kol="minmax(0, 1.7fr) minmax(0, 1fr) minmax(0, 1.2fr) 170px" kop={['Pagina', 'Cluster', 'Stand', '']}>
            <Rij aan><span className="ls-sterk">Bakfiets leasen bij Fietsen Jansen</span><span className="ls-zachter">Bakfiets leasen</span><span><Chip toon="accent">Tekst klaar voor akkoord</Chip></span><span className="ls-rechts"><Knop primair>Lees en keur goed</Knop></span></Rij>
            <Rij><span className="ls-sterk">Lease voor ondernemers</span><span className="ls-zachter">Bakfiets leasen</span><span><Chip>Goedgekeurd</Chip></span><span className="ls-rechts"><Knop>Zet op je site</Knop></span></Rij>
          </Tabel>
          <p className="lv-label ls-label-ruim">Staat live</p>
          <Tabel kol="minmax(0, 1.7fr) minmax(0, 1fr) minmax(0, 1.2fr) 170px" kop={['Pagina', 'Cluster', 'Stand', 'Effect']}>
            <Rij><span className="ls-sterk">Accu van je e-bike vervangen</span><span className="ls-zachter">E-bike onderhoud</span><span><Chip toon="live">Live sinds 6 okt</Chip></span><span className="ls-zachter">Eerste hermeting gedaan</span></Rij>
            <Rij><span className="ls-sterk">Fietsverhuur in Utrecht</span><span className="ls-zachter">Fietsverhuur</span><span><Chip toon="live">Live sinds 9 okt</Chip></span><span className="ls-zachter">Hermeting op 23 okt</span></Rij>
          </Tabel>
        </div>
      </App>
    </Beeld>
  )
}

/* 17. Een pagina live zetten ------------------------------------------------------------------------ */

const PAGINASTAPPEN: { stap: string; stand: 'klaar' | 'bezig' | 'open' }[] = [
  { stap: 'Vragen', stand: 'klaar' },
  { stap: 'Schrijven', stand: 'klaar' },
  { stap: 'Goedkeuren', stand: 'klaar' },
  { stap: 'Live', stand: 'bezig' },
  { stap: 'Effect', stand: 'open' },
]

export function Publiceren() {
  return (
    <Beeld samenvatting="Productvoorbeeld van een goedgekeurde pagina, lease voor ondernemers: vragen, schrijven en goedkeuren zijn klaar, live is aan de beurt. Het bureau kopieert de tekst als HTML, Markdown of platte tekst, zet hem zelf op de site en meldt het adres. Titel, metabeschrijving, veelgestelde vragen, gestructureerde gegevens en suggesties voor interne links gaan mee.">
      <App pad={['Bibliotheek', 'Lease voor ondernemers']}>
        <div className="lv-inhoud ls-inhoud">
          <ol className="ls-stapper">
            {PAGINASTAPPEN.map((p) => <li key={p.stap} className={`ls-stapper-${p.stand}`}><Stand soort={p.stand} />{p.stap}</li>)}
          </ol>
          <div className="ls-wacht ls-wacht-kolom">
            <p className="ls-wacht-label">Aan zet: jij</p>
            <p className="ls-kaart-titel">Zet de tekst op je site en meld het adres.</p>
            <div className="ls-kopieer"><Tabs items={['HTML', 'Markdown', 'Platte tekst']} actief={0} /><Knop><Icoon naam="kopieer" />Kopieer</Knop></div>
            <div className="ls-meld"><span className="ls-link-veld ls-link-veld-vol">https://fietsenjansen.example/lease-ondernemers</span><Knop primair>Meld dat hij live staat</Knop></div>
          </div>
          <p className="lv-label ls-label-ruim">Gaat mee</p>
          <ul className="ls-checklist ls-checklist-compact">
            <li><Stand soort="klaar" /><span>Titel en metabeschrijving</span></li>
            <li><Stand soort="klaar" /><span>Veelgestelde vragen</span><span className="ls-checklist-uit">4</span></li>
            <li><Stand soort="klaar" /><span>Gestructureerde gegevens (JSON-LD)</span></li>
            <li><Stand soort="klaar" /><span>Interne links</span><span className="ls-checklist-uit">3 suggesties</span></li>
          </ul>
          <p className="ls-noot">Orbit zet zelf niets op je website.</p>
        </div>
      </App>
    </Beeld>
  )
}

/* 18. Zoekverkeer ----------------------------------------------------------------------------------- */

// Verzonnen klikken per dag over twaalf weken (augustus tot en met oktober), met drie publicatiedagen.
const KLIKKEN = Array.from({ length: 84 }, (_, i) => {
  const basis = i < 17 ? 0.6 : i < 66 ? 2.2 : 3.4
  return Math.max(0, Math.round(basis + Math.sin(i * 1.7) * 1.1 + Math.cos(i * 0.6) * 0.8))
})
const LIVE = [{ dag: 17 }, { dag: 66 }, { dag: 69 }]

function Klikgrafiek() {
  const max = Math.max(...KLIKKEN)
  const breed = 100 / KLIKKEN.length
  return (
    <div className="ls-tekenvlak ls-tekenvlak-laag">
      <svg className="ls-grafiek" viewBox="0 0 100 100" preserveAspectRatio="none">
        {KLIKKEN.map((k, i) => <rect key={i} x={i * breed + breed * 0.15} y={100 - (k / max) * 88} width={breed * 0.7} height={(k / max) * 88} className="ls-staaf" />)}
        {LIVE.map((l) => <line key={l.dag} x1={(l.dag + 0.5) * breed} x2={(l.dag + 0.5) * breed} y1="0" y2="100" className="ls-live-lijn" />)}
        <line x1="0" x2="100" y1="100" y2="100" className="ls-raster" />
      </svg>
      <div className="ls-x-as"><span>aug</span><span>sep</span><span>okt</span></div>
    </div>
  )
}

export function Zoekverkeer() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van zoekverkeer in Google voor de pagina's die Orbit schreef, over de laatste drie maanden: 214 klikken, 9.870 vertoningen, een doorklikratio van 2,2 procent en gemiddelde positie 11,4. Een grafiek met klikken per dag toont drie publicatiedagen. Per pagina staat ook het effect in AI apart: één keer gestegen, twee keer nog onvoldoende metingen.`}>
      <App pad={['Resultaten', 'Zoekverkeer']} rechts="Laatste 3 maanden">
        <div className="lv-inhoud ls-inhoud">
          <p className="lv-h1">Zoekverkeer</p>
          <p className="lv-sub">Alleen de pagina&apos;s die Orbit schreef, uit Google Search Console.</p>
          <div className="ls-kpis ls-kpis-4">
            <div className="ls-kpi"><span className="ls-kpi-label">Klikken</span><span className="ls-kpi-waarde">214</span></div>
            <div className="ls-kpi"><span className="ls-kpi-label">Vertoningen</span><span className="ls-kpi-waarde">9.870</span></div>
            <div className="ls-kpi"><span className="ls-kpi-label">Doorklikratio</span><span className="ls-kpi-waarde">2,2%</span></div>
            <div className="ls-kpi"><span className="ls-kpi-label">Gemiddelde positie</span><span className="ls-kpi-waarde">11,4</span></div>
          </div>
          <div className="lv-kaart ls-grafiekkaart">
            <div className="lv-kaart-kop"><span>Klikken per dag</span><span className="ls-legenda"><span className="ls-leg-staaf">Klikken</span><span className="ls-leg-live">Pagina live</span></span></div>
            <Klikgrafiek />
          </div>
          <Tabel kol="minmax(0, 1.8fr) 100px 90px minmax(0, 1.3fr)" kop={['Pagina', 'Live sinds', 'Klikken', 'Effect in AI']} className="ls-tabel-ruim">
            <Rij><span className="ls-sterk">E-bike accu laten testen</span><span className="ls-zachter">18 aug</span><span>171</span><span className="ls-accent">Gestegen</span></Rij>
            <Rij><span className="ls-sterk">Accu van je e-bike vervangen</span><span className="ls-zachter">6 okt</span><span>31</span><span className="ls-zachter">Nog onvoldoende metingen</span></Rij>
            <Rij><span className="ls-sterk">Fietsverhuur in Utrecht</span><span className="ls-zachter">9 okt</span><span>12</span><span className="ls-zachter">Nog onvoldoende metingen</span></Rij>
          </Tabel>
        </div>
      </App>
    </Beeld>
  )
}

/* 19. Feitencontrole -------------------------------------------------------------------------------- */

const OVERIG: [string, number][] = [['Zelf beoordelen', 1], ['Klopt', 14], ['Orbit weet het niet', 3]]

export function Feitencontrole() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van de feitencontrole van ${KLANT}: één gegeven klopt niet. ChatGPT zei op 2 oktober dat het bedrijf op zondag open is, terwijl het volgens de bevestigde kennis op zondag gesloten is. Dezelfde fout staat op fietsgids.example. Daaronder één punt om zelf te beoordelen, veertien die kloppen en drie waar Orbit niets over weet.`}>
      <App pad={['Tools', 'Feitencontrole']}>
        <div className="lv-inhoud ls-inhoud">
          <p className="ls-gevolg">Eén gegeven klopt niet: AI-assistenten noemen andere openingstijden op zondag.</p>
          <p className="lv-label ls-label-ruim">Fouten · 1</p>
          <div className="lv-kaart ls-fout">
            <div className="ls-kop-rij"><span className="ls-kaart-titel">Openingstijden op zondag</span><Chip toon="accent">Onjuist</Chip></div>
            <div className="ls-quote">“{KLANT} is op zondag open van 12 tot 17 uur.”<span>ChatGPT · 2 oktober</span></div>
            <dl className="ls-bewijs">
              <div><dt>In de kennis</dt><dd>Op zondag gesloten · bevestigd door het bedrijf</dd></div>
              <div><dt>Ook op</dt><dd className="ls-mono">fietsgids.example</dd></div>
            </dl>
            <div className="ls-knoppen ls-knoppen-rechts"><Knop>Geen fout</Knop><Knop primair>Zet op vermeldingen</Knop></div>
          </div>
          <div className="ls-uitklap">
            {OVERIG.map(([k, n]) => <div key={k} className="ls-uitklap-rij"><span>{k}</span><span className="ls-zachter">{n}</span><Icoon naam="omlaag" /></div>)}
          </div>
        </div>
      </App>
    </Beeld>
  )
}

/* 20. Het overzicht met de vijf stappen van de maand ------------------------------------------------ */

const RONDE: { stap: string; stand: string; detail: string; wie: string; klaar?: boolean; jij?: boolean }[] = [
  { stap: 'Meten', stand: '3 clusters', detail: '4 kansen gevonden', wie: 'Orbit', klaar: true },
  { stap: 'Plannen', stand: '10 pagina\'s', detail: 'gestart', wie: 'Beheerder', klaar: true },
  { stap: 'Schrijven', stand: '4 van 10', detail: 'geschreven', wie: 'Orbit' },
  { stap: 'Publiceren', stand: '2 van 10 live', detail: '1 tekst staat klaar', wie: 'Jij', jij: true },
  { stap: 'Hermeten', stand: '1 hermeting', detail: 'na 14 en 28 dagen', wie: 'Orbit' },
]

export function Overzicht() {
  return (
    <Beeld samenvatting={`Productvoorbeeld van het overzicht van ${KLANT} in oktober. Bovenaan wacht een tekst op akkoord. Daaronder de vijf stappen van de maand: meten is klaar met vier kansen, plannen is gestart met tien pagina's, vier van de tien zijn geschreven, twee staan live en één tekst staat klaar om te publiceren, wat bij jou ligt, en er is één hermeting gedaan.`}>
      <App pad={[KLANT, 'Overzicht']}>
        <div className="lv-inhoud ls-inhoud">
          <p className="lv-h1">{KLANT}</p>
          <p className="lv-sub">Laatst gemeten op 1 oktober · volgende maandmeting op 1 november</p>
          <div className="ls-wacht">
            <div><p className="ls-wacht-label">Op jou wacht</p><p className="ls-kaart-titel">Lees en keur goed: Bakfiets leasen bij {KLANT}</p><p className="ls-kaart-tekst">Wacht sinds 2 dagen</p></div>
            <div className="ls-wacht-actie"><Knop primair>Lees de tekst</Knop></div>
          </div>
          <p className="lv-label ls-label-ruim">Oktober</p>
          <ol className="ls-ronde">
            {RONDE.map((r) => (
              <li key={r.stap} className={r.jij ? 'ls-ronde-stap ls-ronde-jij' : 'ls-ronde-stap'}>
                <span className="ls-ronde-kop">{r.klaar ? <Stand soort="klaar" /> : <Stand soort={r.jij ? 'bezig' : 'open'} />}{r.stap}</span>
                <span className="ls-ronde-stand">{r.stand}</span>
                <span className="ls-ronde-detail">{r.detail}</span>
                <span className="ls-ronde-wie">{r.klaar ? 'Klaar' : `Aan zet: ${r.wie}`}</span>
              </li>
            ))}
          </ol>
        </div>
      </App>
    </Beeld>
  )
}
