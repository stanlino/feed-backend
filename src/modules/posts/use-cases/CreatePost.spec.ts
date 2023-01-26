import { beforeAll, describe, expect, it } from 'vitest';

import { InMemoryPostsRepository } from '../repositories/in-memory/InMemoryPostsRepository';
import { IPostsRepository } from '../repositories/IPostsRepository';
import { CreatePostUseCase } from './CreatePost';

let inMemoryPostsRepository: IPostsRepository;
let createPostUseCase: CreatePostUseCase;

describe('Create post use case', () => {
  beforeAll(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    createPostUseCase = new CreatePostUseCase(inMemoryPostsRepository);
  });

  it('should be able to create a new post', async () => {
    await createPostUseCase.execute({
      user_id: '123',
      text: 'olá mundo!',
    });

    const posts = await inMemoryPostsRepository.findMany({ page: 1 });

    expect(posts[0]).toBeTruthy();
  });
});
