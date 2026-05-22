import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.event.findMany({
      include: { owner: { omit: { password: true } }, category: true },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.event.findUnique({
      where: { slug },
      include: { owner: { omit: { password: true } }, category: true, attendees: true },
    });
  }

  findById(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  create(data: {
    title: string;
    slug: string;
    description: string;
    date: string;
    ownerId: string;
    categoryId?: string;
    locationName?: string;
    address?: string;
    city?: string;
    isOnline?: boolean;
  }) {
    return this.prisma.event.create({
      data: { ...data, date: new Date(data.date) },
      include: { owner: { omit: { password: true } }, category: true },
    });
  }

  update(id: string, data: Partial<{
    title: string;
    description: string;
    date: string;
    locationName: string;
    address: string;
    city: string;
    isOnline: boolean;
    socialFeed: any;
    lastSync: string;
  }>) {
    const updateData: any = { ...data };
    if (data.date) updateData.date = new Date(data.date);
    if (data.lastSync) updateData.lastSync = new Date(data.lastSync);
    return this.prisma.event.update({ where: { id }, data: updateData });
  }

  delete(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
