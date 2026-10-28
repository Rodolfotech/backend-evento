import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessItemDto, BusinessReviewDto, CreateBusinessPageDto, UpdateBusinessDto } from '../common/dto';
import { slugify, slugProblem } from '../common/utils/slug';
import { MEDIA_STORAGE, MediaStorage } from '../media/storage/media-storage';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from '../media/media.service';

// Campos públicos del negocio. Nunca se exponen email, contraseña ni tokens.
const PUBLIC_BUSINESS_SELECT = {
  id: true,
  name: true,
  slug: true,
  category: true,
  logoUrl: true,
  coverUrl: true,
  businessDescription: true,
  hours: true,
  amenities: true,
  whatsappReservations: true,
  mapUrl: true,
  comuna: true,
  city: true,
  companyAddress: true,
  companyInstagram: true,
  website: true,
  companyPhone: true,
  createdAt: true,
} as const;

export type BusinessItemType = 'products' | 'services' | 'highlights';

const ITEM_MODEL = {
  products: 'businessProduct',
  services: 'businessService',
  highlights: 'businessHighlight',
} as const;

const TAGS = ['MAS_VENDIDO', 'DEL_DIA', 'REGALO', 'NUEVO'];

@Injectable()
export class BusinessesService {
  constructor(
    private prisma: PrismaService,
    @Inject(MEDIA_STORAGE) private storage: MediaStorage,
  ) {}

  // Lista pública de negocios (slugs) para el sitemap.
  findAllPublic() {
    return this.prisma.user.findMany({
      where: { slug: { not: null } },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
      // Mismo tope que el sitemap de Google (50.000 URL por archivo).
      take: 5000,
    });
  }

  // Micro-sitio público: datos, eventos vigentes, productos, servicios, destacados y reseñas.
  async findPublicBySlug(slug: string) {
    const business = await this.prisma.user.findUnique({
      where: { slug },
      select: PUBLIC_BUSINESS_SELECT,
    });
    if (!business) throw new NotFoundException('Negocio no encontrado');

    const now = new Date();
    const ownerId = business.id;
    const [events, products, services, highlights, reviews, aggregate] = await Promise.all([
      this.prisma.event.findMany({
        where: {
          ownerId,
          OR: [{ publicationEndDate: null }, { publicationEndDate: { gte: now } }],
          AND: [{ OR: [{ publicationStartDate: null }, { publicationStartDate: { lte: now } }] }],
        },
        orderBy: { date: 'asc' },
        select: { id: true, title: true, slug: true, date: true, imageUrl: true, address: true, city: true, description: true, entryType: true, indoor: true },
      }),
      this.prisma.businessProduct.findMany({ where: { ownerId }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] }),
      this.prisma.businessService.findMany({ where: { ownerId }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] }),
      this.prisma.businessHighlight.findMany({ where: { ownerId }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] }),
      this.prisma.businessReview.findMany({
        where: { ownerId },
        orderBy: { createdAt: 'desc' },
        take: 30,
        select: { id: true, rating: true, comment: true, createdAt: true, author: { select: { name: true, avatar: true } } },
      }),
      this.prisma.businessReview.aggregate({ where: { ownerId }, _avg: { rating: true }, _count: { _all: true } }),
    ]);

    const { id: _id, createdAt, ...publicBusiness } = business;
    const years = Math.floor((now.getTime() - createdAt.getTime()) / (365 * 24 * 60 * 60 * 1000));
    return {
      ...publicBusiness,
      stats: {
        rating: aggregate._avg.rating ? Math.round(aggregate._avg.rating * 10) / 10 : null,
        reviewCount: aggregate._count._all,
        years,
      },
      events,
      products,
      services,
      highlights,
      reviews,
    };
  }

  // Crea la página del negocio con la URL que elige el cliente (una sola vez por cuenta).
  async createPage(userId: string, dto: CreateBusinessPageDto) {
    const current = await this.prisma.user.findUnique({ where: { id: userId }, select: { slug: true, name: true } });
    if (!current) throw new BadRequestException('Usuario no encontrado');
    if (current.slug) throw new ConflictException('Ya tienes una página creada');

    const { slug: rawSlug, ...fields } = dto;
    const slug = (rawSlug ?? slugify(fields.name ?? current.name)).trim().toLowerCase();
    const problem = await slugProblem(this.prisma, slug, userId);
    if (problem) {
      throw problem.conflict ? new ConflictException(problem.message) : new BadRequestException(problem.message);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { ...fields, slug },
      select: PUBLIC_BUSINESS_SELECT,
    });
  }

  // Sube el logo o la portada del negocio y guarda su URL.
  async uploadImage(userId: string, kind: 'logo' | 'cover', file: Express.Multer.File) {
    const ext = ALLOWED_IMAGE_TYPES[file.mimetype];
    if (!ext) throw new BadRequestException('Formato no permitido (usa jpeg, png o webp)');
    if (file.size > MAX_IMAGE_BYTES) throw new BadRequestException('La imagen supera el máximo de 5 MB');

    const url = await this.storage.upload(`${userId}/business/${kind}-${randomUUID()}.${ext}`, file.buffer, file.mimetype);
    return this.prisma.user.update({
      where: { id: userId },
      data: kind === 'logo' ? { logoUrl: url } : { coverUrl: url },
      select: PUBLIC_BUSINESS_SELECT,
    });
  }

  // Edición del propio micro-sitio. El slug se puede cambiar, con las mismas validaciones.
  async updateOwn(userId: string, dto: UpdateBusinessDto) {
    const { slug: rawSlug, ...fields } = dto;
    const data: Record<string, unknown> = { ...fields };

    if (rawSlug !== undefined) {
      const slug = rawSlug.trim().toLowerCase();
      const problem = await slugProblem(this.prisma, slug, userId);
      if (problem) {
        throw problem.conflict ? new ConflictException(problem.message) : new BadRequestException(problem.message);
      }
      data.slug = slug;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: PUBLIC_BUSINESS_SELECT,
    });
  }

  // Productos, servicios y destacados del dueño.
  async addItem(userId: string, type: BusinessItemType, dto: BusinessItemDto) {
    const data = this.itemData(type, dto);
    return this.delegate(type).create({ data: { ...data, ownerId: userId } });
  }

  async updateItem(userId: string, type: BusinessItemType, id: string, dto: BusinessItemDto) {
    await this.ownedItem(userId, type, id);
    return this.delegate(type).update({ where: { id }, data: this.itemData(type, dto, true) });
  }

  async deleteItem(userId: string, type: BusinessItemType, id: string) {
    await this.ownedItem(userId, type, id);
    await this.delegate(type).delete({ where: { id } });
  }

  // Reseña de un visitante autenticado. Una por usuario y negocio (se actualiza si ya existe).
  async review(authorId: string, slug: string, dto: BusinessReviewDto) {
    const owner = await this.prisma.user.findUnique({ where: { slug }, select: { id: true } });
    if (!owner) throw new NotFoundException('Negocio no encontrado');
    if (owner.id === authorId) throw new BadRequestException('No puedes reseñar tu propio negocio');

    return this.prisma.businessReview.upsert({
      where: { ownerId_authorId: { ownerId: owner.id, authorId } },
      update: { rating: dto.rating, comment: dto.comment ?? null },
      create: { ownerId: owner.id, authorId, rating: dto.rating, comment: dto.comment ?? null },
      select: { id: true, rating: true, comment: true, createdAt: true },
    });
  }

  private delegate(type: BusinessItemType): any {
    if (!ITEM_MODEL[type]) throw new BadRequestException('Tipo de contenido no válido');
    return (this.prisma as any)[ITEM_MODEL[type]];
  }

  private async ownedItem(userId: string, type: BusinessItemType, id: string) {
    const item = await this.delegate(type).findUnique({ where: { id }, select: { ownerId: true } });
    if (!item) throw new NotFoundException('Elemento no encontrado');
    if (item.ownerId !== userId) throw new BadRequestException('No puedes modificar este elemento');
  }

  private itemData(type: BusinessItemType, dto: BusinessItemDto, partial = false): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    if (type === 'products') {
      if (!partial && !dto.name) throw new BadRequestException('El producto necesita un nombre');
      if (dto.name !== undefined) out.name = dto.name.trim();
      if (dto.price !== undefined) out.price = dto.price;
      if (dto.imageUrl !== undefined) out.imageUrl = dto.imageUrl;
      if (dto.tag !== undefined) {
        if (dto.tag && !TAGS.includes(dto.tag)) throw new BadRequestException('Etiqueta no válida');
        out.tag = dto.tag || null;
      }
    } else {
      if (!partial && !dto.title) throw new BadRequestException('Falta el título');
      if (dto.title !== undefined) out.title = dto.title.trim();
      if (type === 'highlights') {
        if (!partial && !dto.imageUrl) throw new BadRequestException('El destacado necesita una imagen');
        if (dto.imageUrl !== undefined) out.imageUrl = dto.imageUrl;
      }
    }
    if (dto.description !== undefined) out.description = dto.description || null;
    if (dto.sortOrder !== undefined) out.sortOrder = dto.sortOrder;
    return out;
  }
}
