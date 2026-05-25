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
exports.SocialController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const social_service_1 = require("./social.service");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const dto_1 = require("../common/dto");
let SocialController = class SocialController {
    socialService;
    constructor(socialService) {
        this.socialService = socialService;
    }
    getInstagramAuthUrl() {
        return this.socialService.getInstagramAuthUrl();
    }
    instagramCallback(userId, code) {
        return this.socialService.instagramCallback(userId, code);
    }
    connectInstagram(userId, body) {
        return this.socialService.connectInstagram(userId, body.accessToken);
    }
    connectFacebook(userId, body) {
        return this.socialService.connectFacebook(userId, body.accessToken);
    }
    disconnect(userId, platform) {
        return this.socialService.disconnect(userId, platform);
    }
    getStatus(userId) {
        return this.socialService.getStatus(userId);
    }
    refreshToken(userId) {
        return this.socialService.refreshToken(userId);
    }
    getUserMedia(userId) {
        return this.socialService.getUserMedia(userId);
    }
    getValidation(userId) {
        return this.socialService.getValidation(userId);
    }
    syncFeed(userId, eventId) {
        return this.socialService.syncFeed(userId, eventId);
    }
    verifyWebhook(mode, challenge, verifyToken) {
        return this.socialService.verifyWebhook(mode, challenge, verifyToken);
    }
    handleWebhook(req) {
        return this.socialService.handleWebhook(req.body);
    }
};
exports.SocialController = SocialController;
__decorate([
    (0, common_1.Get)('instagram/auth-url'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener URL de autorización de Instagram' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "getInstagramAuthUrl", null);
__decorate([
    (0, common_1.Post)('instagram/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Intercambiar código de Instagram por token' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "instagramCallback", null);
__decorate([
    (0, common_1.Post)('instagram/connect'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Conectar cuenta de Instagram con token directo' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ConnectSocialDto]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "connectInstagram", null);
__decorate([
    (0, common_1.Post)('facebook/connect'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Conectar cuenta de Facebook' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ConnectSocialDto]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "connectFacebook", null);
__decorate([
    (0, common_1.Delete)(':platform/disconnect'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Desconectar red social' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "disconnect", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener estado de conexión social' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('instagram/refresh'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Refrescar token de Instagram' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('instagram/media'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener publicaciones de Instagram del usuario autenticado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "getUserMedia", null);
__decorate([
    (0, common_1.Get)('instagram/validation'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener validación de la cuenta de Instagram' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "getValidation", null);
__decorate([
    (0, common_1.Post)('sync/:eventId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sincronizar publicaciones de Instagram a un evento' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "syncFeed", null);
__decorate([
    (0, common_1.Get)('instagram/webhook'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Query)('hub.mode')),
    __param(1, (0, common_1.Query)('hub.challenge')),
    __param(2, (0, common_1.Query)('hub.verify_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "verifyWebhook", null);
__decorate([
    (0, common_1.Post)('instagram/webhook'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SocialController.prototype, "handleWebhook", null);
exports.SocialController = SocialController = __decorate([
    (0, swagger_1.ApiTags)('Social'),
    (0, common_1.Controller)('social'),
    __metadata("design:paramtypes", [social_service_1.SocialService])
], SocialController);
//# sourceMappingURL=social.controller.js.map