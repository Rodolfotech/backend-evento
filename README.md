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

## Integración Meta (Facebook/Instagram)

Para conectar con la Graph API:

1. Crear una app en [Meta for Developers](https://developers.facebook.com/)
2. Solicitar permisos: `instagram_basic`, `pages_read_engagement`
3. Guardar el `socialToken` del usuario en la tabla `users`
4. Usar el campo `socialFeed` (JSONB) en `events` para almacenar el feed sincronizado

Ejemplo de consulta a la Graph API:

```
GET https://graph.facebook.com/v22.0/{instagram-id}/media?access_token={token}
```

pnpm prisma db push
pnpm run start:dev

