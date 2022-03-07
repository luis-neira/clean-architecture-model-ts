import { Request, Response, NextFunction } from 'express';

export default function errorLogger(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // log if error is not http-error with status property.
  if (!err.status) {
    //@ts-ignore
    req.log.error({ err }, 'Internal server error');
  }

  next(err);
}
