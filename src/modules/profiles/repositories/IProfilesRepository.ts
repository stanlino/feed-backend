import { CreateProfileDto } from '../dtos/createProfileDto';
import { DeleteProfileDto } from '../dtos/deleteProfileDto';
import { FindOneProfileDto } from '../dtos/findOneProfileDto';
import { UpdateProfileDto } from '../dtos/updateProfileDto';
import { Profile } from '../entities/Profile';

export interface IProfilesRepository {
  create: (createProfileDto: CreateProfileDto) => Promise<void>;
  findOne: (findOneProfileDto: FindOneProfileDto) => Promise<Profile | null>;
  update: (updateProfileDto: UpdateProfileDto) => Promise<void>;
  delete: (deleteProfileDto: DeleteProfileDto) => Promise<void>;
}
