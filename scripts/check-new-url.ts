import { PrismaClient } from '@prisma/client';

export const main = async () => {
  const prisma = new PrismaClient();

  // const count = await prisma.media.count({
  //   where: { url: { contains: 'd1w4u23c1d7gv3.cloudfront.net' } },
  // });

  const lastProperties = await prisma.property.count();

  console.log({
    lastProperties,
  });
};

main();
