import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({ include: { events: true } });
  }

  async create(data: { name: string; description?: string }) {
    try {
      return await this.prisma.category.create({ data });
    } catch (e: any) {
      if (e?.code === 'P2002') throw new ConflictException('Ya existe una categoría con ese nombre');
      throw e;
    }
  }
}
