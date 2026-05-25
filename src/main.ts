import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

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

  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ];

  app.enableCors({
    origin: (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean | string) => void) => {
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
