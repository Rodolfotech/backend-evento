import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Cliente de Supabase solo para el backend (usa la service_role key, nunca exponerla al frontend).
// Se crea de forma perezosa: si faltan las variables, solo fallan las rutas que lo usan.
@Injectable()
export class SupabaseService {
  private client?: SupabaseClient;

  constructor(private config: ConfigService) {}

  getClient(): SupabaseClient {
    if (!this.client) {
      const url = this.config.get<string>('SUPABASE_URL');
      const key = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
      if (!url || !key) {
        throw new InternalServerErrorException('Supabase no está configurado (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
      }
      this.client = createClient(url, key, { auth: { persistSession: false } });
    }
    return this.client;
  }

  get bucket(): string {
    return this.config.get<string>('SUPABASE_BUCKET') ?? 'SupabaseImage_Storage';
  }
}
