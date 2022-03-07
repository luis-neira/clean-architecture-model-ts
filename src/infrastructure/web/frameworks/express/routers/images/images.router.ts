import RouterMaker from '../interfaces/router.abstract';

import { AddImageDeliverer } from '../../delivery/images';
import { GetImageByIdDeliverer } from '../../delivery/images';
import { GetImagesDeliverer } from '../../delivery/images';
import { UpdateImageDeliverer } from '../../delivery/images';
import { DeleteImageDeliverer } from '../../delivery/images';

export default class ImagesRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this._router.get(
      '/:id',
      this.makeRequestHandler(GetImageByIdDeliverer)
    );

    this._router.get(
      '/',
      this.makeRequestHandler(GetImagesDeliverer)
    );

    this._router.post(
      '/',
      this.makeRequestHandler(AddImageDeliverer)
    );
    
    this._router.post(
      '/:id/update',
      this.makeRequestHandler(UpdateImageDeliverer)
    );

    this._router.delete(
      '/:id',
      this.makeRequestHandler(DeleteImageDeliverer)
    );
  }
}
