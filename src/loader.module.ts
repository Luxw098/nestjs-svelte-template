import { Module, DynamicModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { readdirSync } from 'fs';
import { join } from 'path';

@Module({})
export class Loader {
  static register(): DynamicModule {
    let controllers = [];
    const files = readdirSync(join(__dirname, 'api', 'endpoints'));

    files.forEach((file) => {
      if (file.match(/^.*\.controller\.(ts|js)$/)) {
        const controller = require(join(__dirname,  'api', 'endpoints', file)).default;
        controllers.push(controller);
      }
    });

    return {
      module: Loader,
      imports: [],
      controllers: [AppController, ...controllers],
      providers: [AppService],
    };
  }
}