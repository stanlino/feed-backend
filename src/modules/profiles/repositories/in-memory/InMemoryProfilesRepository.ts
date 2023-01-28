import { CreateProfileDto } from '../../dtos/createProfileDto';
import { DeleteProfileDto } from '../../dtos/deleteProfileDto';
import { UpdateProfileDto } from '../../dtos/updateProfileDto';
import { Profile } from '../../entities/Profile';
import { IProfilesRepository } from '../IProfilesRepository';

export class InMemoryProfilesRepository implements IProfilesRepository {
  private profiles: Profile[];

  constructor(initialProps: Profile[] = []) {
    this.profiles = initialProps;
  }

  async create({
    user_id,
    name = null,
    avatar = null,
    bio = null,
    link = null,
  }: CreateProfileDto): Promise<void> {
    this.profiles.push({
      user_id,
      name,
      avatar,
      bio,
      link,
    });
  }

  async findById(user_id: string): Promise<Profile | null> {
    return this.profiles.find(profile => profile.user_id === user_id) ?? null;
  }

  async findByUsername(username: string): Promise<Profile | null> {
    return this.profiles.find(profile => profile.user_id === username) ?? null;
  }

  async update(updateProfileDto: UpdateProfileDto): Promise<void> {
    const profileIndex = this.profiles.findIndex(
      profile => profile.user_id === updateProfileDto.user_id,
    );

    this.profiles[profileIndex] = {
      ...this.profiles[profileIndex],
      ...updateProfileDto,
    };
  }

  async delete({ user_id }: DeleteProfileDto): Promise<void> {
    const profileIndex = this.profiles.findIndex(
      profile => profile.user_id === user_id,
    );

    this.profiles.splice(profileIndex, 1);
  }
}
