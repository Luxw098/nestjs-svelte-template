import { Module } from '@nestjs/common';
import { Loader } from './loader.module';

@Module({
  imports: [Loader.register()],
})
export class AppModule {}
