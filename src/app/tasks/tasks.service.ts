import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../persistance/prisma.service';
import { HttpService } from '@nestjs/axios';
import { MlsAPIResponse } from '../mls/mls.type';
import { firstValueFrom } from 'rxjs';
import { sleep } from '@/lib/utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  // Run every Friday at 12am
  // @Cron(CronExpression.EVERY_HOUR)
  // async initialImportCron() {
  //   try {
  //     console.log('\n');

  //     console.time('properties-cron-job');
  //     this.logger.log('Fetching properties corn job started');

  //     await this.getInitialImport();

  //     this.logger.log('Fetching properties corn job Ended successfully');
  //     console.timeEnd('properties-cron-job');
  //   } catch (error) {
  //     this.logger.error('Fetching properties corn job Ended with error');
  //     this.logger.error(error);
  //     console.timeEnd('properties-cron-job');
  //   }
  // }

  @Cron(CronExpression.EVERY_HOUR)
  async replicationCron() {
    try {
      console.log('\n');

      console.time('properties-cron-job');
      this.logger.log('Fetching properties corn job started');

      await this.replication();

      this.logger.log('Fetching properties corn job Ended successfully');
      console.timeEnd('properties-cron-job');
    } catch (error) {
      this.logger.error('Fetching properties corn job Ended with error');
      this.logger.error(error);
      console.timeEnd('properties-cron-job');
    }
  }

  private async getInitialImport() {
    try {
      const result = await this.prisma.replication.findMany();
      const lastReplicate = result[0];

      let count = 0;
      const LIMIT = 200;

      const MLS_DOMAIN = this.configService.get<string>('MLS_DOMAIN');
      const MODIFICATION_TIMESTAMP = lastReplicate?.lastReplicationTime
        ? `%20and%20ModificationTimestamp%20gt%20${new Date(
            lastReplicate?.lastReplicationTime,
          ).toISOString()}`
        : '';
      console.log('MODIFICATION_TIMESTAMP', MODIFICATION_TIMESTAMP);

      let currentNextLink =
        MLS_DOMAIN +
        `/Property?$filter=OriginatingSystemName%20eq%20%27mfrmls%27%20and%20MlgCanView%20eq%20true${
          lastReplicate?.lastReplicationTime ? MODIFICATION_TIMESTAMP : ''
        }&$expand=Media,Rooms,UnitTypes`;

      console.log('currentNextLink', currentNextLink);

      let newGreatestModificationTimestamp;

      while (currentNextLink !== undefined) {
        if (count === LIMIT) {
          break;
        }

        const response = await firstValueFrom(
          this.httpService.get<MlsAPIResponse>(currentNextLink, {
            headers: {
              Authorization: `Bearer ${this.configService.get('MLS_TOKEN')} `,
            },
          }),
        );

        // wait 2 seconds to avoid api restriction
        await sleep(2000);

        const properties = response.data.value;

        const promises = properties.map((p) => {
          newGreatestModificationTimestamp = p.ModificationTimestamp;

          const promise = this.prisma.property.create({
            data: {
              address: p.UnparsedAddress ?? '',
              city: p.City ?? '',
              baths: p.BathroomsTotalInteger ?? 0,
              beds: p.BedroomsTotal ?? 0,
              price: p.ListPrice ?? 0,
              description: p.PublicRemarks,
              garageSpaces: p.GarageSpaces ?? 0,
              latitude: Number(p.Latitude ?? 0) ?? 0,
              longitude: Number(p.Longitude ?? 0) ?? 0,
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
              listAgentMlsId: p.ListAgentMlsId ?? '',
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
              images: p.Media?.map((m) => ({
                url: m.MediaURL ?? '',
                order: m.Order ?? 1,
              })),
            },
          });

          return promise;
        });

        try {
          await this.prisma.$transaction(promises);
        } catch (error) {
          this.logger.error(error);
        }

        currentNextLink = response.data['@odata.nextLink'];
        console.log('currentNextLink', currentNextLink);
        this.logger.log(`${count} request(s) made`);
        count++;
      }

      // number of request * properties per request
      const propLength = count * 500;

      this.logger.log(`Done! ${propLength} properties saved.`);
      let r;

      if (lastReplicate) {
        r = await this.prisma.replication.update({
          where: { id: lastReplicate.id },
          data: {
            lastReplicationTime: new Date(newGreatestModificationTimestamp),
          },
        });
      } else {
        r = await this.prisma.replication.create({
          data: {
            lastReplicationTime: new Date(newGreatestModificationTimestamp),
          },
        });
      }

      this.logger.log(`Replication date updated: ${r?.lastReplicationTime}`);
    } catch (error) {
      this.logger.error(error);
      console.log(error);

      this.logger.log(`Done with error`);
    }
  }

  private async replication() {
    try {
      const result = await this.prisma.replication.findMany();
      const lastReplicate = result[0];

      let count = 0;
      const LIMIT = 200;

      const MLS_DOMAIN = this.configService.get<string>('MLS_DOMAIN');
      const MODIFICATION_TIMESTAMP = lastReplicate?.lastReplicationTime
        ? `%20and%20ModificationTimestamp%20gt%20${new Date(
            lastReplicate?.lastReplicationTime,
          ).toISOString()}`
        : '';
      console.log('MODIFICATION_TIMESTAMP', MODIFICATION_TIMESTAMP);

      let currentNextLink =
        MLS_DOMAIN +
        `/Property?$filter=OriginatingSystemName%20eq%20%27mfrmls%27${
          lastReplicate?.lastReplicationTime ? MODIFICATION_TIMESTAMP : ''
        }&$expand=Media,Rooms,UnitTypes`;

      console.log('currentNextLink', currentNextLink);

      let newGreatestModificationTimestamp;

      while (currentNextLink !== undefined) {
        if (count === LIMIT) {
          break;
        }

        const response = await firstValueFrom(
          this.httpService.get<MlsAPIResponse>(currentNextLink, {
            headers: {
              Authorization: `Bearer ${this.configService.get('MLS_TOKEN')} `,
            },
          }),
        );

        // wait 2 seconds to avoid api restriction
        await sleep(2000);

        const properties = response.data.value;

        const promises = properties.map((p) => {
          newGreatestModificationTimestamp = p.ModificationTimestamp;

          const hasToRemove = p.MlgCanView === false;

          if (hasToRemove) {
            return this.prisma.property.delete({
              where: {
                mlsId: p.ListingKey,
              },
            });
          }

          const promise = this.prisma.property.upsert({
            where: {
              mlsId: p.ListingKey,
            },
            create: {
              address: p.UnparsedAddress ?? '',
              city: p.City ?? '',
              baths: p.BathroomsTotalInteger ?? 0,
              beds: p.BedroomsTotal ?? 0,
              price: p.ListPrice ?? 0,
              description: p.PublicRemarks,
              garageSpaces: p.GarageSpaces ?? 0,
              latitude: Number(p.Latitude ?? 0) ?? 0,
              longitude: Number(p.Longitude ?? 0) ?? 0,
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
              listAgentMlsId: p.ListAgentMlsId ?? '',
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
              images: p.Media?.map((m) => ({
                url: m.MediaURL ?? '',
                order: m.Order ?? 1,
              })),
            },
            update: {
              address: p.UnparsedAddress ?? '',
              city: p.City ?? '',
              baths: p.BathroomsTotalInteger ?? 0,
              beds: p.BedroomsTotal ?? 0,
              price: p.ListPrice ?? 0,
              description: p.PublicRemarks,
              garageSpaces: p.GarageSpaces ?? 0,
              latitude: Number(p.Latitude ?? 0) ?? 0,
              longitude: Number(p.Longitude ?? 0) ?? 0,
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
              listAgentMlsId: p.ListAgentMlsId ?? '',
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
              images: p.Media?.map((m) => ({
                url: m.MediaURL ?? '',
                order: m.Order ?? 1,
              })),
            },
          });

          return promise;
        });

        try {
          await this.prisma.$transaction(promises);
        } catch (error) {
          this.logger.error(error);
        }

        currentNextLink = response.data['@odata.nextLink'];
        console.log('currentNextLink', currentNextLink);
        this.logger.log(`${count} request(s) made`);
        count++;
      }

      // number of request * properties per request
      const propLength = count * 500;

      this.logger.log(`Done! ${propLength} properties saved.`);
      let r;

      if (lastReplicate) {
        r = await this.prisma.replication.update({
          where: { id: lastReplicate.id },
          data: {
            lastReplicationTime: new Date(newGreatestModificationTimestamp),
          },
        });
      } else {
        r = await this.prisma.replication.create({
          data: {
            lastReplicationTime: new Date(newGreatestModificationTimestamp),
          },
        });
      }

      this.logger.log(`Replication date updated: ${r?.lastReplicationTime}`);
    } catch (error) {
      this.logger.error(error);
      console.log(error);
      console.log(error.response.data);

      this.logger.log(`Done with error`);
    }
  }

  /**
   * 1. Get 100,000 properties
   * 2. Get media from each property
   * 3. Apply the cloudfront url to each media if needed
   * 3. save that media array in the property table in the json field
   * 4. delete the media from the media table
   *
   * 13.423s
   */
  private async migrateMediaFromMediaToPropertyTable() {
    const PROPERTIES_PER_PROCESS = 500;

    const properties = await this.prisma.property.findMany({
      take: PROPERTIES_PER_PROCESS,
      where: {
        images: {
          equals: Prisma.DbNull,
        },
      },
      include: {
        Media: true,
      },
    });

    const totalMedia = properties.reduce((acc, p) => {
      return acc + p.Media.length;
    }, 0);

    const prismaPromises = properties.map((p) => {
      const media = p.Media.map((m) => {
        const newUrl = this.getCloudfrontUrl(m.url);

        return {
          url: newUrl,
          order: m.order,
        };
      }) as Prisma.JsonArray;

      return this.prisma.property.update({
        where: {
          id: p.id,
        },
        data: {
          images: media,
        },
      });
    });

    await this.prisma.$transaction(prismaPromises);
    await this.prisma.media.deleteMany({
      where: {
        propertyId: {
          in: properties.map((p) => p.id),
        },
      },
    });

    console.log('Properties migrated: ', properties.length);
    console.log('Images migrated', totalMedia);

    return {
      propertiesMigrated: properties.length,
      imagesMigrated: totalMedia,
    };
  }

  private getCloudfrontUrl(medialUrl: string) {
    const CLOUDFRONT_DOMAIN =
      this.configService.get<string>('CLOUDFRONT_DOMAIN');
    const S3_URL = 's3.amazonaws.com/mlsgrid/images';

    const newUrl = medialUrl.replace(S3_URL, CLOUDFRONT_DOMAIN);

    return newUrl;
  }
}
