// Teksten van de tweede testhomepage (/homepage2), opgebouwd volgens AIDA: aandacht, interesse, verlangen,
// actie. De insteek is de vraag die klanten van bureaus al stellen. Elke bewering staat in de
// productdocumentatie of in de code van ORBIT ENGINE; getallen in de beelden zijn voorbeelddata.
import type { FaqItem } from '@/content/home'

export const hero = {
  title: ['Je klanten vragen het al.', 'Geef ze een echt antwoord.'],
  description: 'Staat mijn bedrijf in ChatGPT? Met Orbit laat je bureau zien hoe AI over elke klant praat, waarom concurrenten wel genoemd worden en wat jullie eraan doen.',
  link: { label: 'Demo', titel: 'Bekijk Orbit in 15 minuten' },
}

export const noot = 'De schermen hieronder zijn voorbeelden met verzonnen bedrijven.'

/* Aandacht ---------------------------------------------------------------- */
export const aandacht = {
  titel: 'Eén screenshot is geen antwoord',
  tekst: 'Stel ChatGPT drie keer dezelfde vraag en je krijgt drie verschillende rijtjes. Wie één keer kijkt, ziet toeval. Je klant verdient een antwoord dat morgen nog klopt.',
}

/* Interesse ---------------------------------------------------------------- */
export const interesse = {
  titel: 'Orbit vertelt het hele verhaal',
  tekst: 'Niet alleen óf je klant genoemd wordt, maar ook waar het misgaat en waarom een ander de voorkeur krijgt.',
  kaarten: [
    { titel: 'Bij welke vragen', tekst: 'Dertig vragen per onderwerp, van eerste oriëntatie tot het moment van kiezen.' },
    { titel: 'Wie in zijn plaats', tekst: 'De merken die AI wel noemt, ingedeeld als concurrent, vergelijkingssite of brancheorganisatie.' },
    { titel: 'En waarom', tekst: 'Welke eigenschappen AI aan de concurrent toeschrijft, en welke websites het daarvoor aanhaalt.' },
  ],
  kans: {
    titel: 'Van gemiste vraag naar concreet werk',
    tekst: "Elke vraag waarbij je klant ontbreekt, wordt een pagina-idee met het bewijs erbij. Staat er al een pagina die er bijna op lijkt, dan stelt Orbit een verbetering voor in plaats van een nieuwe pagina.",
  },
}

/* Verlangen ---------------------------------------------------------------- */
export const verlangen = {
  maand: {
    titel: 'Zo ziet een maand eruit',
    tekst: 'Orbit doet het zware werk op de achtergrond. Je team kijkt na, kiest en stuurt bij. Je klant ziet elke maand wat er gebeurd is.',
    momenten: [
      { dag: '1', titel: 'Meting', tekst: 'Orbit stelt dezelfde vragen opnieuw en zet de uitkomst naast vorige maand.' },
      { dag: '3', titel: 'Plan', tekst: "Je kiest welke pagina's deze maand gemaakt worden." },
      { dag: '8', titel: 'Vragen aan je klant', tekst: 'Wat alleen de ondernemer weet, gaat via een link naar hem toe.' },
      { dag: '15', titel: 'Teksten klaar', tekst: 'Je keurt goed, past aan of laat het je klant goedkeuren.' },
      { dag: '20', titel: 'Live', tekst: 'Orbit controleert of de pagina echt online staat.' },
      { dag: '+14', titel: 'Nameting', tekst: 'Na 14 en 28 dagen meet Orbit of de pagina iets deed.' },
    ],
  },
  klant: {
    titel: 'Je klant doet mee, zonder account',
    tekst: 'Prijzen, werkwijze, een voorbeeld uit de praktijk: wat alleen de ondernemer weet, vraagt Orbit gericht. Hij antwoordt op zijn telefoon wanneer het hem uitkomt, en een beantwoorde vraag komt nooit terug.',
    punten: ['Hooguit acht vragen per pagina', 'Een link per klant, ook voor collega\'s', 'Een herinnering om zo te versturen'],
  },
  feiten: {
    titel: 'Feiten in plaats van beloftes',
    lijst: [
      { getal: '3', label: 'AI-kanalen, elk met een eigen cijfer' },
      { getal: '30', label: 'vragen per onderwerp, langs de klantreis' },
      { getal: '± marge', label: 'bij elk cijfer, zodat je ziet wat echt is' },
      { getal: '14 en 28', label: 'dagen na publicatie meet Orbit opnieuw' },
    ],
  },
}

/* Actie ---------------------------------------------------------------- */
export const actie = {
  titel: 'Zo zet je de eerste stap',
  tekst: 'Er is niets te installeren en je hoeft geen GEO-specialist te zijn.',
  stappen: [
    { titel: 'Plan een demo', tekst: 'In 15 of 45 minuten zie je hoe Orbit werkt en stel je al je vragen.' },
    { titel: 'Je bureau krijgt een omgeving', tekst: 'Je ontvangt een uitnodiging per mail en vult de sleutel van OpenAI van je bureau in.' },
    { titel: 'Voeg je eerste klant toe', tekst: 'Naam en website zijn genoeg. Na ongeveer tien minuten onderzoek begin je met meten.' },
  ],
  knop: 'Plan een gratis demo',
  tweede: { label: 'Bekijk de prijzen', href: '/prijzen' },
}

export const faq: { title: string; items: FaqItem[] } = {
  title: 'Nog twijfels?',
  items: [
    {
      question: 'Kan ik Orbit eerst bij één klant gebruiken?',
      answer: 'Ja. Je voegt klanten toe wanneer je wilt, één voor één. Elke klant krijgt zijn eigen onderzoek, metingen en contentplan.',
    },
    {
      question: 'Wat als AI mijn klant niet noemt?',
      answer: 'Dan heb je je startpunt. Je ziet welke merken wel genoemd worden, bij welke vragen, en welke pagina\'s het verschil kunnen maken.',
    },
    {
      question: 'Wie betaalt het AI-gebruik?',
      answer: 'Je bureau, rechtstreeks bij OpenAI en tegen kostprijs. Met een maandlimiet stopt al het betaalde werk zodra het bedrag bereikt is, en bij elke betaalde knop zie je vooraf wat het ongeveer kost.',
    },
    {
      question: 'Ziet mijn klant wat ik voor andere klanten doe?',
      answer: 'Nee. Een klant kijkt mee als kijker, alleen bij zijn eigen bedrijf, en alleen met de rechten die jij hem geeft.',
    },
  ],
}

export const afsluiter = {
  title: 'De volgende keer dat je klant het vraagt, heb je het antwoord.',
  description: 'Plan een demo en zie hoe je bureau met Orbit laat zien hoe AI over je klanten praat.',
}
