import { inject, injectable } from 'tsyringe';

import { Exception } from '../../../errors/Exception';
import {
  DeleteProfileDto,
  deleteProfileSchema,
} from '../dtos/deleteProfileDto';
import { IProfilesRepository } from '../repositories/IProfilesRepository';

@injectable()
export class DeleteProfileUseCase {
  constructor(
    @inject('ProfilesRepository')
    private readonly profilesRepository: IProfilesRepository,
  ) {}

  async execute(deleteProfileDto: DeleteProfileDto): Promise<void> {
    const { user_id } = deleteProfileSchema.parse(deleteProfileDto);

    const profile = await this.profilesRepository.findById(user_id);

    if (!profile) throw new Exception('Profile not exists!', 404);

    await this.profilesRepository.delete({ user_id });
  }
}
