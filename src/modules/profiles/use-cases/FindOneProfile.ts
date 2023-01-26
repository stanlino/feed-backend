import { inject, injectable } from 'tsyringe';

import { Exception } from '../../../errors/Exception';
import {
  FindOneProfileDto,
  findOneProfileSchema,
} from '../dtos/findOneProfileDto';
import { Profile } from '../entities/Profile';
import { IProfilesRepository } from '../repositories/IProfilesRepository';

@injectable()
export class FindOneProfileUseCase {
  constructor(
    @inject('ProfilesRepository')
    private readonly profilesRepository: IProfilesRepository,
  ) {}

  async execute(findOneProfileDto: FindOneProfileDto): Promise<Profile> {
    const { user_id } = findOneProfileSchema.parse(findOneProfileDto);

    const profile = await this.profilesRepository.findOne({ user_id });

    if (!profile) throw new Exception('Profile not exists!', 404);

    return profile;
  }
}
