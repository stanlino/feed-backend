import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryProfilesRepository } from '../repositories/in-memory/InMemoryProfilesRepository';
import { IProfilesRepository } from '../repositories/IProfilesRepository';
import { UpdateProfileUseCase } from './UpdateProfile';

let profilesRepository: IProfilesRepository;
let updateProfileUseCase: UpdateProfileUseCase;

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
    updateProfileUseCase = new UpdateProfileUseCase(profilesRepository);
  });

  it('should be able to update a profile name', async () => {
    await updateProfileUseCase.execute({
      user_id: '123',
      name: 'Jonas',
    });

    const profile = await profilesRepository.findOne({ user_id: '123' });
    expect(profile).property('name').equal('Jonas');
  });

  it('should be able to update a profile avatar', async () => {
    await updateProfileUseCase.execute({
      user_id: '123',
      avatar: 'avatar',
    });

    const profile = await profilesRepository.findOne({ user_id: '123' });
    expect(profile).property('avatar').equal('avatar');
  });

  it('should be able to update a profile name to null value', async () => {
    await updateProfileUseCase.execute({
      user_id: '123',
      name: null,
    });

    const profile = await profilesRepository.findOne({ user_id: '123' });
    expect(profile).property('name').equal(null);
  });
});
