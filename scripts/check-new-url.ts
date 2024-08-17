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

  const startOfYear = new Date(new Date().getFullYear(), 0, 1);

  await prisma.replication.update({
    where: {
      id: 'b620d9f2-e0b6-4ad3-a94b-de7020851955',
    },
    data: {
      lastReplicationTime: startOfYear,
    },
  });

  console.log({
    r,
    r2,
  });
};

main();
