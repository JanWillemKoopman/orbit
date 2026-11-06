// Dot-achtergronden voor de afsluiter onderaan de pagina's (zie components/CtaAchtergrond.tsx). Terrein,
// baan, stroming, rimpeling, golven en metamorfose wisselen elkaar per bezoeker af op de site (ROTATIE); stelsel,
// wereldbol en halftoon staan alleen op de testpagina /visualisaties; horizon, warp, moiré en magneet
// (gemaakt voor het limegroene blok) alleen op /cta-visualisaties.
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
  /** Optioneel: de muis of vinger boven de afsluiter, in CSS-pixels ten opzichte van het blok. */
  wijzer?(x: number, y: number, soort: 'beweeg' | 'klik' | 'weg'): void
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


// ---------------------------------------------------------------------------------------------
// Vijf scènes voor het limegroene blok (testpagina /cta-visualisaties): horizon, metamorfose, warp,
// moiré en magneet. Ze houden het midden achter de kop rustig met `rust`, maar laten de randen van
// het blok vol, want op een gekleurd vlak hoeft niets in de pagina over te lopen.
// ---------------------------------------------------------------------------------------------

function rust(x: number, y: number, w: number, h: number, kracht = 0.6): number {
  const dx = (x - w / 2) / Math.min(w * (w < 640 ? 0.48 : 0.3), 470)
  const dy = (y - h * 0.47) / (h * 0.2)
  return 1 - kracht * Math.exp(-(dx * dx + dy * dy) * 1.5)
}

function rng(seed: number) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

/** Horizon: een zwart gat met een draaiende accretieschijf. Het deel van de schijf achter het gat buigt
 *  door de zwaartekracht over en onder de schaduw heen, met een dunne fotonring eromheen; sterren die
 *  erachter langs drijven, worden meegebogen. */
function horizon(): Scene {
  const BINNEN = 3, BUITEN = 9.5, SCHADUW = 2.6, EINSTEIN = 2.95
  let r = new Float32Array(0), phi = new Float32Array(0), dik = new Float32Array(0), korrel = new Float32Array(0)
  let sx = new Float32Array(0), sy = new Float32Array(0)
  const rnd = rng(31)
  return {
    init(w, h) {
      const n = Math.min(16000, Math.round((w * h) / 45))
      r = new Float32Array(n); phi = new Float32Array(n); dik = new Float32Array(n); korrel = new Float32Array(n)
      for (let i = 0; i < n; i++) {
        r[i] = BINNEN + (BUITEN - BINNEN) * Math.pow(rnd(), 2.1)
        phi[i] = rnd() * TAU
        dik[i] = (rnd() - 0.5) * 2
        korrel[i] = rnd()
      }
      const m = Math.round((w * h) / 1800)
      sx = new Float32Array(m); sy = new Float32Array(m)
      for (let i = 0; i < m; i++) { sx[i] = rnd(); sy[i] = rnd() }
    },
    frame(b, w, h, t, dt) {
      const Rs = Math.min(h * 0.125, w * 0.1)
      const cx = w / 2, cy = h * 0.47
      const e = 0.11 + 0.025 * Math.sin(t * 0.21) // hoogte van de camera boven de schijf
      const ce = Math.cos(e), se = Math.sin(e)
      const lens = (bx: number, by: number, sterkte: number, x: number, y: number, a: number, rad: number, lime: number) => {
        // Lensvergelijking: hoofdbeeld verder naar buiten, tweede beeld aan de overkant, kleiner.
        const beta = Math.hypot(bx, by) + 1e-4
        const ux = bx / beta, uy = by / beta
        const E2 = 4 * EINSTEIN * EINSTEIN * sterkte
        const wortel = Math.sqrt(beta * beta + E2)
        const plus = (beta + wortel) / 2
        b.stip(cx + ux * plus * Rs, cy - uy * plus * Rs, rad, a * rust(x, y, w, h, 0.5), lime)
        const min = (wortel - beta) / 2
        if (min > SCHADUW && sterkte > 0.5) {
          const qx = cx - ux * min * Rs, qy = cy + uy * min * Rs
          b.stip(qx, qy, rad * 0.7, a * 0.7 * smooth(SCHADUW, SCHADUW + 0.25, min), lime)
        }
      }

      // Sterren achter het gat, langzaam van rechts naar links; dicht bij het gat buigen ze eromheen.
      for (let i = 0; i < sx.length; i++) {
        const x = ((sx[i] - t * 0.006 * (0.5 + sy[i])) % 1 + 1) % 1 * w * 1.2 - w * 0.1
        const y = sy[i] * h
        const bx = (x - cx) / Rs, by = -(y - cy) / Rs
        lens(bx, by, 1, x, y, 0.35 + 0.3 * korrel[i % korrel.length], 0.7, 0.2)
      }

      // De schijf: elke stip draait met Kepler-snelheid en spiraalt heel langzaam naar binnen.
      for (let i = 0; i < r.length; i++) {
        phi[i] += 1.9 * Math.pow(r[i], -1.5) * dt
        r[i] -= dt * 0.05 * (BINNEN / r[i])
        if (r[i] < BINNEN) { r[i] = BUITEN; phi[i] = rnd() * TAU }
        const ri = r[i], p = phi[i]
        const X = ri * Math.cos(p), Z = ri * Math.sin(p), Y = dik[i] * dik[i] * dik[i] * 0.06 * ri
        const Yv = Y * ce + Z * se // omhoog op het scherm
        const D = Z * ce - Y * se // diepte: positief is achter het gat
        const hitte = Math.pow(BINNEN / ri, 1.6)
        const doppler = 0.7 + 0.3 * Math.cos(p) // de kant die naar ons toe draait is donkerder
        const leven = smooth(BINNEN, BINNEN + 0.4, ri) * smooth(BUITEN, BUITEN - 1.5, ri)
        const golf = 0.75 + 0.25 * Math.sin(p * 3 - Math.log(ri) * 9 + t * 0.5) // spiraalstructuur in de schijf
        const a = (0.18 + 0.95 * hitte) * doppler * leven * golf * (0.75 + 0.25 * korrel[i])
        const rad = 0.55 + hitte * 1.6 + korrel[i] * 0.35
        const lime = clamp01(hitte * doppler * 1.3)
        if (D > 0) {
          lens(X, Yv, smooth(-0.3, 1.8, D), cx + X * Rs, cy - Yv * Rs, a, rad, lime)
        } else {
          const x = cx + X * Rs, y = cy - Yv * Rs
          b.stip(x, y, rad, a * rust(x, y, w, h, 0.45), lime)
        }
      }

      // Fotonring: een dunne, glinsterende ring net buiten de schaduw.
      const n = Math.round(TAU * SCHADUW * Rs / 2.2)
      for (let k = 0; k < n; k++) {
        const a = (k / n) * TAU
        const glans = 0.5 + 0.5 * Math.cos(a - Math.PI) // links feller: de kant die naar ons toe draait
        const flik = noise3(Math.cos(a) * 3, Math.sin(a) * 3, t * 0.8)
        const rr = (SCHADUW + 0.06 + flik * 0.08) * Rs
        b.stip(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.98, 0.8 + glans * 0.6, 0.45 + 0.5 * glans * flik, 1)
      }
    },
  }
}

/** Metamorfose: een wolk van duizenden stippen in 3D die draait en steeds van vorm wisselt:
 *  bol, torus, knoop, dubbele helix, kubus, en weer terug. */
function metamorfose(): Scene {
  let vormen: Float32Array[] = []
  let vertraging = new Float32Array(0)
  let n = 0
  const VAST = 3.4, OVERGANG = 2.2
  return {
    init(w) {
      n = w < 640 ? 3600 : 7000
      const rnd = rng(77)
      const bol = new Float32Array(n * 3), torus = new Float32Array(n * 3), knoop = new Float32Array(n * 3)
      const helix = new Float32Array(n * 3), kubus = new Float32Array(n * 3)
      const gulden = Math.PI * (3 - Math.sqrt(5))
      const zijde = Math.ceil(Math.sqrt(n / 6))
      for (let i = 0; i < n; i++) {
        const o = i * 3
        // Bol
        const y = 1 - (i / (n - 1)) * 2, rr = Math.sqrt(1 - y * y)
        bol[o] = Math.cos(i * gulden) * rr; bol[o + 1] = y; bol[o + 2] = Math.sin(i * gulden) * rr
        // Torus
        const u = TAU * ((i * 0.6180339) % 1), v = TAU * ((i * 0.7548777) % 1)
        torus[o] = (0.78 + 0.3 * Math.cos(v)) * Math.cos(u)
        torus[o + 1] = 0.3 * Math.sin(v)
        torus[o + 2] = (0.78 + 0.3 * Math.cos(v)) * Math.sin(u)
        // Klaverbladknoop met een dunne buis
        const s = TAU * (i / n)
        const kx = (Math.sin(s) + 2 * Math.sin(2 * s)) / 3, ky = (Math.cos(s) - 2 * Math.cos(2 * s)) / 3, kz = -Math.sin(3 * s) / 3
        const ka = rnd() * TAU, kb = Math.acos(rnd() * 2 - 1), kr = 0.1
        knoop[o] = kx + kr * Math.sin(kb) * Math.cos(ka); knoop[o + 1] = ky + kr * Math.cos(kb); knoop[o + 2] = kz + kr * Math.sin(kb) * Math.sin(ka)
        // Dubbele helix: twee strengen en sporten ertussen
        if (i % 10 < 7) {
          const hy = (rnd() * 2 - 1) * 1.15, streng = i % 2
          const ha = hy * TAU * 0.75 + streng * Math.PI
          helix[o] = Math.cos(ha) * 0.42 + (rnd() - 0.5) * 0.04; helix[o + 1] = hy; helix[o + 2] = Math.sin(ha) * 0.42 + (rnd() - 0.5) * 0.04
        } else {
          const sport = Math.floor(rnd() * 26), hy = -1.15 + (sport + 0.5) * (2.3 / 26)
          const ha = hy * TAU * 0.75, m = rnd() * 2 - 1
          helix[o] = Math.cos(ha) * 0.42 * m; helix[o + 1] = hy; helix[o + 2] = Math.sin(ha) * 0.42 * m
        }
        // Kubus: een strak raster op de zes vlakken
        const vlak = i % 6, cel = Math.floor(i / 6)
        const ga = ((cel % zijde) + 0.5) / zijde * 2 - 1, gb = (Math.floor(cel / zijde) % zijde + 0.5) / zijde * 2 - 1
        const k = 0.68, teken = vlak < 3 ? 1 : -1, as = vlak % 3
        const p = [ga * k, gb * k, teken * k]
        kubus[o + as] = p[2]; kubus[o + ((as + 1) % 3)] = p[0]; kubus[o + ((as + 2) % 3)] = p[1]
      }
      vormen = [bol, torus, knoop, helix, kubus]
      vertraging = new Float32Array(n)
      for (let i = 0; i < n; i++) vertraging[i] = 0.55 * (0.5 + 0.5 * bol[i * 3 + 1]) + rnd() * 0.15
    },
    frame(b, w, h, t) {
      const cyclus = VAST + OVERGANG
      const tt = t * 1
      const idx = Math.floor(tt / cyclus)
      const binnen = tt - idx * cyclus
      const A = vormen[((idx % vormen.length) + vormen.length) % vormen.length]
      const B = vormen[(((idx + 1) % vormen.length) + vormen.length) % vormen.length]
      const S = w < 640 ? Math.min(w * 0.6, h * 0.36) : Math.min(h * 0.4, w * 0.28)
      const cx = w / 2, cy = h * 0.48
      const yaw = t * 0.32, pitch = 0.38 + 0.12 * Math.sin(t * 0.27)
      const cy1 = Math.cos(yaw), sy1 = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
      const CAM = 3.4
      for (let i = 0; i < n; i++) {
        const o = i * 3
        let m = clamp01((binnen - VAST - vertraging[i]) / (OVERGANG - 0.7))
        m = m < 0.5 ? 4 * m * m * m : 1 - Math.pow(-2 * m + 2, 3) / 2
        const uit = 1 + 0.35 * Math.sin(Math.PI * m) // tijdens de overgang waaiert de wolk even uit
        let x = lerp(A[o], B[o], m) * uit, y = lerp(A[o + 1], B[o + 1], m) * uit, z = lerp(A[o + 2], B[o + 2], m) * uit
        const x1 = x * cy1 + z * sy1, z1 = -x * sy1 + z * cy1
        const y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp
        x = x1; y = y2; z = z2
        const persp = CAM / (CAM + z)
        const px = cx + x * S * persp, py = cy - y * S * persp
        const voor = clamp01((1 - z) / 2)
        const a = (0.22 + 0.78 * voor) * rust(px, py, w, h, 0.5)
        b.stip(px, py, (0.7 + 1.3 * voor) * persp, a, voor * voor)
      }
    },
  }
}

/** Warp: een kronkelende tunnel van stippen waar je doorheen schiet, met strepen licht die langs flitsen. */
function warp(): Scene {
  let deeltjes = new Float32Array(0)
  const DIEP = 26, SNEL = 2.2
  return {
    init(w) {
      const rnd = rng(4)
      const m = w < 640 ? 160 : 320
      deeltjes = new Float32Array(m * 3)
      for (let i = 0; i < m; i++) {
        deeltjes[i * 3] = rnd() * TAU
        deeltjes[i * 3 + 1] = 0.25 + rnd() * 0.6
        deeltjes[i * 3 + 2] = rnd() * DIEP
      }
    },
    frame(b, w, h, t) {
      const cx = w / 2, cy = h * 0.47
      const f = Math.max(h * 0.62, Math.min(w * 0.32, h * 0.9))
      const reis = t * SNEL
      const pad = (zw: number) => [Math.sin(zw * 0.11) * 1.3 + Math.sin(zw * 0.047) * 0.8, Math.cos(zw * 0.083) * 0.7]
      const [ox0, oy0] = pad(reis)
      const M = w < 640 ? 56 : 96
      const DZ = 0.22
      const eerste = Math.ceil(reis / DZ) * DZ
      for (let zw = eerste; zw < reis + DIEP; zw += DZ) {
        const z = zw - reis
        if (z < 0.25) continue
        const [ox, oy] = pad(zw)
        const mist = smooth(DIEP, DIEP * 0.35, z) * smooth(0.25, 0.7, z)
        const draai = zw * 0.06 + t * 0.1
        for (let k = 0; k < M; k++) {
          const a = (k / M) * TAU + draai
          const ca = Math.cos(a), sa = Math.sin(a)
          const x = ca * 1.6 + ox - ox0, y = sa * 1.0 + oy - oy0
          const px = cx + (x / z) * f, py = cy + (y / z) * f
          if (px < -6 || px > w + 6 || py < -6 || py > h + 6) continue
          // Lichtbanen op de wand die met de tunnel meeschuiven.
          const spiraal = smooth(0.55, 0.95, 0.5 + 0.5 * Math.cos(a * 5 - draai * 5 + zw * 0.45))
          const baan = spiraal * (0.55 + 0.45 * smooth(0.35, 0.65, fbm(ca * 1.4 + 7, sa * 1.4, zw * 0.12, 2)))
          const ring = Math.round(zw / DZ) % 12 === 0 ? 1 : 0
          const v = clamp01(baan + ring * 0.5)
          const a2 = mist * (0.12 + 0.88 * v) * rust(px, py, w, h, 0.45)
          b.stip(px, py, Math.min(2.8, (0.5 + 0.9 * v) * (2.6 / z + 0.3)), a2, v)
        }
      }
      // Lichtstrepen: deeltjes in de tunnel die met hoge snelheid naar je toe komen, als korte streep van stippen.
      for (let i = 0; i < deeltjes.length; i += 3) {
        const z0 = ((deeltjes[i + 2] - t * SNEL * 2.4) % DIEP + DIEP) % DIEP
        const a = deeltjes[i], rr = deeltjes[i + 1]
        for (let s = 0; s < 6; s++) {
          const z = z0 + s * 0.12
          if (z < 0.3) continue
          const x = Math.cos(a) * rr * 1.6, y = Math.sin(a) * rr
          const px = cx + (x / z) * f, py = cy + (y / z) * f
          if (px < -4 || px > w + 4 || py < -4 || py > h + 4) continue
          const al = (1 - s / 6) * smooth(DIEP, DIEP * 0.3, z) * smooth(0.3, 1.2, z) * 0.9
          b.stip(px, py, Math.min(2, 1.1 / z + 0.35), al * rust(px, py, w, h, 0.5), 1)
        }
      }
    },
  }
}

/** Moiré: twee stippenrasters over elkaar, waarvan er één heel langzaam draait en ademt. Uit het verschil
 *  ontstaan vanzelf grote, bewegende patronen, zoals bij twee lagen gaas. */
function moire(): Scene {
  const raster = (b: Batch, w: number, h: number, stap: number, hoek: number, ox: number, oy: number, rad: number, alpha: number, lime: number, t: number) => {
    const ca = Math.cos(hoek), sa = Math.sin(hoek)
    // Roosterpunt (i, j) = O + i·a1 + j·a2, met a1 en a2 de twee hexagonale basisvectoren.
    const a1x = ca * stap, a1y = sa * stap
    const a2x = (ca * 0.5 - sa * 0.866) * stap, a2y = (sa * 0.5 + ca * 0.866) * stap
    const R = Math.hypot(w, h) / 2 + stap
    const jmax = Math.ceil(R / (stap * 0.866)) + 2
    for (let j = -jmax; j <= jmax; j++) {
      const bx = ox + j * a2x, by = oy + j * a2y
      // Welke i liggen binnen het blok? Snij de lijn bx + i·a1 met de rechthoek.
      let lo = -1e9, hi = 1e9
      if (Math.abs(a1x) > 1e-6) { const p = (-4 - bx) / a1x, q = (w + 4 - bx) / a1x; lo = Math.max(lo, Math.min(p, q)); hi = Math.min(hi, Math.max(p, q)) } else if (bx < -4 || bx > w + 4) continue
      if (Math.abs(a1y) > 1e-6) { const p = (-4 - by) / a1y, q = (h + 4 - by) / a1y; lo = Math.max(lo, Math.min(p, q)); hi = Math.min(hi, Math.max(p, q)) } else if (by < -4 || by > h + 4) continue
      for (let i = Math.ceil(lo); i <= hi; i++) {
        const x = bx + i * a1x, y = by + i * a1y
        // Een trage golf door het raster laat de stippen een fractie groeien en krimpen.
        const g = 0.85 + 0.3 * noise3(x * 0.004, y * 0.004, t * 0.08)
        const k = rust(x, y, w, h, 0.85)
        b.stip(x, y, rad * g * (0.35 + 0.65 * k), alpha * k, lime)
      }
    }
  }
  return {
    init() {},
    frame(b, w, h, t) {
      const stap = w < 640 ? 7 : 8.5
      const cx = w / 2, cy = h * 0.47
      raster(b, w, h, stap, 0, cx, cy, stap * 0.22, 0.34, 0.35, t)
      // Het tweede raster draait rond een punt dat langzaam over het blok zwerft, en schaalt een fractie.
      const hoek = 0.045 + 0.035 * Math.sin(t * 0.11)
      const schaal = 1 + 0.025 * Math.sin(t * 0.07 + 1)
      const px = cx + w * 0.22 * Math.sin(t * 0.05), py = cy + h * 0.25 * Math.cos(t * 0.07)
      const ca = Math.cos(hoek), sa = Math.sin(hoek)
      // De oorsprong van raster B zo kiezen dat het rond (px, py) draait.
      const dx = cx - px, dy = cy - py
      const ox = px + (dx * ca - dy * sa) * schaal, oy = py + (dx * sa + dy * ca) * schaal
      raster(b, w, h, stap * schaal, hoek, ox, oy, stap * 0.22, 0.34, 0.75, t + 40)
    },
  }
}

/** Magneet: een raster van stippen dat op de muis reageert. Stippen wijken uit, worden groter en donkerder,
 *  en worden in de richting van de beweging meegesleept; een klik stuurt een schokgolf door het raster.
 *  Zonder muis (of op een telefoon) zwerft er een onzichtbare magneet in een lus door het blok. */
function magneet(): Scene {
  let hx = new Float32Array(0), hy = new Float32Array(0), px = new Float32Array(0), py = new Float32Array(0)
  let vx = new Float32Array(0), vy = new Float32Array(0)
  let mx = -1e4, my = -1e4, mvx = 0, mvy = 0, actief = false, laatst = -10, nu = 0
  let gx = -1e4, gy = -1e4 // de magneet zelf, die de muis zacht volgt
  let golven: { x: number; y: number; t0: number }[] = []
  return {
    init(w, h) {
      const stap = w < 640 ? 8 : 9.5
      const xs: number[] = [], ys: number[] = []
      for (let y = stap / 2, rij = 0; y < h + stap; y += stap * 0.866, rij++) {
        for (let x = (rij % 2) * stap * 0.5; x < w + stap; x += stap) { xs.push(x); ys.push(y) }
      }
      hx = Float32Array.from(xs); hy = Float32Array.from(ys)
      px = Float32Array.from(xs); py = Float32Array.from(ys)
      vx = new Float32Array(xs.length); vy = new Float32Array(xs.length)
    },
    wijzer(x, y, soort) {
      if (soort === 'weg') { actief = false; return }
      if (soort === 'klik') golven.push({ x, y, t0: nu })
      if (actief) { mvx = lerp(mvx, x - mx, 0.5); mvy = lerp(mvy, y - my, 0.5) }
      mx = x; my = y; actief = true; laatst = nu
    },
    frame(b, w, h, t, dt) {
      nu = t
      const d = Math.min(dt, 1 / 30)
      // Zonder muis: een lus door het blok, als een Lissajous-figuur.
      const zelf = !actief || t - laatst > 2.5
      const doelX = zelf ? w / 2 + w * 0.38 * Math.sin(t * 0.37) : mx
      const doelY = zelf ? h * 0.5 + h * 0.32 * Math.sin(t * 0.61 + 1) : my
      if (gx < -1e3) { gx = doelX; gy = doelY }
      const oudX = gx, oudY = gy
      gx = lerp(gx, doelX, 1 - Math.exp(-d * 12)); gy = lerp(gy, doelY, 1 - Math.exp(-d * 12))
      const snelX = (gx - oudX) / Math.max(d, 1e-3), snelY = (gy - oudY) / Math.max(d, 1e-3)
      mvx *= 0.9; mvy *= 0.9
      const R = Math.max(110, Math.min(190, w * 0.13))
      golven = golven.filter((g) => t - g.t0 < 2.2)
      const K = 70, C = 2 * Math.sqrt(K) // kritisch gedempt: veert terug zonder door te schieten
      for (let i = 0; i < hx.length; i++) {
        let fx = 0, fy = 0
        const dx = px[i] - gx, dy = py[i] - gy
        const dd = dx * dx + dy * dy
        let lens = 0
        if (dd < R * R) {
          const dist = Math.sqrt(dd) + 1e-3
          const q = 1 - dist / R
          lens = q * q
          fx += (dx / dist) * lens * 5200 + snelX * lens * 6
          fy += (dy / dist) * lens * 5200 + snelY * lens * 6
        }
        for (const g of golven) {
          const ex = hx[i] - g.x, ey = hy[i] - g.y
          const ed = Math.hypot(ex, ey) + 1e-3
          const front = (t - g.t0) * 520
          const q = (ed - front) / 26
          if (q > -3 && q < 3) {
            const kracht = Math.exp(-q * q) * 9000 * (1 - (t - g.t0) / 2.2)
            fx += (ex / ed) * kracht; fy += (ey / ed) * kracht
          }
        }
        vx[i] += (fx + K * (hx[i] - px[i]) - C * vx[i]) * d
        vy[i] += (fy + K * (hy[i] - py[i]) - C * vy[i]) * d
        px[i] += vx[i] * d
        py[i] += vy[i] * d
        const uit = Math.hypot(px[i] - hx[i], py[i] - hy[i])
        const v = clamp01(uit / 22 + lens * 0.6)
        const x = px[i], y = py[i]
        b.stip(x, y, 0.9 + v * 2.3, (0.3 + 0.7 * v) * rust(x, y, w, h, 0.3), v)
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
  horizon,
  metamorfose,
  warp,
  moire,
  magneet,
} satisfies Record<string, () => Scene>

export type SceneNaam = keyof typeof SCENES

/** De volgorde waarin de scènes elkaar per bezoeker afwisselen. */
export const ROTATIE: SceneNaam[] = ['terrein', 'baan', 'stroming', 'rimpeling', 'golven', 'metamorfose']
