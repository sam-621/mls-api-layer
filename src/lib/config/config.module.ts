import { Global, Module } from '@nestjs/common';
import { ConfigModule as NConfigModule } from '@nestjs/config';
import { envConfig } from './env.config';

@Global()
@Module({
  imports: [
    NConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      envFilePath: ['.env'],
    }),
  ],
  exports: [NConfigModule],
})
export class ConfigModule {}
