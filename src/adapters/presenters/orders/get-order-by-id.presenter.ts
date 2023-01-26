import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetOrderByIdPresenter implements IUseCaseOutputBoundary {
  private getOrderByIdResponder: IResponder;

  public constructor(getOrderByIdResponder: IResponder) {
    this.getOrderByIdResponder = getOrderByIdResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getOrderByIdResponder.respond(successResponse);
  }
}
