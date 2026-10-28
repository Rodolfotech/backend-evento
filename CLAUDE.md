# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**HoySeSale.cl** — directorio de negocios y cartelera de eventos de La Araucanía. Backend: NestJS 11 · Prisma 7 · PostgreSQL (Supabase) · Passport JWT en cookie httpOnly. Frontend en `frontend/`: Next.js 16 (App Router) · Tailwind v4.

---

## Commands

```bash
# Development
pnpm run start:dev                            # Servidor con watch (puerto 3000)
pnpm run build                                # prisma generate + nest build → dist/
pnpm run start:prod                           # prisma migrate deploy + node dist/main (Render, legacy)

# Database
pnpm dlx prisma migrate dev --name <name>    # Crear + aplicar migración (local)
pnpm dlx prisma migrate deploy               # Aplicar migraciones pendientes (solo con confirmación en producción)
pnpm dlx prisma generate                     # Regenerar cliente Prisma
pnpm run seed                                # Ejecutar prisma/seed.ts

# Quality
pnpm run lint                                # ESLint con auto-fix (¡modifica archivos!)
pnpm run format                              # Prettier

# Tests
pnpm run test                                # Pruebas unitarias (jest, rootDir: src/)
pnpm run test:e2e                            # E2E (test/jest-e2e.json)
```

**Cuidado:** `nest build` borra `dist/` (`deleteOutDir`). Si `start:dev` está corriendo en modo watch, compilar mientras tanto deja el servidor caído. Reinicia `start:dev` después de cada `pnpm run build`.

Frontend (`frontend/`): `pnpm dev` (puerto 5173), `pnpm build`, `pnpm lint`. `pnpm dev:webpack` es la alternativa si Turbopack falla con CSS.

---

## Architecture

### Module layout

Modules sit directly inside `src/` — there is no `src/modules/` subdirectory.

```
src/
├── admin/          # Panel de control ofuscado (solo ADMIN); ruta en admin.constants.ts
├── attendees/      # Registro de asistentes a eventos
├── auth/           # JWT strategy, login local, Google, Instagram (login social), reset de clave
├── businesses/     # Micro-sitios públicos hoysesale.cl/<slug>: página, productos, servicios, destacados, reseñas
├── categories/     # Taxonomías de eventos
├── common/
│   ├── constants/  # comunas.ts (La Araucanía), business.ts (categorías, comodidades)
│   ├── decorators/ # @CurrentUser param decorator
│   ├── guards/     # CronSecretGuard (tareas programadas)
│   ├── utils/      # slug.ts (slugify, RESERVED_SLUGS, slugProblem)
│   └── dto.ts      # Todos los DTO — un solo archivo, agrupados por comentarios de dominio
├── events/         # CRUD de eventos, ventana de publicación, insignias/filtros, métricas
├── generated/
│   └── prisma/     # Cliente Prisma generado (no editar; ignorado en git, lo genera el build)
├── mail/           # Nodemailer (SMTP; Ethereal solo fuera de producción)
├── media/          # Imágenes y enlaces por evento (event_media) + subidas temporales; storage local o Supabase
├── prisma/         # PrismaService (singleton global)
├── seed/           # Crea el admin si no existe (ADMIN_PASSWORD), nunca sobrescribe
├── social/         # Meta Graph API: tokens, sincronización de publicaciones, webhook, refresh-images (cron)
├── supabase/       # Cliente de Supabase Storage (global, solo backend)
├── users/          # Dominio de usuarios; public-user.ts define la vista pública
├── app.setup.ts    # Configuración común: cookies, trust proxy, Swagger, CORS, uploads locales
├── main.ts         # Arranque tradicional (desarrollo y Render)
└── serverless.ts   # Handler para Vercel (reutiliza la app entre invocaciones)
api/index.js        # Entrada de la función de Vercel → dist/serverless
```

### Despliegue

- **Backend en Vercel**: `vercel.json` define `installCommand` (`pnpm install --frozen-lockfile`), `buildCommand` (`pnpm run build`), `maxDuration: 60`, el Swagger incluido en la función, la reescritura de todo a `/api` y el cron diario `/social/refresh-images` (04:00 UTC). Vercel envía `CRON_SECRET` como Bearer.
- **Backend en Render (legacy)**: `start:prod` ejecuta `node dist/main`. `STORAGE_DRIVER` no debe ser `local` en producción.
- **Frontend en Vercel**: Root Directory = `frontend`. `BACKEND_URL` se fija al compilar (los `rewrites` lo leen en build).
- `pnpm-workspace.yaml` declara `allowBuilds` explícito. pnpm 12 falla la instalación congelada si hay scripts sin decidir.
- En serverless: `PrismaService` usa `max: 1` conexión por instancia (`VERCEL` definido). Las subidas están limitadas a 4 MB por el límite de 4,5 MB del cuerpo en Vercel.

### DTOs

All DTOs live in a single file: `src/common/dto.ts`. When adding a new DTO, append it to that file under a domain comment block (e.g. `// --- Events ---`). Do not create separate DTO files per module — it would introduce import fragmentation across the codebase.

### Request auth flow — Cookie httpOnly

El JWT se almacena en una cookie `access_token` con flags de seguridad. La `JwtStrategy` acepta el token desde **cookie O header Authorization** (backward compatible).

**Flujo:**

1. Login/register → `AuthController` setea cookie `access_token` (httpOnly, secure en prod, sameSite: lax, 7 días)
2. `AuthGuard('jwt')` → `JwtStrategy` extrae JWT de `req.cookies.access_token` o `Authorization: Bearer <token>`
3. `JwtStrategy.validate(payload)` → `UsersService.findById(payload.sub)` → populates `req.user`
4. `@CurrentUser('id')` extracts a field from `req.user` (`@CurrentUser()` sin argumento devuelve el usuario completo, con `role`)
5. `AdminGuard` checks `req.user.role === 'ADMIN'` — **always chain after** `AuthGuard('jwt')`, never standalone

**Endpoints de sesión:**

| Endpoint | Método | Descripción |
|---|---|---|
| `/auth/me` | GET | Retorna `{ user }` si hay cookie válida, 401 si no |
| `/auth/logout` | POST | Limpia la cookie `access_token` |

**Cookie configuration** (`auth.controller.ts`):
```ts
const COOKIE_OPTIONS = {
  httpOnly: true,                          // Invisible a JavaScript
  secure: process.env.NODE_ENV === 'production',  // Solo HTTPS en prod
  sameSite: 'lax',                         // Protección CSRF
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,       // 7 días
};
```

**Middleware:** `cookie-parser` habilitado en `app.setup.ts` para parsear `req.cookies`.

**Reglas estrictas:**
- TODOS los endpoints que generan JWT (login, register, google, instagram, reset-password) **DEBEN** setear la cookie con `res.cookie('access_token', token, COOKIE_OPTIONS)`
- Usar `@Res({ passthrough: true })` para acceder al response sin perder el retorno automático de NestJS
- La cookie se limpia con `res.clearCookie('access_token', { path: '/' })`
- `JWT_SECRET` es obligatorio: `jwtSecret()` (`src/auth/jwt-secret.ts`) lanza error si falta. **Nunca** poner un valor por defecto.

`UsersService.findById` uses `omit: { password: true, socialToken: true }`. It runs on every authenticated request via `/auth/me`.

### Privacidad de datos de usuarios

- Nunca devolver a terceros un usuario con `omit: { password: true }` solamente: eso expone correo, `socialToken` de Instagram y datos fiscales.
- Para dueños de eventos, asistentes y cualquier respuesta pública usar `PUBLIC_USER_SELECT` (`src/users/public-user.ts`).
- `GET /users` (lista completa) es solo ADMIN. `GET /users/:id` devuelve la vista completa solo para uno mismo o ADMIN; a los demás, la vista pública.
- Los endpoints de tareas programadas (`/social/refresh-images`) exigen `Authorization: Bearer <CRON_SECRET>` con `CronSecretGuard`. Sin `CRON_SECRET` quedan cerrados.

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

**Autorización:** `update` y `delete` de eventos exigen ser el dueño o ADMIN (`EventsService.assertCanManage`). Un evento ajeno devuelve 403; uno inexistente, 404.

**Paginación:** `findAll` acota `limit` a 50 (`MAX_PAGE_SIZE`) y `page` a un entero ≥ 1.

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

**Insignias y filtros** (`src/events/event-filters.ts`): `entryType` (GRATIS, CONSUMO_MINIMO, COVER), `audience` (PAREJA, FAMILIA, GENERAL), `indoor`, `amenities`. La franja horaria (`matchesTimeSlot`, hora de Chile) se filtra en memoria sobre la página obtenida.

**Métricas** (`event_interactions`): `POST /events/:id/interactions` registra VIEW, DIRECTIONS o EXTERNAL_LINK. `GET /events/my/stats` resume por evento (solo el dueño).

### Businesses — micro-sitios

- Slug único en `User.slug` (minúsculas, sin acentos, `[a-z0-9-]`). Lista de slugs reservados en `src/common/utils/slug.ts`.
- `GET /businesses/:slug` es público: `PUBLIC_BUSINESS_SELECT` oculta campos internos; los eventos aplican la ventana de publicación; devuelve `stats` (valoración, número de reseñas, años).
- Productos, servicios y destacados los administra el dueño (`/businesses/me/...`). Cada escritura verifica que el elemento sea del usuario.
- Reseñas: una por usuario y negocio (`upsert`); no se puede reseñar el propio negocio.
- `GET /businesses` lista slugs para el sitemap (tope 5 000).

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

**Refresh de imágenes** (`GET /social/refresh-images`): tarea programada (Vercel Cron, diaria). Requiere `CRON_SECRET`.

### Mail

`MailService` inicializa al arrancar:
- Si `SMTP_HOST` está definido → usa esas credenciales SMTP.
- Si no, y **no** es producción → crea una cuenta Ethereal y registra en consola el acceso (solo desarrollo).
- Si no, y es producción (`NODE_ENV=production` o `VERCEL`) → no crea cuenta de prueba; registra un error. No se envían correos.

`MAIL_FROM` define el remitente. Con Resend, el remitente debe ser de un dominio verificado; `onboarding@resend.dev` solo entrega al correo del dueño de la cuenta.

`sendPasswordReset` nunca lanza: si el correo no sale, queda en el log y la respuesta de `forgot-password` no cambia (no revela si el correo existe).

### Rate limiting

`ThrottlerGuard` global (`APP_GUARD`): **300 peticiones / 60 s por IP**. `POST /auth/login` tiene `@Throttle` de **5 / 60 s**.

La IP se toma de `X-Forwarded-For` porque el backend está detrás de un proxy (`trust proxy`, configurable con `TRUST_PROXY`, por defecto 1). Sin esto, todos los usuarios compartían un contador. El límite vive en memoria de cada instancia: en serverless no es global.

### Storage de imágenes

`MEDIA_STORAGE` (`src/media/media.module.ts`): `STORAGE_DRIVER=local` usa `uploads/` (servida en `/uploads`, solo desarrollo); cualquier otro valor usa Supabase Storage. En Vercel el sistema de archivos es de solo lectura: no usar `local`.

Límite de imagen: `MAX_IMAGE_BYTES` = 4 MB; tipos jpeg, png, webp.

### Swagger

Available at `http://localhost:3000/api/docs` when the server is running (en Vercel: `/api/docs` del dominio del backend). All endpoints are documented via `@ApiTags`, `@ApiOperation`, and `@ApiBearerAuth` decorators.

---

## Environment variables

```env
# Required
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eventos?schema=public
JWT_SECRET=                           # Obligatorio; sin valor por defecto (el arranque falla si falta)

# CORS / redirect targets
FRONTEND_URL=http://localhost:5173    # prod: https://www.hoysesale.cl
PORT=3000
TRUST_PROXY=1                         # Saltos de proxy confiables para req.ip (Vercel/Render)

# Scheduled tasks
CRON_SECRET=                          # Bearer de /social/refresh-images (genera con: openssl rand -hex 32)

# Storage
STORAGE_DRIVER=local                  # Solo desarrollo; en producción no definir (usa Supabase)

# Meta / Instagram (instagram_business_basic scope)
INSTAGRAM_CLIENT_ID=
INSTAGRAM_CLIENT_SECRET=
INSTAGRAM_REDIRECT_URI=http://localhost:5173/social/callback
INSTAGRAM_WEBHOOK_TOKEN=

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=                  # Local: http://localhost:5173/auth/google/callback (debe estar en Google Cloud Console)

# SMTP (obligatorio en producción para recuperar contraseña)
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=
SMTP_USER=
SMTP_PASS=
MAIL_FROM=                            # Remitente de un dominio verificado, p. ej. "HoySeSale" <no-reply@hoysesale.cl>

# Supabase Storage (imágenes de eventos — solo backend, nunca al frontend)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_BUCKET=SupabaseImage_Storage   # fallback del código si no se define

# Admin inicial (seed): solo se usa si la cuenta aún no existe
ADMIN_EMAIL=admin@eventos.cl
ADMIN_PASSWORD=
```

Frontend (`frontend/`): `BACKEND_URL` (URL pública del backend; obligatoria en Vercel, se fija al compilar), `NEXT_PUBLIC_SITE_URL` (por defecto `https://www.hoysesale.cl`).
