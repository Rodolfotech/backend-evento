# PLAN.md — HoySeSale.cl (directorio de negocios + micro-sitios)

Plan completo y decisiones: ver `docs/plan-directorio.md`.

Leyenda: `[x]` hecho en código · `[ ]` pendiente · `[~]` requiere acción del usuario · `[!]` probado solo en build

## Fase 0 — Preparación

- [x] Plan aprobado (`docs/plan-directorio.md`)
- [x] `dist/` ignorado en `.gitignore` y quitado del índice de git (archivos en disco)
- [ ] `pnpm-workspace.yaml`: decidir si se mantiene (solo contiene `allowBuilds` sin resolver)
- [~] Base de datos de desarrollo separada y `.env` local apuntando a ella (hoy apunta a producción)
- [~] Revocar el token de Instagram expuesto en el chat
- [~] Cambiar la contraseña de la base y la clave del admin; quitar el `DATABASE_URL` versionado en `frontend-evento`

## Fase 1 — Base del backend

### Registro obligatorio
- [x] `class-validator` y `class-transformer` instalados
- [x] `RegisterDto` con campos obligatorios: nombre comercial, nombre y apellido del admin, teléfono `+569XXXXXXXX`, comuna (lista de La Araucanía), correo y contraseña (mínimo 8)
- [x] Constante de comunas en backend (`src/common/constants/comunas.ts`)
- [x] `ValidationPipe` solo en `POST /auth/register`
- [x] `AuthService.register` y `UsersService.create` guardan los campos; rol `ORGANIZER` (supuesto a confirmar)
- [!] Build OK; validación no probada contra HTTP (falta base de desarrollo)
- [x] Recuperación de contraseña probada en local: el correo llega (desde `onboarding@resend.dev`) y el cambio de clave funciona. Tras cambiar la clave, redirige a `/profile` con sesión (pendiente de confirmar)
- [~] **Antes de desplegar:** el frontend deployado envía solo `name/email/password` y recibirá 400 hasta actualizar el formulario (Fase 2)

### Medios
- [x] Modelo `EventMedia` (`prisma/schema.prisma`, tabla `event_media`)
- [x] Migración `prisma/migrations/20261027120000_add_event_media/` escrita (sin aplicar)
- [x] `src/supabase/` (cliente perezoso + módulo global)
- [x] `src/media/`: subida (`POST /events/:eventId/media/upload`), enlace (`POST /events/:eventId/media/link`), listado (`GET /events/:eventId/media`), borrado (`DELETE /media/:id`)
- [x] Permisos: solo dueño del evento o ADMIN escribe
- [x] Detalle de evento incluye `media` (`EventsService.findBySlug`)
- [x] `CLAUDE.md` actualizado (módulos, variables)
- [x] Enlace, listado, subida y borrado probados en local (almacenamiento local: STORAGE_DRIVER=local)
- [x] Migraciones aplicadas en la base local `eventos`
- [~] Aplicar la migración en producción (solo con confirmación explícita)
- [~] Variables en `.env` y Render: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET`, `ADMIN_PASSWORD`
- [~] Crear el bucket en Supabase Storage (`SupabaseImage_Storage`, o `supabase-image-storage` si rechaza mayúsculas)

### Seed
- [x] Crea el admin solo si no existe; ya no sobrescribe la clave en cada arranque
- [x] Clave desde `ADMIN_PASSWORD`; no se imprime en logs
- [x] Un error del seed no tumba el servidor
- [~] Rotar la clave del admin actual (la vieja quedó en el código y en el historial de git)

## Fase 2 — Frontend en Next.js + registro y subida
- [x] App Next.js (App Router, TypeScript, Tailwind v4) en `frontend/` (Vite anterior en `frontend-vite-old/`)
- [x] Componentes `components/ui`, `components/shared` y `features/*` portados (marcados como cliente)
- [x] Páginas portadas a rutas del App Router (`src/app`, vistas en `src/views`)
- [x] `AuthContext`, `AuthGuard`, `AdminGuard` como componentes cliente
- [x] `vercel.json` reemplazado por `rewrites()` en `next.config.ts` (variable `BACKEND_URL`)
- [x] UI de registro con campos obligatorios y selector de comuna
- [x] `MediaUploader` genérico (`features/media/`); pestaña "Subir imagen" en crear evento
- [ ] Vercel con Root Directory = `frontend`

## Fase 3 — Micro-sitio por negocio + SEO
- [x] Campos de negocio (migración `add_business_profile`, aplicada en local): slug, categoría, logo, portada, horarios, comodidades, WhatsApp, mapa
- [x] Slug único desde el nombre comercial (sin acentos, reservados y categorías excluidos)
- [x] `GET /businesses/:slug`, `GET /businesses` y `PUT /businesses/me`
- [ ] Ruta `/[slug]` con `generateMetadata` y JSON-LD
- [x] `app/sitemap.ts` y `app/robots.ts`

## Fase 4 — Datos clave y filtros
- [ ] `features/events/BadgeList` (insignias reutilizables)
- [ ] Filtros: gratis, pareja, familia, franja horaria, techado

## Fase 5 — Métricas
- [ ] Tabla `event_interactions` (vistas, cómo llegar, clics externos)
- [ ] Panel del organizador con conteos

## Fase 6 — Reservas y WhatsApp
- [ ] Botón "Anotarme" y asistentes ligados a `attendees`
- [~] Decisión: API de WhatsApp Business de Meta (aprobación y costo propios)

## Fase 7 — Rutas de fin de semana
- [ ] Modelos `routes` y `route_stops`

## Pendientes transversales
- [ ] Base de desarrollo: aplicar migraciones y probar todos los endpoints con `curl`
- [ ] Commit de los cambios de la Fase 0 y 1 en `feat/frontend-monorepo` (pendiente de tu confirmación)
