import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class AddUserPresenter implements IUseCaseOutputBoundary {
  private addUserResponder: IResponder;

  public constructor(addUserResponder: IResponder) {
    this.addUserResponder = addUserResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.addUserResponder.respond(successResponse);
  }
}
