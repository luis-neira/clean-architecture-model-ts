import { UpdateOrCreateUserUseCase } from '../../../core/use-cases/users';
import { UpdateOrCreateUserPresenter } from '../../presenters/users';

import {
  IUsersGateway,
  IUpdateOrCreateUserRequestModel
} from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder, IValidator } from '../interfaces';

export default class UpdateOrCreateUserController {
  private usersRepository: IUsersGateway;
  private updateOrCreateUserPresenter: UpdateOrCreateUserPresenter;
  private validation: IValidator;

  public constructor(
    usersRepository: IUsersGateway,
    createdResponder: IResponder,
    validation: IValidator
  ) {
    this.usersRepository = usersRepository;
    this.updateOrCreateUserPresenter = new UpdateOrCreateUserPresenter(
      createdResponder
    );
    this.validation = validation;
  }

  public async processRequest(req: IHttpRequestModel): Promise<void> {
    const requestValidated = await this.validation.validate<IUpdateOrCreateUserRequestModel>({
        id: req.params.id,
        userDetails: req.body
      });

    if (requestValidated.isFailure) {
      throw requestValidated;
    }

    const useCaseRequestModel = requestValidated.getValue()!;

    const updateOrCreateUserUseCase = new UpdateOrCreateUserUseCase(
      this.usersRepository,
      this.updateOrCreateUserPresenter
    );

    await updateOrCreateUserUseCase.execute(useCaseRequestModel);
  }
}
