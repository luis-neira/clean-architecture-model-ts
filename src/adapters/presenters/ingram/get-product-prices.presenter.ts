import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetProductPricesPresenter
  implements IUseCaseOutputBoundary
{
  private getProductPricesResponder: IResponder;

  public constructor(getProductPricesResponder: IResponder) {
    this.getProductPricesResponder = getProductPricesResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getProductPricesResponder.respond(successResponse);
  }
}
