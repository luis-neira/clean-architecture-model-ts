import { Request, Response, NextFunction } from 'express';

import { DeleteProductController } from '@adapters/controllers/products';
import { ProductsRepositoryFactory } from '../../../../../database/repositories';
import { NoContentResponder } from '../../../../responders/express/users';
import { deleteProductByIdValidator } from '../../../../validators/use-cases/products';

import { Deliverer } from '../interfaces';

export default class DeleteProductDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const productsRepositoryFactory = new ProductsRepositoryFactory();
    const productsRepository = productsRepositoryFactory.create(
      process.env.DB_DIALECT!
    );

    const noContentResponder = new NoContentResponder(this.res);

    const deleteProductController = new DeleteProductController(
      productsRepository,
      noContentResponder,
      deleteProductByIdValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await deleteProductController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
