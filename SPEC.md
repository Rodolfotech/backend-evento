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
- `src/app.setup.ts` — Middleware `cookie-parser` habilitado (antes en `src/main.ts`)
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

## Plan de directorio de negocios — registro de avance (actualizado 28 oct 2026)

Plan completo: `docs/plan-directorio.md`. Estado por tarea: `PLAN.md`. Reglas de código y arquitectura: `CLAUDE.md`.

### Decisiones tomadas

- Todo el código (backend y frontend) vive en este repositorio. Backend en la raíz, frontend en `frontend/` (Next.js 16, App Router).
- El producto es un **directorio de negocios**: cada negocio tiene una página pública en `hoysesale.cl/<slug>`, indexable (SSR, `sitemap.xml`, `robots.txt`).
- No se depende de la API de Instagram para publicar: la app de Meta sigue en modo desarrollo y el titular no es empresa. Los organizadores pegan el enlace de su publicación o suben la imagen.
- Registro obligatorio de organizador: nombre comercial, nombre y apellido del administrador, teléfono `+569XXXXXXXX`, comuna de La Araucanía, correo y contraseña (mínimo 8). Recuperación de clave por correo.
- Tabla de medios: `event_media` (modelo `EventMedia`, enum `MediaSource`: `UPLOAD`, `INSTAGRAM`, `LINK`). Imágenes en Supabase Storage (local con `STORAGE_DRIVER=local` solo en desarrollo).
- **Despliegue:** backend y frontend en **Vercel** (backend como función serverless con `api/index.js`; frontend con Root Directory `frontend`). Render queda como legacy (`node dist/main`).
- Migraciones: primero en local; producción solo al final y con confirmación.

### Hecho en código

**Micro-sitio** (`frontend/src/views/BusinessPage.tsx`, `frontend/src/features/business/`):
- Cabecera a sangre con portada, logo, nombre, descripción y estadísticas (valoración, reseñas, años). No hay seguidores porque no existe fuente de datos.
- Destacados, pestañas fijas con resaltado al hacer scroll, productos con filtros y "+ Agregar" (pedido por WhatsApp), servicios, eventos con cuenta regresiva y "Reservar cupo", "Nosotros" con horarios y contacto, reseñas con formulario, barra inferior "Cómo llegar" / "Contactar".
- El dueño edita la página, gestiona contenido y ve "Ver publicación" y "Compartir". Editar incluye los campos de la barra: WhatsApp del botón Contactar y enlace de Cómo llegar (si está vacío, se usa la dirección).
- Si el backend no responde, la página muestra un error con "Intentar de nuevo" (`error.tsx`) en vez de mostrar una categoría por error.

**Componentes reutilizables** (`frontend/src/components/ui/`): `Button` (variantes y enlaces), `Chip`/`ChipGroup`, `Card`, `Badge`, `Stat`, `EmptyState`, `SectionTabs`, `CountdownBoxes` (con `hooks/useCountdown`), `Pagination` (usado también en la lista de eventos). El resto de la app todavía usa estilos en línea en varias vistas.

**Backend:**
- **Registro** (`src/common/dto.ts`, `src/auth/`, `src/users/`): `RegisterDto` valida los campos obligatorios; `ValidationPipe` solo en `POST /auth/register`; los usuarios nuevos quedan como `ORGANIZER`.
- **Medios** (`src/media/`): subida (jpeg, png, webp, máx. **4 MB**, por el límite de Vercel), enlace de publicación, listado y borrado. Solo el dueño del evento o un ADMIN escribe.
- **Micro-sitios** (`src/businesses/`): página pública, productos, servicios, destacados, reseñas y estadísticas.
- **Insignias, filtros y métricas** (`src/events/`): `entryType`, `audience`, `indoor`, franja horaria, `event_interactions`, `GET /events/my/stats`.
- **Arranque en Vercel:** `src/app.setup.ts` (configuración compartida), `src/serverless.ts` (handler con app reutilizada entre invocaciones), `api/index.js`, `vercel.json` (instalación congelada, build, `maxDuration: 60`, Swagger incluido, cron diario de `refresh-images`).
- **Correo:** en producción no se crea cuenta Ethereal; sin SMTP no se envía nada y queda un error en el log. `MAIL_FROM` define el remitente. Un fallo de envío no produce 500 en `forgot-password`.
- **Límite de peticiones:** `trust proxy` activo (`TRUST_PROXY`, por defecto 1). Antes, todos los usuarios detrás del proxy compartían un contador.
- **Dependencias y build:** `multer` declarado explícitamente (antes era transitiva y fallaba en serverless); `pnpm-workspace.yaml` con `allowBuilds` explícito (pnpm 12 falla la instalación congelada si hay scripts sin decidir).
- **Repositorio:** `dist/` y `src/generated/` ignorados. Se eliminó `keep-alive.yml` (solo servía para Render).

### Revisión de seguridad (28 oct 2026)

Hallazgos corregidos:
- **Edición y borrado de eventos ajenos** → ahora solo dueño o ADMIN (`EventsService.assertCanManage`).
- **`POST /auth/reset-password-direct`** cambiaba la clave de cualquier correo sin token → eliminado.
- **Datos privados de terceros** (correo, `socialToken` de Instagram, datos fiscales) en listados de eventos, asistentes y `GET /users/:id` → vista pública `PUBLIC_USER_SELECT`.
- **`GET /users`** (todos los usuarios) → solo ADMIN.
- **`JWT_SECRET`** tenía el valor por defecto `'secretKey'` → ahora es obligatorio.
- **`GET /social/refresh-images`** no tenía protección → exige `CRON_SECRET`.
- **Reset de contraseña** aceptaba claves de cualquier largo → mínimo 8.
- **Paginación de eventos** sin tope → máximo 50 por página.
- **Listado público de negocios** sin tope → máximo 5 000 (sitemap).

Verificado con el handler local: edición y borrado ajenos (403), sin sesión (401), reset directo (404), reset corto (400), `limit=100000` (acotado a 50), `GET /users/:id` ajeno sin correo, asistentes sin datos privados, dueño puede editar y borrar su evento, cron sin secreto (401) y con secreto (200).

### Verificado en local

- Build de NestJS y del frontend sin errores; `tsc` del frontend sin errores.
- Prueba unitaria existente pasa (una sola prueba: hay poca cobertura, ver pendientes).
- Copia limpia del backend: `pnpm install --frozen-lockfile`, build y handler OK. Copia limpia del frontend: build OK; con backend caído, la página de error se muestra.
- Login por correo a través del proxy del frontend responde 201. Google: la URL de autorización sale con `redirect_uri=http://localhost:5173/auth/google/callback`; el flujo completo requiere iniciar sesión real en Google.
- Causa del fallo de login local del 28 oct: el backend del puerto 3000 se había caído (compilar con `nest build` mientras `start:dev` estaba activo borra `dist/`).

### Pendiente

**Decisiones del usuario:**
- Botones de WhatsApp (Contactar, + Agregar, Reservar cupo): cambiar a llamada (`tel:`), mantener `wa.me` o usar un formulario en HoySeSale. Un enlace `wa.me` no cobra por mensaje; el costo aparece solo con la API de WhatsApp Business (recordatorios de la Fase 6).
- Swagger (`/api/docs`) público también en producción: ¿desactivarlo fuera de desarrollo?

**Antes de desplegar en Vercel:**
- Verificar en Vercel con una **prueba real**: que la reescritura `/(.*)` → `/api` conserve la ruta original, que el `includeFiles` de Swagger funcione y el tiempo de arranque en frío.
- Migraciones de producción: la base no tiene `_prisma_migrations`. Registrar las migraciones ya aplicadas y luego aplicar las nuevas (`event_media`, perfil de negocio, insignias, contenido del negocio). Solo con confirmación explícita.
- Variables en Vercel (backend): `DATABASE_URL` (pooler Supabase, puerto 6543), `JWT_SECRET`, `FRONTEND_URL`, `CRON_SECRET`, `MAIL_FROM`, `SMTP_*`, `SUPABASE_*`, `ADMIN_*`, `INSTAGRAM_*`, `GOOGLE_*`. **No** definir `STORAGE_DRIVER=local`.
- Variables en Vercel (frontend): `BACKEND_URL` (URL del backend en Vercel), `NEXT_PUBLIC_SITE_URL` si aplica.
- Correo: verificar el dominio `hoysesale.cl` en Resend y definir `MAIL_FROM`. Con `onboarding@resend.dev` solo llega el correo al dueño de la cuenta.
- Confirmar que `JWT_SECRET` existe en Render y Vercel. Si producción nunca lo tuvo, los tokens firmados con `'secretKey'` eran falsificables; cambiar el secreto cierra todas las sesiones.
- Google: en Google Cloud Console registrar `https://<dominio>/auth/google/callback` (producción) y `http://localhost:5173/auth/google/callback` (local). Verificar `GOOGLE_REDIRECT_URI` local (no debe apuntar a producción).
- Rotar la contraseña de la base, la clave del admin y el token de Instagram que se expusieron en conversaciones.
- Eliminar las contraseñas de prueba de `README.md` antes de cualquier commit (la sección lleva aviso NO COMMITEAR).

**Calidad:**
- Frontend: lint con 33 archivos con problemas (12 de `react-hooks/set-state-in-effect`, 10 de `any`, 2 de texto sin escapar, 1 `alt`). El build no ejecuta lint.
- Backend: `pnpm run lint` reporta ~576 avisos; la mayoría son formato de Prettier y unos 180 son de tipado (`any`). No son errores de ejecución.
- Pruebas: falta cobertura automática de autorización (ownership), privacidad de datos y reset de contraseña.
- Revisar el panel de administración (`src/admin/`) y los endpoints de social en profundidad, que no se revisaron a fondo.
- Eliminar `frontend-vite-old/` cuando se confirme que la app Next funciona.

**Producto:**
- Fase 4 frontend (insignias, filtros de eventos, creación con nuevos campos) y Fase 5 frontend (panel de métricas).
- Fase 3: galería y carta (sin empezar; falta decidir almacenamiento).
- Fase 6: recordatorios por WhatsApp (depende de la API de WhatsApp Business de Meta).
- Fase 7: rutas de fin de semana (sin empezar).

**Repositorio:**
- Commit y push de los cambios. Antes de hacerlo, reconciliar el nombre de la rama: el historial reciente está en `feature/frontend` (commit `996603d` "feat: integración frontend y backend en next.js"), mientras este documento menciona `feat/frontend-monorepo`. La regla de ramas se aplica a la rama que se use.
- Confirmar antes de cualquier push.

### Secretos

Las URLs de producción y sus credenciales están en `~/.config/hoysesale/produccion.env` (fuera del repositorio, permisos `600`). No se guardan en el repositorio ni en este archivo.
