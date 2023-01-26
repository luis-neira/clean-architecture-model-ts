import { Request, Response, NextFunction } from 'express';

import { GetOrdersController } from '@adapters/controllers/orders';
import { OrdersRepositoryFactory } from '../../../../../database/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetOrdersDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ordersRepositoryFactory = new OrdersRepositoryFactory();
    const ordersRepository = ordersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const okResponder = new OkResponder(this.res);

    const getOrdersController = new GetOrdersController(
      ordersRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getOrdersController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
