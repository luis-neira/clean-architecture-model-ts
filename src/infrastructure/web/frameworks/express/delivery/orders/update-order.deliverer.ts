import { Request, Response, NextFunction } from 'express';

import { UpdateOrderController } from '../../../../../../adapters/controllers/orders';
import {
  UsersRepositoryFactory,
  ProductsRepositoryFactory,
  OrdersRepositoryFactory
} from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class UpdateOrderDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const usersRepositoryFactory = new UsersRepositoryFactory();
    const usersRepository = usersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const productsRepositoryFactory = new ProductsRepositoryFactory();
    const productsRepository = productsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const ordersRepositoryFactory = new OrdersRepositoryFactory();
    const ordersRepository = ordersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const repositoryDictionary = {
      orders: ordersRepository,
      users: usersRepository,
      products: productsRepository
    };

    const createdResponder = new CreatedResponder(this.res);

    const updateOrderController = new UpdateOrderController(
      repositoryDictionary,
      createdResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await updateOrderController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
