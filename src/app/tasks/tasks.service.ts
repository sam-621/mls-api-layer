import { HttpService } from '@nestjs/axios';
import { writeFile } from 'fs/promises';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { MlsAPIResponse, Value } from '../mls/mls.type';
import * as path from 'path';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly httpService: HttpService) {}

  // @Cron('45 * * * * *')
  // @Interval(20000)
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
    let currentNextLink =
      'https://api-demo.mlsgrid.com/v2/Property?$filter=OriginatingSystemName%20eq%20%27mfrmls%27%20and%20MlgCanView%20eq%20true&$expand=Media,Rooms,UnitTypes';

    while (currentNextLink !== undefined) {
      const response = await firstValueFrom(
        this.httpService.get<MlsAPIResponse>(currentNextLink, {
          headers: {
            Authorization: 'Bearer d2798b340ac104796196ec227904fb34e09b54af',
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
