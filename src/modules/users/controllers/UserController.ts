import { container } from 'tsyringe'
import { Request, Response } from "express";
import { CreateUserUseCase } from '../use-cases/CreateUser';
import { DeleteUserUseCase } from '../use-cases/DeleteUser';

export class UserController {
  
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      username,
      password
    })

    return response.status(201).send()
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const deleteUserUseCase = container.resolve(DeleteUserUseCase)

    await deleteUserUseCase.execute({
      id
    })

    return response.status(204).send()
  }
}