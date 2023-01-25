import { beforeEach, describe, expect, it } from 'vitest';
import { ZodError } from 'zod';

import { Exception } from '../../../errors/Exception';
import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsersRepository';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { CreateUserUseCase } from './CreateUser';

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able create a user', () => {
    expect(async () => {
      await createUserUseCase.execute({
        username: 'Stanley',
        password: '12345678',
      });
    }).toBeTruthy();
  });

  it('should not be able create a user with username length < 2', () => {
    expect(async () => {
      await createUserUseCase.execute({
        username: 'S',
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able create a user with password length < 8', () => {
    expect(async () => {
      await createUserUseCase.execute({
        username: 'Stanley',
        password: '1234567',
      });
    }).rejects.toBeInstanceOf(ZodError);
  });

  it('should not be able create a user with username already in use', async () => {
    await createUserUseCase.execute({
      username: 'Stanley',
      password: '12345678',
    });

    expect(async () => {
      await createUserUseCase.execute({
        username: 'Stanley',
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(Exception);
  });
});
