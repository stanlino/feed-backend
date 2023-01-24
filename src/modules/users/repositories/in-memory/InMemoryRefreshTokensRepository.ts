import { randomUUID } from "crypto";
import { CreateRefreshTokenDto } from "../../dtos/createRefreshToken";
import { RefreshToken } from "../../entities/RefreshToken";
import { IRefreshTokensRepository } from "../IRefreshTokensRepository";

export class InMemoryRefreshTokensRepository implements IRefreshTokensRepository {
  private refreshTokens: RefreshToken[]

  constructor(initialProps: RefreshToken[] = []) {
    this.refreshTokens = initialProps
  }

  async create(createRefreshTokenDto: CreateRefreshTokenDto): Promise<void> {
    this.refreshTokens.push({
      id: randomUUID(),
      ...createRefreshTokenDto
    })
  }

  async findByToken(token: string): Promise<RefreshToken | undefined> {
    return this.refreshTokens.find(refreshToken => refreshToken.token === token)
  }

  async delete(id: string): Promise<void> {
    const refreshTokenIndex = this.refreshTokens.findIndex(refreshToken => refreshToken.id === id)

    this.refreshTokens.splice(refreshTokenIndex, 1)
  }

}