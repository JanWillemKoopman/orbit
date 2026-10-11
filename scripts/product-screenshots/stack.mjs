// Lokale, wegwerpbare omgeving waarin de echte ORBIT ENGINE-app draait op voorbeeldgegevens.
//
// Wat er draait:
//   - PostgreSQL (initdb, eigen poort) met het schema uit orbit-engine/supabase/migrations;
//   - PostgREST, dezelfde REST-laag die Supabase gebruikt;
//   - een kleine poort (gateway) op 54321 die /rest/v1 doorgeeft aan PostgREST en voor /auth/v1
//     alleen het minimum nabootst dat de app nodig heeft om een ingelogde gebruiker te lezen.
//
// De app zelf blijft ongewijzigd: hij krijgt alleen andere omgevingsvariabelen. Er is geen
// OpenAI-sleutel, geen Resend-sleutel en geen Google-koppeling, dus een knop die iets betaalds zou
// starten, kan hier niets bereiken. Alles luistert uitsluitend op 127.0.0.1.
import { execFileSync, spawn } from 'node:child_process'
import { createHmac } from 'node:crypto'
import { chownSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import http from 'node:http'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'

export const ENGINE_DIR = resolve(process.env.ORBIT_ENGINE_DIR ?? join(import.meta.dirname, '../../../orbit-engine'))
export const WORK_DIR = resolve(process.env.DEMO_WORK_DIR ?? join(import.meta.dirname, '.work'))
export const PG_PORT = 54322
const REST_PORT = 54323
export const GATEWAY_PORT = 54321
export const APP_PORT = Number(process.env.DEMO_APP_PORT ?? 3100)
export const JWT_SECRET = 'lokale-demo-omgeving-geen-echt-geheim-0123456789'
export const DEMO_PASSWORD = 'voorbeeld-wachtwoord'

const requireEngine = createRequire(join(ENGINE_DIR, 'package.json'))
export const { Client } = requireEngine('pg')

// ── JWT (HS256), alleen voor deze lokale omgeving ──────────────────────────────
const b64 = (v) => Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url')
export function jwt(payload) {
  const body = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64(payload)}`
  return `${body}.${createHmac('sha256', JWT_SECRET).update(body).digest('base64url')}`
}
function verify(token) {
  const [h, p, s] = String(token).split('.')
  if (!s || createHmac('sha256', JWT_SECRET).update(`${h}.${p}`).digest('base64url') !== s) return null
  return JSON.parse(Buffer.from(p, 'base64url').toString())
}
const VER = 4102444800 // 2100-01-01
export const ANON_KEY = jwt({ role: 'anon', iss: 'demo', exp: VER })
export const SERVICE_KEY = jwt({ role: 'service_role', iss: 'demo', exp: VER })

export function appEnv() {
  return {
    NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${GATEWAY_PORT}`,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY,
    CRON_SECRET: 'lokaal',
    NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${APP_PORT}`,
    EMAILS_ENABLED: 'false',
    WEB_SEARCH_ENABLED: 'false',
    AI_OVERVIEW_ENABLED: 'false',
    SIGNUPS_ENABLED: 'false',
    NEXT_TELEMETRY_DISABLED: '1',
    // Vaste versie: anders meldt de app bij elk scherm dat er een nieuwe versie klaarstaat.
    VERCEL_GIT_COMMIT_SHA: 'voorbeeld',
  }
}

// ── PostgreSQL ────────────────────────────────────────────────────────────────
function pgBin() {
  for (const v of ['18', '17', '16', '15', '14']) {
    const d = `/usr/lib/postgresql/${v}/bin`
    if (existsSync(join(d, 'initdb'))) return d
  }
  if (process.env.PG_BIN_DIR) return process.env.PG_BIN_DIR
  throw new Error('Geen PostgreSQL gevonden (zet PG_BIN_DIR).')
}
function runAs() {
  if (process.getuid?.() !== 0) return {}
  return { uid: 1000, gid: Number(execFileSync('id', ['-g', '1000'], { encoding: 'utf8' }).trim()) }
}

const STUBS = `
do $$ begin
  if not exists (select 1 from pg_roles where rolname='anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname='authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname='service_role') then create role service_role nologin bypassrls; end if;
  if not exists (select 1 from pg_roles where rolname='authenticator') then create role authenticator login noinherit; end if;
end $$;
grant anon, authenticated, service_role to authenticator;
create schema if not exists auth;
create table if not exists auth.users (
  id uuid primary key, email text, email_confirmed_at timestamptz,
  raw_user_meta_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(), last_sign_in_at timestamptz
);
create or replace function auth.uid() returns uuid language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub'))::uuid $$;
create or replace function auth.role() returns text language sql stable as $$
  select coalesce((nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role'), 'service_role') $$;
create or replace function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb, '{}'::jsonb) $$;
grant usage on schema auth to anon, authenticated, service_role;
create schema if not exists vault;
create table if not exists vault.secrets (id uuid primary key default gen_random_uuid(), name text unique,
  description text not null default '', secret text not null, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now());
create or replace view vault.decrypted_secrets as select id, name, description, secret, secret as decrypted_secret, created_at, updated_at from vault.secrets;
create or replace function vault.create_secret(new_secret text, new_name text default null, new_description text default '', new_key_id uuid default null)
  returns uuid language sql as $$ insert into vault.secrets (secret, name, description) values (new_secret, new_name, coalesce(new_description, '')) returning id $$;
create or replace function vault.update_secret(secret_id uuid, new_secret text default null, new_name text default null, new_description text default null, new_key_id uuid default null)
  returns void language sql as $$ update vault.secrets set secret = coalesce(new_secret, secret), name = coalesce(new_name, name), description = coalesce(new_description, description), updated_at = now() where id = secret_id $$;
grant usage on schema public to anon, authenticated, service_role;
alter default privileges in schema public grant select, insert, update, delete on tables to anon, authenticated, service_role;
alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;
alter default privileges in schema public grant usage, select on sequences to anon, authenticated, service_role;
`
// Plannen van achtergrondwerk (pg_cron, pg_net) hoort niet in een demo: die migraties slaan we over.
const OVERSLAAN = new Set(['0002_achtergrondwerk.sql', '0013_geplande_taken.sql', '0015_herinneringen.sql'])

export async function startDatabase() {
  const bin = pgBin()
  const data = join(WORK_DIR, 'pgdata')
  const sock = join(WORK_DIR, 'sock')
  rmSync(WORK_DIR, { recursive: true, force: true })
  mkdirSync(data, { recursive: true })
  mkdirSync(sock, { recursive: true })
  const ids = runAs()
  if (ids.uid) { chownSync(WORK_DIR, ids.uid, ids.gid); chownSync(data, ids.uid, ids.gid); chownSync(sock, ids.uid, ids.gid) }
  execFileSync(join(bin, 'initdb'), ['-D', data, '-U', 'postgres', '--auth=trust'], { stdio: 'pipe', ...ids })
  execFileSync(join(bin, 'pg_ctl'), ['-D', data, '-o', `-p ${PG_PORT} -k ${sock} -h 127.0.0.1`, '-l', join(data, 'server.log'), '-w', 'start'], { stdio: 'pipe', ...ids })
  const client = new Client({ host: '127.0.0.1', port: PG_PORT, user: 'postgres', database: 'postgres' })
  await client.connect()
  await client.query(STUBS)
  const dir = join(ENGINE_DIR, 'supabase/migrations')
  for (const f of readdirSync(dir).filter((f) => /^\d{4}_.*\.sql$/.test(f)).sort()) {
    if (OVERSLAAN.has(f)) continue
    try { await client.query(readFileSync(join(dir, f), 'utf8')) } catch (e) { throw new Error(`Migratie ${f}: ${e.message}`) }
  }
  await client.query(`grant select, insert, update, delete on all tables in schema public to anon, authenticated, service_role;
    grant execute on all functions in schema public to anon, authenticated, service_role;
    grant usage, select on all sequences in schema public to anon, authenticated, service_role;`)
  return client
}

export function stopDatabase() {
  try { execFileSync(join(pgBin(), 'pg_ctl'), ['-D', join(WORK_DIR, 'pgdata'), '-m', 'fast', 'stop'], { stdio: 'pipe', ...runAs() }) } catch {}
}

// ── PostgREST ─────────────────────────────────────────────────────────────────
export function startPostgrest() {
  const bin = process.env.POSTGREST_BIN ?? join(WORK_DIR, '..', 'bin', 'postgrest')
  if (!existsSync(bin)) throw new Error(`PostgREST niet gevonden op ${bin}. Zie README.md in deze map.`)
  const conf = join(WORK_DIR, 'postgrest.conf')
  writeFileSync(conf, [
    `db-uri = "postgres://authenticator@127.0.0.1:${PG_PORT}/postgres"`,
    `db-schemas = "public"`, `db-anon-role = "anon"`, `jwt-secret = "${JWT_SECRET}"`,
    `server-host = "127.0.0.1"`, `server-port = ${REST_PORT}`, `db-max-rows = 1000`, `log-level = "warn"`,
  ].join('\n'))
  return spawn(bin, [conf], { stdio: 'inherit' })
}

// ── Gateway: /rest/v1 → PostgREST, /auth/v1 → het minimum aan Supabase Auth ─────────
async function userJson(db, id) {
  const { rows } = await db.query('select id, email, raw_user_meta_data, created_at, last_sign_in_at from auth.users where id = $1', [id])
  const u = rows[0]
  if (!u) return null
  return { id: u.id, aud: 'authenticated', role: 'authenticated', email: u.email, email_confirmed_at: u.created_at,
    user_metadata: u.raw_user_meta_data, app_metadata: { provider: 'email' }, created_at: u.created_at, last_sign_in_at: u.last_sign_in_at ?? u.created_at }
}
function send(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' })
  res.end(body === undefined ? '' : JSON.stringify(body))
}
const readBody = (req) => new Promise((ok) => { let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => ok(d)) })

export function startGateway(db) {
  const server = http.createServer(async (req, res) => {
    try {
      if (req.method === 'OPTIONS') return send(res, 204)
      const url = new URL(req.url, 'http://x')
      if (url.pathname.startsWith('/rest/v1')) {
        const headers = { ...req.headers, host: `127.0.0.1:${REST_PORT}` }
        const p = http.request({ host: '127.0.0.1', port: REST_PORT, method: req.method, path: url.pathname.slice(8) + url.search, headers }, (r) => {
          res.writeHead(r.statusCode, r.headers); r.pipe(res)
        })
        req.pipe(p)
        p.on('error', (e) => send(res, 502, { message: e.message }))
        return
      }
      if (url.pathname.startsWith('/auth/v1')) {
        const path = url.pathname.slice(8)
        const token = (req.headers.authorization ?? '').replace(/^Bearer /, '')
        const claims = verify(token)
        if (path === '/token' && url.searchParams.get('grant_type') === 'password') {
          const { email, password } = JSON.parse(await readBody(req))
          const { rows } = await db.query('select id from auth.users where lower(email) = lower($1)', [email])
          if (!rows[0] || password !== DEMO_PASSWORD) return send(res, 400, { error: 'invalid_grant', error_description: 'Invalid login credentials', code: 'invalid_credentials' })
          const user = await userJson(db, rows[0].id)
          return send(res, 200, { access_token: jwt({ sub: user.id, role: 'authenticated', aud: 'authenticated', email: user.email, exp: VER }), token_type: 'bearer', expires_in: VER - Math.floor(Date.now() / 1000), expires_at: VER, refresh_token: 'demo', user })
        }
        if (path === '/user' && req.method === 'GET') {
          if (!claims?.sub) return send(res, 401, { message: 'invalid JWT', code: 'bad_jwt' })
          const user = await userJson(db, claims.sub)
          return user ? send(res, 200, user) : send(res, 404, { message: 'User not found' })
        }
        if (path === '/user' && req.method === 'PUT') {
          if (!claims?.sub) return send(res, 401, { message: 'invalid JWT' })
          return send(res, 200, await userJson(db, claims.sub))
        }
        if (path === '/logout') return send(res, 204)
        if (path.startsWith('/admin/users')) {
          if (claims?.role !== 'service_role') return send(res, 403, { message: 'service role nodig' })
          const id = path.split('/')[3]
          if (id && req.method === 'GET') { const u = await userJson(db, id); return u ? send(res, 200, u) : send(res, 404, { message: 'User not found' }) }
          if (id && req.method === 'PUT') {
            const body = JSON.parse((await readBody(req)) || '{}')
            if (body.user_metadata) await db.query("update auth.users set raw_user_meta_data = raw_user_meta_data || $2::jsonb where id = $1", [id, JSON.stringify(body.user_metadata)])
            return send(res, 200, await userJson(db, id))
          }
          if (!id && req.method === 'GET') {
            const { rows } = await db.query('select id from auth.users order by created_at')
            const users = await Promise.all(rows.map((r) => userJson(db, r.id)))
            return send(res, 200, { users, aud: 'authenticated', total: users.length, nextPage: null, lastPage: 1 })
          }
          return send(res, 403, { message: 'In de demo-omgeving worden geen accounts aangemaakt of gewist.' })
        }
        return send(res, 404, { message: `Niet nagebootst: ${req.method} ${path}` })
      }
      send(res, 404, { message: 'onbekend' })
    } catch (e) {
      send(res, 500, { message: e.message })
    }
  })
  return new Promise((ok) => server.listen(GATEWAY_PORT, '127.0.0.1', () => ok(server)))
}
