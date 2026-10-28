import { ConfigService } from '@nestjs/config';

// Sin JWT_SECRET cualquiera podría firmar tokens válidos: el arranque falla en vez de usar un valor por defecto.
export function jwtSecret(config: ConfigService): string {
  const secret = config.get<string>('JWT_SECRET');
  if (!secret) throw new Error('JWT_SECRET no está definido');
  return secret;
}
