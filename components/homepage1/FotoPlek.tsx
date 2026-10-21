// Plek voor een echte foto die nog gemaakt of gekozen moet worden. Hij zegt wat erop moet, in welke
// verhouding, en welk beeld van temso.ai als referentie diende. Vervang hem door een <Image> zodra de foto er is.
export function FotoPlek({ wat, maat, verhouding, referentie }: { wat: string; maat: string; verhouding: string; referentie: string }) {
  return (
    <figure className="hp1-foto" style={{ aspectRatio: verhouding }} role="img" aria-label={`Plek voor een foto: ${wat}`}>
      <svg className="hp1-foto-icoon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.75" />
        <path d="m4 17 5-4.5 3.5 3 3-2.5L20 17" />
      </svg>
      <figcaption>
        <span className="hp1-foto-label">Fotoplek</span>
        <strong>{wat}</strong>
        <span>{maat}</span>
        <span className="hp1-foto-ref">Referentie: {referentie}</span>
      </figcaption>
    </figure>
  )
}
