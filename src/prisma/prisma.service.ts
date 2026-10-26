import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: false } 
        : undefined,
    });
    // El driver pg ignora ?schema=, así que el esquema se pasa explícitamente al adaptador
    const schema = process.env.DATABASE_URL
      ? new URL(process.env.DATABASE_URL).searchParams.get('schema') ?? undefined
      : undefined;
    const adapter = new PrismaPg(pool, { schema });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
