import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Een brief van Jan-Willem Koopman',
  description: 'Waarom ik Orbit heb ontwikkeld, een GEO-platform voor marketingbureaus.',
  alternates: { canonical: '/brief' },
  robots: { index: false, follow: false },
}

// Eén losse pagina met een brief, zonder header en footer (zie `kaal` in components/SiteChrome.tsx).
// Opmaak van een blogartikel (.article-blog + .prose), zonder titel en cover.
export default function BriefPage() {
  return (
    <article className="article article-blog brief">
      <h1 className="sr-only">Een brief van Jan-Willem Koopman</h1>
      <div className="prose">
        <p>
          Mijn naam is Jan-Willem Koopman, founder en ontwikkelaar van Orbit. Ik werk inmiddels ruim tien jaar als data-analist binnen de marketing, onder andere bij Randstad Groep Nederland en tegenwoordig bij Van den Udenhout.
        </p>
        <p>
          De opkomst van AI heeft mijn werk de afgelopen jaren behoorlijk veranderd. Waar ik voorheen vooral analyses en datamodellen ontwikkelde, ben ik met behulp van AI steeds meer zelf software gaan bouwen. Mijn ervaring met marketingdata, SEO, attributie en AI-engineering komt nu samen in Orbit: een compleet GEO-platform dat ik speciaal voor marketingbureaus heb ontwikkeld.
        </p>
        <p>En het resultaat is iets waar ik behoorlijk trots op ben.</p>

        <h2>Waarom ik Orbit heb ontwikkeld</h2>
        <p>
          Steeds meer consumenten gebruiken ChatGPT en andere AI-assistenten om bedrijven, producten en diensten te vinden. Voor marketingbureaus ontstaat daarmee een nieuwe uitdaging: hoe zorg je dat jouw klanten ook in deze antwoorden zichtbaar worden?
        </p>
        <p>
          Er zijn inmiddels verschillende tools die AI-zichtbaarheid meten. Maar alleen weten dat je klant niet wordt aanbevolen, lost natuurlijk weinig op.
        </p>
        <p>
          Want wat doe je vervolgens? Waarom worden concurrenten wel genoemd? Welke content ontbreekt er? En wie gaat die pagina’s onderzoeken, schrijven en publiceren?
        </p>
        <p>Precies dat wilde ik met Orbit veranderen.</p>
        <p>
          Waar veel AI-visibilitytrackers vooral inzicht geven, helpt Orbit ook om daadwerkelijk iets met die inzichten te doen. Van het ontdekken van commerciële kansen tot het ontwikkelen van content en het meten van resultaten. Allemaal binnen hetzelfde platform.
        </p>

        <h2>Van een website naar een complete GEO-aanpak</h2>
        <p>Het mooie aan Orbit vind ik hoe weinig handmatig werk er nodig is om te beginnen.</p>
        <p>
          Je voert een bedrijfsnaam en website in. Orbit onderzoekt vervolgens zelfstandig het bedrijf, zijn aanbod, de markt en concurrenten. Daarna stelt het platform relevante vragen samen die potentiële klanten aan AI-assistenten zouden kunnen stellen.
        </p>
        <p>
          Orbit meet hoe vaak het bedrijf wordt aanbevolen, welke concurrenten beter zichtbaar zijn en bij welke vragen kansen blijven liggen. Daarbij wordt rekening gehouden met de commerciële relevantie van vragen en met statistische onzekerheid.
        </p>
        <p>De resultaten worden automatisch vertaald naar een contentplan met concrete pagina’s die de zichtbaarheid kunnen verbeteren.</p>
        <p>Maar daar stopt het niet.</p>
        <p>
          Orbit kan deze pagina’s ook volledig zelf schrijven. Inclusief contentonderzoek, SEO-elementen, FAQ’s en interne links. Ontbreekt er belangrijke bedrijfskennis? Dan vraagt het platform die rechtstreeks op bij de ondernemer.
        </p>
        <p>
          Om de betrouwbaarheid van de teksten te verbeteren, heb ik aanvullende controles ingebouwd. Bedragen, garanties en andere belangrijke beweringen worden gecontroleerd aan de hand van vastgelegde bedrijfsinformatie. De marketeer beoordeelt de tekst en houdt de uiteindelijke regie over publicatie.
        </p>
        <p>
          Zodra een pagina online staat, meet Orbit na 14 en 28 dagen opnieuw hoe de zichtbaarheid bij de relevante AI-vragen zich ontwikkelt. Met Google Search Console kunnen daarnaast de organische zoekprestaties worden gevolgd.
        </p>
        <p>Zo ontstaat één doorlopend proces: meten, plannen, schrijven, publiceren en opnieuw meten.</p>

        <h2>GEO aanbieden als schaalbare dienst</h2>
        <p>
          Ik heb Orbit bewust niet ontwikkeld als een losse tool voor individuele marketeers, maar als een platform waarmee marketingbureaus GEO structureel kunnen aanbieden aan hun klanten.
        </p>
        <p>
          Bureaus beheren meerdere bedrijven vanuit één omgeving, kunnen het platform in hun eigen huisstijl gebruiken en klanten laten meekijken. Ook het plannen van content en rapporteren over resultaten gebeurt vanuit dezelfde omgeving.
        </p>
        <p>
          Een belangrijk voordeel is dat een groot deel van het onderzoeks- en schrijfwerk automatisch verloopt. Daardoor kunnen bureaus meer klanten bedienen zonder dat de benodigde uitvoeringsuren evenredig meegroeien.
        </p>
        <p>
          Ook de kosten heb ik bewust laag gehouden. Voor het gebruik van Orbit vraag ik een kleine vergoeding. De kosten voor AI en zoekdata betalen bureaus rechtstreeks aan de aanbieders via hun eigen API-sleutels, zonder opslag vanuit Orbit. Zo blijven de kosten transparant en houden bureaus zelf controle over hun marge op GEO-dienstverlening.
        </p>

        <h2>Trots op wat ik heb gebouwd</h2>
        <p>
          Wat begon als een idee voor een AI-visibilitytracker, is uitgegroeid tot een uitgebreid softwareplatform waarin mijn ervaring met marketing en data samenkomt.
        </p>
        <p>
          Voor mij laat Orbit vooral zien hoeveel er inmiddels mogelijk is met AI. Werkzaamheden die normaal verspreid liggen over verschillende specialisten, tools en processen, heb ik grotendeels weten samen te brengen en te automatiseren.
        </p>
        <p>Daarmee wil ik marketingbureaus helpen om GEO toegankelijker, betaalbaarder en vooral schaalbaarder te maken.</p>
        <p>
          Mijn ambitie met Orbit is simpel: marketingbureaus de technologie geven waarmee ze veel meer ondernemers zichtbaar kunnen maken in AI, terwijl ze zelf de tijd overhouden voor strategie, kwaliteit en persoonlijk klantcontact.
        </p>
        <p>
          Benieuwd wat Orbit voor jouw bureau kan betekenen? <a href="/aanmelden">Maak een gratis account aan.</a>
        </p>
      </div>
    </article>
  )
}
