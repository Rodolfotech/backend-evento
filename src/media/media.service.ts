import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Prisma } from '../generated/prisma/client';
import { MediaSource } from '../generated/prisma/enums';
import { LinkEventMediaDto } from '../common/dto';
import { PrismaService } from '../prisma/prisma.service';
import { MEDIA_STORAGE, MediaStorage } from './storage/media-storage';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    private prisma: PrismaService,
    @Inject(MEDIA_STORAGE) private storage: MediaStorage,
  ) {}

  list(eventId: string) {
    return this.prisma.eventMedia.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async uploadImage(eventId: string, userId: string, role: string, file: Express.Multer.File) {
    await this.assertCanManageEvent(eventId, userId, role);

    const ext = ALLOWED_IMAGE_TYPES[file.mimetype];
    if (!ext) {
      throw new BadRequestException('Formato no permitido (usa jpeg, png o webp)');
    }
    if (file.size > MAX_IMAGE_BYTES) {
      throw new BadRequestException('La imagen supera el máximo de 5 MB');
    }

    // Ruta por usuario y evento: <userId>/<eventId>/<uuid>.<ext>
    const storagePath = `${userId}/${eventId}/${randomUUID()}.${ext}`;
    const imageUrl = await this.storage.upload(storagePath, file.buffer, file.mimetype);

    return this.prisma.eventMedia.create({
      data: {
        eventId,
        source: MediaSource.UPLOAD,
        storagePath,
        imageUrl,
      },
    });
  }

  // Subida temporal de la imagen de una publicación (antes de crear el evento). Devuelve la URL.
  async uploadTemp(userId: string, file: Express.Multer.File): Promise<{ url: string }> {
    const ext = ALLOWED_IMAGE_TYPES[file.mimetype];
    if (!ext) throw new BadRequestException('Formato no permitido (usa jpeg, png o webp)');
    if (file.size > MAX_IMAGE_BYTES) throw new BadRequestException('La imagen supera el máximo de 5 MB');
    const url = await this.storage.upload(`${userId}/tmp/${randomUUID()}.${ext}`, file.buffer, file.mimetype);
    return { url };
  }

  async addLink(eventId: string, userId: string, role: string, dto: LinkEventMediaDto) {
    await this.assertCanManageEvent(eventId, userId, role);
    return this.prisma.eventMedia.create({
      data: {
        eventId,
        source: MediaSource.LINK,
        permalink: dto.permalink,
        imageUrl: dto.imageUrl ?? null,
        caption: dto.caption ?? null,
      },
    });
  }

  async remove(mediaId: string, userId: string, role: string) {
    const media = await this.prisma.eventMedia.findUnique({
      where: { id: mediaId },
      include: { event: { select: { ownerId: true } } },
    });
    if (!media) throw new NotFoundException('Medio no encontrado');
    if (media.event.ownerId !== userId && role !== 'ADMIN') {
      throw new ForbiddenException('No puedes borrar este medio');
    }

    try {
      await this.prisma.eventMedia.delete({ where: { id: mediaId } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        throw new NotFoundException('Medio no encontrado');
      }
      throw e;
    }

    // Borrado del archivo: best-effort, la fila ya no existe.
    if (media.storagePath) {
      await this.storage.remove(media.storagePath);
    }
  }

  private async assertCanManageEvent(eventId: string, userId: string, role: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { ownerId: true },
    });
    if (!event) throw new NotFoundException('Evento no encontrado');
    if (event.ownerId !== userId && role !== 'ADMIN') {
      throw new ForbiddenException('No puedes modificar los medios de este evento');
    }
  }
}
