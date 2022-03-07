import { AddUserUseCase } from '../../../core/use-cases/users';
import { AddUserPresenter } from '../../../adapters/presenters/users';

import {
  IUsersGateway,
  IAddUserRequestModel
} from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder, IValidator } from '../interfaces';

export default class AddUserController {
  private usersRepository: IUsersGateway;
  private addUserPresenter: AddUserPresenter;
  private validation: IValidator;

  public constructor(
    usersRepository: IUsersGateway,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.usersRepository = usersRepository;
    this.addUserPresenter = new AddUserPresenter(createdResponder);
    this.validation = validation;
  }

  public async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestModelCandidate: IAddUserRequestModel = req.body;

    const requestValidatedOrError = await this.validation.validate(
      requestModelCandidate
    );

    if (requestValidatedOrError.isFailure) {
      throw requestValidatedOrError;
    }

    const useCaseRequestModel: IAddUserRequestModel =
      requestValidatedOrError.getValue();

    const addUserUseCase = new AddUserUseCase(
      this.usersRepository,
      this.addUserPresenter
    );

    await addUserUseCase.execute(useCaseRequestModel);
  }
}
