import { ArrowRight, ArrowUpRight } from './icons'

export default function ClosingCta() {
  return <section className="cta-space" id="demo">
    <div className="hs-wrap cta-in reveal">
      <span className="eyebrow">Geen tijd voor SEO? Mooi.</span>
      <h2>Klaar voor <span className="tone">autonome groei?</span></h2>
      <p>Zie wat er verborgen zit in je Google- en AI-zichtbaarheid. Jij keurt de strategie goed, ORBIT doet de rest.</p>
      <div className="acts">
        <a className="btn-lime" href="mailto:hello@outerorbit.nl?subject=Gratis%20demo%20plannen">Plan een gratis demo<ArrowUpRight /></a>
        <a className="ghost-link" href="#top">Bekijk de resultaten<ArrowRight /></a>
      </div>
    </div>
  </section>
}
