import { User } from '../entities/User'

export interface IUsersRepository {
  findOne(username: string): Promise<User | undefined>
}