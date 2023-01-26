import { Request, Response, NextFunction } from 'express';

import { GetImagesController } from '@adapters/controllers/images';
import { ImagesRepository } from '../../../../../external-service/json-placeholder/repositories';
import { OkResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class GetImagesDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const imagesRepository = new ImagesRepository();

    const okResponder = new OkResponder(this.res);

    const getImagesController = new GetImagesController(
      imagesRepository,
      okResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await getImagesController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
