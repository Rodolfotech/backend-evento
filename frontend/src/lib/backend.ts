// Llamadas del servidor (Next) al backend, para renderizar micro-sitios con SEO.
export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hoysesale.cl';

export interface BusinessEvent {
  id: string;
  title: string;
  slug: string;
  date: string;
  imageUrl: string | null;
  address: string | null;
  city: string | null;
  description: string;
  entryType: string | null;
  indoor: boolean | null;
}

export interface BusinessProduct {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  tag: 'MAS_VENDIDO' | 'DEL_DIA' | 'REGALO' | 'NUEVO' | null;
}

export interface BusinessService {
  id: string;
  title: string;
  description: string | null;
}

export interface BusinessHighlight {
  id: string;
  title: string;
  imageUrl: string;
}

export interface BusinessReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  author: { name: string; avatar: string | null };
}

export interface Business {
  createdAt?: string;
  stats: { rating: number | null; reviewCount: number; years: number };
  products: BusinessProduct[];
  services: BusinessService[];
  highlights: BusinessHighlight[];
  reviews: BusinessReview[];
  name: string;
  slug: string;
  category: string | null;
  logoUrl: string | null;
  coverUrl: string | null;
  businessDescription: string | null;
  hours: Record<string, string> | null;
  amenities: string[] | null;
  whatsappReservations: string | null;
  mapUrl: string | null;
  comuna: string | null;
  city: string | null;
  companyAddress: string | null;
  companyInstagram: string | null;
  website: string | null;
  companyPhone: string | null;
  events: BusinessEvent[];
}

// El backend no respondió (red caída, error 5xx). Se distingue de "no existe" para no mostrar una categoría por error.
export class BackendUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BackendUnavailableError';
  }
}

// Devuelve el negocio o null si el slug no es un negocio (entonces la ruta muestra una categoría).
// Lanza BackendUnavailableError si el backend no responde o falla.
export async function getBusiness(slug: string): Promise<Business | null> {
  let res: Response;
  try {
    // Sin caché: los cambios del dueño deben verse de inmediato.
    res = await fetch(`${BACKEND_URL}/businesses/${encodeURIComponent(slug)}`, { cache: 'no-store' });
  } catch {
    throw new BackendUnavailableError('No se pudo conectar con el servidor');
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new BackendUnavailableError(`El servidor respondió ${res.status}`);
  return res.json();
}

export async function listBusinessSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/businesses`, { next: { revalidate: 3600 } });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}
