import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";
import { Exception } from "../../../errors/Exception";
import { CreateUserDto, createUserSchema } from "../dtos/createUserDto";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const { username, password } = createUserSchema.parse(createUserDto)

    const user = await this.usersRepository.findOne(username)

    if (user) throw new Exception('User already exists')

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      username,
      password: passwordHash
    })
  } 
}