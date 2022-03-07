import { Request, Response, NextFunction } from 'express';

import { GetProductsController } from '../../../../../../adapters/controllers/ingram';
import { IngramProductsRepository } from '../../../../../external-service/ingram/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetProductsDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ingramProductRepository = new IngramProductsRepository();

    const okResponder = new OkResponder(this.res);

    const getProductsController = new GetProductsController(
      ingramProductRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getProductsController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
