import { Request, Response, NextFunction } from 'express';

import { GetUsersController } from '@adapters/controllers/users';
import { UsersRepositoryFactory } from '../../../../../database/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetUsersDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const usersRepositoryFactory = new UsersRepositoryFactory();
    const usersRepository = usersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const okResponder = new OkResponder(this.res);

    const getUsersController = new GetUsersController(
      usersRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getUsersController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
