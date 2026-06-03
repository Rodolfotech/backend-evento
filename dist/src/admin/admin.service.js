"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logAudit(adminId, action, detail, ip) {
        await this.prisma.adminAuditLog.create({
            data: { adminId, action, detail: detail || null, ip: ip || null },
        }).catch(() => { });
    }
    async findAllUsers(adminId, comuna, ip) {
        const where = {};
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
    async findUserById(adminId, id, ip) {
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
            throw new common_1.NotFoundException('Usuario no encontrado');
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
    async trackInstagramClick(userId, eventId) {
        return this.prisma.instagramClick.create({
            data: { userId, eventId: eventId || null },
        });
    }
    async getComunas(adminId, ip) {
        const result = await this.prisma.user.findMany({
            where: { comuna: { not: null } },
            select: { comuna: true },
            distinct: ['comuna'],
            orderBy: { comuna: 'asc' },
        });
        await this.logAudit(adminId, 'LIST_COMUNAS', undefined, ip);
        return result.map((r) => r.comuna).filter(Boolean);
    }
    async getStats(adminId, ip) {
        const [totalUsers, totalEvents, totalAttendees, totalClicks] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.event.count(),
            this.prisma.attendee.count(),
            this.prisma.instagramClick.count(),
        ]);
        await this.logAudit(adminId, 'VIEW_STATS', undefined, ip);
        return { totalUsers, totalEvents, totalAttendees, totalInstagramClicks: totalClicks };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map