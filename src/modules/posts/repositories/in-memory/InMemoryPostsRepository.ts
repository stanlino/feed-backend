import { randomUUID } from 'crypto';

import { CreatePostDto } from '../../dtos/createPostDto';
import { DeletePostDto } from '../../dtos/deletePostDto';
import { FindManyPostsDto } from '../../dtos/findManyPostsDto';
import { FindOnePostDto } from '../../dtos/findOnePostDto';
import { Post } from '../../entities/Post';
import { IPostsRepository } from '../IPostsRepository';

export class InMemoryPostsRepository implements IPostsRepository {
  private readonly posts: Post[];

  constructor(initialProps: Post[] = []) {
    this.posts = initialProps;
  }

  async create({
    user_id,
    image = null,
    text = null,
  }: CreatePostDto): Promise<void> {
    this.posts.push({
      id: randomUUID(),
      balance: 0,
      createdAt: new Date(),
      image,
      text,
      user_id,
    });
  }

  async delete({ post_id }: DeletePostDto): Promise<void> {
    const postIndex = this.posts.findIndex(post => post.id === post_id);

    this.posts.splice(postIndex, 1);
  }

  async findOne({ post_id }: FindOnePostDto): Promise<Post | null> {
    const post = this.posts.find(item => item.id === post_id);

    if (!post) return null;

    return post;
  }

  async findMany({ page }: FindManyPostsDto): Promise<Post[]> {
    const slice = page === 1 ? 0 : 10;

    return this.posts.slice(page * slice);
  }
}
