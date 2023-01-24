import { verify, sign } from "jsonwebtoken";
import { Exception } from "../../../errors/Exception";
import { RefreshTokenDto, refreshTokenSchema } from "../dtos/refreshTokenDto";
import { IRefreshTokensRepository } from "../repositories/IRefreshTokensRepository";
import { verifyToken } from "../utils/verifyToken";

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

export class RefreshTokenUseCase {

  constructor(
    private refreshTokensRepository: IRefreshTokensRepository
  ) {}

  async execute(refreshTokenDto: RefreshTokenDto): Promise<IResponse> {
    const { token } = refreshTokenSchema.parse(refreshTokenDto)

    const { sub: user_id } = await verifyToken(token)

    const savedToken = await this.refreshTokensRepository.findByToken(token)

    if (!savedToken) throw new Exception('Invalid refresh token!')

    await this.refreshTokensRepository.delete(savedToken.id)

    const access_token = sign({}, ACCESS_TOKEN_SIGNATURE, {
      subject: user_id,
      expiresIn: ACESS_TOKEN_EXPIRES_IN
    })

    const refresh_token = sign({}, REFRESH_TOKEN_SIGNATURE, {
      subject: user_id,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN
    })

    await this.refreshTokensRepository.create({
      token: refresh_token,
      user_id
    })

    return {
      access_token,
      refresh_token
    }
  }
}