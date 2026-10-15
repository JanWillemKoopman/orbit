'use client'
import { useEffect } from 'react'

// De regie van de hero-video's: een cursor die klikt en schermen die daarop reageren. Alles is een pure
// functie van p (0 tot 1, 12 seconden), zodat elk frame los te renderen is en de lus naadloos sluit:
// capture.mjs roept window.__render(p) aan na het zetten van --p.

const DUUR = 12
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const uit = (x: number) => 1 - Math.pow(1 - x, 3)
const mix = (a: number, b: number, x: number) => a + (b - a) * x

type Punt = { x: number; y: number }
type Weg = Punt & { t: number }

// Alles wat de regie terugzet gebeurt in dit venster rond de lus: de schermen springen dan terug naar het
// begin terwijl het beeld even iets zachter wordt, zodat de overgang niet opvalt.
const RESET = 11.4

function vind<T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(sel))
}
function metTekst(sel: string, tekst: string, root: ParentNode = document) {
  return vind(sel, root).find((e) => e.textContent?.trim() === tekst) ?? null
}
function zetTekst(el: Element | null | undefined, tekst: string) {
  if (el && el.textContent !== tekst) el.textContent = tekst
}
function zetChip(el: Element | null | undefined, tekst: string, tone?: string) {
  if (!el) return
  const last = el.lastChild
  if (last && last.nodeType === 3) {
    if (last.nodeValue !== tekst) last.nodeValue = tekst
  } else zetTekst(el, tekst)
  if (tone) el.setAttribute('data-tone', tone)
}

// Plaats van een element in het vlak (px): de offset-keten tot het venster, plus de positie van het venster zelf.
function inVlak(el: HTMLElement, fx = 0.5, fy = 0.5): Punt {
  let x = 0
  let y = 0
  let n: HTMLElement | null = el
  while (n && !n.classList.contains('hv-win')) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent as HTMLElement | null
  }
  const win = n as HTMLElement
  const s = Number(win.dataset.s)
  return {
    x: Number(win.dataset.x) + (x + el.offsetWidth * fx) * s,
    y: Number(win.dataset.y) + (y + el.offsetHeight * fy) * s,
  }
}

// De cursor volgt een rij punten (t = aankomsttijd) met een zachte versnelling; klikken geven een rimpel.
function cursor(t: number, weg: Weg[], klikken: number[], el: HTMLElement, rimpel: HTMLElement) {
  let pos = weg[0]
  for (let i = 1; i < weg.length; i++) {
    if (t >= weg[i - 1].t && t < weg[i].t) {
      const x = inOut(seg(t, weg[i - 1].t, weg[i].t))
      pos = { t, x: mix(weg[i - 1].x, weg[i].x, x), y: mix(weg[i - 1].y, weg[i].y, x) }
      break
    }
    if (t >= weg[i].t) pos = weg[i]
  }
  const eerste = weg[0].t
  const laatste = weg[weg.length - 1].t
  const zicht = seg(t, eerste - 0.5, eerste) * (1 - seg(t, laatste, laatste + 0.6))
  let druk = 0
  let golf = -1
  for (const c of klikken) {
    druk = Math.max(druk, 1 - Math.abs(clamp((t - (c + 0.05)) / 0.14, -1, 1)))
    if (t >= c && t < c + 0.7) golf = (t - c) / 0.7
  }
  el.style.opacity = String(zicht)
  el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 3px) scale(${2.6 - 0.3 * druk})`
  rimpel.style.opacity = golf < 0 ? '0' : String((1 - golf) * 0.9)
  rimpel.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 2px) scale(${golf < 0 ? 0 : 0.4 + 2.2 * uit(golf)})`
}

const mobiel = () => document.querySelector<HTMLElement>('.hv-root')!.dataset.formaat === 'mobiel'

// Op mobiel schuift het beeld horizontaal mee met de cursor, zodat elke kolom even groot in beeld komt.
function schuif(win: HTMLElement, dx: number) {
  if (win.dataset.bx === undefined) win.dataset.bx = win.dataset.x
  const s = Number(win.dataset.s)
  const x = Number(win.dataset.bx) - dx * s
  win.dataset.x = String(x)
  win.style.transform = `translate3d(${x}px, ${win.dataset.y}px, 0) scale(${s})`
}

/* ── Werkwijze ─────────────────────────────────────────────────────────────── */

function werkwijze() {
  const taken = vind('.ot-task')
  const knoppen = taken.map((t) => t.querySelector<HTMLElement>('.fv-btn')!)
  const chips = taken.map((t) => t.querySelector('.fv-chip')!)
  const kop = taken.map((t) => t.querySelector('strong')!)
  const sub = taken.map((t) => t.querySelector('em')!)
  const stappen = vind('.fv-cycle-step')
  const stapDot = stappen.map((s) => s.querySelector('.fv-cycle-dot')!)
  const vink = stapDot[0].innerHTML
  const badges = vind('.ot-side-item em')
  const notes = vind('.ot-notes')[0]
  let nieuw = notes.querySelector<HTMLElement>('.hv-nieuw')
  if (!nieuw) {
    nieuw = notes.firstElementChild!.cloneNode(true) as HTMLElement
    nieuw.classList.add('hv-nieuw')
    notes.insertBefore(nieuw, notes.firstChild)
  }
  const orig = {
    kop: kop.map((k) => k.textContent!),
    sub: sub.map((k) => k.textContent!),
    chip: chips.map((c) => c.lastChild!.nodeValue!),
    tone: chips.map((c) => c.getAttribute('data-tone')!),
    states: stappen.map((s) => s.getAttribute('data-state')!),
  }
  const klaar = [
    { chip: 'Beantwoord', kop: 'Vragen beantwoord', sub: 'ORBIT ENGINE schrijft nu de tekst', note: ['Vragen beantwoord', 'Over hybride warmtepompen'] },
    { chip: 'Goedgekeurd', kop: 'Tekst goedgekeurd', sub: 'Jaren-30-woning, alle gele zinnen nagelopen', note: ['Tekst goedgekeurd', 'Jaren-30-woning'] },
    { chip: 'Live', kop: 'Pagina staat live', sub: 'Hybride warmtepomp in Houten', note: ['Pagina live', 'Hybride warmtepomp in Houten'] },
  ]
  const C = [2.4, 5.0, 7.6]
  const hermeting = vind('.fv-re-row')

  return (p: number) => {
    const t = p * DUUR
    const tt = t >= RESET ? 0 : t
    const doel = knoppen.map((k) => inVlak(k, 0.5, 0.5))
    const eerste = { x: doel[0].x + 260, y: doel[0].y + 170 }
    const weg: Weg[] = [
      { t: 0.9, ...eerste },
      { t: 2.3, ...doel[0] },
      { t: 2.9, ...doel[0] },
      { t: 4.9, ...doel[1] },
      { t: 5.5, ...doel[1] },
      { t: 7.5, ...doel[2] },
      { t: 8.1, ...doel[2] },
      { t: 9.3, x: doel[2].x + 240, y: doel[2].y - 90 },
    ]
    cursor(t, weg, C, document.querySelector('.hv-cursor')!, document.querySelector('.hv-rimpel')!)

    let gedaan = 0
    taken.forEach((rij, i) => {
      const k = tt >= C[i] ? 1 : 0
      gedaan += k
      const flits = k ? 1 - seg(tt, C[i], C[i] + 0.9) : 0
      rij.style.backgroundColor = `rgba(255,255,255,${0.09 * flits})`
      rij.style.opacity = String(1 - 0.38 * (k ? seg(tt, C[i] + 0.5, C[i] + 1.2) : 0))
      knoppen[i].style.transform = tt >= C[i] - 0.1 && tt < C[i] + 0.15 ? 'scale(0.94)' : ''
      zetTekst(kop[i], k ? klaar[i].kop : orig.kop[i])
      zetTekst(sub[i], k ? klaar[i].sub : orig.sub[i])
      zetChip(chips[i], k ? klaar[i].chip : orig.chip[i], k ? 'lime' : orig.tone[i])
    })

    // Zijbalk en tijdlijn lopen mee: de tellers gaan omlaag, de stappen schuiven op.
    zetTekst(badges[0], String(4 - gedaan))
    zetTekst(badges[1], String(Math.max(0, 2 - (tt >= C[0] ? 2 : 0))))
    const staat = [...orig.states]
    if (tt >= C[1]) { staat[2] = 'done'; staat[3] = 'now' }
    if (tt >= C[2]) { staat[3] = 'done'; staat[4] = 'now' }
    stappen.forEach((s, i) => {
      s.setAttribute('data-state', staat[i])
      const d = stapDot[i]
      const wil = staat[i] === 'done' ? vink : ''
      if (d.innerHTML !== wil) d.innerHTML = wil
    })

    // Een nieuwe melding schuift binnen na elke klik
    const laatste = C.filter((c) => tt >= c).length - 1
    if (laatste >= 0) {
      const n = klaar[laatste].note
      zetTekst(nieuw!.querySelector('strong'), n[0])
      zetTekst(nieuw!.querySelector('em'), n[1])
      zetTekst(nieuw!.querySelector('.ot-note-d'), 'nu')
    }
    const toon = laatste >= 0 ? uit(seg(tt, C[Math.max(0, laatste)] + 0.3, C[Math.max(0, laatste)] + 0.9)) : 0
    nieuw!.style.display = laatste >= 0 ? '' : 'none'
    nieuw!.style.opacity = String(toon)
    nieuw!.style.transform = `translateY(${(1 - toon) * -10}px)`
    nieuw!.style.background = `rgba(255,255,255,${0.06 * (1 - seg(tt, C[Math.max(0, laatste)] + 0.9, C[Math.max(0, laatste)] + 2.4))})`

    // Tweede venster (alleen desktop): de nameting vult zich
    hermeting.forEach((r, i) => {
      const dots = vind('.fv-dots i', r)
      const doelN = [0, 3, 5][i]
      const n = Math.round(doelN * inOut(seg(tt, 1.2 + i * 1.2, 4.2 + i * 1.4)))
      dots.forEach((d, j) => (j < n ? d.setAttribute('data-on', '') : d.removeAttribute('data-on')))
      zetTekst(r.querySelector('strong'), `${n}/8`)
    })
    const verdict = vind<HTMLElement>('.fv-re-verdict')[0]
    if (verdict) { verdict.style.opacity = String(seg(tt, 6.2, 6.9)); verdict.style.transform = `translateY(${(1 - seg(tt, 6.2, 6.9)) * 6}px)` }
  }
}

/* ── Kwaliteit ─────────────────────────────────────────────────────────────── */

function kwaliteit() {
  const zinnen = vind('.wg-doc .fv-yellow')
  const items = vind('.wg-item')
  const itemChip = items.map((i) => i.querySelector('.fv-chip')!)
  const itemR = items.map((i) => i.querySelector('.wg-item-r')!)
  const origR = itemR.map((e) => e.textContent!)
  const origChip = itemChip.map((c) => c.lastChild!.nodeValue!)
  const balk = vind('.wg-win .ag-bar .fv-chip')[0]
  const popover = document.querySelector<HTMLElement>('.hv-pop')!
  const kaart = document.querySelector<HTMLElement>('.gg-card')
  const ggChip = kaart?.querySelector('.fv-chip') ?? null
  const ggBalk = kaart?.querySelector<HTMLElement>('.fv-progress i') ?? null
  const ggTekst = kaart?.querySelector('.fv-small') ?? null
  const ggUit = kaart?.querySelector<HTMLElement>('.gg-off') ?? null
  const ggKnop = kaart ? vind<HTMLElement>('.fv-btn', kaart)[0] : null
  const ggUitHtml = ggUit?.innerHTML ?? ''
  const C = [2.0, 3.8, 5.6, 7.4]
  const KEUR = 9.4

  return (p: number) => {
    const t = p * DUUR
    const tt = t >= RESET ? 0 : t
    const doel = zinnen.map((z) => inVlak(z, 0.35, 0.55))
    const weg: Weg[] = [{ t: 0.9, x: doel[0].x + 200, y: doel[0].y + 150 }]
    doel.forEach((d, i) => {
      weg.push({ t: C[i] - 0.15, ...d }, { t: C[i] + 0.45, ...d })
    })
    let tot = weg[weg.length - 1]
    if (ggUit) {
      const k = inVlak(ggUit, 0.5, 0.5)
      weg.push({ t: KEUR - 0.15, ...k }, { t: KEUR + 0.5, ...k })
      tot = weg[weg.length - 1]
    }
    weg.push({ t: tot.t + 1.1, x: tot.x + 180, y: tot.y - 120 })
    cursor(t, weg, ggUit ? [...C, KEUR] : C, document.querySelector('.hv-cursor')!, document.querySelector('.hv-rimpel')!)

    let klaar = 0
    zinnen.forEach((z, i) => {
      const k = tt >= C[i] + 0.1
      if (k) klaar++
      const w = seg(tt, C[i] + 0.1, C[i] + 0.5)
      z.style.background = k ? `rgba(39,166,68,${mix(0.15, 0.2, w)})` : ''
      z.style.boxShadow = k ? 'inset 0 -2px 0 #27a644' : ''
      zetChip(itemChip[i], k ? 'Nagelopen' : origChip[i], k ? 'lime' : 'geel')
      items[i].style.opacity = String(1 - 0.42 * w)
      zetTekst(itemR[i], k ? 'Nagelopen door jou' : origR[i])
    })
    zetChip(balk, klaar === 4 ? 'Alles nagelopen' : klaar === 3 ? '1 gele zin' : `${4 - klaar} gele zinnen`, klaar === 4 ? 'lime' : 'geel')

    // Popover "Klopt" bij de laatste klik
    const i = C.filter((c) => tt >= c).length - 1
    if (i >= 0 && tt < C[i] + 1.1) {
      const d = doel[i]
      const a = uit(seg(tt, C[i] - 0.02, C[i] + 0.22)) * (1 - seg(tt, C[i] + 0.8, C[i] + 1.1))
      popover.style.opacity = String(a)
      popover.style.transform = `translate3d(${d.x + 26}px, ${d.y - 62 + (1 - a) * 8}px, 3px)`
    } else popover.style.opacity = '0'

    if (kaart && ggChip && ggBalk && ggTekst && ggUit && ggKnop) {
      zetChip(ggChip, klaar === 4 ? 'Alles nagelopen' : klaar === 3 ? '1 gele zin open' : `${4 - klaar} gele zinnen open`, klaar === 4 ? 'lime' : 'geel')
      ggBalk.style.width = `${klaar * 25}%`
      zetTekst(ggTekst, `${klaar} van 4 gele zinnen nagelopen.`)
      if (klaar === 4) {
        ggUit.style.background = 'rgba(255,255,255,0.12)'
        ggUit.style.color = '#d0d6e0'
        ggUit.innerHTML = tt >= KEUR + 0.1 ? 'Goedgekeurd' : 'Keur goed'
      } else {
        ggUit.style.background = ''
        ggUit.style.color = ''
        if (ggUit.innerHTML !== ggUitHtml) ggUit.innerHTML = ggUitHtml
      }
      ggUit.style.transform = tt >= KEUR - 0.1 && tt < KEUR + 0.15 ? 'scale(0.94)' : ''
    }
  }
}

/* ── Beheer ────────────────────────────────────────────────────────────────── */

function beheer() {
  const rijen = vind('.ag-table .ag-tr:not(.ag-th)')
  const gekozen = [0, 1, 3]
  const vink = vind('.ag-check[data-on]')[0].innerHTML
  const checks = rijen.map((r) => r.querySelector<HTMLElement>('.ag-check')!)
  const teller = vind('.ag-bulk-n')[0]
  const m = mobiel()
  // Op mobiel past de Start-knop niet in beeld: daar zet de cursor de maandmeting aan
  const start = m ? metTekst('.ag-bulk .fv-btn', 'Maandmeting aan') as HTMLElement : vind<HTMLElement>('.ag-bulk .fv-btn-primary')[0]
  const celStart = rijen.map((r) => r.children[m ? 3 : 4] as HTMLElement)
  const origStart = celStart.map((c) => c.innerHTML)
  const dialoog = vind<HTMLElement>('.ag-dialog')[0]
  const dialoogKnop = dialoog ? vind<HTMLElement>('.fv-btn-primary', dialoog)[0] : null
  const C = [1.8, 2.9, 4.0]
  const START = 5.6
  const BEVESTIG = 7.6
  const KLAAR = dialoog ? BEVESTIG : START

  return (p: number) => {
    const t = p * DUUR
    const tt = t >= RESET ? 0 : t
    const doel = gekozen.map((g) => inVlak(checks[g], 0.5, 0.5))
    const ds = inVlak(start, 0.5, 0.5)
    const weg: Weg[] = [{ t: 0.8, x: doel[0].x + 130, y: doel[0].y - 110 }]
    doel.forEach((d, i) => weg.push({ t: C[i] - 0.15, ...d }, { t: C[i] + 0.35, ...d }))
    weg.push({ t: START - 0.2, ...ds }, { t: START + 0.5, ...ds })
    const klikken = [...C, START]
    let eind: Punt = ds
    if (dialoog && dialoogKnop) {
      const dk = inVlak(dialoogKnop, 0.5, 0.5)
      weg.push({ t: BEVESTIG - 0.2, ...dk }, { t: BEVESTIG + 0.5, ...dk })
      klikken.push(BEVESTIG)
      eind = dk
    }
    const lt = weg[weg.length - 1].t
    weg.push({ t: lt + 1.1, x: eind.x + 140, y: eind.y + 90 })
    cursor(t, weg, klikken, document.querySelector('.hv-cursor')!, document.querySelector('.hv-rimpel')!)

    let n = 0
    rijen.forEach((r, i) => {
      const g = gekozen.indexOf(i)
      const aan = g >= 0 && tt >= C[g] + 0.1
      if (aan) n++
      const c = checks[i]
      if (aan) { c.setAttribute('data-on', ''); if (!c.firstChild) c.innerHTML = vink } else { c.removeAttribute('data-on'); if (c.firstChild) c.innerHTML = '' }
      if (aan) r.setAttribute('data-on', ''); else r.removeAttribute('data-on')
      const gedaan = g >= 0 && tt >= KLAAR + 0.2
      celStart[i].innerHTML = gedaan ? `<span class="fv-chip" data-tone="lime"><i></i>${m ? 'Aan' : 'Gestart'}</span>` : origStart[i]
      r.style.backgroundColor = gedaan ? `rgba(255,255,255,${0.07 * (1 - seg(tt, KLAAR + 0.6, KLAAR + 2))})` : ''
    })
    zetTekst(teller, n === 0 ? 'Kies bedrijven.' : `${n} gekozen.`)
    start.style.transform = tt >= START - 0.1 && tt < START + 0.15 ? 'scale(0.94)' : ''
    if (!m) start.style.opacity = n === 0 ? '0.55' : '1'

    if (dialoog && dialoogKnop) {
      const open = tt >= START + 0.1 ? uit(seg(tt, START + 0.1, START + 0.6)) * (1 - seg(tt, BEVESTIG + 1.2, BEVESTIG + 1.8)) : 0
      dialoog.style.opacity = String(0.38 + 0.62 * open)
      dialoog.style.transform = `translateY(${(1 - open) * 8}px)`
      dialoogKnop.style.transform = tt >= BEVESTIG - 0.1 && tt < BEVESTIG + 0.15 ? 'scale(0.94)' : ''
      zetTekst(dialoogKnop, tt >= BEVESTIG + 0.1 ? 'Gestart' : 'Start de maand')
    }
  }
}

/* ── AI ────────────────────────────────────────────────────────────────────── */

function ai() {
  const rijen = vind('.wd .wd-row:not(.wd-head)')
  const kop = vind('.wd .wd-head > span')
  const chips = [kop[1], kop[2], kop[3]]
  const vragen = vind<HTMLElement>('.ai-brief-vraag')
  const brief = vind('.ai-brief .fv-chip')[0]
  const slot = vind<HTMLElement>('.ai-brief .ag-lock')[0]
  const C = [1.8, 4.6, 7.4]

  return (p: number) => {
    const t = p * DUUR
    const tt = t >= RESET ? 0 : t
    if (mobiel()) {
      const kolom = [0, 330, 660]
      const v1 = inOut(seg(tt, C[1] - 1.3, C[1] - 0.4))
      const v2 = inOut(seg(tt, C[2] - 1.3, C[2] - 0.4))
      schuif(document.querySelector<HTMLElement>('.hv-win')!, kolom[1] * v1 + (kolom[2] - kolom[1]) * v2)
    }
    const doel = chips.map((c) => inVlak(c.firstElementChild as HTMLElement, 0.5, 0.5))
    const weg: Weg[] = [{ t: 0.8, x: doel[0].x - 160, y: doel[0].y + 190 }]
    doel.forEach((d, i) => weg.push({ t: C[i] - 0.2, ...d }, { t: C[i] + 0.4, ...d }))
    // Daarna loopt de cursor mee langs de kolom van Jij
    const jij = rijen.map((r) => r.children[3] as HTMLElement)
    const laatste = inVlak(jij[3], 0.3, 0.5)
    weg.push({ t: 9.6, ...laatste })
    cursor(t, weg, C, document.querySelector('.hv-cursor')!, document.querySelector('.hv-rimpel')!)

    // Gekozen kolom: kleurt op, de andere kolommen worden zachter, en de rijen komen als een golf binnen
    const actief = C.filter((c) => tt >= c - 0.05).length - 1
    rijen.forEach((r, i) => {
      for (let k = 0; k < 3; k++) {
        const cel = r.children[k + 1] as HTMLElement
        const aan = k === actief
        const w = actief < 0 ? 0 : seg(tt, C[actief] + i * 0.07, C[actief] + i * 0.07 + 0.35)
        cel.style.opacity = actief < 0 ? '1' : String(aan ? mix(0.5, 1, w) : mix(1, 0.4, w))
        cel.style.color = aan && w > 0.5 ? '#f7f8f8' : ''
      }
    })
    chips.forEach((c, i) => {
      const el = c.firstElementChild as HTMLElement
      el.style.transform = tt >= C[i] - 0.1 && tt < C[i] + 0.15 ? 'scale(0.92)' : ''
      el.style.opacity = actief < 0 ? '1' : String(i === actief ? 1 : 0.5)
    })

    // Tweede venster (alleen desktop): de brief vult zich met de vragen
    vragen.forEach((v, i) => {
      const a = uit(seg(tt, 2.2 + i * 1.6, 3.0 + i * 1.6))
      v.style.opacity = String(a)
      v.style.transform = `translateX(${(1 - a) * 14}px)`
    })
    if (brief) {
      const n = vragen.filter((_, i) => tt >= 2.4 + i * 1.6).length
      zetChip(brief, `${n} vragen`, n === 3 ? 'lime' : 'oranje')
    }
    if (slot) slot.style.opacity = String(seg(tt, 7.2, 7.8))
  }
}

const PAGINA: Record<string, () => (p: number) => void> = { werkwijze, kwaliteit, beheer, ai }

export function Regie({ pagina }: { pagina: string }) {
  useEffect(() => {
    let render: ((p: number) => void) | null = null
    ;(window as unknown as { __render: (p: number) => void }).__render = (p: number) => {
      if (!render) render = PAGINA[pagina]()
      render(p)
      const dip = 1 - 0.5 * Math.max(0, 1 - Math.abs(p * DUUR - RESET) / 0.55)
      const cam = document.querySelector<HTMLElement>('.hv-cam')
      if (cam) cam.style.opacity = String(dip)
    }
  }, [pagina])
  return (
    <>
      <div className="hv-cursor" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 2l14.5 7-6.2 1.9L8.6 17.5z" fill="#fff" stroke="#0b0c0d" strokeWidth="1.3" strokeLinejoin="round" /></svg>
      </div>
      <div className="hv-rimpel" aria-hidden="true" />
      <div className="hv-pop" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7" /></svg>Klopt</div>
    </>
  )
}
