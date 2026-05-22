import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "../generated/prisma/enums";
import * as bcrypt from "bcryptjs";

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.createDemoUser();
  }

  private async createDemoUser() {
    const demoEmail = "demo@eventos.cl";
    const demoPassword = "demo123";

    const existingUser = await this.prisma.user.findUnique({
      where: { email: demoEmail },
    });

    if (existingUser) {
      this.logger.log(`Usuario demo ya existe: ${demoEmail}`);
      return;
    }

    const hashedPassword = await bcrypt.hash(demoPassword, 10);

    const user = await this.prisma.user.create({
      data: {
        email: demoEmail,
        password: hashedPassword,
        name: "Usuario Demo",
        role: Role.ADMIN,
        isActive: true,
      },
    });

    this.logger.warn("=" .repeat(60));
    this.logger.warn("⚠️  USUARIO DEMO CREADO (solo para desarrollo/pruebas)");
    this.logger.warn(`   Email: ${demoEmail}`);
    this.logger.warn(`   Contraseña: ${demoPassword}`);
    this.logger.warn(`   Role: ${user.role}`);
    this.logger.warn("=" .repeat(60));
  }
}
