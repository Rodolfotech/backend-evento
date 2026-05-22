import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

function normalizeOrigin(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Eventos API')
    .setDescription('API para la plataforma de gestión de eventos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const frontendUrl = process.env.FRONTEND_URL 
    ? normalizeOrigin(process.env.FRONTEND_URL)
    : undefined;

  const allowedOrigins: (string | RegExp)[] = [
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
