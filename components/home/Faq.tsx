import type { FaqItem } from '@/content/home'

// Gewone details-elementen: elke vraag klapt open zonder JavaScript, met het toetsenbord en voor
// een schermlezer. Meerdere vragen mogen tegelijk open staan.
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary className="faq-question">
            <span>{item.question}</span>
            <svg className="faq-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M8 3v10" />
              <path d="M3 8h10" />
            </svg>
          </summary>
          <p className="faq-answer">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
