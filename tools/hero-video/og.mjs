// Neemt de deel-afbeeldingen (1200 x 630) van de vier productpagina's op uit /herovideo/og/<pagina>.
//
//   node tools/hero-video/og.mjs [--port 3055] [--uit public/images/product]
//
// De poster van de hero-video (public/video/hero-<pagina>-desktop-poster.jpg) moet er al staan.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs'
import { mkdirSync } from 'node:fs'

const rest = process.argv.slice(2)
const arg = (naam, standaard) => { const i = rest.indexOf(naam); return i >= 0 ? rest[i + 1] : standaard }
const port = arg('--port', '3055')
const uit = arg('--uit', 'public/images/product')
mkdirSync(uit, { recursive: true })

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
for (const pagina of ['ai', 'werkwijze', 'kwaliteit', 'beheer']) {
  await page.goto(`http://localhost:${port}/herovideo/og/${pagina}`, { waitUntil: 'networkidle', timeout: 120000 })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${uit}/og-${pagina}.png` })
  console.log('og', pagina)
}
await browser.close()
