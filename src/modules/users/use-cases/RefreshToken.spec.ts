import { JsonWebTokenError } from "jsonwebtoken";
import { describe, beforeEach, it, expect } from "vitest";
import { Exception } from "../../../errors/Exception";

import { InMemoryRefreshTokensRepository } from "../../users/repositories/in-memory/InMemoryRefreshTokensRepository";
import { IRefreshTokensRepository } from "../../users/repositories/IRefreshTokensRepository";

import { RefreshTokenUseCase } from "./RefreshToken";

let refreshTokensRepository: IRefreshTokensRepository
let refreshTokenUseCase: RefreshTokenUseCase

describe('Authenticate user use case', () => {

  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository([
      {
        id: '123',
        token: 'blablabla',
        user_id: '123'
      }
    ])
    refreshTokenUseCase = new RefreshTokenUseCase(refreshTokensRepository)
  })

  it('should not be able refresh a acess token with a refresh_token with a invalid signature', async () => {
    expect(async () => {
      await refreshTokenUseCase.execute({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.qSxzXSZwDRsi3oqx3fBZ2ah8gOIsQZE0Lgkl0kjJ3Ko'
      })
    }).rejects.toBeInstanceOf(JsonWebTokenError)
  })

  it('should not be able refresh a access token with a non jwt', () => {
    expect(async () => {
      await refreshTokenUseCase.execute({
        token: 'blablabla'
      })
    }).rejects.toBeInstanceOf(JsonWebTokenError)
  })

})