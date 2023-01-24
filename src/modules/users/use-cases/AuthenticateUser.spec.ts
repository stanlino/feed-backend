import { describe, beforeEach, it, expect } from "vitest";
import { Exception } from "../../../errors/Exception";

import { InMemoryRefreshTokensRepository } from "../../users/repositories/in-memory/InMemoryRefreshTokensRepository";
import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository";
import { IRefreshTokensRepository } from "../../users/repositories/IRefreshTokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUser";

let usersRepository: IUsersRepository
let refreshTokensRepository: IRefreshTokensRepository
let authenticateUserUseCase: AuthenticateUserUseCase

describe('Authenticate user use case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository([{
      id: '123',
      username: 'Stanley',
      password: '$2a$08$vVICRxUgVM8BKNLI2d1A4uWj30hv87UrcUluiTUlWC4PilY66pugS'
    }])
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, refreshTokensRepository)
  })

  it('should be able to authenticate a user', async () => {
    const { access_token, refresh_token } = await authenticateUserUseCase.execute({
      username: 'Stanley',
      password: '12345678'
    })

    expect(access_token).toBeTypeOf('string')
    expect(refresh_token).toBeTypeOf('string')
  })

  it('should not be able to authenticate a non-existent user',  () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        username: 'Jonas',
        password: '12345678'
      })
    }).rejects.toBeInstanceOf(Exception)
  })

  it('should not be able to authenticate a user with incorrect password', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        username: 'Stanley',
        password: '123456789'
      })
    }).rejects.toBeInstanceOf(Exception)
  })

})