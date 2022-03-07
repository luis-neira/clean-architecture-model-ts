import { Request, Response, NextFunction } from 'express';

import { GetCustomersController } from '../../../../../../adapters/controllers/management';
import { CustomersRepositoryFactory } from '../../../../../database/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetCustomersDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const customersRepositoryFactory = new CustomersRepositoryFactory();

    const customersRepository = customersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const okResponder = new OkResponder(this.res);

    const getCustomersController = new GetCustomersController(
      customersRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getCustomersController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
