import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "../generated/prisma/enums";
import * as bcrypt from "bcryptjs";

// Crea la cuenta admin solo si no existe. Nunca sobrescribe la contraseña en un arranque
// posterior y nunca imprime credenciales. La clave viene de ADMIN_PASSWORD.
@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async onModuleInit() {
    try {
      await this.createAdminIfMissing();
    } catch (e) {
      // Un fallo del seed no debe tumbar el servidor.
      this.logger.error(`Seed de admin omitido: ${(e as Error).message}`);
    }
  }

  private async createAdminIfMissing() {
    const adminEmail = this.config.get<string>("ADMIN_EMAIL") ?? "admin@eventos.cl";
    const adminPassword = this.config.get<string>("ADMIN_PASSWORD");

    const existing = await this.prisma.user.findUnique({ where: { email: adminEmail } });
    if (existing) {
      this.logger.log(`Usuario admin ya existe: ${adminEmail}`);
      return;
    }

    if (!adminPassword) {
      this.logger.warn("ADMIN_PASSWORD no está definida; no se crea el usuario admin");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await this.prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Admin Demo",
        role: Role.ADMIN,
        isActive: true,
      },
    });
    this.logger.warn(`Usuario admin creado: ${adminEmail}`);
  }
}
