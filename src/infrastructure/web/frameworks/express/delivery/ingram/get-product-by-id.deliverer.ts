import { Request, Response, NextFunction } from 'express';

import { GetProductByIdController } from '../../../../../../adapters/controllers/ingram';
import { IngramProductsRepository } from '../../../../../external-service/ingram/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetProductByIdDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ingramProductRepository = new IngramProductsRepository();

    const okResponder = new OkResponder(this.res);

    const getProductByIdController = new GetProductByIdController(
      ingramProductRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getProductByIdController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
