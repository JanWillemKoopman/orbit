// Vijf dot-achtergronden voor de afsluiter onderaan de pagina's (zie components/dots/CtaDots.tsx).
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

const STIJLEN: string[] = []
for (let k = 0; k < KLEUREN; k++) {
  const m = k / (KLEUREN - 1)
  const r = Math.round(lerp(GRIJS[0], LIME[0], m))
  const g = Math.round(lerp(GRIJS[1], LIME[1], m))
  const b = Math.round(lerp(GRIJS[2], LIME[2], m))
  for (let d = 0; d < DEKKING; d++) STIJLEN.push(`rgba(${r},${g},${b},${((d + 1) / DEKKING).toFixed(3)})`)
}

export class Batch {
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
      ctx.fillStyle = STIJLEN[i]
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

/** 1 · Golfveld: een vast raster van stippen; een stromend ruisveld laat er lichtende ruggen doorheen trekken. */
function golfveld(): Scene {
  let stap = 10
  return {
    init(w) {
      stap = w < 640 ? 8 : 10
    },
    frame(b, w, h, t) {
      const z = t * 0.045
      const kolommen = Math.ceil(w / stap) + 1
      const rijen = Math.ceil(h / stap) + 1
      const ox = (w - (kolommen - 1) * stap) / 2
      for (let j = 0; j < rijen; j++) {
        const y = j * stap
        // De golven zitten vooral in de onderste twee derde, zoals in de nevel.
        const band = smooth(h * 0.15, h * 0.55, y)
        for (let i = 0; i < kolommen; i++) {
          const x = ox + i * stap
          const n = fbm(x * 0.0022, y * 0.0042 - t * 0.012, z, 3)
          const rug = Math.pow(1 - Math.abs(n * 2 - 1), 4) // lichtende ruggen
          const veld = 0.35 + 0.65 * noise3(x * 0.0011 + 40, y * 0.002, z * 0.6)
          const v = rug * veld * band
          const s = sluier(x, y, w, h, 0.6)
          const alpha = (0.13 + 0.87 * v) * s
          const r = 0.6 + 1.5 * v
          const lime = smooth(0.3, 0.75, v) * smooth(0.38, 0.6, noise3(x * 0.0016 - 7, y * 0.0016, z * 0.5 + 3))
          b.stip(x, y, r, alpha, lime)
        }
      }
    },
  }
}

/** 2 · Terrein: een golvend landschap van stippen in perspectief; de heuvels rollen langzaam naar de kijker toe. */
function terrein(): Scene {
  const NEAR = 1.1
  const FAR = 16
  return {
    init() {},
    frame(b, w, h, t) {
      const horizon = h * 0.4
      const f = w * 0.5
      const camH = 0.85
      const K = f * 0.62 // verticale schaal
      const gap = w < 640 ? 6 : 7 // gewenste afstand tussen stippen op het scherm
      const reis = t * 0.35
      // De rijen liggen vast op de grond, met een afstand die op het scherm steeds ongeveer `gap` is;
      // het hoogteveld schuift erdoorheen.
      for (let z = NEAR; z < FAR; z += (gap * z * z) / (camH * K)) {
        const verte = (z - NEAR) / (FAR - NEAR)
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

/** 3 · Baan: een planeet van stippen die aan de onderrand opkomt, met een ring van stippen eromheen. */
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

/** 4 · Stroming: duizenden deeltjes die een stromingsveld volgen en daardoor vanzelf in stromen samenkomen. */
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

/** 5 · Raster: een halftoon-raster waarin de stipgrootte de gloed volgt van langzaam drijvende wolken. */
function raster(): Scene {
  let stap = 12
  // Wolken: [x, y, straal, snelheid, fase, lime]
  const WOLKEN = [
    [0.18, 0.72, 0.28, 0.9, 0.0, 1],
    [0.82, 0.62, 0.26, 0.7, 2.1, 1],
    [0.5, 0.95, 0.34, 0.5, 4.2, 0],
    [0.32, 0.4, 0.2, 1.1, 1.3, 0],
    [0.7, 0.32, 0.18, 0.8, 3.4, 0],
    [0.95, 0.9, 0.22, 0.6, 5.0, 1],
  ]
  return {
    init(w) {
      stap = w < 640 ? 10 : 12
    },
    frame(b, w, h, t) {
      const m = Math.min(Math.max(w, h * 1.6), w * 1.2)
      const posities = WOLKEN.map(([x, y, r, v, f, l]) => [
        (x + Math.sin(t * 0.05 * v + f) * 0.08) * w,
        (y + Math.cos(t * 0.04 * v + f * 1.7) * 0.07) * h,
        r * m,
        l,
      ])
      const rijen = Math.ceil(h / (stap * 0.866)) + 1
      for (let j = 0; j < rijen; j++) {
        const y = j * stap * 0.866
        const verspring = (j % 2) * stap * 0.5
        for (let x = verspring - stap; x < w + stap; x += stap) {
          let grijs = 0, lime = 0
          for (let k = 0; k < posities.length; k++) {
            const [bx, by, br, bl] = posities[k]
            const dx = (x - bx) / br, dy = (y - by) / (br * 0.6)
            const g = Math.exp(-(dx * dx + dy * dy) * 2.2)
            if (bl) lime += g
            else grijs += g
          }
          const korrel = 0.75 + 0.5 * noise3(x * 0.012, y * 0.012, t * 0.15)
          const v = clamp01((grijs * 0.7 + lime) * korrel)
          const s = sluier(x, y, w, h, 0.85)
          const r = (0.35 + stap * 0.34 * Math.pow(v, 1.3)) * (0.2 + 0.8 * s)
          const mix = lime / (lime + grijs + 0.0001)
          b.stip(x, y, r, (0.1 + 0.85 * v) * s, mix * smooth(0.1, 0.55, v))
        }
      }
    },
  }
}

export const SCENES = {
  golfveld,
  terrein,
  baan,
  stroming,
  raster,
} satisfies Record<string, () => Scene>

export type SceneNaam = keyof typeof SCENES
