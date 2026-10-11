// Voorbeeldgegevens voor de productbeelden: Bureau Noordwind en zijn bedrijven.
// Alles is verzonnen. Domeinen eindigen op .example, e-mailadressen ook.
import type { Client } from 'pg'
import { createHash } from 'node:crypto'
import { binomialStderr } from '@/lib/stats/uncertainty'
import { CLUSTERS, RONDES, HOOFDANTWOORD, antwoordVoor, CONCURRENTEN } from './data-metingen.mts'
import { content } from './seed-content.mts'
import { bureau } from './seed-bureau.mts'

/** Het moment in het verhaal van de voorbeeldpagina. 'live' is de eindstand. */
export type Scene = 'idee' | 'vragen' | 'geschreven' | 'goedgekeurd' | 'live'

export const ids = {
  bureau: '0b0b0000-0000-4000-8000-000000000001',
  sanne: '5a000000-0000-4000-8000-000000000001',
  joris: '5a000000-0000-4000-8000-000000000002',
  pieter: '5a000000-0000-4000-8000-000000000003',
  femke: '5a000000-0000-4000-8000-000000000004',
  lindeman: 'b0000000-0000-4000-8000-000000000001',
}

export async function ins(db: Client, table: string, row: Record<string, unknown>): Promise<void> {
  const keys = Object.keys(row)
  const vals = keys.map((k) => {
    const v = row[k]
    if (v !== null && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date)) return JSON.stringify(v)
    if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'object') return JSON.stringify(v)
    return v
  })
  await db.query(`insert into ${table} (${keys.map((k) => `"${k}"`).join(', ')}) values (${keys.map((_, i) => `$${i + 1}`).join(', ')})`, vals)
}

export async function seed(db: Client, scene: Scene | 'vragen-link' = 'live'): Promise<void> {
  const users = [
    { id: ids.sanne, email: 'sanne@noordwind.example', naam: 'Sanne de Vries', laatst: '2026-10-11T08:02:00Z' },
    { id: ids.joris, email: 'joris@noordwind.example', naam: 'Joris Bakker', laatst: '2026-10-10T15:40:00Z' },
    { id: ids.pieter, email: 'pieter@lindemanwarmte.example', naam: 'Pieter Lindeman', laatst: '2026-10-08T16:01:00Z' },
    { id: ids.femke, email: 'femke@tandartslunetten.example', naam: 'Femke Jansen', laatst: '2026-10-06T10:12:00Z' },
  ]
  for (const u of users) {
    const [voornaam, ...rest] = u.naam.split(' ')
    await ins(db, 'auth.users', { id: u.id, email: u.email, email_confirmed_at: '2026-05-04T09:00:00Z', created_at: '2026-05-04T09:00:00Z', last_sign_in_at: u.laatst,
      raw_user_meta_data: { full_name: u.naam, voornaam, achternaam: rest.join(' '), rondleiding_gezien_op: '2026-05-04T09:05:00Z' } })
  }
  await ins(db, 'bureaus', { id: ids.bureau, naam: 'Bureau Noordwind', aangemaakt_op: '2026-05-04T09:00:00Z' })
  await ins(db, 'bureau_leden', { bureau_id: ids.bureau, user_id: ids.sanne, rol: 'beheerder' })
  await ins(db, 'bureau_leden', { bureau_id: ids.bureau, user_id: ids.joris, rol: 'beheerder' })
  await ins(db, 'bureau_leden', { bureau_id: ids.bureau, user_id: ids.pieter, rol: 'kijker' })
  await ins(db, 'bureau_leden', { bureau_id: ids.bureau, user_id: ids.femke, rol: 'kijker' })

  await ins(db, 'profiles', {
    id: ids.lindeman, user_id: ids.sanne, bureau_id: ids.bureau, name: 'Lindeman Warmte', brand_name: 'Lindeman Warmte',
    url: 'https://www.lindemanwarmte.example', status: 'klaar', industry: 'Installatietechniek',
    created_at: '2026-05-12T10:00:00Z',
  })
  // Een sleutel in de kluis van het bureau, zodat de app geen waarschuwing toont. Het is geen echte
  // sleutel: elke aanroep ermee zou door OpenAI geweigerd worden, en in de demo start niets een aanroep.
  await db.query("select public.bureau_sleutel_zetten($1, 'OPENAI_API_KEY', 'sk-voorbeeld-geen-echte-sleutel')", [ids.bureau])
  await ins(db, 'cluster_labels', { id: uid('label:warmtepomp'), profile_id: ids.lindeman, name: 'Warmtepompen' })
  await ins(db, 'cluster_labels', { id: uid('label:service'), profile_id: ids.lindeman, name: 'Service' })
  await metingen(db)
  await content(db, scene)
  await bureau(db)
}

/** Een vaste uuid per sleutel, zodat elke herhaling dezelfde adressen oplevert. */
export function uid(sleutel: string): string {
  const h = createHash('sha1').update(sleutel).digest('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`
}

/** Beslisvragen uit het cluster Hybride warmtepomp die na publicatie wel een vermelding opleveren. */
export const NA_PUBLICATIE = [0, 8, 10, 16, 20]
/** De doelvragen van de voorbeeldpagina. */
export const DOELVRAGEN = [0, 8, 10, 16, 20, 25, 1, 29]

async function metingen(db: Client): Promise<void> {
  for (const c of CLUSTERS) {
    const analysisId = uid(`cluster:${c.key}`)
    await ins(db, 'analyses', {
      id: analysisId, user_id: ids.sanne, profile_id: ids.lindeman, url: 'https://www.lindemanwarmte.example',
      topic: c.topic, name: c.naam, status: 'gereed', tracking_enabled: true, created_at: '2026-05-28T09:00:00Z',
      meetkanalen: ['openai'], label_id: uid(c.key === 'cv' ? 'label:service' : 'label:warmtepomp'),
    })
    const promptIds = c.vragen.map((_, i) => uid(`prompt:${c.key}:${i}`))
    for (const [i, v] of c.vragen.entries()) {
      await ins(db, 'prompts', { id: promptIds[i], analysis_id: analysisId, text: v.tekst, category: v.fase, active: true, created_by: 'system',
        intent_type: v.fase === 'Beslissing' ? 'transactional' : v.fase === 'Overweging' ? 'commercial' : 'informational',
        purchase_intent: v.fase !== 'Oriëntatie', cluster: c.naam, volume_band: v.gewicht > 0.4 ? 'hoog' : v.gewicht > 0.28 ? 'midden' : 'laag', volume_source: 'geschat',
        created_at: '2026-05-28T09:05:00Z' })
    }
    // Volgorde waarin vragen "gewonnen" worden: eerst de orienterende, de beslisvragen het laatst.
    // De hoofdvraag van het voorbeeld (index 0) wordt in de periodieke metingen nooit gewonnen.
    const volgorde = c.vragen.map((v, i) => ({ i, r: (v.fase === 'Oriëntatie' ? 0 : v.fase === 'Overweging' ? 1 : 2) * 100 + ((i * 7) % 13) }))
      .filter((x) => x.i !== 0 && !(c.key === 'hybride' && DOELVRAGEN.includes(x.i))).sort((a, b) => a.r - b.r).map((x) => x.i)
    for (const [ronde, procent] of c.reeks.entries()) {
      const weekNo = ronde + 1
      const n = c.vragen.length
      const aantal = Math.round((procent / 100) * n)
      // Na de publicatie van de voorbeeldpagina (3 september) wordt Lindeman Warmte bij vier van
      // de beslisvragen genoemd; die vervangen vier orienterende vragen, zodat het percentage gelijk blijft.
      const extra = c.key === 'hybride' && weekNo === 5 ? NA_PUBLICATIE : []
      const genoemd = new Set([...extra, ...volgorde.filter((i) => !extra.includes(i)).slice(0, aantal - extra.length)])
      for (const [i, v] of c.vragen.entries()) {
        const runId = uid(`run:${c.key}:${weekNo}:${i}`)
        const eigen = genoemd.has(i)
        const hoofd = c.key === 'hybride' && i === 0 && !eigen
        const a = hoofd ? { tekst: HOOFDANTWOORD, namen: ['Warmtewerk Utrecht', 'Domstad Installaties', 'KlimaatPro'], bronnen: ['warmtepompweb.example', 'vakmanvinden.example', 'energieloket-utrecht.example'] } : antwoordVoor(v.tekst, i + weekNo, eigen)
        const ranAt = new Date(new Date(RONDES[ronde]).getTime() + i * 41_000).toISOString()
        await ins(db, 'tracking_runs', { id: runId, analysis_id: analysisId, prompt_id: promptIds[i], prompt_text_snapshot: v.tekst, prompt_category_snapshot: v.fase,
          engine: 'openai', model_used: 'gpt-5-mini', week_no: weekNo, ran_at: ranAt, raw_response: a.tekst, raw_response_received_at: ranAt,
          prompt_weight: v.gewicht, purpose: 'periodic', brands_in_answer: a.namen.length, repeat_index: 0, teststand: false })
        await ins(db, 'tracking_run_mentions', { tracking_run_id: runId, entity_name: 'Lindeman Warmte', is_own_brand: true, mentioned: eigen,
          position: eigen ? a.namen.indexOf('Lindeman Warmte') + 1 : null, sentiment: eigen ? 'positive' : null, cited_sources: eigen ? ['lindemanwarmte.example'] : [],
          mention_role: eigen ? 'een_van_meerdere' : null })
        for (const [k, naam] of a.namen.entries()) {
          if (naam === 'Lindeman Warmte') continue
          await ins(db, 'tracking_run_mentions', { tracking_run_id: runId, entity_name: naam, is_own_brand: false, mentioned: true, position: k + 1,
            sentiment: 'neutral', cited_sources: k === 0 ? a.bronnen : [], mention_role: k === 0 ? 'eerste_aanbeveling' : 'een_van_meerdere' })
        }
      }
      // Voor de productbeelden een smallere marge dan één meting per vraag geeft, alsof elke vraag
      // twaalf keer gemeten is. Zo laat het beeld een duidelijke ontwikkeling zien.
      const se = (x: number) => Math.round((x / Math.sqrt(12)) * 100) / 100
      const score = Math.round((aantal / n) * 100)
      // Gewogen en ongewogen gelijk, zodat kaart en tabel hetzelfde cijfer tonen.
      const gewogen = score
      await ins(db, 'visibility_scores', { analysis_id: analysisId, week_no: weekNo, score, weighted_score: gewogen,
        score_stderr: se(binomialStderr(aantal, n)), weighted_stderr: se(binomialStderr(aantal, n)), judged_runs: n, winnable_runs: n, brandless_runs: 0,
        share_of_voice: Math.round((aantal / (aantal + n * 1.6)) * 100), share_basis_count: CONCURRENTEN.length + 1, avg_position: 2.4,
        citation_count: Math.round(aantal / 2), first_mention_count: Math.round(aantal / 5), computed_at: new Date(new Date(RONDES[ronde]).getTime() + 3_600_000).toISOString(),
        per_engine_json: { openai: { score, weighted_score: gewogen, stderr: se(binomialStderr(aantal, n)), weighted_stderr: se(binomialStderr(aantal, n)), judged_runs: n, winnable_runs: n } }, teststand: false })
    }
  }
}
