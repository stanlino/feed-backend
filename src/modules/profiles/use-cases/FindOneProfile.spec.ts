import { beforeEach, describe, expect, it } from 'vitest';

import { Exception } from '../../../errors/Exception';
import { InMemoryProfilesRepository } from '../repositories/in-memory/InMemoryProfilesRepository';
import { IProfilesRepository } from '../repositories/IProfilesRepository';
import { FindOneProfileUseCase } from './FindOneProfile';

let profilesRepository: IProfilesRepository;
let findOneProfileUseCase: FindOneProfileUseCase;

describe('Create profile use case', () => {
  beforeEach(() => {
    profilesRepository = new InMemoryProfilesRepository([
      {
        user_id: '123',
        avatar: null,
        name: 'stanley',
        bio: null,
        link: null,
      },
    ]);
    findOneProfileUseCase = new FindOneProfileUseCase(profilesRepository);
  });

  it('should be able to find a profile', async () => {
    const user = await findOneProfileUseCase.execute({
      username: '123',
    });

    expect(user).toHaveProperty('user_id');
  });

  it('should not be able to find a nonexistent profile', () => {
    expect(async () => {
      await findOneProfileUseCase.execute({
        username: 'banana',
      });
    }).rejects.toBeInstanceOf(Exception);
  });
});
