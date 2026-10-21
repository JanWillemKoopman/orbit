// De twintig beelden van de vierde testhomepage (/homepage4). Elk beeld laat één functie zien, zo kaal
// mogelijk: lijnen, stippen en een paar woorden, met het accent alleen op wat het beeld wil zeggen. Alle
// namen en getallen zijn voorbeelddata van verzonnen bedrijven.
import { MerkIcoon } from '@/components/homepage1/Visuals'

const KLANT = 'Brouwer Kozijnen'

function Vink() {
  return <svg className="hp4-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
}

function Kruis() {
  return <svg className="hp4-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m4.5 4.5 7 7m0-7-7 7" /></svg>
}

/* Meten ------------------------------------------------------------------- */

function Assistenten() {
  const rijen = [
    { merk: 'chatgpt' as const, naam: 'ChatGPT', pct: 31 },
    { merk: 'gemini' as const, naam: 'Gemini', pct: 24 },
    { merk: 'google' as const, naam: 'AI-overzicht', pct: 18 },
  ]
  return (
    <div className="hp4-stapel hp4-breed">
      {rijen.map((r, i) => (
        <div key={r.naam} className="hp4-assistent">
          <span className="hp4-assistent-naam"><MerkIcoon merk={r.merk} size={14} />{r.naam}</span>
          <span className="hp4-baan"><span className={i === 0 ? 'hp4-vul hp4-vul-accent' : 'hp4-vul'} style={{ width: `${r.pct * 2}%` }} /></span>
          <span className="hp4-getal">{r.pct}%</span>
        </div>
      ))}
    </div>
  )
}

function Klantreis() {
  const fases = [{ naam: 'Oriëntatie', aan: 6 }, { naam: 'Overweging', aan: 4 }, { naam: 'Beslissing', aan: 1 }]
  return (
    <div className="hp4-reis">
      {fases.map((f, i) => (
        <div key={f.naam} className="hp4-reis-kolom">
          <div className="hp4-stippen">
            {Array.from({ length: 10 }, (_, j) => <span key={j} className={j < f.aan ? (i === 2 ? 'hp4-stip hp4-stip-accent' : 'hp4-stip hp4-stip-aan') : 'hp4-stip'} />)}
          </div>
          <span className="hp4-label">{f.naam}</span>
          <span className="hp4-getal">{f.aan}/10</span>
        </div>
      ))}
    </div>
  )
}

function Marge() {
  // Twee metingen op een schaal van 0 tot 40 procent; de balkjes zijn de marges.
  const y = (p: number) => 150 - p * 3.4
  return (
    <svg className="hp4-svg" viewBox="0 0 240 180" aria-hidden="true">
      {[0, 10, 20, 30, 40].map((p) => (
        <g key={p}>
          <line x1="40" x2="220" y1={y(p)} y2={y(p)} className="hp4-raster" />
          <text x="30" y={y(p) + 3} textAnchor="end" className="hp4-svg-klein">{p}%</text>
        </g>
      ))}
      <rect x="77" y={y(16)} width="26" height={y(8) - y(16)} rx="3" className="hp4-band" />
      <line x1="80" x2="100" y1={y(12)} y2={y(12)} className="hp4-lijn-sterk" />
      <rect x="157" y={y(37)} width="26" height={y(25) - y(37)} rx="3" className="hp4-band-accent" />
      <line x1="160" x2="180" y1={y(31)} y2={y(31)} className="hp4-lijn-accent" />
      <text x="90" y="168" textAnchor="middle" className="hp4-svg-klein">jun</text>
      <text x="170" y="168" textAnchor="middle" className="hp4-svg-klein">nov</text>
      <text x="90" y={y(16) - 8} textAnchor="middle" className="hp4-svg-tekst">12%</text>
      <text x="170" y={y(37) - 8} textAnchor="middle" className="hp4-svg-tekst hp4-svg-accent">31% ± 6</text>
    </svg>
  )
}

function Positie() {
  const namen = ['Kozijnwerk Noord', KLANT, 'Van Dijk Ramen', 'Haarlemse Kozijnen']
  return (
    <div className="hp4-kaart hp4-breed">
      <div className="hp4-kaart-kop"><MerkIcoon merk="chatgpt" size={13} /><span>Welk bedrijf voor kunststof kozijnen in Haarlem?</span></div>
      <ol className="hp4-lijst">
        {namen.map((n, i) => (
          <li key={n} className={n === KLANT ? 'hp4-rij hp4-rij-accent' : 'hp4-rij'}>
            <span className="hp4-plek">{i + 1}</span><span className="hp4-rij-naam">{n}</span>
            {n === KLANT && <span className="hp4-tag hp4-tag-accent">Plek 2</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}

function Concurrenten() {
  const groepen = [
    { soort: 'Concurrent', namen: ['Kozijnwerk Noord', 'Van Dijk Ramen'], accent: true },
    { soort: 'Vergelijkingssite', namen: ['Kozijnvergelijker'] },
    { soort: 'Branche', namen: ['Vereniging Kozijnbouw'] },
    { soort: 'Eigen merk', namen: ['Brouwer kozijnen bv'] },
  ]
  return (
    <div className="hp4-stapel hp4-breed">
      {groepen.map((g) => (
        <div key={g.soort} className="hp4-groep">
          <span className="hp4-label">{g.soort}</span>
          <span className="hp4-chips">{g.namen.map((n) => <span key={n} className={g.accent ? 'hp4-chip hp4-chip-accent' : 'hp4-chip'}>{n}</span>)}</span>
        </div>
      ))}
    </div>
  )
}

function Bronnen() {
  const bronnen = [
    { naam: 'werkspot.nl', n: 14 },
    { naam: 'trustoo.nl', n: 11 },
    { naam: 'kozijnwerknoord.nl', n: 7 },
    { naam: 'brouwerkozijnen.nl', n: 2, eigen: true },
  ]
  return (
    <div className="hp4-stapel hp4-breed">
      {bronnen.map((b) => (
        <div key={b.naam} className="hp4-bron">
          <span className={b.eigen ? 'hp4-bron-naam hp4-tekst-accent' : 'hp4-bron-naam'}>{b.naam}</span>
          <span className="hp4-baan"><span className={b.eigen ? 'hp4-vul hp4-vul-accent' : 'hp4-vul'} style={{ width: `${(b.n / 14) * 100}%` }} /></span>
          <span className="hp4-getal">{b.n}×</span>
        </div>
      ))}
    </div>
  )
}

/* Begrijpen --------------------------------------------------------------- */

function Kennistest() {
  const regels = [
    { zin: 'Levert kunststof en houten kozijnen', goed: true },
    { zin: 'Is gevestigd in Eindhoven', goed: false, juist: 'Haarlem' },
    { zin: 'Plaatst ook voordeuren', goed: true },
  ]
  return (
    <div className="hp4-kaart hp4-breed">
      <div className="hp4-kaart-kop"><MerkIcoon merk="chatgpt" size={13} /><span>Wat weet ChatGPT over {KLANT}?</span></div>
      <ul className="hp4-lijst">
        {regels.map((r) => (
          <li key={r.zin} className="hp4-rij">
            <span className={r.goed ? 'hp4-status hp4-groen' : 'hp4-status hp4-rood'}>{r.goed ? <Vink /> : <Kruis />}</span>
            <span className="hp4-rij-naam">{r.goed ? r.zin : <><s>{r.zin}</s> <span className="hp4-juist">{r.juist}</span></>}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Dossier() {
  const delen = ['Aanbod', 'Concurrenten', 'Markt', 'Toon', 'Kennis']
  // Vanaf één punt links waaieren vijf lijnen uit naar de onderdelen rechts.
  return (
    <div className="hp4-dossier">
      <span className="hp4-url">brouwerkozijnen.nl</span>
      <svg className="hp4-waaier" viewBox="0 0 60 200" preserveAspectRatio="none" aria-hidden="true">
        {delen.map((d, i) => <path key={d} d={`M0 100 C 30 100, 30 ${20 + i * 40}, 60 ${20 + i * 40}`} className="hp4-lijn" />)}
      </svg>
      <ul className="hp4-delen">{delen.map((d, i) => <li key={d} className={i === 0 ? 'hp4-chip hp4-chip-accent' : 'hp4-chip'}>{d}</li>)}</ul>
    </div>
  )
}

function Aanbod() {
  const takken = [
    { groep: 'Kozijnen', items: [{ n: 'Kunststof', pagina: true }, { n: 'Hout', pagina: true }, { n: 'Aluminium', pagina: false }] },
    { groep: 'Deuren', items: [{ n: 'Voordeuren', pagina: true }, { n: 'Schuifpuien', pagina: false }] },
  ]
  return (
    <div className="hp4-boom">
      <span className="hp4-chip hp4-boom-stam">{KLANT}</span>
      <div className="hp4-takken">
        {takken.map((t) => (
          <div key={t.groep} className="hp4-tak">
            <span className="hp4-chip">{t.groep}</span>
            <ul>
              {t.items.map((i) => <li key={i.n}><span className={i.pagina ? 'hp4-chip' : 'hp4-chip hp4-chip-leeg'}>{i.n}</span>{!i.pagina && <span className="hp4-tag hp4-tag-accent">Geen pagina</span>}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function Techniek() {
  const regels = [
    { naam: 'OAI-SearchBot', goed: true },
    { naam: 'GPTBot', goed: false },
    { naam: 'llms.txt', goed: true },
    { naam: 'Leesbaar zonder JavaScript', goed: true },
    { naam: 'Gestructureerde data', goed: true },
    { naam: 'Vindbaar via Bing', goed: true },
  ]
  return (
    <ul className="hp4-kaart hp4-lijst hp4-breed">
      {regels.map((r) => (
        <li key={r.naam} className="hp4-rij">
          <span className={r.goed ? 'hp4-status hp4-groen' : 'hp4-status hp4-rood'}>{r.goed ? <Vink /> : <Kruis />}</span>
          <span className="hp4-rij-naam">{r.naam}</span>
          {!r.goed && <span className="hp4-tag">Tegengehouden</span>}
        </li>
      ))}
    </ul>
  )
}

/* Plannen ----------------------------------------------------------------- */

function Kans() {
  return (
    <div className="hp4-kaart hp4-breed">
      <span className="hp4-label">Pagina-idee</span>
      <p className="hp4-kaart-titel">Kunststof kozijnen in Haarlem</p>
      <div className="hp4-meters">
        <div><span className="hp4-groot">1<em>/8</em></span><span className="hp4-label">vragen genoemd</span></div>
        <div><span className="hp4-groot">3</span><span className="hp4-label">concurrenten wel</span></div>
      </div>
      <div className="hp4-stippen hp4-stippen-rij">
        {Array.from({ length: 8 }, (_, i) => <span key={i} className={i === 0 ? 'hp4-stip hp4-stip-accent' : 'hp4-stip'} />)}
      </div>
    </div>
  )
}

function Jaarplan() {
  const maanden = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']
  return (
    <div className="hp4-jaar">
      {maanden.map((m, i) => (
        <div key={m} className="hp4-maand">
          <span className="hp4-label">{m}</span>
          <span className="hp4-blokjes">
            {Array.from({ length: 10 }, (_, j) => <span key={j} className={i === 0 ? 'hp4-blokje hp4-blokje-aan' : 'hp4-blokje'} />)}
            <span className="hp4-blokje hp4-blokje-reserve" />
          </span>
        </div>
      ))}
    </div>
  )
}

/* Schrijven --------------------------------------------------------------- */

function GeleZin() {
  return (
    <div className="hp4-kaart hp4-breed hp4-tekstblok">
      <span className="hp4-streep" style={{ width: '62%' }} />
      <span className="hp4-streep" style={{ width: '88%' }} />
      <p className="hp4-geel">Op elk kozijn krijgt u 15 jaar garantie.</p>
      <span className="hp4-reden">Geen bron in de kennis over het bedrijf</span>
      <span className="hp4-streep" style={{ width: '80%' }} />
      <span className="hp4-streep" style={{ width: '46%' }} />
    </div>
  )
}

function Deellink() {
  const vragen = [
    { v: 'Wat kost een kunststof kozijn gemiddeld?', klaar: true },
    { v: 'Hoe lang duurt de levering?', klaar: false },
    { v: 'Werken jullie met een eigen montageploeg?', klaar: false },
  ]
  return (
    <div className="hp4-telefoon">
      <span className="hp4-telefoon-notch" />
      <span className="hp4-label">{KLANT}</span>
      <p className="hp4-kaart-titel">3 vragen voor je pagina</p>
      <ul className="hp4-vragen">
        {vragen.map((q) => (
          <li key={q.v} className={q.klaar ? 'hp4-vraag hp4-vraag-klaar' : 'hp4-vraag'}>
            <span className={q.klaar ? 'hp4-status hp4-accent' : 'hp4-status'}>{q.klaar ? <Vink /> : null}</span>{q.v}
          </li>
        ))}
      </ul>
      <span className="hp4-label hp4-onder">Geen account nodig</span>
    </div>
  )
}

function Plakklaar() {
  return (
    <div className="hp4-kaart hp4-breed">
      <div className="hp4-tabs"><span className="hp4-tab hp4-tab-aan">HTML</span><span className="hp4-tab">Tekst</span><span className="hp4-tab">Markdown</span></div>
      <pre className="hp4-code"><span className="hp4-code-tag">&lt;h2&gt;</span>Kunststof kozijnen<span className="hp4-code-tag">&lt;/h2&gt;</span>{'\n'}<span className="hp4-code-tag">&lt;p&gt;</span>Onderhoudsarm en goed…<span className="hp4-code-tag">&lt;/p&gt;</span></pre>
      <div className="hp4-chips">
        {['Metatitel', 'Omschrijving', 'Veelgestelde vragen', 'JSON-LD'].map((d) => <span key={d} className="hp4-chip">{d}</span>)}
      </div>
    </div>
  )
}

/* Bewijzen ---------------------------------------------------------------- */

function Hermeten() {
  const punten = [{ dag: 'Live', n: 1 }, { dag: 'Dag 14', n: 3 }, { dag: 'Dag 28', n: 5 }]
  return (
    <div className="hp4-tijdlijn">
      <span className="hp4-tijdlijn-lijn" />
      {punten.map((p, i) => (
        <div key={p.dag} className="hp4-moment">
          <span className="hp4-groot">{p.n}<em>/8</em></span>
          <span className={i === 2 ? 'hp4-knoop hp4-knoop-accent' : 'hp4-knoop'} />
          <span className="hp4-label">{p.dag}</span>
        </div>
      ))}
    </div>
  )
}

function Ladder() {
  const tredes = ['Gepubliceerd', 'Zichtbaar in Google', 'Genoemd door AI', 'Geciteerd door AI', 'Verkeer', 'Conversie', 'Omzet']
  return (
    <div className="hp4-ladder">
      {tredes.map((t, i) => (
        <div key={t} className={i < 4 ? 'hp4-trede hp4-trede-aan' : 'hp4-trede'} style={{ '--i': i } as React.CSSProperties}>
          <span className="hp4-trede-blok" />
          <span className="hp4-label">{t}</span>
        </div>
      ))}
    </div>
  )
}

function Zoekverkeer() {
  // Klikken per dag over zes weken; de pagina gaat op dag 14 live.
  const klikken = [2, 3, 2, 4, 3, 2, 3, 4, 3, 2, 3, 3, 4, 3, 4, 6, 5, 7, 8, 7, 9, 10, 9, 11, 12, 11, 13, 12, 14, 13, 15, 16, 14, 17, 16, 18]
  const x = (i: number) => 10 + (i / (klikken.length - 1)) * 220
  const y = (k: number) => 150 - k * 7
  const lijn = klikken.map((k, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(k)}`).join(' ')
  return (
    <svg className="hp4-svg" viewBox="0 0 240 180" aria-hidden="true">
      <line x1="10" x2="230" y1="150" y2="150" className="hp4-raster" />
      <line x1={x(14)} x2={x(14)} y1="22" y2="150" className="hp4-markering" />
      <text x={x(14) + 6} y="30" className="hp4-svg-klein">Live</text>
      <path d={`${lijn} L230 150 L10 150 Z`} className="hp4-vlak-accent" />
      <path d={lijn} className="hp4-lijn-accent" fill="none" />
      <text x="10" y="168" className="hp4-svg-klein">Klikken uit Google per dag</text>
    </svg>
  )
}

/* Schalen ----------------------------------------------------------------- */

function Maand() {
  const klanten = [
    { naam: KLANT, p: 10, aan: true },
    { naam: 'Bakkerij Van Vliet', p: 5, aan: true },
    { naam: 'Tandartspraktijk Noord', p: 10, aan: true },
    { naam: 'Hoveniersbedrijf Groen', p: 10, aan: true },
    { naam: 'Advocatenkantoor Lindhout', p: 15, aan: true },
    { naam: 'Kookstudio Peper', p: 5, aan: false },
  ]
  const totaal = klanten.filter((k) => k.aan).reduce((s, k) => s + k.p, 0)
  return (
    <div className="hp4-kaart hp4-breed">
      <ul className="hp4-lijst">
        {klanten.map((k) => (
          <li key={k.naam} className="hp4-rij">
            <span className={k.aan ? 'hp4-vinkvak hp4-vinkvak-aan' : 'hp4-vinkvak'}>{k.aan && <Vink />}</span>
            <span className="hp4-rij-naam">{k.naam}</span>
            <span className="hp4-getal">{k.p}</span>
          </li>
        ))}
      </ul>
      <div className="hp4-voet"><span className="hp4-label">{totaal} pagina&apos;s samen</span><span className="hp4-knop">Start de maand</span></div>
    </div>
  )
}

function Kosten() {
  return (
    <div className="hp4-stapel hp4-breed">
      <div className="hp4-meters">
        <div><span className="hp4-groot">€38</span><span className="hp4-label">deze maand</span></div>
        <div><span className="hp4-groot">€150</span><span className="hp4-label">maandlimiet</span></div>
      </div>
      <span className="hp4-baan hp4-baan-dik"><span className="hp4-vul hp4-vul-accent" style={{ width: `${(38 / 150) * 100}%` }} /></span>
      <div className="hp4-kosten-rijen">
        <span><span className="hp4-label">Klanten</span><span className="hp4-getal">Onbeperkt</span></span>
        <span><span className="hp4-label">Opslag op AI</span><span className="hp4-getal">Geen</span></span>
      </div>
    </div>
  )
}

export const beelden: Record<string, () => React.ReactElement> = {
  assistenten: Assistenten,
  klantreis: Klantreis,
  marge: Marge,
  positie: Positie,
  concurrenten: Concurrenten,
  bronnen: Bronnen,
  kennistest: Kennistest,
  dossier: Dossier,
  aanbod: Aanbod,
  techniek: Techniek,
  kans: Kans,
  jaarplan: Jaarplan,
  'gele-zin': GeleZin,
  deellink: Deellink,
  plakklaar: Plakklaar,
  hermeten: Hermeten,
  ladder: Ladder,
  zoekverkeer: Zoekverkeer,
  maand: Maand,
  kosten: Kosten,
}
