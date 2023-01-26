import { inject, injectable } from 'tsyringe';

import {
  FindManyPostsDto,
  findManyPostsSchema,
} from '../dtos/findManyPostsDto';
import { Post } from '../entities/Post';
import { IPostsRepository } from '../repositories/IPostsRepository';

@injectable()
export class FindManyPostsUseCase {
  constructor(
    @inject('PostsRepository')
    private readonly postsRepository: IPostsRepository,
  ) {}

  async execute(findManyPosts: FindManyPostsDto): Promise<Post[]> {
    const { page } = findManyPostsSchema.parse(findManyPosts);

    const posts = await this.postsRepository.findMany({ page });

    return posts;
  }
}
