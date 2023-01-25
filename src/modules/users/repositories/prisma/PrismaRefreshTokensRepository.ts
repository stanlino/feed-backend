import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

import { CreateRefreshTokenDto } from '../../dtos/createRefreshToken';
import { RefreshToken } from '../../entities/RefreshToken';
import { IRefreshTokensRepository } from '../IRefreshTokensRepository';

export class PrismaRefreshTokensRepository implements IRefreshTokensRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({ token, user_id }: CreateRefreshTokenDto): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        id: randomUUID(),
        token,
        user_id,
      },
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        token,
      },
    });

    return refreshToken;
  }

  async deleteOne(id: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteMany(user_id: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        user_id,
      },
    });
  }
}
