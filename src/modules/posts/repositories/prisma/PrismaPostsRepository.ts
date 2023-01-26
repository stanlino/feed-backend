import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

import { CreatePostDto } from '../../dtos/createPostDto';
import { DeletePostDto } from '../../dtos/deletePostDto';
import { FindManyPostsDto } from '../../dtos/findManyPostsDto';
import { FindOnePostDto } from '../../dtos/findOnePostDto';
import { Post } from '../../entities/Post';
import { IPostsRepository } from '../IPostsRepository';

export class PrismaPostsRepository implements IPostsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({
    user_id,
    image = null,
    text = null,
  }: CreatePostDto): Promise<void> {
    await this.prisma.post.create({
      data: {
        id: randomUUID(),
        user_id,
        image,
        text,
      },
    });
  }

  async delete({ post_id }: DeletePostDto): Promise<void> {
    await this.prisma.post.delete({
      where: { id: post_id },
    });
  }

  async findOne({ post_id }: FindOnePostDto): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { id: post_id },
    });

    return post;
  }

  async findMany({ page }: FindManyPostsDto): Promise<Post[]> {
    const skip = page === 1 ? 0 : page * 10;

    const posts = await this.prisma.post.findMany({
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
      skip,
      take: 10,
    });

    return posts;
  }
}
