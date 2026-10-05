// Changelog-items. Nieuwste bovenaan; de eerste vier verschijnen op de homepage.
export type ChangelogEntry = { slug: string; title: string; description: string; date: string }

export const changelog: ChangelogEntry[] = [
  { slug: 'bronnenrapport', title: 'Bronnenrapport per prompt', description: 'Zie per prompt welke bronnen een AI-assistent citeert, hoe vaak jouw domein terugkomt en welke concurrent je plek inneemt. Exporteer het rapport als CSV of deel een live link.', date: '2026-10-01' },
  { slug: 'teamrollen', title: 'Rollen en rechten voor teams', description: 'Werkruimtes ondersteunen nu de rollen eigenaar, redacteur en lezer. Redacteuren kunnen briefings goedkeuren zonder toegang tot facturatie of integraties.', date: '2026-09-24' },
  { slug: 'slack-meldingen', title: 'Meldingen in Slack', description: 'Ontvang een bericht zodra je zichtbaarheid voor een belangrijke prompt daalt of wanneer een nieuw artikel is gepubliceerd. Per kanaal stel je in welke signalen binnenkomen.', date: '2026-09-17' },
  { slug: 'sneller-dashboard', title: 'Een sneller dashboard', description: 'Het overzicht laadt nu tot drie keer sneller voor werkruimtes met meer dan duizend prompts, dankzij voorberekende aggregaties en slimmer cachen.', date: '2026-09-09' },
  { slug: 'markdown-export', title: 'Export naar Markdown', description: 'Elke briefing en elk concept kun je nu exporteren als schone Markdown, inclusief koppen, tabellen en bronvermeldingen.', date: '2026-08-28' },
  { slug: 'nieuwe-talen', title: 'Ondersteuning voor Duits en Frans', description: 'Prompts, analyses en concepten werken nu ook in het Duits en Frans. Per markt kies je de taal en regio waarvoor je wilt meten.', date: '2026-08-14' },
  { slug: 'api-v2', title: 'API v2', description: 'Een nieuwe REST-API met paginering, webhooks en fijnmazige tokens. De oude API blijft tot het einde van het jaar beschikbaar.', date: '2026-07-30' },
  { slug: 'donkere-modus-editor', title: 'Vernieuwde editor', description: 'De editor heeft een rustiger interface, sneltoetsen voor alle opmaak en een focusmodus die alles behalve je tekst wegfadet.', date: '2026-07-16' },
]
