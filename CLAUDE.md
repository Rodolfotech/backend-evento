# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**HoySeSale.cl** — event marketplace REST API. NestJS 11 · Prisma 7 · PostgreSQL · Passport JWT · Meta Graph API.

---

## Commands

```bash
# Development
pnpm run start:dev                            # Hot-reload dev server
pnpm run build                                # prisma generate + nest build → dist/
pnpm run start:prod                           # prisma migrate deploy + node dist/main

# Database
pnpm dlx prisma migrate dev --name <name>    # Create + apply migration
pnpm dlx prisma migrate deploy               # Apply pending migrations (CI/prod)
pnpm dlx prisma generate                     # Regenerate Prisma client
pnpm run seed                                # Run prisma/seed.ts

# Quality
pnpm run lint                                # ESLint with auto-fix
pnpm run format                              # Prettier

# Tests
pnpm run test                                # Unit tests (jest, rootDir: src/)
pnpm run test:watch                          # Interactive watch mode
pnpm run test:cov                            # Coverage report
pnpm run test:e2e                            # E2E suite (test/jest-e2e.json)
```

---

## Architecture

### Module layout

Modules sit directly inside `src/` — there is no `src/modules/` subdirectory.

```
src/
├── admin/          # Obfuscated control panel (ADMIN role only)
├── attendees/      # Event registration
├── auth/           # JWT strategy, local + social login
├── categories/     # Event taxonomies
├── common/
│   ├── decorators/ # @CurrentUser param decorator
│   └── dto.ts      # All request/response DTOs — single file, domain-grouped by comments
├── events/         # Event CRUD + slug + publication window
├── generated/
│   └── prisma/     # Prisma Client output (do not edit manually)
├── mail/           # Nodemailer transporter (SMTP / Ethereal fallback)
├── prisma/         # PrismaService (global singleton)
├── seed/           # SeedModule/SeedService
├── social/         # Meta Graph API: token lifecycle, feed sync, webhook
└── users/          # User domain
```

### DTOs

All DTOs live in a single file: `src/common/dto.ts`. When adding a new DTO, append it to that file under a domain comment block (e.g. `// --- Events ---`). Do not create separate DTO files per module — it would introduce import fragmentation across the codebase.

### Request auth flow

1. `AuthGuard('jwt')` → `JwtStrategy.validate(payload)` → calls `UsersService.findById(payload.sub)` → populates `req.user`
2. `@CurrentUser('id')` extracts a field from `req.user`
3. `AdminGuard` checks `req.user.role === 'ADMIN'` — **always chain after** `AuthGuard('jwt')`, never standalone

`UsersService.findById` uses an explicit `select` (id, email, name, avatar, role, instagram fields, timestamps). Do not change this to `include` with relations — it runs on every authenticated request.

### PrismaService

Defined in `src/prisma/prisma.service.ts`. Uses `@prisma/adapter-pg` with a `pg.Pool` connection pool. SSL is enabled automatically when `NODE_ENV=production`. The module is registered as **global** in `PrismaModule`, so it can be injected in any service without re-importing the module.

Prisma client import path (relative, no tsconfig alias):
```ts
import { PrismaClient } from '../generated/prisma/client';
```
Do not import from `@prisma/client` — that package is only a runtime dependency for the adapter.

### Prisma error handling

There is no global exception filter. Every service method that writes to the database must handle Prisma errors explicitly:

```ts
import { Prisma } from '../generated/prisma/client';

try {
  await this.prisma.someModel.create({ data });
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') throw new ConflictException('Ya existe un registro con ese valor único');
    if (e.code === 'P2025') throw new NotFoundException('Registro no encontrado');
  }
  throw e;
}
```

Common codes: `P2002` unique constraint → `409`, `P2025` record not found → `404`. Re-throw anything else.

When the conflict is predictable (a known unique index that will be violated), prefer the pre-emptive approach already used in `SocialService.instagramCallback`: call `updateMany` to clear the conflicting row before inserting, eliminating the need for a try/catch entirely.

### Admin module

The route prefix is an obfuscated string stored in `src/admin/admin.constants.ts`:
```ts
export const ADMIN_API_PREFIX = 'control-panel-7f3a';
```
It is registered via `RouterModule.register()` in `AppModule`. Never hardcode this string anywhere else.

All admin endpoints log an audit record (`AdminAuditLog`) with the admin's ID, action, and client IP. `AdminService` is responsible for creating these records before returning results.

### Events — key business logic

**Slug generation** (`EventsService.generateSlug`): lowercased title, non-alphanumeric chars replaced with `-`, truncated to 80 chars, then a `Date.now().toString(36)` suffix appended. The suffix prevents collisions — do not remove it.

**Category resolution** (`EventsService.resolveCategory`): accepts either `categoryId` (UUID) or `categoryName` (string). If a name is provided and no matching category exists, one is created automatically. This is intentional.

**Publication window**: any query that lists events for public consumption must apply this filter:
```ts
const now = new Date();
where = {
  OR: [{ publicationEndDate: null }, { publicationEndDate: { gte: now } }],
  AND: [{ OR: [{ publicationStartDate: null }, { publicationStartDate: { lte: now } }] }],
};
```
Both fields are nullable — `null` means no restriction on that side. This is a business invariant: do not omit it when adding new event-listing endpoints. Admin queries that need to see all events regardless of publication status must bypass this explicitly and be documented as such.

### Instagram — two distinct workflows

**Workflow A — Social Login** (`AuthModule`, `POST /auth/instagram`):  
Authenticates a user whose primary identity is Instagram. Creates a user record with a placeholder email (`ig-{id}@instagram.auth`) if none exists. Issues an app JWT.

**Workflow B — Account Linking + Feed Sync** (`SocialModule`, `GET /social/instagram/callback`):  
Links an *already authenticated* user to their Instagram account to enable feed synchronization.

Token lifecycle in Workflow B:
1. Exchange short-lived code (1h) → long-lived token (~60 days) via `graph.instagram.com/access_token`
2. Store `socialToken` + `tokenExpiresAt` on `User`
3. Auto-refresh in `getUserMedia`: if expiry is < 1 hour away, call `refreshToken` before fetching
4. On linking: `updateMany` revokes any other user's existing connection to the same `instagramId` before saving — prevents `P2002` on the unique index

After successful linking, `syncAllUserEvents` fires synchronously and writes the user's last 25 posts as a JSONB array to `Event.socialFeed` + `Event.lastSync`.

**Instagram account requirement**: the connected account must be Business or Creator. Personal accounts will fail at the Graph API level. The app must be in Live mode (or the connecting user added as a Tester) in Meta Developers.

**Webhook** (`POST /social/instagram/webhook`): verified by `INSTAGRAM_WEBHOOK_TOKEN`. On `media` change events, triggers `syncAllUserEvents` for the matched user.

### Mail

`MailService` initializes on module start:
- If `SMTP_HOST` is set → uses configured SMTP credentials
- Otherwise → creates an Ethereal test account and logs login URL + credentials to stdout

In development without SMTP vars, check the server console for Ethereal credentials after startup.

### Rate limiting

`ThrottlerGuard` is applied globally via `APP_GUARD`: **20 requests / 60 seconds per IP**. Swagger and webhook endpoints are subject to this limit.

### Swagger

Available at `http://localhost:3000/api/docs` when the server is running. All endpoints are documented via `@ApiTags`, `@ApiOperation`, and `@ApiBearerAuth` decorators.

---

## Environment variables

```env
# Required
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eventos?schema=public
JWT_SECRET=

# CORS / redirect targets
FRONTEND_URL=http://localhost:5173    # prod: https://www.hoysesale.cl
PORT=3000

# Meta / Instagram (instagram_business_basic scope)
INSTAGRAM_CLIENT_ID=
INSTAGRAM_CLIENT_SECRET=
INSTAGRAM_REDIRECT_URI=http://localhost:5173/social/callback
INSTAGRAM_WEBHOOK_TOKEN=

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

# SMTP (optional — Ethereal is used if absent)
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
```
