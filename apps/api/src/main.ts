import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Aktifkan CORS agar Frontend (Next.js) bisa ngirim request
  app.enableCors();
  // Kita pindah API ke port 3001 biar gak bentrok sama Frontend Next.js di 3000
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
