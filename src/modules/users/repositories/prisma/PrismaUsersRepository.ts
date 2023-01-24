import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { CreateUserDto } from "../../dtos/createUserDto";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class PrismaUserRepository implements IUsersRepository {

  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async create({ username, password }: CreateUserDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: randomUUID(),
        username,
        password
      }
    })
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      }
    })

    return user
  }

  async delete(username: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        username
      }
    })
  }

}