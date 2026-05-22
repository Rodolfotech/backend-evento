"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const client_1 = require("../src/generated/prisma/client");
const enums_1 = require("../src/generated/prisma/enums");
const bcrypt = __importStar(require("bcryptjs"));
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
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
            role: enums_1.Role.ADMIN,
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
//# sourceMappingURL=seed.js.map