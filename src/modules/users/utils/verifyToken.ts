import { JsonWebTokenError, verify } from 'jsonwebtoken';

import { Exception } from '../../../errors/Exception';

interface IPayload {
  sub: string;
}

export async function verifyToken(token: string): Promise<IPayload> {
  try {
    const payload = verify(
      token,
      process.env.REFRESH_TOKEN_SIGNATURE,
    ) as IPayload;

    return payload;
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw err;
    }

    throw new Exception('?', 500);
  }
}
