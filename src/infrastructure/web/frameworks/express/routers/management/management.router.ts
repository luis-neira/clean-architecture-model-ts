import RouterMaker from '../interfaces/router.abstract';

import {
  GetItemsDeliverer,
  GetCustomersDeliverer,
  GetOrdersDeliverer,
  GetOrderItemsDeliverer
} from '../../delivery/management';

export default class ManagementRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this._router.get(
      '/items', 
      this.makeRequestHandler(GetItemsDeliverer)
    );

    this._router.get(
      '/customers',
      this.makeRequestHandler(GetCustomersDeliverer)
    );

    this._router.get(
      '/orders',
      this.makeRequestHandler(GetOrdersDeliverer)
    );

    this._router.get(
      '/order-items',
      this.makeRequestHandler(GetOrderItemsDeliverer)
    );
  }
}
