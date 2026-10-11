// Zet de bronopnamen (./bron, PNG op 2x) om naar WebP voor de website, plus een paar gerichte
// uitsneden voor smalle schermen. Next.js maakt daar bij het tonen nog kleinere varianten van.
// Gebruik: node scripts/product-screenshots/optimize.mjs
import { mkdirSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HIER = dirname(fileURLToPath(import.meta.url))
const sharp = createRequire(join(HIER, '../../package.json'))('sharp')
const BRON = join(HIER, 'bron')
const DOEL = join(HIER, '../../public/images/product')
mkdirSync(DOEL, { recursive: true })

// Uitsneden voor telefoons, in pixels van de bronopname: zonder zijbalk, rond waar het om gaat.
const MOBIEL = {
  'product-01-openstaande-taken': { left: 548, top: 160, width: 1720, height: 1500 },
  'product-02-ai-zichtbaarheid': { left: 548, top: 160, width: 1720, height: 1240 },
  'product-16-werkoverzicht': { left: 548, top: 150, width: 1540, height: 1160 },
}

for (const bestand of readdirSync(BRON).filter((f) => f.endsWith('.png')).sort()) {
  const naam = bestand.replace(/\.png$/, '')
  const bron = join(BRON, bestand)
  await sharp(bron).webp({ quality: 86, effort: 6 }).toFile(join(DOEL, `${naam}.webp`))
  if (MOBIEL[naam]) {
    await sharp(bron).extract(MOBIEL[naam]).webp({ quality: 86, effort: 6 }).toFile(join(DOEL, `${naam}-mobiel.webp`))
  }
  console.log('✓', naam)
}
