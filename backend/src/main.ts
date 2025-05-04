import 'svelte/register';

import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';

const httpsOptions = {
  key: readFileSync('../cert/key.key'),
  cert: readFileSync('../cert/cert.crt'),
};

class Backend {
  private logger = new Logger(Backend.name);

  async setup() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });
    const ioAdapter = new IoAdapter(app);

    app.use((req, res, next) => {
      this.logger.log("Request to " + req.url + " from " + req.ip + ".");
      next();
    });

    app.useWebSocketAdapter(ioAdapter);

    await app.listen(3001);
    this.logger.log(`Listening on Port: ${await app.getUrl()}`);
  }
};

new Backend().setup();
