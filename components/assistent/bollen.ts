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
    uitleg: 'Een draaiende bol waar een lime scanlijn op en neer langs beweegt.',
    teken(ctx, s, t) {
      const lijn = Math.sin(t * 0.9) * 1.05
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
