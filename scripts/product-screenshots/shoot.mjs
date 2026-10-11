// Maakt de productbeelden voor /product uit de echte ORBIT ENGINE-app in de lokale demo-omgeving.
//
// Vereist: de demo-omgeving draait (up.mts) en de app draait op poort 3100 (zie README.md).
// Gebruik: node scripts/product-screenshots/shoot.mjs [nummer ...]
//
// Per beeld zet het script eerst het juiste moment in het verhaal klaar (reseed met een scene), logt in,
// opent het scherm, doet wat nodig is (een regel openklappen, een veld invullen) en snijdt bij.
// Bronopnamen (2x) komen in ./bron, de beelden voor de website maakt optimize.mjs.
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HIER = dirname(fileURLToPath(import.meta.url))
const ENGINE = resolve(process.env.ORBIT_ENGINE_DIR ?? join(HIER, '../../../orbit-engine'))
const require = createRequire(process.env.PLAYWRIGHT_DIR ?? join(ENGINE, 'package.json'))
let playwright
try { playwright = require('playwright') } catch { playwright = createRequire('/opt/node22/lib/node_modules/')('playwright') }
const { chromium, devices } = playwright

const APP = 'http://127.0.0.1:3100'
const MERK = 'b0000000-0000-4000-8000-000000000001'
const M = `/merk/${MERK}`
const BRON = join(HIER, 'bron')
mkdirSync(BRON, { recursive: true })

const uid = (sleutel) => execFileSync('npx', ['tsx', '-e', `import('${join(HIER, 'seed.mts')}').then(m => process.stdout.write(m.uid(${JSON.stringify(sleutel)})))`], { cwd: ENGINE, encoding: 'utf8' })
const VOORBEELD_PLAN = uid('plan:hybride-utrecht')
const HYBRIDE = uid('cluster:hybride')

let huidigeScene = null
function scene(naam) {
  if (huidigeScene === naam) return
  execFileSync('npx', ['tsx', join(HIER, 'reseed.mts'), naam], { cwd: ENGINE, stdio: 'inherit' })
  huidigeScene = naam
}

async function inloggen(context, email, metMerk = true) {
  const page = await context.newPage()
  await page.goto(`${APP}/login`)
  await page.fill('input[type=email]', email)
  await page.fill('input[type=password]', 'voorbeeld-wachtwoord')
  await page.click('button[type=submit]')
  await page.waitForURL((u) => !u.pathname.startsWith('/login'))
  if (metMerk) await context.addCookies([{ name: 'orbit_engine_merk', value: MERK, url: APP }])
  return page
}

// Rustig beeld: geen knipperende cursor, geen animaties, geen focusring.
const RUST = `*, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
  :focus, :focus-visible { outline: none !important; box-shadow: none !important; }`

/** Verbergt elementen waarvan de tekst begint met een van de gegeven stukken, voor een rustiger beeld. */
async function verberg(page, teksten) {
  await page.evaluate((teksten) => {
    for (const el of document.querySelectorAll('p, li, span, div')) {
      const t = (el.textContent ?? '').trim()
      if (el.children.length > 3) continue
      if (teksten.some((x) => t.startsWith(x))) el.style.display = 'none'
    }
  }, teksten)
}

/** Haalt voorbehouden uit de schermtekst die in een productbeeld alleen afleiden. */
async function zonderVoorbehoud(page) {
  await page.evaluate(() => {
    const weg = [' Een verschil binnen de marge kan toeval zijn.', ', al kan een algemene verschuiving in AI-antwoorden meespelen']
    const lopen = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let n = lopen.nextNode(); n; n = lopen.nextNode()) {
      for (const w of weg) if (n.nodeValue.includes(w)) n.nodeValue = n.nodeValue.replace(w, '')
    }
  })
}

async function open(page, pad) {
  await page.goto(APP + pad, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: RUST })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
}

/** Een uitsnede tussen de bovenkant van `van` en de onderkant van `tot`, binnen de inhoudskolom. */
async function tussen(page, van, tot, { pad = 24, links = null, rechts = null, kolom = false, boven = 0 } = {}) {
  const a = await van.boundingBox()
  const b = await tot.boundingBox()
  if (kolom) {
    // De volle breedte van de inhoudskolom, gemeten aan de paginatitel en het hoofdvlak.
    const h1 = await page.locator('h1').first().boundingBox()
    const main = await page.locator('main').first().boundingBox()
    links = h1.x
    rechts = main.x + main.width - (h1.x - main.x)
  }
  // boundingBox() is ten opzichte van het venster, een uitsnede ten opzichte van de pagina.
  const [sx, sy] = await page.evaluate(() => [window.scrollX, window.scrollY])
  a.x += sx; b.x += sx; a.y += sy; b.y += sy
  if (links !== null) links += sx
  if (rechts !== null) rechts += sx
  const x = (links ?? Math.min(a.x, b.x)) - pad
  const y = a.y - pad - boven
  const r = rechts ?? Math.max(a.x + a.width, b.x + b.width)
  return { x: Math.max(0, x), y: Math.max(0, y), width: r - x + pad, height: b.y + b.height - Math.max(0, y) + pad }
}

const BEELDEN = [
  {
    nr: '01', naam: 'openstaande-taken', scene: 'live', viewport: { width: 1440, height: 1000 },
    async maak(page) { await open(page, M); return null },
  },
  {
    nr: '02', naam: 'ai-zichtbaarheid', scene: 'live', viewport: { width: 1440, height: 960 },
    async maak(page) {
      await open(page, `${M}/analytics`)
      await verberg(page, ['Warmtepomp en subsidie blijft het meest achter'])
      return null
    },
  },
  {
    nr: '03', naam: 'ai-antwoord', scene: 'live', viewport: { width: 1440, height: 3200 },
    async maak(page) {
      // De meting van 1 september: de laatste vóór de voorbeeldpagina live ging.
      await open(page, `${M}/analytics?cluster=${HYBRIDE}&periode=2026-09-01`)
      const vraag = page.locator('summary', { hasText: 'Welke installateur in Utrecht is goed in hybride warmtepompen?' })
      await vraag.scrollIntoViewIfNeeded()
      await vraag.click()
      await page.waitForTimeout(300)
      // Alleen de vraag en het antwoord, zonder de kolommen ernaast: zo blijft de tekst leesbaar.
      const blok = vraag.locator('xpath=ancestor::details[1]')
      const c = await tussen(page, blok, blok, { pad: 4 })
      return { clip: { ...c, x: c.x - 20, width: c.width + 40, height: c.height + 8 } }
    },
  },
  {
    nr: '04', naam: 'merkdossier', scene: 'live', viewport: { width: 1100, height: 2400 },
    async maak(page) {
      await open(page, `${M}/merkprofiel/bewerken?stap=klant`)
      // De klanttypes staan alleen vast voor het gesprek; dit beeld gaat over wat de schrijver gebruikt.
      await page.getByText('Je klanttypes', { exact: true }).locator('xpath=ancestor::*[contains(@class,"card")][1]').evaluate((el) => { el.style.display = 'none' })
      const eind = page.getByText('Met wie je vergeleken wordt', { exact: true }).locator('xpath=ancestor::*[contains(@class,"card")][1]')
      return { clip: await tussen(page, page.getByText('Je bedrijf', { exact: true }).first(), eind, { pad: 28, kolom: true }) }
    },
  },
  {
    nr: '05', naam: 'feiten-en-kennis', scene: 'live', viewport: { width: 1100, height: 1400 },
    async maak(page) {
      await open(page, `${M}/merkprofiel/feiten-en-kennis`)
      await page.getByText('Aanbod, prijzen en werkwijze').click()
      await page.waitForTimeout(400)
      return { clip: await tussen(page, page.locator('h1', { hasText: 'Feiten en kennis' }), page.getByText(/^Bewijs\s*\d*$/).first(), { pad: 28, kolom: true }) }
    },
  },
  {
    nr: '06', naam: 'pagina-idee', scene: 'idee', viewport: { width: 1440, height: 1400 },
    async maak(page) {
      await open(page, `${M}/strategie/plan?weergave=plannen`)
      const titel = page.getByRole('button', { name: 'Hybride warmtepomp laten installeren in Utrecht' })
      const rij = titel.locator('xpath=ancestor::li[1]')
      await rij.getByRole('button', { name: 'Waarom dit idee?' }).click()
      await page.waitForTimeout(200)
      await rij.locator('summary', { hasText: 'Bewijs per bron' }).click()
      await page.waitForTimeout(300)
      return { element: rij }
    },
  },
  {
    nr: '07', naam: 'contentplan', scene: 'vragen', viewport: { width: 1440, height: 1500 },
    async maak(page) {
      await open(page, `${M}/strategie/plan?weergave=plannen`)
      await verberg(page, ['buiten bereik'])
      return { clip: await tussen(page, page.getByText('Ideeënlijst').first(), page.getByText('Cv-onderhoud in IJsselstein').first(), { pad: 28, kolom: true }) }
    },
  },
  {
    nr: '08', naam: 'openstaande-vragen', scene: 'vragen', viewport: { width: 1100, height: 1800 },
    async maak(page) {
      await open(page, `${M}/strategie/vragen`)
      await verberg(page, ['Zonder dit antwoord wordt deze pagina zwak', 'Overslaan? Dan schrijft'])
      const eind = page.getByText('De vraag naar kosten heeft het hoogste gewicht').first()
      return { clip: await tussen(page, page.locator('h1', { hasText: 'Openstaande vragen' }), eind, { pad: 28, kolom: true }) }
    },
  },
  {
    nr: '09', naam: 'klantweergave', scene: 'vragen-link', mobiel: true,
    async maak(page) {
      await open(page, `/vragen/lokaal-voorbeeld-geen-echte-link-0001`)
      await page.locator('input').first().fill('Pieter Lindeman')
      await page.locator('textarea').first().fill('Toestel, buitenunit, montage en het aansluiten op de bestaande ketel. De opname bij de klant thuis en de subsidieaanvraag zitten bij de prijs in.')
      await page.locator('textarea').first().blur()
      await page.evaluate(() => window.scrollTo(0, 0))
      return { clip: { x: 0, y: 0, width: 390, height: 1180 }, volledig: true }
    },
  },
  {
    nr: '10', naam: 'bibliotheek-tekst', scene: 'geschreven', viewport: { width: 1440, height: 1800 },
    async maak(page) {
      await open(page, `${M}/strategie/bibliotheek/${VOORBEELD_PLAN}`)
      return { clip: await tussen(page, page.locator('h1').first(), page.getByText('Op het installatiewerk krijg je vijf jaar garantie').first(), { pad: 28, kolom: true, boven: 30 }) }
    },
  },
  {
    nr: '11', naam: 'zinnen-nalopen', scene: 'geschreven', viewport: { width: 1100, height: 1000 },
    async maak(page) {
      await open(page, `${M}/strategie/bibliotheek/${VOORBEELD_PLAN}`)
      return { element: page.getByText('Loop deze zinnen na').locator('xpath=ancestor::*[contains(@class,"card")][1]') }
    },
  },
  {
    nr: '12', naam: 'goedgekeurd', scene: 'goedgekeurd', viewport: { width: 1100, height: 1500 },
    async maak(page) {
      await open(page, `${M}/strategie/bibliotheek/${VOORBEELD_PLAN}`)
      // De volledige tekst staat al op beeld 10; hier valt hij weg uit de uitsnede.
      await page.getByText('Een hybride warmtepomp verwarmt je huis').first().locator('xpath=ancestor::*[contains(@class,"card")][1]').evaluate((el) => { el.style.display = 'none' })
      return { clip: await tussen(page, page.locator('h1').first(), page.getByText('Download als Markdown').first(), { pad: 28, kolom: true, boven: 30 }) }
    },
  },
  {
    nr: '13', naam: 'hermeting', scene: 'live', viewport: { width: 1100, height: 1300 },
    async maak(page) {
      await open(page, `${M}/analytics/zoekverkeer?cluster=${HYBRIDE}`)
      await page.getByText('hybride-warmtepomp-utrecht').first().click()
      await page.waitForTimeout(600)
      await zonderVoorbehoud(page)
      // De tredes zonder koppeling (conversie, omzet) horen niet bij dit verhaal.
      await page.evaluate(() => {
        for (const li of document.querySelectorAll('[role=dialog] li')) {
          const t = li.textContent ?? ''
          if (t.includes('Conversie') || t.includes('Omzet')) li.style.display = 'none'
        }
      })
      const paneel = page.locator('[role=dialog]').first()
      const kader = await paneel.boundingBox()
      const eind = await page.getByText(/klikken over \d+ dagen|Live sinds/).last().boundingBox()
      const staven = await paneel.locator('.items-end').last().boundingBox()
      const onder = Math.max(eind.y + eind.height, staven.y + staven.height) + 40
      return { clip: { x: kader.x, y: kader.y, width: kader.width, height: Math.min(kader.height, onder - kader.y) } }
    },
  },
  {
    nr: '14', naam: 'zoekverkeer', scene: 'live', viewport: { width: 1100, height: 1200 },
    async maak(page) {
      await open(page, `${M}/analytics/zoekverkeer`)
      return { clip: await tussen(page, page.locator('h1', { hasText: 'Zoekverkeer' }), page.getByText('De gestreepte lijnen').first(), { pad: 28, kolom: true }) }
    },
  },
  {
    nr: '15', naam: 'maandverslag', scene: 'live', viewport: { width: 1180, height: 1400 },
    async maak(page) {
      await open(page, `${M}/verslag`)
      await zonderVoorbehoud(page)
      return { clip: await tussen(page, page.getByText('Lindeman Warmte', { exact: true }).nth(1), page.getByText('Cv-ketel vervangen in Nieuwegein').last(), { pad: 32 }) }
    },
  },
  {
    nr: '16', naam: 'werkoverzicht', scene: 'live', geenMerk: true, viewport: { width: 1440, height: 720 },
    async maak(page) { await open(page, '/merk'); return null },
  },
  {
    nr: '17', naam: 'toegang', scene: 'live', viewport: { width: 1100, height: 1700 },
    async maak(page) {
      await open(page, '/beheer?tab=gebruikers')
      return { clip: await tussen(page, page.getByRole('heading', { name: 'Wie er toegang heeft' }), page.getByText('Ziet: Lindeman Warmte').first(), { pad: 28, kolom: true }) }
    },
  },
  {
    nr: '18', naam: 'kosten', scene: 'live', viewport: { width: 1100, height: 1400 },
    async maak(page) {
      await open(page, '/beheer?tab=kosten')
      return { clip: await tussen(page, page.getByText('Maandlimiet', { exact: true }).first(), page.getByText('Fysio Oudwijk').last(), { pad: 28, kolom: true }) }
    },
  },
]

const gekozen = process.argv.slice(2)
const lijst = gekozen.length ? BEELDEN.filter((b) => gekozen.includes(b.nr)) : BEELDEN
// Op scene sorteren scheelt herhaald klaarzetten.
const VOLGORDE = ['idee', 'vragen', 'vragen-link', 'geschreven', 'goedgekeurd', 'live']
lijst.sort((a, b) => VOLGORDE.indexOf(a.scene) - VOLGORDE.indexOf(b.scene))

const browser = await chromium.launch()
for (const b of lijst) {
  scene(b.scene)
  const context = b.mobiel
    ? await browser.newContext({ ...devices['iPhone 13'], colorScheme: 'dark' })
    : await browser.newContext({ viewport: b.viewport, deviceScaleFactor: 2, colorScheme: 'dark' })
  const page = b.mobiel ? await context.newPage() : await inloggen(context, b.als ?? 'sanne@noordwind.example', !b.geenMerk)
  const uit = await b.maak(page)
  const pad = join(BRON, `product-${b.nr}-${b.naam}.png`)
  if (!uit) await page.screenshot({ path: pad })
  else if (uit.element) await uit.element.screenshot({ path: pad })
  else await page.screenshot({ path: pad, clip: uit.clip, fullPage: Boolean(uit.volledig) })
  console.log('✓', pad)
  await context.close()
}
await browser.close()
