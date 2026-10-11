// Start database, PostgREST en gateway, zet de voorbeeldgegevens klaar en houdt alles draaiende.
// Draai vanuit de map van orbit-engine (zie README.md): npx tsx ../orbit/scripts/product-screenshots/up.mts
import { startDatabase, startGateway, startPostgrest, stopDatabase } from './stack.mjs'
import { seed } from './seed.mts'

const db = await startDatabase()
await seed(db)
const rest = startPostgrest()
await startGateway(db)
console.log('Demo-omgeving draait: gateway op http://127.0.0.1:54321')
const stop = () => { rest.kill(); stopDatabase(); process.exit(0) }
process.on('SIGINT', stop); process.on('SIGTERM', stop)
