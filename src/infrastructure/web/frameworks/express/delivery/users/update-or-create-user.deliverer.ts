import { Request, Response, NextFunction } from 'express';

import { UpdateOrCreateUserController } from '../../../../../../adapters/controllers/users';
import { UsersRepositoryFactory } from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';
import { updateOrCreateUserValidator } from '../../../../validators/use-cases/users';

import { Deliverer } from '../interfaces';

export default class UpdateOrCreateUserDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const usersRepositoryFactory = new UsersRepositoryFactory();
    const usersRepository = usersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const createdResponder = new CreatedResponder(this.res);

    const updateOrCreateUserController = new UpdateOrCreateUserController(
      usersRepository,
      createdResponder,
      updateOrCreateUserValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await updateOrCreateUserController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
