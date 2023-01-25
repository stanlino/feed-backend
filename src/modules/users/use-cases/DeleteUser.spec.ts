import { beforeEach, describe, expect, it } from 'vitest';

import { Exception } from '../../../errors/Exception';
import { InMemoryRefreshTokensRepository } from '../repositories/in-memory/InMemoryRefreshTokensRepository';
import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsersRepository';
import { IRefreshTokensRepository } from '../repositories/IRefreshTokensRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { DeleteUserUseCase } from './DeleteUser';

let usersRepository: IUsersRepository;
let refreshTokensRepository: IRefreshTokensRepository;
let deleteUserUseCase: DeleteUserUseCase;

describe('Find all users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository([
      {
        id: '123',
        username: 'Stanley',
        password: '12345678',
      },
    ]);
    refreshTokensRepository = new InMemoryRefreshTokensRepository([
      {
        id: '123',
        token: 'bla',
        user_id: '123',
      },
    ]);
    deleteUserUseCase = new DeleteUserUseCase(
      usersRepository,
      refreshTokensRepository,
    );
  });

  it('should be able delete a user', () => {
    expect(async () => {
      await deleteUserUseCase.execute({
        id: '123',
      });
    }).toBeTruthy();
  });

  it('should not be able to delete a non-existent user', async () => {
    expect(async () => {
      await deleteUserUseCase.execute({ id: '000' });
    }).rejects.toBeInstanceOf(Exception);
  });

  it('should be able delete all users tokens', async () => {
    await deleteUserUseCase.execute({
      id: '123',
    });

    const token = await refreshTokensRepository.findByToken('123');

    expect(token).toBeNull();
  });
});
