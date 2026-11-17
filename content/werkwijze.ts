// Teksten van de pagina Werkwijze (/werkwijze): een hero, een introductie, een overzicht van de tien stappen
// en per stap een titel, een pakkende regel (aanloop, groot) en een korte toelichting (tekst, klein).
//
// Elke stap zegt drie dingen: wat er gebeurt, wie het doet (jij, je klant of Orbit) en wat het je bureau
// oplevert. Wat hier staat, doet de app nu al en is nagelopen in de procesdocumentatie en de code van
// orbit-engine: het onderzoek van ongeveer tien minuten, Klant onboarding, dertig vragen per onderwerp met
// herhalingen en een marge, het contentplan met contentmix, hooguit acht vragen per pagina, de deellink
// zonder account, de controles in code, kopiëren en live melden, de hermeting na 14 en 28 dagen en het
// maandverslag. Er staan geen verzonnen cijfers of tijdwinst in.

export type Stap = { nr: number; id: string; titel: string; aanloop: string; tekst: string }

// `title` is de korte naam van de pagina; `zoektitel` en `description` staan in de zoekresultaten en bij een
// gedeelde link. Richtlijn: de titel hooguit 60 tekens, de omschrijving hooguit 158.
export const meta = {
  title: 'Werkwijze',
  zoektitel: 'Zo werkt Orbit: van AI-meting tot maandverslag in 10 stappen',
  description:
    'Eén werkproces voor al je klanten. Merkdossier in tien minuten, nulmeting in ChatGPT, contentplan, pagina’s en elke maand een verslag met je bureaunaam.',
}

export const hero = {
  eyebrow: 'Werkwijze',
  title: 'Zo werk je met Orbit, van eerste onderzoek tot maandverslag.',
}

// Introductie tussen de hero en het overzicht: het vetgedrukte deel in het wit, de rest in grijs.
export const intro = {
  strong: 'Hoe begin je met een klant in Orbit?',
  rest: 'Hieronder zie je hoe Orbit het bedrijf onderzoekt, de zichtbaarheid in AI meet en teksten schrijft. Je leest ook waar jouw team en je klant bij betrokken zijn.',
}

// Kop boven het overzicht van de tien stappen, direct onder de introductie.
export const overzicht = { titel: 'De tien stappen' }

export const stappen: Stap[] = [
  {
    nr: 1,
    id: 'klant-toevoegen',
    titel: 'Voeg je klant toe',
    aanloop: 'Vul de bedrijfsnaam en website in. Orbit onderzoekt wat je klant aanbiedt en wie de concurrenten zijn.',
    tekst:
      'Orbit leest de website en verzamelt informatie over de producten, diensten en het werkgebied. Ook onderzoekt het de concurrenten en wat AI al over het bedrijf weet. Na ongeveer tien minuten kun je het overzicht bekijken en waar nodig aanvullen of corrigeren. Je hoeft het vooronderzoek dus niet vanaf nul te doen en hebt een basis voor het gesprek met je klant.',
  },
  {
    nr: 2,
    id: 'klant-onboarden',
    titel: 'Bespreek wat je klant wil bereiken',
    aanloop: 'Je klant vertelt waar de groei moet komen en wat het bedrijf bijzonder maakt.',
    tekst:
      'Welke diensten verdienen meer aandacht? Wat vragen klanten voordat ze kopen? En hoe wil het bedrijf zich presenteren? Die informatie leg je vast in Orbit, eventueel aangevuld met brochures of prijslijsten. Ook geef je aan welke schrijfstijl bij je klant past. Samen kies je de onderwerpen waarvoor het bedrijf gevonden wil worden, zoals ‘bakfiets leasen’ of ‘onderhoud aan een elektrische fiets’.',
  },
  {
    nr: 3,
    id: 'nulmeting',
    titel: 'Meet hoe vaak AI je klant noemt',
    aanloop: 'Orbit stelt per onderwerp standaard dertig vragen die een potentiële klant zou kunnen stellen.',
    tekst:
      'Bijvoorbeeld: ‘Welke fietsenmaker in Utrecht repareert e-bikes?’ Orbit controleert of ChatGPT je klant noemt en welke concurrenten in het antwoord staan. Je kunt ook Gemini en de AI-overzichten van Google laten meten. Belangrijke vragen worden in ChatGPT herhaald, omdat antwoorden kunnen wisselen. Bij de score staat een onzekerheidsmarge. Deze eerste meting is het vertrekpunt waarmee je latere resultaten vergelijkt.',
  },
  {
    nr: 4,
    id: 'contentplan',
    titel: 'Kies welke pagina’s je gaat maken',
    aanloop: 'De meting laat zien welke onderwerpen kansen bieden. Orbit stelt daar passende pagina’s bij voor.',
    tekst:
      'Bij ieder voorstel zie je welke vragen de pagina moet beantwoorden en waarom het onderwerp relevant is. Dat kan een artikel zijn, maar ook een dienstpagina of een verbetering van bestaande content. Jij bepaalt wat voorrang krijgt en hoeveel pagina’s je per maand wilt maken. Orbit zet die in een planning. Voor meerdere klanten kun je het werk voor de nieuwe maand tegelijk starten.',
  },
  {
    nr: 5,
    id: 'voorbereiding',
    titel: 'Orbit bereidt elke pagina voor',
    aanloop: 'Voor het schrijven onderzoekt Orbit wat de pagina moet vertellen en welke informatie nog ontbreekt.',
    tekst:
      'Orbit gebruikt de verzamelde bedrijfsinformatie en onderzoekt het onderwerp verder. Waar beschikbaar bekijkt het ook de pagina’s waarnaar AI in de meting verwees. Vervolgens bepaalt Orbit de opbouw en inhoud van de tekst. Ontbreken bijvoorbeeld prijzen, levertijden of een praktijkvoorbeeld? Dan zet het gerichte vragen klaar voor je klant. Zo kan de pagina straks vertellen hoe dit bedrijf werkt, met informatie die je niet uit algemeen onderzoek haalt.',
  },
  {
    nr: 6,
    id: 'klant-vult-aan',
    titel: 'Vraag je klant om de ontbrekende informatie',
    aanloop: 'Stuur de vragen naar je klant via een link. Antwoorden kan zonder account, ook op de telefoon.',
    tekst:
      'De ondernemer, verkoper of planner vult aan wat alleen het bedrijf zelf weet. Denk aan de kosten van een onderhoudsbeurt of hoe een installatie verloopt. De antwoorden worden bewaard, zodat Orbit ze ook voor volgende pagina’s kan gebruiken. Een vraag die niet relevant is, kun je overslaan. Zodra alle vragen voor een pagina zijn beantwoord of overgeslagen, kan Orbit verder met schrijven.',
  },
  {
    nr: 7,
    id: 'orbit-schrijft',
    titel: 'Orbit schrijft de tekst',
    aanloop: 'Orbit schrijft met de informatie van je klant en de schrijfstijl die jullie hebben gekozen.',
    tekst:
      'De tekst beantwoordt de vragen waarvoor de pagina is gepland, met het aanbod, de uitleg en de voorbeelden van je klant. Daarna kijkt Orbit de tekst na en controleert het onder meer de onderbouwing van bedragen, termijnen en garanties. Naast de tekst krijg je een titel, een omschrijving voor zoekmachines en veelgestelde vragen. Orbit kan ook links opnemen naar andere pagina’s op de website. Vervolgens staat de tekst klaar voor jouw beoordeling.',
  },
  {
    nr: 8,
    id: 'goedkeuren-en-live',
    titel: 'Kijk de tekst na en publiceer',
    aanloop: 'Je leest de tekst, past aan wat nodig is en bepaalt wanneer hij op de website komt.',
    tekst:
      'Heeft Orbit een bewering niet kunnen onderbouwen, bijvoorbeeld over een prijs of garantie? Dan staat erbij wat je moet controleren. Je kunt de tekst aanpassen, een wijziging laten schrijven of je klant om bevestiging vragen. Na goedkeuring plaats jij of je klant de tekst op de website. Je geeft het webadres door aan Orbit. Het platform controleert de publicatie en plant de vervolgmetingen in.',
  },
  {
    nr: 9,
    id: 'effect-meting',
    titel: 'Bekijk wat er na publicatie verandert',
    aanloop: 'Na twee en vier weken herhaalt Orbit de vragen waarvoor de pagina is geschreven.',
    tekst:
      'Je ziet of je klant bij deze vragen vaker wordt genoemd dan vóór de publicatie. Orbit geeft ook aan wanneer er te weinig gegevens zijn om een duidelijke verandering vast te stellen. Een stijging is een aanwijzing; ook andere ontwikkelingen kunnen meespelen. Koppel je Google Search Console, dan zie je daarnaast hoe vaak de gepubliceerde pagina’s in Google verschijnen en hoeveel mensen doorklikken.',
  },
  {
    nr: 10,
    id: 'maandverslag',
    titel: 'Bespreek de maand met je klant',
    aanloop: 'Orbit zet de metingen, gepubliceerde pagina’s en planning bij elkaar in een verslag met jouw bureaunaam.',
    tekst:
      'Je hoeft de voortgang niet zelf uit verschillende overzichten te verzamelen. Het verslag laat zien hoe de AI-zichtbaarheid zich ontwikkelt, welke pagina’s zijn gepubliceerd en wat er voor de volgende maand gepland staat. Sla het op als pdf om met je klant te delen. Zo heb je de informatie bij de hand om resultaten te bespreken en prioriteiten bij te stellen. Met nieuwe metingen en pagina’s werk je de volgende maand verder.',
  },
]

// De afsluiter van deze pagina: een eigen kop en zin, met daaronder de knop Gratis uitproberen.
export const afsluiter = {
  title: 'Ontdek hoe Orbit werkt voor jouw klant',
  description: 'Probeer het zelf: laat Orbit één bedrijf onderzoeken, de zichtbaarheid voor één onderwerp meten in ChatGPT en een eerste tekst schrijven. Gratis.',
}
