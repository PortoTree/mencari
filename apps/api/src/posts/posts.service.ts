import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, content: string, type: any = 'NORMAL') {
    return this.prisma.post.create({
      data: {
        content,
        type,
        authorId,
      },
      include: {
        author: {
          select: { username: true, profile: { select: { displayName: true, avatarUrl: true } } }
        }
      }
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { username: true, profile: { select: { displayName: true, avatarUrl: true } } }
        }
      }
    });
  }
}
