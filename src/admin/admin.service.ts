import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  private async logAudit(adminId: string, action: string, detail?: string, ip?: string) {
    await this.prisma.adminAuditLog.create({
      data: { adminId, action, detail: detail || null, ip: ip || null },
    }).catch(() => {});
  }

  async findAllUsers(adminId: string, comuna?: string, ip?: string) {
    const where: any = {};
    if (comuna) {
      where.comuna = comuna;
    }

    const users = await this.prisma.user.findMany({
      where,
      omit: { password: true, socialToken: true },
      include: {
        _count: {
          select: {
            ownedEvents: true,
            registrations: true,
            instagramClicks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    await this.logAudit(adminId, 'LIST_USERS', comuna ? `comuna: ${comuna}` : 'todos', ip);

    return users.map((u) => ({
      ...u,
      eventCount: u._count.ownedEvents,
      registrationCount: u._count.registrations,
      instagramClickCount: u._count.instagramClicks,
      _count: undefined,
    }));
  }

  async findUserById(adminId: string, id: string, ip?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true, socialToken: true },
      include: {
        _count: {
          select: {
            ownedEvents: true,
            registrations: true,
            instagramClicks: true,
          },
        },
        ownedEvents: {
          select: { id: true, title: true, slug: true, date: true, city: true },
          orderBy: { date: 'desc' },
          take: 10,
        },
        registrations: {
          select: {
            id: true,
            event: { select: { id: true, title: true, slug: true, date: true } },
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.logAudit(adminId, 'VIEW_USER', `usuario: ${user.name} (${user.email})`, ip);

    return {
      ...user,
      eventCount: user._count.ownedEvents,
      registrationCount: user._count.registrations,
      instagramClickCount: user._count.instagramClicks,
      _count: undefined,
    };
  }

  async trackInstagramClick(userId: string, eventId?: string) {
    return this.prisma.instagramClick.create({
      data: { userId, eventId: eventId || null },
    });
  }

  async getComunas(adminId: string, ip?: string) {
    const result = await this.prisma.user.findMany({
      where: { comuna: { not: null } },
      select: { comuna: true },
      distinct: ['comuna'],
      orderBy: { comuna: 'asc' },
    });

    await this.logAudit(adminId, 'LIST_COMUNAS', undefined, ip);

    return result.map((r) => r.comuna).filter(Boolean);
  }

  async getStats(adminId: string, ip?: string) {
    const [totalUsers, totalEvents, totalAttendees, totalClicks] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.event.count(),
        this.prisma.attendee.count(),
        this.prisma.instagramClick.count(),
      ]);

    await this.logAudit(adminId, 'VIEW_STATS', undefined, ip);

    return { totalUsers, totalEvents, totalAttendees, totalInstagramClicks: totalClicks };
  }
}