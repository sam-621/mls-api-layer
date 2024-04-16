import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Wipe all data
  console.log('Wiping all data');

  console.log('deleting media...');
  await prisma.media.deleteMany();
  console.log('deleting properties...');
  await prisma.property.deleteMany();
  console.log('deleting replications...');
  await prisma.replication.deleteMany();
}

main();
