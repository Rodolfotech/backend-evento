import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

function normalizeOrigin(url: string): string {
  let normalized = url.endsWith('/') ? url.slice(0, -1) : url;
  normalized = normalized.replace(/^http:\/\//i, 'https://');
  return normalized;
}

function originsMatch(origin1: string, origin2: string): boolean {
  return normalizeOrigin(origin1) === normalizeOrigin(origin2);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Eventos API')
    .setDescription('API para la plataforma de gestión de eventos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const frontendUrl = process.env.FRONTEND_URL;
  const devOrigins = ['http://localhost:5173', 'http://localhost:3000'];

  app.enableCors({
    origin: (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean | string) => void) => {
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
