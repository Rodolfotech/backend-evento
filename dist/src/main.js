"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
function normalizeOrigin(url) {
    return url.endsWith('/') ? url.slice(0, -1) : url;
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
    const frontendUrl = process.env.FRONTEND_URL
        ? normalizeOrigin(process.env.FRONTEND_URL)
        : undefined;
    const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
    ];
    if (frontendUrl) {
        allowedOrigins.push(frontendUrl);
        const withoutHttps = frontendUrl.replace(/^https?:\/\//, '');
        allowedOrigins.push(new RegExp(`^https?://${withoutHttps.replace(/\./g, '\\.')}/?$`));
    }
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map