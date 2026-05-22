import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({ include: { events: true } });
  }

  create(data: { name: string; description?: string }) {
    return this.prisma.category.create({ data });
  }
}
