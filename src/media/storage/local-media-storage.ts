import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import { dirname, join, resolve, sep } from 'path';
import { MediaStorage } from './media-storage';

// Solo para desarrollo: guarda en uploads/ y el backend la sirve en /uploads.
@Injectable()
export class LocalMediaStorage implements MediaStorage {
  private readonly logger = new Logger(LocalMediaStorage.name);
  private readonly root = resolve(process.cwd(), 'uploads');

  constructor(private config: ConfigService) {}

  async upload(path: string, buffer: Buffer): Promise<string> {
    const target = this.safePath(path);
    await fs.mkdir(dirname(target), { recursive: true });
    await fs.writeFile(target, buffer, { flag: 'wx' });
    const base = this.config.get<string>('PUBLIC_BASE_URL') ?? 'http://localhost:3000';
    return `${base}/uploads/${path}`;
  }

  async remove(path: string): Promise<void> {
    try {
      await fs.unlink(this.safePath(path));
    } catch (e) {
      this.logger.warn(`No se pudo borrar ${path}: ${(e as Error).message}`);
    }
  }

  async removePrefix(prefix: string): Promise<void> {
    try {
      await fs.rm(this.safePath(prefix), { recursive: true, force: true });
    } catch (e) {
      this.logger.warn(`No se pudo borrar la carpeta ${prefix}: ${(e as Error).message}`);
    }
  }

  // Evita salir de uploads/ con rutas tipo ../
  private safePath(path: string): string {
    const target = resolve(join(this.root, path));
    if (!target.startsWith(this.root + sep)) {
      throw new Error('Ruta de archivo inválida');
    }
    return target;
  }
}
