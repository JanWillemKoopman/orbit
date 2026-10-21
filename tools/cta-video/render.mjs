// Rendert het gas van de CTA-achtergrond (components/CtaAchtergrond.tsx) als naadloze videoloop.
//
//   node tools/cta-video/render.mjs <desktop|mobiel> [still] [--seed 1] [--uit public/video]
//
// Met "still" komt er één frame (t = 0) als png uit, om het beeld te beoordelen. Zonder "still" worden
// alle frames berekend en met ffmpeg omgezet naar AV1, VP9, H.264 en een poster. Zie README.md.
//
// Het gas komt naar de Cosmic Cliffs in de Carinanevel, zoals James Webb die in infrarood zag. Onderin
// een donkere wand van stof met grillige pieken en een oplichtende rand; daarboven gloeiend gas dat in
// stromen kolkt, doordat het uit ruis komt die over zichzelf heen wordt verbogen (domain warping). De
// ruis herhaalt zich in de tijd en de klif en de gasstromen draaien in LOOP seconden precies één
// rondje, zodat de video naadloos herhaalt. De sterren staan niet in de video: die tekent de browser
// scherp op een canvas erboven (components/cta/sterren.ts).
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const [formaat, ...rest] = process.argv.slice(2)
const still = rest.includes('still')
const arg = (naam, standaard) => { const i = rest.indexOf(naam); return i >= 0 ? rest[i + 1] : standaard }
const uit = arg('--uit', 'public/video')
const seed = Number(arg('--seed', '1'))

// Maat van het beeld in CSS-px. Breder dan een venster, zodat object-fit: cover vrijwel altijd de
// zijkanten afsnijdt en de zachte overgang boven en onder blijft staan. SCHAAL is het aantal CSS-px
// per videopixel: het gas is zacht, dus een halve resolutie volstaat.
const MATEN = { desktop: { w: 2400, h: 720, smal: false }, mobiel: { w: 800, h: 640, smal: true } }
const { w: W, h: H, smal } = MATEN[formaat] ?? MATEN.desktop
const SCHAAL = 2
const BW = W / SCHAAL
const BH = H / SCHAAL
const FPS = 30
const LOOP = 24 // seconden per loop
const N = FPS * LOOP
const GAS_RONDES = 3 // hoeveel ruiscellen het gas per loop doorloopt (tempo van het kolken)
const KLIF_RONDES = 2 // idem voor de klifrand
const TAU = Math.PI * 2

// De kleuren uit app/globals.css: --bg-primary, --text-tertiary, --accent en --text-primary.
const ACHTERGROND = [8, 9, 10]
const GRIJS = [138, 143, 152]
const LICHT = [188, 255, 47]
const WIT = [247, 248, 248]

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

// Gelijk aan demping() in components/cta/util.ts: boven en onder vloeit het beeld weg in de pagina,
// en achter de kop, tekst en knoppen in het midden is het gedempt.
function demping(x, y) {
  const rand = smooth(0, 0.18, y / H) * smooth(0, 0.18, 1 - y / H)
  const dx = (x - W / 2) / (smal ? W * 0.5 : Math.min(W * 0.32, 420))
  const dy = (y - H / 2) / (H * 0.28)
  return rand * (1 - 0.7 * Math.exp(-(dx * dx + dy * dy)))
}

// Willekeurige getallen met een vaste seed (mulberry32).
function maakRandom(s) {
  let a = s >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Vloeiende 3D-ruis (value noise) tussen -1 en 1. Met `zPeriode` (een geheel getal) herhaalt de
// ruis zich langs z, zodat een animatie die z als tijd gebruikt een naadloze loop is.
function maakRuis(s, zPeriode) {
  const rnd = maakRandom(s)
  const perm = new Uint8Array(512)
  const waarden = new Float32Array(256)
  for (let i = 0; i < 256; i++) {
    perm[i] = i
    waarden[i] = rnd() * 2 - 1
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    const tmp = perm[i]
    perm[i] = perm[j]
    perm[j] = tmp
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i]
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a, b, t) => a + (b - a) * t
  const v = (x, y, z) => waarden[perm[perm[perm[x] + y] + z]]

  return (x, y, z) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
    const u = fade(x - xi), w = fade(y - yi), q = fade(z - zi)
    const zp = ((zi % zPeriode) + zPeriode) % zPeriode
    const X = xi & 255, Y = yi & 255, Z = zp & 255
    const X1 = (X + 1) & 255, Y1 = (Y + 1) & 255, Z1 = ((zp + 1) % zPeriode) & 255
    return lerp(
      lerp(lerp(v(X, Y, Z), v(X1, Y, Z), u), lerp(v(X, Y1, Z), v(X1, Y1, Z), u), w),
      lerp(lerp(v(X, Y, Z1), v(X1, Y, Z1), u), lerp(v(X, Y1, Z1), v(X1, Y1, Z1), u), w),
      q,
    )
  }
}

const ruis = maakRuis(seed, GAS_RONDES)
const klifRuis = maakRuis(seed ^ 0x165667b1, KLIF_RONDES)

// Fractale ruis: drie octaven, ongeveer tussen -1 en 1.
const fbm = (x, y, z) =>
  (ruis(x, y, z) + 0.5 * ruis(x * 2.03 + 17, y * 2.03 + 3, z + 1.3) + 0.25 * ruis(x * 4.1 + 41, y * 4.1 + 29, z + 2.1)) / 1.2

const demp = new Float32Array(BW * BH)
for (let j = 0; j < BH; j++) {
  for (let i = 0; i < BW; i++) {
    const x = (i + 0.5) * SCHAAL
    const y = (j + 0.5) * SCHAAL
    // Het gas mag iets verder doorlopen achter de tekst dan de sterren.
    demp[j * BW + i] = (0.25 + 0.75 * demping(x, y)) * smooth(0, 0.18, y / H) * smooth(0, 0.18, 1 - y / H)
  }
}
const rand = new Float32Array(BW)

// Berekent beeld `k` van de loop als rgb24.
function tekenGas(k) {
  const data = Buffer.alloc(BW * BH * 3)
  const u = k / N
  const z = u * GAS_RONDES
  const zk = u * KLIF_RONDES
  // De stroming draait in een cirkel, zodat het gas aan het eind van de loop weer terug is.
  const sx = 0.5 * Math.cos(u * TAU)
  const sy = 0.5 * Math.sin(u * TAU)
  // Per kolom de hoogte van de klifrand: een grillige lijn met pieken die langzaam verschuift.
  for (let i = 0; i < BW; i++) {
    const x = (i + 0.5) * SCHAAL
    const golf = klifRuis(x / 340, 11.3, zk) + 0.5 * klifRuis(x / 170 + 9, 2.7, zk + 0.5)
    const piek = Math.pow(Math.max(0, klifRuis(x / 110 + 70, 5.1, zk + 1.1)), 2) * 0.9
    rand[i] = H * (0.58 + 0.16 * golf - 0.3 * piek)
  }

  let o = 0
  for (let j = 0; j < BH; j++) {
    const y = (j + 0.5) * SCHAAL
    for (let i = 0; i < BW; i++, o += 3) {
      const x = (i + 0.5) * SCHAAL
      const px = x / 480
      const py = y / 420
      // Domain warping: twee lagen ruis buigen de derde, zodat het gas in slierten en krullen kolkt.
      const qx = ruis(px + sx, py, z)
      const qy = ruis(px + 5.2, py + 1.3 + sy, z + 0.4)
      const r = fbm(px + 1.9 * qx + sy, py + 1.9 * qy, z + 0.8)
      // Filamenten: geribbelde ruis op een fijnere schaal geeft de dunne gasstromen en richels.
      const f = 1 - Math.abs(ruis(px * 3.2 + 2.2 * qx, py * 3.2 + 2.2 * qy, z + 1.7))
      const fil = f * f * f * f

      // Afstand tot de klifrand (positief = in het stof), met de rand zelf ook verbogen.
      const d = (y - rand[i] - 70 * qx) / (H * 0.09)
      const inStof = smooth(-0.3, 0.6, d + r * 0.9)
      const dr = d + r * 0.7 - fil * 0.4
      const randGloed = Math.exp(-dr * dr * 7)
      const nabij = Math.exp(-Math.max(0, -d) * 0.4)

      // Boven de klif: donkerder gas met filamenten, iets helderder vlak boven de rand.
      const gas = (smooth(-0.3, 0.9, r + 0.35 * qy) * 0.5 + fil * 0.5) * (1 - inStof) * (0.2 + 0.5 * nabij)
      // De klif zelf: een massa stof die van bovenaf wordt aangelicht. Vlak onder de rand het
      // helderst en het meest getextureerd, naar beneden toe zakt hij weg in het donker.
      const diep = Math.exp(-Math.max(0, d) * 0.4)
      const stof = (0.14 + 0.45 * smooth(-0.5, 0.9, r) + 0.55 * fil) * inStof * (0.35 + 0.65 * diep)
      const L = Math.min(1, gas * 0.55 + stof + randGloed * (0.25 + 0.35 * fil))
      const warmte = Math.min(1, randGloed * 0.55 + stof * diep * 0.6)

      let c = mix(ACHTERGROND, GRIJS, L)
      c = mix(c, LICHT, Math.min(0.6, warmte * Math.min(1, L * 1.6)))
      // Waar het gas het dichtst is, een vleugje bijna-wit, zoals de felste delen op de foto.
      c = mix(c, WIT, Math.max(0, L - 0.6) * 0.6)
      c = mix(ACHTERGROND, c, demp[j * BW + i])
      data[o] = c[0]
      data[o + 1] = c[1]
      data[o + 2] = c[2]
    }
  }
  return data
}

const ffmpeg = (args, frames) =>
  new Promise((res, rej) => {
    const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${BW}x${BH}`, '-framerate', String(FPS), '-i', '-', ...args], { stdio: ['pipe', 'inherit', 'inherit'] })
    p.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg ' + c))))
    for (const f of frames) p.stdin.write(f)
    p.stdin.end()
  })

mkdirSync(uit, { recursive: true })
const naam = `cta-nevel-${formaat}`

if (still) {
  await ffmpeg(['-frames:v', '1', `${uit}/still-${naam}.png`], [tekenGas(0)])
  process.exit(0)
}

const frames = []
for (let k = 0; k < N; k++) {
  frames.push(tekenGas(k))
  if (k % 60 === 0) console.log(naam, k, '/', N)
}

// De poster is het eerste frame, als WebP. Hij staat er zolang de video laadt, en voor wie bewegende
// beelden uit heeft of data wil besparen.
await ffmpeg(['-frames:v', '1', '-c:v', 'libwebp', '-quality', '80', '-compression_level', '6', `${uit}/${naam}-poster.webp`], [frames[0]])

const codecs = {
  'h264.mp4': ['-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'],
  'vp9.webm': ['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', '-pix_fmt', 'yuv420p', '-an'],
  'av1.mp4': ['-c:v', 'libsvtav1', '-preset', '5', '-crf', '40', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'],
}
for (const [ext, args] of Object.entries(codecs)) {
  await ffmpeg([...args, `${uit}/${naam}.${ext}`], frames)
  console.log(naam, ext, 'klaar')
}
