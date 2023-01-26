import { Request, Response, NextFunction } from 'express';

import { GetImageByIdController } from '@adapters/controllers/images';
import { ImagesRepository } from '../../../../../external-service/json-placeholder/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetImageByIdDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const imagesRepository = new ImagesRepository();

    const okResponder = new OkResponder(this.res);

    const getImageByIdController = new GetImageByIdController(
      imagesRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getImageByIdController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
