import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  const m = await prisma.media.findFirst();
  console.log(m);
  process.exit(0);
}
run();
