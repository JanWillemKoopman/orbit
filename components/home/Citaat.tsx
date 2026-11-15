import Image from 'next/image'

// Het citaat op de homepage staat meteen helemaal in beeld: geen effect tijdens het scrollen. De eerste
// zin staat in het wit, de zinnen daarna een tint grijzer, zodat de opening de aandacht pakt. Onder het
// citaat een rond portret met de naam en de functie van wie het zegt.

type Props = { citaat: string; naam: string; functie: string; foto?: string }

const initialen = (naam: string) =>
  naam.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((d) => d[0]).join('').toUpperCase()

// Splitst het citaat na de eerste zin; staat er geen punt, dan telt alles als eerste zin.
const eersteZin = (tekst: string): [string, string] => {
  const m = tekst.match(/^([\s\S]*?[.!?])(\s+)([\s\S]+)$/)
  return m ? [m[1], m[3]] : [tekst, '']
}

export function Citaat({ citaat, naam, functie, foto }: Props) {
  const [eerste, vervolg] = eersteZin(citaat)

  return (
    <figure className="citaat">
      <blockquote className="citaat-tekst">
        <p>
          {'“'}{eerste}
          {vervolg && <> <span className="citaat-vervolg">{vervolg}</span></>}
          {'”'}
        </p>
      </blockquote>
      <figcaption className="citaat-bron">
        {foto ? (
          <Image src={foto} alt={`Portret van ${naam}`} width={44} height={44} className="citaat-foto" />
        ) : (
          <span className="citaat-foto citaat-foto-leeg" aria-hidden="true">{initialen(naam)}</span>
        )}
        <span className="citaat-bron-tekst">
          <span className="citaat-naam">{naam}<span className="citaat-komma">,</span></span>
          <span className="citaat-functie">{functie}</span>
        </span>
      </figcaption>
    </figure>
  )
}
