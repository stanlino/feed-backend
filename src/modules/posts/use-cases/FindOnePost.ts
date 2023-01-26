import { inject, injectable } from 'tsyringe';

import { Exception } from '../../../errors/Exception';
import { FindOnePostDto, findOnePostSchema } from '../dtos/findOnePostDto';
import { Post } from '../entities/Post';
import { IPostsRepository } from '../repositories/IPostsRepository';

@injectable()
export class FindOnePostUseCase {
  constructor(
    @inject('PostsRepository')
    private readonly postsRepository: IPostsRepository,
  ) {}

  async execute(findOnePostDto: FindOnePostDto): Promise<Post> {
    const { post_id } = findOnePostSchema.parse(findOnePostDto);

    const post = await this.postsRepository.findOne({ post_id });

    if (!post) throw new Exception('Post not exists!', 404);

    return post;
  }
}
