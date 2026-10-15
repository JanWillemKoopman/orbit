// Hulpjes voor de achtergrond van de CTA-afsluiter (components/CtaAchtergrond.tsx).

export const TAU = Math.PI * 2

export type Rgb = [number, number, number]

// De achtergrond: `meet` legt het veld opnieuw neer na een maatwijziging, `teken` tekent
// één frame op tijdstip `tijd` (ms sinds de start).
export type Variant = {
  meet: (width: number, height: number) => void
  teken: (tijd: number) => void
}

export type MaakVariant = (ctx: CanvasRenderingContext2D, kleur: { achtergrond: Rgb; grijs: Rgb; helder: Rgb; licht: Rgb }) => Variant

export function hexToRgb(value: string, fallback: Rgb): Rgb {
  const hex = value.trim().replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
}

export const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// Hoe sterk een punt mag oplichten: boven en onder vloeit het veld weg in de pagina, en achter de
// kop, tekst en knoppen in het midden is het gedempt zodat alles leesbaar blijft.
export function demping(x: number, y: number, width: number, height: number) {
  const rand = smooth(0, 0.18, y / height) * smooth(0, 0.18, 1 - y / height)
  const dx = (x - width / 2) / (width < 640 ? width * 0.5 : Math.min(width * 0.32, 420))
  const dy = (y - height / 2) / (height * 0.28)
  return rand * (1 - 0.7 * Math.exp(-(dx * dx + dy * dy)))
}

// Willekeurige getallen met een vaste seed (mulberry32).
export function maakRandom(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Vloeiende 3D-ruis (value noise) tussen -1 en 1, met een eigen seed. Met `zPeriode` (een geheel
// getal) herhaalt de ruis zich langs z: ruis(x, y, z + zPeriode) is gelijk aan ruis(x, y, z). Zo
// is een animatie die z als tijd gebruikt een naadloze loop.
export function maakRuis(seed: number, zPeriode = 256) {
  const rnd = maakRandom(seed)
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
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const v = (x: number, y: number, z: number) => waarden[perm[perm[perm[x] + y] + z]]

  return (x: number, y: number, z: number) => {
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
