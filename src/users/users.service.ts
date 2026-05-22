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
      omit: { password: true },
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
}
