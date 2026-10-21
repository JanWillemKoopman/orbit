// Hulpjes voor de achtergrond van de CTA-afsluiter (components/CtaAchtergrond.tsx).

export const TAU = Math.PI * 2

export type Rgb = [number, number, number]

// De sterren: `meet` legt het veld opnieuw neer na een maatwijziging, `teken` tekent
// één frame op tijdstip `tijd` (ms sinds de start).
export type Variant = {
  meet: (width: number, height: number) => void
  teken: (tijd: number) => void
}

export type MaakVariant = (ctx: CanvasRenderingContext2D, kleur: { grijs: Rgb; helder: Rgb; licht: Rgb }) => Variant

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
// kop, tekst en knoppen in het midden is het gedempt zodat alles leesbaar blijft. Het gas in de video
// is op dezelfde manier gedempt (tools/cta-video/render.mjs).
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
