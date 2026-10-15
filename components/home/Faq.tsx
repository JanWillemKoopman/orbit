import type { FaqItem } from '@/content/home'
import { FaqVraag } from './FaqVraag'

// Gewone details-elementen (zie FaqVraag): elke vraag klapt open, ook zonder JavaScript, met het
// toetsenbord en voor een schermlezer. Meerdere vragen mogen tegelijk open staan. Op desktop staan
// ze in twee kolommen naast elkaar (de eerste helft links, de rest rechts); op mobiel onder elkaar.
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {[items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))].map((kolom, i) => (
        <div className="faq-column" key={i}>
          {kolom.map((item) => <FaqVraag key={item.question} item={item} />)}
        </div>
      ))}
    </div>
  )
}
