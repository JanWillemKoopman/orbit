// Rendert MOTION (motion.html) naar een MP4: 1080 x 1920, 24 fps, H.264 + AAC.
//
//   node tools/motion-ascii/capture.mjs [--lus 1] [--uit pad/naar/motion.mp4]
//
// Elk frame is een pure functie van het framenummer. Het script zet de film stil, tekent frame 0 tot en met 191,
// leest het canvas uit en rendert het geluid offline. Met --lus 15 komt er een video van 2 minuten uit:
// 15 lussen van 8 s zijn precies 248 tellen op 124 bpm, dus dan sluit ook het geluid naadloos op zichzelf aan.
// Verwacht Playwright in /opt/node-tools (pas het pad hieronder aan) en ffmpeg op het pad.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const hier = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const arg = (naam, standaard) => { const i = args.indexOf(naam); return i >= 0 ? args[i + 1] : standaard }
const lussen = Math.max(1, Math.round(Number(arg('--lus', '1'))))
const uit = resolve(arg('--uit', join(hier, lussen > 1 ? `motion-${lussen}x.mp4` : 'motion.mp4')))
const FRAMES = 192
const FPS = 24

const tmp = mkdtempSync(join(tmpdir(), 'motion-'))
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 600, height: 1000 } })
await page.goto(pathToFileURL(join(hier, 'motion.html')).href)
await page.waitForFunction(() => window.MotionPlayer)
await page.evaluate(() => window.MotionPlayer.pause())
for (let f = 0; f < FRAMES; f++) {
  const url = await page.evaluate((n) => window.MotionPlayer.frameData(n), f)
  writeFileSync(join(tmp, `f${String(f).padStart(3, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'))
  if (f % 48 === 0) console.log('frame', f, '/', FRAMES)
}
const wav = await page.evaluate((s) => window.MotionPlayer.renderAudio(s), (lussen * FRAMES) / FPS)
writeFileSync(join(tmp, 'geluid.wav'), Buffer.from(wav, 'base64'))
await browser.close()

const r = spawnSync('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-stream_loop', String(lussen - 1), '-framerate', String(FPS), '-i', join(tmp, 'f%03d.png'),
  '-i', join(tmp, 'geluid.wav'),
  '-map', '0:v', '-map', '1:a',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
  '-r', String(FPS), '-frames:v', String(FRAMES * lussen),
  '-c:a', 'aac', '-b:a', '192k',
  '-movflags', '+faststart', uit,
], { stdio: 'inherit' })
rmSync(tmp, { recursive: true, force: true })
if (r.status !== 0) process.exit(r.status || 1)
console.log(uit, (statSync(uit).size / 1e6).toFixed(1) + ' MB')
