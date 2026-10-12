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

## Productpagina

De productpagina (`/product`, in het menu "Fases en werkwijze") laat ORBIT ENGINE zien met nagebouwde schermen in de vormgeving van de app, gevuld met fictieve voorbeeldgegevens (Lindeman Warmte, Bureau Noordwind). Teksten staan in `content/product.ts`, de beelden zijn HTML-componenten in `components/product/Visuals.tsx` en de opmaak staat in `app/product/product.css`.

## Bureaupagina

De bureaupagina (`/agency`, in het menu "Account en beheer") heeft dezelfde opbouw en vormgeving als `/product`, met de nadruk op het account van een bureau: het werkoverzicht, klanten toevoegen, collega's en kijkers, kosten, eigen sleutels en het archiveren of verwijderen van gegevens. Teksten staan in `content/agency.ts`, de beelden in `components/agency/Visuals.tsx` en de aanvullende opmaak in `app/agency/agency.css`. De gedeelde bouwblokken (kop, paneel, cel) staan in `components/product/Blokken.tsx`.

## Kennis en feiten

De pagina `/kennis` ("Kennis en feiten") legt voor een nieuwe lezer uit hoe ORBIT ENGINE voorkomt dat AI feiten verzint: het brein met wat er over een bedrijf bekend is (van binnen en van buiten), de schrijver die alleen feiten met een bron krijgt, en de gele zin als vangnet. Teksten staan in `content/kennis.ts`, de beelden in `components/kennis/Visuals.tsx` en de opmaak in `app/kennis/kennis.css` (bovenop die van `/product` en `/agency`).

## Hoofdmenu

Het menu staat in `lib/site.ts`. "Product" is een uitklapmenu zonder eigen pagina, nagebouwd naar het Product-menu van linear.app (`components/NavMenu.tsx`, opmaak in `app/globals.css`): bij aanwijzen of klikken opent een paneel met "Fases en werkwijze", "Kennis en feiten" en "Account en beheer", en onderaan het nieuwste changelog-item. Een pagina toevoegen aan het menu doe je in `productMenu`. Op mobiel staan dezelfde pagina's onder het kopje Product.

## Overige content

- `content/changelog.ts`: changelog-items (de nieuwste vier staan op de homepage en het blogoverzicht)
- `content/press.ts`: persvermeldingen
- `lib/site.ts`: sitenaam, blogtitel, navigatie, footer en contactadres

Alle artikelen, changelog-items en persvermeldingen zijn op dit moment **dummydata**.
