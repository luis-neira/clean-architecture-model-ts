import { Request, Response, NextFunction } from 'express';

import { GetProductPricesController } from '../../../../../../adapters/controllers/ingram';
import { IngramProductPricesRepository } from '../../../../../external-service/ingram/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetProductPricesDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ingramProductPricesRepository = new IngramProductPricesRepository();

    const okResponder = new OkResponder(this.res);

    const getProductPricesController = new GetProductPricesController(
      ingramProductPricesRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getProductPricesController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
