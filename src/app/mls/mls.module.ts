import { Module } from '@nestjs/common';
import { MlsService } from './mls.service';

@Module({
  providers: [MlsService],
  exports: [MlsService],
})
export class MlsModule {}
