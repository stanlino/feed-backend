import { beforeEach, describe, expect, it } from "vitest"
import { Exception } from "../../../errors/Exception"
import { InMemoryUsersRepository } from "../repositories/in-memory/InMemoryUsersRepository"
import { IUsersRepository } from "../repositories/IUsersRepository"
import { DeleteUserUseCase } from "./DeleteUser"

let usersRepository: IUsersRepository
let deleteUserUseCase: DeleteUserUseCase

describe('Find all users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository([{
      id: '123',
      username: 'Stanley',
      password: '12345678'
    }])
    deleteUserUseCase = new DeleteUserUseCase(usersRepository)
  })

  it('should be able delete a user', () => {
    expect(async () => {
      await deleteUserUseCase.execute({
        id: '123'
      })
    }).toBeTruthy()
  }) 

  it('should not be able to delete a non-existent user', async () => {
    expect(async () => {
      await deleteUserUseCase.execute({ id: '000' })
    }).rejects.toBeInstanceOf(Exception)
  })
})