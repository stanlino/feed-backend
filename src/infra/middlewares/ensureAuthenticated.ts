import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, verify } from 'jsonwebtoken';

import { Exception } from '../../errors/Exception';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Exception('Access token missing!', 401);
  }

  const [_, token] = authorization.split(' ');

  try {
    const { sub } = verify(token, process.env.ACCESS_TOKEN_SIGNATURE);

    request.user = {
      id: String(sub),
    };

    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw new Exception(err.message);
    }

    throw new Exception('Invalid access token!', 401);
  }
}
