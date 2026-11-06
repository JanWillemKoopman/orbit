// Teksten van de pagina Werkwijze (/werkwijze): een hero, een overzicht van de tien stappen en per stap
// een titel met tekst en een beeld. De tekst van een stap is opgesplitst in een aanloop (groot) en de
// rest (klein); samen vormen ze letterlijk de aangeleverde tekst, met één spatie ertussen. De beelden
// zijn nagebouwde schermen van Orbit met de fictieve voorbeeldcase Lindeman Warmte.

export const meta = {
  title: 'Werkwijze',
  description:
    "Zo werkt Orbit in tien stappen: van een nieuwe klant en de nulmeting tot het contentplan, de pagina's, de effectmeting en het maandverslag.",
}

export const hero = {
  eyebrow: 'Werkwijze',
  title: 'Elke maand dezelfde ronde. Met bewijs aan het eind.',
}

// Introductie tussen de hero en de eerste stap, in dezelfde vorm als de grote tussenzin op de homepage:
// het vetgedrukte deel staat in het wit, de rest in grijs, en de woorden lichten op tijdens het scrollen.
export const intro = {
  strong: 'Van klantstrategie tot groeikans in AI zichtbaarheid.',
  rest: 'Orbit brengt analyse, contentcreatie, publicatie en nameting samen in één doorlopende workflow. Jouw team bepaalt de koers. AI versnelt de uitvoering.',
}

export type Stap = { nr: number; id: string; titel: string; aanloop: string; tekst: string }

export const stappen: Stap[] = [
  {
    nr: 1,
    id: 'klant-toevoegen',
    titel: 'Klant toevoegen',
    aanloop: 'Je vult een naam en een website in. Meer niet.',
    tekst:
      'Vanaf dat moment doet Orbit het werk waar een strateeg dagen mee bezig is: het leest de complete website, brengt het hele aanbod in kaart, zoekt de concurrenten op en test wat AI-assistenten nu al over het merk weten. Terwijl jij koffie haalt, bouwt Orbit een compleet merkdossier. Je begint elk nieuw klanttraject dus met een voorsprong.',
  },
  {
    nr: 2,
    id: 'klant-onboarden',
    titel: 'Klant onboarden',
    aanloop: 'Met dat dossier op tafel wordt je kennismakingsgesprek direct een strategiesessie.',
    tekst:
      'Samen met je klant scherp je het aan: het aanbod, de concurrenten, de doelgroep en het verhaal van het merk. Brochures, prijslijsten en andere documenten voeg je met één klik toe. Zo groeit één centrale kennisbank per klant, waarin elk feit zijn bron heeft, of die nu uit de website, een document of de klant zelf komt. Aan het eind van het gesprek liggen de onderwerpen vast waarop je gaat winnen.',
  },
  {
    nr: 3,
    id: 'nulmeting',
    titel: 'De nulmeting',
    aanloop: 'Hier wordt het spannend. Per onderwerp stelt Orbit dertig vragen zoals echte klanten ze aan AI stellen, van de eerste oriëntatie tot het moment van kiezen.',
    tekst:
      'Orbit leest elk antwoord na: wordt je klant genoemd, op welke plek, en welke concurrent gaat ervandoor? Zo heb je zwart op wit hoe zichtbaar het merk is in AI. Je ziet ook precies waar de kansen liggen. Dat is een gesprek dat iedere klant wil voeren.',
  },
  {
    nr: 4,
    id: 'contentplan',
    titel: 'Het contentplan',
    aanloop: 'Elke kans wordt een concreet pagina-idee, met de vragen die die pagina moet gaan winnen.',
    tekst:
      'Orbit kiest er meteen de vorm bij die werkt: een dienst- of productpagina, een artikel, een gids, een pagina met veelgestelde vragen of een vergelijking. Jij bepaalt per klant het tempo, en Orbit zet alles in een overzichtelijke maandplanning. Werk je voor tien klanten? Dan start je met één klik de maand voor allemaal tegelijk. Zo schaal je zonder extra mensen.',
  },
  {
    nr: 5,
    id: 'voorbereiding',
    titel: 'De voorbereiding',
    aanloop: 'Waar andere tools meteen beginnen met schrijven, doet Orbit eerst onderzoek.',
    tekst:
      'Per pagina legt het de kennisbank van je klant naast actuele bronnen van internet, en zet in een scherpe briefing wat erop moet om de vraag beter te beantwoorden dan de concurrent. Orbit weet ook wat het niet weet. In plaats van prijzen, garanties of ervaringen te verzinnen, stelt het die als gerichte vragen aan je klant. Zo wordt elke pagina uniek en klopt alles.',
  },
  {
    nr: 6,
    id: 'klant-vult-aan',
    titel: 'De klant vult aan',
    aanloop: 'Je klant krijgt de vragen kort en overzichtelijk, per pagina en met een duidelijke deadline.',
    tekst:
      'Hij beantwoordt ze via een link die je doorstuurt, zonder in te loggen en zonder gedoe. Is er iets wat hij zelf graag op de pagina ziet? Dan is daar altijd ruimte voor. Zo komt echte kennis uit het bedrijf op de pagina’s te staan, en precies dat maakt het verschil bij AI-assistenten.',
  },
  {
    nr: 7,
    id: 'orbit-schrijft',
    titel: 'Orbit schrijft',
    aanloop: 'Op het juiste moment schrijft Orbit de pagina, in de toon en de aanspreekvorm van het merk.',
    tekst:
      'Orbit schrijft niet uit losse pols: elke pagina rust op de centrale kennisbank, de antwoorden van je klant en de briefing. Het resultaat is ijzersterke content die op feiten staat. Na een automatische eindredactie wordt elk bedrag, getal en keurmerk gecontroleerd tegen wat je klant echt heeft bevestigd. Je krijgt een complete pagina met titel, omschrijving voor Google en veelgestelde vragen.',
  },
  {
    nr: 8,
    id: 'goedkeuren-en-live',
    titel: 'Content goedkeuren en live zetten',
    aanloop: 'Jij houdt de regie en jouw bureau blijft het gezicht naar de klant.',
    tekst:
      'Orbit markeert de zinnen die nog een blik verdienen, zodat je pagina’s in een paar minuten goedkeurt in plaats van in een uur. Met één klik kopieer je de tekst in het juiste formaat voor elke website. Daarna geef je het adres door, en Orbit controleert zelf of de pagina echt online staat. Vanaf dat moment loopt de klok.',
  },
  {
    nr: 9,
    id: 'effect-meting',
    titel: 'Effect meting',
    aanloop: 'Dit is waar Orbit zich echt onderscheidt: je ziet wat je werk oplevert.',
    tekst:
      'Twee en vier weken na publicatie stelt Orbit dezelfde vragen opnieuw en zet het resultaat naast de stand van vóór de pagina. Wordt je klant vaker genoemd? Staat hij hoger? Je ziet het per pagina. Met Google Search Console gekoppeld volg je ook het effect in Google. Zo wordt AI-zichtbaarheid meetbaar.',
  },
  {
    nr: 10,
    id: 'maandverslag',
    titel: 'Maandverslag',
    aanloop: 'Elke maand ligt er per klant een helder verslag klaar, met de naam van jouw bureau erop.',
    tekst:
      'Daarin staat wat er is gemaakt, hoe de zichtbaarheid in AI groeit en wat de volgende stap is. Geen gepuzzel met spreadsheets, geen avonden rapportages schrijven. Je klant ziet elke maand de waarde van je werk, en jij hebt het perfecte gesprek voor de verlenging. Daarna begint de cyclus opnieuw.',
  },
]

export const afsluiter = {
  title: 'Bekijk hoe Orbit in je bureau past.',
  description: 'Ontdek de werkwijze in een demo en bespreek welke klant geschikt is voor een eerste toepassing.',
}
