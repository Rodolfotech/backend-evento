# Imagen para Cloud Run. Requiere Node 22 (Prisma 7).
FROM node:22-slim

WORKDIR /app

# Misma versión de pnpm que se usa en local (evita diferencias en la lista de scripts permitidos)
RUN npm install -g pnpm@12.10.1

# Prisma necesita libssl para detectar su motor nativo
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Dependencias primero para aprovechar la caché de capas
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Código, esquema y migraciones
COPY . .

# Genera el cliente de Prisma (src/generated) y compila a dist/
RUN pnpm run build

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Aplica migraciones y arranca. Cloud Run inyecta PORT.
CMD ["pnpm", "run", "start:prod"]
