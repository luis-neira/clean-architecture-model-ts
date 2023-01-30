import { RequestContext } from '@mikro-orm/core';
import type { MikroORM } from '@mikro-orm/core';
import { DatabaseClient } from '@infra/database/orm';

import { Request, Response, NextFunction } from 'express';

export default function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const databaseClient = DatabaseClient.getInstance();
  const orm = databaseClient.getConnection() as MikroORM;
  RequestContext.create(orm.em, next);
}
