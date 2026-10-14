# Advies: de vier productpagina's van ORBIT ENGINE

Controle van de pagina's AI, Werkwijze, Kwaliteit en Beheer, getoetst aan de app, met een verbeterplan en een voorstel voor de AI-pagina.

| Gegeven | Waarde |
|---|---|
| Datum | 14 oktober 2026 |
| Website (repo `orbit`) | Branch `claude/orbit-product-pages-review-o82icu`, gebouwd op de `main` van de site |
| App (repo `orbit-engine`) | `origin/main`, commit `45a963c`. De lokale `main` liep achter, daarom is `origin/main` gebruikt |
| Bronnen over de app | `docs/ORBIT_ENGINE_PROCESDOCUMENTATIE.md` (commit `a71af32`, 11 oktober 2026), `docs/ORBIT_ENGINE_WAAROM.md`, en de code zelf. Waar document en code elkaar tegenspreken, is de code gevolgd |
| Gecontroleerde pagina's | `/ai`, `/product`, `/kennis`, `/agency`. In het menu heten ze AI, Werkwijze, Kwaliteit en Beheer |
| Niet gedaan | De pagina's zijn niet in een browser bekeken en de app is niet doorgeklikt. Alles hieronder komt uit de broncode van de site en de app en uit de documenten |

---

## 0. Samenvatting

### Hoofdconclusie

De drie bestaande pagina's zijn goed gebouwd en volgen het Linear-ontwerp consequent. Het probleem zit niet in de vormgeving, maar in de verdeling van de boodschap:

1. **Dezelfde boodschap staat op meerdere pagina's.** Werkwijze bevat in feite een korte versie van Kwaliteit en een korte versie van Beheer. Vier beelden komen bijna letterlijk twee keer voor en een vijfde lijkt er sterk op.
2. **De belangrijkste verkoopargumenten van de app staan nergens.** De meetmethode met onzekerheidsmarge, het inzicht waarom concurrenten winnen, de kennistest, de technische check voor AI-crawlers, de klantreis-vragen, het jaarplan en de publicatiecontrole komen op geen enkele van de vier pagina's voor.
3. **Een paar beweringen gaan verder dan de app nu doet.** Het zijn er weinig, maar ze staan op de plekken waar de lezer het meest op let: "je ziet het bij elke zin" en "elke maand gemeten". Dit moet eerst, want de app-documentatie zegt zelf: schrijf nergens dat iets kan wat nog niet gebouwd is.
4. **De AI-pagina bestaat als lege pagina.** Er staat alleen de titel "AI" en `noindex`. Daarnaast liggen er twee testvarianten (`/ai1`, `/ai2`) met Engelse tekst van linear.app. Er is dus nog geen inhoud en geen tekst.
5. **De commerciële basis is niet eenduidig.** De homepage en `/over` zeggen "open source en gratis", de app-documentatie zegt "niet open source, gehost, met een afspraak over het gebruik plus AI-kosten op eigen sleutels", en `/prijzen` is leeg. Elke verkoopboodschap op de vier pagina's leunt op die keuze.

### De tien belangrijkste bevindingen

| # | Bevinding | Pagina | Prioriteit |
|---|---|---|---|
| 1 | "Open source en gratis" op home en `/over` botst met het gehoste bureaumodel van de app. Prijzenpagina is leeg | Hele site | P0, besluit van de eigenaar |
| 2 | `/kennis`: "Je ziet het bij elke zin" en het beeld met genummerde bronnen per zin. In de app staat per zin geen bron, alleen bij gele zinnen een reden en per feit een bron op het scherm Feiten en kennis | Kwaliteit | P1 |
| 3 | `/product`: "Elke maand gemeten op dezelfde vragen". De maandmeting staat standaard uit en een beheerder moet hem aanzetten | Werkwijze | P1 |
| 4 | De meetmethode (marge, herhaalde metingen, weging, "telt mee 6 van 18") ontbreekt op alle vier de pagina's, terwijl het USP 3 is | Werkwijze, AI | P1 |
| 5 | `/product` bevat een eigen versie van Kennis, Eindredactie en Bureau. Dat zijn de onderwerpen van `/kennis` en `/agency` | Werkwijze | P1 |
| 6 | De ronde bovenaan `/product` heeft vijf stappen, de pagina negen blokken. Bedrijfskennis staat tussen Meten en Plannen, terwijl het in de app vóór het meten komt. Klantinput is een deel van Schrijven | Werkwijze | P1 |
| 7 | `/kennis` behandelt alleen feitelijke juistheid. Stem en toon, verboden woorden, concurrentnamen, de volledige oplevering (meta, FAQ, gestructureerde gegevens, interne links) en de eindredactie ontbreken | Kwaliteit | P2 |
| 8 | `/agency` mist: hoe begin je (vijf stappen), wat ziet de klant als kijker, foutuitleg in gewone taal, Search Console koppelen, en een eerlijke regel over de toegang van de eigenaar | Beheer | P2 |
| 9 | De AI-pagina moet gebouwd worden. Voorstel in hoofdstuk 5: AI doet het zware werk, code bewaakt wat een model niet mag beloven, een mens beslist | AI | P1 |
| 10 | Naamgeving: menu zegt Kwaliteit, URL `/kennis`, paginatitel "Kennis en feiten". `/kennis` lijkt bovendien op `/kennisbank` | Alle | P2 |

### Voorgestelde volgorde

1. **Besluiten** (hoofdstuk 8, fase 0): verdienmodel, doelgroep, URL-structuur en welke meetkanalen je mag noemen.
2. **Juistheid** (fase 1): de overdreven beweringen terugbrengen tot wat de app doet. Tekstwerk, laag risico.
3. **Structuur** (fase 2): dubbelingen weghalen en de pagina's herordenen.
4. **AI-pagina** (fase 3): tekst, beelden, bouw.
5. **Bewijs** (fase 5): een echte proefronde, echte voorbeelden en getallen, daarna pas sterke kwaliteits- en kostenclaims.

---

## 1. Hoe ik dit heb gecontroleerd

1. De volledige USP-tekst gelezen (`ORBIT_ENGINE_WAAROM.md`) en de procesdocumentatie voor de onderdelen die de pagina's raken: wat de app is, de gebruikersreis in 24 stappen, de AI-pijplijn, de meetmethodiek, de beperkingen en bewuste keuzes.
2. De teksten en beelden van de vier pagina's gelezen (`content/product.ts`, `content/kennis.ts`, `content/agency.ts`, de paginabestanden en de nagebouwde schermen in `components/*/Visuals.tsx`), plus `content/home.ts`, `content/over.ts`, het menu en de sitemap.
3. Beweringen die ik niet zeker wist, naar de code teruggebracht. De belangrijkste uitkomsten:

| Controle | Uitkomst |
|---|---|
| Bewijsladder met zeven treden | Gebouwd, maar conversie en omzet worden nooit gemeten (geen Analytics- of CRM-koppeling). Alleen de eerste vijf treden hebben gegevens |
| Effecten als CSV exporteren | Niet gevonden. Er zijn alleen CSV-exports van het merkdossier en het contentplan |
| Bron per zin zichtbaar op het paginascherm | Niet gevonden. De pagina toont gele zinnen met reden, en het antwoord van het bedrijf onder een gele zin. De bron staat per feit op Feiten en kennis |
| Feiten kunnen verlopen (einddatum) | Aanwezig (`verloopt_op`, `isVerlopen()`) |
| Interne links bij een opgeleverde pagina | Aanwezig op het scherm Oplevering |
| Maandmeting standaard aan | Nee, standaard uit. Een beheerder zet hem aan per cluster, bij het bevestigen, of in bulk |
| Gemini en Google AI Overview | Gemini is gebouwd maar volgens het logboek nog niet tegen een echt antwoord getoetst. Google AI Overview staat uit tenzij de eigenaar de schakelaar aanzet en het bureau DataForSEO-gegevens heeft |
| Teststand door het bureau | Alleen de superuser zet hem om, per bureau |
| Open source | De app-documentatie zegt dat ORBIT ENGINE niet open source is |

4. De open punten van de eigenaar zelf in de documentatie meegenomen (hoofdstuk 13 en 16): de modellen en de kosten zijn nog nooit met echte betaalde aanroepen getoetst, en `eval:mention` is niet gedraaid. Dat bepaalt hoe stellig de pagina's over kwaliteit en kosten mogen zijn.

### De opmerking over de AI-pagina

De AI-pagina "bestaat nog niet" klopt voor de inhoud. De route bestaat wel: `/ai` toont alleen de titel "AI" en staat op `noindex`. Daarnaast zijn `/ai1` en `/ai2` varianten met een achtergrondvideo en de Engelse tekst van Linear ("Agents that follow work from conversation to code", "Artificial colleagues. Natural collaboration."). Die tekst moet vervangen worden, en de varianten, de schakelaar tussen varianten en de `/test`-routes moeten voor de lancering weg (hoofdstuk 7).

---

## 2. Wat de app de klant te bieden heeft

Dit is de waardekaart waar elke pagina aan getoetst is. De status komt uit de procesdocumentatie en de code.

| Markering | Betekenis |
|---|---|
| Gebouwd | Werkt in de app en mag zonder voorbehoud genoemd worden |
| Optioneel | Werkt, maar staat standaard uit of vraagt een keuze of sleutel. Noem de voorwaarde erbij |
| Voorbehoud | Gebouwd, maar nog niet getoetst of met een beperking die de tekst moet noemen |
| Niet gebouwd | Niet noemen als functie |

### 2.1 AI: wat AI voor de klant doet

| Wat | Status | Toelichting voor de tekst |
|---|---|---|
| Een bedrijf onderzoeken uit naam en website (dossier, aanbod, concurrenten, markt) | Gebouwd | Ongeveer tien minuten, loopt op de achtergrond. Plafond van 2 euro per bedrijf in de documentatie, pas noemen na proefronde |
| Kennistest: wat weet een AI-assistent al over het bedrijf, en klopt dat | Gebouwd | Oordeel "klopt" rekent code uit, niet het model |
| 30 AI-vragen langs de klantreis (oriëntatie, overweging, beslissing), merkneutraal, met plaatsnamen waar dat past | Gebouwd | Aanpasbaar, uit te zetten, eigen vragen erbij |
| Meten in ChatGPT met zoeken op het web | Gebouwd | Basis van het hoofdcijfer |
| Meten in Gemini | Voorbehoud | Nog niet tegen een echt antwoord getoetst. Telt niet mee in het oordeel over het effect van een pagina |
| Meten in Google AI Overview | Optioneel | Schakelaar van de eigenaar plus DataForSEO-gegevens van het bureau |
| Een tweede AI-stap beoordeelt wie genoemd wordt, en op welke plek | Gebouwd | Het oordeel is van een model, de rekensom is van code |
| Uitleg waarom concurrenten genoemd worden, welke bronnen de AI aanhaalt | Gebouwd | Eigenschappen per concurrent en bronnenlandschap |
| Rapport met kansen en bewijs | Gebouwd | Onbewezen beweringen worden eruit gehaald |
| Content brief met onderzoek, en maximaal acht gerichte vragen aan het bedrijf | Gebouwd | Wat eenmaal beantwoord is, wordt niet opnieuw gevraagd |
| Een pagina schrijven (zwaarste model, veel denktijd) en een eindredacteur die meeleest | Gebouwd | Kwaliteit van de uitvoer is nog niet met echte aanroepen getoetst |
| Hermeten van de doelvragen na 14 en 28 dagen | Gebouwd | Oordeel gestegen, gelijk, gedaald of te weinig gegevens |
| Alles loopt op de achtergrond, nooit dubbel betalen | Gebouwd | Elke stap kijkt eerst of zijn resultaat al bestaat |
| AI tegen kostprijs op de eigen sleutels van het bureau | Gebouwd | OpenAI verplicht, Gemini en DataForSEO optioneel |

### 2.2 Werkwijze: de volledige kringloop

| Stap | Wat de app biedt | Status |
|---|---|---|
| Inrichten | Naam en website, onderzoek, merkdossier, aanbodboom, kennismakingsgesprek, lijst "Dit bedrijf inrichten" | Gebouwd |
| Onderwerpen kiezen | Voorstellen uit het onderzoek, clusters ontdekken met Search Console en zoekdata | Gebouwd, zoekdata optioneel |
| Meten | Vragen nalopen, kanalen kiezen, nulmeting, zichtbaarheid met marge, weging naar commerciële waarde, herhaalde metingen van de zwaarste vragen | Gebouwd |
| Begrijpen | Concurrenten ingedeeld, eigenschappen, bronnen, positie, eerste aanbeveling, technische check voor AI-crawlers, reputatiemeting | Gebouwd |
| Plannen | Kans met bewijs, nieuw of verbeteren, geen dubbelingen, jaarplan van twaalf maanden, 5 tot 50 pagina's per maand, eigen pagina-idee, vijf soorten pagina's | Gebouwd |
| Voorbereiden | Brief, openstaande vragen in de app of via een deellink zonder account, herinneringen | Gebouwd, mail alleen als de eigenaar mail aanzet |
| Schrijven | Schrijfpoort (schrijft vanzelf zodra alle vragen beantwoord zijn en de datum binnen tien dagen ligt), schrijver, eindredactie, titel, metatitel, omschrijving, FAQ, gestructureerde gegevens, interne links | Gebouwd |
| Goedkeuren | Gele zinnen bevestigen of aan het bedrijf vragen, aanpassing vragen, zelf bewerken, versies | Gebouwd |
| Publiceren | Kopiëren als HTML, Markdown of platte tekst, adres melden, publicatiecontrole met tweede poging | Gebouwd. Geen CMS-koppeling |
| Hermeten | Na 14 en 28 dagen, Search Console per pagina, maandmeting | Gebouwd, maandmeting en Search Console zijn een keuze |
| Laten zien | Maandverslag met de naam van het bureau, af te drukken of als pdf | Gebouwd |

### 2.3 Kwaliteit: wat de content betrouwbaar maakt

| Wat | Hoe | Afgedwongen in code? |
|---|---|---|
| Alleen feiten met een bron gaan naar de schrijver | `magInBlokA()`: alleen waargenomen, verklaarde of bevestigde feiten | Ja |
| Een vermoeden komt nooit als bewering op een pagina | Status "afgeleid" is geblokkeerd voor gebruik in tekst | Ja |
| "Staat op de website" vraagt een letterlijk citaat | Code zoekt het citaat terug op de pagina | Ja |
| Bedrag, getal, termijn, garantie of keurmerk zonder bron wordt geel | `harde-beweringen.ts` | Ja |
| Goedkeuren kan pas als elke gele zin bevestigd is | `keurGoed()` weigert | Ja |
| Een getal moet in de bron staan waar het label naar wijst | `controleerOnderbouwing()` | Ja |
| Concurrentnamen en verboden woorden blijven eruit | Code weigert correcties die ze toevoegen | Ja |
| Schrijfregels zoals geen gedachtestreepjes en een metatitel van hooguit 60 tekens | Mechanische reparatie | Ja |
| De eindredacteur mag niets nieuws beweren en niet meer dan 60 procent veranderen | `voerCorrectiesUit()` | Ja |
| Een goedkeuring hoort bij de inhoud, niet bij de pagina | Vingerafdruk van de inhoud, na een bewerking opnieuw controleren | Ja |
| Bij verbeteren van een bestaande pagina: verdwenen gegevens worden gemeld | `verdwenen-gegevens.ts` | Ja |
| Tegenstrijdigheden tussen bronnen vallen op | `fact_register` en conflicten | Ja |
| Verlopen feiten gaan niet stilletjes mee | `verloopt_op` | Ja |
| Toon, stijl, opbouw en of een tekst overtuigt | Prompt en eindredactie | Nee, bewust geen vangnet. De mens beslist |

### 2.4 Beheer: wat het bureau zelf in handen heeft

| Wat | Status |
|---|---|
| Eigen omgeving per bureau, andere bureaus zien niets, ook niet dat het bestaat | Gebouwd en getest met twee bureaus in de ketentest |
| Onbeperkt klanten | Gebouwd |
| Werkoverzicht over alle klanten, wat het langst wacht staat bovenaan | Gebouwd |
| Maand starten, pagina's per maand en maandmeting voor meerdere klanten tegelijk | Gebouwd |
| Standaarden voor nieuwe klanten | Gebouwd |
| Rollen beheerder en kijker, kijkers per bedrijf toewijzen, tien rechten per bureau in te stellen | Gebouwd |
| Uitnodigen met link, per mail alleen als de eigenaar mail aanzet. Uitnodiging werkt veertien dagen | Gebouwd, mail optioneel |
| Eigen sleutels (versleuteld, laatste vier tekens zichtbaar, testknop) | Gebouwd |
| Maandlimiet die nieuw betaald werk stopt, ook automatisch werk | Gebouwd. Een taak die al loopt, maakt zijn werk af |
| Kosten vooraf bij elke betaalde knop, uit de eigen geschiedenis van het bureau | Gebouwd. Zonder geschiedenis staat er "nog geen schatting" |
| Kosten per maand, per soort werk en per klant, en wat volgende maand vanzelf loopt | Gebouwd |
| Systeemstatus met foutoorzaak in gewone taal | Gebouwd |
| Meldingen, rondleiding per rol, uitleg achter elk vraagteken | Gebouwd |
| Search Console koppelen per klant met een kant-en-klare tekst voor de klant | Gebouwd |
| Klant archiveren en terughalen, klant definitief verwijderen met telling vooraf | Gebouwd |
| Bewaartermijnen (inhoud van AI-aanroepen zes maanden, achtergrondwerk en meldingen een jaar) | Gebouwd |
| CSV-export van merkdossier en contentplan | Gebouwd |
| Tweestapsverificatie, inloggen via een externe dienst | Niet gebouwd. Niet noemen |

---

## 3. Positionering en de rode draad

### 3.1 Voor wie

De schrijfstijl-afspraak voor deze site noemt als doelgroep "professionals bij marketingbureaus". De app is gebouwd voor bureaus. De vier pagina's spreken terecht bureaus aan. De homepage en `/over` spreken van "marketeers" en op de homepage staat een MKB-bedrijf zonder eigen team als doelgroep. Kies één lezer: het bureau dat AI-zichtbaarheid als maandelijkse dienst wil verkopen. Een MKB-bedrijf bereik je via dat bureau.

### 3.2 De propositie in één zin

> ORBIT ENGINE is de app waarmee je bureau AI-zichtbaarheid verkoopt als vaste maandelijkse dienst: meten, plannen, schrijven, publiceren en aantonen wat het opleverde, voor al je klanten, tegen je eigen AI-kosten.

Vrij naar de eerste alinea van het USP-document. Hij hoort in elke pagina terug te komen als achtergrond, maar niet als herhaling.

### 3.3 De vier pagina's beantwoorden vier vragen

Een bureau dat de site bezoekt, stelt achter elkaar vier vragen. Daar volgt de volgorde van het menu uit:

| Pagina | Vraag van het bureau | Antwoord in één regel | Perspectief |
|---|---|---|---|
| **AI** | Wat doet AI voor mij en waar houdt het op? | AI doet het zware werk, code bewaakt wat een model niet mag beloven, jij beslist | Wat ORBIT ENGINE zelf doet |
| **Werkwijze** | Hoe ziet mijn maand eruit? | Elke maand dezelfde ronde, van meting tot bewijs | Wat jij doet, in volgorde |
| **Kwaliteit** | Kan ik wat het schrijft aan mijn klant leveren? | Ja, want elke harde bewering heeft een bron en twijfel wordt geel | Waarom je de tekst kunt vertrouwen |
| **Beheer** | Houd ik grip op klanten, team en kosten? | Eén account, eigen sleutels, rollen en een limiet | Wat het bureau regelt |

De drie perspectieven van AI, Werkwijze en Kwaliteit liggen dicht bij elkaar. Daarom is er een vaste regel nodig: **elke boodschap heeft één eigenaarspagina, de andere pagina's linken ernaar in één regel.** De verdeling staat in 3.4.

### 3.4 Wie is eigenaar van welke boodschap

| Boodschap | Eigenaar | Andere pagina's |
|---|---|---|
| AI doet het zware werk, mens beslist (wie doet wat) | AI | Link vanuit de hero van Werkwijze |
| Welke AI-stappen er zijn en wat elk oplevert | AI | Werkwijze noemt alleen de handeling van de gebruiker |
| Een cijfer met onzekerheidsmarge, herhaalde metingen, weging | AI (hoe het meet) en Werkwijze (hoe je het ziet) | Eén keer uitleggen op AI, op Werkwijze alleen het beeld |
| Waarom concurrenten winnen | Werkwijze, sectie Meten | AI noemt de AI-rol |
| De stappen en schermen van de kringloop | Werkwijze | Nergens anders herhalen |
| Eerst weten, dan schrijven (merkdossier, feitenstatus) | Kwaliteit | Werkwijze: één regel plus link |
| Gele zin, vangnet, wat code controleert | Kwaliteit | Werkwijze toont de handeling "Klopt of Vraag het bedrijf" één keer |
| Eindredactie | Kwaliteit | AI noemt hem in de taakverdeling |
| Klantinput via deellink zonder account | Werkwijze | Kwaliteit: alleen wat het antwoord met het feitenbestand doet |
| Maandverslag en bewijs aan de klant | Werkwijze | Beheer noemt alleen "met de naam van je bureau" |
| Werkoverzicht, rollen, kosten, sleutels, gegevens | Beheer | Werkwijze: één regel plus link |
| Kosten per knop en maandlimiet | Beheer | AI noemt "AI tegen kostprijs" in een tekstblok |

### 3.5 Wat het oplevert per rol in het bureau

Dit is de meerwaarde waarmee de pagina's verkopen. Het USP-document geeft de basis, hieronder staat welke pagina welk antwoord levert.

| Wie | Meerwaarde | Staat nu op | Zou moeten staan op |
|---|---|---|---|
| Bureau-eigenaar | Nieuwe terugkerende dienst, klanten die blijven, marge die van jou blijft | Nergens als verhaal | Werkwijze (bewijs), Beheer (marge), `/prijzen` |
| Accountmanager | Weten waar iets wacht, klant beantwoordt zelf, verslag voor het gesprek | Werkwijze en Beheer | Beheer en Werkwijze, goed zo |
| SEO-specialist | Zelfde methodiek uitbreiden naar AI: Search Console, zoekvolumes, technische check, interne links | Nauwelijks | AI (techniek) en Werkwijze |
| GEO-specialist | Meetmethode die standhoudt, bronnen en citaties, effect per pagina | Nauwelijks | AI en Werkwijze |
| Contentmarketeer | Brief, vragen aan de klant, eerste versie die al door een eindredacteur ging | Werkwijze en Kwaliteit | Kwaliteit en Werkwijze |
| De klant van het bureau | Meekijken, antwoorden op de telefoon, maandverslag | Werkwijze deels | Beheer (wat de kijker ziet) |

### 3.6 Het verhaal dat de pagina's mist

Het USP-document eindigt met een korte tekst "Een week uit het leven van een bureau" (Sanne, Bureau Noordwind, Lindeman Warmte). Dat is het sterkste verkoopverhaal dat er is, en het gebruikt precies de fictieve cast die de beelden al hebben. Het staat nu nergens op de site. Voorstel: gebruik het als de rode draad van de Werkwijze-pagina (zie 4.1), niet als apart blok.

---

## 4. Controle en advies per pagina

Per pagina: wat er nu staat, wat goed is, de bevindingen en het verbeterplan. Prioriteiten: P0 besluit eerst, P1 juistheid of ontbrekende kernboodschap, P2 structuur en volledigheid, P3 verfijning.

### 4.1 Werkwijze (`/product`)

**Huidige opbouw.** Hero met vijf stappen in de ronde (Meten, Plannen, Schrijven, Publiceren, Hermeten), daarna negen blokken: Zichtbaarheid, Bedrijfskennis, Planning, Klantinput, Schrijven en controleren, Publiceren, Opvolging, Rapportage en Bureauoverzicht en beheer, plus een afsluiter.

**Wat goed is.**
- De kop "Van AI-zichtbaarheid naar content die je kunt publiceren" en de ronde maken meteen duidelijk wat het is.
- De doorlopende case Lindeman Warmte, de beelden zijn nagebouwde echte schermen met dezelfde namen als in de app (Contentplan, Zoekverkeer, Maandverslag).
- Elk beeld heeft een eigen tekst, en "Voorbeeldgegevens" staat erbij.
- Eerlijke taal over publiceren: kopiëren, plaatsen, melden.

**Bevindingen.**

| # | Bevinding | Prio |
|---|---|---|
| W1 | **Volgorde.** De ronde heeft vijf stappen, de pagina negen blokken. De ronde linkt niet naar Bedrijfskennis, Klantinput, Rapportage en Bureau. Bedrijfskennis staat tussen Meten en Plannen, terwijl het in de app vóór het meten komt (onderzoek, dossier, kennismakingsgesprek, onderwerp). Klantinput is de voorbereiding van Schrijven, geen eigen stap | P1 |
| W2 | **Dubbel met Kwaliteit.** Sectie Bedrijfskennis (Merkstem, Feiten) is een kleine versie van het brein op `/kennis`. De cel "Controleer wat ertoe doet" toont dezelfde gele zin, dezelfde tekst en dezelfde knoppen als `GeleZin` op `/kennis`. "Eindredactie voor je akkoord" is het onderwerp van de Kwaliteit-pagina | P1 |
| W3 | **Dubbel met Beheer.** De laatste sectie (Werkoverzicht, Toegang, Kosten) komt op `/agency` terug, met dezelfde getallen (46 van 250 euro) en dezelfde persoon (Pieter Lindeman) | P1 |
| W4 | **Overdrijving.** Het paneel bij Zichtbaarheid zegt "Elke maand gemeten op dezelfde vragen". De maandmeting staat standaard uit. Het is waar nadat een beheerder hem heeft aangezet | P1 |
| W5 | **Ontbrekend: de meetmethode.** Geen woord over onzekerheidsmarge, over herhaalde metingen van de zwaarste vragen, over weging naar commerciële waarde, of over "telt mee: 6 van 18". Het USP "een meting die overeind blijft bij een kritische klant" staat nergens | P1 |
| W6 | **Ontbrekend in Meten:** de vragen langs de klantreis (dertig vragen, drie fasen, aanpasbaar), het bevestigen van het meetplan, waarom concurrenten winnen (eigenschappen, bronnen), positie en eerste aanbeveling, de kennistest, de technische check voor AI-crawlers | P1 |
| W7 | **Ontbrekend in Plannen:** de kans komt met bewijs (hoeveel vragen, welke concurrenten, is de eigen site aangehaald, vertoningen en klikken), nieuw tegenover verbeteren zonder dubbelingen, het jaarplan, vijf tot vijftig pagina's per maand, een eigen pagina-idee, de soorten pagina's | P2 |
| W8 | **Ontbrekend in Schrijven:** de brief met onderzoek, de schrijfpoort (de app schrijft vanzelf zodra alle vragen beantwoord zijn), de aanvullende onderdelen (metatitel, omschrijving, FAQ, gestructureerde gegevens, interne links), versies | P2 |
| W9 | **Publiceren is dun.** De titel "Jullie geven het akkoord" wisselt van "je" naar "jullie". De publicatiecontrole van de app ontbreekt: de app haalt het adres op, controleert of de tekst er staat en probeert het een uur later opnieuw. Dat is een sterk argument voor het bureau | P2 |
| W10 | **Hermeten overbelicht het positieve.** Het beeld toont 0 naar 3 naar 5 van acht vragen. De app zegt zelf bij weinig vragen "gelijk" of "te weinig gegevens" en noemt vanaf welk aantal vragen een verschil geen toeval meer is. Dat is een sterk vertrouwensargument: de app overdrijft zijn eigen effect niet. Het ontbreekt | P1 |
| W11 | **Maandmeting niet genoemd.** Het lopende ritme (elke maand opnieuw meten, trendlijn) komt niet voor, alleen de nameting na 14 en 28 dagen | P2 |
| W12 | **Hero.** De kop mist de lus en het bewijs: hij eindigt bij "content die je kunt publiceren". De sterkste belofte van de app is de stap erna: laten zien wat het opleverde. De beschrijving is een rij abstracte zelfstandige naamwoorden ("onderzoek, klantinput, beoordeling en opvolging samen") | P2 |
| W13 | **Taal.** "Teksten die klinken als je klant" is stelliger dan de app waarmaakt: toon is bewust geen vangnet in code (`/kennis` zegt dat zelf eerlijk bij "Jij beslist"). "Jullie" en "je" door elkaar | P2 |
| W14 | **Zoekverkeer.** "Bekijk met Google Search Console" klopt, maar zeg erbij dat het per klant gekoppeld moet worden en dat de eigenaar een serviceaccount-adres toevoegt. De app levert daar een kant-en-klare tekst voor | P3 |

**Voorstel voor de nieuwe opbouw.** Zes stappen, in de volgorde van de app, met de ronde als vaste kapstok. De pagina wordt korter (van negen naar zes blokken) en elke boodschap heeft één plek.

| Nr | Blok | Inhoud | Beelden | Wat verdwijnt of verhuist |
|---|---|---|---|---|
| 0 | Hero | Nieuwe kop (zie hieronder), ronde met zes stappen, hero-beeld HeroMaand | `HeroMaand` | |
| 1 | **Inrichten** | Naam en website, onderzoek van tien minuten, dossier nalopen, kennismakingsgesprek, eerste onderwerp kiezen. Eén regel naar Kwaliteit (het merkdossier) en naar AI (wat het onderzoek doet) | Nieuw: lijst "Dit bedrijf inrichten" met vinkjes | Sectie "Bedrijfskennis" gaat naar Kwaliteit |
| 2 | **Meten** | De vragen van je klanten langs de klantreis, het meetplan, een cijfer met marge, elk antwoord terug te lezen, waarom concurrenten winnen. Beschrijf dat de maandmeting een keuze is | `ZichtbaarheidGrafiek` (met margeband), `AiAntwoord`, `AandeelGenoemd`. Nieuw: kleine cel "33 met een marge van 22, telt mee 6 van 18" | |
| 3 | **Plannen** | Van gemiste vraag naar kans met bewijs, nieuw of verbeteren, jaarplan, pagina's per maand, eigen idee | `VanVraagNaarPagina`, `PaginaIdee`, `ContentplanBord` | |
| 4 | **Schrijven** | De brief, gerichte vragen die de klant op zijn telefoon beantwoordt, de schrijfpoort, de gele zin als handeling (Klopt of Vraag het bedrijf). Eén regel naar Kwaliteit voor het vangnet | `TekstFragment`, `VragenTeam`, `VragenKlant`, `ZinNalopen` | `Eindredactie` verhuist naar Kwaliteit. Klantinput wordt onderdeel van deze stap |
| 5 | **Publiceren** | Kopiëren, plaatsen, melden, en de publicatiecontrole van de app. Zeg eerlijk dat er geen CMS-koppeling is | `Publiceren` | |
| 6 | **Hermeten en laten zien** | Nameting na 14 en 28 dagen met eerlijk oordeel, klikken uit Google, maandverslag voor het klantgesprek | `Hermeting`, `Zoekverkeer`, `Maandverslag` | Sectie Rapportage wordt het slot van deze stap |
| 7 | Afsluiter plus "Verder in het product" met links naar AI, Kwaliteit en Beheer | | | Sectie "Bureauoverzicht en beheer" verdwijnt (staat op Beheer) |

**Kopvoorstellen voor de hero** (de beschrijving blijft kort en noemt de lus):

1. "Elke maand dezelfde ronde. Met bewijs aan het eind." (aanbevolen: kort, noemt het ritme en het bewijs)
2. "Van meting naar pagina naar bewijs, voor al je klanten."
3. "Meten, schrijven en aantonen wat het opleverde."

Beschrijving, voorbeeld: "Meet bij welke vragen AI-assistenten je klant noemen, laat de pagina's schrijven die daar verandering in brengen en laat na publicatie zien wat het deed. Elke klant doorloopt elke maand dezelfde vijf stappen."

**Tekstvoorstellen voor de ontbrekende boodschappen** (bronnen staan in hoofdstuk 2):

- Meten, paneel: "Een cijfer met een marge, zodat je weet wanneer een verschil echt is." Tekst: "ORBIT ENGINE stelt dezelfde vragen elke ronde, meet de zwaarst wegende vragen vaker en zet bij elk cijfer een onzekerheidsmarge. Antwoorden waarin AI geen enkele aanbieder noemt, tellen niet als verlies."
- Meten, cel: "Zie waarom een concurrent wordt genoemd." Tekst: "Per concurrent welke eigenschappen AI noemt, en welke websites en platforms de antwoorden aanhalen. Een startpunt voor pagina's en vermeldingen."
- Hermeten, cel: "Eerlijk over wat het effect is." Tekst: "Gestegen, gelijk of gedaald, en bij te weinig vragen zegt ORBIT ENGINE dat het nog niet te zeggen is. Een verschil binnen de marge is toeval, ook als het er mooi uitziet." Zet daaronder het voorbeeld dat bij vier vragen een stijging van 1 naar 3 nog "gelijk" heet: dat laat zien dat de app zijn eigen cijfer niet mooier maakt.
- Publiceren: "ORBIT ENGINE controleert of de tekst echt live staat, en probeert het een uur later opnieuw. Staat hij er wel, maar laat jouw site de controle niet binnen, dan bevestig je dat zelf."

**Let op bij Hermeten.** Noem de bewijsladder niet met zeven treden. Conversie en omzet worden niet gemeten. Spreek over "gepubliceerd, zichtbaar in Google, genoemd en geciteerd door AI en verkeer".

### 4.2 Kwaliteit (`/kennis`)

**Huidige opbouw.** Hero met vier stappen in de ronde (Het probleem, Het brein, Schrijven, Het vangnet). Zeven blokken: Probleem, Brein, Register (brein als tabel), Schrijven, Vangnet, Bijblijven en Eerlijk, plus afsluiter.

**Wat goed is.**
- De kop "AI die schrijft wat klopt. Niet wat goed klinkt." is de sterkste van de drie pagina's: concreet, een tegenstelling met inhoud.
- Het blok "Wat ORBIT ENGINE controleert. En wat jij beslist." is precies goed: eerlijk over de grenzen van de controle. Houd het.
- Het probleem in twee beelden naast elkaar ("Gewone AI" tegenover ORBIT ENGINE) is het duidelijkste kwaliteitsargument van de hele site.
- De afsluiter is specifiek voor deze pagina ("Bekijk in een demo hoe het brein van een van je klanten eruit zou zien").

**Bevindingen.**

| # | Bevinding | Prio |
|---|---|---|
| K1 | **Overdrijving in de hero.** "Elke bewering heeft een herkomst ... Je ziet het bij elke zin" en het beeld met een nummer en bron bij elke bewering. Ik vond in de app geen scherm dat per zin de bron toont. De app toont per feit de bron (Feiten en kennis) en per gele zin de reden. Pas de tekst en het beeld aan, of bouw de functie. De tekstvoorstellen staan hieronder | P1 |
| K2 | **Overdrijving in Schrijven.** "Elke bewering wijst naar een feit in het brein." In de code moet de schrijver een label meegeven en controleert code het voor bedragen, getallen, termijnen, garanties en keurmerken. Voor andere zinnen is het een instructie in de prompt. De sectie Eerlijk zegt het correct. Maak de eerdere tekst gelijk daaraan | P1 |
| K3 | **Dubbel met Werkwijze.** `GeleZin` is dezelfde kaart als `ZinNalopen` op `/product`. `AntwoordKlant` toont dezelfde situatie als `VragenKlant` | P1 |
| K4 | **Te smal voor "kwaliteit van de gegenereerde content".** De pagina behandelt feitelijke juistheid. De rest van wat kwaliteit uitmaakt komt niet voor: stem en toon (aanspreekvorm, kenmerkende zinnen, verboden woorden), de brief met onderzoek, informatie die alleen de klant heeft, de volledige oplevering (metatitel, omschrijving, FAQ, gestructureerde gegevens, interne links), de eindredacteur, versies en de vingerafdruk bij goedkeuring | P2 |
| K5 | **De eindredactie ontbreekt hier.** De eindredacteur is een tweede AI-aanroep die hooguit twintig correcties doet, geen nieuwe beweringen mag toevoegen en niet meer dan 60 procent van de tekst mag veranderen. Dat staat nu alleen als kleine cel op `/product` | P2 |
| K6 | **Ronde klopt niet met de pagina.** De ronde heeft vier stappen, de pagina zeven blokken. "Register", "Bijblijven" en "Eerlijk" staan niet in de ronde | P2 |
| K7 | **Twee blokken over hetzelfde.** Brein en Register beschrijven samen één onderwerp (het feitenbestand). Een lezer ziet het als herhaling | P2 |
| K8 | **Begrip "het brein".** De app heet het scherm Feiten en kennis en het geheel merkdossier. "Brein" komt in de app niet voor, en de homepage zegt weer "Brand Intelligence Brain". Eén begrip per ding, en de schermnaam van de app moet terug te vinden zijn | P2 |
| K9 | **Geen bewijs buiten de uitleg.** Er is geen voorbeeld van een complete opgeleverde pagina en geen enkel getal. Dat past bij de huidige stand (de uitvoer is nog niet met echte aanroepen getoetst), maar het is het gat dat de pagina minder overtuigend maakt dan hij zou kunnen zijn | P2 |
| K10 | **Titel en label.** Het menu zegt Kwaliteit, de pagina "Kennis en feiten", de URL `/kennis`. `/kennisbank` bestaat ook en betekent iets anders | P2 |
| K11 | **Wat het niet claimt maar wel zou kunnen.** Alle beweringen over harde feiten staan in code en worden bewaakt door tests. Dat mag de pagina zeggen, zolang de tekst "de regels" noemt en niet "de kwaliteit van de AI-tekst". De documentatie zegt zelf dat de tests de kwaliteit van de uitvoer niet bewijzen | P3 |

**Tekstvoorstellen om K1 en K2 recht te zetten.**

- Hero, beeldtitel nu: "Elke bewering heeft een herkomst". Voorstel: "Elke harde bewering heeft een bron". Tekst: "Bedragen, termijnen, garanties en keurmerken komen uit wat je klant vertelde, uit een document of van de website. Staat er geen bron, dan wordt de zin geel."
- Hero, beeld: laat een tekst zien met twee zinnen waar de bron in een zijpaneel staat en één gele zin, zoals de goedkeuring dat in de app doet. Of laat het beeld het scherm Feiten en kennis zijn met bron per regel. Beide bestaan in de app.
- Schrijven, tekst nu: "Bij elke bewering moet hij aangeven op welk feit die rust, en ORBIT ENGINE controleert of dat ook echt zo is." Voorstel: "De AI die de pagina schrijft, krijgt alleen de feiten die mogen. Bij elke zin geeft hij aan waarop die rust, en code controleert dat voor bedragen, getallen, termijnen, garanties en keurmerken."
- Schrijven, punt "Elke bewering wijst naar een feit in het brein". Voorstel: "Elke zin met een bedrag, termijn of garantie wijst naar een feit".

**Voorstel voor de nieuwe opbouw.** De pagina gaat over vijf kwaliteiten van een tekst, in een volgorde die het verhaal laat lopen van juist naar eerlijk.

| Nr | Blok | Inhoud | Beelden | Waar het nu staat |
|---|---|---|---|---|
| 0 | Hero (kop houden) | Ronde met alle blokken, hero-beeld met bron per harde bewering of per feit | `HeroHerkomst` (aangepast) | |
| 1 | **Juist: het probleem** | AI verzint met dezelfde stelligheid als waarmee het feiten noemt | `GewoneAi` tegenover `OrbitTekst` | Blok Probleem, houden |
| 2 | **Juist: eerst weten** | Eén blok over het feitenbestand: van binnen en van buiten, elk feit met bron en zekerheid, een vermoeden blijft een vermoeden, geen bewijs geen feit | `BreinSchema`, `BreinTabel`, `Vermoeden`, `Bewijs` | Brein en Register samenvoegen |
| 3 | **Compleet: alleen de klant weet het** | De brief, gerichte vragen (hooguit acht), antwoorden worden feiten, nooit twee keer dezelfde vraag | Nieuw: beeld van de brief of het feit dat uit een antwoord ontstaat | Nieuw, uit Werkwijze |
| 4 | **Eigen: de stem van je klant** | Aanspreekvorm, toon, verboden woorden, concurrentnamen. Wat code afdwingt en wat de mens beslist | `Merkstem` (verhuist hierheen van Werkwijze) | Nieuw |
| 5 | **Gecontroleerd: het vangnet** | Wat geel wordt (bedrag, termijn, garantie, keurmerk, getal dat niet in de bron staat), goedkeuren pas als alles bevestigd is, een goedkeuring hoort bij de inhoud | Nieuw: lijst van wat geel wordt, met voorbeeldzinnen. `GeleZin` blijft alleen op Werkwijze | `GeleZin` en `AntwoordKlant` |
| 6 | **Gecontroleerd: de eindredactie** | Tweede AI-aanroep, hooguit twintig correcties, mag niets nieuws beweren, niet meer dan 60 procent veranderen, nooit over een menselijke bewerking heen | `Eindredactie` (verhuist hierheen) | Nieuw, uit Werkwijze |
| 7 | **Compleet: wat er in een pagina zit** | Titel, metatitel, omschrijving, tekst, FAQ, gestructureerde gegevens, interne links, versies | Nieuw: oplevering-paneel | Nieuw |
| 8 | **Actueel: een feitenbestand dat bijblijft** | Tegenstrijdigheden, verlopen feiten, kenniswijziging geeft een melding | `Tegenstrijdig`, `Verloopt` | Blok Bijblijven, houden |
| 9 | **Eerlijk** | Wat ORBIT ENGINE controleert en wat jij beslist | Twee kolommen (bestaat) | Blok Eerlijk, houden en laten eindigen met "toon en overtuigingskracht beoordeelt jij" |
| 10 | Afsluiter plus "Verder in het product" | | | |

Het aantal blokken blijft negen en elk blok heeft één idee, wat de lijn van de eerste regel ("Eerst weten, dan pas schrijven") bewaart. Blok 6 en 7 kunnen in één sectie met twee cellen als de pagina te lang wordt.

**Over het bewijs.** Zodra er een echte proefronde is gedaan, vervang de fictieve case door één echte, geanonimiseerde pagina met haar gele zinnen. Dat is het sterkste argument dat de pagina kan krijgen. Tot die tijd: noem geen kwaliteitscijfers en gebruik de zin "Alle regels staan in code en worden getest" in plaats van "betrouwbare AI-tekst".

### 4.3 Beheer (`/agency`)

**Huidige opbouw.** Hero met zes stappen in de ronde (Overzicht, Klanten, Team, Kosten, Sleutels, Gegevens), een strook met vier USP's, zes blokken (Werkoverzicht, Klanten toevoegen, Team en kijkers, Kosten, Sleutels en Gegevens) en een afsluiter.

**Wat goed is.**
- Dit is de best afgeronde pagina: één onderwerp, een ronde die precies de blokken volgt, en een afsluiter die past bij het onderwerp.
- De kop "Al je klanten in één account. Jij houdt de regie." is concreet.
- Hij is eerlijk over wat er in de app staat: "Zonder geschiedenis staat er geen verzonnen bedrag, maar 'nog geen schatting'" is precies het soort zin dat vertrouwen wekt.
- Het blok Gegevens (archiveren en verwijderen) is een argument dat concurrenten niet noemen.

**Bevindingen.**

| # | Bevinding | Prio |
|---|---|---|
| B1 | **Dubbel met Werkwijze.** Werkoverzicht, rollen en kosten komen op `/product` in dezelfde vorm voor. Het is de pagina die ze moet bezitten | P1 |
| B2 | **De USP-strook herhaalt de blokken.** "Onbeperkt klanten", "Rollen per persoon", "Eigen sleutels" en "Een harde maandlimiet" staan in de strook, dezelfde onderwerpen zijn daarna een sectietitel. "Eigen sleutels" staat zelfs drie keer (hero-beschrijving, strook, sectie). Houd de strook en maak de hero-beschrijving korter | P2 |
| B3 | **"Harde maandlimiet".** De limiet stopt nieuw betaald werk, ook automatisch werk. Een taak die al loopt, maakt haar werk af, dus het verbruik kan de limiet iets overschrijden (zo staat het in de documentatie). Voorstel: "Een maandlimiet die nieuw werk stopt" | P1 |
| B4 | **"Wat geld kost, blijft altijd bij een beheerder".** Er is één uitzondering: een kijker met het recht "materiaal toevoegen" laat een model kennis uit een document halen, voor een paar cent, binnen de maandlimiet. Voorstel: "Alles wat een meting, een tekst of een onderzoek start, blijft bij een beheerder" | P2 |
| B5 | **"De uitnodiging gaat per mail".** Mail gaat alleen uit als de eigenaar mail aanzet en een Resend-sleutel invult. De link staat altijd op het scherm. Voorstel: "De uitnodiging gaat per link, en per mail zodra die aanstaat" | P1 |
| B6 | **Sleutels.** De tekst zegt "OpenAI, Gemini en DataForSEO", alsof ze alle drie nodig zijn. OpenAI is verplicht, Gemini en DataForSEO zijn optioneel (Google AI Overview, zoekvolume, clusters ontdekken). Zeg het | P2 |
| B7 | **Ontbreekt: hoe begin je.** Het USP-document eindigt met vijf stappen (bureau aanmelden, sleutel invullen, collega's uitnodigen, eerste klant, eerste onderwerp). Voor een bureau dat nog moet beslissen is "niets te installeren, uitnodiging per mail" een belangrijk argument. Het staat nergens | P2 |
| B8 | **Ontbreekt: wat ziet de klant als kijker.** Er is een blok over rechten, maar de klant ziet nergens zijn eigen scherm: alleen zijn bedrijf, uitleg in gewone taal, een eigen rondleiding. USP 6 "Je klant kijkt mee" krijgt zo geen beeld | P2 |
| B9 | **Ontbreekt: Systeemstatus en meldingen.** Gaat er iets mis, dan staat er in gewone taal wat er gebeurde en wat je eraan doet. De app heeft ook een meldingenpaneel, per klant of voor alles. Dat verkoopt rust | P3 |
| B10 | **Ontbreekt: Search Console koppelen.** Per klant met een kant-en-klare tekst om naar de klant te sturen. Voor Werkwijze of Beheer, maar nu op geen van beide | P3 |
| B11 | **Ontbreekt: eerlijk over toegang.** De pagina zegt terecht dat andere bureaus niets zien. De eigenaar van ORBIT ENGINE kan een bureau openen om te helpen, en dat verschijnt in de geschiedenis onder de naam "ORBIT ENGINE". Het USP-document noemt dat in de veelgestelde vragen. Wie dit niet leest en het later ontdekt, voelt zich misleid. Eén zin volstaat | P2 |
| B12 | **Ontbreekt: wat kost ORBIT ENGINE zelf.** De pagina praat over AI-kosten, maar niet over wat het gebruik van de app kost. `/prijzen` is leeg. Dat is het eerste wat een bureau-eigenaar vraagt | P0 |
| B13 | **Beveiliging niet breder claimen dan gebouwd.** De pagina zegt niets onjuists. Houd dat zo: er is geen tweestapsverificatie en geen inloggen via een externe dienst. Noem scheiding tussen bureaus, versleutelde sleutels en rijbeveiliging, en vermijd woorden als "veilig" of "AVG-proof" | P3 |
| B14 | **Het woord "klant".** De app noemt een bedrijf nooit een klant, omdat "klant" voor de klanten van het bedrijf bedoeld is. Op de marketingsite spreekt "klant" het bureau goed aan. Kies bewust en houd het gelijk op alle pagina's | P3 |
| B15 | **Titel.** Paginatitel "Account en beheer", menu "Beheer", URL `/agency` | P2 |

**Voorstel voor de nieuwe opbouw.** Kleine wijzigingen, vooral toevoegingen. De volgorde volgt de ervaring van een beheerder: eerst starten, dan dagelijks, dan wekelijks, dan zelden.

| Nr | Blok | Inhoud | Beelden | Status |
|---|---|---|---|---|
| 0 | Hero | Kop houden, beschrijving korter, ronde van zes naar zeven stappen | `HeroWerkoverzicht` | Bestaat |
| 1 | USP-strook | Vier punten, korter en zonder herhaling | | Bestaat, aanpassen |
| 2 | **Zo begin je** | Bureau aanmelden, sleutel, collega's, eerste klant, eerste onderwerp. "Niets te installeren" | Nieuw: vijf stappen als lijst | Nieuw (B7) |
| 3 | **Werkoverzicht** | Wat het langst wacht staat bovenaan, maand starten voor meerdere klanten | `LangstWacht`, `MaandStarten` | Bestaat |
| 4 | **Klanten toevoegen** | Naam en website, standaarden. Het onderzoeksbeeld (`Onderzoek`) verhuist naar de AI-pagina | `NieuwMerk`, `BeheerBedrijven` | Aanpassen |
| 5 | **Team en kijkers** | Rollen, uitnodigen, rechten, en het scherm van de kijker | `Gebruikers`, `Uitnodigen`, `KijkerRechten`. Nieuw: het scherm van een kijker | Uitbreiden (B8) |
| 6 | **Kosten en sleutels** | Eén blok: eigen sleutels, kosten vooraf, maandlimiet, kosten per klant. Bij sleutels: OpenAI verplicht, de rest optioneel | `BeheerKosten`, `PrijsBijKnop`, `KostenPerKlant`, `Sleutels` | Samenvoegen |
| 7 | **Als er iets misgaat** | Systeemstatus in gewone taal, meldingen | Nieuw | Nieuw (B9) |
| 8 | **Gegevens** | Archiveren, verwijderen, bewaartermijnen, eerlijke zin over de toegang van de eigenaar | `Archief`, `Verwijderen` | Uitbreiden (B11) |
| 9 | Afsluiter plus "Verder in het product" | Link naar `/prijzen` | | Aanpassen |

### 4.4 Wat de drie pagina's samen nog missen

Dit zijn de boodschappen uit de USP-lijst die op geen enkele pagina staan. Dit is het belangrijkste deel van het verbeterplan, omdat het onderdelen zijn waar een concurrent mee kan worden vergeleken.

| Boodschap | USP | Beste plek | Opmerking |
|---|---|---|---|
| Een cijfer met onzekerheidsmarge, herhaalde metingen, weging naar waarde | 16, 17 | AI (hoe), Werkwijze Meten (beeld) | Kernargument voor een bureau met een kritische klant |
| Waarom concurrenten winnen (eigenschappen, bronnen, citaties, positie) | 19 tot 21 | Werkwijze Meten, AI | Per concurrent en per bron |
| Meet in de klantreis (oriëntatie, overweging, beslissing) | 14 | Werkwijze Meten | Antwoord op "doen we ook mee op het koopmoment" |
| Kennistest: wat weet AI al over je klant | 22 | AI | Opent elk klantgesprek |
| Technische check: mag ChatGPT de site lezen | 36 | AI of Werkwijze Meten | Past in een audit |
| Reputatiemeting per product | 22 | AI | Optioneel, apart onderzoek |
| Elk antwoord terug te lezen, met bronnen | 18 | Werkwijze Meten | Staat deels erbij |
| Jaarplan van twaalf maanden en pagina's per maand | 39, 40 | Werkwijze Plannen | Past bij het contract |
| Nieuwe en verbeterde pagina's zonder dubbelingen | 38 | Werkwijze Plannen | |
| Eigen pagina-idee zonder onderzoekskosten | 42 | Werkwijze Plannen | |
| Soorten pagina's (dienst, uitleg, gids, FAQ, vergelijking) | 43 | Werkwijze Schrijven of Kwaliteit | |
| Kennismakingsgesprek legt doelen vast die een website niet vertelt | 32 | Werkwijze Inrichten | Stuurt de prioriteit van kansen |
| Onderzoek opnieuw laten lopen zonder dat handwerk verdwijnt | 33 | Kwaliteit (Bijblijven) | |
| Materiaal uploaden (brochure, tarievenlijst) | 34 | Kwaliteit | |
| Vakkennis die per branche hergebruikt wordt, zonder dat onderzoek tussen bureaus gedeeld wordt | 35 | Kwaliteit | Let op de eerlijke grens |
| Publicatiecontrole | 55 | Werkwijze Publiceren | |
| Eerlijk effectoordeel, met drempel en aantal vragen | 57 | Werkwijze Hermeten | |
| Opbrengst telt alleen pagina's die ORBIT ENGINE schreef | 60 | Werkwijze Hermeten | Dat is wat de Zoekverkeer-pagina al doet |
| Niets te installeren, hosted, uitnodiging per mail | 69 | Beheer | |
| Alles op de achtergrond, laptop dicht, nooit dubbel betalen | 70, 71 | AI | |
| Nederlands van begin tot eind, met plaatsnamen | 73 | AI | |

Volledige koppeling van alle 73 punten: bijlage B.

---

## 5. De AI-pagina: voorstel

### 5.1 Doel en afbakening

**De vraag die de pagina beantwoordt:** "Wat doet AI in ORBIT ENGINE voor mijn bureau, en waar houdt het op?"

De pagina verschilt van de andere drie op één punt: zij is geordend naar **wie het werk doet**, niet naar stap (Werkwijze), niet naar feiten (Kwaliteit) en niet naar beheer. De lezer ziet wat AI overneemt, wat code bewaakt en wat hij zelf in handen houdt. Dat is het enige dat precies deze pagina kan vertellen, en het is ook wat ORBIT ENGINE onderscheidt van een gewone AI-schrijftool: de app zegt waar AI mag meedenken en waar code eroverheen zit.

**Kernboodschap:** *De snelheid van AI, zonder het risico.*

**Wat de lezer na het lezen weet:**
1. AI doet de onderzoeks-, meet- en schrijfklussen die per klant uren kosten, en het loopt op de achtergrond.
2. Elk cijfer heeft een marge en elke harde bewering een bron, omdat code de AI controleert.
3. Er gaat niets live en geen feit de tekst in zonder dat een mens het bevestigd heeft.
4. De AI-kosten liggen op eigen sleutels, vooraf zichtbaar en begrensd.

**Wat niet op de pagina hoort** (het staat al elders): de stappen en schermen van de maand (Werkwijze), de uitgebreide uitleg van gele zinnen en feitenstatus (Kwaliteit), de rollen, sleutels en kostenschermen (Beheer). De AI-pagina linkt erheen.

### 5.2 Opbouw, naar linear.app/ai

De bestaande aanzet (hero met achtergrondvideo, daarna een intro met titel links en tekst rechts) is al de opbouw van linear.app/ai. Linear laat daarna per onderdeel een kop met korte beschrijving zien, met twee beelden eronder, één tekstblok zonder beeld, een rij van vier kaarten naar andere productpagina's en een afsluiter. ORBIT ENGINE volgt dat:

| Nr | Blok | Opbouw | Inhoud |
|---|---|---|---|
| 1 | **Hero** | Eyebrow, kop, korte beschrijving, twee knoppen, achtergrondvideo (bestaat) | Zie 5.3 |
| 2 | **Intro** | Titel links, tekst rechts, zoals nu in `AiPagina` | Waarom AI hier het zware werk doet |
| 3 | **Wie doet wat** | Groot Paneel met een tabel: stappen onder elkaar, drie kolommen AI, Code en Jij | Het kernbeeld van de pagina, zie 5.4 |
| 4 | **AI als onderzoeker** | Kop plus twee Cellen | Het bedrijf leren kennen, en wat AI al over het bedrijf weet |
| 5 | **AI als meter en analist** | Kop plus twee Cellen | De klantreis-vragen, het beoordelen van antwoorden, waarom concurrenten winnen |
| 6 | **AI als schrijver en eindredacteur** | Kop plus twee Cellen | Brief, gerichte vragen, schrijven, een tweede AI die meeleest |
| 7 | **Wat AI niet doet** | Twee kolommen, zoals `kf-honest` op `/kennis` | Grenzen van meting en analyse |
| 8 | **AI tegen kostprijs** | Alleen tekst met vinkjes, zonder beeld (zoals Linear "Save reusable skills") | Eigen sleutels, kosten vooraf, maandlimiet, nooit dubbel betalen |
| 9 | **De maker** | Korte quote met foto, zoals op de homepage | Het oog van een analist: geen cijfer zonder marge |
| 10 | **Verder in het product** | Rij van drie kaarten met afbeelding en titel | Werkwijze, Kwaliteit, Beheer |
| 11 | **Afsluiter** | Kop, korte tekst, knoppen | Zie 5.3 |

Het zijn elf blokken, de middelste drie hebben een vaste herhalende opbouw (Kop, twee Cellen). Dat is korter dan Linear en past bij de overige pagina's.

### 5.3 Tekstvoorstel

De teksten volgen de woordenlijst van de app (AI-vragen, geen "prompts"; "pagina's of teksten", geen "content"; "ORBIT ENGINE", niet "de schrijver"; "je" en "jij") en de schrijfstijl van de site: geen gedachtestreepjes, geen opgeblazen beloften, concreet.

**Hero**

- Eyebrow: AI in ORBIT ENGINE
- Kop (aanbevolen): **AI doet het werk. Jij beslist wat er live gaat.**
- Alternatieven: "AI die onderzoekt, meet en schrijft. Onder jouw controle." of "Alle AI die je bureau nodig heeft, met een controle erover."
- Beschrijving: "ORBIT ENGINE zet AI in waar het uren scheelt: een klant onderzoeken, AI-vragen bedenken, meten wat AI-assistenten antwoorden, uitzoeken waarom een concurrent wordt genoemd en een pagina schrijven. Code controleert wat een model niet mag beloven. Jij keurt goed."
- Knoppen: Demo aanvragen, en de tweede knop "Zie wie wat doet" die naar blok 3 springt.

**Intro (blok 2)**

- Titel: "De snelheid van AI. Zonder het risico."
- Tekst: "Een bureau dat AI-zichtbaarheid verkoopt, moet veel klanten tegelijk onderzoeken, meten en van pagina's voorzien. Dat lukt alleen als AI het zware werk doet. Het lukt pas met vertrouwen als elk cijfer een marge heeft en elke harde bewering een bron."

**Blok 3: Wie doet wat**

- Kop: "Drie partijen, elk met een eigen taak."
- Beschrijving: "AI onderzoekt, meet en schrijft. Code controleert wat een model niet mag beloven. Jij beslist wat er waar is en wat er live gaat."
- Het beeld: zie 5.4.

**Blok 4: AI als onderzoeker**

- Kop: "AI leert je klant kennen in ongeveer tien minuten."
- Beschrijving: "Naam en website zijn genoeg. ORBIT ENGINE leest de website, brengt aanbod, doelgroep, concurrenten en markt in kaart en legt vast wat het vond, met de bron erbij. Het onderzoek loopt op de achtergrond."
- Cel 1, "Van website naar merkdossier": "Aanbod, werkgebied, doelgroep, toon en concurrenten staan na een onderzoek klaar. Wat jij daarna invult of verbetert, blijft staan als het onderzoek opnieuw loopt."
- Cel 2, "Wat weet ChatGPT al over je klant?": "De kennistest stelt AI-assistenten vragen over het bedrijf, met en zonder zoeken op het web, en laat zien wat klopt. 'ChatGPT denkt dat jullie in Eindhoven zitten' opent elk klantgesprek."

**Blok 5: AI als meter en analist**

- Kop: "AI stelt de vragen die jouw klanten stellen."
- Beschrijving: "Per onderwerp stelt ORBIT ENGINE standaard dertig AI-vragen op, verdeeld over oriëntatie, overweging en beslissing. Elke vraag stelt het aan een AI-assistent met zoeken op het web. Een tweede AI-stap beoordeelt wie er genoemd wordt. De rekensom daarna is van code, met een marge bij elk cijfer."
- Cel 1, "Vragen langs de klantreis": "Zo zie je of je klant alleen meedoet in de uitlegfase, of ook als de koper kiest. Elke vraag is aan te passen, uit te zetten of aan te vullen."
- Cel 2, "Zie waarom een concurrent wordt genoemd": "Welke eigenschappen AI aan concurrenten toeschrijft en welke websites en platforms de antwoorden aanhalen. Direct een startpunt voor pagina's en vermeldingen."

**Blok 6: AI als schrijver en eindredacteur**

- Kop: "AI schrijft de eerste versie. Een tweede AI leest mee."
- Beschrijving: "Voor elke pagina doet ORBIT ENGINE eerst onderzoek, stelt het gerichte vragen aan je klant en schrijft het pas als de antwoorden er zijn. Daarna loopt een eindredacteur de tekst na. Hij verbetert alleen wat nodig is en mag niets nieuws beweren."
- Cel 1, "Alleen vragen die je klant kan beantwoorden": "Prijzen, werkwijze en voorbeelden uit de praktijk vraagt ORBIT ENGINE gericht, hooguit acht per pagina. Wat eenmaal beantwoord is, vraagt het nooit opnieuw."
- Cel 2, "Een eindredacteur met een rem": "De eindredacteur doet hooguit twintig correcties. Code weigert een correctie die een nieuwe bewering, een verboden woord of een concurrentnaam toevoegt, of die meer dan 60 procent van de tekst verandert."
- Eén regel onderaan met link: "Hoe de feiten bewaakt worden: Kwaliteit."

**Blok 7: Wat AI niet doet**

- Kop: "Eerlijk over wat AI hier niet beslist."
- Beschrijving: "Een AI-oordeel is een aanwijzing, geen bewijs. Daarom zegt ORBIT ENGINE erbij waar de grenzen liggen."
- Kolom "AI en code doen": "Onderzoeken en vragen bedenken. Antwoorden beoordelen. Marges en aandelen uitrekenen. Een pagina schrijven en nalezen. Het effect na 14 en 28 dagen vergelijken."
- Kolom "Jij beslist": "Of een vermoeden een feit is. Of een tekst past bij het merk en overtuigt. Wanneer een pagina live gaat, want ORBIT ENGINE zet niets op een website. Wat je aan je klant vertelt als een verschil binnen de marge valt."
- Grenzen van het cijfer, als losse regel of vierde kolom: "Het hoofdcijfer rust op ChatGPT. Het zoekvolume dat de weging bepaalt is een schatting. Het effect van een pagina is een vergelijking vóór en na, zonder controlegroep: een algemene verschuiving in AI-antwoorden kan meespelen."

**Blok 8: AI tegen kostprijs** (tekst met vinkjes, zonder beeld)

- Kop: "Je betaalt de AI zelf, tegen kostprijs."
- Beschrijving: "Het werk draait op de eigen sleutels van je bureau. De kosten gaan rechtstreeks naar de dienst, zonder opslag."
- Punten: "Bij elke betaalde knop staat vooraf wat het ongeveer kost." / "Een maandlimiet stopt nieuw betaald werk." / "Elke stap kijkt eerst of zijn resultaat al bestaat, dus dubbelklikken kost niets extra." / "Alles loopt op de achtergrond. Sluit je laptop gerust." / "Alles in het Nederlands, met plaatsnamen en werkgebieden."
- Link: "Zie hoe je de kosten beheert: Beheer."

**Blok 9: De maker**

- Quote: "[aanleveren door de eigenaar] Geen cijfer zonder onzekerheidsmarge en geen effect dat niet boven de meetruis uitkomt." Basis uit het USP-document: Jan-Willem Koopman, tien jaar marketing data analist. Gebruik een echte quote van hem, niet een samenvatting van mij.

**Blok 10: Verder in het product** (drie kaarten, zoals Linear onderaan zijn pagina's linkt)

- Werkwijze: "Van AI-vraag tot gepubliceerde pagina, en het effect erna"
- Kwaliteit: "Alleen feiten met een bron, nooit een verzonnen belofte"
- Beheer: "Je klanten, je team en je kosten samen in één account"

Gebruik de bestaande menuteksten uit `lib/site.ts`, dan blijven ze consistent.

**Afsluiter**

- Kop: "Zie hoe AI jouw klant meet."
- Tekst: "Bekijk in een demo hoe een onderzoek, een meting en een pagina eruitzien voor een van je eigen klanten."
- Knop: Demo aanvragen.

### 5.4 De beelden

Alle beelden worden nagebouwd in `components/ai/Visuals.tsx`, zoals bij de andere pagina's, uit de bestaande bouwblokken (`Kop`, `Cel`, `Paneel`, `Splitsing`, `Chip`, `Knop`, `Mono`, `Icon`, `Venster`). Geen nieuwe kleuren of stijlen. De richtlijnen uit `CLAUDE.md` gelden: donker, 1px translucente randen, geen gradients buiten de hero.

| Blok | Beeld | Inhoud | Hergebruik of nieuw |
|---|---|---|---|
| 1 | Achtergrondvideo | De hero van `/ai1` of `/ai2`, maar zonder de Linear-tekst. Kies één variant en verwijder de rest | Bestaat. Zie 5.5 |
| 3 | **Wie doet wat** (`Paneel`, variant `screen` of `list`) | Een tabel met negen rijen en drie kolommen: AI, Code, Jij. Rijen: Onderzoeken, Vragen opstellen, Meten, Analyseren, Voorbereiden, Schrijven, Eindredactie, Publiceren, Nameten. Bij Publiceren staat in de AI-kolom "doet niets" | Nieuw. Dit is het kernbeeld |
| 4 | Cel 1 | Voortgang van het onderzoek van een bedrijf (website, merk, aanbod, onderwerpen, markt) | `Onderzoek` van `/agency` (verhuist) |
| 4 | Cel 2 | Kennistest: drie uitspraken van ChatGPT over het bedrijf, elk met "klopt" of "klopt niet" | Nieuw |
| 5 | Cel 1 | Vragenlijst met drie fasen en een paar vragen, aan te passen | Nieuw |
| 5 | Cel 2 | Per concurrent de eigenschappen die AI noemt en de bronnen | Nieuw. `AiAntwoord` blijft op Werkwijze |
| 6 | Cel 1 | Een openstaande vraag met reden erbij | Gedeeltelijk uit `VragenTeam`, maar anders getoond zodat het geen dubbeling is |
| 6 | Cel 2 | Eindredactie: correcties die zijn doorgevoerd, en één correctie die is geweigerd omdat hij een nieuwe bewering toevoegt | Nieuw, op basis van `Eindredactie` |
| 7 | Twee kolommen | Tekstlijst, zoals `kf-honest` op `/kennis` | Hergebruik van de opmaak |

De matrix van blok 3 is de signature van de pagina. Voorbeeld van de inhoud, met teksten die de app bevestigt:

| Stap | AI | Code | Jij |
|---|---|---|---|
| Onderzoeken | Leest de website, bouwt dossier, aanbod, concurrenten en markt | Een feit van de website telt alleen met een letterlijk citaat. Een vermoeden blijft een vermoeden | Loopt het dossier na, legt het kennismakingsgesprek vast |
| Vragen opstellen | Bedenkt dertig AI-vragen langs de klantreis | Ontdubbelt, bewaakt het aantal per fase, houdt de vragen merkneutraal | Past aan, zet uit, voegt eigen vragen toe |
| Meten | Stelt de vragen aan een AI-assistent met zoeken op het web en beoordeelt wie er genoemd wordt | Rekent zichtbaarheid, marge en aandeel uit. Antwoorden zonder aanbieder tellen niet als verlies | Kiest de kanalen, zet de maandmeting aan |
| Analyseren | Zoekt uit waarom concurrenten genoemd worden en stelt pagina's voor | Haalt onbewezen beweringen uit de uitslag en voegt overlappende voorstellen samen | Kiest en plant |
| Voorbereiden | Onderzoekt wat er op de pagina moet en stelt hooguit acht vragen | Schrijft pas als alle vragen beantwoord zijn en de datum binnen tien dagen ligt | Jij of je klant beantwoordt de vragen |
| Schrijven | Schrijft titel, tekst, FAQ en gestructureerde gegevens | Markeert harde beweringen zonder bron geel, houdt verboden woorden en concurrentnamen eruit | Bevestigt gele zinnen of vraagt het bedrijf |
| Eindredactie | Leest mee en verbetert alleen wat nodig is | Weigert een correctie met een nieuwe bewering of meer dan 60 procent verandering | Keurt goed of vraagt een aanpassing |
| Publiceren | Doet niets | Controleert of de tekst echt live staat, met een tweede poging een uur later | Kopieert, plaatst en meldt het adres |
| Nameten | Meet de doelvragen na 14 en 28 dagen opnieuw | Vergelijkt met vóór publicatie en zegt gestegen, gelijk, gedaald of te weinig gegevens | Bespreekt het resultaat met de klant |

Dit is geen decoratie: elke cel in deze tabel is een controleerbare uitspraak uit de documentatie of de code. Als een cel niet meer klopt, is de pagina verouderd. Zet daarom in de code (`content/ai.ts`) bij elke rij een korte verwijzing naar de bron.

### 5.5 Technisch en ontwerp

| Onderwerp | Advies |
|---|---|
| Bestanden | `app/ai/page.tsx`, `content/ai.ts` (alle teksten, zoals `content/product.ts`), `components/ai/Visuals.tsx`. Hergebruik `components/product/Blokken.tsx` en `app/product/product.css` |
| `AiPagina.tsx` | Houd de hero en de intro. Haal de Engelse tekst eruit, de schakelaar tussen varianten (`.ai-switch`) en de variantenlijst. Verplaats de teksten naar `content/ai.ts` |
| Hero-video | Kies één variant en verwijder de rest. Er staat nu 39 MB aan test- en variantvideo's in `public/video`. Voor de lancering is één variant genoeg, in de drie bestaande formaten (AV1, VP9, H264) |
| Video en toegankelijkheid | De video is decoratief en heeft al `aria-hidden`, `muted`, `playsInline`, `inert`. Zorg dat `prefers-reduced-motion` de video vervangt door de posterfoto |
| Meta | Titel "AI", beschrijving en OG-afbeelding zoals bij de andere pagina's (`public/images/product/og-ai.png`). Haal `robots: noindex` weg bij de lancering en neem `/ai` op in `app/sitemap.ts` |
| Woordgebruik | Gebruik de woordenlijst van de app: AI-vragen, pagina's of teksten, ORBIT ENGINE (niet "de schrijver"), geen "en/of" en geen gedachtestreepjes |
| Voorbeeldgegevens | Elk beeld met label "Voorbeeldgegevens" en dezelfde fictieve case (Lindeman Warmte, Bureau Noordwind), zoals op de andere pagina's |
| Modelnamen | Noem geen modelnamen. De modelnamen in de code zijn volgens de documentatie ongeverifieerd en kunnen wisselen |
| Cijfers | Noem geen kosten en tijdwinst in getallen tot de proefronde klaar is (zie 5.6). Gebruik "ongeveer tien minuten" voor het onderzoek, dat staat in de app zelf |

### 5.6 Wat de pagina pas mag beloven na de proefronde

De documentatie (hoofdstuk 13 en 16) zegt dat de modellen, de kosten en de kwaliteit van de uitvoer nog nooit met echte betaalde aanroepen zijn getoetst. Dat beïnvloedt wat de AI-pagina mag zeggen.

| Bewering | Mag nu | Pas na proefronde |
|---|---|---|
| "AI onderzoekt het bedrijf in ongeveer tien minuten" | Ja, de app zegt dat zelf | |
| "AI schrijft met het zwaarste model met veel denktijd" | In algemene woorden | Als er een model gekozen en getest is |
| "Kwaliteit van een ervaren schrijver" | Nee | Alleen met voorbeeldpagina's en een oordeel van een echte klant |
| "Een meetronde kost ongeveer 0,72 dollar, een pagina een paar tientjes centen tot een dollar" | Nee | Met de echte facturen naast `ai_calls` |
| "Minder dan een lunch per klant per maand" | Nee | Zelfde |
| "ChatGPT, Gemini en Google AI Overview" | Alleen ChatGPT als basis. "Per onderwerp kun je Gemini en Google AI Overview erbij zetten" is een voorwaarde, geen standaard | Gemini nadat hij tegen een echt antwoord is getoetst, Google AI Overview als de eigenaar hem aanzet |
| Tijdwinst in uren per klant | Nee | Eigen meting of een pilotklant |

---

## 6. Overzicht van dubbelingen

Wat nu op meer dan één pagina staat, en waar het hoort.

| Onderwerp | Waar nu | Beeld of tekst | Hoort op | Actie |
|---|---|---|---|---|
| Gele zin met "Klopt" en "Vraag het bedrijf" | Werkwijze (`ZinNalopen`), Kwaliteit (`GeleZin`) | Zelfde zin, zelfde knoppen | Werkwijze toont de handeling, Kwaliteit toont wat geel wordt | Kwaliteit krijgt een ander beeld |
| Klant beantwoordt een vraag via een link | Werkwijze (`VragenKlant`), Kwaliteit (`AntwoordKlant`) | Zelfde situatie | Werkwijze | Kwaliteit toont het feit dat uit het antwoord ontstaat |
| Feiten met bron (Klant, Document) | Werkwijze (`Feiten`), Kwaliteit (`BreinTabel`) | Zelfde onderwerp | Kwaliteit | Sectie Bedrijfskennis uit Werkwijze halen |
| Merkstem | Werkwijze (`Merkstem`) | Aanspreekvorm, toon, verboden woorden | Kwaliteit | Verhuizen |
| Eindredactie | Werkwijze (`Eindredactie`) | Drie controles geslaagd, één te doen | Kwaliteit | Verhuizen |
| Werkoverzicht | Werkwijze (`Werkoverzicht`), Beheer (`HeroWerkoverzicht`, `LangstWacht`) | Lijst van klanten met zichtbaarheid | Beheer | Weghalen uit Werkwijze |
| Kijker en rechten | Werkwijze (`Toegang`), Beheer (`KijkerRechten`) | Pieter Lindeman, drie schakelaars | Beheer | Weghalen uit Werkwijze |
| Kosten (46 van 250 euro) | Werkwijze (`Kosten`), Beheer (`BeheerKosten`) | Zelfde getallen | Beheer | Weghalen uit Werkwijze |
| Onderzoek van een klant | Beheer (`Onderzoek`), nog niet op AI | Voortgang van het onderzoek | AI | Verhuizen naar AI, Beheer behoudt het formulier |
| Eigen sleutels | Beheer, drie keer | Hero, strook en sectie | Beheer | Korter maken |
| Maandverslag | Werkwijze (Rapportage), straks ook genoemd in Beheer | | Werkwijze | Beheer noemt alleen de bureaunaam |
| "Brand Intelligence Brain" (homepage), "het brein" (Kwaliteit), "merkdossier" en "Feiten en kennis" (app) | Vier namen voor één ding | | Kwaliteit | Eén begrip kiezen (zie 7.4) |

Na de herindeling heeft elke pagina minimaal één beeld dat nergens anders voorkomt. Controle: in `components/*/Visuals.tsx` mag elk exportnaam in precies één pagina gebruikt worden, behalve `HeroMaand`.

---

## 7. Pagina-overstijgend

### 7.1 Menu, URL en paginatitel

| Menu | Nu: URL | Nu: paginatitel | Nu: eyebrow | Voorstel: URL | Voorstel: paginatitel |
|---|---|---|---|---|---|
| AI | `/ai` | AI | (Engels) | `/product/ai` | AI in ORBIT ENGINE |
| Werkwijze | `/product` | Fases en werkwijze | ORBIT ENGINE voor bureaus | `/product/werkwijze` | Werkwijze |
| Kwaliteit | `/kennis` | Kennis en feiten | Kennis en feiten | `/product/kwaliteit` | Kwaliteit |
| Beheer | `/agency` | Account en beheer | ORBIT ENGINE voor marketingbureaus | `/product/beheer` | Beheer |

Redenen:
- Ze vallen onder "Product" in het menu. De URL moet dat tonen.
- De URL, het menulabel en de titel moeten hetzelfde woord zijn. Nu zijn het drie verschillende.
- `/kennis` lijkt op `/kennisbank`. Een lezer en een zoekmachine kunnen ze door elkaar halen.
- `/agency` is Engels op een Nederlandse site.

Doe het met permanente redirects van `/kennis` en `/agency` (en `/product` naar `/product/werkwijze` of naar een overzichtspagina) in `next.config.mjs`, zoals de bestaande redirect van `/changelog`. Werk daarna bij: `app/sitemap.ts` (staat `/product`, `/kennis`, `/agency` in, `/ai` niet), de canonicals en de OpenGraph-urls in elke `page.tsx`, de links op de homepage (`uitgelicht` verwijst naar `/agency` en `/product`), het menu en de voettekst in `lib/site.ts`.

Een optie is om `/product` een overzichtspagina te laten blijven met de vier kaarten (zoals Linear's productmenu). Dan is er geen redirect nodig voor `/product`.

### 7.2 Kruislinks, zoals Linear

Elke pagina eindigt nu met een CTA. Linear laat daarvoor een rij kaarten naar de andere productpagina's zien. Voeg onderaan elke pagina een blok "Verder in het product" toe, met de andere drie. Het lost ook het dubbelingsprobleem op: wat elders hoort, krijgt in plaats van een eigen versie een link van één regel.

Bovenaan elke pagina of in de regel onder de hero kan een korte verwijzing: "Hoe het meet staat bij AI. Hoe je het ziet staat hier."

### 7.3 Afsluiters

De afsluiters van Kwaliteit en Beheer zijn goed, die van Werkwijze en de homepage zijn algemeen. De schrijfstijl-afspraak zegt dat een CTA een logische vervolgstap voor deze lezer is, niet een algemene demo-oproep. Voorstel:

| Pagina | Afsluiter nu | Voorstel |
|---|---|---|
| AI | (nieuw) | "Zie hoe AI jouw klant meet." |
| Werkwijze | "Bekijk hoe ORBIT ENGINE in jullie bureau past." | "Start met één klant. Zie na een maand wat er is gemeten en geschreven." Controleer of een pilot of eerste maand echt aangeboden wordt, voor je dit schrijft |
| Kwaliteit | "Laat AI schrijven. Zonder je reputatie op het spel te zetten." | Houden |
| Beheer | "Zet je bureau in ORBIT ENGINE." | Houden, plus link naar `/prijzen` |

### 7.4 Taal en begrippen

| Onderwerp | Nu | Advies |
|---|---|---|
| Aanspreekvorm | "je" en "jullie" door elkaar (Werkwijze: "Jullie geven het akkoord", "jullie bureaunaam") | "Je" en "jouw" voor het bureau, "je klant" voor de klant. "Jullie" alleen waar het bureau en de klant samen bedoeld zijn |
| Klant of bedrijf | Site: klant. App: bedrijf | Site: klant, in de app: bedrijf. Houd het binnen de pagina's gelijk |
| Het brein | Site: "brein", "Brand Intelligence Brain" op de homepage. App: Merkdossier en Feiten en kennis | Gebruik de namen van de schermen. Als "brein" een bijnaam moet blijven, introduceer hem één keer ("het merkdossier, het brein van je klant") |
| Rapport | Site: rapport, verslag. App: "de uitslag" voor het onderzoeksrapport, "maandverslag" voor het verslag aan de klant | Gebruik "maandverslag" voor het klantdocument |
| AI-vragen | Site: "AI-vragen". App: "AI-vragen" (geen "prompts") | Goed zo |
| Engels | "Brand Intelligence Brain", "Built for the future. Available today." (homepage) | Op een Nederlandse site: Nederlands |

### 7.5 Voorbeeldcase en bewijs

- Eén fictieve case door alle pagina's (Bureau Noordwind en Lindeman Warmte) is goed en blijft. De labels "Voorbeeldgegevens" ook.
- Er is nergens bewijs buiten de fictie: geen klantquote, geen getal, geen logo. Vervang dat niet door verzonnen bewijs. Plan een pilot of een eerste echte klant voor een echte, geanonimiseerde case. Tot die tijd: gebruik wat de app aantoonbaar doet (de regels in code, de marge, de eerlijke oordelen).
- Het USP-document noemt "duizenden automatische tests" en "tests met twee bureaus". Dat is waar (5.874 en 1.193 op de gecontroleerde commit) en mag in woorden op Beheer of Kwaliteit, mits erbij staat dat het gaat om de regels in code. De documentatie zegt zelf dat de tests niets zeggen over de kwaliteit van AI-uitvoer.

### 7.6 Commercieel en positionering

| Punt | Probleem | Advies | Prio |
|---|---|---|---|
| "Open source en gratis" | Homepage (hero en `/over`) zegt dat. De app-documentatie zegt dat de app niet open source is, door één eigenaar gehost wordt en dat een bureau een afspraak maakt over het gebruik plus de AI-kosten betaalt | Kies het verdienmodel en maak de hele site gelijk. De vier productpagina's zeggen er niets over, dus die zijn niet fout, maar elke verkoopzin leunt erop | P0 |
| `/prijzen` | Leeg, maar staat in sitemap en menu | Minimaal: hoe de prijs is opgebouwd (gebruik van ORBIT ENGINE volgens afspraak, AI-kosten op eigen sleutels), en een rekenvoorbeeld pas na de proefronde | P0 |
| Doelgroep | Home en `/over`: "marketeers", MKB. Productpagina's: bureaus | Het bureau als lezer, het MKB als klant van het bureau | P1 |
| Installatiegids en Documentatie | Placeholder-pagina's "hoe je Orbit installeert". Een bureau installeert niets: de eigenaar voegt het toe | Haal uit menu en sitemap tot ze iets te vertellen hebben | P2 |
| Vergelijking met andere tools | De tabel in het USP-document noemt andere typen tools, zonder namen. Sommige cellen zijn niet te controleren ("vaak beperkt per prompt") | Als je het publiceert, doe het op `/prijzen` of een aparte pagina, beperkt tot wat je kunt aantonen over jezelf. Laat cellen over anderen weg | P3 |

### 7.7 Technisch en opruimen

| Punt | Advies |
|---|---|
| `/ai1`, `/ai2`, `/test` tot `/test12` | Het zijn testroutes met `noindex`, maar ze staan live en in `public/video` staat 39 MB aan testvideo's. Verwijder ze voor de lancering |
| Sitemap | Voeg `/ai` (of de nieuwe URL) toe. Haal Installatiegids en Documentatie eruit zolang ze leeg zijn |
| OG-afbeeldingen | `og-product.png`, `og-kennis.png`, `og-agency.png` bestaan. Maak `og-ai.png` en hernoem na de URL-wijziging |
| Alt-teksten | Elk beeld heeft een rijke alt-tekst. Houd dat zo voor de AI-pagina |
| Beweging | Alle motion moet `prefers-reduced-motion` respecteren, ook de video |
| Responsief | Het ontwerp moet werken van 320px breed tot desktop zonder horizontaal scrollen. Controleer dat de matrix van blok 3 op mobiel een lijst per stap wordt in plaats van een brede tabel |
| Analytics | Meet per pagina hoe ver de lezer scrolt en welke CTA wordt gebruikt. Zo weet je welke blokken werken. (Ik vond geen analytics in `app/layout.tsx` en `package.json`) |
| Zoekmachines | De pagina's moeten ook zelf gevonden worden door AI-assistenten. Gebruik per pagina koppen die een vraag beantwoorden en nauwkeurige beschrijvingen. Dit is geen reden om meer tekst toe te voegen |

---

## 8. Verbeterplan in fasen

Elke taak heeft een omvang: S (minder dan een uur tekstwerk), M (een dagdeel), L (meerdere dagen, met beeldwerk).

### Fase 0: besluiten (voor alles)

| # | Besluit | Waarom nu | Wie |
|---|---|---|---|
| 0.1 | Verdienmodel en "open source": wat is het, wat staat erover op home, `/over` en `/prijzen` | Elke verkoopzin leunt erop | Eigenaar |
| 0.2 | Doelgroep: één lezer (het bureau) en de woorden die daarbij horen | Home, `/over` en de productpagina's spreken verschillende mensen aan | Eigenaar |
| 0.3 | URL-structuur en namen (7.1) | Redirects en links doe je één keer | Eigenaar |
| 0.4 | Welke meetkanalen worden genoemd: alleen ChatGPT, of ook Gemini en Google AI Overview (met voorwaarde) | Gemini is niet getoetst, Google AI Overview staat standaard uit | Eigenaar |
| 0.5 | Per-zin-bron (K1): de tekst aanpassen, of de functie bouwen | Bepaalt de hero van Kwaliteit | Eigenaar en app |
| 0.6 | Wanneer de proefronde wordt gedaan, want die bepaalt wanneer kwaliteit- en kostenclaims mogen | Zie 5.6 | Eigenaar |

### Fase 1: juistheid (tekstwijzigingen, laag risico)

| # | Taak | Pagina | Omvang |
|---|---|---|---|
| 1.1 | "Elke maand gemeten" aanpassen naar "Zet je de maandmeting aan, dan meet ORBIT ENGINE elke maand opnieuw op dezelfde vragen" (W4) | Werkwijze | S |
| 1.2 | Hero en beeld van Kwaliteit aanpassen: bron per harde bewering of per feit, niet "bij elke zin" (K1) | Kwaliteit | S |
| 1.3 | Sectie Schrijven en bijbehorend punt gelijk trekken met de sectie Eerlijk (K2) | Kwaliteit | S |
| 1.4 | "Harde maandlimiet" wordt "Een maandlimiet die nieuw werk stopt" (B3) | Beheer | S |
| 1.5 | "Uitnodiging per mail" wordt "per link, en per mail zodra die aanstaat" (B5) | Beheer | S |
| 1.6 | "Wat geld kost, blijft bij een beheerder" nauwkeuriger maken (B4) | Beheer, Werkwijze | S |
| 1.7 | Sleutels: OpenAI verplicht, de rest optioneel (B6) | Beheer | S |
| 1.8 | "Teksten die klinken als je klant" afzwakken naar "in de stem van je klant, met de feiten van je klant" (W13) | Werkwijze | S |
| 1.9 | Aanspreekvorm "je" en "jullie" gelijk trekken (7.4) | Werkwijze | S |
| 1.10 | Controle op alle pagina's dat de bewijsladder niet met conversie en omzet wordt genoemd en dat er geen CSV-export van effecten wordt beloofd | Alle | S |
| 1.11 | Controle op de homepage-FAQ: "Per onderwerp kun je Gemini en het AI-overzicht erbij zetten" krijgt de voorwaarde | Home | S |

### Fase 2: structuur (dubbelingen weg, volgorde recht)

| # | Taak | Pagina | Omvang |
|---|---|---|---|
| 2.1 | Werkwijze herordenen naar zes stappen met de ronde als kapstok (4.1). Sectie Bedrijfskennis en Bureau eruit, Klantinput naar Schrijven, Rapportage naar het eind van Hermeten | Werkwijze | M |
| 2.2 | Beeld voor de marge in Meten, beeld voor het eerlijke oordeel bij Hermeten, lijst "Dit bedrijf inrichten" bij Inrichten | Werkwijze | M |
| 2.3 | Kwaliteit herordenen (4.2): Brein en Register samenvoegen, `GeleZin` vervangen door "wat wordt geel", `Merkstem` en `Eindredactie` erheen, nieuwe blokken over de klant en de oplevering | Kwaliteit | L |
| 2.4 | Beheer uitbreiden (4.3): Zo begin je, scherm van de kijker, Als er iets misgaat, eerlijke zin over toegang, Kosten en Sleutels samenvoegen, USP-strook korter | Beheer | M |
| 2.5 | Blok "Verder in het product" onder elke pagina | Alle | S |
| 2.6 | Afsluiters aanpassen (7.3) | Alle | S |
| 2.7 | Eén begrip voor "het brein" (7.4) | Kwaliteit, Home | S |
| 2.8 | Controle dat elke exportnaam in `Visuals.tsx` maar op één pagina voorkomt | Alle | S |

### Fase 3: de AI-pagina

| # | Taak | Omvang |
|---|---|---|
| 3.1 | Teksten definitief maken in `content/ai.ts` (5.3), de maker-quote laten schrijven door de eigenaar | M |
| 3.2 | Matrix "Wie doet wat" uitwerken en elke cel aan de documentatie koppelen (5.4) | M |
| 3.3 | Visuals bouwen voor blok 3 tot 6 (5.4) en het onderzoeksbeeld van Beheer verplaatsen | L |
| 3.4 | `AiPagina.tsx` opschonen: Engelse tekst eruit, varianten eruit, één video kiezen | S |
| 3.5 | Kruislinks, afsluiter, meta, OG-afbeelding | S |
| 3.6 | Responsief controleren (320px), `prefers-reduced-motion`, toegankelijkheid | S |
| 3.7 | `noindex` weghalen, in de sitemap zetten | S |

### Fase 4: harden

| # | Taak | Omvang |
|---|---|---|
| 4.1 | URL-wijziging met permanente redirects, bijwerken van sitemap, canonicals, OG-urls, menu en homepage-links (7.1) | M |
| 4.2 | Testroutes en testvideo's verwijderen (7.7) | S |
| 4.3 | Installatiegids en Documentatie uit menu en sitemap tot ze inhoud hebben | S |
| 4.4 | Metingen per pagina inrichten (scrolldiepte, CTA) | M |
| 4.5 | Woordenlijst-controle op de nieuwe teksten (zelfde lijst als de app: "AI-vragen", "pagina's of teksten", "ORBIT ENGINE", geen "en/of", geen gedachtestreepjes) | S |

### Fase 5: bewijs (na de proefronde)

| # | Taak | Omvang |
|---|---|---|
| 5.1 | De echte proefronde (documentatie 16.3): kosten naast de facturen, uitvoer nalezen, `eval:mention` draaien | Eigenaar, L |
| 5.2 | Een echte, geanonimiseerde pagina met haar gele zinnen als bewijs op Kwaliteit | M |
| 5.3 | Echte getallen voor kosten per klant en tijdwinst, op `/prijzen` en op de AI-pagina | M |
| 5.4 | Een pilotklant of bureau voor een quote en een casus | L |
| 5.5 | "Een week uit het leven van een bureau" als verhaal op Werkwijze | M |
| 5.6 | Vergelijking met andere typen tools, beperkt tot wat aantoonbaar is | M |

### Acceptatiecriteria

Een pagina is klaar als:
1. Elke boodschap heeft één eigenaarspagina (3.4), de rest linkt.
2. Geen beeld of tekstblok komt op twee pagina's voor (hoofdstuk 6).
3. Elke bewering is te herleiden naar de documentatie of de code, en staat in bijlage A als "Gebouwd" of met de voorwaarde erbij.
4. Er staat nergens een functie die niet gebouwd is.
5. De ronde bovenaan linkt naar alle blokken van de pagina, en andersom.
6. De pagina werkt van 320px tot desktop zonder horizontaal scrollen en respecteert `prefers-reduced-motion`.
7. Titel, menulabel en URL zijn hetzelfde woord.
8. Het slot van de pagina is een vervolgstap voor deze lezer.

---

## Bijlage A: controle van de beweringen

Elke bewering die ik heb gecontroleerd, met het oordeel. "Klopt" betekent: bevestigd in de documentatie en de code.

### Werkwijze (`/product`)

| Bewering | Oordeel |
|---|---|
| "Stel per onderwerp een meetplan samen met relevante AI-vragen" | Klopt |
| "Bekijk in de gemeten antwoorden welke bedrijven worden genoemd, welke bronnen worden aangehaald en waar je klant ontbreekt" | Klopt |
| "Elke maand gemeten op dezelfde vragen" | Klopt alleen als de maandmeting aanstaat. Standaard uit (W4) |
| "Zie welke bedrijven de AI-assistent noemt, in welke volgorde" | Klopt |
| "Per onderwerp zie je hoe vaak je klant genoemd wordt, naast de concurrenten die AI het vaakst aanbeveelt" | Klopt |
| "Breng aanbod, doelgroep, merkstem en bedrijfsfeiten samen in een merkdossier" | Klopt |
| "Zie waar bedrijfsinformatie vandaan komt: website, gesprek, document of de klant zelf" | Klopt |
| "Bekijk voorstellen voor nieuwe pagina's en verbeteringen aan bestaande content" | Klopt |
| "Plan het werk per maand" | Klopt |
| "Je klant beantwoordt die in de app of via een deellink, zonder account" | Klopt. "In de app" vraagt een kijker-account |
| "Harde beweringen zonder voldoende onderbouwing worden gemarkeerd" | Klopt (bedrag, getal, termijn, garantie, keurmerk) |
| "Bronnen, merkstem, verboden woorden en zoekmachinegegevens worden gecontroleerd voordat je de tekst leest" | Gedeeltelijk. Bronnen en verboden woorden in code, merkstem is een instructie in de prompt, metatitel wordt mechanisch gerepareerd |
| "Teksten die klinken als je klant" | Stelliger dan de app waarmaakt (W13) |
| "Kopieer de goedgekeurde tekst als HTML, Markdown of platte tekst" | Klopt |
| "Meld daarna het live-adres voor de opvolging" | Klopt |
| "Laat de doelvragen van een pagina na 14 en 28 dagen opnieuw meten" | Klopt |
| "Vertoningen en klikken van gepubliceerde ORBIT ENGINE-pagina's met Google Search Console" | Klopt, vereist een koppeling per klant |
| "Bundel ... in een maandverslag met jullie bureaunaam" | Klopt |
| "Start werkzaamheden voor meerdere bedrijven tegelijk" | Klopt |
| "Inzicht in gebruikskosten en een instelbare rem op nieuw betaald werk" | Klopt |
| "Beheerders zien alles. Een kijker ziet alleen zijn eigen bedrijf, en doet alleen wat jij toestaat" | Klopt |

### Kwaliteit (`/kennis`)

| Bewering | Oordeel |
|---|---|
| "ORBIT ENGINE schrijft alleen met feiten over je klant die ergens vandaan komen" | Klopt voor wat in de tekst als feit staat. Algemene uitspraken beoordeelt de mens |
| "Je ziet precies waarvandaan ... Je ziet het bij elke zin" | Niet gevonden in de app. Bron per feit en reden per gele zin wel (K1) |
| "Een prijs, termijn of garantie zonder bron valt meteen op" | Klopt |
| "ORBIT ENGINE leest het en legt vast wat erin staat" (website, gesprek, antwoorden, brochures) | Klopt |
| "Vakkennis, regels en concurrenten, opgezocht op het web en gecontroleerd op de bron" | Klopt, het citaat wordt op de bronpagina teruggezocht. Hangt af van de schakelaar voor zoeken op het web |
| "Gevonden met bewijs, gezegd door de klant of bevestigd door je team. Wat de AI alleen vermoedt, komt nooit zomaar in een tekst" | Klopt |
| "Zegt de AI iets op de website te zien, dan moet die zin daar ook echt letterlijk staan" | Klopt |
| "Alleen feiten met een bron gaan mee" | Klopt |
| "Elke bewering wijst naar een feit in het brein" | Alleen gecontroleerd voor harde beweringen (K2) |
| "Een getal moet ook echt in de bron staan" | Klopt |
| "Namen van concurrenten en verboden woorden blijven eruit" | Klopt, in code |
| "Je keurt een pagina pas goed als elke gele zin is nagelopen" | Klopt |
| "Het antwoord gaat het brein in, voor deze tekst en alle teksten erna" | Klopt |
| "Staat er op de ene plek 3 jaar garantie en op de andere 5, dan hoor je dat voordat het in een tekst staat" | Klopt (conflicten met ernst blokkerend of waarschuwing) |
| "Een prijs kan een einddatum krijgen. Daarna moet iemand hem opnieuw bevestigen" | Klopt (`verloopt_op`) |
| Lijst "ORBIT ENGINE controleert": bedragen, termijnen, garanties, keurmerken, getallen die niet in de bron staan, namen van concurrenten, woorden die je klant niet wil | Klopt |
| Lijst "Jij beslist": toon, overtuigingskracht, algemene uitspraken, wanneer een pagina live gaat | Klopt |

### Beheer (`/agency`)

| Bewering | Oordeel |
|---|---|
| "Onbeperkt klanten" | Klopt |
| "Beheerders doen alles. Kijkers zien alleen hun eigen bedrijf, en doen alleen wat jij toestaat" | Klopt |
| "Je bureau betaalt OpenAI, Gemini en DataForSEO rechtstreeks" | Klopt, OpenAI is verplicht, de andere twee optioneel (B6) |
| "Een harde maandlimiet ... start er geen nieuw betaald werk meer" | Nieuw werk klopt, een lopende taak maakt haar werk af (B3) |
| "Een nieuwe klant staat er in tien minuten" | Het onderzoek duurt ongeveer tien minuten. Het scherm zegt "meestal binnen tien minuten" |
| "Het onderzoek loopt door als je het scherm sluit" | Klopt |
| "Bij de knop staat wat een onderzoek je bureau eerder gemiddeld kostte" | Klopt |
| "Vooraf zie je hoeveel pagina's het samen zijn en ongeveer wat het kost" | Klopt |
| "De uitnodiging gaat per mail en werkt veertien dagen" | Veertien dagen klopt. Mail alleen als de eigenaar mail aanzet (B5) |
| "Wat geld kost, blijft altijd bij een beheerder" | Met één kleine uitzondering: materiaal toevoegen (B4) |
| "Je ziet het verbruik per maand, per soort werk en per klant, en wat volgende maand vanzelf loopt" | Klopt |
| "Zonder geschiedenis staat er geen verzonnen bedrag, maar 'nog geen schatting'" | Klopt |
| "Versleuteld opgeslagen, daarna alleen de laatste vier tekens zichtbaar. Testknop per sleutel" | Klopt |
| "Nooit een uitwijk naar de sleutel van een ander bureau" | Klopt, bewaakt door een test |
| "Maandlimiet geldt ook voor de automatische maandmeting" | Klopt |
| "Elk bureau ziet van een ander bureau niets, ook niet dat het bestaat" | Klopt voor bureaus. De eigenaar kan een bureau openen (B11) |
| "Archiveren zonder iets kwijt te raken, terughalen zet alles terug" | Klopt |
| "Verwijderen: eerst zie je wat weggaat, daarna typ je de naam over" | Klopt |

### Uit het USP-document, voor de AI-pagina en overige pagina's

| Bewering | Oordeel |
|---|---|
| USP 58, bewijsladder met zeven treden tot conversie en omzet | Alleen de eerste vijf treden hebben gegevens. Conversie en omzet worden niet gemeten |
| USP 62, "behaalde effect als CSV" | Niet gevonden. Wel merkdossier en contentplan |
| USP 66, "elke AI-aanroep is met zijn kosten terug te vinden" | De beheerder ziet kosten per maand, soort werk en klant. Per aanroep kijkt alleen de eigenaar (scherm Spoor) |
| USP 68, "Rustig uitproberen met de teststand" | Alleen de eigenaar zet de teststand om, per bureau. Geen functie van het bureau |
| USP 12, ChatGPT, Gemini en AI Overview | ChatGPT gebouwd. Gemini niet getoetst. AI Overview alleen met een schakelaar van de eigenaar en DataForSEO |
| USP 48, "Kwaliteit van een ervaren schrijver" | Niet te toetsen zonder echte aanroepen |
| USP 51, "Teksten die niet als AI klinken" | De app repareert mechanisch typische tekens (zoals gedachtestreepjes). Dat is minder dan de bewering |
| USP 9, "Uitnodigingen, rapporten en meldingen komen van 'Jouw bureau via ORBIT ENGINE'" | Alleen als de eigenaar mail aanzet |
| Kosten (hoofdstuk 5 van het USP-document, "0,024 dollar per vraag, gemeten over 428 echte metingen") | Staat los van de documentatie, die zelf zegt dat er nooit een echte betaalde aanroep is gedaan. Eerst na de proefronde noemen |
| Vergelijkingstabel met andere tools | Cellen over anderen zijn niet te controleren |

---

## Bijlage B: de 73 punten uit het USP-document, gekoppeld aan een pagina

De nummers zijn die van `ORBIT_ENGINE_WAAROM.md`, hoofdstuk 4. "Eigenaar" is de pagina die het onderwerp volgens 3.4 bezit. "Nu" zegt of het onderwerp op die pagina al staat.

| Nummers | Onderwerp | Eigenaar | Nu |
|---|---|---|---|
| 1 | Gegevens per bureau afgeschermd | Beheer | Ja |
| 2 | Onbeperkt klanten, geen prijs per merk | Beheer | Ja |
| 3 | Werkoverzicht in vijf seconden | Beheer | Ja |
| 4 | Een hele maand in één klik | Beheer | Ja |
| 5 | Nieuwe klant in een paar minuten, standaarden, inrichtingslijst | Beheer en Werkwijze | Deels |
| 6 | Klant kijkt mee als kijker | Beheer | Ja, zonder zijn eigen scherm |
| 7 | Deellink voor vragen, zonder account | Werkwijze | Ja |
| 8 | Maandverslag met de naam van het bureau | Werkwijze | Ja |
| 9 | Bureau blijft het gezicht naar de klant | Beheer | Nee |
| 10 | Iedereen weet wat er moet gebeuren | Beheer en Werkwijze | Deels |
| 11 | Inwerken gaat vanzelf | Beheer | Nee |
| 12 | Meten in meerdere assistenten | AI | Deels, met voorwaarde |
| 13 | Meten zoals een echte gebruiker (zoeken op het web) | AI | Nee |
| 14 | Dertig vragen langs de klantreis | Werkwijze, AI | Nee |
| 15 | Vragen die echt bij het bedrijf horen | AI | Nee |
| 16 | Weging naar commerciële waarde | AI | Nee |
| 17 | Een cijfer met marge | AI, Werkwijze | Nee |
| 18 | Elk antwoord terug te lezen | Werkwijze | Ja |
| 19 | Hoe het merk genoemd wordt (positie, rol, bron) | Werkwijze | Deels |
| 20 | Echte concurrenten ingedeeld | Werkwijze | Nee |
| 21 | Waarop de klant verliest, welke bronnen | Werkwijze, AI | Nee |
| 22 | Kennistest en reputatiemeting | AI | Nee |
| 23 | Trendlijn die vanzelf groeit | Werkwijze | Nee |
| 24 | Rapporten die zeggen wat er veranderde | Werkwijze | Nee |
| 25 | Waar de grootste kansen liggen | Werkwijze | Deels |
| 26 | Meldingen | Beheer | Nee |
| 27 | Klant toevoegen in een minuut, tot 1000 pagina's | AI, Beheer | Deels |
| 28 | Werkt voor elk soort klant | AI | Nee |
| 29 | Aanbodboom, snelste winst | Werkwijze, AI | Nee |
| 30 | Kennis met bron, vermoedens apart | Kwaliteit | Ja |
| 31 | Stem en verboden woorden | Kwaliteit | Deels (`Merkstem` op Werkwijze) |
| 32 | Doelen van de klant sturen alles | Werkwijze | Nee |
| 33 | Werk gaat niet verloren bij een nieuw onderzoek | Kwaliteit | Nee |
| 34 | Klant levert materiaal aan | Kwaliteit | Nee |
| 35 | Vakkennis per branche | Kwaliteit | Nee |
| 36 | Technische check voor AI-crawlers | AI | Nee |
| 37 | Elke kans met bewijs | Werkwijze | Deels |
| 38 | Nieuwe en betere pagina's, zonder dubbelingen | Werkwijze | Deels |
| 39 | Jaarplan in één klik | Werkwijze | Nee |
| 40 | Het volume uit je contract | Werkwijze | Nee |
| 41 | Jij bepaalt het tempo | Werkwijze | Nee |
| 42 | Eigen pagina-idee | Werkwijze | Nee |
| 43 | Soorten pagina's | Kwaliteit | Nee |
| 44 | Nieuwe onderwerpen ontdekken | Werkwijze | Nee |
| 45 | Elke pagina begint met onderzoek | AI, Kwaliteit | Nee |
| 46 | Gerichte vragen aan de klant | Werkwijze, Kwaliteit | Deels |
| 47 | Het schrijven start vanzelf | Werkwijze, AI | Nee |
| 48 | Schrijver en eindredacteur | AI, Kwaliteit | Deels, claim over kwaliteit afhankelijk van proefronde |
| 49 | Vangnet tegen verzonnen feiten | Kwaliteit | Ja |
| 50 | Nooit reclame voor een concurrent | Kwaliteit | Deels |
| 51 | Teksten die niet als AI klinken | Kwaliteit | Nee, en de claim is te sterk |
| 52 | Alles wat een pagina nodig heeft (meta, FAQ, gestructureerde gegevens, interne links) | Kwaliteit | Deels |
| 53 | Plakklaar voor elk CMS | Werkwijze | Ja |
| 54 | Jij houdt de regie, versies | Werkwijze, Kwaliteit | Deels |
| 55 | Zekerheid dat de pagina live staat | Werkwijze | Nee |
| 56 | Hermeten na 14 en 28 dagen | Werkwijze | Ja |
| 57 | Een oordeel in gewone taal | Werkwijze | Deels |
| 58 | Bewijsladder | Werkwijze | Nee, alleen de eerste vijf treden gebruiken |
| 59 | Search Console per pagina | Werkwijze | Ja |
| 60 | Opbrengst die echt van jou is | Werkwijze | Deels |
| 61 | Zoekopdrachten als extra bewijs | Werkwijze | Nee |
| 62 | Resultaten exporteren | Beheer | Alleen merkdossier en contentplan |
| 63 | AI tegen kostprijs, eigen sleutels | AI, Beheer | Ja |
| 64 | Maandlimiet | Beheer | Ja |
| 65 | Kosten vooraf | Beheer | Ja |
| 66 | Marge per klant | Beheer | Ja |
| 67 | Alleen jouw bureau maakt kosten | Beheer | Deels |
| 68 | Rustig uitproberen (teststand) | Geen pagina | Alleen voor de eigenaar |
| 69 | Niets te installeren | Beheer | Nee |
| 70 | Alles loopt op de achtergrond | AI | Deels (onderzoek) |
| 71 | Nooit dubbel betalen | AI | Nee |
| 72 | Grondig getest | Kwaliteit, Beheer | Nee |
| 73 | Gemaakt voor de Nederlandse markt | AI | Nee |

Van de 73 punten staat ongeveer een kwart volledig op de vier pagina's. Dat hoeft er niet allemaal op: de pagina's zijn een verkooppagina, geen handleiding. Zorg dat de punten die een bureau-eigenaar of accountmanager beslist, op hun eigenaarspagina staan: 13, 14, 17, 20 tot 22, 36, 39, 40, 55, 57, 69 en 73. De rest kan in de kennisbank en in de documentatie.
