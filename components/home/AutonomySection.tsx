const team = ['SV', 'MB', 'LK']
const work: Array<[string, string, string]> = [
  ['Onderzoek', 'Zoekvragen en concurrenten in kaart', 'Dagelijks'],
  ['Strategie', 'Contentplan op basis van kansen', 'Wekelijks'],
  ['Content & publicatie', 'Schrijven, controleren, live zetten', 'Doorlopend'],
  ['Optimalisatie & meting', 'Posities, verkeer en AI-vermeldingen', 'Doorlopend'],
]

export default function AutonomySection() {
  return <section className="hs-section mix" id="autonoom">
    <div className="hs-wrap">
      <div className="mix-grid">
        <div className="mix-copy">
          <div className="thead reveal" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Autonoom AI-platform + menselijke expertise</span>
            <h2>ORBIT draait volledig autonoom. <span className="tone">Onze experts houden het menselijk.</span></h2>
          </div>
          <div className="mixrows">
            <div className="mixrow reveal">
              <b className="mix-n"><span data-count="100">100</span>%</b>
              <div className="mix-t"><b>Software</b><p>ORBIT draait de hele motor: onderzoek, strategie, content, publicatie, optimalisatie en meting. Geen uren te boeken, geen bureau te managen.</p></div>
            </div>
            <div className="mixrow reveal">
              <span className="mix-ppl" aria-hidden="true">{team.map(initials => <i key={initials}>{initials}</i>)}<i className="mix-more" title="En 20+ andere specialisten">+20</i></span>
              <div className="mix-t"><b>Echte mensen als hulp</b><p>Een eigen Customer Success Manager, met een team van 20+ strategen en contentspecialisten erachter.</p></div>
            </div>
          </div>
        </div>

        <div className="mix-panel reveal" aria-label="Wat ORBIT voor je doet">
          <div className="mp-head"><em>ORBIT ENGINE</em><i><b />Actief</i></div>
          <ul className="mp-rows">{work.map(([title, detail, rhythm]) => <li key={title}><div><b>{title}</b><span>{detail}</span></div><em>{rhythm}</em></li>)}</ul>
          <div className="mp-human"><i>SV</i><div><b>Sanne, je success manager</b><span>Volgende check-in: dinsdag</span></div></div>
        </div>
      </div>
    </div>
  </section>
}
