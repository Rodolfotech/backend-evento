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
