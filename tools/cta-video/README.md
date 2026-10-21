# CTA-video

De achtergrond van de afsluiter onderaan de pagina's (`components/CtaAchtergrond.tsx`) bestaat uit twee lagen:

- **het gas**, een video van een naadloze loop van 24 seconden, die de grafische chip afspeelt;
- **de sterren**, die de browser scherp op een canvas erboven tekent (`components/cta/sterren.ts`).

Het gas werd eerder live in de browser berekend. Dat kostte veel processortijd, vooral op zwakkere laptops en
telefoons. Sterren staan bewust niet in de video: fonkelende puntjes van een pixel vervagen daarin of maken het
bestand groot.

## Opnieuw renderen

```
node tools/cta-video/render.mjs desktop
node tools/cta-video/render.mjs mobiel
```

De bestanden komen in `public/video/cta-nevel-<formaat>.{av1.mp4,vp9.webm,h264.mp4}` plus een poster
(`-poster.webp`, het eerste frame). Met `still` erachter komt er alleen één png uit om het beeld te beoordelen;
met `--seed <getal>` kies je een andere variant van de nevel.

- **Desktop** is 2400 x 720 CSS-px, **mobiel** 800 x 640 (de browser kiest mobiel tot 768 px breed). Het beeld is
  breder dan een venster, zodat `object-fit: cover` vrijwel altijd de zijkanten afsnijdt en de zachte overgang boven
  en onder blijft staan.
- De video heeft de halve resolutie (1200 x 360 en 400 x 320): het gas is zacht, dus scherper heeft geen zin.
- De kleuren staan als vaste waarden in het script (de tokens uit `app/globals.css`). Verandert een token, render
  dan opnieuw.
