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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(city, page = 1, limit = 12) {
        const now = new Date();
        const skip = (page - 1) * limit;
        const where = {
            OR: [
                { publicationEndDate: null },
                { publicationEndDate: { gte: now } },
            ],
            AND: [
                { OR: [
                        { publicationStartDate: null },
                        { publicationStartDate: { lte: now } },
                    ] },
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
    findBySlug(slug) {
        return this.prisma.event.findUnique({
            where: { slug },
            include: { owner: { omit: { password: true } }, category: true, attendees: true },
        });
    }
    findByOwner(ownerId) {
        return this.prisma.event.findMany({
            where: { ownerId },
            include: { owner: { omit: { password: true } }, category: true },
        });
    }
    findById(id) {
        return this.prisma.event.findUnique({ where: { id } });
    }
    async resolveCategory(categoryName) {
        if (!categoryName)
            return undefined;
        const existing = await this.prisma.category.findUnique({ where: { name: categoryName } });
        if (existing)
            return existing.id;
        const created = await this.prisma.category.create({ data: { name: categoryName } });
        return created.id;
    }
    generateSlug(title) {
        const base = title
            .toLowerCase()
            .replace(/[^a-z0-9áéíóúñü]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 80);
        const suffix = Date.now().toString(36);
        return `${base}-${suffix}`;
    }
    async create(data) {
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
    async update(id, data) {
        const updateData = { ...data };
        if (data.date)
            updateData.date = new Date(data.date);
        if (data.lastSync)
            updateData.lastSync = new Date(data.lastSync);
        if (data.publicationStartDate)
            updateData.publicationStartDate = new Date(data.publicationStartDate);
        if (data.publicationEndDate)
            updateData.publicationEndDate = new Date(data.publicationEndDate);
        if (data.categoryName) {
            updateData.categoryId = await this.resolveCategory(data.categoryName);
        }
        delete updateData.categoryName;
        return this.prisma.event.update({ where: { id }, data: updateData });
    }
    delete(id) {
        return this.prisma.event.delete({ where: { id } });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map