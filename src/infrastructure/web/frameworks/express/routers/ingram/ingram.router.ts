import RouterMaker from '../interfaces/router.abstract';

import {
  AuthenticateDeliverer,
  GetProductsDeliverer,
  GetProductByIdDeliverer,
  GetProductPricesDeliverer,
  GetProductPriceByIdDeliverer,
  CreateOrderDeliverer,
  GetOrderStatusDeliverer
} from '../../delivery/ingram';

export default class IngramRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this._router.post(
      '/authenticate',
      this.makeRequestHandler(AuthenticateDeliverer)
    );

    this._router.get(
      '/products',
      this.makeRequestHandler(GetProductsDeliverer)
    );

    this._router.get(
      '/products/:id',
      this.makeRequestHandler(GetProductByIdDeliverer)
    );

    this._router.get(
      '/prices',
      this.makeRequestHandler(GetProductPricesDeliverer)
    );

    this._router.get(
      '/prices/:id',
      this.makeRequestHandler(GetProductPriceByIdDeliverer)
    );

    this._router.post(
      '/orders',
      this.makeRequestHandler(CreateOrderDeliverer)
    );

    this._router.post(
      '/orders/status',
      this.makeRequestHandler(GetOrderStatusDeliverer)
    );
  }
}
