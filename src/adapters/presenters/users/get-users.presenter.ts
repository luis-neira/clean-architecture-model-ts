import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetUsersPresenter implements IUseCaseOutputBoundary {
  private getUsersResponder: IResponder;

  public constructor(getUsersResponder: IResponder) {
    this.getUsersResponder = getUsersResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getUsersResponder.respond(successResponse);
  }
}
