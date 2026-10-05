const long = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
const short = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export const formatDate = (iso: string) => long.format(new Date(iso))
export const formatShortDate = (iso: string) => short.format(new Date(iso)).replace('.', '')
