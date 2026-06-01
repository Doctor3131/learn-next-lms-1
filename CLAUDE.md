# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

All commands use **bun** as the package manager.

```bash
bun dev          # start dev server
bun build        # production build
bun lint         # run ESLint
```

Prisma commands **must** be run with `bun --bun run prisma`:

```bash
bun --bun run prisma migrate dev    # create and apply a migration
bun --bun run prisma generate       # regenerate the client after schema changes
bun --bun run prisma studio         # open Prisma Studio
```

To add new shadcn components:

```bash
bunx --bun shadcn@latest add <component>
```

## Architecture

### Stack

- **Next.js 16** (App Router) — see `node_modules/next/dist/docs/` for this version's API
- **React 19** with Server Components
- **Prisma 7** — schema at `prisma/schema.prisma`, client output at `lib/generated/prisma`
- **better-auth** for authentication
- **Tailwind CSS v4** + **shadcn/ui** (`radix-nova` style)
- **@t3-oss/env-nextjs** + **Zod v4** for env validation

### Key files

| File | Purpose |
|------|---------|
| `lib/env.ts` | Validated env vars — all env access goes through this |
| `lib/db.ts` | Prisma singleton |
| `lib/auth.ts` | Server-side better-auth instance (GitHub OAuth) |
| `lib/auth-client.ts` | Client-side better-auth instance |
| `app/api/auth/[...all]/route.ts` | better-auth Next.js handler |
| `prisma.config.ts` | Prisma config (schema path, migrations path, datasource) |

### Route structure

- `app/` — root layout wraps all routes with `ThemeProvider` and `Toaster`
- `app/(auth)/` — auth route group (login page); has its own centered layout
- `app/api/auth/[...all]/` — better-auth catch-all API route

Co-located components live in `_components/` subdirectories alongside their page (e.g. `app/(auth)/login/_components/LoginForm.tsx`).

### Auth usage patterns

- **Server Components / Route Handlers**: use `auth.api.getSession({ headers: await headers() })` from `@/lib/auth`; redirect unauthenticated users with `redirect()`
- **Client Components**: use `authClient.useSession()` or `authClient.signIn.*` / `authClient.signOut()` from `@/lib/auth-client`
- Only GitHub OAuth is wired up; the email input in `LoginForm` is a placeholder with no backend handler yet

### Environment variables

Required server-side vars (validated in `lib/env.ts`):

```
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
AUTH_GITHUB_CLIENT_ID
AUTH_GITHUB_SECRET
```

### Prisma notes

- Generator provider is `prisma-client` (Prisma 7), **not** `prisma-client-js`
- Client is imported from `@/lib/generated/prisma/client`, not `@prisma/client`
- Config file is `prisma.config.ts` (TypeScript), not `prisma.config.js`
