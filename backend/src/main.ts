import 'svelte/register';

import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const ioAdapter = new IoAdapter(app);

  const logger = new Logger();
  app.use((req, res, next) => {
    logger.log("Request to " + req.url + ".");
    next();
  });

  app.useWebSocketAdapter(ioAdapter);

  await app.listen(3001);

  Logger.log(`backend listening: ${await app.getUrl()}`);
}
bootstrap();
