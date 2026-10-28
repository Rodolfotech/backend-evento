import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { MediaStorage } from './media-storage';

// Producción: Supabase Storage (bucket público).
@Injectable()
export class SupabaseMediaStorage implements MediaStorage {
  private readonly logger = new Logger(SupabaseMediaStorage.name);

  constructor(private supabase: SupabaseService) {}

  async upload(path: string, buffer: Buffer, contentType: string): Promise<string> {
    const storage = this.supabase.getClient().storage.from(this.supabase.bucket);
    const { error } = await storage.upload(path, buffer, { contentType, upsert: false });
    if (error) {
      this.logger.error(`Error al subir imagen a Supabase: ${error.message}`);
      throw new InternalServerErrorException('No se pudo subir la imagen');
    }
    return storage.getPublicUrl(path).data.publicUrl;
  }

  async remove(path: string): Promise<void> {
    const { error } = await this.supabase
      .getClient()
      .storage.from(this.supabase.bucket)
      .remove([path]);
    if (error) this.logger.warn(`No se pudo borrar ${path} de Storage: ${error.message}`);
  }

  async removePrefix(prefix: string): Promise<void> {
    const storage = this.supabase.getClient().storage.from(this.supabase.bucket);
    const files: string[] = [];
    // Supabase lista una carpeta por llamada: se recorre recursivamente.
    const walk = async (folder: string) => {
      const { data, error } = await storage.list(folder, { limit: 1000 });
      if (error || !data) return;
      for (const item of data) {
        const path = `${folder}/${item.name}`;
        if (item.id) files.push(path);
        else await walk(path);
      }
    };
    await walk(prefix);
    if (files.length > 0) {
      const { error } = await storage.remove(files);
      if (error) this.logger.warn(`No se pudieron borrar archivos de ${prefix}: ${error.message}`);
    }
  }
}
