import RouterMaker from './interfaces/router.abstract';

import { UsersRouter } from './users';
import { ProductsRouter } from './products';
import { OrdersRouter } from './orders';
import { ImagesRouter } from './images';
import { IngramRouter } from './ingram';
import { ManagementRouter } from './management';

export default class MainRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this._router.use('/users', new UsersRouter().getRouter());
    this._router.use('/products', new ProductsRouter().getRouter());
    this._router.use('/orders', new OrdersRouter().getRouter());
    this._router.use('/images', new ImagesRouter().getRouter());
    this._router.use('/ingram', new IngramRouter().getRouter());
    this._router.use('/management', new ManagementRouter().getRouter());
  }
}
