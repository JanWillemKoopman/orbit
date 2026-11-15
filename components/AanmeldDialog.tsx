'use client'

import { aanmelden } from '@/content/aanmelden'
import { AanmeldForm } from './AanmeldForm'
import { FormDialoog } from './FormDialoog'

// De popup achter elke knop "Gratis uitproberen": een bureau meldt zich aan voor een gratis account.
export function AanmeldDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <FormDialoog open={open} onClose={onClose} id="aanmeld-titel" eyebrow={aanmelden.eyebrow} titel={aanmelden.titel} intro={aanmelden.intro}>
      <AanmeldForm />
    </FormDialoog>
  )
}
