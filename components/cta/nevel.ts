import { demping, maakRandom, maakRuis, smooth, TAU, type MaakVariant, type Rgb } from './util'

// De nevel achter de afsluiter: naar de Cosmic Cliffs in de Carinanevel, zoals James Webb die in
// infrarood zag. Onderin een donkere wand van stof met grillige pieken en een oplichtende rand;
// daarboven gloeiend gas dat in stromen kolkt. Door het stof heen zie je jonge sterren (de felste met de zes spikes
// van Webb) en op de achtergrond kleine sterrenstelsels. Alles beweegt traag en organisch, doordat
// het gas uit ruis komt die over zichzelf heen wordt verbogen (domain warping).
//
// De animatie is een naadloze loop van LOOP seconden: de ruis herhaalt zich in de tijd, de klif
// en de gasstromen draaien in die tijd precies één rondje, en elke ster fonkelt een geheel aantal
// keer per loop.
//
// Het gas wordt op een lage resolutie berekend en zacht opgeschaald; de sterren tekenen scherp
// daaroverheen.

const SCHAAL = 7 // px per gaspixel op desktop
const SCHAAL_KLEIN = 5 // op smalle schermen
const STER_DICHTHEID = 1 / 2600 // sterren per px²
const SPIKE_STERREN = 9 // bij 1440 px breed
const STELSELS = 22 // bij 1440 px breed
const LOOP = 24 // seconden per loop
const GAS_RONDES = 3 // hoeveel ruiscellen het gas per loop doorloopt (tempo van het kolken)
const KLIF_RONDES = 2 // idem voor de klifrand

type Ster = { x: number; y: number; r: number; helder: number; fonkel: number; fase: number }
type Stelsel = { x: number; y: number; rx: number; ry: number; hoek: number; helder: number }
type SpikeSter = { x: number; y: number; lengte: number; helder: number; fase: number }

const mix = (a: Rgb, b: Rgb, t: number): Rgb => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

export const maakNevel: MaakVariant = (ctx, { achtergrond, grijs, licht, helder: wit }) => {
  const seed = Math.floor(Math.random() * 2 ** 32)
  const ruis = maakRuis(seed, GAS_RONDES)
  const klifRuis = maakRuis(seed ^ 0x165667b1, KLIF_RONDES)
  const rnd = maakRandom(seed ^ 0x27d4eb2f)

  // Fractale ruis: drie octaven, ongeveer tussen -1 en 1.
  const fbm = (x: number, y: number, z: number) =>
    (ruis(x, y, z) + 0.5 * ruis(x * 2.03 + 17, y * 2.03 + 3, z + 1.3) + 0.25 * ruis(x * 4.1 + 41, y * 4.1 + 29, z + 2.1)) / 1.2

  const buffer = document.createElement('canvas')
  const bctx = buffer.getContext('2d')!
  let beeld: ImageData | null = null
  let width = 0
  let height = 0
  let schaal = SCHAAL
  let bw = 0
  let bh = 0
  let demp = new Float32Array(0)
  let sterren: Ster[] = []
  let stelsels: Stelsel[] = []
  let spikes: SpikeSter[] = []
  let frame = 0

  const kleurStr = (c: Rgb, a: number) => `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${a.toFixed(3)})`

  // `u` is de plek in de loop, van 0 tot 1.
  const tekenGas = (u: number) => {
    if (!beeld) return
    const data = beeld.data
    const z = u * GAS_RONDES
    const zk = u * KLIF_RONDES
    // De stroming draait in een cirkel, zodat het gas aan het eind van de loop weer terug is.
    const sx = 0.5 * Math.cos(u * TAU)
    const sy = 0.5 * Math.sin(u * TAU)
    // Per kolom de hoogte van de klifrand: een grillige lijn met pieken die langzaam verschuift.
    const rand = new Float32Array(bw)
    for (let i = 0; i < bw; i++) {
      const x = i * schaal
      const golf = klifRuis(x / 340, 11.3, zk) + 0.5 * klifRuis(x / 170 + 9, 2.7, zk + 0.5)
      const piek = Math.pow(Math.max(0, klifRuis(x / 110 + 70, 5.1, zk + 1.1)), 2) * 0.9
      rand[i] = height * (0.58 + 0.16 * golf - 0.3 * piek)
    }

    let o = 0
    for (let j = 0; j < bh; j++) {
      const y = j * schaal
      for (let i = 0; i < bw; i++, o += 4) {
        const x = i * schaal
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
        const d = (y - rand[i] - 70 * qx) / (height * 0.09)
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

        let c = mix(achtergrond, grijs, L)
        c = mix(c, licht, Math.min(0.6, warmte * Math.min(1, L * 1.6)))
        // Waar het gas het dichtst is, een vleugje bijna-wit, zoals de felste delen op de foto.
        c = mix(c, wit, Math.max(0, L - 0.6) * 0.6)
        c = mix(achtergrond, c, demp[j * bw + i])
        data[o] = c[0]
        data[o + 1] = c[1]
        data[o + 2] = c[2]
        data[o + 3] = 255
      }
    }
    bctx.putImageData(beeld, 0, 0)
  }

  return {
    meet(w, h) {
      width = w
      height = h
      schaal = w < 640 ? SCHAAL_KLEIN : SCHAAL
      bw = Math.ceil(w / schaal) + 1
      bh = Math.ceil(h / schaal) + 1
      buffer.width = bw
      buffer.height = bh
      beeld = bctx.createImageData(bw, bh)
      demp = new Float32Array(bw * bh)
      for (let j = 0; j < bh; j++) {
        for (let i = 0; i < bw; i++) {
          // Het gas mag iets verder doorlopen achter de tekst dan de andere varianten.
          demp[j * bw + i] = 0.25 + 0.75 * demping(i * schaal, j * schaal, w, h)
          demp[j * bw + i] *= smooth(0, 0.18, (j * schaal) / h) * smooth(0, 0.18, 1 - (j * schaal) / h)
        }
      }

      const verhouding = w / 1440
      sterren = Array.from({ length: Math.round(w * h * STER_DICHTHEID) }, () => ({
        x: rnd() * w,
        y: rnd() * h,
        r: 0.4 + Math.pow(rnd(), 4) * 1.1,
        helder: 0.25 + Math.pow(rnd(), 2) * 0.75,
        // Een geheel aantal keer per loop, zodat het fonkelen naadloos doorloopt.
        fonkel: (TAU * (3 + Math.floor(rnd() * 16))) / LOOP,
        fase: rnd() * TAU,
      }))
      stelsels = Array.from({ length: Math.max(6, Math.round(STELSELS * verhouding)) }, () => {
        const grootte = 1.5 + rnd() * 3.5
        return { x: rnd() * w, y: rnd() * h, rx: grootte, ry: grootte * (0.3 + rnd() * 0.5), hoek: rnd() * Math.PI, helder: 0.25 + rnd() * 0.35 }
      })
      spikes = Array.from({ length: Math.max(3, Math.round(SPIKE_STERREN * verhouding)) }, () => ({
        x: rnd() * w,
        y: h * (0.2 + rnd() * 0.65),
        lengte: 7 + rnd() * 16,
        helder: 0.55 + rnd() * 0.45,
        fase: rnd() * TAU,
      }))
      frame = 0
    },

    teken(tijd) {
      // Een sectie zonder maat (nog niet opgemeten tijdens een paginawissel) valt niets te tekenen.
      if (!width || !height) return
      const t = (tijd / 1000) % LOOP
      // Het gas is het zwaarste deel; het verandert traag, dus om het andere frame is genoeg.
      if (frame++ % 2 === 0) tekenGas(t / LOOP)

      ctx.clearRect(0, 0, width, height)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'low'
      ctx.drawImage(buffer, 0, 0, bw, bh, 0, 0, bw * schaal, bh * schaal)

      const randDemp = (x: number, y: number) => 0.35 + 0.65 * demping(x, y, width, height)

      // Sterrenstelsels: vage ovaaltjes ver weg.
      for (const g of stelsels) {
        ctx.fillStyle = kleurStr(mix(grijs, licht, 0.25), g.helder * randDemp(g.x, g.y))
        ctx.beginPath()
        ctx.ellipse(g.x, g.y, g.rx, g.ry, g.hoek, 0, TAU)
        ctx.fill()
      }

      // Sterren: fonkelen elk in hun eigen ritme.
      for (const s of sterren) {
        const a = s.helder * (0.6 + 0.4 * Math.sin(t * s.fonkel + s.fase)) * randDemp(s.x, s.y)
        if (a < 0.05) continue
        ctx.fillStyle = kleurStr(mix(grijs, wit, s.helder), a)
        ctx.fillRect(s.x - s.r / 2, s.y - s.r / 2, s.r, s.r)
      }

      // Jonge, felle sterren met de zes diffractiespikes van Webb (plus de twee korte horizontale).
      ctx.lineCap = 'round'
      for (const s of spikes) {
        const a = s.helder * (0.75 + 0.25 * Math.sin((t / LOOP) * TAU * 3 + s.fase)) * randDemp(s.x, s.y)
        const kleur = mix(wit, licht, 0.35)
        ctx.fillStyle = kleurStr(kleur, a * 0.18)
        ctx.beginPath()
        ctx.arc(s.x, s.y, 4, 0, TAU)
        ctx.fill()
        ctx.lineWidth = 0.8
        for (let k = 0; k < 8; k++) {
          const hoek = k < 6 ? Math.PI / 2 + (k * Math.PI) / 3 : k === 6 ? 0 : Math.PI
          const lengte = k < 6 ? s.lengte : s.lengte * 0.45
          const grad = ctx.createLinearGradient(s.x, s.y, s.x + Math.cos(hoek) * lengte, s.y + Math.sin(hoek) * lengte)
          grad.addColorStop(0, kleurStr(kleur, a))
          grad.addColorStop(1, kleurStr(kleur, 0))
          ctx.strokeStyle = grad
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x + Math.cos(hoek) * lengte, s.y + Math.sin(hoek) * lengte)
          ctx.stroke()
        }
        ctx.fillStyle = kleurStr(wit, a)
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.3, 0, TAU)
        ctx.fill()
      }
    },
  }
}
