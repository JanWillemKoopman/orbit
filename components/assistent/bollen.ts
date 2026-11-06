// Varianten van de bol van de assistent rechtsonder (components/assistent/DotBol.tsx). Elke variant tekent
// één beeld op tijdstip t (seconden) in een vierkant canvas van `s` CSS-pixels. De bol heeft straal 1 in
// eigen eenheden; dat is 36% van het canvas, zodat ringen en banen er nog omheen passen. Diepte komt van
// dekking en stipgrootte: de voorkant is helder en groot, de achterkant flauw en klein.

const TAU = Math.PI * 2
const GRIJS = '208,214,224' // --text-secondary
const LIME = '188,255,47' // --accent

type V3 = [number, number, number]

/** Draai om de y-as (hoek ay) en daarna om de x-as (hoek ax). */
function draai([x, y, z]: V3, ay: number, ax: number): V3 {
  const cy = Math.cos(ay), sy = Math.sin(ay)
  const x1 = x * cy + z * sy
  const z1 = -x * sy + z * cy
  const cx = Math.cos(ax), sx = Math.sin(ax)
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx]
}

/** Teken één stip. `g` schaalt de grootte, `a` de dekking. */
function stip(ctx: CanvasRenderingContext2D, s: number, [x, y, z]: V3, g = 1, lime = false, a = 1) {
  const R = s * 0.36
  const voor = Math.min(1, Math.max(0, (z / 1.3 + 1) / 2))
  const alpha = a * (0.1 + 0.9 * voor * voor)
  if (alpha < 0.02) return
  ctx.fillStyle = `rgba(${lime ? LIME : GRIJS},${Math.min(1, alpha)})`
  ctx.beginPath()
  ctx.arc(s / 2 + x * R, s / 2 + y * R, Math.max(0.35, (s / 64) * g * (0.55 + 0.6 * voor)), 0, TAU)
  ctx.fill()
}

function fibonacci(n: number): V3[] {
  const uit: V3[] = []
  const gulden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    uit.push([Math.cos(i * gulden) * r, y, Math.sin(i * gulden) * r])
  }
  return uit
}

function rnd(seed: number) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

const KANTEL = 0.42
const BOL150 = fibonacci(150)
const BOL220 = fibonacci(220)

export type Bol = { naam: string; uitleg: string; teken: (ctx: CanvasRenderingContext2D, s: number, t: number) => void }

export const BOLLEN = {
  // De huidige bol: gelijkmatig verdeelde stippen, een paar lime, heel langzaam draaiend.
  stippen: {
    naam: 'Huidig',
    uitleg: 'Gelijkmatig verdeelde stippen die heel langzaam draaien.',
    teken(ctx, s, t) {
      BOL150.forEach((p, i) => stip(ctx, s, draai(p, t * 0.22, KANTEL), i % 9 === 4 ? 1.25 : 1, i % 9 === 4))
    },
  },

  ringen: {
    naam: 'Gyroscoop',
    uitleg: 'Drie ringen van stippen die elk om een eigen as draaien.',
    teken(ctx, s, t) {
      const n = 46
      for (let k = 0; k < 3; k++) {
        const kant = 0.5 + k * 1.05
        const snelheid = [0.35, -0.5, 0.25][k]
        for (let i = 0; i < n; i++) {
          const a = (i / n) * TAU
          let p: V3 = [Math.cos(a), Math.sin(a), 0]
          p = draai(p, 0, kant)
          p = draai(p, t * snelheid + k, KANTEL * 0.5)
          stip(ctx, s, p, k === 1 ? 1.15 : 0.95, k === 1)
        }
      }
    },
  },

  atoom: {
    naam: 'Atoom',
    uitleg: 'Een kern van stippen met drie banen, elk met een lime deeltje en een staart.',
    teken(ctx, s, t) {
      const kern = fibonacci(46)
      kern.forEach((p) => stip(ctx, s, draai([p[0] * 0.34, p[1] * 0.34, p[2] * 0.34], t * 0.5, KANTEL), 0.9))
      for (let k = 0; k < 3; k++) {
        const kant = (k / 3) * Math.PI
        const baan = (a: number): V3 => draai(draai([Math.cos(a) * 1.05, 0, Math.sin(a) * 1.05], 0, 1.15), kant, 0.25)
        for (let i = 0; i < 40; i++) stip(ctx, s, baan((i / 40) * TAU), 0.55, false, 0.35)
        const kop = t * (0.9 + k * 0.25) + k * 2
        for (let j = 0; j < 7; j++) stip(ctx, s, baan(kop - j * 0.09), 1.6 - j * 0.18, true, 1 - j * 0.13)
      }
    },
  },

  meridianen: {
    naam: 'Wereldbol',
    uitleg: 'Lengte- en breedtegraden van stippen, als een draaiende wereldbol.',
    teken(ctx, s, t) {
      const ay = t * 0.2
      for (let m = 0; m < 12; m++) {
        const lon = (m / 12) * TAU
        for (let i = 1; i < 22; i++) {
          const lat = (i / 22) * Math.PI - Math.PI / 2
          stip(ctx, s, draai([Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)], ay, KANTEL), 0.75)
        }
      }
      for (const lat of [-0.9, -0.45, 0, 0.45, 0.9]) {
        const n = Math.round(40 * Math.cos(lat))
        for (let i = 0; i < n; i++) {
          const lon = (i / n) * TAU
          stip(ctx, s, draai([Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)], ay, KANTEL), lat === 0 ? 1 : 0.75, lat === 0)
        }
      }
    },
  },

  helix: {
    naam: 'Helix',
    uitleg: 'Twee strengen stippen die als een spiraal van pool tot pool om de bol lopen.',
    teken(ctx, s, t) {
      const n = 130
      for (let streng = 0; streng < 2; streng++) {
        for (let i = 0; i < n; i++) {
          const u = i / (n - 1)
          const y = 1 - 2 * u
          const r = Math.sqrt(Math.max(0, 1 - y * y))
          const a = u * Math.PI * 9 + streng * Math.PI
          stip(ctx, s, draai([Math.cos(a) * r, y, Math.sin(a) * r], t * 0.35, KANTEL), streng ? 1.1 : 0.9, streng === 1)
        }
      }
    },
  },

  golf: {
    naam: 'Puls',
    uitleg: 'Een bol waar telkens een golf van pool naar pool doorheen trekt en de stippen laat opzwellen.',
    teken(ctx, s, t) {
      const golf = ((t * 0.45) % 1) * 2.8 - 1.4
      BOL220.forEach((p) => {
        const q = draai(p, t * 0.15, KANTEL)
        const g = Math.exp(-((p[1] - golf) ** 2) / 0.025)
        stip(ctx, s, q, 0.8 + g * 1.3, g > 0.45, 0.75 + g * 0.5)
      })
    },
  },

  zwerm: {
    naam: 'Zwerm',
    uitleg: 'Honderden deeltjes die elk in een eigen baan rond het midden zweven.',
    teken: (() => {
      const r = rnd(42)
      const deeltjes = Array.from({ length: 240 }, () => ({
        straal: 0.55 + r() * 0.5,
        ay: r() * TAU,
        ax: r() * Math.PI,
        fase: r() * TAU,
        snel: (0.25 + r() * 0.45) * (r() < 0.5 ? -1 : 1),
        lime: r() < 0.08,
      }))
      return (ctx: CanvasRenderingContext2D, s: number, t: number) => {
        for (const d of deeltjes) {
          const a = d.fase + t * d.snel
          stip(ctx, s, draai([Math.cos(a) * d.straal, Math.sin(a) * d.straal, 0], d.ay, d.ax), d.lime ? 1.2 : 0.85, d.lime)
        }
      }
    })(),
  },

  geodeet: {
    naam: 'Geodeet',
    uitleg: 'Een geodetische koepel: hoekpunten in lime, verbonden door lijnen van stippen.',
    teken: (() => {
      const f = (1 + Math.sqrt(5)) / 2
      const ruw: V3[] = [
        [-1, f, 0], [1, f, 0], [-1, -f, 0], [1, -f, 0], [0, -1, f], [0, 1, f],
        [0, -1, -f], [0, 1, -f], [f, 0, -1], [f, 0, 1], [-f, 0, -1], [-f, 0, 1],
      ]
      const hoeken = ruw.map(([x, y, z]) => { const l = Math.hypot(x, y, z); return [x / l, y / l, z / l] as V3 })
      const ribben: [number, number][] = []
      for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) {
        const [a, b] = [hoeken[i], hoeken[j]]
        if (Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 1.1) ribben.push([i, j])
      }
      return (ctx: CanvasRenderingContext2D, s: number, t: number) => {
        const ay = t * 0.2, ax = 0.35 + Math.sin(t * 0.15) * 0.2
        for (const [i, j] of ribben) {
          const [a, b] = [hoeken[i], hoeken[j]]
          for (let k = 1; k < 8; k++) {
            const u = k / 8
            const p: V3 = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u]
            const l = Math.hypot(...p)
            stip(ctx, s, draai([p[0] / l, p[1] / l, p[2] / l], ay, ax), 0.6)
          }
        }
        hoeken.forEach((p) => stip(ctx, s, draai(p, ay, ax), 1.7, true))
      }
    })(),
  },

  saturnus: {
    naam: 'Planeet',
    uitleg: 'Een kleinere bol met een gekantelde ring van stippen eromheen.',
    teken(ctx, s, t) {
      const R = 0.62
      fibonacci(110).forEach((p) => stip(ctx, s, draai([p[0] * R, p[1] * R, p[2] * R], t * 0.2, KANTEL), 0.85))
      for (let baan = 0; baan < 2; baan++) {
        const n = 70 + baan * 14
        const r = 0.98 + baan * 0.14
        for (let i = 0; i < n; i++) {
          const a = (i / n) * TAU + t * (0.3 - baan * 0.08)
          const p = draai(draai([Math.cos(a) * r, 0, Math.sin(a) * r], 0, 0.38), 0.3, 0)
          if (p[2] < 0 && Math.hypot(p[0], p[1]) < R) continue // achter de planeet
          stip(ctx, s, p, baan ? 0.7 : 0.9, baan === 0 && i % 5 === 0)
        }
      }
    },
  },

  scanner: {
    naam: 'Scanner',
    uitleg: 'Een draaiende bol waar een lime scanlijn op en neer langs beweegt, met telkens tien seconden rust.',
    teken(ctx, s, t) {
      // Eén keer op en neer in 5 seconden, daarna 10 seconden rust. De lijn begint en eindigt net boven de
      // bol, zodat hij niet plotseling verschijnt; in de rust staat hij buiten beeld.
      const SCAN = 5, RUST = 10
      const fase = t % (SCAN + RUST)
      const lijn = fase < SCAN ? -Math.cos((fase / SCAN) * TAU) * 1.25 : -9
      BOL220.forEach((p) => {
        const q = draai(p, t * 0.18, KANTEL)
        const g = Math.exp(-((q[1] - lijn) ** 2) / 0.006)
        stip(ctx, s, q, 0.75 + g * 0.9, g > 0.3, 0.6 + g * 0.6)
      })
    },
  },

  kubus: {
    naam: 'Kristal',
    uitleg: 'Stippen die langzaam heen en weer vloeien tussen een bol en een kubus.',
    teken(ctx, s, t) {
      const m = 0.5 - 0.5 * Math.cos(t * 0.5) // 0 = bol, 1 = kubus
      BOL220.forEach((p, i) => {
        const max = Math.max(Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2]))
        const k = 0.78 / max
        const q: V3 = [p[0] * (1 + (k - 1) * m), p[1] * (1 + (k - 1) * m), p[2] * (1 + (k - 1) * m)]
        stip(ctx, s, draai(q, t * 0.25, KANTEL), 0.85, i % 11 === 3)
      })
    },
  },
} satisfies Record<string, Bol>

export type BolNaam = keyof typeof BOLLEN

// ---------------------------------------------------------------------------------------------
// Reeks 2: bollen zonder stippen. Glas, licht, lijnen en ringen, in dezelfde kleuren.
// ---------------------------------------------------------------------------------------------

const rgba = (kleur: string, a: number) => `rgba(${kleur},${Math.max(0, Math.min(1, a))})`

function cirkelPad(ctx: CanvasRenderingContext2D, c: number, r: number) {
  ctx.beginPath()
  ctx.arc(c, c, r, 0, TAU)
}

function gloed(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, kleur: string, a: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(kleur, a))
  g.addColorStop(1, rgba(kleur, 0))
  ctx.fillStyle = g
  ctx.fillRect(x - r, y - r, r * 2, r * 2)
}

/** Een bol met licht van linksboven en een donkere onderrand, als basis voor de vlakke varianten. */
function basisBol(ctx: CanvasRenderingContext2D, c: number, R: number) {
  const g = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.05, c, c, R)
  g.addColorStop(0, '#2a2c30')
  g.addColorStop(0.55, '#141516')
  g.addColorStop(1, '#08090a')
  ctx.fillStyle = g
  cirkelPad(ctx, c, R)
  ctx.fill()
}

function rand(ctx: CanvasRenderingContext2D, c: number, R: number, s: number) {
  ctx.lineWidth = Math.max(1, s / 176)
  ctx.strokeStyle = 'rgba(255,255,255,0.14)'
  cirkelPad(ctx, c, R - ctx.lineWidth / 2)
  ctx.stroke()
}

export const VRIJE_BOLLEN = {
  glas: {
    naam: 'Glas',
    uitleg: 'Een glazen bol waarin een lime licht langzaam rondzweeft, met een glimlicht bovenop.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.42
      basisBol(ctx, c, R)
      ctx.save()
      cirkelPad(ctx, c, R)
      ctx.clip()
      ctx.globalCompositeOperation = 'lighter'
      gloed(ctx, c + Math.cos(t * 0.5) * R * 0.35, c + Math.sin(t * 0.7) * R * 0.3 + R * 0.15, R * 0.95, LIME, 0.55)
      gloed(ctx, c - Math.cos(t * 0.4) * R * 0.4, c - Math.sin(t * 0.55) * R * 0.25, R * 0.7, GRIJS, 0.22)
      ctx.globalCompositeOperation = 'source-over'
      const schaduw = ctx.createRadialGradient(c, c - R * 0.2, R * 0.6, c, c, R * 1.05)
      schaduw.addColorStop(0, 'rgba(8,9,10,0)')
      schaduw.addColorStop(1, 'rgba(8,9,10,0.85)')
      ctx.fillStyle = schaduw
      ctx.fillRect(0, 0, s, s)
      const glim = ctx.createRadialGradient(c - R * 0.35, c - R * 0.5, 0, c - R * 0.35, c - R * 0.5, R * 0.45)
      glim.addColorStop(0, 'rgba(255,255,255,0.55)')
      glim.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = glim
      ctx.beginPath()
      ctx.ellipse(c - R * 0.35, c - R * 0.5, R * 0.42, R * 0.26, -0.5, 0, TAU)
      ctx.fill()
      ctx.restore()
      rand(ctx, c, R, s)
    },
  },

  plasma: {
    naam: 'Plasma',
    uitleg: 'Vloeiende vlekken van licht die in de bol in elkaar overlopen, als plasma in een kogel.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.42
      ctx.fillStyle = '#08090a'
      cirkelPad(ctx, c, R)
      ctx.fill()
      ctx.save()
      cirkelPad(ctx, c, R)
      ctx.clip()
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < 6; i++) {
        const a = t * (0.35 + i * 0.09) + i * 1.7
        const x = c + Math.cos(a) * R * (0.25 + 0.3 * Math.sin(t * 0.3 + i))
        const y = c + Math.sin(a * 1.3) * R * (0.3 + 0.2 * Math.cos(t * 0.25 + i))
        gloed(ctx, x, y, R * (0.55 + 0.15 * Math.sin(t + i)), i % 3 === 2 ? GRIJS : LIME, i % 3 === 2 ? 0.28 : 0.38)
      }
      ctx.globalCompositeOperation = 'source-over'
      const v = ctx.createRadialGradient(c, c, R * 0.5, c, c, R)
      v.addColorStop(0, 'rgba(8,9,10,0)')
      v.addColorStop(1, 'rgba(8,9,10,0.9)')
      ctx.fillStyle = v
      ctx.fillRect(0, 0, s, s)
      ctx.restore()
      rand(ctx, c, R, s)
    },
  },

  draad: {
    naam: 'Draadmodel',
    uitleg: 'Een draaiende bol van dunne lijnen, met één lime meridiaan.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.4
      const lijn = (pts: V3[], lime: boolean) => {
        for (let i = 0; i < pts.length - 1; i++) {
          const [a, b] = [pts[i], pts[i + 1]]
          const voor = ((a[2] + b[2]) / 2 + 1) / 2
          ctx.strokeStyle = rgba(lime ? LIME : GRIJS, (lime ? 0.2 : 0.06) + voor * voor * (lime ? 0.9 : 0.6))
          ctx.lineWidth = Math.max(0.6, (s / 176) * (lime ? 1.6 : 1) * (0.6 + 0.6 * voor))
          ctx.beginPath()
          ctx.moveTo(c + a[0] * R, c + a[1] * R)
          ctx.lineTo(c + b[0] * R, c + b[1] * R)
          ctx.stroke()
        }
      }
      for (let m = 0; m < 12; m++) {
        const lon = (m / 12) * Math.PI
        const pts: V3[] = []
        for (let i = 0; i <= 48; i++) {
          const a = (i / 48) * TAU
          pts.push(draai([Math.cos(a) * Math.cos(lon), Math.sin(a), Math.cos(a) * Math.sin(lon)], t * 0.25, KANTEL))
        }
        lijn(pts, m === 0)
      }
      for (const lat of [-1.05, -0.55, 0, 0.55, 1.05]) {
        const pts: V3[] = []
        for (let i = 0; i <= 48; i++) {
          const a = (i / 48) * TAU
          pts.push(draai([Math.cos(lat) * Math.cos(a), Math.sin(lat), Math.cos(lat) * Math.sin(a)], t * 0.25, KANTEL))
        }
        lijn(pts, false)
      }
    },
  },

  topografie: {
    naam: 'Topografie',
    uitleg: 'Hoogtelijnen die in de bol golven, met telkens één lime lijn die naar buiten loopt.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.42
      basisBol(ctx, c, R)
      ctx.save()
      cirkelPad(ctx, c, R)
      ctx.clip()
      const n = 11
      const actief = (t * 1.2) % n
      for (let k = 1; k <= n; k++) {
        const basis = (k / n) * R * 1.1
        ctx.beginPath()
        for (let i = 0; i <= 90; i++) {
          const th = (i / 90) * TAU
          const golf = Math.sin(3 * th + t * 0.6 + k * 0.7) * 0.5 + Math.sin(5 * th - t * 0.45 + k * 1.3) * 0.3
          const r = basis * (1 + 0.07 * golf)
          const x = c + Math.cos(th) * r, y = c + Math.sin(th) * r * 0.92
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const licht = Math.max(0, 1 - Math.abs(k - actief) * 1.2)
        ctx.strokeStyle = licht > 0.05 ? rgba(LIME, 0.25 + licht * 0.75) : rgba(GRIJS, 0.12 + 0.18 * (1 - k / n))
        ctx.lineWidth = Math.max(0.7, (s / 176) * (1 + licht))
        ctx.stroke()
      }
      ctx.restore()
      rand(ctx, c, R, s)
    },
  },

  eclips: {
    naam: 'Eclips',
    uitleg: 'Een zwarte bol voor een lime corona die zachtjes flakkert, als een zonsverduistering.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.31
      ctx.globalCompositeOperation = 'lighter'
      gloed(ctx, c, c, R * 1.6, LIME, 0.28)
      const n = 120
      for (let i = 0; i < n; i++) {
        const th = (i / n) * TAU
        const f = 0.5 + 0.5 * Math.sin(th * 7 + t * 1.3) * Math.sin(th * 3 - t * 0.8 + 1)
        const len = R * (0.12 + 0.38 * f * f)
        ctx.strokeStyle = rgba(LIME, 0.15 + 0.45 * f)
        ctx.lineWidth = Math.max(0.6, s / 220)
        ctx.beginPath()
        ctx.moveTo(c + Math.cos(th) * R, c + Math.sin(th) * R)
        ctx.lineTo(c + Math.cos(th) * (R + len), c + Math.sin(th) * (R + len))
        ctx.stroke()
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#08090a'
      cirkelPad(ctx, c, R)
      ctx.fill()
      const rim = ctx.createLinearGradient(c, c - R, c, c + R)
      rim.addColorStop(0, 'rgba(255,255,255,0.7)')
      rim.addColorStop(0.5, 'rgba(255,255,255,0.05)')
      rim.addColorStop(1, 'rgba(188,255,47,0.4)')
      ctx.strokeStyle = rim
      ctx.lineWidth = Math.max(1, s / 120)
      cirkelPad(ctx, c, R)
      ctx.stroke()
    },
  },

  radar: {
    naam: 'Radar',
    uitleg: 'Een radarscherm met een draaiende lime bundel die oplichtende punten vindt.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.42
      ctx.fillStyle = '#0f1011'
      cirkelPad(ctx, c, R)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = Math.max(0.6, s / 176)
      for (const f of [0.33, 0.66]) { cirkelPad(ctx, c, R * f); ctx.stroke() }
      ctx.beginPath()
      ctx.moveTo(c - R, c); ctx.lineTo(c + R, c); ctx.moveTo(c, c - R); ctx.lineTo(c, c + R)
      ctx.stroke()
      const hoek = (t * 1.1) % TAU
      for (let i = 0; i < 40; i++) {
        const a0 = hoek - (i + 1) * 0.04, a1 = hoek - i * 0.04
        ctx.fillStyle = rgba(LIME, 0.35 * (1 - i / 40) ** 2)
        ctx.beginPath()
        ctx.moveTo(c, c)
        ctx.arc(c, c, R, a0, a1)
        ctx.closePath()
        ctx.fill()
      }
      ctx.strokeStyle = rgba(LIME, 0.9)
      ctx.lineWidth = Math.max(1, s / 140)
      ctx.beginPath(); ctx.moveTo(c, c); ctx.lineTo(c + Math.cos(hoek) * R, c + Math.sin(hoek) * R); ctx.stroke()
      const punten: [number, number][] = [[0.4, 0.5], [0.7, 2.1], [0.55, 3.6], [0.85, 4.4], [0.25, 5.5]]
      for (const [r, a] of punten) {
        const sinds = ((hoek - a) % TAU + TAU) % TAU
        const licht = Math.exp(-sinds * 0.9)
        const x = c + Math.cos(a) * r * R, y = c + Math.sin(a) * r * R
        gloed(ctx, x, y, s * 0.05, LIME, licht * 0.8)
        ctx.fillStyle = rgba(licht > 0.1 ? LIME : GRIJS, 0.2 + licht * 0.8)
        ctx.beginPath(); ctx.arc(x, y, Math.max(1, s / 90), 0, TAU); ctx.fill()
      }
      rand(ctx, c, R, s)
    },
  },

  stem: {
    naam: 'Stem',
    uitleg: 'Een ring van balkjes die meebeweegt alsof de assistent praat.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.26
      ctx.globalCompositeOperation = 'lighter'
      gloed(ctx, c, c, R * 1.1, LIME, 0.12)
      ctx.globalCompositeOperation = 'source-over'
      const n = 64
      ctx.lineCap = 'round'
      for (let i = 0; i < n; i++) {
        const th = (i / n) * TAU - Math.PI / 2
        const f = Math.abs(Math.sin(th * 3 + t * 2.1) * 0.6 + Math.sin(th * 5 - t * 1.4) * 0.4) * (0.6 + 0.4 * Math.sin(t * 1.7))
        const len = R * (0.12 + 0.6 * f)
        ctx.strokeStyle = f > 0.55 ? rgba(LIME, 0.6 + f * 0.4) : rgba(GRIJS, 0.35 + f * 0.5)
        ctx.lineWidth = Math.max(1, s / 90)
        ctx.beginPath()
        ctx.moveTo(c + Math.cos(th) * R, c + Math.sin(th) * R)
        ctx.lineTo(c + Math.cos(th) * (R + len), c + Math.sin(th) * (R + len))
        ctx.stroke()
      }
      ctx.lineCap = 'butt'
      const kern = ctx.createRadialGradient(c - R * 0.3, c - R * 0.3, 0, c, c, R * 0.82)
      kern.addColorStop(0, '#2a2c30')
      kern.addColorStop(1, '#0f1011')
      ctx.fillStyle = kern
      cirkelPad(ctx, c, R * 0.82)
      ctx.fill()
    },
  },

  strepen: {
    naam: 'Strepen',
    uitleg: 'Een bol met schuine strepen die langzaam omhoog schuiven, in de lijn van het Orbit-logo.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.42
      ctx.save()
      cirkelPad(ctx, c, R)
      ctx.clip()
      ctx.fillStyle = '#0f1011'
      ctx.fillRect(0, 0, s, s)
      ctx.translate(c, c)
      ctx.rotate(-0.5)
      const stap = R * 0.34
      const schuif = (t * R * 0.12) % stap
      for (let y = -R * 1.6 - schuif; y < R * 1.6; y += stap) {
        const midden = 1 - Math.abs(y) / (R * 1.4)
        ctx.fillStyle = rgba('247,248,248', 0.35 + 0.6 * Math.max(0, midden))
        ctx.fillRect(-R * 1.5, y, R * 3, stap * 0.52)
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      const dpr = ctx.canvas.width / s
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const licht = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R * 1.05)
      licht.addColorStop(0, 'rgba(8,9,10,0)')
      licht.addColorStop(0.7, 'rgba(8,9,10,0.35)')
      licht.addColorStop(1, 'rgba(8,9,10,0.9)')
      ctx.fillStyle = licht
      ctx.fillRect(0, 0, s, s)
      ctx.globalCompositeOperation = 'lighter'
      gloed(ctx, c + R * 0.35, c + R * 0.45, R * 0.7, LIME, 0.25 + 0.1 * Math.sin(t * 0.8))
      ctx.restore()
      rand(ctx, c, R, s)
    },
  },

  knoop: {
    naam: 'Knoop',
    uitleg: 'Eén doorlopende lijn die een draaiende knoop vormt, met een lime puls die erlangs reist.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.27
      const n = 220
      const pts: V3[] = []
      for (let i = 0; i <= n; i++) {
        const u = (i / n) * TAU
        const r = 1 + 0.42 * Math.cos(3 * u)
        // Draai de knoop in zijn eigen vlak en kantel hem een beetje, zodat je er van schuin boven op kijkt.
        const hoek = 2 * u + t * 0.3
        pts.push(draai([r * Math.cos(hoek), r * Math.sin(hoek), 0.5 * Math.sin(3 * u)], Math.sin(t * 0.25) * 0.35, 0.55))
      }
      const kop = ((t * 0.12) % 1) * n
      ctx.lineCap = 'round'
      for (let i = 0; i < n; i++) {
        const [a, b] = [pts[i], pts[i + 1]]
        const voor = Math.min(1, Math.max(0, ((a[2] + b[2]) / 2 / 1.4 + 1) / 2))
        const afstand = ((kop - i) % n + n) % n
        const puls = afstand < 40 ? 1 - afstand / 40 : 0
        ctx.strokeStyle = puls > 0.05 ? rgba(LIME, 0.3 + 0.7 * puls) : rgba(GRIJS, 0.12 + 0.75 * voor * voor)
        ctx.lineWidth = Math.max(0.8, (s / 176) * (1.2 + 1.6 * voor + puls))
        ctx.beginPath()
        ctx.moveTo(c + a[0] * R, c + a[1] * R)
        ctx.lineTo(c + b[0] * R, c + b[1] * R)
        ctx.stroke()
      }
      ctx.lineCap = 'butt'
    },
  },

  lens: {
    naam: 'Lens',
    uitleg: 'Een cameralens waarvan het diafragma langzaam opengaat en sluit rond een lime kern.',
    teken(ctx, s, t) {
      const c = s / 2, R = s * 0.42
      basisBol(ctx, c, R)
      const open = R * (0.28 + 0.16 * Math.sin(t * 0.7))
      const draaiing = t * 0.15 + Math.sin(t * 0.7) * 0.3
      ctx.globalCompositeOperation = 'lighter'
      gloed(ctx, c, c, open * 1.3, LIME, 0.55)
      ctx.globalCompositeOperation = 'source-over'
      ctx.save()
      cirkelPad(ctx, c, R * 0.86)
      ctx.clip()
      const n = 7
      for (let i = 0; i < n; i++) {
        const phi = (i / n) * TAU + draaiing
        const px = c + Math.cos(phi) * open, py = c + Math.sin(phi) * open
        const dx = -Math.sin(phi), dy = Math.cos(phi)
        // Elk blad is het vlak aan de buitenkant van een raaklijn aan de opening.
        ctx.beginPath()
        ctx.moveTo(px - dx * R * 2, py - dy * R * 2)
        ctx.lineTo(px + dx * R * 2, py + dy * R * 2)
        ctx.lineTo(px + dx * R * 2 + Math.cos(phi) * R * 2, py + dy * R * 2 + Math.sin(phi) * R * 2)
        ctx.lineTo(px - dx * R * 2 + Math.cos(phi) * R * 2, py - dy * R * 2 + Math.sin(phi) * R * 2)
        ctx.closePath()
        ctx.fillStyle = i % 2 ? 'rgba(25,26,27,0.92)' : 'rgba(20,21,22,0.92)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.16)'
        ctx.lineWidth = Math.max(0.6, s / 200)
        ctx.beginPath()
        ctx.moveTo(px - dx * R * 2, py - dy * R * 2)
        ctx.lineTo(px + dx * R * 2, py + dy * R * 2)
        ctx.stroke()
      }
      ctx.restore()
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'
      ctx.lineWidth = Math.max(1, s / 110)
      cirkelPad(ctx, c, R * 0.86)
      ctx.stroke()
      rand(ctx, c, R, s)
    },
  },
} satisfies Record<string, Bol>

export type VrijeBolNaam = keyof typeof VRIJE_BOLLEN
export const ALLE_BOLLEN: Record<BolNaam | VrijeBolNaam, Bol> = { ...BOLLEN, ...VRIJE_BOLLEN }
