import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

function extractJwt(req: Request): string | null {
  const fromCookie = req?.cookies?.access_token;
  if (fromCookie) return fromCookie;
  const authHeader = req?.headers?.authorization;
  if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7);
  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private usersService: UsersService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: extractJwt,
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET') || 'secretKey',
    });
  }

  async validate(payload: { sub: string }) {
    try {
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        this.logger.warn(`User not found: ${payload.sub}`);
      }
      return user;
    } catch (error) {
      this.logger.error(`JWT validate error: ${error.message}`);
      throw error;
    }
  }
}
