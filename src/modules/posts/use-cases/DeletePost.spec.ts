import { beforeEach, describe, expect, it } from 'vitest';

import { Exception } from '../../../errors/Exception';
import { InMemoryPostsRepository } from '../repositories/in-memory/InMemoryPostsRepository';
import { IPostsRepository } from '../repositories/IPostsRepository';
import { DeletePostUseCase } from './DeletePost';

let inMemoryPostsRepository: IPostsRepository;
let deletePostUseCase: DeletePostUseCase;

describe('Delete post use case', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository([
      {
        balance: 0,
        created_at: new Date(),
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
      user_id: '123',
    });

    const posts = await inMemoryPostsRepository.findMany({ page: 1 });

    expect(posts[0]).toBeFalsy();
  });

  it('should not be able to delete a nonexistent post', () => {
    expect(async () => {
      await deletePostUseCase.execute({
        post_id: '321',
        user_id: '123',
      });
    }).rejects.toBeInstanceOf(Exception);
  });

  it('should not be able to delete a another user`s post', () => {
    expect(async () => {
      await deletePostUseCase.execute({
        post_id: '123',
        user_id: '321',
      });
    }).rejects.toBeInstanceOf(Exception);
  });
});
