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

1. **Plan een gratis demo** (de belangrijkste knop, opent het demoformulier). Dit is de bestaande gedeelde knop en die verandert niet.
2. **Contact opnemen** (naar `/contact`).

Boven die knoppen staat per pagina een kop en een korte tekst die bij de pagina past.

## Demoknoppen overal

- Overal op de vier pagina's heet de demoknop "Plan een gratis demo", ook de knop bovenin elke pagina (die heet nu "Demo aanvragen").
- Alleen in het menu in de header heet de knop "Gratis demo". Die verandert niet.

## Bestanden buiten de vier pagina's

Toegestaan, uitsluitend voor de nieuwe adressen: het menu (`lib/site.ts`, alleen de adressen), de doorverwijzingen (`next.config.mjs`) en de sitemap (`app/sitemap.ts`).

## Status

Stap 0 is afgerond.

## Stap 2: opbouw naar linear.app/ai (besluiten)

Zie `PLAN_STAP2_LINEAR_OPBOUW.md`.

- De hero is zoals bij Linear: eyebrow, titel en achtergrond, zonder knoppen en zonder beschrijving.
- Een hero-video komt later. Er wordt ruimte voor gehouden en in de code staat een notitie op de plek waar de video komt. Voor nu geen achtergrondbeeld of video.
- Elke pagina heeft vijf secties. Beelden verhuizen of vervallen zoals in hoofdstuk 3 van het plan.
- De intro's verwijzen waar relevant naar andere productpagina's, zoals Linear dat doet.
- Volgorde van werk: Werkwijze, Kwaliteit, Beheer, AI. Na elke pagina akkoord vragen voor de volgende.
- Het eerste grote beeld op Werkwijze is een groot scherm met de openstaande taken en de balk met de processtappen.
- Nieuwe beelden worden gecomponeerd zoals Linear dat doet (uitsnede, vervaging naar de randen, lagen over elkaar).
- Niets naar `main` zonder akkoord.

