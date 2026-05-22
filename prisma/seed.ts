import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { Role } from "../src/generated/prisma/enums";
import * as bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const demoEmail = "demo@eventos.cl";
  const demoPassword = "demo123";

  const existingUser = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (existingUser) {
    console.log("Usuario demo ya existe:", demoEmail);
    return;
  }

  const hashedPassword = await bcrypt.hash(demoPassword, 10);

  const user = await prisma.user.create({
    data: {
      email: demoEmail,
      password: hashedPassword,
      name: "Usuario Demo",
      role: Role.ADMIN,
      isActive: true,
    },
  });

  console.log("✅ Usuario demo creado exitosamente:");
  console.log("   Email:", demoEmail);
  console.log("   Contraseña:", demoPassword);
  console.log("   Role:", user.role);
}

main()
  .catch((e) => {
    console.error("Error creando usuario demo:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
