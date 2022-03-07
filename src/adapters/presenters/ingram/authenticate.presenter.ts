import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class AuthenticatePresenter implements IUseCaseOutputBoundary {
  private authenticateResponder: IResponder;

  public constructor(authenticateResponder: IResponder) {
    this.authenticateResponder = authenticateResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.authenticateResponder.respond(successResponse);
  }
}
