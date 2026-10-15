# Stap 2: de vier pagina's in de opbouw van linear.app/ai

Analyse en plan. Er is nog niets gebouwd. Dit document wacht op akkoord (zie hoofdstuk 8).

---

## 1. De opbouw van linear.app/ai

Bron: de screenshots `linear-ai-desktop.png` (1440 px breed, 12.885 px hoog) en `linear-ai-mobiel.png` (390 px breed op 2x). De maten zijn afgelezen van de screenshot en dus bij benadering.

### 1.1 De volgorde van de pagina

| # | Blok | Opbouw |
|---|---|---|
| 1 | Hero | Eén kolom, links uitgelijnd. Achtergrond: een donker, vervaagd beeld van code en interface, schuin en over de volle breedte, ook achter de header. Daarop een kleine regel ("AI and automations") en een grote titel van twee regels. Geen beschrijving, geen knoppen. Onderaan een dunne lijn |
| 2 | Intro | Twee kolommen: links de titel (48 px), rechts een alinea in grote tekst (24 px) met daaronder een tekstlink met pijltje of plusje |
| 3 | Grote afbeelding | Eén kolom, volle breedte, grijs verloop van boven, een kader met dunne rand. Twee vensters over elkaar, onderaan vervaagd. Bijschrift linksonder |
| 4 | Raster 2x2 | Vier cellen in één kader met dunne scheidslijnen. Elke cel: een stuk interface dat naar de randen en naar onderen vervaagt, daaronder titel en korte tekst |
| 5 | Intro | Zoals 2 |
| 6 | Grote afbeelding (diagram) | Zoals 3, maar zonder grijs verloop: een omlijnd kader met een schema van blokken en lijnen |
| 7 | Raster 1x2 | Twee cellen |
| 8 | Intro | Zoals 2 |
| 9 | Grote afbeelding | Code-diff |
| 10 | Raster 2x2 | Vier cellen |
| 11 | Intro | Zoals 2 |
| 12 | Grote afbeelding | Een bord met taken |
| 13 | Intro | Zoals 2 |
| 14 | Raster 1x2 | Twee cellen |
| 15 | Linkrij | Vier kolommen met dunne verticale lijnen: titel en een tekstlink met pijltje onderaan (Intake, Planning, AI, Build) |
| 16 | Citaten | Een grote witte kaart en een smallere limoenkaart, elk met een citaat en een logo |
| 17 | Cijferregel | Eén regel: "40.000 productteams", rechts een tekstlink |
| 18 | CTA | Gecentreerde titel van twee regels, twee ronde knoppen |

**Het terugkerende patroon:** intro, daarna één tot drie visuele blokken (grote afbeelding of raster), daarna veel lucht. Dat herhaalt vijf keer. Elke sectie heeft dus precies één onderwerp.

### 1.2 Maten en spanning

| Onderdeel | Linear (1440 px) | Wat het zegt |
|---|---|---|
| Hero | Ongeveer 845 px hoog, titel 72 px op regelhoogte 1, subregel 15 px grijs | De hero is een ruimte, geen kader met inhoud |
| Intro | Titel 48 px, regelhoogte 1, rechts 24 px op 32 px regelafstand. Tekstkolom begint op x=752 | Bij ons staat dit al zo (`.feature-header`, `.feature-title`, `.feature-description` in `home.css`) |
| Ruimte boven intro | Ongeveer 125 px onder de heroregel, ongeveer 250 px tussen een raster en de volgende intro | Grote stille stukken scheiden de secties. Er is geen keyline tussen secties |
| Intro naar afbeelding | Ongeveer 100 px na de link | |
| Afbeelding naar raster | 48 px | |
| Grote afbeelding | x=48 tot 1392 (1.344 px), terwijl de tekst op x=80 staat | De panelen steken 32 px aan elke kant buiten de tekstkolom. Het bijschrift staat weer op de tekstlijn (32 px binnen het paneel) |
| Venster in de afbeelding | Ongeveer 96 px onder de bovenrand, samenstelling van 1.120 px breed, gecentreerd, onderkant vervaagt over 90 px | Vensters worden afgesneden en vervagen, ze staan niet netjes in een vlak |
| Compositie | Twee vensters over elkaar (Slack-draad achter, issue ervoor) | Diepte komt van overlap, niet van schaduw |
| Raster | Eén buitenrand, binnenin dunne kruislijnen. Cel ongeveer 600 px hoog, beeld ongeveer 440 px, bijschrift 15 px | Geen losse kaarten |
| Beeld in een cel | Vervaagt aan de randen en onderaan | Het beeld loopt het vlak uit |
| Linkrij | Volle breedte lijn bovenin, vier kolommen van 336 px, titel 24 px, link onderaan | Staat vlak boven de CTA |
| Citaten en cijferregel | Citaten van echte klanten | Wij hebben die niet. Zie hoofdstuk 7 |
| CTA | Titel ongeveer 64 px, twee ronde knoppen, veel lucht eronder | Hetzelfde als onze afsluiter |

### 1.3 Mobiel

- De hero blijft staan, de titel loopt over vier regels. Boven de intro-titel staat de kleine regel.
- De grote afbeelding loopt **over de volle breedte** (geen zijkanten, geen afgeronde hoeken). Het venster is **rechts afgesneden**: je ziet het linkerstuk van de interface.
- Het raster wordt **één kolom**. Cellen worden gescheiden door een dunne lijn over de volle breedte, zonder buitenkader.
- Bijschriften staan onder elke afbeelding, in dezelfde grootte als op desktop.
- Het citaat en de linkrij worden kolommen onder elkaar.

---

## 2. Waar onze pagina's nu verschillen

### 2.1 Wat al klopt

Onze pagina's zijn al deels op Linear gebouwd. De intro (`.feature-header`: titel 48 px links, tekst 24 px rechts), het grote paneel met lichtval, het raster met gedeelde randen en de CTA komen overeen. Daar hoeft niets aan te veranderen.

### 2.2 Wat verschilt

| # | Onderdeel | Nu | Linear | Gevolg |
|---|---|---|---|---|
| 1 | Hero | Eyebrow, titel, beschrijving, twee knoppen, een beeld, een rij ronde knoppen met stappen | Eyebrow, titel, achtergrondbeeld. Verder niets | Beschrijving en knoppen verhuizen naar de intro of vervallen. Het hero-beeld wordt het eerste grote beeld ná de eerste intro. De ronde met stappen vervalt |
| 2 | Achtergrond hero | Geen (alleen `/ai` heeft een video) | Vervaagd beeld over de volle breedte | Elke pagina krijgt een achtergrond (zie 5.2) |
| 3 | Intro | Titel en tekst, geen link | Titel, tekst, tekstlink met pijltje of plusje | Elke intro krijgt waar mogelijk een link. Wij gebruiken de links als verwijzing naar de andere productpagina's |
| 4 | Secties | `pd-section` met `keyline` boven elke sectie | Alleen lucht. Eén lijn onder de hero | Keylines tussen secties vervallen |
| 5 | Ruimte | 144 px boven en 72 px onder de intro | 125 px boven, 100 px onder, 250 px na een raster | Maten aanpassen |
| 6 | Breedte paneel | Even breed als de tekst (1.280 px) | 64 px breder dan de tekst | Paneel 32 px aan elke kant buiten de kolom |
| 7 | Vensters | Een enkel venster, gecentreerd, rechts en onder uit beeld | Twee vensters over elkaar, onderaan vervaagd | Compositie met twee lagen waar het kan |
| 8 | Twee soorten paneel | Alleen met grijs verloop | Verloop voor schermen, omlijnd zonder verloop voor schema's | Het omlijnde paneel erbij (voor diagrammen) |
| 9 | Raster | Cel met kaart in het midden, rand en schaduw | Beeld vervaagt aan alle kanten en loopt uit beeld | Maskers op de cellen, grotere en afgesneden beelden |
| 10 | Rastervormen | Vooral 1x2 | 2x2 en 1x2 | 2x2 toevoegen |
| 11 | Afsluiting | Alleen de CTA | Linkrij, citaten, cijferregel, CTA | Linkrij toevoegen. Citaten en cijferregel later |
| 12 | Mobiel | Paneel en raster als kaarten met marge | Paneel over de volle breedte, venster rechts afgesneden, raster zonder kader | Mobiel apart aanpakken |
| 13 | Inhoud | Negen, zeven en zes secties met herhaling tussen de pagina's | Vijf secties die elk één onderwerp hebben | Elke pagina naar vijf secties (hoofdstuk 4) |

### 2.3 Lengte

Gemeten op 1440 px: Werkwijze 13.009 px, Kwaliteit 9.789 px, Beheer 10.290 px. Linear's AI-pagina is 12.885 px. De Werkwijze-pagina is dus even lang als die van Linear, met meer secties en meer herhaling. Het doel is vijf secties per pagina, ongeveer 9.000 tot 11.000 px.

---

## 3. De onderdelen per pagina: wat blijft, verhuist, vervalt of is nieuw

Alle 50 beelden (`components/*/Visuals.tsx`). Eigenaarspagina is de pagina waar het onderwerp thuishoort (zie `ADVIES_PRODUCTPAGINAS.md`, 3.4).

### 3.1 Werkwijze (nu 21 beelden)

| Beeld | Nu | Besluit | Nieuwe plek |
|---|---|---|---|
| `HeroMaand` | Hero | Blijft | Groot beeld sectie 1 |
| `ZichtbaarheidGrafiek` | Meten | Blijft, met margeband en "47 procent, marge 6" | Groot beeld sectie 2 |
| `AiAntwoord` | Meten | Blijft | Raster sectie 2 |
| `AandeelGenoemd` | Meten | Blijft | Raster sectie 2 |
| `Merkstem` | Kennis | Verhuist | Kwaliteit |
| `Feiten` | Kennis | Vervalt (staat in `BreinTabel`) | |
| `VanVraagNaarPagina` | Planning | Blijft | Raster sectie 3 |
| `PaginaIdee` | Planning | Blijft | Raster sectie 3 |
| `ContentplanBord` | Planning | Blijft | Groot beeld sectie 3 |
| `VragenTeam` | Klantinput | Vervalt als losse cel. Zijn inhoud komt terug in de tekst van `VragenKlant` | |
| `VragenKlant` | Klantinput | Blijft | Raster sectie 4 |
| `TekstFragment` | Schrijven | Blijft | Groot beeld sectie 4 |
| `ZinNalopen` | Schrijven | Blijft (hoort hier: de handeling) | Raster sectie 4 |
| `Eindredactie` | Schrijven | Verhuist | Kwaliteit |
| `Publiceren` | Publiceren | Blijft | Raster sectie 4 |
| `Hermeting` | Opvolging | Blijft, met oordeelchip "Gestegen, buiten de marge" | Raster sectie 5 |
| `Zoekverkeer` | Opvolging | Blijft | Raster sectie 5 |
| `Maandverslag` | Rapportage | Blijft | Groot beeld sectie 5 |
| `Werkoverzicht` | Bureau | Vervalt (staat op Beheer als `HeroWerkoverzicht`) | |
| `Toegang` | Bureau | Vervalt (staat op Beheer als `KijkerRechten`) | |
| `Kosten` | Bureau | Vervalt (staat op Beheer als `BeheerKosten`) | |
| **Nieuw** `DitBedrijfInrichten` | | Lijst met vinkjes zoals in de app | Raster sectie 1 |
| **Nieuw** `Kennismakingsgesprek` | | Doelen, regio's, prioriteitsdiensten vastleggen | Raster sectie 1 |
| **Nieuw** `Publicatiecontrole` | | "Pagina gevonden, over een uur nog een poging" en "Hij staat er echt" | Raster sectie 4 |

### 3.2 Kwaliteit (nu 14 beelden)

| Beeld | Nu | Besluit | Nieuwe plek |
|---|---|---|---|
| `HeroHerkomst` | Hero | Blijft, bron per harde bewering | Groot beeld sectie 1 |
| `GewoneAi` | Probleem | Blijft | Raster sectie 1 |
| `OrbitTekst` | Probleem | Blijft | Raster sectie 1 |
| `BreinSchema` | Brein | Verhuist naar AI (diagram van wat ORBIT ENGINE onderzoekt) | AI |
| `BreinTabel` | Register | Blijft, wordt het grote beeld | Groot beeld sectie 2 |
| `VanBinnen` | Brein | Blijft | Raster sectie 2 |
| `VanBuiten` | Brein | Blijft | Raster sectie 2 |
| `Vermoeden` | Register | Blijft | Raster sectie 2 |
| `Bewijs` | Register | Blijft | Raster sectie 2 |
| `FeitNaarZin` | Schrijven | Blijft | Raster sectie 3 |
| `GeleZin` | Vangnet | Vervalt (dubbel met `ZinNalopen`) | |
| `AntwoordKlant` | Vangnet | Vervalt (dubbel met `VragenKlant`) | |
| `Tegenstrijdig` | Bijblijven | Blijft | Raster sectie 4 |
| `Verloopt` | Bijblijven | Blijft | Raster sectie 4 |
| Verhuisd `Merkstem` | Werkwijze | | Raster sectie 3 |
| Verhuisd `Eindredactie` | Werkwijze | | Raster sectie 3 |
| **Nieuw** `WatWordtGeel` | | Een pagina met vier soorten gele zinnen (bedrag, termijn, garantie, keurmerk) en de reden eronder | Groot beeld sectie 3 |
| **Nieuw** `GoedkeurenGeblokkeerd` | | "Keur goed" uitgeschakeld, "2 gele zinnen open" | Raster sectie 3 |
| **Nieuw** `ControleLijst` (twee kolommen) | | "ORBIT ENGINE controleert" en "Jij beslist" als twee cellen | Raster sectie 5 |

### 3.3 Beheer (nu 15 beelden)

| Beeld | Nu | Besluit | Nieuwe plek |
|---|---|---|---|
| `HeroWerkoverzicht` | Hero | Blijft | Groot beeld sectie 1 |
| `LangstWacht` | Overzicht | Blijft | Raster sectie 1 |
| `MaandStarten` | Overzicht | Blijft | Raster sectie 1 |
| `BeheerBedrijven` | Klanten | Blijft, wordt het grote beeld | Groot beeld sectie 2 |
| `NieuwMerk` | Klanten | Blijft | Raster sectie 2 |
| `Onderzoek` | Klanten | Verhuist naar AI | AI |
| `Gebruikers` | Team | Blijft | Groot beeld sectie 3 |
| `Uitnodigen` | Team | Blijft | Raster sectie 3 |
| `KijkerRechten` | Team | Blijft | Raster sectie 3 |
| `BeheerKosten` | Kosten | Blijft | Groot beeld sectie 4 |
| `PrijsBijKnop` | Kosten | Blijft | Raster sectie 4 |
| `KostenPerKlant` | Kosten | Blijft | Raster sectie 4 |
| `Sleutels` | Sleutels | Blijft, nu als cel in plaats van aparte sectie | Raster sectie 4 |
| `Archief` | Gegevens | Blijft | Raster sectie 5 |
| `Verwijderen` | Gegevens | Blijft | Raster sectie 5 |
| **Nieuw** `ZoBeginJe` | | Vijf stappen: bureau aangemeld, sleutel, collega's, eerste klant, eerste onderwerp | Raster sectie 2 |
| **Nieuw** `SchermVanDeKijker` | | Wat de klant ziet: alleen zijn bedrijf, uitleg achter een vraagteken | Raster sectie 3 |
| **Nieuw** `AlsErIetsMisgaat` | | Systeemstatus: wat er gebeurde en wat je eraan doet | Raster sectie 3 |
| **Nieuw** `MaandlimietBereikt` | | Melding: nieuw werk stopt, automatisch werk wacht tot de volgende maand | Raster sectie 4 |

De USP-strook met vier punten bovenaan vervalt. "Onbeperkt klanten", "Rollen per persoon", "Eigen sleutels" en "Maandlimiet" komen terug in de intro's van de sectie waar ze thuishoren.

### 3.4 AI (nu leeg)

Zie hoofdstuk 4.4. Alle beelden zijn hier nieuw of verhuisd:

| Beeld | Herkomst |
|---|---|
| `Onderzoek` | Verhuisd uit Beheer |
| `BreinSchema` | Verhuisd uit Kwaliteit |
| **Nieuw** `WieDoetWat` | Tabel met stappen en drie kolommen: AI, Code, Jij |
| **Nieuw** `VragenlijstKlantreis` | Dertig vragen in drie fases, aan te passen |
| **Nieuw** `WaaromConcurrentWint` | Per concurrent de eigenschappen die AI noemt en de bronnen |
| **Nieuw** `Brief` | Onderzoek voor een pagina en maximaal acht gerichte vragen |
| **Nieuw** `MeetStroom` | Diagram: vraag, AI-assistent, beoordeling, rekenen, cijfer met marge |
| **Nieuw** `Kennistest` | Wat een AI-assistent al over het bedrijf weet, met "klopt" of "klopt niet" |
| **Nieuw** `Kanalen` | ChatGPT, Gemini en Google AI Overview met de sleutels die erbij horen |
| **Nieuw** `Schrijfstraat` | Diagram: brief, vragen, schrijfpoort, schrijven, eindredactie |
| **Nieuw** `AchtergrondWerk` | Bord met het werk dat per klant op de achtergrond loopt |
| **Nieuw** `WatAIBeslist` | Twee lijstcellen: "AI en code doen" en "Jij beslist" |

Totaal: ongeveer 15 nieuwe beelden en 4 verhuisde beelden. 14 bestaande beelden vervallen of worden samengevoegd.

---

## 4. De nieuwe opbouw per pagina

Elke pagina: hero, vijf secties, linkrij, CTA. Een sectie is een intro (titel, tekst, link) gevolgd door een groot beeld of een raster. De teksten hieronder zijn voorstellen en volgen de besluiten uit `BESLUITEN_PRODUCTPAGINAS.md`: elke maand meten, ChatGPT, Gemini en Google AI Overview, onbeperkt klanten, de uitnodiging per mail.

### 4.1 Werkwijze (`/werkwijze`)

**Hero.** Eyebrow "Werkwijze". Titel: "Elke maand dezelfde ronde. Met bewijs aan het eind."

| Sectie | Intro | Groot beeld | Raster |
|---|---|---|---|
| **1 Start** | Titel: "Elke klant een vaste maand." Tekst: "Meten, plannen, schrijven, publiceren en nameten. Je ziet welke stap loopt en wat er op jou wacht." Link: "Zo start je een klant" (naar sectie 1) | `HeroMaand` | 1x2: `DitBedrijfInrichten`, `Kennismakingsgesprek` |
| **2 Meten** | Titel: "Zie bij welke vragen je klant wordt genoemd." Tekst: "Dertig AI-vragen langs de klantreis, elke maand meten in ChatGPT, Gemini en Google AI Overview. Bij elk cijfer staat een marge, zodat je weet wanneer een verschil echt is." Link: "Hoe AI meet" (naar AI) | `ZichtbaarheidGrafiek` | 1x2: `AiAntwoord`, `AandeelGenoemd` |
| **3 Plannen** | Titel: "Geef inzichten een plek in je contentplan." Tekst: "Elke gemiste vraag wordt een pagina-idee met bewijs. Je plant per maand, van vijf tot vijftig pagina's, en ORBIT ENGINE vult een jaar vooruit." Link: geen | `ContentplanBord` | 1x2: `VanVraagNaarPagina`, `PaginaIdee` |
| **4 Schrijven en publiceren** | Titel: "Schrijf vanuit bedrijfskennis. Plaats wat je goedkeurt." Tekst: "Wat alleen je klant weet, beantwoordt hij zelf, ook op zijn telefoon en zonder account. ORBIT ENGINE schrijft zodra alle antwoorden er zijn. Jij beoordeelt, kopieert en meldt het adres." Link: "Hoe de feiten bewaakt worden" (naar Kwaliteit) | `TekstFragment` | 2x2: `VragenKlant`, `ZinNalopen`, `Publiceren`, `Publicatiecontrole` |
| **5 Nameten en laten zien** | Titel: "Zie wat de pagina deed. Laat het je klant zien." Tekst: "Na 14 en 28 dagen meet ORBIT ENGINE de doelvragen van elke pagina opnieuw en laat de klikken uit Google zien. Alles komt in een maandverslag met de naam van je bureau." Link: "Beheer van je klanten" (naar Beheer) | `Maandverslag` | 1x2: `Hermeting`, `Zoekverkeer` |

### 4.2 Kwaliteit (`/kwaliteit`)

**Hero.** Eyebrow "Kwaliteit". Titel: "AI die schrijft wat klopt. Niet wat goed klinkt." (blijft).

| Sectie | Intro | Groot beeld | Raster |
|---|---|---|---|
| **1 Het probleem** | Titel: "AI verzint met dezelfde stelligheid als waarmee het feiten noemt." Tekst: "Een garantie die niet bestaat, een prijs van vorig jaar, een keurmerk dat je klant niet heeft. Het leest prima, tot de klant belt." Link: "Plan een gratis demo" of "Hoe AI onderzoekt" (naar AI) | `HeroHerkomst` | 1x2: `GewoneAi`, `OrbitTekst` |
| **2 Eerst weten** | Titel: "Eerst weten. Dan pas schrijven." Tekst: "Voordat er één zin staat, verzamelt ORBIT ENGINE alles wat er over je klant bekend is. Elk feit heeft een bron en een zekerheid. Een vermoeden blijft een vermoeden." Link: "Wat ORBIT ENGINE onderzoekt" (naar AI) | `BreinTabel` | 2x2: `VanBinnen`, `VanBuiten`, `Vermoeden`, `Bewijs` |
| **3 Twijfel? Dan wordt het geel.** | Tekst: "Een bedrag, termijn, garantie of keurmerk zonder bron wordt geel. Je keurt pas goed als elke gele zin is nagelopen. Toon en merkstem schrijft ORBIT ENGINE mee, jij beoordeelt ze." Link: "Zo werkt de goedkeuring" (naar Werkwijze) | `WatWordtGeel` | 2x2: `FeitNaarZin`, `Merkstem`, `Eindredactie`, `GoedkeurenGeblokkeerd` |
| **4 Een feitenbestand dat bijblijft** | Tekst: "Bedrijven veranderen. ORBIT ENGINE ziet tegenstrijdigheden en verlopen feiten en vraagt jou om een besluit." Link: geen | Geen | 1x2: `Tegenstrijdig`, `Verloopt` |
| **5 Wat ORBIT ENGINE controleert. En wat jij beslist.** | Tekst: "Geen tool kan alles controleren. Daarom staat er precies wat er wel gecontroleerd wordt." Link: geen | Geen | 1x2: `ControleLijst` (twee cellen) |

### 4.3 Beheer (`/beheer`)

**Hero.** Eyebrow "Beheer". Titel: "Al je klanten in één account. Jij houdt de regie." (blijft).

| Sectie | Intro | Groot beeld | Raster |
|---|---|---|---|
| **1 Overzicht** | Titel: "Zie in één oogopslag waar elke klant staat." Tekst: "Onbeperkt klanten in één werkoverzicht. Wat het langst wacht staat bovenaan, en je start de maand voor meerdere klanten tegelijk." Link: "Zo ziet een maand eruit" (naar Werkwijze) | `HeroWerkoverzicht` | 1x2: `LangstWacht`, `MaandStarten` |
| **2 Klanten toevoegen** | Titel: "Een nieuwe klant staat er in tien minuten." Tekst: "Naam en website zijn genoeg. ORBIT ENGINE onderzoekt de rest. Per bureau leg je vast hoeveel pagina's een nieuwe klant per maand krijgt." Link: "Wat het onderzoek doet" (naar AI) | `BeheerBedrijven` | 1x2: `NieuwMerk`, `ZoBeginJe` |
| **3 Team en kijkers** | Titel: "Je team en je klant, elk met de juiste rol." Tekst: "Beheerders doen alles. Een kijker ziet alleen zijn eigen bedrijf en doet alleen wat jij toestaat. De uitnodiging gaat per mail." Link: geen | `Gebruikers` | 2x2: `Uitnodigen`, `KijkerRechten`, `SchermVanDeKijker`, `AlsErIetsMisgaat` |
| **4 Kosten en sleutels** | Titel: "Weet wat de AI kost, voordat je op de knop drukt." Tekst: "Je gebruikt je eigen sleutels en betaalt de AI tegen kostprijs. Bij elke knop staat wat het kost. Een maandlimiet stopt nieuw werk." Link: "Wat AI voor je doet" (naar AI) | `BeheerKosten` | 2x2: `PrijsBijKnop`, `KostenPerKlant`, `Sleutels`, `MaandlimietBereikt` |
| **5 Jouw klanten blijven van jou** | Tekst: "Elk bureau werkt in een eigen omgeving. Stopt een klant, dan archiveer je hem of verwijder je zijn gegevens." Link: geen | Geen | 1x2: `Archief`, `Verwijderen` |

### 4.4 AI (`/ai`)

**Hero.** Eyebrow "AI in ORBIT ENGINE". Titel: "AI doet het werk. Jij beslist wat er live gaat." De bestaande video-hero blijft de basis (zie vraag 2 in hoofdstuk 8).

| Sectie | Intro | Groot beeld | Raster |
|---|---|---|---|
| **1 Wie doet wat** | Titel: "De snelheid van AI. Zonder het risico." Tekst: "AI onderzoekt, meet en schrijft. Code controleert wat een model niet mag beloven. Jij beslist wat er waar is en wat er live gaat." Link: "Hoe de kwaliteit bewaakt wordt" (naar Kwaliteit) | `WieDoetWat` (tabel) | 2x2: `Onderzoek`, `VragenlijstKlantreis`, `WaaromConcurrentWint`, `Brief` |
| **2 Meten** | Titel: "AI stelt de vragen die jouw klanten stellen." Tekst: "ORBIT ENGINE vraagt het aan ChatGPT, Gemini en Google AI Overview, met zoeken op het web. Een tweede AI-stap beoordeelt wie genoemd wordt. De rekensom is van code, met een marge." Link: "Zo zie je het resultaat" (naar Werkwijze) | `MeetStroom` (diagram, omlijnd) | 1x2: `Kennistest`, `Kanalen` |
| **3 Schrijven** | Titel: "AI schrijft de eerste versie. Een tweede AI leest mee." Tekst: "Eerst onderzoek, dan gerichte vragen aan je klant, dan pas schrijven. De eindredacteur verbetert alleen wat nodig is en mag niets nieuws beweren." Link: "Hoe de feiten bewaakt worden" (naar Kwaliteit) | `Schrijfstraat` (diagram, omlijnd) | Geen |
| **4 Alles op de achtergrond** | Titel: "Alles loopt door als jij je laptop dicht doet." Tekst: "Onderzoek, metingen en schrijfwerk draaien vanzelf. Elke stap kijkt eerst of zijn resultaat al bestaat, dus je betaalt nooit dubbel." Link: "Wat het kost" (naar Beheer) | `AchtergrondWerk` | Geen |
| **5 Eerlijk over de grenzen** | Titel: "Wat AI niet beslist." Tekst: "Een AI-oordeel is een aanwijzing, geen bewijs. Daarom zegt ORBIT ENGINE erbij waar de grenzen liggen." Link: geen | Geen | 1x2: `WatAIBeslist` (twee cellen) |

Sectie 3 en 4 hebben alleen een groot beeld, zoals bij Linear sectie 4 ("See everything your agents are doing").

### 4.5 Gemeenschappelijk onderaan elke pagina

1. **Linkrij** met vier kolommen (AI, Werkwijze, Kwaliteit, Beheer), met de menuteksten uit `lib/site.ts` als titel en de paginanaam met pijltje als link. Boven de rij een lijn over de volle breedte.
2. **CTA**: bestaat al (kop, tekst, "Plan een gratis demo" en "Contact opnemen").

Geen citaten en geen cijferregel (zie hoofdstuk 7).

---

## 5. Hoe we het bouwen

### 5.1 Gedeelde bouwblokken

De vier pagina's gebruiken dezelfde blokken. Dat is ook wat zorgt dat ze één familie zijn.

| Blok | Bestand | Wat het doet |
|---|---|---|
| `Hero` | `components/product/Blokken.tsx` (nieuw) | Eyebrow, titel, achtergrond |
| `Intro` | idem, bouwt op `Kop` | Titel, tekst, tekstlink met pijltje |
| `Beeld` | idem, vervangt `Paneel` | Groot beeld met verloop of omlijnd, bijschrift linksonder, 32 px breder dan de tekst |
| `Raster` | idem, vervangt het huidige raster | 1x2 of 2x2 met gedeelde randen |
| `Cel` | idem | Beeld met masker, titel en tekst |
| `Linkrij` | idem (nieuw) | Vier kolommen met verticale lijnen |
| Stijlen | `app/pagina.css` (nieuw) | Alle bovenstaande maten, mobiel inbegrepen. De pagina-CSS wordt kleiner, de beelden (`fv-`) blijven in de huidige bestanden |

Bestaande klassen en tokens blijven in gebruik (`--bg-*`, `--text-*`, `--border-*`, `--accent`, `--radius-*`, `--speed-*`, `--ease-*`). Geen nieuwe kleuren, lettertypen of schaduwen. Alle beweging respecteert `prefers-reduced-motion`.

### 5.2 De hero-achtergrond

De hero van Linear is een donker, vervaagd beeld van interface en code, schuin geplaatst. Voor de drie bestaande pagina's bouw ik dat uit **onze eigen beelden**: een bestaand scherm (bijvoorbeeld `HeroMaand`, `HeroHerkomst`, `HeroWerkoverzicht`) in een 3D-kanteling, sterk vervaagd, met een donker masker boven en onder. Voordelen: geen bestanden, geen gewicht, past bij de pagina. Het beeld beweegt niet en valt bij `prefers-reduced-motion` niet anders uit.

Voor `/ai` blijft de video-hero die al is voorbereid. Welke variant je kiest, bepaal je (vraag 2).

### 5.3 Mobiel

| Onderdeel | Gedrag |
|---|---|
| Hero | Titel loopt over vier regels, achtergrond blijft |
| Intro | Eén kolom, kleine regel boven de titel, tekst eronder |
| Groot beeld | Volle breedte, zonder zijkanten of afgeronde hoeken, venster rechts afgesneden |
| Raster | Eén kolom, scheidslijnen over de volle breedte, geen buitenkader |
| Linkrij | Eén kolom |

Werkt van 320 px tot desktop, zonder horizontaal scrollen.

### 5.4 Nieuwe beelden

Elk nieuw beeld volgt dezelfde regels als de bestaande: een nagebouwd scherm van de app met de voorbeeldcase (Bureau Noordwind, Lindeman Warmte), het label "Voorbeeldgegevens", een rijke alt-tekst, geen verzonnen cijfers buiten het voorbeeld. Elk beeld toont één idee. In het raster vervaagt het beeld naar de randen en loopt het uit beeld.

---

## 6. Volgorde van werk

We werken volgtijdig en na elke stap vraag ik akkoord.

| Stap | Wat | Wat je krijgt |
|---|---|---|
| **2a** | Gedeelde bouwblokken en `pagina.css`. Eerst op een proefversie van Werkwijze om de blokken te testen | Schermafbeeldingen naast die van Linear |
| **2b** | Werkwijze volledig (hero, vijf secties, nieuwe beelden) | Schermafbeeldingen op desktop en mobiel, tekstoverzicht |
| **2c** | Kwaliteit | Idem |
| **2d** | Beheer | Idem |
| **2e** | AI | Idem |
| **2f** | Linkrij op alle vier, laatste controles (alle verwijzingen, sitemap, typecontrole, build, 320 px tot desktop) | Overzicht |

Per stap: typecontrole, build, schermafbeeldingen op 1440 px en 390 px, een vergelijking met Linear, en pas na je akkoord een commit op de branch. Niets naar `main` zonder jouw akkoord.

---

## 7. Wat we niet doen

- **Citaten en cijferregel** van Linear (onderdelen 16 en 17). We hebben geen echte klantcitaten of cijfers. De limoenkleurige kaart past wel bij ons accent, dus het blok kan later terugkomen zodra er echte citaten zijn.
- **Bedragen en link naar `/prijzen`** op deze pagina's, zolang die pagina leeg is.
- **De homepage en andere pagina's.** Die komen later.

---

## 8. Besluiten die ik nodig heb

1. **Knoppen in de hero.** Linear heeft er geen: de hero is alleen titel en achtergrond. De demoknop zit in het menu bovenin en onderaan in de CTA. Voorstel: de hero zonder knoppen, zoals Linear. Wil je toch een knop "Plan een gratis demo" in de hero of in de eerste intro?
2. **Achtergrond van de hero.** Voor de drie bestaande pagina's stel ik een achtergrond voor die ik uit onze eigen beelden bouw (zie 5.2). Voor `/ai` is er al een video-hero (varianten `/ai1` en `/ai2`). Welke kies je, of wil je ook voor de andere pagina's video's? En mag ik de overige testvarianten (`/test`, enzovoort) na afloop verwijderen?
3. **Beelden die verhuizen of vervallen.** Akkoord met de lijsten in hoofdstuk 3? Dat betekent onder meer: `Onderzoek` van Beheer naar AI, `Merkstem` en `Eindredactie` van Werkwijze naar Kwaliteit, en de beelden `Werkoverzicht`, `Toegang`, `Kosten` en `Feiten` vervallen.
4. **Vijf secties per pagina.** Akkoord dat elke pagina vijf secties krijgt? Dat betekent dat onderwerpen die nu een eigen sectie hebben (bijvoorbeeld Sleutels en Gegevens op Beheer) samengevoegd worden.
5. **Links in de intro's.** Akkoord dat de links vooral naar de andere productpagina's verwijzen (bijvoorbeeld "Hoe AI meet")? Zo werken de pagina's samen en herhaalt niets zichzelf.
6. **Volgorde.** Akkoord met werken in de volgorde Werkwijze, Kwaliteit, Beheer, AI? AI komt als laatste omdat er beelden uit de andere pagina's naartoe verhuizen.
