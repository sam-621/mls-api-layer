import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../persistance/prisma.service';
import { HttpService } from '@nestjs/axios';
import { MlsAPIResponse } from '../mls/mls.type';
import { firstValueFrom } from 'rxjs';
import { sleep } from '@/lib/utils';

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
  async initialImportCron() {
    try {
      console.log('\n');

      console.time('properties-cron-job');
      this.logger.log('Fetching properties corn job started');

      await this.getInitialImport();

      this.logger.log('Fetching properties corn job Ended successfully');
      console.timeEnd('properties-cron-job');
    } catch (error) {
      this.logger.error('Fetching properties corn job Ended with error');
      this.logger.error(error);
      console.timeEnd('properties-cron-job');
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async migrateFromS3ToCloudfrontCron() {
    try {
      console.log('\n');

      console.time('migrate-from-s3-to-cloudfront-cron-job');
      this.logger.log('Migrating from S3 to Cloudfront corn job started');

      await this.migrateFromS3ToCloudfront();

      this.logger.log(
        'Migrating from S3 to Cloudfront corn job Ended successfully',
      );
      console.timeEnd('migrate-from-s3-to-cloudfront-cron-job');
    } catch (error) {
      this.logger.error(
        'Migrating from S3 to Cloudfront corn job Ended with error',
      );
      this.logger.error(error);
      console.timeEnd('migrate-from-s3-to-cloudfront-cron-job');
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
              Media: {
                createMany: {
                  data:
                    p.Media?.map((m) => ({
                      url: this.getCloudfrontUrl(m.MediaURL) ?? '',
                      order: m.Order ?? 1,
                    })) ?? [],
                },
              },
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

  async migrateFromS3ToCloudfront() {
    const IMAGES_PER_PROCESS = 100_000;

    const media = await this.prisma.media.findMany({
      where: {
        url: {
          contains: 's3.amazonaws.com',
        },
      },
      take: IMAGES_PER_PROCESS,
    });

    let band = false;
    const prismaPromises = media.map((m) => {
      const newUrl = this.getCloudfrontUrl(m.url);

      if (!band) {
        console.log('newUrl', newUrl);
        band = true;
      }

      return this.prisma.media.update({
        where: {
          id: m.id,
        },
        data: {
          url: newUrl,
        },
      });
    });

    await this.prisma.$transaction(prismaPromises);

    console.log('Images migrated: ', media.length);
  }

  private getCloudfrontUrl(medialUrl: string) {
    const CLOUDFRONT_DOMAIN =
      this.configService.get<string>('CLOUDFRONT_DOMAIN');
    const S3_URL = 's3.amazonaws.com/mlsgrid/images';

    const newUrl = medialUrl.replace(S3_URL, CLOUDFRONT_DOMAIN);

    return newUrl;
  }
}
