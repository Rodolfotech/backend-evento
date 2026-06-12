import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({ omit: { password: true } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, avatar: true, role: true, facebookId: true, instagramId: true, instagramUsername: true, instagramAvatar: true, createdAt: true, updatedAt: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create(data: { email: string; password: string; name: string }) {
    return this.prisma.user.create({ data, omit: { password: true } });
  }

  update(id: string, data: { name?: string; avatar?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }

  async deleteAccount(id: string) {
    await this.prisma.instagramClick.deleteMany({ where: { userId: id } });
    await this.prisma.adminAuditLog.deleteMany({ where: { adminId: id } });
    await this.prisma.attendee.deleteMany({ where: { userId: id } });

    const ownedEvents = await this.prisma.event.findMany({
      where: { ownerId: id },
      select: { id: true },
    });
    const eventIds = ownedEvents.map((e) => e.id);

    if (eventIds.length > 0) {
      await this.prisma.attendee.deleteMany({ where: { eventId: { in: eventIds } } });
      await this.prisma.event.deleteMany({ where: { ownerId: id } });
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
