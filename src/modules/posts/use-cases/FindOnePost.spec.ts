import { beforeAll, describe, expect, it } from 'vitest';

import { Exception } from '../../../errors/Exception';
import { InMemoryPostsRepository } from '../repositories/in-memory/InMemoryPostsRepository';
import { IPostsRepository } from '../repositories/IPostsRepository';
import { FindOnePostUseCase } from './FindOnePost';

let inMemoryPostsRepository: IPostsRepository;
let findOnePostUseCase: FindOnePostUseCase;

describe('Find one post use case', () => {
  beforeAll(() => {
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
    findOnePostUseCase = new FindOnePostUseCase(inMemoryPostsRepository);
  });

  it('should be able to find a post', async () => {
    const post = await findOnePostUseCase.execute({
      post_id: '123',
    });

    expect(post).toBeTruthy();
  });

  it('should not be able to find an nonexistent post', () => {
    expect(async () => {
      await findOnePostUseCase.execute({
        post_id: '321',
      });
    }).rejects.toBeInstanceOf(Exception);
  });
});
