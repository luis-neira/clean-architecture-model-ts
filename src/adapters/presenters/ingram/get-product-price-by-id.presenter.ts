import { SuccessResponse } from '../../../common/contracts';

import { IUseCaseOutputBoundary } from '../../../core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class GetProductPriceByIdPresenter
  implements IUseCaseOutputBoundary
{
  private getProductPriceByIdPresenter: IResponder;

  public constructor(getProductPriceByIdPresenter: IResponder) {
    this.getProductPriceByIdPresenter = getProductPriceByIdPresenter;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.getProductPriceByIdPresenter.respond(successResponse);
  }
}
