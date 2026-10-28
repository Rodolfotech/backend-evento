import { AUDIENCES, ENTRY_TYPES, EventFilters, InteractionType, matchesTimeSlot } from './event-filters';
import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(city?: string, page = 1, limit = 12, filters: EventFilters = {}) {
    const now = new Date();
    const skip = (page - 1) * limit;

    const where: any = {
      OR: [
        { publicationEndDate: null },
        { publicationEndDate: { gte: now } },
      ],
      AND: [
        { OR: [
          { publicationStartDate: null },
          { publicationStartDate: { lte: now } },
        ]},
      ],
    };

    if (city) {
      where.city = { equals: city, mode: 'insensitive' };
    }
    if (filters.free) where.entryType = 'GRATIS';
    if (filters.audience) where.audience = filters.audience;
    if (filters.indoor !== undefined) where.indoor = filters.indoor;

    // La franja horaria depende de la hora local de Chile: se filtra sobre la página obtenida.
    const [rows, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        include: { owner: { omit: { password: true } }, category: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    const data = filters.timeSlot ? rows.filter((e) => matchesTimeSlot(e.date, filters.timeSlot!)) : rows;
    return { data, total, page, limit };
  }

  // Registra una vista, un clic en "Cómo llegar" o un clic en un enlace externo (público).
  async registerInteraction(eventId: string, type: InteractionType) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId }, select: { id: true } });
    if (!event) throw new NotFoundException('Evento no encontrado');
    await this.prisma.eventInteraction.create({ data: { eventId, type } });
  }

  // Métricas de los eventos del organizador: totales por tipo de interacción.
  async statsForOwner(ownerId: string) {
    const events = await this.prisma.event.findMany({
      where: { ownerId },
      select: { id: true, title: true, slug: true },
      orderBy: { createdAt: 'desc' },
    });
    const counts = await this.prisma.eventInteraction.groupBy({
      by: ['eventId', 'type'],
      where: { eventId: { in: events.map((e) => e.id) } },
      _count: { _all: true },
    });
    return events.map((e) => {
      const of = (type: InteractionType) =>
        counts.find((c) => c.eventId === e.id && c.type === type)?._count._all ?? 0;
      return {
        ...e,
        views: of('VIEW'),
        directions: of('DIRECTIONS'),
        externalLinks: of('EXTERNAL_LINK'),
      };
    });
  }

  findBySlug(slug: string) {
    return this.prisma.event.findUnique({
      where: { slug },
      include: {
        owner: { omit: { password: true } },
        category: true,
        attendees: true,
        media: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  findByOwner(ownerId: string) {
    return this.prisma.event.findMany({
      where: { ownerId },
      include: { owner: { omit: { password: true } }, category: true },
    });
  }

  findById(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  private async resolveCategory(categoryName?: string): Promise<string | undefined> {
    if (!categoryName) return undefined;
    try {
      const existing = await this.prisma.category.findUnique({ where: { name: categoryName } });
      if (existing) return existing.id;
      const created = await this.prisma.category.create({ data: { name: categoryName } });
      return created.id;
    } catch (e: any) {
      console.error('[resolveCategory] Error resolving category:', categoryName, e?.message);
      throw e;
    }
  }

  private generateSlug(title: string): string {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúñü]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80);
    const suffix = Date.now().toString(36);
    return `${base}-${suffix}`;
  }

  async create(data: {
    title: string;
    slug?: string;
    description: string;
    date: string;
    ownerId: string;
    categoryId?: string;
    categoryName?: string;
    locationName?: string;
    address?: string;
    city?: string;
    isOnline?: boolean;
    imageUrl?: string;
    instagramMediaId?: string;
    publicationStartDate?: string;
    publicationEndDate?: string;
    entryType?: string;
    audience?: string;
    indoor?: boolean;
    amenities?: string[];
  }) {
    if (data.entryType && !(ENTRY_TYPES as readonly string[]).includes(data.entryType)) {
      throw new BadRequestException('Tipo de entrada no válido');
    }
    if (data.audience && !(AUDIENCES as readonly string[]).includes(data.audience)) {
      throw new BadRequestException('Público no válido');
    }
    const categoryId = data.categoryId || await this.resolveCategory(data.categoryName);
    const slug = data.slug || this.generateSlug(data.title);
    try {
      return await this.prisma.event.create({
        data: {
          title: data.title,
          description: data.description,
          slug,
          date: new Date(data.date),
          ownerId: data.ownerId,
          categoryId,
          locationName: data.locationName,
          address: data.address,
          city: data.city,
          isOnline: data.isOnline ?? false,
          imageUrl: data.imageUrl,
          instagramMediaId: data.instagramMediaId,
          publicationStartDate: data.publicationStartDate ? new Date(data.publicationStartDate) : undefined,
          publicationEndDate: data.publicationEndDate ? new Date(data.publicationEndDate) : undefined,
          entryType: data.entryType,
          audience: data.audience,
          indoor: data.indoor,
          amenities: data.amenities,
        },
        include: { owner: { omit: { password: true } }, category: true },
      });
    } catch (e: any) {
      console.error('[events.create] Error:', JSON.stringify({ code: e?.code, message: e?.message, meta: e?.meta }));
      if (e?.code === 'P2002') throw new ConflictException('Ya existe un evento con ese slug');
      throw e;
    }
  }

  async update(id: string, data: Partial<{
    title: string;
    description: string;
    date: string;
    locationName: string;
    address: string;
    city: string;
    isOnline: boolean;
    socialFeed: any;
    lastSync: string;
    publicationStartDate: string;
    publicationEndDate: string | null;
    categoryName: string;
    entryType: string;
    audience: string;
    indoor: boolean;
    amenities: string[];
  }>) {
    const updateData: any = { ...data };
    if (data.date) updateData.date = new Date(data.date);
    if (data.lastSync) updateData.lastSync = new Date(data.lastSync);
    if (data.publicationStartDate) updateData.publicationStartDate = new Date(data.publicationStartDate);
    if (data.publicationEndDate) updateData.publicationEndDate = new Date(data.publicationEndDate);
    if (data.categoryName) {
      updateData.categoryId = await this.resolveCategory(data.categoryName);
    }
    delete updateData.categoryName;
    return this.prisma.event.update({ where: { id }, data: updateData });
  }

  delete(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
