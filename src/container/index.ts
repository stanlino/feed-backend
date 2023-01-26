import { container } from 'tsyringe';

import { IPostsRepository } from '../modules/posts/repositories/IPostsRepository';
import { PrismaPostsRepository } from '../modules/posts/repositories/prisma/PrismaPostsRepository';
import { IProfilesRepository } from '../modules/profiles/repositories/IProfilesRepository';
import { PrismaProfilesRepository } from '../modules/profiles/repositories/prisma/PrismaProfilesRepository';
import { IRefreshTokensRepository } from '../modules/users/repositories/IRefreshTokensRepository';
import { IUsersRepository } from '../modules/users/repositories/IUsersRepository';
import { PrismaRefreshTokensRepository } from '../modules/users/repositories/prisma/PrismaRefreshTokensRepository';
import { PrismaUserRepository } from '../modules/users/repositories/prisma/PrismaUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUserRepository,
);

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  PrismaRefreshTokensRepository,
);

container.registerSingleton<IProfilesRepository>(
  'ProfilesRepository',
  PrismaProfilesRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PrismaPostsRepository,
);
