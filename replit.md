# Garden City Travel - New Direction

Luxury travel agency web application and API service for curated Egypt travel experiences.

## Run & Operate

- `pnpm --filter @workspace/garden-city-new-direction run dev` — run the web frontend application
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all workspace packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS, Lucide React, Wouter routing
- API Server: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod

## Repository Layout

- `artifacts/garden-city-new-direction/` — Frontend React single-page application
- `artifacts/api-server/` — Express backend API server
- `lib/db/` — Database schema & Drizzle configuration
- `lib/api-spec/` — OpenAPI specification
- `lib/api-zod/` — Zod schemas generated from OpenAPI spec
- `lib/api-client-react/` — React query hooks for backend API


## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
