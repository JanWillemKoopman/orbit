import { demping, maakRandom, TAU, type MaakVariant, type Rgb } from './util'

// De sterren boven de nevel achter de afsluiter. Het gas zelf is een video (tools/cta-video); de
// sterren blijven op het canvas, omdat fonkelende puntjes van een pixel in een video vervagen of het
// bestand groot maken. Door het stof heen zie je jonge sterren (de felste met de zes spikes van Webb)
// en op de achtergrond kleine sterrenstelsels.
//
// Ook dit is een naadloze loop van LOOP seconden: elke ster fonkelt een geheel aantal keer per loop.

const STER_DICHTHEID = 1 / 2600 // sterren per px²
const SPIKE_STERREN = 9 // bij 1440 px breed
const STELSELS = 22 // bij 1440 px breed
const LOOP = 24 // seconden per loop

type Ster = { x: number; y: number; r: number; helder: number; fonkel: number; fase: number }
type Stelsel = { x: number; y: number; rx: number; ry: number; hoek: number; helder: number }
type SpikeSter = { x: number; y: number; lengte: number; helder: number; fase: number; beeld: HTMLCanvasElement }

const mix = (a: Rgb, b: Rgb, t: number): Rgb => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

export const maakSterren: MaakVariant = (ctx, { grijs, licht, helder: wit }) => {
  const rnd = maakRandom(Math.floor(Math.random() * 2 ** 32))
  let width = 0
  let height = 0
  let sterren: Ster[] = []
  let stelsels: Stelsel[] = []
  let spikes: SpikeSter[] = []

  const kleurStr = (c: Rgb, a: number) => `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${a.toFixed(3)})`

  // Een felle ster met de zes diffractiespikes van Webb (plus de twee korte horizontale), één keer
  // op volle sterkte getekend. Per frame gaat hij er met globalAlpha overheen.
  const tekenSpike = (lengte: number, dpr: number) => {
    const canvas = document.createElement('canvas')
    const m = Math.ceil(lengte) + 2
    canvas.width = canvas.height = Math.ceil(m * 2 * dpr)
    const c = canvas.getContext('2d')!
    c.setTransform(dpr, 0, 0, dpr, m * dpr, m * dpr)
    const kleur = mix(wit, licht, 0.35)
    c.fillStyle = kleurStr(kleur, 0.18)
    c.beginPath()
    c.arc(0, 0, 4, 0, TAU)
    c.fill()
    c.lineCap = 'round'
    c.lineWidth = 0.8
    for (let k = 0; k < 8; k++) {
      const hoek = k < 6 ? Math.PI / 2 + (k * Math.PI) / 3 : k === 6 ? 0 : Math.PI
      const l = k < 6 ? lengte : lengte * 0.45
      const grad = c.createLinearGradient(0, 0, Math.cos(hoek) * l, Math.sin(hoek) * l)
      grad.addColorStop(0, kleurStr(kleur, 1))
      grad.addColorStop(1, kleurStr(kleur, 0))
      c.strokeStyle = grad
      c.beginPath()
      c.moveTo(0, 0)
      c.lineTo(Math.cos(hoek) * l, Math.sin(hoek) * l)
      c.stroke()
    }
    c.fillStyle = kleurStr(wit, 1)
    c.beginPath()
    c.arc(0, 0, 1.3, 0, TAU)
    c.fill()
    return canvas
  }

  return {
    meet(w, h) {
      width = w
      height = h
      const dpr = ctx.getTransform().a || 1

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
      spikes = Array.from({ length: Math.max(3, Math.round(SPIKE_STERREN * verhouding)) }, () => {
        const lengte = 7 + rnd() * 16
        return { x: rnd() * w, y: h * (0.2 + rnd() * 0.65), lengte, helder: 0.55 + rnd() * 0.45, fase: rnd() * TAU, beeld: tekenSpike(lengte, dpr) }
      })
    },

    teken(tijd) {
      // Een sectie zonder maat (nog niet opgemeten tijdens een paginawissel) valt niets te tekenen.
      if (!width || !height) return
      const t = (tijd / 1000) % LOOP
      ctx.clearRect(0, 0, width, height)

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

      // Jonge, felle sterren met spikes.
      for (const s of spikes) {
        ctx.globalAlpha = s.helder * (0.75 + 0.25 * Math.sin((t / LOOP) * TAU * 3 + s.fase)) * randDemp(s.x, s.y)
        const m = Math.ceil(s.lengte) + 2
        ctx.drawImage(s.beeld, s.x - m, s.y - m, m * 2, m * 2)
      }
      ctx.globalAlpha = 1
    },
  }
}
