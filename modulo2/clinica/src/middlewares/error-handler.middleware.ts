import type { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  console.log('Error handler', err);

  res.status(500).json({
    message: 'Internal server error',
  });
}
