import { Request, Response, NextFunction } from 'express';

import { UpdateUserController } from '@adapters/controllers/users';
import { UsersRepositoryFactory } from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';
import { updateUserValidator } from '../../../../validators/use-cases/users';

import { Deliverer } from '../interfaces';

export default class UpdateUserDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const usersRepositoryFactory = new UsersRepositoryFactory();
    const usersRepository = usersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const createdResponder = new CreatedResponder(this.res);

    const updateUserController = new UpdateUserController(
      usersRepository,
      createdResponder,
      updateUserValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await updateUserController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
