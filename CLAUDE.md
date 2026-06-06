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
| `lib/auth.ts` | Server-side better-auth instance (GitHub OAuth + Email OTP plugin) |
| `lib/auth-client.ts` | Client-side better-auth instance (`emailOTPClient` plugin) |
| `lib/resend.ts` | Resend client — used by `auth.ts` to send OTP emails |
| `lib/arcjet.ts` | Arcjet singleton (base `shield` rule) for auth-route protection |
| `app/api/auth/[...all]/route.ts` | better-auth handler; POST is wrapped with Arcjet (bot/rate-limit/email rules) |
| `prisma.config.ts` | Prisma config (schema path, migrations path, datasource) |

### Route structure

- `app/` — root layout wraps all routes with `ThemeProvider` and `Toaster`
- `app/(auth)/` — auth route group with its own centered layout; holds the `login` page and the `verify-request` page (OTP entry, receives `?email=` from the login flow)
- `app/api/auth/[...all]/` — better-auth catch-all API route

Co-located components live in `_components/` subdirectories alongside their page (e.g. `app/(auth)/login/_components/LoginForm.tsx`).

### Auth usage patterns

- **Server Components / Route Handlers**: use `auth.api.getSession({ headers: await headers() })` from `@/lib/auth`; redirect unauthenticated users with `redirect()`
- **Client Components**: use `authClient.useSession()` or `authClient.signIn.*` / `authClient.signOut()` from `@/lib/auth-client`
- Two sign-in methods are wired up: **GitHub OAuth** (`authClient.signIn.social`) and **Email OTP** (`authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" })` → redirect to `/verify-request` → verify). There is no email+password (`emailAndPassword`) flow, so no `/api/auth/sign-up/*` endpoints exist; the live POST endpoints are `/api/auth/email-otp/send-verification-otp`, `/api/auth/sign-in/email-otp`, and `/api/auth/sign-in/social`
- OTP emails are sent from `sendVerificationOTP` in `lib/auth.ts` via the Resend client

### Environment variables

Required server-side vars (validated in `lib/env.ts`):

```
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
AUTH_GITHUB_CLIENT_ID
AUTH_GITHUB_SECRET
RESEND_API_KEY
ARCJET_KEY
```

### Prisma notes

- Generator provider is `prisma-client` (Prisma 7), **not** `prisma-client-js`
- Client is imported from `@/lib/generated/prisma/client`, not `@prisma/client`
- Config file is `prisma.config.ts` (TypeScript), not `prisma.config.js`
