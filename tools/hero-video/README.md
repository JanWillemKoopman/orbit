# Hero-video's en deel-afbeeldingen

De achtergrondvideo's van /ai, /werkwijze, /kwaliteit en /beheer (elk een liggende en een staande opname) en de
deel-afbeeldingen (1200 x 630) zijn opgenomen uit een scène van de eigen schermen van ORBIT ENGINE. Zo zijn ze
opnieuw te maken als een scherm of een tekst verandert.

## Hoe het werkt

- `scene/` bevat twee tijdelijke pagina's: `[pagina]/page.tsx` (de videoscène) en `og/[pagina]/page.tsx` (de
  deel-afbeelding), met `herovideo.css`. Ze horen niet bij de website en staan daarom buiten `app/`.
- De scène hangt aan één variabele, `--p` (0 tot 1, één lus van 12 seconden). Het script zet `--p` per frame,
  maakt een screenshot en laat ffmpeg er AV1, VP9, H.264 en een poster van maken. Zo herhaalt de video naadloos.
- De beelden zijn gedimd en ontkleurd, met zwarte verlopen onder de header, aan de randen en vooral onderin,
  waar de titel komt te staan (zoals de video op linear.app/ai). Knoppen en koppen zijn bewust zacht gehouden.

## Opnieuw opnemen

1. Kopieer `tools/hero-video/scene` naar `app/herovideo` (de relatieve imports kloppen dan).
2. `npx next build` en `npx next start -p 3055`.
3. Per pagina en formaat: `node tools/hero-video/capture.mjs <ai|werkwijze|kwaliteit|beheer> <desktop|mobiel> --port 3055`
   (met `still` komt er één beoordeelbaar frame uit). De bestanden komen in `public/video/hero-<pagina>-<formaat>.*`.
4. Deel-afbeeldingen: `node tools/hero-video/og.mjs --port 3055` (leest de posters uit `public/video`, als `.webp`).
5. Verwijder `app/herovideo` weer. Het script verwacht Playwright in `/opt/node-tools` (pas het pad bovenin aan).

Wat in welke scène staat, kies je in `scene/[pagina]/page.tsx` (`SCENES`), per pagina en per formaat apart.
