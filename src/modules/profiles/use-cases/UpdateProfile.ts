import { inject, injectable } from 'tsyringe';

import { Exception } from '../../../errors/Exception';
import {
  UpdateProfileDto,
  updateProfileSchema,
} from '../dtos/updateProfileDto';
import { IProfilesRepository } from '../repositories/IProfilesRepository';

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('ProfilesRepository')
    private readonly profilesRepository: IProfilesRepository,
  ) {}

  async execute(updateProfileDto: UpdateProfileDto): Promise<void> {
    const profileProps = updateProfileSchema.parse(updateProfileDto);

    const profile = await this.profilesRepository.findById(
      profileProps.user_id,
    );

    if (!profile) throw new Exception('User not exists!', 404);

    await this.profilesRepository.update(profileProps);
  }
}
