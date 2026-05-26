"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const users_service_1 = require("../users/users.service");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    usersService;
    jwtService;
    prisma;
    mailService;
    config;
    constructor(usersService, jwtService, prisma, mailService, config) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.mailService = mailService;
        this.config = config;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.password)
            return null;
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            return null;
        return user;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        if (!user)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        return {
            access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
            user: await this.usersService.findById(user.id),
        };
    }
    async register(data) {
        const existing = await this.usersService.findByEmail(data.email);
        if (existing) {
            throw new common_1.ConflictException('El email ya está registrado');
        }
        const hashed = await bcrypt.hash(data.password, 10);
        const user = await this.usersService.create({ ...data, password: hashed });
        return {
            access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
            user,
        };
    }
    async forgotPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return { message: 'Si el email existe, recibirás un enlace de recuperación' };
        }
        const resetToken = this.jwtService.sign({ sub: user.id, type: 'reset' }, { expiresIn: '1h' });
        const frontendUrl = this.config.get('FRONTEND_URL', 'http://localhost:5173');
        const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;
        await this.mailService.sendPasswordReset(email, resetUrl);
        return { message: 'Si el email existe, recibirás un enlace de recuperación' };
    }
    async resetPasswordWithToken(token, newPassword) {
        let payload;
        try {
            payload = this.jwtService.verify(token);
        }
        catch {
            throw new common_1.BadRequestException('Token inválido o expirado');
        }
        if (payload.type !== 'reset') {
            throw new common_1.BadRequestException('Token inválido');
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
        if (!user)
            throw new common_1.BadRequestException('Usuario no encontrado');
        return {
            access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
            user,
        };
    }
    async checkEmail(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Email no encontrado');
        }
        return { exists: true };
    }
    getGoogleAuthUrl(state) {
        const clientId = this.config.get('GOOGLE_CLIENT_ID');
        const redirectUri = this.config.get('GOOGLE_REDIRECT_URI');
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: 'openid email profile',
            access_type: 'offline',
            prompt: 'consent',
        });
        if (state)
            params.set('state', state);
        return { url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}` };
    }
    async googleLogin(code) {
        if (!code)
            throw new common_1.BadRequestException('Código de autorización requerido');
        const clientId = this.config.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.config.get('GOOGLE_CLIENT_SECRET');
        const redirectUri = this.config.get('GOOGLE_REDIRECT_URI');
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
            throw new common_1.BadRequestException(`Error al autenticar con Google: ${err}`);
        }
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        const userResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
        if (!userResponse.ok) {
            throw new common_1.BadRequestException('Error al obtener perfil de Google');
        }
        const googleProfile = await userResponse.json();
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
        }
        else {
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
    async resetPassword(email, newPassword) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Email no encontrado');
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
    getInstagramAuthUrl(state) {
        const clientId = this.config.get('INSTAGRAM_CLIENT_ID');
        const redirectUri = this.config.get('INSTAGRAM_REDIRECT_URI');
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: 'code',
            scope: 'instagram_business_basic',
        });
        if (state)
            params.set('state', state);
        return { url: `https://api.instagram.com/oauth/authorize?${params.toString()}` };
    }
    async instagramLogin(code) {
        if (!code)
            throw new common_1.BadRequestException('Código de autorización requerido');
        const clientId = this.config.get('INSTAGRAM_CLIENT_ID');
        const clientSecret = this.config.get('INSTAGRAM_CLIENT_SECRET');
        const redirectUri = this.config.get('INSTAGRAM_REDIRECT_URI');
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
            throw new common_1.BadRequestException(`Error al autenticar con Instagram: ${err}`);
        }
        const tokenData = await tokenResponse.json();
        const shortLivedToken = tokenData.access_token;
        const igUserId = String(tokenData.user_id);
        const longLivedResponse = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token` +
            `&client_secret=${clientSecret}&access_token=${shortLivedToken}`);
        let finalToken = shortLivedToken;
        let expiresIn = 5184000;
        if (longLivedResponse.ok) {
            const longLivedData = await longLivedResponse.json();
            finalToken = longLivedData.access_token;
            expiresIn = longLivedData.expires_in || 5184000;
        }
        let igProfile = { id: igUserId, username: '', account_type: '' };
        try {
            const profileResponse = await fetch(`https://graph.instagram.com/${igUserId}?fields=id,username,account_type&access_token=${finalToken}`);
            if (profileResponse.ok) {
                igProfile = await profileResponse.json();
            }
        }
        catch { }
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
        }
        else {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService,
        mail_service_1.MailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map