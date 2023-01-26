import { Request, Response, NextFunction } from 'express';

import { DeleteImageController } from '@adapters/controllers/images';
import { ImagesRepository } from '../../../../../external-service/json-placeholder/repositories';
import { NoContentResponder } from '../../../../responders/express/users';

import { Deliverer } from '../interfaces';

export default class DeleteImageDeliverer extends Deliverer {
  public constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  public async IndexActionJSON(): Promise<void> {
    const imagesRepository = new ImagesRepository();

    const noContentResponder = new NoContentResponder(this.res);

    const deleteImageController = new DeleteImageController(
      imagesRepository,
      noContentResponder
    );

    const mappedHttpRequest = this.mapHttpRequest(this.req);

    try {
      await deleteImageController.processRequest(mappedHttpRequest);
    } catch (err: any) {
      this.handleError(err);
    }
  }
}
