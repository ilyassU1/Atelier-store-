# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev                 # Next.js dev server
pnpm build                # production build
pnpm start                # production server
pnpm lint                 # ESLint (flat config: eslint-config-next core-web-vitals + typescript)
pnpm typecheck             # tsc --noEmit

pnpm db:generate           # generate a SQL migration from src/db/schema into drizzle/
pnpm db:migrate            # apply pending migrations to DATABASE_URL
pnpm db:push               # push schema directly, no migration file (quick local iteration)
pnpm db:studio             # Drizzle Studio
pnpm db:seed               # insert the sample catalog from src/db/seed.ts (skips rows that already exist)
pnpm auth:generate         # regenerate src/db/schema/auth.ts from src/lib/auth.ts via Better Auth CLI
```

There is no test runner configured in this repo yet.

Setup for a fresh checkout: `cp .env.example .env.local`, fill in `DATABASE_URL` (Neon) and `BETTER_AUTH_SECRET` (`openssl rand -base64 32`), then `pnpm db:migrate` and `pnpm db:seed`. The storefront pages query the database at build and request time, so they fail without a reachable, migrated and seeded database. `drizzle.config.ts` and `src/db/index.ts` both read `DATABASE_URL` from the environment (`.env.local`, loaded via `dotenv` in the Drizzle config).

## Architecture

Next.js App Router + TypeScript + Tailwind v4, with Better Auth for authentication and Drizzle ORM against Neon Postgres (HTTP driver, not a pooled TCP connection).

- `src/app/api/auth/[...all]/route.ts` — catch-all route handing all auth traffic to Better Auth via `toNextJsHandler`. This is the only API route; new auth-related endpoints are added through Better Auth config/plugins, not hand-written routes.
- `src/lib/auth.ts` — Better Auth server instance. Wires the Drizzle adapter (`provider: "pg"`) to the schema in `src/db/schema`. `nextCookies()` must stay the **last** plugin in the `plugins` array so server actions can set auth cookies — a deliberate ordering constraint, not incidental.
- `src/lib/auth-client.ts` — Better Auth React client (`createAuthClient()`), for use in client components.
- `src/db/index.ts` — Drizzle client singleton (`neon-http` driver over `@neondatabase/serverless`), exported as `db`. Throws at import time if `DATABASE_URL` is unset.
- `src/db/schema/auth.ts` — **generated** by `pnpm auth:generate` from the Better Auth config in `src/lib/auth.ts`; don't hand-edit it, change the auth config and regenerate instead. Defines `user`, `session`, `account`, `verification` tables plus their relations.
- `src/db/schema/catalog.ts` — hand-written catalog tables: `category` (one row per listing at `/collections/[slug]`), `product` (price in integer cents, `stock` count, one primary `category_id`) and `product_category` (the extra listings a product is filed under).
- `src/db/seed.ts` — sample catalog data, run with `pnpm db:seed`; products are seeded in display order because the storefront orders them by `id`.
- `src/lib/products.ts` — the only place the storefront queries the catalog. Server-only: client components must not import it.
- `src/db/schema/index.ts` — barrel re-exporting all schema modules; this is what `src/db/index.ts` and `drizzle.config.ts` consume. Add new schema files here when adding tables.
- `drizzle/` — SQL migration output (`db:generate`) and Drizzle's `meta/` snapshot journal. Commit migrations alongside schema changes.

Storefront UI: `src/app/layout.tsx` wraps every page in `SiteHeader`/`SiteFooter` (`src/components/`); `src/app/page.tsx` is the home page, composed from sections in `src/components/home/`. `src/app/products/[slug]/page.tsx` is the product detail page, statically generated for every product in the database via `generateStaticParams` and composed from `src/components/product/` plus the home `ProductRail`/`ServicesStrip`; its Add to bag button only confirms locally because there is no cart yet. `src/app/collections/[slug]/page.tsx` is the listing page, statically generated for each `category` row; a product belongs to a listing when that category is its primary `category_id` or it has a `product_category` row for it (`getCategoryProducts`; `new-in` is an ordinary category with curated rows), so a new collection link needs a `category` row or it 404s. The home, product and collection pages export `revalidate = 60`, so database edits such as stock show up within a minute without a rebuild. `ProductGrid` (`src/components/product-grid.tsx`) is the shared grid with category tabs used by both the home arrivals section and listings, and `Breadcrumb` (`src/components/breadcrumb.tsx`) is shared by listing and detail pages. Products and categories live in the database: look them up with `getProduct`/`getRelatedProducts`/`getCategoryProducts` from `src/lib/products.ts`. `src/lib/catalog.ts` keeps the static editorial content (hero, features, journal stories, services; its `collections` is only the three home-page tiles) plus the `Product` type and helpers shared with client components (`formatPrice` takes cents). Derive availability from a product's `stock` count with `getStockState` rather than comparing the number directly. Catalog photos are Unsplash URLs rendered through `CatalogImage` (`src/components/catalog-image.tsx`), whose loader asks Unsplash's CDN for each srcset width instead of using the Next.js image optimizer. Styling uses only the tokens and component classes in `src/app/globals.css`; `.on-image` flips the color roles for text/buttons over photography.

Path alias: `@/*` → `./src/*` (see `tsconfig.json`).

## Database conventions

- **Naming**: singular snake_case table names (`product`, not `products`), snake_case columns mapped to camelCase fields, indexes named `<table>_<field>_idx` as in `auth.ts`.
- **Keys**: hand-written tables use `integer().primaryKey().generatedAlwaysAsIdentity()`; Better Auth tables keep their text ids. Rows are addressed publicly by a unique `slug`, never by id.
- **Money**: integer cents in a `*_cents` column, never floats or `numeric`. Format with `formatPrice(cents)`.
- **Stock**: a `stock` integer column on `product`, not a separate table. The Neon HTTP driver has no interactive transactions, so change stock in one atomic statement (`SET stock = stock - n WHERE stock >= n`), never read-then-write.
- **Constraints**: enforce invariants in the database (`CHECK`, `UNIQUE`, foreign keys with an explicit `onDelete`), not only in application code.
- **Categories**: a product's primary category is `product.category_id`; extra listings go in `product_category`. Never duplicate the primary category into the join table.
- **Ordering**: products are ordered by `product.id`, categories by `sort_order`. There is no merchandising order column.
- **Schema changes**: edit `src/db/schema`, run `pnpm db:generate --name=<change>`, review the SQL, then `pnpm db:migrate`. Never use `db:push` on a database that has migrations applied, and never hand-edit generated SQL or `drizzle/meta`.
- **Data access**: pages read the catalog only through `src/lib/products.ts`, which returns the storefront `Product` shape. Client components import types and helpers from `src/lib/catalog.ts` and must never import `@/db` or `src/lib/products.ts`.
- **Caching**: pages that read the database stay statically generated with `export const revalidate = 60`; wrap lookups called from both `generateMetadata` and the page in React `cache`.
- **Seed**: `src/db/seed.ts` inserts with `onConflictDoNothing` so it never overwrites edited rows. It runs under `tsx` outside Next, so it uses relative imports and loads the env files before importing `db`.
