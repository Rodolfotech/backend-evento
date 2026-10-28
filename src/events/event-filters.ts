// Filtros y tipos de métricas de eventos (Fase 4 y 5).
export type InteractionType = 'VIEW' | 'DIRECTIONS' | 'EXTERNAL_LINK';

export interface EventFilters {
  free?: boolean;
  audience?: string;
  indoor?: boolean;
  timeSlot?: 'tarde' | 'noche';
}

// Tarde: 16:00 a 20:59. Noche: 21:00 en adelante. Hora local de Chile.
export function matchesTimeSlot(date: Date, slot: 'tarde' | 'noche'): boolean {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Santiago', hour: '2-digit', hour12: false }).format(date));
  return slot === 'tarde' ? hour >= 16 && hour < 21 : hour >= 21;
}

export const ENTRY_TYPES = ['GRATIS', 'CONSUMO_MINIMO', 'COVER'] as const;
export const AUDIENCES = ['PAREJA', 'FAMILIA', 'GENERAL'] as const;
