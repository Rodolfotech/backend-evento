import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendeesService {
  constructor(private prisma: PrismaService) {}

  async register(userId: string, eventId: string) {
    try {
      return await this.prisma.attendee.create({
        data: { userId, eventId },
        include: { user: { omit: { password: true } }, event: true },
      });
    } catch (e: any) {
      if (e?.code === 'P2002') throw new ConflictException('Ya estás registrado en este evento');
      throw e;
    }
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

  async unregister(userId: string, eventId: string) {
    const attendee = await this.prisma.attendee.findFirst({
      where: { userId, eventId },
    });
    if (!attendee) throw new NotFoundException('No estás registrado en este evento');
    return this.prisma.attendee.delete({ where: { id: attendee.id } });
  }

  updateStatus(id: string, status: string) {
    return this.prisma.attendee.update({ where: { id }, data: { status } });
  }
}
