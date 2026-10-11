# Productbeelden voor /product

De 18 beelden op de productpagina zijn echte schermen van ORBIT ENGINE: de app draait lokaal,
ongewijzigd, op een wegwerpdatabase met fictieve voorbeeldgegevens (Bureau Noordwind, Lindeman
Warmte en vijf andere bedrijven). Er is geen AI-sleutel, geen mail en geen Google-koppeling; er
wordt niets betaald of verstuurd.

## Wat er draait

- **PostgreSQL** (lokaal geïnstalleerd, `initdb`) met alle migraties uit `orbit-engine/supabase/migrations`.
- **PostgREST** 12.2.3, dezelfde REST-laag als Supabase.
- **Een kleine gateway** op `127.0.0.1:54321` die `/rest/v1` doorgeeft aan PostgREST en van Supabase
  Auth alleen het minimum nabootst (inloggen met het demowachtwoord, de gebruiker lezen). Alles
  luistert alleen op `127.0.0.1`.
- **De app zelf** (`orbit-engine`, `next build` + `next start`) op poort 3100, met omgevingsvariabelen
  die naar de gateway wijzen.

| Bestand | Wat het doet |
| --- | --- |
| `stack.mjs` | Database, PostgREST en gateway; de omgevingsvariabelen voor de app |
| `seed.mts`, `seed-content.mts`, `seed-bureau.mts` | De voorbeeldgegevens. Cijfers komen uit de rekenfuncties van de app zelf (`lib/stats/uncertainty`, `lib/pipeline/impact-math`) |
| `data-metingen.mts`, `data-content.mts` | Vragen, antwoorden, pagina's en de voorbeeldtekst |
| `up.mts` | Start alles en zet de gegevens klaar |
| `reseed.mts <scene>` | Zet de gegevens opnieuw klaar voor een moment in het verhaal |
| `shoot.mjs [nummers]` | Maakt de beelden (Playwright, 2x) in `bron/` |
| `optimize.mjs` | Zet `bron/` om naar WebP in `public/images/product/`, met uitsneden voor telefoons |

De voorbeeldpagina "Hybride warmtepomp laten installeren in Utrecht" loopt door de beelden heen.
Omdat een pagina niet tegelijk een idee en gepubliceerd kan zijn, kent de seed vijf momenten:
`idee` (beeld 6), `vragen` en `vragen-link` (7 tot en met 9), `geschreven` (10, 11),
`goedgekeurd` (12) en `live` (de rest). `shoot.mjs` zet per beeld het juiste moment klaar.

## Opnieuw maken

Vereist: Node 22, PostgreSQL 14 of nieuwer (`/usr/lib/postgresql/<versie>/bin` of `PG_BIN_DIR`),
Playwright met Chromium, en `orbit-engine` naast deze repository (of `ORBIT_ENGINE_DIR`).

```bash
# 1. PostgREST ophalen (eenmalig)
mkdir -p scripts/product-screenshots/bin && cd scripts/product-screenshots/bin
curl -sSL https://github.com/PostgREST/postgrest/releases/download/v12.2.3/postgrest-v12.2.3-linux-static-x64.tar.xz | tar xJ
cd -

# 2. De app bouwen met de lokale omgeving (in orbit-engine, na npm ci)
cd ../orbit-engine
node -e "import('../orbit/scripts/product-screenshots/stack.mjs').then(m => console.log(Object.entries(m.appEnv()).map(([k, v]) => k + '=' + v).join('\n')))" > /tmp/demo.env
set -a; . /tmp/demo.env; set +a
npx next build

# 3. Demo-omgeving starten (laat draaien) en de app starten
npx tsx ../orbit/scripts/product-screenshots/up.mts &
npx next start -p 3100 -H 127.0.0.1 &

# 4. Beelden maken en omzetten (vanuit deze repository)
cd ../orbit
node scripts/product-screenshots/shoot.mjs        # of bijvoorbeeld: shoot.mjs 03 12
node scripts/product-screenshots/optimize.mjs
```

De app gebruikt de echte datum: de gegevens zijn gemaakt voor oktober 2026. Maak je de beelden veel
later opnieuw, schuif dan de data in de seed mee.
