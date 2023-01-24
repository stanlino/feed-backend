import { Exception } from "../../../errors/Exception";
import { CreateUserDto, createUserSchema } from "../dtos/createUserDto";
import { IUsersRepository } from "../repositories/IUsersRepository";

export class CreateUserUseCase {

  constructor(private usersRepository: IUsersRepository) {}

  async execute(createUserDto: CreateUserDto) {
    const { username } = createUserSchema.parse(createUserDto)

    const user = await this.usersRepository.findByUsername(username)

    if (user) throw new Exception('User already exists')

    await this.usersRepository.create(createUserDto)
  } 
}