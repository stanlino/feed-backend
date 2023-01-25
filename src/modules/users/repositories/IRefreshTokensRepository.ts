import { CreateRefreshTokenDto } from '../dtos/createRefreshToken';
import { RefreshToken } from '../entities/RefreshToken';

export interface IRefreshTokensRepository {
  create: (createRefreshTokenDto: CreateRefreshTokenDto) => Promise<void>;
  findByToken: (token: string) => Promise<RefreshToken | null>;
  deleteOne: (id: string) => Promise<void>;
  deleteMany: (user_id: string) => Promise<void>;
}
