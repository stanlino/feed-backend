import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { Exception } from '../../errors/Exception';

export function expressAsyncErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (error instanceof Exception) {
    return response.status(error.statusCode).json(error);
  }

  if (error instanceof ZodError) {
    return response.status(400).json(error);
  }

  return response.status(400).json(error);
}
