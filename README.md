# Backend Eventos — NestJS + Prisma + PostgreSQL

API REST para la plataforma de gestión de eventos con integración a redes sociales (Facebook/Instagram).

## Stack

- **Framework**: NestJS 11
- **ORM**: Prisma 7 + PostgreSQL
- **Auth**: Passport.js + JWT + bcryptjs
- **Integración Meta**: Graph API (FB/IG) lista para conectar

## Estructura

```
src/
├── prisma/          # PrismaModule global + PrismaService
├── auth/            # AuthModule (login, register, JWT strategy)
├── users/           # CRUD usuarios
├── events/          # CRUD eventos
├── categories/      # CRUD categorías
├── attendees/       # Registro de asistentes a eventos
└── generated/       # Prisma Client (autogenerado, ignorado por git)
```

## Modelos (PostgreSQL)

| Modelo    | Descripción                                  |
|-----------|----------------------------------------------|
| User      | Usuarios con roles (USER, ADMIN, ORGANIZER)  |
| Event     | Eventos con slug, fecha, ubicación, socialFeed|
| Category  | Categorías para clasificar eventos           |
| Attendee  | Relación usuario-evento (registro)           |

El campo `socialFeed` (JSONB) en `Event` almacena el feed crudo de Facebook/Instagram.

## Requisitos

- Node.js 20+
- pnpm
- PostgreSQL 14+

## Configuración

1. Clonar el repositorio

2. Instalar dependencias:

```bash
pnpm install
```

3. Configurar variables de entorno en `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eventos?schema=public"
JWT_SECRET="tu-secreto-jwt"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

4. Ejecutar migración de base de datos:

```bash
pnpm dlx prisma migrate dev --name init
```

5. Iniciar servidor:

```bash
# desarrollo con hot-reload
pnpm run start:dev

# producción
pnpm run build && pnpm run start:prod
```

## Documentación Swagger

Una vez el servidor esté corriendo, la documentación interactiva de la API está disponible en:

```
http://localhost:3000/api/docs
```

Incluye autenticación Bearer JWT, ejemplos de requests y respuestas para todos los endpoints.

## API Endpoints

### Auth
| Método | Ruta             | Descripción            |
|--------|------------------|------------------------|
| POST   | `/auth/register` | Registrar nuevo usuario|
| POST   | `/auth/login`    | Iniciar sesión (JWT)   |

### Users (requiere JWT)
| Método | Ruta       | Descripción            |
|--------|------------|------------------------|
| GET    | `/users`   | Listar usuarios        |
| GET    | `/users/:id`| Obtener usuario       |

### Events
| Método | Ruta             | Descripción                     |
|--------|------------------|---------------------------------|
| GET    | `/events`        | Listar todos los eventos        |
| GET    | `/events/:slug`  | Obtener evento por slug         |
| POST   | `/events`        | Crear evento (requiere JWT)     |
| PUT    | `/events/:id`    | Actualizar evento (requiere JWT)|
| DELETE | `/events/:id`    | Eliminar evento (requiere JWT)  |

### Categories
| Método | Ruta             | Descripción                     |
|--------|------------------|---------------------------------|
| GET    | `/categories`    | Listar categorías               |
| POST   | `/categories`    | Crear categoría (requiere JWT)  |

### Attendees
| Método | Ruta                   | Descripción                          |
|--------|------------------------|--------------------------------------|
| POST   | `/attendees`           | Registrarse a un evento (requiere JWT)|
| GET    | `/attendees/event/:id`| Asistentes de un evento              |
| GET    | `/attendees/user/:id` | Eventos de un usuario (requiere JWT) |

## Integración Instagram API

La plataforma usa **Instagram API con Instagram Login** (NO la Basic Display API, descontinuada en Dic 2024).

### Requisitos

1. **Cuenta Business o Creator** — la cuenta de Instagram que se conecta debe ser Profesional (Business o Creator), no personal
2. **App en Meta Developers** — crear app con producto Instagram Login
3. **Redirect URI** — debe coincidir exactamente con la configurada en Meta Developers:
   - Desarrollo: `http://localhost:5173/social/callback`
   - Producción: `https://www.hoysesale.cl/social/callback`
4. **Modo Development** — mientras la app no tenga App Review, solo funciona con usuarios agregados como **tester** en Meta Developers → Roles → Tester
5. **App Review (Live)** — para que cualquier usuario pueda conectar su Instagram, la app debe pasar la revisión y obtener **Advanced Access** para `instagram_business_basic`

### Configuración en Meta Developers

1. Ir a [Meta for Developers](https://developers.facebook.com/)
2. Seleccionar la app → Productos → Instagram Login → Configurar
3. Agregar Redirect URI: `https://www.hoysesale.cl/social/callback`
4. Agregar tester en Roles → Tester
5. En Configuración → Básico, registrar el dominio `www.hoysesale.cl`

### Variables de entorno

| Variable | Desarrollo | Producción |
|---|---|---|
| `INSTAGRAM_CLIENT_ID` | App ID de Meta | mismo |
| `INSTAGRAM_CLIENT_SECRET` | App Secret de Meta | mismo |
| `INSTAGRAM_REDIRECT_URI` | `http://localhost:5173/social/callback` | `https://www.hoysesale.cl/social/callback` |
| `FRONTEND_URL` | `http://localhost:5173` | `https://www.hoysesale.cl` |
| `INSTAGRAM_WEBHOOK_TOKEN` | token que tú inventes | mismo |

### Flujo de conexión

1. Usuario autenticado hace clic en "Conectar Instagram" en su perfil
2. Se abre un popup con la pantalla de autorización de Instagram
3. Usuario autoriza la app
4. Instagram redirige al callback, el backend intercambia el código por un token long-lived
5. El token se guarda en el usuario y se sincronizan automáticamente todos sus eventos
6. Las publicaciones aparecen en las tarjetas de evento y en la vista de detalle

### Sincronización automática

- **Al conectar**: se sincronizan todos los eventos del usuario automáticamente
- **Manual**: botón "Sincronizar Instagram" en la vista de detalle del evento
- **Webhook** (producción): cuando la app esté en Live, el endpoint `POST /social/instagram/webhook` recibe notificaciones de nuevo contenido

