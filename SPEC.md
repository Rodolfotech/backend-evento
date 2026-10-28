# Especificación de Flujo de Trabajo

## Regla Fundamental (Inquebrantable)

**Nunca trabajar directamente en `main`.**

Todo cambio, sin excepción, debe seguir este flujo:

## Flujo Obligatorio

```
1. cada vez que se comienza sin ramas se debe crear una rama
2. Crear rama desde main → feature/<nombre-descritivo>
3. Hacer cambios en la rama
4. Commit + Push a GitHub
5. Git checkout main + git merge --no-ff <rama>
6. Git push origin main
```

**Prohibido:** Crear Pull Requests en GitHub. El merge se hace local con `--no-ff`.

## Convención de Nombres de Ramas

- `feature/<nombre>` — Nuevas funcionalidades
- `fix/<nombre>` — Correcciones de bugs
- `chore/<nombre>` — Tareas de mantenimiento

## Commits

Usar prefijos semánticos:

- `feat:` — Nueva funcionalidad
- `fix:` — Corrección
- `chore:` — Mantenimiento
- `docs:` — Documentación
- `refactor:` — Refactorización

## Deploy

Solo se deploya desde `main` después del merge.

---

## Seguridad — Autenticación con Cookie httpOnly

### Migración de localStorage a cookie httpOnly (junio 2026)

Se eliminó el almacenamiento de JWT en `localStorage` del frontend por ser vulnerable a ataques XSS. Ahora el backend setea una cookie `httpOnly` que el browser envía automáticamente.

### Implementación

**Archivos modificados:**
- `src/main.ts` — Middleware `cookie-parser` habilitado
- `src/auth/jwt.strategy.ts` — Extrae JWT de cookie `access_token` con fallback a header Authorization
- `src/auth/auth.controller.ts` — Todos los endpoints de auth setean cookie httpOnly. Nuevos: `GET /auth/me`, `POST /auth/logout`

**Dependencias agregadas:**
- `cookie-parser` (runtime)
- `@types/cookie-parser` (dev)

**Cookie `access_token`:**
- `httpOnly: true` — JavaScript no puede leerla
- `secure: true` en producción — solo se envía por HTTPS
- `sameSite: lax` — protección contra CSRF
- `maxAge: 7 días` — expiración automática
- `path: /` — disponible en todas las rutas

**Backward compatibility:** La `JwtStrategy` acepta JWT desde cookie O header Authorization. Esto permite que clientes legacy sigan funcionando durante la transición.

### Reglas para nuevos endpoints de autenticación

Todo endpoint que genere un JWT debe:
1. Usar `@Res({ passthrough: true })` en el parámetro del método
2. Llamar `res.cookie('access_token', token, COOKIE_OPTIONS)` antes de retornar
3. Retornar `{ access_token, user }` en el body (el access_token en body es legacy)

---

## Plan de directorio de negocios — registro de avance (27 oct 2026)

Plan completo: `docs/plan-directorio.md`. Estado por tarea: `PLAN.md`.

### Decisiones tomadas

- Todo el código (backend y frontend) vive en este repositorio. Backend en la raíz, frontend en `frontend/`.
- El frontend migrará a **Next.js** para que los micro-sitios por negocio sean indexables (SSR, `sitemap.xml`, `robots.txt`).
- El producto es un **directorio de negocios**: cada negocio tiene una página pública en `hoysesale.cl/<slug>`.
- No se depende de la API de Instagram para publicar: la app de Meta sigue en modo desarrollo y el titular no es empresa. Los organizadores pegan el enlace de su publicación o suben la imagen.
- Registro obligatorio de organizador: nombre comercial, nombre y apellido del administrador, teléfono `+569XXXXXXXX`, comuna de La Araucanía, correo y contraseña (mínimo 8). Recuperación de clave por correo.
- Tabla de medios: `event_media` (modelo `EventMedia`, enum `MediaSource`: `UPLOAD`, `INSTAGRAM`, `LINK`). Imágenes en Supabase Storage.
- Migraciones: primero en local; producción solo al final y con confirmación.

### Hecho en código

- **Registro** (`src/common/dto.ts`, `src/auth/`, `src/users/`): `RegisterDto` valida los campos obligatorios; `ValidationPipe` solo en `POST /auth/register`; los usuarios nuevos quedan como `ORGANIZER`.
- **Comunas** (`src/common/constants/comunas.ts`): lista de La Araucanía, igual que `frontend/src/constants/comunas.ts`.
- **Medios** (`src/media/`): subida (jpeg, png, webp, máx. 5 MB), enlace de publicación, listado y borrado. Solo el dueño del evento o un ADMIN escribe. Ruta de archivo: `<userId>/<eventId>/<uuid>.<ext>`.
- **Supabase** (`src/supabase/`): cliente perezoso; el backend arranca aunque falten sus variables.
- **Detalle de evento** (`src/events/events.service.ts`): incluye `media`.
- **Seed** (`src/seed/seed.service.ts`): crea el admin solo si no existe; la clave viene de `ADMIN_PASSWORD`; no imprime credenciales; un error no tumba el servidor.
- **Repositorio:** `dist/` ignorado en `.gitignore` y fuera del índice de git. `CLAUDE.md` actualizado.

### Verificado en local

- Base local `eventos` recreada con todas las migraciones (9 aplicadas, incluida `add_event_media`). Tablas: `users`, `events`, `attendees`, `categories`, `instagram_clicks`, `admin_audit_logs`, `event_media`, `_prisma_migrations`.
- Registro probado con `curl` contra el backend local: teléfono inválido (400), comuna inválida (400), registro válido (201, rol `ORGANIZER`), correo repetido (409).
- Build de NestJS sin errores.

### Pendiente

- **Local:** probar subida de imágenes y enlace de publicación (requiere un bucket de Storage de **desarrollo** y sus variables en `.env`).
- **Local:** Fase 2, frontend en Next.js con el formulario de registro nuevo y el componente de subida.
- **Producción (al final):**
  - La base de producción no tiene tabla `_prisma_migrations`: hay que registrar las migraciones ya aplicadas y luego aplicar solo `add_event_media`.
  - Actualizar variables en Render y Vercel.
  - Actualizar el formulario de registro antes de desplegar el backend nuevo; el formulario actual enviaría datos incompletos y recibiría 400.
  - Rotar la contraseña de la base, la clave del admin y el token de Instagram que se expusieron en conversaciones.
- **Repositorio:** decidir sobre `pnpm-workspace.yaml`, y hacer commit de los cambios en `feat/frontend-monorepo` (sin push hasta confirmar).

### Secretos

Las URLs de producción y sus credenciales están en `~/.config/hoysesale/produccion.env` (fuera del repositorio, permisos `600`). No se guardan en el repositorio ni en este archivo.
