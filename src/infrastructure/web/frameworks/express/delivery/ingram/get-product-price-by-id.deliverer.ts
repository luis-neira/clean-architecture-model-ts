import { Request, Response, NextFunction } from 'express';

import { GetProductPriceByIdController } from '../../../../../../adapters/controllers/ingram';
import { IngramProductPricesRepository } from '../../../../../external-service/ingram/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetProductPriceByIdDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ingramProductPricesRepository = new IngramProductPricesRepository();

    const okResponder = new OkResponder(this.res);

    const getProductPriceByIdController = new GetProductPriceByIdController(
      ingramProductPricesRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getProductPriceByIdController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
