import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetOrderStatusPresenter implements IUseCaseOutputBoundary {
  private getOrderStatusPresenter: IResponder;

  public constructor(getOrderStatusPresenter: IResponder) {
    this.getOrderStatusPresenter = getOrderStatusPresenter;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getOrderStatusPresenter.respond(successResponse);
  }
}
