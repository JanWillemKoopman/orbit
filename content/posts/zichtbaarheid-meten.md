---
title: Eén antwoord is geen meting
description: Een AI-assistent geeft op dezelfde vraag zelden twee keer hetzelfde antwoord. Zo meten wij toch betrouwbaar of je merk wordt genoemd.
date: 2026-10-02
author: Sanne de Vries
category: van-het-team
cover: art:dots:7
featured: true
---

Stel een AI-assistent tien keer dezelfde vraag en je krijgt tien verschillende antwoorden. Meestal lijken ze op elkaar, maar ze zijn zelden identiek. Soms staat jouw merk bovenaan, soms helemaal niet. Wie op basis van één screenshot concludeert dat "we niet zichtbaar zijn", meet eigenlijk ruis.

Dat was het probleem waarmee we Orbit begonnen. Klanten stuurden ons schermafbeeldingen met de vraag waarom hun concurrent wel werd genoemd en zij niet. Het eerlijke antwoord was vaak dat het toeval was. Het nuttige antwoord kwam pas toen we echt gingen meten.

In dit artikel leggen we uit hoe onze meetmethode werkt, welke keuzes we hebben gemaakt en waar we nog twijfelen.

![Een spiraal van punten die naar buiten toe vervaagt.](art:dots:14 "wide|Elke stip is één antwoord op dezelfde vraag. Pas samen vormen ze een patroon.")

## Van vraag naar steekproef

De kern van onze aanpak is simpel: we behandelen elk antwoord als een trekking uit een verdeling. Eén trekking zegt weinig. Honderd trekkingen geven een betrouwbaar beeld.

Voor elke vraag die een klant volgt, doen we drie dingen:

- **Varianten maken.** Mensen stellen dezelfde vraag op veel manieren. We schrijven per vraag vijf tot acht formuleringen, van formeel tot spreektaal.
- **Herhalen.** Elke formulering stellen we meerdere keren, verspreid over de dag en over verschillende assistenten.
- **Normaliseren.** We zetten elk antwoord om naar een lijst van genoemde merken en bronnen, met hun positie in het antwoord.

Uit die genormaliseerde antwoorden berekenen we de *vermeldingskans*: in welk deel van de antwoorden komt jouw merk voor?

### Hoeveel herhalingen zijn genoeg?

Meer metingen zijn nauwkeuriger, maar ook duurder. We zochten het punt waarop een extra meting nauwelijks nog iets toevoegt. Voor de meeste vragen ligt dat rond de veertig antwoorden per week. Daarmee is de foutmarge op de vermeldingskans ongeveer zeven procentpunt.

```ts
// Betrouwbaarheidsinterval (Wilson) voor een vermeldingskans
export function wilson(hits: number, n: number, z = 1.96) {
  const p = hits / n
  const denom = 1 + (z * z) / n
  const centre = p + (z * z) / (2 * n)
  const margin = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))
  return [(centre - margin) / denom, (centre + margin) / denom]
}
```

We tonen dat interval ook in de interface. Een stijging van 31 naar 34 procent ziet er op een grafiek mooi uit, maar als de intervallen elkaar grotendeels overlappen, is het geen nieuws.

> Het nuttigste wat we in de interface hebben gezet, is een grijze band rond elke lijn. Die heeft meer discussies voorkomen dan welk dashboard ook.

## Positie telt mee

Genoemd worden is één ding, maar wáár je genoemd wordt ook. Een merk dat als eerste wordt aanbevolen, krijgt veel meer aandacht dan een merk dat in een bijzin achteraan staat. Daarom wegen we elke vermelding met een factor die afneemt naarmate het merk later in het antwoord voorkomt.

| Positie in antwoord | Gewicht |
| :-- | --: |
| Eerste aanbeveling | 1,00 |
| Tweede of derde | 0,70 |
| Later in een opsomming | 0,40 |
| Alleen als bron geciteerd | 0,25 |

De gewichten zijn bewust grof. We hebben ze afgeleid uit klikgedrag in een kleine gebruikersstudie, en we zijn er eerlijk over dat ze een benadering zijn.

![Concentrische ringen rond een helder middelpunt.](art:rings:15 "De gewogen zichtbaarheid: hoe dichter bij het midden, hoe prominenter de vermelding.")

## Wat we bewust niet doen

Er zijn ook dingen die we niet meten, hoewel klanten erom vragen.

1. **Geen sentimentscore.** Een model dat bepaalt of een vermelding "positief" is, voegt een tweede bron van ruis toe. We tonen liever de letterlijke zin, zodat je zelf kunt oordelen.
2. **Geen totaalcijfer over alle vragen.** Eén getal voor je hele merk ziet er overzichtelijk uit, maar het verbergt juist de vragen waar het misgaat.
3. **Geen voorspellingen.** We laten zien wat er gebeurt, niet wat er volgens een model gaat gebeuren.

### Waar we nog twijfelen

De grootste open vraag is personalisatie. Assistenten passen hun antwoorden steeds vaker aan op de gebruiker. Onze metingen worden gedaan zonder gebruikersgeschiedenis, en dat is niet hoe de meeste mensen een assistent gebruiken. We experimenteren met een handvol vaste profielen, maar zijn nog niet tevreden over de resultaten.

## Wat je er zelf mee kunt

Ook zonder Orbit kun je deze principes toepassen. Formuleer een vraag op meerdere manieren, stel hem vaker dan één keer en kijk naar het patroon in plaats van naar één antwoord. Houd daarbij bij in welke positie je merk voorkomt.

Wil je weten hoe dit er voor jouw merk uitziet? [Neem contact met ons op](/contact). We lopen het graag met je door.
