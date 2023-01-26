import { DeleteUserUseCase } from '@core/use-cases/users';
import { DeleteUserPresenter } from '../../presenters/users';

import {
  IUsersGateway,
  IDeleteUserRequestModel
} from '@core/use-cases/interfaces';
import { IHttpRequestModel, IResponder, IValidator } from '../interfaces';

export default class DeleteUserController {
  private usersRepository: IUsersGateway;
  private deleteUserPresenter: DeleteUserPresenter;
  private validation: IValidator;

  public constructor(
    usersRepository: IUsersGateway,
    noContentResponder: IResponder,
    validation: IValidator
  ) {
    this.usersRepository = usersRepository;
    this.deleteUserPresenter = new DeleteUserPresenter(noContentResponder);
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IDeleteUserRequestModel>({
        id: req.params.id
      });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const deleteUserUseCase = new DeleteUserUseCase(
      this.usersRepository,
      this.deleteUserPresenter
    );

    await deleteUserUseCase.execute(useCaseRequestModel);
  }
}
