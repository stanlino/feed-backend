import { Exception } from "../../../errors/Exception";
import { DeleteUserDto, deleteUserSchema } from "../dtos/deleteUserDto";
import { User } from "../entities/User";
import { IUsersRepository } from "../repositories/IUsersRepository";

export class DeleteUserUseCase {

  constructor(private usersRepository: IUsersRepository) {}

  async execute(deleteUserDto: DeleteUserDto): Promise<void> {

    const { id } = deleteUserSchema.parse(deleteUserDto)

    const user = await this.usersRepository.findById(id)

    if (!user) throw new Exception('User not exists!', 404)

    await this.usersRepository.delete(id)
  } 
}