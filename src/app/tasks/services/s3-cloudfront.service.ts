import { PrismaService } from '@/app/persistance/prisma.service';
import { ConfigService } from '@nestjs/config';

export class S3ToCloudfront {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  //https://s3.amazonaws.com/mlsgrid/images/5da865c0-069b-4eba-ac82-d4419c39e9df.jpeg
  async migrateFromS3ToCloudfront() {
    const CLOUDFRONT_DOMAIN =
      this.configService.get<string>('CLOUDFRONT_DOMAIN');
    const S3_URL = 's3.amazonaws.com/mlsgrid/images';

    const IMAGES_PER_PROCESS = 100000;

    const media = await this.prisma.media.findMany({
      where: {
        url: {
          contains: 's3.amazonaws.com',
        },
      },
      take: IMAGES_PER_PROCESS,
    });

    const prismaPromises = media.map((m) => {
      const newUrl = m.url.replace(S3_URL, CLOUDFRONT_DOMAIN);

      return this.prisma.media.update({
        where: {
          id: m.id,
        },
        data: {
          url: newUrl,
        },
      });
    });

    this.prisma.$transaction(prismaPromises);
  }
}
