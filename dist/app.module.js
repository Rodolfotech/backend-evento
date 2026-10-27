"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const events_module_1 = require("./events/events.module");
const categories_module_1 = require("./categories/categories.module");
const attendees_module_1 = require("./attendees/attendees.module");
const seed_module_1 = require("./seed/seed.module");
const social_module_1 = require("./social/social.module");
const mail_module_1 = require("./mail/mail.module");
const admin_module_1 = require("./admin/admin.module");
const admin_constants_1 = require("./admin/admin.constants");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 20,
                }]),
            core_1.RouterModule.register([
                {
                    path: admin_constants_1.ADMIN_API_PREFIX,
                    module: admin_module_1.AdminModule,
                },
            ]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            events_module_1.EventsModule,
            categories_module_1.CategoriesModule,
            attendees_module_1.AttendeesModule,
            seed_module_1.SeedModule,
            social_module_1.SocialModule,
            mail_module_1.MailModule,
            admin_module_1.AdminModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map