// Leegt de draaiende demo-database en zet de voorbeeldgegevens opnieuw klaar (zonder herstart).
import { Client, PG_PORT } from './stack.mjs'
import { seed } from './seed.mts'

const db = new Client({ host: '127.0.0.1', port: PG_PORT, user: 'postgres', database: 'postgres' })
await db.connect()
const { rows } = await db.query("select string_agg(format('%I.%I', schemaname, tablename), ', ') t from pg_tables where schemaname = 'public'")
await db.query(`truncate ${rows[0].t}, auth.users cascade`)
await seed(db, (process.argv[2] ?? 'live') as never)
await db.end()
console.log('Voorbeeldgegevens opnieuw klaargezet.')
