import { PrismaClient } from '@prisma/client';

import { CreateProfileDto } from '../../dtos/createProfileDto';
import { DeleteProfileDto } from '../../dtos/deleteProfileDto';
import { UpdateProfileDto } from '../../dtos/updateProfileDto';
import { Profile } from '../../entities/Profile';
import { IProfilesRepository } from '../IProfilesRepository';

export class PrismaProfilesRepository implements IProfilesRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(createProfileDto: CreateProfileDto): Promise<void> {
    await this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  async findById(user_id: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        user_id,
      },
    });

    return profile;
  }

  async findByUsername(username: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findFirst({
      where: {
        user: {
          username,
        },
      },
    });

    return profile;
  }

  async update({
    user_id,
    avatar,
    bio,
    link,
    name,
  }: UpdateProfileDto): Promise<void> {
    await this.prisma.profile.update({
      where: {
        user_id,
      },
      data: {
        avatar,
        bio,
        link,
        name,
      },
    });
  }

  async delete({ user_id }: DeleteProfileDto): Promise<void> {
    await this.prisma.profile.delete({
      where: { user_id },
    });
  }
}
