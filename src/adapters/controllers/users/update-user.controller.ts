import { UpdateUserUseCase } from '@core/use-cases/users';
import { UpdateUserPresenter } from '../../presenters/users';

import {
  IUsersGateway,
  IUpdateUserRequestModel
} from '@core/use-cases/interfaces';
import { IHttpRequestModel, IResponder, IValidator } from '../interfaces';

export default class UpdateUserController {
  private usersRepository: IUsersGateway;
  private UpdateUserPresenter: UpdateUserPresenter;
  private validation: IValidator;

  public constructor(
    usersRepository: IUsersGateway,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.usersRepository = usersRepository;
    this.UpdateUserPresenter = new UpdateUserPresenter(
      createdResponder
    );
    this.validation = validation;
  }

  public async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IUpdateUserRequestModel>({
        id: req.params.id,
        userDetails: req.body
      });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const updateUserUseCase = new UpdateUserUseCase(
      this.usersRepository,
      this.UpdateUserPresenter
    );

    await updateUserUseCase.execute(useCaseRequestModel);
  }
}
