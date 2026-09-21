import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PostsModule } from './posts/posts.module.js';
import { WebhooksModule } from './webhooks/webhooks.module.js';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, PostsModule, WebhooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
