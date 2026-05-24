"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
function normalizeOrigin(url) {
    let normalized = url.endsWith('/') ? url.slice(0, -1) : url;
    normalized = normalized.replace(/^http:\/\//i, 'https://');
    return normalized;
}
function originsMatch(origin1, origin2) {
    return normalizeOrigin(origin1) === normalizeOrigin(origin2);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Eventos API')
        .setDescription('API para la plataforma de gestión de eventos')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const frontendUrl = process.env.FRONTEND_URL;
    const devOrigins = ['http://localhost:5173', 'http://localhost:3000'];
    app.enableCors({
        origin: (requestOrigin, callback) => {
            if (!requestOrigin) {
                callback(null, true);
                return;
            }
            const isDevOrigin = devOrigins.some(dev => originsMatch(requestOrigin, dev));
            if (isDevOrigin) {
                callback(null, normalizeOrigin(requestOrigin));
                return;
            }
            if (frontendUrl && originsMatch(requestOrigin, frontendUrl)) {
                callback(null, normalizeOrigin(requestOrigin));
                return;
            }
            callback(null, false);
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