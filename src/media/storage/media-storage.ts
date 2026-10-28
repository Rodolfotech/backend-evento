// Puerto de almacenamiento de imágenes. Dos implementaciones:
// - SupabaseMediaStorage: producción (Supabase Storage).
// - LocalMediaStorage: desarrollo (carpeta uploads/ del proyecto, servida en /uploads).
export const MEDIA_STORAGE = Symbol('MEDIA_STORAGE');

export interface MediaStorage {
  /** Guarda el archivo y devuelve su URL pública. */
  upload(path: string, buffer: Buffer, contentType: string): Promise<string>;
  /** Borra el archivo. Best-effort: no debe lanzar si ya no existe. */
  remove(path: string): Promise<void>;
  /** Borra todo lo que esté bajo una carpeta (por ejemplo, todas las imágenes de una cuenta). Best-effort. */
  removePrefix(prefix: string): Promise<void>;
}
