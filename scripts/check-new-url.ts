import { PrismaClient } from '@prisma/client';

export const main = async () => {
  const prisma = new PrismaClient();

  const count = await prisma.media.count({
    where: { url: { contains: 'd156fyhrgb1drp.cloudfront.net' } },
  });

  console.log({
    count,
  });
};

main();
