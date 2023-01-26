import { Request, Response, NextFunction } from 'express';

import { DeleteOrderController } from '@adapters/controllers/orders';
import { OrdersRepositoryFactory } from '../../../../../database/repositories';
import { NoContentResponder } from '../../../../responders/express/users';
import { deleteOrderByIdValidator } from '../../../../validators/use-cases/orders';

import { Deliverer } from '../interfaces';

export default class DeleteOrderDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ordersRepositoryFactory = new OrdersRepositoryFactory();
    const ordersRepository = ordersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const noContentResponder = new NoContentResponder(this.res);

    const deleteOrderController = new DeleteOrderController(
      ordersRepository,
      noContentResponder,
      deleteOrderByIdValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await deleteOrderController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
