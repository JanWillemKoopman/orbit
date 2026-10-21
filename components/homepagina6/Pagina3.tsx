// De derde pagina onderaan /homepagina6: tien voordelen van Orbit voor bureaus, elk met twee beelden in het
// raster van de productpagina's van linear.app. Een cel toont geen heel venster maar één fragment uit de app:
// een kaart, een lijst of een instellingenblok, zwevend op een iets lichter vlak met een zwarte halo
// eromheen. Lijsten vervagen naar rechts en naar onder, spookkaarten erachter geven diepte, en kleur zit
// alleen in kleine tekens: limoengroen voor wat af is of de belangrijkste actie.
//
// Alle namen en getallen zijn verzonnen; het bijschrift van elk raster zegt dat het een demonstratie is.
import { Icoon, Knop, Stip } from './Visuals'
import { pagina3, type Usp } from '@/content/homepagina6'

const DEMO = 'Demonstratie · fictieve gegevens'

/* Bouwstenen --------------------------------------------------------------------------------------- */

function Cel({ titel, tekst, samenvatting, className = '', children }: { titel: string; tekst: string; samenvatting: string; className?: string; children: React.ReactNode }) {
  return (
    <figure className={`p3-cel ${className}`}>
      <div className="p3-podium" role="img" aria-label={`${samenvatting} Demonstratie met fictieve gegevens.`}>
        <div className="p3-podium-in" aria-hidden="true">{children}</div>
      </div>
      <figcaption className="p3-bijschrift"><h3>{titel}</h3><p>{tekst}</p></figcaption>
    </figure>
  )
}

// Een zwevende kaart met de halo van Linear. `stapel` zet er twee spookkaarten achter.
function Kaart({ className = '', stapel = false, children }: { className?: string; stapel?: boolean; children: React.ReactNode }) {
  return <div className={`p3-kaart${stapel ? ' p3-stapel' : ''} ${className}`}>{children}</div>
}

const Vink = () => <svg className="p3-vink" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" /><path d="M4.8 8.3l2.1 2.1 4.2-4.6" /></svg>
const Ring = ({ half = false }: { half?: boolean }) => (
  <svg className={half ? 'p3-ring p3-ring-half' : 'p3-ring'} viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.25" />{half && <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" />}</svg>
)
const Schakel = ({ aan }: { aan: boolean }) => <span className={aan ? 'p3-schakel p3-schakel-aan' : 'p3-schakel'}><span /></span>

/* 01 Vangnet ----------------------------------------------------------------------------------------- */

const CLAIMS: { soort: string; tekst: string; ok: boolean }[] = [
  { soort: 'Bedrag', tekst: 'Vanaf € 2.495 geïnstalleerd', ok: true },
  { soort: 'Garantie', tekst: 'Vijf jaar garantie op de installatie', ok: false },
  { soort: 'Termijn', tekst: 'Binnen drie weken geplaatst', ok: true },
  { soort: 'Keurmerk', tekst: 'Erkend installatiebedrijf', ok: true },
]

function Claims() {
  return (
    <Kaart className="p3-breed">
      <div className="p3-kaart-kop"><span>Harde claims in deze tekst</span><span className="p3-zacht">4</span></div>
      {CLAIMS.map((c, i) => (
        <div key={c.soort} className="p3-rij" style={{ opacity: 1 - i * 0.12 }}>
          {c.ok ? <Vink /> : <Ring />}
          <span className="p3-rij-soort">{c.soort}</span>
          <span className="p3-rij-tekst">{c.tekst}</span>
          <span className={c.ok ? 'p3-zacht' : 'p3-sterk'}>{c.ok ? 'Bevestigd' : 'Bevestiging nodig'}</span>
        </div>
      ))}
    </Kaart>
  )
}

function Goedkeuren() {
  return (
    <Kaart stapel className="p3-smal">
      <p className="p3-mini">Hybride warmtepomp of volledig elektrisch?</p>
      <p className="p3-kaart-titel">Nog 1 zin wacht op bevestiging</p>
      <p className="p3-tekst">“Vijf jaar garantie op de installatie.”</p>
      <div className="p3-knoppen">
        <span className="p3-knop-uit">Goedkeuren</span>
        <Knop primair>Vraag het bedrijf</Knop>
      </div>
    </Kaart>
  )
}

/* 02 Bewijs ------------------------------------------------------------------------------------------ */

const LADDER = ['Gepubliceerd', 'Genoemd door AI', 'Aangehaald door AI', 'Zichtbaar in Google', 'Verkeer', 'Conversie', 'Omzet']

function Ladder() {
  const nu = 3
  return (
    <div className="p3-ladder">
      <div className="p3-ladder-treden">
        {LADDER.map((t, i) => (
          <span key={t} className={i < nu ? 'p3-trede p3-trede-klaar' : i === nu ? 'p3-trede p3-trede-nu' : 'p3-trede'} style={{ height: `${28 + i * 14}px` }} />
        ))}
      </div>
      <div className="p3-ladder-lijn" style={{ left: `calc(${((nu + 0.5) / LADDER.length) * 100}% )` }} />
      <p className="p3-mono-label">{LADDER[nu]}</p>
      <p className="p3-ladder-sub">Trede 4 van 7 · Accu van je e-bike vervangen</p>
    </div>
  )
}

const KLIKKEN = [0, 0, 1, 0, 2, 3, 3, 5, 4, 6, 8, 7, 9, 11, 10, 13, 12, 15, 14, 17, 16, 19, 21, 20]

function Opbrengst() {
  const max = Math.max(...KLIKKEN)
  return (
    <div className="p3-dashboard">
      <div className="p3-tegels">
        <Kaart className="p3-tegel"><span className="p3-tegel-label">Klikken van Orbit-pagina&apos;s</span><span className="p3-tegel-waarde">214</span></Kaart>
        <Kaart className="p3-tegel p3-tegel-zacht"><span className="p3-tegel-label">Pagina&apos;s live</span><span className="p3-tegel-waarde">9</span></Kaart>
      </div>
      <Kaart className="p3-grafiekkaart">
        <span className="p3-tegel-label">Klikken per week, elke pagina vanaf zijn eigen publicatiedatum</span>
        <div className="p3-staven">{KLIKKEN.map((k, i) => <span key={i} style={{ height: `${Math.max(3, (k / max) * 100)}%` }} />)}</div>
      </Kaart>
    </div>
  )
}

/* 03 Meetmethode -------------------------------------------------------------------------------------- */

const METINGEN = [{ m: 'mei', v: 22, marge: 6 }, { m: 'jun', v: 24, marge: 5 }, { m: 'jul', v: 23, marge: 5 }, { m: 'aug', v: 27, marge: 5 }, { m: 'sep', v: 29, marge: 4 }, { m: 'okt', v: 34, marge: 4 }]

function Marge() {
  const y = (v: number) => 100 - ((v - 10) / 35) * 100
  return (
    <Kaart className="p3-breed p3-marge">
      <div className="p3-kaart-kop"><span>Genoemd in antwoorden</span><span className="p3-groot-getal">34%<span>± 4</span></span></div>
      <div className="p3-intervallen">
        {METINGEN.map((p, i) => (
          <div key={p.m} className="p3-interval">
            <span className="p3-interval-band" style={{ top: `${y(p.v + p.marge)}%`, bottom: `${100 - y(p.v - p.marge)}%` }} />
            <span className={i === METINGEN.length - 1 ? 'p3-interval-punt p3-interval-nu' : 'p3-interval-punt'} style={{ top: `${y(p.v)}%` }} />
            <span className="p3-interval-maand">{p.m}</span>
          </div>
        ))}
      </div>
    </Kaart>
  )
}

const FASEN = [
  { fase: 'Oriëntatie', vraag: 'Is een hybride warmtepomp zinvol?', gewicht: 1 },
  { fase: 'Overweging', vraag: 'Hybride of volledig elektrisch?', gewicht: 2 },
  { fase: 'Beslissing', vraag: 'Welke installateur in Tilburg?', gewicht: 3 },
]

function Weging() {
  return (
    <Kaart className="p3-breed">
      <div className="p3-kaart-kop"><span>Gewicht in het cijfer</span><span className="p3-zacht">30 vragen</span></div>
      {FASEN.map((f) => (
        <div key={f.fase} className="p3-fase">
          <span className="p3-fase-tekst"><span className="p3-sterk">{f.fase}</span><span className="p3-zacht">{f.vraag}</span></span>
          <span className="p3-gewicht">{[1, 2, 3].map((n) => <span key={n} className={n <= f.gewicht ? 'p3-gewicht-aan' : undefined} />)}</span>
        </div>
      ))}
    </Kaart>
  )
}

/* 04 Marge ------------------------------------------------------------------------------------------- */

const VERBRUIK = [{ naam: 'Fietsen Jansen', bedrag: '€ 21,40' }, { naam: 'Klimaatwerk Voorbeeld', bedrag: '€ 18,10' }, { naam: 'Studio Voorbeeld', bedrag: '€ 12,75' }, { naam: 'Bouwbedrijf Demo', bedrag: '€ 10,90' }]

function Maandlimiet() {
  return (
    <Kaart className="p3-breed">
      <div className="p3-kaart-kop"><span>AI-gebruik in oktober</span><span className="p3-zacht">maandlimiet € 150</span></div>
      <p className="p3-groot-getal p3-links">€ 63,15<span>van € 150</span></p>
      <div className="p3-meter"><span style={{ width: '42%' }} /></div>
      <div className="p3-verbruik">
        {VERBRUIK.map((v, i) => <div key={v.naam} className="p3-verbruik-rij" style={{ opacity: 1 - i * 0.18 }}><span>{v.naam}</span><span className="p3-zacht">{v.bedrag}</span></div>)}
      </div>
    </Kaart>
  )
}

function KostenVooraf() {
  return (
    <div className="p3-tooltipbeeld">
      <Kaart className="p3-tooltip">
        <p className="p3-sterk">Ongeveer € 6 aan AI-gebruik</p>
        <p className="p3-zacht">10 pagina&apos;s · € 86,85 over van je maandlimiet</p>
      </Kaart>
      <span className="p3-pijltje" />
      <Knop primair>Start de maand</Knop>
    </div>
  )
}

/* 05 Voor bureaus ------------------------------------------------------------------------------------ */

const TEAM: { naam: string; rol: 'Beheerder' | 'Kijker'; ziet: string; kort: string }[] = [
  { naam: 'Sanne de Wit', rol: 'Beheerder', ziet: 'Alle bedrijven', kort: 'SW' },
  { naam: 'Ruben Smit', rol: 'Beheerder', ziet: 'Alle bedrijven', kort: 'RS' },
  { naam: 'Fietsen Jansen', rol: 'Kijker', ziet: '1 bedrijf', kort: 'FJ' },
  { naam: 'Klimaatwerk Voorbeeld', rol: 'Kijker', ziet: '1 bedrijf', kort: 'KV' },
]

function Team() {
  return (
    <Kaart className="p3-breed">
      <div className="p3-kaart-kop"><span className="p3-sterk">Bureau Noordwind</span><span className="p3-zacht">Mensen</span></div>
      {TEAM.map((t, i) => (
        <div key={t.naam} className="p3-rij p3-rij-team" style={{ opacity: 1 - i * 0.1 }}>
          <span className="p3-initialen">{t.kort}</span>
          <span className="p3-rij-tekst">{t.naam}</span>
          <span className="p3-zacht">{t.ziet}</span>
          <span className={t.rol === 'Beheerder' ? 'p3-chip' : 'p3-chip p3-chip-rand'}>{t.rol}</span>
        </div>
      ))}
    </Kaart>
  )
}

const RECHTEN: [string, boolean][] = [['Vragen beantwoorden', true], ['Materiaal toevoegen', true], ['Gele zinnen bevestigen', true], ['Een pagina goedkeuren', false], ['Een pagina live melden', false]]

function Rechten() {
  return (
    <div className="p3-instellingen">
      <Kaart className="p3-breed">
        <div className="p3-kaart-kop"><span className="p3-sterk">Wat een kijker mag</span><span className="p3-zacht">Fietsen Jansen</span></div>
        {RECHTEN.map(([r, aan]) => <div key={r} className="p3-instelling"><span>{r}</span><Schakel aan={aan} /></div>)}
      </Kaart>
      <Kaart className="p3-breed p3-instelling-los"><span className="p3-zacht">Wat geld kost, blijft bij het bureau</span><span className="p3-slot"><Icoon naam="slot" /></span></Kaart>
    </div>
  )
}

/* 06 Schaal ------------------------------------------------------------------------------------------ */

const BEDRIJVEN: [string, boolean][] = [['Fietsen Jansen', true], ['Klimaatwerk Voorbeeld', true], ['Studio Voorbeeld', false], ['Bouwbedrijf Demo', true], ['Praktijk Voorbeeld', false]]

function BulkStart() {
  return (
    <div className="p3-bulk">
      <div className="p3-bulk-lijst">
        {BEDRIJVEN.map(([b, aan], i) => (
          <div key={b} className="p3-bulk-rij" style={{ opacity: 1 - i * 0.13 }}><span className={aan ? 'p3-vakje p3-vakje-aan' : 'p3-vakje'}>{aan && <svg viewBox="0 0 16 16"><path d="M4 8.5l2.6 2.6L12 5.5" /></svg>}</span>{b}<span className="p3-zacht">Te starten</span></div>
        ))}
      </div>
      <Kaart className="p3-actiebalk">
        <span className="p3-sterk">3 gekozen</span>
        <span className="p3-scheiding" />
        <Knop primair>Start de maand</Knop>
        <span className="p3-zacht">Maandmeting</span>
        <span className="p3-zacht">Keuze wissen</span>
      </Kaart>
    </div>
  )
}

const MELDINGEN = [
  { wat: 'Zichtbaarheid omhoog', wie: 'Fietsen Jansen · 34% ± 4', wanneer: '2 min', nieuw: true },
  { wat: 'Pagina staat live', wie: 'Klimaatwerk Voorbeeld', wanneer: '1 uur', nieuw: true },
  { wat: 'Vraag beantwoord', wie: 'Studio Voorbeeld · via de deellink', wanneer: '3 uur' },
  { wat: 'Meting klaar', wie: 'Bouwbedrijf Demo', wanneer: 'gisteren' },
]

function Meldingen() {
  return (
    <Kaart stapel className="p3-breed">
      <div className="p3-kaart-kop"><span className="p3-sterk"><Icoon naam="bel" />Meldingen</span><span className="p3-zacht">2 nieuw</span></div>
      {MELDINGEN.map((m, i) => (
        <div key={m.wat} className="p3-melding" style={{ opacity: 1 - i * 0.17 }}>
          <Stip aan={!!m.nieuw} />
          <span className="p3-rij-tekst"><span className="p3-sterk">{m.wat}</span><span className="p3-zacht">{m.wie}</span></span>
          <span className="p3-zacht">{m.wanneer}</span>
        </div>
      ))}
    </Kaart>
  )
}

/* 07 Inzicht ----------------------------------------------------------------------------------------- */

function Bronnen() {
  return (
    <div className="p3-bronnen">
      <div className="p3-bron-kolom">
        <Kaart className="p3-bron"><Icoon naam="link" /><span className="p3-afkap">vergelijkwarmte.example</span></Kaart>
        <Kaart className="p3-bron"><Icoon naam="link" /><span className="p3-afkap">woonforum.example</span></Kaart>
      </div>
      <svg className="p3-lijnen" viewBox="0 0 100 200" preserveAspectRatio="none">
        <path d="M0 62 C 50 62, 50 30, 100 30" /><path d="M0 62 C 50 62, 50 100, 100 100" />
        <path d="M0 138 C 50 138, 50 100, 100 100" /><path d="M0 138 C 50 138, 50 170, 100 170" className="p3-lijn-mis" />
      </svg>
      <div className="p3-bron-kolom p3-merken">
        <Kaart className="p3-merk"><Vink /><span className="p3-afkap">Warmtepomp Demo</span></Kaart>
        <Kaart className="p3-merk"><Vink /><span className="p3-afkap">Installatiecentrum Voorbeeld</span></Kaart>
        <Kaart className="p3-merk p3-merk-mis"><Ring /><span className="p3-afkap">Klimaatwerk Voorbeeld</span><span className="p3-zacht">ontbreekt</span></Kaart>
      </div>
    </div>
  )
}

const EIGENSCHAPPEN = [{ naam: 'Advies aan huis', n: 7 }, { naam: 'Vaste prijs vooraf', n: 5 }, { naam: 'Snel geplaatst', n: 4 }, { naam: 'Eigen monteurs', n: 2 }]

function Eigenschappen() {
  return (
    <Kaart className="p3-breed">
      <div className="p3-kaart-kop"><span className="p3-sterk">Warmtepomp Demo</span><span className="p3-zacht">Wat AI toeschrijft</span></div>
      {EIGENSCHAPPEN.map((e, i) => (
        <div key={e.naam} className="p3-eigenschap" style={{ opacity: 1 - i * 0.14 }}>
          <span>{e.naam}</span>
          <span className="p3-balkje"><span style={{ width: `${e.n * 10}%` }} /></span>
          <span className="p3-zacht">{e.n} van 10</span>
        </div>
      ))}
    </Kaart>
  )
}

/* 08 Vermeldingen ------------------------------------------------------------------------------------ */

const VERMELDINGEN = [
  { site: 'vergelijkwarmte.example', soort: 'Vermelding aanvragen', status: 'Geplaatst', datum: 'Gecontroleerd 18 okt', klaar: true },
  { site: 'woonforum.example', soort: 'Vermelding aanvragen', status: 'Benaderd', datum: 'Opvolgen 28 okt' },
  { site: 'bedrijvengids.example', soort: 'Correctie vragen', status: 'Te doen', datum: 'Opvolgen 4 nov' },
]

function Vermeldingen() {
  return (
    <Kaart className="p3-lijst-rechts">
      <div className="p3-kaart-kop"><span className="p3-sterk">Vermeldingen</span><span className="p3-zacht">Klimaatwerk Voorbeeld</span></div>
      {VERMELDINGEN.map((v, i) => (
        <div key={v.site} className="p3-vermelding" style={{ opacity: 1 - i * 0.12 }}>
          {v.klaar ? <Vink /> : <Ring half={v.status === 'Benaderd'} />}
          <span className="p3-rij-tekst"><span className="p3-sterk">{v.site}</span><span className="p3-zacht">{v.soort}</span></span>
          <span className={v.klaar ? 'p3-chip p3-chip-accent' : 'p3-chip'}>{v.status}</span>
          <span className="p3-zacht p3-nowrap">{v.datum}</span>
        </div>
      ))}
    </Kaart>
  )
}

function Concept() {
  return (
    <Kaart stapel className="p3-smal p3-concept">
      <p className="p3-mini">Conceptbericht · woonforum.example</p>
      <p className="p3-concept-tekst">Beste redactie, in jullie overzicht van installateurs rond Tilburg ontbreekt Klimaatwerk Voorbeeld. Het bedrijf installeert hybride warmtepompen in Tilburg, Goirle en Oisterwijk<span className="p3-cursor" /></p>
      <div className="p3-knoppen"><span className="p3-zacht">Orbit verstuurt zelf niets</span><Knop primair><Icoon naam="kopieer" />Kopieer</Knop></div>
    </Kaart>
  )
}

/* 09 Techniek ---------------------------------------------------------------------------------------- */

function BotZicht() {
  return (
    <div className="p3-bot">
      <Kaart className="p3-bot-kaart">
        <p className="p3-mini">In de browser</p>
        <span className="p3-regel p3-regel-kop" /><span className="p3-regel" /><span className="p3-regel p3-regel-kort" />
        <span className="p3-blok">Prijzen en voorwaarden</span>
        <span className="p3-regel" /><span className="p3-regel p3-regel-kort" />
      </Kaart>
      <Kaart className="p3-bot-kaart p3-bot-ai">
        <p className="p3-mini p3-mini-accent">Zoals de zoekbot van ChatGPT het ziet</p>
        <span className="p3-regel p3-regel-kop" /><span className="p3-regel" /><span className="p3-regel p3-regel-kort" />
        <span className="p3-blok p3-blok-mist">Verschijnt pas met JavaScript</span>
        <span className="p3-regel" /><span className="p3-regel p3-regel-kort" />
      </Kaart>
    </div>
  )
}

const TAKEN = [
  { taak: 'Prijzen verschijnen alleen met JavaScript', wie: 'Webbouwer', paginas: '12 pagina\'s' },
  { taak: 'Server weigert de zoekbot van ChatGPT', wie: 'Webbouwer', paginas: 'hele site' },
  { taak: 'Kapotte link naar de contactpagina', wie: 'Bureau', paginas: '3 pagina\'s' },
  { taak: 'Pagina mag niet gevonden worden', wie: 'Webbouwer', paginas: 'Opgelost 12 okt', klaar: true },
]

function Takenlijst() {
  return (
    <Kaart className="p3-lijst-rechts">
      <div className="p3-kaart-kop"><span className="p3-sterk">Technische controle</span><span className="p3-zacht">250 pagina&apos;s gelezen</span></div>
      {TAKEN.map((t, i) => (
        <div key={t.taak} className="p3-taak" style={{ opacity: 1 - i * 0.1 }}>
          {t.klaar ? <Vink /> : <Ring />}
          <span className="p3-rij-tekst"><span className={t.klaar ? 'p3-zacht' : 'p3-sterk'}>{t.taak}</span></span>
          <span className="p3-chip p3-chip-rand">{t.wie}</span>
          <span className={t.klaar ? 'p3-accent p3-nowrap' : 'p3-zacht p3-nowrap'}>{t.paginas}</span>
        </div>
      ))}
    </Kaart>
  )
}

/* 10 Zorgeloos --------------------------------------------------------------------------------------- */

const ACHTERGROND = [
  { wat: 'Onderzoek', wie: 'Praktijk Voorbeeld', stand: 'Klaar', klaar: true },
  { wat: 'Meting', wie: 'Klimaatwerk Voorbeeld', stand: '18 van 30 vragen', bezig: true },
  { wat: 'Schrijven', wie: 'Lease voor ondernemers', stand: 'Bezig', bezig: true },
  { wat: 'Maandverslag', wie: 'Fietsen Jansen', stand: 'Wacht op 1 november' },
  { wat: 'Hermeting', wie: 'Accu van je e-bike vervangen', stand: 'Wacht op 3 november' },
]

function Achtergrond() {
  return (
    <div className="p3-achtergrond">
      {ACHTERGROND.map((a, i) => (
        <div key={a.wat} className="p3-taakpil" style={{ opacity: 1 - i * 0.15, marginLeft: `${[40, 0, 24, 64, 16][i]}px` }}>
          {a.klaar ? <Vink /> : <Ring half={a.bezig} />}
          <span className="p3-sterk">{a.wat}</span>
          <span className="p3-zacht">{a.wie}</span>
          <span className={a.bezig ? 'p3-chip p3-chip-accent' : 'p3-chip'}>{a.stand}</span>
        </div>
      ))}
    </div>
  )
}

function Uitleg() {
  return (
    <div className="p3-uitlegbeeld">
      <span className="p3-vraagteken">?</span>
      <Kaart className="p3-smal p3-uitleg">
        <p className="p3-kaart-titel">Contentplan</p>
        {[['Wat zie je', 'Wat er deze maand en volgende maand geschreven wordt.'], ['Wat kun je doen', 'Pagina-ideeën in een maand zetten en de maand starten.'], ['Waarom werkt het zo', 'Het plan is de brug tussen meten en wat er live komt.'], ['Begrippen', 'Contentplan · Pagina-idee · Maand starten']].map(([k, t], i) => (
          <div key={k} className="p3-uitleg-blok" style={{ opacity: 1 - i * 0.15 }}><span className="p3-mini">{k}</span><span>{t}</span></div>
        ))}
      </Kaart>
    </div>
  )
}

/* De pagina ------------------------------------------------------------------------------------------ */

const CELLEN: { beelden: [React.ReactNode, React.ReactNode]; samenvattingen: [string, string] }[] = [
  { beelden: [<Claims key="a" />, <Goedkeuren key="b" />], samenvattingen: ['Vier harde claims in een tekst: een bedrag, een termijn en een keurmerk zijn bevestigd; de garantie van vijf jaar wacht op bevestiging.', 'De knop goedkeuren staat uit zolang één zin op bevestiging wacht. Ernaast de knop vraag het bedrijf.'] },
  { beelden: [<Ladder key="a" />, <Opbrengst key="b" />], samenvattingen: ['De bewijsladder met zeven tredes van gepubliceerd tot omzet. Deze pagina staat op trede vier: zichtbaar in Google.', '214 klikken van de pagina\'s die Orbit schreef, negen pagina\'s live, en een grafiek met klikken per week.'] },
  { beelden: [<Marge key="a" />, <Weging key="b" />], samenvattingen: ['Zes maandmetingen van mei tot oktober, elk met een marge. In oktober 34 procent, plus of min 4.', 'Dertig vragen over drie fasen van de klantreis. Beslissingsvragen wegen het zwaarst, oriëntatievragen het minst.'] },
  { beelden: [<Maandlimiet key="a" />, <KostenVooraf key="b" />], samenvattingen: ['AI-gebruik in oktober: 63 euro van een maandlimiet van 150 euro, met het verbruik per klant.', 'Boven de knop start de maand: ongeveer 6 euro aan AI-gebruik voor tien pagina\'s, en wat er van de maandlimiet over is.'] },
  { beelden: [<Team key="a" />, <Rechten key="b" />], samenvattingen: ['De mensen van Bureau Noordwind: twee beheerders die alle bedrijven zien, en twee kijkers die elk één bedrijf zien.', 'Wat een kijker mag bij Fietsen Jansen: vragen beantwoorden, materiaal toevoegen en gele zinnen bevestigen staan aan; goedkeuren en live melden staan uit. Wat geld kost, blijft bij het bureau.'] },
  { beelden: [<BulkStart key="a" />, <Meldingen key="b" />], samenvattingen: ['Drie van vijf bedrijven aangevinkt, met een balk om voor allemaal tegelijk de maand te starten.', 'Meldingen van alle bedrijven: zichtbaarheid omhoog, een pagina live, een vraag beantwoord en een meting klaar.'] },
  { beelden: [<Bronnen key="a" />, <Eigenschappen key="b" />], samenvattingen: ['Twee websites die AI aanhaalt, met lijnen naar de concurrenten die via die bronnen genoemd worden. Klimaatwerk Voorbeeld ontbreekt.', 'Wat AI aan Warmtepomp Demo toeschrijft: advies aan huis in 7 van 10 antwoorden, vaste prijs vooraf in 5, snel geplaatst in 4.'] },
  { beelden: [<Vermeldingen key="a" />, <Concept key="b" />], samenvattingen: ['Drie vermeldingen met status en opvolgdatum: een geplaatst en gecontroleerd, een benaderd, een correctie nog te doen.', 'Een conceptbericht aan een redactie over Klimaatwerk Voorbeeld, met een knop om het te kopiëren. Orbit verstuurt zelf niets.'] },
  { beelden: [<BotZicht key="a" />, <Takenlijst key="b" />], samenvattingen: ['Dezelfde pagina twee keer: in de browser staan prijzen en voorwaarden, voor de zoekbot van ChatGPT ontbreekt dat blok omdat het pas met JavaScript verschijnt.', 'Een takenlijst van de technische controle met per probleem wie het oplost en op welke pagina\'s. Een punt is opgelost op 12 oktober.'] },
  { beelden: [<Achtergrond key="a" />, <Uitleg key="b" />], samenvattingen: ['Werk dat op de achtergrond loopt: een onderzoek klaar, een meting en een tekst bezig, een maandverslag en een hermeting gepland.', 'De uitleg achter het vraagteken van het contentplan: wat zie je, wat kun je doen, waarom werkt het zo, en de begrippen.'] },
]

function UspSectie({ u, i }: { u: Usp; i: number }) {
  const { beelden, samenvattingen } = CELLEN[i]
  const id = `p3-usp-${i + 1}`
  return (
    <section className="lf-sectie p3-sectie" aria-labelledby={id}>
      <div className="container">
        <div className="lf-intro p3-intro">
          <div><p className="lf-label">{u.label}</p><h2 id={id}>{u.titel}</h2></div>
          <p className="lf-intro-tekst">{u.intro}</p>
        </div>
        <div className="p3-raster">
          {u.cellen.map((c, k) => <Cel key={c.titel} titel={c.titel} tekst={c.tekst} samenvatting={samenvattingen[k]}>{beelden[k]}</Cel>)}
        </div>
        <p className="lf-mono p3-demo">{DEMO}</p>
      </div>
    </section>
  )
}

export function Pagina3() {
  return (
    <div className="p3">
      <section className="p3-start" aria-labelledby="p3-titel">
        <div className="container">
          <p className="lf-mono p2-pagina-label">Pagina 3 · Tien voordelen, twintig beelden</p>
          <h2 id="p3-titel" className="p2-hero-titel">{pagina3.kop}</h2>
          <p className="hg-hero-intro">{pagina3.intro}</p>
        </div>
      </section>
      {pagina3.usps.map((u, i) => <UspSectie key={u.label} u={u} i={i} />)}
    </div>
  )
}
