import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

interface InstagramTokenData {
  access_token: string;
  user_id: number;
  expires_in?: number;
}

interface InstagramProfile {
  id: string;
  username: string;
  account_type: string;
  name?: string;
  profile_picture_url?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user: await this.usersService.findById(user.id),
    };
  }

  async register(data: { email: string; password: string; name: string }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('El email ya está registrado');
    }
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({ ...data, password: hashed });
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { message: 'Si el email existe, recibirás un enlace de recuperación' };
    }

    const resetToken = this.jwtService.sign(
      { sub: user.id, type: 'reset' },
      { expiresIn: '1h' },
    );

    const frontendUrl = this.config.get('FRONTEND_URL', 'http://localhost:5173');
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    await this.mailService.sendPasswordReset(email, resetUrl);

    return { message: 'Si el email existe, recibirás un enlace de recuperación' };
  }

  async resetPasswordWithToken(token: string, newPassword: string) {
    let payload: { sub: string; type: string };
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new BadRequestException('Token inválido o expirado');
    }

    if (payload.type !== 'reset') {
      throw new BadRequestException('Token inválido');
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: payload.sub },
      data: { password: hashed },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      omit: { password: true },
    });
    if (!user) throw new BadRequestException('Usuario no encontrado');
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user,
    };
  }

  async checkEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email no encontrado');
    }
    return { exists: true };
  }

  getGoogleAuthUrl(state?: string) {
    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID')!;
    const redirectUri = this.config.get<string>('GOOGLE_REDIRECT_URI')!;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    if (state) params.set('state', state);
    return { url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}` };
  }

  async googleLogin(code: string) {
    if (!code) throw new BadRequestException('Código de autorización requerido');

    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID')!;
    const clientSecret = this.config.get<string>('GOOGLE_CLIENT_SECRET')!;
    const redirectUri = this.config.get<string>('GOOGLE_REDIRECT_URI')!;

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text();
      throw new BadRequestException(`Error al autenticar con Google: ${err}`);
    }

    const tokenData: any = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const userResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
    );

    if (!userResponse.ok) {
      throw new BadRequestException('Error al obtener perfil de Google');
    }

    const googleProfile: any = await userResponse.json();

    let user = await this.prisma.user.findUnique({
      where: { email: googleProfile.email },
    });

    if (user) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          avatar: googleProfile.picture || user.avatar,
        },
      });
    } else {
      user = await this.prisma.user.create({
        data: {
          email: googleProfile.email,
          name: googleProfile.name || googleProfile.email.split('@')[0],
          avatar: googleProfile.picture || null,
        },
      });
    }

    const jwt = this.jwtService.sign({ sub: user.id, email: user.email });
    return {
      access_token: jwt,
      user: await this.usersService.findById(user.id),
    };
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email no encontrado');
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
      user: await this.usersService.findById(user.id),
    };
  }

  getInstagramAuthUrl(state?: string) {
    const clientId = this.config.get<string>('INSTAGRAM_CLIENT_ID')!;
    const redirectUri = this.config.get<string>('INSTAGRAM_REDIRECT_URI')!;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'instagram_business_basic',
    });
    if (state) params.set('state', state);
    return { url: `https://api.instagram.com/oauth/authorize?${params.toString()}` };
  }

  async instagramLogin(code: string) {
    if (!code) throw new BadRequestException('Código de autorización requerido');

    const clientId = this.config.get<string>('INSTAGRAM_CLIENT_ID')!;
    const clientSecret = this.config.get<string>('INSTAGRAM_CLIENT_SECRET')!;
    const redirectUri = this.config.get<string>('INSTAGRAM_REDIRECT_URI')!;

    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text();
      throw new BadRequestException(`Error al autenticar con Instagram: ${err}`);
    }

    const tokenData: InstagramTokenData = await tokenResponse.json();
    const shortLivedToken = tokenData.access_token;
    const igUserId = String(tokenData.user_id);

    const longLivedResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token` +
        `&client_secret=${clientSecret}&access_token=${shortLivedToken}`,
    );

    let finalToken = shortLivedToken;
    let expiresIn = 5184000;

    if (longLivedResponse.ok) {
      const longLivedData: any = await longLivedResponse.json();
      finalToken = longLivedData.access_token;
      expiresIn = longLivedData.expires_in || 5184000;
    }

    let igProfile: InstagramProfile = { id: igUserId, username: '', account_type: '' };

    try {
      const profileResponse = await fetch(
        `https://graph.instagram.com/${igUserId}?fields=id,username,account_type&access_token=${finalToken}`,
      );
      if (profileResponse.ok) {
        igProfile = await profileResponse.json();
      }
    } catch {}

    let user = await this.prisma.user.findUnique({
      where: { instagramId: igUserId },
    });

    if (user) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          socialToken: finalToken,
          tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
          instagramUsername: igProfile.username || user.instagramUsername,
        },
      });
    } else {
      const placeholderEmail = `ig-${igUserId}@instagram.auth`;
      user = await this.prisma.user.create({
        data: {
          email: placeholderEmail,
          name: igProfile.username || `Instagram ${igUserId.slice(0, 6)}`,
          instagramId: igUserId,
          instagramUsername: igProfile.username || null,
          socialToken: finalToken,
          tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
        },
      });
    }

    const jwt = this.jwtService.sign({ sub: user.id, email: user.email });
    return {
      access_token: jwt,
      user: await this.usersService.findById(user.id),
    };
  }
}
