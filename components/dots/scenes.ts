// Dot-achtergronden voor de afsluiter onderaan de pagina's (zie components/CtaAchtergrond.tsx). Terrein,
// baan, stroming, rimpeling en golven wisselen elkaar per bezoeker af op de site (ROTATIE); stelsel, wereldbol
// en halftoon staan alleen op de testpagina /visualisaties.
// Elke scène tekent per frame duizenden stippen op een 2D-canvas. Het kleurenpalet is dat van de
// huidige nevel: grijs-wit (--text-secondary) op bijna-zwart, met het lime accent (--accent) in de toppen.
// Alle maten zijn CSS-pixels; het canvas schaalt zelf naar de devicePixelRatio.

const TAU = Math.PI * 2

// ---------------------------------------------------------------------------------------------
// Ruis: 3D value noise met quintische interpolatie, plus een fbm met twee of drie octaven.
// ---------------------------------------------------------------------------------------------

const PERM = new Uint8Array(512)
const VALS = new Float32Array(256)
;(() => {
  let s = 1337
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255]
  for (let i = 0; i < 256; i++) VALS[i] = rnd()
})()

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function noise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = x - xi, yf = y - yi, zf = z - zi
  const X = xi & 255, Y = yi & 255, Z = zi & 255
  const u = fade(xf), v = fade(yf), w = fade(zf)
  const a = PERM[X] + Y, aa = PERM[a] + Z, ab = PERM[a + 1] + Z
  const b = PERM[X + 1] + Y, ba = PERM[b] + Z, bb = PERM[b + 1] + Z
  return lerp(
    lerp(lerp(VALS[PERM[aa]], VALS[PERM[ba]], u), lerp(VALS[PERM[ab]], VALS[PERM[bb]], u), v),
    lerp(lerp(VALS[PERM[aa + 1]], VALS[PERM[ba + 1]], u), lerp(VALS[PERM[ab + 1]], VALS[PERM[bb + 1]], u), v),
    w,
  )
}

function fbm(x: number, y: number, z: number, octaven = 3): number {
  let som = 0, amp = 0.5, freq = 1, norm = 0
  for (let i = 0; i < octaven; i++) {
    som += amp * noise3(x * freq, y * freq, z * freq)
    norm += amp
    amp *= 0.5
    freq *= 2.03
  }
  return som / norm
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

// ---------------------------------------------------------------------------------------------
// Batch: stippen worden per kleur en dekking gebundeld en per bundel met één fill() getekend.
// Kleur loopt in 12 stappen van grijs-wit naar lime, dekking in 16 stappen.
// ---------------------------------------------------------------------------------------------

const KLEUREN = 12
const DEKKING = 16
const GRIJS = [208, 214, 224] // --text-secondary
const LIME = [188, 255, 47] // --accent

// Donkere variant voor een stippenveld op een limegroen vlak: van donker olijfgroen naar bijna zwart groen.
const OLIJF = [52, 78, 0]
const DIEPGROEN = [12, 20, 0]

export type Palet = 'standaard' | 'lime'

function stijlen(van: number[], naar: number[]): string[] {
  const uit: string[] = []
  for (let k = 0; k < KLEUREN; k++) {
    const m = k / (KLEUREN - 1)
    const r = Math.round(lerp(van[0], naar[0], m))
    const g = Math.round(lerp(van[1], naar[1], m))
    const b = Math.round(lerp(van[2], naar[2], m))
    for (let d = 0; d < DEKKING; d++) uit.push(`rgba(${r},${g},${b},${((d + 1) / DEKKING).toFixed(3)})`)
  }
  return uit
}

const PALETTEN: Record<Palet, string[]> = {
  standaard: stijlen(GRIJS, LIME),
  lime: stijlen(OLIJF, DIEPGROEN),
}

export class Batch {
  private stijlen: string[]
  constructor(palet: Palet = 'standaard') {
    this.stijlen = PALETTEN[palet]
  }
  private emmers: number[][] = Array.from({ length: KLEUREN * DEKKING }, () => [])

  /** Voeg een stip toe. `lime` en `alpha` lopen van 0 tot 1, `r` is de straal in CSS-pixels. */
  stip(x: number, y: number, r: number, alpha: number, lime = 0) {
    if (alpha < 0.03 || r <= 0.05) return
    const d = Math.min(DEKKING - 1, Math.floor(alpha * DEKKING))
    const k = Math.min(KLEUREN - 1, Math.round(clamp01(lime) * (KLEUREN - 1)))
    this.emmers[k * DEKKING + d].push(x, y, r)
  }

  teken(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.emmers.length; i++) {
      const e = this.emmers[i]
      if (e.length === 0) continue
      ctx.fillStyle = this.stijlen[i]
      ctx.beginPath()
      for (let j = 0; j < e.length; j += 3) {
        const x = e[j], y = e[j + 1], r = e[j + 2]
        if (r < 0.9) {
          // Kleine stippen als vierkantjes: op deze maat is dat niet te zien en veel sneller.
          ctx.rect(x - r, y - r, r * 2, r * 2)
        } else {
          ctx.moveTo(x + r, y)
          ctx.arc(x, y, r, 0, TAU)
        }
      }
      ctx.fill()
      e.length = 0
    }
  }
}

// ---------------------------------------------------------------------------------------------
// Sluier: rustig midden achter de tekst, en zachte randen boven en onder zodat de sectie
// naadloos in de pagina overloopt.
// ---------------------------------------------------------------------------------------------

function sluier(x: number, y: number, w: number, h: number, kracht = 0.7): number {
  const rand = smooth(0, h * 0.2, y) * smooth(h, h * 0.82, y)
  const dx = (x - w / 2) / Math.min(w * (w < 640 ? 0.5 : 0.34), 520)
  const dy = (y - h * 0.47) / (h * 0.26)
  const midden = Math.exp(-(dx * dx + dy * dy) * 1.4)
  return rand * (1 - kracht * midden)
}

// ---------------------------------------------------------------------------------------------
// Scènes
// ---------------------------------------------------------------------------------------------

export type Scene = {
  /** Wordt aangeroepen bij start en bij elke maatwijziging. */
  init(w: number, h: number): void
  /** Tekent één frame op tijdstip t (seconden). `dt` is de tijd sinds het vorige frame. */
  frame(b: Batch, w: number, h: number, t: number, dt: number): void
}

/** Terrein: een golvend landschap van stippen in perspectief; de heuvels rollen langzaam naar de kijker toe. */
function terrein(): Scene {
  const NEAR = 1.1
  const FAR = 16
  return {
    init() {},
    frame(b, w, h, t) {
      const horizon = h * 0.4
      // In een smal, hoog blok (mobiel) schaalt het perspectief mee met de hoogte, anders wordt het een streep.
      const f = Math.max(w, h * 1.4) * 0.5
      const camH = 0.85
      const K = f * 0.62 // verticale schaal
      // Begin dichtbij genoeg dat de voorste rij onder de onderrand valt.
      const near = Math.min(NEAR, (camH * K) / ((h - horizon) * 1.05))
      const gap = w < 640 ? 6 : 7 // gewenste afstand tussen stippen op het scherm
      const reis = t * 0.35
      // De rijen liggen vast op de grond, met een afstand die op het scherm steeds ongeveer `gap` is;
      // het hoogteveld schuift erdoorheen.
      for (let z = near; z < FAR; z += (gap * z * z) / (camH * K)) {
        const verte = (z - near) / (FAR - near)
        const mist = 1 - smooth(0.25, 1, verte)
        const dxw = (gap * 1.15 * z) / f
        const halve = ((w / 2 + 10) / f) * z
        const x0 = -halve + (((halve / dxw) % 1) * dxw) / 2
        for (let x = x0; x <= halve; x += dxw) {
          const n = fbm(x * 0.28 + 11, (z + reis) * 0.28, t * 0.015, 3)
          const m = clamp01((n - 0.28) / 0.44)
          const hoogte = m * m * 2.1
          const sx = w / 2 + (x / z) * f
          const sy = horizon + ((camH - hoogte) / z) * K
          if (sy < -10 || sy > h + 10) continue
          const top = smooth(0.2, 1.5, hoogte)
          const s = sluier(sx, sy, w, h, 0.5)
          const alpha = (0.24 + 0.76 * top) * (0.3 + 0.7 * mist) * s
          const r = (0.45 + 1.2 * top) * Math.min(1.5, 1.4 / Math.sqrt(z))
          b.stip(sx, sy, r, alpha, smooth(0.5, 0.95, top))
        }
      }
    },
  }
}

/** Baan: een planeet van stippen die aan de onderrand opkomt, met een ring van stippen eromheen. */
function baan(): Scene {
  let sterren: Float32Array = new Float32Array(0)
  let ring: Float32Array = new Float32Array(0)
  return {
    init(w, h) {
      let s = 7
      const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
      const n = Math.round((w * h) / 2600)
      sterren = new Float32Array(n * 4)
      for (let i = 0; i < n; i++) {
        sterren[i * 4] = rnd() * w
        sterren[i * 4 + 1] = rnd() * h
        sterren[i * 4 + 2] = rnd() * TAU
        sterren[i * 4 + 3] = 0.3 + rnd() * 0.7
      }
      const m = 6000
      ring = new Float32Array(m * 3)
      for (let i = 0; i < m; i++) {
        ring[i * 3] = rnd() * TAU // hoek langs de ring
        ring[i * 3 + 1] = Math.floor(rnd() * 3) - 1 + (rnd() - 0.5) * 0.25 // baan (-1, 0, 1) plus wat spreiding
        ring[i * 3 + 2] = rnd()
      }
    },
    frame(b, w, h, t) {
      const R = Math.max(w * 0.62, 520)
      const cx = w / 2
      const cy = h * 0.7 + R
      const stap = w < 640 ? 7 : 8

      // Sterren: vaste, flauwe stippen die heel licht flonkeren.
      for (let i = 0; i < sterren.length; i += 4) {
        const x = sterren[i], y = sterren[i + 1]
        const dx = x - cx, dy = y - cy
        if (dx * dx + dy * dy < R * R) continue
        const a = (0.1 + 0.18 * (0.5 + 0.5 * Math.sin(t * 0.8 + sterren[i + 2]))) * sterren[i + 3]
        b.stip(x, y, 0.6, a * sluier(x, y, w, h, 0.8))
      }

      // Planeet: een plat stippenraster; per stip het punt op de bol, gedraaid in de tijd,
      // met continenten uit de ruis en een lichtende rand.
      const rot = t * 0.035
      const cr = Math.cos(rot), sr = Math.sin(rot)
      const tilt = 0.35
      const ct = Math.cos(tilt), st = Math.sin(tilt)
      const top = Math.max(0, cy - R)
      for (let y = top - (top % stap); y < h + stap; y += stap) {
        const dy = (y - cy) / R
        const rij = Math.sqrt(Math.max(0, 1 - dy * dy))
        const x0 = cx - rij * R
        const verspring = (Math.round(y / stap) % 2) * stap * 0.5
        for (let x = x0 - ((x0 - verspring) % stap); x <= cx + rij * R; x += stap) {
          if (x < -stap || x > w + stap) continue
          const nx = (x - cx) / R
          const nz2 = 1 - nx * nx - dy * dy
          if (nz2 <= 0) continue
          const nz = Math.sqrt(nz2)
          // Kantel naar de kijker en draai om de as.
          const y1 = dy * ct - nz * st
          const z1 = dy * st + nz * ct
          const x2 = nx * cr + z1 * sr
          const z2 = -nx * sr + z1 * cr
          const land = smooth(0.4, 0.56, fbm(x2 * 2.6 + 5, y1 * 2.6, z2 * 2.6, 3))
          // Lichtende rand: de laatste tientallen pixels binnen de omtrek van de bol.
          const rand = Math.exp(-((1 - Math.sqrt(nx * nx + dy * dy)) * R) / 26)
          const licht = clamp01(0.55 + 0.45 * nz + nx * 0.2)
          const v = clamp01(0.07 + land * 0.9 * licht + rand * 1.1)
          const s = clamp01(sluier(x, y, w, h, 0.35) + rand * 0.5) * (0.6 + 0.4 * smooth(h, h * 0.8, y))
          const r = (0.5 + 1.0 * v) * (0.6 + 0.4 * nz)
          b.stip(x, y, r, v * s, clamp01(rand * 1.8 + land * 0.35))
        }
      }

      // Ring: een gekantelde ellips van stippen; het deel achter de planeet valt weg.
      const rx = R * 1.3, ry = R * 1.12
      const ringY = cy
      for (let i = 0; i < ring.length; i += 3) {
        const a = ring[i] + t * (0.03 + ring[i + 2] * 0.01)
        const breed = 1 + ring[i + 1] * 0.016
        const x = cx + Math.cos(a) * rx * breed
        const y = ringY + Math.sin(a) * ry * breed
        const dx = x - cx, dy = y - cy
        if (dx * dx + dy * dy < R * R) continue // achter de planeet
        if (x < -4 || x > w + 4 || y < -4 || y > h + 4) continue
        const helder = 0.25 + 0.75 * smooth(0.6, 1, 0.5 + 0.5 * Math.cos(a - t * 0.05 - 1.2))
        b.stip(x, y, 0.5 + ring[i + 2] * 0.6, helder * 0.8 * sluier(x, y, w, h, 0.6), helder * 0.9)
      }
    },
  }
}

/** Stroming: duizenden deeltjes die een stromingsveld volgen en daardoor vanzelf in stromen samenkomen. */
function stroming(): Scene {
  let px = new Float32Array(0), py = new Float32Array(0), leeftijd = new Float32Array(0), duur = new Float32Array(0)
  let s = 99
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
  let W = 0, H = 0
  const geboren = (i: number) => {
    px[i] = rnd() * W
    py[i] = H * 0.08 + rnd() * H * 0.92
    leeftijd[i] = 0
    duur[i] = 6 + rnd() * 10
  }
  const veldhoek = (x: number, y: number, t: number) =>
    (fbm(x * 0.0016, y * 0.0022, t * 0.03, 2) - 0.5) * TAU * 1.6
  const beweeg = (t: number, dt: number) => {
    for (let i = 0; i < px.length; i++) {
      const a = veldhoek(px[i], py[i], t)
      const v = 26 // pixels per seconde
      px[i] += (Math.cos(a) * v + 9) * dt
      py[i] += Math.sin(a) * v * 0.75 * dt
      leeftijd[i] += dt
      if (leeftijd[i] > duur[i] || px[i] < -10 || px[i] > W + 10 || py[i] < -10 || py[i] > H + 10) geboren(i)
    }
  }
  return {
    init(w, h) {
      W = w
      H = h
      const n = Math.min(14000, Math.round((w * h) / 80))
      px = new Float32Array(n)
      py = new Float32Array(n)
      leeftijd = new Float32Array(n)
      duur = new Float32Array(n)
      for (let i = 0; i < n; i++) {
        geboren(i)
        leeftijd[i] = rnd() * duur[i]
      }
      // Laat het veld alvast een tijdje stromen, zodat het eerste beeld al stromen laat zien.
      for (let k = 0; k < 90; k++) beweeg(k / 10, 0.1)
    },
    frame(b, w, h, t, dt) {
      beweeg(t + 9, Math.min(dt, 0.1))
      for (let i = 0; i < px.length; i++) {
        const x = px[i], y = py[i]
        const leven = smooth(0, 1.2, leeftijd[i]) * smooth(duur[i], duur[i] - 1.5, leeftijd[i])
        const band = smooth(h * 0.1, h * 0.5, y)
        const lime = smooth(0.56, 0.68, noise3(x * 0.0014 + 3, y * 0.0018, t * 0.02))
        const alpha = (0.3 + 0.6 * lime) * leven * band * sluier(x, y, w, h, 0.6)
        b.stip(x, y, 0.65 + lime * 0.4, alpha, lime)
      }
    },
  }
}

/** Rimpeling: een raster van stippen waarin golven vanuit het midden uitdijen, als een signaal dat zich verspreidt. */
function rimpeling(): Scene {
  let stap = 11
  const PERIODE = 9 // seconden tussen twee golven
  const GOLVEN = 3
  return {
    init(w) {
      stap = w < 640 ? 9 : 11
    },
    frame(b, w, h, t) {
      const cx = w / 2
      const cy = h * 0.48
      const max = Math.hypot(w / 2, h * 0.9)
      const breedte = Math.max(40, w * 0.035)
      const rijen = Math.ceil(h / (stap * 0.866)) + 1
      for (let j = 0; j < rijen; j++) {
        const y0 = j * stap * 0.866
        const verspring = (j % 2) * stap * 0.5
        for (let x0 = verspring - stap; x0 < w + stap; x0 += stap) {
          const dx = x0 - cx, dy = (y0 - cy) * 1.5
          const d = Math.hypot(dx, dy) + 0.0001
          let g = 0
          for (let k = 0; k < GOLVEN; k++) {
            const fase = ((t / PERIODE + k / GOLVEN) % 1 + 1) % 1
            const R = fase * max
            const q = (d - R) / breedte
            g += Math.exp(-q * q) * (1 - fase) * smooth(0, 0.08, fase)
          }
          const verschuif = g * 5 // stippen schuiven een paar pixels mee met de golf
          const x = x0 + (dx / d) * verschuif
          const y = y0 + ((dy / 1.5) / d) * verschuif
          const korrel = 0.7 + 0.3 * noise3(x0 * 0.01, y0 * 0.01, t * 0.1)
          const s = sluier(x, y, w, h, 0.75)
          const v = clamp01(g)
          b.stip(x, y, 0.55 + 1.5 * v, (0.1 * korrel + 0.85 * v) * s, smooth(0.25, 0.8, v))
        }
      }
    },
  }
}


/** Golven: horizontale lijnen van stippen die als een signaal op en neer golven; de toppen lichten op. */
function golven(): Scene {
  return {
    init() {},
    frame(b, w, h, t) {
      const lijnen = Math.max(14, Math.min(34, Math.round(h / 16)))
      const boven = h * 0.1, onder = h * 0.92
      const stap = w < 640 ? 3.5 : 4
      const A = Math.min(90, h * (w < 640 ? 0.15 : 0.11))
      for (let i = 0; i < lijnen; i++) {
        const basis = boven + (i / (lijnen - 1)) * (onder - boven)
        for (let x = 0; x <= w; x += stap) {
          const env = Math.exp(-(((x - w / 2) / (w * (w < 640 ? 0.55 : 0.4))) ** 2))
          const n = fbm(x * 0.0045 + 3, i * 0.17, t * 0.12, 3)
          const top = clamp01((n - 0.42) / 0.3) * env
          const y = basis - top * top * A - Math.sin(x * 0.012 + t * 0.6 + i * 0.4) * 2 * env
          const s = sluier(x, y, w, h, 0.55)
          b.stip(x, y, 0.55 + top * 0.9, (0.28 + 0.72 * top) * s, smooth(0.45, 0.9, top))
        }
      }
    },
  }
}

/** Stelsel: een draaiend sterrenstelsel van stippen met twee spiraalarmen, schuin van opzij gezien. */
function stelsel(): Scene {
  let deeltjes = new Float32Array(0)
  return {
    init(w, h) {
      let s = 21
      const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
      const n = Math.min(9000, Math.round((w * h) / 45))
      deeltjes = new Float32Array(n * 4)
      for (let i = 0; i < n; i++) {
        const r = Math.min(1, -Math.log(1 - rnd() * 0.98) * 0.32 + 0.04)
        const arm = rnd() < 0.5 ? 0 : Math.PI
        const spreiding = (rnd() - 0.5) * (0.5 + r * 0.9) * (rnd() < 0.25 ? 3 : 1)
        deeltjes[i * 4] = r
        deeltjes[i * 4 + 1] = arm + Math.log(r) * 2.4 + spreiding
        deeltjes[i * 4 + 2] = rnd()
        deeltjes[i * 4 + 3] = rnd() * TAU
      }
    },
    frame(b, w, h, t) {
      const R = w < 640 ? w * 1.05 : Math.max(w * 0.62, h * 0.55)
      const cx = w / 2, cy = h * 0.52
      const plat = w < 640 ? 0.62 : 0.42
      for (let i = 0; i < deeltjes.length; i += 4) {
        const r = deeltjes[i]
        const a = deeltjes[i + 1] + t * (0.05 / (0.25 + r))
        const x = cx + Math.cos(a) * r * R
        const y = cy + Math.sin(a) * r * R * plat
        if (x < -4 || x > w + 4 || y < -4 || y > h + 4) continue
        const kern = Math.exp(-r * 5)
        const flonker = deeltjes[i + 2] > 0.94 ? 0.5 + 0.5 * Math.sin(t * 2 + deeltjes[i + 3]) : 0
        const v = clamp01(0.3 + kern * 0.8 + flonker * 0.6) * (1 - smooth(0.7, 1, r))
        const s = sluier(x, y, w, h, 0.45)
        b.stip(x, y, 0.45 + v * 0.8 + flonker * 0.4, v * s, clamp01(kern * 1.4 + flonker))
      }
    },
  }
}

/** Wereldbol: een draaiende bol van stippen waarop telkens ergens een signaal oplicht, met een baan eromheen. */
function wereldbol(): Scene {
  let punten = new Float32Array(0)
  return {
    init(w, h) {
      const n = w < 640 ? 1600 : 2600
      punten = new Float32Array(n * 4)
      const gulden = Math.PI * (3 - Math.sqrt(5))
      let s = 5
      const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2
        const r = Math.sqrt(1 - y * y)
        punten[i * 4] = Math.cos(i * gulden) * r
        punten[i * 4 + 1] = y
        punten[i * 4 + 2] = Math.sin(i * gulden) * r
        punten[i * 4 + 3] = rnd() < 0.035 ? rnd() * 10 : -1 // een paar punten krijgen een signaal
      }
      void h
    },
    frame(b, w, h, t) {
      const R = Math.min(Math.max(w * 0.46, 170), h * 0.62)
      const cx = w / 2, cy = h * 0.66
      const rot = t * 0.12
      const cr = Math.cos(rot), sr = Math.sin(rot)
      const kant = 0.38
      const ck = Math.cos(kant), sk = Math.sin(kant)
      for (let i = 0; i < punten.length; i += 4) {
        const x0 = punten[i], y0 = punten[i + 1], z0 = punten[i + 2]
        const x1 = x0 * cr + z0 * sr
        const z1 = -x0 * sr + z0 * cr
        const y2 = y0 * ck - z1 * sk
        const z2 = y0 * sk + z1 * ck
        const x = cx + x1 * R, y = cy + y2 * R
        if (y > h + 4) continue
        const voor = (z2 + 1) / 2
        let sig = 0
        if (punten[i + 3] >= 0) {
          const fase = ((t + punten[i + 3]) % 10) / 10
          sig = smooth(0, 0.05, fase) * smooth(0.35, 0.1, fase) * smooth(0.2, 0.6, voor)
        }
        const v = clamp01((0.14 + 0.7 * voor * voor) + sig)
        const s = sluier(x, y, w, h, 0.4)
        b.stip(x, y, (0.45 + 0.6 * voor) + sig * 1.6, v * s, sig)
      }
      // De baan: een gekantelde ring van stippen, met een satelliet die er langs loopt.
      const rx = R * 1.35, ry = R * 0.32
      const n = Math.round(rx * 0.9)
      for (let k = 0; k < n; k++) {
        const a = (k / n) * TAU
        const x = cx + Math.cos(a) * rx, y = cy - R * 0.1 + Math.sin(a) * ry
        const achter = Math.sin(a) < 0 && Math.hypot((x - cx) / R, (y - cy) / R) < 1
        if (achter) continue
        b.stip(x, y, 0.6, 0.5 * sluier(x, y, w, h, 0.4))
      }
      const sa = t * 0.35
      const sx = cx + Math.cos(sa) * rx, sy = cy - R * 0.1 + Math.sin(sa) * ry
      if (!(Math.sin(sa) < 0 && Math.hypot((sx - cx) / R, (sy - cy) / R) < 1)) b.stip(sx, sy, 2.4, 1, 1)
    },
  }
}

/** Halftoon: een raster waarin de stippen groeien en krimpen met een langzaam drijvende wolk, als een gerasterde foto. */
function halftoon(): Scene {
  return {
    init() {},
    frame(b, w, h, t) {
      const stap = w < 640 ? 9 : 11
      for (let y = stap / 2, rij = 0; y < h; y += stap * 0.866, rij++) {
        const verspring = (rij % 2) * stap * 0.5
        for (let x = verspring; x < w + stap; x += stap) {
          const n = fbm(x * 0.0032 + t * 0.04, y * 0.0042 - t * 0.015, t * 0.05, 3)
          const v = clamp01((n - 0.32) / 0.42)
          const s = sluier(x, y, w, h, 0.75)
          const r = 0.4 + v * v * (stap * 0.32)
          b.stip(x, y, r, (0.2 + 0.8 * v) * s, smooth(0.6, 0.95, v))
        }
      }
    },
  }
}

export const SCENES = {
  terrein,
  baan,
  stroming,
  rimpeling,
  golven,
  stelsel,
  wereldbol,
  halftoon,
} satisfies Record<string, () => Scene>

export type SceneNaam = keyof typeof SCENES

/** De volgorde waarin de scènes elkaar per bezoeker afwisselen. */
export const ROTATIE: SceneNaam[] = ['terrein', 'baan', 'stroming', 'rimpeling', 'golven']
