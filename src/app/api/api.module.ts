import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { MlsModule } from '../mls/mls.module';

@Module({
  imports: [MlsModule],
  controllers: [ApiController],
})
export class ApiModule {}
