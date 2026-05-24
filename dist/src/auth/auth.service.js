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
            user,
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