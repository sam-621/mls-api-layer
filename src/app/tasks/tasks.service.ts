import { HttpService } from '@nestjs/axios';
import { writeFile } from 'fs/promises';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { MlsAPIResponse, Value } from '../mls/mls.type';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../persistance/prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  // Run every Friday at 12am
  // @Cron('0 0 * * 5')
  @Cron(CronExpression.EVERY_MINUTE)
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
    // let data: Value[] = [];
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

      // data = [...data, ...response.data.value];
      const properties = response.data.value;
      await this.prisma.property.createMany({
        data: properties.map((p) => ({
          address: p.UnparsedAddress,
          city: p.City,
          baths: p.BathroomsTotalInteger ?? 0,
          beds: p.BedroomsTotal ?? 0,
          price: p.ListPrice ?? 0,
          description: p.PublicRemarks,
          garageSpaces: p.GarageSpaces ?? 0,
          latitude: p.Latitude ?? 0,
          longitude: p.Longitude ?? 0,
          hasAssociationFee: p.AssociationYN ?? false,
          hasWaterfront: p.WaterfrontYN ?? false,
          isForSale:
            p.ListingAgreement === 'Exclusive Right To Sell' ||
            p.ListingAgreement === 'Exclusive Agency',
          listedAt: p.OriginalEntryTimestamp,
          mlsId: p.ListingKey,
          pc: p.PostalCode,
          propertyType: p.PropertyType,
          squareFt: (p?.BuildingAreaTotal || p?.LotSizeSquareFeet) ?? 0,
          status: p.MFR_PreviousStatus ?? '',
          stateOrProvince: p.StateOrProvince,
          stories: p.StoriesTotal ?? 0,
          lotSize: p.LotSizeAcres ?? 0,
          updatedAt: p.ModificationTimestamp,
          yearBuilt: p.YearBuilt ?? 0,
          cooling: !!p.Cooling,
          heating: !!p.Heating,
        })),
      });
      currentNextLink = response.data['@odata.nextLink'];
      console.log('currentNextLink', currentNextLink);
    }

    // await writeFile(
    //   path.join(process.cwd(), 'src/app', 'data.json'),
    //   JSON.stringify({ value: data }),
    //   'utf8',
    // );

    // this.logger.log(`Done! ${data.length} properties saved.`);
    this.logger.log(`Done! hi properties saved.`);
  }
}
