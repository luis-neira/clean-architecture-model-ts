import { Request, Response, NextFunction } from 'express';

import { GetUserByIdController } from '@adapters/controllers/users';
import { UsersRepositoryFactory } from '../../../../../database/repositories';
import { OkResponder } from '../../../../responders/express/users';
import { getUserByIdValidator } from '../../../../validators/use-cases/users';

import { Deliverer } from '../interfaces';

export default class GetUserByIdDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const usersRepositoryFactory = new UsersRepositoryFactory();
    const usersRepository = usersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const okResponder = new OkResponder(this.res);

    const getUserByIdController = new GetUserByIdController(
      usersRepository,
      okResponder,
      getUserByIdValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getUserByIdController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
