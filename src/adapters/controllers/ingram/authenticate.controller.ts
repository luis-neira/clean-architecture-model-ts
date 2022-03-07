import { AuthenticateUseCase } from '../../../core/use-cases/ingram';
import { AuthenticatePresenter } from '../../presenters/ingram';

import {
  ICredentialsGateway,
  IAuthIgramRequestModel
} from '../../../core/use-cases/interfaces';
import { IHttpRequestModel, IResponder } from '../interfaces';

export default class AuthenticateController {
  private credentialsRepository: ICredentialsGateway;
  private authenticatePresenter: AuthenticatePresenter;

  public constructor(
    credentialsRepository: ICredentialsGateway,
    createdResponder: IResponder
  ) {
    this.credentialsRepository = credentialsRepository;
    this.authenticatePresenter = new AuthenticatePresenter(createdResponder);
  }

  async processRequest(req: IHttpRequestModel): Promise<void> {
    const useCaseRequestModel: IAuthIgramRequestModel = req.body;

    //@TODO validate request with joi

    const authenticateUseCase = new AuthenticateUseCase(
      this.credentialsRepository,
      this.authenticatePresenter
    );

    await authenticateUseCase.execute(useCaseRequestModel);
  }
}
