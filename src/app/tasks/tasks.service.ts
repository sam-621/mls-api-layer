import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { MlsAPIResponse } from '../mls/mls.type';
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
  @Cron('0 0 * * 5')
  // @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    try {
      console.log('\n');

      console.time('properties-cron-job');
      this.logger.log('Fetching properties corn job started');

      await this.getProperties();

      this.logger.log('Fetching properties corn job Ended successfully');
      console.timeEnd('properties-cron-job');
    } catch (error) {
      this.logger.error('Fetching properties corn job Ended with error');
      this.logger.error(error);
      // console.timeEnd('properties-cron-job');
    }
  }

  private async getProperties() {
    // let data: Value[] = [];
    let currentNextLink = this.configService.get<string>(
      'MLS_INITIAL_ENDPOINT',
    );
    await this.prisma.media.deleteMany({});
    await this.prisma.property.deleteMany({});

    while (currentNextLink !== undefined) {
      const response = await firstValueFrom(
        this.httpService.get<MlsAPIResponse>(currentNextLink, {
          headers: {
            Authorization: `Bearer ${this.configService.get('MLS_TOKEN')} `,
          },
        }),
      );

      const properties = response.data.value;
      console.log(properties.length);

      const promises = properties.map((p) => {
        const promise = this.prisma.property.create({
          data: {
            Media: {
              createMany: {
                data:
                  p.Media?.map((m) => ({
                    url: m.MediaURL,
                    order: m.Order,
                  })) ?? [],
              },
            },
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
            listAgentMlsId: p.ListAgentMlsId,
            areaName: p.MLSAreaMajor ?? '',
            buyerAgencyCompensation: p.BuyerAgencyCompensation ?? '',
            contractDate: p.ListingContractDate,
            county: p.CountyOrParish ?? '',
            daysOnMarket: p.DaysOnMarket ?? 0,
            floorDescription: p.Rooms?.length
              ? p.Rooms[0].MFR_RoomFlooring
              : '',
            lotSize: p.LotSizeAcres ?? 0,
            roof: p.Roof ?? [],
            sewer: p.Sewer ?? [],
            stateOrProvince: p.StateOrProvince,
            status: p.MFR_PreviousStatus ?? '',
            title: p.StreetName ?? '',
            stories: p.StoriesTotal ?? 0,
            hasPool: p.PoolPrivateYN ?? false,
            updatedAt: p.ModificationTimestamp,
            yearBuilt: p.YearBuilt ?? 0,
            cooling: !!p.Cooling,
            heating: !!p.Heating,
            waterSource: p.WaterSource ?? [],
            appliances: p.Appliances ?? [],
            associationAmenities: p.AssociationAmenities ?? [],
            exteriorFeatures: p.ExteriorFeatures ?? [],
            firePlace: p.FireplaceYN ?? false,
            garage: p.GarageYN ?? false,
            interiorFeatures: p.InteriorFeatures ?? [],
            poolFeatures: p.PoolFeatures ?? [],
            parkingFeatures: p.ParkingFeatures ?? [],
            view: p.View ?? [],
          },
        });

        return promise;
      });

      await this.prisma.$transaction(promises);

      currentNextLink = response.data['@odata.nextLink'];
      console.log('currentNextLink', currentNextLink);
    }

    this.logger.log(`Done! hi properties saved.`);
  }
}
