import { demping, kleurtrap, maakKlok, maakRuis, smooth, TAU, type MaakVariant } from './util'

// Variant 'golf': een raster van donkere stipjes dat in golven oplicht naar het accent.
// De golven zijn bewust onvoorspelbaar: richting, snelheid, kromming en sterkte worden gestuurd
// door vloeiende ruis met een willekeurige seed per bezoek, zodat er geen herhalend patroon is.

const SPACING = 18 // afstand tussen de stipjes in px
const SPACING_SMALL = 15 // op smalle schermen
const LEVELS = 24 // aantal kleurstappen; per stap één path, zodat er weinig fill-calls zijn
const TEMPO = 2 // tempo van de hele animatie: golven, draaiing en aanzwellen

// Twee golftreinen die elkaar kruisen. Elk heeft een basisrichting, golflengte en snelheid; de ruis
// laat die rond die basis zwerven.
const GOLVEN = [
  { hoek: 0.12, lengte: 0.5, snelheid: 1.15, scherpte: 6, sterkte: 1 },
  { hoek: -0.55, lengte: 0.8, snelheid: 0.75, scherpte: 8, sterkte: 0.6 },
]

export const maakGolf: MaakVariant = (ctx, { rust, licht }) => {
  const kleuren = kleurtrap(rust, licht, LEVELS)
  const ruis = maakRuis(Math.floor(Math.random() * 2 ** 32))
  const klok = maakKlok()
  // Fase per golf. Die wordt per frame opgeteld in plaats van berekend uit de tijd, zodat de
  // snelheid kan variëren zonder dat de golf verspringt.
  const fasen = GOLVEN.map(() => Math.random() * TAU)
  let width = 0
  let height = 0
  let dots: { x: number; y: number; demp: number }[] = []

  return {
    meet(w, h) {
      width = w
      height = h
      const gap = width < 640 ? SPACING_SMALL : SPACING
      const cols = Math.floor(width / gap)
      const rows = Math.floor(height / gap)
      const offX = (width - (cols - 1) * gap) / 2
      const offY = (height - (rows - 1) * gap) / 2
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offX + c * gap
          const y = offY + r * gap
          dots.push({ x, y, demp: demping(x, y, width, height) })
        }
      }
    },

    teken(tijd) {
      const klokstand = klok(tijd)
      const t = klokstand.t * TEMPO
      const dt = klokstand.dt * TEMPO
      const cx = width / 2
      const cy = height / 2
      const paden = Array.from({ length: LEVELS }, () => new Path2D())
      const rBasis = width < 640 ? 1.1 : 1.25

      // Per golf voor dit frame: richting en snelheid zwerven langzaam rond hun basiswaarde.
      const golven = GOLVEN.map((g, n) => {
        const hoek = g.hoek + 0.55 * ruis(t * 0.025, n * 13.7, 1.3)
        const snelheid = g.snelheid * (0.95 + 0.6 * ruis(t * 0.04, n * 7.1, 5.9))
        fasen[n] += snelheid * dt
        return {
          cos: Math.cos(hoek),
          sin: Math.sin(hoek),
          k: TAU / Math.max(width * g.lengte, 380),
          fase: fasen[n],
          scherpte: g.scherpte,
          sterkte: g.sterkte,
          z: t * 0.06 + n * 31.4,
        }
      })

      for (const d of dots) {
        const px = d.x - cx
        const py = d.y - cy
        let som = 0
        for (let n = 0; n < golven.length; n++) {
          const g = golven[n]
          // Ruis buigt de kammen (kromming) en bepaalt waar een golf sterk is en waar hij uitdooft,
          // zodat er sets ontstaan die aanzwellen en weer verdwijnen.
          const buig = 2.6 * ruis(d.x / 420, d.y / 300, g.z)
          const env = smooth(-0.35, 0.55, ruis(d.x / 650 + 40, d.y / 650, g.z * 0.8 + 9))
          const p = (px * g.cos + py * g.sin) * g.k - g.fase + buig
          som += Math.pow(0.5 + 0.5 * Math.sin(p), g.scherpte) * g.sterkte * (0.35 + 0.65 * env)
        }
        const i = Math.min(1, som * 1.15 * d.demp)
        const level = Math.round(i * (LEVELS - 1))
        const r = rBasis + i * 0.6
        const pad = paden[level]
        pad.moveTo(d.x + r, d.y)
        pad.arc(d.x, d.y, r, 0, TAU)
      }

      ctx.clearRect(0, 0, width, height)
      for (let l = 0; l < LEVELS; l++) {
        ctx.fillStyle = kleuren[l]
        ctx.fill(paden[l])
      }
    },
  }
}
