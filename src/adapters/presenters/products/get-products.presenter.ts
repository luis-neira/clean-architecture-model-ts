import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetProductsPresenter implements IUseCaseOutputBoundary {
  private getProductsResponder: IResponder;

  public constructor(getProductsResponder: IResponder) {
    this.getProductsResponder = getProductsResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getProductsResponder.respond(successResponse);
  }
}
