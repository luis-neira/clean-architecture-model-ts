import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetOrderItemsPresenter implements IUseCaseOutputBoundary {
  private getOrderItemsResponder: IResponder;

  public constructor(getOrderItemsResponder: IResponder) {
    this.getOrderItemsResponder = getOrderItemsResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getOrderItemsResponder.respond(successResponse);
  }
}
