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
        this.igClientId = this.config.get('INSTAGRAM_CLIENT_ID');
        this.igClientSecret = this.config.get('INSTAGRAM_CLIENT_SECRET');
        this.igRedirectUri = this.config.get('INSTAGRAM_REDIRECT_URI');
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
    async instagramCallback(userId, code) {
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
    async connectInstagram(userId, accessToken) {
        const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
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
            select: { facebookId: true, instagramId: true },
        });
        return {
            facebook: !!user?.facebookId,
            instagram: !!user?.instagramId,
        };
    }
    async refreshToken(userId) {
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
        const response = await fetch(`https://graph.instagram.com/${user.instagramId}/media?fields=id,media_url,caption,permalink,timestamp&access_token=${user.socialToken}&limit=25`);
        if (!response.ok) {
            throw new common_1.BadRequestException('Error al obtener publicaciones de Instagram');
        }
        const data = await response.json();
        const posts = (data.data || []).map((post) => ({
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
};
exports.SocialService = SocialService;
exports.SocialService = SocialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], SocialService);
//# sourceMappingURL=social.service.js.map