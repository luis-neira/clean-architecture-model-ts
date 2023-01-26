import { SuccessResponse } from '@common/contracts';

import { IUseCaseOutputBoundary } from '@core/use-cases/interfaces';
import { IResponder } from '../../controllers/interfaces';

export default class UpdateProductPresenter
  implements IUseCaseOutputBoundary
{
  private updateProductResponder: IResponder;

  public constructor(updateProductResponder: IResponder) {
    this.updateProductResponder = updateProductResponder;
  }

  public execute(responseModel: any): void {
    const successResponse = SuccessResponse.create(responseModel);

    this.updateProductResponder.respond(successResponse);
  }
}
