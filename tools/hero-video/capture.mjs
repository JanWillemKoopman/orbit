// Neemt de hero-video's op uit de scène /herovideo/<pagina>?f=<desktop|mobiel>.
//
//   (scène eerst naar app/herovideo kopiëren, zie README)
//   node tools/hero-video/capture.mjs <pagina> <desktop|mobiel> [still] [--port 3056] [--uit map]
//
// Met "still" komt er één frame (p = 0,3, of de waarden van --p) als png uit, om de compositie te beoordelen. Zonder "still" worden alle
// frames opgenomen en met ffmpeg omgezet naar AV1, VP9, H.264 en een poster. De scène wordt per frame vastgezet
// met de variabele --p, zodat de video naadloos herhaalt. Zie tools/hero-video/README.md.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs'
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const [pagina, formaat, ...rest] = process.argv.slice(2)
const still = rest.includes('still')
const arg = (naam, standaard) => { const i = rest.indexOf(naam); return i >= 0 ? rest[i + 1] : standaard }
const port = arg('--port', '3056')
const uit = arg('--uit', 'public/video')
const MATEN = { desktop: [1920, 1000], mobiel: [720, 1000] }
const [W, H] = MATEN[formaat]
const FPS = 30
const SECONDEN = 12
const N = FPS * SECONDEN

mkdirSync(uit, { recursive: true })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--enable-gpu-rasterization', '--ignore-gpu-blocklist'] })
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
await page.goto(`http://localhost:${port}/herovideo/${pagina}?f=${formaat}`, { waitUntil: 'load', timeout: 120000 })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(800)
const zet = (p) => page.evaluate((v) => { document.querySelector('.hv-root').style.setProperty('--p', String(v)); window.__render?.(v) }, p)

if (still) {
  const ps = arg('--p', '0.3').split(',')
  for (const v of ps) {
    await zet(Number(v))
    await page.screenshot({ path: `${uit}/still-${pagina}-${formaat}-${v}.png` })
  }
  await browser.close()
  process.exit(0)
}

const naam = `hero-${pagina}-${formaat}`
const frames = []
for (let i = 0; i < N; i++) {
  await zet(i / N)
  frames.push(await page.screenshot({ type: 'jpeg', quality: 92 }))
  if (i % 60 === 0) console.log(naam, i, '/', N)
}
await browser.close()
// De poster is het eerste frame, als WebP (een vierde van een jpg, zonder zichtbare banding)
await new Promise((res, rej) => {
  const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-i', '-', '-frames:v', '1', '-c:v', 'libwebp', '-quality', '74', '-compression_level', '6', `${uit}/${naam}-poster.webp`], { stdio: ['pipe', 'inherit', 'inherit'] })
  p.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg poster ' + c))))
  p.stdin.end(frames[0])
})

const codecs = {
  'h264.mp4': ['-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'],
  'vp9.webm': ['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', '-pix_fmt', 'yuv420p', '-an'],
  'av1.mp4': ['-c:v', 'libsvtav1', '-preset', '5', '-crf', '40', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an'],
}
for (const [ext, args] of Object.entries(codecs)) {
  await new Promise((res, rej) => {
    const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', ...args, `${uit}/${naam}.${ext}`], { stdio: ['pipe', 'inherit', 'inherit'] })
    p.on('close', (c) => (c === 0 ? res() : rej(new Error(`ffmpeg ${ext} ${c}`))))
    for (const f of frames) p.stdin.write(f)
    p.stdin.end()
  })
  console.log(naam, ext, 'klaar')
}
