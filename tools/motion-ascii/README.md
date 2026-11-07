# MOTION, ASCII-motion in 9:16

Een animatie van 8 seconden (1080 x 1920, 24 fps, 192 frames) die naadloos herhaalt. Alles wordt in code getekend als
ASCII op een raster van 80 x 48 tekens, in #33FF66 op zwart. Er wordt niets ingeladen. `motion.html` is één zelfstandig
bestand: openen in een browser is genoeg. Het is ook gepubliceerd als artifact op claude.ai.

## Scènes

| Frames | Status | Wat er gebeurt |
|---|---|---|
| 0–23 | `booting` | Het raster vult zich regel voor regel met willekeurige tekens op 20% en dooft in de laatste 4 frames uit. |
| 24–83 | `rendering` | Een torus (R 1,0, r 0,4) met Lambert-licht van linksboven draait 1,2 en 0,8 keer per seconde om twee assen. |
| 84–119 | `morphing` | Elk punt van de torus reist naar zijn plek op een hoofd en profil (easeInOutCubic). Vanaf 108 komt er glitch. |
| 120–191 | `rendered` | De tekens vallen uiteen en vormen MOTION (easeOutQuart), ademen 3% (150–170) en lossen op (170–191). |

De vaste lagen (kader, titelbalk, frameteller, commandoregel, statusregel met knipperende cursor) en de CRT-laag
(scanlijnen, vignettering, glow van 4px, ruis van 3%) staan in elk frame.

## Bediening

Spatie speelt af en pauzeert, de pijltjes gaan per frame, M zet het geluid aan of uit, F opent volledig scherm. Een
klik op de film pauzeert ook. Het geluid start pas na een klik, omdat browsers geluid zonder klik blokkeren.

## Video maken

```
node tools/motion-ascii/capture.mjs                 # motion.mp4, 8 s
node tools/motion-ascii/capture.mjs --lus 15        # motion-15x.mp4, 2 min
```

Het script tekent elk frame los uit `motion.html` en rendert het geluid offline. MP4's staan in `.gitignore`.

## Keuzes

- 124 bpm past niet precies in 8 seconden (16,53 tellen). In de browser lopen de tellen gewoon door over de lus, dus
  de maat hapert nergens. In een video van 8 seconden die herhaalt, valt de herstart van de kick wel op. Na 15 lussen
  (2 minuten, 248 tellen) lopen beeld en maat weer gelijk, daarom bestaat `--lus 15`.
- "Twee derde hoogte" is gemeten vanaf de onderkant van het beeld: MOTION staat in regels 2–13, met het midden op
  y = 640 van 1920. Wie het in het onderste derde wil, zet `WORD_ROW` op `2 * H / 3` in plaats van `H / 3`.
- Frame 191 en frame 0 zijn allebei een leeg raster. Alleen de frameteller en het statuswoord verschillen, omdat die
  per frame en per scène horen te wisselen.
- Het hoofd is een signed distance field (schedel, gezicht, neus, lippen, kin, oog, oor en hals), gezien en profil.
  Elk punt van de torus gaat langs zijn normaal naar het hoofd, zodat het gat dichtgroeit tot een bol en de bol een
  hoofd wordt. Extra punten vanuit het eindbeeld houden het hoofd zonder gaten.
