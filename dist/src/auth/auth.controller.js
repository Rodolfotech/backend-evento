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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const dto_1 = require("../common/dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(body, res) {
        const result = await this.authService.login(body.email, body.password);
        res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
        return result;
    }
    async register(body, res) {
        const result = await this.authService.register(body);
        res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
        return result;
    }
    forgotPassword(email) {
        return this.authService.forgotPassword(email);
    }
    async resetPasswordWithToken(token, password, res) {
        const result = await this.authService.resetPasswordWithToken(token, password);
        res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
        return result;
    }
    checkEmail(email) {
        return this.authService.checkEmail(email);
    }
    async resetPasswordDirect(body, res) {
        const result = await this.authService.resetPassword(body.email, body.password);
        res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
        return result;
    }
    getInstagramAuthUrl(state) {
        return this.authService.getInstagramAuthUrl(state);
    }
    async instagramLogin(code, res) {
        const result = await this.authService.instagramLogin(code);
        res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
        return result;
    }
    getGoogleAuthUrl(state) {
        return this.authService.getGoogleAuthUrl(state);
    }
    async googleLogin(code, res) {
        const result = await this.authService.googleLogin(code);
        res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
        return result;
    }
    me(user) {
        return { user };
    }
    logout(res) {
        res.clearCookie('access_token', { path: '/' });
        return { message: 'Sesión cerrada' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sesión' }),
    (0, swagger_1.ApiBody)({ type: dto_1.LoginDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar nuevo usuario' }),
    (0, swagger_1.ApiBody)({ type: dto_1.RegisterDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Solicitar recuperación de contraseña' }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Restablecer contraseña con token' }),
    __param(0, (0, common_1.Body)('token')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPasswordWithToken", null);
__decorate([
    (0, common_1.Post)('check-email'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Verificar si un email existe' }),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Post)('reset-password-direct'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Restablecer contraseña directamente (solo desarrollo)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPasswordDirect", null);
__decorate([
    (0, common_1.Get)('instagram/url'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener URL de autorización de Instagram para login' }),
    __param(0, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getInstagramAuthUrl", null);
__decorate([
    (0, common_1.Post)('instagram'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sesión o registrarse con Instagram' }),
    __param(0, (0, common_1.Body)('code')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "instagramLogin", null);
__decorate([
    (0, common_1.Get)('google/url'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener URL de autorización de Google' }),
    __param(0, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getGoogleAuthUrl", null);
__decorate([
    (0, common_1.Post)('google'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Iniciar sesión o registrarse con Google' }),
    __param(0, (0, common_1.Body)('code')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener usuario autenticado desde cookie' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Cerrar sesión (limpiar cookie)' }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map