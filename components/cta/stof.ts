import { demping, kleurtrap, maakKlok, maakRandom, maakRuis, smooth, TAU, type MaakVariant } from './util'

// Variant 'stof': sterrenstof. Duizenden heel kleine deeltjes drijven op een langzame stroming die
// uit ruis komt, zodat ze in slierten en wolken samenkomen en weer uiteenwaaien. Ze fonkelen elk in
// hun eigen ritme; waar het stof dicht is, licht het op naar het accent.

const DICHTHEID = 1 / 130 // deeltjes per px²
const MAX_DEELTJES = 9000
const LEVELS = 20

type Deeltje = { x: number; y: number; grootte: number; helder: number; fonkel: number; fase: number; snelheid: number }

export const maakStof: MaakVariant = (ctx, { rust, licht, grijs }) => {
  // Zwak stof is grijs (van de rand naar tertiaire tekst), fel stof kleurt door naar het accent.
  const kleuren = [...kleurtrap(rust, grijs, LEVELS / 2), ...kleurtrap(grijs, licht, LEVELS / 2 + 1).slice(1)]
  const seed = Math.floor(Math.random() * 2 ** 32)
  const ruis = maakRuis(seed)
  const rnd = maakRandom(seed ^ 0x9e3779b9)
  const klok = maakKlok()
  let width = 0
  let height = 0
  let deeltjes: Deeltje[] = []

  const nieuw = (): Deeltje => ({
    x: rnd() * width,
    y: rnd() * height,
    // De meeste korrels zijn piepklein, een enkele is wat groter.
    grootte: 0.7 + Math.pow(rnd(), 3) * 1.8,
    helder: 0.3 + Math.pow(rnd(), 0.7) * 0.7,
    fonkel: 0.6 + rnd() * 2.2,
    fase: rnd() * TAU,
    snelheid: 0.6 + rnd() * 0.8,
  })

  return {
    meet(w, h) {
      const oud = width * height
      width = w
      height = h
      const aantal = Math.min(MAX_DEELTJES, Math.round(w * h * DICHTHEID))
      // Bij een kleine maatwijziging blijft het bestaande stof liggen.
      if (!oud) deeltjes = []
      deeltjes = deeltjes.filter((d) => d.x <= w && d.y <= h).slice(0, aantal)
      while (deeltjes.length < aantal) deeltjes.push(nieuw())
    },

    teken(tijd) {
      const { t, dt } = klok(tijd)
      const paden = Array.from({ length: LEVELS }, () => new Path2D())
      const z = t * 0.05

      for (const d of deeltjes) {
        // Stroming: de ruis geeft een hoek, het stof volgt die. Een vaste trek naar rechts zorgt
        // dat het veld als geheel langzaam voorbij drijft.
        const hoek = ruis(d.x / 360, d.y / 360, z) * TAU * 0.9
        const v = 22 * d.snelheid
        d.x += (Math.cos(hoek) * v + 9) * dt
        d.y += Math.sin(hoek) * v * 0.7 * dt
        if (d.x > width + 2) d.x -= width + 4
        if (d.x < -2) d.x += width + 4
        if (d.y > height + 2) d.y -= height + 4
        if (d.y < -2) d.y += height + 4

        // Wolken: een tweede, grovere ruis bepaalt waar het stof oplicht.
        const wolk = smooth(-0.1, 0.65, ruis(d.x / 520 + 50, d.y / 420, z * 0.7 + 3))
        const fonkel = 0.55 + 0.45 * Math.sin(t * d.fonkel + d.fase)
        const i = Math.min(1, d.helder * fonkel * (0.32 + 1.1 * wolk) * demping(d.x, d.y, width, height))
        if (i < 0.04) continue
        const level = Math.round(i * (LEVELS - 1))
        const s = d.grootte * (0.8 + 0.4 * i)
        paden[level].rect(d.x - s / 2, d.y - s / 2, s, s)
      }

      ctx.clearRect(0, 0, width, height)
      for (let l = 1; l < LEVELS; l++) {
        // De felste korrels krijgen een zachte gloed in het accent.
        ctx.shadowBlur = l >= LEVELS - 4 ? 6 : 0
        ctx.shadowColor = kleuren[LEVELS - 1]
        ctx.fillStyle = kleuren[l]
        ctx.fill(paden[l])
      }
      ctx.shadowBlur = 0
    },
  }
}
