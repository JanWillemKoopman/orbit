// Teksten en beelden van de productpagina (/product). De beelden zijn echte schermen van
// ORBIT ENGINE met fictieve voorbeeldgegevens; ze worden opnieuw gemaakt met de scripts in
// scripts/product-screenshots (zie de README daar).
import type { StaticImageData } from 'next/image'
import taken from '@/public/images/product/product-01-openstaande-taken.webp'
import takenMobiel from '@/public/images/product/product-01-openstaande-taken-mobiel.webp'
import zichtbaarheid from '@/public/images/product/product-02-ai-zichtbaarheid.webp'
import zichtbaarheidMobiel from '@/public/images/product/product-02-ai-zichtbaarheid-mobiel.webp'
import antwoord from '@/public/images/product/product-03-ai-antwoord.webp'
import merkdossier from '@/public/images/product/product-04-merkdossier.webp'
import feiten from '@/public/images/product/product-05-feiten-en-kennis.webp'
import idee from '@/public/images/product/product-06-pagina-idee.webp'
import contentplan from '@/public/images/product/product-07-contentplan.webp'
import vragen from '@/public/images/product/product-08-openstaande-vragen.webp'
import klantweergave from '@/public/images/product/product-09-klantweergave.webp'
import tekst from '@/public/images/product/product-10-bibliotheek-tekst.webp'
import zinnen from '@/public/images/product/product-11-zinnen-nalopen.webp'
import goedgekeurd from '@/public/images/product/product-12-goedgekeurd.webp'
import hermeting from '@/public/images/product/product-13-hermeting.webp'
import zoekverkeer from '@/public/images/product/product-14-zoekverkeer.webp'
import verslag from '@/public/images/product/product-15-maandverslag.webp'
import werkoverzicht from '@/public/images/product/product-16-werkoverzicht.webp'
import werkoverzichtMobiel from '@/public/images/product/product-16-werkoverzicht-mobiel.webp'
import toegang from '@/public/images/product/product-17-toegang.webp'
import kosten from '@/public/images/product/product-18-kosten.webp'

export type Shot = {
  src: StaticImageData
  /** Een gerichte uitsnede voor telefoons, als het hele scherm daar te klein wordt. */
  mobiel?: StaticImageData
  alt: string
}

export const meta = {
  title: 'Product',
  description:
    'Zie hoe ORBIT ENGINE werkt: AI-zichtbaarheid meten, contentkansen plannen, klantkennis ophalen, pagina\'s schrijven en beoordelen, en het resultaat volgen. Voor marketingbureaus met meerdere klanten.',
}

export const demoHref = '/contact?onderwerp=demo'

export const hero = {
  eyebrow: 'ORBIT ENGINE voor bureaus',
  title: 'Van AI-zichtbaarheid naar content die je kunt publiceren.',
  description:
    'Onderzoek waar je klanten worden genoemd, vertaal inzichten naar een contentplan en schrijf met hun bedrijfskennis als basis. ORBIT ENGINE brengt onderzoek, klantinput, beoordeling en opvolging samen voor jouw bureau.',
  cta: 'Demo aanvragen',
  secondary: 'Bekijk hoe het werkt',
  note: 'Productbeelden met fictieve voorbeeldgegevens',
  shot: {
    src: taken,
    mobiel: takenMobiel,
    alt: 'Het scherm Openstaande taken van Lindeman Warmte. Bovenaan de maand oktober met de stappen Meten, Plannen, Schrijven, Publiceren en Hermeten. Daaronder wat er wacht: november van het contentplan starten, twee vragen over het bedrijf, een briefing invullen, een pagina nakijken en een pagina publiceren.',
  } satisfies Shot,
}

// De vijf stappen van een maand, zoals de app ze toont. Elke stap linkt naar zijn sectie.
export const ronde = [
  { label: 'Meten', href: '#zichtbaarheid' },
  { label: 'Plannen', href: '#planning' },
  { label: 'Schrijven', href: '#schrijven' },
  { label: 'Publiceren', href: '#publiceren' },
  { label: 'Hermeten', href: '#opvolging' },
]

export const zichtbaarheidSectie = {
  id: 'zichtbaarheid',
  title: 'Zie bij welke vragen je klant wordt genoemd.',
  description:
    'Stel per onderwerp een meetplan samen met relevante AI-vragen. Bekijk in de gemeten antwoorden welke bedrijven worden genoemd, welke bronnen worden aangehaald en waar je klant ontbreekt.',
  overzicht: {
    src: zichtbaarheid,
    mobiel: zichtbaarheidMobiel,
    alt: 'Zichtbaarheid in AI voor Lindeman Warmte: 32 procent over alle clusters met een marge van 11 punten, drie clusters met een eigen lijn, en een tabel per cluster met marge, verandering, gemeten AI-vragen en de kolom Telt mee.',
  } satisfies Shot,
  detail: {
    src: antwoord,
    alt: 'Een opengeklapt AI-antwoord op de vraag "Welke installateur in Utrecht is goed in hybride warmtepompen?". Lindeman Warmte is gemist; genoemd worden Warmtewerk Utrecht, Domstad Installaties en KlimaatPro, met de aangehaalde bronnen eronder.',
  } satisfies Shot,
  detailTitle: 'Elk antwoord na te lezen',
  detailText:
    'Klap een vraag open en lees wat de AI-assistent antwoordde: wie er genoemd wordt, in welke volgorde en op welke bronnen dat leunt. Hier zie je precies waar je klant nog ontbreekt.',
  note: 'Metingen op basis van een vaste vragenset per onderwerp, elke maand opnieuw.',
}

export const kennisSectie = {
  id: 'kennis',
  title: 'Elke klant een eigen kennisbasis.',
  description:
    'Breng aanbod, doelgroep, merkstem en bedrijfsfeiten samen in een merkdossier. Vul het aan met klantkennis en documenten, zodat volgende schrijfopdrachten voortbouwen op wat al is vastgelegd.',
  shots: [
    {
      src: merkdossier,
      alt: 'Het merkdossier van Lindeman Warmte bij de stap Je klant: voor wie het bedrijf het vooral doet, waarom klanten voor hen kiezen en met wie ze vergeleken worden.',
      title: 'Merkdossier',
      caption: 'Aanbod, doelgroep en merkstem op één plek.',
    },
    {
      src: feiten,
      alt: 'Feiten en kennis van Lindeman Warmte: aanbod, prijzen en werkwijze, elk met de bron (antwoord, gesprek, website), de datum en of het gebruikt wordt bij het schrijven.',
      title: 'Feiten en kennis',
      caption: 'Zie waar bedrijfsinformatie vandaan komt.',
    },
  ],
}

export const planningSectie = {
  id: 'planning',
  title: 'Geef inzichten een plek in je contentplan.',
  description:
    'Bekijk voorstellen voor nieuwe pagina\'s en verbeteringen aan bestaande content, met de vragen die ze moeten helpen beantwoorden. Bepaal de prioriteit, voeg eigen ideeën toe en plan het werk per maand.',
  idee: {
    src: idee,
    alt: 'Het pagina-idee "Hybride warmtepomp laten installeren in Utrecht" met potentie 78, raakt 8 van de 30 gemeten vragen, de onderbouwing en het bewijs per bron: ChatGPT noemt Lindeman Warmte bij 0 van de 8 vragen en drie concurrenten wel.',
  } satisfies Shot,
  ideeTitle: 'Van gemist antwoord naar paginavoorstel',
  ideeText:
    'De vraag waarbij ChatGPT drie concurrenten noemt, wordt een concreet voorstel: een pagina over hybride warmtepompen in Utrecht. Met de onderbouwing, het aantal vragen dat hij raakt en het bewijs per bron. Eén klik en hij staat in oktober.',
  plan: {
    src: contentplan,
    alt: 'Het contentplan van Lindeman Warmte in de weergave Plannen: de ideeënlijst links, rechts oktober met vijf pagina\'s in verschillende stappen en november dat klaarstaat om te starten.',
  } satisfies Shot,
  planCaption: 'Per maand zie je welke pagina op antwoorden, akkoord of publicatie wacht.',
}

export const inputSectie = {
  id: 'klantinput',
  title: 'Haal de kennis op die alleen je klant heeft.',
  description:
    'ORBIT ENGINE bereidt pagina\'s voor en stelt gerichte vragen over ontbrekende informatie. Je klant beantwoordt die in de app of via een deellink, zonder account. De antwoorden worden vastgelegd voor het schrijven.',
  team: {
    src: vragen,
    alt: 'Openstaande vragen voor de pagina "Hybride warmtepomp laten installeren in Utrecht": hoe lang het plaatsen duurt en uit welke onderdelen de prijs bestaat, elk met de reden waarom de vraag gesteld wordt.',
    label: 'Voor je team',
    caption: 'Alle open vragen per pagina, met de reden erbij en een link om te delen.',
  },
  klant: {
    src: klantweergave,
    alt: 'De klantweergave op een telefoon: Vragen voor Lindeman Warmte, graag beantwoord vóór 12 oktober, met het antwoord over de prijsopbouw al ingevuld.',
    label: 'Voor je klant',
    caption: 'Je klant opent de link en antwoordt, zonder account.',
  },
}

export const schrijfSectie = {
  id: 'schrijven',
  title: 'Schrijf vanuit bedrijfskennis. Beoordeel met context.',
  description:
    'Laat pagina\'s voorbereiden, schrijven en redigeren op basis van het merkdossier en de aangeleverde antwoorden. Harde beweringen zonder voldoende onderbouwing worden gemarkeerd, zodat je team gericht kan controleren.',
  tekst: {
    src: tekst,
    alt: 'De geschreven pagina "Hybride warmtepomp laten installeren in Utrecht" in de Bibliotheek, met de introductie en de tussenkoppen Hoe de installatie verloopt, Wat er in de prijs zit, Voor welke woningen het werkt en Garantie en service.',
  } satisfies Shot,
  zinnen: {
    src: zinnen,
    alt: 'Het blok Loop deze zinnen na met één gemarkeerde zin over een installatietermijn van twee weken, de reden dat hij geel is, en de knoppen Klopt, Pas aan en Vraag het bedrijf.',
  } satisfies Shot,
  zinnenTitle: 'Controleer wat ertoe doet',
  zinnenText:
    'Het antwoord van de klant staat letterlijk in de tekst: de installatie duurt één werkdag. Een termijn die nergens is vastgelegd, wordt geel gemarkeerd met de reden erbij. Bevestig hem, pas hem aan of leg hem met één klik aan je klant voor.',
}

export const publicerenSectie = {
  id: 'publiceren',
  title: 'Jullie geven het akkoord.',
  description:
    'Pas teksten aan, vraag een nieuwe versie aan en keur de inhoud goed. Kopieer de goedgekeurde tekst als HTML, Markdown of platte tekst en plaats die in het CMS van je klant. Meld daarna het live-adres voor de opvolging.',
  punten: ['Zelf bewerken of een aanpassing vragen', 'Kopiëren als HTML, Markdown of platte tekst', 'Titel, omschrijving en interne links erbij', 'Live melden start de opvolging'],
  shot: {
    src: goedgekeurd,
    alt: 'Een goedgekeurde pagina in de stap Live met de knop Meld dat hij live staat, en het blok Op je site zetten met Kopieer als HTML, Kopieer als platte tekst, Kopieer als Markdown en de downloads.',
  } satisfies Shot,
}

export const opvolgingSectie = {
  id: 'opvolging',
  title: 'Volg wat er na publicatie verandert.',
  description:
    'Laat de doelvragen van een pagina na 14 en 28 dagen opnieuw meten. Bekijk daarnaast met Google Search Console de vertoningen en klikken van gepubliceerde ORBIT ENGINE-pagina\'s.',
  note: 'Per pagina zie je de stand vóór en na publicatie, met de aantallen en de marge erbij.',
  ai: {
    src: hermeting,
    alt: 'De bewijsladder van de voorbeeldpagina: gepubliceerd, zichtbaar in Google, genoemd door AI bij 4 van de 8 doelvragen tegen 0 vóór publicatie, geciteerd door AI en 63 klikken sinds publicatie.',
    label: 'AI-vermeldingen',
  },
  google: {
    src: zoekverkeer,
    alt: 'Zoekverkeer van de pagina\'s van ORBIT ENGINE: 240 klikken, 4.613 vertoningen, 5,2 procent doorklikratio en positie 11,2, met een grafiek van de klikken per dag en gestreepte lijnen op de dagen dat een pagina live ging.',
    label: 'Google-zoekverkeer',
  },
}

export const verslagSectie = {
  id: 'rapportage',
  title: 'Maak je werk bespreekbaar.',
  description:
    'Bundel de gemeten zichtbaarheid, gepubliceerde pagina\'s en planning in een maandverslag met jullie bureaunaam. Gebruik het in het klantgesprek of bewaar het als pdf om te delen.',
  shot: {
    src: verslag,
    alt: 'Het verslag van september 2026 van Lindeman Warmte, door Bureau Noordwind: zichtbaarheid in AI-assistenten 26 procent, wat er gemeten is, de pagina\'s die live gingen met hun effect, en de pagina\'s voor volgende maand.',
  } satisfies Shot,
}

export const bureauSectie = {
  id: 'bureau',
  title: 'Houd het werk voor al je klanten bij.',
  description:
    'Zie waar antwoorden, beoordeling of publicatie op wachten. Start werkzaamheden voor meerdere bedrijven tegelijk, bepaal wie mag meekijken en volg het geregistreerde gebruik per klant.',
  overzicht: {
    src: werkoverzicht,
    mobiel: werkoverzichtMobiel,
    alt: 'Het werkoverzicht Merken van Bureau Noordwind met zes bedrijven, hun zichtbaarheid, maandmeting, wat op het bureau wacht, hoe lang al, en de kosten van de laatste 30 dagen.',
  } satisfies Shot,
  toegang: {
    src: toegang,
    alt: 'Wie er toegang heeft: twee beheerders van Bureau Noordwind en twee kijkers, elk met de bedrijven die ze mogen zien.',
    label: 'Toegang',
    caption: 'Beheerders en kijkers, per kijker de bedrijven die hij ziet.',
  },
  kosten: {
    src: kosten,
    alt: 'Kosten: de maandlimiet van 250 euro met het verbruik van oktober, een schatting voor volgende maand en het verbruik per maand, per soort werk en per bedrijf.',
    label: 'Kosten',
    caption: 'Inzicht in gebruikskosten en een instelbare rem op nieuw betaald werk.',
  },
}

export const afsluiter = {
  title: 'Bekijk hoe ORBIT ENGINE in jullie bureau past.',
  description: 'Ontdek de werkwijze in een demo en bespreek welke klant geschikt is voor een eerste toepassing.',
  cta: 'Demo aanvragen',
}
