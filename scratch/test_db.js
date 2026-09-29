const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const follows = await prisma.follow.findMany();
  const friendships = await prisma.friendship.findMany();
  console.log("Follows:", follows);
  console.log("Friendships:", friendships);
}
main().catch(console.error).finally(() => prisma.$disconnect());
