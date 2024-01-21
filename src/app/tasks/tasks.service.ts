import { HttpService } from '@nestjs/axios';
import { writeFile } from 'fs/promises';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { MlsAPIResponse, Value } from '../mls/mls.type';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // @Cron('45 * * * * *')
  @Interval(20000)
  async handleCron() {
    try {
      console.log('\n');

      console.time('properties-cron-job');
      this.logger.log('Fetching properties corn job started');

      await this.getProperties();

      this.logger.log('Fetching properties corn job Ended successfully');
      console.timeEnd('properties-cron-job');
    } catch (error) {
      this.logger.log('Fetching properties corn job Ended with error');
      this.logger.error(error);
      console.timeEnd('properties-cron-job');
    }
  }

  private async getProperties() {
    let data: Value[] = [];
    let currentNextLink = this.configService.get<string>(
      'MLS_INITIAL_ENDPOINT',
    );

    while (currentNextLink !== undefined) {
      const response = await firstValueFrom(
        this.httpService.get<MlsAPIResponse>(currentNextLink, {
          headers: {
            Authorization: `Bearer ${this.configService.get('MLS_TOKEN')} `,
          },
        }),
      );

      data = [...data, ...response.data.value];
      currentNextLink = response.data['@odata.nextLink'];
    }

    await writeFile(
      path.join(process.cwd(), 'src/app', 'data.json'),
      JSON.stringify({ value: data }),
      'utf8',
    );

    this.logger.log(`Done! ${data.length} properties saved.`);
  }
}
