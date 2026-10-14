# Besluiten voor de vier productpagina's

Vastgelegd tijdens stap 0 van het verbeterplan (zie `ADVIES_PRODUCTPAGINAS.md`). Deze lijst is leidend voor alle volgende stappen.

## Reikwijdte

- We werken uitsluitend aan de opmaak en de teksten van de vier productpagina's: AI, Werkwijze, Kwaliteit en Beheer.
- De homepage, `/prijzen`, `/over` en alle andere pagina's volgen later. Het doortesten van de app ook.
- Doelgroep: (online) marketingbureaus. We schrijven alleen voor bureaus.

## Adressen

| Pagina | Nieuw adres | Oud adres (stuurt door) |
|---|---|---|
| AI | `/ai` | |
| Werkwijze | `/werkwijze` | `/product` |
| Kwaliteit | `/kwaliteit` | `/kennis` |
| Beheer | `/beheer` | `/agency` |

## Verdienmodel en wat we erover zeggen

- Een basistarief voor het bureau, plus een bedrag per klant per maand. De app is niet open source.
- Het bureau gebruikt de eigen API-sleutels en betaalt de AI-kosten zelf.
- We blijven zeggen: **onbeperkt klanten**. Het aantal klanten is onbeperkt, tegen betaling per klant.
- Bedragen komen op `/prijzen`, die later wordt ontwikkeld. Op de vier pagina's staan geen bedragen en geen link naar `/prijzen`, zolang die pagina leeg is.

## Meetkanalen

- We noemen ChatGPT, Gemini en Google AI Overview.
- Bij Beheer staat dat de extra kanalen met eigen sleutels werken.

## Formuleringen

| Onderwerp | We schrijven |
|---|---|
| Frequentie | Letterlijk "elke maand meten". Niets over aan of uit |
| Limiet | "Maandlimiet". Zonder "hard" en zonder toelichting |
| Uitnodiging | "De uitnodiging gaat per mail" |
| Proefronde | Er is geen woord over. De teksten klinken als een product dat staat |
| Voorbeeldbeelden | Het kleine label "Voorbeeldgegevens" blijft staan |

## Wat we niet schrijven

Dit zijn controleerbare feiten of beloftes die de app niet waarmaakt:

- Verzonnen cijfers, zoals aantallen metingen, kosten per pagina of tijdwinst in uren.
- Verzonnen klantquotes, cases of aantallen bureaus.
- Een bron bij elke zin. Wel: een bron bij elke harde bewering, en een bron per feit.
- Meting van conversie en omzet. De bewijsladder noemen we niet met zeven treden.
- Een export van resultaten. Wel: het merkdossier en het contentplan als CSV.
- Tweestapsverificatie, inloggen via een externe dienst, "veilig" of "AVG-proof" als label.
- Een CMS-koppeling. Publiceren is kopiëren, plaatsen en melden.

Verder gelden de woordenlijst en de schrijfstijl van de site: "je", AI-vragen, geen gedachtestreepjes, geen "en/of".

## Onderaan elke pagina

Een CTA-sectie met twee knoppen:

1. **Gratis demo aanvragen** (de belangrijkste knop, opent het demoformulier).
2. **Contact opnemen** (naar `/contact`).

Boven die knoppen staat per pagina een kop en een korte tekst die bij de pagina past.

Het menu in de header blijft ongewijzigd: de knop heet daar "Gratis demo". De knop in de CTA-secties op de vier pagina's heet "Gratis demo aanvragen". De huidige gedeelde knop heet "Plan een gratis demo" en blijft op alle andere pagina's zoals hij is.

## Nog open

- Of we, voor de nieuwe adressen, het menu (`lib/site.ts`), de doorverwijzingen (`next.config.mjs`) en de sitemap (`app/sitemap.ts`) mogen aanpassen. Dat zijn bestanden buiten de vier pagina's. Het menu verandert alleen in de adressen, niet in de knop "Gratis demo".
- De knop bovenin elke pagina heet nu "Demo aanvragen". Voorstel: ook "Gratis demo aanvragen".
