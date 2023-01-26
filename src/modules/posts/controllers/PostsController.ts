import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePostUseCase } from '../use-cases/CreatePost';
import { DeletePostUseCase } from '../use-cases/DeletePost';
import { FindManyPostsUseCase } from '../use-cases/FindManyPosts';
import { FindOnePostUseCase } from '../use-cases/FindOnePost';

export class PostsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { text, image } = request.body;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    await createPostUseCase.execute({
      user_id,
      image,
      text,
    });

    return response.status(201).send();
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id: post_id } = request.params;

    const deletePostUseCase = container.resolve(DeletePostUseCase);

    await deletePostUseCase.execute({
      post_id,
      user_id,
    });

    return response.status(204).send();
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    const { id: post_id } = request.params;

    const findOnePostUseCase = container.resolve(FindOnePostUseCase);

    const post = await findOnePostUseCase.execute({
      post_id,
    });

    return response.json(post);
  }

  async findMany(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;

    const findManyPostsUseCase = container.resolve(FindManyPostsUseCase);

    const posts = await findManyPostsUseCase.execute({
      page: Number(page),
    });

    return response.json(posts);
  }
}
