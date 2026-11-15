'use client'

import { DemoForm } from './DemoForm'
import { FormDialoog } from './FormDialoog'

// De demo-popup. De knoppen op de site openen het aanmeldformulier (AanmeldDialog); een demo aanvragen kan
// nog via de assistent, de link onder het aanmeldformulier en de pagina /demo.
export function DemoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <FormDialoog
      open={open}
      onClose={onClose}
      id="demo-titel"
      eyebrow="Demo"
      titel="Plan een gratis demo"
      intro="Laat je gegevens achter en we plannen samen een sessie van 15 of 45 minuten, wanneer het jou uitkomt."
    >
      <DemoForm />
    </FormDialoog>
  )
}
