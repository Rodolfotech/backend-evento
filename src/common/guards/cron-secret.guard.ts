import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';

// Para tareas programadas (Vercel Cron): exige `Authorization: Bearer <CRON_SECRET>`.
// Sin CRON_SECRET definido, el endpoint queda cerrado.
@Injectable()
export class CronSecretGuard implements CanActivate {
  constructor(private config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const secret = this.config.get<string>('CRON_SECRET');
    const header: string = context.switchToHttp().getRequest().headers.authorization ?? '';
    if (!secret) throw new UnauthorizedException();

    const expected = Buffer.from(`Bearer ${secret}`);
    const received = Buffer.from(header);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
