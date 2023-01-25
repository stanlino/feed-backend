import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '../use-cases/AuthenticateUser';
import { RefreshTokenUseCase } from '../use-cases/RefreshToken';

export class AuthController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { access_token, refresh_token } =
      await authenticateUserUseCase.execute({
        username,
        password,
      });

    return response.status(200).json({
      access_token,
      refresh_token,
    });
  }

  async refreshToken(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const { access_token, refresh_token } = await refreshTokenUseCase.execute({
      token,
    });

    return response.status(200).json({
      access_token,
      refresh_token,
    });
  }
}
