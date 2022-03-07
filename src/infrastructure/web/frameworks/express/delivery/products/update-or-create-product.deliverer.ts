import { Request, Response, NextFunction } from 'express';

import { UpdateOrCreateProductController } from '../../../../../../adapters/controllers/products';
import { ProductsRepositoryFactory } from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class UpdateOrCreateProductDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const productsRepositoryFactory = new ProductsRepositoryFactory();
    const productsRepository = productsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const createdResponder = new CreatedResponder(this.res);

    const updateOrCreateProductController = new UpdateOrCreateProductController(
      productsRepository,
      createdResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await updateOrCreateProductController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
