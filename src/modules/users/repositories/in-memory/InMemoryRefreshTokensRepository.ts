import { randomUUID } from 'crypto';

import { CreateRefreshTokenDto } from '../../dtos/createRefreshToken';
import { RefreshToken } from '../../entities/RefreshToken';
import { IRefreshTokensRepository } from '../IRefreshTokensRepository';

export class InMemoryRefreshTokensRepository
  implements IRefreshTokensRepository
{
  private refreshTokens: RefreshToken[];

  constructor(initialProps: RefreshToken[] = []) {
    this.refreshTokens = initialProps;
  }

  async create(createRefreshTokenDto: CreateRefreshTokenDto): Promise<void> {
    this.refreshTokens.push({
      id: randomUUID(),
      ...createRefreshTokenDto,
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return (
      this.refreshTokens.find(refreshToken => refreshToken.token === token) ??
      null
    );
  }

  async deleteOne(id: string): Promise<void> {
    const refreshTokenIndex = this.refreshTokens.findIndex(
      refreshToken => refreshToken.id === id,
    );

    this.refreshTokens.splice(refreshTokenIndex, 1);
  }

  async deleteMany(user_id: string): Promise<void> {
    this.refreshTokens = this.refreshTokens.filter(
      refreshToken => refreshToken.user_id !== user_id,
    );
  }
}
