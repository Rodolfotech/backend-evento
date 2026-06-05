"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
let SocialService = class SocialService {
    prisma;
    config;
    igClientId;
    igClientSecret;
    igRedirectUri;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.igClientId = this.config.get('INSTAGRAM_CLIENT_ID') || '';
        this.igClientSecret = this.config.get('INSTAGRAM_CLIENT_SECRET') || '';
        const frontendUrl = this.config.get('FRONTEND_URL', 'http://localhost:5173');
        this.igRedirectUri = this.config.get('INSTAGRAM_REDIRECT_URI') || `${frontendUrl}/social/callback`;
    }
    checkInstagramConfig() {
        if (!this.igClientId || !this.igClientSecret || !this.igRedirectUri) {
            throw new common_1.BadRequestException('Instagram no está configurado. Falta INSTAGRAM_CLIENT_ID, INSTAGRAM_CLIENT_SECRET o INSTAGRAM_REDIRECT_URI en las variables de entorno.');
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
    async instagramCallback(userId, code) {
        this.checkInstagramConfig();
        if (!code)
            throw new common_1.BadRequestException('Código de autorización requerido');
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
            throw new common_1.BadRequestException(`Error al intercambiar código: ${err}`);
        }
        const tokenData = await tokenResponse.json();
        const shortLivedToken = tokenData.access_token;
        const igUserId = String(tokenData.user_id);
        const longLivedResponse = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token` +
            `&client_secret=${this.igClientSecret}&access_token=${shortLivedToken}`);
        let finalToken = shortLivedToken;
        let expiresIn = 3600;
        if (longLivedResponse.ok) {
            const longLivedData = await longLivedResponse.json();
            finalToken = longLivedData.access_token;
            expiresIn = longLivedData.expires_in || 5184000;
        }
        else {
            const errText = await longLivedResponse.text().catch(() => '');
            console.error(`Error al obtener long-lived token: ${longLivedResponse.status} ${errText}`);
        }
        let igUsername = null;
        let igAvatar = null;
        const profileResponse = await fetch(`https://graph.instagram.com/${igUserId}?fields=id,username,profile_picture&access_token=${finalToken}`);
        if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            igUsername = profileData.username || null;
            igAvatar = profileData.profile_picture || null;
        }
        await this.prisma.user.updateMany({
            where: { instagramId: igUserId, NOT: { id: userId } },
            data: {
                instagramId: null,
                socialToken: null,
                tokenExpiresAt: null,
                instagramUsername: null,
                instagramAvatar: null,
            },
        });
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                instagramId: igUserId,
                socialToken: finalToken,
                tokenExpiresAt: new Date(Date.now() + expiresIn * 1000),
                instagramUsername: igUsername,
                instagramAvatar: igAvatar,
            },
        });
        await this.syncAllUserEvents(userId);
        return this.prisma.user.findUnique({
            where: { id: userId },
            omit: { password: true },
        });
    }
    async connectInstagram(userId, accessToken) {
        this.checkInstagramConfig();
        const response = await fetch(`https://graph.instagram.com/me?fields=id,username,profile_picture&access_token=${accessToken}`);
        if (!response.ok) {
            throw new common_1.BadRequestException('Token de Instagram inválido o expirado');
        }
        const data = await response.json();
        if (!data.id) {
            throw new common_1.BadRequestException('No se pudo obtener el ID de Instagram');
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                instagramId: data.id,
                socialToken: accessToken,
                tokenExpiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
                instagramUsername: data.username || null,
                instagramAvatar: data.profile_picture || null,
            },
            omit: { password: true },
        });
    }
    async connectFacebook(userId, accessToken) {
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${accessToken}`);
        if (!response.ok) {
            throw new common_1.BadRequestException('Token de Facebook inválido o expirado');
        }
        const data = await response.json();
        if (!data.id) {
            throw new common_1.BadRequestException('No se pudo obtener el ID de Facebook');
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
    async disconnect(userId, platform) {
        const updateData = platform === 'instagram'
            ? { instagramId: null, socialToken: null, tokenExpiresAt: null }
            : { facebookId: null, socialToken: null, tokenExpiresAt: null };
        return this.prisma.user.update({
            where: { id: userId },
            data: updateData,
            omit: { password: true },
        });
    }
    async getStatus(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { facebookId: true, instagramId: true, instagramUsername: true, instagramAvatar: true },
        });
        return {
            facebook: !!user?.facebookId,
            instagram: !!user?.instagramId,
            instagramUsername: user?.instagramUsername || null,
            instagramAvatar: user?.instagramAvatar || null,
        };
    }
    async verifyWebhook(mode, challenge, verifyToken) {
        const expected = this.config.get('INSTAGRAM_WEBHOOK_TOKEN') || 'eventos-webhook-token';
        if (mode === 'subscribe' && verifyToken === expected) {
            return challenge;
        }
        throw new common_1.BadRequestException('Token de verificación inválido');
    }
    async handleWebhook(body) {
        const changes = body?.entry?.[0]?.changes || [];
        for (const change of changes) {
            if (change.field === 'media') {
                const igUserId = body.entry[0].id;
                if (!igUserId)
                    continue;
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
    async refreshToken(userId) {
        this.checkInstagramConfig();
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { socialToken: true, tokenExpiresAt: true },
        });
        if (!user?.socialToken) {
            throw new common_1.BadRequestException('No hay token para refrescar');
        }
        const response = await fetch('https://graph.instagram.com/refresh_access_token?' +
            new URLSearchParams({
                grant_type: 'ig_refresh_token',
                access_token: user.socialToken,
            }));
        if (!response.ok) {
            throw new common_1.BadRequestException('Error al refrescar token de Instagram');
        }
        const data = await response.json();
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                socialToken: data.access_token,
                tokenExpiresAt: new Date(Date.now() + (data.expires_in || 5184000) * 1000),
            },
            omit: { password: true },
        });
    }
    async syncAllUserEvents(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { instagramId: true, socialToken: true },
        });
        if (!user?.instagramId || !user?.socialToken)
            return;
        const events = await this.prisma.event.findMany({
            where: { ownerId: userId },
            select: { id: true },
        });
        for (const event of events) {
            try {
                await this.fetchAndSaveFeed(userId, event.id);
            }
            catch { }
        }
    }
    async fetchAndSaveFeed(userId, eventId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { instagramId: true, socialToken: true },
        });
        if (!user?.instagramId || !user?.socialToken)
            return;
        const response = await fetch(`https://graph.instagram.com/${user.instagramId}/media?fields=id,media_url,caption,permalink,timestamp&access_token=${user.socialToken}&limit=25`);
        if (!response.ok)
            return;
        const data = await response.json();
        const posts = (data.data || []).map((post) => ({
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
    async getUserMedia(userId) {
        this.checkInstagramConfig();
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { instagramId: true, socialToken: true, tokenExpiresAt: true },
        });
        if (!user?.instagramId || !user?.socialToken) {
            throw new common_1.BadRequestException('Instagram no está conectado');
        }
        let token = user.socialToken;
        if (user.tokenExpiresAt && new Date(user.tokenExpiresAt).getTime() - Date.now() < 3600000) {
            try {
                const refreshed = await this.refreshToken(userId);
                token = refreshed.socialToken || token;
            }
            catch (e) {
                throw new common_1.BadRequestException(`Token de Instagram expirado y no se pudo renovar: ${e.message}`);
            }
        }
        let response = await fetch(`https://graph.instagram.com/${user.instagramId}/media?fields=id,media_url,caption,permalink,timestamp,media_type,thumbnail_url&access_token=${token}&limit=50`);
        if (!response.ok) {
            response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_url,caption,permalink,timestamp,media_type,thumbnail_url&access_token=${token}&limit=50`);
        }
        if (!response.ok) {
            const errBody = await response.text().catch(() => '');
            if (errBody.includes('IGApiException') || errBody.includes('does not exist')) {
                throw new common_1.BadRequestException('Error de permisos de Instagram. Asegúrate de que en Meta Developers la app tenga ' +
                    'el producto "Instagram" agregado (no "Instagram Basic Display") y que la cuenta esté ' +
                    'configurada como Business o Creator.');
            }
            throw new common_1.BadRequestException(`Error al obtener publicaciones: ${response.status} ${errBody}`);
        }
        const data = await response.json();
        return (data.data || []).map((post) => ({
            id: post.id,
            platform: 'instagram',
            media_url: post.media_url || post.thumbnail_url || null,
            caption: post.caption || null,
            permalink: post.permalink || null,
            timestamp: post.timestamp,
            media_type: post.media_type || null,
        }));
    }
    async getValidation(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { instagramId: true, socialToken: true, createdAt: true },
        });
        if (!user?.instagramId || !user?.socialToken) {
            throw new common_1.BadRequestException('Instagram no está conectado');
        }
        const profileResponse = await fetch(`https://graph.instagram.com/${user.instagramId}?fields=id,username,account_type,media_count&access_token=${user.socialToken}`);
        if (!profileResponse.ok) {
            throw new common_1.BadRequestException('Error al obtener perfil de Instagram');
        }
        const profile = await profileResponse.json();
        const accountType = profile.account_type || 'PERSONAL';
        const mediaCount = profile.media_count || 0;
        const oldestResponse = await fetch(`https://graph.instagram.com/${user.instagramId}/media?fields=id,timestamp&access_token=${user.socialToken}&limit=1`);
        let oldestPostDate = null;
        if (oldestResponse.ok) {
            const oldestData = await oldestResponse.json();
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
    calculateLevel(accountType, ageDays, mediaCount) {
        let score = 0;
        if (accountType === 'BUSINESS' || accountType === 'CREATOR')
            score += 3;
        if (ageDays >= 180)
            score += 2;
        else if (ageDays >= 30)
            score += 1;
        if (mediaCount >= 20)
            score += 3;
        else if (mediaCount >= 5)
            score += 1;
        if (score >= 6)
            return 3;
        if (score >= 3)
            return 2;
        return 1;
    }
    async syncFeed(userId, eventId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            select: { ownerId: true },
        });
        if (!event) {
            throw new common_1.BadRequestException('Evento no encontrado');
        }
        if (event.ownerId !== userId) {
            throw new common_1.UnauthorizedException('No eres el dueño de este evento');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { instagramId: true, socialToken: true },
        });
        if (!user?.instagramId || !user?.socialToken) {
            throw new common_1.BadRequestException('Instagram no está conectado');
        }
        return this.fetchAndSaveFeed(userId, eventId);
    }
};
exports.SocialService = SocialService;
exports.SocialService = SocialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], SocialService);
//# sourceMappingURL=social.service.js.map