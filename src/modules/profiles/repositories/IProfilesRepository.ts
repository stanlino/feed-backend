import { CreateProfileDto } from '../dtos/createProfileDto';
import { DeleteProfileDto } from '../dtos/deleteProfileDto';
import { UpdateProfileDto } from '../dtos/updateProfileDto';
import { Profile } from '../entities/Profile';

export interface IProfilesRepository {
  create: (createProfileDto: CreateProfileDto) => Promise<void>;
  findByUsername: (username: string) => Promise<Profile | null>;
  findById: (user_id: string) => Promise<Profile | null>;
  update: (updateProfileDto: UpdateProfileDto) => Promise<void>;
  delete: (deleteProfileDto: DeleteProfileDto) => Promise<void>;
}
