// Generatieve cover-art: rustige, monochrome SVG-composities op een bijna-zwarte ondergrond.
// Elke variant + seed levert altijd hetzelfde beeld op, zodat covers stabiel blijven tussen builds.

export const artVariants = ['rings', 'lines', 'grid', 'orb', 'waves', 'bars', 'dots', 'arcs', 'prism', 'stack'] as const
export type ArtVariant = (typeof artVariants)[number]

const W = 1600
const H = 900

function rng(seed: number) {
  let s = (seed * 9301 + 49297) % 233280 || 1
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const f = (n: number) => Math.round(n * 10) / 10

export function renderArt(variant: string, seed = 1, accent?: string): string {
  const r = rng(seed + variant.length * 31)
  const hueTint = accent ?? '#5e6ad2'
  const id = `a${variant}${seed}`
  let body = ''

  switch (variant as ArtVariant) {
    case 'rings': {
      const cx = W * (0.42 + r() * 0.16)
      const cy = H * (0.45 + r() * 0.1)
      for (let i = 0; i < 18; i++) {
        const rad = 40 + i * 34
        const o = 0.5 - i * 0.025
        body += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${rad}" fill="none" stroke="#fff" stroke-opacity="${f(Math.max(o, 0.03) * 100) / 100}" stroke-width="1.2"/>`
      }
      body += `<circle cx="${f(cx)}" cy="${f(cy)}" r="40" fill="url(#${id}g)"/>`
      break
    }
    case 'lines': {
      const n = 64
      for (let i = 0; i < n; i++) {
        const t = i / n
        const x = W * Math.pow(t, 1.8)
        const o = 0.08 + t * 0.6
        body += `<line x1="${f(x)}" y1="${f(H * 0.18 + r() * 40)}" x2="${f(x)}" y2="${f(H * 0.82 - r() * 40)}" stroke="#fff" stroke-opacity="${f(o * 100) / 100}" stroke-width="${f(1 + t * 2)}"/>`
      }
      break
    }
    case 'grid': {
      const size = 56
      const ox = (W % size) / 2
      const oy = (H % size) / 2
      for (let x = 0; x <= W / size; x++) for (let y = 0; y <= H / size; y++) {
        const px = ox + x * size
        const py = oy + y * size
        const d = Math.hypot(px - W / 2, py - H / 2) / (W / 2)
        const o = Math.max(0, 0.55 - d * 0.6) + (r() > 0.97 ? 0.4 : 0)
        if (o > 0.02) body += `<rect x="${f(px - 2)}" y="${f(py - 2)}" width="4" height="4" rx="1" fill="#fff" fill-opacity="${f(o * 100) / 100}"/>`
      }
      break
    }
    case 'orb': {
      const cx = W * (0.4 + r() * 0.2)
      body += `<circle cx="${f(cx)}" cy="${H / 2}" r="260" fill="url(#${id}orb)"/>`
      body += `<ellipse cx="${f(cx)}" cy="${H / 2}" rx="420" ry="90" fill="none" stroke="#fff" stroke-opacity=".22" transform="rotate(-14 ${f(cx)} ${H / 2})"/>`
      body += `<ellipse cx="${f(cx)}" cy="${H / 2}" rx="520" ry="130" fill="none" stroke="#fff" stroke-opacity=".1" transform="rotate(-14 ${f(cx)} ${H / 2})"/>`
      body += `<circle cx="${f(cx + 380)}" cy="${H / 2 - 96}" r="7" fill="#fff" fill-opacity=".8"/>`
      break
    }
    case 'waves': {
      for (let i = 0; i < 26; i++) {
        const y0 = H * 0.2 + i * 22
        const amp = 30 + r() * 50
        const ph = r() * Math.PI
        let d = `M0 ${f(y0)}`
        for (let x = 0; x <= W; x += 40) d += ` L${x} ${f(y0 + Math.sin(x / 220 + ph + i * 0.18) * amp)}`
        body += `<path d="${d}" fill="none" stroke="#fff" stroke-opacity="${f((0.05 + (i / 26) * 0.35) * 100) / 100}" stroke-width="1.2"/>`
      }
      break
    }
    case 'bars': {
      const n = 28
      const bw = 30
      const gap = (W * 0.7 - n * bw) / (n - 1)
      for (let i = 0; i < n; i++) {
        const h = 60 + Math.pow(i / n, 1.6) * 460 + r() * 70
        const x = W * 0.15 + i * (bw + gap)
        body += `<rect x="${f(x)}" y="${f(H * 0.78 - h)}" width="${bw}" height="${f(h)}" rx="4" fill="#fff" fill-opacity="${f((0.06 + (i / n) * 0.5) * 100) / 100}"/>`
      }
      body += `<line x1="${W * 0.12}" y1="${H * 0.78 + 14}" x2="${W * 0.88}" y2="${H * 0.78 + 14}" stroke="#fff" stroke-opacity=".18"/>`
      break
    }
    case 'dots': {
      for (let i = 0; i < 420; i++) {
        const a = i * 2.39996
        const rad = Math.sqrt(i) * 19
        const x = W / 2 + Math.cos(a) * rad
        const y = H / 2 + Math.sin(a) * rad
        const o = 0.7 - rad / 520
        if (o > 0.03) body += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2 + (1 - rad / 400) * 2)}" fill="#fff" fill-opacity="${f(o * 100) / 100}"/>`
      }
      break
    }
    case 'arcs': {
      for (let i = 0; i < 14; i++) {
        const rad = 120 + i * 46
        const start = -Math.PI * (0.1 + r() * 0.3)
        const end = start - Math.PI * (0.4 + r() * 0.5)
        const x1 = W * 0.5 + Math.cos(start) * rad
        const y1 = H * 0.92 + Math.sin(start) * rad
        const x2 = W * 0.5 + Math.cos(end) * rad
        const y2 = H * 0.92 + Math.sin(end) * rad
        body += `<path d="M${f(x1)} ${f(y1)} A${rad} ${rad} 0 0 0 ${f(x2)} ${f(y2)}" fill="none" stroke="#fff" stroke-opacity="${f((0.5 - i * 0.03) * 100) / 100}" stroke-width="2" stroke-linecap="round"/>`
      }
      break
    }
    case 'prism': {
      const cx = W / 2
      const cy = H / 2 + 20
      for (let i = 0; i < 9; i++) {
        const s = 380 - i * 38
        const o = 0.06 + i * 0.05
        body += `<polygon points="${f(cx)},${f(cy - s * 0.82)} ${f(cx + s)},${f(cy + s * 0.5)} ${f(cx - s)},${f(cy + s * 0.5)}" fill="none" stroke="#fff" stroke-opacity="${f(o * 100) / 100}" stroke-width="1.2" transform="rotate(${f(i * 3 - 12)} ${cx} ${cy})"/>`
      }
      break
    }
    case 'stack': {
      for (let i = 0; i < 7; i++) {
        const y = H * 0.24 + i * 62
        const x = W * 0.28 + i * 26
        body += `<rect x="${f(x)}" y="${f(y)}" width="${f(W * 0.4)}" height="210" rx="18" fill="#0f1011" stroke="#fff" stroke-opacity="${f((0.08 + i * 0.05) * 100) / 100}"/>`
        body += `<rect x="${f(x + 28)}" y="${f(y + 26)}" width="${f(120 + r() * 220)}" height="10" rx="5" fill="#fff" fill-opacity="${f((0.1 + i * 0.05) * 100) / 100}"/>`
      }
      break
    }
    default:
      body = ''
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><radialGradient id="${id}bg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#161719"/><stop offset="1" stop-color="#08090a"/></radialGradient><radialGradient id="${id}g"><stop offset="0" stop-color="${hueTint}" stop-opacity=".9"/><stop offset="1" stop-color="${hueTint}" stop-opacity="0"/></radialGradient><radialGradient id="${id}orb" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#e6e7ea" stop-opacity=".9"/><stop offset=".45" stop-color="#3a3c42"/><stop offset="1" stop-color="#0c0d0e"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#${id}bg)"/>${body}</svg>`
}
