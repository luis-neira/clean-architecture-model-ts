import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetOrdersPresenter implements IUseCaseOutputBoundary {
  private getOrdersResponder: IResponder;

  public constructor(getOrdersResponder: IResponder) {
    this.getOrdersResponder = getOrdersResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getOrdersResponder.respond(successResponse);
  }
}
