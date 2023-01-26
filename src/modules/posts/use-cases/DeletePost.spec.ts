import { beforeAll, describe, expect, it } from 'vitest';

import { Exception } from '../../../errors/Exception';
import { InMemoryPostsRepository } from '../repositories/in-memory/InMemoryPostsRepository';
import { IPostsRepository } from '../repositories/IPostsRepository';
import { DeletePostUseCase } from './DeletePost';

let inMemoryPostsRepository: IPostsRepository;
let deletePostUseCase: DeletePostUseCase;

describe('Delete post use case', () => {
  beforeAll(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository([
      {
        balance: 0,
        createdAt: new Date(),
        id: '123',
        image: null,
        text: 'Olá mundo',
        user_id: '123',
      },
    ]);
    deletePostUseCase = new DeletePostUseCase(inMemoryPostsRepository);
  });

  it('should be able to delete a post', async () => {
    await deletePostUseCase.execute({
      post_id: '123',
    });

    const posts = await inMemoryPostsRepository.findMany({ page: 1 });

    expect(posts[0]).toBeFalsy();
  });

  it('should not be able to delete a nonexistent post', () => {
    expect(async () => {
      await deletePostUseCase.execute({
        post_id: '123',
      });
    }).rejects.toBeInstanceOf(Exception);
  });
});
