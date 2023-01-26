import { Request, Response, NextFunction } from 'express';

import { DeleteUserController } from '@adapters/controllers/users';
import { UsersRepositoryFactory } from '../../../../../database/repositories';
import { NoContentResponder } from '../../../../responders/express/users';
import { deleteUserByIdValidator } from '../../../../validators/use-cases/users';

import { Deliverer } from '../interfaces';

export default class DeleteUserDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const usersRepositoryFactory = new UsersRepositoryFactory();
    const usersRepository = usersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const noContentResponder = new NoContentResponder(this.res);

    const deleteUserController = new DeleteUserController(
      usersRepository,
      noContentResponder,
      deleteUserByIdValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await deleteUserController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
