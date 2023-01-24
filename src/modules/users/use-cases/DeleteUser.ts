import { injectable, inject } from "tsyringe";
import { Exception } from "../../../errors/Exception";
import { DeleteUserDto, deleteUserSchema } from "../dtos/deleteUserDto";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class DeleteUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(deleteUserDto: DeleteUserDto): Promise<void> {

    const { username } = deleteUserSchema.parse(deleteUserDto)

    const user = await this.usersRepository.findOne(username)

    if (!user) throw new Exception('User not exists!', 404)

    await this.usersRepository.delete(username)
  } 
}