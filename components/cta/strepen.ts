import { demping, kleurtrap, maakKlok, maakRandom, maakRuis, type MaakVariant } from './util'

// Variant 'strepen': zo'n duizend asteroïden zoeven schuin voorbij. Elke streep heeft een diepte:
// ver weg is hij kort, dun, traag en donker, dichtbij lang, dikker, snel en in het accent. De staart
// loopt uit naar donker. Het tempo zwelt aan en neemt af, zodat er af en toe een zwerm doorschiet.

const AANTAL = 1000 // bij een venster van 1440 × 700; kleinere vlakken krijgen er naar rato minder
const MIN_AANTAL = 260
const LEVELS = 16
const LAGEN = [0.6, 1, 1.6] // lijndikte per dieptelaag
const STUKKEN = 4 // de staart in stukken, elk iets donkerder

type Streep = { x: number; y: number; diepte: number; laag: number; hoek: number }

export const maakStrepen: MaakVariant = (ctx, { rust, licht }) => {
  const kleuren = kleurtrap(rust, licht, LEVELS)
  const seed = Math.floor(Math.random() * 2 ** 32)
  const ruis = maakRuis(seed)
  const rnd = maakRandom(seed ^ 0x85ebca6b)
  const klok = maakKlok()
  let width = 0
  let height = 0
  let strepen: Streep[] = []
  let tempo = 1

  const nieuw = (ergens: boolean): Streep => {
    const diepte = Math.pow(rnd(), 1.8) // de meeste ver weg, een paar vlakbij
    return {
      // Nieuwe strepen komen links buiten beeld binnen; bij het opbouwen liggen ze overal.
      x: ergens ? rnd() * width : -rnd() * width * 0.3 - 40,
      y: rnd() * (height + 200) - 140,
      diepte,
      laag: diepte < 0.45 ? 0 : diepte < 0.8 ? 1 : 2,
      hoek: 0.2 + (rnd() - 0.5) * 0.08,
    }
  }

  return {
    meet(w, h) {
      width = w
      height = h
      const aantal = Math.max(MIN_AANTAL, Math.round((AANTAL * w * h) / (1440 * 700)))
      strepen = Array.from({ length: aantal }, () => nieuw(true))
    },

    teken(tijd) {
      const { t, dt } = klok(tijd)
      // Het tempo van de stroom zwerft tussen rustig en een flinke vlaag.
      tempo = 0.75 + 0.9 * Math.max(0, ruis(t * 0.08, 7.3, 1.1) + 0.25)
      const paden = Array.from({ length: LAGEN.length * LEVELS }, () => new Path2D())

      for (const s of strepen) {
        const snelheid = (90 + 1100 * s.diepte * s.diepte) * tempo
        const cos = Math.cos(s.hoek)
        const sin = Math.sin(s.hoek)
        s.x += cos * snelheid * dt
        s.y += sin * snelheid * dt
        const lengte = 8 + 150 * s.diepte * s.diepte * tempo
        if (s.x - cos * lengte > width + 10 || s.y - sin * lengte > height + 10) {
          Object.assign(s, nieuw(false))
          continue
        }

        const kop = (0.25 + 0.75 * s.diepte) * demping(Math.min(Math.max(s.x, 0), width), Math.min(Math.max(s.y, 0), height), width, height)
        for (let k = 0; k < STUKKEN; k++) {
          const i = kop * (1 - k / STUKKEN)
          const level = Math.round(Math.min(1, i) * (LEVELS - 1))
          if (level === 0) break
          const a = (k / STUKKEN) * lengte
          const b = ((k + 1) / STUKKEN) * lengte
          const pad = paden[s.laag * LEVELS + level]
          pad.moveTo(s.x - cos * a, s.y - sin * a)
          pad.lineTo(s.x - cos * b, s.y - sin * b)
        }
      }

      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'
      for (let laag = 0; laag < LAGEN.length; laag++) {
        ctx.lineWidth = LAGEN[laag]
        for (let l = 1; l < LEVELS; l++) {
          ctx.strokeStyle = kleuren[l]
          ctx.stroke(paden[laag * LEVELS + l])
        }
      }
    },
  }
}
