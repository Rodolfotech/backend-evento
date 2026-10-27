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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const users_service_1 = require("../users/users.service");
function extractJwt(req) {
    const fromCookie = req?.cookies?.access_token;
    if (fromCookie)
        return fromCookie;
    const authHeader = req?.headers?.authorization;
    if (authHeader?.startsWith('Bearer '))
        return authHeader.slice(7);
    return null;
}
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    usersService;
    logger = new common_1.Logger(JwtStrategy_1.name);
    constructor(usersService, config) {
        super({
            jwtFromRequest: extractJwt,
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET') || 'secretKey',
        });
        this.usersService = usersService;
    }
    async validate(payload) {
        try {
            const user = await this.usersService.findById(payload.sub);
            if (!user) {
                this.logger.warn(`User not found: ${payload.sub}`);
            }
            return user;
        }
        catch (error) {
            this.logger.error(`JWT validate error: ${error.message}`);
            throw error;
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map