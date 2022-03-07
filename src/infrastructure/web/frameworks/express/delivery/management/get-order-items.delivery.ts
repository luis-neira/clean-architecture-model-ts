import { Request, Response, NextFunction } from 'express';

import { GetOrderItemsController } from '../../../../../../adapters/controllers/management';
import { OrderItemsRepositoryFactory } from '../../../../../database/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetOrderItemsDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const orderItemsRepositoryFactory = new OrderItemsRepositoryFactory();

    const ordersRepository = orderItemsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const okResponder = new OkResponder(this.res);

    const getOrderItemsController = new GetOrderItemsController(
      ordersRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getOrderItemsController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
