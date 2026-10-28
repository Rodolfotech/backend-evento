import { Prisma } from '../../generated/prisma/client';
import type { PrismaService } from '../../prisma/prisma.service';

// Rutas del sitio que no pueden usarse como slug de negocio (hoysesale.cl/<slug>).
export const RESERVED_SLUGS = new Set([
  'eventos', 'categorias', 'comunas', 'login', 'register', 'registro', 'profile', 'perfil',
  'create-event', 'forgot-password', 'reset-password', 'privacidad', 'terminosdelservicio',
  'eliminacion-datos', 'panel-g9k2x', 'admin', 'api', 'auth', 'social', 'uploads', 'health', 'negocios',
]);

// Normaliza un nombre a slug: sin acentos, minúsculas, solo [a-z0-9-], máximo 60 caracteres.
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
}

// Slug único y no reservado. Si ya existe, agrega -2, -3, ... Evita colisionar con nombres de categoría.
export async function uniqueBusinessSlug(prisma: PrismaService, name: string): Promise<string> {
  const base = slugify(name) || 'negocio';
  const categories = await prisma.category.findMany({ select: { name: true } });
  const categorySlugs = new Set(categories.map((c) => slugify(c.name)));

  for (let i = 1; i < 1000; i++) {
    const candidate = i === 1 ? base : `${base}-${i}`;
    if (RESERVED_SLUGS.has(candidate) || categorySlugs.has(candidate)) continue;
    const taken = await prisma.user.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!taken) return candidate;
  }
  throw new Error('No se pudo generar un slug único');
}

export function isUniqueViolation(e: unknown): boolean {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002';
}

// Formato permitido para la URL del negocio: 3 a 60 caracteres, minúsculas, números y guiones.
export const BUSINESS_SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,58}[a-z0-9])$/;

// Valida un slug elegido por el cliente. Devuelve el motivo de rechazo o null si es válido.
// conflict = true cuando ya existe (409); false cuando es un valor no permitido (400).
export async function slugProblem(
  prisma: PrismaService,
  slug: string,
  ownerId?: string,
): Promise<{ message: string; conflict: boolean } | null> {
  if (!BUSINESS_SLUG_PATTERN.test(slug)) {
    return { message: 'La URL solo puede tener letras minúsculas, números y guiones (3 a 60 caracteres)', conflict: false };
  }
  if (RESERVED_SLUGS.has(slug)) return { message: 'Esa URL está reservada', conflict: false };
  const categories = await prisma.category.findMany({ select: { name: true } });
  if (categories.some((c) => slugify(c.name) === slug)) {
    return { message: 'Esa URL coincide con una categoría', conflict: false };
  }
  const taken = await prisma.user.findUnique({ where: { slug }, select: { id: true } });
  if (taken && taken.id !== ownerId) return { message: 'Esa URL ya está en uso', conflict: true };
  return null;
}
