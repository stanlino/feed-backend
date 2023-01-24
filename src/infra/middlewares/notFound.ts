import { NextFunction, Request, Response } from 'express';

export function notFound(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  response.redirect('/api-docs');
}
