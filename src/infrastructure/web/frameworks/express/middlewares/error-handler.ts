import { Request, Response, NextFunction } from 'express';

import { FailResponse } from '@common/contracts';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(err.status || 500);
  res.send(
    FailResponse.create({
      msg: err.msg || err.message || 'No MSG',
      reason: err.reason || err.stack || 'Something went wrong',
      url: req.originalUrl,
      ip: req.ip,
      validationErrors: err.validationErrors
    })
  );
}
