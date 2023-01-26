import { beforeEach, describe, expect, it } from 'vitest';

import { Exception } from '../../../errors/Exception';
import { InMemoryProfilesRepository } from '../repositories/in-memory/InMemoryProfilesRepository';
import { IProfilesRepository } from '../repositories/IProfilesRepository';
import { CreateProfileUseCase } from './CreateProfile';

let profilesRepository: IProfilesRepository;
let createProfileUseCase: CreateProfileUseCase;

describe('Create profile use case', () => {
  beforeEach(() => {
    profilesRepository = new InMemoryProfilesRepository();
    createProfileUseCase = new CreateProfileUseCase(profilesRepository);
  });

  it('should be able to create a user profile', () => {
    expect(async () => {
      await createProfileUseCase.execute({
        user_id: '123',
        avatar: null,
        bio: null,
        link: null,
        name: 'stanley',
      });
    }).toBeTruthy();
  });

  it('should not be able to create an existing profile', async () => {
    await createProfileUseCase.execute({
      user_id: '123',
      avatar: null,
      bio: null,
      link: null,
      name: 'stanley',
    });

    expect(async () => {
      await createProfileUseCase.execute({
        user_id: '123',
        avatar: null,
        bio: null,
        link: null,
        name: 'stanley',
      });
    }).rejects.toBeInstanceOf(Exception);
  });
});
