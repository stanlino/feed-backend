import { inject, injectable } from 'tsyringe';

import { Exception } from '../../../errors/Exception';
import { DeletePostDto, deletePostSchema } from '../dtos/deletePostDto';
import { IPostsRepository } from '../repositories/IPostsRepository';

@injectable()
export class DeletePostUseCase {
  constructor(
    @inject('PostsRepository')
    private readonly postsRepository: IPostsRepository,
  ) {}

  async execute(deletePostDto: DeletePostDto): Promise<void> {
    const { post_id, user_id } = deletePostSchema.parse(deletePostDto);

    const post = await this.postsRepository.findOne({ post_id });

    if (!post) throw new Exception('Post not exists!', 404);

    if (post.user_id !== user_id)
      throw new Exception('This post cannot be deleted by you!', 401);

    await this.postsRepository.delete({ post_id, user_id });
  }
}
