import type { NextFunction, Request, Response } from 'express';

export function timeLogMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();

  next();

  const end = Date.now();
  console.log(`Tempo: ${((end - start) / 1000).toString()} segundos`);
}
