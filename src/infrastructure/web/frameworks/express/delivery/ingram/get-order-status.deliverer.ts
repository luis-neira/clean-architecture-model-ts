import { Request, Response, NextFunction } from 'express';

import { GetOrderStatusController } from '../../../../../../adapters/controllers/ingram';
import { IngramOrderStatusRepository } from '../../../../../external-service/ingram/repositories';
import { OkResponder } from '../../../../responders/express/users';
import { getOrderStatusValidator } from '../../../../validators/use-cases/ingram-order-status';

import { Deliverer } from '../interfaces';

export default class GetOrderStatusDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const ingramOrderStatusRepository = new IngramOrderStatusRepository();

    const okResponder = new OkResponder(this.res);

    const getOrderStatusController = new GetOrderStatusController(
      ingramOrderStatusRepository,
      okResponder,
      getOrderStatusValidator
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getOrderStatusController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
