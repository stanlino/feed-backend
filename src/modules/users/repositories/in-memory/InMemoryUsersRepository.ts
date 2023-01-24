import { randomUUID } from "crypto";
import { CreateUserDto } from "../../dtos/createUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {

  private users: User[]

  constructor() {
    this.users = []
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    this.users.push({
      id: randomUUID(),
      ...createUserDto
    })
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }
}