import { beforeAll, describe, expect, it } from 'vitest';
import { ZodError } from 'zod';

import { InMemoryPostsRepository } from '../repositories/in-memory/InMemoryPostsRepository';
import { IPostsRepository } from '../repositories/IPostsRepository';
import { FindManyPostsUseCase } from './FindManyPosts';

let inMemoryPostsRepository: IPostsRepository;
let findManyPostUseCase: FindManyPostsUseCase;

describe('Find many posts use case', () => {
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
    findManyPostUseCase = new FindManyPostsUseCase(inMemoryPostsRepository);
  });

  it('should be able to find the first page of posts', async () => {
    const posts = await findManyPostUseCase.execute({
      page: 1,
    });

    expect(posts).length(1);
  });

  it('should not be able to find the page zero of posts', () => {
    expect(async () => {
      await findManyPostUseCase.execute({
        page: 0,
      });
    }).rejects.toBeInstanceOf(ZodError);
  });
});
