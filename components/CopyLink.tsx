'use client'

import { useState } from 'react'

export function CopyLink() {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className="copy-button"
      data-copied={copied}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {}
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M7.1 3.5a3.25 3.25 0 0 1 4.6 4.6l-1.4 1.4a.75.75 0 1 1-1.06-1.06l1.4-1.4a1.75 1.75 0 0 0-2.48-2.48l-1.4 1.4A.75.75 0 1 1 5.7 4.9l1.4-1.4Zm-.8 6.2a.75.75 0 0 1 0 1.06l-1.4 1.4a3.25 3.25 0 1 1-4.6-4.6l1.4-1.4a.75.75 0 1 1 1.06 1.06l-1.4 1.4a1.75 1.75 0 1 0 2.48 2.48l1.4-1.4a.75.75 0 0 1 1.06 0Zm3.73-4.79a.75.75 0 0 1 0 1.06l-3.06 3.06a.75.75 0 1 1-1.06-1.06l3.06-3.06a.75.75 0 0 1 1.06 0Z" />
      </svg>
      {copied ? 'Gekopieerd' : 'Kopieer link'}
    </button>
  )
}
