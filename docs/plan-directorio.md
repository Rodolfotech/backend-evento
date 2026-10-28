# Plan: HoySeSale.cl como directorio de negocios con micro-sitios (frontend + backend en un solo proyecto)

## Context

HoySeSale.cl hoy es una cartelera de eventos: backend NestJS (raíz del repo `backend-evento`) y un frontend React + Vite que ya copiamos a `frontend/` (rama `feat/frontend-monorepo`). El producto evoluciona a un **directorio de negocios**: cada local o emprendimiento se registra, tiene un micro-sitio indexable (`hoysesale.cl/<slug>`), publica eventos, sube imágenes y no depende de la API de Instagram (la app de Meta sigue en modo desarrollo y el usuario no es empresa, así que no puede pasar la verificación de negocio).

Decisiones ya tomadas por el usuario:
- Todo el código (backend y frontend) vive en este repo; componentes reutilizables y modulares.
- Estructura: raíz = backend NestJS, `frontend/` = frontend. Sin reestructurar a `apps/`.
- **El frontend migra a Next.js** (SSR) para que las páginas públicas sean indexables (sitemap.xml, robots.txt, metadatos por página).
- Tabla de medios: modelo `EventMedia`, tabla `event_media` (snake_case, como el resto). Almacenamiento de imágenes: Supabase Storage, bucket `SupabaseImage_Storage` (si Supabase rechaza mayúsculas, usar `supabase-image-storage`).
- Registro obligatorio (Paso 1): nombre y apellido del administrador, correo, contraseña, teléfono/WhatsApp `+569`, nombre de la empresa o emprendimiento, comuna (desplegable). El resto del perfil es opcional y se completa en el panel.
- Ingreso con correo y contraseña, con recuperación de clave (ya existe `forgot-password` / `reset-password`).

Hallazgos del código que condicionan el plan:
- No hay `class-validator`, `class-transformer`, `multer` ni cliente de Supabase en el backend. No hay `ValidationPipe` global; los DTO de `src/common/dto.ts` son clases planas y varios endpoints tipan el body inline (`users.controller.ts`). Un `ValidationPipe` global con `whitelist` rompería esos endpoints, así que la validación se aplica **solo a DTOs nuevos**.
- `User` ya tiene `adminFirstName`, `adminLastName`, `adminPhone`, `comuna`, `city`, `companyInstagram`, `companyAddress`, etc. `AuthService.register` solo recibe `{email, password, name}` (`src/auth/auth.service.ts:50`) y el frontend (`Register.tsx`, `AuthContext.register`) solo envía esos tres campos.
- El `.env` local apunta a la **base de producción** de Supabase. Hasta tener una base de desarrollo separada no se ejecuta ninguna migración ni `start:dev` con escrituras.
- `dist/` está versionado en git y ensucia los commits.
- Ya hecho en esta rama: modelo `EventMedia` en `prisma/schema.prisma` y migración `prisma/migrations/20261027120000_add_event_media/migration.sql` (sin aplicar), más las ediciones locales de `app.module.ts` (registra `AppController` para `/health`) y `keep-alive.yml`.

## Principios de modularidad (aplican a todas las fases)

- **Backend:** un módulo Nest por dominio (`src/<dominio>/`), DTOs nuevos al final de `src/common/dto.ts` bajo un bloque de comentario de dominio, errores de Prisma manejados explícitamente (P2002 → 409, P2025 → 404) como indica `CLAUDE.md`.
- **Frontend:** `components/ui/` (primitivas reutilizables: `FormInput`, `PasswordInput`, `GlassCard`, `Modal`, `Toast`, etc., ya existen), `components/shared/` (layout), `features/<dominio>/` (componentes + hooks por feature), `hooks/` (hoy vacío: aquí van los hooks reutilizables), `api/` (capa de servicios; ningún `fetch`/`axios` en componentes), `constants/`. Los componentes nuevos deben ser genéricos y recibir props, no acoplarse a una página.
- Reutilizar lo existente: `COMUNAS` (`frontend/src/constants/comunas.ts`), `FormInput`, `PasswordInput`, `ProfileField`, `LoadingSpinner`, `Toast`, `Modal`, `AuthGuard`/`AdminGuard`, `socialApi`/`eventsApi` en `frontend/src/api/index.ts`.

## Fase 0 — Preparación

1. Copiar este plan a `PLAN.md` en la raíz del repo (primer paso al ejecutar, antes de tocar código), con casillas por tarea para marcar el avance.
2. Crear una **base de desarrollo separada** (proyecto Supabase aparte o Postgres local) y apuntar el `.env` local a ella. Producción solo en Render.
3. Sacar `dist/` de git (`git rm -r --cached dist` + `dist/` en `.gitignore`) y revisar `pnpm-workspace.yaml` (contiene `allowBuilds` sin resolver).
4. Revocar el token de Instagram pegado en el chat, cambiar la contraseña de la base y la clave del admin; quitar el `DATABASE_URL` versionado en el repo `frontend-evento`.

## Fase 1 — Base del backend (registro obligatorio + medios)

**Registro**
- Agregar `class-validator` y `class-transformer`.
- Ampliar `RegisterDto` (`src/common/dto.ts:13`) con: `adminFirstName`, `adminLastName`, `adminPhone` (regex `^\+569\d{8}$`), `name` (nombre comercial), `comuna` (valor dentro de la lista de comunas; copia de la constante en `src/common/constants/comunas.ts`), `email`, `password` (mínimo de largo). Aplicar `ValidationPipe` solo en `POST /auth/register`.
- `AuthService.register` (`src/auth/auth.service.ts:50`) y `UsersService.create` (`src/users/users.service.ts:23`) guardan los nuevos campos. Decisión de rol: el registro crea usuarios con `Role.ORGANIZER` (supuesto: el registro público es de organizadores; los asistentes reservan sin cuenta en la Fase 6). Si no se confirma, mantener `USER`.
- Verificar que `forgot-password` / `reset-password` envían correo real con el SMTP configurado.
- Cookie `access_token` se mantiene igual (regla estricta de `CLAUDE.md`).

**Medios**
- Agregar `@supabase/supabase-js` y `@types/multer`.
- `src/supabase/supabase.service.ts` (cliente con `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`, solo en backend).
- `src/media/` (`media.module.ts`, `media.controller.ts`, `media.service.ts`):
  - `POST /events/:eventId/media/upload` (multipart, `FileInterceptor`): valida tipo (jpeg/png/webp) y tamaño (≤ 5 MB), sube a `SUPABASE_BUCKET` en la ruta `<userId>/<eventId>/<uuid>.<ext>`, crea fila `EventMedia` con `source = UPLOAD`.
  - `POST /events/:eventId/media/link` (`{ permalink, imageUrl?, caption? }`, `source = LINK`).
  - `GET /events/:eventId/media` y `DELETE /media/:id` (borra también el archivo del bucket).
  - Solo el dueño del evento o un ADMIN puede escribir (usar `@CurrentUser('id')` y `AuthGuard('jwt')`).
- `EventsService`: incluir `media` en las consultas de detalle de evento, respetando el filtro de ventana de publicación de `CLAUDE.md`.
- Variables nuevas: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_BUCKET`.
- Aplicar la migración `add_event_media` primero en la base de desarrollo; en producción solo con confirmación explícita (`pnpm prisma migrate deploy`, desde una máquina con acceso).
- Actualizar `CLAUDE.md` (módulo `media`, variables de entorno).

**Seguridad del seed:** el seed deja de sobrescribir la contraseña del admin en cada arranque, la lee de `ADMIN_PASSWORD` y no la imprime en logs; un error del seed no tumba el servidor (`src/seed/seed.service.ts`).

## Fase 2 — Migración del frontend a Next.js (paridad funcional) + UI de registro y subida

1. Crear la app Next.js (App Router, TypeScript, Tailwind v4) en `frontend/`, conservando los componentes de `components/ui`, `components/shared` y `features/*` (marcar `"use client"` solo donde haga falta: estado, efectos, `window`).
2. Portar cada página de `frontend/src/pages/` a rutas del App Router sin perder funcionalidad: Home, Events, EventDetail, CategoryEvents, Comunas, Login, Register, ForgotPassword, ResetPassword, Profile, CreateEvent, Admin (lazy, ruta ofuscada), DataDeletion, PrivacyPolicy, TermsOfService, SocialCallback, GoogleCallback.
3. `AuthContext`, `AuthGuard` y `AdminGuard` se mantienen como componentes cliente; sesión por cookie httpOnly (`withCredentials: true`). Reemplazar el rewrite de `vercel.json` por `rewrites()` en `next.config.js` (`/api/:path*` → backend en Render) y las variables `VITE_*` por `NEXT_PUBLIC_*`.
4. UI del registro (Paso 1) con `FormInput`/`PasswordInput`, selector de comuna con `COMUNAS` y validación de `+569`; actualizar `AuthContext.register` y `authApi.register` para enviar los campos nuevos.
5. UI de subida de imágenes en CreateEvent/perfil como **componente genérico** (`features/media/MediaUploader`, `MediaGallery`) que recibe `eventId`, usa `mediaApi` y no depende de la página. La vinculación de Instagram queda como opción solo para testers.
6. Despliegue: Vercel con Root Directory = `frontend`.

## Fase 3 — Micro-sitio por negocio + SEO

- Migración nueva en `users` (o tabla `business_profiles` si conviene separar): `slug` único (limpio: minúsculas, sin acentos), `category`, `logoUrl`, `coverUrl`, `hours` (JSON), `amenities` (parking, pet-friendly, vegano o celíaco, climatización), `whatsappReservations`, `mapUrl`. Lista de slugs reservados (`eventos`, `comunas`, `login`, `registro`, `perfil`, `admin`, `api`, etc.) validada en backend.
- Backend: `GET /businesses/:slug` público (respeta ventana de publicación al listar eventos vigentes), `PUT /businesses/me` (perfil opcional), subida de logo/portada/galería reutilizando `media`.
- Frontend: ruta `/[slug]` renderizada en servidor con `generateMetadata` (title, description, Open Graph), cabecera de marca, CTA (cómo llegar, contacto), horarios, comodidades, eventos vigentes (mensaje alterno si no hay), galería/carta. Componentes en `features/business/`.
- `app/sitemap.ts` (incluye negocios y eventos activos) y `app/robots.ts`; datos estructurados JSON-LD (`LocalBusiness`, `Event`).

## Fase 4 — Datos clave y filtros

- Insignias en eventos y negocios (estacionamiento, pet-friendly, niños, vegano o celíaco, tipo de entrada: gratuita, con consumo mínimo o cover, techado o al aire libre) como componente reutilizable `features/events/BadgeList`.
- Filtros: gratis, pareja, familia, franja horaria (tarde 16–20, noche 21+), techado; ampliar la consulta de `GET /events` sin omitir la ventana de publicación.

## Fase 5 — Métricas para el organizador

- Registrar vistas, clics en "Cómo llegar" y clics en enlaces externos siguiendo el patrón de `InstagramClick` (tabla `event_interactions` con tipo, evento y fecha).
- Panel del organizador: conteos por evento y por periodo.

## Fase 6 — Reservas y recordatorios por WhatsApp

- Botón "Anotarme / reservar cupo" y tabla de asistentes ligada al evento (reutilizar `attendees`).
- Recordatorio automático 4 h antes con la ubicación: requiere la **API de WhatsApp Business de Meta** (aprobación y costo propios) y un programador de tareas en Render. Decisión pendiente del usuario antes de empezar esta fase.

## Fase 7 — Rutas de fin de semana

- Agrupar eventos en rutas (3–4 paradas) con enlace a Google Maps. Modelo `routes` + `route_stops`.

## Archivos críticos (Fase 0–2)

- `prisma/schema.prisma`, `prisma/migrations/20261027120000_add_event_media/migration.sql`
- `src/common/dto.ts`, `src/auth/auth.service.ts`, `src/auth/auth.controller.ts`, `src/users/users.service.ts`
- `src/media/*` (nuevo), `src/supabase/*` (nuevo), `src/app.module.ts`, `src/seed/seed.service.ts`
- `frontend/src/pages/Register.tsx`, `frontend/src/context/AuthContext.tsx`, `frontend/src/api/index.ts`, `frontend/src/features/*`

## Verificación

- **Backend (cada fase):** `pnpm run build` sin errores; `pnpm run start:dev` contra la **base de desarrollo**; probar con `curl`: registro con campos válidos e inválidos (teléfono sin `+569`, comuna inexistente), login con cookie, `forgot-password`, subida de imagen válida e inválida, borrado, permisos (otro usuario no puede subir al evento).
- **Frontend (Fase 2):** `pnpm run build` y `pnpm run lint`; recorrer manualmente login, registro, perfil, crear evento y subir imagen; confirmar con `curl` o `view-source` que las páginas públicas llegan con HTML renderizado.
- **SEO (Fase 3):** `view-source` de `/<slug>` muestra título, descripción y contenido; `/sitemap.xml` y `/robots.txt` responden; Lighthouse SEO ≥ 90.
- **Producción:** Render con `node dist/main`, Vercel con Root Directory = `frontend`; revisar `/health`, login y subida con una cuenta real tras aplicar las migraciones con confirmación.

## Supuestos a validar al aprobar

- El registro público crea organizadores (`Role.ORGANIZER`).
- Las migraciones se aplican primero en una base de desarrollo; producción solo con confirmación explícita.
- La Fase 6 (WhatsApp) se decide por separado por su dependencia de Meta.
