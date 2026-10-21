// De vijftien beelden van de vijfde testhomepage (/homepage5). Waar /homepage4 één functie per beeld laat
// zien, laat elk beeld hier een behoefte van het bureau of een USP zien. De bouwstenen (kaarten, chips, banen,
// stippen) komen uit homepage4.css; alleen wat nieuw is staat in homepage5.css. Alle namen en getallen zijn
// voorbeelddata van verzonnen bedrijven.
import { LogoMark } from '@/components/Logo'
import { MerkIcoon } from '@/components/homepage1/Visuals'

const KLANT = 'Brouwer Kozijnen'
const BUREAU = 'Bureau Kade'

function Vink() {
  return <svg className="hp4-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
}

function Kruis() {
  return <svg className="hp4-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m4.5 4.5 7 7m0-7-7 7" /></svg>
}

function Pijl() {
  return <svg className="hp5-pijl" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10m-4-4 4 4-4 4" /></svg>
}

/** Punten op een cirkel, met de klok mee vanaf boven. */
function opCirkel(n: number, r: number, cx = 100, cy = 100) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const
  })
}

/* Behoeften --------------------------------------------------------------- */

function Antwoord() {
  const verloop = [12, 14, 17, 22, 26, 31]
  const x = (i: number) => 4 + i * 38
  const y = (p: number) => 54 - p * 1.4
  const lijn = verloop.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p)}`).join(' ')
  return (
    <div className="hp4-stapel hp4-breed">
      <p className="hp5-bubbel">Hoe staan wij eigenlijk in ChatGPT?</p>
      <div className="hp4-kaart">
        <span className="hp4-label">Kunststof kozijnen</span>
        <div className="hp5-cijfer-rij">
          <span className="hp4-groot">31%<em> ± 6</em></span>
          <svg className="hp5-spark" viewBox="0 0 200 60" aria-hidden="true">
            <path d={lijn} className="hp4-lijn-accent" fill="none" />
            <circle cx={x(5)} cy={y(31)} r="3" fill="var(--accent)" />
          </svg>
        </div>
        <div className="hp5-maanden">{['jun', 'jul', 'aug', 'sep', 'okt', 'nov'].map((m) => <span key={m} className="hp4-label">{m}</span>)}</div>
      </div>
    </div>
  )
}

function Dienst() {
  const stappen = ['Meten', 'Plannen', 'Schrijven', 'Publiceren', 'Hermeten']
  const punten = opCirkel(5, 70)
  return (
    <div className="hp5-dienst">
      <div className="hp5-ring">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="70" className="hp4-lijn" />
          <path d="M100 30 A70 70 0 0 1 166.6 78.4" className="hp4-lijn-accent" fill="none" />
          {punten.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="5" className={i === 0 ? 'hp5-knoop-accent' : 'hp5-knoop'} />)}
        </svg>
        {stappen.map((s, i) => (
          <span key={s} className={i === 0 ? 'hp5-ring-label hp5-ring-label-aan' : 'hp5-ring-label'} style={{ left: `${(punten[i][0] / 200) * 100}%`, top: `${(punten[i][1] / 200) * 100}%` }}>{s}</span>
        ))}
        <span className="hp5-ring-midden"><span className="hp4-label">Elke maand</span></span>
      </div>
      <div className="hp4-kaart hp5-verslag">
        <span className="hp5-verslag-kop"><LogoMark size={11} />{BUREAU}</span>
        <span className="hp4-kaart-titel">Verslag november</span>
        <span className="hp4-label">{KLANT}</span>
        <span className="hp4-streep" style={{ width: '90%' }} />
        <span className="hp4-streep" style={{ width: '70%' }} />
        <span className="hp4-streep" style={{ width: '80%' }} />
      </div>
    </div>
  )
}

function Effect() {
  const staven = [{ label: 'Vóór', n: 1 }, { label: 'Dag 14', n: 3 }, { label: 'Dag 28', n: 5 }]
  return (
    <div className="hp5-staven">
      {staven.map((s, i) => (
        <div key={s.label} className="hp5-staaf">
          <span className="hp4-groot">{s.n}<em>/8</em></span>
          <span className="hp5-staaf-baan"><span className={i === 2 ? 'hp5-staaf-vul hp4-vul-accent' : 'hp5-staaf-vul'} style={{ height: `${(s.n / 8) * 100}%` }} /></span>
          <span className="hp4-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function Maken() {
  const rijen = [
    { vraag: 'Wat kost een kunststof kozijn?', pagina: 'Prijzen kunststof kozijnen', maand: 'nov' },
    { vraag: 'Kozijnen vervangen in Haarlem', pagina: 'Kozijnen in Haarlem', maand: 'nov' },
    { vraag: 'Hout of kunststof?', pagina: 'Hout of kunststof vergeleken', maand: 'dec' },
  ]
  return (
    <div className="hp4-stapel hp4-breed">
      {rijen.map((r, i) => (
        <div key={r.vraag} className="hp5-van-naar">
          <span className="hp5-vraag-gemist"><span className="hp4-status hp4-rood"><Kruis /></span><span className="hp4-rij-naam">{r.vraag}</span></span>
          <Pijl />
          <span className={i === 0 ? 'hp4-chip hp4-chip-accent hp5-pagina' : 'hp4-chip hp5-pagina'}><span className="hp4-rij-naam">{r.pagina}</span><span className="hp4-label">{r.maand}</span></span>
        </div>
      ))}
    </div>
  )
}

function Schaal() {
  const poorten = ['Bevestigde kennis', 'Controle in code', 'Goedgekeurd']
  return (
    <div className="hp5-straat">
      <span className="hp5-stapel-paginas" aria-hidden="true"><span /><span /><span /></span>
      {poorten.map((p) => (
        <div key={p} className="hp5-poort">
          <span className="hp4-status hp4-groen"><Vink /></span>
          <span className="hp4-label">{p}</span>
        </div>
      ))}
      <span className="hp4-tag hp4-tag-accent hp5-live">Live</span>
    </div>
  )
}

function Pitch() {
  const rijen = [{ naam: 'Kozijnwerk Noord', n: 7 }, { naam: 'Van Dijk Ramen', n: 4 }, { naam: KLANT, n: 0, zelf: true }]
  return (
    <div className="hp4-kaart hp4-breed">
      <div className="hp4-kaart-kop"><LogoMark size={13} /><span>{BUREAU} · Pitch voor {KLANT}</span></div>
      <p className="hp5-pitch-kop">Je concurrent wordt genoemd, jij niet.</p>
      <div className="hp4-stapel">
        {rijen.map((r) => (
          <div key={r.naam} className="hp4-bron">
            <span className={r.zelf ? 'hp4-bron-naam hp4-tekst-accent' : 'hp4-bron-naam'}>{r.naam}</span>
            <span className="hp4-baan"><span className="hp4-vul" style={{ width: `${r.n * 10}%` }} /></span>
            <span className="hp4-getal">{r.n}/10</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Grip() {
  return (
    <div className="hp4-stapel hp4-breed">
      <div className="hp4-kaart hp5-vergelijk">
        <div><span className="hp4-label"><MerkIcoon merk="chatgpt" size={11} /> ChatGPT zegt</span><p><s>Kleverparkweg 8</s></p></div>
        <div><span className="hp4-label">Bevestigd</span><p className="hp5-juist">Zijlweg 40</p></div>
        <span className="hp4-tag hp5-fout">Oud adres</span>
      </div>
      <ul className="hp4-kaart hp4-lijst">
        {[{ n: 'werkspot.nl', staat: true }, { n: 'trustoo.nl', staat: false }, { n: 'kozijnvergelijker.nl', staat: true }].map((b) => (
          <li key={b.n} className="hp4-rij">
            <span className={b.staat ? 'hp4-status hp4-groen' : 'hp4-status'}>{b.staat ? <Vink /> : null}</span>
            <span className="hp4-rij-naam">{b.n}</span>
            {!b.staat && <span className="hp4-tag hp4-tag-accent">Nog niet vermeld</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Klanten() {
  const merken = [
    { n: 'Brouwer Kozijnen', s: 'Klaar', aan: true },
    { n: 'Bakkerij Van Vliet', s: 'Wacht op klant', aan: true },
    { n: 'Tandartspraktijk Noord', s: 'Klaar', aan: true },
    { n: 'Hoveniersbedrijf Groen', s: 'Klaar', aan: true },
    { n: 'Kookstudio Peper', s: 'Meting loopt', aan: false },
    { n: 'Advocatenkantoor Lindhout', s: 'Klaar', aan: true },
    { n: 'Fietsenmaker De Spaak', s: 'Klaar', aan: true },
    { n: 'Kapsalon Knip', s: 'Gepauzeerd', aan: false },
  ]
  const gekozen = merken.filter((m) => m.aan).length
  return (
    <div className="hp4-breed">
      <div className="hp5-tegels">
        {merken.map((m) => (
          <div key={m.n} className={m.aan ? 'hp5-tegel hp5-tegel-aan' : 'hp5-tegel'}>
            <span className={m.aan ? 'hp4-vinkvak hp4-vinkvak-aan' : 'hp4-vinkvak'}>{m.aan && <Vink />}</span>
            <span className="hp5-tegel-tekst"><span className="hp4-rij-naam">{m.n}</span><span className="hp4-label">{m.s}</span></span>
          </div>
        ))}
      </div>
      <div className="hp4-voet"><span className="hp4-label">{gekozen} merken gekozen</span><span className="hp4-knop">Start de maand</span></div>
    </div>
  )
}

function Samenwerken() {
  const rechten = [{ n: 'Meekijken', aan: true }, { n: 'Vragen beantwoorden', aan: true }, { n: 'Pagina goedkeuren', aan: false }]
  return (
    <div className="hp5-duo">
      <div className="hp4-kaart hp5-partij"><span className="hp5-avatar"><LogoMark size={14} /></span><span className="hp4-kaart-titel">{BUREAU}</span><span className="hp4-label">Beheerder</span></div>
      <span className="hp5-verbinding" />
      <div className="hp4-kaart hp5-partij hp5-partij-breed">
        <span className="hp5-avatar">BK</span>
        <span className="hp4-kaart-titel">{KLANT}</span>
        <span className="hp4-label">Kijker</span>
        <ul className="hp4-lijst hp5-rechten">
          {rechten.map((r) => <li key={r.n} className="hp4-rij"><span className="hp4-rij-naam">{r.n}</span><span className={r.aan ? 'hp5-schakel hp5-schakel-aan' : 'hp5-schakel'} /></li>)}
        </ul>
      </div>
    </div>
  )
}

function Kosten() {
  return (
    <div className="hp4-stapel hp4-breed">
      <div className="hp5-knop-rij"><span className="hp4-knop">Meting starten</span><span className="hp4-label">ongeveer €1, van de limiet is €112 over</span></div>
      <div className="hp4-kaart hp4-stapel">
        <div className="hp5-sleutel"><span className="hp4-label">Eigen sleutel</span><span className="hp5-mono">sk-••••••••3f9a</span></div>
        <div>
          <div className="hp5-sleutel"><span className="hp4-label">Maandlimiet</span><span className="hp4-getal">€38 van €150</span></div>
          <span className="hp4-baan hp5-baan-ruimte"><span className="hp4-vul hp4-vul-accent" style={{ width: `${(38 / 150) * 100}%` }} /></span>
        </div>
      </div>
    </div>
  )
}

/* Het gat ------------------------------------------------------------------ */

function Gat() {
  const tools = [{ n: 'SEO-tools', s: 'Google' }, { n: 'Analysetools', s: 'Bezoekers' }, { n: 'Schrijftools', s: 'Tekst' }]
  const punten = opCirkel(3, 58)
  return (
    <div className="hp5-gat">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        {punten.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="34" className="hp5-tool-cirkel" />)}
        <circle cx="100" cy="100" r="96" className="hp5-baan-cirkel" />
        <circle cx="100" cy="100" r="17" className="hp5-orbit-punt" />
      </svg>
      {tools.map((t, i) => (
        <span key={t.n} className="hp5-gat-label" style={{ left: `${(punten[i][0] / 200) * 100}%`, top: `${(punten[i][1] / 200) * 100}%` }}>
          <span>{t.n}</span><span className="hp4-label">{t.s}</span>
        </span>
      ))}
      <span className="hp5-gat-midden">Orbit</span>
    </div>
  )
}

/* USP's ------------------------------------------------------------------- */

function Cirkel() {
  const delen = ['Meten', 'Maken', 'Bewijzen']
  const boog = (i: number) => {
    const a0 = (i / 3) * Math.PI * 2 - Math.PI / 2 + 0.12
    const a1 = ((i + 1) / 3) * Math.PI * 2 - Math.PI / 2 - 0.12
    const p = (a: number) => `${(100 + Math.cos(a) * 72).toFixed(1)} ${(100 + Math.sin(a) * 72).toFixed(1)}`
    return `M${p(a0)} A72 72 0 0 1 ${p(a1)}`
  }
  const labels = [0, 1, 2].map((i) => {
    const a = ((i + 0.5) / 3) * Math.PI * 2 - Math.PI / 2
    return [100 + Math.cos(a) * 72, 100 + Math.sin(a) * 72] as const
  })
  return (
    <div className="hp5-ring hp5-ring-groot">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        {delen.map((d, i) => <path key={d} d={boog(i)} className={i === 2 ? 'hp5-boog hp5-boog-accent' : 'hp5-boog'} />)}
      </svg>
      {delen.map((d, i) => <span key={d} className={i === 2 ? 'hp5-ring-label hp5-ring-label-aan' : 'hp5-ring-label'} style={{ left: `${(labels[i][0] / 200) * 100}%`, top: `${(labels[i][1] / 200) * 100}%` }}>{d}</span>)}
      <span className="hp5-ring-midden"><span className="hp4-label">Effect per pagina</span></span>
    </div>
  )
}

function Eerlijk() {
  return (
    <div className="hp5-vakken hp4-breed">
      <div className="hp4-kaart"><span className="hp4-label"><MerkIcoon merk="chatgpt" size={11} /> ChatGPT</span><span className="hp4-groot">31%<em> ± 6</em></span></div>
      <div className="hp4-kaart"><span className="hp4-label"><MerkIcoon merk="gemini" size={11} /> Gemini</span><span className="hp4-groot">24%<em> ± 7</em></span></div>
      <div className="hp5-vak-leeg"><span className="hp4-label"><MerkIcoon merk="google" size={11} /> AI-overzicht</span><span className="hp5-onbekend">Onbekend</span></div>
    </div>
  )
}

function Feiten() {
  return (
    <div className="hp4-kaart hp4-breed hp4-stapel">
      <p className="hp5-feitzin">Kunststof kozijnen vanaf <mark>€ 545</mark>, binnen <mark>6 weken</mark> geplaatst, met het <mark>KOMO-keurmerk</mark>.</p>
      <div className="hp4-chips">
        {['Tarievenlijst 2026', 'Gesprek met de eigenaar', 'Website, pagina Kwaliteit'].map((b) => <span key={b} className="hp4-chip"><span className="hp5-bron-stip" />{b}</span>)}
      </div>
      <div className="hp4-voet"><span className="hp4-label">Elk feit heeft een bron</span><span className="hp4-tag hp4-tag-accent">Goedgekeurd door een mens</span></div>
    </div>
  )
}

function Bureaus() {
  return (
    <div className="hp4-kaart hp4-breed">
      <div className="hp4-kaart-kop"><LogoMark size={13} /><span>{BUREAU}</span></div>
      <div className="hp5-kwadrant">
        <div><span className="hp5-mini-raster">{Array.from({ length: 12 }, (_, i) => <span key={i} className={i === 0 ? 'hp4-blokje hp4-blokje-aan' : 'hp4-blokje'} />)}</span><span className="hp4-label">Al je merken</span></div>
        <div><span className="hp5-mini-rapport"><LogoMark size={10} /><span className="hp4-streep" /><span className="hp4-streep" style={{ width: '60%' }} /></span><span className="hp4-label">Rapport in je huisstijl</span></div>
        <div><span className="hp5-mini-oog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg></span><span className="hp4-label">Klant kijkt mee</span></div>
        <div><span className="hp4-baan hp5-baan-ruimte"><span className="hp4-vul hp4-vul-accent" style={{ width: '25%' }} /></span><span className="hp4-label">Eigen sleutel en limiet</span></div>
      </div>
    </div>
  )
}

export const beelden: Record<string, () => React.ReactElement> = {
  antwoord: Antwoord,
  dienst: Dienst,
  effect: Effect,
  maken: Maken,
  schaal: Schaal,
  pitch: Pitch,
  grip: Grip,
  klanten: Klanten,
  samenwerken: Samenwerken,
  kosten: Kosten,
  gat: Gat,
  cirkel: Cirkel,
  eerlijk: Eerlijk,
  feiten: Feiten,
  bureaus: Bureaus,
}
