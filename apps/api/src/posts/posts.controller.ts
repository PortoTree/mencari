import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getFeed() {
    return this.postsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Request() req: any, @Body() body: any) {
    // req.user di-inject oleh JwtStrategy hasil dari decode token
    return this.postsService.create(req.user.userId, body.content, body.type);
  }
}
