import { CreateUserDto } from "../dtos/createUserDto";
import { User } from '../entities/User'

export interface IUsersRepository {
  create(createUserDto: CreateUserDto): Promise<void>
  findOne(username: string): Promise<User>
}