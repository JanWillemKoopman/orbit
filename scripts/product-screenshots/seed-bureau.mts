// De andere bedrijven van Bureau Noordwind, de kijkers en het geregistreerde verbruik.
import type { Client } from 'pg'
import { binomialStderr } from '@/lib/stats/uncertainty'
import { ids, ins, uid } from './seed.mts'

interface Bedrijf {
  key: string
  naam: string
  url: string
  branche: string
  cluster: string
  reeks: number[]
  vragen: number
  open: number // open vragen aan het bedrijf
  paginas: ('live' | 'akkoord' | 'nakijken' | 'briefing' | 'schrijven')[]
  kosten: number[] // verbruik in dollar per maand, oudste eerst (mei t/m oktober)
}

export const BEDRIJVEN: Bedrijf[] = [
  { key: 'brink', naam: 'Brink & Mulder Advocaten', url: 'https://www.brinkmulder.example', branche: 'Advocatuur', cluster: 'Arbeidsrecht voor werkgevers', reeks: [24, 31, 38], vragen: 24, open: 3, paginas: ['live', 'live', 'nakijken', 'briefing'], kosten: [0, 9.8, 14.2, 12.6, 15.1, 8.4] },
  { key: 'tandarts', naam: 'Tandartspraktijk Lunetten', url: 'https://www.tandartslunetten.example', branche: 'Mondzorg', cluster: 'Implantaten en kronen', reeks: [35, 40, 45, 55], vragen: 20, open: 0, paginas: ['live', 'live', 'live', 'akkoord'], kosten: [7.2, 11.5, 10.9, 12.3, 13.4, 6.1] },
  { key: 'hoveniers', naam: 'Groenrijk Hoveniers', url: 'https://www.groenrijkhoveniers.example', branche: 'Tuinaanleg', cluster: 'Tuinontwerp en aanleg', reeks: [14, 23], vragen: 22, open: 5, paginas: ['briefing', 'briefing', 'schrijven'], kosten: [0, 0, 0, 8.7, 16.9, 11.8] },
  { key: 'verbeek', naam: 'Verbeek Bouw & Renovatie', url: 'https://www.verbeekbouw.example', branche: 'Aannemer', cluster: 'Aanbouw en dakkapel', reeks: [19, 27, 35, 42], vragen: 26, open: 1, paginas: ['live', 'live', 'akkoord', 'akkoord', 'nakijken'], kosten: [6.4, 12.8, 13.1, 14.9, 12.2, 7.3] },
  { key: 'fysio', naam: 'Fysio Oudwijk', url: 'https://www.fysiooudwijk.example', branche: 'Fysiotherapie', cluster: 'Sportblessures en herstel', reeks: [44, 50, 61], vragen: 18, open: 2, paginas: ['live', 'nakijken', 'briefing'], kosten: [0, 0, 9.1, 10.4, 11.7, 5.2] },
]

const TITELS: Record<string, string[]> = {
  brink: ['Ontslag op staande voet: wat moet je als werkgever weten?', 'Vaststellingsovereenkomst laten opstellen', 'Concurrentiebeding in een arbeidscontract', 'Zieke werknemer en re-integratie'],
  tandarts: ['Wat kost een implantaat in Utrecht?', 'Kroon of brug: wat past bij jou?', 'Spoedtandarts in Utrecht-Oost', 'Tanden bleken bij de tandarts'],
  hoveniers: ['Tuinontwerp laten maken in Amersfoort', 'Onderhoudsarme tuin aanleggen', 'Wat kost een nieuwe tuin per vierkante meter?'],
  verbeek: ['Dakkapel plaatsen: kosten en doorlooptijd', 'Aanbouw zonder vergunning?', 'Badkamer renoveren in Utrecht', 'Uitbouw met lichtstraat', 'Garage ombouwen tot werkruimte'],
  fysio: ['Hardlopersknie behandelen', 'Fysiotherapie na een kruisbandoperatie', 'Schouderklachten bij sporters'],
}

const MAANDEN = ['2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10']

export async function bureau(db: Client): Promise<void> {
  for (const [bi, b] of BEDRIJVEN.entries()) {
    const pid = uid(`bedrijf:${b.key}`)
    await ins(db, 'profiles', { id: pid, user_id: ids.sanne, bureau_id: ids.bureau, name: b.naam, brand_name: b.naam, url: b.url, status: 'klaar', industry: b.branche,
      created_at: `2026-0${5 + (bi % 3)}-0${2 + bi}T10:00:00Z`, gsc_property: `sc-domain:${b.url.slice(12)}`, gsc_verified_at: '2026-07-01T08:00:00Z' })
    const aid = uid(`analyse:${b.key}`)
    await ins(db, 'analyses', { id: aid, user_id: ids.sanne, profile_id: pid, url: b.url, topic: b.cluster, name: b.cluster, status: 'gereed', tracking_enabled: true,
      created_at: '2026-06-10T09:00:00Z', meetkanalen: ['openai'] })
    const start = 6 - b.reeks.length
    for (const [r, procent] of b.reeks.entries()) {
      const genoemd = Math.round((procent / 100) * b.vragen)
      const op = `${MAANDEN[start + r]}-0${1 + (bi % 3)}T07:00:00Z`
      await ins(db, 'visibility_scores', { analysis_id: aid, week_no: r + 1, score: procent, weighted_score: procent, score_stderr: binomialStderr(genoemd, b.vragen) / 1.8,
        weighted_stderr: binomialStderr(genoemd, b.vragen) / 1.8, judged_runs: b.vragen, winnable_runs: b.vragen, brandless_runs: 0, computed_at: op, teststand: false,
        per_engine_json: { openai: { score: procent, weighted_score: procent, stderr: binomialStderr(genoemd, b.vragen), judged_runs: b.vragen, winnable_runs: b.vragen } } })
    }
    for (const [i, stand] of b.paginas.entries()) {
      const titel = TITELS[b.key][i]
      const live = stand === 'live'
      await ins(db, 'content_pieces', { id: uid(`stuk:${b.key}:${i}`), analysis_id: aid, type: 'landing', title: titel, status: live ? 'published' : stand === 'briefing' ? 'briefing' : stand === 'schrijven' ? 'draft' : 'ready',
        body_markdown: stand === 'briefing' || stand === 'schrijven' ? null : `${titel}\n\nVoorbeeldtekst.`, needs_review: stand === 'nakijken', is_current: true, version: 1, action: 'nieuw',
        brief_json: { opzet: 'klaar' }, published_at: live ? `2026-0${7 + (i % 3)}-1${i}T09:00:00Z` : null, published_url: live ? `${b.url}/pagina-${i + 1}` : null,
        created_at: stand === 'live' ? `2026-08-0${1 + i}T09:00:00Z` : `2026-10-${String(8 + (i % 3)).padStart(2, '0')}T09:00:00Z` })
    }
    for (let v = 0; v < b.open; v++) {
      await ins(db, 'fact_requests', { profile_id: pid, analysis_id: aid, question: `Vraag ${v + 1} aan ${b.naam}`, scope: 'merk', kind: 'aanvulling', answer_type: 'tekst_kort', status: 'open',
        created_at: new Date(Date.UTC(2026, 9, 10 - (bi % 3) - v, 9)).toISOString() })
    }
    await kosten(db, pid, aid, b.paginas.map((_, i) => uid(`stuk:${b.key}:${i}`)), b.kosten)
  }
  await kosten(db, ids.lindeman, uid('cluster:hybride'), ['jaren-30', 'houten', 'cv-vervangen'].map((k) => uid(`piece:${k}`)), [8.6, 21.4, 17.9, 19.2, 20.8, 11.3])

  // Kijkers: de eigenaar van Lindeman Warmte, en een praktijkmanager van de tandartspraktijk.
  await ins(db, 'kijker_bedrijven', { user_id: ids.pieter, profile_id: ids.lindeman, toegewezen_door: ids.sanne, toegewezen_op: '2026-05-21T11:00:00Z' })
  await ins(db, 'kijker_bedrijven', { user_id: ids.femke, profile_id: uid('bedrijf:tandarts'), toegewezen_door: ids.joris, toegewezen_op: '2026-07-02T11:00:00Z' })
  await ins(db, 'bureau_instellingen', { bureau_id: ids.bureau, naam: 'maandlimiet_eur', waarde: '250', bijgewerkt_door: ids.sanne })
}

/** Geregistreerd verbruik per maand, verdeeld over een paar soorten werk. */
async function kosten(db: Client, profileId: string, analysisId: string, stukken: string[], perMaand: number[]): Promise<void> {
  const soorten = ['measure', 'report', 'pagina_schrijven', 'dossier_bijwerken']
  for (const [m, totaal] of perMaand.entries()) {
    if (totaal === 0) continue
    const delen = [0.45, 0.2, 0.25, 0.1]
    for (const [s, deel] of delen.entries()) {
      for (let k = 0; k < 3; k++) {
        const dag = m === 5 ? 2 + k * 3 : 3 + k * 8
        await ins(db, 'ai_calls', { profile_id: profileId, analysis_id: s < 2 ? analysisId : null, content_piece_id: s === 2 ? stukken[k % stukken.length] : null, bureau_id: ids.bureau, kind: soorten[s], model: 'gpt-5-mini', cost_usd: Math.round((totaal * deel / 3) * 10000) / 10000,
          input_tokens: 4000, output_tokens: 1200, total_tokens: 5200, created_at: `${MAANDEN[m]}-${String(dag).padStart(2, '0')}T08:${10 + s}:00Z`, engine: 'openai' })
      }
    }
  }
}
