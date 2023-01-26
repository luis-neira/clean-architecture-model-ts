import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetProductByIdPresenter implements IUseCaseOutputBoundary {
  private getProductByIdResponder: IResponder;

  public constructor(getProductByIdResponder: IResponder) {
    this.getProductByIdResponder = getProductByIdResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getProductByIdResponder.respond(successResponse);
  }
}
