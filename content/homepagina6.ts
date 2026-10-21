// Teksten van de testhomepage /homepagina6, letterlijk uit de ontwerpbriefing van 21 oktober 2026. De
// teksten in de productbeelden staan bij de beelden zelf (components/homepagina6/Visuals.tsx).

export const meta = {
  titel: 'Orbit | AI-zichtbaarheid als dienst voor marketingbureaus',
  beschrijving: 'Van prospectscan en GEO-audit tot content, hermeting en maandverslag. Orbit helpt marketingbureaus AI-zichtbaarheid als vaste dienst aan te bieden.',
}

export const demoKnop = 'Plan een demo'

export const hero = {
  label: 'Voor marketingbureaus',
  titel: 'Maak AI-zichtbaarheid een vaste dienst van je bureau.',
  intro: 'Ontdek waar klanten ontbreken in AI-antwoorden, werk kansen uit tot content en volg wat er na publicatie verandert. Orbit brengt de eerste pitch, de uitvoering en het maandverslag samen in één platform.',
  werkwijze: 'Bekijk hoe Orbit werkt',
  kanalen: 'Voor ChatGPT, Gemini en Google AI-overzichten.',
}

export const diensten = {
  titel: 'Van eerste gesprek tot vaste opdracht.',
  intro: 'Gebruik Orbit om kansen te laten zien, een aanpak te onderbouwen en de uitvoering maand na maand te organiseren.',
  items: [
    { titel: 'Open het gesprek', tekst: 'Laat prospects zien hoe hun bedrijf voorkomt in AI-antwoorden, met een pitch in de huisstijl van je bureau.' },
    { titel: 'Maak de aanpak concreet', tekst: 'Bundel zichtbaarheid, bronnen, techniek en contentkansen in een GEO-audit met actieplan.' },
    { titel: 'Lever een maandelijkse dienst', tekst: 'Combineer metingen, content en rapportage in een vaste werkwijze voor je klanten.' },
  ],
}

export const pitch = {
  label: 'Nieuwe klanten',
  titel: 'Begin je pitch met een concrete kans.',
  intro: 'Laat zien hoe AI over een prospect praat en welke concurrenten in beeld komen. Deel de uitkomst in de huisstijl van je bureau en werk het gesprek uit tot een GEO-audit met actieplan.',
  punten: [
    'Deel een pitch met je eigen logo, kleur en contactgegevens.',
    'Onderbouw je advies met de gemeten antwoorden.',
    'Zet een gewonnen prospect door naar een klant in Orbit.',
  ],
  beeld: { titel: 'Het resultaat dat de prospect ontvangt' },
}

export const onderzoeken = {
  label: 'Inzicht en prioriteit',
  titel: 'Zie waar je klant ontbreekt. En wat je kunt onderzoeken.',
  intro: 'Volg relevante vragen in ChatGPT, Gemini en Google AI-overzichten. Bekijk welke merken worden genoemd, welke bronnen worden gebruikt en welke kansen aandacht verdienen.',
  punten: [
    'Vragen die aansluiten op het aanbod en werkgebied van je klant.',
    'AI-antwoorden en bronnen die je kunt teruglezen.',
    'Herhaalde metingen en onzekerheidsmarges voor een zorgvuldige vergelijking.',
  ],
  beeld: { titel: 'Antwoord, bron en voorgestelde actie' },
}

export const uitvoeren = {
  label: 'Content en controle',
  titel: 'Van gevonden kans naar content die je kunt beoordelen.',
  intro: 'Maak een contentplan vanuit je metingen. Orbit gebruikt de kennis en merkstem van je klant, vraagt ontbrekende informatie uit en markeert harde claims die nog bevestiging nodig hebben. Je team houdt de regie.',
  stappen: [
    { titel: 'Plan de juiste pagina.', tekst: 'Werk nieuwe kansen uit of verbeter bestaande content.' },
    { titel: 'Vul de klantkennis aan.', tekst: 'Laat je klant gerichte vragen beantwoorden via een deellink.' },
    { titel: 'Controleer en publiceer.', tekst: 'Beoordeel de tekst en plaats hem in het eigen CMS.' },
  ],
  micro: 'Orbit controleert daarna of de pagina live staat en plant de hermeting.',
  beeld: { titel: 'Eén concrete claim door de controle', tekst: 'Een gemarkeerde claim vraagt om controle voordat de tekst kan worden goedgekeurd.' },
  opvolging: [
    { stap: 'Beoordelen', wie: 'Je team' },
    { stap: 'Publiceren in je CMS', wie: 'Je team' },
    { stap: 'Livecontrole', wie: 'Orbit' },
  ],
}

export const rapporteren = {
  label: 'Hermeting en rapportage',
  titel: 'Maak het volgende klantgesprek concreet.',
  intro: 'Laat zien wat er is uitgevoerd, hoe de zichtbaarheid zich ontwikkelt en waar de volgende kansen liggen. Orbit meet na publicatie opnieuw en brengt het werk en de ontwikkelingen samen in een maandverslag.',
  punten: [
    'Automatische hermetingen na 14 en 28 dagen.',
    'Zicht op AI-vermeldingen, bronverwijzingen en Search Console-cijfers.',
    'Een maandverslag met de naam van je bureau, klaar om te delen.',
  ],
  beeld: { titel: 'Publicatie, meetmomenten en conclusie', tekst: 'Orbit rapporteert ook zorgvuldig als een stijging nog niet aantoonbaar is.' },
}

export const klanten = {
  label: 'Je dagelijkse werk',
  titel: 'Al je klanten. Eén duidelijk werkoverzicht.',
  intro: 'Zie waar je team aan zet is, wat op de klant wacht en welke werkzaamheden klaarstaan. Geef klanten toegang tot hun eigen omgeving en bepaal zelf wat ze mogen zien en doen.',
  punten: [
    'Eén overzicht voor merken, taken en maandelijkse werkzaamheden.',
    'Klanttoegang met rechten die je zelf instelt.',
    'Inzicht in AI-kosten per klant en een maandlimiet voor je bureau.',
  ],
  beeld: { titel: 'Wie is aan zet?' },
}

// Sectie 8 heeft in de briefing geen eigen kop; de kop is er alleen voor hulptechnologie.
export const praktisch = {
  kop: 'Starten, kosten en de maker van Orbit',
  blokken: [
    {
      titel: 'Begin met één klant.',
      tekst: 'Voeg een bedrijfsnaam en website toe. Orbit onderzoekt het bedrijf en helpt je relevante onderwerpen en vragen klaar te zetten. Je team controleert de inrichting en start de eerste meting.',
    },
    {
      titel: 'Houd grip op je gebruik.',
      tekst: 'Je betaalt voor het gebruik van Orbit en voor AI-gebruik via de eigen sleutels van je bureau. Je beheert onbeperkt klanten, ziet vooraf een kostenindicatie en stelt een maandlimiet in.',
      link: { label: 'Bekijk hoe de kosten werken', href: '/prijzen', meet: 'pricing_click' },
    },
    {
      titel: 'Gebouwd vanuit marketinganalyse.',
      tekst: 'Orbit is ontwikkeld door Jan-Willem Koopman, met tien jaar ervaring als marketing data-analist. De basis: inzichtelijke metingen, controleerbare informatie en een werkwijze die bureaus aan hun klanten kunnen uitleggen.',
      link: { label: 'Over Orbit', href: '/over' },
    },
  ],
}

export const faq = {
  titel: 'Praktische vragen, helder beantwoord.',
  items: [
    {
      vraag: 'Voor welke bureaus is Orbit bedoeld?',
      antwoord: 'Orbit is bedoeld voor SEO-, content- en online marketingbureaus en zelfstandige specialisten die AI-zichtbaarheid voor hun klanten willen onderzoeken en verbeteren. Je beheert de werkzaamheden en resultaten per klant in één platform.',
    },
    {
      vraag: 'Kan ik Orbit gebruiken om nieuwe klanten te winnen?',
      antwoord: 'Ja. Met Pitch onderzoek je een prospect en deel je de uitkomst op een pagina in de huisstijl van je bureau. Met een GEO-audit werk je de bevindingen uit tot een rapport met actieplan. Een gewonnen prospect kun je daarna als klant beheren.',
    },
    {
      vraag: 'Welke AI-kanalen kan ik meten?',
      antwoord: 'Orbit ondersteunt metingen voor ChatGPT, Gemini en Google AI-overzichten. Per onderwerp kies je welke beschikbare kanalen je wilt gebruiken. Voor de verschillende diensten kunnen eigen API-sleutels nodig zijn.',
    },
    {
      vraag: 'Publiceert Orbit de content automatisch?',
      antwoord: 'Je team beoordeelt de content en plaatst deze in het eigen CMS. Orbit levert de tekst in een bruikbaar formaat, controleert de opgegeven publicatie en meet daarna opnieuw.',
    },
    {
      vraag: 'Hoe weet ik of de zichtbaarheid verandert?',
      antwoord: 'Orbit volgt geselecteerde vragen opnieuw en toont ontwikkelingen met onzekerheidsmarges. Na publicatie zijn hermetingen na 14 en 28 dagen voorzien. Je kunt antwoorden, bronverwijzingen en Search Console-cijfers bekijken. Een verandering na publicatie bewijst op zichzelf niet dat de pagina de oorzaak is.',
    },
    {
      vraag: 'Kan mijn klant meekijken of informatie aanleveren?',
      antwoord: 'Ja. Je bepaalt welke toegang en rechten een klant krijgt voor het eigen bedrijf. Gerichte vragen kunnen ook via een deellink worden beantwoord, zonder dat daarvoor een account nodig is.',
    },
    {
      vraag: 'Hoe werken de kosten?',
      antwoord: 'De kosten bestaan uit het gebruik van Orbit en AI-gebruik via de eigen sleutels van je bureau. Het AI-gebruik wordt zonder opslag door Orbit afgerekend bij de betreffende aanbieders. Je ziet kostenindicaties en kunt een maandlimiet instellen. Bekijk de prijzenpagina voor de actuele afspraken over het platform.',
    },
    {
      vraag: 'Blijft mijn team verantwoordelijk voor de kwaliteit?',
      antwoord: 'Ja. Orbit ondersteunt onderzoek, schrijven en controles. Het systeem markeert onder meer harde claims waarvoor bevestiging ontbreekt. Je team beoordeelt de inhoud, bepaalt de aanpak en beslist wat wordt gepubliceerd.',
    },
  ],
}

export const afsluiter = {
  titel: 'Ontdek hoe Orbit past in jouw bureau.',
  intro: 'Bekijk hoe je van een eerste prospectscan naar content, hermeting en een maandverslag gaat. Bespreek welke onderdelen aansluiten op jouw dienstverlening.',
  regel: 'Van eerste pitch tot maandverslag.',
}

export const formulier = {
  titel: 'Plan een demo',
  intro: 'Laat je gegevens achter. We nemen contact met je op om een moment te plannen.',
  privacy: 'We gebruiken je gegevens alleen om contact met je op te nemen over deze demo.',
  verstuur: 'Demo aanvragen',
  bedankt: 'Bedankt, je demoaanvraag is ontvangen.',
}

// De hoofdstukken van de rondleiding door de app, in de volgorde van het werk.
export const hoofdstukken = {
  inrichten: { nr: '01', titel: 'Een nieuwe klant inrichten', tekst: 'Van naam en website tot een merkdossier waar elke tekst op rust.' },
  meten: { nr: '02', titel: 'Meten', tekst: 'Wat AI-assistenten over je klant zeggen, en waar de kansen liggen.' },
  plannen: { nr: '03', titel: 'Plannen', tekst: 'Van kans naar een agenda die je klant kan volgen.' },
  schrijven: { nr: '04', titel: 'Schrijven en publiceren', tekst: 'Teksten die kloppen, en die jouw team live zet.' },
  bewijzen: { nr: '05', titel: 'Laten zien wat het oplevert', tekst: 'Hermeten, zoekverkeer en wat AI verkeerd zegt.' },
  maand: { nr: '06', titel: 'Elke maand, voor al je klanten', tekst: 'Het dagelijkse werk van je bureau.' },
}

export type Scherm = { label: string; titel: string; intro: string; punten: string[]; beeld: { titel: string; tekst?: string } }

// Twintig schermen van de app, elk met een eigen sectie. De feiten komen uit de productdocumentatie van
// ORBIT ENGINE (docs/Orbit_het_product.md) en de uitleg per scherm in de app (lib/uitleg.ts).
export const schermen = {
  nieuwBedrijf: {
    label: 'Een nieuwe klant',
    titel: 'Een naam en een website. Meer heeft Orbit niet nodig.',
    intro: 'Orbit leest de website, het aanbod, de concurrenten en de markt, en kijkt wat AI-assistenten al over het merk weten. Dat duurt ongeveer tien minuten en loopt op de achtergrond.',
    punten: ['Tot 1000 pagina\'s van de website gelezen.', 'Concurrenten en werkgebied uit het onderzoek.', 'Je kunt het scherm gewoon sluiten.'],
    beeld: { titel: 'Het onderzoek van een nieuw bedrijf' },
  },
  feiten: {
    label: 'Merkdossier',
    titel: 'Alles wat Orbit weet, met de bron erbij.',
    intro: 'Feiten en kennis over het bedrijf staan op één plek, per regel met waar hij vandaan komt. Wat op de website staat, heeft een letterlijk citaat. Een vermoeden gaat pas mee in een tekst als iemand het bevestigt.',
    punten: ['Een citaat van de website bij elke gevonden regel.', 'Brochures, tarieven en offertes als bron toevoegen.', 'Per regel zichtbaar of hij in teksten gebruikt wordt.'],
    beeld: { titel: 'Feiten en kennis van Fietsen Jansen' },
  },
  aanbod: {
    label: 'Aanbod',
    titel: 'Zie welke diensten nog geen eigen pagina hebben.',
    intro: 'Orbit zet het aanbod van het bedrijf op een rij, met per dienst de pagina waar het gevonden is. Een dienst zonder eigen pagina is lastig te vinden voor een AI-assistent, en vaak de snelste winst.',
    punten: ['Per dienst de pagina waar Orbit hem vond.', 'Filter op diensten zonder eigen pagina.'],
    beeld: { titel: 'Het aanbod, met de diensten zonder eigen pagina' },
  },
  onboarding: {
    label: 'Klant onboarding',
    titel: 'Leg vast wat een website niet vertelt.',
    intro: 'Een begeleid gesprek met de klant over groeidoelen, belangrijke diensten, regio\'s, bezwaren en verhalen uit de praktijk. Wat Orbit al op de website vond, bevestig je met één klik.',
    punten: ['Stap voor stap, in de volgorde van het gesprek.', 'De samenvatting mail je na afloop naar de klant.', 'Kansen die het groeidoel raken, krijgen voorrang.'],
    beeld: { titel: 'Een stap uit het gesprek met de klant' },
  },
  clusters: {
    label: 'Mijn clusters',
    titel: 'Meet per onderwerp, niet in het wilde weg.',
    intro: 'Een cluster is één afgebakend onderwerp met zijn eigen AI-vragen, zodat een stijging of daling iets zegt. Per cluster zet je de maandmeting aan, en Orbit meet op de eerste van de maand opnieuw.',
    punten: ['Zichtbaarheid per cluster, met de marge erbij.', 'Maandmeting per cluster aan of uit.', 'Voorgestelde onderwerpen uit het onderzoek.'],
    beeld: { titel: 'Alle clusters van een bedrijf' },
  },
  ontdekken: {
    label: 'Clusters ontdekken',
    titel: 'Vind de onderwerpen waar mensen echt naar zoeken.',
    intro: 'Orbit combineert de Search Console-cijfers van je klant, de klant onboarding, het aanbod en zoekdata van Google tot voorstellen voor nieuwe onderwerpen, elk met een reden en een zoekvolume.',
    punten: ['Hooguit twaalf voorstellen per ronde.', 'Zoekvolume als aanwijzing, niet als meting van AI-vragen.'],
    beeld: { titel: 'Voorstellen voor nieuwe onderwerpen' },
  },
  meetplan: {
    label: 'Meetplan',
    titel: 'Dertig vragen langs de hele klantreis.',
    intro: 'Orbit stelt per onderwerp de vragen op die mensen aan een AI-assistent stellen, verdeeld over oriëntatie, overweging en beslissing. Je loopt ze na, kiest de AI-assistenten en bevestigt. Pas dan begint de meting.',
    punten: ['Elke vraag aan te passen, uit te zetten of zelf toe te voegen.', 'Vragen waarbij iemand op het punt staat te kiezen, wegen zwaarder.', 'ChatGPT, Gemini en Google AI-overzichten per onderwerp aan of uit.'],
    beeld: { titel: 'Het meetplan voor bakfiets leasen' },
  },
  zichtbaarheid: {
    label: 'Zichtbaarheid in AI',
    titel: 'Eén cijfer, met de marge erbij.',
    intro: 'Zie hoe vaak AI-assistenten je klant noemen, op welke plek gemiddeld en hoe vaak de eigen website als bron wordt aangehaald. Elk cijfer heeft een onzekerheidsmarge, zodat je weet of een verschil echt is.',
    punten: ['Per cluster het verloop en hoeveel vragen meetellen.', 'Filter op AI-assistent, label en fase van de klantreis.', 'Elk AI-antwoord volledig terug te lezen.'],
    beeld: { titel: 'Zichtbaarheid in AI over zes maanden', tekst: 'De band om de lijn is de marge: een verschil daarbinnen kan toeval zijn.' },
  },
  concurrenten: {
    label: 'Concurrenten',
    titel: 'Zie wie wel wordt aangeraden, en waarom.',
    intro: 'Per vraag zie je welke merken genoemd worden en op welke plek je klant tussen hen staat. Orbit laat ook zien welke eigenschappen AI aan de concurrenten toeschrijft: een direct startpunt voor content en vermeldingen.',
    punten: ['Genoemde merken ingedeeld als concurrent, vergelijkingssite of eigen merk.', 'Als eerste aanbevolen, een van meerdere of zijdelings.'],
    beeld: { titel: 'Wie er genoemd wordt bij één vraag' },
  },
  kansen: {
    label: 'Kansen',
    titel: 'Elke gemiste vraag wordt een pagina-idee met bewijs.',
    intro: 'Bij elke kans staat hoe vaak je klant genoemd werd, welke concurrenten wel, of de eigen site als bron werd aangehaald en, met Search Console, hoeveel vertoningen en klikken eraan hangen. Daarmee overtuig je de klant.',
    punten: ['Nieuwe pagina\'s en verbeteringen van bestaande pagina\'s.', 'Overlappende ideeën worden samengevoegd.'],
    beeld: { titel: 'Een kans met het bewijs erbij' },
  },
  contentplan: {
    label: 'Contentplan',
    titel: 'Een jaarplan met de sterkste kansen.',
    intro: 'Orbit vult twaalf maanden met kansen, precies het aantal pagina\'s per maand uit de afspraak met je klant. Je start een maand in één keer, en ziet bovenaan wat er op jou wacht.',
    punten: ['5, 10, 20, 30, 40 of 50 pagina\'s per maand.', 'Vooraf zien wat een maand ongeveer kost.', 'Orbit begint tien dagen voor de publicatiedatum.'],
    beeld: { titel: 'Het contentplan, deze maand en volgende maand' },
  },
  plannen: {
    label: 'Inplannen',
    titel: 'Sleep een pagina naar de maand waarin hij hoort.',
    intro: 'Op het planbord staan de pagina-ideeën naast de komende maanden. Je zet een idee in een maand en ziet per maand hoeveel plekken er nog vrij zijn.',
    punten: ['Een eigen pagina-idee toevoegen met eigen materiaal.', 'Dienstpagina, artikel, gids, vergelijking of veelgestelde vragen.'],
    beeld: { titel: 'Het planbord' },
  },
  kalender: {
    label: 'Kalender',
    titel: 'Je contentagenda, per dag.',
    intro: 'De kalender toont het hele jaar, met per dag welke pagina live gaat en hoe het ervoor staat. Je ziet in één oogopslag wat op jou wacht en wat achterloopt.',
    punten: ['Een pagina verzetten naar een andere dag.', 'De rest van het jaar onder de maand.', 'Filter op één cluster.'],
    beeld: { titel: 'De kalender van oktober' },
  },
  vragen: {
    label: 'Openstaande vragen',
    titel: 'Je klant beantwoordt vragen op zijn telefoon.',
    intro: 'Wat alleen de ondernemer weet, zoals prijzen en werkwijze, vraagt Orbit gericht, met hooguit acht vragen per pagina. Je klant beantwoordt ze via een deellink, zonder account, en het schrijven start vanzelf na het laatste antwoord.',
    punten: ['Een datum meegeven, met een herinnering om te versturen.', 'Wat eenmaal beantwoord is, wordt nooit opnieuw gevraagd.'],
    beeld: { titel: 'De deellink op de telefoon van de klant' },
  },
  brief: {
    label: 'Content brief',
    titel: 'Elke pagina begint met onderzoek.',
    intro: 'Voor er een woord geschreven wordt, legt een brief vast wat er op de pagina moet, welke vragen de lezer heeft, wat concurrerende pagina\'s doen en welke informatie alleen het bedrijf kan geven.',
    punten: ['Het juiste soort pagina voor het doel.', 'Wat ontbreekt, gaat als vraag naar het bedrijf.'],
    beeld: { titel: 'De brief voor een pagina over bakfiets leasen' },
  },
  bibliotheek: {
    label: 'Bibliotheek',
    titel: 'Alle geschreven pagina\'s, met wat er nog moet gebeuren.',
    intro: 'In de bibliotheek staan de teksten zelf: wat je moet lezen en goedkeuren, wat klaarstaat om op de site te zetten en wat al live staat. Elke versie blijft bewaard.',
    punten: ['Goedkeuren, een aanpassing vragen of zelf bewerken.', 'Filter op één cluster.', 'Goedkeuren kun je ook bij de klant leggen.'],
    beeld: { titel: 'De bibliotheek van Fietsen Jansen' },
  },
  publiceren: {
    label: 'Publiceren',
    titel: 'Plakklaar voor elk CMS. Jouw team zet hem live.',
    intro: 'Kopieer de tekst als HTML, Markdown of platte tekst, met titel, metabeschrijving, veelgestelde vragen, gestructureerde gegevens en suggesties voor interne links. Meld daarna het adres: Orbit controleert of de pagina echt live staat.',
    punten: ['Orbit zet zelf niets op een website.', 'Na het melden plant Orbit de hermetingen.'],
    beeld: { titel: 'Een goedgekeurde pagina, klaar om live te zetten' },
  },
  zoekverkeer: {
    label: 'Zoekverkeer',
    titel: 'Wat de nieuwe pagina\'s doen in Google.',
    intro: 'Orbit haalt elke dag klikken, vertoningen, doorklikratio en positie op uit Google Search Console, alleen voor de pagina\'s die Orbit schreef. Een markering op de grafiek laat zien wanneer een pagina live ging.',
    punten: ['Elke pagina telt vanaf zijn eigen publicatiedatum.', 'Het effect in AI per pagina, los van Google.', 'Te exporteren als CSV.'],
    beeld: { titel: 'Zoekverkeer van de pagina\'s van Orbit', tekst: 'Een stijging na publicatie bewijst op zichzelf niet dat de pagina de oorzaak is.' },
  },
  feitencontrole: {
    label: 'Feitencontrole',
    titel: 'Zie wat AI verkeerd zegt over je klant.',
    intro: 'Een oud telefoonnummer of een dienst die het bedrijf niet levert: Orbit legt de antwoorden van AI-assistenten naast de kennis van het bedrijf. Per gegeven zie je het letterlijke citaat, wie het zei en wanneer.',
    punten: ['Na elke meting nagelopen, zonder extra kosten.', 'Een melding bij een nieuwe fout.'],
    beeld: { titel: 'Een onjuist gegeven in een AI-antwoord' },
  },
  overzicht: {
    label: 'Overzicht',
    titel: 'Elke maand dezelfde vijf stappen, en wie aan zet is.',
    intro: 'Het overzicht van een bedrijf toont bovenaan wat er op jou wacht, en daaronder de vijf stappen van deze maand: meten, plannen, schrijven, publiceren en hermeten. Ook een nieuwe collega weet zo meteen wat er moet gebeuren.',
    punten: ['Per stap wat er deze maand gebeurd is.', 'Meldingen, en een herinnering op maandagochtend.', 'Alles loopt op de achtergrond.'],
    beeld: { titel: 'Het overzicht van Fietsen Jansen in oktober' },
  },
} satisfies Record<string, Scherm>

// Tweede pagina onderaan /homepagina6: tien beelden in drie formaten (groot, middelgroot en compact),
// met een nieuw voorbeeld: Bureau Noordwind werkt voor installateur Klimaatwerk Voorbeeld in Tilburg aan
// het onderwerp hybride warmtepomp. De koppen komen uit het uitgewerkte idee van de eigenaar.
export type Segment = { label: string; titel: string; intro: string; beeld: string; tekst?: string }

export const pagina2 = {
  hero: {
    label: 'Voor marketingbureaus',
    titel: 'Maak AI-zichtbaarheid een dienst van je bureau.',
    intro: 'Zie welke koopvragen AI-assistenten beantwoorden zonder je klant te noemen, wie er wel genoemd wordt, en welke pagina je daarvoor kunt maken.',
    beeld: 'Van koopvraag naar meting naar vervolgactie',
  },
  pitch: {
    label: 'Nieuwe klanten',
    titel: 'Begin het klantgesprek met bewijs.',
    intro: 'Laat een prospect zien welke concurrenten AI aanbeveelt en waar zijn eigen bedrijf ontbreekt, op een pitchpagina in de huisstijl van je bureau. Je ziet wanneer de pitch voor het eerst geopend wordt.',
    beeld: 'Een pitch van Bureau Noordwind',
  },
  bureau: {
    label: 'Bureauoverzicht',
    titel: 'Al je klanten. Je volgende actie meteen duidelijk.',
    intro: 'Per klant de zichtbaarheid, hoe die zich ontwikkelt en wat er nu moet gebeuren. Bovenaan staat waar het langst iets wacht.',
    beeld: 'Het overzicht van vier klanten',
  },
  merkdossier: {
    label: 'Merkdossier',
    titel: 'Leer het merk kennen voordat je ervoor schrijft.',
    intro: 'Met een naam en een website zet Orbit het aanbod, de doelgroepen, het werkgebied, de merkstem en de bedrijfsfeiten op een rij. Bij elk feit staat de pagina waar het vandaan komt.',
    beeld: 'Van website naar merkdossier',
  },
  meting: {
    label: 'Meting',
    titel: 'Zie wanneer AI je klant aanbeveelt.',
    intro: 'Een cijfer per AI-assistent, met de marge erbij, en onder elk cijfer de koopvragen en de antwoorden die je zelf kunt teruglezen.',
    beeld: 'De koopvragen achter het cijfer',
  },
  kans: {
    label: 'Kansen',
    titel: 'Elke contentkans begint met een gemiste klantvraag.',
    intro: 'Orbit laat zien waarom een pagina nodig is: welke vraag hij moet winnen en wie die vraag nu wint. Met één klik staat hij in de planning.',
    beeld: 'Een kans en de maand waarin hij komt',
  },
  contentplan: {
    label: 'Contentplan',
    titel: 'Van losse kansen naar een uitvoerbaar maandplan.',
    intro: 'Elke maand een vast aantal pagina\'s, afgesproken met je klant: nieuwe dienstpagina\'s, verbeteringen van bestaande pagina\'s en vergelijkingen, elk met een stand die zegt wat er gebeurt.',
    beeld: 'Drie maanden van het contentplan',
  },
  schrijver: {
    label: 'Schrijven en controleren',
    titel: 'Content in de merkstem. Gevoelige claims gecontroleerd.',
    intro: 'Orbit schrijft in de stem van het merk en controleert bedragen, termijnen, garanties en keurmerken tegen het merkdossier. Wat niet bevestigd is, wordt gemarkeerd, en je team beslist.',
    beeld: 'Een garantie die nog bevestigd moet worden',
    tekst: 'Een gemarkeerde claim moet bevestigd of aangepast zijn voordat de tekst kan worden goedgekeurd.',
  },
  klantvraag: {
    label: 'Vragen aan je klant',
    titel: 'Laat je klant aanvullen wat alleen hij weet.',
    intro: 'Wat niet op de website staat, vraagt Orbit gericht aan de klant. Die antwoordt via een link op zijn telefoon, zonder account, en het antwoord komt meteen bij de pagina terecht.',
    beeld: 'Een antwoord van de klant, meteen bij het artikel',
  },
  resultaat: {
    label: 'Resultaat',
    titel: 'Laat zien wat er na publicatie gebeurt.',
    intro: 'Na publicatie meet Orbit dezelfde vragen opnieuw na 14 en 28 dagen, kijkt of AI de pagina als bron gebruikt en haalt de klikken uit Google. Het maandverslag zet het werk en de ontwikkeling op een rij.',
    beeld: 'Eén gepubliceerde pagina en het maandverslag',
    tekst: 'Een stijging na publicatie bewijst op zichzelf nog geen oorzakelijk effect.',
  },
} satisfies Record<string, Segment>

// Derde pagina onderaan /homepagina6: de tien voordelen van Orbit voor bureaus, elk met twee beelden in het
// raster van linear.app. De voordelen komen uit docs/Orbit_het_product.md (hoofdstuk 5 en 7) in ORBIT ENGINE.
export type Usp = { label: string; titel: string; intro: string; cellen: [{ titel: string; tekst: string }, { titel: string; tekst: string }] }

export const pagina3 = {
  kop: 'Waarom bureaus voor Orbit kiezen.',
  intro: 'Tien voordelen die je merkt in het werk voor je klanten, en in de marge van je bureau.',
  usps: [
    {
      label: '01 · Vangnet',
      titel: 'AI-content, zonder je reputatie op het spel te zetten.',
      intro: 'Een pagina mag alleen beweren wat in de gecontroleerde kennis over het bedrijf staat. Bedragen, termijnen, garanties en keurmerken worden gecontroleerd voordat iemand de tekst goedkeurt.',
      cellen: [
        { titel: 'Elke harde claim gecontroleerd', tekst: 'Wat niet in het merkdossier staat, wordt gemarkeerd, met de reden erbij.' },
        { titel: 'Goedkeuren kan pas als alles klopt', tekst: 'Twijfel je, leg de zin dan met één klik aan je klant voor.' },
      ],
    },
    {
      label: '02 · Bewijs',
      titel: 'Laat zien wat je werk oplevert, zodat je klant blijft.',
      intro: 'Na publicatie meet Orbit elke pagina opnieuw in AI en haalt de klikken uit Google Search Console. Alleen pagina\'s die Orbit schreef tellen mee.',
      cellen: [
        { titel: 'De bewijsladder per pagina', tekst: 'Zeven tredes, van gepubliceerd tot omzet. De klant ziet stap voor stap wat zijn pagina doet.' },
        { titel: 'Opbrengst die echt van het bureau is', tekst: 'Elke pagina telt vanaf zijn eigen publicatiedatum. Een cijfer zonder discussie.' },
      ],
    },
    {
      label: '03 · Meetmethode',
      titel: 'Een meting die overeind blijft bij een kritische klant.',
      intro: 'Vaste vragen langs de hele klantreis, herhaalde metingen waar het telt, weging naar commerciële waarde en bij elk cijfer een onzekerheidsmarge. Je verkoopt een meetmethode, geen screenshot.',
      cellen: [
        { titel: 'Bij elk cijfer de marge', tekst: 'Een verschil binnen de marge kan toeval zijn. Zo weet je altijd of een verschil echt is.' },
        { titel: 'Gewogen naar waar het geld zit', tekst: 'Een vraag waarbij iemand op het punt staat te kiezen, weegt zwaarder dan een algemene uitlegvraag.' },
      ],
    },
    {
      label: '04 · Marge',
      titel: 'Je marge blijft van jou.',
      intro: 'AI tegen kostprijs, op de eigen sleutels van je bureau, zonder opslag. Een maandlimiet houdt al het betaalde werk tegen zodra hij bereikt is, ook het automatische werk.',
      cellen: [
        { titel: 'Een maandlimiet voor je bureau', tekst: 'Verbruik per maand, per soort werk en per klant, met een schatting voor volgende maand.' },
        { titel: 'Vooraf weten wat iets kost', tekst: 'Bij elke betaalde knop staat wat het ongeveer kost, en wat er van de maandlimiet over is.' },
      ],
    },
    {
      label: '05 · Voor bureaus',
      titel: 'Een eigen, afgeschermde omgeving voor je bureau.',
      intro: 'Collega\'s werken als beheerder, klanten kijken mee als kijker, alleen bij hun eigen bedrijf. Andere bureaus zien niets van jou, ook niet dat je bestaat.',
      cellen: [
        { titel: 'Je team en je klanten', tekst: 'Beheerders zien alles binnen het bureau, een kijker alleen de bedrijven die je toewijst.' },
        { titel: 'Jij bepaalt wat een kijker mag', tekst: 'Vragen beantwoorden, goedkeuren of live melden. Wat geld kost, blijft bij het bureau.' },
      ],
    },
    {
      label: '06 · Schaal',
      titel: 'Een hele maand voor al je klanten in één klik.',
      intro: 'Vink klanten aan en start de maand, zet de maandmeting aan of kies het aantal pagina\'s, voor allemaal tegelijk. Meldingen zeggen wat er veranderde.',
      cellen: [
        { titel: 'Start de maand voor meerdere klanten', tekst: 'Voor het starten zie je hoeveel pagina\'s het zijn en ongeveer wat het kost.' },
        { titel: 'Meldingen die ertoe doen', tekst: 'Zichtbaarheid omhoog of omlaag, een pagina live, een vraag beantwoord. Op maandag een herinnering als er iets blijft liggen.' },
      ],
    },
    {
      label: '07 · Inzicht',
      titel: 'Begrijp waarom concurrenten winnen.',
      intro: 'Zie welke websites AI aanhaalt bij de vragen van je klant, waar een concurrent staat en je klant niet, en welke eigenschappen AI aan de concurrenten toeschrijft.',
      cellen: [
        { titel: 'De bronnen achter een aanbeveling', tekst: 'Per website wie er via die bron genoemd wordt. Een direct startpunt voor vermeldingen.' },
        { titel: 'Weten waarop je verliest', tekst: 'Na elke meting zie je welke eigenschappen AI aan de concurrenten toeschrijft.' },
      ],
    },
    {
      label: '08 · Vermeldingen',
      titel: 'Ook zichtbaar buiten de eigen website.',
      intro: 'Het werk om je klant op andere websites te laten verschijnen, op één lijst met status en opvolgdatum. Orbit controleert daarna of de vermelding er staat, en blijft dat doen.',
      cellen: [
        { titel: 'Terugkerend werk dat je kunt laten zien', tekst: 'Per vermelding de website, de reden, de status en wanneer je opvolgt.' },
        { titel: 'Een conceptbericht, klaar om te sturen', tekst: 'Op basis van gecontroleerde kennis. Je leest het na en verstuurt het zelf.' },
      ],
    },
    {
      label: '09 · Techniek',
      titel: 'Een website die AI goed kan lezen.',
      intro: 'Orbit leest elke maand tot 250 pagina\'s zoals de zoekbot van een AI-assistent ze ziet, en maakt er een takenlijst van voor de webbouwer. De controle is gratis.',
      cellen: [
        { titel: 'Zien wat een AI-bot mist', tekst: 'Tekst die pas met JavaScript verschijnt, bestaat voor de zoekbot van een AI-assistent niet.' },
        { titel: 'Een takenlijst voor de webbouwer', tekst: 'Per probleem waarom het ertoe doet, wie het oplost en op welke pagina\'s. Opgelost staat erbij met de datum.' },
      ],
    },
    {
      label: '10 · Zorgeloos',
      titel: 'Alles loopt op de achtergrond.',
      intro: 'Onderzoek, metingen, rapporten en schrijfwerk draaien vanzelf. Klap gerust je laptop dicht. En achter elk vraagteken staat wat je ziet en waarom het zo werkt, zodat ook een nieuwe collega meteen meekan.',
      cellen: [
        { titel: 'Het werk gaat door', tekst: 'Tijdelijke storingen worden vanzelf opnieuw geprobeerd. Elke stap kijkt eerst of zijn resultaat al bestaat.' },
        { titel: 'Uitleg op elk scherm', tekst: 'Wat je ziet, wat je kunt doen, waarom het zo werkt en wat de begrippen betekenen.' },
      ],
    },
  ] satisfies Usp[],
}
