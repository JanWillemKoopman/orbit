// De tien beelden van de zesde testhomepage (/homepage6). Elk beeld is een echt scherm van ORBIT ENGINE,
// vereenvoudigd en in lagen gezet zoals linear.app zijn product toont: een venster met zijbalk dat over de
// rand van het vlak loopt, en een zwevende kaart die het belangrijkste moment uitlicht. De zijbalk volgt de
// hoofdstukken van de app (lib/nav.ts in ORBIT ENGINE). Alle namen en getallen zijn voorbeelddata van
// verzonnen bedrijven.
import { LogoMark } from '@/components/Logo'
import { MerkIcoon } from '@/components/homepage1/Visuals'

const KLANT = 'Brouwer Kozijnen'
const BUREAU = 'Bureau Kade'

/* Iconen ------------------------------------------------------------------ */

const PADEN = {
  overzicht: 'M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z',
  plan: 'M2.5 3.5h11v10h-11zM2.5 6.5h11M5.5 2v3M10.5 2v3',
  vragen: 'M3 3.5h10v7H7l-3 2.5v-2.5H3z',
  bibliotheek: 'M4 2.5h6l2.5 2.5v8.5H4zM6 7.5h4.5M6 10h4.5',
  zichtbaarheid: 'M2.5 13.5V9M6.5 13.5V6M10.5 13.5V8M14 13.5V3.5',
  zoekverkeer: 'M2 11.5l3.5-3.5 3 2.5L14 4.5',
  profiel: 'M8 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 13.5c.6-2.6 2.6-4 5-4s4.4 1.4 5 4',
  reputatie: 'M8 2.5l1.7 3.5 3.8.5-2.8 2.6.7 3.8L8 11.1l-3.4 1.8.7-3.8-2.8-2.6 3.8-.5z',
  bronnen: 'M6.5 9.5l3-3M5 7.5L3.5 9a2.5 2.5 0 0 0 3.5 3.5L8.5 11M11 8.5L12.5 7A2.5 2.5 0 0 0 9 3.5L7.5 5',
  feiten: 'M8 2.5l5 2v4c0 2.8-2.2 4.4-5 5-2.8-.6-5-2.2-5-5v-4zM5.8 8l1.5 1.5 3-3',
  vermeldingen: 'M3 6.5v3h2l4 3v-9l-4 3zM11.5 6a2.5 2.5 0 0 1 0 4',
  bel: 'M4 11V7.5a4 4 0 0 1 8 0V11l1 1.5H3zM6.5 13.5a1.5 1.5 0 0 0 3 0',
  vink: 'M3.5 8.5l3 3 6-7',
  kruis: 'M4.5 4.5l7 7m0-7l-7 7',
  link: 'M6.5 9.5l3-3M5 7.5L3.5 9a2.5 2.5 0 0 0 3.5 3.5L8.5 11M11 8.5L12.5 7A2.5 2.5 0 0 0 9 3.5L7.5 5',
  pijl: 'M3 8h10m-4-4 4 4-4 4',
  zoek: 'M7 11.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM10.5 10.5l3 3',
  pdf: 'M4 2.5h6l2.5 2.5v8.5H4zM10 2.5V5h2.5',
} as const
type IcoonNaam = keyof typeof PADEN

function Icoon({ naam, className = 'hp6-ico' }: { naam: IcoonNaam; className?: string }) {
  return <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PADEN[naam]} /></svg>
}

/* Het app-venster --------------------------------------------------------- */

const MENU: { kop: string; items: { naam: string; icoon: IcoonNaam; aantal?: number }[] }[] = [
  { kop: 'Overzicht', items: [{ naam: 'Overzicht', icoon: 'overzicht' }] },
  { kop: 'Strategie', items: [{ naam: 'Contentplan', icoon: 'plan' }, { naam: 'Openstaande vragen', icoon: 'vragen', aantal: 3 }, { naam: 'Bibliotheek', icoon: 'bibliotheek' }] },
  { kop: 'Resultaten', items: [{ naam: 'Zichtbaarheid in AI', icoon: 'zichtbaarheid' }, { naam: 'Zoekverkeer', icoon: 'zoekverkeer' }] },
  { kop: 'Mijn bedrijf', items: [{ naam: 'Bedrijfsprofiel', icoon: 'profiel' }] },
  { kop: 'Tools', items: [{ naam: 'Reputatie', icoon: 'reputatie' }, { naam: 'Bronnen', icoon: 'bronnen' }, { naam: 'Feitencontrole', icoon: 'feiten' }, { naam: 'Vermeldingen', icoon: 'vermeldingen' }] },
]

function Zijbalk({ actief }: { actief: string }) {
  return (
    <aside className="hp6-zij">
      <div className="hp6-werkruimte"><span className="hp6-bol"><LogoMark size={10} /></span>{BUREAU}</div>
      <div className="hp6-merkkeuze"><span className="hp6-avatar">BK</span>{KLANT}</div>
      {MENU.map((h) => (
        <div key={h.kop} className="hp6-hoofdstuk">
          <span className="hp6-hoofdstuk-kop">{h.kop}</span>
          {h.items.map((i) => (
            <span key={i.naam} className={i.naam === actief ? 'hp6-nav hp6-nav-aan' : 'hp6-nav'}>
              <Icoon naam={i.icoon} />{i.naam}{i.aantal && <span className="hp6-aantal">{i.aantal}</span>}
            </span>
          ))}
        </div>
      ))}
    </aside>
  )
}

function Venster({ pad, actief, zijbalk = true, className = '', children }: { pad: string[]; actief?: string; zijbalk?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={`hp6-app ${zijbalk ? '' : 'hp6-app-kaal'} ${className}`}>
      {zijbalk && <Zijbalk actief={actief ?? ''} />}
      <div className="hp6-werkblad">
        <div className="hp6-balk">
          {pad.map((p, i) => <span key={p} className={i === pad.length - 1 ? 'hp6-pad-nu' : 'hp6-pad'}>{p}</span>)}
          <span className="hp6-balk-rechts"><Icoon naam="zoek" /><Icoon naam="bel" /></span>
        </div>
        <div className="hp6-inhoud">{children}</div>
      </div>
    </div>
  )
}

function Zweef({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`hp6-zweef ${className}`}>{children}</div>
}

function Chip({ children, toon }: { children: React.ReactNode; toon?: 'accent' | 'groen' | 'geel' | 'rood' }) {
  return <span className={toon ? `hp6-chip hp6-chip-${toon}` : 'hp6-chip'}>{children}</span>
}

/** Een lijn door punten op een vlak van 0 tot 100 breed en 0 tot 40 hoog. */
function lijnPad(waarden: number[], max: number, h = 40) {
  return waarden.map((w, i) => `${i ? 'L' : 'M'}${((i / (waarden.length - 1)) * 100).toFixed(1)} ${(h - (w / max) * h).toFixed(1)}`).join(' ')
}

/* 1. Meten ---------------------------------------------------------------- */

function Meten() {
  const cijfers = [12, 15, 19, 22, 27, 31]
  const marge = [7, 7, 6, 6, 6, 6]
  const boven = cijfers.map((c, i) => c + marge[i])
  const onder = cijfers.map((c, i) => c - marge[i])
  // De band loopt heen over de bovenkant van de marge en terug over de onderkant.
  const terug = [...onder].reverse().map((w, i) => `L${(100 - (i / (onder.length - 1)) * 100).toFixed(1)} ${(40 - (w / 45) * 40).toFixed(1)}`)
  const bandPad = `${lijnPad(boven, 45)} ${terug.join(' ')} Z`
  return (
    <>
      <Venster pad={[KLANT, 'Resultaten', 'Zichtbaarheid in AI']} actief="Zichtbaarheid in AI">
        <div className="hp6-kop-rij"><h4>Zichtbaarheid in AI</h4><span className="hp6-segment"><span className="hp6-segment-aan">Kunststof kozijnen</span><span>Voordeuren</span></span></div>
        <div className="hp6-kaart">
          <div className="hp6-kpi-rij">
            <div><span className="hp6-mono">Zichtbaarheid</span><span className="hp6-kpi">31%<em>± 6</em></span><Chip toon="groen">+19 sinds juni</Chip></div>
            <div><span className="hp6-mono">Gewogen</span><span className="hp6-kpi hp6-kpi-klein">27%</span></div>
            <div><span className="hp6-mono">Gemiddelde plek</span><span className="hp6-kpi hp6-kpi-klein">2,4</span></div>
          </div>
          <svg className="hp6-grafiek" viewBox="0 -4 100 48" preserveAspectRatio="none" aria-hidden="true">
            {[0, 10, 20, 30, 40].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} className="hp6-raster" />)}
            <path d={bandPad} className="hp6-band" />
            <path d={lijnPad(cijfers, 45)} className="hp6-lijn-accent" />
          </svg>
          <div className="hp6-as">{['jun', 'jul', 'aug', 'sep', 'okt', 'nov'].map((m) => <span key={m}>{m}</span>)}</div>
        </div>
        <div className="hp6-kanalen">
          {[{ m: 'chatgpt' as const, n: 'ChatGPT', p: 31 }, { m: 'gemini' as const, n: 'Gemini', p: 24 }, { m: 'google' as const, n: 'AI-overzicht', p: 18 }].map((k) => (
            <div key={k.n} className="hp6-kaart hp6-kanaal"><span className="hp6-kanaal-naam"><MerkIcoon merk={k.m} size={11} />{k.n}</span><span className="hp6-kpi hp6-kpi-klein">{k.p}%</span><span className="hp6-baan"><span style={{ width: `${k.p * 2}%` }} /></span></div>
          ))}
        </div>
      </Venster>
      <Zweef className="hp6-zweef-rechtsonder hp6-antwoord">
        <div className="hp6-zweef-kop"><MerkIcoon merk="chatgpt" size={12} /><span>Welk bedrijf voor kunststof kozijnen in Haarlem?</span></div>
        <p>Voor kunststof kozijnen in Haarlem zijn dit sterke keuzes:</p>
        <ol>
          <li><b>Kozijnwerk Noord</b>, ruime keuze en eigen montage.</li>
          <li><b className="hp6-gemarkeerd">{KLANT}</b>, bekend om onderhoudsarme kozijnen en snelle levering.</li>
          <li><b>Van Dijk Ramen</b>, vooral voor renovatie.</li>
        </ol>
        <div className="hp6-bronnen-rij"><span className="hp6-mono">Bronnen</span><Chip>werkspot.nl</Chip><Chip toon="accent">brouwerkozijnen.nl</Chip></div>
      </Zweef>
    </>
  )
}

/* 2. Begrijpen ------------------------------------------------------------ */

function Begrijpen() {
  const takken = [
    { groep: 'Kozijnen', items: [{ n: 'Kunststof kozijnen', url: '/kunststof-kozijnen' }, { n: 'Houten kozijnen', url: '/hout' }, { n: 'Aluminium kozijnen' }] },
    { groep: 'Deuren', items: [{ n: 'Voordeuren', url: '/voordeuren' }, { n: 'Schuifpuien' }] },
  ]
  return (
    <>
      <Venster pad={[KLANT, 'Mijn bedrijf', 'Bedrijfsprofiel']} actief="Bedrijfsprofiel">
        <div className="hp6-kop-rij"><h4>Bedrijfsprofiel</h4><span className="hp6-tabs"><span className="hp6-tab-aan">Aanbod</span><span>Feiten en kennis</span><span>Concurrenten</span><span>Toon</span></span></div>
        <div className="hp6-twee">
          <div className="hp6-kaart hp6-boom">
            <span className="hp6-mono">Aanbodboom</span>
            {takken.map((t) => (
              <div key={t.groep} className="hp6-tak">
                <span className="hp6-tak-kop">{t.groep}</span>
                {t.items.map((i) => (
                  <div key={i.n} className="hp6-blad">
                    <span className={i.url ? 'hp6-stip-dicht' : 'hp6-stip-open'} />
                    <span className="hp6-blad-naam">{i.n}</span>
                    {i.url ? <span className="hp6-url">{i.url}</span> : <Chip toon="accent">Geen pagina</Chip>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="hp6-kaart hp6-kennis">
            <span className="hp6-mono">Feiten en kennis</span>
            {[
              { f: 'Garantie op montage', w: '10 jaar', b: 'Website, pagina Garantie' },
              { f: 'Werkgebied', w: 'Haarlem en omstreken', b: 'Website, pagina Contact' },
              { f: 'Levertijd', w: '6 weken', b: 'Tarievenlijst 2026' },
              { f: 'Opgericht', w: '1998', b: 'Vermoeden', vermoeden: true },
            ].map((k) => (
              <div key={k.f} className="hp6-feit">
                <span className="hp6-feit-naam">{k.f}</span>
                <span className="hp6-feit-waarde">{k.w}</span>
                <span className={k.vermoeden ? 'hp6-bron hp6-bron-vermoeden' : 'hp6-bron'}>{k.b}</span>
              </div>
            ))}
          </div>
        </div>
      </Venster>
      <Zweef className="hp6-zweef-linksonder hp6-checklist">
        <div className="hp6-zweef-kop"><span>Dit bedrijf inrichten</span><span className="hp6-mono">3 van 5</span></div>
        <span className="hp6-voortgang"><span style={{ width: '60%' }} /></span>
        {[
          { n: 'Onderzoek naar het bedrijf', klaar: true, sub: "1000 pagina's gelezen" },
          { n: 'Aanbod nalopen', klaar: true },
          { n: 'Eerste onderwerp kiezen', klaar: true },
          { n: 'Klant onboarding', klaar: false, nu: true },
          { n: 'Search Console koppelen', klaar: false },
        ].map((s) => (
          <div key={s.n} className={s.nu ? 'hp6-stap hp6-stap-nu' : 'hp6-stap'}>
            <span className={s.klaar ? 'hp6-vinkje hp6-vinkje-aan' : 'hp6-vinkje'}>{s.klaar && <Icoon naam="vink" />}</span>
            <span className="hp6-stap-naam">{s.n}{s.sub && <em>{s.sub}</em>}</span>
          </div>
        ))}
      </Zweef>
    </>
  )
}

/* 3. Plannen -------------------------------------------------------------- */

function Plannen() {
  const maanden = [
    { m: 'November', p: [{ t: 'Kunststof kozijnen in Haarlem', s: 'Dienstpagina', aan: true }, { t: 'Wat kost een kunststof kozijn?', s: 'Artikel' }, { t: 'Hout of kunststof?', s: 'Vergelijking' }] },
    { m: 'December', p: [{ t: 'Kozijnen vervangen, stap voor stap', s: 'Gids' }, { t: 'Veelgestelde vragen over voordeuren', s: 'Veelgestelde vragen' }, { t: 'Schuifpuien', s: 'Dienstpagina' }] },
    { m: 'Januari', p: [{ t: 'Aluminium kozijnen', s: 'Dienstpagina' }, { t: 'Isolatie en HR++ glas', s: 'Artikel' }, { t: 'Onderhoud van kozijnen', s: 'Gids' }] },
  ]
  return (
    <>
      <Venster pad={[KLANT, 'Strategie', 'Contentplan']} actief="Contentplan">
        <div className="hp6-kop-rij"><h4>Contentplan</h4><span className="hp6-segment"><span>Overzicht</span><span className="hp6-segment-aan">Planbord</span><span>Jaarkalender</span></span></div>
        <div className="hp6-planbord">
          {maanden.map((m) => (
            <div key={m.m} className="hp6-kolom">
              <div className="hp6-kolom-kop"><span>{m.m}</span><span className="hp6-mono">10 pagina&apos;s</span></div>
              {m.p.map((p) => (
                <div key={p.t} className={p.aan ? 'hp6-plankaart hp6-plankaart-aan' : 'hp6-plankaart'}>
                  <span>{p.t}</span>
                  <Chip>{p.s}</Chip>
                </div>
              ))}
              <div className="hp6-plankaart hp6-plankaart-reserve"><span>Reservepagina</span></div>
            </div>
          ))}
        </div>
      </Venster>
      <Zweef className="hp6-zweef-rechtsonder hp6-kans">
        <div className="hp6-zweef-kop"><span>Kunststof kozijnen in Haarlem</span><Chip toon="accent">Potentie 82/100</Chip></div>
        <div className="hp6-kans-cijfers">
          <div><span className="hp6-kpi hp6-kpi-klein">1<em>/8</em></span><span className="hp6-mono">vragen genoemd</span></div>
          <div><span className="hp6-kpi hp6-kpi-klein">3</span><span className="hp6-mono">concurrenten wel</span></div>
          <div><span className="hp6-kpi hp6-kpi-klein">1.240</span><span className="hp6-mono">vertoningen</span></div>
        </div>
        <div className="hp6-stippen">{Array.from({ length: 8 }, (_, i) => <span key={i} className={i === 0 ? 'hp6-stip-accent' : ''} />)}</div>
        <p className="hp6-waarom">Kozijnwerk Noord en Van Dijk Ramen worden genoemd bij prijsvragen. De eigen site wordt niet aangehaald.</p>
      </Zweef>
    </>
  )
}

/* 4. Schrijven ------------------------------------------------------------ */

function Schrijven() {
  return (
    <>
      <Venster pad={[KLANT, 'Bibliotheek', 'Kunststof kozijnen in Haarlem']} actief="Bibliotheek">
        <div className="hp6-standbalk">
          {['Plan', 'Brief', 'Vragen', 'Schrijven', 'Nalopen', 'Live', 'Effect'].map((s, i) => <span key={s} className={i < 4 ? 'hp6-stand-klaar' : i === 4 ? 'hp6-stand-nu' : ''}><i />{s}</span>)}
        </div>
        <div className="hp6-editor">
          <div className="hp6-document">
            <span className="hp6-mono">Dienstpagina</span>
            <h5>Kunststof kozijnen in Haarlem</h5>
            <p>Kunststof kozijnen zijn onderhoudsarm, isoleren goed en gaan lang mee. {KLANT} meet in heel Haarlem en omstreken in, en plaatst met een eigen montageploeg.</p>
            <p><span className="hp6-geel">Op elk kozijn krijgt u 15 jaar garantie.</span> De levertijd is ongeveer zes weken na de inmeting.</p>
            <span className="hp6-regel" style={{ width: '92%' }} /><span className="hp6-regel" style={{ width: '84%' }} /><span className="hp6-regel" style={{ width: '60%' }} />
          </div>
          <div className="hp6-paneel">
            <span className="hp6-mono">Wat Orbit nog ziet</span>
            <div className="hp6-paneel-item"><span className="hp6-dot-geel" />1 zin zonder bron</div>
            <div className="hp6-paneel-item"><span className="hp6-dot-groen" />Geen namen van concurrenten</div>
            <div className="hp6-paneel-item"><span className="hp6-dot-groen" />Metatitel, FAQ en JSON-LD</div>
            <span className="hp6-knop hp6-knop-uit">Keur goed</span>
          </div>
        </div>
      </Venster>
      <Zweef className="hp6-zweef-midden hp6-gele-kaart">
        <div className="hp6-zweef-kop"><span className="hp6-dot-geel" /><span>Loop deze zin na</span></div>
        <p className="hp6-citaat">&ldquo;Op elk kozijn krijgt u 15 jaar garantie.&rdquo;</p>
        <p className="hp6-reden">In de kennis staat 10 jaar garantie op montage. Voor 15 jaar is geen bron.</p>
        <div className="hp6-knoppen"><span className="hp6-knop">Bevestig</span><span className="hp6-knop hp6-knop-licht">Vraag het bedrijf</span></div>
      </Zweef>
    </>
  )
}

/* 5. Aanleveren ----------------------------------------------------------- */

function Aanleveren() {
  const vragen = [
    { v: 'Wat kost een kunststof kozijn gemiddeld, inclusief montage?', p: 'Kunststof kozijnen in Haarlem', klaar: true },
    { v: 'Hoe lang duurt de levering na de inmeting?', p: 'Kunststof kozijnen in Haarlem' },
    { v: 'Werken jullie met een eigen montageploeg?', p: 'Kozijnen vervangen' },
  ]
  return (
    <>
      <Venster pad={[KLANT, 'Strategie', 'Openstaande vragen']} actief="Openstaande vragen">
        <div className="hp6-kop-rij hp6-kop-links"><h4>Openstaande vragen</h4><span className="hp6-knop hp6-knop-licht"><Icoon naam="link" />Deellink kopiëren</span></div>
        <div className="hp6-kaart hp6-lijst">
          {vragen.map((q) => (
            <div key={q.v} className="hp6-lijst-rij">
              <span className={q.klaar ? 'hp6-vinkje hp6-vinkje-aan' : 'hp6-vinkje'}>{q.klaar && <Icoon naam="vink" />}</span>
              <span className="hp6-lijst-tekst"><span className={q.klaar ? 'hp6-gedaan' : ''}>{q.v}</span><em>{q.p}</em></span>
              {q.klaar ? <Chip toon="groen">Beantwoord</Chip> : <Chip>Open</Chip>}
            </div>
          ))}
        </div>
        <div className="hp6-kaart hp6-herinnering"><span className="hp6-mono">Herinnering</span><p>Graag uiterlijk vrijdag 14 november. Het schrijven begint zodra de laatste vraag beantwoord is.</p></div>
      </Venster>
      <div className="hp6-telefoon">
        <span className="hp6-telefoon-notch" />
        <span className="hp6-tel-bureau"><LogoMark size={9} />{BUREAU} via Orbit</span>
        <p className="hp6-tel-titel">3 vragen over je nieuwe pagina&apos;s</p>
        <div className="hp6-tel-vraag hp6-tel-vraag-klaar"><span className="hp6-vinkje hp6-vinkje-aan"><Icoon naam="vink" /></span><span>Wat kost een kunststof kozijn gemiddeld?</span></div>
        <div className="hp6-tel-vraag hp6-tel-vraag-open">
          <span>Hoe lang duurt de levering na de inmeting?</span>
          <span className="hp6-tel-veld">Meestal vijf tot zes weken<i /></span>
          <span className="hp6-knop">Versturen</span>
        </div>
        <div className="hp6-tel-vraag"><span>Werken jullie met een eigen montageploeg?</span></div>
        <span className="hp6-tel-voet">Geen account nodig</span>
      </div>
    </>
  )
}

/* 6. Bewijzen ------------------------------------------------------------- */

function Bewijzen() {
  const klikken = [3, 4, 3, 5, 4, 3, 4, 5, 4, 3, 4, 4, 5, 4, 6, 8, 7, 9, 11, 10, 12, 14, 13, 15, 17, 16, 18, 17, 20, 19, 21, 23, 22, 24, 23, 26]
  const tredes = [
    { n: 'Gepubliceerd en gecontroleerd', s: 'bewezen' },
    { n: 'Zichtbaar in Google', s: 'bewezen' },
    { n: 'Genoemd door AI', s: 'bewezen' },
    { n: 'Geciteerd door AI', s: 'bewezen' },
    { n: 'Verkeer', s: 'te weinig' },
    { n: 'Conversie', s: 'geen' },
    { n: 'Omzet', s: 'geen' },
  ]
  return (
    <>
      <Venster pad={[KLANT, 'Bibliotheek', 'Kunststof kozijnen in Haarlem']} actief="Bibliotheek">
        <div className="hp6-kop-rij"><h4>Effect van deze pagina</h4><Chip toon="groen">Staat live</Chip></div>
        <div className="hp6-effect-rij">
          {[{ d: 'Vóór publicatie', n: 1 }, { d: 'Na 14 dagen', n: 3 }, { d: 'Na 28 dagen', n: 5, aan: true }].map((m) => (
            <div key={m.d} className={m.aan ? 'hp6-kaart hp6-meetmoment hp6-meetmoment-aan' : 'hp6-kaart hp6-meetmoment'}>
              <span className="hp6-mono">{m.d}</span>
              <span className="hp6-kpi hp6-kpi-klein">{m.n}<em>/8</em></span>
              <span className="hp6-mono">vragen genoemd</span>
            </div>
          ))}
        </div>
        <div className="hp6-kaart hp6-smal">
          <div className="hp6-kop-rij hp6-kop-rij-klein"><span>Klikken uit Google</span><span className="hp6-mono">Search Console, per dag</span></div>
          <svg className="hp6-grafiek hp6-grafiek-laag" viewBox="0 -2 100 44" preserveAspectRatio="none" aria-hidden="true">
            <line x1="38" x2="38" y1="0" y2="40" className="hp6-markering" />
            <path d={`${lijnPad(klikken, 28)} L100 40 L0 40 Z`} className="hp6-vlak" />
            <path d={lijnPad(klikken, 28)} className="hp6-lijn-accent" />
          </svg>
          <div className="hp6-as"><span>1 okt</span><span className="hp6-as-live">Live 15 okt</span><span>5 nov</span></div>
        </div>
      </Venster>
      <Zweef className="hp6-zweef-rechts hp6-ladder">
        <div className="hp6-zweef-kop"><span>Bewijsladder</span><Chip toon="groen">Gestegen</Chip></div>
        {[...tredes].reverse().map((t) => (
          <div key={t.n} className={`hp6-trede hp6-trede-${t.s.replace(' ', '-')}`}>
            <span className="hp6-trede-teken">{t.s === 'bewezen' ? <Icoon naam="vink" /> : null}</span>
            <span>{t.n}</span>
            <span className="hp6-mono">{t.s === 'bewezen' ? 'Bewezen' : t.s === 'te weinig' ? 'Te weinig gegevens' : 'Nog geen gegevens'}</span>
          </div>
        ))}
      </Zweef>
    </>
  )
}

/* 7. Verslag -------------------------------------------------------------- */

function Verslag() {
  return (
    <div className="hp6-verslag-stapel">
      <div className="hp6-blad-achter hp6-blad-achter-2" />
      <div className="hp6-blad-achter hp6-blad-achter-1" />
      <div className="hp6-verslag">
        <div className="hp6-verslag-kop">
          <span className="hp6-bureau-logo"><span className="hp6-bureau-teken">K</span>{BUREAU}</span>
          <span className="hp6-mono">Verslag november 2026</span>
        </div>
        <h5>{KLANT}</h5>
        <p className="hp6-verslag-intro">Deze maand werd {KLANT} vaker aanbevolen. Drie nieuwe pagina&apos;s gingen live, en twee websites noemen het bedrijf nu ook.</p>
        <div className="hp6-verslag-kpis">
          <div><span className="hp6-mono">Zichtbaarheid</span><span className="hp6-kpi hp6-kpi-klein">31%<em>± 6</em></span><span className="hp6-verschil">+4 punten</span></div>
          <div><span className="hp6-mono">Pagina&apos;s live</span><span className="hp6-kpi hp6-kpi-klein">3</span><span className="hp6-verschil">van 10 gepland</span></div>
          <div><span className="hp6-mono">Klikken uit Google</span><span className="hp6-kpi hp6-kpi-klein">214</span><span className="hp6-verschil">alleen onze pagina&apos;s</span></div>
        </div>
        <span className="hp6-mono hp6-verslag-sectie">Pagina&apos;s en hun effect</span>
        {[{ p: 'Kunststof kozijnen in Haarlem', e: '1 → 5 van 8', g: true }, { p: 'Wat kost een kunststof kozijn?', e: '0 → 2 van 6', g: true }, { p: 'Hout of kunststof?', e: 'Meting na 14 dagen', g: false }].map((r) => (
          <div key={r.p} className="hp6-verslag-rij"><span>{r.p}</span><span className={r.g ? 'hp6-tekst-groen' : 'hp6-mono'}>{r.e}</span></div>
        ))}
        <span className="hp6-mono hp6-verslag-sectie">Nieuwe vermeldingen</span>
        <div className="hp6-verslag-rij"><span>werkspot.nl</span><Chip toon="groen">Geplaatst</Chip></div>
      </div>
      <div className="hp6-zweef hp6-pdf"><Icoon naam="pdf" /><span>Opslaan als pdf</span></div>
    </div>
  )
}

/* 8. Pitch ---------------------------------------------------------------- */

function Pitch() {
  return (
    <>
      <div className="hp6-pitch">
        <div className="hp6-pitch-balk"><span className="hp6-bureau-logo"><span className="hp6-bureau-teken">K</span>{BUREAU}</span><span className="hp6-pitch-contact">Plan een gesprek</span></div>
        <div className="hp6-pitch-held">
          <span className="hp6-mono">Voor Brouwer Kozijnen</span>
          <h5>ChatGPT raadt bij 7 van de 10 vragen een ander bedrijf aan</h5>
        </div>
        <div className="hp6-pitch-grid">
          <div className="hp6-kaart">
            <span className="hp6-mono">Wie ChatGPT wel aanraadt</span>
            {[{ n: 'Kozijnwerk Noord', p: 7 }, { n: 'Van Dijk Ramen', p: 4 }, { n: 'Haarlemse Kozijnen', p: 3 }, { n: KLANT, p: 0, zelf: true }].map((r) => (
              <div key={r.n} className="hp6-staaf-rij"><span className={r.zelf ? 'hp6-tekst-accent' : ''}>{r.n}</span><span className="hp6-baan"><span style={{ width: `${r.p * 10}%` }} /></span><span className="hp6-mono">{r.p}/10</span></div>
            ))}
          </div>
          <div className="hp6-kaart hp6-pitch-antwoord">
            <span className="hp6-mono">Zo antwoordt ChatGPT nu</span>
            <p>&ldquo;Voor kunststof kozijnen in Haarlem kun je het best kijken bij <b>Kozijnwerk Noord</b> of <b>Van Dijk Ramen</b>. Beide hebben goede reviews en een eigen montageploeg.&rdquo;</p>
          </div>
          <div className="hp6-kaart hp6-pitch-kansen">
            <span className="hp6-mono">Waar de kansen liggen</span>
            <div><span className="hp6-chip">Een pagina over prijzen</span><span className="hp6-chip">Kozijnen in Haarlem</span><span className="hp6-chip">Vermelding op trustoo.nl</span><span className="hp6-chip">Reviews op de eigen site</span></div>
          </div>
        </div>
      </div>
      <Zweef className="hp6-zweef-rechtsonder hp6-melding">
        <span className="hp6-melding-ico"><Icoon naam="bel" /></span>
        <span className="hp6-melding-tekst"><b>De pitch voor {KLANT} is geopend</b><em>Zojuist, voor het eerst</em></span>
      </Zweef>
    </>
  )
}

/* 9. Merkbewaking --------------------------------------------------------- */

function Merkbewaking() {
  return (
    <>
      <Venster pad={[KLANT, 'Tools', 'Feitencontrole']} actief="Feitencontrole">
        <div className="hp6-kop-rij"><h4>Feitencontrole</h4><span className="hp6-segment"><span className="hp6-segment-aan">Beoordeel zelf</span><span>Afgedaan</span></span></div>
        <div className="hp6-kaart hp6-fout">
          <div className="hp6-fout-kop"><span>Adres</span><Chip toon="rood">Klopt niet</Chip></div>
          <div className="hp6-twee hp6-twee-gelijk">
            <div className="hp6-vlakje"><span className="hp6-mono"><MerkIcoon merk="chatgpt" size={10} /> ChatGPT zei op 3 november</span><p>&ldquo;Je vindt de showroom aan de <s>Kleverparkweg 8</s> in Haarlem.&rdquo;</p></div>
            <div className="hp6-vlakje"><span className="hp6-mono">Wat Orbit weet</span><p className="hp6-juist">Zijlweg 40, Haarlem</p><em>Bron: website, pagina Contact</em></div>
          </div>
          <div className="hp6-herkomst"><span className="hp6-mono">Waar het vandaan kan komen</span><Chip>oude-gids.nl</Chip><Chip>bedrijvenpagina.nl</Chip></div>
        </div>
        <div className="hp6-kaart hp6-fout hp6-fout-dicht"><div className="hp6-fout-kop"><span>Diensten</span><Chip toon="geel">Beoordeel zelf</Chip></div><p>Gemini noemt dakkapellen, die staan niet in het aanbod.</p></div>
      </Venster>
      <Zweef className="hp6-zweef-rechtsonder hp6-vermeldingen">
        <div className="hp6-zweef-kop"><Icoon naam="vermeldingen" /><span>Vermeldingen</span></div>
        {[{ s: 'trustoo.nl', st: 'Aangevraagd', t: 'geel' as const }, { s: 'werkspot.nl', st: 'Geplaatst', t: 'groen' as const }, { s: 'oude-gids.nl', st: 'Correctie gevraagd', t: undefined }].map((v) => (
          <div key={v.s} className="hp6-lijst-rij"><span className="hp6-lijst-tekst"><span>{v.s}</span></span><Chip toon={v.t}>{v.st}</Chip></div>
        ))}
        <div className="hp6-concept"><span className="hp6-mono">Conceptbericht</span><p>Beste redactie, op uw pagina over kozijnbedrijven in Haarlem staat een oud adres van {KLANT}…</p></div>
      </Zweef>
    </>
  )
}

/* 10. Werkoverzicht ------------------------------------------------------- */

function Werkoverzicht() {
  const rijen = [
    { n: KLANT, z: 31, d: '+4', w: 'Gele zin bevestigen', s: '2 dagen', k: '€6,40', trend: [12, 15, 19, 22, 27, 31] },
    { n: 'Bakkerij Van Vliet', z: 18, d: '+2', w: 'Pagina goedkeuren', s: '5 dagen', k: '€3,10', trend: [11, 12, 14, 15, 16, 18] },
    { n: 'Tandartspraktijk Noord', z: 42, d: '0', w: '', s: '', k: '€7,90', trend: [36, 40, 41, 43, 42, 42] },
    { n: 'Hoveniersbedrijf Groen', z: 9, d: '−3', w: 'Pagina live melden', s: '1 dag', k: '€4,20', trend: [14, 13, 12, 12, 11, 9] },
    { n: 'Advocatenkantoor Lindhout', z: 26, d: '+6', w: '', s: '', k: '€9,80', trend: [10, 14, 17, 20, 22, 26] },
    { n: 'Kookstudio Peper', z: 14, d: '+1', w: 'Onderwerp kiezen', s: '8 dagen', k: '€2,30', trend: [10, 11, 12, 12, 13, 14] },
  ]
  return (
    <>
      <Venster pad={[BUREAU, 'Bedrijven']} zijbalk={false} className="hp6-app-breed">
        <div className="hp6-kop-rij"><h4>Bedrijven</h4><span className="hp6-zoekveld"><Icoon naam="zoek" />Zoek een bedrijf</span></div>
        <div className="hp6-tabel">
          <div className="hp6-tabel-kop"><span /><span>Bedrijf</span><span>Zichtbaarheid</span><span>Wacht op jou</span><span>Wacht sinds</span><span>Kosten 30 dagen</span></div>
          {rijen.map((r, i) => (
            <div key={r.n} className="hp6-tabel-rij">
              <span className={i !== 2 && i !== 4 ? 'hp6-vinkvak hp6-vinkvak-aan' : 'hp6-vinkvak'}>{i !== 2 && i !== 4 && <Icoon naam="vink" />}</span>
              <span className="hp6-tabel-naam"><span className="hp6-avatar">{r.n.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>{r.n}</span>
              <span className="hp6-tabel-zicht">
                <b>{r.z}%</b>
                <svg viewBox="0 -2 100 44" preserveAspectRatio="none" aria-hidden="true"><path d={lijnPad(r.trend, 45)} className={r.d.startsWith('−') ? 'hp6-lijn-zacht' : 'hp6-lijn-accent hp6-lijn-dun'} /></svg>
                <em className={r.d.startsWith('+') ? 'hp6-tekst-groen' : r.d.startsWith('−') ? 'hp6-tekst-rood' : ''}>{r.d}</em>
              </span>
              <span>{r.w ? <Chip toon="geel">{r.w}</Chip> : <span className="hp6-mono">Niets</span>}</span>
              <span className="hp6-mono">{r.s}</span>
              <span className="hp6-mono">{r.k}</span>
            </div>
          ))}
        </div>
      </Venster>
      <Zweef className="hp6-zweef-rechtsonder hp6-start">
        <div className="hp6-zweef-kop"><span>Start de maand voor 4 bedrijven</span></div>
        <div className="hp6-start-regel"><span>Pagina&apos;s</span><b>45</b></div>
        <div className="hp6-start-regel"><span>Maandmeting</span><b>Aan</b></div>
        <div className="hp6-start-regel"><span>Ongeveer</span><b>€32</b></div>
        <span className="hp6-voortgang"><span style={{ width: '46%' }} /></span>
        <span className="hp6-mono">Van de maandlimiet is €81 over</span>
        <span className="hp6-knop">Start de maand</span>
      </Zweef>
    </>
  )
}

export const beelden: Record<string, () => React.ReactElement> = {
  meten: Meten,
  begrijpen: Begrijpen,
  plannen: Plannen,
  schrijven: Schrijven,
  aanleveren: Aanleveren,
  bewijzen: Bewijzen,
  verslag: Verslag,
  pitch: Pitch,
  merkbewaking: Merkbewaking,
  werkoverzicht: Werkoverzicht,
}
