import RouterMaker from '../interfaces/router.abstract';

import { AddUserDeliverer } from '../../delivery/users';
import { GetUserByIdDeliverer } from '../../delivery/users';
import { GetUsersDeliverer } from '../../delivery/users';
import { UpdateUserDeliverer } from '../../delivery/users';
import { DeleteUserDeliverer } from '../../delivery/users';

export default class UsersRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this._router.get(
      '/:id',
      this.makeRequestHandler(GetUserByIdDeliverer)
    );

    this._router.get(
      '/',
      this.makeRequestHandler(GetUsersDeliverer)
    );

    this._router.post(
      '/',
      this.makeRequestHandler(AddUserDeliverer)
    );

    this._router.patch(
      '/:id',
      this.makeRequestHandler(UpdateUserDeliverer)
    );

    this._router.delete(
      '/:id',
      this.makeRequestHandler(DeleteUserDeliverer)
    );
  }
}
