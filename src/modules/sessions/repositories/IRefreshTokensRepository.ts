import { CreateRefreshTokenDto } from "../dtos/createRefreshToken";
import { RefreshToken } from "../entities/RefreshToken";

export interface IRefreshTokensRepository {
  create(createRefreshTokenDto: CreateRefreshTokenDto): Promise<void>
  findByToken(token: string): Promise<RefreshToken | undefined>
  delete(id: string): Promise<void>
}