import { Request, Response, NextFunction } from 'express';

import { CreateOrderController } from '../../../../../../adapters/controllers/ingram';
import { IngramOrdersRepository } from '../../../../../external-service/ingram/repositories';
import {
  ItemsRepositoryFactory,
  CustomersRepositoryFactory,
  PurchaseOrdersRepositoryFactory,
  OrderItemsRepositoryFactory
} from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';
import { createOrderValidator } from '../../../../validators/use-cases/ingram-order-status';

import { Deliverer } from '../interfaces';

export default class CreateOrderDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ingramOrdersRepository = new IngramOrdersRepository();
    const itemsRepositoryFactory = new ItemsRepositoryFactory();
    const customersRepositoryFactory = new CustomersRepositoryFactory();
    const purchaseOrdersRepoFactory = new PurchaseOrdersRepositoryFactory();
    const orderItemsRepositoryFactory = new OrderItemsRepositoryFactory();

    const itemsRepository = itemsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const customersRepository = customersRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const purchaseOrderRepository = purchaseOrdersRepoFactory.create(
      process.env.DB_DIALECT!
    );

    const orderItemsRepository = orderItemsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const createdResponder = new CreatedResponder(this.res);

    const createOrderController = new CreateOrderController(
      ingramOrdersRepository,
      itemsRepository,
      customersRepository,
      purchaseOrderRepository,
      orderItemsRepository,
      createdResponder,
      createOrderValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await createOrderController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
