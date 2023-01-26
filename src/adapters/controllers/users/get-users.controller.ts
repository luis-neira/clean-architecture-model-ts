import { GetUsersUseCase } from '@core/use-cases/users';
import { GetUsersPresenter } from '../../presenters/users';

import { IUsersGateway } from '@core/use-cases/interfaces';
import { IResponder, IHttpRequestModel } from '../interfaces';

export default class GetUsersController {
  private usersRepository: IUsersGateway;
  private getUsersPresenter: GetUsersPresenter;

  public constructor(usersRepository: IUsersGateway, okResponder: IResponder) {
    this.usersRepository = usersRepository;
    this.getUsersPresenter = new GetUsersPresenter(okResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {

    const getUserByIdUseCase = new GetUsersUseCase(
      this.usersRepository,
      this.getUsersPresenter
    );

    await getUserByIdUseCase.execute();
  }
}
