import { NestFactory } from '@nestjs/core';
import type { IncomingMessage, ServerResponse } from 'http';
import { AppModule } from './app.module';
import { configureApp } from './app.setup';

type ExpressHandler = (req: IncomingMessage, res: ServerResponse) => void;

// En Vercel cada instancia de función reutiliza la app ya iniciada (el arranque en frío es lo caro).
let handlerPromise: Promise<ExpressHandler> | null = null;

function getHandler(): Promise<ExpressHandler> {
  if (!handlerPromise) {
    handlerPromise = (async () => {
      const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
      configureApp(app);
      await app.init();
      return app.getHttpAdapter().getInstance() as ExpressHandler;
    })();
    // Si el arranque falla, se reintenta en la siguiente invocación en vez de quedar bloqueado.
    handlerPromise.catch(() => {
      handlerPromise = null;
    });
  }
  return handlerPromise;
}

// Punto de entrada serverless: recibe la petición HTTP de Vercel y la delega en Express/Nest.
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const express = await getHandler();
  return express(req, res);
}
