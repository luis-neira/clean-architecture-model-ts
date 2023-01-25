import RouterMaker from '../interfaces/router.abstract';

import { AddProductDeliverer } from '../../delivery/products';
import { GetProductByIdDeliverer } from '../../delivery/products';
import { GetProductsDeliverer } from '../../delivery/products';
import { UpdateProductDeliverer } from '../../delivery/products';
import { DeleteProductDeliverer } from '../../delivery/products';

export default class ProductsRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this._router.get(
      '/:id',
      this.makeRequestHandler(GetProductByIdDeliverer)
    );

    this._router.get(
      '/',
      this.makeRequestHandler(GetProductsDeliverer)
    );
    
    this._router.post(
      '/',
      this.makeRequestHandler(AddProductDeliverer)
    );

    this._router.patch(
      '/:id',
      this.makeRequestHandler(UpdateProductDeliverer)
    );

    this._router.delete(
      '/:id',
      this.makeRequestHandler(DeleteProductDeliverer)
    );
  }
}
