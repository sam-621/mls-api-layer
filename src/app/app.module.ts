import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@/lib/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [ConfigModule, ApiModule, ScheduleModule.forRoot(), TaskModule],
})
export class AppModule {}
