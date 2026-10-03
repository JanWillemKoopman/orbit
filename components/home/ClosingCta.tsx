import { ArrowRight, ArrowUpRight } from './icons'
import { Galaxy } from './visuals'

export default function ClosingCta() {
  return <section className="cta-space" id="demo">
    <span className="fl fl-m fl-gal" data-speed="0.45" style={{ right: -130, top: '8%', width: 620 }} aria-hidden="true"><span className="fl-bob" style={{ animationDuration: '8s', rotate: '4deg' }}><Galaxy density={0.7} speed={0.8} /></span></span>
    <span className="fl fl-m fl-gal" data-speed="-0.35" style={{ left: -150, top: '-4%', width: 740 }} aria-hidden="true"><span className="fl-bob" style={{ animationDuration: '12s', rotate: '-5deg', scale: '-1 1' }}><Galaxy density={0.8} speed={0.6} /></span></span>

    <div className="hs-wrap cta-in reveal">
      <span className="eyebrow">Geen tijd voor SEO? Mooi.</span>
      <h2>Klaar voor <span className="grad">autonome groei?</span></h2>
      <p>Zie precies wat er verborgen zit in je Google- en AI-zichtbaarheid, en hoe snel ORBIT dat dichtzet. Jij keurt de strategie goed; ORBIT onderzoekt, schrijft, publiceert en optimaliseert de rest.</p>
      <div className="acts">
        <a className="btn-lime" href="mailto:hello@outerorbit.nl?subject=Gratis%20demo%20plannen">Plan een gratis demo<ArrowUpRight /></a>
        <a className="ghost-link" href="#top">Bekijk de resultaten<ArrowRight /></a>
      </div>
    </div>
  </section>
}
