# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Neon Postgres.

## Setup

```bash
pnpm install
cp .env.example .env.local   # then fill in DATABASE_URL and BETTER_AUTH_SECRET
pnpm db:migrate              # apply migrations in ./drizzle to your Neon database
pnpm db:seed                 # insert the sample categories and products
pnpm dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` / `build` / `start` | Next.js dev server, production build, production server |
| `pnpm lint` / `typecheck` | ESLint, `tsc --noEmit` |
| `pnpm db:generate` | Generate a SQL migration from `src/db/schema` |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:push` | Push the schema directly (no migration file) |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm db:seed` | Insert the sample catalog; rows that already exist are left untouched |
| `pnpm auth:generate` | Regenerate `src/db/schema/auth.ts` from the Better Auth config |

## Layout

```
src/
  app/api/auth/[...all]/route.ts   Better Auth route handler
  db/index.ts                      Drizzle client (Neon HTTP driver)
  db/schema/                       Drizzle schema (auth.ts is generated, catalog.ts is products and categories)
  db/seed.ts                       Sample catalog data
  lib/auth.ts                      Better Auth server config
  lib/products.ts                  Product and category queries (server only)
  lib/auth-client.ts               Better Auth React client
drizzle/                           SQL migrations
drizzle.config.ts                  Drizzle Kit config (reads .env.local)
```
