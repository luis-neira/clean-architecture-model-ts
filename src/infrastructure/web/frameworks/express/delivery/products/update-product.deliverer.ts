import { Request, Response, NextFunction } from 'express';

import { UpdateProductController } from '@adapters/controllers/products';
import { ProductsRepositoryFactory } from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';
import { updateProductValidator } from '../../../../validators/use-cases/products';

import { Deliverer } from '../interfaces';

export default class UpdateProductDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const productsRepositoryFactory = new ProductsRepositoryFactory();
    const productsRepository = productsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const createdResponder = new CreatedResponder(this.res);

    const updateProductController = new UpdateProductController(
      productsRepository,
      createdResponder,
      updateProductValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await updateProductController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
