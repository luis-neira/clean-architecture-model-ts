import { GetUserByIdUseCase } from '../../../core/use-cases/users';
import { GetUserByIdPresenter } from '../../../adapters/presenters/users';

import {
  IUsersGateway,
  IGetUserByIdRequestModel
} from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder, IValidator } from '../interfaces';

export default class GetUserByIdController {
  private usersRepository: IUsersGateway;
  private getUserByIdPresenter: GetUserByIdPresenter;
  private validation: IValidator;

  public constructor(
    usersRepository: IUsersGateway,
    okResponder: IResponder,
    validation: IValidator
  ) {
    this.usersRepository = usersRepository;
    this.getUserByIdPresenter = new GetUserByIdPresenter(okResponder);
    this.validation = validation;
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestModelCandidate: IGetUserByIdRequestModel = {
      id: req.params.id
    };

    const requestValidatedOrError = await this.validation.validate(
      requestModelCandidate
    );

    if (requestValidatedOrError.isFailure) {
      throw requestValidatedOrError;
    }

    const useCaseRequestModel: IGetUserByIdRequestModel =
      requestValidatedOrError.getValue();

    const getUserByIdUseCase = new GetUserByIdUseCase(
      this.usersRepository,
      this.getUserByIdPresenter
    );

    await getUserByIdUseCase.execute(useCaseRequestModel);
  }
}
