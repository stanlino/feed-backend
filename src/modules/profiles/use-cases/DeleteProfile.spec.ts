import { beforeEach, describe, expect, it } from 'vitest';

import { Exception } from '../../../errors/Exception';
import { InMemoryProfilesRepository } from '../repositories/in-memory/InMemoryProfilesRepository';
import { IProfilesRepository } from '../repositories/IProfilesRepository';
import { DeleteProfileUseCase } from './DeleteProfile';

let profilesRepository: IProfilesRepository;
let deleteProfileUseCase: DeleteProfileUseCase;

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
    deleteProfileUseCase = new DeleteProfileUseCase(profilesRepository);
  });

  it('should be able to delete a profile', () => {
    expect(async () => {
      await deleteProfileUseCase.execute({
        user_id: '123',
      });
    }).toBeTruthy();
  });

  it('should be able to delete an nonexistent profile', () => {
    expect(async () => {
      await deleteProfileUseCase.execute({
        user_id: '321',
      });
    }).rejects.toBeInstanceOf(Exception);
  });
});
