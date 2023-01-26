import { inject, injectable } from 'tsyringe';

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

    await this.profilesRepository.update(profileProps);
  }
}
