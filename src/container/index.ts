import { container } from "tsyringe";

import { IRefreshTokensRepository } from "../modules/users/repositories/IRefreshTokensRepository";
import { IUsersRepository } from "../modules/users/repositories/IUsersRepository";
import { PrismaRefreshTokensRepository } from "../modules/users/repositories/prisma/PrismaRefreshTokensRepository";
import { PrismaUserRepository } from "../modules/users/repositories/prisma/PrismaUsersRepository";

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUserRepository
)

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  PrismaRefreshTokensRepository
)