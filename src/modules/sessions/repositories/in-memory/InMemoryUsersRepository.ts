import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {

  private users: User[]

  constructor(initialData: User[] = []) {
    this.users = initialData
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }
}