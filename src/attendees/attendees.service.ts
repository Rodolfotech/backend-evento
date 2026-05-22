import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendeesService {
  constructor(private prisma: PrismaService) {}

  register(userId: string, eventId: string) {
    return this.prisma.attendee.create({
      data: { userId, eventId },
      include: { user: { omit: { password: true } }, event: true },
    });
  }

  findByEvent(eventId: string) {
    return this.prisma.attendee.findMany({
      where: { eventId },
      include: { user: { omit: { password: true } } },
    });
  }

  findByUser(userId: string) {
    return this.prisma.attendee.findMany({
      where: { userId },
      include: { event: { include: { category: true } } },
    });
  }

  updateStatus(id: string, status: string) {
    return this.prisma.attendee.update({ where: { id }, data: { status } });
  }
}
