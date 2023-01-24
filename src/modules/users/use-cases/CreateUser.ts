import { Exception } from "../../../errors/Exception";
import { CreateUserDto, createUserSchema } from "../dtos/createUserDto";
import { IUsersRepository } from "../repositories/IUsersRepository";

export class CreateUserUseCase {

  constructor(private usersRepository: IUsersRepository) {}

  async execute(createUserDto: CreateUserDto) {
    const { username } = createUserSchema.parse(createUserDto)

    const userAlreadyExists = await this.usersRepository.findOne(username)

    if (userAlreadyExists) throw new Exception('User already exists')

    await this.usersRepository.create(createUserDto)
  } 
}