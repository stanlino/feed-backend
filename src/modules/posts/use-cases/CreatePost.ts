import { inject, injectable } from 'tsyringe';

import { Exception } from '../../../errors/Exception';
import { CreatePostDto, createPostSchema } from '../dtos/createPostDto';
import { IPostsRepository } from '../repositories/IPostsRepository';

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject('PostsRepository')
    private readonly postsRepository: IPostsRepository,
  ) {}

  async execute(createPostDto: CreatePostDto): Promise<void> {
    const { user_id, image, text } = createPostSchema.parse(createPostDto);

    if (!image && !text) throw new Exception('Post must have image or text');

    await this.postsRepository.create({
      user_id,
      image,
      text,
    });
  }
}
