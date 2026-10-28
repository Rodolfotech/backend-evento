# Frontend HoySeSale.cl

Next.js 16 (App Router) con Tailwind v4. Consume la API NestJS del repositorio raíz a través de `/api/*`.

## Desarrollo

```bash
pnpm install
BACKEND_URL=http://localhost:3000 pnpm dev   # http://localhost:5173
```

`BACKEND_URL` por defecto es `http://localhost:3000`. Las peticiones a `/api/*` se reenvían al backend (`next.config.ts`), así que la cookie de sesión queda en el mismo dominio del frontend.

## Variables de entorno

| Variable | Obligatoria | Uso |
|---|---|---|
| `BACKEND_URL` | Sí en producción | URL pública del backend (Render). Se lee en build y en SSR. |
| `NEXT_PUBLIC_SITE_URL` | No | URL pública del sitio. Por defecto `https://www.hoysesale.cl`. |

**Importante:** los `rewrites` de `next.config.ts` se fijan al compilar. Si cambias `BACKEND_URL` en Vercel, hay que volver a desplegar.

## Despliegue en Vercel

1. Importar el repositorio en Vercel.
2. **Root Directory:** `frontend`. Framework: Next.js (detectado).
3. En *Environment Variables* agregar `BACKEND_URL` (URL del backend en Render) y, si aplica, `NEXT_PUBLIC_SITE_URL`.
4. Desplegar. El build usa `pnpm-lock.yaml` (`pnpm@12.10.1`, definido en `packageManager`).

El backend en Render debe tener `FRONTEND_URL` y las URL de redirección de Google e Instagram apuntando al dominio del frontend.

## Scripts

- `pnpm dev`: servidor de desarrollo (Turbopack).
- `pnpm dev:webpack`: alternativa con webpack si Turbopack muestra errores de CSS.
- `pnpm build` / `pnpm start`: build y servidor de producción.
- `pnpm lint`: ESLint.
