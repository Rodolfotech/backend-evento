import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(city?: string, page = 1, limit = 12) {
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

    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        include: { owner: { omit: { password: true } }, category: true },
        skip,
        take: limit,
        orderBy: { date: 'asc' },
      }),
      this.prisma.event.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  findBySlug(slug: string) {
    return this.prisma.event.findUnique({
      where: { slug },
      include: { owner: { omit: { password: true } }, category: true, attendees: true },
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
    const existing = await this.prisma.category.findUnique({ where: { name: categoryName } });
    if (existing) return existing.id;
    const created = await this.prisma.category.create({ data: { name: categoryName } });
    return created.id;
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
    publicationStartDate?: string;
    publicationEndDate?: string;
  }) {
    const categoryId = data.categoryId || await this.resolveCategory(data.categoryName);
    const slug = data.slug || this.generateSlug(data.title);
    const { categoryName: _, ...rest } = data;
    return this.prisma.event.create({
      data: {
        ...rest,
        slug,
        categoryId,
        date: new Date(data.date),
        publicationStartDate: data.publicationStartDate ? new Date(data.publicationStartDate) : undefined,
        publicationEndDate: data.publicationEndDate ? new Date(data.publicationEndDate) : undefined,
      },
      include: { owner: { omit: { password: true } }, category: true },
    });
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
    publicationEndDate: string;
    categoryName: string;
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
