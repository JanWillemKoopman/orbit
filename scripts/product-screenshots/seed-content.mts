// Dossier, kennis, contentplan, pagina's, vragen, publicatie, hermeting en zoekverkeer van Lindeman Warmte.
import type { Client } from 'pg'
import { compare, deltaOf, thresholdOf, verdictOf } from '@/lib/pipeline/impact-math'
import { CLUSTERS } from './data-metingen.mts'
import { FAQ_VOORBEELD, GELE_REDEN, GELE_ZIN, PAGINAS, SITE, TEKST_VOORBEELD, VOORBEELD, VRAGEN_VOORBEELD, type Pagina } from './data-content.mts'
import { DOELVRAGEN, NA_PUBLICATIE, ids, ins, uid, type Scene } from './seed.mts'

const P = () => ids.lindeman
export const VRAAGLINK_TOKEN = 'lokaal-voorbeeld-geen-echte-link-0001'

export async function content(db: Client, gevraagd: Scene | 'vragen-link'): Promise<void> {
  const metLink = gevraagd === 'vragen-link'
  const scene: Scene = metLink ? 'vragen' : gevraagd
  await dossier(db)
  await kennis(db)
  await plan(db, scene, metLink)
}

async function dossier(db: Client): Promise<void> {
  await db.query(
    `update profiles set
      summary = $2, industry = 'Installatiebedrijf voor warmtepompen en cv-ketels', business_model = 'dienstverlener',
      service_scope = 'lokaal', service_regions = $3, market_language = 'nl-NL',
      intake_audience = $4, personas = $5, differentiator = $6, competitors = $7, value_props = $8,
      pronoun_preference = 'je', taboo_phrases = $9, products = $10, aliases = $11,
      brand_positioning = $12, usp = $13, tone_of_voice = $14,
      stem_voorbeelden = $15, contact_name = 'Pieter Lindeman', contact_email = 'pieter@lindemanwarmte.example',
      gsc_property = 'sc-domain:lindemanwarmte.example', gsc_verified_at = '2026-06-02T08:00:00Z', gsc_first_day = '2026-06-01',
      gsc_last_sync_at = '2026-10-10T05:00:00Z', paginas_per_maand = 5, engines_enabled = '{openai}', deep_research_at = '2026-05-13T09:00:00Z'
     where id = $1`,
    [
      P(),
      'Lindeman Warmte is een familiebedrijf uit Utrecht dat sinds 1998 cv-ketels onderhoudt en sinds 2019 warmtepompen installeert, met acht eigen monteurs.',
      ['Utrecht', 'Nieuwegein', 'Houten', 'Zeist', 'De Bilt', 'IJsselstein'],
      'Huiseigenaren in Utrecht en omgeving met een bestaande cv-ketel, die willen verduurzamen zonder hun hele huis te verbouwen. Vaak een tussenwoning of jaren-30-woning, gezin met twee verdieners.',
      JSON.stringify([
        { name: 'Voorzichtige verduurzamer', needs: ['wil weten wat het oplevert', 'twijfelt over de isolatie van het huis', 'wil één aanspreekpunt'] },
        { name: 'Ketel aan het eind', needs: ['ketel is twaalf jaar of ouder', 'zoekt een snelle vervanging', 'wil subsidie meenemen'] },
        { name: 'Huurder of VvE-lid', needs: ['heeft toestemming nodig', 'wil weten wat het geluid doet'] },
      ]),
      'Klanten kiezen voor ons omdat dezelfde monteur die hun ketel al jaren onderhoudt ook de warmtepomp plaatst. Geen onderaannemers, en vooraf altijd een opname bij je thuis.',
      ['Warmtewerk Utrecht', 'Domstad Installaties', 'KlimaatPro'],
      ['Eerlijk advies, ook als dat "nog niet" is', 'Eigen monteurs, geen onderaannemers', 'Eén aanspreekpunt van opname tot onderhoud'],
      ['goedkoopste', 'revolutionair', 'zorgeloos genieten'],
      ['Hybride warmtepomp', 'Volledig elektrische warmtepomp', 'Cv-ketel onderhoud', 'Storingsdienst', 'Onderhoudsabonnement'],
      ['Lindeman', 'Lindeman Installatie'],
      'De installateur uit de buurt die verduurzamen stap voor stap aanpakt, met de monteur die je al kent.',
      'Eigen monteurs die zowel je cv-ketel als je warmtepomp onderhouden.',
      'Nuchter, vakkundig en persoonlijk. Korte zinnen, geen vaktaal zonder uitleg.',
      JSON.stringify([
        { url: `${SITE}/over-ons`, tekst: 'Wij zijn Lindeman Warmte...', opgehaald_op: '2026-05-13T09:20:00Z', fout: null },
        { url: `${SITE}/blog/onze-monteurs`, tekst: 'Maak kennis met onze monteurs...', opgehaald_op: '2026-05-13T09:20:00Z', fout: null },
      ]),
    ],
  )
  const velden = ['name', 'brand_name', 'industry', 'business_model', 'service_scope', 'service_regions', 'market_language', 'value_props', 'intake_audience', 'personas', 'differentiator', 'competitors', 'stem_voorbeelden', 'taboo_phrases', 'pronoun_preference', 'products', 'summary', 'aliases']
  const doorKlant = new Set(['differentiator', 'personas', 'pronoun_preference', 'taboo_phrases', 'stem_voorbeelden', 'intake_audience'])
  for (const f of velden) {
    await ins(db, 'profile_field_sources', { profile_id: P(), field: f, source: doorKlant.has(f) ? 'klant' : 'ai', confidence: doorKlant.has(f) ? 1 : 0.82, set_at: '2026-05-20T14:00:00Z' })
  }
  await ins(db, 'profile_strategy', { profile_id: P(), strategy_notes: 'Groei zit in hybride warmtepompen. Cv-onderhoud is de basis waar klanten vandaan komen.', recorded_by: ids.sanne, recorded_at: '2026-05-21T10:30:00Z' })
  for (const [i, t] of [
    { naam: 'Hybride warmtepomp installeren', soort: 'dienst' }, { naam: 'Cv-ketel onderhoud', soort: 'dienst' }, { naam: 'Storingsdienst cv', soort: 'dienst' },
  ].entries()) {
    await ins(db, 'profile_offerings', { id: uid(`aanbod:${i}`), profile_id: P(), kind: t.soort, name: t.naam, source: 'ai', sort_order: i, confidence: 0.9 })
  }
}

interface Kennis { domein: string; soort: string; bewering: string; status: 'bevestigd' | 'waargenomen' | 'verklaard' | 'afgeleid'; bron: string; bron_url?: string; citaat?: string; op: string; gebruik?: string }

export const KENNIS: Kennis[] = [
  { domein: 'aanbod', soort: 'dienst', bewering: 'Hybride warmtepomp installeren', status: 'bevestigd', bron: 'website', bron_url: `${SITE}/warmtepompen`, citaat: 'Wij installeren hybride warmtepompen van verschillende merken.', op: '2026-05-13T09:12:00Z' },
  { domein: 'aanbod', soort: 'dienst', bewering: 'Cv-ketel onderhoud en storingsdienst', status: 'bevestigd', bron: 'website', bron_url: `${SITE}/onderhoud`, citaat: 'Onderhoud en storingen aan alle gangbare cv-ketels.', op: '2026-05-13T09:12:00Z' },
  { domein: 'aanbod', soort: 'werkgebied', bewering: 'Utrecht, Nieuwegein, Houten, Zeist, De Bilt en IJsselstein', status: 'bevestigd', bron: 'gesprek', op: '2026-05-21T10:30:00Z' },
  { domein: 'bewijs', soort: 'feit', bewering: 'Acht eigen monteurs, geen onderaannemers', status: 'verklaard', bron: 'gesprek', op: '2026-05-21T10:30:00Z' },
  { domein: 'bewijs', soort: 'feit', bewering: 'Vijf jaar garantie op het installatiewerk, naast de fabrieksgarantie', status: 'verklaard', bron: 'klant', op: '2026-08-27T15:41:00Z' },
  { domein: 'aanbod', soort: 'werkwijze', bewering: 'Vooraf altijd een opname bij de klant thuis met een warmteverliesberekening', status: 'verklaard', bron: 'klant', op: '2026-08-27T15:38:00Z' },
  { domein: 'aanbod', soort: 'werkwijze', bewering: 'De installatie van een hybride warmtepomp duurt één werkdag', status: 'verklaard', bron: 'klant', op: '2026-08-27T15:38:00Z' },
  { domein: 'aanbod', soort: 'prijs', bewering: 'De prijs omvat toestel, buitenunit, montage, aansluiting, opname en subsidieaanvraag', status: 'verklaard', bron: 'klant', op: '2026-08-27T15:40:00Z' },
  { domein: 'identiteit', soort: 'feit', bewering: 'Familiebedrijf, sinds 1998 actief in Utrecht', status: 'waargenomen', bron: 'website', bron_url: `${SITE}/over-ons`, citaat: 'Sinds 1998 houden wij Utrecht warm.', op: '2026-05-13T09:12:00Z' },
  { domein: 'bewijs', soort: 'keurmerk', bewering: 'Erkend installateur met InstallQ-erkenning', status: 'waargenomen', bron: 'document', bron_url: `${SITE}/downloads/erkenning.pdf`, citaat: 'Erkend installatiebedrijf, registratienummer 0000000', op: '2026-06-04T11:00:00Z' },
  { domein: 'doelgroep', soort: 'feit', bewering: 'Veel klanten wonen in een jaren-30-woning of tussenwoning', status: 'verklaard', bron: 'gesprek', op: '2026-05-21T10:30:00Z' },
  { domein: 'stem', soort: 'regel', bewering: 'Spreek de lezer aan met je en jij', status: 'verklaard', bron: 'gesprek', op: '2026-05-21T10:30:00Z' },
]

async function kennis(db: Client): Promise<void> {
  for (const [i, k] of KENNIS.entries()) {
    await ins(db, 'klantkennis', {
      id: uid(`kennis:${i}`), profile_id: P(), domein: k.domein, soort: k.soort, bewering: k.bewering, status: k.status, bron: k.bron,
      bron_url: k.bron_url ?? null, citaat: k.citaat ?? null, gebruik: 'content', vastgelegd_door: k.bron === 'website' || k.bron === 'document' ? null : ids.sanne,
      vastgelegd_door_taak: k.bron === 'website' || k.bron === 'document' ? 'onderzoek' : null, vastgelegd_op: k.op,
      bevestigd_door: k.status === 'bevestigd' ? ids.sanne : null, bevestigd_op: k.status === 'bevestigd' ? '2026-05-21T11:00:00Z' : null,
      bewijskracht: k.domein === 'bewijs' ? 'sterk' : 'gewoon', created_at: k.op,
    })
  }
}

const MAAND_START = '2026-07-01'

function analysisVan(p: Pagina): string { return uid(`cluster:${p.cluster}`) }

async function plan(db: Client, scene: Scene, metLink: boolean): Promise<void> {
  const planId = uid('plan')
  await ins(db, 'content_plans', { id: planId, profile_id: P(), started_on: MAAND_START, pages_per_month: 5, status: 'actief', version: 1, created_at: '2026-06-20T09:00:00Z',
    strategy_note: 'Eerst de dienstpagina\'s voor hybride warmtepompen, daarna de plaatsen rond Utrecht.' })
  // In het eerste moment van het verhaal staat het idee nog los. De app vult open maanden vanzelf met
  // de sterkste ideeen; daarom zijn de maanden in dat beeld al gestart.
  for (let m = 1; m <= 6; m++) {
    const gestart = m <= 4 || scene === 'idee'
    await ins(db, 'plan_months', { id: uid(`maand:${m}`), plan_id: planId, month_number: m,
      status: gestart ? 'goedgekeurd' : m === 5 ? 'ter_goedkeuring' : 'concept', approved_at: gestart ? new Date(Date.UTC(2026, 4 + m, 28, 9)).toISOString() : null, approved_by_user_id: gestart ? ids.sanne : null })
  }
  for (const c of CLUSTERS) {
    await ins(db, 'profile_topics', { id: uid(`topic:${c.key}`), profile_id: P(), title: c.naam, status: 'goedgekeurd', stage: 'definitief', origin: 'aanbod_en_gesprek', analysis_id: uid(`cluster:${c.key}`), priority: 1, created_at: '2026-05-22T09:00:00Z' })
  }

  for (const [i, p] of PAGINAS.entries()) {
    const voorbeeld = p.key === VOORBEELD
    // De stand van de voorbeeldpagina hangt af van het moment in het verhaal.
    let status: Pagina['status'] | 'idee' = p.status
    let dag = p.dag
    let maand: number | null = p.maand
    if (voorbeeld && scene !== 'live') {
      status = scene === 'idee' ? 'idee' : scene === 'vragen' ? 'vragen' : scene === 'geschreven' ? 'nakijken' : 'goedgekeurd'
      dag = '2026-10-24'
      maand = scene === 'idee' ? null : 4
    }
    const kansId = uid(`kans:${p.key}`)
    await kans(db, p, kansId, status)
    const pieceId = status === 'gepland' || status === 'idee' ? null : uid(`piece:${p.key}`)
    const planStatus = status === 'live' ? 'geplaatst' : status === 'gepland' || status === 'idee' ? 'gepland' : status === 'schrijven' ? 'schrijven' : status === 'goedgekeurd' ? 'goedgekeurd' : status === 'nakijken' ? 'ter_goedkeuring' : 'gepland'
    if (pieceId) await piece(db, p, pieceId, status as Pagina['status'], voorbeeld, scene)
    await ins(db, 'planned_pages', {
      id: uid(`plan:${p.key}`), plan_month_id: maand ? uid(`maand:${maand}`) : null, profile_id: P(), title: p.titel, url_path: p.pad, page_type: p.paginaType,
      topic_id: uid(`topic:${p.cluster}`), status: planStatus, sort_order: i, is_buffer: false, scheduled_for: maand ? dag : null, content_piece_id: pieceId,
      posted_at: status === 'live' ? p.live : null, posted_url: status === 'live' ? SITE + p.pad : null, posted_by_user_id: status === 'live' ? ids.sanne : null,
      source: 'aanbeveling', source_analysis_id: analysisVan(p), recommendation_action: 'nieuw', why: p.waarom, target_intent: p.titel, target_count: 8,
      potential: voorbeeld ? 78 : 40 + ((i * 13) % 35), kans_id: kansId, content_type: p.type, created_at: '2026-06-20T09:00:00Z',
    })
  }
  // Pagina-ideeen die nog niet ingepland zijn.
  const ideeen = [
    { key: 'idee-thuisbatterij', titel: 'Warmtepomp en thuisbatterij combineren', cluster: 'hybride', waarom: 'Opkomende vraag waarin nog geen installateur uit de regio genoemd wordt.' },
    { key: 'idee-geluid', titel: 'Hoeveel geluid maakt een hybride warmtepomp?', cluster: 'hybride', waarom: 'Een twijfel die klanten in het gesprek vaak noemen.' },
    { key: 'idee-ijsselstein', titel: 'Cv-onderhoud in IJsselstein', cluster: 'cv', waarom: 'Plaatsnaamvragen over onderhoud leveren buiten Utrecht nog geen vermelding op.' },
    { key: 'idee-debilt', titel: 'Hybride warmtepomp laten plaatsen in De Bilt', cluster: 'hybride', waarom: 'Beslisvraag met plaatsnaam waarin drie concurrenten genoemd worden.' },
    { key: 'idee-vloerverwarming', titel: 'Warmtepomp zonder vloerverwarming: kan dat?', cluster: 'hybride', waarom: 'Veel gestelde twijfel; het antwoord van AI-assistenten verwijst nu naar landelijke sites.' },
    { key: 'idee-terugverdientijd', titel: 'Hoe snel verdien je een hybride warmtepomp terug?', cluster: 'hybride', waarom: 'Overwegingsvraag met hoog gewicht zonder lokale aanbieder in het antwoord.' },
    { key: 'idee-lening', titel: 'Warmtepomp financieren met een duurzaamheidslening', cluster: 'subsidie', waarom: 'Financieringsvragen eindigen nu bij een bank, niet bij een installateur.' },
    { key: 'idee-weekend', titel: 'Cv-storing in het weekend: wat nu?', cluster: 'cv', waarom: 'Spoedvraag waarin Lindeman Warmte één keer genoemd wordt, de concurrenten vaker.' },
    { key: 'idee-koelen', titel: 'Kan een hybride warmtepomp ook koelen?', cluster: 'hybride', waarom: 'Opkomende vraag in de zomermaanden.' },
    { key: 'idee-druk', titel: 'Waarom valt de druk van je cv-ketel weg?', cluster: 'cv', waarom: 'Orienterende vraag die vaak tot een storingsmelding leidt.' },
  ] as const
  for (const [i, d] of ideeen.entries()) {
    const p = { ...PAGINAS[0], key: d.key, titel: d.titel, cluster: d.cluster, waarom: d.waarom } as Pagina
    await kans(db, p, uid(`kans:${d.key}`), 'idee')
    await ins(db, 'planned_pages', { id: uid(`plan:${d.key}`), plan_month_id: null, profile_id: P(), title: d.titel, page_type: 'informatief', topic_id: uid(`topic:${d.cluster}`),
      status: 'gepland', sort_order: 100 + i, is_buffer: false, source: 'aanbeveling', source_analysis_id: analysisVan(p), recommendation_action: 'nieuw', why: d.waarom,
      target_count: 3, potential: 30 + i * 6, kans_id: uid(`kans:${d.key}`), content_type: 'article', created_at: '2026-10-02T09:00:00Z' })
  }
  // Een deellink voor de vragen, alleen bruikbaar in deze lokale omgeving.
  if (metLink) await ins(db, 'vraaglinks', { profile_id: P(), token: VRAAGLINK_TOKEN, gemaakt_door: ids.sanne, gemaakt_op: '2026-10-06T08:30:00Z', antwoorden_voor: '2026-10-12' })
  if (scene === 'live') await nameting(db)
  await zoekverkeer(db, scene)
}

async function kans(db: Client, p: Pagina, kansId: string, status: string): Promise<void> {
  const voorbeeld = p.key === VOORBEELD
  const kansStatus = status === 'live' ? 'gepubliceerd' : status === 'idee' ? 'open' : status === 'gepland' ? 'ingepland' : status === 'vragen' || status === 'schrijven' ? 'in_voorbereiding' : 'geschreven'
  await ins(db, 'kansen', {
    id: kansId, profile_id: P(), analysis_id: uid(`cluster:${p.cluster}`), titel: p.titel, handeling: 'nieuwe_pagina', commerciele_waarde: p.paginaType === 'dienst' ? 'voorrang' : 'gewoon',
    potentie: voorbeeld ? 78 : 45, status: kansStatus, vastgelegd_door_taak: 'rapport', sleutel: `kans-${p.key}`, created_at: '2026-06-03T09:00:00Z',
    lezer: voorbeeld ? 'Huiseigenaar in Utrecht die een installateur zoekt voor een hybride warmtepomp' : null,
    uitleg: voorbeeld
      ? 'Op beslisvragen als "Welke installateur in Utrecht is goed in hybride warmtepompen?" noemt ChatGPT Warmtewerk Utrecht, Domstad Installaties en KlimaatPro. Lindeman Warmte doet dit werk ook, maar heeft er geen pagina over. Deze pagina geeft de AI een bron om te noemen.'
      : p.waarom,
    geldt_voor: [uid('kennis:0')],
  })
  if (voorbeeld) {
    await ins(db, 'kans_bewijs', { kans_id: kansId, profile_id: P(), bron: 'chatgpt', vragen_gemeten: 8, vragen_genoemd: 0, concurrenten: ['Warmtewerk Utrecht', 'Domstad Installaties', 'KlimaatPro'],
      eigen_site_geciteerd: false, gemeten_op: '2026-09-01T07:00:00Z', toelichting: null })
    await ins(db, 'kans_bewijs', { kans_id: kansId, profile_id: P(), bron: 'search_console', vertoningen: 340, klikken: 2, positie: 31.4, periode_dagen: 28,
      zoekopdrachten: ['hybride warmtepomp utrecht', 'warmtepomp installateur utrecht'], gemeten_op: '2026-09-01T07:00:00Z' })
  }
}

async function piece(db: Client, p: Pagina, pieceId: string, status: Pagina['status'], voorbeeld: boolean, scene: Scene): Promise<void> {
  const body = voorbeeld ? TEKST_VOORBEELD : `${p.waarom}\n\n## Wat je moet weten\n\nLindeman Warmte legt in deze pagina uit wat je kunt verwachten.\n\n## Onze aanpak\n\nEerst een opname bij je thuis, daarna een advies op maat.`
  const geschreven = status === 'live' || status === 'nakijken' || status === 'goedgekeurd'
  const dbStatus = status === 'live' ? 'published' : geschreven ? 'ready' : status === 'schrijven' ? 'draft' : 'briefing'
  const created = voorbeeld && scene !== 'live' ? '2026-10-06T08:10:00Z' : status === 'live' ? new Date(new Date(`${p.dag}T08:00:00Z`).getTime() - 14 * 86_400_000).toISOString() : '2026-10-08T08:00:00Z'
  const controle = geschreven
    ? {
        ongedekt: voorbeeld ? [GELE_ZIN] : [],
        beoordeling: { oordeel: 'goed', verzonnen: [], punten: [] },
        herschreven: false,
        gele_zinnen: voorbeeld ? [GELE_ZIN] : [],
        gele_redenen: voorbeeld ? [{ zin: GELE_ZIN, reden: GELE_REDEN }] : [],
        bevestigd: voorbeeld && (status === 'goedgekeurd' || status === 'live') ? [GELE_ZIN] : [],
      }
    : null
  await ins(db, 'content_pieces', {
    id: pieceId, analysis_id: uid(`cluster:${p.cluster}`), type: p.type, title: p.titel, target_intent: p.titel, cluster: CLUSTERS.find((c) => c.key === p.cluster)!.naam,
    body_markdown: geschreven ? body : null, meta_title: geschreven ? `${p.titel} | Lindeman Warmte` : null,
    meta_description: geschreven && voorbeeld ? 'Hybride warmtepomp in Utrecht laten plaatsen door eigen monteurs. Opname bij je thuis, installatie in één werkdag, subsidieaanvraag inbegrepen.' : null,
    faq_json: geschreven && voorbeeld ? FAQ_VOORBEELD : null, status: dbStatus, word_count: geschreven ? 640 : null, created_at: created, updated_at: voorbeeld && scene === 'geschreven' ? '2026-10-09T13:22:00Z' : created,
    needs_review: status === 'nakijken', action: 'nieuw', version: 1, is_current: true,
    published_at: status === 'live' ? p.live : null, published_url: status === 'live' ? SITE + p.pad : null,
    brief_json: { opzet: 'klaar' }, controle_json: controle, reviewed_at: status === 'live' || status === 'goedgekeurd' ? '2026-10-10T09:00:00Z' : null, reviewed_by: status === 'live' || status === 'goedgekeurd' ? ids.pieter : null,
  })
  // De vragen aan het bedrijf bij de voorbeeldpagina (en een paar bij de prijspagina van oktober).
  if (voorbeeld) {
    for (const v of VRAGEN_VOORBEELD) {
      const open = scene === 'vragen' ? v.key !== 'garantie' : false
      const overgeslagen = !open && v.antwoord === null
      await ins(db, 'fact_requests', {
        id: uid(`vraag:${v.key}`), profile_id: P(), analysis_id: uid('cluster:hybride'), question: v.vraag, reason: v.reden, scope: 'pagina', content_piece_ids: [pieceId],
        kind: v.soort, answer_type: v.type, required: v.key !== 'planning', status: open ? 'open' : overgeslagen ? 'overgeslagen' : 'beantwoord',
        answer: open || overgeslagen ? null : v.antwoord, answered_at: open || overgeslagen ? null : '2026-10-08T16:05:00Z', created_at: '2026-10-06T08:12:00Z',
        beantwoord_door_naam: open || overgeslagen ? null : 'Pieter Lindeman', open_vraag: v.type === 'tekst_lang',
      })
    }
  }
  if (p.key === 'kosten') {
    const vragen = [
      ['Vanaf welk bedrag installeren jullie een hybride warmtepomp, inclusief montage?', 'Een bedrag op de pagina moet van jullie komen. ORBIT ENGINE verzint geen prijzen.', 'bedrag'],
      ['Rekenen jullie voorrijkosten of kosten voor de opname?', 'Dit bepaalt of de prijs op de pagina compleet is.', 'ja_nee'],
    ] as const
    for (const [j, [vraag, reden, type]] of vragen.entries()) {
      await ins(db, 'fact_requests', { id: uid(`vraag:kosten:${j}`), profile_id: P(), analysis_id: uid('cluster:hybride'), question: vraag, reason: reden, scope: 'pagina',
        content_piece_ids: [pieceId], kind: 'verificatie', answer_type: type, required: true, status: 'open', created_at: '2026-10-07T08:00:00Z' })
    }
  }
}

/** De hermeting van de voorbeeldpagina na 14 en 28 dagen, met de rekenregels van de app. */
async function nameting(db: Client): Promise<void> {
  const pieceId = uid(`piece:${VOORBEELD}`)
  const analysisId = uid('cluster:hybride')
  const voor = new Map(DOELVRAGEN.map((i) => [String(i), false]))
  const golven = [
    { wave: 1, op: '2026-09-17T07:30:00Z', genoemd: [10, 16, 8] },
    { wave: 2, op: '2026-10-01T07:30:00Z', genoemd: NA_PUBLICATIE },
  ]
  const controleVoor = new Map([['c1', true], ['c2', true], ['c3', false], ['c4', false], ['c5', false], ['c6', false]])
  for (const g of golven) {
    const na = new Map(DOELVRAGEN.map((i) => [String(i), g.genoemd.includes(i)]))
    const doel = compare(voor, na)
    const controle = compare(controleVoor, controleVoor)
    await ins(db, 'content_impact', {
      content_piece_id: pieceId, analysis_id: analysisId, wave: g.wave, target_total: doel.total, target_before_mentioned: doel.beforeMentioned, target_after_mentioned: doel.afterMentioned,
      control_total: controle.total, control_before_mentioned: controle.beforeMentioned, control_after_mentioned: controle.afterMentioned,
      target_delta: Math.round(deltaOf(doel) * 100) / 100, control_delta: Math.round(deltaOf(controle) * 100) / 100, delta_threshold: thresholdOf(doel),
      verdict: verdictOf(doel), computed_at: g.op, target_cited_own_page: g.wave === 2,
    })
  }
  const c = CLUSTERS.find((x) => x.key === 'hybride')!
  await ins(db, 'meetplannen', {
    content_piece_id: pieceId, analysis_id: analysisId,
    doelvragen: DOELVRAGEN.map((i) => ({ prompt_id: uid(`prompt:hybride:${i}`), tekst: c.vragen[i].tekst })),
    controlegroep: [1, 4, 5, 6, 11, 14].map((i) => ({ prompt_id: uid(`prompt:hybride:${i}`), tekst: c.vragen[i].tekst })),
    bronnen: ['openai'], regio: 'Utrecht', vastgelegd_op: '2026-09-02T09:00:00Z', gepubliceerd_op: '2026-09-03T09:30:00Z',
  })
  // Eerdere live pagina's kregen ook hun hermeting.
  const eerder: [string, number, number, number][] = [
    ['cv-onderhoud', 8, 1, 5], ['storingsdienst', 8, 0, 5], ['abonnement', 6, 1, 4], ['hybride-vs-elektrisch', 8, 1, 5],
    ['hybride-uitleg', 6, 1, 4], ['ketel-vervangen-kosten', 6, 0, 3], ['tussenwoning', 8, 1, 5], ['isde-2026', 6, 0, 4],
    ['onderhoud-nieuwegein', 6, 1, 4], ['zonnepanelen', 6, 0, 4],
  ]
  // Eerste hermeting (na 14 dagen) van twee pagina's uit eind september.
  for (const [k, total, voorN, naN, op] of [['storing-warmtepomp', 6, 0, 4, '2026-10-01T07:30:00Z'], ['subsidie-aanvragen', 6, 0, 4, '2026-10-08T07:30:00Z']] as const) {
    const doel = { total, beforeMentioned: voorN, afterMentioned: naN }
    const live = PAGINAS.find((p) => p.key === k)!
    await ins(db, 'content_impact', { content_piece_id: uid(`piece:${k}`), analysis_id: uid(`cluster:${live.cluster}`), wave: 1, target_total: total,
      target_before_mentioned: voorN, target_after_mentioned: naN, control_total: 6, control_before_mentioned: 2, control_after_mentioned: 2,
      target_delta: Math.round(deltaOf(doel) * 100) / 100, control_delta: 0, delta_threshold: thresholdOf(doel), verdict: verdictOf(doel), computed_at: op, target_cited_own_page: true })
  }
  for (const [k, total, voorN, naN] of eerder) {
    const doel = { total, beforeMentioned: voorN, afterMentioned: naN }
    const live = PAGINAS.find((p) => p.key === k)!
    await ins(db, 'content_impact', { content_piece_id: uid(`piece:${k}`), analysis_id: uid(`cluster:${live.cluster}`), wave: 2, target_total: total,
      target_before_mentioned: voorN, target_after_mentioned: naN, control_total: 6, control_before_mentioned: 2, control_after_mentioned: 2,
      target_delta: Math.round(deltaOf(doel) * 100) / 100, control_delta: 0, delta_threshold: thresholdOf(doel), verdict: verdictOf(doel),
      computed_at: new Date(new Date(live.live!).getTime() + 28 * 86_400_000).toISOString(), target_cited_own_page: naN >= 4 })
  }
}

/** Dagcijfers uit Search Console voor de live pagina's, met een rustig oplopende lijn. */
async function zoekverkeer(db: Client, scene: Scene): Promise<void> {
  const tot = new Date('2026-10-09T00:00:00Z')
  const rijen: unknown[][] = []
  for (const [i, p] of PAGINAS.entries()) {
    if (p.status !== 'live' || (p.key === VOORBEELD && scene !== 'live')) continue
    const start = new Date(p.live!.slice(0, 10) + 'T00:00:00Z')
    // Een paar weken vóór publicatie: de oude, algemene pagina op dat adres bestond niet, dus niets.
    const schaal = p.key === VOORBEELD ? 1.6 : 0.6 + (i % 3) * 0.25
    for (let d = new Date(start), n = 0; d <= tot; d.setUTCDate(d.getUTCDate() + 1), n++) {
      const golf = 1 + 0.25 * Math.sin((n + i) * 1.3) + 0.15 * Math.cos(n * 0.7 + i)
      const weekend = [0, 6].includes(d.getUTCDay()) ? 0.7 : 1
      const vertoningen = Math.max(0, Math.round((10 + Math.min(n, 45) * 3.4) * schaal * golf * weekend))
      const klikken = Math.max(0, Math.round(vertoningen * (0.04 + Math.min(n, 40) * 0.0011) * (1 + 0.3 * Math.sin(n * 2.1 + i))))
      const positie = Math.max(3.8, 19 - Math.min(n, 40) * 0.36 + Math.sin(n) * 0.9)
      rijen.push([P(), d.toISOString().slice(0, 10), SITE + p.pad, klikken, vertoningen, Math.round(positie * 10) / 10])
    }
  }
  for (const r of rijen) {
    await db.query('insert into search_console_days (profile_id, day, page, clicks, impressions, position) values ($1, $2, $3, $4, $5, $6)', r)
  }
}
