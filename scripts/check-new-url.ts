import { Prisma, PrismaClient } from '@prisma/client';

export const main = async () => {
  const prisma = new PrismaClient();

  // const count = await prisma.media.count({
  //   where: { url: { contains: 'd1w4u23c1d7gv3.cloudfront.net' } },
  // });
  const ids = ['MFR715275188', 'MFR722392243', 'MFR715326576', 'MFR726055642'];

  ids.forEach(async (id) => {
    const lastProperties = await prisma.property.findUnique({
      where: { mlsId: id },
    });
    console.log({
      lastProperties: lastProperties.id,
    });
  });
};

main();
