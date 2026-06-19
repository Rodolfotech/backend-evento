"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cookie_parser_1.default)());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Eventos API')
        .setDescription('API para la plataforma de gestión de eventos')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
    ];
    app.enableCors({
        origin: (requestOrigin, callback) => {
            if (!requestOrigin) {
                callback(null, true);
                return;
            }
            const normalizedOrigin = requestOrigin.replace(/\/$/, '');
            const isAllowed = allowedOrigins.some(o => o.replace(/\/$/, '') === normalizedOrigin);
            callback(null, isAllowed);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map