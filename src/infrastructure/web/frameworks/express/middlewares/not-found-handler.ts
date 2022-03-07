import { Request, Response, NextFunction } from 'express';

import createHttpError from 'http-errors';

export default function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const notFound = createHttpError(404, 'Resouce not found');
  next(notFound);
}
