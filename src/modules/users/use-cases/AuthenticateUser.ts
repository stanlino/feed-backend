import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Exception } from "../../../errors/Exception";
import { AuthenticateUserDto, authenticateUserSchema } from "../dtos/authenticateUserDto";
import { IRefreshTokensRepository } from "../../users/repositories/IRefreshTokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";

interface IResponse {
  access_token: string
  refresh_token: string
}

const { 
  ACCESS_TOKEN_SIGNATURE,
  ACESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SIGNATURE,
  REFRESH_TOKEN_EXPIRES_IN
} = process.env

@injectable()
export class AuthenticateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository, 
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository
  ) {}

  async execute(authenticateUserDto: AuthenticateUserDto): Promise<IResponse> {
    const { username, password } = authenticateUserSchema.parse(authenticateUserDto)

    const user = await this.usersRespository.findOne(username)

    if (!user) throw new Exception('User not exists!', 404)

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new Exception('Incorrect credentials!')

    const access_token = sign({}, ACCESS_TOKEN_SIGNATURE, {
      subject: user.id,
      expiresIn: ACESS_TOKEN_EXPIRES_IN
    })

    const refresh_token = sign({}, REFRESH_TOKEN_SIGNATURE, {
      subject: user.id,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN
    })

    await this.refreshTokensRepository.create({
      token: refresh_token,
      user_id: user.id
    })

    return {
      access_token,
      refresh_token
    }
  }
}