import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { join } from 'path';

// Configuración común del servidor: la usan `main.ts` (desarrollo y Render) y `serverless.ts` (Vercel).
export function configureApp(app: INestApplication) {
  const express = app as NestExpressApplication;
  express.use(cookieParser());

  // Detrás de un proxy (Vercel, Render) req.ip es el proxy: sin esto todos los usuarios comparten el
  // contador del limitador de peticiones. Con TRUST_PROXY=1 se usa la IP real de X-Forwarded-For.
  express.set('trust proxy', Number(process.env.TRUST_PROXY ?? 1));

  // Solo desarrollo con STORAGE_DRIVER=local: archivos subidos en uploads/ (en producción es Supabase).
  if (process.env.STORAGE_DRIVER === 'local') {
    express.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });
  }

  const config = new DocumentBuilder()
    .setTitle('Eventos API')
    .setDescription('API para la plataforma de gestión de eventos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(express, config);
  SwaggerModule.setup('api/docs', express, document);

  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://www.hoysesale.cl',
    'https://hoysesale.cl',
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
}
