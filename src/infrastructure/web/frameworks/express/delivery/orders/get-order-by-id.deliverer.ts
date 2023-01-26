import { Request, Response, NextFunction } from 'express';

import { GetOrderByIdController } from '@adapters/controllers/orders';
import { OrdersRepositoryFactory } from '../../../../../database/repositories';
import { OkResponder } from '../../../../responders/express/users';
import { getOrderByIdValidator } from '../../../../validators/use-cases/orders';

import { Deliverer } from '../interfaces';

export default class GetOrderByIdDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ordersRepositoryFactory = new OrdersRepositoryFactory();
    const ordersRepository = ordersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const okResponder = new OkResponder(this.res);

    const getOrderByIdController = new GetOrderByIdController(
      ordersRepository,
      okResponder,
      getOrderByIdValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getOrderByIdController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
