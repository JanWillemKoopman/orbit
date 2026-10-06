# Orbit – blog

Een statische blog gebouwd met Next.js (App Router). Alle pagina's worden bij de build vooraf gegenereerd.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # productiebuild
npm run lint    # typecheck
```

## Een artikel publiceren

Maak een nieuw bestand in `content/posts/`, bijvoorbeeld `content/posts/mijn-artikel.md`. De bestandsnaam wordt de URL (`/blog/mijn-artikel`).

```markdown
---
title: "Titel van het artikel"
description: "Eén of twee zinnen die op de kaart en in zoekmachines verschijnen."
date: 2026-10-10
author: Voornaam Achternaam
category: van-het-team           # productlanceringen | van-het-team | community
label: Klantverhaal              # optioneel: vervangt de auteursnaam op kaarten
cover: "/images/mijn-cover.jpg"  # of gegenereerde art, bijv. "art:rings:4"
featured: true                   # true = kaart op de homepage, false = alleen archief
---

Gewone Markdown. Gebruik `##` en `###` voor tussenkoppen.

![Alt-tekst](/images/foto.jpg "Bijschrift onder de afbeelding")
![Alt-tekst](/images/breed.jpg "wide|Bijschrift bij een brede afbeelding")
```

- Afbeeldingen zet je in `public/images/`.
- Gegenereerde cover-art: `art:<variant>:<getal>` met variant `rings`, `lines`, `grid`, `orb`, `waves`, `bars`, `dots`, `arcs`, `prism` of `stack`.
- Bestanden die met `_` beginnen worden overgeslagen (handig voor concepten).
- Ondersteund: vet/cursief, links, lijsten, citaten, code, tabellen en figuren met bijschrift.

Het blogoverzicht (`/blog`) toont de nieuwste 18 `featured`-posts in drie blokken van zes. Alle overige posts komen in het archief.

## Homepage

De homepage (`/`) presenteert ORBIT ENGINE en volgt de opbouw van linear.app: een hero met een nagebouwd dashboard (`components/home/AppFrame.tsx`, HTML in plaats van een afbeelding), een grote tussenzin, drie blokken met tekst, de laatste vier changelog-items, de laatste drie blogposts en een afsluiter. Alle teksten staan in `content/home.ts`; de drie blokken daar zijn placeholders.

## Overige content

- `content/changelog.ts`: changelog-items (de nieuwste vier staan op de homepage en het blogoverzicht)
- `content/press.ts`: persvermeldingen
- `lib/site.ts`: sitenaam, blogtitel, navigatie, footer en contactadres

Alle artikelen, changelog-items en persvermeldingen zijn op dit moment **dummydata**.
