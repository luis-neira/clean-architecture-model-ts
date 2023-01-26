import { Request, Response, NextFunction } from 'express';

import { GetProductByIdController } from '@adapters/controllers/products';
import { ProductsRepositoryFactory } from '../../../../../database/repositories';
import { CreatedResponder } from '../../../../responders/express/users';
import { getProductByIdValidator } from '../../../../validators/use-cases/products';

import { Deliverer } from '../interfaces';

export default class GetProductByIdDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const productsRepositoryFactory = new ProductsRepositoryFactory();
    const productsRepository = productsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const createdResponder = new CreatedResponder(this.res);

    const getProductByIdController = new GetProductByIdController(
      productsRepository,
      createdResponder,
      getProductByIdValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getProductByIdController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
