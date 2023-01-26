import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetUserByIdPresenter implements IUseCaseOutputBoundary {
  private getUserByIdResponder: IResponder;

  public constructor(getUserByIdResponder: IResponder) {
    this.getUserByIdResponder = getUserByIdResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getUserByIdResponder.respond(successResponse);
  }
}
