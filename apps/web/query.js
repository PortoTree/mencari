require('dotenv').config({path: '../../.env'});
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.media.findFirst({}).then(m => {
  console.log('thumbUrl:', m.thumbUrl, 'feedUrl:', m.feedUrl, 'originalUrl:', m.originalUrl);
  prisma.$disconnect();
});
