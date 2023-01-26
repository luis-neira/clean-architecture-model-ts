import { Request, Response, NextFunction } from 'express';

import { AddOrderController } from '@adapters/controllers/orders';
import {
  UsersRepositoryFactory,
  ProductsRepositoryFactory,
  OrdersRepositoryFactory
} from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';
import { addOrderValidator } from '../../../../validators/use-cases/orders';

import { Deliverer } from '../interfaces';

export default class AddOrderDeliverer extends Deliverer {
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

    const addOrderController = new AddOrderController(
      repositoryDictionary,
      createdResponder,
      addOrderValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await addOrderController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
