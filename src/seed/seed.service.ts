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
    const oldEmail = "demo@eventos.cl";
    const demoEmail = "admin@eventos.cl";
    const demoPassword = "W^t,Ly0={I!LQiK9z+5a";

    const existingByNewEmail = await this.prisma.user.findUnique({
      where: { email: demoEmail },
    });

    if (existingByNewEmail) {
      this.logger.log(`Usuario admin ya existe: ${demoEmail}`);
      const hashedPassword = await bcrypt.hash(demoPassword, 10);
      await this.prisma.user.update({
        where: { id: existingByNewEmail.id },
        data: { password: hashedPassword, role: Role.ADMIN, isActive: true },
      });
      this.logger.log("Contraseña actualizada");
      return;
    }

    const existingByOldEmail = await this.prisma.user.findUnique({
      where: { email: oldEmail },
    });

    if (existingByOldEmail) {
      const hashedPassword = await bcrypt.hash(demoPassword, 10);
      const user = await this.prisma.user.update({
        where: { id: existingByOldEmail.id },
        data: {
          email: demoEmail,
          password: hashedPassword,
          role: Role.ADMIN,
          isActive: true,
          name: "Admin Demo",
        },
      });
      this.logger.warn("=" .repeat(60));
      this.logger.warn("⚠️  USUARIO ADMIN ACTUALIZADO (email y contraseña cambiados)");
      this.logger.warn(`   Email: ${demoEmail}`);
      this.logger.warn(`   Contraseña: ${demoPassword}`);
      this.logger.warn(`   Role: ${user.role}`);
      this.logger.warn("=" .repeat(60));
      return;
    }

    const hashedPassword = await bcrypt.hash(demoPassword, 10);

    const user = await this.prisma.user.create({
      data: {
        email: demoEmail,
        password: hashedPassword,
        name: "Admin Demo",
        role: Role.ADMIN,
        isActive: true,
      },
    });

    this.logger.warn("=" .repeat(60));
    this.logger.warn("⚠️  USUARIO ADMIN CREADO (solo para desarrollo/pruebas)");
    this.logger.warn(`   Email: ${demoEmail}`);
    this.logger.warn(`   Contraseña: ${demoPassword}`);
    this.logger.warn(`   Role: ${user.role}`);
    this.logger.warn("=" .repeat(60));
  }
}
