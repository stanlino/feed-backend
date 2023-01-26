import { inject, injectable } from 'tsyringe';

import { Exception } from '../../../errors/Exception';
import {
  CreateProfileDto,
  createProfileSchema,
} from '../dtos/createProfileDto';
import { IProfilesRepository } from '../repositories/IProfilesRepository';

@injectable()
export class CreateProfileUseCase {
  constructor(
    @inject('ProfilesRepository')
    private readonly profilesRepository: IProfilesRepository,
  ) {}

  async execute(createProfileDto: CreateProfileDto): Promise<void> {
    const { user_id, avatar, bio, link, name } =
      createProfileSchema.parse(createProfileDto);

    const profile = await this.profilesRepository.findOne({ user_id });

    if (profile) throw new Exception('Profile already created!');

    await this.profilesRepository.create({
      user_id,
      avatar,
      bio,
      link,
      name,
    });
  }
}
