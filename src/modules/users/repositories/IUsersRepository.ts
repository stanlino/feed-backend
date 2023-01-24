import { CreateUserDto } from "../dtos/createUserDto";
import { User } from '../entities/User'

export interface IUsersRepository {
  create(createUserDto: CreateUserDto): Promise<void>
  findById(id: string): Promise<User | undefined>
  findByUsername(username: string): Promise<User | undefined>
  delete(id: string): Promise<void>
}