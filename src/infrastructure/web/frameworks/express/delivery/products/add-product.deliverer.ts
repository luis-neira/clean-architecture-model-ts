import { Request, Response, NextFunction } from 'express';

import { AddProductController } from '@adapters/controllers/products';
import { ProductsRepositoryFactory } from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';
import { addProductValidator } from '../../../../validators/use-cases/products';

import { Deliverer } from '../interfaces';

export default class AddProductDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const productsRepositoryFactory = new ProductsRepositoryFactory();
    const productsRepository = productsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const createdResponder = new CreatedResponder(this.res);

    const addProductController = new AddProductController(
      productsRepository,
      createdResponder,
      addProductValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await addProductController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
