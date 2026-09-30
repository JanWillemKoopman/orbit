type AppScreenshotSlotProps = { label: string; rows?: number }

/** Replace this faithful UI preview with an exported app image when one is available. */
export default function AppScreenshotSlot({ label }: AppScreenshotSlotProps) {
  return <figure className="app-shot">
    <div className="mac-window">
      <div className="mac-window__bar"><span className="mac-dot mac-dot--red"/><span className="mac-dot mac-dot--yellow"/><span className="mac-dot mac-dot--green"/><span className="mac-window__title">ORBIT ENGINE</span></div>
      <div className="app-preview">
        <aside className="preview-sidebar"><p className="preview-logo">ORBIT ENGINE</p><div className="preview-company">▦ &nbsp; Hans Verstraaten H… <b>⌄</b></div><p>☷ &nbsp; Openstaande taken</p><small>CLUSTERS</small><p className="is-active">▦ &nbsp; Mijn clusters</p><p>◉ &nbsp; Clusters ontdekken</p><small>STRATEGIE</small><p>□ &nbsp; Contentplan</p><p>⚙ &nbsp; Openstaande vragen</p><p>▤ &nbsp; Bibliotheek</p></aside>
        <section className="preview-main"><div className="preview-top"><span>● &nbsp; 12 openstaande vragen</span><span>♧ &nbsp; Notificaties</span><b>Admin</b><strong>Klant</strong></div><p className="preview-eyebrow">CLUSTERS</p><div className="preview-heading"><div><h3>Mijn clusters</h3><p>Elk cluster is één onderwerp waarop ORBIT ENGINE je zichtbaarheid volgt.</p></div><button>Nieuw cluster aanvragen</button></div><div className="preview-tabs"><b>Alle clusters (1)</b><span>Prullenbak (0)</span><i>Labels beheren</i><em>Alle statussen⌄</em><em>Alle labels⌄</em></div><div className="preview-card"><div><h4>Complete tuin aanleggen met bestrating</h4><small>LAATST BIJGEWERKT: GISTEREN</small><p><b>22%</b> ZICHTBAARHEID　 <b>30</b> ZOEKOPDRACHTEN　 <b>3</b> VOORGESTELD　 <b>3</b> GESCHREVEN　 <b>1</b> METING</p><u>Cijfers van dit cluster</u>　 <u>Pagina&apos;s van dit cluster</u></div><mark>Gereed</mark></div><h4 className="preview-section-title">Voorgesteld <u>Meer onderwerpen ontdekken</u></h4><div className="preview-card preview-card--short"><h4>Onderwerpen om op te meten <b>4 voorgesteld</b></h4><span>⌄</span></div></section>
      </div><div className="app-shot__fade"/></div>
    <figcaption>SCREENSHOT — {label}</figcaption>
  </figure>
}
