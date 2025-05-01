import { Module } from '@nestjs/common';
import controllers from './controllers';
import providers from './gateways';

import wss from './gateways/wss.gateway';

@Module({
  imports: [],
  controllers: controllers,
  providers: [wss]
})
export class AppModule {}
