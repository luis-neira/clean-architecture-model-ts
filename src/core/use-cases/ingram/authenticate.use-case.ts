import { Result } from '../../lib/result';
import { Credentials } from '../../entities';

import { IUseCaseInputBoundary, IUseCaseOutputBoundary } from '../interfaces';
import { ICredentialsGateway, IAuthIgramRequestModel } from '../interfaces';

export default class AuthenticateUseCase implements IUseCaseInputBoundary {
  private credentialsRepository: ICredentialsGateway;
  private presenter: IUseCaseOutputBoundary;

  public constructor(
    credentialsRepository: ICredentialsGateway,
    presenter: IUseCaseOutputBoundary
  ) {
    this.credentialsRepository = credentialsRepository;
    this.presenter = presenter;
  }

  public async execute(requestDetails: IAuthIgramRequestModel): Promise<void> {
    const credentials = Credentials.create(requestDetails, null);

    try {
      const authToken = await this.credentialsRepository.authenticate(
        credentials
      );

      const authTokenDTO = authToken.getProps();

      this.presenter.execute(authTokenDTO);
    } catch (err) {
      throw Result.fail(err);
    }
  }
}
