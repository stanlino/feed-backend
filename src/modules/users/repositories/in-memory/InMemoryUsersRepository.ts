import { randomUUID } from 'crypto';

import { CreateUserDto } from '../../dtos/createUserDto';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  private readonly users: User[];

  constructor(initialData: User[] = []) {
    this.users = initialData;
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    this.users.push({
      id: randomUUID(),
      ...createUserDto,
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) ?? null;
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);

    this.users.splice(userIndex, 1);
  }
}
