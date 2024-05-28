import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InitialImportService } from './services/initial-import.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly initialImportService: InitialImportService) {}

  // Run every Friday at 12am
  @Cron('0 0 * * 5')
  async initialImportCron() {
    try {
      console.log('\n');

      console.time('properties-cron-job');
      this.logger.log('Fetching properties corn job started');

      await this.initialImportService.getProperties();

      this.logger.log('Fetching properties corn job Ended successfully');
      console.timeEnd('properties-cron-job');
    } catch (error) {
      this.logger.error('Fetching properties corn job Ended with error');
      this.logger.error(error);
      console.timeEnd('properties-cron-job');
    }
  }
}
