import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocialService {
  private readonly igClientId: string;
  private readonly igClientSecret: string;
  private readonly igRedirectUri: string;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.igClientId = this.config.get<string>('INSTAGRAM_CLIENT_ID')!;
    this.igClientSecret = this.config.get<string>('INSTAGRAM_CLIENT_SECRET')!;
    this.igRedirectUri = this.config.get<string>('INSTAGRAM_REDIRECT_URI')!;
  }

  getInstagramAuthUrl() {
    const params = new URLSearchParams({
      client_id: this.igClientId,
      redirect_uri: this.igRedirectUri,
      response_type: 'code',
      scope: 'instagram_business_basic',
    });
    return { url: `https://api.instagram.com/oauth/authorize?${params.toString()}` };
  }

  async instagramCallback(userId: string, code: string) {
    if (!code) throw new BadRequestException('Código de autorización requerido');

    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.igClientId,
        client_secret: this.igClientSecret,
        grant_type: 'authorization_code',
        redirect_uri: this.igRedirectUri,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text();
      throw new BadRequestException(`Error al intercambiar código: ${err}`);
    }

    const tokenData: any = await tokenResponse.json();
    const shortLivedToken: string = tokenData.access_token;
    const igUserId: string = String(tokenData.user_id);

    // Exchange for long-lived token
    const longLivedResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token` +
        `&client_secret=${this.igClientSecret}&access_token=${shortLivedToken}`,
    );

    let finalToken = shortLivedToken;
    let expiresIn = 3600;

    if (longLivedResponse.ok) {
      const longLivedData: any = await longLivedResponse.json();
      finalToken = longLivedData.access_token;
      expiresIn = longLivedData.expires_in || 5184000;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        instagramId: igUserId,
        socialToken: finalToken,
        tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
      },
      omit: { password: true },
    });
  }

  async connectInstagram(userId: string, accessToken: string) {
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`,
    );
    if (!response.ok) {
      throw new BadRequestException('Token de Instagram inválido o expirado');
    }
    const data: any = await response.json();

    if (!data.id) {
      throw new BadRequestException('No se pudo obtener el ID de Instagram');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        instagramId: data.id,
        socialToken: accessToken,
        tokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },
      omit: { password: true },
    });
  }

  async connectFacebook(userId: string, accessToken: string) {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name&access_token=${accessToken}`,
    );
    if (!response.ok) {
      throw new BadRequestException('Token de Facebook inválido o expirado');
    }
    const data: any = await response.json();

    if (!data.id) {
      throw new BadRequestException('No se pudo obtener el ID de Facebook');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        facebookId: data.id,
        socialToken: accessToken,
        tokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },
      omit: { password: true },
    });
  }

  async disconnect(userId: string, platform: string) {
    const updateData =
      platform === 'instagram'
        ? { instagramId: null as string | null, socialToken: null as string | null, tokenExpiresAt: null as Date | null }
        : { facebookId: null as string | null, socialToken: null as string | null, tokenExpiresAt: null as Date | null };

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      omit: { password: true },
    });
  }

  async getStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { facebookId: true, instagramId: true },
    });
    return {
      facebook: !!user?.facebookId,
      instagram: !!user?.instagramId,
    };
  }

  async refreshToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { socialToken: true, tokenExpiresAt: true },
    });

    if (!user?.socialToken) {
      throw new BadRequestException('No hay token para refrescar');
    }

    const response = await fetch(
      'https://graph.instagram.com/refresh_access_token?' +
      new URLSearchParams({
        grant_type: 'ig_refresh_token',
        access_token: user.socialToken,
      }),
    );

    if (!response.ok) {
      throw new BadRequestException('Error al refrescar token de Instagram');
    }

    const data: any = await response.json();

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        socialToken: data.access_token,
        tokenExpiresAt: new Date(Date.now() + (data.expires_in || 5184000) * 1000),
      },
      omit: { password: true },
    });
  }

  async syncFeed(userId: string, eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { ownerId: true },
    });

    if (!event) {
      throw new BadRequestException('Evento no encontrado');
    }
    if (event.ownerId !== userId) {
      throw new UnauthorizedException('No eres el dueño de este evento');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { instagramId: true, socialToken: true },
    });

    if (!user?.instagramId || !user?.socialToken) {
      throw new BadRequestException('Instagram no está conectado');
    }

    const response = await fetch(
      `https://graph.instagram.com/${user.instagramId}/media?fields=id,media_url,caption,permalink,timestamp&access_token=${user.socialToken}&limit=25`,
    );
    if (!response.ok) {
      throw new BadRequestException('Error al obtener publicaciones de Instagram');
    }
    const data: any = await response.json();

    const posts = (data.data || []).map((post: any) => ({
      id: post.id,
      platform: 'instagram',
      media_url: post.media_url || null,
      caption: post.caption || null,
      permalink: post.permalink || null,
      timestamp: post.timestamp,
    }));

    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        socialFeed: posts,
        lastSync: new Date(),
      },
    });
  }
}
