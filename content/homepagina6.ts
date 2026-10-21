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
