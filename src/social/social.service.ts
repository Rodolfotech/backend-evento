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
    this.igClientId = this.config.get<string>('INSTAGRAM_CLIENT_ID') || '';
    this.igClientSecret = this.config.get<string>('INSTAGRAM_CLIENT_SECRET') || '';
    this.igRedirectUri = this.config.get<string>('INSTAGRAM_REDIRECT_URI') || '';
  }

  private checkInstagramConfig() {
    if (!this.igClientId || !this.igClientSecret || !this.igRedirectUri) {
      throw new BadRequestException(
        'Instagram no está configurado. Falta INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET o INSTAGRAM_REDIRECT_URI en las variables de entorno.',
      );
    }
  }

  getInstagramAuthUrl() {
    this.checkInstagramConfig();
    const params = new URLSearchParams({
      client_id: this.igClientId,
      redirect_uri: this.igRedirectUri,
      response_type: 'code',
      scope: 'instagram_business_basic',
    });
    return { url: `https://api.instagram.com/oauth/authorize?${params.toString()}` };
  }

  async instagramCallback(userId: string, code: string) {
    this.checkInstagramConfig();
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

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        instagramId: igUserId,
        socialToken: finalToken,
        tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
      },
    });

    await this.syncAllUserEvents(userId);

    return this.prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
    });
  }

  async connectInstagram(userId: string, accessToken: string) {
    this.checkInstagramConfig();
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

  async verifyWebhook(mode: string, challenge: string, verifyToken: string) {
    const expected = this.config.get<string>('INSTAGRAM_WEBHOOK_TOKEN') || 'eventos-webhook-token';
    if (mode === 'subscribe' && verifyToken === expected) {
      return challenge;
    }
    throw new BadRequestException('Token de verificación inválido');
  }

  async handleWebhook(body: any) {
    const changes = body?.entry?.[0]?.changes || [];
    for (const change of changes) {
      if (change.field === 'media') {
        const igUserId = body.entry[0].id;
        if (!igUserId) continue;
        const user = await this.prisma.user.findUnique({
          where: { instagramId: String(igUserId) },
          select: { id: true },
        });
        if (user) {
          await this.syncAllUserEvents(user.id);
        }
      }
    }
  }

  async refreshToken(userId: string) {
    this.checkInstagramConfig();
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

  private async syncAllUserEvents(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { instagramId: true, socialToken: true },
    });

    if (!user?.instagramId || !user?.socialToken) return;

    const events = await this.prisma.event.findMany({
      where: { ownerId: userId },
      select: { id: true },
    });

    for (const event of events) {
      try {
        await this.fetchAndSaveFeed(userId, event.id);
      } catch {}
    }
  }

  private async fetchAndSaveFeed(userId: string, eventId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { instagramId: true, socialToken: true },
    });

    if (!user?.instagramId || !user?.socialToken) return;

    const response = await fetch(
      `https://graph.instagram.com/${user.instagramId}/media?fields=id,media_url,caption,permalink,timestamp&access_token=${user.socialToken}&limit=25`,
    );
    if (!response.ok) return;
    const data: any = await response.json();

    const posts = (data.data || []).map((post: any) => ({
      id: post.id,
      platform: 'instagram',
      media_url: post.media_url || null,
      caption: post.caption || null,
      permalink: post.permalink || null,
      timestamp: post.timestamp,
    }));

    await this.prisma.event.update({
      where: { id: eventId },
      data: {
        socialFeed: posts,
        lastSync: new Date(),
      },
    });
  }

  async getUserMedia(userId: string) {
    this.checkInstagramConfig();
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { instagramId: true, socialToken: true },
    });

    if (!user?.instagramId || !user?.socialToken) {
      throw new BadRequestException('Instagram no está conectado');
    }

    const response = await fetch(
      `https://graph.instagram.com/${user.instagramId}/media?fields=id,media_url,caption,permalink,timestamp,media_type,thumbnail_url&access_token=${user.socialToken}&limit=50`,
    );

    if (!response.ok) {
      throw new BadRequestException('Error al obtener publicaciones de Instagram');
    }

    const data: any = await response.json();
    return (data.data || []).map((post: any) => ({
      id: post.id,
      platform: 'instagram' as const,
      media_url: post.media_url || post.thumbnail_url || null,
      caption: post.caption || null,
      permalink: post.permalink || null,
      timestamp: post.timestamp,
      media_type: post.media_type || null,
    }));
  }

  async getValidation(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { instagramId: true, socialToken: true, createdAt: true },
    });

    if (!user?.instagramId || !user?.socialToken) {
      throw new BadRequestException('Instagram no está conectado');
    }

    const profileResponse = await fetch(
      `https://graph.instagram.com/${user.instagramId}?fields=id,username,account_type,media_count&access_token=${user.socialToken}`,
    );

    if (!profileResponse.ok) {
      throw new BadRequestException('Error al obtener perfil de Instagram');
    }

    const profile: any = await profileResponse.json();
    const accountType = profile.account_type || 'PERSONAL';
    const mediaCount = profile.media_count || 0;

    const oldestResponse = await fetch(
      `https://graph.instagram.com/${user.instagramId}/media?fields=id,timestamp&access_token=${user.socialToken}&limit=1`,
    );
    let oldestPostDate: string | null = null;
    if (oldestResponse.ok) {
      const oldestData: any = await oldestResponse.json();
      if (oldestData.data?.length > 0) {
        oldestPostDate = oldestData.data[oldestData.data.length - 1].timestamp;
      }
    }

    const connectedAt = user.createdAt.toISOString();
    const accountAgeMs = oldestPostDate
      ? Date.now() - new Date(oldestPostDate).getTime()
      : Date.now() - new Date(connectedAt).getTime();
    const accountAgeDays = Math.floor(accountAgeMs / (1000 * 60 * 60 * 24));

    return {
      accountType,
      mediaCount,
      connectedAt,
      oldestPostDate,
      accountAgeDays,
      isProfessional: accountType === 'BUSINESS' || accountType === 'CREATOR',
      hasActivity: mediaCount > 0,
      hasMinAge: accountAgeDays >= 180,
      hasMinPosts: mediaCount >= 5,
      level: this.calculateLevel(accountType, accountAgeDays, mediaCount),
    };
  }

  private calculateLevel(accountType: string, ageDays: number, mediaCount: number): number {
    let score = 0;
    if (accountType === 'BUSINESS' || accountType === 'CREATOR') score += 3;
    if (ageDays >= 180) score += 2;
    else if (ageDays >= 30) score += 1;
    if (mediaCount >= 20) score += 3;
    else if (mediaCount >= 5) score += 1;
    if (score >= 6) return 3;
    if (score >= 3) return 2;
    return 1;
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

    return this.fetchAndSaveFeed(userId, eventId);
  }
}
