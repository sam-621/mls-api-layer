import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { MlsModule } from './mls/mls.module';

@Module({
  imports: [ApiModule],
})
export class AppModule {}
