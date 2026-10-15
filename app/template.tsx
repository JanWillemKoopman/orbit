// Next.js bouwt een template bij elke navigatie opnieuw op: daardoor fadet de inhoud van een nieuwe
// pagina kort in, terwijl header en footer (in de layout) gewoon blijven staan.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="pagina-in">{children}</div>
}
