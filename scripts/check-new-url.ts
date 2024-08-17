import { PrismaClient } from '@prisma/client';

export const main = async () => {
  const prisma = new PrismaClient();

  const r = await prisma.property.findFirst({
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const r2 = await prisma.property.findFirst({
    where: {
      mlsId: 'MFR284019016',
    },
  });

  console.log({
    r,
    r2,
  });
};

main();
