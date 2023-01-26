import { Request, Response, NextFunction } from 'express';

import { UpdateImageController } from '@adapters/controllers/images';
import { ImagesRepository } from '../../../../../external-service/json-placeholder/repositories';
import { CreatedResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class UpdateImageDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const imagesRepository = new ImagesRepository();

    const createdResponder = new CreatedResponder(this.res);

    const updateImageController = new UpdateImageController(
      imagesRepository,
      createdResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await updateImageController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
